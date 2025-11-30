/**
 * Path resolution utilities
 *
 * Provides consistent path resolution across the CLI package,
 * especially for finding workspace roots and package directories.
 */

import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Default directories and file names
 */
export const DEFAULT_DIRS = {
	BUILD_OUTPUT: ".l8b",
	SCRIPTS: "src",
	PUBLIC: "public",
	COMPILED: "compiled",
	FONTS: "fonts",
} as const;

/**
 * Default file names
 */
export const DEFAULT_FILES = {
	CONFIG: "l8b.config.json",
	INDEX_HTML: "index.html",
	RUNTIME_BUNDLE: "runtime.js",
	BITCELL_FONT: "BitCell.ttf",
	PACKAGE_JSON: "package.json",
} as const;

/**
 * Get CLI package root directory
 *
 * Finds the `packages/cli` directory regardless of whether running
 * from source (`src/`) or built (`dist/`) code.
 *
 * @returns Absolute path to CLI package root
 */
export function getCliPackageRoot(): string {
	const normalizedPath = __dirname.replace(/\\/g, "/");

	// Try to find packages/framework/cli or packages/cli
	const frameworkCliIndex = normalizedPath.indexOf("/packages/framework/cli/");
	if (frameworkCliIndex !== -1) {
		const root = normalizedPath.substring(0, frameworkCliIndex + "/packages/framework/cli".length);
		return path.normalize(root);
	}

	const cliIndex = normalizedPath.indexOf("/packages/cli/");
	if (cliIndex !== -1) {
		const root = normalizedPath.substring(0, cliIndex + "/packages/cli".length);
		return path.normalize(root);
	}

	// Fallback: use relative paths
	const isBuilt = normalizedPath.includes("/dist/");
	if (isBuilt) {
		// Find dist/ and go up to package root
		const distIndex = normalizedPath.indexOf("/dist/");
		if (distIndex !== -1) {
			return path.normalize(normalizedPath.substring(0, distIndex));
		}
		return path.join(__dirname, "..", ".."); // dist/../.. = package root
	}
	return path.join(__dirname, "../.."); // src/../.. = package root
}

/**
 * Find workspace root by traversing up from given path
 *
 * Looks for a `packages/` directory to identify the monorepo root.
 *
 * @param startPath - Path to start searching from
 * @param maxDepth - Maximum directory levels to traverse (default: 10)
 * @returns Workspace root path or null if not found
 */
export async function findWorkspaceRoot(startPath: string, maxDepth: number = 10): Promise<string | null> {
	let currentPath = startPath;

	for (let i = 0; i < maxDepth; i++) {
		const packagesDir = path.join(currentPath, "packages");
		if (await fs.pathExists(packagesDir)) {
			return currentPath;
		}

		const parent = path.dirname(currentPath);
		if (parent === currentPath) {
			break; // Reached filesystem root
		}
		currentPath = parent;
	}

	return null;
}

/**
 * Resolve project-relative path to absolute path
 *
 * Handles paths that may start with `/` (relative to project root)
 * or be actual relative paths.
 *
 * @param projectPath - Absolute path to project root
 * @param filePath - Path to resolve (may start with `/` or be relative)
 * @returns Absolute resolved path
 */
export function resolveProjectPath(projectPath: string, filePath: string): string {
	if (path.isAbsolute(filePath)) {
		// Already absolute, but might be a project-relative path with leading /
		// Check if it exists, otherwise treat as project-relative
		if (fs.existsSync(filePath)) {
			return filePath;
		}
	}

	// Remove leading / if present (project-relative convention)
	const normalizedPath = filePath.startsWith("/") ? filePath.slice(1) : filePath;
	return path.join(projectPath, normalizedPath);
}

/**
 * Get BitCell font paths (dist and assets)
 *
 * @param cliPackageRoot - CLI package root directory
 * @returns Object with dist and assets font paths
 */
export function getBitCellFontPaths(cliPackageRoot: string): {
	dist: string;
	assets: string;
} {
	return {
		dist: path.join(cliPackageRoot, "dist", "assets", "fonts", DEFAULT_FILES.BITCELL_FONT),
		assets: path.join(cliPackageRoot, "assets", "fonts", DEFAULT_FILES.BITCELL_FONT),
	};
}
