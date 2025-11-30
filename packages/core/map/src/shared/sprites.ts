import type { Sprite } from "@l8b/sprites";

export type SpriteDictionary = Record<string, Sprite>;

// TODO: Refactor getDefaultSprites to avoid direct global access to player runtime\n// Consider passing runtime as parameter or using dependency injection
export const getDefaultSprites = (): SpriteDictionary => {
	const player = (globalThis as any)?.player;
	const runtimeSprites = player?.runtime?.sprites;
	return runtimeSprites ?? {};
};
