/**
 * CLI constants
 *
 * Centralized constants for default values, cache settings, and other configurable parameters.
 */

/**
 * Default server configuration
 */
export const DEFAULT_SERVER = {
	PORT: 3000,
	HOST: false, // false = localhost, true or string = specific host
} as const;

/**
 * Internal endpoints
 */
export const INTERNAL_ENDPOINTS = {
	LOGGER: "/__l8b/log",
} as const;

/**
 * Build configuration
 */
export const BUILD = {
	/** Maximum depth to traverse when finding workspace root */
	MAX_WORKSPACE_DEPTH: 10,
} as const;

/**
 * Asset file extensions
 */
export const ASSET_EXTENSIONS = {
	IMAGE: [".png", ".jpg", ".jpeg", ".webp", ".gif"] as const,
	MAP: [".json", ".tmj"] as const,
	AUDIO: [".mp3", ".wav", ".ogg"] as const,
} as const;

/**
 * Asset subdirectories in public folder
 */
export const ASSET_SUBDIRS = {
	SPRITES: "sprites",
	MAPS: "maps",
	FONTS: "fonts",
	SOUNDS: "sounds",
	MUSIC: "music",
} as const;
