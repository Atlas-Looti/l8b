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
			dt: 1000 / 60,
			lastTime: performance.now(),
			fps: 60,
			updateRate: 60,
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
	 * Matches microstudio runtime.coffee timer() exactly
	 */
	private loop(): void {
		if (this.stopped) return;

		// Schedule next frame (same as microstudio line 386)
		this.animationFrameId = requestAnimationFrame(this.loop);

		const time = Date.now();

		// Recover from long pause (tab switch, etc) (same as microstudio lines 388-389)
		if (Math.abs(time - this.state.lastTime) > 160) {
			this.state.lastTime = time - 16;
		}

		// Calculate delta time (same as microstudio lines 391-393)
		const dt = time - this.state.lastTime;
		this.state.dt = this.state.dt * 0.9 + dt * 0.1; // Smooth with exponential moving average
		this.state.lastTime = time;

		// Calculate FPS and update in global context (same as microstudio line 395)
		const fps = Math.round(1000 / this.state.dt);
		this.state.fps = fps;
		if (this.callbacks.setFPS) {
			this.callbacks.setFPS(fps);
		}

		// Read update_rate from global context each frame (same as microstudio lines 397-399)
		let updateRate = this.state.updateRate; // Default
		if (this.callbacks.getUpdateRate) {
			const rate = this.callbacks.getUpdateRate();
			if (rate != null && rate > 0 && Number.isFinite(rate)) {
				updateRate = rate;
			}
		}

		// Calculate how many update steps needed (same as microstudio line 401)
		this.state.floatingFrame += (this.state.dt * updateRate) / 1000;
		let ds = Math.min(10, Math.round(this.state.floatingFrame - this.state.currentFrame));

		// Correction for 60fps (reduce jitter) (same as microstudio lines 403-406)
		if ((ds === 0 || ds === 2) && updateRate === 60 && Math.abs(fps - 60) < 2) {
			//console.info "INCORRECT DS: "+ds+ " floating = "+@floating_frame+" current = "+@current_frame
			ds = 1;
			this.state.floatingFrame = this.state.currentFrame + 1;
		}

		// Call update() multiple times if needed (catch up) (same as microstudio lines 408-412)
		// Loop from 1 to ds (inclusive), not 0 to steps-1
		for (let i = 1; i <= ds; i++) {
			this.callbacks.onUpdate();

			// Tick between updates (for threads/coroutines) (same as microstudio lines 410-412)
			if (i < ds && this.callbacks.onTick) {
				this.callbacks.onTick();
			}
		}

		// Update current frame (same as microstudio line 414)
		this.state.currentFrame += ds;

		// Call draw() once per frame (same as microstudio line 415)
		this.callbacks.onDraw();

		// Tick after draw (same as microstudio lines 416-417)
		if (this.callbacks.onTick) {
			this.callbacks.onTick();
		}

		// Watch step after draw if ds > 0 (same as microstudio lines 419-420)
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
