/**
 * @l8b/sprites - Sprite class for animated graphics
 *
 * Provides utilities for creating and manipulating sprites:
 * - Sprite class for animated sprite support
 * - Multi-frame animation support
 * - Image class re-export (for backward compatibility)
 */

export { Sprite, LoadSprite, UpdateSprite } from "./sprite";
export type { SpriteProperties } from "./sprite";

// Export lowercase aliases for consistency with codebase
export { LoadSprite as loadSprite, UpdateSprite as updateSprite } from "./sprite";

// Re-export Image from @l8b/image for backward compatibility
export { Image } from "@l8b/image";
export type { ImageContextState } from "@l8b/image";
export type { RGBAColor, RGBColor } from "@l8b/image";

