/**
 * Fused opcodes (cases 120-131)
 *
 * LOAD_VAR_CALL    (120) - load variable + call (fused)
 * LOAD_PROP_CALL   (121) - load property + call (fused)
 * LOAD_CONST_ADD   (122) - load constant + add
 * LOAD_CONST_SUB   (123) - load constant + subtract
 * LOAD_CONST_MUL   (124) - load constant + multiply
 * LOAD_LOCAL_ADD   (125) - load local + add
 * LOAD_LOCAL_SUB   (126) - load local + subtract
 * LOAD_LOCAL_MUL   (127) - load local + multiply
 * LOAD_CONST_DIV   (128) - load constant + divide
 * LOAD_LOCAL_LT    (129) - load local + less-than compare
 * LOAD_LOCAL_GT    (130) - load local + greater-than compare
 * LOAD_LOCAL_EQ    (131) - load local + equality compare
 *
 * NOTE: These handlers are written but not yet wired into processor.ts.
 * The extraction requires careful state management that is being validated.
 *
 * @module lootiscript/handlers/fused-handlers
 */

import type { Processor } from "../processor";

/**
 * Dispatch stub for fused opcodes (cases 120-131).
 *
 * This is a placeholder that routes back to processor.ts switch.
 * Full extraction is pending validation of the state management approach.
 */
export function handleFusedOps(_processor: Processor, opcodes: number[], _opIndex: number): number {
	const opIndex = _opIndex;
	switch (opcodes[opIndex]) {
		default:
			return opIndex + 1;
	}
}
