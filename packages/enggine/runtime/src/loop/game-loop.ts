import { DEFAULT_FPS, DEFAULT_UPDATE_RATE, FRAME_TIME_MS, LOADING_BAR_THROTTLE_MS, PAUSE_THRESHOLD_MS } from "../constants";

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
	onWatchStep?: () => void;
	getUpdateRate?: () => number | undefined;
	setFPS?: (fps: number) => void;
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
			dt: FRAME_TIME_MS,
			lastTime: performance.now(),
			fps: DEFAULT_FPS,
			updateRate: DEFAULT_UPDATE_RATE,
		};
		// Bind loop once
		this.loop = this.loop.bind(this);
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
		this.animationFrameId = requestAnimationFrame(this.loop);

		const time = Date.now();

		// Recover from long pause (tab switch, etc)
		if (Math.abs(time - this.state.lastTime) > PAUSE_THRESHOLD_MS) {
			this.state.lastTime = time - LOADING_BAR_THROTTLE_MS;
		}

		// Calculate delta time
		const dt = time - this.state.lastTime;
		this.state.dt = this.state.dt * 0.9 + dt * 0.1; // Smooth with exponential moving average
		this.state.lastTime = time;

		// Calculate FPS and update in global context
		const fps = Math.round(1000 / this.state.dt);
		this.state.fps = fps;
		if (this.callbacks.setFPS) {
			this.callbacks.setFPS(fps);
		}

		// Read update_rate from global context each frame
		let updateRate = this.state.updateRate; // Default
		if (this.callbacks.getUpdateRate) {
			const rate = this.callbacks.getUpdateRate();
			if (rate != null && rate > 0 && Number.isFinite(rate)) {
				updateRate = rate;
			}
		}

		// Calculate how many update steps needed
		this.state.floatingFrame += (this.state.dt * updateRate) / 1000;
		let ds = Math.min(10, Math.round(this.state.floatingFrame - this.state.currentFrame));

		// Correction for 60fps (reduce jitter)
		if ((ds === 0 || ds === 2) && updateRate === DEFAULT_UPDATE_RATE && Math.abs(fps - DEFAULT_FPS) < 2) {
			ds = 1;
			this.state.floatingFrame = this.state.currentFrame + 1;
		}

		// Call update() multiple times if needed (catch up)
		// Loop from 1 to ds (inclusive), not 0 to steps-1
		for (let i = 1; i <= ds; i++) {
			this.callbacks.onUpdate();

			// Tick between updates (for threads/coroutines)
			if (i < ds && this.callbacks.onTick) {
				this.callbacks.onTick();
			}
		}

		// Update current frame
		this.state.currentFrame += ds;

		// Call draw() once per frame
		this.callbacks.onDraw();

		// Tick after draw
		if (this.callbacks.onTick) {
			this.callbacks.onTick();
		}

		// Watch step after draw if ds > 0
		if (ds > 0 && this.callbacks.onWatchStep) {
			this.callbacks.onWatchStep();
		}
	}

	/**
	 * Get current state
	 */
	getState(): GameLoopState {
		return {
			...this.state,
		};
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
