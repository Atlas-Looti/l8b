/**
 * Persistent cache utility with hash-based invalidation
 *
 * Provides file-based caching with content hash for cache invalidation.
 * Used for caching resources and sources during development.
 */

import fs from "fs-extra";
import path from "path";
import { createHash } from "crypto";

/**
 * Cache entry stored on disk
 */
interface CacheEntry<T> {
	data: T;
	hash: string;
	timestamp: number;
}

/**
 * Options for cache operations
 */
export interface CacheOptions {
	/** Cache directory path */
	cacheDir: string;
	/** Cache key (filename without extension) */
	key: string;
}

/**
 * Compute hash for a directory or set of files
 *
 * @param projectPath - Project root path
 * @param paths - Array of paths to include in hash (relative to projectPath)
 * @returns SHA256 hash string
 */
export async function computeHash(
	projectPath: string,
	paths: string[],
): Promise<string> {
	const hash = createHash("sha256");
	const entries: string[] = [];

	for (const relPath of paths) {
		const fullPath = path.join(projectPath, relPath);
		if (!(await fs.pathExists(fullPath))) {
			continue;
		}

		const stat = await fs.stat(fullPath);
		if (stat.isDirectory()) {
			// Hash all files in directory recursively
			const files = await getAllFiles(fullPath);
			for (const file of files) {
				const fileStat = await fs.stat(file);
				const relative = path.relative(projectPath, file);
				entries.push(`${relative}:${fileStat.mtimeMs}:${fileStat.size}`);
			}
		} else {
			// Hash single file
			const relative = path.relative(projectPath, fullPath);
			entries.push(`${relative}:${stat.mtimeMs}:${stat.size}`);
		}
	}

	// Sort entries for consistent hashing
	entries.sort();
	hash.update(entries.join("|"));
	return hash.digest("hex");
}

/**
 * Get all files recursively from a directory
 *
 * @param dirPath - Directory path
 * @returns Array of file paths
 */
async function getAllFiles(dirPath: string): Promise<string[]> {
	const files: string[] = [];
	const entries = await fs.readdir(dirPath, { withFileTypes: true });

	for (const entry of entries) {
		const fullPath = path.join(dirPath, entry.name);
		if (entry.isDirectory()) {
			// Skip node_modules and .git
			if (entry.name === "node_modules" || entry.name === ".git") {
				continue;
			}
			files.push(...(await getAllFiles(fullPath)));
		} else {
			files.push(fullPath);
		}
	}

	return files;
}

/**
 * Get cached data if hash matches
 *
 * @param options - Cache options
 * @param currentHash - Current hash to compare against
 * @returns Cached data or null if cache miss
 */
export async function getCached<T>(
	options: CacheOptions,
	currentHash: string,
): Promise<T | null> {
	const cacheFile = path.join(options.cacheDir, `${options.key}.json`);

	if (!(await fs.pathExists(cacheFile))) {
		return null;
	}

	try {
		const entry: CacheEntry<T> = await fs.readJson(cacheFile);

		// Check if hash matches
		if (entry.hash === currentHash) {
			return entry.data;
		}

		// Hash mismatch, cache invalid
		return null;
	} catch (error) {
		// Cache file corrupted, ignore
		return null;
	}
}

/**
 * Save data to cache with hash
 *
 * @param options - Cache options
 * @param data - Data to cache
 * @param hash - Hash of the data
 */
export async function setCached<T>(
	options: CacheOptions,
	data: T,
	hash: string,
): Promise<void> {
	// Ensure cache directory exists
	await fs.ensureDir(options.cacheDir);

	const cacheFile = path.join(options.cacheDir, `${options.key}.json`);
	const entry: CacheEntry<T> = {
		data,
		hash,
		timestamp: Date.now(),
	};

	await fs.writeJson(cacheFile, entry, { spaces: 2 });
}

/**
 * Clear cache for a specific key
 *
 * @param options - Cache options
 */
export async function clearCache(options: CacheOptions): Promise<void> {
	const cacheFile = path.join(options.cacheDir, `${options.key}.json`);
	if (await fs.pathExists(cacheFile)) {
		await fs.remove(cacheFile);
	}
}

/**
 * Clear all cache files in cache directory
 *
 * @param cacheDir - Cache directory path
 */
export async function clearAllCache(cacheDir: string): Promise<void> {
	if (await fs.pathExists(cacheDir)) {
		await fs.emptyDir(cacheDir);
	}
}
