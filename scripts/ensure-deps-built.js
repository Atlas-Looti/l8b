#!/usr/bin/env node
/**
 * Ensure dependencies are built before building examples
 * This script checks if @l8b/cli is built, and if not, builds all dependencies
 */

const { existsSync } = require("fs");
const { resolve, join } = require("path");
const { execSync } = require("child_process");

// Find the CLI package dist folder
function findCLIDist() {
	// Try multiple methods to find CLI dist
	const methods = [
		// Method 1: Try to resolve from node_modules
		() => {
			try {
				const cliPath = require.resolve("@l8b/cli/package.json");
				return join(cliPath, "../dist/bin.js");
			} catch {
				return null;
			}
		},
		// Method 2: Relative path from monorepo root
		() => {
			return resolve(__dirname, "../packages/framework/cli/dist/bin.js");
		},
		// Method 3: From current working directory (if in monorepo)
		() => {
			const cwd = process.cwd();
			// Check if we're in an example directory
			if (cwd.includes("examples")) {
				const rootDir = cwd.split("examples")[0];
				return resolve(rootDir, "packages/framework/cli/dist/bin.js");
			}
			return null;
		},
	];

	for (const method of methods) {
		try {
			const path = method();
			if (path && existsSync(path)) {
				return path;
			}
		} catch {
			// Continue to next method
		}
	}

	// Default fallback
	return resolve(__dirname, "../packages/framework/cli/dist/bin.js");
}

const cliDistPath = findCLIDist();
const cliExists = existsSync(cliDistPath);

if (!cliExists) {
	console.log("⚠️  @l8b/cli not built yet. Building all packages...");
	
	try {
		// Find monorepo root
		let rootDir = resolve(__dirname, "..");
		const cwd = process.cwd();
		
		// If we're in an example directory, go up to root
		if (cwd.includes("examples")) {
			rootDir = cwd.split("examples")[0];
		}
		
		process.chdir(rootDir);
		console.log(`📦 Building from: ${rootDir}`);
		execSync("pnpm run build", { stdio: "inherit", cwd: rootDir });
		console.log("✅ All packages built successfully");
	} catch (error) {
		console.error("❌ Failed to build dependencies:", error.message);
		process.exit(1);
	}
} else {
	console.log("✅ Dependencies already built");
}

