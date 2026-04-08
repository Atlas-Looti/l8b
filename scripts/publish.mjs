#!/usr/bin/env node

/**
 * Sequential publish script with retry and delay to avoid npm rate limits.
 * Used by changesets/action instead of `changeset publish`.
 *
 * Usage: node scripts/publish.mjs
 *
 * Flow:
 * 1. Discover all publishable packages in the monorepo
 * 2. Build a version map of all packages (for rewriting workspace:* deps)
 * 3. Publish each package sequentially with workspace:* rewritten to actual versions
 * 4. Retry on 429 (rate limit) with exponential backoff
 * 5. Skip already-published versions (no error)
 * 6. Create and push git tags for published packages
 * 7. Create GitHub Releases for newly published packages
 */

import { execSync } from "node:child_process";
import { readFileSync, readdirSync, existsSync, writeFileSync, rmSync, mkdirSync, cpSync } from "node:fs";
import { join, resolve } from "node:path";

const ROOT = resolve(import.meta.dirname, "..");
const DELAY_MS = 8000;
const MAX_RETRIES = 3;
const BACKOFF_BASE_MS = 30000;

function sleep(ms) {
	return new Promise((r) => setTimeout(r, ms));
}

/**
 * Build a map of all package names → their current versions.
 * This is used to rewrite workspace:* dependencies to actual versions before publishing.
 */
function buildVersionMap() {
	const versionMap = {};
	const pkgGroups = ["packages/core", "packages/enggine", "packages/framework", "packages/tooling"];
	const pkgDirect = ["packages/lootiscript"];

	const scanDir = (dir) => {
		if (!existsSync(dir)) return;
		const entries = readdirSync(dir, { withFileTypes: true });
		for (const entry of entries) {
			if (!entry.isDirectory()) continue;
			const pkgJsonPath = join(dir, entry.name, "package.json");
			if (!existsSync(pkgJsonPath)) continue;
			try {
				const pkg = JSON.parse(readFileSync(pkgJsonPath, "utf-8"));
				if (pkg.name && pkg.version) {
					versionMap[pkg.name] = pkg.version;
				}
			} catch { /* skip */ }
		}
	};

	for (const dir of [...pkgGroups, ...pkgDirect]) {
		const fullDir = join(ROOT, dir);
		if (existsSync(join(fullDir, "package.json"))) {
			// Single package at path
			try {
				const pkg = JSON.parse(readFileSync(join(fullDir, "package.json"), "utf-8"));
				if (pkg.name && pkg.version) {
					versionMap[pkg.name] = pkg.version;
				}
			} catch { /* skip */ }
		} else {
			scanDir(fullDir);
		}
	}

	return versionMap;
}

/**
 * Rewrite workspace:* dependencies in a package.json to actual versions.
 * Returns a new object (does not mutate original).
 */
function rewritePackageJson(pkgJson, versionMap) {
	const rewritten = JSON.parse(JSON.stringify(pkgJson));

	if (rewritten.dependencies) {
		for (const [dep, version] of Object.entries(rewritten.dependencies)) {
			if (version === "workspace:*" || version === "workspace:^") {
				if (versionMap[dep]) {
					rewritten.dependencies[dep] = "^" + versionMap[dep];
				}
			}
		}
	}

	if (rewritten.peerDependencies) {
		for (const [dep, version] of Object.entries(rewritten.peerDependencies)) {
			if (version === "workspace:*" || version === "workspace:^") {
				if (versionMap[dep]) {
					rewritten.peerDependencies[dep] = "^" + versionMap[dep];
				}
			}
		}
	}

	return rewritten;
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

async function publishPackage(pkg, versionMap) {
	const tag = `${pkg.name}@${pkg.version}`;

	// Prepare a temp directory with rewritten package.json for publishing
	const tmpDir = join(ROOT, ".publish-tmp", pkg.name.replace("/", "_"));
	try {
		mkdirSync(tmpDir, { recursive: true });
	} catch { /* exists */ }

	// Copy package.json and rewrite workspace:* deps
	const pkgJsonPath = join(pkg.path, "package.json");
	const pkgJson = JSON.parse(readFileSync(pkgJsonPath, "utf-8"));
	const rewrittenPkgJson = rewritePackageJson(pkgJson, versionMap);
	writeFileSync(join(tmpDir, "package.json"), JSON.stringify(rewrittenPkgJson, null, 2) + "\n");

	// Copy dist/ if it exists (needed for published artifacts)
	const srcDist = join(pkg.path, "dist");
	if (existsSync(srcDist)) {
		cpSync(srcDist, join(tmpDir, "dist"), { recursive: true });
	}

	// Copy other files listed in package.json "files" field
	const pkgFiles = pkgJson.files || [];
	for (const file of pkgFiles) {
		// Skip dist/**/* - already copied
		if (file.includes("**")) continue;
		const srcFile = join(pkg.path, file);
		if (existsSync(srcFile)) {
			// Copy single file preserving directory structure
			const destFile = join(tmpDir, file);
			const destDir = destFile.substring(0, destFile.lastIndexOf("/"));
			if (destDir) mkdirSync(destDir, { recursive: true });
			cpSync(srcFile, destFile);
		}
	}

	try {
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
				execSync("npm publish --access public --no-audit --fund false", {
					cwd: tmpDir,
					encoding: "utf-8",
					stdio: "pipe",
					timeout: 120000,
				});
				// Create git tag on success
				try { execSync(`git tag "${tag}"`, { cwd: ROOT }); } catch { /* tag exists */ }
				console.log(`  OK   ${tag}`);
				return { status: "ok", pkg };
			} catch (err) {
				const output = [err.stderr, err.stdout].filter(Boolean).join("\n");

				// Rate limited — wait and retry FIRST (before other checks)
				if (output.includes("429") || output.includes("rate limit") || output.includes("Too Many Requests")) {
					const backoff = BACKOFF_BASE_MS * attempt;
					console.log(`  WAIT ${tag} (rate limited, retrying in ${backoff / 1000}s...)`);
					await sleep(backoff);
					continue;
				}

				// Already published — skip, not error
				if (output.includes("cannot publish over") || output.includes("You cannot publish over")) {
					console.log(`  SKIP ${tag} (already published)`);
					try { execSync(`git tag "${tag}"`, { cwd: ROOT }); } catch { /* tag exists */ }
					return { status: "skip", pkg };
				}

				// Check if it actually published despite warnings (npm sometimes exits non-zero for warnings)
				// Only count as success if we see "+ <name>@<version>" in output (added to registry)
				if (output.includes("+ " + pkg.name + "@") || output.includes("+ " + pkg.name.split("/")[1] + "@")) {
					try { execSync(`git tag "${tag}"`, { cwd: ROOT }); } catch { /* tag exists */ }
					console.log(`  OK   ${tag} (published with warnings)`);
					return { status: "ok", pkg };
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
	} finally {
		// Cleanup temp directory after each package
		try {
			rmSync(tmpDir, { recursive: true, force: true });
		} catch { /* ignore */ }
	}
}

async function main() {
	console.log("\n--- Sequential Publish (rate-limit safe) ---\n");

	const packages = findPublishablePackages();
	const versionMap = buildVersionMap();
	console.log(`Found ${packages.length} publishable packages\n`);
	console.log(`Version map built: ${Object.keys(versionMap).length} packages\n`);

	const results = { ok: [], skip: [], fail: [] };

	for (const pkg of packages) {
		const result = await publishPackage(pkg, versionMap);
		results[result.status].push(result.pkg);

		// Delay between publishes to avoid rate limits
		if (result.status === "ok") {
			await sleep(DELAY_MS);
		}
	}

	// Cleanup temp directories
	try {
		rmSync(join(ROOT, ".publish-tmp"), { recursive: true, force: true });
	} catch { /* ignore */ }

	// Push git tags if any were created
	if (results.ok.length > 0) {
		try {
			console.log("\nPushing git tags...");
			execSync("git push --tags", { cwd: ROOT, stdio: "inherit" });
		} catch {
			console.warn("Warning: failed to push git tags (may need manual push)");
		}
	}

	// Create GitHub Releases for newly published packages
	if (results.ok.length > 0) {
		console.log("\nCreating GitHub Releases...");
		for (const pkg of results.ok) {
			const tag = `${pkg.name}@${pkg.version}`;
			const shortName = pkg.name.replace("@al8b/", "");
			const title = `${pkg.name} v${pkg.version}`;
			const npmUrl = `https://www.npmjs.com/package/${pkg.name}/v/${pkg.version}`;
			const body = `## ${title}\n\n**npm:** ${npmUrl}\n\n\`\`\`bash\nbun add ${pkg.name}@${pkg.version}\n\`\`\``;

			try {
				execSync(
					`gh release create "${tag}" --title "${title}" --notes "${body.replace(/"/g, '\\"')}" --latest=false`,
					{ cwd: ROOT, encoding: "utf-8", stdio: "pipe", timeout: 15000 },
				);
				console.log(`  REL  ${tag}`);
			} catch (err) {
				const output = (err.stderr || err.stdout || "").trim();
				if (output.includes("already exists")) {
					console.log(`  SKIP ${tag} (release exists)`);
				} else {
					console.warn(`  WARN ${tag}: failed to create release`);
				}
			}
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
