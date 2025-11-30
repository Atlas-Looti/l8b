/**
 * Frame management for Sprite class
 * Handles individual sprite frames
 */

import type { Image } from "../image";

export interface SpriteFrame {
	canvas: HTMLCanvasElement;
	image: Image;
}

export function createFrame(image: Image): SpriteFrame {
	return {
		canvas: image.canvas,
		image,
	};
}
