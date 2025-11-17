import type { Map } from "@l8b/map";
import type { Sprite } from "@l8b/sprites";

import { TextScreen } from "../drawing/text-screen";
import {
	drawTexturedTriangle,
	drawTriangle,
	drawTriangleOutline,
	type TextureSource,
	type TriangleData,
} from "./ttri";

export class TriangleScreen extends TextScreen {
	tri(
		x1: number,
		y1: number,
		x2: number,
		y2: number,
		x3: number,
		y3: number,
		color?: string | number,
	): void {
		if (color) this.setColor(color);
		this.context.globalAlpha = this.alpha;

		const v0 = { x: x1, y: -y1 };
		const v1 = { x: x2, y: -y2 };
		const v2 = { x: x3, y: -y3 };

		drawTriangle(this.context, v0, v1, v2, this.context.fillStyle as string);
	}

	trib(
		x1: number,
		y1: number,
		x2: number,
		y2: number,
		x3: number,
		y3: number,
		color?: string | number,
	): void {
		if (color) this.setColor(color);
		this.context.globalAlpha = this.alpha;

		const v0 = { x: x1, y: -y1 };
		const v1 = { x: x2, y: -y2 };
		const v2 = { x: x3, y: -y3 };

		drawTriangleOutline(
			this.context,
			v0,
			v1,
			v2,
			this.context.strokeStyle as string,
			this.line_width,
		);
	}

	ttri(
		x1: number,
		y1: number,
		x2: number,
		y2: number,
		x3: number,
		y3: number,
		u1: number,
		v1: number,
		u2: number,
		v2: number,
		u3: number,
		v3: number,
		texture: Sprite | Map | string,
		textureSource: TextureSource = "tiles",
		z1: number = 1,
		z2: number = 1,
		z3: number = 1,
		useDepth: boolean = false,
	): void {
		this.context.globalAlpha = this.alpha;

		const canvasWidth = this.canvas.width;
		const canvasHeight = this.canvas.height;
		const ratio = Math.min(canvasWidth / 200, canvasHeight / 200);

		const toCanvasX = (x: number) => canvasWidth / 2 + x * ratio;
		const toCanvasY = (y: number) => canvasHeight / 2 - y * ratio;

		const data: TriangleData = {
			context: this.context,
			width: canvasWidth,
			height: canvasHeight,
			runtime: this.runtime,
			pixelated: this.pixelated === 1,
		};

		drawTexturedTriangle(
			data,
			{ x: toCanvasX(x1), y: toCanvasY(y1), u: u1, v: v1, z: z1 },
			{ x: toCanvasX(x2), y: toCanvasY(y2), u: u2, v: v2, z: z2 },
			{ x: toCanvasX(x3), y: toCanvasY(y3), u: u3, v: v3, z: z3 },
			texture,
			textureSource,
			this.zBuffer,
			useDepth,
		);
	}
}
