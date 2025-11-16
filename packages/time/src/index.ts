/**
 * @l8b/time - Time Machine Debugging
 *
 * Record, replay, and loop game state for debugging.
 */

export { TimeMachine } from "./core";
export type { TimeMachineRuntime } from "./core";

export { StateRecorder } from "./recording";
export { StatePlayer } from "./playback";

export type {
	StateSnapshot,
	TimeMachineCommand,
	TimeMachineMessage,
	TimeMachineStatus,
} from "./types";

