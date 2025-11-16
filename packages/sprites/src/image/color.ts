/**
 * Color management for Image class
 * Handles color setting, pixel operations, and gradients
 */

export function setColor(
	context: CanvasRenderingContext2D,
	color?: string,
): void {
	if (color == null) {
		return;
	}
	if (typeof color === "string") {
		context.fillStyle = color;
		context.strokeStyle = color;
	}
}

export function setLinearGradient(
	context: CanvasRenderingContext2D,
	x1: number,
	y1: number,
	x2: number,
	y2: number,
	c1: string,
	c2: string,
): void {
	const grd = context.createLinearGradient(x1, y1, x2, y2);
	grd.addColorStop(0, c1);
	grd.addColorStop(1, c2);
	context.fillStyle = grd;
	context.strokeStyle = grd;
}

export function setRadialGradient(
	context: CanvasRenderingContext2D,
	x: number,
	y: number,
	radius: number,
	c1: string,
	c2: string,
): void {
	const grd = context.createRadialGradient(x, y, 0, x, y, radius);
	grd.addColorStop(0, c1);
	grd.addColorStop(1, c2);
	context.fillStyle = grd;
	context.strokeStyle = grd;
}
