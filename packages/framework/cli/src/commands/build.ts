/**
 * Build command - Creates production bundle
 * 
 * Uses the L8B bundler with plugin system for:
 * - LootiScript compilation
 * - Asset processing with hashing
 * - Runtime bundling
 * - HTML generation
 * - Minification
 */
import { createLogger } from "@l8b/framework-shared";
import { loadConfig } from "@l8b/framework-config";
import { build } from "@l8b/framework-bundler";
import type { L8BPlugin } from "@l8b/framework-bundler";

const logger = createLogger("build");

/**
 * Build command options
 */
export interface BuildOptions {
	/** Project root directory */
	root: string;
	/** Minify output */
	minify: boolean;
	/** Generate sourcemaps */
	sourcemap: boolean;
	/** Generate PWA manifest */
	pwa?: boolean;
	/** Generate service worker */
	serviceWorker?: boolean;
	/** Minifier to use */
	minifier?: "esbuild" | "terser";
	/** Base URL for assets */
	base?: string;
	/** Custom plugins */
	plugins?: L8BPlugin[];
	/** Watch mode */
	watch?: boolean;
}

/**
 * Run build command
 */
export async function buildCommand(options: BuildOptions): Promise<void> {
	const startMessage = options.watch ? "Starting build in watch mode..." : "Building for production...";
	logger.info(startMessage);

	try {
		const config = loadConfig(options.root);

		const result = await build({
			root: options.root,
			outDir: config.outPath,
			minify: options.minify,
			sourcemap: options.sourcemap,
			config,
			pwa: options.pwa,
			serviceWorker: options.serviceWorker,
			minifier: options.minifier,
			base: options.base,
			plugins: options.plugins,
		});

		if (!result.success) {
			logger.error("Build failed:");
			for (const error of result.errors) {
				logger.error(`  ${error}`);
			}
			process.exit(1);
		}

		// Log warnings if any
		if (result.warnings.length > 0) {
			logger.warn(`Build completed with ${result.warnings.length} warning(s):`);
			for (const warning of result.warnings) {
				logger.warn(`  ${warning}`);
			}
		}

		logger.success("Build completed!");
		logger.info("");
		logger.info(`  Output:  ${result.outputDir}`);
		logger.info(`  Files:   ${result.files.length}`);
		logger.info(`  Size:    ${(result.stats.totalSize / 1024).toFixed(2)} KB`);
		logger.info(`  Time:    ${result.stats.buildTime}ms`);
		logger.info("");
		logger.info("  Assets:");
		logger.info(`    Sources: ${result.stats.sourceFiles}`);
		logger.info(`    Sprites: ${result.stats.sprites}`);
		logger.info(`    Maps:    ${result.stats.maps}`);
		logger.info(`    Sounds:  ${result.stats.sounds}`);
		logger.info(`    Music:   ${result.stats.music}`);
		logger.info("");

		// Show PWA/SW status if enabled
		if (options.pwa) {
			logger.info("  PWA:     manifest.json generated");
		}
		if (options.serviceWorker) {
			logger.info("  SW:      sw.js generated");
		}
	} catch (err) {
		logger.error("Build failed:", err);
		process.exit(1);
	}
}
