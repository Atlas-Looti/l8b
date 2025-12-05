/**
 * Font management for Image class
 * Handles font loading and readiness checking
 */

// Font cache to track loaded fonts
const loadedFonts = new Set<string>();
const loadingFonts = new Map<string, Promise<void>>();

/**
 * Load a font for use in the image
 * In a full implementation, this would integrate with a font loading system
 */
export function loadFont(font: string): Promise<void> | void {
	if (!font) {
		return;
	}

	// If already loaded, return immediately
	if (loadedFonts.has(font)) {
		return Promise.resolve();
	}

	// If currently loading, return existing promise
	if (loadingFonts.has(font)) {
		return loadingFonts.get(font);
	}

	// Check if font is available via CSS Font Loading API
	if (typeof document !== "undefined" && "fonts" in document) {
		const promise = document.fonts
			.load(`12pt ${font}`)
			.then(() => {
				loadedFonts.add(font);
				loadingFonts.delete(font);
			})
			.catch(() => {
				// Font loading failed, but we'll mark it as loaded anyway
				loadedFonts.add(font);
				loadingFonts.delete(font);
			});

		loadingFonts.set(font, promise);
		return promise;
	}

	// Fallback: assume font is available
	loadedFonts.add(font);
	return Promise.resolve();
}

/**
 * Check if a font is ready to use
 */
export function isFontReady(font: string): boolean {
	if (!font) {
		return true;
	}

	// Check if font is in loaded set
	if (loadedFonts.has(font)) {
		return true;
	}

	// Check via CSS Font Loading API
	if (typeof document !== "undefined" && "fonts" in document) {
		return document.fonts.check(`12pt ${font}`);
	}

	// Fallback: assume font is ready
	return true;
}

/**
 * Clear font cache (useful for testing)
 */
export function clearFontCache(): void {
	loadedFonts.clear();
	loadingFonts.clear();
}
