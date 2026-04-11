import { AudioCore } from "@al8b/audio";
import { Screen } from "@al8b/screen";
import { StatePlayer, TimeMachine, type StateSnapshot, type TimeMachineCommand } from "@al8b/time";
import { L8BVM } from "@al8b/vm";
import type { EventBus } from "@al8b/events";
import type { TweenManager } from "@al8b/tween";
import type { FSMManager } from "@al8b/fsm";
import type { PhysicsWorld } from "@al8b/physics";
import type { CameraManager } from "@al8b/camera";
import type { ParticleManager } from "@al8b/particles";
import { AssetLoader } from "../assets";
import { SourceUpdater } from "../hot-reload";
import { InputManager } from "../input";
import { GameLoop } from "../loop";
import { System } from "../system";
import type {
	HostEvent,
	RuntimeListener,
	RuntimeOptions,
	RuntimeResetOptions,
	RuntimeSessionSnapshot,
	RuntimeSnapshot,
	RuntimeSnapshotMeta,
} from "../types";
import { DebugLogger } from "./debug-logger";
import { reportError, reportWarnings } from "./error-handler";
import { RuntimeAssetsRegistry } from "./assets-registry";
import { createRuntimeGlobalApi, createRuntimeMeta } from "./api-factory";
import type { RuntimeServiceFactory, IPlayerService } from "./service-interfaces";
import { DefaultRuntimeServiceFactory } from "./default-factory";
import { FRAME_TIME_MS } from "../constants";

export interface RuntimeController {
	readonly screen: Screen;
	readonly audio: AudioCore;
	readonly input: InputManager;
	readonly system: System;
	readonly playerService: IPlayerService;
	readonly vm: L8BVM | null;
	readonly timeMachine: TimeMachine | null;
	readonly sprites: Record<string, any>;
	readonly maps: Record<string, any>;
	readonly sounds: Record<string, any>;
	readonly music: Record<string, any>;
	readonly assets: Record<string, any>;
	readonly stopped: boolean;
	start(): Promise<void>;
	stop(): void;
	resume(): void;
	reset(options?: RuntimeResetOptions): Promise<void>;
	exportSnapshot(): RuntimeSnapshot;
	importSnapshot(snapshot: RuntimeSnapshot): Promise<void>;
	updateSource(file: string, src: string, reinit?: boolean): boolean;
	handleMessage(message: any): void;
	sendHostEvent(event: HostEvent): void;
	getCanvas(): HTMLCanvasElement;
	getSession(): RuntimeSessionSnapshot | null;
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
	private readonly snapshotRestorer = new StatePlayer();

	private bridgeUnsubscribe: (() => void) | null = null;
	private sourceUpdater: SourceUpdater | null = null;
	private gameLoop: GameLoop | null = null;
	private frameCount = 0;
	private lastUpdateRate = -1;
	private isStopped = false;
	private preserveStorageOnNextBoot: boolean;
	private sessionSnapshot: RuntimeSessionSnapshot | null;

	public readonly screen: Screen;
	public readonly audio: AudioCore;
	public readonly input: InputManager;
	public readonly system: System;
	public readonly playerService: IPlayerService;
	public readonly events: EventBus;
	public readonly tweens: TweenManager;
	public readonly fsmManager: FSMManager;
	public readonly physics: PhysicsWorld;
	public readonly cameraManager: CameraManager;
	public readonly particles: ParticleManager;
	public vm: L8BVM | null = null;
	public timeMachine: TimeMachine | null = null;

	constructor(
		options: RuntimeOptions = {},
		private readonly factory: RuntimeServiceFactory = DefaultRuntimeServiceFactory,
	) {
		this.options = options;
		this.listener = options.listener || {};
		this.preserveStorageOnNextBoot = options.preserveStorage || false;
		this.sessionSnapshot = options.initialSession || null;

		// Create services in dependency order using factory.
		// Factory returns concrete instances; cast via 'as unknown as' to handle
		// interface-to-concrete-type assignment (structural typing).
		this.screen = this.factory.createScreen({
			runtime: this,
			canvas: options.canvas,
			width: options.width || 400,
			height: options.height || 400,
		}) as unknown as Screen;

		this.audio = this.factory.createAudioCore(this) as unknown as AudioCore;
		this.input = this.factory.createInputManager(this.screen.getCanvas()) as unknown as InputManager;
		this.system = this.factory.createSystem() as unknown as System;
		this.playerService = this.factory.createPlayerService({
			pause: () => this.stop(),
			resume: () => this.resume(),
			postMessage: (message: any) => this.emitPlayerMessage(message),
			getFps: () => this.system.getAPI().fps,
			getUpdateRate: () => this.system.getAPI().update_rate,
			setUpdateRate: (rate: number) => {
				this.system.getAPI().update_rate = rate;
			},
		}) as unknown as IPlayerService;
		this.assetLoader = this.factory.createAssetLoader(
			options.url || "",
			options.resources || {},
			this.audio,
			this.listener,
		) as unknown as AssetLoader;

		this.events = this.factory.createEventBus() as unknown as EventBus;
		this.tweens = this.factory.createTweenManager() as unknown as TweenManager;
		this.fsmManager = this.factory.createFSMManager() as unknown as FSMManager;
		this.physics = this.factory.createPhysicsWorld() as unknown as PhysicsWorld;
		this.cameraManager = this.factory.createCameraManager(
			options.width || 400,
			options.height || 400,
		) as unknown as CameraManager;
		this.particles = this.factory.createParticleManager() as unknown as ParticleManager;

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

	get stopped(): boolean {
		return this.isStopped;
	}

	getSession(): RuntimeSessionSnapshot | null {
		return this.sessionSnapshot ? cloneSnapshot(this.sessionSnapshot) : null;
	}

	async start(): Promise<void> {
		this.logStep("startup: begin");

		await this.hydrateSession();
		this.ensureBridgeSubscription();

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

	async reset(options: RuntimeResetOptions = {}): Promise<void> {
		this.logStep("lifecycle: reset requested", options);
		const preservedSnapshot = options.preserveSnapshot ? this.exportSnapshot() : null;
		const preserveSession = options.preserveSession ?? true;
		const preserveStorage = options.preserveStorage ?? this.options.preserveStorage ?? false;

		this.stop();
		this.teardownRuntimeState();

		if (!preserveSession) {
			this.sessionSnapshot = null;
		}
		this.preserveStorageOnNextBoot = preserveStorage;

		await this.start();

		if (preservedSnapshot) {
			await this.importSnapshot(preservedSnapshot);
		}
	}

	exportSnapshot(): RuntimeSnapshot {
		const global = this.vm?.context?.global;
		return {
			version: 1,
			global: global ? serializeGlobalSnapshot(global) : {},
			session: this.getSession(),
			system: {
				updateRate: this.system.getAPI().update_rate,
			},
		};
	}

	async importSnapshot(snapshot: RuntimeSnapshot): Promise<void> {
		if (!this.vm?.context?.global) {
			return;
		}

		this.snapshotRestorer.restoreState(this.vm.context.global as unknown as Record<string, unknown>, snapshot.global);
		this.system.getAPI().update_rate = snapshot.system.updateRate;
		this.updateGameLoopUpdateRate();

		if (snapshot.session) {
			this.sessionSnapshot = cloneSnapshot(snapshot.session);
		}
	}

	updateSource(file: string, src: string, reinit = false): boolean {
		if (!this.sourceUpdater) return false;
		return this.sourceUpdater.updateSource(file, src, reinit);
	}

	handleMessage(message: any): void {
		if (!message) {
			return;
		}

		if (typeof message === "object" && "type" in message && typeof message.type === "string") {
			this.sendHostEvent(message as HostEvent);
			return;
		}

		if (message.name === "time_machine" && this.timeMachine) {
			this.timeMachine.messageReceived(message);
		}
	}

	sendHostEvent(event: HostEvent): void {
		this.handleHostEvent(event);
	}

	getCanvas(): HTMLCanvasElement {
		return this.screen.getCanvas();
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
				const progressPct = Math.floor(progress * 100);
				this.system.setLoading(progressPct);
				this.listener.onAssetProgress?.(progressPct);
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
			assets: this.assetRegistry,
			bridge: this.options.bridge,
			events: this.events,
			tweens: this.tweens,
			fsmManager: this.fsmManager,
			physics: this.physics,
			cameraManager: this.cameraManager,
			particles: this.particles,
			getVM: () => this.vm,
			getSessionSnapshot: () => this.getSession(),
			sendHostEvent: (event: HostEvent) => this.emitBridgeEvent(event.type, event.payload),
			sendHostRequest: (name: string, payload?: unknown, callback?: (result: unknown) => void) =>
				this.sendBridgeRequest(name, payload, callback),
			exportSnapshot: () => this.exportSnapshot(),
			importSnapshot: (snapshot: RuntimeSnapshot) => this.importSnapshot(snapshot),
			resetRuntime: (options?: RuntimeResetOptions) => this.reset(options),
			saveSnapshot: (meta?: RuntimeSnapshotMeta, callback?: (result: unknown) => void) =>
				this.saveSnapshot(meta, callback),
			loadSnapshot: (meta?: RuntimeSnapshotMeta, callback?: (result: unknown) => void) =>
				this.loadSnapshot(meta, callback),
		};

		const meta = createRuntimeMeta(apiContext);
		const global = createRuntimeGlobalApi(apiContext);
		this.vm = new L8BVM(meta, global, this.options.namespace || "/l8b", this.preserveStorageOnNextBoot);
		this.sourceUpdater = new SourceUpdater(
			this.vm,
			this.listener,
			this.audio,
			this.screen,
			() => reportWarnings(this.vm!, this.listener),
			(name: string, payload?: unknown) => this.emitBridgeEvent(name, payload),
		);
		this.timeMachine = new TimeMachine(this as any);

		this.timeMachine.onStatus((status: any) => {
			this.emitBridgeEvent("time_machine_status", { status });
		});

		this.loadPrograms();

		this.emitBridgeEvent("runtime.started", {});
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
			this.listener.onReady?.();
		} catch (err: any) {
			reportError(this.listener, {
				error: err.message || String(err),
				type: "init",
				stack: err.stack,
			});
			this.logStep("vm: init() error", { message: err?.message || String(err) });
		}
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

		const dtMs = this.gameLoop ? this.gameLoop.getState().dt : FRAME_TIME_MS;

		this.tweens.update(dtMs);
		this.fsmManager.update(dtMs);
		this.cameraManager.update(dtMs);
		this.particles.update(dtMs);
		this.physics.update(dtMs);

		if (this.frameCount % this.DEBUG_UPDATE_FREQUENCY === 0) {
			this.debugLogger.debugInputs(this.input, this.options.debug);
			this.debugLogger.debugScreen(this.screen, this.options.debug);
		}

		if (this.gameLoop) {
			this.system.setFPS(this.gameLoop.getFPS());
			this.updateGameLoopUpdateRate();
		}

		try {
			this.vm.call("update");
			this.vm.runner.tick();
			this.events.flushDeferred();

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

			this.vm.call("draw");
			this.vm.runner.tick();

			this.particles.draw();

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

	private ensureBridgeSubscription(): void {
		if (this.bridgeUnsubscribe || !this.options.bridge?.subscribe) {
			return;
		}

		const maybeUnsubscribe = this.options.bridge.subscribe((event) => this.handleHostEvent(event));
		this.bridgeUnsubscribe = typeof maybeUnsubscribe === "function" ? maybeUnsubscribe : null;
	}

	private handleHostEvent(event: HostEvent): void {
		switch (event.type) {
			case "session.update":
				this.mergeSession(event.payload);
				break;
			case "runtime.reset":
				void this.reset(asRecord(event.payload));
				break;
			case "runtime.import_snapshot":
				if (isRuntimeSnapshot(event.payload)) {
					void this.importSnapshot(event.payload);
				}
				break;
			case "runtime.export_snapshot":
				this.emitBridgeEvent("runtime.snapshot", this.exportSnapshot());
				break;
			case "runtime.stop":
			case "runtime.pause":
				this.stop();
				break;
			case "runtime.resume":
				this.resume();
				break;
			case "time_machine":
				if (this.timeMachine && isRecord(event.payload)) {
					const command = event.payload.command;
					if (typeof command === "string") {
						this.timeMachine.messageReceived({
							name: "time_machine",
							command: command as TimeMachineCommand,
							position:
								typeof event.payload.position === "number" ? event.payload.position : undefined,
						});
					}
				}
				break;
		}
	}

	private emitPlayerMessage(message: unknown): void {
		if (isRecord(message) && typeof message.type === "string") {
			this.emitBridgeEvent(message.type, message);
		} else {
			this.emitBridgeEvent("player.message", message);
		}
	}

	private emitBridgeEvent(name: string, payload?: unknown): void {
		this.options.bridge?.emit?.(name, payload);
		// Also fire listener.onHostEmit so host apps can react without a custom bridge
		if (name !== "runtime.started" && name !== "runtime.snapshot" && name !== "time_machine_status") {
			this.listener.onHostEmit?.(name, payload);
		}
	}

	private sendBridgeRequest(name: string, payload?: unknown, callback?: (result: unknown) => void): string | null {
		const request = this.options.bridge?.request;
		if (!request) {
			callback?.({
				ok: false,
				error: `No runtime bridge request handler registered for "${name}"`,
			});
			return null;
		}

		const requestId = createRequestId(name);
		try {
			const result = request(name, payload);
			if (isPromiseLike(result)) {
				void result
					.then((value) => callback?.(value))
					.catch((error) => callback?.({ ok: false, error: error instanceof Error ? error.message : String(error) }));
			} else {
				callback?.(result);
			}
			return requestId;
		} catch (error) {
			callback?.({ ok: false, error: error instanceof Error ? error.message : String(error) });
			return requestId;
		}
	}

	private saveSnapshot(meta?: RuntimeSnapshotMeta, callback?: (result: unknown) => void): unknown {
		const snapshot = this.exportSnapshot();
		const save = this.options.bridge?.saveSnapshot;
		if (!save) {
			const fallback = { ok: false, error: "No runtime bridge saveSnapshot handler registered", snapshot };
			callback?.(fallback);
			return fallback;
		}

		try {
			const result = save(snapshot, meta);
			if (isPromiseLike(result)) {
				void result
					.then(() => callback?.({ ok: true, snapshot }))
					.catch((error) => callback?.({ ok: false, error: error instanceof Error ? error.message : String(error) }));
				return null;
			}
			callback?.({ ok: true, snapshot });
			return { ok: true, snapshot };
		} catch (error) {
			const failure = { ok: false, error: error instanceof Error ? error.message : String(error) };
			callback?.(failure);
			return failure;
		}
	}

	private loadSnapshot(meta?: RuntimeSnapshotMeta, callback?: (result: unknown) => void): unknown {
		const load = this.options.bridge?.loadSnapshot;
		if (!load) {
			const fallback = { ok: false, error: "No runtime bridge loadSnapshot handler registered" };
			callback?.(fallback);
			return fallback;
		}

		try {
			const result = load(meta);
			if (isPromiseLike(result)) {
				void result
					.then(async (snapshot) => {
						if (snapshot) {
							await this.importSnapshot(snapshot);
						}
						callback?.({ ok: true, snapshot });
					})
					.catch((error) => callback?.({ ok: false, error: error instanceof Error ? error.message : String(error) }));
				return null;
			}

			if (result) {
				void this.importSnapshot(result);
			}
			callback?.({ ok: true, snapshot: result });
			return result;
		} catch (error) {
			const failure = { ok: false, error: error instanceof Error ? error.message : String(error) };
			callback?.(failure);
			return failure;
		}
	}

	private async hydrateSession(): Promise<void> {
		if (this.sessionSnapshot) {
			return;
		}

		const getSession = this.options.bridge?.getSession;
		if (!getSession) {
			this.sessionSnapshot = this.options.initialSession || null;
			return;
		}

		try {
			const session = getSession();
			this.sessionSnapshot = isPromiseLike(session) ? await session : session;
		} catch {
			this.sessionSnapshot = this.options.initialSession || null;
		}
	}

	private mergeSession(payload: unknown): void {
		if (!isRecord(payload)) {
			return;
		}

		const current = this.sessionSnapshot || {};
		this.sessionSnapshot = {
			...current,
			...payload,
		} as RuntimeSessionSnapshot;
	}

	private teardownRuntimeState(): void {
		this.gameLoop = null;
		this.sourceUpdater = null;
		this.vm = null;
		this.timeMachine = null;
		this.frameCount = 0;
		this.lastUpdateRate = -1;
		this.isStopped = false;
		this.events.reset();
		this.tweens.reset();
		this.fsmManager.reset();
		this.physics.reset();
		this.cameraManager.reset();
		this.particles.reset();
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

function serializeGlobalSnapshot(global: object): StateSnapshot {
	const globalRecord = global as Record<string, unknown>;
	const excluded = [
		globalRecord.random,
		globalRecord.screen,
		globalRecord.audio,
		globalRecord.keyboard,
		globalRecord.mouse,
		globalRecord.touch,
		globalRecord.gamepad,
		globalRecord.system,
		globalRecord.storage,
		globalRecord.host,
		globalRecord.session,
		globalRecord.memory,
		globalRecord.events,
		globalRecord.tween,
		globalRecord.fsm,
		globalRecord.camera,
		globalRecord.particles,
		globalRecord.physics,
	].filter((value) => value != null);

	return deepCloneValue(globalRecord, excluded);
}

function deepCloneValue<T>(value: T, excluded: unknown[] = []): T {
	if (value == null) {
		return value;
	}

	if (excluded.includes(value)) {
		return null as T;
	}

	if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
		return value;
	}

	if (Array.isArray(value)) {
		return value.map((entry) => deepCloneValue(entry, excluded)) as T;
	}

	if (typeof value === "object") {
		const clone: Record<string, unknown> = {};
		for (const [key, entry] of Object.entries(value as Record<string, unknown>)) {
			clone[key] = deepCloneValue(entry, excluded);
		}
		return clone as T;
	}

	return null as T;
}

function cloneSnapshot<T>(value: T): T {
	return deepCloneValue(value);
}

function createRequestId(name: string): string {
	return `${name}:${Date.now()}:${Math.random().toString(36).slice(2, 8)}`;
}

function isPromiseLike<T>(value: unknown): value is Promise<T> {
	return typeof value === "object" && value !== null && "then" in value && typeof (value as Promise<T>).then === "function";
}

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}

function asRecord(value: unknown): RuntimeResetOptions | undefined {
	return isRecord(value) ? (value as RuntimeResetOptions) : undefined;
}

function isRuntimeSnapshot(value: unknown): value is RuntimeSnapshot {
	if (!isRecord(value)) return false;
	if (value.version !== 1) return false;
	if (!isRecord(value.global)) return false;
	if (!("session" in value)) return false;
	return true;
}
