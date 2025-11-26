/**
 * @l8b/compiler - LootiScript compilation utilities
 *
 * Provides helpers to compile LootiScript source code into executable routines,
 * plus serialization utilities for routines.
 */

import { Parser, Compiler } from "@l8b/lootiscript";
import {
	createDiagnostic,
	type Diagnostic,
	SyntaxErrorCode,
	WarningCode,
	CompilationErrorCode,
} from "@l8b/diagnostics";

/**
 * Compilation error information
 */
export interface CompileError {
	file: string;
	error: string;
	line?: number;
	column?: number;
	code?: string;
	context?: string;
	suggestions?: string[];
	diagnostic?: Diagnostic;
}

/**
 * Compilation warning information
 */
export interface CompileWarning {
	file: string;
	warning: string;
	line?: number;
	column?: number;
	code?: string;
	context?: string;
	suggestions?: string[];
	diagnostic?: Diagnostic;
}

/**
 * Compilation result
 */
const warningCodeMap: Record<string, WarningCode> = {
	assigning_api_variable: WarningCode.W1001,
	assignment_as_condition: WarningCode.W1002,
};

export interface CompileResult {
	/** Successfully compiled routine (if no errors) */
	routine?: any;
	/** Compilation errors */
	errors: CompileError[];
	/** Compilation warnings */
	warnings: CompileWarning[];
	/** Source filename */
	filename?: string;
}

/**
 * Compile LootiScript source code to bytecode routine
 *
 * @param source - Source code string
 * @param filename - Filename for error reporting (default: 'source.loot')
 * @returns Compilation result with routine or errors
 */
export function compileSource(
	source: string,
	filename: string = "source.loot",
): CompileResult {
	const errors: CompileError[] = [];
	const warnings: CompileWarning[] = [];

	const pushError = (code: string, info: Record<string, any> = {}): void => {
		const diagnostic = createDiagnostic(code, {
			file: filename,
			line: info.line,
			column: info.column,
			length: info.length,
			context: info.context,
			suggestions: info.suggestions,
			related: info.related,
			stackTrace: info.stackTrace,
			data: info,
		});

		errors.push({
			file: filename,
			error: diagnostic.message,
			line: diagnostic.line,
			column: diagnostic.column,
			code: diagnostic.code,
			context: diagnostic.context,
			suggestions: diagnostic.suggestions,
			diagnostic,
		});
	};

	const pushWarning = (code: string, info: Record<string, any> = {}): void => {
		const diagnostic = createDiagnostic(code, {
			file: filename,
			line: info.line,
			column: info.column,
			context: info.context,
			suggestions: info.suggestions,
			data: info,
		});

		warnings.push({
			file: filename,
			warning: diagnostic.message,
			line: diagnostic.line,
			column: diagnostic.column,
			code: diagnostic.code,
			context: diagnostic.context,
			suggestions: diagnostic.suggestions,
			diagnostic,
		});
	};

	try {
		// Parse source code
		const parser = new Parser(source, filename);
		parser.parse();

		// Check for parse errors
		if ((parser as any).error_info) {
			const err = (parser as any).error_info;
			pushError(err.code || SyntaxErrorCode.E1004, err);

			return { errors, warnings, filename };
		}

		// Compile to bytecode
		const compiler = new Compiler(parser.program);

		// Export routine to serializable format
		const routine = compiler.routine.export();

		// Collect warnings
		for (const w of parser.warnings) {
			const warningCode =
				warningCodeMap[w.type as keyof typeof warningCodeMap] ??
				WarningCode.W1001;
			pushWarning(warningCode, w);
		}

		return {
			routine,
			errors,
			warnings,
			filename,
		};
	} catch (error: any) {
		pushError(
			error.code || CompilationErrorCode.E3001,
			error.line !== undefined
				? error
				: {
						error: error.message || String(error),
						line: error.line,
						column: error.column,
						context: error.context,
						suggestions: error.suggestions,
					},
		);

		return { errors, warnings, filename };
	}
}

/**
 * Compile a LootiScript file to bytecode routine
 *
 * Note: This is a Node.js-only function that reads from the filesystem.
 * For browser environments, use compileSource() with pre-loaded source.
 *
 * @param filePath - Absolute path to .loot file
 * @returns Compilation result with routine or errors
 */
export async function compileFile(filePath: string): Promise<CompileResult> {
	try {
		// Dynamic import to avoid bundling fs in browser builds
		const fs = await import("fs");
		const path = await import("path");

		const source = fs.readFileSync(filePath, "utf-8");
		const filename = path.basename(filePath);

		return compileSource(source, filename);
	} catch (error: any) {
		const diagnostic = createDiagnostic(
			error.code || CompilationErrorCode.E3001,
			{
				file: filePath,
				line: error.line,
				column: error.column,
				context: error.context,
				suggestions: error.suggestions,
				data: {
					error: error.message || String(error),
				},
			},
		);

		return {
			errors: [
				{
					file: filePath,
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
			filename: filePath,
		};
	}
}
