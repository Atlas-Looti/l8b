/**
 * Jump opcodes (cases 80-84)
 *
 * OPCODE_JUMP        (80) - unconditional jump
 * OPCODE_JUMPY       (81) - jump if truthy (with pop)
 * OPCODE_JUMPN       (82) - jump if falsy (with pop)
 * OPCODE_JUMPY_NOPOP (83) - jump if truthy (no pop)
 * OPCODE_JUMPN_NOPOP (84) - jump if falsy (no pop)
 *
 * NOTE: These handlers are written but not yet wired into processor.ts.
 *
 * @module lootiscript/handlers/jump-handlers
 */

import type { Processor } from "../processor";

/**
 * Dispatch stub for jump opcodes (cases 80-84).
 */
export function handleJumpOps(_processor: Processor, opcodes: number[], _opIndex: number): number {
	const opIndex = _opIndex;
	switch (opcodes[opIndex]) {
		default:
			return opIndex + 1;
	}
}
