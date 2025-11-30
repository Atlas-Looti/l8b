/**
 * Development server for LootiScript projects
 *
 * Provides hot module replacement (HMR) and live reloading
 * for LootiScript game development.
 */

import chokidar from "chokidar";
import fs from "fs-extra";
import path from "path";
import pc from "picocolors";
import type { ViteDevServer } from "vite";
import { createServer } from "vite";
import { loadConfig } from "../config";
import { generateFarcasterManifestJSON } from "../generator/farcaster-manifest";
import { generateHTML } from "../generator/html-generator";
import { generateOGImagePage } from "../generator/og-image-page";
import { detectResources } from "../loader/auto-detect";
import { loadSources } from "../loader/source-loader";
import { lootiScriptPlugin } from "../plugin/vite-plugin-lootiscript";
import { DEFAULT_SERVER, FONT } from "../utils/constants";
import { ServerError } from "../utils/errors";
import { DEFAULT_DIRS, DEFAULT_FILES, getBitCellFontPaths, getCliPackageRoot } from "../utils/paths";
import { findMatchingRoute } from "../utils/route-params";
import { handleRuntimeLogRequest } from "../utils/runtime-logs";
import { isCloudflaredAvailable, startCloudflaredTunnel, updateManifestForTunnel } from "../utils/tunnel";

/**
 * Development server options
 */
export interface DevOptions {
	/** Port to run server on */
	port?: number;
	/** Host to bind to (false = localhost, true = 0.0.0.0, string = specific host) */
	host?: string | boolean;
	/** Enable tunneling for Farcaster Mini Apps testing */
	tunnel?: boolean;
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
export async function dev(projectPath: string = process.cwd(), options: DevOptions = {}): Promise<ViteDevServer> {
	try {
		const config = await loadConfig(projectPath);

		// Get port and host from config or options
		const port = options.port || config.dev?.port || DEFAULT_SERVER.PORT;
		const host = options.host !== undefined ? options.host : (config.dev?.host ?? DEFAULT_SERVER.HOST);

		// Setup file watcher for HMR
		const watchPaths = [path.join(projectPath, DEFAULT_DIRS.PUBLIC), path.join(projectPath, DEFAULT_DIRS.SCRIPTS), path.join(projectPath, DEFAULT_FILES.CONFIG)];

		const watcher = chokidar.watch(watchPaths, {
			ignored: /(^|[/\\])\../, // ignore dotfiles
			persistent: true,
			ignoreInitial: true,
		});

		// Tunnel URL will be set after server starts (if tunnel is enabled)
		let tunnelUrl: string | null = null;

		const server = await createServer({
			root: projectPath,
			server: {
				port,
				host: typeof host === "boolean" ? (host ? "0.0.0.0" : "localhost") : host,
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
									const [currentSources] = await Promise.all([loadSources(projectPath)]);

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

							// Serve BitCell font from CLI package
							const fontUrl = `/fonts/${DEFAULT_FILES.BITCELL_FONT}`;
							if (req.url && (req.url === fontUrl || req.url.startsWith(fontUrl))) {
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
										console.error("[L8B CLI] Error serving BitCell font:", error);
									}
								} else {
									console.warn(`[L8B CLI] BitCell font not found. Tried:\n  ${normalizedDistFontPath}\n  ${normalizedAssetsFontPath}`);
								}
							}

							// Handle all HTML requests (for per-route embeds)
							// Extract route path from URL
							const url = req.url || "/";
							const routePath = url.split("?")[0]; // Remove query params

							// Only handle root/index.html or paths that don't have file extensions
							const isHtmlRequest =
								url === "/" || url === `/${DEFAULT_FILES.INDEX_HTML}` || (!path.extname(routePath) && !url.startsWith("/compiled/") && !url.startsWith("/runtime.js"));

							if (isHtmlRequest) {
								try {
									// Load sources and resources
									const [currentSources, currentResources] = await Promise.all([loadSources(projectPath), detectResources(projectPath)]);

									const html = generateHTML(
										config,
										currentSources,
										currentResources,
										undefined, // compiledModules (dev mode)
										routePath, // routePath for per-route embeds
									);

									res.statusCode = 200;
									res.setHeader("Content-Type", "text/html");

									// Transform HTML through Vite (for HMR scripts, etc)
									const transformedHtml = await server.transformIndexHtml(req.url || "/", html);

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
				include: ["@l8b/runtime", "@l8b/vm", "@l8b/screen", "@l8b/audio", "@l8b/input", "@l8b/time", "@l8b/sprites", "@l8b/map", "@l8b/io"],
				esbuildOptions: {
					target: "es2022",
				},
			},
			// Public directory for static assets
			publicDir: path.join(projectPath, DEFAULT_DIRS.PUBLIC),
		});

		await server.listen();

		let tunnelProcess: any = null;

		// Start tunnel if requested
		if (options.tunnel) {
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

					console.log(pc.green("\n🔗 Tunnel active!\n"), pc.cyan(`   Tunnel URL: ${tunnelUrl}\n`), pc.gray("   Use this URL in Farcaster Mini App preview tool\n"));

					// Generate QR code for mobile testing (optional)
					// Note: qrcode-terminal is not a dependency - users can install it separately
					// if they want QR code generation
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
			suggestion = `Port ${options.port || DEFAULT_SERVER.PORT} is already in use. Try using a different port with --port <number>.`;
		}

		throw new ServerError("Failed to start development server", {
			error: error instanceof Error ? error.message : String(error),
			projectPath,
			suggestion,
		});
	}
}
