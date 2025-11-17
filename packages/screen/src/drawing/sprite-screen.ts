import type { Map } from "@l8b/map";
import type { Sprite } from "@l8b/sprites";

import { PrimitiveScreen } from "./primitives-screen";

export class SpriteScreen extends PrimitiveScreen {
	protected getSpriteFrame(
		sprite: Sprite | string | any,
	): HTMLCanvasElement | null {
		let frame: number | null = null;
		let spriteObj: Sprite | null = null;

		if (
			sprite &&
			typeof sprite === "object" &&
			(sprite as any).canvas &&
			!(sprite as any).frames
		) {
			return (sprite as any).canvas;
		}

		if (typeof sprite === "string") {
			if (this.runtime && this.runtime.sprites) {
				spriteObj = this.runtime.sprites[sprite];
			}
			if (!spriteObj) {
				const parts = sprite.split(".");
				if (parts.length > 1 && this.runtime && this.runtime.sprites) {
					spriteObj = this.runtime.sprites[parts[0]];
					frame = Number.parseInt(parts[1]) || 0;
				}
			}
		} else if (sprite && (sprite as Sprite).frames) {
			spriteObj = sprite as Sprite;
		}

		if (!(spriteObj && spriteObj.ready)) {
			return null;
		}

		if (spriteObj.frames.length > 1) {
			if (frame === null) {
				const dt = 1000 / spriteObj.fps;
				frame =
					Math.floor((Date.now() - spriteObj.animation_start) / dt) %
					spriteObj.frames.length;
			}
			if (frame >= 0 && frame < spriteObj.frames.length) {
				return spriteObj.frames[frame].canvas;
			}
			return spriteObj.frames[0].canvas;
		} else if (spriteObj.frames[0]) {
			return spriteObj.frames[0].canvas;
		}

		return null;
	}

	drawSprite(
		sprite: Sprite | string | any,
		x: number,
		y: number,
		w?: number,
		h?: number,
	): void {
		const canvas = this.getSpriteFrame(sprite);
		if (!canvas) return;

		if (!w) {
			w = canvas.width;
		}
		if (!h) {
			h = (w / canvas.width) * canvas.height;
		}

		this.context.globalAlpha = this.alpha;
		this.context.imageSmoothingEnabled = !this.pixelated;
		if (this.initDrawOp(x, -y)) {
			this.context.drawImage(
				canvas,
				-w / 2 - (this.anchor_x * w) / 2,
				-h / 2 + (this.anchor_y * h) / 2,
				w,
				h,
			);
			this.closeDrawOp();
		} else {
			this.context.drawImage(
				canvas,
				x - w / 2 - (this.anchor_x * w) / 2,
				-y - h / 2 + (this.anchor_y * h) / 2,
				w,
				h,
			);
		}
	}

	drawImage(
		sprite: Sprite | string | any,
		x: number,
		y: number,
		w?: number,
		h?: number,
	): void {
		this.drawSprite(sprite, x, y, w, h);
	}

	drawSpritePart(
		sprite: Sprite | string | any,
		sx: number,
		sy: number,
		sw: number,
		sh: number,
		x: number,
		y: number,
		w?: number,
		h?: number,
	): void {
		const canvas = this.getSpriteFrame(sprite);
		if (!canvas) return;

		if (!w) {
			w = sw;
		}
		if (!h) {
			h = (w / sw) * sh;
		}

		this.context.globalAlpha = this.alpha;
		this.context.imageSmoothingEnabled = !this.pixelated;
		if (this.initDrawOp(x, -y)) {
			this.context.drawImage(
				canvas,
				sx,
				sy,
				sw,
				sh,
				-w / 2 - (this.anchor_x * w) / 2,
				-h / 2 + (this.anchor_y * h) / 2,
				w,
				h,
			);
			this.closeDrawOp();
		} else {
			this.context.drawImage(
				canvas,
				sx,
				sy,
				sw,
				sh,
				x - w / 2 - (this.anchor_x * w) / 2,
				-y - h / 2 + (this.anchor_y * h) / 2,
				w,
				h,
			);
		}
	}

	drawImagePart(
		sprite: Sprite | string | any,
		sx: number,
		sy: number,
		sw: number,
		sh: number,
		x: number,
		y: number,
		w?: number,
		h?: number,
	): void {
		this.drawSpritePart(sprite, sx, sy, sw, sh, x, y, w, h);
	}

	drawMap(map: Map | string, x: number, y: number, w: number, h: number): void {
		let mapObj: Map | null = null;
		if (typeof map === "string") {
			if (this.runtime && this.runtime.maps) {
				mapObj = this.runtime.maps[map];
			}
		} else {
			mapObj = map;
		}

		if (!(mapObj && mapObj.ready)) {
			return;
		}

		this.context.globalAlpha = this.alpha;
		this.context.imageSmoothingEnabled = !this.pixelated;
		if (this.initDrawOp(x, -y)) {
			mapObj.draw(
				this.context,
				-w / 2 - (this.anchor_x * w) / 2,
				-h / 2 + (this.anchor_y * h) / 2,
				w,
				h,
			);
			this.closeDrawOp();
		} else {
			mapObj.draw(
				this.context,
				x - w / 2 - (this.anchor_x * w) / 2,
				-y - h / 2 + (this.anchor_y * h) / 2,
				w,
				h,
			);
		}
	}
}
