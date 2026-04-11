/**
 * Type introspection opcodes (cases 1-3)
 *
 * OPCODE_TYPE         (1) - determine type of stack top value
 * OPCODE_TYPE_VARIABLE(2) - determine type of a variable
 * OPCODE_TYPE_PROPERTY(3) - determine type of an object property
 *
 * @module lootiscript/handlers/type-handlers
 */

import type { Processor } from "../processor";
import type { RuntimeContext } from "../processor-types";

/**
 * Dispatch for type introspection opcodes (cases 1-3).
 * Replaces the inline case bodies in processor.ts run() switch.
 *
 * The handler operates directly on Processor instance properties:
 * stack, stack_index, object, routine.
 *
 * @returns the new op_index value
 */
export function handleTypeOps(processor: Processor, opcodes: number[], opIndex: number, context: RuntimeContext): number {
	const { routine, stack, object } = processor;

	switch (opcodes[opIndex]) {
		case 1: // OPCODE_TYPE
		{
			const si = processor.stack_index;
			const v = stack[si];
			if (v === null || v === undefined) {
				stack[si] = "object";
			} else if (typeof v === "number") {
				stack[si] = "number";
			} else if (typeof v === "string") {
				stack[si] = "string";
			} else if (typeof v === "function") {
				stack[si] = "function";
			} else if (Array.isArray(v)) {
				stack[si] = "list";
			} else {
				stack[si] = "object";
			}
			return opIndex + 1;
		}

		case 2: // OPCODE_TYPE_VARIABLE
		{
			let v = object[routine.arg1[opIndex] as string];
			if (v == null && (object as any).class != null) {
				let obj = object as any;
				while (v == null && obj.class != null) {
					obj = obj.class;
					v = obj[routine.arg1[opIndex] as string];
				}
			}
			if (v == null) {
				v = context.global[routine.arg1[opIndex] as string];
			}
			const si = ++processor.stack_index;
			if (v == null) {
				stack[si] = 0;
			} else if (typeof v === "number") {
				stack[si] = "number";
			} else if (typeof v === "string") {
				stack[si] = "string";
			} else if (typeof v === "function") {
				stack[si] = "function";
			} else if (Array.isArray(v)) {
				stack[si] = "list";
			} else {
				stack[si] = "object";
			}
			return opIndex + 1;
		}

		case 3: // OPCODE_TYPE_PROPERTY
		{
			const obj = stack[processor.stack_index - 1] as Record<string, unknown>;
			const prop = stack[processor.stack_index];
			let v: unknown;
			if (obj != null) {
				v = obj[prop as string];
			}
			const si = --processor.stack_index;
			if (v == null) {
				stack[si] = 0;
			} else if (typeof v === "number") {
				stack[si] = "number";
			} else if (typeof v === "string") {
				stack[si] = "string";
			} else if (typeof v === "function") {
				stack[si] = "function";
			} else if (Array.isArray(v)) {
				stack[si] = "list";
			} else {
				stack[si] = "object";
			}
			return opIndex + 1;
		}
	}

	return opIndex + 1;
}
