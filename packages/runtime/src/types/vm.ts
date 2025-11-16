/**
 * Virtual Machine type definitions
 */

import type { SystemAPI } from "./system";

export type { SystemAPI };

/**
 * Global API exposed to game code
 */
export interface GlobalAPI {
	/** Screen API */
	screen: any;
	/** Audio API */
	audio: any;
	/** Keyboard state */
	keyboard: any;
	/** Mouse state */
	mouse: any;
	/** Touch state */
	touch: any;
	/** Gamepad state */
	gamepad: any;
	/** Sprites collection */
	sprites: Record<string, any>;
	/** Maps collection */
	maps: Record<string, any>;
	/** Sounds collection */
	sounds: Record<string, any>;
	/** Music collection */
	music: Record<string, any>;
	/** Generic assets collection */
	assets: Record<string, any>;
	/** Storage API */
	storage: any;
	/** System API */
	system: SystemAPI;
	/** Available fonts */
	fonts?: any;
	/** Sound class constructor */
	Sound?: any;
	/** Image class constructor */
	Image?: any;
	/** Sprite class constructor */
	Sprite?: any;
	/** Map class constructor */
	Map?: any;
	/** Random class constructor */
	Random?: any;
}

/**
 * Meta functions (built-in functions)
 */
export interface MetaFunctions {
	/** Print to console */
	print: (text: any) => void;
	/** Round number */
	round: (x: number) => number;
	/** Floor number */
	floor: (x: number) => number;
	/** Ceiling number */
	ceil: (x: number) => number;
	/** Absolute value */
	abs: (x: number) => number;
	/** Minimum of two numbers */
	min: (x: number, y: number) => number;
	/** Maximum of two numbers */
	max: (x: number, y: number) => number;
	/** Square root */
	sqrt: (x: number) => number;
	/** Power */
	pow: (x: number, y: number) => number;
	/** Sine (radians) */
	sin: (x: number) => number;
	/** Cosine (radians) */
	cos: (x: number) => number;
	/** Tangent (radians) */
	tan: (x: number) => number;
	/** Arcsine */
	asin: (x: number) => number;
	/** Arccosine */
	acos: (x: number) => number;
	/** Arctangent */
	atan: (x: number) => number;
	/** Arctangent2 */
	atan2: (y: number, x: number) => number;
	/** Sine (degrees) */
	sind: (x: number) => number;
	/** Cosine (degrees) */
	cosd: (x: number) => number;
	/** Tangent (degrees) */
	tand: (x: number) => number;
	/** Arcsine (degrees) */
	asind: (x: number) => number;
	/** Arccosine (degrees) */
	acosd: (x: number) => number;
	/** Arctangent (degrees) */
	atand: (x: number) => number;
	/** Arctangent2 (degrees) */
	atan2d: (y: number, x: number) => number;
	/** Logarithm */
	log: (x: number) => number;
	/** Exponential */
	exp: (x: number) => number;
	/** Random number generator */
	random: any;
	/** PI constant */
	PI: number;
	/** True constant (1) */
	true: number;
	/** False constant (0) */
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
	/** Meta functions */
	meta: MetaFunctions;
	/** Global API */
	global: GlobalAPI;
	/** Local variables */
	local: any;
	/** Current object context */
	object: any;
	/** Can use break */
	breakable: number;
	/** Can use continue */
	continuable: number;
	/** Can use return */
	returnable: number;
	/** Current call stack size */
	stack_size: number;
	/** Timeout timestamp */
	timeout: number;
	/** Accumulated warnings */
	warnings: VMWarnings;
}
