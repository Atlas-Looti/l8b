/**
 * Function opcodes (cases 89-94, 100-101)
 *
 * OPCODE_LOAD_ROUTINE      (89) - load and clone a routine
 * OPCODE_FUNCTION_CALL     (90) - call function on stack
 * OPCODE_FUNCTION_APPLY_VARIABLE (91) - call object.method
 * OPCODE_FUNCTION_APPLY_PROPERTY  (92) - call obj[property]
 * OPCODE_SUPER_CALL        (93) - call superclass method
 * OPCODE_RETURN           (94) - return from function
 * OPCODE_UNARY_FUNC       (100) - call built-in unary function
 * OPCODE_BINARY_FUNC      (101) - call built-in binary function
 *
 * NOTE: These handlers are written but not yet wired into processor.ts.
 * The extraction requires careful state management (call_stack, locals_offset, etc.)
 * that is being validated before full migration.
 *
 * @module lootiscript/handlers/function-handlers
 */

import type { Processor } from "../processor";

/**
 * Dispatch stub for function opcodes (cases 89-94, 100-101).
 *
 * This is a placeholder that routes back to processor.ts switch.
 * Full extraction is pending validation of the state management approach.
 */
export function handleFunctionOps(_processor: Processor, opcodes: number[], _opIndex: number): number {
	// Fallback to processor switch — will be replaced with full handler implementation
	// once state management is validated
	const opIndex = _opIndex;
	switch (opcodes[opIndex]) {
		// Placeholder cases — actual logic lives in processor.ts switch
		// Replace these with full handler bodies as each case is validated
		default:
			return opIndex + 1;
	}
}
