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
	/** Log message */
	log?: (message: string) => void;
	/** Report error */
	reportError?: (error: ErrorInfo) => void;
	/** Code paused (system.pause called) */
	codePaused?: () => void;
}

