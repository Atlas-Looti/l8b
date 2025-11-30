/**
 * Drawing operations for Image class
 * Handles all drawing primitives (rectangles, circles, lines, etc.)
 */

import type { ImageContextState } from "./context";

export function initDrawOp(context: CanvasRenderingContext2D, state: ImageContextState, x: number, y: number, object_transform = true): boolean {
	let res = false;

	if (state.image_transform) {
		context.save();
		res = true;
		context.translate(state.translation_x, state.translation_y);
		context.scale(state.scale_x, state.scale_y);
		context.rotate((state.rotation / 180) * Math.PI);
		context.translate(x, y);
	}

	if (object_transform && (state.object_rotation !== 0 || state.object_scale_x !== 1 || state.object_scale_y !== 1)) {
		if (!res) {
			context.save();
			res = true;
			context.translate(x, y);
		}
		if (state.object_rotation !== 0) {
			context.rotate((state.object_rotation / 180) * Math.PI);
		}
		if (state.object_scale_x !== 1 || state.object_scale_y !== 1) {
			context.scale(state.object_scale_x, state.object_scale_y);
		}
	}

	return res;
}

export function closeDrawOp(context: CanvasRenderingContext2D): void {
	context.restore();
}

export function fillRect(context: CanvasRenderingContext2D, state: ImageContextState, x: number, y: number, w: number, h: number): void {
	context.globalAlpha = state.alpha;
	if (initDrawOp(context, state, x, y)) {
		context.fillRect(-w / 2 - (state.anchor_x * w) / 2, -h / 2 + (state.anchor_y * h) / 2, w, h);
		closeDrawOp(context);
	} else {
		context.fillRect(x - w / 2 - (state.anchor_x * w) / 2, y - h / 2 + (state.anchor_y * h) / 2, w, h);
	}
}

export function fillRoundRect(context: CanvasRenderingContext2D, state: ImageContextState, x: number, y: number, w: number, h: number, round: number): void {
	context.globalAlpha = state.alpha;
	if (initDrawOp(context, state, x, y)) {
		(context as any).fillRoundRect(-w / 2 - (state.anchor_x * w) / 2, -h / 2 + (state.anchor_y * h) / 2, w, h, round);
		closeDrawOp(context);
	} else {
		(context as any).fillRoundRect(x - w / 2 - (state.anchor_x * w) / 2, y - h / 2 + (state.anchor_y * h) / 2, w, h, round);
	}
}

export function fillRound(context: CanvasRenderingContext2D, state: ImageContextState, x: number, y: number, w: number, h: number): void {
	context.globalAlpha = state.alpha;
	w = Math.abs(w);
	h = Math.abs(h);
	if (initDrawOp(context, state, x, y)) {
		context.beginPath();
		context.ellipse((-state.anchor_x * w) / 2, 0 + (state.anchor_y * h) / 2, w / 2, h / 2, 0, 0, Math.PI * 2, false);
		context.fill();
		closeDrawOp(context);
	} else {
		context.beginPath();
		context.ellipse(x - (state.anchor_x * w) / 2, y + (state.anchor_y * h) / 2, w / 2, h / 2, 0, 0, Math.PI * 2, false);
		context.fill();
	}
}

export function drawRect(context: CanvasRenderingContext2D, state: ImageContextState, x: number, y: number, w: number, h: number): void {
	context.globalAlpha = state.alpha;
	context.lineWidth = state.line_width;
	if (initDrawOp(context, state, x, y)) {
		context.strokeRect(-w / 2 - (state.anchor_x * w) / 2, -h / 2 + (state.anchor_y * h) / 2, w, h);
		closeDrawOp(context);
	} else {
		context.strokeRect(x - w / 2 - (state.anchor_x * w) / 2, y - h / 2 + (state.anchor_y * h) / 2, w, h);
	}
}

export function drawRoundRect(context: CanvasRenderingContext2D, state: ImageContextState, x: number, y: number, w: number, h: number, round: number): void {
	context.globalAlpha = state.alpha;
	context.lineWidth = state.line_width;
	if (initDrawOp(context, state, x, y)) {
		(context as any).strokeRoundRect(-w / 2 - (state.anchor_x * w) / 2, -h / 2 + (state.anchor_y * h) / 2, w, h, round);
		closeDrawOp(context);
	} else {
		(context as any).strokeRoundRect(x - w / 2 - (state.anchor_x * w) / 2, y - h / 2 + (state.anchor_y * h) / 2, w, h, round);
	}
}

export function drawRound(context: CanvasRenderingContext2D, state: ImageContextState, x: number, y: number, w: number, h: number): void {
	context.globalAlpha = state.alpha;
	context.lineWidth = state.line_width;
	w = Math.abs(w);
	h = Math.abs(h);
	if (initDrawOp(context, state, x, y)) {
		context.beginPath();
		context.ellipse(0 - (state.anchor_x * w) / 2, 0 + (state.anchor_y * h) / 2, w / 2, h / 2, 0, 0, Math.PI * 2, false);
		context.stroke();
		closeDrawOp(context);
	} else {
		context.beginPath();
		context.ellipse(x - (state.anchor_x * w) / 2, y + (state.anchor_y * h) / 2, w / 2, h / 2, 0, 0, Math.PI * 2, false);
		context.stroke();
	}
}

export function drawLine(context: CanvasRenderingContext2D, state: ImageContextState, x1: number, y1: number, x2: number, y2: number): void {
	context.globalAlpha = state.alpha;
	context.lineWidth = state.line_width;
	const transform = initDrawOp(context, state, 0, 0, false);
	context.beginPath();
	context.moveTo(x1, y1);
	context.lineTo(x2, y2);
	context.stroke();
	if (transform) {
		closeDrawOp(context);
	}
}
