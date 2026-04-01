/**
 * Delegate interface for PlayerService.
 *
 * The orchestrator provides concrete implementations of these callbacks
 * so the PlayerService stays decoupled from runtime internals.
 */
export interface PlayerDelegate {
	/** Pause the game loop */
	pause: () => void;
	/** Resume the game loop */
	resume: () => void;
	/** Send an arbitrary message to the host application */
	postMessage: (message: any) => void;
	/** Get current FPS */
	getFps: () => number;
	/** Get target update rate (Hz) */
	getUpdateRate: () => number;
	/** Set target update rate (Hz) */
	setUpdateRate: (rate: number) => void;
}
