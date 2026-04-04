/**
 * Configuration loader and manager
 * Simplified: hardcoded src, public, dist paths like Vite
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join, resolve } from "node:path";
import { CONFIG_FILES, DEFAULT_CONFIG, type L8BConfig, createLogger } from "@al8b/framework-shared";

const logger = createLogger("config");
const nodeRequire = createRequire(import.meta.url);

type ConfigFormat = "json" | "js" | "ts" | "default";

interface LoadedConfigFile {
	config: Partial<L8BConfig>;
	file: string;
	format: Exclude<ConfigFormat, "default">;
}

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
	/** Config file actually used */
	configFile: string | null;
	/** Config format actually used */
	configFormat: ConfigFormat;
}

/**
 * Load configuration from project root
 */
export function loadConfig(root: string): ResolvedConfig {
	const absoluteRoot = resolve(root);
	const loadedConfig = loadUserConfig(absoluteRoot);

	// Merge with defaults
	const config: Required<L8BConfig> = {
		...DEFAULT_CONFIG,
		...loadedConfig.config,
	};

	// Resolve paths (hardcoded like Vite)
	const resolved: ResolvedConfig = {
		...config,
		root: absoluteRoot,
		srcPath: resolve(absoluteRoot, "src"),
		publicPath: resolve(absoluteRoot, "public"),
		outPath: resolve(absoluteRoot, "dist"),
		cachePath: resolve(absoluteRoot, ".l8b"),
		configFile: loadedConfig.file,
		configFormat: loadedConfig.format,
	};

	return resolved;
}

function loadUserConfig(root: string): LoadedConfigFile | { config: Partial<L8BConfig>; file: null; format: "default" } {
	for (const configFile of CONFIG_FILES) {
		const configPath = join(root, configFile);
		if (!existsSync(configPath)) {
			continue;
		}

		try {
			const loaded = loadConfigFile(configPath, configFile);
			logger.debug(`Loaded config from ${configFile}`);
			return loaded;
		} catch (error) {
			logger.error(`Failed to load config from ${configFile}:`, error);
			throw error;
		}
	}

	return {
		config: {},
		file: null,
		format: "default",
	};
}

function loadConfigFile(configPath: string, configFile: string): LoadedConfigFile {
	if (configFile.endsWith(".json")) {
		const content = readFileSync(configPath, "utf-8");
		return {
			config: parseConfigObject(JSON.parse(content), configPath),
			file: configPath,
			format: "json",
		};
	}

	const source = readFileSync(configPath, "utf-8");
	const transpiled = transpileConfigModule(source, configPath);
	const moduleExports = evaluateConfigModule(transpiled, configPath);
	return {
		config: extractModuleConfig(moduleExports, configPath),
		file: configPath,
		format: configFile.endsWith(".ts") ? "ts" : "js",
	};
}

function transpileConfigModule(source: string, configPath: string): string {
	const bunRuntime = (globalThis as typeof globalThis & {
		Bun?: {
			Transpiler: new (options: { loader: "js" | "ts" }) => {
				transformSync: (input: string, fileName?: string) => string;
			};
		};
	}).Bun;

	if (bunRuntime?.Transpiler) {
		const loader = configPath.endsWith(".ts") ? "ts" : "js";
		const transpiler = new bunRuntime.Transpiler({ loader });
		const transpiled = transpiler.transformSync(source);
		return normalizeModuleExports(transpiled);
	}

	const transpiled = transpileWithTypeScript(source, configPath);
	return normalizeModuleExports(transpiled);
}

function transpileWithTypeScript(source: string, configPath: string): string {
	const typescript = nodeRequire("typescript") as {
		ModuleKind: { ESNext: number };
		ScriptTarget: { ES2022: number };
		transpileModule: (
			input: string,
			options: {
				compilerOptions: {
					module: number;
					target: number;
				};
				fileName: string;
			},
		) => { outputText: string };
	};

	return typescript.transpileModule(source, {
		compilerOptions: {
			module: typescript.ModuleKind.ESNext,
			target: typescript.ScriptTarget.ES2022,
		},
		fileName: configPath,
	}).outputText;
}

function normalizeModuleExports(source: string): string {
	let code = source;
	let exportsNamedConfig = false;

	code = code.replace(/^\s*export\s+default\s+/m, "module.exports.default = ");

	code = code.replace(/^\s*export\s+(const|let|var)\s+config\s*=/m, (_match, keyword: string) => {
		exportsNamedConfig = true;
		return `${keyword} config =`;
	});

	code = code.replace(/^\s*export\s*\{\s*config\s*\}\s*;?\s*$/m, () => {
		exportsNamedConfig = true;
		return "";
	});

	if (exportsNamedConfig) {
		code += "\nmodule.exports.config = config;\n";
	}

	return code;
}

function evaluateConfigModule(source: string, configPath: string): unknown {
	const module = { exports: {} as Record<string, unknown> };
	const localRequire = (specifier: string): unknown => {
		if (specifier.startsWith("node:")) {
			return nodeRequire(specifier);
		}

		if (specifier.startsWith(".")) {
			const resolvedSpecifier = nodeRequire.resolve(specifier, {
				paths: [dirname(configPath)],
			});
			return nodeRequire(resolvedSpecifier);
		}

		return nodeRequire(specifier);
	};

	const evaluator = new Function("module", "exports", "require", "__filename", "__dirname", source);
	evaluator(module, module.exports, localRequire, configPath, dirname(configPath));
	return module.exports;
}

function extractModuleConfig(moduleExports: unknown, configPath: string): Partial<L8BConfig> {
	if (isRecord(moduleExports)) {
		if ("default" in moduleExports && moduleExports.default !== undefined) {
			return parseConfigObject(moduleExports.default, configPath);
		}

		if ("config" in moduleExports && moduleExports.config !== undefined) {
			return parseConfigObject(moduleExports.config, configPath);
		}
	}

	throw new Error(
		`Config module must export a config object via default export or named "config". File: ${configPath}`,
	);
}

function parseConfigObject(value: unknown, configPath: string): Partial<L8BConfig> {
	if (!isRecord(value)) {
		throw new Error(`Config file must export an object. File: ${configPath}`);
	}

	return value as Partial<L8BConfig>;
}

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === "object" && value !== null && !Array.isArray(value);
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
	const configPath = join(root, "l8b.config.json");
	writeFileSync(configPath, JSON.stringify(config, null, "\t"), "utf-8");
	logger.info(`Created config file: ${configPath}`);
}
