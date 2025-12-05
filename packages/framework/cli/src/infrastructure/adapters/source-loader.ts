/**
 * Source Loader Adapter
 *
 * Implementation of ISourceLoader for loading .loot files
 */

import path from "path";
import type { IFileSystem, ILogger, ISourceLoader } from "../../core/ports";
import { DEFAULT_DIRS } from "../../utils/paths";

/**
 * Recursively find all .loot files in a directory
 */
async function findLootFiles(dir: string, fileSystem: IFileSystem, logger?: ILogger): Promise<string[]> {
	if (!(await fileSystem.pathExists(dir))) {
		return [];
	}

	const results: string[] = [];

	try {
		const entries = await fileSystem.readdir(dir, {
			withFileTypes: true,
		});

		// Process entries in parallel where possible
		const fileTasks: Promise<string[]>[] = [];

		for (const entry of entries as import("fs").Dirent[]) {
			const filePath = path.join(dir, entry.name);

			if (entry.isDirectory()) {
				// Recursively scan subdirectories
				fileTasks.push(findLootFiles(filePath, fileSystem, logger));
			} else if (entry.isFile() && entry.name.endsWith(".loot")) {
				results.push(filePath);
			}
		}

		// Wait for all subdirectory scans to complete
		if (fileTasks.length > 0) {
			const subResults = await Promise.all(fileTasks);
			results.push(...subResults.flat());
		}
	} catch (error) {
		// Silently ignore ENOENT, log other errors
		const err = error as NodeJS.ErrnoException;
		if (err.code !== "ENOENT" && logger) {
			logger.warn(`Failed to scan directory ${dir}`);
		}
	}

	return results;
}

export class SourceLoader implements ISourceLoader {
	constructor(
		private fileSystem: IFileSystem,
		private logger?: ILogger,
	) {}

	async loadSources(projectPath: string): Promise<Record<string, string>> {
		const sources: Record<string, string> = {};

		// Check for standard location
		const scriptsDir = path.join(projectPath, DEFAULT_DIRS.SCRIPTS);

		// Scan for .loot files
		const allFiles = await findLootFiles(scriptsDir, this.fileSystem, this.logger);

		// Process files to create module names
		for (const file of allFiles) {
			// Create a module name relative to the scripts directory
			// e.g. src/main.loot -> main
			// src/scenes/level1.loot -> scenes/level1
			const relativePath = path.relative(scriptsDir, file);
			const name = relativePath.replace(/\.loot$/, "").replace(/\\/g, "/");

			// For dev server with Vite, we return the file path (relative to project root)
			const relativeToProject = path.relative(projectPath, file).replace(/\\/g, "/");
			sources[name] = "/" + relativeToProject;
		}

		return sources;
	}

	async readSourceContent(filePath: string): Promise<string> {
		return await this.fileSystem.readFile(filePath, "utf-8");
	}
}
