import type { Sprite } from "@l8b/sprites";
import type { AnimatedTile } from "../data/types";

export interface RenderState {
	canvas: HTMLCanvasElement | null;
	buffer: HTMLCanvasElement | null;
	animated: AnimatedTile[];
}

export const ensureCanvas = (
	state: RenderState,
	width: number,
	height: number,
	blockWidth: number,
	blockHeight: number,
): CanvasRenderingContext2D => {
	if (!state.canvas) {
		state.canvas = document.createElement("canvas");
	}
	const expectedWidth = width * blockWidth;
	const expectedHeight = height * blockHeight;
	if (
		state.canvas.width !== expectedWidth ||
		state.canvas.height !== expectedHeight
	) {
		state.canvas.width = expectedWidth;
		state.canvas.height = expectedHeight;
	}
	const ctx = state.canvas.getContext("2d");
	if (!ctx) throw new Error("Unable to get canvas context");
	ctx.clearRect(0, 0, state.canvas.width, state.canvas.height);
	state.animated = [];
	return ctx;
};

export const drawTile = (
	ctx: CanvasRenderingContext2D,
	sprite: Sprite,
	blockWidth: number,
	blockHeight: number,
	gridX: number,
	gridY: number,
	parts: string[],
): boolean => {
	const canvas = sprite.frames[0].canvas;
	if (!canvas || canvas.width === 0 || canvas.height === 0) {
		return false;
	}
	if (parts[1]) {
		const [sx, sy] = parts[1].split(",");
		const tx = Number.parseInt(sx, 10) * blockWidth;
		const ty = Number.parseInt(sy, 10) * blockHeight;
		ctx.drawImage(
			canvas,
			tx,
			ty,
			blockWidth,
			blockHeight,
			blockWidth * gridX,
			blockHeight * gridY,
			blockWidth,
			blockHeight,
		);
	} else {
		ctx.drawImage(canvas, blockWidth * gridX, blockHeight * gridY);
	}
	return true;
};

export const queueAnimatedTile = (
	state: RenderState,
	sprite: Sprite,
	blockWidth: number,
	blockHeight: number,
	gridX: number,
	gridY: number,
	parts: string[],
): void => {
	const tile: AnimatedTile = {
		x: blockWidth * gridX,
		y: blockHeight * gridY,
		w: blockWidth,
		h: blockHeight,
		sprite,
	};
	if (parts[1]) {
		const [sx, sy] = parts[1].split(",");
		tile.tx = Number.parseInt(sx, 10) * blockWidth;
		tile.ty = Number.parseInt(sy, 10) * blockHeight;
	}
	state.animated.push(tile);
};

export const renderAnimatedTiles = (
	state: RenderState,
	blockWidth: number,
	blockHeight: number,
): HTMLCanvasElement => {
	const time = Date.now();
	if (
		!state.buffer ||
		state.buffer.width !== blockWidth * (state.canvas!.width / blockWidth) ||
		state.buffer.height !== blockHeight * (state.canvas!.height / blockHeight)
	) {
		state.buffer = document.createElement("canvas");
		state.buffer.width = state.canvas!.width;
		state.buffer.height = state.canvas!.height;
	}
	const bufferCtx = state.buffer.getContext("2d")!;
	bufferCtx.clearRect(0, 0, state.buffer.width, state.buffer.height);
	bufferCtx.drawImage(state.canvas!, 0, 0);
	for (const tile of state.animated) {
		const len = tile.sprite.frames.length;
		const frame =
			tile.sprite.frames[Math.floor((time / 1000) * tile.sprite.fps) % len]
				?.canvas;
		if (!frame) continue;
		if (tile.tx != null && tile.ty != null) {
			bufferCtx.drawImage(
				frame,
				tile.tx,
				tile.ty,
				blockWidth,
				blockHeight,
				tile.x,
				tile.y,
				blockWidth,
				blockHeight,
			);
		} else {
			bufferCtx.drawImage(frame, tile.x, tile.y, blockWidth, blockHeight);
		}
	}
	return state.buffer;
};
