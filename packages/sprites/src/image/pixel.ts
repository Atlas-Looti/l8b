/**
 * Pixel-level operations for Image class
 * Handles individual pixel reading and writing
 */

export interface RGBColor {
	R: number;
	G: number;
	B: number;
}

export interface RGBAColor extends RGBColor {
	A: number;
}

let pixelDataCache: ImageData | null = null;

export function setRGB(
	context: CanvasRenderingContext2D,
	x: number,
	y: number,
	r: number | RGBColor,
	g?: number,
	b?: number,
): void {
	if (pixelDataCache == null) {
		pixelDataCache = context.createImageData(1, 1);
	}

	if (typeof r === "object") {
		pixelDataCache.data[0] = r.R;
		pixelDataCache.data[1] = r.G;
		pixelDataCache.data[2] = r.B;
	} else {
		pixelDataCache.data[0] = r;
		pixelDataCache.data[1] = g || 0;
		pixelDataCache.data[2] = b || 0;
	}
	pixelDataCache.data[3] = 255;

	context.putImageData(pixelDataCache, x, y);
}

export function setRGBA(
	context: CanvasRenderingContext2D,
	x: number,
	y: number,
	r: number | RGBAColor,
	g?: number,
	b?: number,
	a?: number,
): void {
	if (pixelDataCache == null) {
		pixelDataCache = context.createImageData(1, 1);
	}

	if (typeof r === "object") {
		pixelDataCache.data[0] = r.R;
		pixelDataCache.data[1] = r.G;
		pixelDataCache.data[2] = r.B;
		pixelDataCache.data[3] = r.A != null ? r.A : 255;
	} else {
		pixelDataCache.data[0] = r;
		pixelDataCache.data[1] = g || 0;
		pixelDataCache.data[2] = b || 0;
		pixelDataCache.data[3] = a ?? 255;
	}

	context.putImageData(pixelDataCache, x, y);
}

export function getRGB(
	context: CanvasRenderingContext2D,
	x: number,
	y: number,
	result: RGBColor = { R: 0, G: 0, B: 0 },
): RGBColor {
	const d = context.getImageData(x, y, 1, 1);
	result.R = d.data[0];
	result.G = d.data[1];
	result.B = d.data[2];
	return result;
}

export function getRGBA(
	context: CanvasRenderingContext2D,
	x: number,
	y: number,
	result: RGBAColor = { R: 0, G: 0, B: 0, A: 255 },
): RGBAColor {
	const d = context.getImageData(x, y, 1, 1);
	result.R = d.data[0];
	result.G = d.data[1];
	result.B = d.data[2];
	result.A = d.data[3];
	return result;
}
