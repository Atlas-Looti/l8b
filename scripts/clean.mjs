#!/usr/bin/env node

import { existsSync, readdirSync, rmSync, statSync } from "node:fs";
import { join } from "node:path";

const args = process.argv.slice(2);
const cleanDist =
	args.includes("--dist") || args.includes("--all") || args.length === 0;
const cleanModules = args.includes("--modules") || args.includes("--all");

const rootDir = process.cwd();

/**
 * Recursively find and remove directories with a specific name
 */
function cleanDirs(startPath, dirName) {
	const results = [];

	function search(currentPath) {
		try {
			const items = readdirSync(currentPath);

			for (const item of items) {
				const itemPath = join(currentPath, item);

				// Skip if already deleted or doesn't exist
				if (!existsSync(itemPath)) continue;

				try {
					const stat = statSync(itemPath);

					if (stat.isDirectory()) {
						if (item === dirName) {
							results.push(itemPath);
						} else if (item !== ".git" && item !== ".turbo") {
							// Don't recurse into node_modules we're about to delete
							if (!(item === "node_modules" && dirName === "node_modules")) {
								search(itemPath);
							}
						}
					}
				} catch (_err) {
					// Skip items we can't access
				}
			}
		} catch (_err) {
			// Skip directories we can't read
		}
	}

	search(startPath);
	return results;
}

console.log("🧹 Cleaning workspace...\n");

// Clean dist folders
if (cleanDist) {
	console.log("📦 Removing dist folders...");
	const distDirs = cleanDirs(rootDir, "dist");

	for (const dir of distDirs) {
		try {
			rmSync(dir, { recursive: true, force: true });
			console.log(`   ✓ Removed ${dir.replace(rootDir, ".")}`);
		} catch (err) {
			console.log(
				`   ✗ Failed to remove ${dir.replace(rootDir, ".")}: ${err.message}`,
			);
		}
	}

	if (distDirs.length === 0) {
		console.log("   No dist folders found");
	}
}

// Clean node_modules folders
if (cleanModules) {
	console.log("\n📦 Removing node_modules folders...");

	// Remove root node_modules first
	const rootNodeModules = join(rootDir, "node_modules");
	if (existsSync(rootNodeModules)) {
		try {
			rmSync(rootNodeModules, { recursive: true, force: true });
			console.log(`   ✓ Removed ./node_modules`);
		} catch (err) {
			console.log(`   ✗ Failed to remove ./node_modules: ${err.message}`);
		}
	}

	// Find and remove nested node_modules
	const nodeModulesDirs = cleanDirs(rootDir, "node_modules");

	for (const dir of nodeModulesDirs) {
		try {
			rmSync(dir, { recursive: true, force: true });
			console.log(`   ✓ Removed ${dir.replace(rootDir, ".")}`);
		} catch (err) {
			console.log(
				`   ✗ Failed to remove ${dir.replace(rootDir, ".")}: ${err.message}`,
			);
		}
	}

	if (nodeModulesDirs.length === 0 && !existsSync(rootNodeModules)) {
		console.log("   No node_modules folders found");
	}
}

console.log("\n✨ Cleanup complete!");
