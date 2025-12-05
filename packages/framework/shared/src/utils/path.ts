/**
 * Path utilities for L8B framework
 */
import { basename, dirname, extname, join, relative, resolve } from "node:path";
import { AUDIO_EXTENSIONS, IMAGE_EXTENSIONS, LOOT_EXTENSIONS, MAP_EXTENSIONS } from "../constants";
import type { ResourceType } from "../types";

/**
 * Normalize file path separators to forward slashes
 */
export function normalizePath(path: string): string {
	return path.replace(/\\/g, "/");
}

/**
 * Get file name without extension
 */
export function getBaseName(filePath: string): string {
	const base = basename(filePath);
	const ext = extname(base);
	return base.slice(0, -ext.length);
}

/**
 * Get module name from file path relative to source directory
 * Converts path separators to forward slashes and removes extension
 */
export function getModuleName(filePath: string, srcDir: string): string {
	const rel = relative(srcDir, filePath);
	const normalized = normalizePath(rel);
	const ext = extname(normalized);
	return normalized.slice(0, -ext.length);
}

/**
 * Get resource name from file path
 * Converts path separators to forward slashes and hyphens
 */
export function getResourceName(filePath: string, baseDir: string): string {
	const rel = relative(baseDir, filePath);
	const normalized = normalizePath(rel);
	const ext = extname(normalized);
	// Convert slashes to hyphens for resource naming
	return normalized.slice(0, -ext.length).replace(/\//g, "-");
}

/**
 * Get slug name from file path (for URL-safe names)
 */
export function getSlugName(filePath: string, baseDir: string): string {
	const rel = relative(baseDir, filePath);
	const normalized = normalizePath(rel);
	const ext = extname(normalized);
	return normalized.slice(0, -ext.length).replace(/\//g, "-");
}

/**
 * Convert slug back to module path
 */
export function slugToModulePath(slug: string): string {
	return slug.replace(/-/g, "/");
}

/**
 * Check if file is a LootiScript source file
 */
export function isSourceFile(filePath: string): boolean {
	const ext = extname(filePath).toLowerCase();
	return LOOT_EXTENSIONS.includes(ext as (typeof LOOT_EXTENSIONS)[number]);
}

/**
 * Check if file is an image/sprite file
 */
export function isImageFile(filePath: string): boolean {
	const ext = extname(filePath).toLowerCase();
	return IMAGE_EXTENSIONS.includes(ext as (typeof IMAGE_EXTENSIONS)[number]);
}

/**
 * Check if file is an audio file
 */
export function isAudioFile(filePath: string): boolean {
	const ext = extname(filePath).toLowerCase();
	return AUDIO_EXTENSIONS.includes(ext as (typeof AUDIO_EXTENSIONS)[number]);
}

/**
 * Check if file is a map file
 */
export function isMapFile(filePath: string): boolean {
	const ext = extname(filePath).toLowerCase();
	return MAP_EXTENSIONS.includes(ext as (typeof MAP_EXTENSIONS)[number]);
}

/**
 * Determine resource type from file path
 */
export function getResourceType(filePath: string, publicDir: string): ResourceType | null {
	if (isSourceFile(filePath)) {
		return "source";
	}

	const rel = normalizePath(relative(publicDir, filePath));
	const parts = rel.split("/");

	if (parts[0] === "sprites" && isImageFile(filePath)) {
		return "sprite";
	}
	if (parts[0] === "maps" && isMapFile(filePath)) {
		return "map";
	}
	if (parts[0] === "sounds" && isAudioFile(filePath)) {
		return "sound";
	}
	if (parts[0] === "music" && isAudioFile(filePath)) {
		return "music";
	}
	if (parts[0] === "fonts") {
		return "font";
	}
	if (parts[0] === "assets") {
		return "asset";
	}

	return null;
}

/**
 * Re-export node path utilities
 */
export { basename, dirname, extname, join, relative, resolve };
