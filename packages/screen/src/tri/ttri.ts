/**
 * TTRI - Textured Triangle Rendering (Software Rasterization)
 *
 * Based on TIC-80's ttri implementation for 3D-style graphics.
 * This is NOT a 3D engine - it's pure 2D pixel manipulation using Canvas 2D API.
 *
 * How it works:
 * 1. Use getImageData() to get pixel buffer
 * 2. Rasterize triangle pixel-by-pixel (barycentric coordinates)
 * 3. Interpolate UV texture coordinates (perspective-correct with 1/z)
 * 4. Sample texture and write to pixel buffer
 * 5. Use putImageData() to update canvas
 *
 * This is software rendering like Doom, Quake software mode, and PlayStation 1.
 * No WebGL, no GPU - just CPU pixel manipulation.
 */

import type { Map } from "@l8b/map";
import type { Sprite } from "@l8b/sprites";

export interface Vec2 {
	x: number;
	y: number;
}

export interface Vec3 {
	x: number;
	y: number;
	z: number;
}

export interface TexVert {
	x: number;
	y: number;
	u: number;
	v: number;
	z: number;
}

export type TextureSource = "tiles" | "map" | "screen";

export interface TriangleData {
	context: CanvasRenderingContext2D;
	width: number;
	height: number;
	runtime?: any;
	pixelated: boolean;
}

/**
 * Z-Buffer for depth testing
 */
export class ZBuffer {
	private buffer: Float32Array;
	private width: number;
	private height: number;

	constructor(width: number, height: number) {
		this.width = width;
		this.height = height;
		this.buffer = new Float32Array(width * height);
	}

	clear(): void {
		this.buffer.fill(0);
	}

	get(x: number, y: number): number {
		return this.buffer[y * this.width + x] || 0;
	}

	set(x: number, y: number, z: number): void {
		this.buffer[y * this.width + x] = z;
	}

	resize(width: number, height: number): void {
		if (this.width !== width || this.height !== height) {
			this.width = width;
			this.height = height;
			this.buffer = new Float32Array(width * height);
		}
	}
}

/**
 * Edge function for triangle rasterization
 */
function edgeFn(a: Vec2, b: Vec2, c: Vec2): number {
	return (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x);
}

/**
 * Get pixel from sprite/image
 */
function getSpritePixel(
	sprite: Sprite | any,
	u: number,
	v: number,
	runtime?: any,
): { r: number; g: number; b: number; a: number } | null {
	// Get sprite canvas
	let canvas: HTMLCanvasElement | null = null;

	if (sprite && typeof sprite === "object" && sprite.canvas) {
		canvas = sprite.canvas;
	} else if (typeof sprite === "string" && runtime?.sprites) {
		const spriteObj = runtime.sprites[sprite];
		if (spriteObj?.frames?.[0]?.canvas) {
			canvas = spriteObj.frames[0].canvas;
		}
	}

	if (!canvas) return null;

	// Wrap texture coordinates
	const width = canvas.width;
	const height = canvas.height;
	const x = Math.floor(u) % width;
	const y = Math.floor(v) % height;
	const px = x < 0 ? x + width : x;
	const py = y < 0 ? y + height : y;

	// Get pixel data
	const ctx = canvas.getContext("2d");
	if (!ctx) return null;

	try {
		const imageData = ctx.getImageData(px, py, 1, 1);
		return {
			r: imageData.data[0],
			g: imageData.data[1],
			b: imageData.data[2],
			a: imageData.data[3],
		};
	} catch (e) {
		return null;
	}
}

/**
 * Get pixel from map
 */
function getMapPixel(
	map: Map | any,
	u: number,
	v: number,
	runtime?: any,
): { r: number; g: number; b: number; a: number } | null {
	// Get map object
	let mapObj: any = null;

	if (map && typeof map === "object" && map.getCanvas) {
		mapObj = map;
	} else if (typeof map === "string" && runtime?.maps) {
		mapObj = runtime.maps[map];
	}

	if (!mapObj) return null;

	// Get canvas from map
	const canvas = mapObj.getCanvas ? mapObj.getCanvas() : mapObj.canvas;
	if (!canvas) return null;

	// Wrap texture coordinates
	const width = canvas.width;
	const height = canvas.height;
	const x = Math.floor(u) % width;
	const y = Math.floor(v) % height;
	const px = x < 0 ? x + width : x;
	const py = y < 0 ? y + height : y;

	// Get pixel data
	const ctx = canvas.getContext("2d");
	if (!ctx) return null;

	try {
		const imageData = ctx.getImageData(px, py, 1, 1);
		return {
			r: imageData.data[0],
			g: imageData.data[1],
			b: imageData.data[2],
			a: imageData.data[3],
		};
	} catch (e) {
		return null;
	}
}

/**
 * Draw textured triangle with perspective correction
 */
export function drawTexturedTriangle(
	data: TriangleData,
	v0: TexVert,
	v1: TexVert,
	v2: TexVert,
	texture: Sprite | Map | string | any,
	textureSource: TextureSource = "tiles",
	zBuffer?: ZBuffer,
	useDepth: boolean = false,
): void {
	const { context, width, height, runtime, pixelated } = data;

	// Get bounding box
	const minX = Math.max(0, Math.floor(Math.min(v0.x, v1.x, v2.x)));
	const minY = Math.max(0, Math.floor(Math.min(v0.y, v1.y, v2.y)));
	const maxX = Math.min(width, Math.ceil(Math.max(v0.x, v1.x, v2.x)));
	const maxY = Math.min(height, Math.ceil(Math.max(v0.y, v1.y, v2.y)));

	if (minX >= maxX || minY >= maxY) return;

	// Calculate triangle area
	const area = edgeFn(v0, v1, v2);
	if (Math.abs(area) < 0.001) return;

	// Backface culling
	if (area < 0) return;

	// Prepare perspective-correct interpolation
	const useZ = useDepth && v0.z > 0 && v1.z > 0 && v2.z > 0;

	let w0 = 1,
		w1 = 1,
		w2 = 1;
	let u0 = v0.u,
		u1 = v1.u,
		u2 = v2.u;
	let v0v = v0.v,
		v1v = v1.v,
		v2v = v2.v;

	if (useZ) {
		w0 = 1 / v0.z;
		w1 = 1 / v1.z;
		w2 = 1 / v2.z;
		u0 *= w0;
		u1 *= w1;
		u2 *= w2;
		v0v *= w0;
		v1v *= w1;
		v2v *= w2;
	}

	// Get image data for fast pixel manipulation
	const imageData = context.getImageData(minX, minY, maxX - minX, maxY - minY);
	const pixels = imageData.data;

	// Rasterize
	for (let y = minY; y < maxY; y++) {
		for (let x = minX; x < maxX; x++) {
			const p = { x: x + 0.5, y: y + 0.5 };

			// Calculate barycentric coordinates
			const w0b = edgeFn(v1, v2, p);
			const w1b = edgeFn(v2, v0, p);
			const w2b = edgeFn(v0, v1, p);

			// Check if point is inside triangle
			if (w0b >= 0 && w1b >= 0 && w2b >= 0) {
				// Normalize barycentric coordinates
				const bary0 = w0b / area;
				const bary1 = w1b / area;
				const bary2 = w2b / area;

				// Depth test
				if (useZ && zBuffer) {
					const z = bary0 * v0.z + bary1 * v1.z + bary2 * v2.z;
					const currentZ = zBuffer.get(x, y);
					if (currentZ > 0 && currentZ >= z) continue;
					zBuffer.set(x, y, z);
				}

				// Interpolate texture coordinates
				let u: number, v: number;

				if (useZ) {
					const w = bary0 * w0 + bary1 * w1 + bary2 * w2;
					u = (bary0 * u0 + bary1 * u1 + bary2 * u2) / w;
					v = (bary0 * v0v + bary1 * v1v + bary2 * v2v) / w;
				} else {
					u = bary0 * v0.u + bary1 * v1.u + bary2 * v2.u;
					v = bary0 * v0.v + bary1 * v1.v + bary2 * v2.v;
				}

				// Sample texture
				let pixel: { r: number; g: number; b: number; a: number } | null = null;

				if (textureSource === "map") {
					pixel = getMapPixel(texture, u, v, runtime);
				} else {
					pixel = getSpritePixel(texture, u, v, runtime);
				}

				// Draw pixel
				if (pixel && pixel.a > 0) {
					const idx = ((y - minY) * (maxX - minX) + (x - minX)) * 4;
					pixels[idx] = pixel.r;
					pixels[idx + 1] = pixel.g;
					pixels[idx + 2] = pixel.b;
					pixels[idx + 3] = pixel.a;
				}
			}
		}
	}

	// Put image data back
	context.imageSmoothingEnabled = !pixelated;
	context.putImageData(imageData, minX, minY);
}

/**
 * Draw solid color triangle
 */
export function drawTriangle(
	context: CanvasRenderingContext2D,
	v0: Vec2,
	v1: Vec2,
	v2: Vec2,
	color: string,
): void {
	context.fillStyle = color;
	context.beginPath();
	context.moveTo(v0.x, v0.y);
	context.lineTo(v1.x, v1.y);
	context.lineTo(v2.x, v2.y);
	context.closePath();
	context.fill();
}

/**
 * Draw triangle outline
 */
export function drawTriangleOutline(
	context: CanvasRenderingContext2D,
	v0: Vec2,
	v1: Vec2,
	v2: Vec2,
	color: string,
	lineWidth: number = 1,
): void {
	context.strokeStyle = color;
	context.lineWidth = lineWidth;
	context.beginPath();
	context.moveTo(v0.x, v0.y);
	context.lineTo(v1.x, v1.y);
	context.lineTo(v2.x, v2.y);
	context.closePath();
	context.stroke();
}
