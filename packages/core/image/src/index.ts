/**
 * @l8b/image - Image class for canvas-based graphics manipulation
 *
 * Provides utilities for creating and manipulating images:
 * - Image class for canvas-based image manipulation
 * - Drawing operations (shapes, text, sprites, maps)
 * - Pixel operations
 * - Transform operations
 */

export { BLENDING_MODES } from "./blending";
export { Image } from "./core/image";
export * as ColorOps from "./core/color";
export * as DrawingOps from "./core/drawing";
export * as ShapeOps from "./core/shapes";
export * as TextOps from "./core/text";
export * as SpriteRenderingOps from "./core/sprite-rendering";
export * as MapRenderingOps from "./core/map-rendering";
export * as TransformOps from "./core/transform";

export type { ImageContextState } from "./core/context";
// Export font utilities for text rendering
export {
	clearFontCache,
	isFontReady,
	loadFont,
} from "./core/font";
export type { MapSource } from "./core/map-rendering";
export type {
	RGBAColor,
	RGBColor,
} from "./core/pixel";
export type { SpriteSource } from "./core/sprite-rendering";
