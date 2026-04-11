/**
 * Default service factory for RuntimeController.
 *
 * Creates real instances of all runtime services using the actual
 * package implementations (Screen, AudioCore, etc.).
 *
 * @module enggine/runtime/default-factory
 */

import { AudioCore } from "@al8b/audio";
import { PlayerService } from "@al8b/player";
import { Screen } from "@al8b/screen";
import { StatePlayer } from "@al8b/time";
import { AssetLoader } from "../assets";
import { InputManager } from "../input";
import { RuntimeAssetsRegistry } from "./assets-registry";
import { DebugLogger } from "./debug-logger";
import { System } from "../system";
import type {
	RuntimeServiceFactory,
	IInputManager,
} from "./service-interfaces";
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

	createPlayerService: (opts) => {
		const PlayerServiceClass = PlayerService as unknown as {
			new (opts: {
				pause: () => void;
				resume: () => void;
				postMessage: (m: unknown) => void;
				getFps: () => number;
				getUpdateRate: () => number;
				setUpdateRate: (r: number) => void;
			}): import("./service-interfaces").IPlayerService;
		};
		return new PlayerServiceClass(opts);
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
};

// ─── Re-exports for convenience ─────────────────────────────────────────────────

export { StatePlayer };
