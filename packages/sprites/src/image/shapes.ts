/**
 * Advanced shape drawing operations
 * Handles polygons, polylines, curves, and arcs
 */

import type { ImageContextState } from "./context";
import { closeDrawOp, initDrawOp } from "./drawing";

export function drawPolyline(
	context: CanvasRenderingContext2D,
	state: ImageContextState,
	args: any[],
): void {
	if (Array.isArray(args[0])) {
		args = args[0];
	}

	context.globalAlpha = state.alpha;
	context.lineWidth = state.line_width;

	if (args.length < 4) {
		return;
	}

	const len = Math.floor(args.length / 2);
	const transform = initDrawOp(context, state, 0, 0, false);
	context.beginPath();
	context.moveTo(args[0], args[1]);

	for (let i = 1; i <= len - 1; i++) {
		context.lineTo(args[i * 2], args[i * 2 + 1]);
	}

	context.stroke();
	if (transform) {
		closeDrawOp(context);
	}
}

export function drawPolygon(
	context: CanvasRenderingContext2D,
	state: ImageContextState,
	args: any[],
): void {
	if (Array.isArray(args[0])) {
		args = args[0];
	}

	context.globalAlpha = state.alpha;
	context.lineWidth = state.line_width;

	if (args.length < 4) {
		return;
	}

	const len = Math.floor(args.length / 2);
	const transform = initDrawOp(context, state, 0, 0, false);
	context.beginPath();
	context.moveTo(args[0], args[1]);

	for (let i = 1; i <= len - 1; i++) {
		context.lineTo(args[i * 2], args[i * 2 + 1]);
	}

	context.closePath();
	context.stroke();
	if (transform) {
		closeDrawOp(context);
	}
}

export function fillPolygon(
	context: CanvasRenderingContext2D,
	state: ImageContextState,
	args: any[],
): void {
	if (Array.isArray(args[0])) {
		args = args[0];
	}

	context.globalAlpha = state.alpha;

	if (args.length < 4) {
		return;
	}

	const len = Math.floor(args.length / 2);
	const transform = initDrawOp(context, state, 0, 0, false);
	context.beginPath();
	context.moveTo(args[0], args[1]);

	for (let i = 1; i <= len - 1; i++) {
		context.lineTo(args[i * 2], args[i * 2 + 1]);
	}

	context.fill();
	if (transform) {
		closeDrawOp(context);
	}
}

export function drawQuadCurve(
	context: CanvasRenderingContext2D,
	state: ImageContextState,
	args: any[],
): void {
	if (Array.isArray(args[0])) {
		args = args[0];
	}

	context.globalAlpha = state.alpha;
	context.lineWidth = state.line_width;

	if (args.length < 4) {
		return;
	}

	const transform = initDrawOp(context, state, 0, 0, false);
	context.beginPath();
	context.moveTo(args[0], args[1]);

	let index = 2;
	while (index <= args.length - 4) {
		context.quadraticCurveTo(
			args[index],
			args[index + 1],
			args[index + 2],
			args[index + 3],
		);
		index += 4;
	}

	context.stroke();
	if (transform) {
		closeDrawOp(context);
	}
}

export function drawBezierCurve(
	context: CanvasRenderingContext2D,
	state: ImageContextState,
	args: any[],
): void {
	if (Array.isArray(args[0])) {
		args = args[0];
	}

	context.globalAlpha = state.alpha;
	context.lineWidth = state.line_width;

	if (args.length < 4) {
		return;
	}

	const transform = initDrawOp(context, state, 0, 0, false);
	context.beginPath();
	context.moveTo(args[0], args[1]);

	let index = 2;
	while (index <= args.length - 6) {
		context.bezierCurveTo(
			args[index],
			args[index + 1],
			args[index + 2],
			args[index + 3],
			args[index + 4],
			args[index + 5],
		);
		index += 6;
	}

	context.stroke();
	if (transform) {
		closeDrawOp(context);
	}
}

export function drawArc(
	context: CanvasRenderingContext2D,
	state: ImageContextState,
	x: number,
	y: number,
	radius: number,
	angle1: number,
	angle2: number,
	ccw: boolean,
): void {
	context.globalAlpha = state.alpha;
	context.lineWidth = state.line_width;

	if (initDrawOp(context, state, x, y)) {
		context.beginPath();
		context.arc(
			0,
			0,
			radius,
			(angle1 / 180) * Math.PI,
			(angle2 / 180) * Math.PI,
			ccw,
		);
		context.stroke();
		closeDrawOp(context);
	} else {
		context.beginPath();
		context.arc(
			x,
			y,
			radius,
			(angle1 / 180) * Math.PI,
			(angle2 / 180) * Math.PI,
			ccw,
		);
		context.stroke();
	}
}

export function fillArc(
	context: CanvasRenderingContext2D,
	state: ImageContextState,
	x: number,
	y: number,
	radius: number,
	angle1: number,
	angle2: number,
	ccw: boolean,
): void {
	context.globalAlpha = state.alpha;

	if (initDrawOp(context, state, x, y)) {
		context.beginPath();
		context.arc(
			0,
			0,
			radius,
			(angle1 / 180) * Math.PI,
			(angle2 / 180) * Math.PI,
			ccw,
		);
		context.fill();
		closeDrawOp(context);
	} else {
		context.beginPath();
		context.arc(
			x,
			y,
			radius,
			(angle1 / 180) * Math.PI,
			(angle2 / 180) * Math.PI,
			ccw,
		);
		context.fill();
	}
}
