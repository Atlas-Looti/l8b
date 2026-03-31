/**
 * RuntimeOrchestrator - Main coordinator for all runtime components
 *
 * Manages the complete game runtime lifecycle from initialization to shutdown.
 * Coordinates between all subsystems (screen, audio, input, VM, assets).
 *
 * This is the ONLY file that knows about all components.
 * Other files are independent and focused on their specific domain.
 *
 * @module runtime
 */

import { AudioCore } from "@l8b/audio";
import { Palette } from "@l8b/palette";
import { SceneManager } from "@l8b/scene";
import { Screen } from "@l8b/screen";
import { TimeMachine } from "@l8b/time";
import { type GlobalAPI, L8BVM, type MetaFunctions, Random, Routine } from "@l8b/vm";
import { AssetLoader, createSoundClass, Image, Map, Sprite } from "../assets";
import { SourceUpdater } from "../hot-reload";
import { InputManager } from "../input";
import { GameLoop } from "../loop";
import { System } from "../system";
import type { RuntimeListener, RuntimeOptions as BaseRuntimeOptions } from "../types";
import { ObjectPool } from "../utils/object-pool";
import { DebugLogger } from "./debug-logger";
import { reportError, reportWarnings } from "./error-handler";

// Extend RuntimeOptions
export interface RuntimeOptions extends BaseRuntimeOptions {}

/**
 * RuntimeOrchestrator - Main coordinator for all runtime components
 *
 * Central hub that connects all engine subsystems (Input, Audio, Screen, VM).
 * It owns the GameLoop and manages the flow of data between the VM and the systems.
 */
export class RuntimeOrchestrator {
	// Configuration
	private options: RuntimeOptions;
	private listener: RuntimeListener;

	// Core subsystems
	public screen: Screen;
	public audio: AudioCore;
	public input: InputManager;
	public system: System;
	public sceneManager: SceneManager;
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
	private debugLogger = new DebugLogger();
	private frameCount: number = 0;
	private readonly DEBUG_UPDATE_FREQUENCY = 10;

	constructor(options: RuntimeOptions = {}) {
		this.options = options;
		this.listener = options.listener || {};

		this.screen = new Screen({
			runtime: this,
			canvas: options.canvas,
			width: options.width || 400,
			height: options.height || 400,
		});

		this.audio = new AudioCore(this);
		this.input = new InputManager(this.screen.getCanvas());
		this.system = new System(this.listener);
		this.sceneManager = new SceneManager();
		this.assetLoader = new AssetLoader(options.url || "", options.resources || {}, this.audio);

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
	 *
	 * Sequence: load assets → wait ready → init VM → start game loop
	 */
	async start(): Promise<void> {
		this.logStep("startup: begin");

		this.logStep("startup: loading assets");
		await this.loadAssets();
		this.logStep("startup: assets loaded", {
			sprites: Object.keys(this.sprites).length,
			maps: Object.keys(this.maps).length,
			sounds: Object.keys(this.sounds).length,
			music: Object.keys(this.music).length,
			assets: Object.keys(this.assets).length,
		});

		this.logStep("startup: waiting for asset readiness");
		await this.waitForAssetsReady();
		this.logStep("startup: assets ready");

		this.logStep("startup: initializing VM");
		this.initializeVM();
		this.logStep("startup: VM ready", {
			sourceFiles: Object.keys(this.options.sources || {}).length,
		});

		this.logStep("startup: starting game loop");
		this.startGameLoop();
		this.logStep("startup: completed");
	}

	/**
	 * Step 1: Load assets
	 */
	private async loadAssets(): Promise<void> {
		const collections = await this.assetLoader.loadAll();
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
				const progress = this.assetLoader.getProgress();
				this.system.setLoading(Math.floor(progress * 100));
				this.assetLoader.showLoadingBar(this.screen.getInterface());
				requestAnimationFrame(checkReady);
			};
			checkReady();
		});
	}

	/**
	 * Convert LootiScript scene definition to JavaScript-compatible object
	 */
	private convertSceneDefinition(def: any): any {
		if (!def || typeof def !== "object") return def;

		if (!this.vm?.runner?.main_thread?.processor) {
			console.warn(`[RuntimeOrchestrator] VM not ready for scene conversion. Scene functions may not work correctly.`);
			return def;
		}

		const processor = this.vm.runner.main_thread.processor;
		const context = this.vm.context;
		const converted: any = {};

		for (const key in def) {
			const value = def[key];
			if (value instanceof Routine) {
				converted[key] = processor.routineAsFunction(value, context);
			} else if (value && typeof value === "object" && !Array.isArray(value)) {
				converted[key] = this.convertSceneDefinition(value);
			} else {
				converted[key] = value;
			}
		}

		return converted;
	}

	/**
	 * Step 3: Initialize VM and execute source code
	 */
	private initializeVM(): void {
		this.logStep("vm: building meta/global APIs");

		const meta: Partial<MetaFunctions> = {
			print: (text: any) => {
				if ((typeof text === "object" || typeof text === "function") && this.vm) {
					text = this.vm.toString(text);
				}
				if (this.listener.log) {
					this.listener.log(String(text));
				} else {
					console.log(text);
				}
			},
		};

		const inputStates = this.input.getStates();
		const global = {
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
			scene: (name: string, def: any) => {
				const convertedDef = this.convertSceneDefinition(def);
				this.sceneManager.registerScene(name, convertedDef);
			},
			route: (path: string, sceneName: string) => this.sceneManager.registerRoute(path, sceneName),
			router: this.sceneManager.router.getInterface(),
			Image: Image,
			Sprite: Sprite,
			Map: Map,
			Sound: createSoundClass(this.audio),
			Palette: Palette,
			Random: Random,
			ObjectPool: ObjectPool,
		} as Partial<GlobalAPI> & {
			ObjectPool: typeof ObjectPool;
			Palette: typeof Palette;
		};

		this.vm = new L8BVM(meta, global, this.options.namespace || "/l8b", this.options.preserveStorage || false);

		this.sourceUpdater = new SourceUpdater(this.vm, this.listener, this.audio, this.screen, () =>
			reportWarnings(this.vm, this.listener),
		);

		this.timeMachine = new TimeMachine(this as any);

		if (this.listener.postMessage) {
			this.timeMachine.onStatus((status: any) => {
				this.listener.postMessage?.({ name: "time_machine_status", status });
			});
		}

		// Load pre-compiled routines (production) or source files (development)
		const compiledRoutines = this.options.compiledRoutines || {};
		const sources = this.options.sources || {};

		if (Object.keys(compiledRoutines).length > 0) {
			this.logStep("vm: loading compiled routines", { files: Object.keys(compiledRoutines) });
			for (const [file, routine] of Object.entries(compiledRoutines)) {
				try {
					this.vm.loadRoutine(routine, file);
				} catch (err: any) {
					reportError(this.listener, {
						error: err.message || String(err),
						type: "compile",
						stack: err.stack,
						file,
					});
					this.logStep("vm: routine load error", { file, message: err?.message || String(err) });
				}
			}
		} else if (Object.keys(sources).length > 0) {
			this.logStep("vm: executing sources", { files: Object.keys(sources) });
			for (const [file, src] of Object.entries(sources)) {
				this.sourceUpdater.updateSource(file, src, false);
			}
		} else {
			this.logStep("vm: no sources or compiled routines provided");
		}

		// Call init()
		try {
			this.vm.call("init");
			this.logStep("vm: init() executed");
		} catch (err: any) {
			reportError(this.listener, {
				error: err.message || String(err),
				type: "init",
				stack: err.stack,
			});
			this.logStep("vm: init() error", { message: err?.message || String(err) });
		}

		// Initialize router
		const registeredScenes = this.sceneManager.registry.getNames();
		this.logStep("router: initializing", {
			registeredScenes: registeredScenes.length,
			sceneNames: registeredScenes,
		});
		this.sceneManager.router.init();
		const activeScene = this.sceneManager.hasActiveScene()
			? (this.sceneManager as any).getCurrentSceneName?.() || "unknown"
			: null;
		const routerState = this.sceneManager.router.getState();
		this.logStep("router: initialized", {
			activeScene: activeScene || "none",
			path: routerState.path,
			hasActiveScene: this.sceneManager.hasActiveScene(),
		});

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
			onWatchStep: () => this.handleWatchStep(),
			getUpdateRate: () => {
				if (!this.vm) return undefined;
				try {
					return this.vm.context?.global?.system?.update_rate;
				} catch {
					return undefined;
				}
			},
			setFPS: (fps: number) => {
				if (!this.vm) return;
				try {
					if (this.vm.context?.global?.system) {
						this.vm.context.global.system.fps = fps;
					}
				} catch {}
			},
		});

		this.gameLoop.start();
		this.logStep("loop: started");
	}

	/**
	 * Update game loop update rate from VM context
	 */
	private updateGameLoopUpdateRate(): void {
		if (!this.vm || !this.gameLoop) return;
		try {
			const updateRate = this.vm.context?.global?.system?.update_rate;
			if (updateRate != null && updateRate > 0 && Number.isFinite(updateRate)) {
				this.gameLoop.setUpdateRate(updateRate);
			} else {
				this.gameLoop.setUpdateRate(60);
			}
		} catch {}
	}

	/**
	 * Handle update callback from game loop
	 */
	private handleUpdate(): void {
		if (!this.vm) return;

		this.frameCount++;
		this.input.update();

		if (this.frameCount % this.DEBUG_UPDATE_FREQUENCY === 0) {
			this.debugLogger.debugInputs(this.input, this.options.debug);
			this.debugLogger.debugScreen(this.screen, this.options.debug);
		}

		if (this.gameLoop) {
			this.system.setFPS(this.gameLoop.getFPS());
			this.updateGameLoopUpdateRate();
		}

		try {
			if (this.sceneManager.hasActiveScene()) {
				this.sceneManager.update();
			} else {
				this.vm.call("update");
			}

			if (this.vm.error_info) {
				const err: any = Object.assign({}, this.vm.error_info);
				err.type = "update";
				reportError(this.listener, err);
			}
		} catch (err: any) {
			reportError(this.listener, {
				error: err.message || String(err),
				type: "update",
				stack: err.stack,
			});
		}
	}

	/**
	 * Handle draw callback from game loop
	 */
	private handleDraw(): void {
		if (!this.vm) return;

		try {
			this.screen.initDraw();
			this.screen.updateInterface();

			if (this.sceneManager.hasActiveScene()) {
				this.sceneManager.draw();
			} else {
				this.vm.call("draw");
			}

			reportWarnings(this.vm, this.listener);

			if (this.vm.error_info) {
				const err: any = Object.assign({}, this.vm.error_info);
				err.type = "draw";
				reportError(this.listener, err);
			}
		} catch (err: any) {
			reportError(this.listener, {
				error: err.message || String(err),
				type: "draw",
				stack: err.stack,
			});
		}

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
	 * Handle watch step callback (for debugging)
	 */
	private handleWatchStep(): void {}

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
			if (callback) callback(result);
		} catch (err: any) {
			if (callback) callback(`Error: ${err.message || String(err)}`);
		}
	}

	private logStep(message: string, payload?: unknown): void {
		if (!this.options.debug?.lifecycle) return;

		const prefix = "[@l8b/runtime][lifecycle]";
		if (payload !== undefined) {
			console.info(`${prefix} ${message}`, payload);
		} else {
			console.info(`${prefix} ${message}`);
		}

		if (this.listener.log) {
			try {
				const serialized = payload === undefined ? "" : ` ${JSON.stringify(payload)}`;
				this.listener.log(`${prefix} ${message}${serialized}`);
			} catch {
				this.listener.log(`${prefix} ${message}`);
			}
		}
	}
}
