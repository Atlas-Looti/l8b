/**
 * Runtime Plugin - Bundles the L8B runtime for production
 *
 * This plugin is responsible for:
 * 1. Bundling the @l8b/runtime package with proper optimization
 * 2. Creating the Player class (like microstudio's player.coffee)
 * 3. Embedding compiled routines
 */

import type { L8BPlugin } from "./index";
import { createLogger } from "@l8b/framework-shared";
import { PLAYER_TEMPLATE } from "../templates/player";
import { INIT_TEMPLATE } from "../templates/init";

const logger = createLogger("runtime-plugin");

/**
 * Runtime plugin options
 */
export interface RuntimePluginOptions {
	/** Minify the runtime bundle */
	minify?: boolean;
	/** Include source maps */
	sourcemap?: boolean;
	/** Externalize sources to sources.json (lazy loading) */
	externalSources?: boolean;

}

/**
 * Create runtime plugin
 */
export function runtimePlugin(options: RuntimePluginOptions = {}): L8BPlugin {
	const {
		minify = false,
		sourcemap = false,
		externalSources = false,

	} = options;

	return {
		name: "l8b:runtime",

		// Clear cache at build start to prevent stale data in watch mode
		buildStart() {
			// TODO: Verify if explicit cache clearing is needed with esbuild incremental build.
		},

		async generateBundle(files, ctx) {
			logger.info("Generating runtime bundle...");

			try {
				// 1. Generate sources code
				let sourcesCode = "";
				if (externalSources) {
					const sourcesData = generateSourcesData(ctx.resources.sources);
					files.set("sources.json", JSON.stringify(sourcesData));
					sourcesCode = "window.__L8B_EXTERNAL_SOURCES__ = true;";
					logger.info(`Generated sources.json (${(JSON.stringify(sourcesData).length / 1024).toFixed(1)} KB)`);
				} else {
					sourcesCode = generateSourcesCode(ctx.resources.sources);
				}

				// 2. Create virtual entry point
				const virtualEntry = [
					`import { RuntimeOrchestrator } from "@l8b/runtime";`,
					`// Sources`,
					sourcesCode,
					`// Player Template`,
					PLAYER_TEMPLATE,
					`// Init Template`,
					INIT_TEMPLATE,
					`// Export Runtime`,
					`window.Runtime = RuntimeOrchestrator;`,
				].join("\n");

				// 3. Build with esbuild (splitting enabled)
				const esbuild = await import("esbuild");
				const result = await esbuild.build({
					stdin: {
						contents: virtualEntry,
						resolveDir: process.cwd(),
						sourcefile: "game.js",
						loader: "ts",
					},
					bundle: true,
					format: "esm",
					splitting: true,
					platform: "browser",
					outdir: "dist", // Virtual output directory for in-memory build
					write: false,
					minify,
					sourcemap: sourcemap ? "inline" : false,
					define: {
						"process.env.NODE_ENV": '"production"',

					},
					logLevel: "warning",
				});

				// 4. Write all output files to the bundle
				for (const file of result.outputFiles) {
					// esbuild returns absolute paths or paths relative to outdir
					// We need the basename to set in the files map
					const fileName = file.path.split("/").pop()!;
					files.set(fileName, file.text);
				}

				const mainFile = result.outputFiles.find((f) => f.path.endsWith("game.js"));
				const sizeKB = mainFile ? (mainFile.text.length / 1024).toFixed(1) : "0";
				logger.success(`Runtime bundle generated (${sizeKB} KB + ${result.outputFiles.length - 1} chunks)`);
			} catch (err) {
				logger.error("Failed to generate runtime bundle:", err);
				ctx.errors.push(`Runtime bundle error: ${err}`);
			}
		},
	};
}

/**
 * Generate code to embed sources (similar to MicroStudio's approach)
 * Sources are embedded and compiled at runtime
 */
function generateSourcesCode(sources: Array<{ name: string; content?: string }>): string {
	const embedded = generateSourcesData(sources);
	return `window.__L8B_SOURCES__ = ${JSON.stringify(embedded)};`;
}

/**
 * Generate sources data object
 */
function generateSourcesData(sources: Array<{ name: string; content?: string }>): Record<string, string> {
	const embedded: Record<string, string> = {};

	for (const source of sources) {
		if (source.content) {
			embedded[source.name] = source.content;
		}
	}

	return embedded;
}
