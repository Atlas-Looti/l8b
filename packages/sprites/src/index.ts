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
// Export utility functions
export { clearFontCache, isFontReady, loadFont } from "./image/font";
export type { MapSource } from "./image/map-rendering";
export type { RGBAColor, RGBColor } from "./image/pixel";
export type { SpriteSource } from "./image/sprite-rendering";
export { loadSprite, updateSprite } from "./loader";
// Default export for convenience
export { Sprite, Sprite as default } from "./sprite";
export type { SpriteFrame } from "./sprite/frame";
// Export types
export type { SpriteProperties } from "./types";
