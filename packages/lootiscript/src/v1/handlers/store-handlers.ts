/**
 * Store opcodes (cases 21-27)
 *
 * OPCODE_STORE_LOCAL        (21) - store stack top into local slot
 * OPCODE_STORE_LOCAL_POP    (22) - store and pop
 * OPCODE_STORE_VARIABLE     (23) - store into object property
 * OPCODE_CREATE_PROPERTY    (24) - pop key, pop value, store into object
 * OPCODE_STORE_PROPERTY     (25) - store into object property (keeping value)
 * OPCODE_DELETE             (26) - delete object[property]
 * OPCODE_UPDATE_CLASS       (27) - merge properties into class
 *
 * NOTE: These handlers are written but not yet wired into processor.ts.
 *
 * @module lootiscript/handlers/store-handlers
 */

import type { Processor } from "../processor";

/**
 * Dispatch stub for store opcodes (cases 21-27).
 */
export function handleStoreOps(_processor: Processor, opcodes: number[], _opIndex: number): number {
	const opIndex = _opIndex;
	switch (opcodes[opIndex]) {
		default:
			return opIndex + 1;
	}
}
