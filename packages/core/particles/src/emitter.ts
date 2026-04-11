import { makeParticle, type Particle } from "./particle";

export interface EmitterConfig {
	x: number;
	y: number;
	maxParticles?: number;
	emitRate?: number;
	burstCount?: number;
	lifeMin: number;
	lifeMax: number;
	speedMin: number;
	speedMax: number;
	angleMin: number;
	angleMax: number;
	sizeStart: number;
	sizeEnd: number;
	alphaStart: number;
	alphaEnd: number;
	gravity?: number;
	color: string;
	sprite?: string;
	loop?: boolean;
}

function parseHex(color: string): { r: number; g: number; b: number } {
	const c = color.replace("#", "");
	return {
		r: parseInt(c.substring(0, 2), 16),
		g: parseInt(c.substring(2, 4), 16),
		b: parseInt(c.substring(4, 6), 16),
	};
}

export class Emitter {
	id = 0;
	x: number;
	y: number;
	active = true;
	paused = false;

	private pool: Particle[];
	private cfg: EmitterConfig;
	private emitAccumulator = 0;
	private nextFreeHint = 0;
	private loop: boolean;
	private isBurst: boolean;
	private burstFired = false;
	private color: { r: number; g: number; b: number };

	constructor(config: EmitterConfig) {
		this.x = config.x;
		this.y = config.y;
		this.cfg = config;
		this.loop = config.loop ?? true;
		this.isBurst = config.burstCount !== undefined;
		this.color = parseHex(config.color);
		const max = config.maxParticles ?? 200;
		this.pool = Array.from({ length: max }, () => makeParticle());
	}

	reset(config: EmitterConfig): void {
		this.x = config.x;
		this.y = config.y;
		this.cfg = config;
		this.loop = config.loop ?? true;
		this.isBurst = config.burstCount !== undefined;
		this.burstFired = false;
		this.color = parseHex(config.color);
		this.emitAccumulator = 0;
		this.nextFreeHint = 0;
		this.active = true;
		this.paused = false;
		for (const p of this.pool) p.active = false;
	}

	update(dtMs: number): void {
		if (!this.active || this.paused) return;
		const dt = dtMs / 1000;

		// Spawn
		if (this.isBurst) {
			if (!this.burstFired) {
				this.burstFired = true;
				const count = this.cfg.burstCount ?? 1;
				for (let i = 0; i < count; i++) this._spawn();
			}
		} else {
			const rate = this.cfg.emitRate ?? 60;
			this.emitAccumulator += rate * dt;
			while (this.emitAccumulator >= 1) {
				this._spawn();
				this.emitAccumulator -= 1;
			}
		}

		// Update alive particles
		let anyAlive = false;
		for (const p of this.pool) {
			if (!p.active) continue;
			anyAlive = true;
			p.life -= dtMs;
			if (p.life <= 0) { p.active = false; continue; }

			const t = 1 - p.life / p.maxLife;
			p.vx += p.ax * dt;
			p.vy += p.ay * dt;
			p.x += p.vx * dt;
			p.y += p.vy * dt;
			p.size = p.startSize + (p.endSize - p.startSize) * t;
			p.rotation += p.rotationSpeed * dt;
		}

		// Auto-deactivate burst emitters when all particles expired
		if (this.isBurst && this.burstFired && !anyAlive) {
			this.active = false;
		}

		// Auto-deactivate if not looping
		if (!this.loop && !this.isBurst && !anyAlive && this.burstFired) {
			this.active = false;
		}
	}

	draw(ctx: CanvasRenderingContext2D): void {
		for (const p of this.pool) {
			if (!p.active) continue;
			const t = 1 - p.life / p.maxLife;
			const alpha = p.startAlpha + (p.endAlpha - p.startAlpha) * t;
			if (alpha <= 0 || p.size <= 0) continue;

			ctx.save();
			ctx.globalAlpha = Math.max(0, Math.min(1, alpha));
			ctx.fillStyle = `rgb(${p.r},${p.g},${p.b})`;
			if (p.rotation !== 0) {
				ctx.translate(p.x, p.y);
				ctx.rotate(p.rotation);
				ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
			} else {
				ctx.fillRect(p.x - p.size / 2, p.y - p.size / 2, p.size, p.size);
			}
			ctx.restore();
		}
	}

	burst(count: number): void {
		for (let i = 0; i < count; i++) this._spawn();
	}

	stop(): void {
		this.active = false;
		for (const p of this.pool) p.active = false;
	}

	getActiveCount(): number {
		return this.pool.filter((p) => p.active).length;
	}

	private _spawn(): void {
		const p = this._getFree();
		if (!p) return;
		const cfg = this.cfg;
		const angle = cfg.angleMin + Math.random() * (cfg.angleMax - cfg.angleMin);
		const speed = cfg.speedMin + Math.random() * (cfg.speedMax - cfg.speedMin);
		p.active = true;
		p.x = this.x + (Math.random() - 0.5) * 2;
		p.y = this.y + (Math.random() - 0.5) * 2;
		p.vx = Math.cos(angle) * speed;
		p.vy = Math.sin(angle) * speed;
		p.ax = 0;
		p.ay = cfg.gravity ?? 0;
		const life = cfg.lifeMin + Math.random() * (cfg.lifeMax - cfg.lifeMin);
		p.life = life;
		p.maxLife = life;
		p.startSize = cfg.sizeStart;
		p.endSize = cfg.sizeEnd;
		p.size = cfg.sizeStart;
		p.r = this.color.r;
		p.g = this.color.g;
		p.b = this.color.b;
		p.startAlpha = cfg.alphaStart;
		p.endAlpha = cfg.alphaEnd;
		p.rotation = 0;
		p.rotationSpeed = 0;
		p.sprite = cfg.sprite ?? null;
	}

	private _getFree(): Particle | null {
		const len = this.pool.length;
		for (let i = 0; i < len; i++) {
			const idx = (this.nextFreeHint + i) % len;
			if (!this.pool[idx].active) {
				this.nextFreeHint = (idx + 1) % len;
				return this.pool[idx];
			}
		}
		return null;
	}
}
