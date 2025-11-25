/**
 * Asset optimizer for production builds
 *
 * Optimizes images (resize, convert to webp) to reduce bundle size.
 */

import path from "path";
import fs from "fs-extra";
import pc from "picocolors";

// Lazy load sharp (optional dependency)
let sharpCache: any = null;

/**
 * Get sharp instance (lazy load)
 */
async function getSharp(): Promise<any> {
	if (sharpCache !== undefined) {
		return sharpCache;
	}

	try {
		const sharpModule = await import("sharp");
		sharpCache = sharpModule.default || sharpModule;
	} catch {
		sharpCache = null;
	}

	return sharpCache;
}

/**
 * Image optimization options
 */
export interface ImageOptimizeOptions {
	/** Maximum width (default: 2048) */
	maxWidth?: number;
	/** Maximum height (default: 2048) */
	maxHeight?: number;
	/** WebP quality (0-100, default: 85) */
	webpQuality?: number;
	/** Whether to convert to WebP (default: true) */
	convertToWebP?: boolean;
}

const DEFAULT_OPTIONS: Required<ImageOptimizeOptions> = {
	maxWidth: 2048,
	maxHeight: 2048,
	webpQuality: 85,
	convertToWebP: true,
};

/**
 * Optimize a single image file
 *
 * @param inputPath - Input image path
 * @param outputPath - Output image path
 * @param options - Optimization options
 * @returns True if optimization succeeded, false otherwise
 */
export async function optimizeImage(
	inputPath: string,
	outputPath: string,
	options: ImageOptimizeOptions = {},
): Promise<boolean> {
	const sharp = await getSharp();
	if (!sharp) {
		// sharp not available, just copy the file
		await fs.copy(inputPath, outputPath);
		return false;
	}

	const opts = { ...DEFAULT_OPTIONS, ...options };

	try {
		const image = sharp(inputPath);
		const metadata = await image.metadata();

		// Resize if needed
		if (metadata.width && metadata.height) {
			if (metadata.width > opts.maxWidth || metadata.height > opts.maxHeight) {
				image.resize(opts.maxWidth, opts.maxHeight, {
					fit: "inside",
					withoutEnlargement: true,
				});
			}
		}

		// Convert to WebP if enabled
		if (opts.convertToWebP) {
			const ext = path.extname(outputPath).toLowerCase();
			if (ext !== ".webp") {
				outputPath = outputPath.replace(/\.(png|jpg|jpeg|gif)$/i, ".webp");
			}
			await image.webp({ quality: opts.webpQuality }).toFile(outputPath);
		} else {
			await image.toFile(outputPath);
		}

		return true;
	} catch (error) {
		console.warn(
			pc.yellow(`  ⚠ Failed to optimize ${path.basename(inputPath)}: ${error}`),
		);
		// Fallback: copy original
		await fs.copy(inputPath, outputPath);
		return false;
	}
}

/**
 * Optimize all images in a directory
 *
 * @param inputDir - Input directory
 * @param outputDir - Output directory
 * @param options - Optimization options
 * @returns Statistics about optimization
 */
export async function optimizeImages(
	inputDir: string,
	outputDir: string,
	options: ImageOptimizeOptions = {},
): Promise<{
	optimized: number;
	skipped: number;
	total: number;
}> {
	if (!(await fs.pathExists(inputDir))) {
		return { optimized: 0, skipped: 0, total: 0 };
	}

	await fs.ensureDir(outputDir);

	const imageExtensions = [".png", ".jpg", ".jpeg", ".webp", ".gif"];
	const files = await fs.readdir(inputDir);
	const imageFiles = files.filter((file) => {
		const ext = path.extname(file).toLowerCase();
		return imageExtensions.includes(ext);
	});

	let optimized = 0;
	let skipped = 0;

	for (const file of imageFiles) {
		const inputPath = path.join(inputDir, file);
		const outputPath = path.join(outputDir, file);

		const wasOptimized = await optimizeImage(inputPath, outputPath, options);
		if (wasOptimized) {
			optimized++;
		} else {
			skipped++;
		}
	}

	return {
		optimized,
		skipped,
		total: imageFiles.length,
	};
}

/**
 * Check if sharp is available
 *
 * @returns True if sharp is installed and available
 */
export async function isSharpAvailable(): Promise<boolean> {
	const sharp = await getSharp();
	return sharp !== null;
}
