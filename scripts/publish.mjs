#!/usr/bin/env node

/**
 * Sequential publish script with retry and delay to avoid npm rate limits.
 * Used by changesets/action instead of `changeset publish`.
 *
 * Usage: node scripts/publish.mjs
 *
 * Flow:
 * 1. Run `changeset publish` in dry-run mode to detect unpublished packages
 * 2. Publish each package sequentially with a delay between publishes
 * 3. Retry on 429 (rate limit) with exponential backoff
 * 4. Create git tags for successfully published packages
 */

import { execSync } from "node:child_process";
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join, resolve } from "node:path";

const ROOT = resolve(import.meta.dirname, "..");
const DELAY_MS = 2000;
const MAX_RETRIES = 3;
const BACKOFF_BASE_MS = 10000;

function sleep(ms) {
	return new Promise((r) => setTimeout(r, ms));
}

function getWorkspacePackages() {
	const output = execSync("bun pm ls --all", { cwd: ROOT, encoding: "utf-8" });
	return output;
}

function getUnpublishedPackages() {
	try {
		const output = execSync("changeset status --output=/dev/stdout 2>&1", {
			cwd: ROOT,
			encoding: "utf-8",
		});
		return output;
	} catch {
		// No changesets pending is fine
		return "";
	}
}

function findPublishablePackages() {
	const packages = [];
	const pkgDirs = ["packages/core", "packages/enggine", "packages/framework", "packages/lootiscript", "packages/tooling"];

	for (const dir of pkgDirs) {
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
		execSync(`git tag -l "${name}@${version}"`, { cwd: ROOT, encoding: "utf-8" });
		const output = execSync(`git tag -l "${name}@${version}"`, { cwd: ROOT, encoding: "utf-8" });
		return output.trim() === `${name}@${version}`;
	} catch {
		return false;
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
		// Create missing git tag
		execSync(`git tag "${tag}"`, { cwd: ROOT });
		console.log(`  TAG  ${tag}`);
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
			execSync(`git tag "${tag}"`, { cwd: ROOT });
			console.log(`  OK   ${tag}`);
			return { status: "ok", pkg };
		} catch (err) {
			const stderr = err.stderr || err.stdout || "";

			if (stderr.includes("cannot publish over") || stderr.includes("You cannot publish over")) {
				console.log(`  SKIP ${tag} (already published)`);
				execSync(`git tag "${tag}"`, { cwd: ROOT });
				return { status: "skip", pkg };
			}

			if (stderr.includes("429") || stderr.includes("rate limit")) {
				const backoff = BACKOFF_BASE_MS * attempt;
				console.log(`  WAIT ${tag} (rate limited, waiting ${backoff / 1000}s)`);
				await sleep(backoff);
				continue;
			}

			// Other error
			console.error(`  FAIL ${tag}: ${stderr.split("\n")[0]}`);
			if (attempt === MAX_RETRIES) {
				return { status: "fail", pkg, error: stderr };
			}
			await sleep(DELAY_MS * attempt);
		}
	}

	return { status: "fail", pkg };
}

async function main() {
	console.log("\n--- Sequential Publish (rate-limit safe) ---\n");

	// Step 1: Run changeset version (applies pending changesets)
	// This is handled by changesets/action before calling publish

	// Step 2: Find packages that need publishing
	const packages = findPublishablePackages();
	console.log(`Found ${packages.length} publishable packages\n`);

	const results = { ok: [], skip: [], fail: [] };

	// Step 3: Publish sequentially
	for (const pkg of packages) {
		const result = await publishPackage(pkg);
		results[result.status].push(result.pkg);

		// Delay between publishes to avoid rate limits
		if (result.status === "ok") {
			await sleep(DELAY_MS);
		}
	}

	// Step 4: Push git tags
	if (results.ok.length > 0 || results.skip.some((p) => hasGitTag(p.name, p.version))) {
		try {
			console.log("\nPushing git tags...");
			execSync("git push --tags", { cwd: ROOT, stdio: "inherit" });
		} catch {
			console.warn("Warning: failed to push git tags");
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
