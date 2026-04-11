/**
 * Runtime type definitions for the Processor execution environment.
 *
 * These interfaces describe the shape of the VM's runtime context,
 * global scope, and object model used during bytecode execution.
 * They are kept in their own file so that `processor.ts` (hot path) and
 * `function-bridge.ts` can both import them without creating a circular
 * dependency.
 *
 * @module lootiscript/processor-types
 */

import type { Routine } from "./routine";

/** Runtime context passed to every execution frame. */
export interface RuntimeContext {
	global: RuntimeGlobal;
	warnings: Warnings;
	timeout?: number;
	stack_size?: number;
	[key: string]: any;
}

/** Warning collections keyed by unique identifier */
export interface Warnings {
	using_undefined_variable: Record<string, WarningEntry>;
	assigning_field_to_undefined: Record<string, WarningEntry>;
	invoking_non_function: Record<string, WarningEntry>;
	assigning_api_variable: Record<string, WarningEntry>;
	assignment_as_condition: Record<string, WarningEntry>;
}

/** Single warning entry with source location */
export interface WarningEntry {
	file?: string;
	line?: number;
	column?: number;
	expression?: string;
}

/** Global scope: built-in types and top-level bindings. */
export interface RuntimeGlobal {
	List?: any;
	String?: any;
	Object?: any;
	Number?: any;
	Math?: any;
	JSON?: any;
	Function?: any;
	random?: any;
	system?: any;
	[key: string]: any;
}

/** Any runtime value that may carry a prototype chain via `.class`. */
export interface RuntimeValue {
	class?: string | RuntimeClass;
	[key: string]: any;
}

/** A runtime class object (prototype in the LootiScript object model). */
export interface RuntimeClass {
	class?: RuntimeClass | string;
	[key: string]: any;
}

/** Thread interface - returned by Runner.createThread for async operations */
export interface ThreadInterface {
	pause(): number;
	resume(): number;
	stop(): number;
	status: "running" | "paused" | "stopped";
}

/** Runner interface - subset of Runner class that Processor interacts with */
export interface Runner {
	reportNativeError(error: unknown): void;
	createThread(routine: Routine, delay: number, repeat: boolean): ThreadInterface;
	sleep(value: number): void;
	main_thread: {
		processor: {
			done: boolean;
			time_limit: number;
		};
	};
}
