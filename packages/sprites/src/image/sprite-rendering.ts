/**
 * Sprite and image rendering for Image class
 * Handles drawing sprites and images onto the canvas
 */

import type { ImageContextState } from "./context";
import { closeDrawOp, initDrawOp } from "./drawing";

export interface SpriteSource {
	frames?: Array<{ canvas: HTMLCanvasElement }>;
	canvas?: HTMLCanvasElement;
	image?: HTMLImageElement;
	ready?: boolean | number;
	fps?: number;
	animation_start?: number;
}

export function getSpriteFrame(
	sprite: SpriteSource | string,
): HTMLCanvasElement | null {
	// Handle Image instances
	if (
		typeof sprite === "object" &&
		"canvas" in sprite &&
		!("frames" in sprite)
	) {
		return sprite.canvas || (sprite.image as any) || null;
	}

	// Handle Sprite instances
	if (typeof sprite === "object" && sprite.frames && sprite.frames.length > 0) {
		if (!sprite.ready) {
			return null;
		}

		if (sprite.frames.length > 1) {
			const dt = 1000 / (sprite.fps || 5);
			const frame =
				Math.floor((Date.now() - (sprite.animation_start || 0)) / dt) %
				sprite.frames.length;
			if (frame >= 0 && frame < sprite.frames.length) {
				return sprite.frames[frame].canvas;
			}
			return sprite.frames[0].canvas;
		}
		return sprite.frames[0].canvas;
	}

	return null;
}

export function drawSprite(
	context: CanvasRenderingContext2D,
	state: ImageContextState,
	sprite: SpriteSource | string,
	x: number,
	y: number,
	w?: number,
	h?: number,
): void {
	const canvas = getSpriteFrame(sprite);
	if (canvas == null) {
		return;
	}

	if (w == null) {
		w = canvas.width;
	}
	if (!h) {
		h = (w / canvas.width) * canvas.height;
	}

	context.globalAlpha = state.alpha;
	context.imageSmoothingEnabled = !state.pixelated;

	if (initDrawOp(context, state, x, y)) {
		context.drawImage(
			canvas,
			-w / 2 - (state.anchor_x * w) / 2,
			-h / 2 + (state.anchor_y * h) / 2,
			w,
			h,
		);
		closeDrawOp(context);
	} else {
		context.drawImage(
			canvas,
			x - w / 2 - (state.anchor_x * w) / 2,
			y - h / 2 + (state.anchor_y * h) / 2,
			w,
			h,
		);
	}
}

export function drawSpritePart(
	context: CanvasRenderingContext2D,
	state: ImageContextState,
	sprite: SpriteSource | string,
	sx: number,
	sy: number,
	sw: number,
	sh: number,
	x: number,
	y: number,
	w?: number,
	h?: number,
): void {
	const canvas = getSpriteFrame(sprite);
	if (canvas == null) {
		return;
	}

	if (w == null) {
		w = canvas.width;
	}
	if (!h) {
		h = (w / sw) * sh;
	}

	context.globalAlpha = state.alpha;
	context.imageSmoothingEnabled = !state.pixelated;

	if (initDrawOp(context, state, x, y)) {
		context.drawImage(
			canvas,
			sx,
			sy,
			sw,
			sh,
			-w / 2 - (state.anchor_x * w) / 2,
			-h / 2 + (state.anchor_y * h) / 2,
			w,
			h,
		);
		closeDrawOp(context);
	} else {
		context.drawImage(
			canvas,
			sx,
			sy,
			sw,
			sh,
			x - w / 2 - (state.anchor_x * w) / 2,
			y - h / 2 + (state.anchor_y * h) / 2,
			w,
			h,
		);
	}
}
