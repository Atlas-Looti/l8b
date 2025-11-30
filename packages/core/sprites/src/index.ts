/**
 * @l8b/sprites - Sprite management system
 *
 * Provides utilities for creating and managing sprites:
 * - Image class for canvas-based image manipulation
 * - Sprite class for animated sprites
 * - Loading and updating sprites
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
export {
	loadSprite,
	updateSprite,
} from "./loader";
// Export Sprite class as both named and default export for flexibility
export {
	Sprite,
	Sprite as default,
} from "./sprite";
export type { SpriteFrame } from "./sprite/frame";
// Export TypeScript type definitions
export type { SpriteProperties } from "./types";
