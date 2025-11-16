/**
 * RuntimeOrchestrator - Main coordinator for all runtime components
 *
 * Responsibilities:
 * - Initialize all subsystems
 * - Coordinate startup sequence
 * - Manage lifecycle (start/stop/resume)
 * - Provide unified API
 *
 * This is the ONLY file that knows about all components.
 * Other files are independent and focused.
 */

import { AudioCore } from "@l8b/audio";
import { Random } from "@l8b/lootiscript";
import { Screen } from "@l8b/screen";
import { TimeMachine } from "@l8b/time";
import {
	AssetLoader,
	Image,
	Map,
	Sprite,
	createSoundClass,
} from "../assets";
import { SourceUpdater } from "../hot-reload";
import { InputManager } from "../input";
import { GameLoop } from "../loop";
import { System } from "../system";
import type {
	GlobalAPI,
	MetaFunctions,
	RuntimeDebugOptions,
	RuntimeListener,
	RuntimeOptions,
} from "../types";
import { L8BVM } from "../vm";

export class RuntimeOrchestrator {
	// Configuration
	private options: RuntimeOptions;
	private listener: RuntimeListener;

	// Core subsystems
	public screen: Screen;
	public audio: AudioCore;
	public input: InputManager;
	public system: System;
	public vm: L8BVM | null = null;

	// Asset collections (populated by AssetLoader)
	public sprites: Record<string, any> = {};
	public maps: Record<string, any> = {};
	public sounds: Record<string, any> = {};
	public music: Record<string, any> = {};
	public assets: Record<string, any> = {};

	// Internal components
	private assetLoader: AssetLoader;
	private gameLoop: GameLoop | null = null;
	private sourceUpdater: SourceUpdater | null = null;
	public timeMachine: TimeMachine | null = null;
	private lastInputDebug?: string;
	private lastScreenDebug?: string;

	constructor(options: RuntimeOptions = {}) {
		this.options = options;
		this.listener = options.listener || {};

		// Initialize screen
		this.screen = new Screen({
			runtime: this,
			canvas: options.canvas,
			width: options.width || 400,
			height: options.height || 400,
		});

		// Initialize audio
		this.audio = new AudioCore(this);

		// Initialize input
		this.input = new InputManager(this.screen.getCanvas());

		// Initialize system
		this.system = new System(this.listener);

		// Initialize asset loader
		this.assetLoader = new AssetLoader(
			options.url || "",
			options.resources || {},
		);

		this.logStep("RuntimeOrchestrator constructed", {
			width: this.screen.width,
			height: this.screen.height,
			resources: {
				images: options.resources?.images?.length ?? 0,
				sounds: options.resources?.sounds?.length ?? 0,
				music: options.resources?.music?.length ?? 0,
			},
		});
	}

	/**
	 * Start the runtime
	 */
	async start(): Promise<void> {
		this.logStep("startup: begin");
		this.logStep("startup: loading assets");
		// Step 1: Load assets
		await this.loadAssets();

		this.logStep("startup: assets loaded", {
			sprites: Object.keys(this.sprites).length,
			maps: Object.keys(this.maps).length,
			sounds: Object.keys(this.sounds).length,
			music: Object.keys(this.music).length,
			assets: Object.keys(this.assets).length,
		});

		this.logStep("startup: waiting for asset readiness");
		// Step 2: Wait for assets to be ready
		await this.waitForAssetsReady();
		this.logStep("startup: assets ready");

		this.logStep("startup: initializing VM");
		// Step 3: Initialize VM and execute code
		this.initializeVM();
		this.logStep("startup: VM ready", {
			sourceFiles: Object.keys(this.options.sources || {}).length,
		});

		this.logStep("startup: starting game loop");
		// Step 4: Start game loop
		this.startGameLoop();
		this.logStep("startup: completed");
	}

	/**
	 * Step 1: Load all assets
	 */
	private async loadAssets(): Promise<void> {
		const collections = await this.assetLoader.loadAll();

		// Assign to runtime
		this.sprites = collections.sprites;
		this.maps = collections.maps;
		this.sounds = collections.sounds;
		this.music = collections.music;
		this.assets = collections.assets;
	}

	/**
	 * Step 2: Wait for assets to be ready (with loading bar)
	 */
	private async waitForAssetsReady(): Promise<void> {
		return new Promise((resolve) => {
			const checkReady = () => {
				if (this.assetLoader.isReady()) {
					this.system.setLoading(100);
					resolve();
					return;
				}

				// Update loading progress
				const progress = this.assetLoader.getProgress();
				this.system.setLoading(Math.floor(progress * 100));

				// Show loading bar
				this.assetLoader.showLoadingBar(this.screen.getInterface());

				// Check again next frame
				requestAnimationFrame(checkReady);
			};

			checkReady();
		});
	}

	/**
	 * Step 3: Initialize VM and execute source code
	 */
	private initializeVM(): void {
		this.logStep("vm: building meta/global APIs");
		// Setup meta functions
		const meta: Partial<MetaFunctions> = {
			print: (text: any) => {
				if (
					(typeof text === "object" || typeof text === "function") &&
					this.vm
				) {
					text = this.vm.toString(text);
				}
				if (this.listener.log) {
					this.listener.log(String(text));
				} else {
					console.log(text);
				}
			},
		};

		// Setup global API
		const inputStates = this.input.getStates();
		const global: Partial<GlobalAPI> = {
			screen: this.screen.getInterface(),
			audio: this.audio.getInterface(),
			keyboard: inputStates.keyboard,
			mouse: inputStates.mouse,
			touch: inputStates.touch,
			gamepad: inputStates.gamepad,
			sprites: this.sprites,
			maps: this.maps,
			sounds: this.sounds,
			music: this.music,
			assets: this.assets,
			system: this.system.getAPI(),
			// Dynamic asset constructors
			Image: Image,
			Sprite: Sprite,
			Map: Map,
			Sound: createSoundClass(this.audio),
			Random: Random,
		};

		// Create VM
		this.vm = new L8BVM(
			meta,
			global,
			this.options.namespace || "/l8b",
			this.options.preserveStorage || false,
		);

		// Create source updater for hot reload
		this.sourceUpdater = new SourceUpdater(this.vm, this.listener);

		// Create time machine for debugging
		this.timeMachine = new TimeMachine(this as any);

		// Setup time machine status callback
		if (this.listener.postMessage) {
			this.timeMachine.onStatus((status: any) => {
				this.listener.postMessage?.({
					name: "time_machine_status",
					status,
				});
			});
		}

		// Execute all source files
		const sources = this.options.sources || {};
		if (Object.keys(sources).length > 0) {
			this.logStep("vm: executing sources", {
				files: Object.keys(sources),
			});
		} else {
			this.logStep("vm: no sources provided");
		}
		for (const [file, src] of Object.entries(sources)) {
			this.sourceUpdater.updateSource(file, src, false);
		}

		// Call init() if it exists
		try {
			this.vm.call("init");
			this.logStep("vm: init() executed");
		} catch (err: any) {
			this.reportError({
				error: err.message || String(err),
				type: "init",
				stack: err.stack,
			});
			this.logStep("vm: init() error", {
				message: err?.message || String(err),
			});
		}

		// Notify listener
		if (this.listener.postMessage) {
			this.listener.postMessage({ name: "started" });
		}
	}

	/**
	 * Step 4: Start game loop
	 */
	private startGameLoop(): void {
		this.logStep("loop: creating game loop");
		this.gameLoop = new GameLoop({
			onUpdate: () => this.handleUpdate(),
			onDraw: () => this.handleDraw(),
			onTick: () => this.handleTick(),
		});

		this.gameLoop.start();
		this.logStep("loop: started");
	}

	/**
	 * Handle update callback from game loop
	 */
	private handleUpdate(): void {
		if (!this.vm) return;

		// Update input state
		this.input.update();
		this.debugInputs();
		this.debugScreen();

		// Update system FPS
		if (this.gameLoop) {
			this.system.setFPS(this.gameLoop.getFPS());
		}

		try {
			// Call user's update() function
			this.vm.call("update");

			// Check for errors
			if (this.vm.error_info) {
				const err: any = Object.assign({}, this.vm.error_info);
				err.type = "update";
				this.reportError(err);
			}
		} catch (err: any) {
			this.reportError({
				error: err.message || String(err),
				type: "update",
				stack: err.stack,
			});
		}
	}

	private debugInputs(): void {
		if (!this.options.debug?.input) {
			return;
		}
		const snapshot = this.createInputSnapshot();
		if (!snapshot) {
			return;
		}
		const serialized = JSON.stringify(snapshot);
		if (serialized === this.lastInputDebug) {
			return;
		}
		this.lastInputDebug = serialized;
		console.debug("[@l8b/runtime][input]", snapshot);
	}

	private debugScreen(): void {
		if (!this.options.debug?.screen) {
			return;
		}
		const canvas = this.screen.getCanvas();
		const snapshot = JSON.stringify({
			width: this.screen.width,
			height: this.screen.height,
			canvasWidth: canvas.width,
			canvasHeight: canvas.height,
			clientWidth: canvas.clientWidth,
			clientHeight: canvas.clientHeight,
			styleWidth: canvas.style.width,
			styleHeight: canvas.style.height,
		});
		if (snapshot === this.lastScreenDebug) {
			return;
		}
		this.lastScreenDebug = snapshot;
		console.debug("[@l8b/runtime][screen]", {
			screen: {
				width: this.screen.width,
				height: this.screen.height,
			},
			canvas: {
				width: canvas.width,
				height: canvas.height,
				clientWidth: canvas.clientWidth,
				clientHeight: canvas.clientHeight,
				style: {
					width: canvas.style.width,
					height: canvas.style.height,
				},
			},
		});
	}

	private createInputSnapshot():
		| {
				keyboard?: any;
				mouse?: any;
				touch?: any;
				gamepad?: any;
		  }
		| null {
		const inputDebug = this.options.debug?.input;
		if (!inputDebug) {
			return null;
		}
		const enabledChannels = this.getEnabledInputChannels(inputDebug);
		if (enabledChannels.length === 0) {
			return null;
		}

		const states = this.input.getStates();
		const snapshot: {
			keyboard?: any;
			mouse?: any;
			touch?: any;
			gamepad?: any;
		} = {};

		if (enabledChannels.includes("touch")) {
			snapshot.touch = {
				touching: states.touch.touching,
				press: states.touch.press,
				release: states.touch.release,
				x: Number(states.touch.x?.toFixed?.(2) ?? states.touch.x),
				y: Number(states.touch.y?.toFixed?.(2) ?? states.touch.y),
				count: states.touch.touches?.length ?? 0,
			};
		}

		if (enabledChannels.includes("mouse")) {
			snapshot.mouse = {
				pressed: states.mouse.pressed,
				left: states.mouse.left,
				x: Number(states.mouse.x?.toFixed?.(2) ?? states.mouse.x),
				y: Number(states.mouse.y?.toFixed?.(2) ?? states.mouse.y),
				wheel: states.mouse.wheel,
			};
		}

		if (enabledChannels.includes("keyboard")) {
			snapshot.keyboard = {
				UP: states.keyboard.UP,
				DOWN: states.keyboard.DOWN,
				LEFT: states.keyboard.LEFT,
				RIGHT: states.keyboard.RIGHT,
				press: states.keyboard.press,
				release: states.keyboard.release,
			};
		}

		if (enabledChannels.includes("gamepad")) {
			snapshot.gamepad = {
				count: this.input.gamepad.count,
				A: states.gamepad.A,
				B: states.gamepad.B,
				UP: states.gamepad.UP,
				DOWN: states.gamepad.DOWN,
				LEFT: states.gamepad.LEFT,
				RIGHT: states.gamepad.RIGHT,
			};
		}

		return Object.keys(snapshot).length === 0 ? null : snapshot;
	}

	private getEnabledInputChannels(
		setting: NonNullable<RuntimeDebugOptions["input"]>,
	): Array<"keyboard" | "mouse" | "touch" | "gamepad"> {
		if (typeof setting === "boolean") {
			return setting
				? ["keyboard", "mouse", "touch", "gamepad"]
				: [];
		}
		const channels: Array<"keyboard" | "mouse" | "touch" | "gamepad"> = [];
		if (setting.keyboard) channels.push("keyboard");
		if (setting.mouse) channels.push("mouse");
		if (setting.touch) channels.push("touch");
		if (setting.gamepad) channels.push("gamepad");
		return channels;
	}

	/**
	 * Handle draw callback from game loop
	 */
	private handleDraw(): void {
		if (!this.vm) return;

		try {
			// Call user's draw() function
			this.vm.call("draw");

			// Check for errors
			if (this.vm.error_info) {
				const err: any = Object.assign({}, this.vm.error_info);
				err.type = "draw";
				this.reportError(err);
			}
		} catch (err: any) {
			this.reportError({
				error: err.message || String(err),
				type: "draw",
				stack: err.stack,
			});
		}

		// Time machine step (after draw)
		if (this.timeMachine) {
			this.timeMachine.step();
		}
	}

	/**
	 * Handle tick callback (for threads/coroutines)
	 */
	private handleTick(): void {
		if (this.vm?.runner) {
			(this.vm.runner as any).tick?.();
		}
	}

	/**
	 * Update call (for time machine)
	 */
	updateCall(): void {
		this.handleUpdate();
	}

	/**
	 * Draw call (for time machine)
	 */
	drawCall(): void {
		this.handleDraw();
	}

	/**
	 * Update source code (hot reload)
	 */
	updateSource(file: string, src: string, reinit = false): boolean {
		if (!this.sourceUpdater) return false;
		return this.sourceUpdater.updateSource(file, src, reinit);
	}

	/**
	 * Handle incoming messages (including time machine commands)
	 */
	handleMessage(message: any): void {
		if (message.name === "time_machine" && this.timeMachine) {
			this.timeMachine.messageReceived(message);
		}
	}

	/**
	 * Stop runtime
	 */
	stop(): void {
		this.logStep("lifecycle: stop requested");
		this.gameLoop?.stop();
	}

	/**
	 * Resume runtime
	 */
	resume(): void {
		this.logStep("lifecycle: resume requested");
		this.gameLoop?.resume();
	}

	/**
	 * Get canvas element
	 */
	getCanvas(): HTMLCanvasElement {
		return this.screen.getCanvas();
	}

	/**
	 * Run command (for console)
	 */
	runCommand(command: string, callback?: (result: any) => void): void {
		if (!this.vm) return;

		try {
			const result = this.vm.run(command, 3000, "console");
			if (callback) {
				callback(result);
			}
		} catch (err: any) {
			if (callback) {
				callback(`Error: ${err.message || String(err)}`);
			}
		}
	}

	/**
	 * Report error to listener
	 */
	private reportError(error: any): void {
		if (this.listener.reportError) {
			this.listener.reportError(error);
		}
	}

	private logStep(message: string, payload?: unknown): void {
		if (!this.options.debug?.lifecycle) {
			return;
		}
		const prefix = "[@l8b/runtime][lifecycle]";
		if (payload !== undefined) {
			console.info(`${prefix} ${message}`, payload);
		} else {
			console.info(`${prefix} ${message}`);
		}

		if (this.listener.log) {
			try {
				const serialized =
					payload === undefined
						? ""
						: ` ${JSON.stringify(payload)}`;
				this.listener.log(`${prefix} ${message}${serialized}`);
			} catch {
				this.listener.log(`${prefix} ${message}`);
			}
		}
	}
}
