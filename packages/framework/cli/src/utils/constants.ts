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
 * Font serving configuration
 */
export const FONT = {
	CONTENT_TYPE: "font/ttf",
	CACHE_CONTROL: "public, max-age=31536000", // 1 year
} as const;

/**
 * Build configuration
 */
export const BUILD = {
	/** Maximum depth to traverse when finding workspace root */
	MAX_WORKSPACE_DEPTH: 10,
} as const;
