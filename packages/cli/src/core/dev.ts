import { createServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import chokidar from 'chokidar';
import fs from 'fs-extra';

import { loadConfig } from './config-loader';
import { detectResources } from '../loader/auto-detect';
import { loadSources } from '../loader/source-loader';
import { generateHTML } from '../generator/html-generator';
import { lootiScriptPlugin } from '../plugin/vite-plugin-lootiscript';
import type { Resources } from '@l8b/runtime';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Cache for resources and sources to avoid re-scanning on every request
interface CacheEntry<T> {
    data: T;
    timestamp: number;
}

let cachedResources: CacheEntry<Resources> | null = null;
let cachedSources: CacheEntry<Record<string, string>> | null = null;
const CACHE_TTL = 100; // Cache for 100ms to batch requests

export async function dev(
    projectPath: string = process.cwd(), 
    options: { port?: number, host?: string | boolean } = {}
) {
    const config = await loadConfig(projectPath);
    
    // Get port and host from config or options
    const port = options.port || config.dev?.port || 3000;
    const host = options.host !== undefined ? options.host : (config.dev?.host || false);

    // Setup file watchers to invalidate cache on changes
    const watcher = chokidar.watch([
        path.join(projectPath, 'public'),
        path.join(projectPath, 'scripts'),
        path.join(projectPath, 'src', 'l8b', 'ls'),
        path.join(projectPath, 'l8b.config.json'),
    ], {
        ignored: /(^|[\/\\])\../, // ignore dotfiles
        persistent: true,
        ignoreInitial: true,
    });

    // Clear cache on file changes
    const clearCache = () => {
        cachedResources = null;
        cachedSources = null;
    };

    watcher.on('change', clearCache);
    watcher.on('add', clearCache);
    watcher.on('unlink', clearCache);

    // Helper to get or cache resources
    const getResources = async (): Promise<Resources> => {
        const now = Date.now();
        if (cachedResources && (now - cachedResources.timestamp) < CACHE_TTL) {
            return cachedResources.data;
        }
        const resources = await detectResources(projectPath);
        cachedResources = { data: resources, timestamp: now };
        return resources;
    };

    // Helper to get or cache sources
    const getSources = async (): Promise<Record<string, string>> => {
        const now = Date.now();
        if (cachedSources && (now - cachedSources.timestamp) < CACHE_TTL) {
            return cachedSources.data;
        }
        const sources = await loadSources(projectPath);
        cachedSources = { data: sources, timestamp: now };
        return sources;
    };

    const server = await createServer({
        root: projectPath,
        server: {
            port,
            host: typeof host === 'boolean' ? (host ? '0.0.0.0' : 'localhost') : host,
            strictPort: false,
        },
        plugins: [
            lootiScriptPlugin(),
            {
                name: 'l8b-html-generator',
                configureServer(server) {
                    // Serve BitCell font from CLI package (built to dist/assets/fonts or dev from src/assets/fonts)
                    const cliDistAssetsPath = path.join(__dirname, '../assets/fonts');
                    const cliSrcAssetsPath = path.join(__dirname, '../../src/assets/fonts');
                    
                    server.middlewares.use(async (req, res, next) => {
                        // Serve BitCell font from CLI package
                        if (req.url === '/@l8b/fonts/BitCell.ttf') {
                            // Try dist first (production), then src (development)
                            let fontPath = path.join(cliDistAssetsPath, 'BitCell.ttf');
                            if (!(await fs.pathExists(fontPath))) {
                                fontPath = path.join(cliSrcAssetsPath, 'BitCell.ttf');
                            }
                            
                            if (await fs.pathExists(fontPath)) {
                                const fontData = await fs.readFile(fontPath);
                                res.setHeader('Content-Type', 'font/ttf');
                                res.setHeader('Cache-Control', 'public, max-age=31536000');
                                res.end(fontData);
                                return;
                            }
                        }
                        
                        // Only handle root/index.html requests
                        if (req.url === '/' || req.url === '/index.html') {
                            try {
                                // Use cached versions when possible
                                const [currentSources, currentResources] = await Promise.all([
                                    getSources(),
                                    getResources(),
                                ]);

                                const html = generateHTML(config, currentSources, currentResources);

                                res.statusCode = 200;
                                res.setHeader('Content-Type', 'text/html');
                                
                                // Transform HTML through Vite (for HMR scripts, etc)
                                const transformedHtml = await server.transformIndexHtml(
                                    req.url || '/',
                                    html
                                );
                                
                                res.end(transformedHtml);
                                return;
                            } catch (error) {
                                console.error('Error generating HTML:', error);
                                res.statusCode = 500;
                                res.end('Error generating HTML: ' + String(error));
                                return;
                            }
                        }
                        next();
                    });
                },
                buildEnd() {
                    // Cleanup watcher on build end
                    watcher.close().catch(() => {});
                }
            }
        ],
        // Optimize dependencies for faster startup
        optimizeDeps: {
            include: ['@l8b/runtime'],
            esbuildOptions: {
                target: 'es2022',
            },
        },
        // Public directory for static assets
        publicDir: path.join(projectPath, 'public'),
    });

    await server.listen();
    
    console.log(`\n🚀 L8B Dev Server running!\n`);
    server.printUrls();
    
    // Cleanup on process exit
    process.on('SIGTERM', () => {
        watcher.close().catch(() => {});
    });
    process.on('SIGINT', () => {
        watcher.close().catch(() => {});
    });
    
    return server;
}
