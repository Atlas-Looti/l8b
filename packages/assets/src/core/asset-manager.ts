/**
 * AssetManager - Load and manage game assets
 *
 * Provides utilities for loading images, JSON, text files, CSV, Markdown, and fonts.
 *
 * Note: 3D Models and WASM are out of scope for L8B (2D only).
 */

import { Image } from "@l8b/sprites";
import type {
	ImageLoaderResult,
	JSONLoaderResult,
	Runtime,
	TextLoaderResult,
} from "../types";

export type { Runtime };

export class AssetManager {
	private runtime: Runtime;

	constructor(runtime: Runtime) {
		this.runtime = runtime;
	}

	/**
	 * Get the interface object for binding to VM
	 */
	getInterface() {
		return {
			loadFont: (font: string) => this.loadFont(font),
			loadImage: (path: string, callback?: (image: Image) => void) =>
				this.loadImage(path, callback),
			loadJSON: (path: string, callback?: (data: any) => void) =>
				this.loadJSON(path, callback),
			loadText: (
				path: string,
				callback?: (text: string) => void,
				ext?: string,
			) => this.loadText(path, callback, ext),
			loadCSV: (path: string, callback?: (text: string) => void) =>
				this.loadCSV(path, callback),
			loadMarkdown: (path: string, callback?: (text: string) => void) =>
				this.loadMarkdown(path, callback),
		};
	}

	/**
	 * Load a font
	 */
	loadFont(font: string): void {
		if (typeof font !== "string") {
			return;
		}

		const file = font.replace(/\//g, "-");
		const split = file.split("-");
		const name = split[split.length - 1];

		try {
			const fontFace = new FontFace(name, `url(assets/${file}.ttf)`);
			fontFace
				.load()
				.then(() => {
					if (document.fonts && (document.fonts as any).add) {
						(document.fonts as any).add(fontFace);
					}
				})
				.catch((err) => {
					console.error("Failed to load font:", err);
				});
		} catch (err) {
			console.error("Failed to create font:", err);
		}
	}

	/**
	 * Load an image file
	 * @param path Image path
	 * @param callback Optional callback when image is loaded
	 * @returns Loader result object with Image instance
	 */
	loadImage(
		path: string,
		callback?: (image: Image) => void,
	): ImageLoaderResult {
		const loader: ImageLoaderResult = {
			ready: 0,
		};

		let actualPath = path;
		if (this.runtime.assets[path]) {
			actualPath = this.runtime.assets[path].file;
		}

		const img = document.createElement("img");
		// Handle CORS for cross-origin images
		if (typeof window !== "undefined" && window.location.protocol !== "file:") {
			img.crossOrigin = "Anonymous";
		}
		img.src = `assets/${actualPath}`;
		img.onload = () => {
			const image = new Image(img);
			loader.image = image;
			loader.ready = 1;
			if (callback) {
				callback(image);
			}
		};
		img.onerror = () => {
			console.error(`Failed to load image: assets/${actualPath}`);
			loader.ready = 1; // Mark as ready even on error to avoid blocking
		};

		return loader;
	}

	/**
	 * Load a JSON file
	 * @param path JSON file path
	 * @param callback Optional callback when JSON is loaded
	 * @returns Loader result object
	 */
	loadJSON(path: string, callback?: (data: any) => void): JSONLoaderResult {
		const loader: JSONLoaderResult = {
			ready: 0,
		};

		// Convert path separators to dashes and add .json extension
		const actualPath = path.replace(/\//g, "-");
		const url = `assets/${actualPath}.json`;

		fetch(url)
			.then((result) => result.json())
			.then((data) => {
				loader.data = data;
				loader.ready = 1;
				if (callback) {
					callback(data);
				}
			})
			.catch((err) => {
				console.error(`Failed to load JSON: ${url}`, err);
			});

		return loader;
	}

	/**
	 * Load a text file
	 * @param path Text file path
	 * @param callback Optional callback when text is loaded
	 * @param ext File extension (default: "txt")
	 * @returns Loader result object
	 */
	loadText(
		path: string,
		callback?: (text: string) => void,
		ext: string = "txt",
	): TextLoaderResult {
		const loader: TextLoaderResult = {
			ready: 0,
		};

		// Convert path separators to dashes and add extension
		const actualPath = path.replace(/\//g, "-");
		const url = `assets/${actualPath}.${ext}`;

		fetch(url)
			.then((result) => result.text())
			.then((text) => {
				loader.text = text;
				loader.ready = 1;
				if (callback) {
					callback(text);
				}
			})
			.catch((err) => {
				console.error(`Failed to load text: ${url}`, err);
			});

		return loader;
	}

	/**
	 * Load a CSV file
	 * @param path CSV file path
	 * @param callback Optional callback when CSV is loaded
	 * @returns Loader result object
	 */
	loadCSV(path: string, callback?: (text: string) => void): TextLoaderResult {
		return this.loadText(path, callback, "csv");
	}

	/**
	 * Load a Markdown file
	 * @param path Markdown file path
	 * @param callback Optional callback when Markdown is loaded
	 * @returns Loader result object
	 */
	loadMarkdown(
		path: string,
		callback?: (text: string) => void,
	): TextLoaderResult {
		return this.loadText(path, callback, "md");
	}
}
