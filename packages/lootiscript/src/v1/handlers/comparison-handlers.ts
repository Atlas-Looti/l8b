/**
 * Comparison opcodes (cases 40-45)
 *
 * OPCODE_EQ  (40) - equality check (===)
 * OPCODE_NEQ (41) - inequality check (!==)
 * OPCODE_LT  (42) - less than
 * OPCODE_GT  (43) - greater than
 * OPCODE_LTE (44) - less than or equal
 * OPCODE_GTE (45) - greater than or equal
 *
 * @module lootiscript/handlers/comparison-handlers
 */

import type { Processor } from "../processor";

/**
 * Dispatch for comparison opcodes (cases 40-45).
 * Returns { opIndex, stackIndex } so the caller can update local variables.
 */
export function handleComparisonOps(processor: Processor, opcodes: number[], opIndex: number): { opIndex: number; stackIndex: number } {
	const stack = processor.stack;
	let stackIndex = processor.stack_index;

	switch (opcodes[opIndex]) {
		case 40: // OPCODE_EQ
			stack[stackIndex - 1] = stack[stackIndex] === stack[stackIndex - 1] ? 1 : 0;
			stackIndex--;
			return { opIndex: opIndex + 1, stackIndex };

		case 41: // OPCODE_NEQ
			stack[stackIndex - 1] = stack[stackIndex] !== stack[stackIndex - 1] ? 1 : 0;
			stackIndex--;
			return { opIndex: opIndex + 1, stackIndex };

		case 42: // OPCODE_LT
			stack[stackIndex - 1] = (stack[stackIndex - 1] as number) < (stack[stackIndex] as number) ? 1 : 0;
			stackIndex--;
			return { opIndex: opIndex + 1, stackIndex };

		case 43: // OPCODE_GT
			stack[stackIndex - 1] = (stack[stackIndex - 1] as number) > (stack[stackIndex] as number) ? 1 : 0;
			stackIndex--;
			return { opIndex: opIndex + 1, stackIndex };

		case 44: // OPCODE_LTE
			stack[stackIndex - 1] = (stack[stackIndex - 1] as number) <= (stack[stackIndex] as number) ? 1 : 0;
			stackIndex--;
			return { opIndex: opIndex + 1, stackIndex };

		case 45: // OPCODE_GTE
			stack[stackIndex - 1] = (stack[stackIndex - 1] as number) >= (stack[stackIndex] as number) ? 1 : 0;
			stackIndex--;
			return { opIndex: opIndex + 1, stackIndex };
	}

	return { opIndex: opIndex + 1, stackIndex };
}
