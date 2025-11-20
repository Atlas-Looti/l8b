/**
 * Vite plugin for LootiScript (.loot) files
 * 
 * Handles .loot file imports with ?raw query parameter and provides
 * hot module replacement for LootiScript source files.
 */

import type { Plugin } from 'vite';
import fs from 'fs-extra';
import path from 'path';

/**
 * File cache entry
 */
interface FileCacheEntry {
    content: string;
    mtime: number;
}

// Simple cache for file reads (cleared on file changes via HMR)
const fileCache = new Map<string, FileCacheEntry>();

/**
 * Vite plugin for LootiScript files
 * 
 * @returns Vite plugin instance
 */
export function lootiScriptPlugin(): Plugin {
    let root: string = '';

    return {
        name: 'vite-plugin-lootiscript',
        enforce: 'pre',

        configResolved(config) {
            root = config.root;
        },

        async load(id) {
            // Handle .loot?raw imports - return the file content as a string
            if (!id.endsWith('.loot') && !id.includes('.loot?')) {
                return null;
            }

            // Remove query params and get clean file path
            let filePath = id.replace(/\?raw$/, '').replace(/\?.*$/, '');
            
            // Resolve path relative to root if it's a relative/absolute path from Vite
            if (!path.isAbsolute(filePath)) {
                if (filePath.startsWith('/')) {
                    // Vite sometimes passes paths starting with /, resolve from root
                    filePath = path.join(root, filePath.slice(1));
                } else {
                    // Relative path, resolve from root
                    filePath = path.join(root, filePath);
                }
            }

            // Normalize path
            filePath = path.normalize(filePath);

            // Check cache first
            try {
                const stat = await fs.stat(filePath);
                const cached = fileCache.get(filePath);
                
                if (cached && cached.mtime === stat.mtimeMs) {
                    // Return cached content
                    return `export default ${JSON.stringify(cached.content)};`;
                }

                // Read and cache file
                const content = await fs.readFile(filePath, 'utf-8');
                fileCache.set(filePath, { content, mtime: stat.mtimeMs });
                
                // Return as string export for ?raw imports
                return `export default ${JSON.stringify(content)};`;
            } catch (error) {
                // File doesn't exist or can't be read
                const err = error as NodeJS.ErrnoException;
                if (err.code === 'ENOENT') {
                    return null;
                }
                console.error(`Error reading .loot file ${filePath}:`, error);
                return null;
            }
        },

        handleHotUpdate({ file, server }) {
            // Clear cache for changed file
            if (file.endsWith('.loot')) {
                fileCache.delete(file);
                
                // Trigger full reload when .loot files change
                server.ws.send({
                    type: 'full-reload',
                    path: '*'
                });
                return [];
            }
        },

        configureServer(server) {
            // Ensure .loot files are served with correct MIME type
            server.middlewares.use((req, res, next) => {
                if (req.url?.endsWith('.loot')) {
                    res.setHeader('Content-Type', 'text/plain');
                }
                next();
            });
        }
    };
}
