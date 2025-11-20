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
} from '@l8b/compiler';
import path from 'path';
import fs from 'fs-extra';
import pc from 'picocolors';

import { resolveProjectPath } from '../utils/paths';

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
function compileFile(
    filePath: string,
    filename: string
): BaseCompileResult {
    try {
        const source = fs.readFileSync(filePath, 'utf-8');
        return compileSource(source, filename);
    } catch (error: any) {
        return {
            errors: [{
                file: filename,
                error: error.message || String(error),
            }],
            warnings: [],
            filename,
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

        // Compile file using @l8b/compiler
        const result = compileFile(normalizedPath, filename);

        if (result.errors.length > 0) {
            errors.push(...result.errors);
            for (const error of result.errors) {
                console.error(pc.red(`    ✗ ${moduleName} (${filename})`));
                console.error(pc.red(`      ${error.error}`));
                if (error.line !== undefined) {
                    console.error(pc.gray(`      Line ${error.line}, Column ${error.column || 0}`));
                }
            }
        } else if (result.routine) {
            compiled.push({
                name: moduleName,
                routine: result.routine,
                filename,
            });

            // Show warnings if any
            if (result.warnings.length > 0) {
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
        // Use the serialization utility from @l8b/compiler
        const jsContent = serializeRoutineToModule(
            module.routine,
            module.name,
            module.filename
        );

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

