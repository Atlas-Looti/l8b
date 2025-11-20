/**
 * Runtime type definitions
 */

import type { ErrorInfo } from "@l8b/vm";
import type { Resources } from "./assets";

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
	/** Pre-compiled routines (for production) - Record of module name to Routine instance */
	compiledRoutines?: Record<string, any>;
	/** Resources metadata */
	resources?: Resources;
	/** Listener for events (logging, errors) */
	listener?: RuntimeListener;
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
	/** Post message to parent (for iframe communication) */
	postMessage?: (message: any) => void;
}

/**
 * Runtime state
 */
export interface RuntimeState {
	/** Is runtime started */
	started: boolean;
	/** Is runtime stopped */
	stopped: boolean;
	/** Current frame number */
	current_frame: number;
	/** Floating frame counter */
	floating_frame: number;
	/** Delta time (smoothed) */
	dt: number;
	/** Last frame timestamp */
	last_time: number;
	/** Report errors to listener */
	report_errors: boolean;
}
