/**
 * L8B Development Server
 * Custom HTTP server with WebSocket HMR support
 *
 * Uses pre-built browser runtime for instant startup
 */
import { createServer, type IncomingMessage, type ServerResponse } from "node:http";
import { existsSync } from "node:fs";
import { join } from "node:path";
import type readline from "node:readline";
import { type DevServerOptions, type ProjectResources, createLogger } from "@al8b/framework-shared";
import { type ResolvedConfig, discoverResources, loadConfig } from "@al8b/framework-config";
import { createWatcher, type L8BWatcher } from "@al8b/framework-watcher";
import { HMRServer } from "./hmr";
import { bindCLIShortcuts as _bindCLIShortcuts, type BindCLIShortcutsOptions } from "./shortcuts";
import {
	type FileHandlerContext,
	serve404,
	serve500,
	serveFile,
	serveHMRClient,
	serveIndex,
	serveRuntime,
	serveSource,
	serveStatic,
} from "./file-handler";
import { handleFileChange } from "./hmr-handler";

const logger = createLogger("server");

/** Maximum number of ports to try when finding an available port */
const MAX_PORT_ATTEMPTS = 100;

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
	private sourceMap: Map<string, any> = new Map();
	private watcherUnsubscribe: (() => void) | null = null;

	/**
	 * @internal - Readline interface for CLI shortcuts
	 */
	_rl?: readline.Interface | undefined;

	/**
	 * @internal - CLI shortcuts options
	 */
	_shortcutsOptions?: BindCLIShortcutsOptions<L8BDevServer>;

	constructor(options: DevServerOptions) {
		this.options = {
			host: "localhost",
			open: false,
			...options,
		};
		this.config = loadConfig(options.root);
		this.resources = {
			sources: [],
			images: [],
			maps: [],
			sounds: [],
			music: [],
			assets: [],
			fonts: [],
		};
	}

	/**
	 * Update resource maps for O(1) lookup
	 */
	private updateResourceMaps(): void {
		this.sourceMap.clear();
		for (const source of this.resources.sources) {
			this.sourceMap.set(source.file, source);
		}
	}

	/**
	 * Get context for file handler functions
	 */
	private getFileHandlerContext(): FileHandlerContext {
		return {
			config: this.config,
			options: this.options,
			resources: this.resources,
			sourceMap: this.sourceMap,
		};
	}

	/**
	 * Start the development server
	 */
	async start(): Promise<void> {
		logger.info("Starting L8B development server...");

		// Discover resources
		this.resources = await discoverResources(this.config);
		this.updateResourceMaps();

		// Create HTTP server
		this.server = createServer((req, res) => {
			this.handleRequest(req, res);
		});

		// Create file watcher
		this.watcher = createWatcher(this.config.srcPath, this.config.publicPath, { initialScan: false });

		// Store unsubscribe function to properly clean up on server stop
		this.watcherUnsubscribe = this.watcher.on(async (event) => {
			// Refresh resources before handling event
			this.resources = await discoverResources(this.config);
			this.updateResourceMaps();

			handleFileChange({ config: this.config, resources: this.resources, hmr: this.hmr }, event);
		});

		// Start services
		this.watcher.start();

		// Find available port
		const startPort = this.options.port;
		const maxPort = startPort + MAX_PORT_ATTEMPTS;
		const port = await this.findAvailablePort(startPort, maxPort);
		this.options.port = port;

		// Create HMR WebSocket server AFTER port is found
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

		if (this.options.open) {
			this.openBrowser(url);
		}
	}

	/**
	 * Find an available port using a temporary test server
	 */
	private async findAvailablePort(port: number, maxPort: number): Promise<number> {
		if (port > maxPort) {
			throw new Error(`Could not find available port between ${this.options.port} and ${maxPort}`);
		}

		return new Promise<number>((resolve, reject) => {
			const testServer = createServer();

			const onError = (err: NodeJS.ErrnoException) => {
				testServer.removeListener("error", onError);
				testServer.close();

				if (err.code === "EADDRINUSE") {
					logger.info(`Port ${port} is in use, trying another one...`);
					resolve(this.findAvailablePort(port + 1, maxPort));
				} else {
					reject(err);
				}
			};

			testServer.once("error", onError);

			testServer.listen(port, this.options.host, () => {
				testServer.removeListener("error", onError);
				testServer.close(() => {
					this.server!.listen(port, this.options.host, () => {
						resolve(port);
					});
				});
			});
		});
	}

	/**
	 * Stop the development server
	 */
	async stop(): Promise<void> {
		logger.info("Stopping server...");

		if (this.watcherUnsubscribe) {
			this.watcherUnsubscribe();
			this.watcherUnsubscribe = null;
		}

		if (this.watcher) {
			await this.watcher.stop();
			this.watcher = null;
		}

		if (this.hmr) {
			this.hmr.close();
			this.hmr = null;
		}

		if (this.server) {
			await new Promise<void>((resolve) => {
				this.server!.close(() => resolve());
			});
			this.server = null;
		}

		if (this._rl) {
			this._rl.close();
			this._rl = undefined;
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
			const ctx = this.getFileHandlerContext();

			if (path === "/" || path === "/index.html") {
				serveIndex(ctx, res);
			} else if (path === "/__l8b_client__.js") {
				serveHMRClient(ctx, res);
			} else if (path === "/__l8b_runtime__.js") {
				serveRuntime(res);
			} else if (path.startsWith("/loot/")) {
				serveSource(ctx, path, res);
			} else if (
				path.startsWith("/sprites/") ||
				path.startsWith("/maps/") ||
				path.startsWith("/sounds/") ||
				path.startsWith("/music/") ||
				path.startsWith("/fonts/") ||
				path.startsWith("/assets/")
			) {
				serveStatic(path, res, this.config.publicPath);
			} else {
				const publicPath = join(this.config.publicPath, path);
				if (existsSync(publicPath)) {
					serveFile(publicPath, res);
				} else {
					serve404(res);
				}
			}
		} catch (err) {
			logger.error("Request error:", err);
			serve500(res, err as Error);
		}
	}

	/**
	 * Get the server host
	 */
	getHost(): string {
		return this.options.host || "localhost";
	}

	/**
	 * Get the server port
	 */
	getPort(): number {
		return this.options.port;
	}

	/**
	 * Get the full server URL
	 */
	getServerUrl(): string {
		return `http://${this.getHost()}:${this.getPort()}`;
	}

	/**
	 * Bind CLI shortcuts for interactive terminal commands
	 */
	bindCLIShortcuts(options?: BindCLIShortcutsOptions<L8BDevServer>): void {
		_bindCLIShortcuts(this, options);
	}

	/**
	 * Open the server URL in the default browser
	 */
	openInBrowser(): void {
		this.openBrowser(this.getServerUrl());
	}

	/**
	 * Open browser safely using spawn to avoid command injection risks
	 */
	private openBrowser(url: string): void {
		const { spawn } = require("node:child_process");
		const platform = process.platform;

		let command: string;
		let args: string[];

		switch (platform) {
			case "darwin":
				command = "open";
				args = [url];
				break;
			case "win32":
				command = "cmd";
				args = ["/c", "start", "", url];
				break;
			default:
				command = "xdg-open";
				args = [url];
		}

		const child = spawn(command, args, {
			detached: true,
			stdio: "ignore",
		});

		child.on("error", (err: Error) => {
			logger.warn("Failed to open browser:", err.message);
		});

		child.unref();
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
