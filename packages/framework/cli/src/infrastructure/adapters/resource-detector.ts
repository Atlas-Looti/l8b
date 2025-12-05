/**
 * Resource Detector Adapter
 *
 * Implementation of IResourceDetector for detecting project assets
 */

import type { ResourceFile, Resources } from "@l8b/runtime";
import path from "path";
import type { Resources as ResourcesEntity } from "../../core/types";
import type { IFileSystem, ILogger, IResourceDetector } from "../../core/ports";
import { ASSET_EXTENSIONS, ASSET_SUBDIRS } from "../../utils/constants";
import { DEFAULT_DIRS } from "../../utils/paths";

// Known directories to skip when scanning root public
const KNOWN_DIRS = new Set([
	ASSET_SUBDIRS.SPRITES,
	ASSET_SUBDIRS.MAPS,
	ASSET_SUBDIRS.FONTS,
	ASSET_SUBDIRS.SOUNDS,
	ASSET_SUBDIRS.MUSIC,
	"l8b",
]);

/**
 * Load sprite properties from metadata file if it exists
 */
async function loadSpriteProperties(
	filePath: string,
	fileSystem: IFileSystem,
	logger?: ILogger,
): Promise<any | undefined> {
	const metadataPath = filePath.replace(/\.(png|jpg|jpeg|webp|gif)$/i, ".json");
	
	if (await fileSystem.pathExists(metadataPath)) {
		try {
			const metadata = await fileSystem.readJson(metadataPath);
			return metadata;
		} catch (error) {
			// Log warning if logger is available, otherwise silently ignore
			if (logger) {
				logger.warn(`Failed to read sprite metadata ${metadataPath}`);
			}
		}
	}
	
	return undefined;
}

/**
 * Scan a single directory for files with matching extensions
 */
async function scanDirectory(
	dirPath: string,
	extensions: Set<string>,
	fileSystem: IFileSystem,
	loadMetadata: boolean = false,
	logger?: ILogger,
): Promise<ResourceFile[]> {
	const files: ResourceFile[] = [];

	if (!(await fileSystem.pathExists(dirPath))) {
		return files;
	}

	try {
		const entries = await fileSystem.readdir(dirPath, {
			withFileTypes: true,
		});

		for (const entry of entries as import("fs").Dirent[]) {
			// Skip directories
			if (entry.isDirectory()) continue;

			const ext = path.extname(entry.name).toLowerCase();
			if (extensions.has(ext)) {
				const filePath = path.join(dirPath, entry.name);
				const resourceFile: ResourceFile = {
					file: entry.name, // Just the filename
					version: 1,
				};

				// Load sprite properties from metadata file if requested
				if (loadMetadata) {
					const properties = await loadSpriteProperties(filePath, fileSystem, logger);
					if (properties) {
						resourceFile.properties = properties;
					}
				}

				files.push(resourceFile);
			}
		}
	} catch (error) {
		// Directory might have been removed, silently ignore ENOENT
		const err = error as NodeJS.ErrnoException;
		if (err.code !== "ENOENT" && logger) {
			logger.warn(`Failed to scan directory ${dirPath}`);
		}
	}

	return files;
}

export class ResourceDetector implements IResourceDetector {
	constructor(
		private fileSystem: IFileSystem,
		private logger?: ILogger,
	) {}

	async detectResources(projectPath: string): Promise<ResourcesEntity> {
		const resources: Resources = {
			images: [],
			maps: [],
			sounds: [],
			music: [],
			assets: [],
		};

		const publicDir = path.join(projectPath, DEFAULT_DIRS.PUBLIC);

		if (!(await this.fileSystem.pathExists(publicDir))) {
			return resources;
		}

		// File extensions for each asset type
		const IMAGE_EXTENSIONS = new Set(ASSET_EXTENSIONS.IMAGE);
		const MAP_EXTENSIONS = new Set(ASSET_EXTENSIONS.MAP);
		const AUDIO_EXTENSIONS = new Set(ASSET_EXTENSIONS.AUDIO);

		// Scan asset directories in parallel
		// For sprites, also load metadata files (e.g., hero.json for hero.png)
		const [sprites, maps, sounds, music] = await Promise.all([
			scanDirectory(path.join(publicDir, ASSET_SUBDIRS.SPRITES), IMAGE_EXTENSIONS, this.fileSystem, true, this.logger),
			scanDirectory(path.join(publicDir, ASSET_SUBDIRS.MAPS), MAP_EXTENSIONS, this.fileSystem, false, this.logger),
			scanDirectory(path.join(publicDir, ASSET_SUBDIRS.SOUNDS), AUDIO_EXTENSIONS, this.fileSystem, false, this.logger),
			scanDirectory(path.join(publicDir, ASSET_SUBDIRS.MUSIC), AUDIO_EXTENSIONS, this.fileSystem, false, this.logger),
		]);

		resources.images = sprites;
		resources.maps = maps;
		resources.sounds = sounds;
		resources.music = music;

		// Scan root public for generic assets
		try {
			const entries = await this.fileSystem.readdir(publicDir, {
				withFileTypes: true,
			});
			for (const entry of entries as import("fs").Dirent[]) {
				// Skip known directories
				if (entry.isDirectory() || KNOWN_DIRS.has(entry.name)) {
					continue;
				}

				// Add as generic asset
				resources.assets!.push({
					file: "/" + entry.name.replace(/\\/g, "/"),
					version: 1,
				});
			}
		} catch (error) {
			// Silently ignore ENOENT, log other errors
			const err = error as NodeJS.ErrnoException;
			if (err.code !== "ENOENT" && this.logger) {
				this.logger.warn("Failed to scan public directory");
			}
		}

		return resources;
	}
}
