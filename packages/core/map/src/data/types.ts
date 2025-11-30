import type { Sprite } from "@l8b/sprites";

export interface MapData {
	width: number;
	height: number;
	block_width: number;
	block_height: number;
	sprites: Array<string | number>;
	data: number[];
}

export interface AnimatedTile {
	x: number;
	y: number;
	w: number;
	h: number;
	sprite: Sprite;
	tx?: number;
	ty?: number;
}

export interface SpriteDictionary {
	[key: string]: Sprite;
}
