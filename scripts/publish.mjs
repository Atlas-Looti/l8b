#!/usr/bin/env node

/**
 * Sequential publish script with retry and delay to avoid npm rate limits.
 * Used by changesets/action instead of `changeset publish`.
 *
 * Usage: node scripts/publish.mjs
 *
 * Flow:
 * 1. Discover all publishable packages in the monorepo
 * 2. Publish each package sequentially with a delay between publishes
 * 3. Retry on 429 (rate limit) with exponential backoff
 * 4. Skip already-published versions (no error)
 * 5. Create and push git tags for published packages
 */

import { execSync } from "node:child_process";
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join, resolve } from "node:path";

const ROOT = resolve(import.meta.dirname, "..");
const DELAY_MS = 3000;
const MAX_RETRIES = 5;
const BACKOFF_BASE_MS = 15000;

function sleep(ms) {
	return new Promise((r) => setTimeout(r, ms));
}

function findPublishablePackages() {
	const packages = [];
	const pkgGroups = ["packages/core", "packages/enggine", "packages/framework", "packages/tooling"];
	const pkgDirect = ["packages/lootiscript"];

	// Scan groups (directories containing multiple packages)
	for (const dir of pkgGroups) {
		const fullDir = join(ROOT, dir);
		if (!existsSync(fullDir)) continue;

		const entries = readdirSync(fullDir, { withFileTypes: true });
		for (const entry of entries) {
			if (!entry.isDirectory()) continue;
			const pkgJsonPath = join(fullDir, entry.name, "package.json");
			if (!existsSync(pkgJsonPath)) continue;

			const pkg = JSON.parse(readFileSync(pkgJsonPath, "utf-8"));
			if (pkg.private) continue;

			packages.push({
				name: pkg.name,
				version: pkg.version,
				path: join(fullDir, entry.name),
			});
		}
	}

	// Scan direct packages (single package at path)
	for (const dir of pkgDirect) {
		const fullDir = join(ROOT, dir);
		const pkgJsonPath = join(fullDir, "package.json");
		if (!existsSync(pkgJsonPath)) continue;

		const pkg = JSON.parse(readFileSync(pkgJsonPath, "utf-8"));
		if (pkg.private) continue;

		packages.push({
			name: pkg.name,
			version: pkg.version,
			path: fullDir,
		});
	}

	return packages;
}

function isPublishedOnNpm(name, version) {
	try {
		const output = execSync(`npm view "${name}@${version}" version 2>&1`, {
			encoding: "utf-8",
			timeout: 15000,
		});
		return output.trim().includes(version);
	} catch {
		return false;
	}
}

function hasGitTag(name, version) {
	try {
		const output = execSync(`git tag -l "${name}@${version}"`, { cwd: ROOT, encoding: "utf-8" });
		return output.trim() === `${name}@${version}`;
	} catch {
		return false;
	}
}

function createGitTag(tag) {
	try {
		if (!hasGitTag(tag.split("@")[0] + "/" + tag.split("/")[1]?.split("@")[0], tag.split("@").pop())) {
			execSync(`git tag "${tag}"`, { cwd: ROOT });
		}
	} catch {
		// Tag might already exist
	}
}

async function publishPackage(pkg) {
	const tag = `${pkg.name}@${pkg.version}`;

	// Skip if already has git tag (already published in a previous run)
	if (hasGitTag(pkg.name, pkg.version)) {
		console.log(`  SKIP ${tag} (git tag exists)`);
		return { status: "skip", pkg };
	}

	// Skip if already on npm
	if (isPublishedOnNpm(pkg.name, pkg.version)) {
		console.log(`  SKIP ${tag} (already on npm)`);
		try {
			execSync(`git tag "${tag}"`, { cwd: ROOT });
			console.log(`  TAG  ${tag}`);
		} catch { /* tag exists */ }
		return { status: "skip", pkg };
	}

	// Publish with retries
	for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
		try {
			console.log(`  PUB  ${tag} (attempt ${attempt}/${MAX_RETRIES})`);
			execSync("npm publish --access public", {
				cwd: pkg.path,
				encoding: "utf-8",
				stdio: "pipe",
				timeout: 60000,
			});
			// Create git tag on success
			try { execSync(`git tag "${tag}"`, { cwd: ROOT }); } catch { /* tag exists */ }
			console.log(`  OK   ${tag}`);
			return { status: "ok", pkg };
		} catch (err) {
			const output = [err.stderr, err.stdout].filter(Boolean).join("\n");

			// Check if it actually published despite warnings (npm sometimes exits non-zero for warnings)
			if (output.includes("+ " + pkg.name + "@") || (output.includes("npm notice") && !output.includes("npm error"))) {
				try { execSync(`git tag "${tag}"`, { cwd: ROOT }); } catch { /* tag exists */ }
				console.log(`  OK   ${tag} (published with warnings)`);
				return { status: "ok", pkg };
			}

			// Already published — skip, not error
			if (output.includes("cannot publish over") || output.includes("You cannot publish over")) {
				console.log(`  SKIP ${tag} (already published)`);
				try { execSync(`git tag "${tag}"`, { cwd: ROOT }); } catch { /* tag exists */ }
				return { status: "skip", pkg };
			}

			// Rate limited — wait and retry
			if (output.includes("429") || output.includes("rate limit") || output.includes("Too Many Requests")) {
				const backoff = BACKOFF_BASE_MS * attempt;
				console.log(`  WAIT ${tag} (rate limited, retrying in ${backoff / 1000}s...)`);
				await sleep(backoff);
				continue;
			}

			// Other error — show full output for debugging
			console.error(`  FAIL ${tag} (attempt ${attempt}/${MAX_RETRIES}):`);
			for (const line of output.split("\n").slice(0, 10)) {
				if (line.trim()) console.error(`    ${line}`);
			}

			if (attempt === MAX_RETRIES) {
				return { status: "fail", pkg, error: output };
			}
			await sleep(DELAY_MS * attempt);
		}
	}

	return { status: "fail", pkg };
}

async function main() {
	console.log("\n--- Sequential Publish (rate-limit safe) ---\n");

	const packages = findPublishablePackages();
	console.log(`Found ${packages.length} publishable packages\n`);

	const results = { ok: [], skip: [], fail: [] };

	for (const pkg of packages) {
		const result = await publishPackage(pkg);
		results[result.status].push(result.pkg);

		// Delay between publishes to avoid rate limits
		if (result.status === "ok") {
			await sleep(DELAY_MS);
		}
	}

	// Push git tags if any were created
	if (results.ok.length > 0) {
		try {
			console.log("\nPushing git tags...");
			execSync("git push --tags", { cwd: ROOT, stdio: "inherit" });
		} catch {
			console.warn("Warning: failed to push git tags (may need manual push)");
		}
	}

	// Summary
	console.log("\n--- Publish Summary ---");
	console.log(`  Published: ${results.ok.length}`);
	console.log(`  Skipped:   ${results.skip.length}`);
	console.log(`  Failed:    ${results.fail.length}`);

	if (results.ok.length > 0) {
		console.log("\nNewly published:");
		for (const p of results.ok) console.log(`  ${p.name}@${p.version}`);
	}

	if (results.fail.length > 0) {
		console.log("\nFailed to publish:");
		for (const p of results.fail) console.log(`  ${p.name}@${p.version}`);
		process.exit(1);
	}
}

main();
