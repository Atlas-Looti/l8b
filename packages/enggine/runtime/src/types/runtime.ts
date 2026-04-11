/**
 * Runtime type definitions
 */

import type { ErrorInfo } from "@al8b/vm";
import type { Resources } from "./assets";
import type { RuntimeBridge, RuntimeSessionSnapshot } from "./bridge";

/**
 * Compiled routine artifact from the LootiScript compiler
 */
export interface CompiledModuleArtifact {
	format: "l8b-compiled-routine";
	routine: SerializedRoutineData;
}

/**
 * Serialized routine data
 */
export type SerializedRoutineData = unknown;

export type { ErrorInfo, Resources };

/**
 * Runtime configuration options
 */
export type InputDebugSetting =
	| boolean
	| {
			keyboard?: boolean;
			mouse?: boolean;
			touch?: boolean;
			gamepad?: boolean;
	  };

export interface RuntimeDebugOptions {
	/** Input debug logging configuration */
	input?: InputDebugSetting;
	/** Log screen/canvas state changes */
	screen?: boolean;
	/** Detailed lifecycle logs for runtime startup and control */
	lifecycle?: boolean;
}

export interface RuntimeOptions {
	/** Base URL for loading assets */
	url?: string;
	/** Source code files (for development) */
	sources?: Record<string, string>;
	/** Pre-compiled routines (for production) */
	compiledRoutines?: Record<string, CompiledModuleArtifact | SerializedRoutineData>;
	/** Resources metadata */
	resources?: Resources;
	/** Environment variables (key-value pairs) */
	env?: Record<string, string>;
	/** Listener for events (logging, errors) */
	listener?: RuntimeListener;
	/** Host bridge for platform and backend integrations */
	bridge?: RuntimeBridge;
	/** Initial session context supplied by the host */
	initialSession?: RuntimeSessionSnapshot | null;
	/** Canvas element to use */
	canvas?: HTMLCanvasElement;
	/** Screen width */
	width?: number;
	/** Screen height */
	height?: number;
	/** Namespace for localStorage */
	namespace?: string;
	/** Preserve localStorage on reset */
	preserveStorage?: boolean;
	/** Debug toggles */
	debug?: RuntimeDebugOptions;
}

/**
 * Runtime listener for events
 */
export interface RuntimeListener {
	/** Log message from game code (print()) */
	log?: (message: string) => void;
	/** Runtime or game code error */
	reportError?: (error: ErrorInfo) => void;
	/** Game called system.pause() */
	codePaused?: () => void;
	/**
	 * Game finished init() and is now running.
	 * Called once per runtime.start() after assets are loaded and init() completes.
	 */
	onReady?: () => void;
	/**
	 * Game called host.emit(name, payload).
	 * Use this to react to game events from the host app without needing a custom bridge.
	 */
	onHostEmit?: (name: string, payload: unknown) => void;
	/**
	 * Asset loading progress (0–100).
	 * Called repeatedly during startup until all assets are loaded.
	 */
	onAssetProgress?: (progress: number) => void;
}

