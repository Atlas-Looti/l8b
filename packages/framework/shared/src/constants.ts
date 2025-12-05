/**
 * L8B Framework Constants
 */

/**
 * File extensions for LootiScript source files
 */
export const LOOT_EXTENSIONS = [".loot", ".ls"] as const;

/**
 * File extensions for image/sprite files
 */
export const IMAGE_EXTENSIONS = [".png", ".jpg", ".jpeg", ".gif", ".webp"] as const;

/**
 * File extensions for audio files
 */
export const AUDIO_EXTENSIONS = [".wav", ".mp3", ".ogg", ".m4a"] as const;

/**
 * File extensions for map files
 */
export const MAP_EXTENSIONS = [".json"] as const;

/**
 * File extensions for font files
 */
export const FONT_EXTENSIONS = [".ttf", ".otf", ".woff", ".woff2"] as const;

/**
 * Default directories
 */
export const DEFAULT_DIRS = {
	src: "src",
	public: "public",
	sprites: "sprites",
	maps: "maps",
	sounds: "sounds",
	music: "music",
	fonts: "fonts",
	assets: "assets",
	dist: "dist",
	cache: ".l8b",
} as const;

/**
 * Config file names
 */
export const CONFIG_FILES = ["l8b.config.json", "l8b.config.js", "l8b.config.ts"] as const;

/**
 * HMR WebSocket path
 */
export const HMR_WS_PATH = "/__l8b_hmr__";

/**
 * Runtime script path
 */
export const RUNTIME_SCRIPT_PATH = "/__l8b_runtime__.js";

/**
 * Client script path
 */
export const CLIENT_SCRIPT_PATH = "/__l8b_client__.js";

/**
 * Mime types for resources
 */
export const MIME_TYPES: Record<string, string> = {
	".html": "text/html",
	".css": "text/css",
	".js": "application/javascript",
	".mjs": "application/javascript",
	".json": "application/json",
	".png": "image/png",
	".jpg": "image/jpeg",
	".jpeg": "image/jpeg",
	".gif": "image/gif",
	".webp": "image/webp",
	".svg": "image/svg+xml",
	".wav": "audio/wav",
	".mp3": "audio/mpeg",
	".ogg": "audio/ogg",
	".m4a": "audio/mp4",
	".ttf": "font/ttf",
	".otf": "font/otf",
	".woff": "font/woff",
	".woff2": "font/woff2",
	".loot": "text/plain",
	".ls": "text/plain",
} as const;

/**
 * Version number
 */
export const VERSION = "1.0.0";
