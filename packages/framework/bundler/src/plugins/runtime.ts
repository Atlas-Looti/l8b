/**
 * Runtime Plugin - Bundles the L8B runtime for production
 *
 * This plugin is responsible for:
 * 1. Bundling the @l8b/runtime package with proper optimization
 * 2. Creating the Player class
 * 3. Embedding compiled routines
 */

import type { L8BPlugin } from "./index";
import { createLogger } from "@l8b/framework-shared";
import { PLAYER_TEMPLATE } from "../templates/player";
import { INIT_TEMPLATE } from "../templates/init";
import { dirname, join } from "node:path";
import { existsSync, readFileSync, lstatSync } from "node:fs";

const logger = createLogger("runtime-plugin");

/**
 * Find the resolve directory for esbuild to resolve @l8b/runtime
 * This finds the directory where node_modules contains @l8b/runtime
 */
function findResolveDir(projectRoot?: string): string {
	// Helper to find directory containing node_modules with @l8b/runtime
	const findNodeModulesDir = (startDir: string): string | null => {
		let currentDir = startDir;
		while (currentDir !== dirname(currentDir)) {
			const nodeModulesPath = join(currentDir, "node_modules");
			const runtimePath = join(nodeModulesPath, "@l8b", "runtime");

			// Check if @l8b/runtime exists in node_modules (including symlinks)
			if (existsSync(nodeModulesPath)) {
				try {
					// Check if it exists (works for both regular dirs and symlinks)
					if (existsSync(runtimePath)) {
						// Verify it's actually accessible (not a broken symlink)
						try {
							lstatSync(runtimePath);
							return currentDir;
						} catch {
							// Broken symlink, continue searching
						}
					}
				} catch {
					// Ignore errors, continue searching
				}
			}

			currentDir = dirname(currentDir);
		}
		return null;
	};

	// Helper to find workspace root from a starting directory
	const findWorkspaceRoot = (startDir: string): string | null => {
		let currentDir = startDir;
		while (currentDir !== dirname(currentDir)) {
			const pnpmWorkspacePath = join(currentDir, "pnpm-workspace.yaml");
			const packageJsonPath = join(currentDir, "package.json");
			const nodeModulesPath = join(currentDir, "node_modules");

			// Check for pnpm workspace indicator
			if (existsSync(pnpmWorkspacePath) && existsSync(nodeModulesPath)) {
				return currentDir;
			}

			// Check for package.json with workspaces field
			if (existsSync(packageJsonPath) && existsSync(nodeModulesPath)) {
				try {
					const pkgJson = JSON.parse(readFileSync(packageJsonPath, "utf-8"));
					if (pkgJson.workspaces || pkgJson.workspace) {
						return currentDir;
					}
				} catch {
					// Ignore JSON parse errors
				}
			}

			currentDir = dirname(currentDir);
		}
		return null;
	};

	try {
		// First, try to resolve @l8b/runtime to get its location
		const runtimePath = require.resolve("@l8b/runtime");
		const runtimeDir = dirname(runtimePath);

		// Try to find node_modules directory from the resolved path
		const nodeModulesDir = findNodeModulesDir(runtimeDir);
		if (nodeModulesDir) {
			logger.debug(`Found node_modules at: ${nodeModulesDir}`);
			return nodeModulesDir;
		}

		// Fallback: try to find workspace root
		const workspaceRoot = findWorkspaceRoot(runtimeDir);
		if (workspaceRoot) {
			logger.debug(`Found workspace root at: ${workspaceRoot}`);
			return workspaceRoot;
		}
	} catch (err) {
		logger.debug("Could not resolve @l8b/runtime via require.resolve:", err);
	}

	// Fallback: try from project root if provided
	if (projectRoot) {
		const nodeModulesDir = findNodeModulesDir(projectRoot);
		if (nodeModulesDir) {
			return nodeModulesDir;
		}
		const workspaceRoot = findWorkspaceRoot(projectRoot);
		if (workspaceRoot) {
			return workspaceRoot;
		}
	}

	// Fallback: try from process.cwd()
	const nodeModulesDir = findNodeModulesDir(process.cwd());
	if (nodeModulesDir) {
		return nodeModulesDir;
	}
	const workspaceRoot = findWorkspaceRoot(process.cwd());
	if (workspaceRoot) {
		return workspaceRoot;
	}

	// Last resort: use the directory where this bundler package is located
	// This should have @l8b/runtime as a dependency
	try {
		const bundlerPath = require.resolve("@l8b/framework-bundler");
		const bundlerDir = dirname(bundlerPath);
		const nodeModulesDir = findNodeModulesDir(bundlerDir);
		if (nodeModulesDir) {
			logger.debug(`Using bundler's node_modules at: ${nodeModulesDir}`);
			return nodeModulesDir;
		}
	} catch (err) {
		logger.debug("Could not resolve @l8b/framework-bundler");
	}

	// Last resort: use process.cwd()
	logger.warn("Could not find workspace root, using process.cwd() as resolveDir");
	return process.cwd();
}

/**
 * Runtime plugin options
 */
export interface RuntimePluginOptions {
	/** Minify the runtime bundle */
	minify?: boolean;
	/** Include source maps */
	sourcemap?: boolean;
	/** Externalize sources to sources.json (lazy loading) */
	externalSources?: boolean;
}

/**
 * Create runtime plugin
 */
export function runtimePlugin(options: RuntimePluginOptions = {}): L8BPlugin {
	const { minify = false, sourcemap = false, externalSources = false } = options;

	return {
		name: "l8b:runtime",

		buildStart() {
			// No-op: esbuild handles incremental builds automatically
		},

		async generateBundle(files, ctx) {
			logger.info("Generating runtime bundle...");

			try {
				let sourcesCode = "";
				if (externalSources) {
					const sourcesData = generateSourcesData(ctx.resources.sources);
					files.set("sources.json", JSON.stringify(sourcesData));
					sourcesCode = "window.__L8B_EXTERNAL_SOURCES__ = true;";
					logger.info(`Generated sources.json (${(JSON.stringify(sourcesData).length / 1024).toFixed(1)} KB)`);
				} else {
					sourcesCode = generateSourcesCode(ctx.resources.sources);
				}

				const virtualEntry = [
					`import { RuntimeOrchestrator } from "@l8b/runtime";`,
					`window.Runtime = RuntimeOrchestrator;`,
					sourcesCode,
					PLAYER_TEMPLATE,
					INIT_TEMPLATE,
				].join("\n");

				const esbuild = await import("esbuild");
				const resolveDir = findResolveDir(ctx.config.root);
				logger.debug(`Using resolveDir: ${resolveDir}`);

				// Create a plugin to help resolve @l8b/runtime
				const runtimeResolverPlugin = {
					name: "l8b-runtime-resolver",
					setup(build: any) {
						// Intercept imports of @l8b/runtime
						build.onResolve({ filter: /^@l8b\/runtime$/ }, async (args: any) => {
							try {
								// First, try to resolve the package.json to get the package directory
								const packageJsonPath = require.resolve("@l8b/runtime/package.json", {
									paths: [resolveDir, ...(args.resolveDir ? [args.resolveDir] : [])],
								});
								const packageDir = dirname(packageJsonPath);

								// Read package.json to get the module entry point
								const pkgJson = JSON.parse(readFileSync(packageJsonPath, "utf-8"));

								// Prefer module field for ESM, fallback to main
								const entryPoint = pkgJson.module || pkgJson.main || "index.js";
								const resolvedPath = join(packageDir, entryPoint);

								if (existsSync(resolvedPath)) {
									return { path: resolvedPath };
								}

								// Fallback: try to resolve normally
								const normalPath = require.resolve("@l8b/runtime", {
									paths: [resolveDir, ...(args.resolveDir ? [args.resolveDir] : [])],
								});
								return { path: normalPath };
							} catch (err) {
								// Let esbuild handle it normally
								logger.debug("Runtime resolver plugin failed, using default resolution:", err);
								return undefined;
							}
						});
					},
				};

				const result = await esbuild.build({
					stdin: {
						contents: virtualEntry,
						resolveDir,
						sourcefile: "game.js",
						loader: "ts",
					},
					bundle: true,
					format: "iife",
					globalName: "L8BGame",
					splitting: false,
					platform: "browser",
					outdir: ".",
					write: false,
					minify,
					sourcemap: sourcemap ? "inline" : false,
					define: {
						"process.env.NODE_ENV": '"production"',
					},
					mainFields: ["module", "main"],
					resolveExtensions: [".ts", ".tsx", ".mjs", ".js", ".jsx", ".json"],
					logLevel: "warning",
					plugins: [runtimeResolverPlugin],
					// Ensure esbuild can resolve packages from node_modules
					absWorkingDir: resolveDir,
				});

				let mainEntryContent: string | null = null;
				const chunkFiles: Array<{ name: string; content: string }> = [];

				for (const file of result.outputFiles) {
					const fileName = file.path.split("/").pop()!;

					if (fileName === "stdin.js" || (result.outputFiles.length === 1 && !mainEntryContent)) {
						mainEntryContent = file.text;
					} else {
						chunkFiles.push({ name: fileName, content: file.text });
					}
				}

				if (mainEntryContent) {
					files.set("game.js", mainEntryContent);
				} else if (result.outputFiles.length > 0) {
					files.set("game.js", result.outputFiles[0].text);
					logger.warn(`Using first output file as game.js`);
				} else {
					throw new Error("No output files generated from esbuild");
				}

				for (const chunk of chunkFiles) {
					files.set(chunk.name, chunk.content);
				}

				const mainFile = files.get("game.js");
				const sizeKB = mainFile ? ((typeof mainFile === "string" ? mainFile.length : 0) / 1024).toFixed(1) : "0";
				const chunkInfo = chunkFiles.length > 0 ? ` + ${chunkFiles.length} chunks` : "";
				logger.success(`Runtime bundle generated: game.js (${sizeKB} KB${chunkInfo})`);
			} catch (err) {
				logger.error("Failed to generate runtime bundle:", err);
				ctx.errors.push(`Runtime bundle error: ${err}`);
			}
		},
	};
}

function generateSourcesCode(sources: Array<{ name: string; content?: string }>): string {
	const embedded = generateSourcesData(sources);
	return `window.__L8B_SOURCES__ = ${JSON.stringify(embedded)};`;
}

function generateSourcesData(sources: Array<{ name: string; content?: string }>): Record<string, string> {
	const embedded: Record<string, string> = {};

	for (const source of sources) {
		if (source.content) {
			embedded[source.name] = source.content;
		}
	}

	return embedded;
}
