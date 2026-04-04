/**
 * Resource discovery for L8B projects
 *
 * Uses async file operations and streams for performance and stability.
 */
import { access, readdir, readFile, stat } from "node:fs/promises";
import { constants } from "node:fs";
import { join, relative } from "node:path";
import {
	type MapInfo,
	type ProjectResources,
	type ResourceInfo,
	type SoundInfo,
	type SourceInfo,
	type SpriteInfo,
	generateFileVersion,
	getBaseName,
	getModuleName,
	getResourceName,
	isAudioFile,
	isImageFile,
	isMapFile,
	isSourceFile,
	normalizePath,
} from "@al8b/framework-shared";
import type { ResolvedConfig } from "./config";

/**
 * Check if a file exists
 */
async function exists(path: string): Promise<boolean> {
	try {
		await access(path, constants.F_OK);
		return true;
	} catch {
		return false;
	}
}

/**
 * Discover all resources in a L8B project
 */
export async function discoverResources(config: ResolvedConfig): Promise<ProjectResources> {
	const resources: ProjectResources = {
		sources: [],
		images: [],
		maps: [],
		sounds: [],
		music: [],
		assets: [],
		fonts: [],
	};

	// Parallelize discovery of different resource types
	await Promise.all([
		// Discover source files
		(async () => {
			if (await exists(config.srcPath)) {
				resources.sources = await discoverSourceFiles(config.srcPath);
			}
		})(),

		// Discover sprites
		(async () => {
			const spritesDir = join(config.publicPath, "sprites");
			if (await exists(spritesDir)) {
				resources.images = await discoverSprites(spritesDir);
			}
		})(),

		// Discover maps
		(async () => {
			const mapsDir = join(config.publicPath, "maps");
			if (await exists(mapsDir)) {
				resources.maps = await discoverMaps(mapsDir);
			}
		})(),

		// Discover sounds
		(async () => {
			const soundsDir = join(config.publicPath, "sounds");
			if (await exists(soundsDir)) {
				resources.sounds = await discoverAudio(soundsDir, "sound");
			}
		})(),

		// Discover music
		(async () => {
			const musicDir = join(config.publicPath, "music");
			if (await exists(musicDir)) {
				resources.music = await discoverAudio(musicDir, "music");
			}
		})(),

		// Discover fonts
		(async () => {
			const fontsDir = join(config.publicPath, "fonts");
			if (await exists(fontsDir)) {
				resources.fonts = await discoverFonts(fontsDir);
			}
		})(),

		// Discover generic assets
		(async () => {
			const assetsDir = join(config.publicPath, "assets");
			if (await exists(assetsDir)) {
				resources.assets = await discoverAssets(assetsDir);
			}
		})(),
	]);

	return resources;
}

/**
 * Recursively find files in a directory
 */
async function walkDir(dir: string, callback: (filePath: string) => Promise<void>): Promise<void> {
	if (!(await exists(dir))) return;

	const entries = await readdir(dir, { withFileTypes: true });

	await Promise.all(
		entries.map(async (entry) => {
			const fullPath = join(dir, entry.name);
			if (entry.isDirectory()) {
				await walkDir(fullPath, callback);
			} else if (entry.isFile()) {
				await callback(fullPath);
			}
		}),
	);
}

/**
 * Discover LootiScript source files
 */
async function discoverSourceFiles(srcDir: string): Promise<SourceInfo[]> {
	const sources: SourceInfo[] = [];

	await walkDir(srcDir, async (filePath) => {
		if (isSourceFile(filePath)) {
			const content = await readFile(filePath, "utf-8");
			const moduleName = getModuleName(filePath, srcDir);
			const fileName = normalizePath(relative(srcDir, filePath));

			sources.push({
				file: fileName,
				name: moduleName,
				version: await generateFileVersion(filePath),
				content,
			});
		}
	});

	return sources;
}

/**
 * Discover sprite files
 */
async function discoverSprites(spritesDir: string): Promise<SpriteInfo[]> {
	const sprites: SpriteInfo[] = [];

	await walkDir(spritesDir, async (filePath) => {
		if (isImageFile(filePath)) {
			const name = getResourceName(filePath, spritesDir);
			const fileName = normalizePath(relative(spritesDir, filePath));
			const version = await generateFileVersion(filePath);

			// Try to load properties file
			const propsPath = filePath.replace(/\.[^.]+$/, ".json");
			let properties: SpriteInfo["properties"];

			if (await exists(propsPath)) {
				try {
					const propsContent = await readFile(propsPath, "utf-8");
					properties = JSON.parse(propsContent);
				} catch {
					// Ignore invalid properties file
				}
			}

			sprites.push({
				file: fileName,
				name,
				version,
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
async function discoverMaps(mapsDir: string): Promise<MapInfo[]> {
	const maps: MapInfo[] = [];

	await walkDir(mapsDir, async (filePath) => {
		if (isMapFile(filePath)) {
			const content = await readFile(filePath, "utf-8");
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
				version: await generateFileVersion(filePath),
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
async function discoverAudio(audioDir: string, type: "sound" | "music"): Promise<SoundInfo[]> {
	const audio: SoundInfo[] = [];

	await walkDir(audioDir, async (filePath) => {
		if (isAudioFile(filePath)) {
			const name = getResourceName(filePath, audioDir).replace(/\.(wav|mp3|ogg|m4a)$/i, "");
			const fileName = normalizePath(relative(audioDir, filePath));
			const version = await generateFileVersion(filePath);

			audio.push({
				file: fileName,
				name,
				version,
				type,
			});
		}
	});

	return audio;
}

/**
 * Discover font files
 */
async function discoverFonts(fontsDir: string): Promise<ResourceInfo[]> {
	const fonts: ResourceInfo[] = [];
	const fontExtensions = [".ttf", ".otf", ".woff", ".woff2"];

	await walkDir(fontsDir, async (filePath) => {
		const ext = filePath.slice(filePath.lastIndexOf(".")).toLowerCase();
		if (fontExtensions.includes(ext)) {
			const name = getBaseName(filePath);
			const fileName = normalizePath(relative(fontsDir, filePath));
			const version = await generateFileVersion(filePath);

			fonts.push({
				file: fileName,
				name,
				version,
				type: "font",
			});
		}
	});

	return fonts;
}

/**
 * Discover generic asset files
 */
async function discoverAssets(assetsDir: string): Promise<ResourceInfo[]> {
	const assets: ResourceInfo[] = [];

	await walkDir(assetsDir, async (filePath) => {
		const stats = await stat(filePath);
		if (stats.isFile()) {
			const name = getResourceName(filePath, assetsDir);
			const fileName = normalizePath(relative(assetsDir, filePath));
			const version = await generateFileVersion(filePath);

			assets.push({
				file: fileName,
				name,
				version,
				type: "asset",
			});
		}
	});

	return assets;
}

/**
 * Watch a single file for changes
 */
export async function getFileVersion(filePath: string): Promise<number> {
	if (!(await exists(filePath))) {
		return 0;
	}
	return generateFileVersion(filePath);
}
