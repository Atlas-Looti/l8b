#!/usr/bin/env node
/**
 * Pre-build Runtime Bundle Script
 *
 * Bundles @l8b/runtime and @l8b/lootiscript into a single file
 * that gets included in the CLI package distribution.
 *
 * This ensures runtime.js is always available without needing
 * to find packages in workspace or node_modules during project build.
 */

import { build } from "esbuild";
import { existsSync, writeFileSync, mkdirSync, unlinkSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join, resolve } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const cliRoot = resolve(__dirname, "..");
const distDir = join(cliRoot, "dist");
const assetsDir = join(distDir, "assets");

/**
 * Find package by trying multiple possible paths
 */
function findPackage(packageName, possiblePaths) {
	for (const pkgPath of possiblePaths) {
		const jsPath = join(pkgPath, "dist", "index.js");
		if (existsSync(jsPath)) {
			return jsPath;
		}
		// Try .mjs
		const mjsPath = join(pkgPath, "dist", "index.mjs");
		if (existsSync(mjsPath)) {
			return mjsPath;
		}
	}
	return null;
}

// Try to find packages relative to CLI
// CLI is at packages/framework/cli, so workspace root is 3 levels up
const workspaceRoot = resolve(cliRoot, "../../..");
const runtimePaths = [
	join(workspaceRoot, "packages", "enggine", "runtime"),
	join(workspaceRoot, "packages", "runtime"),
	join(cliRoot, "node_modules", "@l8b", "runtime"),
];

const lootiscriptPaths = [
	join(workspaceRoot, "packages", "lootiscript"),
	join(cliRoot, "node_modules", "@l8b", "lootiscript"),
];

const runtimePath = findPackage("@l8b/runtime", runtimePaths);
const lootiscriptPath = findPackage("@l8b/lootiscript", lootiscriptPaths);

if (!runtimePath || !lootiscriptPath) {
	console.error("❌ Could not find @l8b/runtime or @l8b/lootiscript");
	console.error("   Runtime paths tried:", runtimePaths);
	console.error("   Lootiscript paths tried:", lootiscriptPaths);
	process.exit(1);
}

console.log("📦 Bundling runtime dependencies...");
console.log(`   Runtime: ${runtimePath}`);
console.log(`   Lootiscript: ${lootiscriptPath}`);

// Ensure assets directory exists
if (!existsSync(assetsDir)) {
	mkdirSync(assetsDir, { recursive: true });
}

// Create temporary entry file
const tempEntry = join(distDir, ".temp-runtime-entry.js");
const entryContent = `// Pre-built runtime bundle entry
export { Runtime } from '${runtimePath.replace(/\\/g, "/")}';
export { Routine } from '${lootiscriptPath.replace(/\\/g, "/")}';
`;

writeFileSync(tempEntry, entryContent);

const outputFile = join(assetsDir, "runtime.js");

try {
	await build({
		entryPoints: [tempEntry],
		bundle: true,
		format: "esm",
		outfile: outputFile,
		platform: "browser",
		target: "es2022",
		splitting: false,
		external: [],
		treeShaking: true,
		packages: "bundle",
		minify: true,
		sourcemap: false,
		resolveExtensions: [".js", ".ts", ".json", ".mjs"],
		keepNames: true,
		legalComments: "none",
		conditions: [],
		define: {
			global: "globalThis",
		},
	});

	console.log(`✅ Runtime bundle created: ${outputFile}`);

	// Clean up temp file
	if (existsSync(tempEntry)) {
		unlinkSync(tempEntry);
	}
} catch (error) {
	console.error("❌ Failed to bundle runtime:", error);
	if (existsSync(tempEntry)) {
		unlinkSync(tempEntry);
	}
	process.exit(1);
}
