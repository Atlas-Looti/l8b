/**
 * Build process for LootiScript projects
 *
 * Compiles LootiScript sources, bundles runtime dependencies,
 * and generates production-ready output.
 */

import fs from "fs-extra";
import path from "path";
import pc from "picocolors";
import { compileSources, saveCompiled } from "../build";
import { bundleRuntime } from "../bundler/runtime-bundler";
import { loadConfig } from "../config";
import { generateFarcasterManifestJSON } from "../generator/farcaster-manifest";
import { generateHTML } from "../generator/html-generator";
import { detectResources } from "../loader/auto-detect";
import { loadSources } from "../loader/source-loader";
import { CompilationError } from "../utils/errors";
import { DEFAULT_DIRS, DEFAULT_FILES, getBitCellFontPaths, getCliPackageRoot } from "../utils/paths";

const cliPackageRoot = getCliPackageRoot();

/**
 * Build project for production
 *
 * @param projectPath - Absolute path to project root
 * @throws {CompilationError} If LootiScript compilation fails
 */
export async function build(projectPath: string = process.cwd()): Promise<void> {
	const config = await loadConfig(projectPath);

	const distDir = path.join(projectPath, DEFAULT_DIRS.BUILD_OUTPUT);

	console.log(pc.cyan("\n  🏗️  Building for production...\n"));
	console.log(pc.gray(`  Project: ${projectPath}\n`));

	// Load sources and resources
	console.log(pc.gray("  Scanning sources and assets..."));
	const sources = await loadSources(projectPath);
	const resources = await detectResources(projectPath);

	console.log(pc.green(`  ✓ Found ${Object.keys(sources).length} source files`));
	if (Object.keys(sources).length === 0) {
		console.warn(pc.yellow(`  ⚠ No source files found in ${DEFAULT_DIRS.SCRIPTS}/. Create a .loot file to get started.`));
	}

	console.log(pc.green(`  ✓ Found ${resources.images?.length ?? 0} images, ${resources.maps?.length ?? 0} maps`));

	// Compile LootiScript sources to bytecode
	const compileResult = await compileSources(sources, projectPath);

	if (compileResult.errors.length > 0) {
		// Format and throw compilation errors
		const firstError = compileResult.errors[0];
		throw new CompilationError(firstError.error, firstError.file, firstError.line, firstError.column, {
			totalErrors: compileResult.errors.length,
			errors: compileResult.errors,
			suggestion: "Check the syntax errors above and fix them in your source files.",
		});
	}

	// Clean dist directory
	if (await fs.pathExists(distDir)) {
		console.log(pc.gray("  Cleaning previous build..."));
		await fs.remove(distDir);
	}

	// Ensure dist directory exists
	await fs.ensureDir(distDir);
	await fs.ensureDir(path.join(distDir, DEFAULT_DIRS.FONTS));

	// Save compiled routines
	console.log(pc.gray("  Saving compiled bytecode..."));
	await saveCompiled(compileResult.compiled, distDir);
	console.log(pc.green(`  ✓ Saved ${compileResult.compiled.length} compiled modules`));

	// Bundle runtime and lootiscript for browser
	console.log(pc.gray("  Bundling runtime dependencies..."));
	await bundleRuntime(distDir, projectPath);
	console.log(pc.green("  ✓ Bundled runtime"));

	// Copy public directory assets
	const publicDir = path.join(projectPath, DEFAULT_DIRS.PUBLIC);
	if (await fs.pathExists(publicDir)) {
		console.log(pc.gray("  Copying public assets..."));

		await fs.copy(publicDir, distDir, {
			overwrite: true,
			filter: (src) => {
				// Skip node_modules and other unnecessary files
				const relative = path.relative(publicDir, src);
				return !relative.includes("node_modules") && !relative.startsWith(".") && relative !== DEFAULT_FILES.INDEX_HTML; // We'll generate this
			},
		});
		console.log(pc.green("  ✓ Copied public assets"));
	}

	// Copy source files (.loot) to dist for production
	console.log(pc.gray("  Copying source files..."));
	const scriptsDir = path.join(projectPath, DEFAULT_DIRS.SCRIPTS);

	if (await fs.pathExists(scriptsDir)) {
		const scriptsDest = path.join(distDir, DEFAULT_DIRS.SCRIPTS);
		await fs.ensureDir(scriptsDest);

		/**
		 * Copy .loot files recursively
		 */
		async function copyLootFiles(srcDir: string, destDir: string): Promise<void> {
			const entries = await fs.readdir(srcDir, {
				withFileTypes: true,
			});
			for (const entry of entries) {
				const srcPath = path.join(srcDir, entry.name);
				const destPath = path.join(destDir, entry.name);

				if (entry.isDirectory()) {
					await fs.ensureDir(destPath);
					await copyLootFiles(srcPath, destPath);
				} else if (entry.name.endsWith(".loot")) {
					await fs.copy(srcPath, destPath);
				}
			}
		}

		await copyLootFiles(scriptsDir, scriptsDest);
	}
	console.log(pc.green("  ✓ Copied source files"));

	// Copy BitCell font from CLI package to dist
	const fontPaths = getBitCellFontPaths(cliPackageRoot);

	let fontSourcePath: string | null = null;
	if (await fs.pathExists(fontPaths.dist)) {
		fontSourcePath = fontPaths.dist;
	} else if (await fs.pathExists(fontPaths.assets)) {
		fontSourcePath = fontPaths.assets;
	}

	const fontDistPath = path.join(distDir, DEFAULT_DIRS.FONTS, DEFAULT_FILES.BITCELL_FONT);

	if (fontSourcePath) {
		await fs.copy(fontSourcePath, fontDistPath);
		console.log(pc.green("  ✓ Copied BitCell font"));
	} else {
		// Only warn, don't fail - font might work from browser cache
		console.warn(pc.yellow("  ⚠ BitCell font not found. Tried:"));
		console.warn(pc.yellow(`    ${fontPaths.dist}`));
		console.warn(pc.yellow(`    ${fontPaths.assets}`));
		console.warn(pc.gray("  (Font may still work if cached)"));
	}

	// Generate Farcaster manifest if configured
	if (config.farcaster?.manifest) {
		console.log(pc.gray("  Generating Farcaster manifest..."));
		const manifestJson = generateFarcasterManifestJSON(config);
		if (manifestJson) {
			const manifestDir = path.join(distDir, ".well-known");
			await fs.ensureDir(manifestDir);
			await fs.writeFile(path.join(manifestDir, "farcaster.json"), manifestJson);
			console.log(pc.green("  ✓ Generated /.well-known/farcaster.json"));
		}
	}

	// Generate HTML for production (using pre-compiled routines)
	console.log(pc.gray("  Generating HTML..."));
	const html = generateHTML(
		config,
		{},
		resources,
		compileResult.compiled,
		"/", // routePath for root
	);

	// Write index.html
	await fs.writeFile(path.join(distDir, DEFAULT_FILES.INDEX_HTML), html);
	console.log(pc.green(`  ✓ Generated ${DEFAULT_FILES.INDEX_HTML}`));

	console.log(pc.green("\n  ✓ Build completed successfully!\n"));
	console.log(pc.gray(`  Output: ${distDir}\n`));
	console.log(pc.cyan("  Run `l8b start` to preview the production build\n"));
}
