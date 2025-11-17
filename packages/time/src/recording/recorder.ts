/**
 * StateRecorder - Records game state history
 *
 * Responsibilities:
 * - Capture state snapshots
 * - Manage circular buffer
 * - Exclude non-serializable objects
 */

import type { StateSnapshot } from "../types";

export class StateRecorder {
	private history: StateSnapshot[] = [];
	private recordIndex = 0;
	private recordLength = 0;
	private maxLength: number;
	private excluded: any[] = [];

	constructor(maxLength = 60 * 30) {
		// Default: 30 seconds at 60fps
		this.maxLength = maxLength;
	}

	/**
	 * Set objects to exclude from serialization
	 */
	setExcluded(excluded: any[]): void {
		this.excluded = excluded;
	}

	/**
	 * Record a state snapshot
	 */
	record(state: any): void {
		const snapshot = this.makeStorableState(state);
		this.history[this.recordIndex++] = snapshot;
		this.recordLength = Math.min(this.recordLength + 1, this.maxLength);

		if (this.recordIndex >= this.maxLength) {
			this.recordIndex = 0;
		}
	}

	/**
	 * Get state at specific position (0 = most recent)
	 */
	getState(position: number): StateSnapshot | null {
		if (position >= this.recordLength) {
			return null;
		}

		const index =
			(this.recordIndex - position - 1 + this.maxLength) % this.maxLength;
		return this.history[index];
	}

	/**
	 * Get current record length
	 */
	getLength(): number {
		return this.recordLength;
	}

	/**
	 * Get maximum record length
	 */
	getMaxLength(): number {
		return this.maxLength;
	}

	/**
	 * Clear all recorded history
	 */
	clear(): void {
		this.history = [];
		this.recordIndex = 0;
		this.recordLength = 0;
	}

	/**
	 * Trim history to specific position
	 */
	trimTo(position: number): void {
		if (position >= this.recordLength) {
			return;
		}

		const histo: StateSnapshot[] = [];
		const start = this.recordLength;
		const end = position + 1;

		for (let i = start; i >= end; i--) {
			const index = (this.recordIndex - i + this.maxLength) % this.maxLength;
			histo.push(this.history[index]);
		}

		this.history = histo;
		this.recordIndex = this.history.length;
		this.recordLength = this.history.length;
	}

	/**
	 * Convert state to storable format (deep copy, exclude references)
	 */
	private makeStorableState(value: any): any {
		if (value == null) {
			return value;
		}

		// Check if excluded
		if (this.excluded.includes(value)) {
			return null;
		}

		// Handle primitives
		if (
			typeof value === "string" ||
			typeof value === "number" ||
			typeof value === "boolean"
		) {
			return value;
		}

		// Handle arrays
		if (Array.isArray(value)) {
			const result: any[] = [];
			for (let i = 0; i < value.length; i++) {
				result[i] = this.makeStorableState(value[i]);
			}
			return result;
		}

		// Handle objects
		if (typeof value === "object") {
			const result: any = {};
			for (const key in value) {
				if (Object.hasOwn(value, key)) {
					result[key] = this.makeStorableState(value[key]);
				}
			}
			return result;
		}

		// Functions and other types
		return null;
	}
}
