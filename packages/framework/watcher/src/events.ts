/**
 * File watcher event types
 */
import type { ResourceType } from "@l8b/framework-shared";

/**
 * File change event types
 */
export type FileEventType = "add" | "change" | "unlink" | "addDir" | "unlinkDir";

/**
 * File change event
 */
export interface FileEvent {
	type: FileEventType;
	path: string;
	resourceType: ResourceType | null;
}

/**
 * Watcher event handler
 */
export type FileEventHandler = (event: FileEvent) => void | Promise<void>;

/**
 * Watcher options
 */
export interface WatcherOptions {
	/** Directories to watch */
	paths: string[];
	/** Ignored patterns */
	ignored?: (string | RegExp)[];
	/** Use polling (for network filesystems) */
	usePolling?: boolean;
	/** Polling interval in ms */
	interval?: number;
	/** Debounce delay in ms */
	debounceDelay?: number;
	/** Initial scan */
	initialScan?: boolean;
}

/**
 * Default watcher options
 */
export const DEFAULT_WATCHER_OPTIONS: Required<WatcherOptions> = {
	paths: [],
	ignored: ["**/node_modules/**", "**/.git/**", "**/dist/**", "**/.l8b/**", "**/*.map"],
	usePolling: false,
	interval: 100,
	debounceDelay: 50,
	initialScan: true,
};
