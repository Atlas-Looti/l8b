/**
 * Player API definitions
 */

import type { GlobalApi } from "../types";

export const playerApi: Partial<GlobalApi> = {
	player: {
		type: "object",
		description: "Player control interface - manage lifecycle, performance, and host communication",
		properties: {
			pause: {
				type: "method",
				signature: "player.pause()",
				description: "Pause the game loop. The game freezes but stays visible.",
			},
			resume: {
				type: "method",
				signature: "player.resume()",
				description: "Resume the game loop after a pause.",
			},
			postMessage: {
				type: "method",
				signature: "player.postMessage(message)",
				description: "Send a custom message to the host application. The host decides how to handle it.",
			},
			setFps: {
				type: "method",
				signature: "player.setFps(fps: number)",
				description: "Set the target update rate (frames per second).",
			},
			fps: {
				type: "property",
				description: "Current frames per second (read-only)",
			},
			update_rate: {
				type: "property",
				description: "Target update rate in Hz (read/write)",
			},
		},
	},
};
