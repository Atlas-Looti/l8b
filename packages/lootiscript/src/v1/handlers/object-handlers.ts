/**
 * Object/Array creation opcodes (cases 18-20)
 *
 * OPCODE_CREATE_OBJECT (18) - create empty object and push to stack
 * OPCODE_MAKE_OBJECT   (19) - convert stack top to object if not already
 * OPCODE_CREATE_ARRAY (20) - create empty array and push to stack
 *
 * NOTE: These handlers are written but not yet wired into processor.ts.
 *
 * @module lootiscript/handlers/object-handlers
 */

import type { Processor } from "../processor";

/**
 * Dispatch stub for object/array creation opcodes (cases 18-20).
 */
export function handleObjectOps(_processor: Processor, opcodes: number[], _opIndex: number): number {
	const opIndex = _opIndex;
	switch (opcodes[opIndex]) {
		default:
			return opIndex + 1;
	}
}
