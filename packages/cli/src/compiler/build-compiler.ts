/**
 * Build-time compiler for LootiScript
 * 
 * Compiles .loot files to bytecode Routines during build,
 * similar to how Next.js pre-compiles React code.
 */

import { Parser, Compiler } from '@l8b/lootiscript';
import path from 'path';
import fs from 'fs-extra';
import pc from 'picocolors';

import { resolveProjectPath } from '../utils/paths';

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
    /** Successfully compiled modules */
    compiled: CompiledModule[];
    /** Compilation errors */
    errors: CompileError[];
    /** Compilation warnings */
    warnings: CompileWarning[];
}

/**
 * Internal compile result
 */
interface InternalCompileResult {
    routine?: any;
    error?: CompileError;
    warnings?: CompileWarning[];
}

/**
 * Compile a single .loot file to bytecode
 * 
 * @param filePath - Absolute path to .loot file
 * @param filename - Filename for error reporting
 * @returns Compilation result with routine or error
 */
function compileFile(
    filePath: string,
    filename: string
): InternalCompileResult {
    try {
        const source = fs.readFileSync(filePath, 'utf-8');
        
        // Parse source code
        const parser = new Parser(source, filename);
        parser.parse();
        
        // Check for parse errors
        if ((parser as any).error_info) {
            const err = (parser as any).error_info;
            return {
                error: {
                    file: filename,
                    error: err.error || 'Parse error',
                    line: err.line,
                    column: err.column,
                },
            };
        }
        
        // Compile to bytecode
        const compiler = new Compiler(parser.program);
        
        // Export routine to serializable format
        const routine = compiler.routine.export();
        
        // Collect warnings
        const warnings = parser.warnings.map((w) => ({
            file: filename,
            warning: w.type || 'Warning',
            line: w.line,
            column: w.column,
        }));
        
        return {
            routine,
            warnings,
        };
    } catch (error: any) {
        return {
            error: {
                file: filename,
                error: error.message || String(error),
                line: error.line,
                column: error.column,
            },
        };
    }
}

/**
 * Compile all .loot source files to bytecode
 * 
 * @param sources - Map of module names to file paths
 * @param projectPath - Absolute path to project root
 * @returns Compilation result with compiled modules, errors, and warnings
 */
export async function compileSources(
    sources: Record<string, string>,
    projectPath: string
): Promise<CompileResult> {
    const compiled: CompiledModule[] = [];
    const errors: CompileError[] = [];
    const warnings: CompileWarning[] = [];
    
    console.log(pc.gray('  Compiling LootiScript sources...'));
    
    for (const [moduleName, filePath] of Object.entries(sources)) {
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
            errors.push({
                file: filename,
                error: `File not found: ${normalizedPath}`,
            });
            console.error(pc.red(`    ✗ ${moduleName} (${filename})`));
            console.error(pc.red(`      File not found: ${normalizedPath}`));
            continue;
        }
        
        // Compile file
        const result = compileFile(normalizedPath, filename);
        
        if (result.error) {
            errors.push(result.error);
            console.error(pc.red(`    ✗ ${moduleName} (${filename})`));
            console.error(pc.red(`      ${result.error.error}`));
            if (result.error.line !== undefined) {
                console.error(pc.gray(`      Line ${result.error.line}, Column ${result.error.column || 0}`));
            }
        } else if (result.routine) {
            compiled.push({
                name: moduleName,
                routine: result.routine,
                filename,
            });
            
            // Show warnings if any
            if (result.warnings && result.warnings.length > 0) {
                for (const warning of result.warnings) {
                    warnings.push(warning);
                    console.warn(pc.yellow(`    ⚠ ${moduleName}: ${warning.warning}`));
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
    
    return { compiled, errors, warnings };
}

/**
 * Save compiled routines to disk as JS modules
 * 
 * @param compiled - Array of compiled modules to save
 * @param outputDir - Output directory for compiled files
 */
export async function saveCompiled(
    compiled: CompiledModule[],
    outputDir: string
): Promise<void> {
    const { DEFAULT_DIRS } = await import('../utils/paths');
    const compiledDir = path.join(outputDir, DEFAULT_DIRS.COMPILED);
    await fs.ensureDir(compiledDir);
    
    // Save each compiled module as JS file that exports the routine data
    for (const module of compiled) {
        const outputPath = path.join(compiledDir, `${module.name}.js`);
        // Create JS module that exports the compiled routine data
        const jsContent = `export default ${JSON.stringify({
            name: module.name,
            filename: module.filename,
            routine: module.routine,
        }, null, 2)};`;
        
        await fs.writeFile(outputPath, jsContent, 'utf-8');
    }
    
    // Save manifest of all compiled modules
    const manifest = {
        modules: compiled.map((m) => ({
            name: m.name,
            filename: m.filename,
            path: `${DEFAULT_DIRS.COMPILED}/${m.name}.js`,
        })),
    };
    
    await fs.writeJSON(
        path.join(outputDir, 'compiled-manifest.json'),
        manifest,
        { spaces: 2 }
    );
}

