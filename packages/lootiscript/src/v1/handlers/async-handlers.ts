/**
 * Async opcodes (cases 110-113)
 *
 * OPCODE_AFTER  (110) - run after delay (one-shot)
 * OPCODE_EVERY  (111) - run every delay (repeating)
 * OPCODE_DO     (112) - run immediately (fire and forget)
 * OPCODE_SLEEP  (113) - pause current thread
 *
 * @module lootiscript/handlers/async-handlers
 */

import type { Runner } from "../processor-types";
import type { Routine } from "../routine";

export function handleAsyncOps(
	opcodes: number[],
	opIndex: number,
	stack: unknown[],
	stackIndex: number,
	runner: Runner,
): number {
	let t: unknown;

	switch (opcodes[opIndex]) {
		case 110: // OPCODE_AFTER
			t = runner.createThread(stack[stackIndex - 1] as Routine, stack[stackIndex] as number, false);
			stack[--stackIndex] = t;
			opIndex++;
			break;

		case 111: // OPCODE_EVERY
			t = runner.createThread(stack[stackIndex - 1] as Routine, stack[stackIndex] as number, true);
			stack[--stackIndex] = t;
			opIndex++;
			break;

		case 112: // OPCODE_DO
			t = runner.createThread(stack[stackIndex] as Routine, 0, false);
			stack[stackIndex] = t;
			opIndex++;
			break;

		case 113: // OPCODE_SLEEP
			const sleepTime = isFinite(stack[stackIndex] as number) ? (stack[stackIndex] as number) : 0;
			runner.sleep(sleepTime);
			opIndex++;
			// restore_op_index = op_index; op_index = length; — caller handles this
			break;
	}

	return opIndex;
}
