/**
 * Function Bridge - Converts between LootiScript routines and JavaScript functions
 *
 * Allows LootiScript functions to be called from JavaScript code
 * (e.g., scene lifecycle callbacks, event handlers).
 */

import type { RuntimeContext } from "./processor";
import { Routine } from "./routine";

/**
 * Convert a LootiScript routine to a JavaScript function
 */
export function routineAsFunction(runner: any, routine: Routine, context: RuntimeContext): Function {
	// Lazy import to avoid circular dependency at module load time
	const ProcessorClass = runner.main_thread.processor.constructor;
	const proc = new ProcessorClass(runner);

	return function (this: any) {
		const count = Math.min(routine.num_args, arguments.length);
		proc.load(routine);
		for (let i = 0; i <= count - 1; i += 1) {
			proc.stack[++proc.stack_index] = arguments[i] || 0;
		}
		proc.stack[++proc.stack_index] = arguments.length;
		if (routine.uses_arguments) {
			const a = [...arguments];
			for (let i = 0; i <= a.length - 1; i += 1) {
				if (a[i] == null) {
					a[i] = 0;
				}
			}
			proc.stack[++proc.stack_index] = a;
		}
		return proc.run(context);
	};
}

/**
 * Convert a LootiScript routine to a JavaScript function that binds `this`
 */
export function routineAsApplicableFunction(runner: any, routine: Routine, context: RuntimeContext): Function {
	const ProcessorClass = runner.main_thread.processor.constructor;
	const proc = new ProcessorClass(runner);

	return function (this: any) {
		const count = routine.num_args;
		proc.load(routine);
		proc.object = this;
		for (let i = 0; i <= count - 1; i += 1) {
			proc.stack[++proc.stack_index] = arguments[i] || 0;
		}
		proc.stack[++proc.stack_index] = arguments.length;
		if (routine.uses_arguments) {
			const a: any[] = [...arguments];
			for (let i = 0; i <= a.length - 1; i += 1) {
				if (a[i] == null) {
					a[i] = 0;
				}
			}
			proc.stack[++proc.stack_index] = a;
		}
		proc.run(context);
		return proc.stack[0];
	};
}

/**
 * Convert a LootiScript argument to a native JavaScript value
 */
export function argToNative(runner: any, arg: any, context: RuntimeContext): any {
	if (arg instanceof Routine) {
		return routineAsFunction(runner, arg, context);
	}
	return arg != null ? arg : 0;
}
