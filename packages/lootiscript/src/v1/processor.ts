/**
 * Processor - VM runtime execution engine for LootiScript
 *
 * Executes bytecode instructions in the virtual machine.
 * Manages the stack, call stack, and local variables.
 * Implements the core fetch-decode-execute loop.
 *
 * Responsibilities:
 * - Execute bytecode instructions
 * - Manage execution stack and memory
 * - Handle function calls and returns
 * - Implement inline caching for property access
 * - Generate stack traces for errors
 *
 * @module lootiscript/processor
 */

import type { CallFrame } from "@l8b/diagnostics";
import { IC_STATE, type InlineCache } from "./inline-cache";
import { Routine } from "./routine";

/**
 * Runtime context for script execution
 */
export interface RuntimeContext {
	global: RuntimeGlobal;
	[key: string]: any;
}

/**
 * Global object containing built-in types and functions
 */
export interface RuntimeGlobal {
	List?: any;
	String?: any;
	Object?: any;
	[key: string]: any;
}

/**
 * Runtime value that can have a class property
 */
export interface RuntimeValue {
	class?: string | RuntimeClass;
	[key: string]: any;
}

/**
 * Runtime class object
 */
export interface RuntimeClass {
	class?: RuntimeClass | string;
	[key: string]: any;
}

/**
 * Processor - Executes LootiScript bytecode
 *
 * The heart of the VM. It maintains the state of execution (stack, locals, instruction pointer)
 * and executes opcodes sequentially. It also handles the complexity of
 * function calls, including arguments passing and scope management.
 */
export class Processor {
	runner: any; // Runner instance
	routine!: Routine;
	locals: any[];
	stack: any[];
	call_stack: any[];
	call_stack_frames: CallFrame[]; // NEW: Stack trace frames
	log: boolean;
	time_limit: number;
	done: boolean;
	local_index: number;
	stack_index: number;
	op_index: number;
	call_stack_index: number;
	global: any;
	object: any;
	locals_offset: number;
	call_super: any;
	call_supername: string;

	// Profiling metrics
	metrics: {
		ops: number;
		allocations: number;
		cacheHits: number;
		cacheMisses: number;
	};
	profilingEnabled: boolean;

	// Memory Pools
	static arrayPool: any[][] = [];
	static objectPool: any[] = [];
	static MAX_POOL_SIZE = 1000;

	constructor(runner: any) {
		this.runner = runner;
		this.locals = [];
		this.stack = [];
		this.call_stack = [];
		this.call_stack_frames = []; // NEW: Initialize stack frames
		this.log = false;
		this.time_limit = Number.POSITIVE_INFINITY;
		this.done = true;
		this.local_index = 0;
		this.stack_index = -1;
		this.op_index = 0;
		this.call_stack_index = 0;
		this.global = null;
		this.object = null;
		this.locals_offset = 0;
		this.call_super = null;
		this.call_supername = "";

		this.metrics = {
			ops: 0,
			allocations: 0,
			cacheHits: 0,
			cacheMisses: 0,
		};
		this.profilingEnabled = false;
	}

	/**
	 * Get an array from the pool or create new
	 */
	getArray(): any[] {
		if (Processor.arrayPool.length > 0) {
			const arr = Processor.arrayPool.pop()!;
			arr.length = 0; // Reset length but keep capacity
			return arr;
		}
		return [];
	}

	/**
	 * Recycle array to pool
	 */
	recycleArray(arr: any[]) {
		if (Processor.arrayPool.length < Processor.MAX_POOL_SIZE) {
			Processor.arrayPool.push(arr);
		}
	}

	/**
	 * Get object from pool or create new
	 */
	getObject(): any {
		if (Processor.objectPool.length > 0) {
			return Processor.objectPool.pop();
		}
		return {};
	}

	/**
	 * Recycle object to pool (only simple objects)
	 */
	recycleObject(obj: any) {
		if (Processor.objectPool.length < Processor.MAX_POOL_SIZE) {
			// Clear properties - expensive, so only do for small objects
			// For now we just pool if we can efficiently clear
			for (const key in obj) {
				delete obj[key];
			}
			Processor.objectPool.push(obj);
		}
	}

	load(routine: Routine): void {
		this.routine = routine;
		this.resetState();
	}

	resetState(): void {
		this.local_index = 0;
		this.stack_index = -1;
		this.op_index = 0;
		this.call_stack_index = 0;
		this.call_stack_frames = []; // NEW: Reset stack frames
		this.global = null;
		this.object = this.routine.object || null;
		this.locals_offset = 0;
		this.call_super = null;
		this.call_supername = "";
		this.done = false;
	}

	/**
	 * Generate stack trace from call frames
	 *
	 * Reconstructs the call stack for error reporting.
	 * Converts internal CallFrame objects into a readable list.
	 *
	 * @returns {CallFrame[]} Array of stack frames (most recent first)
	 */
	generateStackTrace(): CallFrame[] {
		return [...this.call_stack_frames].reverse();
	}

	/**
	 * Format stack trace as string
	 */
	formatStackTrace(): string {
		const frames = this.generateStackTrace();
		if (frames.length === 0) {
			return "";
		}

		return frames.map((frame) => `  at ${frame.functionName} (${frame.file}:${frame.line}:${frame.column})`).join("\n");
	}

	resolveParentClass(obj: RuntimeValue, global: RuntimeGlobal): void {
		if (obj.class != null && typeof obj.class === "string") {
			if (global[obj.class] != null) {
				obj.class = global[obj.class];
				if (typeof obj.class !== "string") {
					return this.resolveParentClass(obj.class as RuntimeValue, global);
				}
			}
		} else if (obj.class != null && typeof obj.class !== "string") {
			return this.resolveParentClass(obj.class as RuntimeValue, global);
		}
	}

	applyFunction(_args: any): void {}

	/**
	 * Inline Cache Handler for Property Access
	 *
	 * Optimizes property access by caching the shape/structure of objects.
	 *
	 * States:
	 * - UNINITIALIZED: First access
	 * - MONOMORPHIC: Optimized for single object shape (fastest)
	 * - POLYMORPHIC: Optimized for few object shapes (2-4)
	 * - MEGAMORPHIC: Fallback for many shapes (slowest)
	 *
	 * @param {any} obj - The object to access
	 * @param {string} prop - The property name
	 * @param {InlineCache} ic - The inline cache slot associated with this instruction
	 * @returns {any} The property value
	 */
	resolvePropertyIC(obj: any, prop: string, ic: InlineCache): any {
		if (obj == null) {
			return null;
		}

		// Check cache state
		if (ic.state === IC_STATE.MONOMORPHIC) {
			// Fast path: check if object shape matches cached shape
			// Note: In JS engines, objects don't expose shape IDs easily.
			// We use constructor/class as a proxy for shape.
			const shape = obj.class || obj.constructor;

			if (shape === ic.shape) {
				ic.hits++;
				// In a real VM we'd use offset, here we just return the access
				// since we can't easily get property offsets in JS objects
				return obj[prop];
			} else {
				ic.misses++;
				// Transition to polymorphic or update monomorphic
				ic.state = IC_STATE.POLYMORPHIC;
				ic.shapes = [ic.shape, shape];
				ic.offsets = [0, 0]; // Placeholder
			}
		} else if (ic.state === IC_STATE.POLYMORPHIC) {
			// Linear scan of small polymorphic cache
			const shape = obj.class || obj.constructor;
			if (ic.shapes && ic.shapes.length < 4) {
				for (let i = 0; i < ic.shapes.length; i++) {
					if (ic.shapes[i] === shape) {
						ic.hits++;
						return obj[prop];
					}
				}
				// Add new shape
				ic.shapes.push(shape);
				ic.misses++;
			} else {
				// Too many shapes, go megamorphic
				ic.state = IC_STATE.MEGAMORPHIC;
			}
		}

		// Uninitialized or Megamorphic fallback
		if (ic.state === IC_STATE.UNINITIALIZED) {
			ic.state = IC_STATE.MONOMORPHIC;
			ic.shape = obj.class || obj.constructor;
			ic.property = prop;
			ic.hits = 1; // Count initialization as a hit for tracking
		}

		return obj[prop];
	}

	/**
	 * Convert a LootiScript routine to a JavaScript function
	 *
	 * Creates a native JS wrapper around a LootiScript routine.
	 * Allows LootiScript functions to be called from JavaScript (e.g. callbacks).
	 *
	 * @param {Routine} routine - The routine to wrap
	 * @param {RuntimeContext} context - The execution context
	 * @returns {Function} A JavaScript function that executes the routine
	 */
	routineAsFunction(routine: Routine, context: RuntimeContext): Function {
		let f: Function, proc: Processor;
		proc = new Processor(this.runner);
		f = function (this: any) {
			let a, count, i, j, k, ref, ref1;
			count = Math.min(routine.num_args, arguments.length);
			proc.load(routine);
			for (i = j = 0, ref = count - 1; j <= ref; i = j += 1) {
				proc.stack[++proc.stack_index] = arguments[i] || 0;
			}
			proc.stack[++proc.stack_index] = arguments.length;
			if (routine.uses_arguments) {
				a = [...arguments];
				for (i = k = 0, ref1 = a.length - 1; k <= ref1; i = k += 1) {
					if (a[i] == null) {
						a[i] = 0;
					}
				}
				proc.stack[++proc.stack_index] = a;
			}
			return proc.run(context);
		};
		//res = proc.stack[0]
		return f;
	}

	routineAsApplicableFunction(routine: Routine, context: RuntimeContext): Function {
		let f: Function, proc: Processor;
		proc = new Processor(this.runner);
		f = function (this: any) {
			let a: any[], count: number, i: number, j: number, k: number, ref: number, ref1: number;
			count = routine.num_args;
			proc.load(routine);
			proc.object = this;
			for (i = j = 0, ref = count - 1; j <= ref; i = j += 1) {
				proc.stack[++proc.stack_index] = arguments[i] || 0;
			}
			proc.stack[++proc.stack_index] = arguments.length;
			if (routine.uses_arguments) {
				a = [...arguments];
				for (i = k = 0, ref1 = a.length - 1; k <= ref1; i = k += 1) {
					if (a[i] == null) {
						a[i] = 0;
					}
				}
				proc.stack[++proc.stack_index] = a;
			}
			proc.run(context);
			return proc.stack[0];
		};
		return f;
	}

	argToNative(arg: any, context: RuntimeContext): any {
		if (arg instanceof Routine) {
			return this.routineAsFunction(arg, context);
		} else {
			if (arg != null) {
				return arg;
			} else {
				return 0;
			}
		}
	}

	modulo(context: RuntimeContext, a: any, b: any): any {
		let f: any, obj: any;
		if (Array.isArray(a)) {
			obj = context.global.List;
		} else if (typeof a === "string") {
			if (isFinite(a as any)) {
				(a as any) %= b;
				if (isFinite(a as any)) {
					return a;
				} else {
					return 0;
				}
			} else {
				obj = context.global.String;
			}
		} else {
			obj = a;
		}
		f = obj["%"];
		while (f == null && obj.class != null) {
			obj = obj.class;
			f = obj["%"];
		}
		if (f == null) {
			f = context.global.Object["%"];
		}
		if (f != null && f instanceof Routine) {
			if (f.as_function == null) {
				f.as_function = this.routineAsApplicableFunction(f, context);
			}
			f = f.as_function;
			return f.call(context.global, a, b);
		} else {
			return 0;
		}
	}

	add(context: RuntimeContext, a: any, b: any, self: number): any {
		let f: any, obj: any;
		if (Array.isArray(a)) {
			obj = context.global.List;
		} else if (typeof a === "string") {
			obj = context.global.String;
		} else {
			obj = a;
		}
		f = obj["+"];
		while (f == null && obj.class != null) {
			obj = obj.class;
			f = obj["+"];
		}
		if (f == null) {
			f = context.global.Object["+"];
		}
		if (f != null) {
			if (f instanceof Routine) {
				if (f.as_function == null) {
					f.as_function = this.routineAsApplicableFunction(f, context);
				}
				f = f.as_function;
				return f.call(context.global, a, b, self);
			} else if (typeof f === "function") {
				return f.call(context.global, a, b, self);
			}
		} else {
			return 0;
		}
	}

	sub(context: RuntimeContext, a: any, b: any, self: number): any {
		let f: any, obj: any;
		if (Array.isArray(a)) {
			obj = context.global.List;
		} else if (typeof a === "string") {
			if (isFinite(a as any)) {
				(a as any) -= b;
				if (isFinite(a as any)) {
					return a;
				} else {
					return 0;
				}
			} else {
				obj = context.global.String;
			}
		} else {
			obj = a;
		}
		f = obj["-"];
		while (f == null && obj.class != null) {
			obj = obj.class;
			f = obj["-"];
		}
		if (f == null) {
			f = context.global.Object["-"];
		}
		if (f != null) {
			if (f instanceof Routine) {
				if (f.as_function == null) {
					f.as_function = this.routineAsApplicableFunction(f, context);
				}
				f = f.as_function;
				return f.call(context.global, a, b, self);
			} else if (typeof f === "function") {
				return f.call(context.global, a, b, self);
			}
		} else {
			return 0;
		}
	}

	negate(context: RuntimeContext, a: any): any {
		let f: any, obj: any;
		if (Array.isArray(a)) {
			obj = context.global.List;
		} else if (typeof a === "string") {
			if (isFinite(a as any)) {
				return -(a as any);
			} else {
				obj = context.global.String;
			}
		} else {
			obj = a;
		}
		f = obj["-"];
		while (f == null && obj.class != null) {
			obj = obj.class;
			f = obj["-"];
		}
		if (f == null) {
			f = context.global.Object["-"];
		}
		if (f != null) {
			if (f instanceof Routine) {
				if (f.as_function == null) {
					f.as_function = this.routineAsApplicableFunction(f, context);
				}
				f = f.as_function;
				return f.call(context.global, 0, a);
			} else if (typeof f === "function") {
				return f.call(context.global, 0, a);
			}
		} else {
			return 0;
		}
	}

	mul(context: RuntimeContext, a: any, b: any, self: number): any {
		let f: any, obj: any;
		if (Array.isArray(a)) {
			obj = context.global.List;
		} else if (typeof a === "string") {
			if (isFinite(a as any)) {
				(a as any) *= b;
				if (isFinite(a as any)) {
					return a;
				} else {
					return 0;
				}
			} else {
				obj = context.global.String;
			}
		} else {
			obj = a;
		}
		f = obj["*"];
		while (f == null && obj.class != null) {
			obj = obj.class;
			f = obj["*"];
		}
		if (f == null) {
			f = context.global.Object["*"];
		}
		if (f != null) {
			if (f instanceof Routine) {
				if (f.as_function == null) {
					f.as_function = this.routineAsApplicableFunction(f, context);
				}
				f = f.as_function;
				return f.call(context.global, a, b, self);
			} else if (typeof f === "function") {
				return f.call(context.global, a, b, self);
			}
		} else {
			return 0;
		}
	}

	div(context: RuntimeContext, a: any, b: any, self: number): any {
		let f: any, obj: any;
		if (Array.isArray(a)) {
			obj = context.global.List;
		} else if (typeof a === "string") {
			if (isFinite(a as any)) {
				(a as any) /= b;
				if (isFinite(a as any)) {
					return a;
				} else {
					return 0;
				}
			} else {
				obj = context.global.String;
			}
		} else {
			obj = a;
		}
		f = obj["/"];
		while (f == null && obj.class != null) {
			obj = obj.class;
			f = obj["/"];
		}
		if (f == null) {
			f = context.global.Object["/"];
		}
		if (f != null) {
			if (f instanceof Routine) {
				if (f.as_function == null) {
					f.as_function = this.routineAsApplicableFunction(f, context);
				}
				f = f.as_function;
				return f.call(context.global, a, b, self);
			} else if (typeof f === "function") {
				return f.call(context.global, a, b, self);
			}
		} else {
			return 0;
		}
	}

	band(context: RuntimeContext, a: any, b: any, self: number): any {
		let f: any, obj: any;
		if (Array.isArray(a)) {
			obj = context.global.List;
		} else if (typeof a === "string") {
			if (isFinite(a as any)) {
				(a as any) &= b;
				if (isFinite(a as any)) {
					return a;
				} else {
					return 0;
				}
			} else {
				obj = context.global.String;
			}
		} else {
			obj = a;
		}
		f = obj["&"];
		while (f == null && obj.class != null) {
			obj = obj.class;
			f = obj["&"];
		}
		if (f == null) {
			f = context.global.Object["&"];
		}
		if (f != null) {
			if (f instanceof Routine) {
				if (f.as_function == null) {
					f.as_function = this.routineAsApplicableFunction(f, context);
				}
				f = f.as_function;
				return f.call(context.global, a, b, self);
			} else if (typeof f === "function") {
				return f.call(context.global, a, b, self);
			}
		} else {
			return 0;
		}
	}

	bor(context: RuntimeContext, a: any, b: any, self: number): any {
		let f: any, obj: any;
		if (Array.isArray(a)) {
			obj = context.global.List;
		} else if (typeof a === "string") {
			if (isFinite(a as any)) {
				(a as any) |= b;
				if (isFinite(a as any)) {
					return a;
				} else {
					return 0;
				}
			} else {
				obj = context.global.String;
			}
		} else {
			obj = a;
		}
		f = obj["|"];
		while (f == null && obj.class != null) {
			obj = obj.class;
			f = obj["|"];
		}
		if (f == null) {
			f = context.global.Object["|"];
		}
		if (f != null) {
			if (f instanceof Routine) {
				if (f.as_function == null) {
					f.as_function = this.routineAsApplicableFunction(f, context);
				}
				f = f.as_function;
				return f.call(context.global, a, b, self);
			} else if (typeof f === "function") {
				return f.call(context.global, a, b, self);
			}
		} else {
			return 0;
		}
	}

	/**
	 * Main execution loop
	 *
	 * The core fetch-decode-execute loop of the VM.
	 * Iterates through opcodes and performs corresponding actions.
	 *
	 * Performance Note:
	 * This method is the hottest path in the engine.
	 * It uses a giant switch statement for opcode dispatch which is generally
	 * the fastest approach in JavaScript engines.
	 *
	 * @param {any} context - The execution context (global scope)
	 * @returns {any} The result of the last executed statement
	 */
	run(context: any): any {
		let a,
			arg1,
			args,
			argv,
			b,
			c,
			call_stack,
			call_stack_index,
			call_super,
			call_supername,
			con,
			cs,
			err,
			f,
			fc,
			field,
			global,
			i,
			i1,
			i2,
			id,
			index,
			ir,
			iter,
			iterator,
			j,
			k,
			key,
			l,
			len,
			length,
			local_index,
			locals,
			locals_offset,
			loop_by,
			loop_to,
			m,
			n,
			name,
			o,
			obj,
			object,
			op_count,
			op_index,
			opcodes,
			p,
			parent,
			q,
			r,
			rc,
			ref,
			// ref1, // unused
			// ref10, // unused
			ref11,
			ref12,
			// ref13, // unused
			ref14,
			ref2,
			ref3,
			// ref4, // unused
			ref5,
			ref6,
			// ref7, // unused
			ref8,
			ref9,
			res,
			restore_op_index,
			routine,
			s,
			sleep_time,
			src,
			stack,
			stack_index,
			sup,
			t,
			token,
			u,
			v,
			value,
			w;
		routine = this.routine;
		opcodes = this.routine.opcodes;
		arg1 = this.routine.arg1;
		length = opcodes.length;
		op_index = this.op_index;
		stack = this.stack;
		stack_index = this.stack_index;
		locals = this.locals;
		local_index = this.local_index;
		global = this.global || context.global;
		object = this.object || global;
		call_stack = this.call_stack;
		call_stack_index = this.call_stack_index;
		call_super = this.call_super || global;
		call_supername = this.call_supername || "";
		locals_offset = this.locals_offset;
		op_count = 0;
		restore_op_index = -1;

		// Local cache of profiling state for performance
		const profiling = this.profilingEnabled;

		while (op_index < length) {
			if (profiling) {
				this.metrics.ops++;
			}
			switch (opcodes[op_index]) {
				case 1: // OPCODE_TYPE
					v = stack[stack_index];
					switch (typeof v) {
						case "number":
							stack[stack_index] = "number";
							break;
						case "string":
							stack[stack_index] = "string";
							break;
						case "function":
							stack[stack_index] = "function";
							break;
						case "object":
							if (Array.isArray(v)) {
								stack[stack_index] = "list";
							} else if (v instanceof Routine) {
								stack[stack_index] = "function";
							} else {
								stack[stack_index] = "object";
							}
					}
					op_index++;
					break;
				case 2: // OPCODE_TYPE_VARIABLE
					v = object[arg1[op_index]];
					if (v == null) {
						v = global[arg1[op_index]];
					}
					if (v == null) {
						stack[++stack_index] = 0;
					} else {
						switch (typeof v) {
							case "number":
								stack[++stack_index] = "number";
								break;
							case "string":
								stack[++stack_index] = "string";
								break;
							case "function":
								stack[++stack_index] = "function";
								break;
							default:
								if (Array.isArray(v)) {
									stack[++stack_index] = "list";
								} else if (v instanceof Routine) {
									stack[++stack_index] = "function";
								} else {
									stack[++stack_index] = "object";
								}
						}
					}
					op_index++;
					break;
				case 3: // OPCODE_TYPE_PROPERTY
					v = stack[stack_index - 1][stack[stack_index]];
					if (v == null) {
						stack[--stack_index] = 0;
					} else {
						switch (typeof v) {
							case "number":
								stack[--stack_index] = "number";
								break;
							case "string":
								stack[--stack_index] = "string";
								break;
							case "function":
								stack[--stack_index] = "function";
								break;
							default:
								if (Array.isArray(v)) {
									stack[--stack_index] = "list";
								} else if (v instanceof Routine) {
									stack[--stack_index] = "function";
								} else {
									stack[--stack_index] = "object";
								}
						}
					}
					op_index++;
					break;
				case 4: // OPCODE_LOAD_IMPORT
					stack[++stack_index] = routine.import_values[arg1[op_index++]];
					break;
				case 5: // OPCODE_LOAD_THIS
					stack[++stack_index] = object;
					op_index++;
					break;
				case 6: // OPCODE_LOAD_GLOBAL
					stack[++stack_index] = global;
					op_index++;
					break;
				case 10: // CODE_LOAD_VALUE
					stack[++stack_index] = arg1[op_index++];
					break;
				case 11: // OPCODE_LOAD_LOCAL
					stack[++stack_index] = locals[locals_offset + arg1[op_index++]];
					break;
				case 12: // OPCODE_LOAD_VARIABLE
					name = arg1[op_index];
					v = object[name];
					if (v == null && object.class != null) {
						obj = object;
						while (v == null && obj.class != null) {
							obj = obj.class;
							v = obj[name];
						}
					}
					if (v == null) {
						v = global[name];
					}
					if (v == null && !routine.ref[op_index].nowarning) {
						token = routine.ref[op_index].token;
						id = token.tokenizer.filename + "-" + token.line + "-" + token.column;
						if (!context.warnings.using_undefined_variable[id]) {
							context.warnings.using_undefined_variable[id] = {
								file: token.tokenizer.filename,
								line: token.line,
								column: token.column,
								expression: name,
							};
						}
					}
					stack[++stack_index] = v != null ? v : 0;
					op_index++;
					break;
				case 13: // OPCODE_LOAD_LOCAL_OBJECT
					o = locals[locals_offset + arg1[op_index]];
					if (typeof o !== "object") {
						o = locals[locals_offset + arg1[op_index]] = {};
						token = routine.ref[op_index].token;
						id = token.tokenizer.filename + "-" + token.line + "-" + token.column;
						if (!context.warnings.assigning_field_to_undefined[id]) {
							context.warnings.assigning_field_to_undefined[id] = {
								file: token.tokenizer.filename,
								line: token.line,
								column: token.column,
								expression: token.value,
							};
						}
					}
					stack[++stack_index] = o;
					op_index++;
					break;
				case 14: // OPCODE_LOAD_VARIABLE_OBJECT
					name = arg1[op_index];
					obj = object;
					v = obj[name];
					while (v == null && obj.class != null) {
						obj = obj.class;
						v = obj[name];
					}
					if (v == null && global[name] != null) {
						obj = global;
						v = global[name];
					}
					if (v == null || typeof v !== "object") {
						v = obj[name] = {};
						token = routine.ref[op_index].token;
						id = token.tokenizer.filename + "-" + token.line + "-" + token.column;
						if (!context.warnings.assigning_field_to_undefined[id]) {
							context.warnings.assigning_field_to_undefined[id] = {
								file: token.tokenizer.filename,
								line: token.line,
								column: token.column,
								expression: arg1[op_index],
							};
						}
					}
					stack[++stack_index] = v;
					op_index++;
					break;
				case 15: // OPCODE_POP
					stack_index--;
					op_index++;
					break;
				case 16: {
					// OPCODE_LOAD_PROPERTY
					obj = stack[stack_index - 1];
					name = stack[stack_index];

					// Inline Cache Check
					let ic = routine.ics[op_index];
					if (!ic) {
						ic = routine.ics[op_index] = {
							state: IC_STATE.UNINITIALIZED,
							hits: 0,
							misses: 0,
							property: name,
						};
					}

					v = this.resolvePropertyIC(obj, name, ic);

					// Fallback logic if IC didn't fully resolve prototype chain
					if (v == null && obj.class != null) {
						let curr = obj;
						while (v == null && curr.class != null) {
							curr = curr.class;
							v = curr[name];
						}
					}

					if (v == null) {
						v = 0;
						if (!routine.ref[op_index].nowarning) {
							routine.ref[op_index].nowarning = true;
							if (!Array.isArray(obj)) {
								token = routine.ref[op_index].token;
								id = token.tokenizer.filename + "-" + token.line + "-" + token.column;
								context.warnings.using_undefined_variable[id] = {
									file: token.tokenizer.filename,
									line: token.line,
									column: token.column,
									expression: name,
								};
							}
						}
					}
					stack[--stack_index] = v;
					op_index++;
					break;
				}
				case 17: // OPCODE_LOAD_PROPERTY_OBJECT
					v = stack[stack_index - 1][stack[stack_index]];
					if (typeof v !== "object") {
						v = stack[stack_index - 1][stack[stack_index]] = {};
						token = routine.ref[op_index].token;
						id = token.tokenizer.filename + "-" + token.line + "-" + token.column;
						if (!context.warnings.assigning_field_to_undefined[id]) {
							context.warnings.assigning_field_to_undefined[id] = {
								file: token.tokenizer.filename,
								line: token.line,
								column: token.column,
								expression: stack[stack_index],
							};
						}
					}
					stack[--stack_index] = v;
					op_index++;
					break;
				case 18: // OPCODE_CREATE_OBJECT
					if (profiling) {
						this.metrics.allocations++;
					}
					stack[++stack_index] = this.getObject();
					op_index++;
					break;
				case 19: // OPCODE_MAKE_OBJECT
					if (typeof stack[stack_index] !== "object") {
						if (profiling) {
							this.metrics.allocations++;
						}
						stack[stack_index] = this.getObject();
					}
					op_index++;
					break;
				case 20: // OPCODE_CREATE_ARRAY
					if (profiling) {
						this.metrics.allocations++;
					}
					stack[++stack_index] = this.getArray();
					op_index++;
					break;
				case 21: // OPCODE_STORE_LOCAL
					locals[locals_offset + arg1[op_index]] = stack[stack_index];
					op_index++;
					break;
				case 22: // OPCODE_STORE_LOCAL_POP
					locals[locals_offset + arg1[op_index]] = stack[stack_index--];
					op_index++;
					break;
				case 23: // OPCODE_STORE_VARIABLE
					object[arg1[op_index++]] = stack[stack_index];
					break;
				case 24: // OPCODE_CREATE_PROPERTY
					obj = stack[stack_index - 2];
					field = stack[stack_index - 1];
					obj[field] = stack[stack_index];
					stack_index -= 2;
					op_index++;
					break;
				case 25: // OPCODE_STORE_PROPERTY
					obj = stack[stack_index - 2];
					field = stack[stack_index - 1];
					stack[stack_index - 2] = obj[field] = stack[stack_index];
					stack_index -= 2;
					op_index++;
					break;
				case 26: // OPCODE_DELETE
					obj = stack[stack_index - 1];
					field = stack[stack_index];
					delete obj[field];
					stack[(stack_index -= 1)] = 0;
					op_index++;
					break;
				case 27: // OPCODE_UPDATE_CLASS
					name = arg1[op_index];
					// TODO: set classname to variable name
					if (object[name] != null && typeof object[name] === "object") {
						obj = object[name];
						src = stack[stack_index];
						for (key in src) {
							value = src[key];
							obj[key] = value;
						}
					} else {
						object[name] = stack[stack_index];
					}
					op_index++;
					break;
				case 28: // OPCODE_CREATE_CLASS
					res = {} as any;
					parent = stack[stack_index];
					if (parent) {
						(res as any).class = parent;
					} else if (arg1[op_index]) {
						(res as any).class = arg1[op_index];
					}
					stack[stack_index] = res;
					op_index++;
					break;
				case 29: // OPCODE_NEW_CALL
					c = stack[stack_index];
					args = arg1[op_index];
					if (typeof c === "function") {
						a = [];
						for (i = j = 0, ref = args - 1; j <= ref; i = j += 1) {
							a.push(stack[stack_index - args + i]);
						}
						stack_index -= args;
						// NEW CALL is followed by a POP (to get rid of constructor return value)
						stack[stack_index - 1] = new c(...a);
						op_index++;
					} else {
						this.resolveParentClass(c, global);
						res = {
							class: c,
						};
						con = c.constructor;
						while (!con && c.class != null) {
							c = c.class;
							con = c.constructor;
						}
						if (con != null && con instanceof Routine) {
							stack[stack_index - args - 1] = res;
							stack_index--;
							cs = call_stack[call_stack_index] || (call_stack[call_stack_index] = {});
							call_stack_index++;
							cs.routine = routine;
							cs.object = object;
							cs.super = call_super;
							cs.supername = call_supername;
							cs.op_index = op_index + 1;
							locals_offset += routine.locals_size;
							routine = con;
							opcodes = con.opcodes;
							arg1 = con.arg1;
							op_index = 0;
							length = opcodes.length;
							object = res;
							call_super = c;
							call_supername = "constructor";
							if (routine.uses_arguments) {
								argv = stack.slice(stack_index - args + 1, stack_index + 1);
							}
							if (args < con.num_args) {
								for (i = k = args + 1, ref2 = con.num_args; k <= ref2; i = k += 1) {
									stack[++stack_index] = 0;
								}
							} else if (args > con.num_args) {
								stack_index -= args - con.num_args;
							}
							stack[++stack_index] = args;
							if (routine.uses_arguments) {
								stack[++stack_index] = argv;
							}
						} else {
							stack_index -= args;
							stack[stack_index - 1] = res;
							op_index++;
						}
					}
					break;
				case 30: // OPCODE_ADD
					b = stack[stack_index--];
					a = stack[stack_index];
					if (typeof a === "number") {
						a += b;
						stack[stack_index] = isFinite(a) || typeof b === "string" ? a : 0;
					} else {
						stack[stack_index] = this.add(context, a, b, arg1[op_index]);
					}
					op_index++;
					break;
				case 31: // OPCODE_SUB
					b = stack[stack_index--];
					a = stack[stack_index];
					if (typeof a === "number") {
						a -= b;
						stack[stack_index] = isFinite(a) ? a : 0;
					} else {
						stack[stack_index] = this.sub(context, a, b, arg1[op_index]);
					}
					op_index++;
					break;
				case 32: // OPCODE_MUL
					b = stack[stack_index--];
					a = stack[stack_index];
					if (typeof a === "number") {
						a *= b;
						stack[stack_index] = isFinite(a) ? a : 0;
					} else {
						stack[stack_index] = this.mul(context, a, b, 0);
					}
					op_index++;
					break;
				case 33: // OPCODE_DIV
					b = stack[stack_index--];
					a = stack[stack_index];
					if (typeof a === "number") {
						a /= b;
						stack[stack_index] = isFinite(a) ? a : 0;
					} else {
						stack[stack_index] = this.div(context, a, b, 0);
					}
					op_index++;
					break;
				case 34: // OPCODE_MODULO
					b = stack[stack_index--];
					a = stack[stack_index];
					if (typeof a === "number" && typeof b === "number") {
						a %= b;
						stack[stack_index] = isFinite(a) ? a : 0;
					} else {
						stack[stack_index] = this.modulo(context, a, b);
					}
					op_index++;
					break;
				case 35: // OPCODE_BINARY_AND
					b = stack[stack_index--];
					a = stack[stack_index];
					if (typeof a === "number") {
						a &= b;
						stack[stack_index] = isFinite(a) ? a : 0;
					} else {
						stack[stack_index] = this.band(context, a, b, 0);
					}
					op_index++;
					break;
				case 36: // OPCODE_BINARY_OR
					b = stack[stack_index--];
					a = stack[stack_index];
					if (typeof a === "number") {
						a |= b;
						stack[stack_index] = isFinite(a) ? a : 0;
					} else {
						stack[stack_index] = this.bor(context, a, b, 0);
					}
					op_index++;
					break;
				case 37: // OPCODE_SHIFT_LEFT
					v = stack[stack_index - 1] << stack[stack_index];
					stack[--stack_index] = isFinite(v) ? v : 0;
					op_index++;
					break;
				case 38: // OPCODE_SHIFT_RIGHT
					v = stack[stack_index - 1] >> stack[stack_index];
					stack[--stack_index] = isFinite(v) ? v : 0;
					op_index++;
					break;
				case 39: // OPCODE_NEGATE
					a = stack[stack_index];
					if (typeof a === "number") {
						stack[stack_index] = -a;
					} else {
						stack[stack_index] = this.negate(context, a);
					}
					op_index++;
					break;
				case 50: // OPCODE_NOT
					stack[stack_index] = stack[stack_index] ? 0 : 1;
					op_index++;
					break;
				case 68: // OPCODE_LOAD_PROPERTY_ATOP
					obj = stack[stack_index - 1];
					name = stack[stack_index];
					v = obj[name];
					while (v == null && obj.class != null) {
						obj = obj.class;
						v = obj[name];
					}
					if (v == null) {
						v = 0;
						if (!routine.ref[op_index].nowarning) {
							routine.ref[op_index].nowarning = true;
							if (!Array.isArray(obj)) {
								token = routine.ref[op_index].token;
								id = token.tokenizer.filename + "-" + token.line + "-" + token.column;
								context.warnings.using_undefined_variable[id] = {
									file: token.tokenizer.filename,
									line: token.line,
									column: token.column,
									expression: name,
								};
							}
						}
					}
					stack[++stack_index] = v;
					op_index++;
					break;
				case 40: // OPCODE_EQ
					stack[stack_index - 1] = stack[stack_index] === stack[stack_index - 1] ? 1 : 0;
					stack_index--;
					op_index++;
					break;
				case 41: // OPCODE_NEQ
					stack[stack_index - 1] = stack[stack_index] !== stack[stack_index - 1] ? 1 : 0;
					stack_index--;
					op_index++;
					break;
				case 42: // OPCODE_LT
					stack[stack_index - 1] = stack[stack_index - 1] < stack[stack_index] ? 1 : 0;
					stack_index--;
					op_index++;
					break;
				case 43: // OPCODE_GT
					stack[stack_index - 1] = stack[stack_index - 1] > stack[stack_index] ? 1 : 0;
					stack_index--;
					op_index++;
					break;
				case 44: // OPCODE_LTE
					stack[stack_index - 1] = stack[stack_index - 1] <= stack[stack_index] ? 1 : 0;
					stack_index--;
					op_index++;
					break;
				case 45: // OPCODE_GTE
					stack[stack_index - 1] = stack[stack_index - 1] >= stack[stack_index] ? 1 : 0;
					stack_index--;
					op_index++;
					break;
				case 95: // FORLOOP_INIT
					// fix loop_by if not set
					iter = arg1[op_index][0];
					loop_to = locals[locals_offset + iter + 1] = stack[stack_index - 1];
					loop_by = stack[stack_index];
					iterator = locals[locals_offset + iter];
					stack[--stack_index] = 0; // unload 2 values and load default value
					if (loop_by === 0) {
						locals[locals_offset + iter + 2] = loop_to > iterator ? 1 : -1;
						op_index++;
					} else {
						locals[locals_offset + iter + 2] = loop_by;
						if ((loop_by > 0 && iterator > loop_to) || (loop_by < 0 && iterator < loop_to)) {
							op_index = arg1[op_index][1];
						} else {
							op_index++;
						}
					}
					break;
				case 96: // FORLOOP_CONTROL
					iter = arg1[op_index][0];
					loop_by = locals[locals_offset + iter + 2];
					loop_to = locals[locals_offset + iter + 1];
					iterator = locals[locals_offset + iter];
					iterator += loop_by;
					if ((loop_by > 0 && iterator > loop_to) || (loop_by < 0 && iterator < loop_to)) {
						op_index++;
					} else {
						locals[locals_offset + iter] = iterator;
						op_index = arg1[op_index][1];
					}
					if (op_count++ > 100) {
						op_count = 0;
						if (Date.now() > this.time_limit) {
							restore_op_index = op_index;
							op_index = length; // stop the loop without adding a condition statement
						}
					}
					break;
				case 97: // FORIN_INIT
					v = stack[stack_index];
					stack[stack_index] = 0; // default result
					iterator = arg1[op_index][0];
					if (typeof v === "object") {
						if (Array.isArray(v)) {
							locals[locals_offset + iterator + 1] = v;
						} else {
							v = locals[locals_offset + iterator + 1] = Object.keys(v);
						}
					} else if (typeof v === "string") {
						v = locals[locals_offset + iterator + 1] = v.split("");
					} else {
						v = locals[locals_offset + iterator + 1] = [];
					}
					if (v.length === 0) {
						op_index = arg1[op_index][1];
					} else {
						value = v[0];
						// value could be undefined if the array is sparse
						locals[locals_offset + arg1[op_index][0]] = value != null ? value : 0;
						locals[locals_offset + iterator + 2] = 0;
						op_index++;
					}
					break;
				case 98: // FORIN_CONTROL
					iterator = arg1[op_index][0];
					index = locals[locals_offset + iterator + 2] += 1;
					v = locals[locals_offset + iterator + 1];
					if (index < v.length) {
						value = v[index];
						// value could be undefined if the array is sparse
						locals[locals_offset + iterator] = value != null ? value : 0;
						op_index = arg1[op_index][1];
					} else {
						op_index++;
					}
					if (op_count++ > 100) {
						op_count = 0;
						if (Date.now() > this.time_limit) {
							restore_op_index = op_index;
							op_index = length; // stop the loop without adding a condition statement
						}
					}
					break;
				case 80: // OPCODE_JUMP
					op_index = arg1[op_index];
					if (op_count++ > 100) {
						op_count = 0;
						if (Date.now() > this.time_limit) {
							restore_op_index = op_index;
							op_index = length; // stop the loop without adding a condition statement
						}
					}
					break;
				case 81: // OPCODE_JUMPY
					if (stack[stack_index--]) {
						op_index = arg1[op_index];
					} else {
						op_index++;
					}
					break;
				case 82: // OPCODE_JUMPN
					if (!stack[stack_index--]) {
						op_index = arg1[op_index];
					} else {
						op_index++;
					}
					break;
				case 83: // OPCODE_JUMPY_NOPOP
					if (stack[stack_index]) {
						op_index = arg1[op_index];
					} else {
						op_index++;
					}
					break;
				case 84: // OPCODE_JUMPN_NOPOP
					if (!stack[stack_index]) {
						op_index = arg1[op_index];
					} else {
						op_index++;
					}
					break;
				case 89: // OPCODE_LOAD_ROUTINE
					r = arg1[op_index++];
					rc = r.clone();
					ref3 = r.import_refs;
					for (l = 0, len = ref3.length; l < len; l++) {
						ir = ref3[l];
						if (ir === r.import_self) {
							rc.import_values.push(rc);
						} else {
							rc.import_values.push(locals[locals_offset + ir]);
						}
					}
					rc.object = object;
					stack[++stack_index] = rc;
					break;
				case 90: // OPCODE_FUNCTION_CALL
					args = arg1[op_index];
					f = stack[stack_index];
					if (f instanceof Routine) {
						stack_index--;
						cs = call_stack[call_stack_index] || (call_stack[call_stack_index] = {});
						call_stack_index++;
						cs.routine = routine;
						cs.object = object;
						cs.super = call_super;
						cs.supername = call_supername;
						cs.op_index = op_index + 1;

						// NEW: Track stack frame for error reporting
						const token = routine.ref[op_index]?.token;
						if (token) {
							this.call_stack_frames.push({
								functionName: (f as any).source || "[anonymous function]",
								file: token.tokenizer.filename,
								line: token.line,
								column: token.column,
							});
						}

						locals_offset += routine.locals_size;
						routine = f;
						opcodes = f.opcodes;
						arg1 = f.arg1;
						op_index = 0;
						length = opcodes.length;
						object = routine.object != null ? routine.object : global;
						call_super = global;
						call_supername = "";
						if (routine.uses_arguments) {
							argv = stack.slice(stack_index - args + 1, stack_index + 1);
						}
						if (args < f.num_args) {
							for (i = m = args + 1, ref5 = f.num_args; m <= ref5; i = m += 1) {
								stack[++stack_index] = 0;
							}
						} else if (args > f.num_args) {
							stack_index -= args - f.num_args;
						}
						stack[++stack_index] = args;
						if (routine.uses_arguments) {
							stack[++stack_index] = argv;
						}
					} else if (typeof f === "function") {
						switch (args) {
							case 0:
								try {
									v = f();
								} catch (error) {
									err = error;
									console.error(err);
									v = 0;
								}
								stack[stack_index] = v != null ? v : 0;
								break;
							case 1:
								try {
									v = f(this.argToNative(stack[stack_index - 1], context));
								} catch (error) {
									err = error;
									console.error(err);
									v = 0;
								}
								stack[stack_index - 1] = v != null ? v : 0;
								stack_index -= 1;
								break;
							default:
								argv = [];
								stack_index -= args;
								for (i = n = 0, ref6 = args - 1; n <= ref6; i = n += 1) {
									argv[i] = this.argToNative(stack[stack_index + i], context);
								}
								try {
									v = f.apply(null, argv);
								} catch (error) {
									err = error;
									console.error(err);
									v = 0;
								}
								stack[stack_index] = v != null ? v : 0;
						}
						op_index++;
					} else {
						stack_index -= args;
						stack[stack_index] = f != null ? f : 0;
						token = routine.ref[op_index].token;
						id = token.tokenizer.filename + "-" + token.line + "-" + token.column;
						if (!context.warnings.invoking_non_function[id]) {
							fc = routine.ref[op_index];
							i1 = fc.expression.token.start;
							i2 = fc.token.start + fc.token.length;
							context.warnings.invoking_non_function[id] = {
								file: token.tokenizer.filename,
								line: token.line,
								column: token.column,
								expression: fc.token.tokenizer.input.substring(i1, i2),
							};
						}
						op_index++;
					}
					break;
				case 91: // OPCODE_FUNCTION_APPLY_VARIABLE
					name = stack[stack_index];
					sup = obj = object;
					f = obj[name];
					if (f == null) {
						while (f == null && sup.class != null) {
							sup = sup.class;
							f = sup[name];
						}
						if (f == null) {
							f = global.Object[name];
						}
						if (f == null) {
							f = global[name];
							sup = global;
							obj = global;
						}
					}
					args = arg1[op_index];
					if (f instanceof Routine) {
						stack_index -= 1;
						cs = call_stack[call_stack_index] || (call_stack[call_stack_index] = {});
						call_stack_index++;
						cs.routine = routine;
						cs.object = object;
						cs.super = call_super;
						cs.supername = call_supername;
						cs.op_index = op_index + 1;
						locals_offset += routine.locals_size;
						routine = f;
						opcodes = f.opcodes;
						arg1 = f.arg1;
						op_index = 0;
						length = opcodes.length;
						object = obj;
						call_super = sup;
						call_supername = name;
						if (routine.uses_arguments) {
							argv = stack.slice(stack_index - args + 1, stack_index + 1);
						}
						if (args < f.num_args) {
							for (i = p = args + 1, ref8 = f.num_args; p <= ref8; i = p += 1) {
								stack[++stack_index] = 0;
							}
						} else if (args > f.num_args) {
							stack_index -= args - f.num_args;
						}
						stack[++stack_index] = args;
						if (routine.uses_arguments) {
							stack[++stack_index] = argv;
						}
					} else if (typeof f === "function") {
						switch (args) {
							case 0:
								try {
									v = f.call(obj);
								} catch (error) {
									err = error;
									console.error(err);
									v = 0;
								}
								stack[stack_index] = v != null ? v : 0;
								break;
							case 1:
								try {
									v = f.call(obj, this.argToNative(stack[stack_index - 1], context));
								} catch (error) {
									err = error;
									console.error(err);
									v = 0;
								}
								stack[--stack_index] = v != null ? v : 0;
								break;
							default:
								argv = [];
								stack_index -= args;
								for (i = q = 0, ref9 = args - 1; q <= ref9; i = q += 1) {
									argv[i] = this.argToNative(stack[stack_index + i], context);
								}
								try {
									v = f.apply(obj, argv);
								} catch (error) {
									err = error;
									console.error(err);
									v = 0;
								}
								stack[stack_index] = v != null ? v : 0;
						}
						op_index++;
					} else {
						stack_index -= args;
						stack[stack_index] = f != null ? f : 0;
						token = routine.ref[op_index].token;
						id = token.tokenizer.filename + "-" + token.line + "-" + token.column;
						if (!context.warnings.invoking_non_function[id]) {
							fc = routine.ref[op_index];
							i1 = fc.expression.token.start;
							i2 = fc.token.start + fc.token.length;
							context.warnings.invoking_non_function[id] = {
								file: token.tokenizer.filename,
								line: token.line,
								column: token.column,
								expression: fc.token.tokenizer.input.substring(i1, i2),
							};
						}
						op_index++;
					}
					break;
				case 92: // OPCODE_FUNCTION_APPLY_PROPERTY
					obj = stack[stack_index - 1];
					sup = obj;
					name = stack[stack_index];
					f = obj[name];
					while (f == null && sup.class != null) {
						sup = sup.class;
						f = sup[name];
					}
					args = arg1[op_index];
					if (f == null) {
						if (obj instanceof Routine) {
							f = global.Function[name];
						} else if (typeof obj === "string") {
							f = global.String[name];
						} else if (typeof obj === "number") {
							f = global.Number[name];
						} else if (Array.isArray(obj)) {
							f = global.List[name];
						} else if (typeof obj === "object") {
							f = global.Object[name];
						}
					}
					if (f instanceof Routine) {
						stack_index -= 2;
						cs = call_stack[call_stack_index] || (call_stack[call_stack_index] = {});
						call_stack_index++;
						cs.object = object;
						cs.super = call_super;
						cs.supername = call_supername;
						cs.routine = routine;
						cs.op_index = op_index + 1;
						locals_offset += routine.locals_size;
						routine = f;
						opcodes = f.opcodes;
						arg1 = f.arg1;
						op_index = 0;
						length = opcodes.length;
						object = obj;
						call_super = sup;
						call_supername = name;
						if (routine.uses_arguments) {
							argv = stack.slice(stack_index - args + 1, stack_index + 1);
						}
						if (args < f.num_args) {
							for (i = s = args + 1, ref11 = f.num_args; s <= ref11; i = s += 1) {
								stack[++stack_index] = 0;
							}
						} else if (args > f.num_args) {
							stack_index -= args - f.num_args;
						}
						stack[++stack_index] = args;
						if (routine.uses_arguments) {
							stack[++stack_index] = argv;
						}
					} else if (typeof f === "function") {
						switch (args) {
							case 0:
								try {
									v = f.call(obj);
								} catch (error) {
									err = error;
									console.error(err);
									v = 0;
								}
								stack[--stack_index] = v != null ? v : 0;
								break;
							case 1:
								try {
									v = f.call(obj, this.argToNative(stack[stack_index - 2], context));
								} catch (error) {
									err = error;
									console.error(err);
									v = 0;
								}
								stack[stack_index - 2] = v != null ? v : 0;
								stack_index -= 2;
								break;
							default:
								argv = [];
								stack_index -= args + 1;
								for (i = u = 0, ref12 = args - 1; u <= ref12; i = u += 1) {
									argv[i] = this.argToNative(stack[stack_index + i], context);
								}
								try {
									v = f.apply(obj, argv);
								} catch (error) {
									err = error;
									console.error(err);
									v = 0;
								}
								stack[stack_index] = v != null ? v : 0;
						}
						op_index++;
					} else {
						stack_index -= args + 1;
						stack[stack_index] = f != null ? f : 0;
						token = routine.ref[op_index].token;
						id = token.tokenizer.filename + "-" + token.line + "-" + token.column;
						if (!context.warnings.invoking_non_function[id]) {
							fc = routine.ref[op_index];
							i1 = fc.expression.token.start;
							i2 = fc.token.start + fc.token.length;
							context.warnings.invoking_non_function[id] = {
								file: token.tokenizer.filename,
								line: token.line,
								column: token.column,
								expression: fc.token.tokenizer.input.substring(i1, i2),
							};
						}
						op_index++;
					}
					break;
				case 93: // OPCODE_SUPER_CALL
					if (call_super != null && call_supername != null) {
						sup = call_super;
						f = null;
						while (f == null && sup.class != null) {
							sup = sup.class;
							f = sup[call_supername];
						}
						if (f != null && f instanceof Routine) {
							args = arg1[op_index];
							cs = call_stack[call_stack_index] || (call_stack[call_stack_index] = {});
							call_stack_index++;
							cs.object = object;
							cs.super = call_super;
							cs.supername = call_supername;
							cs.routine = routine;
							cs.op_index = op_index + 1;
							locals_offset += routine.locals_size;
							routine = f;
							opcodes = f.opcodes;
							arg1 = f.arg1;
							op_index = 0;
							length = opcodes.length;
							call_super = sup;
							if (routine.uses_arguments) {
								argv = stack.slice(stack_index - args + 1, stack_index + 1);
							}
							if (args < f.num_args) {
								for (i = w = args + 1, ref14 = f.num_args; w <= ref14; i = w += 1) {
									stack[++stack_index] = 0;
								}
							} else if (args > f.num_args) {
								stack_index -= args - f.num_args;
							}
							stack[++stack_index] = args;
							if (routine.uses_arguments) {
								stack[++stack_index] = argv;
							}
						} else {
							args = arg1[op_index];
							stack_index -= args;
							stack[++stack_index] = 0;
							op_index++;
						}
					} else {
						args = arg1[op_index];
						stack_index -= args;
						stack[++stack_index] = 0;
						op_index++;
					}
					break;
				case 94: // OPCODE_RETURN
					local_index -= arg1[op_index];
					if (call_stack_index <= 0) {
						op_index = length;
					} else {
						cs = call_stack[--call_stack_index];
						object = cs.object;
						call_super = cs.super;
						call_supername = cs.supername;
						routine = cs.routine;
						op_index = cs.op_index;
						opcodes = routine.opcodes;
						arg1 = routine.arg1;
						locals_offset -= routine.locals_size;
						length = opcodes.length;
					}
					break;
				case 100: // OPCODE_UNARY_FUNC
					v = arg1[op_index](stack[stack_index]);
					stack[stack_index] = isFinite(v) ? v : 0;
					op_index++;
					break;
				case 101: // OPCODE_BINARY_FUNC
					v = arg1[op_index](stack[stack_index - 1], stack[stack_index]);
					stack[--stack_index] = isFinite(v) ? v : 0;
					op_index++;
					break;
				case 110: // OPCODE_AFTER
					t = this.runner.createThread(stack[stack_index - 1], stack[stack_index], false);
					stack[--stack_index] = t;
					op_index += 1;
					break;
				// add thread to the runner thread list
				case 111: // OPCODE_EVERY
					t = this.runner.createThread(stack[stack_index - 1], stack[stack_index], true);
					stack[--stack_index] = t;
					op_index += 1;
					break;
				// add thread to the runner thread list
				case 112: // OPCODE_DO
					t = this.runner.createThread(stack[stack_index], 0, false);
					stack[stack_index] = t;
					op_index += 1;
					break;
				// add thread to the runner thread list
				case 113: // OPCODE_SLEEP
					sleep_time = isFinite(stack[stack_index]) ? stack[stack_index] : 0;
					this.runner.sleep(sleep_time);
					op_index += 1;
					restore_op_index = op_index;
					op_index = length; // stop the thread
					break;

				// Fused Opcodes
				case 120: // LOAD_VAR_CALL
					// { name: string, args: number }
					name = arg1[op_index].name;
					args = arg1[op_index].args;

					// Load Variable Logic
					v = object[name];
					if (v == null && object.class != null) {
						obj = object;
						while (v == null && obj.class != null) {
							obj = obj.class;
							v = obj[name];
						}
					}
					if (v == null) {
						v = global[name];
					}

					// Check for warning (using undefined variable)
					if (v == null && !routine.ref[op_index].nowarning) {
						token = routine.ref[op_index].token;
						id = token.tokenizer.filename + "-" + token.line + "-" + token.column;
						if (!context.warnings.using_undefined_variable[id]) {
							context.warnings.using_undefined_variable[id] = {
								file: token.tokenizer.filename,
								line: token.line,
								column: token.column,
								expression: name,
							};
						}
					}
					f = v != null ? v : 0;

					// Function Call Logic
					if (f instanceof Routine) {
						cs = call_stack[call_stack_index] || (call_stack[call_stack_index] = {});
						call_stack_index++;
						cs.routine = routine;
						cs.object = object;
						cs.super = call_super;
						cs.supername = call_supername;
						cs.op_index = op_index + 1;

						// NEW: Track stack frame for error reporting
						const token = routine.ref[op_index]?.token;
						if (token) {
							this.call_stack_frames.push({
								functionName: (f as any).source || "[anonymous function]",
								file: token.tokenizer.filename,
								line: token.line,
								column: token.column,
							});
						}

						locals_offset += routine.locals_size;
						routine = f;
						opcodes = f.opcodes;
						arg1 = f.arg1;
						op_index = 0;
						length = opcodes.length;
						object = routine.object != null ? routine.object : global;
						call_super = global;
						call_supername = "";

						if (routine.uses_arguments) {
							argv = stack.slice(stack_index - args + 1, stack_index + 1);
						}

						if (args < f.num_args) {
							for (i = m = args + 1, ref5 = f.num_args; m <= ref5; i = m += 1) {
								stack[++stack_index] = 0;
							}
						} else if (args > f.num_args) {
							stack_index -= args - f.num_args;
						}

						stack[++stack_index] = args;
						if (routine.uses_arguments) {
							stack[++stack_index] = argv;
						}
					} else if (typeof f === "function") {
						switch (args) {
							case 0:
								try {
									v = f();
								} catch (e) {
									console.error(e);
									v = 0;
								}
								stack[++stack_index] = v != null ? v : 0;
								break;
							case 1:
								try {
									v = f(this.argToNative(stack[stack_index], context));
								} catch (e) {
									console.error(e);
									v = 0;
								}
								stack[stack_index] = v != null ? v : 0;
								break;
							default:
								argv = [];
								stack_index -= args - 1; // Point to first arg
								for (i = 0; i < args; i++) {
									argv[i] = this.argToNative(stack[stack_index + i], context);
								}
								try {
									v = f.apply(null, argv);
								} catch (e) {
									console.error(e);
									v = 0;
								}
								stack[stack_index] = v != null ? v : 0;
						}
						op_index++;
					} else {
						// Not a function
						stack_index -= args;
						stack[++stack_index] = f != null ? f : 0;
						op_index++;
					}
					break;

				case 121: // LOAD_PROP_CALL
					// args: number
					args = arg1[op_index];

					// LOAD_PROPERTY logic
					obj = stack[stack_index - 1];
					name = stack[stack_index];
					v = obj[name];
					while (v == null && obj.class != null) {
						obj = obj.class;
						v = obj[name];
					}

					if (v == null) {
						v = 0;
						if (!routine.ref[op_index].nowarning) {
							routine.ref[op_index].nowarning = true;
							if (!Array.isArray(obj)) {
								token = routine.ref[op_index].token;
								id = token.tokenizer.filename + "-" + token.line + "-" + token.column;
								context.warnings.using_undefined_variable[id] = {
									file: token.tokenizer.filename,
									line: token.line,
									column: token.column,
									expression: name,
								};
							}
						}
					}
					f = v;
					stack[--stack_index] = f; // Replace name with function on stack

					// FUNCTION_CALL logic (simplified duplication for fusion)
					if (f instanceof Routine) {
						stack_index--; // Pop function
						cs = call_stack[call_stack_index] || (call_stack[call_stack_index] = {});
						call_stack_index++;
						cs.routine = routine;
						cs.object = object;
						cs.super = call_super;
						cs.supername = call_supername;
						cs.op_index = op_index + 1;

						// NEW: Track stack frame for error reporting
						const token = routine.ref[op_index]?.token;
						if (token) {
							this.call_stack_frames.push({
								functionName: (f as any).source || "[anonymous function]",
								file: token.tokenizer.filename,
								line: token.line,
								column: token.column,
							});
						}

						locals_offset += routine.locals_size;
						routine = f;
						opcodes = f.opcodes;
						arg1 = f.arg1;
						op_index = 0;
						length = opcodes.length;
						object = routine.object != null ? routine.object : global;
						call_super = global;
						call_supername = "";

						if (routine.uses_arguments) {
							argv = stack.slice(stack_index - args + 1, stack_index + 1);
						}

						if (args < f.num_args) {
							for (i = m = args + 1, ref5 = f.num_args; m <= ref5; i = m += 1) {
								stack[++stack_index] = 0;
							}
						} else if (args > f.num_args) {
							stack_index -= args - f.num_args;
						}

						stack[++stack_index] = args;
						if (routine.uses_arguments) {
							stack[++stack_index] = argv;
						}
					} else if (typeof f === "function") {
						switch (args) {
							case 0:
								try {
									v = f();
								} catch (e) {
									console.error(e);
									v = 0;
								}
								stack[stack_index] = v != null ? v : 0;
								break;
							case 1:
								try {
									v = f(this.argToNative(stack[stack_index - 1], context));
								} catch (e) {
									console.error(e);
									v = 0;
								}
								stack[stack_index - 1] = v != null ? v : 0;
								stack_index--;
								break;
							default:
								argv = [];
								stack_index -= args;
								for (i = 0; i < args; i++) {
									argv[i] = this.argToNative(stack[stack_index + i], context);
								}
								try {
									v = f.apply(null, argv);
								} catch (e) {
									console.error(e);
									v = 0;
								}
								stack[stack_index] = v != null ? v : 0;
						}
						op_index++;
					} else {
						stack_index -= args;
						stack[stack_index] = f != null ? f : 0;
						op_index++;
					}
					break;

				case 122: // LOAD_CONST_ADD
					// arg1[op_index] is the constant value
					a = arg1[op_index];
					b = stack[stack_index];

					if (typeof b === "number") {
						b += a;
						stack[stack_index] = isFinite(b) ? b : 0;
					} else {
						// Fallback to full add logic for non-numbers
						stack[stack_index] = this.add(context, b, a, 0);
					}
					op_index++;
					break;

				case 200: // COMPILED
					stack_index = arg1[op_index](stack, stack_index, locals, locals_offset, object, global);
					op_index++;
					break;
				default:
					throw `Unsupported operation: ${opcodes[op_index]}`;
			}
		}
		if (restore_op_index >= 0) {
			this.op_index = restore_op_index;
			this.routine = routine;
			this.stack_index = stack_index;
			this.local_index = local_index;
			this.object = object;
			this.call_stack_index = call_stack_index;
			this.call_super = call_super;
			this.call_supername = call_supername;
			this.locals_offset = locals_offset;
			this.done = false;
		} else {
			this.op_index = 0;
			this.done = true;
			if (this.routine.callback != null) {
				this.routine.callback(stack[stack_index]);
				this.routine.callback = null;
			}
		}
		// console.info """stack_index: #{stack_index}"""
		// console.info stack
		if (this.log) {
			console.info("total operations: " + op_count);
			console.info(`stack_index: ${stack_index}`);
			console.info(`result: ${stack[stack_index]}`);
		}
		return stack[stack_index];
	}
}
