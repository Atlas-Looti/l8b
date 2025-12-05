/**
 * Vite Dev Server Adapter
 *
 * Implementation of IDevServer using Vite
 */

import chokidar from "chokidar";
import path from "path";
import pc from "picocolors";
import type { ViteDevServer as ViteServer } from "vite";
import { createServer } from "vite";
import type { DevServerOptions, IDevServer } from "../../core/ports";
import type { Resources as ResourcesEntity } from "../../core/types";
import type { DetectResourcesUseCase, GenerateHTMLUseCase, LoadConfigUseCase, LoadSourcesUseCase } from "../../core/use-cases";
import { DEFAULT_SERVER } from "../../utils/constants";
import { ServerError } from "../../utils/errors";
import { DEFAULT_DIRS, DEFAULT_FILES } from "../../utils/paths";
import { findMatchingRoute } from "../../utils/route-params";
import { handleRuntimeLogRequest } from "../../utils/runtime-logs";
import { isCloudflaredAvailable, startCloudflaredTunnel, updateManifestForTunnel } from "../../utils/tunnel";
import { NodeFileSystem } from "./file-system";
import { loadEnvFiles } from "./env-loader";
import { generateFarcasterManifestJSON } from "./generator/farcaster-manifest-generator.adapter";
import { generateOGImagePage } from "./generator/og-image-generator.adapter";
import { createLootiScriptPlugin } from "./vite-plugin";
import { isFailure } from "../../core/types";

/**
 * Get MIME type for file extension
 */
function getMimeType(filePath: string): { type: string; charset?: string } {
	const ext = path.extname(filePath).toLowerCase();
	const mimeTypes: Record<string, { type: string; charset?: string }> = {
		".html": { type: "text/html", charset: "utf-8" },
		".js": { type: "application/javascript", charset: "utf-8" },
		".mjs": { type: "application/javascript", charset: "utf-8" },
		".json": { type: "application/json", charset: "utf-8" },
		".css": { type: "text/css", charset: "utf-8" },
		".png": { type: "image/png" },
		".jpg": { type: "image/jpeg" },
		".jpeg": { type: "image/jpeg" },
		".gif": { type: "image/gif" },
		".svg": { type: "image/svg+xml" },
		".webp": { type: "image/webp" },
		".wav": { type: "audio/wav" },
		".mp3": { type: "audio/mpeg" },
		".ogg": { type: "audio/ogg" },
		".ttf": { type: "font/ttf" },
		".woff": { type: "font/woff" },
		".woff2": { type: "font/woff2" },
	};
	return mimeTypes[ext] || { type: "application/octet-stream" };
}

export class ViteDevServer implements IDevServer {
	constructor(
		private loadConfigUseCase: LoadConfigUseCase,
		private loadSourcesUseCase: LoadSourcesUseCase,
		private detectResourcesUseCase: DetectResourcesUseCase,
		private generateHTMLUseCase: GenerateHTMLUseCase,
	) {}

	async start(projectPath: string, options?: DevServerOptions): Promise<ViteServer> {
		try {
			const configResult = await this.loadConfigUseCase.execute(projectPath);
			if (isFailure(configResult)) {
				throw new ServerError("Failed to load configuration", { originalError: configResult.error });
			}
			const config = configResult.data;

			// Get port and host from config or options
			const port = options?.port || config.dev?.port || DEFAULT_SERVER.PORT;
			const host = options?.host !== undefined ? options.host : (config.dev?.host ?? DEFAULT_SERVER.HOST);

			// Setup file watcher for HMR
			const watchPaths = [
				path.join(projectPath, DEFAULT_DIRS.PUBLIC),
				path.join(projectPath, DEFAULT_DIRS.SCRIPTS),
				path.join(projectPath, DEFAULT_FILES.CONFIG),
			];

			const watcher = chokidar.watch(watchPaths, {
				ignored: /(^|[/\\])\../, // ignore dotfiles
				persistent: true,
				ignoreInitial: true,
			});

			// Tunnel URL will be set after server starts (if tunnel is enabled)
			let tunnelUrl: string | null = null;

			const fileSystem = new NodeFileSystem();
			// Capture use cases for use in plugin callbacks
			const loadSourcesUseCase = this.loadSourcesUseCase;
			const detectResourcesUseCase = this.detectResourcesUseCase;
			const generateHTMLUseCase = this.generateHTMLUseCase;

			const server = await createServer({
				root: projectPath,
				server: {
					port,
					host: typeof host === "boolean" ? (host ? "0.0.0.0" : "localhost") : host,
					strictPort: false,
				},
				resolve: {
					alias: {
						// Provide buffer polyfill for browser compatibility
						// This allows libraries like bn.js to work in the browser
						buffer: "buffer",
					},
				},
				define: {
					// Provide global Buffer for libraries that expect it
					global: "globalThis",
				},
				plugins: [
					createLootiScriptPlugin(fileSystem),
					{
						name: "watch-public-dir",
						enforce: "post",
						handleHotUpdate({ file, server }) {
							const publicDirPrefix = path.resolve(projectPath, DEFAULT_DIRS.PUBLIC) + path.sep;
							const normalizedFile = path.normalize(file);

							if (normalizedFile.startsWith(publicDirPrefix)) {
								const relativeFilePath = path.relative(projectPath, normalizedFile);
								console.log(`syncing asset file "${relativeFilePath}"...`);

								// Trigger full reload for public directory changes
								server.ws.send({
									type: "full-reload",
									path: "*",
								});
							}
						},
					},
					{
						name: "l8b-runtime-server",
						configureServer(server) {
							// Serve runtime.js and compiled modules from .l8b directory
							// This must run BEFORE other middlewares
							server.middlewares.use(async (req, res, next) => {
								if (!req.url) {
									next();
									return;
								}

								const fileSystem = new NodeFileSystem();
								const distDir = path.join(projectPath, DEFAULT_DIRS.BUILD_OUTPUT);

								// Serve runtime.js from .l8b directory
								if (req.url === "/runtime.js" || req.url.startsWith("/runtime.js?")) {
									const runtimePath = path.join(distDir, "runtime.js");
									if (await fileSystem.pathExists(runtimePath)) {
										try {
											const data = await fileSystem.readFile(runtimePath);
											const mimeInfo = getMimeType(runtimePath);
											const contentType = mimeInfo.charset ? `${mimeInfo.type}; charset=${mimeInfo.charset}` : mimeInfo.type;
											res.setHeader("Content-Type", contentType);
											res.setHeader("Cache-Control", "no-cache");
											res.end(data);
											return;
										} catch (error) {
											console.error("Error serving runtime.js:", error);
										}
									}
								}

								// Serve compiled modules from .l8b/compiled directory
								if (req.url.startsWith("/compiled/")) {
									const urlPath = req.url.split("?")[0]; // Remove query string
									const relativePath = urlPath.replace("/compiled/", "");
									const compiledPath = path.join(distDir, "compiled", relativePath);

									// Security check
									const resolvedPath = path.resolve(compiledPath);
									const resolvedDist = path.resolve(path.join(distDir, "compiled"));
									if (resolvedPath.startsWith(resolvedDist)) {
										if (await fileSystem.pathExists(compiledPath)) {
											try {
												const data = await fileSystem.readFile(compiledPath);
												const mimeInfo = getMimeType(compiledPath);
												const contentType = mimeInfo.charset ? `${mimeInfo.type}; charset=${mimeInfo.charset}` : mimeInfo.type;
												res.setHeader("Content-Type", contentType);
												res.setHeader("Cache-Control", "no-cache");
												res.end(data);
												return;
											} catch (error) {
												console.error(`Error serving compiled module ${req.url}:`, error);
											}
										}
									}
								}

								next();
							});
						},
					},
					{
						name: "l8b-html-generator",
						configureServer(server) {
							// Place middleware BEFORE other middlewares to catch font requests early
							server.middlewares.use(async (req, res, next) => {
								// Skip Vite internal requests and static assets
								if (
									req.url &&
									(req.url.startsWith("/@vite/") ||
										req.url.startsWith("/@id/") ||
										req.url.startsWith("/@fs/") ||
										req.url.startsWith("/node_modules/") ||
										req.url.startsWith("/runtime.js") ||
										req.url.startsWith("/compiled/") ||
										path
											.extname(req.url || "")
											.match(/\.(js|css|json|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot|mp3|wav|ogg|webm|mp4|map)$/i))
								) {
									next();
									return;
								}

								if (handleRuntimeLogRequest(req, res)) {
									return;
								}

								// Serve Farcaster manifest at /.well-known/farcaster.json
								if (req.url === "/.well-known/farcaster.json") {
									try {
										let manifestJson = generateFarcasterManifestJSON(config);
										if (manifestJson) {
											// Update manifest URL if tunnel is active
											if (tunnelUrl) {
												manifestJson = updateManifestForTunnel(manifestJson, tunnelUrl);
											}
											res.statusCode = 200;
											res.setHeader("Content-Type", "application/json");
											res.setHeader("Cache-Control", "public, max-age=3600");
											res.end(manifestJson);
											return;
										} else {
											// No manifest configured - return 404
											res.statusCode = 404;
											res.end("Not Found");
											return;
										}
									} catch (error) {
										console.error("Error generating manifest:", error);
										res.statusCode = 500;
										res.end("Error generating manifest: " + String(error));
										return;
									}
								}

								// Serve dynamic OG images at /og-image/:route
								if (req.url && req.url.startsWith("/og-image")) {
									try {
										const urlPath = req.url.split("?")[0];
										const routePath = urlPath.replace("/og-image", "") || "/";

										// Extract route parameters if route has dynamic segments
										const embedRoutes = config.farcaster?.embeds ? Object.keys(config.farcaster.embeds) : [];

										const match = findMatchingRoute(embedRoutes, routePath);
										const params = match?.params || {};

										// Load sources for OG image generation
										const sourcesResult = await loadSourcesUseCase.execute(projectPath);
										if (isFailure(sourcesResult)) {
											throw new Error(`Failed to load sources: ${sourcesResult.error.message}`);
										}
										const currentSources = sourcesResult.data;

										// Generate OG image page
										const ogImagePage = generateOGImagePage(
											config,
											{
												routePath,
												params,
												width: 1200, // 3:2 aspect ratio for Farcaster
												height: 800,
											},
											currentSources,
										);

										res.statusCode = 200;
										res.setHeader("Content-Type", "text/html");
										res.setHeader("Cache-Control", "public, max-age=300"); // Cache for 5 minutes
										res.end(ogImagePage);
										return;
									} catch (error) {
										console.error("Error generating OG image page:", error);
										res.statusCode = 500;
										res.end("Error generating OG image: " + String(error));
										return;
									}
								}

								// Handle all HTML requests (for per-route embeds)
								// Extract route path from URL
								const url = req.url || "/";
								const routePath = url.split("?")[0]; // Remove query params

								// Only handle root/index.html or paths that don't have file extensions
								const isHtmlRequest =
									url === "/" ||
									url === `/${DEFAULT_FILES.INDEX_HTML}` ||
									(!path.extname(routePath) &&
										!url.startsWith("/compiled/") &&
										!url.startsWith("/runtime.js") &&
										!url.startsWith("/@"));

								if (isHtmlRequest) {
									try {
										// Load sources and resources with retry logic for race conditions
										let currentSources: Record<string, string> = {};
										let currentResources: ResourcesEntity = {
											images: [],
											maps: [],
											sounds: [],
											music: [],
											assets: [],
										};
										let envVars: Record<string, string> = {};
										let retries = 3;
										let lastError: Error | null = null;

										while (retries > 0) {
											try {
												const [sourcesResult, resourcesResult, envVarsResult] = await Promise.all([
													loadSourcesUseCase.execute(projectPath),
													detectResourcesUseCase.execute(projectPath),
													loadEnvFiles(projectPath, fileSystem, "development"),
												]);

												if (isFailure(sourcesResult)) {
													throw new Error(`Failed to load sources: ${sourcesResult.error.message}`);
												}
												if (isFailure(resourcesResult)) {
													throw new Error(`Failed to detect resources: ${resourcesResult.error.message}`);
												}

												currentSources = sourcesResult.data;
												currentResources = resourcesResult.data;
												envVars = envVarsResult;

												// Validate sources are loaded
												if (Object.keys(currentSources).length === 0) {
													throw new Error(
														"No LootiScript source files found. Make sure you have .loot files in the src/ directory.",
													);
												}

												// Success - break retry loop
												break;
											} catch (error) {
												lastError = error instanceof Error ? error : new Error(String(error));
												retries--;
												if (retries > 0) {
													// Wait a bit before retrying (race condition with file system)
													await new Promise((resolve) => setTimeout(resolve, 50));
												}
											}
										}

										if (retries === 0 && lastError) {
											throw lastError;
										}

										const html = generateHTMLUseCase.execute(
											config,
											currentSources,
											currentResources,
											undefined, // compiledModules (dev mode)
											routePath, // routePath for per-route embeds
											envVars, // environment variables
										);

										res.statusCode = 200;
										res.setHeader("Content-Type", "text/html");

										// Transform HTML through Vite (for HMR scripts, etc)
										const transformedHtml = await server.transformIndexHtml(req.url || "/", html);

										res.end(transformedHtml);
										return;
									} catch (error) {
										const errorMessage = error instanceof Error ? error.message : String(error);
										console.error("Error generating HTML:", errorMessage);
										console.error("Full error:", error);
										res.statusCode = 500;
										res.setHeader("Content-Type", "text/html; charset=utf-8");
										res.end(
											`<!DOCTYPE html>
<html>
<head>
	<title>L8B Dev Server Error</title>
	<style>
		body { font-family: monospace; padding: 20px; background: #1e1e1e; color: #d4d4d4; }
		h1 { color: #f48771; }
		pre { background: #252526; padding: 10px; border-radius: 4px; overflow-x: auto; }
	</style>
</head>
<body>
	<h1>Error generating HTML</h1>
	<pre>${errorMessage}</pre>
	<p>Check the terminal for more details.</p>
</body>
</html>`,
										);
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
						"buffer",
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
						define: {
							global: "globalThis",
						},
						target: "es2022",
					},
				},
				// Public directory for static assets
				publicDir: path.join(projectPath, DEFAULT_DIRS.PUBLIC),
			});

			await server.listen();

			let tunnelProcess: import("child_process").ChildProcess | null = null;

			// Start tunnel if requested
			if (options?.tunnel) {
				try {
					const available = await isCloudflaredAvailable();
					if (!available) {
						console.warn(
							pc.yellow(
								"\n⚠️  cloudflared not found. Install it from:\n" +
									"   https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/install-and-setup/installation/\n" +
									"   Or use: brew install cloudflared (macOS) / choco install cloudflared (Windows)\n",
							),
						);
					} else {
						const actualPort = server.config.server?.port || port;
						const tunnel = await startCloudflaredTunnel(actualPort);
						tunnelProcess = tunnel.process;
						tunnelUrl = tunnel.url;

						console.log(
							pc.green("\n🔗 Tunnel active!\n"),
							pc.cyan(`   Tunnel URL: ${tunnelUrl}\n`),
							pc.gray("   Use this URL in Farcaster Mini App preview tool\n"),
						);

						console.log(pc.gray("   Tip: Install 'qrcode-terminal' for QR code generation\n"));
					}
				} catch (error) {
					console.error(pc.red("\n✗ Failed to start tunnel:\n"), error instanceof Error ? error.message : String(error));
					console.log(pc.gray("\n   Continuing without tunnel...\n"));
				}
			}

			console.log("\n🚀 L8B Dev Server running!\n");
			server.printUrls();

			/**
			 * Cleanup function for graceful shutdown
			 */
			const cleanup = async () => {
				console.log("\n\nShutting down server...");
				try {
					// Kill tunnel process if active
					if (tunnelProcess) {
						tunnelProcess.kill();
					}
					if (watcher) await watcher.close();
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

			let suggestion = "Check if the port is already in use.";
			if (error instanceof Error && error.message.includes("EADDRINUSE")) {
				suggestion = `Port ${options?.port || DEFAULT_SERVER.PORT} is already in use. Try using a different port with --port <number>.`;
			}

			throw new ServerError("Failed to start development server", {
				error: error instanceof Error ? error.message : String(error),
				projectPath,
				suggestion,
			});
		}
	}
}
