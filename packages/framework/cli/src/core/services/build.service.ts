/**
 * Build Service
 *
 * Service layer for orchestrating build workflow
 * Handles coordination between multiple use cases
 */

import path from "path";
import { generateFarcasterManifestJSON } from "../../infrastructure/adapters/generator/farcaster-manifest-generator.adapter";
import { CompilationError } from "../../utils/errors";
import { DEFAULT_DIRS, DEFAULT_FILES } from "../../utils/paths";
import type { IFileSystem, ILogger } from "../ports";
import type {
	BundleRuntimeUseCase,
	CompileSourcesUseCase,
	DetectResourcesUseCase,
	GenerateHTMLUseCase,
	LoadConfigUseCase,
	LoadSourcesUseCase,
} from "../use-cases";
import type { Result } from "../types";
import { failure, success } from "../types";

/**
 * Build Service Input/Output Interfaces
 */
export interface BuildServiceInput {
	/** Absolute path to project root */
	projectPath: string;
}

export interface BuildServiceOutput {
	/** Absolute path to build output directory */
	distDir: string;
}

export class BuildService {
	constructor(
		private fileSystem: IFileSystem,
		private logger: ILogger,
		private loadConfigUseCase: LoadConfigUseCase,
		private loadSourcesUseCase: LoadSourcesUseCase,
		private detectResourcesUseCase: DetectResourcesUseCase,
		private compileSourcesUseCase: CompileSourcesUseCase,
		private bundleRuntimeUseCase: BundleRuntimeUseCase,
		private generateHTMLUseCase: GenerateHTMLUseCase,
	) {}

	async build(input: BuildServiceInput): Promise<Result<BuildServiceOutput, CompilationError | Error>> {
		// Load config
		const configResult = await this.loadConfigUseCase.execute(input.projectPath);
		if (!configResult.success) {
			return failure(configResult.error);
		}
		const config = configResult.data;

		const distDir = path.join(input.projectPath, DEFAULT_DIRS.BUILD_OUTPUT);
		this.logger.info(`\nBuilding ${config.name || "project"}...\n`);

		// Load sources and resources
		const sourcesResult = await this.loadSourcesUseCase.execute(input.projectPath);
		if (!sourcesResult.success) {
			return failure(sourcesResult.error);
		}
		const sources = sourcesResult.data;

		const resourcesResult = await this.detectResourcesUseCase.execute(input.projectPath);
		if (!resourcesResult.success) {
			return failure(resourcesResult.error);
		}
		const resources = resourcesResult.data;

		if (Object.keys(sources).length === 0) {
			this.logger.warn(`No source files found in ${DEFAULT_DIRS.SCRIPTS}/. Create a .loot file to get started.`);
		}

		// Compile LootiScript sources to bytecode
		const compileResult = await this.compileSourcesUseCase.execute(sources, input.projectPath);
		if (!compileResult.success) {
			return failure(compileResult.error);
		}
		const compiled = compileResult.data;

		if (compiled.errors.length > 0) {
			// Format and throw compilation errors
			const firstError = compiled.errors[0];
			return failure(
				new CompilationError(firstError.error, firstError.file, firstError.line, firstError.column, {
					totalErrors: compiled.errors.length,
					errors: compiled.errors,
					suggestion: "Check the syntax errors above and fix them in your source files.",
				}),
			);
		}

		// Clean dist directory
		if (await this.fileSystem.pathExists(distDir)) {
			await this.fileSystem.remove(distDir);
		}

		// Ensure dist directory exists
		await this.fileSystem.ensureDir(distDir);
		await this.fileSystem.ensureDir(path.join(distDir, DEFAULT_DIRS.FONTS));

		// Save compiled routines
		const saveResult = await this.compileSourcesUseCase.saveCompiled(compiled.compiled, distDir);
		if (!saveResult.success) {
			return failure(saveResult.error);
		}

		// Bundle runtime and lootiscript for browser
		const bundleResult = await this.bundleRuntimeUseCase.execute(distDir, input.projectPath);
		if (!bundleResult.success) {
			return failure(bundleResult.error);
		}

		// Parallel file operations: Copy public assets and source files simultaneously
		const publicDir = path.join(input.projectPath, DEFAULT_DIRS.PUBLIC);
		const scriptsDir = path.join(input.projectPath, DEFAULT_DIRS.SCRIPTS);

		const copyOperations: Promise<void>[] = [];

		// Copy public directory assets
		if (await this.fileSystem.pathExists(publicDir)) {
			copyOperations.push(
				this.fileSystem.copy(publicDir, distDir, {
					overwrite: true,
					filter: (src) => {
						// Skip node_modules and other unnecessary files
						const relative = path.relative(publicDir, src);
						return !relative.includes("node_modules") && !relative.startsWith(".") && relative !== DEFAULT_FILES.INDEX_HTML; // We'll generate this
					},
				}),
			);
		}

		// Copy source files (.loot) to dist for production
		if (await this.fileSystem.pathExists(scriptsDir)) {
			const scriptsDest = path.join(distDir, DEFAULT_DIRS.SCRIPTS);
			await this.fileSystem.ensureDir(scriptsDest);

			/**
			 * Copy .loot files recursively
			 */
			async function copyLootFiles(srcDir: string, destDir: string, fileSystem: IFileSystem): Promise<void> {
				const entries = await fileSystem.readdir(srcDir, {
					withFileTypes: true,
				});
				for (const entry of entries as import("fs").Dirent[]) {
					const srcPath = path.join(srcDir, entry.name);
					const destPath = path.join(destDir, entry.name);

					if (entry.isDirectory()) {
						await fileSystem.ensureDir(destPath);
						await copyLootFiles(srcPath, destPath, fileSystem);
					} else if (entry.name.endsWith(".loot")) {
						await fileSystem.copy(srcPath, destPath);
					}
				}
			}

			copyOperations.push(copyLootFiles(scriptsDir, scriptsDest, this.fileSystem));
		}

		// Wait for all copy operations to complete
		if (copyOperations.length > 0) {
			await Promise.all(copyOperations);
		}

		// Generate Farcaster manifest if configured
		if (config.farcaster?.manifest) {
			const manifestJson = generateFarcasterManifestJSON(config);
			if (manifestJson) {
				const manifestDir = path.join(distDir, ".well-known");
				await this.fileSystem.ensureDir(manifestDir);
				await this.fileSystem.writeFile(path.join(manifestDir, "farcaster.json"), manifestJson);
			}
		}

		// Load environment variables for production build
		const { loadEnvFiles } = await import("../../infrastructure/adapters/env-loader");
		const envVars = await loadEnvFiles(input.projectPath, this.fileSystem, "production", this.logger);

		// Generate HTML for production (using pre-compiled routines)
		const html = this.generateHTMLUseCase.execute(
			config,
			{},
			resources,
			compiled.compiled,
			"/", // routePath for root
			envVars, // environment variables
		);

		// Write index.html
		await this.fileSystem.writeFile(path.join(distDir, DEFAULT_FILES.INDEX_HTML), html);

		// Generate 404.html page using game engine
		const html404 = this.generateHTMLUseCase.generate404HTML(config, true); // true = production
		await this.fileSystem.writeFile(path.join(distDir, "404.html"), html404);

		this.logger.success(`\n✓ Build completed: ${distDir}\n`);

		return success({
			distDir,
		});
	}
}

