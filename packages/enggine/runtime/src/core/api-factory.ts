import { Palette } from "@al8b/palette";
import { type GlobalAPI, type L8BVM, type MetaFunctions, Random } from "@al8b/vm";
import { Image, Sound, Sprite, TileMap } from "../assets";
import type { InputManager } from "../input";
import type {
	HostEvent,
	RuntimeBridge,
	RuntimeListener,
	RuntimeOptions,
	RuntimeResetOptions,
	RuntimeSessionSnapshot,
	RuntimeSnapshot,
	RuntimeSnapshotMeta,
} from "../types";
import { ObjectPool } from "../utils/object-pool";
import type { IPlayerService, IEventBus, ITweenManager, IFSMManager, IPhysicsWorld, ICameraManager, IParticleManager } from "./service-interfaces";
import type { RuntimeAssetsRegistry } from "./assets-registry";
import type { Screen } from "@al8b/screen";
import type { AudioCore } from "@al8b/audio";
import type { System } from "../system";

export interface RuntimeApiFactoryContext {
	listener: RuntimeListener;
	options: RuntimeOptions;
	screen: Screen;
	audio: AudioCore;
	input: InputManager;
	system: System;
	playerService: IPlayerService;
	assets: RuntimeAssetsRegistry;
	bridge?: RuntimeBridge;
	events: IEventBus;
	tweens: ITweenManager;
	fsmManager: IFSMManager;
	physics: IPhysicsWorld;
	cameraManager: ICameraManager;
	particles: IParticleManager;
	getVM: () => L8BVM | null;
	getSessionSnapshot: () => RuntimeSessionSnapshot | null;
	sendHostEvent: (event: HostEvent) => void;
	sendHostRequest: (name: string, payload?: unknown, callback?: (result: unknown) => void) => string | null;
	exportSnapshot: () => RuntimeSnapshot;
	importSnapshot: (snapshot: RuntimeSnapshot) => Promise<void>;
	resetRuntime: (options?: RuntimeResetOptions) => Promise<void>;
	saveSnapshot: (meta?: RuntimeSnapshotMeta, callback?: (result: unknown) => void) => unknown;
	loadSnapshot: (meta?: RuntimeSnapshotMeta, callback?: (result: unknown) => void) => unknown;
}

export function createRuntimeMeta(context: RuntimeApiFactoryContext): Partial<MetaFunctions> {
	return {
		print: (text: unknown) => {
			const vm = context.getVM();
			if ((typeof text === "object" || typeof text === "function") && vm) {
				text = vm.toString(text);
			}
			if (context.listener.log) {
				context.listener.log(String(text));
			} else {
				console.log(text);
			}
		},
	};
}

export function createRuntimeGlobalApi(context: RuntimeApiFactoryContext): Partial<GlobalAPI> & {
	ObjectPool: typeof ObjectPool;
	Palette: typeof Palette;
	host: {
		emit: (name: string, payload?: unknown) => void;
		request: (name: string, payload?: unknown, callback?: (result: unknown) => void) => string | null;
	};
	session: {
		user: () => RuntimeSessionSnapshot["user"];
		player: () => RuntimeSessionSnapshot["player"];
		game: () => RuntimeSessionSnapshot["game"];
		room: () => RuntimeSessionSnapshot["room"];
	};
	memory: {
		export: () => RuntimeSnapshot;
		import: (snapshot: RuntimeSnapshot) => Promise<void>;
		reset: (options?: RuntimeResetOptions) => Promise<void>;
		save: (meta?: RuntimeSnapshotMeta, callback?: (result: unknown) => void) => unknown;
		load: (meta?: RuntimeSnapshotMeta, callback?: (result: unknown) => void) => unknown;
	};
	events: Record<string, unknown>;
	tween: Record<string, unknown>;
	fsm: Record<string, unknown>;
	physics: Record<string, unknown>;
	camera: Record<string, unknown>;
	particles: Record<string, unknown>;
} {
	const inputStates = context.input.getStates();
	const session = {
		user: () => cloneValue(context.getSessionSnapshot()?.user ?? null),
		player: () => cloneValue(context.getSessionSnapshot()?.player ?? null),
		game: () => cloneValue(context.getSessionSnapshot()?.game ?? null),
		room: () => cloneValue(context.getSessionSnapshot()?.room ?? null),
	};
	const host = {
		emit: (name: string, payload?: unknown) => {
			context.sendHostEvent({
				type: name,
				payload,
				source: "host",
			});
		},
		request: (name: string, payload?: unknown, callback?: (result: unknown) => void) =>
			context.sendHostRequest(name, payload, callback),
	};
	const memory = {
		export: () => context.exportSnapshot(),
		import: (snapshot: RuntimeSnapshot) => context.importSnapshot(snapshot),
		reset: (options?: RuntimeResetOptions) => context.resetRuntime(options),
		save: (meta?: RuntimeSnapshotMeta, callback?: (result: unknown) => void) => context.saveSnapshot(meta, callback),
		load: (meta?: RuntimeSnapshotMeta, callback?: (result: unknown) => void) => context.loadSnapshot(meta, callback),
	};

	// Wire camera canvas context lazily (canvas is ready by the time API is created)
	const getCtx = () => {
		try {
			return context.screen.getCanvas().getContext("2d") ?? null;
		} catch {
			return null;
		}
	};
	context.cameraManager.setContextProvider(getCtx);

	// Wire particle canvas context
	const ctx2d = getCtx();
	if (ctx2d) context.particles.setContext(ctx2d);

	return {
		screen: context.screen.getInterface(),
		audio: context.audio.getInterface(),
		keyboard: inputStates.keyboard,
		mouse: inputStates.mouse,
		touch: inputStates.touch,
		gamepad: inputStates.gamepad,
		sprites: context.assets.sprites,
		maps: context.assets.maps,
		sounds: context.assets.sounds,
		music: context.assets.music,
		assets: context.assets.assets,
		player: context.playerService.getInterface(),
		host,
		session,
		memory,
		system: context.system.getAPI(),
		events: context.events.getInterface(),
		tween: context.tweens.getInterface(),
		fsm: context.fsmManager.getInterface(),
		physics: context.physics.getInterface(),
		camera: context.cameraManager.getInterface(),
		particles: context.particles.getInterface(),
		Image,
		Sprite,
		TileMap,
		Sound,
		Palette,
		Random,
		ObjectPool,
	};
}

/**
 * Deep clone a value, handling primitives, arrays, objects, and Date.
 * Unlike JSON.parse(JSON.stringify()), this:
 * - Returns null for functions instead of stripping them silently
 * - Preserves Date objects as Date instances
 * - Handles circular references via excluded set
 */
function cloneValue<T>(value: T): T {
	if (value == null) {
		return value;
	}

	if (value instanceof Date) {
		return new Date(value) as T;
	}

	if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
		return value;
	}

	if (Array.isArray(value)) {
		return value.map((entry) => cloneValue(entry)) as T;
	}

	if (typeof value === "object") {
		const clone: Record<string, unknown> = {};
		for (const [key, entry] of Object.entries(value as Record<string, unknown>)) {
			clone[key] = cloneValue(entry);
		}
		return clone as T;
	}

	return null as T;
}
