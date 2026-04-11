import { Camera, type CameraTarget } from "./camera";

export class CameraManager {
	private cameras: Map<number, Camera> = new Map();
	private activeId: number | null = null;
	private nextId = 0;
	private screenW: number;
	private screenH: number;
	private getCtx: (() => CanvasRenderingContext2D | null) | null = null;

	constructor(screenW: number, screenH: number) {
		this.screenW = screenW;
		this.screenH = screenH;
	}

	setContextProvider(fn: () => CanvasRenderingContext2D | null): void {
		this.getCtx = fn;
	}

	update(dtMs: number): void {
		for (const cam of this.cameras.values()) {
			cam.update(dtMs);
		}
	}

	create(): number {
		const cam = new Camera(this.screenW, this.screenH);
		cam.id = this.nextId++;
		this.cameras.set(cam.id, cam);
		return cam.id;
	}

	setActive(id: number): void {
		if (this.cameras.has(id)) this.activeId = id;
	}

	getActive(): Camera | null {
		return this.activeId !== null ? (this.cameras.get(this.activeId) ?? null) : null;
	}

	get(id: number): Camera | null {
		return this.cameras.get(id) ?? null;
	}

	destroy(id: number): void {
		const cam = this.cameras.get(id);
		if (cam) {
			cam.reset();
			this.cameras.delete(id);
			if (this.activeId === id) this.activeId = null;
		}
	}

	reset(): void {
		for (const cam of this.cameras.values()) cam.reset();
		this.cameras.clear();
		this.activeId = null;
		this.nextId = 0;
	}

	getInterface(): Record<string, unknown> {
		const self = this;
		return {
			create: () => self.create(),
			setActive: (id: number) => self.setActive(id),
			destroy: (id: number) => self.destroy(id),
			follow: (id: number, target: CameraTarget, lerp?: number, offX?: number, offY?: number) => {
				self.get(id)?.follow(target, lerp, offX, offY);
			},
			unfollow: (id: number) => self.get(id)?.unfollow(),
			setDeadZone: (id: number, w: number, h: number) => self.get(id)?.setDeadZone(w, h),
			shake: (id: number, intensity: number, durationMs: number) => self.get(id)?.shake(intensity, durationMs),
			setBounds: (id: number, minX: number, minY: number, maxX: number, maxY: number) =>
				self.get(id)?.setBounds(minX, minY, maxX, maxY),
			clearBounds: (id: number) => self.get(id)?.clearBounds(),
			setZoom: (id: number, zoom: number, smooth?: boolean) => self.get(id)?.setZoom(zoom, smooth),
			worldToScreen: (id: number, wx: number, wy: number) => self.get(id)?.worldToScreen(wx, wy) ?? { x: wx, y: wy },
			screenToWorld: (id: number, sx: number, sy: number) => self.get(id)?.screenToWorld(sx, sy) ?? { x: sx, y: sy },
			begin: (id: number) => {
				const ctx = self.getCtx?.();
				if (ctx) self.get(id)?.applyTransform(ctx);
			},
			end: (id: number) => {
				const ctx = self.getCtx?.();
				if (ctx) self.get(id)?.resetTransform(ctx);
			},
			getX: (id: number) => self.get(id)?.x ?? 0,
			getY: (id: number) => self.get(id)?.y ?? 0,
			getZoom: (id: number) => self.get(id)?.zoom ?? 1,
		};
	}
}
