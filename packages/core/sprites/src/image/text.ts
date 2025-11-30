/**
 * Text rendering operations for Image class
 * Handles text drawing, measurement, and font management
 */

import type { ImageContextState } from "./context";
import { closeDrawOp, initDrawOp } from "./drawing";

export function textWidth(context: CanvasRenderingContext2D, state: ImageContextState, text: string, size: number): number {
	context.font = `${size}pt ${state.font}`;
	return context.measureText(text).width;
}

export function drawText(context: CanvasRenderingContext2D, state: ImageContextState, text: string, x: number, y: number, size: number): void {
	context.globalAlpha = state.alpha;
	context.font = `${size}pt ${state.font}`;
	context.textAlign = "center";
	context.textBaseline = "middle";

	const w = context.measureText(text).width;
	const h = size;

	if (initDrawOp(context, state, x, y)) {
		context.fillText(text, 0 - (state.anchor_x * w) / 2, 0 + (state.anchor_y * h) / 2);
		closeDrawOp(context);
	} else {
		context.fillText(text, x - (state.anchor_x * w) / 2, y + (state.anchor_y * h) / 2);
	}
}

export function drawTextOutline(context: CanvasRenderingContext2D, state: ImageContextState, text: string, x: number, y: number, size: number): void {
	context.globalAlpha = state.alpha;
	context.font = `${size}pt ${state.font}`;
	context.lineWidth = state.line_width;
	context.textAlign = "center";
	context.textBaseline = "middle";

	const w = context.measureText(text).width;
	const h = size;

	if (initDrawOp(context, state, x, y)) {
		context.strokeText(text, 0 - (state.anchor_x * w) / 2, 0 + (state.anchor_y * h) / 2);
		closeDrawOp(context);
	} else {
		context.strokeText(text, x - (state.anchor_x * w) / 2, y + (state.anchor_y * h) / 2);
	}
}
