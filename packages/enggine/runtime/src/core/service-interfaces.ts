/**
 * Service interfaces for RuntimeController dependency injection.
 *
 * These interfaces allow the RuntimeControllerImpl to be tested with
 * mock/fake implementations, enabling unit tests without requiring
 * real browser APIs (canvas, audio, etc.).
 *
 * @module enggine/runtime/service-interfaces
 */

import type { RuntimeListener } from "../types";
import type { Resources } from "../types/assets";

// ─── Core Service Interfaces ─────────────────────────────────────────────────

export interface IScreen {
	readonly width: number;
	readonly height: number;
	getCanvas(): HTMLCanvasElement;
	getInterface(): Record<string, unknown>;
	initDraw(): void;
	updateInterface(): void;
}

export interface IAudioCore {
	stopAll(): void;
	getInterface(): Record<string, unknown>;
}

export interface IInputManager {
	update(): void;
	getCanvas(): HTMLCanvasElement;
	getStates(): {
		keyboard: Record<string, unknown>;
		mouse: Record<string, unknown>;
		touch: Record<string, unknown>;
		gamepad: Record<string, unknown>;
	};
}

export interface ISystemAPI {
	fps: number;
	update_rate: number;
	preemptive: number;
	cpu_load?: number;
	threads?: unknown[];
	profiler?: unknown;
	[key: string]: unknown;
}

export interface ISystem {
	setFPS(fps: number): void;
	setLoading(progress: number): void;
	getAPI(): ISystemAPI;
}

export interface IPlayerService {
	pause(): void;
	resume(): void;
	postMessage(message: unknown): void;
	getFps(): number;
	getUpdateRate(): number;
	setUpdateRate(rate: number): void;
	getInterface(): Record<string, unknown>;
}

export interface IAssetCollections {
	sprites?: Record<string, unknown>;
	maps?: Record<string, unknown>;
	sounds?: Record<string, unknown>;
	music?: Record<string, unknown>;
}

export interface IAssetRegistry {
	readonly sprites: Record<string, unknown>;
	readonly maps: Record<string, unknown>;
	readonly sounds: Record<string, unknown>;
	readonly music: Record<string, unknown>;
	readonly assets: Record<string, unknown>;
	replace(collections: IAssetCollections): void;
}

export interface IAssetLoader {
	loadAll(): Promise<IAssetCollections>;
	isReady(): boolean;
	getProgress(): number;
	showLoadingBar(screenInterface: Record<string, unknown>): void;
}

export interface IDebugLogger {
	debugInputs(input: IInputManager, debug?: unknown): void;
	debugScreen(screen: IScreen, debug?: unknown): void;
}

// ─── Factory Interface ────────────────────────────────────────────────────────

export interface RuntimeServiceFactory {
	createScreen(opts: {
		canvas?: HTMLCanvasElement;
		width?: number;
		height?: number;
		runtime?: unknown;
	}): IScreen;

	createAudioCore(runtime: unknown): IAudioCore;

	createInputManager(canvas: HTMLCanvasElement): IInputManager;

	createSystem(): ISystem;

	createPlayerService(opts: {
		pause: () => void;
		resume: () => void;
		postMessage: (m: unknown) => void;
		getFps: () => number;
		getUpdateRate: () => number;
		setUpdateRate: (r: number) => void;
	}): IPlayerService;

	createAssetLoader(
		url: string,
		resources: Resources,
		audio: IAudioCore,
		listener: RuntimeListener,
	): IAssetLoader;

	createAssetRegistry(): IAssetRegistry;

	createDebugLogger(): IDebugLogger;
}
