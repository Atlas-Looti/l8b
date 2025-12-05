/**
 * Configuration loader and manager
 * Simplified: hardcoded src, public, dist paths like Vite
 */
import { existsSync, readFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { CONFIG_FILES, DEFAULT_CONFIG, type L8BConfig, createLogger } from "@l8b/framework-shared";

const logger = createLogger("config");

/**
 * Resolved configuration with all paths absolute
 * Paths are hardcoded like Vite:
 * - src: ./src
 * - public: ./public
 * - dist: ./dist
 * - cache: ./.l8b
 */
export interface ResolvedConfig extends Required<L8BConfig> {
	/** Root directory */
	root: string;
	/** Absolute path to source directory (always ./src) */
	srcPath: string;
	/** Absolute path to public directory (always ./public) */
	publicPath: string;
	/** Absolute path to output directory (always ./dist) */
	outPath: string;
	/** Absolute path to cache directory (always ./.l8b) */
	cachePath: string;
}

/**
 * Load configuration from project root
 */
export function loadConfig(root: string): ResolvedConfig {
	const absoluteRoot = resolve(root);
	let userConfig: Partial<L8BConfig> = {};

	// Try to load config file
	for (const configFile of CONFIG_FILES) {
		const configPath = join(absoluteRoot, configFile);
		if (existsSync(configPath)) {
			try {
				if (configFile.endsWith(".json")) {
					const content = readFileSync(configPath, "utf-8");
					userConfig = JSON.parse(content);
				} else {
					// For JS/TS configs, we'd need dynamic import
					// For now, just support JSON
					logger.warn(`JS/TS config not yet supported: ${configFile}`);
				}
				logger.debug(`Loaded config from ${configFile}`);
				break;
			} catch (error) {
				logger.error(`Failed to load config from ${configFile}:`, error);
			}
		}
	}

	// Merge with defaults
	const config: Required<L8BConfig> = {
		...DEFAULT_CONFIG,
		...userConfig,
	};

	// Resolve paths (hardcoded like Vite)
	const resolved: ResolvedConfig = {
		...config,
		root: absoluteRoot,
		srcPath: resolve(absoluteRoot, "src"),
		publicPath: resolve(absoluteRoot, "public"),
		outPath: resolve(absoluteRoot, "dist"),
		cachePath: resolve(absoluteRoot, ".l8b"),
	};

	return resolved;
}

/**
 * Create a default config file
 */
export function createDefaultConfig(): L8BConfig {
	return {
		title: "My L8B Game",
		orientation: "landscape",
		aspect: "16x9",
		port: 8080,
	};
}

/**
 * Validate configuration
 */
export function validateConfig(config: L8BConfig): string[] {
	const errors: string[] = [];

	if (config.port !== undefined) {
		if (config.port < 1 || config.port > 65535) {
			errors.push("Port must be between 1 and 65535");
		}
	}

	if (config.orientation !== undefined) {
		if (!["portrait", "landscape", "any"].includes(config.orientation)) {
			errors.push('Orientation must be "portrait", "landscape", or "any"');
		}
	}

	if (config.aspect !== undefined) {
		const validAspects = ["4x3", "16x9", "2x1", "1x1", ">4x3", ">16x9", ">2x1", ">1x1"];
		if (!validAspects.includes(config.aspect)) {
			errors.push(`Invalid aspect ratio: ${config.aspect}`);
		}
	}

	return errors;
}

/**
 * Write config to file
 */
export function writeConfig(root: string, config: L8BConfig): void {
	const { writeFileSync } = require("node:fs");
	const configPath = join(root, "l8b.config.json");
	writeFileSync(configPath, JSON.stringify(config, null, "\t"), "utf-8");
	logger.info(`Created config file: ${configPath}`);
}
