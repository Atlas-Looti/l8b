/**
 * GameLoop - Manages the game update/draw cycle
 *
 * Responsibilities:
 * - requestAnimationFrame loop
 * - Delta time calculation
 * - FPS calculation
 * - Update rate management
 * - Frame skipping for catch-up
 */

export interface GameLoopCallbacks {
	onUpdate: () => void;
	onDraw: () => void;
	onTick?: () => void;
}

export interface GameLoopState {
	currentFrame: number;
	floatingFrame: number;
	dt: number;
	lastTime: number;
	fps: number;
	updateRate: number;
}

export class GameLoop {
	private callbacks: GameLoopCallbacks;
	private state: GameLoopState;
	private stopped = false;
	private animationFrameId: number | null = null;

	constructor(callbacks: GameLoopCallbacks) {
		this.callbacks = callbacks;
		this.state = {
			currentFrame: 0,
			floatingFrame: 0,
			dt: 1000 / 60,
			lastTime: Date.now(),
			fps: 60,
			updateRate: 60,
		};
	}

	/**
	 * Start the game loop
	 */
	start(): void {
		this.stopped = false;
		this.state.lastTime = Date.now();
		this.state.currentFrame = 0;
		this.state.floatingFrame = 0;
		this.loop();
	}

	/**
	 * Stop the game loop
	 */
	stop(): void {
		this.stopped = true;
		if (this.animationFrameId !== null) {
			cancelAnimationFrame(this.animationFrameId);
			this.animationFrameId = null;
		}
	}

	/**
	 * Resume the game loop
	 */
	resume(): void {
		if (!this.stopped) return;
		this.stopped = false;
		this.state.lastTime = Date.now();
		this.loop();
	}

	/**
	 * Main game loop
	 */
	private loop(): void {
		if (this.stopped) return;

		// Schedule next frame
		this.animationFrameId = requestAnimationFrame(() => this.loop());

		const time = Date.now();

		// Recover from long pause (tab switch, etc)
		if (Math.abs(time - this.state.lastTime) > 160) {
			this.state.lastTime = time - 16;
		}

		// Calculate delta time
		const dt = time - this.state.lastTime;
		this.state.dt = this.state.dt * 0.9 + dt * 0.1; // Smooth with exponential moving average
		this.state.lastTime = time;

		// Calculate FPS
		this.state.fps = Math.round(1000 / this.state.dt);

		// Calculate how many update steps needed
		this.state.floatingFrame += (this.state.dt * this.state.updateRate) / 1000;
		let steps = Math.min(
			10,
			Math.round(this.state.floatingFrame - this.state.currentFrame),
		);

		// Correction for 60fps (reduce jitter)
		if (
			(steps === 0 || steps === 2) &&
			this.state.updateRate === 60 &&
			Math.abs(this.state.fps - 60) < 2
		) {
			steps = 1;
			this.state.floatingFrame = this.state.currentFrame + 1;
		}

		// Call update() multiple times if needed (catch up)
		for (let i = 0; i < steps; i++) {
			this.callbacks.onUpdate();

			// Tick between updates (for threads/coroutines)
			if (i < steps - 1 && this.callbacks.onTick) {
				this.callbacks.onTick();
			}
		}

		this.state.currentFrame += steps;

		// Call draw() once per frame
		this.callbacks.onDraw();

		// Tick after draw
		if (this.callbacks.onTick) {
			this.callbacks.onTick();
		}
	}

	/**
	 * Get current state
	 */
	getState(): GameLoopState {
		return { ...this.state };
	}

	/**
	 * Set update rate
	 */
	setUpdateRate(rate: number): void {
		if (rate > 0 && Number.isFinite(rate)) {
			this.state.updateRate = rate;
		}
	}

	/**
	 * Get FPS
	 */
	getFPS(): number {
		return this.state.fps;
	}
}
