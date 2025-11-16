import type { Image } from "./image";

export interface SpriteProperties {
	frames?: number;
	fps?: number;
}

export interface SpriteFrame {
	canvas: HTMLCanvasElement;
	image: Image;
}
