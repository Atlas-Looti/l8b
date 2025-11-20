/**
 * Bundle @l8b/runtime and @l8b/lootiscript for production
 * 
 * Creates a single bundled JS file that can be imported in the browser
 * without needing to resolve bare module specifiers.
 */

import { build } from 'esbuild';
import path from 'path';
import fs from 'fs-extra';
import pc from 'picocolors';

import { findWorkspaceRoot, DEFAULT_FILES } from '../utils/paths';
import { BUILD } from '../utils/constants';
import { BuildError } from '../utils/errors';

/**
 * Bundle runtime and lootiscript for browser
 * 
 * @param distDir - Output directory for bundle
 * @param projectPath - Absolute path to project root
 * @throws {BuildError} If runtime packages cannot be found or bundling fails
 */
export async function bundleRuntime(distDir: string, projectPath: string): Promise<void> {
    const outputFile = path.join(distDir, DEFAULT_FILES.RUNTIME_BUNDLE);
    
    console.log(pc.gray('  Bundling runtime dependencies...'));
    
    try {
        // Find workspace root
        const workspaceRoot = await findWorkspaceRoot(projectPath, BUILD.MAX_WORKSPACE_DEPTH);
        
        let runtimeEntryPath: string | null = null;
        let lootiscriptEntryPath: string | null = null;
        
        // Try workspace first (monorepo)
        if (workspaceRoot) {
            const runtimeCandidates = [
                path.join(workspaceRoot, 'packages', 'runtime', 'dist', 'index.js'),
                path.join(workspaceRoot, 'packages', 'enggine', 'runtime', 'dist', 'index.js'),
            ];
            const lootiscriptCandidates = [
                path.join(workspaceRoot, 'packages', 'lootiscript', 'dist', 'index.js'),
            ];

            for (const candidate of runtimeCandidates) {
                if (await fs.pathExists(candidate)) {
                    runtimeEntryPath = candidate;
                    break;
                }
            }

            for (const candidate of lootiscriptCandidates) {
                if (await fs.pathExists(candidate)) {
                    lootiscriptEntryPath = candidate;
                    break;
                }
            }
        }
        
        // Fallback to node_modules
        if (!runtimeEntryPath || !lootiscriptEntryPath) {
            const nodeModulesPath = path.join(projectPath, 'node_modules');
            if (await fs.pathExists(nodeModulesPath)) {
                const runtimePkg = path.join(nodeModulesPath, '@l8b', 'runtime', 'dist', 'index.js');
                const lootiscriptPkg = path.join(nodeModulesPath, '@l8b', 'lootiscript', 'dist', 'index.js');
                
                if (!runtimeEntryPath && await fs.pathExists(runtimePkg)) {
                    runtimeEntryPath = runtimePkg;
                }
                if (!lootiscriptEntryPath && await fs.pathExists(lootiscriptPkg)) {
                    lootiscriptEntryPath = lootiscriptPkg;
                }
            }
        }
        
        if (!runtimeEntryPath || !lootiscriptEntryPath) {
            const triedPaths: string[] = [];
            if (workspaceRoot) {
                triedPaths.push(
                    path.join(workspaceRoot, 'packages', 'runtime', 'dist', 'index.js'),
                    path.join(workspaceRoot, 'packages', 'enggine', 'runtime', 'dist', 'index.js'),
                    path.join(workspaceRoot, 'packages', 'lootiscript', 'dist', 'index.js')
                );
            }
            triedPaths.push(
                path.join(projectPath, 'node_modules', '@l8b', 'runtime', 'dist', 'index.js'),
                path.join(projectPath, 'node_modules', '@l8b', 'lootiscript', 'dist', 'index.js')
            );
            
            throw new BuildError(
                'Could not find @l8b/runtime or @l8b/lootiscript',
                {
                    triedPaths,
                    workspaceRoot,
                    projectPath,
                }
            );
        }
        
        // Create a temporary entry file that imports both and re-exports
        const tempEntryPath = path.join(distDir, '.temp-entry.js');
        const tempEntryContent = `
// Temporary entry file for bundling
export { Runtime } from '${runtimeEntryPath.replace(/\\/g, '/')}';
export { Routine } from '${lootiscriptEntryPath.replace(/\\/g, '/')}';
`;
        
        await fs.writeFile(tempEntryPath, tempEntryContent);
        
        try {
            // Bundle using esbuild
            await build({
                entryPoints: [tempEntryPath],
                bundle: true,
                format: 'esm',
                outfile: outputFile,
                platform: 'browser',
                target: 'es2022',
                splitting: false,
                // Bundle all dependencies
                external: [],
                // Tree shaking
                treeShaking: true,
                // Minify for production
                minify: true,
                // Source maps for debugging (optional)
                sourcemap: false,
                // Resolve extensions
                resolveExtensions: ['.js', '.ts', '.json', '.mjs'],
                // Preserve names for exports
                keepNames: true,
            });
            
            console.log(pc.green(`  ✓ Bundled runtime to ${path.relative(distDir, outputFile)}`));
        } finally {
            // Clean up temp file
            if (await fs.pathExists(tempEntryPath)) {
                await fs.remove(tempEntryPath);
            }
        }
    } catch (error) {
        if (error instanceof BuildError) {
            throw error;
        }
        throw new BuildError(
            'Failed to bundle runtime',
            {
                error: error instanceof Error ? error.message : String(error),
                distDir,
                projectPath,
            }
        );
    }
}

