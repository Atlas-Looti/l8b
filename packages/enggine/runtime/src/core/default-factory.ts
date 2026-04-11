/**
 * Default service factory for RuntimeController.
 *
 * Creates real instances of all runtime services using the actual
 * package implementations (Screen, AudioCore, etc.).
 *
 * @module enggine/runtime/default-factory
 */

import { AudioCore } from "@al8b/audio";
import { Screen } from "@al8b/screen";
import { StatePlayer } from "@al8b/time";
import { EventBus } from "@al8b/events";
import { TweenManager } from "@al8b/tween";
import { FSMManager } from "@al8b/fsm";
import { PhysicsWorld } from "@al8b/physics";
import { CameraManager } from "@al8b/camera";
import { ParticleManager } from "@al8b/particles";
import { AssetLoader } from "../assets";
import { InputManager } from "../input";
import { RuntimeAssetsRegistry } from "./assets-registry";
import { DebugLogger } from "./debug-logger";
import { System } from "../system";
import type { RuntimeServiceFactory, IPlayerService, IInputManager } from "./service-interfaces";
import type { Resources } from "../types/assets";
import type { RuntimeListener } from "../types";

// ─── Default Factory ───────────────────────────────────────────────────────────

export const DefaultRuntimeServiceFactory: RuntimeServiceFactory = {
	createScreen: (opts) => {
		const ScreenClass = Screen as unknown as {
			new (opts: {
				runtime?: unknown;
				canvas?: HTMLCanvasElement;
				width?: number;
				height?: number;
			}): import("./service-interfaces").IScreen;
		};
		return new ScreenClass({
			runtime: opts.runtime,
			canvas: opts.canvas,
			width: opts.width,
			height: opts.height,
		});
	},

	createAudioCore: (runtime) => {
		const AudioCoreClass = AudioCore as unknown as {
			new (runtime: unknown): import("./service-interfaces").IAudioCore;
		};
		return new AudioCoreClass(runtime);
	},

	createInputManager: (canvas) => {
		// InputManager is imported at module level - return as unknown cast
		return new InputManager(canvas) as unknown as IInputManager;
	},

	createSystem: () => {
		const SystemClass = System as unknown as {
			new (): import("./service-interfaces").ISystem;
		};
		return new SystemClass();
	},

	createPlayerService: (opts): IPlayerService => {
		let _fps = 60;
		let _updateRate = 60;
		return {
			pause: opts.pause,
			resume: opts.resume,
			postMessage: opts.postMessage,
			getFps: () => _fps,
			getUpdateRate: () => _updateRate,
			setUpdateRate: (r: number) => { _updateRate = r; },
			getInterface: () => ({ fps: _fps, update_rate: _updateRate }),
		};
	},

	createAssetLoader: (url, resources, audio, listener) => {
		const AssetLoaderClass = AssetLoader as unknown as {
			new (
				url: string,
				resources: Resources,
				audio: import("./service-interfaces").IAudioCore,
				listener?: RuntimeListener,
			): import("./service-interfaces").IAssetLoader;
		};
		return new AssetLoaderClass(url, resources, audio, listener);
	},

	createAssetRegistry: () => {
		return new RuntimeAssetsRegistry() as import("./service-interfaces").IAssetRegistry;
	},

	createDebugLogger: () => {
		return new DebugLogger() as unknown as import("./service-interfaces").IDebugLogger;
	},

	createEventBus: () => new EventBus() as unknown as import("./service-interfaces").IEventBus,

	createTweenManager: () => new TweenManager() as unknown as import("./service-interfaces").ITweenManager,

	createFSMManager: () => new FSMManager() as unknown as import("./service-interfaces").IFSMManager,

	createPhysicsWorld: () => new PhysicsWorld() as unknown as import("./service-interfaces").IPhysicsWorld,

	createCameraManager: (screenW, screenH) =>
		new CameraManager(screenW, screenH) as unknown as import("./service-interfaces").ICameraManager,

	createParticleManager: () => new ParticleManager() as unknown as import("./service-interfaces").IParticleManager,
};

// ─── Re-exports for convenience ─────────────────────────────────────────────────

export { StatePlayer };
