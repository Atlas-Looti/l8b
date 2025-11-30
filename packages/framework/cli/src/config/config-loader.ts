/**
 * Configuration loader for LootiScript projects
 *
 * Loads and validates `l8b.config.json` with sensible defaults.
 */

import fs from "fs-extra";
import path from "path";
import { ConfigError } from "../utils/errors";
import { DEFAULT_FILES } from "../utils/paths";
import type { LootiConfig } from "./config";

/**
 * Default configuration values
 */
const DEFAULT_LOGGING: NonNullable<LootiConfig["logging"]> = {
	browser: {
		lifecycle: false,
		canvas: false,
	},
	terminal: {
		lifecycle: false,
		canvas: false,
		listener: false,
		errors: true,
	},
};

const DEFAULT_CONFIG: LootiConfig = {
	name: "LootiScript Game",
	orientation: "any",
	aspect: "free",
	canvas: {
		id: "game",
	},
	logging: DEFAULT_LOGGING,
};

function mergeLogging(userLogging: LootiConfig["logging"]): LootiConfig["logging"] {
	if (!userLogging) {
		return DEFAULT_LOGGING;
	}

	return {
		browser: {
			...DEFAULT_LOGGING.browser,
			...userLogging.browser,
		},
		terminal: {
			...DEFAULT_LOGGING.terminal,
			...userLogging.terminal,
		},
	};
}

/**
 * Aspect ratio to size mapping
 * Format: [width, height]
 */
const ASPECT_SIZES: Record<string, [number, number]> = {
	free: [1920, 1080],
	"16x9": [1920, 1080],
	"4x3": [1600, 1200],
	"1x1": [1080, 1080],
	"2x1": [2560, 1280],
	">16x9": [1920, 1080], // Minimum
	">4x3": [1600, 1200], // Minimum
	">1x1": [1080, 1080], // Minimum
	">2x1": [2560, 1280], // Minimum
};

const DEFAULT_DIMENSIONS = {
	width: 1920,
	height: 1080,
};

/**
 * Load configuration from project directory
 *
 * @param projectPath - Absolute path to project root
 * @returns Merged configuration with defaults
 * @throws {ConfigError} If config file exists but is invalid
 */
export async function loadConfig(projectPath: string = process.cwd()): Promise<LootiConfig> {
	const configPath = path.join(projectPath, DEFAULT_FILES.CONFIG);

	let userConfig: Partial<LootiConfig> = {};

	if (await fs.pathExists(configPath)) {
		try {
			userConfig = await fs.readJson(configPath);
		} catch (error) {
			throw new ConfigError(`Failed to parse ${DEFAULT_FILES.CONFIG}`, {
				path: configPath,
				error: error instanceof Error ? error.message : String(error),
			});
		}
	}

	const config: LootiConfig = {
		...DEFAULT_CONFIG,
		...userConfig,
		canvas: {
			...DEFAULT_CONFIG.canvas,
			...(userConfig.canvas ?? {}),
		},
		logging: mergeLogging(userConfig.logging),
	};

	// Ensure canvas object exists
	if (!config.canvas) {
		config.canvas = {
			id: "game",
		};
	}

	// Calculate dimensions based on aspect ratio if not explicitly provided
	if (!config.width || !config.height) {
		const aspect = config.aspect || "free";
		const dimensions = ASPECT_SIZES[aspect] || [DEFAULT_DIMENSIONS.width, DEFAULT_DIMENSIONS.height];

		const [w, h] = dimensions;

		// Apply orientation
		if (config.orientation === "portrait" && w > h) {
			config.width = h;
			config.height = w;
		} else if (config.orientation === "landscape" && h > w) {
			config.width = w;
			config.height = h;
		} else {
			config.width = w;
			config.height = h;
		}
	}

	return config;
}

/**
 * Get canvas size from configuration
 *
 * Returns width and height, preferring explicit values over defaults.
 *
 * @param config - LootiScript configuration
 * @returns Canvas dimensions
 */
export function getCanvasSize(config: LootiConfig): {
	width: number;
	height: number;
} {
	const width = config.width || config.canvas?.width || DEFAULT_DIMENSIONS.width;
	const height = config.height || config.canvas?.height || DEFAULT_DIMENSIONS.height;
	return {
		width,
		height,
	};
}
