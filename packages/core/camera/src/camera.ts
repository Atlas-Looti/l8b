export interface CameraTarget {
	x: number;
	y: number;
}

export class Camera {
	id = 0;
	x = 0;
	y = 0;
	zoom = 1;
	rotation = 0;

	private followTarget: CameraTarget | null = null;
	private followLerp = 0.1;
	private followOffsetX = 0;
	private followOffsetY = 0;
	private deadZoneW = 0;
	private deadZoneH = 0;

	private shakeIntensity = 0;
	private shakeDuration = 0;
	private shakeElapsed = 0;
	private shakeOffX = 0;
	private shakeOffY = 0;

	private boundsMinX: number | null = null;
	private boundsMinY: number | null = null;
	private boundsMaxX: number | null = null;
	private boundsMaxY: number | null = null;

	private screenW: number;
	private screenH: number;

	private targetZoom: number | null = null;
	private zoomLerp = 0.1;

	constructor(screenW: number, screenH: number) {
		this.screenW = screenW;
		this.screenH = screenH;
	}

	update(dtMs: number): void {
		const dt = dtMs / 1000;

		// Smooth zoom
		if (this.targetZoom !== null) {
			this.zoom += (this.targetZoom - this.zoom) * Math.min(1, this.zoomLerp * dtMs / 16);
			if (Math.abs(this.zoom - this.targetZoom) < 0.001) {
				this.zoom = this.targetZoom;
				this.targetZoom = null;
			}
		}

		// Follow target
		if (this.followTarget !== null) {
			const tx = this.followTarget.x + this.followOffsetX;
			const ty = this.followTarget.y + this.followOffsetY;

			if (this.deadZoneW > 0 || this.deadZoneH > 0) {
				const diffX = tx - this.x;
				const diffY = ty - this.y;
				const halfDZW = this.deadZoneW / 2;
				const halfDZH = this.deadZoneH / 2;
				if (Math.abs(diffX) > halfDZW) {
					this.x += (diffX - Math.sign(diffX) * halfDZW) * Math.min(1, this.followLerp * dtMs / 16);
				}
				if (Math.abs(diffY) > halfDZH) {
					this.y += (diffY - Math.sign(diffY) * halfDZH) * Math.min(1, this.followLerp * dtMs / 16);
				}
			} else {
				this.x += (tx - this.x) * Math.min(1, this.followLerp * dtMs / 16);
				this.y += (ty - this.y) * Math.min(1, this.followLerp * dtMs / 16);
			}
		}

		// Clamp to bounds
		if (this.boundsMinX !== null) this.x = Math.max(this.boundsMinX + this.screenW / 2 / this.zoom, this.x);
		if (this.boundsMinY !== null) this.y = Math.max(this.boundsMinY + this.screenH / 2 / this.zoom, this.y);
		if (this.boundsMaxX !== null) this.x = Math.min(this.boundsMaxX - this.screenW / 2 / this.zoom, this.x);
		if (this.boundsMaxY !== null) this.y = Math.min(this.boundsMaxY - this.screenH / 2 / this.zoom, this.y);

		// Shake
		if (this.shakeElapsed < this.shakeDuration) {
			this.shakeElapsed += dtMs;
			const progress = 1 - this.shakeElapsed / this.shakeDuration;
			const intensity = this.shakeIntensity * progress * progress;
			this.shakeOffX = (Math.random() * 2 - 1) * intensity;
			this.shakeOffY = (Math.random() * 2 - 1) * intensity;
		} else {
			this.shakeOffX = 0;
			this.shakeOffY = 0;
		}

		void dt;
	}

	follow(target: CameraTarget, lerp = 0.1, offX = 0, offY = 0): void {
		this.followTarget = target;
		this.followLerp = lerp;
		this.followOffsetX = offX;
		this.followOffsetY = offY;
	}

	unfollow(): void {
		this.followTarget = null;
	}

	setDeadZone(w: number, h: number): void {
		this.deadZoneW = w;
		this.deadZoneH = h;
	}

	shake(intensity: number, durationMs: number): void {
		this.shakeIntensity = intensity;
		this.shakeDuration = durationMs;
		this.shakeElapsed = 0;
	}

	setBounds(minX: number, minY: number, maxX: number, maxY: number): void {
		this.boundsMinX = minX;
		this.boundsMinY = minY;
		this.boundsMaxX = maxX;
		this.boundsMaxY = maxY;
	}

	clearBounds(): void {
		this.boundsMinX = null;
		this.boundsMinY = null;
		this.boundsMaxX = null;
		this.boundsMaxY = null;
	}

	setZoom(zoom: number, smooth = false): void {
		if (smooth) {
			this.targetZoom = zoom;
		} else {
			this.zoom = zoom;
			this.targetZoom = null;
		}
	}

	worldToScreen(wx: number, wy: number): { x: number; y: number } {
		return {
			x: (wx - this.x) * this.zoom + this.screenW / 2 + this.shakeOffX,
			y: (wy - this.y) * this.zoom + this.screenH / 2 + this.shakeOffY,
		};
	}

	screenToWorld(sx: number, sy: number): { x: number; y: number } {
		return {
			x: (sx - this.screenW / 2 - this.shakeOffX) / this.zoom + this.x,
			y: (sy - this.screenH / 2 - this.shakeOffY) / this.zoom + this.y,
		};
	}

	applyTransform(ctx: CanvasRenderingContext2D): void {
		ctx.save();
		ctx.translate(this.screenW / 2 + this.shakeOffX, this.screenH / 2 + this.shakeOffY);
		ctx.scale(this.zoom, this.zoom);
		ctx.rotate(this.rotation);
		ctx.translate(-this.x, -this.y);
	}

	resetTransform(ctx: CanvasRenderingContext2D): void {
		ctx.restore();
	}

	reset(): void {
		this.x = 0;
		this.y = 0;
		this.zoom = 1;
		this.rotation = 0;
		this.followTarget = null;
		this.shakeIntensity = 0;
		this.shakeDuration = 0;
		this.shakeElapsed = 0;
		this.shakeOffX = 0;
		this.shakeOffY = 0;
		this.clearBounds();
		this.targetZoom = null;
		this.deadZoneW = 0;
		this.deadZoneH = 0;
	}
}
