/**
 * L8B Bundler - Creates production builds
 *
 * Architecture inspired by Vite:
 * - Plugin-based for extensibility
 * - Parallel processing for speed
 * - Proper runtime bundling
 */
import { copyFileSync, existsSync, mkdirSync, rmSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { type BuildOptions, createLogger } from "@l8b/framework-shared";
import { compileSource } from "@l8b/compiler";
import { type ResolvedConfig, discoverResources } from "@l8b/framework-config";
import { type L8BPlugin, type BuildContext, PluginContainer } from "./plugins/index";
import { runtimePlugin } from "./plugins/runtime";
import { assetsPlugin } from "./plugins/assets";
import { htmlPlugin } from "./plugins/html";
import { minifyPlugin } from "./plugins/minify";

const logger = createLogger("bundler");

/**
 * Bundle result
 */
export interface BundleResult {
	success: boolean;
	outputDir: string;
	files: string[];
	errors: string[];
	warnings: string[];
	stats: {
		sourceFiles: number;
		sprites: number;
		maps: number;
		sounds: number;
		music: number;
		totalSize: number;
		buildTime: number;
	};
}

/**
 * Build options with config
 */
export interface L8BBuildOptions extends BuildOptions {
	config: ResolvedConfig;
	/** Minify output */
	minify?: boolean;
	/** Generate sourcemaps */
	sourcemap?: boolean;
	/** Custom plugins */
	plugins?: L8BPlugin[];
	/** Generate PWA manifest */
	pwa?: boolean;
	/** Generate service worker */
	serviceWorker?: boolean;
	/** Base URL for assets */
	base?: string;
	/** Minifier to use */
	minifier?: "esbuild" | "terser";
	/** Externalize sources to sources.json (lazy loading) */
	externalSources?: boolean;
}

/**
 * L8B Bundler class
 */
export class L8BBundler {
	private config: ResolvedConfig;
	private options: L8BBuildOptions;
	private pluginContainer: PluginContainer;

	constructor(options: L8BBuildOptions) {
		this.config = options.config;
		this.options = options;

		// Create plugin container with default + custom plugins
		const plugins = this.createDefaultPlugins();
		if (options.plugins) {
			plugins.push(...options.plugins);
		}
		this.pluginContainer = new PluginContainer(plugins);
	}

	/**
	 * Create default plugins based on options
	 */
	private createDefaultPlugins(): L8BPlugin[] {
		const plugins: L8BPlugin[] = [];

		// Assets plugin - always included
		// We copy all assets as files with original names
		plugins.push(
			assetsPlugin({
				hash: false, // Keep original filenames
				hashLength: 8,
				inlineLimit: 0, // Copy all assets as files
			}),
		);

		// HTML plugin
		plugins.push(
			htmlPlugin({
				minify: this.options.minify ?? true,
				pwa: this.options.pwa ?? false,
				serviceWorker: this.options.serviceWorker ?? false,
				base: this.options.base ?? "",
			}),
		);

		// Runtime plugin - bundles the game runtime
		plugins.push(
			runtimePlugin({
				minify: this.options.minify ?? true,
				sourcemap: this.options.sourcemap ?? false,
				externalSources: this.options.externalSources ?? false,
			}),
		);

		// Minify plugin (if minification is enabled)
		if (this.options.minify) {
			plugins.push(
				minifyPlugin({
					minifier: this.options.minifier ?? "esbuild",
					dropConsole: true,
					dropDebugger: true,
					sourcemap: this.options.sourcemap ?? false,
				}),
			);
		}

		return plugins;
	}

	/**
	 * Run the build process
	 */
	async build(): Promise<BundleResult> {
		const startTime = Date.now();
		const errors: string[] = [];
		const warnings: string[] = [];
		const outputFiles: string[] = [];

		logger.info("Starting production build...");
		logger.box(
			"L8B Build",
			[`Root:    ${this.config.root}`, `Output:  ${this.options.outDir}`, `Minify:  ${this.options.minify ?? true}`].join(
				"\n",
			),
		);

		// Clean output directory
		if (existsSync(this.options.outDir)) {
			rmSync(this.options.outDir, { recursive: true });
		}
		mkdirSync(this.options.outDir, { recursive: true });

		// Discover resources (async)
		const resources = await discoverResources(this.config);
		logger.info(
			`Found ${resources.sources.length} sources, ${resources.images.length} sprites, ${resources.maps.length} maps`,
		);

		// Create build context
		const compiledRoutines = new Map<string, Uint8Array>();
		// Support string, Uint8Array, or { copyFrom: string } for large files
		const files = new Map<string, string | Uint8Array | { copyFrom: string }>();
		const ctx: BuildContext = {
			config: this.config,
			resources,
			mode: "production",
			routines: compiledRoutines,
			files: files as any, // Cast to any to avoid type errors in plugins for now
			errors,
			warnings,
		};

		try {
			// Run buildStart hooks
			await this.pluginContainer.buildStart(ctx);

			// Compile all sources
			logger.info("Compiling LootiScript sources...");
			const compileStart = Date.now();

			// Parallel compilation
			await Promise.all(
				resources.sources.map(async (source) => {
					if (!source.content) {
						errors.push(`No content for source: ${source.file}`);
						return;
					}

					const result = compileSource(source.content, {
						filePath: source.file,
						moduleName: source.name,
						srcDir: this.config.srcPath,
					});

					if (!result.success) {
						for (const err of result.errors || []) {
							errors.push(`${err.file}:${err.line}:${err.column}: ${err.message}`);
						}
						return;
					}

					if (result.bytecode) {
						compiledRoutines.set(source.name, result.bytecode);
						logger.debug(`Compiled: ${source.name}`);
					}

					// Collect warnings
					for (const warn of result.warnings || []) {
						warnings.push(`${warn.file}:${warn.line}: ${warn.message}`);
					}
				}),
			);

			const compileTime = Date.now() - compileStart;
			logger.info(`Compilation complete (${compileTime}ms)`);

			// Check for compilation errors
			if (errors.length > 0) {
				throw new Error(`Compilation failed with ${errors.length} error(s)`);
			}

			// Run afterCompile hooks
			await this.pluginContainer.afterCompile(compiledRoutines, ctx);

			// Run generateBundle hooks (this generates all output files)
			logger.info("Generating bundle...");
			await this.pluginContainer.generateBundle(files as any, ctx);

			// Write all files to output directory
			logger.info("Writing output files...");
			for (const [filePath, content] of files) {
				const outputPath = join(this.options.outDir, filePath);

				// Ensure directory exists
				const dir = join(this.options.outDir, filePath.substring(0, filePath.lastIndexOf("/")));
				if (dir !== this.options.outDir && !existsSync(dir)) {
					mkdirSync(dir, { recursive: true });
				}

				// Write file
				if (typeof content === "object" && content !== null && "copyFrom" in content) {
					// Copy file directly
					copyFileSync((content as { copyFrom: string }).copyFrom, outputPath);
				} else if (typeof content === "string") {
					writeFileSync(outputPath, content, "utf-8");
				} else {
					writeFileSync(outputPath, content as Uint8Array);
				}

				outputFiles.push(filePath);
			}

			// Run buildEnd hooks
			await this.pluginContainer.buildEnd(ctx);

			// Calculate total size
			let totalSize = 0;
			for (const file of outputFiles) {
				const filePath = join(this.options.outDir, file);
				if (existsSync(filePath)) {
					totalSize += statSync(filePath).size;
				}
			}

			const buildTime = Date.now() - startTime;

			// Log summary
			logger.success(`Build completed in ${buildTime}ms`);
			logger.box(
				"Build Summary",
				[
					`Output:     ${this.options.outDir}`,
					`Files:      ${outputFiles.length}`,
					`Total size: ${(totalSize / 1024).toFixed(2)} KB`,
					``,
					`Sources:    ${resources.sources.length}`,
					`Sprites:    ${resources.images.length}`,
					`Maps:       ${resources.maps.length}`,
					`Sounds:     ${resources.sounds.length}`,
					`Music:      ${resources.music.length}`,
				].join("\n"),
			);

			if (warnings.length > 0) {
				logger.warn(`Build completed with ${warnings.length} warning(s)`);
			}

			return {
				success: true,
				outputDir: this.options.outDir,
				files: outputFiles,
				errors: [],
				warnings,
				stats: {
					sourceFiles: resources.sources.length,
					sprites: resources.images.length,
					maps: resources.maps.length,
					sounds: resources.sounds.length,
					music: resources.music.length,
					totalSize,
					buildTime,
				},
			};
		} catch (err) {
			// Run buildError hooks
			await this.pluginContainer.buildError(err as Error, ctx);

			logger.error("Build failed:", err);

			return {
				success: false,
				outputDir: this.options.outDir,
				files: outputFiles,
				errors: [...errors, String(err)],
				warnings,
				stats: {
					sourceFiles: resources.sources.length,
					sprites: resources.images.length,
					maps: resources.maps.length,
					sounds: resources.sounds.length,
					music: resources.music.length,
					totalSize: 0,
					buildTime: Date.now() - startTime,
				},
			};
		}
	}
}

/**
 * Create a bundler instance
 */
export function createBundler(options: L8BBuildOptions): L8BBundler {
	return new L8BBundler(options);
}

/**
 * Build a project
 */
export async function build(options: L8BBuildOptions): Promise<BundleResult> {
	const bundler = createBundler(options);
	return bundler.build();
}

/**
 * Re-export plugin types for users
 */
export type { L8BPlugin, BuildContext } from "./plugins/index";

// Re-export plugins
export { runtimePlugin } from "./plugins/runtime";
export { assetsPlugin } from "./plugins/assets";
export { htmlPlugin } from "./plugins/html";
export { minifyPlugin } from "./plugins/minify";
