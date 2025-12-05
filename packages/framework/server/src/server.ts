/**
 * L8B Development Server
 * Custom HTTP server with WebSocket HMR support
 *
 * Uses pre-built browser runtime for instant startup
 */
import { createServer, type IncomingMessage, type ServerResponse } from "node:http";
import { existsSync, readFileSync } from "node:fs";
import { extname, join, dirname } from "node:path";
import { type DevServerOptions, type ProjectResources, MIME_TYPES, createLogger } from "@l8b/framework-shared";
import { type ResolvedConfig, discoverResources, loadConfig } from "@l8b/framework-config";
import { compileSource } from "@l8b/framework-compiler";
import { createWatcher, type L8BWatcher } from "@l8b/framework-watcher";
import { generateDevHTML, generateHMRClient } from "@l8b/framework-html";
import { HMRServer } from "./hmr";

const logger = createLogger("server");

/**
 * Cached pre-built runtime (loaded once from disk)
 */
let cachedRuntime: string | null = null;

/**
 * Load pre-built browser runtime
 * This uses the pre-built IIFE bundle from @l8b/runtime/dist/browser/
 */
function loadPrebuiltRuntime(): string {
	if (cachedRuntime) {
		return cachedRuntime;
	}

	// Find the pre-built browser bundle
	const runtimePath = require.resolve("@l8b/runtime");
	const runtimeDir = dirname(runtimePath);
	const browserBundlePath = join(runtimeDir, "browser", "index.js");

	if (!existsSync(browserBundlePath)) {
		logger.warn("Pre-built browser runtime not found, falling back to main bundle");
		// Fallback: read the main bundle (not ideal but works)
		cachedRuntime = readFileSync(runtimePath, "utf-8");
		return cachedRuntime;
	}

	logger.info(`Loading pre-built runtime from ${browserBundlePath}`);
	cachedRuntime = readFileSync(browserBundlePath, "utf-8");

	const sizeKB = (cachedRuntime.length / 1024).toFixed(1);
	logger.success(`Runtime loaded (${sizeKB} KB)`);

	return cachedRuntime;
}

/**
 * L8B Development Server
 */
export class L8BDevServer {
	private config: ResolvedConfig;
	private options: DevServerOptions;
	private server: ReturnType<typeof createServer> | null = null;
	private hmr: HMRServer | null = null;
	private watcher: L8BWatcher | null = null;
	private resources: ProjectResources;

	constructor(options: DevServerOptions) {
		this.options = {
			host: "localhost",
			open: false,
			...options,
		};
		this.config = loadConfig(options.root);
		this.resources = discoverResources(this.config);
	}

	/**
	 * Start the development server
	 */
	async start(): Promise<void> {
		logger.info("Starting L8B development server...");

		// Create HTTP server
		this.server = createServer((req, res) => {
			this.handleRequest(req, res);
		});

		// Create file watcher
		this.watcher = createWatcher(this.config.srcPath, this.config.publicPath, { initialScan: false });

		this.watcher.on((event) => {
			this.handleFileChange(event);
		});

		// Start services
		this.watcher.start();

		// Find available port using recursive approach (similar to Vite)
		const startPort = this.options.port;
		const maxPort = startPort + 100;

		const port = await this.findAvailablePort(startPort, maxPort);
		this.options.port = port; // Update port in options

		// Create HMR WebSocket server AFTER port is found
		// This prevents EADDRINUSE errors during port finding
		this.hmr = new HMRServer(this.server);

		const url = `http://${this.options.host}:${this.options.port}`;
		logger.success(`Server running at ${url}`);

		logger.box(
			"L8B Dev Server",
			[
				`Local:   ${url}`,
				`Root:    ${this.config.root}`,
				`Sources: ${this.resources.sources.length} files`,
				`Sprites: ${this.resources.images.length} files`,
			].join("\n"),
		);

		// Open browser if requested
		if (this.options.open) {
			this.openBrowser(url);
		}
	}

	/**
	 * Find an available port by recursively trying ports
	 */
	private async findAvailablePort(port: number, maxPort: number): Promise<number> {
		if (port > maxPort) {
			throw new Error(`Could not find available port between ${this.options.port} and ${maxPort}`);
		}

		return new Promise<number>((resolve, reject) => {
			const onError = (err: NodeJS.ErrnoException) => {
				this.server!.removeListener("error", onError);

				if (err.code === "EADDRINUSE") {
					logger.info(`Port ${port} is in use, trying another one...`);
					// Try next port
					resolve(this.findAvailablePort(port + 1, maxPort));
				} else {
					reject(err);
				}
			};

			this.server!.once("error", onError);

			this.server!.listen(port, this.options.host, () => {
				this.server!.removeListener("error", onError);
				resolve(port);
			});
		});
	}

	/**
	 * Stop the development server
	 */
	async stop(): Promise<void> {
		logger.info("Stopping server...");

		if (this.watcher) {
			await this.watcher.stop();
		}

		if (this.hmr) {
			this.hmr.close();
		}

		if (this.server) {
			await new Promise<void>((resolve) => {
				this.server!.close(() => resolve());
			});
		}

		logger.info("Server stopped");
	}

	/**
	 * Handle HTTP request
	 */
	private handleRequest(req: IncomingMessage, res: ServerResponse): void {
		const url = req.url || "/";
		const path = url.split("?")[0];

		logger.debug(`${req.method} ${path}`);

		try {
			// Route request
			if (path === "/" || path === "/index.html") {
				this.serveIndex(res);
			} else if (path === "/__l8b_client__.js") {
				this.serveHMRClient(res);
			} else if (path === "/__l8b_runtime__.js") {
				this.serveRuntime(res);
			} else if (path.startsWith("/loot/")) {
				this.serveSource(path, res);
			} else if (path.startsWith("/sprites/")) {
				this.serveStatic(path, res, this.config.publicPath);
			} else if (path.startsWith("/maps/")) {
				this.serveStatic(path, res, this.config.publicPath);
			} else if (path.startsWith("/sounds/")) {
				this.serveStatic(path, res, this.config.publicPath);
			} else if (path.startsWith("/music/")) {
				this.serveStatic(path, res, this.config.publicPath);
			} else if (path.startsWith("/fonts/")) {
				this.serveStatic(path, res, this.config.publicPath);
			} else if (path.startsWith("/assets/")) {
				this.serveStatic(path, res, this.config.publicPath);
			} else {
				// Try public directory
				const publicPath = join(this.config.publicPath, path);
				if (existsSync(publicPath)) {
					this.serveFile(publicPath, res);
				} else {
					this.serve404(res);
				}
			}
		} catch (err) {
			logger.error("Request error:", err);
			this.serve500(res, err as Error);
		}
	}

	/**
	 * Serve index HTML
	 */
	private serveIndex(res: ServerResponse): void {
		const html = generateDevHTML({
			config: this.config,
			resources: this.resources,
			mode: "development",
			port: this.options.port,
		});

		res.writeHead(200, {
			"Content-Type": "text/html",
			"Cache-Control": "no-cache",
		});
		res.end(html);
	}

	/**
	 * Serve HMR client script
	 */
	private serveHMRClient(res: ServerResponse): void {
		const script = generateHMRClient(this.options.port);

		res.writeHead(200, {
			"Content-Type": "application/javascript",
			"Cache-Control": "no-cache",
		});
		res.end(script);
	}

	/**
	 * Serve runtime script (uses pre-built bundle)
	 */
	private serveRuntime(res: ServerResponse): void {
		try {
			// Load pre-built runtime (cached after first load)
			const code = loadPrebuiltRuntime();

			res.writeHead(200, {
				"Content-Type": "application/javascript",
				"Cache-Control": "max-age=31536000", // Cache for 1 year (content-addressed)
			});
			res.end(code);
		} catch (err) {
			logger.error("Failed to serve runtime:", err);
			this.serve500(res, err as Error);
		}
	}

	/**
	 * Serve source file
	 */
	private serveSource(path: string, res: ServerResponse): void {
		// Extract file name from /loot/filename.loot
		const fileName = path.replace("/loot/", "");
		const source = this.resources.sources.find((s) => s.file === fileName || s.file === fileName.replace(".loot", ".ms"));

		if (source && source.content) {
			res.writeHead(200, {
				"Content-Type": "text/plain",
				"Cache-Control": "no-cache",
			});
			res.end(source.content);
		} else {
			this.serve404(res);
		}
	}

	/**
	 * Serve static file from directory
	 */
	private serveStatic(path: string, res: ServerResponse, baseDir: string): void {
		const filePath = join(baseDir, path);

		if (existsSync(filePath)) {
			this.serveFile(filePath, res);
		} else {
			this.serve404(res);
		}
	}

	/**
	 * Serve a file
	 */
	private serveFile(filePath: string, res: ServerResponse): void {
		const ext = extname(filePath).toLowerCase();
		const contentType = MIME_TYPES[ext] || "application/octet-stream";

		try {
			const content = readFileSync(filePath);
			res.writeHead(200, {
				"Content-Type": contentType,
				"Content-Length": content.length,
				"Cache-Control": "max-age=3600",
			});
			res.end(content);
		} catch (err) {
			this.serve404(res);
		}
	}

	/**
	 * Serve 404 response
	 */
	private serve404(res: ServerResponse): void {
		res.writeHead(404, { "Content-Type": "text/plain" });
		res.end("Not Found");
	}

	/**
	 * Serve 500 response
	 */
	private serve500(res: ServerResponse, error: Error): void {
		res.writeHead(500, { "Content-Type": "text/plain" });
		res.end(`Internal Server Error: ${error.message}`);
	}

	/**
	 * Handle file change event
	 */
	private handleFileChange(event: { type: string; path: string; resourceType: string | null }): void {
		logger.info(`File ${event.type}: ${event.path}`);

		// Refresh resources
		this.resources = discoverResources(this.config);

		// Handle based on resource type
		switch (event.resourceType) {
			case "source":
				this.handleSourceChange(event.path);
				break;

			case "sprite":
				this.handleSpriteChange(event.path);
				break;

			case "map":
				this.handleMapChange(event.path);
				break;

			default:
				// Unknown resource type, trigger full reload
				this.hmr?.send({
					type: "full_reload",
				});
		}
	}

	/**
	 * Handle source file change
	 */
	private handleSourceChange(filePath: string): void {
		const source = this.resources.sources.find((s) => filePath.endsWith(s.file));

		if (!source || !source.content) {
			logger.warn(`Source not found: ${filePath}`);
			return;
		}

		// Compile the source
		const result = compileSource(source.content, {
			filePath: source.file,
			moduleName: source.name,
			srcDir: this.config.srcPath,
		});

		if (!result.success) {
			const errorMsg =
				result.errors?.map((e) => `${e.file}:${e.line}: ${e.message}`).join("\n") || "Unknown compilation error";

			logger.error(`Compilation failed: ${errorMsg}`);

			this.hmr?.send({
				type: "error",
				error: errorMsg,
			});
			return;
		}

		// Send update to clients
		this.hmr?.send({
			type: "source_updated",
			name: source.name,
			file: source.file,
			version: source.version,
			data: source.content,
		});

		logger.success(`Source updated: ${source.name}`);
	}

	/**
	 * Handle sprite file change
	 */
	private handleSpriteChange(filePath: string): void {
		const sprite = this.resources.images.find((s) => filePath.endsWith(s.file));

		if (!sprite) {
			logger.warn(`Sprite not found: ${filePath}`);
			return;
		}

		// Read sprite data as base64
		const fullPath = join(this.config.publicPath, "sprites", sprite.file);
		if (!existsSync(fullPath)) {
			return;
		}

		const data = readFileSync(fullPath).toString("base64");

		this.hmr?.send({
			type: "sprite_updated",
			name: sprite.name,
			file: sprite.file,
			version: sprite.version,
			data,
			properties: sprite.properties,
		});

		logger.success(`Sprite updated: ${sprite.name}`);
	}

	/**
	 * Handle map file change
	 */
	private handleMapChange(filePath: string): void {
		const map = this.resources.maps.find((m) => filePath.endsWith(m.file));

		if (!map) {
			logger.warn(`Map not found: ${filePath}`);
			return;
		}

		this.hmr?.send({
			type: "map_updated",
			name: map.name,
			file: map.file,
			version: map.version,
			data: map.data,
		});

		logger.success(`Map updated: ${map.name}`);
	}

	/**
	 * Open browser
	 */
	private openBrowser(url: string): void {
		const { exec } = require("node:child_process");
		const platform = process.platform;

		let command: string;
		switch (platform) {
			case "darwin":
				command = `open "${url}"`;
				break;
			case "win32":
				command = `start "" "${url}"`;
				break;
			default:
				command = `xdg-open "${url}"`;
		}

		exec(command, (err: Error | null) => {
			if (err) {
				logger.warn("Failed to open browser:", err.message);
			}
		});
	}
}

/**
 * Create and start a development server
 */
export async function createDevServer(options: DevServerOptions): Promise<L8BDevServer> {
	const server = new L8BDevServer(options);
	await server.start();
	return server;
}
