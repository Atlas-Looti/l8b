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
export { Image } from "./image";
export type { ImageContextState } from "./image/context";
// Export font utilities for text rendering
export {
	clearFontCache,
	isFontReady,
	loadFont,
} from "./image/font";
export type { MapSource } from "./image/map-rendering";
export type {
	RGBAColor,
	RGBColor,
} from "./image/pixel";
export type { SpriteSource } from "./image/sprite-rendering";
