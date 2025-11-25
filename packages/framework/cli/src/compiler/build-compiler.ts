/**
 * Build-time compiler for LootiScript
 *
 * Compiles .loot files to bytecode Routines during build,
 * similar to how Next.js pre-compiles React code.
 */

import {
	compileSource,
	serializeRoutineToModule,
	type CompileResult as BaseCompileResult,
	type CompileError as BaseCompileError,
	type CompileWarning as BaseCompileWarning,
} from "@l8b/compiler";
import path from "path";
import fs from "fs-extra";
import pc from "picocolors";
import { Worker } from "worker_threads";
import os from "os";

import { resolveProjectPath, getCliPackageRoot } from "../utils/paths";

// Get CLI package root to resolve worker path
// This works whether running from source or built dist
function getWorkerScriptPath(): string {
	const cliRoot = getCliPackageRoot();
	// Worker is always built to dist/compiler/compile-worker.js
	const distPath = path.join(cliRoot, "dist", "compiler", "compile-worker.js");

	if (!fs.existsSync(distPath)) {
		throw new Error(
			`Worker script not found at ${distPath}. Please run 'npm run build' in @l8b/cli package.`,
		);
	}

	return distPath;
}

// Re-export types from @l8b/compiler for compatibility
export type CompileError = BaseCompileError;
export type CompileWarning = BaseCompileWarning;

/**
 * Compiled module result
 */
export interface CompiledModule {
	/** Module name (derived from file path) */
	name: string;
	/** Serialized Routine from routine.export() */
	routine: any;
	/** Source filename */
	filename: string;
}

/**
 * Compilation result
 */
export interface CompileResult {
	/** Successfully compiled modules */
	compiled: CompiledModule[];
	/** Compilation errors */
	errors: CompileError[];
	/** Compilation warnings */
	warnings: CompileWarning[];
}

/**
 * Compile a single .loot file to bytecode
 *
 * @param filePath - Absolute path to .loot file
 * @param filename - Filename for error reporting
 * @returns Compilation result with routine or error
 */
function compileFile(filePath: string, filename: string): BaseCompileResult {
	try {
		const source = fs.readFileSync(filePath, "utf-8");
		return compileSource(source, filename);
	} catch (error: any) {
		return {
			errors: [
				{
					file: filename,
					error: error.message || String(error),
				},
			],
			warnings: [],
			filename,
		};
	}
}

/**
 * Split array into chunks
 */
function chunkArray<T>(array: T[], chunkSize: number): T[][] {
	const chunks: T[][] = [];
	for (let i = 0; i < array.length; i += chunkSize) {
		chunks.push(array.slice(i, i + chunkSize));
	}
	return chunks;
}

/**
 * Compile all .loot source files to bytecode in parallel using worker threads
 *
 * @param sources - Map of module names to file paths
 * @param projectPath - Absolute path to project root
 * @param useParallel - Whether to use parallel compilation (default: true)
 * @returns Compilation result with compiled modules, errors, and warnings
 */
export async function compileSources(
	sources: Record<string, string>,
	projectPath: string,
	useParallel: boolean = true,
): Promise<CompileResult> {
	// Use parallel compilation if enabled and we have multiple files
	const sourceEntries = Object.entries(sources);
	const shouldUseParallel =
		useParallel && sourceEntries.length > 1 && os.cpus().length > 1;

	if (shouldUseParallel) {
		return compileSourcesParallel(sourceEntries, projectPath);
	} else {
		return compileSourcesSequential(sourceEntries, projectPath);
	}
}

/**
 * Compile sources in parallel using worker threads
 *
 * @param sourceEntries - Array of [moduleName, filePath] tuples
 * @param projectPath - Absolute path to project root
 * @returns Compilation result
 */
async function compileSourcesParallel(
	sourceEntries: Array<[string, string]>,
	projectPath: string,
): Promise<CompileResult> {
	const compiledModules: CompiledModule[] = [];
	const compileErrors: CompileError[] = [];
	const compileWarnings: CompileWarning[] = [];

	console.log(pc.gray("  Compiling LootiScript sources (parallel)..."));

	// Determine worker count (use CPU count, but cap at number of files)
	const cpuCount = os.cpus().length;
	const workerCount = Math.min(cpuCount, sourceEntries.length);

	// Split sources into chunks
	const chunks = chunkArray(
		sourceEntries,
		Math.ceil(sourceEntries.length / workerCount),
	);

	// Get worker script path
	const workerScript = getWorkerScriptPath();

	// Create workers
	const workers: Worker[] = [];
	const promises: Promise<{
		compiled: CompiledModule[];
		errors: CompileError[];
		warnings: CompileWarning[];
	}>[] = [];

	for (const chunk of chunks) {
		if (chunk.length === 0) continue;

		const worker = new Worker(workerScript, {
			workerData: { chunk, projectPath },
		});

		workers.push(worker);

		const promise = new Promise<{
			compiled: CompiledModule[];
			errors: CompileError[];
			warnings: CompileWarning[];
		}>((resolve, reject) => {
			worker.on("message", (result) => {
				resolve(result);
			});
			worker.on("error", (error) => {
				reject(error);
			});
		});

		promises.push(promise);
	}

	// Wait for all workers to complete
	try {
		const results = await Promise.all(promises);

		// Merge results
		for (const result of results) {
			compiledModules.push(...result.compiled);
			compileErrors.push(...result.errors);
			compileWarnings.push(...result.warnings);
		}

		// Log results
		for (const module of compiledModules) {
			console.log(pc.green(`    ✓ ${module.name} (${module.filename})`));
		}

		for (const error of compileErrors) {
			console.error(pc.red(`    ✗ ${error.file}`));
			console.error(pc.red(`      ${error.error}`));
			if (error.line !== undefined) {
				console.error(
					pc.gray(`      Line ${error.line}, Column ${error.column || 0}`),
				);
			}
		}

		for (const warning of compileWarnings) {
			console.warn(pc.yellow(`    ⚠ ${warning.warning}`));
		}
	} catch (error) {
		console.error(pc.red("  ✗ Worker error:"), error);
		compileErrors.push({
			file: "worker",
			error: error instanceof Error ? error.message : String(error),
		});
	} finally {
		// Terminate all workers
		for (const worker of workers) {
			worker.terminate();
		}
	}

	console.log(pc.green(`  ✓ Compiled ${compiledModules.length} modules`));

	if (compileWarnings.length > 0) {
		console.warn(pc.yellow(`  ⚠ ${compileWarnings.length} warnings`));
	}

	if (compileErrors.length > 0) {
		console.error(pc.red(`  ✗ ${compileErrors.length} errors`));
	}

	return {
		compiled: compiledModules,
		errors: compileErrors,
		warnings: compileWarnings,
	};
}

/**
 * Compile sources sequentially (fallback)
 *
 * @param sourceEntries - Array of [moduleName, filePath] tuples
 * @param projectPath - Absolute path to project root
 * @returns Compilation result
 */
async function compileSourcesSequential(
	sourceEntries: Array<[string, string]>,
	projectPath: string,
): Promise<CompileResult> {
	const compiledModules: CompiledModule[] = [];
	const compileErrors: CompileError[] = [];
	const compileWarnings: CompileWarning[] = [];

	console.log(pc.gray("  Compiling LootiScript sources..."));

	for (const [moduleName, filePath] of sourceEntries) {
		// Resolve full file path
		// loadSources() returns paths like /scripts/main.loot which are relative to project root
		// So we use resolveProjectPath to handle this correctly
		const fullPath = resolveProjectPath(projectPath, filePath);

		// Normalize the path (resolve .. and . components)
		const normalizedPath = path.normalize(fullPath);

		// Get relative filename for error reporting
		const relativePath = path.relative(projectPath, normalizedPath);
		const filename = relativePath || path.basename(normalizedPath);

		// Verify file exists before compiling
		if (!fs.existsSync(normalizedPath)) {
			compileErrors.push({
				file: filename,
				error: `File not found: ${normalizedPath}`,
			});
			console.error(pc.red(`    ✗ ${moduleName} (${filename})`));
			console.error(pc.red(`      File not found: ${normalizedPath}`));
			continue;
		}

		// Compile file using @l8b/compiler
		const result = compileFile(normalizedPath, filename);

		if (result.errors.length > 0) {
			compileErrors.push(...result.errors);
			for (const error of result.errors) {
				console.error(pc.red(`    ✗ ${moduleName} (${filename})`));
				console.error(pc.red(`      ${error.error}`));
				if (error.line !== undefined) {
					console.error(
						pc.gray(`      Line ${error.line}, Column ${error.column || 0}`),
					);
				}
			}
		} else if (result.routine) {
			compiledModules.push({
				name: moduleName,
				routine: result.routine,
				filename,
			});

			// Show warnings if any
			if (result.warnings.length > 0) {
				for (const warning of result.warnings) {
					compileWarnings.push(warning);
					console.warn(pc.yellow(`    ⚠ ${moduleName}: ${warning.warning}`));
				}
			}

			console.log(pc.green(`    ✓ ${moduleName} (${filename})`));
		}
	}

	console.log(pc.green(`  ✓ Compiled ${compiledModules.length} modules`));

	if (compileWarnings.length > 0) {
		console.warn(pc.yellow(`  ⚠ ${compileWarnings.length} warnings`));
	}

	if (compileErrors.length > 0) {
		console.error(pc.red(`  ✗ ${compileErrors.length} errors`));
	}

	return {
		compiled: compiledModules,
		errors: compileErrors,
		warnings: compileWarnings,
	};
}

/**
 * Save compiled routines to disk as JS modules
 *
 * @param compiled - Array of compiled modules to save
 * @param outputDir - Output directory for compiled files
 */
export async function saveCompiled(
	compiled: CompiledModule[],
	outputDir: string,
): Promise<void> {
	const { DEFAULT_DIRS } = await import("../utils/paths");
	const compiledDir = path.join(outputDir, DEFAULT_DIRS.COMPILED);
	await fs.ensureDir(compiledDir);

	// Save each compiled module as JS file that exports the routine data
	for (const module of compiled) {
		const outputPath = path.join(compiledDir, `${module.name}.js`);
		// Ensure parent directory exists for nested modules (e.g., scenes/battle.js)
		await fs.ensureDir(path.dirname(outputPath));

		// Use the serialization utility from @l8b/compiler
		// Check if source map support is available (will be added in Phase 2.3)
		const jsContent = serializeRoutineToModule(
			module.routine,
			module.name,
			module.filename,
		);

		await fs.writeFile(outputPath, jsContent, "utf-8");

		// TODO: Generate source map file when @l8b/compiler supports it
		// const sourceMapPath = outputPath + ".map";
		// if (sourceMap) {
		//   await fs.writeFile(sourceMapPath, sourceMap, "utf-8");
		// }
	}

	// Save manifest of all compiled modules
	const manifest = {
		modules: compiled.map((m) => ({
			name: m.name,
			filename: m.filename,
			path: `${DEFAULT_DIRS.COMPILED}/${m.name}.js`,
		})),
	};

	await fs.writeJSON(path.join(outputDir, "compiled-manifest.json"), manifest, {
		spaces: 2,
	});
}
