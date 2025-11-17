import { BaseScreen } from "../core/base-screen";

/**
 * Adds primitive shape drawing APIs on top of BaseScreen.
 */
export class PrimitiveScreen extends BaseScreen {
	fillRect(
		x: number,
		y: number,
		w: number,
		h: number,
		color?: string | number,
	): void {
		if (color) this.setColor(color);
		this.context.globalAlpha = this.alpha;
		if (this.initDrawOp(x, -y)) {
			this.context.fillRect(
				-w / 2 - (this.anchor_x * w) / 2,
				-h / 2 + (this.anchor_y * h) / 2,
				w,
				h,
			);
			this.closeDrawOp();
		} else {
			this.context.fillRect(
				x - w / 2 - (this.anchor_x * w) / 2,
				-y - h / 2 + (this.anchor_y * h) / 2,
				w,
				h,
			);
		}
	}

	fillRoundRect(
		x: number,
		y: number,
		w: number,
		h: number,
		round: number = 10,
		color?: string | number,
	): void {
		if (color) this.setColor(color);
		this.context.globalAlpha = this.alpha;
		const transform = this.initDrawOp(x, -y);
		const rx = (transform ? -w / 2 : x - w / 2) - (this.anchor_x * w) / 2;
		const ry = (transform ? -h / 2 : -y - h / 2) + (this.anchor_y * h) / 2;

		this.context.beginPath();
		if (this.context.roundRect) {
			this.context.roundRect(rx, ry, w, h, round);
		} else {
			const r = Math.min(round, w / 2, h / 2);
			this.context.moveTo(rx + r, ry);
			this.context.lineTo(rx + w - r, ry);
			this.context.quadraticCurveTo(rx + w, ry, rx + w, ry + r);
			this.context.lineTo(rx + w, ry + h - r);
			this.context.quadraticCurveTo(rx + w, ry + h, rx + w - r, ry + h);
			this.context.lineTo(rx + r, ry + h);
			this.context.quadraticCurveTo(rx, ry + h, rx, ry + h - r);
			this.context.lineTo(rx, ry + r);
			this.context.quadraticCurveTo(rx, ry, rx + r, ry);
			this.context.closePath();
		}
		this.context.fill();
		if (transform) this.closeDrawOp();
	}

	fillRound(
		x: number,
		y: number,
		w: number,
		h: number,
		color?: string | number,
	): void {
		if (color) this.setColor(color);
		this.context.globalAlpha = this.alpha;
		w = Math.abs(w);
		h = Math.abs(h);
		if (this.initDrawOp(x, -y)) {
			this.context.beginPath();
			this.context.ellipse(
				(-this.anchor_x * w) / 2,
				(this.anchor_y * h) / 2,
				w / 2,
				h / 2,
				0,
				0,
				Math.PI * 2,
				false,
			);
			this.context.fill();
			this.closeDrawOp();
		} else {
			this.context.beginPath();
			this.context.ellipse(
				x - (this.anchor_x * w) / 2,
				-y + (this.anchor_y * h) / 2,
				w / 2,
				h / 2,
				0,
				0,
				Math.PI * 2,
				false,
			);
			this.context.fill();
		}
	}

	drawRect(
		x: number,
		y: number,
		w: number,
		h: number,
		color?: string | number,
	): void {
		if (color) this.setColor(color);
		this.context.globalAlpha = this.alpha;
		this.context.lineWidth = this.line_width;
		if (this.initDrawOp(x, -y)) {
			this.context.strokeRect(
				-w / 2 - (this.anchor_x * w) / 2,
				-h / 2 + (this.anchor_y * h) / 2,
				w,
				h,
			);
			this.closeDrawOp();
		} else {
			this.context.strokeRect(
				x - w / 2 - (this.anchor_x * w) / 2,
				-y - h / 2 + (this.anchor_y * h) / 2,
				w,
				h,
			);
		}
	}

	drawRoundRect(
		x: number,
		y: number,
		w: number,
		h: number,
		round: number = 10,
		color?: string | number,
	): void {
		if (color) this.setColor(color);
		this.context.globalAlpha = this.alpha;
		this.context.lineWidth = this.line_width;
		const transform = this.initDrawOp(x, -y);
		const rx = (transform ? -w / 2 : x - w / 2) - (this.anchor_x * w) / 2;
		const ry = (transform ? -h / 2 : -y - h / 2) + (this.anchor_y * h) / 2;

		this.context.beginPath();
		if (this.context.roundRect) {
			this.context.roundRect(rx, ry, w, h, round);
		} else {
			const r = Math.min(round, w / 2, h / 2);
			this.context.moveTo(rx + r, ry);
			this.context.lineTo(rx + w - r, ry);
			this.context.quadraticCurveTo(rx + w, ry, rx + w, ry + r);
			this.context.lineTo(rx + w, ry + h - r);
			this.context.quadraticCurveTo(rx + w, ry + h, rx + w - r, ry + h);
			this.context.lineTo(rx + r, ry + h);
			this.context.quadraticCurveTo(rx, ry + h, rx, ry + h - r);
			this.context.lineTo(rx, ry + r);
			this.context.quadraticCurveTo(rx, ry, rx + r, ry);
			this.context.closePath();
		}
		this.context.stroke();
		if (transform) this.closeDrawOp();
	}

	drawRound(
		x: number,
		y: number,
		w: number,
		h: number,
		color?: string | number,
	): void {
		if (color) this.setColor(color);
		this.context.globalAlpha = this.alpha;
		this.context.lineWidth = this.line_width;
		w = Math.abs(w);
		h = Math.abs(h);
		if (this.initDrawOp(x, -y)) {
			this.context.beginPath();
			this.context.ellipse(
				(-this.anchor_x * w) / 2,
				(this.anchor_y * h) / 2,
				w / 2,
				h / 2,
				0,
				0,
				Math.PI * 2,
				false,
			);
			this.context.stroke();
			this.closeDrawOp();
		} else {
			this.context.beginPath();
			this.context.ellipse(
				x - (this.anchor_x * w) / 2,
				-y + (this.anchor_y * h) / 2,
				w / 2,
				h / 2,
				0,
				0,
				Math.PI * 2,
				false,
			);
			this.context.stroke();
		}
	}

	drawLine(
		x1: number,
		y1: number,
		x2: number,
		y2: number,
		color?: string | number,
	): void {
		if (color) this.setColor(color);
		this.context.globalAlpha = this.alpha;
		this.context.lineWidth = this.line_width;
		const transform = this.initDrawOp(0, 0, false);
		this.context.beginPath();
		this.context.moveTo(x1, -y1);
		this.context.lineTo(x2, -y2);
		this.context.stroke();
		if (transform) this.closeDrawOp();
	}

	drawPolygon(args: any[]): void {
		const { color, points } = this.extractPoints(args);
		if (!points || points.length < 4) return;

		if (color) this.setColor(color);
		this.context.globalAlpha = this.alpha;
		this.context.lineWidth = this.line_width;

		const len = Math.floor(points.length / 2);
		const transform = this.initDrawOp(0, 0, false);
		this.context.beginPath();
		this.context.moveTo(points[0], -points[1]);
		for (let i = 1; i < len; i++) {
			this.context.lineTo(points[i * 2], -points[i * 2 + 1]);
		}
		this.context.closePath();
		this.context.stroke();
		if (transform) this.closeDrawOp();
	}

	drawPolyline(args: any[]): void {
		const { color, points } = this.extractPoints(args);
		if (!points || points.length < 4) return;

		if (color) this.setColor(color);
		this.context.globalAlpha = this.alpha;
		this.context.lineWidth = this.line_width;

		const len = Math.floor(points.length / 2);
		const transform = this.initDrawOp(0, 0, false);
		this.context.beginPath();
		this.context.moveTo(points[0], -points[1]);
		for (let i = 1; i < len; i++) {
			this.context.lineTo(points[i * 2], -points[i * 2 + 1]);
		}
		this.context.stroke();
		if (transform) this.closeDrawOp();
	}

	fillPolygon(args: any[]): void {
		const { color, points } = this.extractPoints(args);
		if (!points || points.length < 4) return;

		if (color) this.setColor(color);
		this.context.globalAlpha = this.alpha;

		const len = Math.floor(points.length / 2);
		const transform = this.initDrawOp(0, 0, false);
		this.context.beginPath();
		this.context.moveTo(points[0], -points[1]);
		for (let i = 1; i < len; i++) {
			this.context.lineTo(points[i * 2], -points[i * 2 + 1]);
		}
		this.context.fill();
		if (transform) this.closeDrawOp();
	}

	drawQuadCurve(args: any[]): void {
		const { color, points } = this.extractPoints(args);
		if (!points || points.length < 4) return;

		if (color) this.setColor(color);
		this.context.globalAlpha = this.alpha;
		this.context.lineWidth = this.line_width;

		const transform = this.initDrawOp(0, 0, false);
		this.context.beginPath();
		this.context.moveTo(points[0], -points[1]);
		let index = 2;
		while (index <= points.length - 4) {
			this.context.quadraticCurveTo(
				points[index],
				-points[index + 1],
				points[index + 2],
				-points[index + 3],
			);
			index += 4;
		}
		this.context.stroke();
		if (transform) this.closeDrawOp();
	}

	drawBezierCurve(args: any[]): void {
		const { color, points } = this.extractPoints(args);
		if (!points || points.length < 4) return;

		if (color) this.setColor(color);
		this.context.globalAlpha = this.alpha;
		this.context.lineWidth = this.line_width;

		const transform = this.initDrawOp(0, 0, false);
		this.context.beginPath();
		this.context.moveTo(points[0], -points[1]);
		let index = 2;
		while (index <= points.length - 6) {
			this.context.bezierCurveTo(
				points[index],
				-points[index + 1],
				points[index + 2],
				-points[index + 3],
				points[index + 4],
				-points[index + 5],
			);
			index += 6;
		}
		this.context.stroke();
		if (transform) this.closeDrawOp();
	}

	drawArc(
		x: number,
		y: number,
		radius: number,
		angle1: number,
		angle2: number,
		ccw: boolean,
		color?: string | number,
	): void {
		if (color) this.setColor(color);
		this.context.globalAlpha = this.alpha;
		this.context.lineWidth = this.line_width;

		if (this.initDrawOp(x, -y)) {
			this.context.beginPath();
			this.context.arc(
				0,
				0,
				radius,
				(-angle1 / 180) * Math.PI,
				(-angle2 / 180) * Math.PI,
				ccw,
			);
			this.context.stroke();
			this.closeDrawOp();
		} else {
			this.context.beginPath();
			this.context.arc(
				x,
				-y,
				radius,
				(-angle1 / 180) * Math.PI,
				(-angle2 / 180) * Math.PI,
				ccw,
			);
			this.context.stroke();
		}
	}

	fillArc(
		x: number,
		y: number,
		radius: number,
		angle1: number,
		angle2: number,
		ccw: boolean,
		color?: string | number,
	): void {
		if (color) this.setColor(color);
		this.context.globalAlpha = this.alpha;

		if (this.initDrawOp(x, -y)) {
			this.context.beginPath();
			this.context.arc(
				0,
				0,
				radius,
				(-angle1 / 180) * Math.PI,
				(-angle2 / 180) * Math.PI,
				ccw,
			);
			this.context.fill();
			this.closeDrawOp();
		} else {
			this.context.beginPath();
			this.context.arc(
				x,
				-y,
				radius,
				(-angle1 / 180) * Math.PI,
				(-angle2 / 180) * Math.PI,
				ccw,
			);
			this.context.fill();
		}
	}

	private extractPoints(args: any[]): {
		color?: string | number;
		points?: number[];
	} {
		let color: string | number | undefined;
		let points: number[] | undefined;

		if (
			args.length > 0 &&
			args.length % 2 === 1 &&
			typeof args[args.length - 1] === "string"
		) {
			color = args[args.length - 1];
			points = args.slice(0, -1);
		} else if (Array.isArray(args[0])) {
			if (args[1] && typeof args[1] === "string") {
				color = args[1];
			}
			points = args[0];
		} else {
			points = args as number[];
		}

		return { color, points };
	}
}
