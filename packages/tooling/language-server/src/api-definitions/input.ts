/**
 * Input API definitions
 */

import type { GlobalApi } from "../types";

export const inputApi: Partial<GlobalApi> = {
	input: {
		type: "object",
		description: "User input interface (keyboard, mouse, touch, gamepad)",
		properties: {
			keyboard: {
				type: "property",
				description: "Keyboard input state object",
			},
			mouse: {
				type: "property",
				description: "Mouse input state object with x, y, and button properties",
			},
			touch: {
				type: "property",
				description: "Touch input state for mobile devices",
			},
			gamepad: {
				type: "property",
				description: "Gamepad input state",
			},
		},
	},
};
