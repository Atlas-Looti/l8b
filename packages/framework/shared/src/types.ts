/**
 * L8B Framework Types
 */

/**
 * Resource types supported by L8B
 */
export type ResourceType = "source" | "sprite" | "map" | "sound" | "music" | "font" | "asset";

/**
 * Resource information
 */
export interface ResourceInfo {
	file: string;
	name: string;
	version: number;
	type: ResourceType;
	properties?: Record<string, unknown>;
}

/**
 * Source file information
 */
export interface SourceInfo {
	file: string;
	name: string;
	version: number;
	content?: string;
}

/**
 * Sprite resource
 */
export interface SpriteInfo extends ResourceInfo {
	type: "sprite";
	properties?: {
		fps?: number;
		frames?: number;
		width?: number;
		height?: number;
	};
}

/**
 * Map resource
 */
export interface MapInfo extends ResourceInfo {
	type: "map";
	data?: unknown;
}

/**
 * Sound resource
 */
export interface SoundInfo extends ResourceInfo {
	type: "sound" | "music";
}

/**
 * Project resources collection
 */
export interface ProjectResources {
	sources: SourceInfo[];
	images: SpriteInfo[];
	maps: MapInfo[];
	sounds: SoundInfo[];
	music: SoundInfo[];
	assets: ResourceInfo[];
	fonts?: ResourceInfo[];
}

/**
 * L8B project configuration
 * Simplified: only essential options
 */
export interface L8BConfig {
	/** Project title */
	title?: string;
	/** Screen orientation */
	orientation?: "portrait" | "landscape" | "any";
	/** Aspect ratio */
	aspect?: "4x3" | "16x9" | "2x1" | "1x1" | ">4x3" | ">16x9" | ">2x1" | ">1x1";
	/** Dev server port */
	port?: number;
}

/**
 * Default configuration values
 */
export const DEFAULT_CONFIG: Required<L8BConfig> = {
	title: "L8B Game",
	orientation: "any",
	aspect: "16x9",
	port: 8080,
};

/**
 * HMR message types
 */
export type HMRMessageType =
	| "connected"
	| "source_updated"
	| "sprite_updated"
	| "map_updated"
	| "sound_updated"
	| "config_updated"
	| "full_reload"
	| "error";

/**
 * HMR message payload
 */
export interface HMRMessage {
	type: HMRMessageType;
	file?: string;
	name?: string;
	version?: number;
	data?: unknown;
	properties?: Record<string, unknown>;
	error?: string;
}

/**
 * Build options
 */
export interface BuildOptions {
	/** Root directory */
	root: string;
	/** Output directory */
	outDir: string;
	/** Minify output */
	minify?: boolean;
	/** Generate sourcemaps */
	sourcemap?: boolean;
	/** Watch mode */
	watch?: boolean;
}

/**
 * Dev server options
 */
export interface DevServerOptions {
	/** Root directory */
	root: string;
	/** Server port */
	port: number;
	/** Host address */
	host?: string;
	/** Open browser automatically */
	open?: boolean;
}

/**
 * Compilation result
 */
export interface CompilationResult {
	success: boolean;
	file: string;
	name: string;
	bytecode?: Uint8Array;
	errors?: CompilationError[];
	warnings?: CompilationWarning[];
}

/**
 * Compilation error
 */
export interface CompilationError {
	message: string;
	file: string;
	line: number;
	column: number;
	source?: string;
}

/**
 * Compilation warning
 */
export interface CompilationWarning {
	message: string;
	file: string;
	line: number;
	column: number;
	type: string;
}

/**
 * File change event
 */
export interface FileChangeEvent {
	type: "add" | "change" | "unlink";
	path: string;
	resourceType?: ResourceType;
}
