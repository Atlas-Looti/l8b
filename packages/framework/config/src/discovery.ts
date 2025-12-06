/**
 * Resource discovery for L8B projects
 * 
 * Note: This module uses synchronous file operations for simplicity.
 * For large projects (1000+ files), consider converting to async with
 * fs/promises and Promise.all for parallel processing.
 */
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import {
	type MapInfo,
	type ProjectResources,
	type ResourceInfo,
	type SoundInfo,
	type SourceInfo,
	type SpriteInfo,
	generateVersion,
	getBaseName,
	getModuleName,
	getResourceName,
	isAudioFile,
	isImageFile,
	isMapFile,
	isSourceFile,
	normalizePath,
} from "@l8b/framework-shared";
import type { ResolvedConfig } from "./config";

/**
 * Discover all resources in a L8B project
 */
export function discoverResources(config: ResolvedConfig): ProjectResources {
	const resources: ProjectResources = {
		sources: [],
		images: [],
		maps: [],
		sounds: [],
		music: [],
		assets: [],
		fonts: [],
	};

	// Discover source files
	if (existsSync(config.srcPath)) {
		resources.sources = discoverSourceFiles(config.srcPath);
	}

	// Discover sprites
	const spritesDir = join(config.publicPath, "sprites");
	if (existsSync(spritesDir)) {
		resources.images = discoverSprites(spritesDir);
	}

	// Discover maps
	const mapsDir = join(config.publicPath, "maps");
	if (existsSync(mapsDir)) {
		resources.maps = discoverMaps(mapsDir);
	}

	// Discover sounds
	const soundsDir = join(config.publicPath, "sounds");
	if (existsSync(soundsDir)) {
		resources.sounds = discoverAudio(soundsDir, "sound");
	}

	// Discover music
	const musicDir = join(config.publicPath, "music");
	if (existsSync(musicDir)) {
		resources.music = discoverAudio(musicDir, "music");
	}

	// Discover fonts
	const fontsDir = join(config.publicPath, "fonts");
	if (existsSync(fontsDir)) {
		resources.fonts = discoverFonts(fontsDir);
	}

	// Discover generic assets
	const assetsDir = join(config.publicPath, "assets");
	if (existsSync(assetsDir)) {
		resources.assets = discoverAssets(assetsDir);
	}

	return resources;
}

/**
 * Recursively find files in a directory
 */
function walkDir(dir: string, callback: (filePath: string) => void): void {
	if (!existsSync(dir)) return;

	const entries = readdirSync(dir, { withFileTypes: true });
	for (const entry of entries) {
		const fullPath = join(dir, entry.name);
		if (entry.isDirectory()) {
			walkDir(fullPath, callback);
		} else if (entry.isFile()) {
			callback(fullPath);
		}
	}
}

/**
 * Discover LootiScript source files
 */
function discoverSourceFiles(srcDir: string): SourceInfo[] {
	const sources: SourceInfo[] = [];

	walkDir(srcDir, (filePath) => {
		if (isSourceFile(filePath)) {
			const content = readFileSync(filePath, "utf-8");
			const moduleName = getModuleName(filePath, srcDir);
			const fileName = normalizePath(relative(srcDir, filePath));

			sources.push({
				file: fileName,
				name: moduleName,
				version: generateVersion(content),
				content,
			});
		}
	});

	return sources;
}

/**
 * Discover sprite files
 */
function discoverSprites(spritesDir: string): SpriteInfo[] {
	const sprites: SpriteInfo[] = [];

	walkDir(spritesDir, (filePath) => {
		if (isImageFile(filePath)) {
			const content = readFileSync(filePath);
			const name = getResourceName(filePath, spritesDir);
			const fileName = normalizePath(relative(spritesDir, filePath));

			// Try to load properties file
			const propsPath = filePath.replace(/\.[^.]+$/, ".json");
			let properties: SpriteInfo["properties"];

			if (existsSync(propsPath)) {
				try {
					const propsContent = readFileSync(propsPath, "utf-8");
					properties = JSON.parse(propsContent);
				} catch {
					// Ignore invalid properties file
				}
			}

			sprites.push({
				file: fileName,
				name,
				version: generateVersion(content),
				type: "sprite",
				properties,
			});
		}
	});

	return sprites;
}

/**
 * Discover map files
 */
function discoverMaps(mapsDir: string): MapInfo[] {
	const maps: MapInfo[] = [];

	walkDir(mapsDir, (filePath) => {
		if (isMapFile(filePath)) {
			const content = readFileSync(filePath, "utf-8");
			const name = getResourceName(filePath, mapsDir).replace(/\.json$/, "");
			const fileName = normalizePath(relative(mapsDir, filePath));

			let data: unknown;
			try {
				data = JSON.parse(content);
			} catch {
				// Invalid JSON, skip
				return;
			}

			maps.push({
				file: fileName,
				name,
				version: generateVersion(content),
				type: "map",
				data,
			});
		}
	});

	return maps;
}

/**
 * Discover audio files
 */
function discoverAudio(audioDir: string, type: "sound" | "music"): SoundInfo[] {
	const audio: SoundInfo[] = [];

	walkDir(audioDir, (filePath) => {
		if (isAudioFile(filePath)) {
			const content = readFileSync(filePath);
			const name = getResourceName(filePath, audioDir).replace(/\.(wav|mp3|ogg|m4a)$/i, "");
			const fileName = normalizePath(relative(audioDir, filePath));

			audio.push({
				file: fileName,
				name,
				version: generateVersion(content),
				type,
			});
		}
	});

	return audio;
}

/**
 * Discover font files
 */
function discoverFonts(fontsDir: string): ResourceInfo[] {
	const fonts: ResourceInfo[] = [];
	const fontExtensions = [".ttf", ".otf", ".woff", ".woff2"];

	walkDir(fontsDir, (filePath) => {
		const ext = filePath.slice(filePath.lastIndexOf(".")).toLowerCase();
		if (fontExtensions.includes(ext)) {
			const content = readFileSync(filePath);
			const name = getBaseName(filePath);
			const fileName = normalizePath(relative(fontsDir, filePath));

			fonts.push({
				file: fileName,
				name,
				version: generateVersion(content),
				type: "font",
			});
		}
	});

	return fonts;
}

/**
 * Discover generic asset files
 */
function discoverAssets(assetsDir: string): ResourceInfo[] {
	const assets: ResourceInfo[] = [];

	walkDir(assetsDir, (filePath) => {
		const stat = statSync(filePath);
		if (stat.isFile()) {
			const content = readFileSync(filePath);
			const name = getResourceName(filePath, assetsDir);
			const fileName = normalizePath(relative(assetsDir, filePath));

			assets.push({
				file: fileName,
				name,
				version: generateVersion(content),
				type: "asset",
			});
		}
	});

	return assets;
}

/**
 * Watch a single file for changes
 */
export function getFileVersion(filePath: string): number {
	if (!existsSync(filePath)) {
		return 0;
	}
	const content = readFileSync(filePath);
	return generateVersion(content);
}
