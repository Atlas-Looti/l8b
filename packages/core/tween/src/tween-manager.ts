import { Tween, type TweenConfig } from "./tween";

export class TweenManager {
	private active: Tween[] = [];
	private pool: Tween[] = [];
	private nextId = 0;

	update(dtMs: number): void {
		let i = this.active.length;
		while (i-- > 0) {
			const t = this.active[i];
			const done = t.update(dtMs);
			if (done) {
				this.active.splice(i, 1);
				this.pool.push(t);
			}
		}
	}

	create(config: TweenConfig): number {
		const t = this.pool.pop() ?? new Tween();
		t.id = this.nextId++;
		t.reset(config);
		this.active.push(t);
		return t.id;
	}

	to(
		target: Record<string, unknown>,
		durationMs: number,
		prop: string,
		toVal: number,
		easing?: string,
		onComplete?: () => void,
	): number {
		const fromVal = typeof target[prop] === "number" ? (target[prop] as number) : 0;
		return this.create({
			from: fromVal,
			to: toVal,
			duration: durationMs,
			easing,
			onUpdate: (v) => {
				target[prop] = v;
			},
			onComplete,
		});
	}

	pause(id: number): void {
		this._find(id)?.pause();
	}

	resume(id: number): void {
		this._find(id)?.resume();
	}

	stop(id: number): void {
		const idx = this.active.findIndex((t) => t.id === id);
		if (idx !== -1) {
			const t = this.active.splice(idx, 1)[0];
			t.stop();
			this.pool.push(t);
		}
	}

	stopAll(): void {
		for (const t of this.active) {
			t.stop();
			this.pool.push(t);
		}
		this.active.length = 0;
	}

	reset(): void {
		this.stopAll();
		this.pool.length = 0;
		this.nextId = 0;
	}

	getInterface(): Record<string, unknown> {
		return {
			create: (config: TweenConfig) => this.create(config),
			to: (
				target: Record<string, unknown>,
				durationMs: number,
				prop: string,
				toVal: number,
				easing?: string,
				onComplete?: () => void,
			) => this.to(target, durationMs, prop, toVal, easing, onComplete),
			pause: (id: number) => this.pause(id),
			resume: (id: number) => this.resume(id),
			stop: (id: number) => this.stop(id),
			stopAll: () => this.stopAll(),
		};
	}

	private _find(id: number): Tween | undefined {
		return this.active.find((t) => t.id === id);
	}
}
