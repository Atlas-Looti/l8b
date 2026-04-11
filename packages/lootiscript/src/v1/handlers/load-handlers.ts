/**
 * Load opcodes (cases 4-6, 10-17, 68)
 *
 * OPCODE_LOAD_IMPORT         (4)  - push imported value
 * OPCODE_LOAD_THIS           (5)  - push current object
 * OPCODE_LOAD_GLOBAL         (6)  - push global object
 * CODE_LOAD_VALUE            (10) - push constant value
 * OPCODE_LOAD_LOCAL          (11) - push local variable
 * OPCODE_LOAD_VARIABLE       (12) - push variable (with class chain walk)
 * OPCODE_LOAD_LOCAL_OBJECT   (13) - push/create local object
 * OPCODE_LOAD_VARIABLE_OBJECT(14) - push/create variable object
 * OPCODE_POP                  (15) - discard stack top
 * OPCODE_LOAD_PROPERTY        (16) - push object[property]
 * OPCODE_LOAD_PROPERTY_OBJECT (17) - push/create object property
 * OPCODE_LOAD_PROPERTY_ATOP   (68) - push object[property] without popping
 *
 * NOTE: These handlers are written but not yet wired into processor.ts.
 *
 * @module lootiscript/handlers/load-handlers
 */

import type { Processor } from "../processor";

/**
 * Dispatch stub for load opcodes (cases 4-6, 10-17, 68).
 *
 * This is a placeholder. Full implementation exists but needs
 * validation before wiring into processor.ts.
 */
export function handleLoadOps(_processor: Processor, opcodes: number[], _opIndex: number): number {
	const opIndex = _opIndex;
	switch (opcodes[opIndex]) {
		default:
			return opIndex + 1;
	}
}
