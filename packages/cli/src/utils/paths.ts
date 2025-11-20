/**
 * Path resolution utilities
 * 
 * Provides consistent path resolution across the CLI package,
 * especially for finding workspace roots and package directories.
 */

import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs-extra';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Default directories and file names
 */
export const DEFAULT_DIRS = {
    BUILD_OUTPUT: '.l8b',
    SCRIPTS: 'scripts',
    SRC_L8B_LS: 'src/l8b/ls',
    PUBLIC: 'public',
    COMPILED: 'compiled',
    FONTS: 'fonts',
} as const;

/**
 * Default file names
 */
export const DEFAULT_FILES = {
    CONFIG: 'l8b.config.json',
    INDEX_HTML: 'index.html',
    RUNTIME_BUNDLE: 'runtime.js',
    BITCELL_FONT: 'BitCell.ttf',
} as const;

/**
 * Get CLI package root directory
 * 
 * Finds the `packages/cli` directory regardless of whether running
 * from source (`src/`) or built (`dist/`) code.
 * 
 * @returns Absolute path to CLI package root
 */
export function getCliPackageRoot(): string {
    const normalizedPath = __dirname.replace(/\\/g, '/');
    const cliIndex = normalizedPath.indexOf('/packages/cli/');
    
    if (cliIndex !== -1) {
        // Extract path up to and including 'packages/cli'
        const root = normalizedPath.substring(0, cliIndex + '/packages/cli'.length);
        return path.normalize(root);
    }
    
    // Fallback: use relative paths
    const isBuilt = normalizedPath.includes('/dist/core');
    return isBuilt 
        ? path.join(__dirname, '..', '..') // dist/core/../.. = packages/cli/
        : path.join(__dirname, '../..'); // src/core/../.. = packages/cli/
}

/**
 * Find workspace root by traversing up from given path
 * 
 * Looks for a `packages/` directory to identify the monorepo root.
 * 
 * @param startPath - Path to start searching from
 * @param maxDepth - Maximum directory levels to traverse (default: 10)
 * @returns Workspace root path or null if not found
 */
export async function findWorkspaceRoot(
    startPath: string,
    maxDepth: number = 10
): Promise<string | null> {
    let currentPath = startPath;
    
    for (let i = 0; i < maxDepth; i++) {
        const packagesDir = path.join(currentPath, 'packages');
        if (await fs.pathExists(packagesDir)) {
            return currentPath;
        }
        
        const parent = path.dirname(currentPath);
        if (parent === currentPath) {
            break; // Reached filesystem root
        }
        currentPath = parent;
    }
    
    return null;
}

/**
 * Resolve project-relative path to absolute path
 * 
 * Handles paths that may start with `/` (relative to project root)
 * or be actual relative paths.
 * 
 * @param projectPath - Absolute path to project root
 * @param filePath - Path to resolve (may start with `/` or be relative)
 * @returns Absolute resolved path
 */
export function resolveProjectPath(projectPath: string, filePath: string): string {
    if (path.isAbsolute(filePath)) {
        // Already absolute, but might be a project-relative path with leading /
        // Check if it exists, otherwise treat as project-relative
        if (fs.existsSync(filePath)) {
            return filePath;
        }
    }
    
    // Remove leading / if present (project-relative convention)
    const normalizedPath = filePath.startsWith('/') ? filePath.slice(1) : filePath;
    return path.join(projectPath, normalizedPath);
}

/**
 * Get BitCell font paths (dist and src)
 * 
 * @param cliPackageRoot - CLI package root directory
 * @returns Object with dist and src font paths
 */
export function getBitCellFontPaths(cliPackageRoot: string): {
    dist: string;
    src: string;
} {
    return {
        dist: path.join(cliPackageRoot, 'dist', 'assets', 'fonts', DEFAULT_FILES.BITCELL_FONT),
        src: path.join(cliPackageRoot, 'src', 'assets', 'fonts', DEFAULT_FILES.BITCELL_FONT),
    };
}

