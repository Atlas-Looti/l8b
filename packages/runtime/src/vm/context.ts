/**
 * VM Context creation utilities
 */

import { Random } from "@l8b/lootiscript";
import type { GlobalAPI, MetaFunctions, VMContext } from "../types";

/**
 * Create meta functions (built-in functions)
 */
export function createMetaFunctions(
	customPrint?: (text: any) => void,
): MetaFunctions {
	return {
		print: customPrint || ((text: any) => console.log(text)),
		round: (x: number) => Math.round(x),
		floor: (x: number) => Math.floor(x),
		ceil: (x: number) => Math.ceil(x),
		abs: (x: number) => Math.abs(x),
		min: (x: number, y: number) => Math.min(x, y),
		max: (x: number, y: number) => Math.max(x, y),
		sqrt: (x: number) => Math.sqrt(x),
		pow: (x: number, y: number) => x ** y,
		sin: (x: number) => Math.sin(x),
		cos: (x: number) => Math.cos(x),
		tan: (x: number) => Math.tan(x),
		asin: (x: number) => Math.asin(x),
		acos: (x: number) => Math.acos(x),
		atan: (x: number) => Math.atan(x),
		atan2: (y: number, x: number) => Math.atan2(y, x),
		sind: (x: number) => Math.sin((x / 180) * Math.PI),
		cosd: (x: number) => Math.cos((x / 180) * Math.PI),
		tand: (x: number) => Math.tan((x / 180) * Math.PI),
		asind: (x: number) => (Math.asin(x) * 180) / Math.PI,
		acosd: (x: number) => (Math.acos(x) * 180) / Math.PI,
		atand: (x: number) => (Math.atan(x) * 180) / Math.PI,
		atan2d: (y: number, x: number) => (Math.atan2(y, x) * 180) / Math.PI,
		log: (x: number) => Math.log(x),
		exp: (x: number) => Math.exp(x),
		random: new Random(0),
		PI: Math.PI,
		true: 1,
		false: 0,
	};
}

/**
 * Create VM context
 */
export function createVMContext(
	meta: Partial<MetaFunctions>,
	global: Partial<GlobalAPI>,
): VMContext {
	const fullMeta = createMetaFunctions(meta.print);
	Object.assign(fullMeta, meta);

	return {
		meta: fullMeta as MetaFunctions,
		global: global as GlobalAPI,
		local: global,
		object: global,
		breakable: 0,
		continuable: 0,
		returnable: 0,
		stack_size: 0,
		timeout: Date.now() + 3000,
		warnings: {
			using_undefined_variable: {},
			assigning_field_to_undefined: {},
			invoking_non_function: {},
			assigning_api_variable: {},
			assignment_as_condition: {},
		},
	};
}
