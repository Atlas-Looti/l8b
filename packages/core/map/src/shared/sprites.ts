import type { Sprite } from "@l8b/sprites";

export type SpriteDictionary = Record<string, Sprite>;

/**
 * Returns the runtime sprite dictionary when no explicit sprites are provided to TileMap.
 *
 * ⚠️  KNOWN COUPLING: This falls back to `globalThis.player.runtime.sprites`, which is a
 * hard dependency on the runtime player shape set by `@l8b/runtime`.
 * It exists only for backward compatibility with games that construct a TileMap without
 * passing a sprite dictionary explicitly.
 *
 * Preferred usage: always pass `sprites` directly to the TileMap constructor so this
 * fallback is never reached.
 *
 * TODO: Remove this fallback once all usages pass sprites explicitly.
 *       Tracked in: packages/core/map — dependency injection refactor.
 */
export const getDefaultSprites = (): SpriteDictionary => {
	const player = (globalThis as any)?.player;
	const runtimeSprites = player?.runtime?.sprites;
	return runtimeSprites ?? {};
};
