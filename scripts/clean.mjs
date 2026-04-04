#!/usr/bin/env node

import { existsSync, lstatSync, readdirSync, rmSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { join } from "node:path";

const args = process.argv.slice(2);
const cleanDist = args.includes("--dist") || args.includes("--all") || args.length === 0;
const cleanModules = args.includes("--modules") || args.includes("--all");

const rootDir = process.cwd();

/**
 * Recursively find directories with a specific name.
 */
function cleanDirs(startPath, dirName) {
	const results = [];
	const skipDirs = new Set([".git", ".turbo", ".next", ".vscode-test", ".idea"]);

	function search(currentPath) {
		try {
			const items = readdirSync(currentPath);

			for (const item of items) {
				const itemPath = join(currentPath, item);

				if (!existsSync(itemPath)) continue;

				try {
					const stat = lstatSync(itemPath);

					if (stat.isDirectory()) {
						if (item === dirName) {
							results.push(itemPath);
						} else if (!skipDirs.has(item)) {
							// Never recurse into node_modules unless explicitly searching for it.
							if (item === "node_modules" && dirName !== "node_modules") continue;
							search(itemPath);
						}
					}
				} catch {
					// Ignore unreadable entries.
				}
			}
		} catch {
			// Ignore unreadable directories.
		}
	}

	search(startPath);
	return results;
}

/**
 * Remove directory robustly on Windows/Bun with retry and cmd fallback.
 */
function removeDirSafe(dirPath, displayPath) {
	let lastErr;

	for (let attempt = 1; attempt <= 3; attempt++) {
		try {
			rmSync(dirPath, {
				recursive: true,
				force: true,
			});
			console.log(`   ✓ Removed ${displayPath}`);
			return true;
		} catch (err) {
			lastErr = err;
		}
	}

	if (process.platform === "win32") {
		try {
			const result = spawnSync("cmd.exe", ["/d", "/s", "/c", "rmdir", "/s", "/q", dirPath], {
				stdio: "pipe",
			});

			if (result.status === 0 || !existsSync(dirPath)) {
				console.log(`   ✓ Removed ${displayPath} (fallback)`);
				return true;
			}

			const stderr = result.stderr?.toString()?.trim();
			lastErr = new Error(stderr || `rmdir exited with code ${result.status}`);
		} catch (err) {
			lastErr = err;
		}
	}

	const message = lastErr instanceof Error ? lastErr.message : String(lastErr);
	console.log(`   ✗ Failed to remove ${displayPath}: ${message}`);
	return false;
}

console.log("🧹 Cleaning workspace...\n");

if (cleanDist) {
	console.log("📦 Removing dist folders...");
	const distDirs = cleanDirs(rootDir, "dist");

	for (const dir of distDirs) {
		removeDirSafe(dir, dir.replace(rootDir, "."));
	}

	if (distDirs.length === 0) {
		console.log("   No dist folders found");
	}
}

if (cleanModules) {
	console.log("\n📦 Removing node_modules folders...");

	const rootNodeModules = join(rootDir, "node_modules");
	if (existsSync(rootNodeModules)) {
		removeDirSafe(rootNodeModules, "./node_modules");
	}

	const nodeModulesDirs = cleanDirs(rootDir, "node_modules");
	for (const dir of nodeModulesDirs) {
		removeDirSafe(dir, dir.replace(rootDir, "."));
	}

	if (nodeModulesDirs.length === 0 && !existsSync(rootNodeModules)) {
		console.log("   No node_modules folders found");
	}
}

console.log("\n✨ Cleanup complete!");
