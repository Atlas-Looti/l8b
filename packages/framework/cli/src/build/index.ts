/**
 * Build-time compiler utilities.
 *
 * Bridges the LootiScript compiler package with the CLI by providing
 * helpers to compile many `.loot` modules and persist their bytecode
 * for the runtime to consume later.
 */

import {
	type CompileError as BaseCompileError,
	type CompileResult as BaseCompileResult,
	type CompileWarning as BaseCompileWarning,
	compileSource,
	serializeRoutineToModule,
} from "@l8b/compiler";
import { CompilationErrorCode, createDiagnostic, formatForCLI } from "@l8b/diagnostics";
import fs from "fs-extra";
import path from "path";
import pc from "picocolors";

import { DEFAULT_DIRS, resolveProjectPath } from "../utils/paths";

/**
 * Compiled module metadata stored on disk.
 */
export interface CompiledModule {
	/** Logical module name (e.g. scenes/intro) */
	name: string;
	/** Serialized routine exported from @l8b/compiler */
	routine: any;
	/** Relative filename for error reporting */
	filename: string;
}

export type CompileError = BaseCompileError;
export type CompileWarning = BaseCompileWarning;

export interface CompileResult {
	compiled: CompiledModule[];
	errors: CompileError[];
	warnings: CompileWarning[];
}

function logDiagnosticLines(text: string, log: (line: string) => void, indent = "      "): void {
	const lines = text.split("\n");
	for (const line of lines) {
		if (line.trim().length === 0) {
			log("");
		} else {
			log(`${indent}${line}`);
		}
	}
}

function formatFallbackMessage(prefix: string, message: string, file?: string, line?: number, column?: number): string {
	let output = `${prefix} ${message}`;
	if (file) {
		output += `\n  at ${file}`;
		if (line !== undefined) {
			output += `:${line}`;
			if (column !== undefined) {
				output += `:${column}`;
			}
		}
	}
	return output;
}

function formatCompileErrorOutput(error: CompileError): string {
	if (error.diagnostic) {
		return formatForCLI(error.diagnostic);
	}

	return formatFallbackMessage("✗", error.error, error.file, error.line, error.column);
}

function formatCompileWarningOutput(warning: CompileWarning): string {
	if (warning.diagnostic) {
		return formatForCLI(warning.diagnostic);
	}

	return formatFallbackMessage("⚠", warning.warning, warning.file, warning.line, warning.column);
}

/**
 * Compile a single file path.
 */
function compileFile(filePath: string, filename: string): BaseCompileResult {
	try {
		const source = fs.readFileSync(filePath, "utf-8");
		return compileSource(source, filename);
	} catch (error: any) {
		const diagnostic = createDiagnostic(error?.code || CompilationErrorCode.E3001, {
			file: filename,
			line: error?.line,
			column: error?.column,
			context: error?.context,
			suggestions: error?.suggestions,
			data: {
				error: error?.message || String(error),
			},
		});

		return {
			errors: [
				{
					file: filename,
					error: diagnostic.message,
					line: diagnostic.line,
					column: diagnostic.column,
					code: diagnostic.code,
					context: diagnostic.context,
					suggestions: diagnostic.suggestions,
					diagnostic,
				},
			],
			warnings: [],
			filename,
		};
	}
}

/**
 * Compile all LootiScript sources discovered in the project.
 */
export async function compileSources(sources: Record<string, string>, projectPath: string): Promise<CompileResult> {
	const compiled: CompiledModule[] = [];
	const errors: CompileError[] = [];
	const warnings: CompileWarning[] = [];

	console.log(pc.gray("  Compiling LootiScript sources..."));

	for (const [moduleName, modulePath] of Object.entries(sources)) {
		const absolutePath = resolveProjectPath(projectPath, modulePath);
		const normalizedPath = path.normalize(absolutePath);
		const relativePath = path.relative(projectPath, normalizedPath);
		const filename = relativePath || path.basename(normalizedPath);

		if (!(await fs.pathExists(normalizedPath))) {
			const diagnostic = createDiagnostic(CompilationErrorCode.E3002, {
				file: filename,
				context: `Resolved path: ${normalizedPath}`,
				suggestions: [`Ensure ${normalizedPath} exists and is readable.`],
				data: {
					filePath: normalizedPath,
				},
			});

			const compileError: CompileError = {
				file: filename,
				error: diagnostic.message,
				line: diagnostic.line,
				column: diagnostic.column,
				code: diagnostic.code,
				context: diagnostic.context,
				suggestions: diagnostic.suggestions,
				diagnostic,
			};

			errors.push(compileError);
			console.error(pc.red(`    ✗ ${moduleName} (${filename})`));
			logDiagnosticLines(formatForCLI(diagnostic), (line) => console.error(pc.red(line)));
			continue;
		}

		const result = compileFile(normalizedPath, filename);

		if (result.errors.length > 0) {
			errors.push(...result.errors);
			for (const error of result.errors) {
				console.error(pc.red(`    ✗ ${moduleName} (${filename})`));
				logDiagnosticLines(formatCompileErrorOutput(error), (line) => console.error(pc.red(line)));
			}
		} else if (result.routine) {
			compiled.push({
				name: moduleName,
				routine: result.routine,
				filename,
			});

			if (result.warnings.length > 0) {
				for (const warning of result.warnings) {
					warnings.push(warning);
					console.warn(pc.yellow(`    ⚠ ${moduleName}: ${warning.warning ?? "Warning"}`));
					logDiagnosticLines(formatCompileWarningOutput(warning), (line) => console.warn(pc.yellow(line)));
				}
			}

			console.log(pc.green(`    ✓ ${moduleName} (${filename})`));
		}
	}

	console.log(pc.green(`  ✓ Compiled ${compiled.length} modules`));

	if (warnings.length > 0) {
		console.warn(pc.yellow(`  ⚠ ${warnings.length} warnings`));
	}

	if (errors.length > 0) {
		console.error(pc.red(`  ✗ ${errors.length} errors`));
	}

	return {
		compiled,
		errors,
		warnings,
	};
}

/**
 * Persist compiled routines to the `.l8b/compiled` directory so the runtime
 * can import them at startup.
 */
export async function saveCompiled(compiled: CompiledModule[], outputDir: string): Promise<void> {
	const compiledDir = path.join(outputDir, DEFAULT_DIRS.COMPILED);
	await fs.ensureDir(compiledDir);

	for (const module of compiled) {
		const outputPath = path.join(compiledDir, `${module.name}.js`);
		const jsContent = serializeRoutineToModule(module.routine, module.name, module.filename);

		await fs.ensureDir(path.dirname(outputPath));
		await fs.writeFile(outputPath, jsContent, "utf-8");
	}

	const manifest = {
		modules: compiled.map((module) => ({
			name: module.name,
			filename: module.filename,
			path: `${DEFAULT_DIRS.COMPILED}/${module.name}.js`,
		})),
	};

	await fs.writeJSON(path.join(outputDir, "compiled-manifest.json"), manifest, {
		spaces: 2,
	});
}
