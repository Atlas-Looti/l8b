/**
 * LootiScript Compiler Adapter
 *
 * Implementation of ICompiler using @l8b/compiler
 */

import {
	compileSource,
	serializeRoutineToModule,
} from "@l8b/compiler";
import { CompilationErrorCode, createDiagnostic, formatForCLI, type Diagnostic } from "@l8b/diagnostics";
import path from "path";
import type { CompiledModule, CompiledRoutine } from "../../core/types";
import type { CompileError, CompileResult, CompileWarning, ICompiler, IFileSystem, ILogger } from "../../core/ports";
import { DEFAULT_DIRS, resolveProjectPath } from "../../utils/paths";

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
	if (error.diagnostic && typeof error.diagnostic === 'object' && 'code' in error.diagnostic && 'message' in error.diagnostic) {
		return formatForCLI(error.diagnostic as Diagnostic);
	}
	return formatFallbackMessage("✗", error.error, error.file, error.line, error.column);
}

function formatCompileWarningOutput(warning: CompileWarning): string {
	if (warning.diagnostic && typeof warning.diagnostic === 'object' && 'code' in warning.diagnostic && 'message' in warning.diagnostic) {
		return formatForCLI(warning.diagnostic as Diagnostic);
	}
	return formatFallbackMessage("⚠", warning.warning, warning.file, warning.line, warning.column);
}

export class LootiScriptCompiler implements ICompiler {
	constructor(
		private fileSystem: IFileSystem,
		private logger: ILogger,
	) {}

	async compileFile(
		filePath: string,
		filename: string,
	): Promise<{
		routine?: CompiledRoutine;
		errors: CompileError[];
		warnings: CompileWarning[];
		filename: string;
	}> {
		try {
			const source = await this.fileSystem.readFile(filePath);
			const result = compileSource(source, filename);
			return {
				routine: result.routine,
				errors: result.errors as CompileError[],
				warnings: result.warnings as CompileWarning[],
				filename,
			};
		} catch (error: unknown) {
			const err = error as {
				code?: string;
				line?: number;
				column?: number;
				context?: string;
				suggestions?: string[];
				message?: string;
			};
			const diagnostic = createDiagnostic(err.code || CompilationErrorCode.E3001, {
				file: filename,
				line: err.line,
				column: err.column,
				context: err.context,
				suggestions: err.suggestions,
				data: {
					error: err.message || String(error),
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

	async compileSources(sources: Record<string, string>, projectPath: string): Promise<CompileResult> {
		const compiled: CompiledModule[] = [];
		const errors: CompileError[] = [];
		const warnings: CompileWarning[] = [];

		for (const [moduleName, modulePath] of Object.entries(sources)) {
			const absolutePath = resolveProjectPath(projectPath, modulePath);
			const normalizedPath = path.normalize(absolutePath);
			const relativePath = path.relative(projectPath, normalizedPath);
			const filename = relativePath || path.basename(normalizedPath);

			if (!(await this.fileSystem.pathExists(normalizedPath))) {
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
				this.logger.error(`✗ ${moduleName} (${filename})`);
				logDiagnosticLines(formatForCLI(diagnostic), (line) => this.logger.error(line));
				continue;
			}

			const result = await this.compileFile(normalizedPath, filename);

			if (result.errors.length > 0) {
				errors.push(...result.errors);
				for (const error of result.errors) {
					this.logger.error(`✗ ${moduleName} (${filename})`);
					logDiagnosticLines(formatCompileErrorOutput(error), (line) => this.logger.error(line));
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
						this.logger.warn(`⚠ ${moduleName}: ${warning.warning ?? "Warning"}`);
						logDiagnosticLines(formatCompileWarningOutput(warning), (line) => this.logger.warn(line));
					}
				}
			}
		}

		if (errors.length > 0) {
			this.logger.error(`\n✗ ${errors.length} compilation error${errors.length > 1 ? "s" : ""}`);
		} else if (warnings.length > 0) {
			this.logger.warn(`⚠ ${warnings.length} warning${warnings.length > 1 ? "s" : ""}`);
		} else if (compiled.length > 0) {
			this.logger.success(`✓ Compiled ${compiled.length} module${compiled.length > 1 ? "s" : ""}`);
		}

		return {
			compiled,
			errors,
			warnings,
		};
	}

	async saveCompiled(compiled: CompiledModule[], outputDir: string): Promise<void> {
		const compiledDir = path.join(outputDir, DEFAULT_DIRS.COMPILED);
		await this.fileSystem.ensureDir(compiledDir);

		for (const module of compiled) {
			const outputPath = path.join(compiledDir, `${module.name}.js`);
			const jsContent = serializeRoutineToModule(module.routine, module.name, module.filename);

			await this.fileSystem.ensureDir(path.dirname(outputPath));
			await this.fileSystem.writeFile(outputPath, jsContent);
		}

		// Write manifest once after all modules are saved
		const manifest = {
			modules: compiled.map((module) => ({
				name: module.name,
				filename: module.filename,
				path: `${DEFAULT_DIRS.COMPILED}/${module.name}.js`,
			})),
		};

		await this.fileSystem.writeJson(path.join(outputDir, "compiled-manifest.json"), manifest, {
			spaces: 2,
		});
	}
}
