/**
 * LootiScript compiler wrapper
 */
import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import {
	type CompilationError,
	type CompilationResult,
	type CompilationWarning,
	createLogger,
	getModuleName,
} from "@l8b/framework-shared";
import { Compiler, Parser } from "@l8b/lootiscript";

const logger = createLogger("compiler");

/**
 * Compilation options
 */
export interface CompileOptions {
	/** File path for error reporting */
	filePath?: string;
	/** Module name */
	moduleName?: string;
	/** Source directory for module name resolution */
	srcDir?: string;
	/** Enable debug mode */
	debug?: boolean;
}

/**
 * Compile LootiScript source code
 */
export function compileSource(source: string, options: CompileOptions = {}): CompilationResult {
	const { filePath = "unknown", moduleName, debug = false } = options;

	const name =
		moduleName || (options.srcDir ? getModuleName(filePath, options.srcDir) : filePath.replace(/\.[^.]+$/, ""));

	const errors: CompilationError[] = [];
	const warnings: CompilationWarning[] = [];

	try {
		// Parse (Parser creates its own Tokenizer internally)
		const parser = new Parser(source, filePath);
		const parseResult = parser.parse();

		// Check for parse errors - parseResult is either Parser or error object
		if (parseResult !== parser && "error" in parseResult) {
			const errorResult = parseResult as { error: string; line: number; column: number };
			errors.push({
				message: errorResult.error,
				file: filePath,
				line: errorResult.line,
				column: errorResult.column,
				source: source.split("\n")[errorResult.line - 1] || "",
			});

			return {
				success: false,
				file: filePath,
				name,
				errors,
				warnings,
			};
		}

		// Parser returns itself on success, get program from it
		const program = parser.program;

		if (debug) {
			logger.debug(`Parsed AST for ${name}`);
		}

		// Collect parser warnings
		if (parser.warnings) {
			for (const w of parser.warnings) {
				warnings.push({
					type: w.type,
					message: w.type,
					file: filePath,
					line: w.line,
					column: w.column,
				});
			}
		}

		// Compile AST to bytecode
		const compiler = new Compiler(program);
		const routine = compiler.routine;

		if (debug) {
			logger.debug(`Compiled routine for ${name}:`, routine);
		}

		return {
			success: true,
			file: filePath,
			name,
			bytecode: serializeRoutine(routine),
			warnings,
		};
	} catch (error) {
		// Preserve full error context for better debugging
		const err = error as Error & {
			line?: number;
			column?: number;
			token?: { value: string; line: number; column: number };
			context?: string;
		};

		const errorLine = err.line || err.token?.line || 1;
		const errorColumn = err.column || err.token?.column || 1;
		const sourceLines = source.split("\n");
		const errorSource = sourceLines[errorLine - 1] || "";

		// Build detailed error message
		let message = err.message;
		if (err.token) {
			message += ` (near token: "${err.token.value}")`;
		}
		if (err.context) {
			message += ` [${err.context}]`;
		}

		errors.push({
			message,
			file: filePath,
			line: errorLine,
			column: errorColumn,
			source: errorSource,
		});

		logger.error(`Compilation failed for ${name}:`, message);

		return {
			success: false,
			file: filePath,
			name,
			errors,
			warnings,
		};
	}
}

/**
 * Compile LootiScript file
 */
export function compileFile(filePath: string, options: Omit<CompileOptions, "filePath"> = {}): CompilationResult {
	try {
		const source = readFileSync(filePath, "utf-8");
		return compileSource(source, { ...options, filePath });
	} catch (error) {
		const err = error as Error;
		return {
			success: false,
			file: filePath,
			name: filePath,
			errors: [
				{
					message: `Failed to read file: ${err.message}`,
					file: filePath,
					line: 0,
					column: 0,
				},
			],
		};
	}
}

/**
 * Serialize routine to bytes
 */
function serializeRoutine(routine: unknown): Uint8Array {
	// Convert routine to JSON and then to bytes
	const json = JSON.stringify(routine);
	return new TextEncoder().encode(json);
}

/**
 * Batch compile multiple files
 */
export async function compileFiles(
	files: Array<{ path: string; source?: string }>,
	options: Omit<CompileOptions, "filePath" | "moduleName"> = {},
): Promise<CompilationResult[]> {
	const results: CompilationResult[] = [];

	for (const file of files) {
		let result: CompilationResult;

		if (file.source !== undefined) {
			result = compileSource(file.source, {
				...options,
				filePath: file.path,
			});
		} else {
			result = compileFile(file.path, options);
		}

		results.push(result);
	}

	return results;
}

/**
 * Create an incremental compiler
 */
export class IncrementalCompiler {
	private cache = new Map<string, { hash: string; result: CompilationResult }>();
	private options: CompileOptions;

	constructor(options: CompileOptions = {}) {
		this.options = options;
	}

	/**
	 * Compile source with caching
	 */
	compile(filePath: string, source: string, hash?: string): CompilationResult {
		const cacheKey = filePath;
		const sourceHash = hash || this.hashSource(source);

		// Check cache
		const cached = this.cache.get(cacheKey);
		if (cached && cached.hash === sourceHash) {
			logger.debug(`Cache hit for ${filePath}`);
			return cached.result;
		}

		// Compile
		const result = compileSource(source, {
			...this.options,
			filePath,
		});

		// Cache successful compilations
		if (result.success) {
			this.cache.set(cacheKey, { hash: sourceHash, result });
		}

		return result;
	}

	/**
	 * Invalidate cache for a file
	 */
	invalidate(filePath: string): void {
		this.cache.delete(filePath);
	}

	/**
	 * Clear all cache
	 */
	clear(): void {
		this.cache.clear();
	}

	/**
	 * Get cache stats
	 */
	getStats(): { size: number; files: string[] } {
		return {
			size: this.cache.size,
			files: Array.from(this.cache.keys()),
		};
	}

	/**
	 * Hash source code using crypto for better performance on large files
	 */
	private hashSource(source: string): string {
		return createHash("md5").update(source).digest("hex");
	}
}

/**
 * Create a new incremental compiler
 */
export function createIncrementalCompiler(options?: CompileOptions): IncrementalCompiler {
	return new IncrementalCompiler(options);
}
