/**
 * File watcher implementation using chokidar
 */
import { watch, type FSWatcher } from "chokidar";
import type { EventEmitter } from "node:events";
import { createLogger, debounce, getResourceType, normalizePath } from "@l8b/framework-shared";
import {
	DEFAULT_WATCHER_OPTIONS,
	type FileEvent,
	type FileEventHandler,
	type FileEventType,
	type WatcherOptions,
} from "./events";

/** Error event handler type */
export type WatcherErrorHandler = (error: Error) => void;

const logger = createLogger("watcher");

/**
 * File watcher for L8B development
 */
export class L8BWatcher {
	private watcher: FSWatcher | null = null;
	private handlers: Set<FileEventHandler> = new Set();
	private errorHandlers: Set<WatcherErrorHandler> = new Set();
	private options: Required<WatcherOptions>;
	private srcDir: string;
	private publicDir: string;
	private pendingEvents: Map<string, FileEvent> = new Map();
	private flushPending: () => void;

	constructor(srcDir: string, publicDir: string, options: Partial<WatcherOptions> = {}) {
		this.srcDir = srcDir;
		this.publicDir = publicDir;
		this.options = {
			...DEFAULT_WATCHER_OPTIONS,
			...options,
			paths: options.paths || [srcDir, publicDir],
		};

		// Create debounced flush function
		this.flushPending = debounce(() => {
			this.processPendingEvents();
		}, this.options.debounceDelay);
	}

	/**
	 * Start watching files
	 */
	start(): void {
		if (this.watcher) {
			return;
		}

		logger.info("Starting file watcher...");
		logger.debug("Watching paths:", this.options.paths);

		this.watcher = watch(this.options.paths, {
			ignored: this.options.ignored,
			persistent: true,
			ignoreInitial: !this.options.initialScan,
			usePolling: this.options.usePolling,
			interval: this.options.interval,
			awaitWriteFinish: {
				stabilityThreshold: 100,
				pollInterval: 50,
			},
		});

		// FSWatcher extends EventEmitter, so we can safely use .on()
		(this.watcher as unknown as EventEmitter)
			.on("add", (path: string) => this.handleEvent("add", path))
			.on("change", (path: string) => this.handleEvent("change", path))
			.on("unlink", (path: string) => this.handleEvent("unlink", path))
			.on("addDir", (path: string) => this.handleEvent("addDir", path))
			.on("unlinkDir", (path: string) => this.handleEvent("unlinkDir", path))
			.on("error", (error: unknown) => {
				const err = error instanceof Error ? error : new Error(String(error));
				logger.error("Watcher error:", err);
				this.emitError(err);
			})
			.on("ready", () => {
				logger.success("File watcher ready");
			});
	}

	/**
	 * Stop watching files
	 */
	async stop(): Promise<void> {
		if (this.watcher) {
			logger.info("Stopping file watcher...");
			await this.watcher.close();
			this.watcher = null;
		}
	}

	/**
	 * Add event handler
	 */
	on(handler: FileEventHandler): () => void {
		this.handlers.add(handler);
		return () => {
			this.handlers.delete(handler);
		};
	}

	/**
	 * Add error event handler for monitoring
	 */
	onError(handler: WatcherErrorHandler): () => void {
		this.errorHandlers.add(handler);
		return () => {
			this.errorHandlers.delete(handler);
		};
	}

	/**
	 * Emit error to all error handlers
	 */
	private emitError(error: Error): void {
		for (const handler of this.errorHandlers) {
			try {
				handler(error);
			} catch (err) {
				logger.error("Error handler threw:", err);
			}
		}
	}

	/**
	 * Handle file system event
	 */
	private handleEvent(type: FileEventType, path: string): void {
		const normalizedPath = normalizePath(path);
		const resourceType = this.determineResourceType(normalizedPath);

		// Skip if not a recognized resource type
		if (resourceType === null && type !== "addDir" && type !== "unlinkDir") {
			logger.debug(`Ignoring unrecognized file: ${normalizedPath}`);
			return;
		}

		const event: FileEvent = {
			type,
			path: normalizedPath,
			resourceType,
		};

		// Add to pending events (deduplicating)
		this.pendingEvents.set(normalizedPath, event);

		// Trigger debounced flush
		this.flushPending();
	}

	/**
	 * Process pending events
	 */
	private processPendingEvents(): void {
		const events = Array.from(this.pendingEvents.values());
		this.pendingEvents.clear();

		for (const event of events) {
			logger.debug(`File ${event.type}: ${event.path} (${event.resourceType})`);

			for (const handler of this.handlers) {
				try {
					const result = handler(event);
					// Handle async handlers and emit errors for monitoring
					if (result instanceof Promise) {
						result.catch((err) => {
							const error = err instanceof Error ? err : new Error(String(err));
							logger.error("Handler error:", error);
							this.emitError(error);
						});
					}
				} catch (err) {
					const error = err instanceof Error ? err : new Error(String(err));
					logger.error("Handler error:", error);
					this.emitError(error);
				}
			}
		}
	}

	/**
	 * Determine resource type from file path
	 */
	private determineResourceType(path: string): FileEvent["resourceType"] {
		// Check if it's a source file
		if (path.startsWith(normalizePath(this.srcDir))) {
			const ext = path.slice(path.lastIndexOf(".")).toLowerCase();
			if (ext === ".loot" || ext === ".ls") {
				return "source";
			}
			return null;
		}

		// Check public directory resources
		if (path.startsWith(normalizePath(this.publicDir))) {
			return getResourceType(path, this.publicDir);
		}

		return null;
	}

	/**
	 * Get watched paths
	 */
	getWatchedPaths(): string[] {
		if (!this.watcher) {
			return [];
		}

		const watched = this.watcher.getWatched();
		const paths: string[] = [];

		for (const dir of Object.keys(watched)) {
			for (const file of watched[dir]) {
				paths.push(`${dir}/${file}`);
			}
		}

		return paths;
	}
}

/**
 * Create a new watcher instance
 */
export function createWatcher(srcDir: string, publicDir: string, options?: Partial<WatcherOptions>): L8BWatcher {
	return new L8BWatcher(srcDir, publicDir, options);
}
