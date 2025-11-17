/**
 * @l8b/screen - Modular screen rendering system
 *
 * Architecture (mirrors @l8b/runtime style):
 * - core/: Canvas + orchestration (`Screen`)
 * - drawing/: Primitive, sprite, and text rendering layers
 * - tri/: Software triangle rasterizer (TTRI)
 * - types/: Shared interfaces
 */

export { Screen, Screen as default } from "./core";
export {
	type TextureSource,
	type TexVert,
	type Vec2,
	type Vec3,
	ZBuffer,
} from "./tri";
export * from "./types";
