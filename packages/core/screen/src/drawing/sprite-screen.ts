/**
 * Sprite rendering for Screen class
 */

import { APIErrorCode, createDiagnostic, formatForBrowser } from "@l8b/diagnostics";
import type { Map } from "@l8b/map";
import type { Sprite } from "@l8b/sprites";

import { PrimitiveScreen } from "./primitives-screen";

export class SpriteScreen extends PrimitiveScreen {
	/**
	 * Get the canvas for the current sprite frame
	 */
	protected getSpriteFrame(sprite: Sprite | string | any): HTMLCanvasElement | null {
		let frame: number | null = null;

		// Handle string sprite name
		if (typeof sprite === "string") {
			const spriteName = sprite;
			let spriteObj: Sprite | null = null;

			if (this.runtime && this.runtime.sprites) {
				spriteObj = this.runtime.sprites[sprite];
			}

			// Handle "sprite.frame" format (e.g., "player.0")
			if (!spriteObj) {
				const parts = sprite.split(".");
				if (parts.length > 1 && this.runtime && this.runtime.sprites) {
					spriteObj = this.runtime.sprites[parts[0]];
					frame = Number.parseInt(parts[1]) || 0;
				}
			}

			// Report sprite not found error
			if (!spriteObj) {
				const diagnostic = createDiagnostic(APIErrorCode.E7004, {
					data: {
						spriteName,
					},
				});
				const formatted = formatForBrowser(diagnostic);

				if (this.runtime?.listener?.reportError) {
					this.runtime.listener.reportError(formatted);
				}
				return null;
			}

			sprite = spriteObj;
		}
		// Handle Image instances - check for objects with canvas but no frames
		else if (sprite && typeof sprite === "object" && (sprite as any).canvas && !(sprite as any).frames) {
			return (sprite as any).canvas || (sprite as any).image || null;
		}

		// Validate sprite object
		if (!sprite || !(sprite as Sprite).ready) {
			const spriteName = typeof sprite === "string" ? sprite : "unknown";
			const diagnostic = createDiagnostic(APIErrorCode.E7005, {
				data: {
					spriteName,
				},
			});
			const formatted = formatForBrowser(diagnostic);

			if (this.runtime?.listener?.reportError) {
				this.runtime.listener.reportError(formatted);
			}
			return null;
		}

		const spriteObj = sprite as Sprite;

		// Handle multi-frame sprites
		if (spriteObj.frames && spriteObj.frames.length > 1) {
			if (frame === null) {
				if (spriteObj.animation_start === 0) {
					spriteObj.animation_start = Date.now();
				}
				const dt = 1000 / spriteObj.fps;
				frame = Math.floor((Date.now() - spriteObj.animation_start) / dt) % spriteObj.frames.length;
			}
			if (frame >= 0 && frame < spriteObj.frames.length) {
				return spriteObj.frames[frame].canvas;
			}
			return spriteObj.frames[0].canvas;
		}
		// Handle single-frame sprites
		else if (spriteObj.frames && spriteObj.frames[0]) {
			return spriteObj.frames[0].canvas;
		}

		return null;
	}

	/**
	 * Draw a sprite
	 */
	drawSprite(sprite: Sprite | string | any, x: number, y: number, w?: number, h?: number): void {
		const canvas = this.getSpriteFrame(sprite);
		if (!canvas) return;

		if (w == null) {
			w = canvas.width;
		}

		if (!h) {
			h = (w / canvas.width) * canvas.height;
		}

		this.context.globalAlpha = this.alpha;
		this.context.imageSmoothingEnabled = !this.pixelated;
		if (this.initDrawOp(x, -y)) {
			this.context.drawImage(canvas, -w / 2 - (this.anchor_x * w) / 2, -h / 2 + (this.anchor_y * h) / 2, w, h);
			this.closeDrawOp();
		} else {
			this.context.drawImage(canvas, x - w / 2 - (this.anchor_x * w) / 2, -y - h / 2 + (this.anchor_y * h) / 2, w, h);
		}
	}

	/**
	 * Alias for drawSprite (for Image compatibility)
	 */
	drawImage(sprite: Sprite | string | any, x: number, y: number, w?: number, h?: number): void {
		this.drawSprite(sprite, x, y, w, h);
	}

	/**
	 * Draw a portion of a sprite
	 */
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

		if (w == null) {
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

	/**
	 * Alias for drawSpritePart (for Image compatibility)
	 */
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

	/**
	 * Draw a map
	 */
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
			mapObj.draw(this.context, -w / 2 - (this.anchor_x * w) / 2, -h / 2 + (this.anchor_y * h) / 2, w, h);
			this.closeDrawOp();
		} else {
			mapObj.draw(this.context, x - w / 2 - (this.anchor_x * w) / 2, -y - h / 2 + (this.anchor_y * h) / 2, w, h);
		}
	}
}
