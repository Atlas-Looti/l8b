import { Easing } from "./easing";

export interface TweenConfig {
	from: number;
	to: number;
	duration: number;
	easing?: string;
	onUpdate: (value: number) => void;
	onComplete?: () => void;
	loop?: boolean;
	pingpong?: boolean;
	delay?: number;
}

export class Tween {
	id = 0;
	active = false;
	paused = false;

	private from = 0;
	private to = 0;
	private duration = 0;
	private easingFn: (t: number) => number = Easing.linear;
	private onUpdate: (v: number) => void = () => {};
	private onComplete: (() => void) | undefined;
	private loop = false;
	private pingpong = false;
	private delay = 0;
	private elapsed = 0;
	private delayRemaining = 0;
	private direction = 1;

	reset(config: TweenConfig): void {
		this.from = config.from;
		this.to = config.to;
		this.duration = config.duration;
		this.easingFn = Easing[config.easing ?? "linear"] ?? Easing.linear;
		this.onUpdate = config.onUpdate;
		this.onComplete = config.onComplete;
		this.loop = config.loop ?? false;
		this.pingpong = config.pingpong ?? false;
		this.delay = config.delay ?? 0;
		this.elapsed = 0;
		this.delayRemaining = this.delay;
		this.direction = 1;
		this.active = true;
		this.paused = false;
	}

	/** Returns true when the tween is done and should be returned to pool */
	update(dtMs: number): boolean {
		if (!this.active || this.paused) return false;

		if (this.delayRemaining > 0) {
			this.delayRemaining -= dtMs;
			if (this.delayRemaining > 0) return false;
			dtMs = -this.delayRemaining;
			this.delayRemaining = 0;
		}

		this.elapsed += dtMs * this.direction;

		if (this.elapsed >= this.duration) {
			if (this.pingpong) {
				this.elapsed = this.duration;
				this._apply(1);
				this.direction = -1;
				this.elapsed = this.duration;
				return false;
			}
			if (this.loop) {
				this.elapsed = this.elapsed % this.duration;
				this._apply(this.elapsed / this.duration);
				return false;
			}
			this._apply(1);
			this.active = false;
			if (this.onComplete) this.onComplete();
			return true;
		}

		if (this.elapsed <= 0 && this.direction === -1) {
			this._apply(0);
			if (this.loop || this.pingpong) {
				this.direction = 1;
				this.elapsed = 0;
				return false;
			}
			this.active = false;
			if (this.onComplete) this.onComplete();
			return true;
		}

		this._apply(Math.max(0, Math.min(1, this.elapsed / this.duration)));
		return false;
	}

	pause(): void {
		this.paused = true;
	}

	resume(): void {
		this.paused = false;
	}

	stop(): void {
		this.active = false;
	}

	private _apply(t: number): void {
		const easedT = this.easingFn(t);
		this.onUpdate(this.from + (this.to - this.from) * easedT);
	}
}
