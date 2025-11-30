/**
 * StatePlayer - Handles replay and loop playback
 *
 * Responsibilities:
 * - Restore state snapshots
 * - Manage loop playback
 * - Control playback position
 */

import type { StateSnapshot } from "../types";

export class StatePlayer {
	private looping = false;
	private loopStart = 0;
	private loopIndex = 0;
	private loopLength: number;
	private loopCallback: (() => void) | null = null;

	constructor(loopLength = 60 * 4) {
		// Default loop buffer size: 4 seconds at 60fps (240 frames)
		this.loopLength = loopLength;
	}

	/**
	 * Check if currently looping
	 */
	isLooping(): boolean {
		return this.looping;
	}

	/**
	 * Start loop playback
	 */
	startLoop(position: number, callback: () => void): void {
		this.looping = true;
		this.loopStart = Math.max(position, 1);
		this.loopIndex = 0;
		this.loopCallback = callback;
	}

	/**
	 * Stop loop playback
	 */
	stopLoop(): number {
		this.looping = false;
		this.loopCallback = null;
		return this.loopStart;
	}

	/**
	 * Update loop (call each frame)
	 * Returns position to replay, or null if not looping
	 */
	updateLoop(): number | null {
		if (!this.looping) {
			return null;
		}

		if (this.loopIndex === 0) {
			this.loopIndex++;
			return this.loopStart;
		}

		this.loopIndex++;
		if (this.loopIndex > this.loopLength) {
			this.loopIndex = 0;
		}

		return this.loopStart - this.loopIndex;
	}

	/**
	 * Execute loop callback
	 */
	executeCallback(): void {
		if (this.loopCallback) {
			this.loopCallback();
		}
	}

	/**
	 * Restore state to target object
	 */
	restoreState(target: any, snapshot: StateSnapshot): void {
		if (!snapshot || !target) {
			return;
		}

		// Remove all existing properties except protected system APIs
		for (const key in target) {
			if (Object.hasOwn(target, key) && !this.isProtectedKey(key)) {
				delete target[key];
			}
		}

		// Apply snapshot properties to target object via deep copy
		for (const key in snapshot) {
			if (Object.hasOwn(snapshot, key)) {
				target[key] = this.deepCopy(snapshot[key]);
			}
		}
	}

	/**
	 * Check if key should be protected from restoration
	 */
	private isProtectedKey(key: string): boolean {
		// Prevent system APIs and runtime objects from being overwritten during restore
		const protected_keys = ["screen", "audio", "keyboard", "mouse", "touch", "gamepad", "system", "storage", "sprites", "maps", "sounds", "music", "assets"];
		return protected_keys.includes(key);
	}

	/**
	 * Deep copy a value
	 */
	private deepCopy(value: any): any {
		if (value == null) {
			return value;
		}

		if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
			return value;
		}

		if (Array.isArray(value)) {
			return value.map((item) => this.deepCopy(item));
		}

		if (typeof value === "object") {
			const result: any = {};
			for (const key in value) {
				if (Object.hasOwn(value, key)) {
					result[key] = this.deepCopy(value[key]);
				}
			}
			return result;
		}

		return value;
	}
}
