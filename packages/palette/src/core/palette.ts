/**
 * Palette - Color palette management
 */

import type { ColorHex, ColorRGB, PaletteData } from "../types";

export interface PaletteOptions {
	colors?: ColorHex[];
	name?: string;
}

export class Palette {
	private colors: ColorHex[];
	private name: string;
	private rgbCache: Map<number, ColorRGB>;

	constructor(options: PaletteOptions | PaletteData = {}) {
		if ("colors" in options && Array.isArray(options.colors)) {
			this.colors = [...options.colors];
			this.name = options.name || "Custom";
		} else {
			// Default: empty palette
			this.colors = [];
			this.name = "Empty";
		}

		this.rgbCache = new Map();
	}

	/**
	 * Get color by index
	 */
	get(index: number): ColorHex {
		return this.colors[index % this.colors.length] || "#000000";
	}

	/**
	 * Get color as RGB object
	 */
	getRGB(index: number): ColorRGB {
		if (this.rgbCache.has(index)) {
			return this.rgbCache.get(index)!;
		}

		const hex = this.get(index);
		const rgb = this.hexToRGB(hex);
		this.rgbCache.set(index, rgb);
		return rgb;
	}

	/**
	 * Get all colors
	 */
	getAll(): ColorHex[] {
		return [...this.colors];
	}

	/**
	 * Get palette size
	 */
	get size(): number {
		return this.colors.length;
	}

	/**
	 * Get palette name
	 */
	get paletteName(): string {
		return this.name;
	}

	/**
	 * Set color at index (expands palette if needed)
	 */
	set(index: number, color: ColorHex): void {
		if (index >= 0) {
			// Expand palette if needed
			while (this.colors.length <= index) {
				this.colors.push("#000000");
			}
			this.colors[index] = color;
			this.rgbCache.delete(index);
		}
	}

	/**
	 * Add color to palette
	 */
	add(color: ColorHex): number {
		this.colors.push(color);
		return this.colors.length - 1;
	}

	/**
	 * Remove color at index
	 */
	remove(index: number): void {
		if (index >= 0 && index < this.colors.length) {
			this.colors.splice(index, 1);
			this.rgbCache.clear();
		}
	}

	/**
	 * Replace entire palette
	 */
	setPalette(colors: ColorHex[]): void {
		this.colors = [...colors];
		this.rgbCache.clear();
	}

	/**
	 * Reset to original colors
	 */
	reset(paletteData?: PaletteData): void {
		if (paletteData) {
			this.colors = [...paletteData.colors];
			this.name = paletteData.name;
		}
		this.rgbCache.clear();
	}

	/**
	 * Convert hex to RGB
	 */
	private hexToRGB(hex: ColorHex): ColorRGB {
		const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		return result
			? {
					r: Number.parseInt(result[1], 16),
					g: Number.parseInt(result[2], 16),
					b: Number.parseInt(result[3], 16),
				}
			: { r: 0, g: 0, b: 0 };
	}

	/**
	 * Convert RGB to hex
	 */
	static rgbToHex(r: number, g: number, b: number): ColorHex {
		return (
			"#" +
			((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()
		);
	}

	/**
	 * Find closest color in palette
	 */
	findClosest(targetHex: ColorHex): number {
		const target = this.hexToRGB(targetHex);
		let closestIndex = 0;
		let closestDistance = Number.POSITIVE_INFINITY;

		for (let i = 0; i < this.colors.length; i++) {
			const color = this.getRGB(i);
			const distance =
				(target.r - color.r) ** 2 +
				(target.g - color.g) ** 2 +
				(target.b - color.b) ** 2;

			if (distance < closestDistance) {
				closestDistance = distance;
				closestIndex = i;
			}
		}

		return closestIndex;
	}

	/**
	 * Create a gradient between two palette colors
	 */
	gradient(startIndex: number, endIndex: number, steps: number): ColorHex[] {
		const start = this.getRGB(startIndex);
		const end = this.getRGB(endIndex);
		const gradient: ColorHex[] = [];

		for (let i = 0; i < steps; i++) {
			const t = i / (steps - 1);
			const r = Math.round(start.r + (end.r - start.r) * t);
			const g = Math.round(start.g + (end.g - start.g) * t);
			const b = Math.round(start.b + (end.b - start.b) * t);
			gradient.push(Palette.rgbToHex(r, g, b));
		}

		return gradient;
	}

	/**
	 * Lighten a color
	 */
	lighten(index: number, amount: number = 0.2): ColorHex {
		const color = this.getRGB(index);
		const r = Math.min(255, Math.round(color.r + (255 - color.r) * amount));
		const g = Math.min(255, Math.round(color.g + (255 - color.g) * amount));
		const b = Math.min(255, Math.round(color.b + (255 - color.b) * amount));
		return Palette.rgbToHex(r, g, b);
	}

	/**
	 * Darken a color
	 */
	darken(index: number, amount: number = 0.2): ColorHex {
		const color = this.getRGB(index);
		const r = Math.max(0, Math.round(color.r * (1 - amount)));
		const g = Math.max(0, Math.round(color.g * (1 - amount)));
		const b = Math.max(0, Math.round(color.b * (1 - amount)));
		return Palette.rgbToHex(r, g, b);
	}

	/**
	 * Mix two colors
	 */
	mix(index1: number, index2: number, ratio: number = 0.5): ColorHex {
		const color1 = this.getRGB(index1);
		const color2 = this.getRGB(index2);
		const r = Math.round(color1.r + (color2.r - color1.r) * ratio);
		const g = Math.round(color1.g + (color2.g - color1.g) * ratio);
		const b = Math.round(color1.b + (color2.b - color1.b) * ratio);
		return Palette.rgbToHex(r, g, b);
	}

	/**
	 * Export palette data
	 */
	toData(): PaletteData {
		return {
			name: this.name,
			colors: this.getAll(),
		};
	}
}
