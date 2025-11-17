/**
 * State types for time machine
 */

/**
 * Serialized game state snapshot
 */
export interface StateSnapshot {
	[key: string]: any;
}

/**
 * Time machine command types
 */
export type TimeMachineCommand =
	| "start_recording"
	| "stop_recording"
	| "step_backward"
	| "step_forward"
	| "replay_position"
	| "start_looping"
	| "stop_looping";

/**
 * Message format for time machine control
 */
export interface TimeMachineMessage {
	name: "time_machine";
	command: TimeMachineCommand;
	position?: number;
}

/**
 * Status information for time machine
 */
export interface TimeMachineStatus {
	recording: boolean;
	looping: boolean;
	position: number;
	length: number;
	max: number;
}
