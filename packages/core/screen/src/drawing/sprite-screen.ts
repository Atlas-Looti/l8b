/**
 * Sprite rendering for Screen class
 */

import type { TileMap as Map } from "@al8b/map";
import type { Sprite } from "@al8b/sprites";

import { PrimitiveScreen } from "./primitives-screen";

export class SpriteScreen extends PrimitiveScreen {
	// Cache imageSmoothingEnabled — only set when pixelated flag changes
	private _lastImageSmoothing = true;

	// Cache frame time once per draw frame instead of per-sprite
	protected _frameTime = 0;

	/**
	 * Initialize draw state (called before each draw frame)
	 */
	override initDraw(): void {
		super.initDraw();
		this._frameTime = performance.now();
	}

	/**
	 * Set imageSmoothingEnabled only when it actually changes
	 */
	protected setImageSmoothing(): void {
		const smooth = !this.pixelated;
		if (smooth !== this._lastImageSmoothing) {
			this.context.imageSmoothingEnabled = smooth;
			this._lastImageSmoothing = smooth;
		}
	}

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
				this.runtime?.listener?.reportError?.({ code: "E7004", message: "Sprite not found", data: { spriteName } });
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
			this.runtime?.listener?.reportError?.({ code: "E7005", message: "Sprite not ready", data: { spriteName } });
			return null;
		}

		const spriteObj = sprite as Sprite;

		// Handle multi-frame sprites — use cached _frameTime instead of Date.now() per call
		if (spriteObj.frames && spriteObj.frames.length > 1) {
			if (frame === null) {
				if (spriteObj.animation_start === 0) {
					spriteObj.animation_start = this._frameTime;
				}
				const dt = 1000 / spriteObj.fps;
				frame = Math.floor((this._frameTime - spriteObj.animation_start) / dt) % spriteObj.frames.length;
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

		// Viewport culling: skip sprites entirely outside visible area
		// Only when no screen/object transforms are active (simple AABB check)
		if (
			!this.screen_transform &&
			this.object_rotation === 0 &&
			this.object_scale_x === 1 &&
			this.object_scale_y === 1
		) {
			const drawX = x - w / 2 - (this.anchor_x * w) / 2;
			const drawY = -y - h / 2 + (this.anchor_y * h) / 2;
			const halfW = this.width / 2;
			const halfH = this.height / 2;
			if (drawX > halfW || drawX + w < -halfW || drawY > halfH || drawY + h < -halfH) {
				return;
			}
		}

		this.context.globalAlpha = this.alpha;
		this.setImageSmoothing();
		if (this.initDrawOp(x, -y)) {
			this.context.drawImage(canvas, -w / 2 - (this.anchor_x * w) / 2, -h / 2 + (this.anchor_y * h) / 2, w, h);
			this.closeDrawOp();
		} else {
			this.context.drawImage(canvas, x - w / 2 - (this.anchor_x * w) / 2, -y - h / 2 + (this.anchor_y * h) / 2, w, h);
		}
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

		// Viewport culling: skip sprites entirely outside visible area
		if (
			!this.screen_transform &&
			this.object_rotation === 0 &&
			this.object_scale_x === 1 &&
			this.object_scale_y === 1
		) {
			const drawX = x - w / 2 - (this.anchor_x * w) / 2;
			const drawY = -y - h / 2 + (this.anchor_y * h) / 2;
			const halfW = this.width / 2;
			const halfH = this.height / 2;
			if (drawX > halfW || drawX + w < -halfW || drawY > halfH || drawY + h < -halfH) {
				return;
			}
		}

		this.context.globalAlpha = this.alpha;
		this.setImageSmoothing();
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
		this.setImageSmoothing();
		if (this.initDrawOp(x, -y)) {
			mapObj.draw(this.context, -w / 2 - (this.anchor_x * w) / 2, -h / 2 + (this.anchor_y * h) / 2, w, h);
			this.closeDrawOp();
		} else {
			mapObj.draw(this.context, x - w / 2 - (this.anchor_x * w) / 2, -y - h / 2 + (this.anchor_y * h) / 2, w, h);
		}
	}
}
