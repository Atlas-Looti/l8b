/**
 * VM related type definitions
 */

/**
 * Player API exposed to game code - controls player UX
 */
export interface PlayerAPI {
	/** Pause the game loop */
	pause: () => void;
	/** Resume the game loop */
	resume: () => void;
	/** Send a custom message to the host application */
	postMessage: (message: any) => void;
	/** Set target update rate (FPS) */
	setFps: (fps: number) => void;
	/** Current FPS (read-only) */
	readonly fps: number;
	/** Target update rate in Hz (read/write) */
	update_rate: number;
}

/**
 * System API exposed to game code - system info and utilities
 */
export interface SystemAPI {
	time: number;
	fps: number;
	cpu_load: number;
	update_rate: number;
	language: string;
	inputs: {
		keyboard: number;
		mouse: number;
		touch: number;
		gamepad: number;
	};
	loading?: number;
	prompt: (text: string, callback: (result: string) => void) => void;
	say: (text: string) => void;
	file: {
		dropped: number;
	};
	javascript: any;
	disable_autofullscreen?: number;
	preemptive?: number;
	threads?: any[];
}

/**
 * Storage interface exposed to game code
 */
export interface StorageInterface {
	set: (name: string, value: unknown) => void;
	get: (name: string) => unknown;
}

/**
 * Scene interface exposed to game code
 */
export interface SceneInterface {
	register: (name: string, def: Record<string, unknown>) => void;
	route: (path: string, sceneName: string) => void;
	goto: (name: string, params?: Record<string, string>) => void;
	current: () => string | null;
}

/**
 * Router interface exposed to game code
 */
export interface RouterInterface {
	navigate: (path: string) => void;
	back: () => void;
	readonly path: string;
}

/**
 * Global API exposed to game code
 *
 * Core service fields (screen, audio, keyboard, etc.) use Record<string, any>
 * because they are dynamically populated from different core packages with varying shapes.
 * Helper interfaces above document the expected shape of stable APIs.
 */
export interface GlobalAPI {
	screen: Record<string, any>;
	audio: Record<string, any>;
	keyboard: Record<string, any>;
	mouse: Record<string, any>;
	touch: Record<string, any>;
	gamepad: Record<string, any>;
	sprites: Record<string, any>;
	maps: Record<string, any>;
	sounds: Record<string, any>;
	music: Record<string, any>;
	assets: Record<string, any>;
	storage: Record<string, any>;
	scene: Record<string, any>;
	route: Record<string, any>;
	router: Record<string, any>;
	player: Record<string, any>;
	system: SystemAPI;
	fonts?: Record<string, any>;
	Sound?: any;
	Image?: any;
	Sprite?: any;
	TileMap?: any;
	Palette?: any;
	Random?: any;
}

/**
 * Meta functions (built-in functions)
 */
export interface MetaFunctions {
	print: (text: any) => void;
	round: (x: number) => number;
	floor: (x: number) => number;
	ceil: (x: number) => number;
	abs: (x: number) => number;
	min: (x: number, y: number) => number;
	max: (x: number, y: number) => number;
	sqrt: (x: number) => number;
	pow: (x: number, y: number) => number;
	sin: (x: number) => number;
	cos: (x: number) => number;
	tan: (x: number) => number;
	asin: (x: number) => number;
	acos: (x: number) => number;
	atan: (x: number) => number;
	atan2: (y: number, x: number) => number;
	sind: (x: number) => number;
	cosd: (x: number) => number;
	tand: (x: number) => number;
	asind: (x: number) => number;
	acosd: (x: number) => number;
	atand: (x: number) => number;
	atan2d: (y: number, x: number) => number;
	log: (x: number) => number;
	exp: (x: number) => number;
	random: any;
	PI: number;
	true: number;
	false: number;
}

/**
 * Warning info for a specific code location
 */
export interface WarningInfo {
	file: string;
	line: number;
	column: number;
	expression?: string;
	identifier?: string;
	reported?: boolean;
}

/**
 * Accumulated warnings structure
 */
export interface VMWarnings {
	using_undefined_variable: Record<string, WarningInfo>;
	assigning_field_to_undefined: Record<string, WarningInfo>;
	invoking_non_function: Record<string, WarningInfo>;
	assigning_api_variable: Record<string, WarningInfo>;
	assignment_as_condition: Record<string, WarningInfo>;
}

/**
 * VM Context
 */
export interface VMContext {
	meta: MetaFunctions;
	global: GlobalAPI;
	local: any;
	object: any;
	breakable: number;
	continuable: number;
	returnable: number;
	stack_size: number;
	timeout: number;
	warnings: VMWarnings;
}

/**
 * Call frame for stack trace
 */
export interface CallFrame {
	functionName: string;
	file: string;
	line: number;
	column: number;
}

/**
 * Error information returned by VM
 */
export interface ErrorInfo {
	error: string;
	type?: string;
	line?: number;
	column?: number;
	file?: string;
	stack?: string;
	stackTrace?: CallFrame[];
}
