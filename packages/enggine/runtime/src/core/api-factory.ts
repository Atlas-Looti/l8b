import { Palette } from "@al8b/palette";
import type { SceneDefinition, SceneManager } from "@al8b/scene";
import { type GlobalAPI, type L8BVM, type MetaFunctions, Random, Routine } from "@al8b/vm";
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
import type { PlayerService } from "@al8b/player";
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
	playerService: PlayerService;
	sceneManager: SceneManager;
	assets: RuntimeAssetsRegistry;
	bridge?: RuntimeBridge;
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
		scene: (name: string, definition: unknown) => {
			const convertedDefinition = convertSceneDefinition(asSceneDefinition(definition), context.getVM(), context.listener);
			context.sceneManager.registerScene(name, convertedDefinition);
		},
		route: (path: string, sceneName: string) => context.sceneManager.registerRoute(path, sceneName),
		router: context.sceneManager.router.getInterface(),
		Image,
		Sprite,
		TileMap,
		Sound,
		Palette,
		Random,
		ObjectPool,
	};
}

export function convertSceneDefinition(
	definition: SceneDefinition,
	vm: L8BVM | null,
	listener: RuntimeListener,
): SceneDefinition {
	if (!vm?.runner?.main_thread?.processor) {
		listener.log?.("[RuntimeController] VM not ready for scene conversion. Scene functions may not work correctly.");
		return definition;
	}

	const processor = vm.runner.main_thread.processor;
	const context = vm.context;
	const converted: Record<string, unknown> = {};

	for (const [key, value] of Object.entries(definition)) {
		if (value instanceof Routine) {
			converted[key] = processor.routineAsFunction(value, context);
			continue;
		}

		if (value && typeof value === "object" && !Array.isArray(value)) {
			converted[key] = convertSceneDefinition(value, vm, listener);
			continue;
		}

		converted[key] = value;
	}

	return converted as SceneDefinition;
}

function asSceneDefinition(definition: unknown): SceneDefinition {
	if (!definition || typeof definition !== "object" || Array.isArray(definition)) {
		throw new Error("Scene definition must be an object.");
	}

	return definition as SceneDefinition;
}

function cloneValue<T>(value: T): T {
	if (value == null) {
		return value;
	}

	return JSON.parse(JSON.stringify(value)) as T;
}
