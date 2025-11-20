/**
 * @l8b/compiler - LootiScript compilation utilities
 * 
 * Provides helpers to compile LootiScript source code into executable routines,
 * plus serialization utilities for routines.
 */

import { Parser, Compiler } from '@l8b/lootiscript';

/**
 * Compilation error information
 */
export interface CompileError {
    /** File path where error occurred */
    file: string;
    /** Error message */
    error: string;
    /** Line number (if available) */
    line?: number;
    /** Column number (if available) */
    column?: number;
}

/**
 * Compilation warning information
 */
export interface CompileWarning {
    /** File path where warning occurred */
    file: string;
    /** Warning message */
    warning: string;
    /** Line number (if available) */
    line?: number;
    /** Column number (if available) */
    column?: number;
}

/**
 * Compilation result
 */
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
    filename: string = 'source.loot'
): CompileResult {
    const errors: CompileError[] = [];
    const warnings: CompileWarning[] = [];

    try {
        // Parse source code
        const parser = new Parser(source, filename);
        parser.parse();

        // Check for parse errors
        if ((parser as any).error_info) {
            const err = (parser as any).error_info;
            errors.push({
                file: filename,
                error: err.error || 'Parse error',
                line: err.line,
                column: err.column,
            });

            return { errors, warnings, filename };
        }

        // Compile to bytecode
        const compiler = new Compiler(parser.program);

        // Export routine to serializable format
        const routine = compiler.routine.export();

        // Collect warnings
        for (const w of parser.warnings) {
            warnings.push({
                file: filename,
                warning: w.type || 'Warning',
                line: w.line,
                column: w.column,
            });
        }

        return {
            routine,
            errors,
            warnings,
            filename,
        };
    } catch (error: any) {
        errors.push({
            file: filename,
            error: error.message || String(error),
            line: error.line,
            column: error.column,
        });

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
        const fs = await import('fs');
        const path = await import('path');

        const source = fs.readFileSync(filePath, 'utf-8');
        const filename = path.basename(filePath);

        return compileSource(source, filename);
    } catch (error: any) {
        return {
            errors: [{
                file: filePath,
                error: error.message || String(error),
            }],
            warnings: [],
            filename: filePath,
        };
    }
}
