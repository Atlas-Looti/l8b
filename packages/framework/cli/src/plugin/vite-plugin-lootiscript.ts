/**
 * Vite plugin for LootiScript (.loot) files
 *
 * Handles .loot file imports with ?raw query parameter and provides
 * hot module replacement for LootiScript source files.
 */

import type { Plugin } from "vite";
import fs from "fs-extra";
import path from "path";
import { ModuleGraph } from "../utils/module-graph";
import { getModuleName } from "../utils/loot-dependencies";

/**
 * File cache entry
 */
interface FileCacheEntry {
	content: string;
	mtime: number;
}

// Simple cache for file reads (cleared on file changes via HMR)
const fileCache = new Map<string, FileCacheEntry>();

/**
 * Vite plugin for LootiScript files
 *
 * @returns Vite plugin instance
 */
export function lootiScriptPlugin(): Plugin {
	let root: string = "";
	let moduleGraph: ModuleGraph | null = null;

	return {
		name: "vite-plugin-lootiscript",
		enforce: "pre",

		configResolved(config) {
			root = config.root;
			moduleGraph = new ModuleGraph(root);
		},

		async load(id) {
			// Handle .loot?raw imports - return the file content as a string
			if (!id.endsWith(".loot") && !id.includes(".loot?")) {
				return null;
			}

			// Remove query params and get clean file path
			let filePath = id.replace(/\?raw$/, "").replace(/\?.*$/, "");

			// Resolve path relative to root if it's a relative/absolute path from Vite
			if (!path.isAbsolute(filePath)) {
				if (filePath.startsWith("/")) {
					// Vite sometimes passes paths starting with /, resolve from root
					filePath = path.join(root, filePath.slice(1));
				} else {
					// Relative path, resolve from root
					filePath = path.join(root, filePath);
				}
			}

			// Normalize path
			filePath = path.normalize(filePath);

			// Check cache first
			try {
				const stat = await fs.stat(filePath);
				const cached = fileCache.get(filePath);

				if (cached && cached.mtime === stat.mtimeMs) {
					// Return cached content
					return `export default ${JSON.stringify(cached.content)};`;
				}

				// Read and cache file
				const content = await fs.readFile(filePath, "utf-8");
				fileCache.set(filePath, { content, mtime: stat.mtimeMs });

				// Update module graph
				if (moduleGraph) {
					await moduleGraph.addModule(filePath);
				}

				// Return as string export for ?raw imports
				return `export default ${JSON.stringify(content)};`;
			} catch (error) {
				// File doesn't exist or can't be read
				const err = error as NodeJS.ErrnoException;
				if (err.code === "ENOENT") {
					return null;
				}
				console.error(`Error reading .loot file ${filePath}:`, error);
				return null;
			}
		},

		async handleHotUpdate({ file, server }) {
			// Handle .loot file changes
			if (file.endsWith(".loot")) {
				// Clear cache for changed file
				fileCache.delete(file);

				if (!moduleGraph) {
					// Fallback to full reload if module graph not initialized
					server.ws.send({
						type: "full-reload",
						path: "*",
					});
					return [];
				}

				// Update module graph with changed file
				const moduleName = getModuleName(file, root);
				await moduleGraph.addModule(file);

				// Get affected modules (changed module + all dependents)
				const affectedModules = moduleGraph.getAffectedModules(moduleName);

				// Send incremental HMR update
				// For now, we still do full reload but can be optimized further
				// to only reload affected modules
				if (affectedModules.length > 0) {
					server.ws.send({
						type: "full-reload",
						path: "*",
					});
				}

				// Return affected modules for Vite's HMR system
				// Vite expects ModuleNode[] but we'll return file paths
				// The full reload will handle the update
				return [];
			}
		},

		configureServer(server) {
			// Ensure .loot files are served with correct MIME type
			server.middlewares.use((req, res, next) => {
				if (req.url?.endsWith(".loot")) {
					res.setHeader("Content-Type", "text/plain");
				}
				next();
			});
		},
	};
}
