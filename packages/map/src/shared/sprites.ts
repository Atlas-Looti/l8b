import type { Sprite } from "@l8b/sprites";

export type SpriteDictionary = Record<string, Sprite>;

// TODO: getDefaultSprites tries to access global player runtime
export const getDefaultSprites = (): SpriteDictionary => {
	const player = (globalThis as any)?.player;
	const runtimeSprites = player?.runtime?.sprites;
	return runtimeSprites ?? {};
};
