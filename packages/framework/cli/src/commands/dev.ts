/**
 * Development server for LootiScript projects
 *
 * Provides hot module replacement (HMR) and live reloading
 * for LootiScript game development.
 */

import { createServer } from "vite";
import type { ViteDevServer } from "vite";
import path from "path";
import chokidar from "chokidar";
import fs from "fs-extra";

import { loadConfig } from "../config";
import { detectResources } from "../loader/auto-detect";
import { loadSources } from "../loader/source-loader";
import { generateHTML } from "../generator/html-generator";
import { lootiScriptPlugin } from "../plugin/vite-plugin-lootiscript";
import {
	getCliPackageRoot,
	getBitCellFontPaths,
	DEFAULT_DIRS,
	DEFAULT_FILES,
} from "../utils/paths";
import { DEFAULT_SERVER, FONT } from "../utils/constants";
import { handleRuntimeLogRequest } from "../utils/runtime-logs";
import { ServerError } from "../utils/errors";
import {
	computeHash,
	getCached,
	setCached,
	clearCache,
	type CacheOptions,
} from "../utils/cache";
import type { Resources } from "@l8b/runtime";

/**
 * Development server options
 */
export interface DevOptions {
	/** Port to run server on */
	port?: number;
	/** Host to bind to (false = localhost, true = 0.0.0.0, string = specific host) */
	host?: string | boolean;
}

const cliPackageRoot = getCliPackageRoot();

/**
 * Start development server for LootiScript project
 *
 * @param projectPath - Absolute path to project root
 * @param options - Server configuration options
 * @returns Vite dev server instance
 * @throws {ServerError} If server fails to start
 */
export async function dev(
	projectPath: string = process.cwd(),
	options: DevOptions = {},
): Promise<ViteDevServer> {
	try {
		const config = await loadConfig(projectPath);

		// Get port and host from config or options
		const port = options.port || config.dev?.port || DEFAULT_SERVER.PORT;
		const host =
			options.host !== undefined
				? options.host
				: (config.dev?.host ?? DEFAULT_SERVER.HOST);

		// Setup file watchers to invalidate cache on changes
		const watchPaths = [
			path.join(projectPath, DEFAULT_DIRS.PUBLIC),
			path.join(projectPath, DEFAULT_DIRS.SCRIPTS),
			path.join(projectPath, DEFAULT_DIRS.SRC_L8B_LS),
			path.join(projectPath, DEFAULT_FILES.CONFIG),
		];

		const watcher = chokidar.watch(watchPaths, {
			ignored: /(^|[\/\\])\../, // ignore dotfiles
			persistent: true,
			ignoreInitial: true,
		});

		// Setup persistent cache directory
		const cacheDir = path.join(projectPath, DEFAULT_DIRS.BUILD_OUTPUT, "cache");
		const resourcesCacheOptions: CacheOptions = {
			cacheDir,
			key: "resources",
		};
		const sourcesCacheOptions: CacheOptions = {
			cacheDir,
			key: "sources",
		};

		// Clear cache on file changes
		const clearCacheOnChange = async () => {
			await Promise.all([
				clearCache(resourcesCacheOptions),
				clearCache(sourcesCacheOptions),
			]);
		};

		watcher.on("change", clearCacheOnChange);
		watcher.on("add", clearCacheOnChange);
		watcher.on("unlink", clearCacheOnChange);

		/**
		 * Get or cache resources with hash-based invalidation
		 */
		const getResources = async (): Promise<Resources> => {
			// Compute hash for resources (public directory and config)
			const hashPaths = [DEFAULT_DIRS.PUBLIC, DEFAULT_FILES.CONFIG];
			const currentHash = await computeHash(projectPath, hashPaths);

			// Try to get from cache
			const cached = await getCached<Resources>(
				resourcesCacheOptions,
				currentHash,
			);
			if (cached !== null) {
				return cached;
			}

			// Cache miss, detect resources
			const resources = await detectResources(projectPath);
			await setCached(resourcesCacheOptions, resources, currentHash);
			return resources;
		};

		/**
		 * Get or cache sources with hash-based invalidation
		 */
		const getSources = async (): Promise<Record<string, string>> => {
			// Compute hash for sources (scripts directories)
			const hashPaths = [DEFAULT_DIRS.SCRIPTS, DEFAULT_DIRS.SRC_L8B_LS];
			const currentHash = await computeHash(projectPath, hashPaths);

			// Try to get from cache
			const cached = await getCached<Record<string, string>>(
				sourcesCacheOptions,
				currentHash,
			);
			if (cached !== null) {
				return cached;
			}

			// Cache miss, load sources
			const sources = await loadSources(projectPath);
			await setCached(sourcesCacheOptions, sources, currentHash);
			return sources;
		};

		const server = await createServer({
			root: projectPath,
			server: {
				port,
				host:
					typeof host === "boolean" ? (host ? "0.0.0.0" : "localhost") : host,
				strictPort: false,
			},
			plugins: [
				lootiScriptPlugin(),
				{
					name: "l8b-html-generator",
					configureServer(server) {
						// Get font paths
						const fontPaths = getBitCellFontPaths(cliPackageRoot);
						const normalizedDistFontPath = path.normalize(fontPaths.dist);
						const normalizedAssetsFontPath = path.normalize(fontPaths.assets);

						// Place middleware BEFORE other middlewares to catch font requests early
						server.middlewares.use(async (req, res, next) => {
							if (handleRuntimeLogRequest(req, res)) {
								return;
							}

							// Serve BitCell font from CLI package
							const fontUrl = `/fonts/${DEFAULT_FILES.BITCELL_FONT}`;
							if (
								req.url &&
								(req.url === fontUrl || req.url.startsWith(fontUrl))
							) {
								// Try dist first, then assets
								let fontPath = normalizedDistFontPath;
								if (!(await fs.pathExists(fontPath))) {
									fontPath = normalizedAssetsFontPath;
								}

								if (await fs.pathExists(fontPath)) {
									try {
										const fontData = await fs.readFile(fontPath);
										res.setHeader("Content-Type", FONT.CONTENT_TYPE);
										res.setHeader("Cache-Control", FONT.CACHE_CONTROL);
										res.end(fontData);
										return;
									} catch (error) {
										console.error(
											"[L8B CLI] Error serving BitCell font:",
											error,
										);
									}
								} else {
									console.warn(
										`[L8B CLI] BitCell font not found. Tried:\n  ${normalizedDistFontPath}\n  ${normalizedAssetsFontPath}`,
									);
								}
							}

							// Only handle root/index.html requests
							if (
								req.url === "/" ||
								req.url === `/${DEFAULT_FILES.INDEX_HTML}`
							) {
								try {
									// Use cached versions when possible
									const [currentSources, currentResources] = await Promise.all([
										getSources(),
										getResources(),
									]);

									const html = generateHTML(
										config,
										currentSources,
										currentResources,
									);

									res.statusCode = 200;
									res.setHeader("Content-Type", "text/html");

									// Transform HTML through Vite (for HMR scripts, etc)
									const transformedHtml = await server.transformIndexHtml(
										req.url || "/",
										html,
									);

									res.end(transformedHtml);
									return;
								} catch (error) {
									console.error("Error generating HTML:", error);
									res.statusCode = 500;
									res.end("Error generating HTML: " + String(error));
									return;
								}
							}
							next();
						});
					},
				},
			],
			// Optimize dependencies for faster startup
			optimizeDeps: {
				include: [
					"@l8b/runtime",
					"@l8b/vm",
					"@l8b/screen",
					"@l8b/audio",
					"@l8b/input",
					"@l8b/time",
					"@l8b/sprites",
					"@l8b/map",
					"@l8b/io",
				],
				esbuildOptions: {
					target: "es2022",
				},
			},
			// Public directory for static assets
			publicDir: path.join(projectPath, DEFAULT_DIRS.PUBLIC),
		});

		await server.listen();

		console.log("\n🚀 L8B Dev Server running!\n");
		server.printUrls();

		/**
		 * Cleanup function for graceful shutdown
		 */
		const cleanup = async () => {
			console.log("\n\nShutting down server...");
			try {
				await watcher.close();
				await server.close();
				process.exit(0);
			} catch (error) {
				console.error("Error during cleanup:", error);
				process.exit(1);
			}
		};

		process.on("SIGTERM", cleanup);
		process.on("SIGINT", cleanup);

		// Handle uncaught errors
		process.on("unhandledRejection", (reason) => {
			console.error("Unhandled rejection:", reason);
		});

		return server;
	} catch (error) {
		if (error instanceof ServerError) {
			throw error;
		}
		throw new ServerError("Failed to start development server", {
			error: error instanceof Error ? error.message : String(error),
			projectPath,
		});
	}
}
