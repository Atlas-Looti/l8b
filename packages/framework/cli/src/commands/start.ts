/**
 * Production server for LootiScript projects
 *
 * Serves the built production output using Vite's preview server.
 */

import fs from "fs-extra";
import path from "path";
import pc from "picocolors";
import type { PreviewServer } from "vite";
import { preview } from "vite";

import { loadConfig } from "../config";
import { DEFAULT_SERVER, FONT } from "../utils/constants";
import { BuildError, ServerError } from "../utils/errors";
import { DEFAULT_DIRS, DEFAULT_FILES } from "../utils/paths";
import { handleRuntimeLogRequest } from "../utils/runtime-logs";

/**
 * Production server options
 */
export interface StartOptions {
	/** Port to run server on */
	port?: number;
	/** Host to bind to (false = localhost, true = 0.0.0.0, string = specific host) */
	host?: string | boolean;
}

/**
 * Start production server for built project
 *
 * @param projectPath - Absolute path to project root
 * @param options - Server configuration options
 * @returns Vite preview server instance
 * @throws {BuildError} If build output is missing
 * @throws {ServerError} If server fails to start
 */
export async function start(projectPath: string = process.cwd(), options: StartOptions = {}): Promise<PreviewServer> {
	const config = await loadConfig(projectPath);
	const distDir = path.join(projectPath, DEFAULT_DIRS.BUILD_OUTPUT);

	// Check if build exists
	if (!(await fs.pathExists(distDir))) {
		throw new BuildError("No build found. Please run `l8b build` first.", {
			projectPath,
			distDir,
		});
	}

	const indexHtml = path.join(distDir, DEFAULT_FILES.INDEX_HTML);
	if (!(await fs.pathExists(indexHtml))) {
		throw new BuildError("No index.html found in build output. Please run `l8b build` first.", {
			projectPath,
			distDir,
			indexHtml,
		});
	}

	// Get port and host from config or options
	const port = options.port || config.dev?.port || DEFAULT_SERVER.PORT;
	const host = options.host !== undefined ? options.host : (config.dev?.host ?? DEFAULT_SERVER.HOST);
	const normalizedHost = typeof host === "boolean" ? (host ? "0.0.0.0" : "localhost") : host;

	console.log(pc.cyan("\n  🚀 Starting production server...\n"));
	console.log(pc.gray(`  Project: ${projectPath}\n`));

	try {
		const server = await preview({
			root: projectPath,
			build: {
				outDir: DEFAULT_DIRS.BUILD_OUTPUT,
				emptyOutDir: false,
			},
			preview: {
				port,
				host: normalizedHost,
				strictPort: false,
			},
			plugins: [
				{
					name: "l8b-preview-font-server",
					configurePreviewServer(server) {
						// Add middleware to serve fonts explicitly
						server.middlewares.use(async (req, res, next) => {
							if (handleRuntimeLogRequest(req, res)) {
								return;
							}

							// Handle font requests
							const fontUrl = `/fonts/${DEFAULT_FILES.BITCELL_FONT}`;
							if (req.url && (req.url === fontUrl || req.url.startsWith(fontUrl))) {
								const fontPath = path.join(distDir, DEFAULT_DIRS.FONTS, DEFAULT_FILES.BITCELL_FONT);
								if (await fs.pathExists(fontPath)) {
									try {
										const fontData = await fs.readFile(fontPath);
										res.setHeader("Content-Type", FONT.CONTENT_TYPE);
										res.setHeader("Cache-Control", FONT.CACHE_CONTROL);
										res.end(fontData);
										return;
									} catch (error) {
										console.error("[L8B CLI] Error serving font:", error);
									}
								}
							}
							next();
						});
					},
				},
			],
		});

		console.log("\n🚀 Production server running!\n");
		server.printUrls();

		/**
		 * Cleanup function for graceful shutdown
		 */
		const cleanup = async () => {
			console.log("\n\nShutting down server...");
			try {
				// Vite preview returns a PreviewServer
				// Close the underlying http server if available
				if (server.httpServer) {
					await new Promise<void>((resolve, reject) => {
						server.httpServer!.close((err) => {
							if (err) reject(err);
							else resolve();
						});
					});
				}
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
		if (error instanceof BuildError || error instanceof ServerError) {
			throw error;
		}
		throw new ServerError("Failed to start production server", {
			error: error instanceof Error ? error.message : String(error),
			projectPath,
			distDir,
		});
	}
}
