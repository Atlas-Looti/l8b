/**
 * System API type definitions
 */

/**
 * System API exposed to game code
 */
export interface SystemAPI {
	/** Current time in milliseconds */
	time: number;
	/** Current FPS */
	fps: number;
	/** CPU load (0-100) */
	cpu_load: number;
	/** Update rate (updates per second) */
	update_rate: number;
	/** Browser language */
	language: string;
	/** Available input methods */
	inputs: {
		keyboard: number;
		mouse: number;
		touch: number;
		gamepad: number;
	};
	/** Asset loading progress (0-100) */
	loading?: number;
	/** Pause game execution */
	pause: () => void;
	/** Exit game */
	exit: () => void;
	/** Show prompt dialog */
	prompt: (text: string, callback: (result: string) => void) => void;
	/** Show alert dialog */
	say: (text: string) => void;
	/** File drop handling */
	file: {
		dropped: number;
	};
	/** JavaScript interop */
	javascript: any;
	/** Disable auto fullscreen on touch */
	disable_autofullscreen?: number;
	/** Preemptive execution */
	preemptive?: number;
	/** Active threads */
	threads?: any[];
}
