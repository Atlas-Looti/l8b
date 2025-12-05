/**
 * Minify Plugin - JavaScript minification
 *
 * Uses esbuild for fast minification with optional terser fallback
 */

import type { L8BPlugin } from "./index";
import { createLogger } from "@l8b/framework-shared";

const logger = createLogger("minify-plugin");

/**
 * Minify plugin options
 */
export interface MinifyPluginOptions {
	/** Minifier to use: 'esbuild' (fast) or 'terser' (smaller output) */
	minifier?: "esbuild" | "terser";
	/** Remove console statements */
	dropConsole?: boolean;
	/** Remove debugger statements */
	dropDebugger?: boolean;
	/** Generate source maps */
	sourcemap?: boolean;
	/** Target environment */
	target?: string[];
}

/**
 * Create minify plugin
 */
export function minifyPlugin(options: MinifyPluginOptions = {}): L8BPlugin {
	const {
		minifier = "esbuild",
		dropConsole = false,
		dropDebugger = true,
		sourcemap = false,
		target = ["es2020"],
	} = options;

	return {
		name: "l8b:minify",

		async generateBundle(files, ctx) {
			// Skip game.js since runtime plugin already minifies it
			const jsFiles = Array.from(files.entries()).filter(([name]) => name.endsWith(".js") && name !== "game.js");

			if (jsFiles.length === 0) {
				logger.debug("No additional JavaScript files to minify");
				return;
			}

			logger.info(`Minifying ${jsFiles.length} JavaScript file(s)...`);

			for (const [name, content] of jsFiles) {
				if (typeof content !== "string") {
					continue;
				}

				try {
					const minified = await minifyCode(content, {
						minifier,
						dropConsole,
						dropDebugger,
						sourcemap,
						target,
						filename: name,
					});

					files.set(name, minified.code);

					if (minified.map && sourcemap) {
						files.set(`${name}.map`, minified.map);
					}

					const originalSize = content.length;
					const minifiedSize = minified.code.length;
					const savings = ((1 - minifiedSize / originalSize) * 100).toFixed(1);

					logger.debug(
						`${name}: ${(originalSize / 1024).toFixed(1)}KB -> ${(minifiedSize / 1024).toFixed(1)}KB (${savings}% smaller)`,
					);
				} catch (err) {
					logger.error(`Failed to minify ${name}:`, err);
					ctx.warnings.push(`Minification failed for ${name}: ${err}`);
				}
			}

			logger.info("Minification complete");
		},
	};
}

/**
 * Minify code result
 */
interface MinifyResult {
	code: string;
	map?: string;
}

/**
 * Minify JavaScript code
 */
async function minifyCode(
	code: string,
	options: {
		minifier: "esbuild" | "terser";
		dropConsole: boolean;
		dropDebugger: boolean;
		sourcemap: boolean;
		target: string[];
		filename: string;
	},
): Promise<MinifyResult> {
	if (options.minifier === "esbuild") {
		return minifyWithEsbuild(code, options);
	}
	return minifyWithTerser(code, options);
}

/**
 * Minify with esbuild (fast)
 */
async function minifyWithEsbuild(
	code: string,
	options: {
		dropConsole: boolean;
		dropDebugger: boolean;
		sourcemap: boolean;
		target: string[];
		filename: string;
	},
): Promise<MinifyResult> {
	const esbuild = await import("esbuild");

	// Build drop array
	const drop: ("console" | "debugger")[] = [];
	if (options.dropConsole) drop.push("console");
	if (options.dropDebugger) drop.push("debugger");

	const result = await esbuild.transform(code, {
		minify: true,
		target: options.target,
		drop,
		sourcemap: options.sourcemap ? "external" : false,
		sourcefile: options.filename,
	});

	return {
		code: result.code,
		map: result.map || undefined,
	};
}

/**
 * Minify with terser (smaller output)
 */
async function minifyWithTerser(
	code: string,
	options: {
		dropConsole: boolean;
		dropDebugger: boolean;
		sourcemap: boolean;
		target: string[];
		filename: string;
	},
): Promise<MinifyResult> {
	try {
		// Try to import terser dynamically (optional dependency)
		// eslint-disable-next-line @typescript-eslint/no-require-imports
		const terser = require("terser") as {
			minify: (code: string, options: unknown) => Promise<{ code?: string; map?: string | object }>;
		};

		const result = await terser.minify(code, {
			compress: {
				drop_console: options.dropConsole,
				drop_debugger: options.dropDebugger,
				passes: 2,
			},
			mangle: {
				toplevel: false,
			},
			format: {
				comments: false,
			},
			sourceMap: options.sourcemap
				? {
						filename: options.filename,
						url: `${options.filename}.map`,
					}
				: false,
		});

		return {
			code: result.code || code,
			map: typeof result.map === "string" ? result.map : undefined,
		};
	} catch (err) {
		// Terser not available, fall back to esbuild
		logger.warn("Terser not available, using esbuild fallback");
		return minifyWithEsbuild(code, options);
	}
}

/**
 * Simple manual minification (fallback)
 */
export function simpleMinify(code: string): string {
	return (
		code
			// Remove single-line comments (but not URLs)
			.replace(/(?<!:)\/\/.*$/gm, "")
			// Remove multi-line comments
			.replace(/\/\*[\s\S]*?\*\//g, "")
			// Remove leading/trailing whitespace from lines
			.replace(/^\s+|\s+$/gm, "")
			// Reduce multiple spaces to single
			.replace(/\s{2,}/g, " ")
			// Remove space around operators
			.replace(/\s*([=+\-*/<>!&|,;:{}[\]()])\s*/g, "$1")
			// Remove empty lines
			.replace(/\n{2,}/g, "\n")
			.trim()
	);
}
