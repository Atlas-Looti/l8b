/**
 * Debug Logger - Diagnostic logging for runtime subsystems
 *
 * Provides batched, shallow-compared debug output for input and screen state.
 * Only active when debug options are enabled.
 */

import type { InputManager } from "../input";
import type { Screen } from "@l8b/screen";
import type { RuntimeDebugOptions } from "../types";

export class DebugLogger {
	private lastInputDebug?: any;
	private lastScreenDebug?: {
		width: number;
		height: number;
		canvasWidth: number;
		canvasHeight: number;
	};

	/**
	 * Log input state changes (deduplication via shallow compare)
	 */
	debugInputs(input: InputManager, debug: RuntimeDebugOptions | undefined): void {
		if (!debug?.input) return;

		const snapshot = this.createInputSnapshot(input, debug.input);
		if (!snapshot) return;

		if (this.lastInputDebug && shallowEqual(snapshot, this.lastInputDebug)) return;

		this.lastInputDebug = snapshot;
		console.debug("[@l8b/runtime][input]", snapshot);
	}

	/**
	 * Log screen dimension changes
	 */
	debugScreen(screen: Screen, debug: RuntimeDebugOptions | undefined): void {
		if (!debug?.screen) return;

		const canvas = screen.getCanvas();
		const current = {
			width: screen.width,
			height: screen.height,
			canvasWidth: canvas.width,
			canvasHeight: canvas.height,
		};

		if (
			this.lastScreenDebug &&
			current.width === this.lastScreenDebug.width &&
			current.height === this.lastScreenDebug.height &&
			current.canvasWidth === this.lastScreenDebug.canvasWidth &&
			current.canvasHeight === this.lastScreenDebug.canvasHeight
		) {
			return;
		}
		this.lastScreenDebug = current;
		console.debug("[@l8b/runtime][screen]", {
			screen: { width: screen.width, height: screen.height },
			canvas: {
				width: canvas.width,
				height: canvas.height,
				clientWidth: canvas.clientWidth,
				clientHeight: canvas.clientHeight,
				style: { width: canvas.style.width, height: canvas.style.height },
			},
		});
	}

	/**
	 * Create a snapshot of current input state based on enabled channels
	 */
	private createInputSnapshot(
		input: InputManager,
		setting: NonNullable<RuntimeDebugOptions["input"]>,
	): Record<string, any> | null {
		const channels = getEnabledInputChannels(setting);
		if (channels.length === 0) return null;

		const states = input.getStates();
		const snapshot: Record<string, any> = {};

		if (channels.includes("touch")) {
			snapshot.touch = {
				touching: states.touch.touching,
				press: states.touch.press,
				release: states.touch.release,
				x: Number(states.touch.x?.toFixed?.(2) ?? states.touch.x),
				y: Number(states.touch.y?.toFixed?.(2) ?? states.touch.y),
				count: states.touch.touches?.length ?? 0,
			};
		}

		if (channels.includes("mouse")) {
			snapshot.mouse = {
				pressed: states.mouse.pressed,
				left: states.mouse.left,
				x: Number(states.mouse.x?.toFixed?.(2) ?? states.mouse.x),
				y: Number(states.mouse.y?.toFixed?.(2) ?? states.mouse.y),
				wheel: states.mouse.wheel,
			};
		}

		if (channels.includes("keyboard")) {
			snapshot.keyboard = {
				UP: states.keyboard.UP,
				DOWN: states.keyboard.DOWN,
				LEFT: states.keyboard.LEFT,
				RIGHT: states.keyboard.RIGHT,
				press: states.keyboard.press,
				release: states.keyboard.release,
			};
		}

		if (channels.includes("gamepad")) {
			snapshot.gamepad = {
				count: input.gamepad.count,
				A: states.gamepad.A,
				B: states.gamepad.B,
				UP: states.gamepad.UP,
				DOWN: states.gamepad.DOWN,
				LEFT: states.gamepad.LEFT,
				RIGHT: states.gamepad.RIGHT,
			};
		}

		return Object.keys(snapshot).length === 0 ? null : snapshot;
	}
}

/**
 * Get enabled input debug channels from setting
 */
function getEnabledInputChannels(
	setting: NonNullable<RuntimeDebugOptions["input"]>,
): Array<"keyboard" | "mouse" | "touch" | "gamepad"> {
	if (typeof setting === "boolean") {
		return setting ? ["keyboard", "mouse", "touch", "gamepad"] : [];
	}
	const channels: Array<"keyboard" | "mouse" | "touch" | "gamepad"> = [];
	if (setting.keyboard) channels.push("keyboard");
	if (setting.mouse) channels.push("mouse");
	if (setting.touch) channels.push("touch");
	if (setting.gamepad) channels.push("gamepad");
	return channels;
}

/**
 * Shallow comparison of two objects (one level deep)
 */
function shallowEqual(obj1: any, obj2: any): boolean {
	if (obj1 === obj2) return true;
	if (!obj1 || !obj2 || typeof obj1 !== "object" || typeof obj2 !== "object") return false;

	const keys1 = Object.keys(obj1);
	const keys2 = Object.keys(obj2);
	if (keys1.length !== keys2.length) return false;

	for (const key of keys1) {
		const val1 = obj1[key];
		const val2 = obj2[key];

		if (val1 === val2) continue;

		if (val1 == null || val2 == null) {
			if (val1 !== val2) return false;
			continue;
		}

		if (typeof val1 === "object" && typeof val2 === "object") {
			const keys1Nested = Object.keys(val1);
			const keys2Nested = Object.keys(val2);
			if (keys1Nested.length !== keys2Nested.length) return false;
			for (const nestedKey of keys1Nested) {
				if (val1[nestedKey] !== val2[nestedKey]) return false;
			}
		} else {
			return false;
		}
	}
	return true;
}
