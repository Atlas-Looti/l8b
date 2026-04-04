import { access, readFile } from "node:fs/promises";
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
import type { ResolvedConfig } from "@al8b/framework-config";
import type { FileEvent } from "@al8b/framework-watcher";

export function createEmptyProjectResources(): ProjectResources {
	return {
		sources: [],
		images: [],
		maps: [],
		sounds: [],
		music: [],
		assets: [],
		fonts: [],
	};
}

export function createSourceMap(resources: ProjectResources): Map<string, SourceInfo> {
	return new Map(resources.sources.map((source) => [source.file, source]));
}

/**
 * Apply a single watcher event to the in-memory resource registry.
 * Returns false when the event can't be handled incrementally and a full refresh is safer.
 */
export async function applyResourceEvent(
	resources: ProjectResources,
	config: ResolvedConfig,
	event: FileEvent,
): Promise<boolean> {
	if (event.type === "addDir" || event.type === "unlinkDir" || event.resourceType == null) {
		return false;
	}

	switch (event.resourceType) {
		case "source":
			return updateSourceResource(resources.sources, config.srcPath, event);
		case "sprite":
			return updateSpriteResource(resources.images, join(config.publicPath, "sprites"), event);
		case "map":
			return updateMapResource(resources.maps, join(config.publicPath, "maps"), event);
		case "sound":
			return updateAudioResource(resources.sounds, join(config.publicPath, "sounds"), "sound", event);
		case "music":
			return updateAudioResource(resources.music, join(config.publicPath, "music"), "music", event);
		case "font":
			return updateGenericResource(resources.fonts ?? (resources.fonts = []), join(config.publicPath, "fonts"), "font", event);
		case "asset":
			return updateGenericResource(resources.assets, join(config.publicPath, "assets"), "asset", event);
		default:
			return false;
	}
}

async function updateSourceResource(resources: SourceInfo[], baseDir: string, event: FileEvent): Promise<boolean> {
	const file = toRelativePath(baseDir, event.path);
	if (!file) return false;

	if (event.type === "unlink") {
		removeByFile(resources, file);
		return true;
	}

	if (!isSourceFile(event.path) || !(await exists(event.path))) {
		return false;
	}

	upsertByFile(resources, {
		file,
		name: getModuleName(event.path, baseDir),
		version: await generateFileVersion(event.path),
		content: await readFile(event.path, "utf-8"),
	});

	return true;
}

async function updateSpriteResource(resources: SpriteInfo[], baseDir: string, event: FileEvent): Promise<boolean> {
	const file = toRelativePath(baseDir, event.path);
	if (!file) return false;

	if (event.type === "unlink") {
		removeByFile(resources, file);
		return true;
	}

	if (!isImageFile(event.path) || !(await exists(event.path))) {
		return false;
	}

	let properties: SpriteInfo["properties"];
	const propsPath = event.path.replace(/\.[^.]+$/, ".json");
	if (await exists(propsPath)) {
		try {
			properties = JSON.parse(await readFile(propsPath, "utf-8")) as SpriteInfo["properties"];
		} catch {
			properties = undefined;
		}
	}

	upsertByFile(resources, {
		file,
		name: getResourceName(event.path, baseDir),
		version: await generateFileVersion(event.path),
		type: "sprite",
		properties,
	});

	return true;
}

async function updateMapResource(resources: MapInfo[], baseDir: string, event: FileEvent): Promise<boolean> {
	const file = toRelativePath(baseDir, event.path);
	if (!file) return false;

	if (event.type === "unlink") {
		removeByFile(resources, file);
		return true;
	}

	if (!isMapFile(event.path) || !(await exists(event.path))) {
		return false;
	}

	let data: unknown;
	try {
		data = JSON.parse(await readFile(event.path, "utf-8"));
	} catch {
		return false;
	}

	upsertByFile(resources, {
		file,
		name: getResourceName(event.path, baseDir).replace(/\.json$/, ""),
		version: await generateFileVersion(event.path),
		type: "map",
		data,
	});

	return true;
}

async function updateAudioResource(
	resources: SoundInfo[],
	baseDir: string,
	type: "sound" | "music",
	event: FileEvent,
): Promise<boolean> {
	const file = toRelativePath(baseDir, event.path);
	if (!file) return false;

	if (event.type === "unlink") {
		removeByFile(resources, file);
		return true;
	}

	if (!isAudioFile(event.path) || !(await exists(event.path))) {
		return false;
	}

	upsertByFile(resources, {
		file,
		name: getResourceName(event.path, baseDir).replace(/\.(wav|mp3|ogg|m4a)$/i, ""),
		version: await generateFileVersion(event.path),
		type,
	});

	return true;
}

async function updateGenericResource(
	resources: ResourceInfo[],
	baseDir: string,
	type: ResourceInfo["type"],
	event: FileEvent,
): Promise<boolean> {
	const file = toRelativePath(baseDir, event.path);
	if (!file) return false;

	if (event.type === "unlink") {
		removeByFile(resources, file);
		return true;
	}

	if (!(await exists(event.path))) {
		return false;
	}

	upsertByFile(resources, {
		file,
		name: type === "font" ? getBaseName(event.path) : getResourceName(event.path, baseDir),
		version: await generateFileVersion(event.path),
		type,
	});

	return true;
}

function toRelativePath(baseDir: string, filePath: string): string | null {
	const relativePath = normalizePath(relative(baseDir, filePath));
	if (relativePath === "" || relativePath.startsWith("../")) {
		return null;
	}
	return relativePath;
}

function upsertByFile<T extends { file: string }>(items: T[], nextItem: T): void {
	const index = items.findIndex((item) => item.file === nextItem.file);
	if (index === -1) {
		items.push(nextItem);
		return;
	}
	items[index] = nextItem;
}

function removeByFile<T extends { file: string }>(items: T[], file: string): void {
	const index = items.findIndex((item) => item.file === file);
	if (index !== -1) {
		items.splice(index, 1);
	}
}

async function exists(path: string): Promise<boolean> {
	try {
		await access(path, constants.F_OK);
		return true;
	} catch {
		return false;
	}
}
