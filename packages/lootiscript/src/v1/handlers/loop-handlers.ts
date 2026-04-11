/**
 * Loop opcodes (cases 95-98)
 *
 * FORLOOP_INIT (95) - initialize for loop (for i = start to end [by step])
 * FORLOOP_CONTROL (96) - check and advance for loop iterator
 * FORIN_INIT (97) - initialize for-in loop over object/array/string
 * FORIN_CONTROL (98) - advance for-in iterator
 *
 * NOTE: These handlers are written but not yet wired into processor.ts.
 *
 * @module lootiscript/handlers/loop-handlers
 */

import type { Processor } from "../processor";

/**
 * Dispatch stub for loop opcodes (cases 95-98).
 */
export function handleLoopOps(_processor: Processor, opcodes: number[], _opIndex: number): number {
	const opIndex = _opIndex;
	switch (opcodes[opIndex]) {
		default:
			return opIndex + 1;
	}
}
