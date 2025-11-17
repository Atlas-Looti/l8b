/**
 * @l8b/time - Time Machine Debugging
 *
 * Record, replay, and loop game state for debugging.
 */

export type { TimeMachineRuntime } from "./core";
export { TimeMachine } from "./core";
export { StatePlayer } from "./playback";
export { StateRecorder } from "./recording";

export type {
	StateSnapshot,
	TimeMachineCommand,
	TimeMachineMessage,
	TimeMachineStatus,
} from "./types";
