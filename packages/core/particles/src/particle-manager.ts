import { Emitter, type EmitterConfig } from "./emitter";

export class ParticleManager {
	private emitters: Map<number, Emitter> = new Map();
	private emitterPool: Emitter[] = [];
	private nextId = 0;
	private ctx: CanvasRenderingContext2D | null = null;

	setContext(ctx: CanvasRenderingContext2D): void {
		this.ctx = ctx;
	}

	update(dtMs: number): void {
		for (const [id, emitter] of this.emitters) {
			emitter.update(dtMs);
			if (!emitter.active) {
				this.emitters.delete(id);
				this.emitterPool.push(emitter);
			}
		}
	}

	draw(): void {
		if (!this.ctx) return;
		for (const emitter of this.emitters.values()) {
			emitter.draw(this.ctx);
		}
	}

	create(config: EmitterConfig): number {
		const emitter = this._getOrCreate(config);
		emitter.id = this.nextId++;
		this.emitters.set(emitter.id, emitter);
		return emitter.id;
	}

	burst(
		x: number,
		y: number,
		count: number,
		config: Omit<EmitterConfig, "x" | "y" | "loop">,
	): void {
		const burstConfig: EmitterConfig = {
			...config,
			x,
			y,
			loop: false,
			burstCount: count,
		};
		this.create(burstConfig);
	}

	move(id: number, x: number, y: number): void {
		const e = this.emitters.get(id);
		if (e) { e.x = x; e.y = y; }
	}

	pause(id: number): void {
		const e = this.emitters.get(id);
		if (e) e.paused = true;
	}

	resume(id: number): void {
		const e = this.emitters.get(id);
		if (e) e.paused = false;
	}

	stop(id: number): void {
		const e = this.emitters.get(id);
		if (e) {
			e.stop();
			this.emitters.delete(id);
			this.emitterPool.push(e);
		}
	}

	reset(): void {
		for (const e of this.emitters.values()) e.stop();
		this.emitters.clear();
		this.emitterPool.length = 0;
		this.nextId = 0;
	}

	getInterface(): Record<string, unknown> {
		return {
			create: (config: EmitterConfig) => this.create(config),
			burst: (x: number, y: number, count: number, config: Omit<EmitterConfig, "x" | "y" | "loop">) =>
				this.burst(x, y, count, config),
			move: (id: number, x: number, y: number) => this.move(id, x, y),
			pause: (id: number) => this.pause(id),
			resume: (id: number) => this.resume(id),
			stop: (id: number) => this.stop(id),
		};
	}

	private _getOrCreate(config: EmitterConfig): Emitter {
		const pooled = this.emitterPool.pop();
		if (pooled) {
			pooled.reset(config);
			return pooled;
		}
		return new Emitter(config);
	}
}
