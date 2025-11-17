/**
 * TimeMachine - Main time machine controller
 *
 * Responsibilities:
 * - Coordinate recording and playback
 * - Handle commands
 * - Manage state
 */

import { StatePlayer } from "../playback";
import { StateRecorder } from "../recording";
import type { TimeMachineMessage, TimeMachineStatus } from "../types";

export interface TimeMachineRuntime {
	vm?: {
		context?: {
			global?: any;
		};
	};
	updateCall?: () => void;
	drawCall?: () => void;
}

export class TimeMachine {
	private runtime: TimeMachineRuntime;
	private recorder: StateRecorder;
	private player: StatePlayer;
	private recording = false;
	private replayPosition = 0;
	private statusCallback?: (status: TimeMachineStatus) => void;

	constructor(runtime: TimeMachineRuntime) {
		this.runtime = runtime;
		this.recorder = new StateRecorder(60 * 30); // 30 seconds
		this.player = new StatePlayer(60 * 4); // 4 seconds loop

		// Setup exclusion list
		this.setupExclusions();
	}

	/**
	 * Setup objects to exclude from recording
	 */
	private setupExclusions(): void {
		const excluded: any[] = [];

		if (this.runtime.vm?.context?.global) {
			const global = this.runtime.vm.context.global;

			// Exclude system APIs and non-serializable objects
			if (global.random) excluded.push(global.random);
			if (global.screen) excluded.push(global.screen);
			if (global.audio) excluded.push(global.audio);
			if (global.keyboard) excluded.push(global.keyboard);
			if (global.mouse) excluded.push(global.mouse);
			if (global.touch) excluded.push(global.touch);
			if (global.gamepad) excluded.push(global.gamepad);
			if (global.system) excluded.push(global.system);
			if (global.storage) excluded.push(global.storage);
		}

		this.recorder.setExcluded(excluded);
	}

	/**
	 * Step function - call each frame
	 */
	step(): void {
		if (!this.recording) {
			return;
		}

		try {
			// Handle replay position changes
			if (this.replayPosition !== 0) {
				this.recorder.trimTo(this.replayPosition);
				if (this.player.isLooping()) {
					this.player.startLoop(this.recorder.getLength(), () =>
						this.loopCallback(),
					);
				}
				this.replayPosition = 0;
			}

			// Record current state
			if (this.runtime.vm?.context?.global) {
				this.recorder.record(this.runtime.vm.context.global);
			}

			this.sendStatus();
		} catch (err) {
			console.error("TimeMachine step error:", err);
		}
	}

	/**
	 * Handle incoming messages
	 */
	messageReceived(data: TimeMachineMessage): void {
		switch (data.command) {
			case "start_recording":
				this.startRecording();
				break;

			case "stop_recording":
				this.stopRecording();
				break;

			case "step_backward":
				this.stepBackward();
				break;

			case "step_forward":
				this.stepForward();
				break;

			case "replay_position":
				if (data.position != null) {
					this.setReplayPosition(data.position);
				}
				break;

			case "start_looping":
				this.startLooping();
				break;

			case "stop_looping":
				this.stopLooping();
				break;
		}
	}

	/**
	 * Start recording
	 */
	private startRecording(): void {
		if (this.recording) {
			return;
		}

		this.recording = true;
		this.recorder.clear();
		this.replayPosition = 0;
		this.sendStatus();
	}

	/**
	 * Stop recording
	 */
	private stopRecording(): void {
		if (!this.recording) {
			return;
		}

		this.recording = false;
		this.sendStatus();
	}

	/**
	 * Step backward in time
	 */
	private stepBackward(): void {
		if (this.replayPosition + 1 >= this.recorder.getLength()) {
			return;
		}

		this.stopLooping();
		this.replayPosition++;
		this.replay();
		this.sendStatus();
	}

	/**
	 * Step forward in time
	 */
	private stepForward(): void {
		if (this.replayPosition <= 1) {
			return;
		}

		this.stopLooping();
		this.replayPosition--;
		this.replay();
		this.sendStatus();
	}

	/**
	 * Set replay position
	 */
	private setReplayPosition(position: number): void {
		const pos = Math.round(position);
		this.replayPosition = Math.max(
			2,
			Math.min(this.recorder.getLength() - 1, pos),
		);

		if (this.player.isLooping()) {
			this.player.startLoop(this.replayPosition, () => this.loopCallback());
		}

		this.replay();
		this.sendStatus();
	}

	/**
	 * Start looping
	 */
	private startLooping(): void {
		if (this.recorder.getLength() === 0) {
			return;
		}

		this.recording = false;
		const position = Math.max(this.replayPosition, 1);
		this.player.startLoop(position, () => this.loopCallback());
	}

	/**
	 * Stop looping
	 */
	private stopLooping(): void {
		if (!this.player.isLooping()) {
			return;
		}

		this.replayPosition = this.player.stopLoop();
		this.sendStatus();
	}

	/**
	 * Replay state at current position
	 */
	private replay(skipDraw = false): void {
		if (this.replayPosition >= this.recorder.getLength()) {
			return;
		}

		const snapshot = this.recorder.getState(this.replayPosition);
		if (snapshot && this.runtime.vm?.context?.global) {
			this.player.restoreState(this.runtime.vm.context.global, snapshot);
		}

		if (!skipDraw) {
			this.runtime.drawCall?.();
		}
	}

	/**
	 * Loop callback
	 */
	private loopCallback(): void {
		const position = this.player.updateLoop();
		if (position !== null) {
			this.replayPosition = position;
			this.replay(true);
			this.runtime.updateCall?.();
			this.runtime.drawCall?.();
		}
		this.sendStatus();
	}

	/**
	 * Send status update
	 */
	private sendStatus(): void {
		if (this.statusCallback) {
			this.statusCallback({
				recording: this.recording,
				looping: this.player.isLooping(),
				position: this.replayPosition,
				length: this.recorder.getLength(),
				max: this.recorder.getMaxLength(),
			});
		}
	}

	/**
	 * Set status callback
	 */
	onStatus(callback: (status: TimeMachineStatus) => void): void {
		this.statusCallback = callback;
	}

	/**
	 * Check if recording
	 */
	isRecording(): boolean {
		return this.recording;
	}

	/**
	 * Check if looping
	 */
	isLooping(): boolean {
		return this.player.isLooping();
	}
}
