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
 * Cache settings
 */
export const CACHE = {
    /** Cache TTL in milliseconds for resources and sources */
    TTL_MS: 100,
} as const;

/**
 * Font serving configuration
 */
export const FONT = {
    CONTENT_TYPE: 'font/ttf',
    CACHE_CONTROL: 'public, max-age=31536000', // 1 year
} as const;

/**
 * Build configuration
 */
export const BUILD = {
    /** Maximum depth to traverse when finding workspace root */
    MAX_WORKSPACE_DEPTH: 10,
} as const;

/**
 * Aspect ratio presets
 */
export const ASPECT_SIZES = {
    '16:9': { width: 1920, height: 1080 },
    '4:3': { width: 1600, height: 1200 },
    '1:1': { width: 1080, height: 1080 },
    '3:4': { width: 900, height: 1200 },
    '9:16': { width: 1080, height: 1920 },
} as const;

export type AspectRatio = keyof typeof ASPECT_SIZES;

