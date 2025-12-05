/**
 * Assets Plugin - Handles asset processing
 *
 * Features:
 * - Parallel asset copying
 * - Asset hashing for cache busting
 * - Small asset inlining
 */

import { existsSync, readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { basename, dirname, extname, join } from "node:path";
import type { L8BPlugin, BuildContext } from "./index";
import { createLogger } from "@l8b/framework-shared";

const logger = createLogger("assets-plugin");

/**
 * Asset plugin options
 */
export interface AssetsPluginOptions {
	/** Max size for inlining assets as base64 (bytes) */
	inlineLimit?: number;
	/** Enable asset hashing */
	hash?: boolean;
	/** Hash length */
	hashLength?: number;
}

/**
 * Asset manifest entry
 */
interface ManifestEntry {
	src: string;
	dest: string;
	hash?: string;
	size: number;
	type: string;
}

/**
 * MIME type map
 */
const MIME_TYPES: Record<string, string> = {
	".png": "image/png",
	".jpg": "image/jpeg",
	".jpeg": "image/jpeg",
	".gif": "image/gif",
	".webp": "image/webp",
	".svg": "image/svg+xml",
	".mp3": "audio/mpeg",
	".ogg": "audio/ogg",
	".wav": "audio/wav",
	".json": "application/json",
	".woff": "font/woff",
	".woff2": "font/woff2",
	".ttf": "font/ttf",
};

/**
 * Create assets plugin
 *
 * Note: For Microstudio-style games, we need to:
 * - Copy ALL assets as files (no inlining)
 * - Keep original filenames (no hashing)
 * This allows the runtime to fetch assets by their original names.
 */
export function assetsPlugin(options: AssetsPluginOptions = {}): L8BPlugin {
	const {
		inlineLimit = 0, // Disabled by default - copy all assets as files
		hash = false, // Disabled by default - keep original filenames
		hashLength = 8,
	} = options;

	// Track manifest for all processed assets
	const manifest: Map<string, ManifestEntry> = new Map();

	return {
		name: "l8b:assets",

		async buildStart(_ctx) {
			manifest.clear();
			logger.debug("Assets plugin initialized");
		},

		async generateBundle(files, ctx) {
			const { config, resources } = ctx;

			logger.info("Processing assets...");

			const tasks: Promise<void>[] = [];

			// Process sprites
			for (const sprite of resources.images) {
				tasks.push(
					processAsset(
						join(config.publicPath, "sprites", sprite.file),
						join("sprites", sprite.file),
						"sprite",
						sprite.file,
						ctx,
						files,
						manifest,
						{ inlineLimit, hash, hashLength },
					),
				);
			}

			// Process maps
			for (const map of resources.maps) {
				tasks.push(
					processAsset(
						join(config.publicPath, "maps", map.file),
						join("maps", map.file),
						"map",
						map.file,
						ctx,
						files,
						manifest,
						{ inlineLimit, hash, hashLength },
					),
				);
			}

			// Process sounds
			for (const sound of resources.sounds) {
				tasks.push(
					processAsset(
						join(config.publicPath, "sounds", sound.file),
						join("sounds", sound.file),
						"sound",
						sound.file,
						ctx,
						files,
						manifest,
						{ inlineLimit: 0, hash, hashLength }, // Don't inline audio
					),
				);
			}

			// Process music
			for (const music of resources.music) {
				tasks.push(
					processAsset(
						join(config.publicPath, "music", music.file),
						join("music", music.file),
						"music",
						music.file,
						ctx,
						files,
						manifest,
						{ inlineLimit: 0, hash, hashLength }, // Don't inline audio
					),
				);
			}

			// Process fonts
			if (resources.fonts) {
				for (const font of resources.fonts) {
					tasks.push(
						processAsset(
							join(config.publicPath, "fonts", font.file),
							join("fonts", font.file),
							"font",
							font.file,
							ctx,
							files,
							manifest,
							{ inlineLimit: 0, hash, hashLength },
						),
					);
				}
			}

			// Process generic assets
			for (const asset of resources.assets) {
				tasks.push(
					processAsset(
						join(config.publicPath, "assets", asset.file),
						join("assets", asset.file),
						"asset",
						asset.file,
						ctx,
						files,
						manifest,
						{ inlineLimit, hash, hashLength },
					),
				);
			}

			// Wait for all assets to be processed
			await Promise.all(tasks);

			// Generate asset manifest
			const manifestJson = generateManifest(manifest);
			files.set("asset-manifest.json", JSON.stringify(manifestJson, null, "\t"));

			logger.info(`Processed ${manifest.size} assets`);
		},

		async buildEnd(_ctx) {
			// Log asset stats
			let totalSize = 0;
			for (const entry of manifest.values()) {
				totalSize += entry.size;
			}
			logger.debug(`Total asset size: ${(totalSize / 1024).toFixed(2)} KB`);
		},
	};
}

/**
 * Process a single asset
 */
async function processAsset(
	srcPath: string,
	destPath: string,
	type: string,
	name: string,
	ctx: BuildContext,
	files: Map<string, string | Uint8Array>,
	manifest: Map<string, ManifestEntry>,
	options: {
		inlineLimit: number;
		hash: boolean;
		hashLength: number;
	},
): Promise<void> {
	if (!existsSync(srcPath)) {
		logger.warn(`Asset not found: ${srcPath}`);
		return;
	}

	try {
		const content = readFileSync(srcPath);
		const size = content.length;
		const ext = extname(srcPath).toLowerCase();

		// Calculate hash if enabled
		let fileHash: string | undefined;
		let finalDestPath = destPath;

		if (options.hash) {
			fileHash = createHash("md5").update(content).digest("hex").slice(0, options.hashLength);

			// Add hash to filename
			const dir = dirname(destPath);
			const base = basename(destPath, ext);
			finalDestPath = join(dir, `${base}.${fileHash}${ext}`);
		}

		// Check if we should inline
		if (options.inlineLimit > 0 && size <= options.inlineLimit) {
			const mimeType = MIME_TYPES[ext] || "application/octet-stream";
			const base64 = content.toString("base64");
			const dataUrl = `data:${mimeType};base64,${base64}`;

			// Store as inlined asset
			manifest.set(name, {
				src: destPath,
				dest: dataUrl,
				hash: fileHash,
				size,
				type,
			});

			logger.debug(`Inlined: ${name} (${size} bytes)`);
		} else {
			// Copy to output
			files.set(finalDestPath, content);

			manifest.set(name, {
				src: destPath,
				dest: finalDestPath,
				hash: fileHash,
				size,
				type,
			});

			logger.debug(`Copied: ${name} -> ${finalDestPath}`);
		}
	} catch (err) {
		logger.error(`Failed to process asset: ${srcPath}`, err);
		ctx.errors.push(`Asset error: ${srcPath}: ${err}`);
	}
}

/**
 * Generate asset manifest for runtime
 */
function generateManifest(manifest: Map<string, ManifestEntry>): Record<string, unknown> {
	const result: Record<string, unknown> = {
		version: Date.now(),
		assets: {},
	};

	const assets: Record<string, unknown> = {};
	for (const [name, entry] of manifest) {
		assets[name] = {
			path: entry.dest,
			hash: entry.hash,
			size: entry.size,
			type: entry.type,
		};
	}

	result.assets = assets;
	return result;
}

/**
 * Calculate file hash
 */
export function hashFile(filePath: string, length = 8): string {
	const content = readFileSync(filePath);
	return createHash("md5").update(content).digest("hex").slice(0, length);
}

/**
 * Get MIME type for file
 */
export function getMimeType(filePath: string): string {
	const ext = extname(filePath).toLowerCase();
	return MIME_TYPES[ext] || "application/octet-stream";
}
