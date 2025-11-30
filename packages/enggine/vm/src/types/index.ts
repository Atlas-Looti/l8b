/**
 * VM related type definitions
 */

/**
 * System API exposed to game code
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
	pause: () => void;
	exit: () => void;
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
 * Global API exposed to game code
 */
export interface GlobalAPI {
	screen: any;
	audio: any;
	keyboard: any;
	mouse: any;
	touch: any;
	gamepad: any;
	sprites: Record<string, any>;
	maps: Record<string, any>;
	sounds: Record<string, any>;
	music: Record<string, any>;
	assets: Record<string, any>;
	storage: any;
	scene: any;
	route: any;
	router: any;
	system: SystemAPI;
	fonts?: any;
	Sound?: any;
	Image?: any;
	Sprite?: any;
	Map?: any;
	Palette?: any;
	Random?: any;
	// Farcaster Mini Apps APIs
	player?: any;
	wallet?: any;
	evm?: any;
	actions?: any;
	// HTTP client
	http?: any;
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
