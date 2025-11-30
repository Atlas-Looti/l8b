/**
 * RuntimeOrchestrator - Main coordinator for all runtime components
 *
 * Manages the complete game runtime lifecycle from initialization to shutdown.
 * Coordinates between all subsystems (screen, audio, input, VM, assets).
 *
 * Responsibilities:
 * - Initialize all subsystems in correct order
 * - Coordinate startup sequence (assets -> VM -> game loop)
 * - Manage lifecycle (start/stop/resume)
 * - Provide unified API for runtime operations
 * - Handle hot reload and debugging features
 *
 * This is the ONLY file that knows about all components.
 * Other files are independent and focused on their specific domain.
 *
 * @module runtime
 */

import { ActionsService } from "@l8b/actions";
import { AudioCore } from "@l8b/audio";
import { createDiagnostic, formatForBrowser } from "@l8b/diagnostics";
import { EVMService } from "@l8b/evm";
import { HttpService } from "@l8b/http";
import { Random, Routine } from "@l8b/lootiscript";
import { Palette } from "@l8b/palette";
import { PlayerService } from "@l8b/player";
import { SceneManager } from "@l8b/scene";
import { Screen } from "@l8b/screen";
import { TimeMachine } from "@l8b/time";
import { type GlobalAPI, L8BVM, type MetaFunctions } from "@l8b/vm";
import { WalletService } from "@l8b/wallet";
import { AssetLoader, createSoundClass, Image, Map, Sprite } from "../assets";
import { SourceUpdater } from "../hot-reload";
import { InputManager } from "../input";
import { GameLoop } from "../loop";
import { System } from "../system";
import type { RuntimeDebugOptions, RuntimeListener, RuntimeOptions } from "../types";
import { ObjectPool } from "../utils/object-pool";

/**
 * RuntimeOrchestrator - Main coordinator for all runtime components
 *
 * Central hub that connects all engine subsystems (Input, Audio, Screen, VM).
 * It owns the GameLoop and manages the flow of data between the VM and the systems.
 *
 * @example
 * const runtime = new RuntimeOrchestrator({
 *   canvas: document.getElementById('game'),
 *   width: 800,
 *   height: 600,
 *   sources: { main: sourceCode }
 * });
 * await runtime.start();
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
	public player: PlayerService;
	public wallet: WalletService;
	public evm: EVMService;
	public actions: ActionsService;
	public http: HttpService;
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
	private lastInputDebug?: any;
	private lastScreenDebug?: {
		width: number;
		height: number;
		canvasWidth: number;
		canvasHeight: number;
	};
	// Frame counter for batch debug updates
	private frameCount: number = 0;
	// Debug update frequency (log every N frames)
	private readonly DEBUG_UPDATE_FREQUENCY = 10;

	constructor(options: RuntimeOptions = {}) {
		this.options = options;
		this.listener = options.listener || {};

		// Initialize core subsystems in dependency order
		// Screen must be first as other systems may need canvas context
		this.screen = new Screen({
			runtime: this,
			canvas: options.canvas,
			width: options.width || 400,
			height: options.height || 400,
		});

		// Audio system for sound and music playback
		this.audio = new AudioCore(this);

		// Input manager for keyboard, mouse, touch, and gamepad
		this.input = new InputManager(this.screen.getCanvas());

		// System API for exposing runtime state to game code
		this.system = new System(this.listener);

		// Scene manager for routing and scene lifecycle
		this.sceneManager = new SceneManager();

		// Farcaster Mini Apps integration
		this.player = new PlayerService();
		this.wallet = new WalletService();
		this.evm = new EVMService();
		this.actions = new ActionsService();
		this.http = new HttpService();

		// Asset loader for sprites, maps, sounds, and other resources
		this.assetLoader = new AssetLoader(options.url || "", options.resources || {});

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
	 * Initiates the startup sequence:
	 * 1. Load assets (images, sounds, etc.)
	 * 2. Wait for assets to be fully loaded and decoded
	 * 3. Initialize the VM and compile/execute source code
	 * 4. Start the game loop
	 *
	 * @returns {Promise<void>} Resolves when startup is complete and loop is running
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
	 *
	 * Triggers the AssetLoader to fetch and parse all resources defined in options.
	 * Populates the runtime's asset collections (sprites, maps, sounds, etc.).
	 */
	private async loadAssets(): Promise<void> {
		const collections = await this.assetLoader.loadAll();

		// Populate runtime asset collections from loader results
		this.sprites = collections.sprites;
		this.maps = collections.maps;
		this.sounds = collections.sounds;
		this.music = collections.music;
		this.assets = collections.assets;
	}

	/**
	 * Step 2: Wait for assets to be ready (with loading bar)
	 *
	 * Polls the AssetLoader status and updates the system loading screen.
	 * Blocks startup until all critical assets are usable.
	 *
	 * @returns {Promise<void>} Resolves when all assets are ready
	 */
	private async waitForAssetsReady(): Promise<void> {
		return new Promise((resolve) => {
			const checkReady = () => {
				if (this.assetLoader.isReady()) {
					this.system.setLoading(100);
					resolve();
					return;
				}

				// Update loading progress and display loading bar
				const progress = this.assetLoader.getProgress();
				this.system.setLoading(Math.floor(progress * 100));
				this.assetLoader.showLoadingBar(this.screen.getInterface());

				// Poll asset readiness on next animation frame
				requestAnimationFrame(checkReady);
			};

			checkReady();
		});
	}

	/**
	 * Convert LootiScript scene definition to JavaScript-compatible object
	 *
	 * Converts Routine objects (LootiScript functions) to JavaScript functions
	 * so they can be called from TypeScript code.
	 *
	 * @param def Scene definition object from LootiScript
	 * @returns Converted scene definition with JavaScript functions
	 */
	private convertSceneDefinition(def: any): any {
		if (!def || typeof def !== "object") {
			return def;
		}

		// Verify VM is fully initialized before converting scene definitions
		// Scene conversion requires the processor to convert Routine objects to functions
		if (!this.vm?.runner?.main_thread?.processor) {
			console.warn(`[RuntimeOrchestrator] VM not ready for scene conversion. Scene functions may not work correctly.`);
			return def;
		}

		const processor = this.vm.runner.main_thread.processor;
		const context = this.vm.context;
		const converted: any = {};

		for (const key in def) {
			const value = def[key];

			// Convert Routine objects to JavaScript functions
			if (value instanceof Routine) {
				converted[key] = processor.routineAsFunction(value, context);
			} else if (value && typeof value === "object" && !Array.isArray(value)) {
				// Recursively convert nested objects
				converted[key] = this.convertSceneDefinition(value);
			} else {
				// Copy other values as-is
				converted[key] = value;
			}
		}

		return converted;
	}

	/**
	 * Step 3: Initialize VM and execute source code
	 *
	 * Creates the L8BVM instance, sets up the global API and meta functions,
	 * and executes the initial source code or pre-compiled routines.
	 * Also handles hot-reload setup and time machine initialization.
	 *
	 * @throws {Error} If VM initialization or script execution fails
	 */
	private initializeVM(): void {
		this.logStep("vm: building meta/global APIs");
		// Setup meta functions - built-in functions available to LootiScript code
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

		// Setup global API - these objects/functions are available to all LootiScript code
		// This is the bridge between the runtime and the game code
		const inputStates = this.input.getStates();
		const global: Partial<GlobalAPI> & {
			ObjectPool: typeof ObjectPool;
			Palette: typeof Palette;
		} = {
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
				// Convert Routine objects to JavaScript functions before registering
				// Note: this.vm is available because scene() is called after VM creation
				const convertedDef = this.convertSceneDefinition(def);
				this.sceneManager.registerScene(name, convertedDef);
			},
			route: (path: string, sceneName: string) => this.sceneManager.registerRoute(path, sceneName),
			router: this.sceneManager.router.getInterface(),
			// Dynamic asset constructors - allow creating assets at runtime
			// These wrap the core package constructors for use in LootiScript
			Image: Image,
			Sprite: Sprite,
			Map: Map,
			Sound: createSoundClass(this.audio),
			Palette: Palette,
			Random: Random,
			ObjectPool: ObjectPool,
			// Farcaster Mini Apps APIs
			player: this.player.getInterface(),
			wallet: this.wallet.getInterface(),
			evm: this.evm.getInterface(),
			actions: this.actions.getInterface(),
			// HTTP client for external APIs
			http: this.http.getInterface(),
		};

		// Initialize VM with meta functions and global API
		// The VM executes compiled LootiScript bytecode
		this.vm = new L8BVM(meta, global, this.options.namespace || "/l8b", this.options.preserveStorage || false);

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

		// Load pre-compiled routines (production) or source files (development)
		const compiledRoutines = this.options.compiledRoutines || {};
		const sources = this.options.sources || {};

		if (Object.keys(compiledRoutines).length > 0) {
			// Production: Load pre-compiled routines
			this.logStep("vm: loading compiled routines", {
				files: Object.keys(compiledRoutines),
			});
			for (const [file, routine] of Object.entries(compiledRoutines)) {
				try {
					this.vm.loadRoutine(routine, file);
				} catch (err: any) {
					this.reportError({
						error: err.message || String(err),
						type: "compile",
						stack: err.stack,
						file,
					});
					this.logStep("vm: routine load error", {
						file,
						message: err?.message || String(err),
					});
				}
			}
		} else if (Object.keys(sources).length > 0) {
			// Development: Compile and execute source files
			this.logStep("vm: executing sources", {
				files: Object.keys(sources),
			});
			for (const [file, src] of Object.entries(sources)) {
				this.sourceUpdater.updateSource(file, src, false);
			}
		} else {
			this.logStep("vm: no sources or compiled routines provided");
		}

		// Call init() if it exists
		// This allows user code to do setup, but routes should already be registered
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

		// Initialize router to handle initial URL
		// This must be called after routes are registered (from source execution)
		// but before the game loop starts, so the correct scene is active from the start
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

		// Notify listener that runtime startup is complete
		if (this.listener.postMessage) {
			this.listener.postMessage({
				name: "started",
			});
		}
	}

	/**
	 * Step 4: Start game loop
	 *
	 * Creates and starts the GameLoop instance.
	 * Binds update, draw, and tick handlers to the loop.
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
	 *
	 * Executed once per logic frame (fixed timestep).
	 * 1. Updates input state
	 * 2. Runs debug checks
	 * 3. Calls the VM's `update()` function
	 * 4. Handles any runtime errors
	 */
	private handleUpdate(): void {
		if (!this.vm) return;

		this.frameCount++;

		// Poll input devices and update their state
		this.input.update();

		// Batch debug updates to reduce console spam (only log every N frames)
		if (this.frameCount % this.DEBUG_UPDATE_FREQUENCY === 0) {
			this.debugInputs();
			this.debugScreen();
		}

		// Update system FPS metric for game code access
		if (this.gameLoop) {
			this.system.setFPS(this.gameLoop.getFPS());
		}

		try {
			// Update scene manager (priority) - scenes handle their own update logic
			if (this.sceneManager.hasActiveScene()) {
				this.sceneManager.update();
			} else {
				// Fallback: Call user's update() function when no scene is active
				this.vm.call("update");
			}

			// Report any errors that occurred during update
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

	/**
	 * Debug input state
	 *
	 * Logs input state to console if debug options are enabled.
	 * Uses shallow comparison to avoid spamming console with identical states.
	 *
	 * @remarks
	 * Performance sensitive: only runs if debug.input is true.
	 */
	private debugInputs(): void {
		if (!this.options.debug?.input) {
			return;
		}
		const snapshot = this.createInputSnapshot();
		if (!snapshot) {
			return;
		}

		// Optimization: Shallow compare instead of JSON.stringify
		if (this.lastInputDebug && this.shallowEqual(snapshot, this.lastInputDebug)) {
			return;
		}
		this.lastInputDebug = snapshot;
		console.debug("[@l8b/runtime][input]", snapshot);
	}

	/**
	 * Debug screen metrics
	 *
	 * Logs screen and canvas dimensions if debug options are enabled.
	 * Useful for debugging scaling and resizing issues.
	 */
	private debugScreen(): void {
		if (!this.options.debug?.screen) {
			return;
		}
		const canvas = this.screen.getCanvas();
		const current = {
			width: this.screen.width,
			height: this.screen.height,
			canvasWidth: canvas.width,
			canvasHeight: canvas.height,
		};

		// Optimization: Shallow compare key metrics
		if (
			this.lastScreenDebug &&
			current.width === this.lastScreenDebug.width &&
			current.height === this.lastScreenDebug.height &&
			current.canvasWidth === this.lastScreenDebug.canvasWidth &&
			current.canvasHeight === this.lastScreenDebug.canvasHeight
		) {
			return;
		}
		this.lastScreenDebug = current;
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

	/**
	 * Shallow comparison of two objects
	 *
	 * Used for optimization in debug logging to detect state changes.
	 * Only compares top-level keys and one level of nested objects.
	 * Optimized to avoid deep recursion and reduce allocations.
	 *
	 * @param {any} obj1 - First object
	 * @param {any} obj2 - Second object
	 * @returns {boolean} True if objects are shallowly equal
	 */
	private shallowEqual(obj1: any, obj2: any): boolean {
		if (obj1 === obj2) return true;
		if (!obj1 || !obj2 || typeof obj1 !== "object" || typeof obj2 !== "object") return false;

		const keys1 = Object.keys(obj1);
		const keys2 = Object.keys(obj2);
		if (keys1.length !== keys2.length) return false;

		// Optimized: only check one level deep, avoid recursion for performance
		for (const key of keys1) {
			const val1 = obj1[key];
			const val2 = obj2[key];

			// Fast path for primitives
			if (val1 === val2) continue;

			// Handle null/undefined
			if (val1 == null || val2 == null) {
				if (val1 !== val2) return false;
				continue;
			}

			// Only one level of nesting for performance
			if (typeof val1 === "object" && typeof val2 === "object") {
				// Quick check: same keys?
				const keys1Nested = Object.keys(val1);
				const keys2Nested = Object.keys(val2);
				if (keys1Nested.length !== keys2Nested.length) return false;

				// Compare values (only one level deep)
				for (const nestedKey of keys1Nested) {
					if (val1[nestedKey] !== val2[nestedKey]) return false;
				}
			} else {
				return false;
			}
		}
		return true;
	}

	/**
	 * Create a snapshot of current input state
	 *
	 * Extracts relevant input data based on enabled debug channels.
	 * Used for debug logging and time machine recording.
	 *
	 * @returns {object|null} Snapshot object or null if no channels enabled
	 */
	private createInputSnapshot(): {
		keyboard?: any;
		mouse?: any;
		touch?: any;
		gamepad?: any;
	} | null {
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
			return setting ? ["keyboard", "mouse", "touch", "gamepad"] : [];
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
			// Draw scene manager (priority) - scenes handle their own rendering
			if (this.sceneManager.hasActiveScene()) {
				this.sceneManager.draw();
			} else {
				// Fallback: Call user's draw() function when no scene is active
				this.vm.call("draw");
			}

			// Report any errors that occurred during draw
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

		// Time machine step after draw completes (captures frame state for debugging)
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
	 * Format error message with enhanced information
	 *
	 * Enhances error objects with diagnostic information including error codes,
	 * context, suggestions, and formatted messages for better error reporting.
	 */
	private formatError(error: any): any {
		// If error already has enhanced info, return as-is
		if (error.code || error.context || error.suggestions) {
			return error;
		}

		// Use diagnostics package to format error
		const code = error.code || "E2005"; // Default to invalid operation
		const diagnostic = createDiagnostic(code, {
			file: error.file,
			line: error.line,
			column: error.column,
			context: error.context,
			suggestions: error.suggestions,
			related: error.related,
			stackTrace: error.stackTrace,
			data: {
				error: error.error || error.message,
			},
		});

		// Format for browser using diagnostics formatter
		const formattedMessage = formatForBrowser(diagnostic);

		// Enhance error with formatted diagnostic information
		const formatted: any = {
			...error,
			...diagnostic,
			formatted: formattedMessage,
		};

		return formatted;
	}

	/**
	 * Report error to listener with enhanced formatting
	 */
	private reportError(error: any): void {
		if (this.listener.reportError) {
			const formatted = this.formatError(error);
			this.listener.reportError(formatted);
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
				const serialized = payload === undefined ? "" : ` ${JSON.stringify(payload)}`;
				this.listener.log(`${prefix} ${message}${serialized}`);
			} catch {
				this.listener.log(`${prefix} ${message}`);
			}
		}
	}
}
