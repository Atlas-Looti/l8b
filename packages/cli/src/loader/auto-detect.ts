/**
 * Automatic resource detection for LootiScript projects
 * 
 * Scans project directories for assets (images, maps, sounds, music)
 * and returns them in the Resources format expected by @l8b/runtime.
 */

import fs from 'fs-extra';
import path from 'path';
import type { Resources, ResourceFile } from '@l8b/runtime';

import { DEFAULT_DIRS } from '../utils/paths';

// Known asset subdirectories
const ASSET_SUBDIRS = {
    SPRITES: 'sprites',
    MAPS: 'maps',
    FONTS: 'fonts',
    SOUNDS: 'sounds',
    MUSIC: 'music',
} as const;

// Known directories to skip when scanning root public
const KNOWN_DIRS = new Set([
    ASSET_SUBDIRS.SPRITES,
    ASSET_SUBDIRS.MAPS,
    ASSET_SUBDIRS.FONTS,
    ASSET_SUBDIRS.SOUNDS,
    ASSET_SUBDIRS.MUSIC,
    'l8b',
]);

/**
 * Scan a single directory for files with matching extensions
 * 
 * @param dirPath - Directory to scan
 * @param extensions - Set of file extensions to match (e.g., new Set(['.png', '.jpg']))
 * @returns Array of resource files (filename only)
 */
async function scanDirectory(dirPath: string, extensions: Set<string>): Promise<ResourceFile[]> {
    const files: ResourceFile[] = [];
    
    if (!await fs.pathExists(dirPath)) {
        return files;
    }

    try {
        const entries = await fs.readdir(dirPath, { withFileTypes: true });
        
        for (const entry of entries) {
            // Skip directories
            if (entry.isDirectory()) continue;
            
            const ext = path.extname(entry.name).toLowerCase();
            if (extensions.has(ext)) {
                files.push({
                    file: entry.name, // Just the filename
                    version: 1,
                });
            }
        }
    } catch (error) {
        // Directory might have been removed, silently ignore
        if ((error as NodeJS.ErrnoException).code !== 'ENOENT') {
            console.warn(`Warning: Failed to scan directory ${dirPath}:`, error);
        }
    }

    return files;
}

/**
 * Detect all resources (images, maps, sounds, music) in project
 * 
 * Scans `public/` and `public/l8b/` directories for assets and returns
 * them in the format expected by @l8b/runtime.
 * 
 * @param projectPath - Absolute path to project root
 * @returns Resources object with detected assets
 */
export async function detectResources(projectPath: string = process.cwd()): Promise<Resources> {
    const resources: Resources = {
        images: [],
        maps: [],
        sounds: [],
        music: [],
        assets: [],
    };

    const publicDir = path.join(projectPath, DEFAULT_DIRS.PUBLIC);

    if (!await fs.pathExists(publicDir)) {
        return resources;
    }

    // File extensions for each asset type
    const IMAGE_EXTENSIONS = new Set(['.png', '.jpg', '.jpeg', '.webp', '.gif']);
    const MAP_EXTENSIONS = new Set(['.json', '.tmj']);
    const AUDIO_EXTENSIONS = new Set(['.mp3', '.wav', '.ogg']);

    // Scan multiple directories in parallel for better performance
    // Check both public/subdir and public/l8b/subdir for compatibility
    const scanTasks = [
        // Images from sprites
        scanDirectory(path.join(publicDir, ASSET_SUBDIRS.SPRITES), IMAGE_EXTENSIONS),
        scanDirectory(path.join(publicDir, 'l8b', ASSET_SUBDIRS.SPRITES), IMAGE_EXTENSIONS),
        
        // Maps
        scanDirectory(path.join(publicDir, ASSET_SUBDIRS.MAPS), MAP_EXTENSIONS),
        scanDirectory(path.join(publicDir, 'l8b', ASSET_SUBDIRS.MAPS), MAP_EXTENSIONS),
        
        // Sounds
        scanDirectory(path.join(publicDir, ASSET_SUBDIRS.SOUNDS), AUDIO_EXTENSIONS),
        scanDirectory(path.join(publicDir, 'l8b', ASSET_SUBDIRS.SOUNDS), AUDIO_EXTENSIONS),
        
        // Music
        scanDirectory(path.join(publicDir, ASSET_SUBDIRS.MUSIC), AUDIO_EXTENSIONS),
        scanDirectory(path.join(publicDir, 'l8b', ASSET_SUBDIRS.MUSIC), AUDIO_EXTENSIONS),
    ];

    const [
        sprites1, sprites2,
        maps1, maps2,
        sounds1, sounds2,
        music1, music2
    ] = await Promise.all(scanTasks);

    // Combine results (remove duplicates based on filename)
    const imageSet = new Set<string>();
    const mapSet = new Set<string>();
    const soundSet = new Set<string>();
    const musicSet = new Set<string>();

    [...sprites1, ...sprites2].forEach(file => {
        if (!imageSet.has(file.file)) {
            imageSet.add(file.file);
            resources.images!.push(file);
        }
    });

    [...maps1, ...maps2].forEach(file => {
        if (!mapSet.has(file.file)) {
            mapSet.add(file.file);
            resources.maps!.push(file);
        }
    });

    [...sounds1, ...sounds2].forEach(file => {
        if (!soundSet.has(file.file)) {
            soundSet.add(file.file);
            resources.sounds!.push(file);
        }
    });

    [...music1, ...music2].forEach(file => {
        if (!musicSet.has(file.file)) {
            musicSet.add(file.file);
            resources.music!.push(file);
        }
    });

    // Scan root public for generic assets (non-parallel to avoid too many concurrent reads)
    try {
        const entries = await fs.readdir(publicDir, { withFileTypes: true });
        for (const entry of entries) {
            // Skip known directories
            if (entry.isDirectory() || KNOWN_DIRS.has(entry.name)) {
                continue;
            }
            
            // Add as generic asset
            resources.assets!.push({
                file: '/' + entry.name.replace(/\\/g, '/'),
                version: 1,
            });
        }
    } catch (error) {
        // Silently ignore if directory doesn't exist
        if ((error as NodeJS.ErrnoException).code !== 'ENOENT') {
            console.warn(`Warning: Failed to scan public directory:`, error);
        }
    }

    return resources;
}
