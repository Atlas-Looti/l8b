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

/** Runtime context passed to every execution frame. */
export interface RuntimeContext {
	global: RuntimeGlobal;
	[key: string]: any;
}

/** Global scope: built-in types and top-level bindings. */
export interface RuntimeGlobal {
	List?: any;
	String?: any;
	Object?: any;
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
