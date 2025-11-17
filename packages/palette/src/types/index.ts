/**
 * Color type definitions
 */

export interface ColorRGB {
	r: number;
	g: number;
	b: number;
}

export type ColorHex = string;

export interface PaletteData {
	name: string;
	colors: ColorHex[];
	author?: string;
	url?: string;
}
