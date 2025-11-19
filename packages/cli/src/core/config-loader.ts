import fs from 'fs-extra';
import path from 'path';
import type { LootiConfig } from '../types/config';

const DEFAULT_CONFIG: LootiConfig = {
    name: 'LootiScript Game',
    orientation: 'any',
    aspect: 'free',
    canvas: {
        id: 'game',
    },
};

// Aspect ratio to size mapping
const ASPECT_SIZES: Record<string, [number, number]> = {
    'free': [1920, 1080],
    '16x9': [1920, 1080],
    '4x3': [1600, 1200],
    '1x1': [1080, 1080],
    '2x1': [2560, 1280],
    '>16x9': [1920, 1080], // Minimum
    '>4x3': [1600, 1200], // Minimum
    '>1x1': [1080, 1080], // Minimum
    '>2x1': [2560, 1280], // Minimum
};

export async function loadConfig(projectPath: string = process.cwd()): Promise<LootiConfig> {
    const configPath = path.join(projectPath, 'l8b.config.json');

    let userConfig: Partial<LootiConfig> = {};

    if (await fs.pathExists(configPath)) {
        try {
            userConfig = await fs.readJson(configPath);
        } catch (error) {
            console.warn('Failed to parse l8b.config.json, using defaults');
        }
    }

    const config = { ...DEFAULT_CONFIG, ...userConfig };

    // Ensure canvas object exists
    if (!config.canvas) {
        config.canvas = { id: 'game' };
    }

    // Calculate dimensions based on aspect ratio if not explicitly provided
    if (!config.width || !config.height) {
        const aspect = config.aspect || 'free';
        const [w, h] = ASPECT_SIZES[aspect] || [1920, 1080];
        
        // Apply orientation
        if (config.orientation === 'portrait' && w > h) {
            config.width = h;
            config.height = w;
        } else if (config.orientation === 'landscape' && h > w) {
            config.width = w;
            config.height = h;
        } else {
            config.width = w;
            config.height = h;
        }
    }

    return config;
}

export function getCanvasSize(config: LootiConfig): { width: number; height: number } {
    const width = config.width || config.canvas?.width || 1920;
    const height = config.height || config.canvas?.height || 1080;
    return { width, height };
}

