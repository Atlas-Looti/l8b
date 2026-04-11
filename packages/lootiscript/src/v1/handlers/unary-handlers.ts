/**
 * Unary opcodes (case 50)
 *
 * OPCODE_NOT (50) - logical not (truthy→1, falsy→0)
 *
 * @module lootiscript/handlers/unary-handlers
 */

import type { Processor } from "../processor";

/**
 * Dispatch for unary opcodes (case 50).
 * Replaces the inline case body in processor.ts run() switch.
 */
export function handleUnaryOps(processor: Processor, opcodes: number[], opIndex: number): number {
	const { stack } = processor;

	switch (opcodes[opIndex]) {
		case 50: // OPCODE_NOT
			stack[processor.stack_index] = stack[processor.stack_index] ? 0 : 1;
			return opIndex + 1;
	}

	return opIndex + 1;
}
