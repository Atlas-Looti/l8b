/**
 * LootiScript dependency parser
 *
 * Parses .loot files to extract dependencies and build a module graph.
 * Used for incremental HMR and build optimization.
 */

import fs from "fs-extra";
import path from "path";

/**
 * Parse dependencies from a .loot file
 *
 * Currently, LootiScript doesn't have explicit import statements,
 * but we can track file references and potential dependencies.
 * For now, we'll return an empty array, but this can be extended
 * when LootiScript adds module system support.
 *
 * @param filePath - Path to .loot file
 * @param content - File content (optional, will read if not provided)
 * @returns Array of dependency module names
 */
export async function parseLootDependencies(
	filePath: string,
	content?: string,
): Promise<string[]> {
	if (!content) {
		content = await fs.readFile(filePath, "utf-8");
	}

	const dependencies: string[] = [];

	// Future: Parse import statements if LootiScript adds them
	// For now, we can track potential dependencies based on:
	// - File references in comments
	// - String literals that look like file paths
	// - etc.

	// Example pattern matching (can be extended):
	// Look for patterns like: require("module"), import("module"), etc.
	const importPatterns = [
		/require\s*\(\s*["']([^"']+)["']\s*\)/g,
		/import\s*\(\s*["']([^"']+)["']\s*\)/g,
		/from\s+["']([^"']+)["']/g,
	];

	for (const pattern of importPatterns) {
		let match;
		while ((match = pattern.exec(content)) !== null) {
			const dep = match[1];
			if (dep && !dependencies.includes(dep)) {
				dependencies.push(dep);
			}
		}
	}

	return dependencies;
}

/**
 * Get module name from file path
 *
 * @param filePath - Absolute or relative file path
 * @param projectPath - Project root path
 * @returns Module name (without .loot extension)
 */
export function getModuleName(filePath: string, projectPath: string): string {
	const relative = path.relative(projectPath, filePath);
	return relative.replace(/\.loot$/, "").replace(/\\/g, "/");
}
