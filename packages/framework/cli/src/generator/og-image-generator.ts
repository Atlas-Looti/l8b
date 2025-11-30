/**
 * Dynamic OG Image Generator using L8B Screen API
 *
 * Generates Open Graph images dynamically using the screen API
 * for routes with dynamic parameters (e.g., /level/:id)
 *
 * This can be used in browser environment to generate OG images
 * on-demand using the same Screen API that games use.
 */

import type { LootiConfig } from "../config";

/**
 * OG Image generation options
 */
export interface OGImageOptions {
	/** Route path (e.g., "/level/5") */
	routePath: string;
	/** Route parameters extracted from path */
	params: Record<string, string>;
	/** Image width (default: 1200 for 3:2 aspect ratio) */
	width?: number;
	/** Image height (default: 800 for 3:2 aspect ratio) */
	height?: number;
}

/**
 * Default OG image dimensions (3:2 aspect ratio as per Farcaster spec)
 */
const DEFAULT_OG_WIDTH = 1200;
const DEFAULT_OG_HEIGHT = 800;

/**
 * Generate dynamic OG image using Screen API (Browser only)
 *
 * This creates a temporary Screen instance and allows custom rendering
 * via a callback function. The rendered canvas is then exported as PNG.
 *
 * NOTE: This function only works in browser environment.
 * For server-side, use the endpoint approach.
 *
 * @param options - OG image generation options
 * @param renderCallback - Function that receives screen interface and renders the image
 * @returns PNG image data URL or null if generation fails
 */
export async function generateOGImage(options: OGImageOptions, renderCallback: (screen: any) => void | Promise<void>): Promise<string | null> {
	// Only work in browser environment
	if (typeof document === "undefined") {
		return null;
	}

	try {
		const width = options.width || DEFAULT_OG_WIDTH;
		const height = options.height || DEFAULT_OG_HEIGHT;

		// Create temporary canvas for OG image
		const canvas = document.createElement("canvas");
		canvas.width = width;
		canvas.height = height;

		// Import Screen dynamically (only in browser)
		const { Screen } = await import("@l8b/screen");

		// Create Screen instance with temporary canvas
		const screen = new Screen({
			canvas,
			width,
			height,
		});

		// Get screen interface
		const screenInterface = screen.getInterface();

		// Execute render callback
		await renderCallback(screenInterface);

		// Export canvas as PNG data URL
		return canvas.toDataURL("image/png", 1.0);
	} catch (error) {
		console.error("Error generating OG image:", error);
		return null;
	}
}

/**
 * Generate OG image URL for a route
 *
 * @param config - LootiScript configuration
 * @param routePath - Route path
 * @param params - Route parameters
 * @returns URL to OG image endpoint
 */
export function getOGImageURL(config: LootiConfig, routePath: string, params: Record<string, string> = {}): string {
	const baseUrl = config.url || "/";
	const paramsString = new URLSearchParams(params).toString();
	const queryString = paramsString ? `?${paramsString}` : "";

	// Use /og-image endpoint with route path
	return `${baseUrl}og-image${routePath}${queryString}`;
}
