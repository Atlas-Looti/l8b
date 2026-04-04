import { AudioCore } from "@al8b/audio";
import { PlayerService } from "@al8b/player";
import { SceneManager } from "@al8b/scene";
import { Screen } from "@al8b/screen";
import { TimeMachine } from "@al8b/time";
import { L8BVM } from "@al8b/vm";
import { AssetLoader } from "../assets";
import { SourceUpdater } from "../hot-reload";
import { InputManager } from "../input";
import { GameLoop } from "../loop";
import { System } from "../system";
import type { RuntimeListener, RuntimeOptions } from "../types";
import { DebugLogger } from "./debug-logger";
import { reportError, reportWarnings } from "./error-handler";
import { RuntimeAssetsRegistry } from "./assets-registry";
import { createRuntimeGlobalApi, createRuntimeMeta } from "./api-factory";

export interface RuntimeController {
	readonly screen: Screen;
	readonly audio: AudioCore;
	readonly input: InputManager;
	readonly system: System;
	readonly playerService: PlayerService;
	readonly sceneManager: SceneManager;
	readonly vm: L8BVM | null;
	readonly timeMachine: TimeMachine | null;
	readonly time_machine: TimeMachine | null;
	readonly sprites: Record<string, any>;
	readonly maps: Record<string, any>;
	readonly sounds: Record<string, any>;
	readonly music: Record<string, any>;
	readonly assets: Record<string, any>;
	readonly stopped: boolean;
	start(): Promise<void>;
	stop(): void;
	resume(): void;
	updateSource(file: string, src: string, reinit?: boolean): boolean;
	handleMessage(message: any): void;
	runCommand(command: string, callback?: (result: any) => void): void;
	getCanvas(): HTMLCanvasElement;
	updateCall(): void;
	drawCall(): void;
	stepForward(): void;
	watch(list: unknown[]): void;
	stopWatching(): void;
	updateSprite(name: string, version: number, data: unknown, properties?: unknown): boolean;
	updateMap(name: string, version: number, data: unknown): boolean;
}

export function createRuntime(options: RuntimeOptions = {}): RuntimeController {
	return new RuntimeControllerImpl(options);
}

export class RuntimeControllerImpl implements RuntimeController {
	private readonly options: RuntimeOptions;
	private readonly listener: RuntimeListener;
	private readonly assetRegistry = new RuntimeAssetsRegistry();
	private readonly assetLoader: AssetLoader;
	private readonly debugLogger = new DebugLogger();
	private readonly DEBUG_UPDATE_FREQUENCY = 10;

	private sourceUpdater: SourceUpdater | null = null;
	private gameLoop: GameLoop | null = null;
	private frameCount = 0;
	private lastUpdateRate = -1;
	private isStopped = false;

	public readonly screen: Screen;
	public readonly audio: AudioCore;
	public readonly input: InputManager;
	public readonly system: System;
	public readonly playerService: PlayerService;
	public readonly sceneManager: SceneManager;
	public vm: L8BVM | null = null;
	public timeMachine: TimeMachine | null = null;

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
		this.system = new System();
		this.playerService = new PlayerService({
			pause: () => this.stop(),
			resume: () => this.resume(),
			postMessage: (message: any) => this.listener.postMessage?.(message),
			getFps: () => this.system.getAPI().fps,
			getUpdateRate: () => this.system.getAPI().update_rate,
			setUpdateRate: (rate: number) => {
				this.system.getAPI().update_rate = rate;
			},
		});
		this.sceneManager = new SceneManager();
		this.assetLoader = new AssetLoader(options.url || "", options.resources || {}, this.audio, this.listener);

		this.logStep("RuntimeController constructed", {
			width: this.screen.width,
			height: this.screen.height,
			resources: {
				images: options.resources?.images?.length ?? 0,
				sounds: options.resources?.sounds?.length ?? 0,
				music: options.resources?.music?.length ?? 0,
			},
		});
	}

	get sprites(): Record<string, any> {
		return this.assetRegistry.sprites;
	}

	get maps(): Record<string, any> {
		return this.assetRegistry.maps;
	}

	get sounds(): Record<string, any> {
		return this.assetRegistry.sounds;
	}

	get music(): Record<string, any> {
		return this.assetRegistry.music;
	}

	get assets(): Record<string, any> {
		return this.assetRegistry.assets;
	}

	get time_machine(): TimeMachine | null {
		return this.timeMachine;
	}

	get stopped(): boolean {
		return this.isStopped;
	}

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
		this.isStopped = false;
		this.logStep("startup: completed");
	}

	stop(): void {
		this.logStep("lifecycle: stop requested");
		this.isStopped = true;
		this.gameLoop?.stop();
		this.audio.stopAll();
	}

	resume(): void {
		this.logStep("lifecycle: resume requested");
		this.isStopped = false;
		this.gameLoop?.resume();
	}

	updateSource(file: string, src: string, reinit = false): boolean {
		if (!this.sourceUpdater) return false;
		return this.sourceUpdater.updateSource(file, src, reinit);
	}

	handleMessage(message: any): void {
		if (message.name === "time_machine" && this.timeMachine) {
			this.timeMachine.messageReceived(message);
		}
	}

	runCommand(command: string, callback?: (result: any) => void): void {
		if (!this.vm) return;

		try {
			const result = this.vm.run(command, 3000, "console");
			callback?.(result);
		} catch (err: any) {
			callback?.(`Error: ${err.message || String(err)}`);
		}
	}

	getCanvas(): HTMLCanvasElement {
		return this.screen.getCanvas();
	}

	updateCall(): void {
		this.handleUpdate();
	}

	drawCall(): void {
		this.handleDraw();
	}

	stepForward(): void {
		this.timeMachine?.messageReceived({ command: "step_forward" } as any);
	}

	watch(_list: unknown[]): void {}

	stopWatching(): void {}

	updateSprite(_name: string, _version: number, _data: unknown, _properties?: unknown): boolean {
		return false;
	}

	updateMap(_name: string, _version: number, _data: unknown): boolean {
		return false;
	}

	private async loadAssets(): Promise<void> {
		const collections = await this.assetLoader.loadAll();
		this.assetRegistry.replace(collections);
	}

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

	private initializeVM(): void {
		this.logStep("vm: building meta/global APIs");

		const apiContext = {
			listener: this.listener,
			options: this.options,
			screen: this.screen,
			audio: this.audio,
			input: this.input,
			system: this.system,
			playerService: this.playerService,
			sceneManager: this.sceneManager,
			assets: this.assetRegistry,
			getVM: () => this.vm,
		};

		const meta = createRuntimeMeta(apiContext);
		const global = createRuntimeGlobalApi(apiContext);
		this.vm = new L8BVM(meta, global, this.options.namespace || "/l8b", this.options.preserveStorage || false);
		this.sourceUpdater = new SourceUpdater(this.vm, this.listener, this.audio, this.screen, () =>
			reportWarnings(this.vm!, this.listener),
		);
		this.timeMachine = new TimeMachine(this as any);

		if (this.listener.postMessage) {
			this.timeMachine.onStatus((status: any) => {
				this.listener.postMessage?.({ name: "time_machine_status", status });
			});
		}

		this.loadPrograms();
		this.initializeScenesAndRouter();

		if (this.listener.postMessage) {
			this.listener.postMessage({ name: "started" });
		}
	}

	private loadPrograms(): void {
		if (!this.vm) {
			return;
		}

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
				this.sourceUpdater?.updateSource(file, src, false);
			}
		} else {
			this.logStep("vm: no sources or compiled routines provided");
		}

		try {
			this.vm.call("init");
			this.vm.runner.tick();
			this.logStep("vm: init() executed");
		} catch (err: any) {
			reportError(this.listener, {
				error: err.message || String(err),
				type: "init",
				stack: err.stack,
			});
			this.logStep("vm: init() error", { message: err?.message || String(err) });
		}
	}

	private initializeScenesAndRouter(): void {
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
	}

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

	private updateGameLoopUpdateRate(): void {
		if (!this.vm || !this.gameLoop) return;
		try {
			const updateRate = this.vm.context?.global?.system?.update_rate;
			const rate = updateRate != null && updateRate > 0 && Number.isFinite(updateRate) ? updateRate : 60;
			if (rate !== this.lastUpdateRate) {
				this.lastUpdateRate = rate;
				this.gameLoop.setUpdateRate(rate);
			}
		} catch {}
	}

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
				this.vm.runner.tick();
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

	private handleDraw(): void {
		if (!this.vm) return;

		try {
			this.screen.initDraw();
			this.screen.updateInterface();

			if (this.sceneManager.hasActiveScene()) {
				this.sceneManager.draw();
			} else {
				this.vm.call("draw");
				this.vm.runner.tick();
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

		this.timeMachine?.step();
	}

	private handleTick(): void {
		if (this.vm?.runner) {
			(this.vm.runner as any).tick?.();
		}
	}

	private handleWatchStep(): void {
		this.timeMachine?.loopStep();
	}

	private logStep(message: string, payload?: unknown): void {
		if (!this.options.debug?.lifecycle) return;

		const prefix = "[@al8b/runtime][lifecycle]";
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
