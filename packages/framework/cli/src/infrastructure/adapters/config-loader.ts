/**
 * Config Loader Adapter
 *
 * Implementation of IConfigLoader for loading project configuration
 */

import path from "path";
import type { LootiConfig } from "../../core/types";
import type { IConfigLoader, IFileSystem } from "../../core/ports";
import { ConfigError } from "../../utils/errors";
import { DEFAULT_FILES } from "../../utils/paths";

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

export class ConfigLoader implements IConfigLoader {
	constructor(private fileSystem: IFileSystem) {}

	async loadConfig(projectPath: string): Promise<LootiConfig> {
		const configPath = path.join(projectPath, DEFAULT_FILES.CONFIG);

		let userConfig: Partial<LootiConfig> = {};

		if (await this.fileSystem.pathExists(configPath)) {
			try {
				userConfig = await this.fileSystem.readJson(configPath);
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
			// Normalize aspect ratio format (handle both ':' and 'x' separators)
			const normalizedAspect = (config.aspect || "free").replace(":", "x");
			const dimensions = ASPECT_SIZES[normalizedAspect] || [DEFAULT_DIMENSIONS.width, DEFAULT_DIMENSIONS.height];

			const [w, h] = dimensions;

			// Apply orientation
			if (config.orientation === "portrait" && w > h) {
				// Swap dimensions to portrait (height > width)
				config.width = h;
				config.height = w;
			} else if (config.orientation === "landscape" && h > w) {
				// Swap dimensions to landscape (width > height)
				config.width = h;
				config.height = w;
			} else {
				// Keep dimensions as-is (already correct orientation or "any")
				config.width = w;
				config.height = h;
			}
		}

		return config;
	}

	getCanvasSize(config: LootiConfig): { width: number; height: number } {
		const width = config.width || config.canvas?.width || DEFAULT_DIMENSIONS.width;
		const height = config.height || config.canvas?.height || DEFAULT_DIMENSIONS.height;
		return {
			width,
			height,
		};
	}
}
