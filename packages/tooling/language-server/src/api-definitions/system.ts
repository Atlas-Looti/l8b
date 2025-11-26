/**
 * System API definitions
 */

import type { GlobalApi } from "../types";

export const systemApi: Partial<GlobalApi> = {
	system: {
		type: "object",
		description: "Runtime system utilities and information",
		properties: {
			time: {
				type: "property",
				description: "Current system time in milliseconds",
			},
			fps: { type: "property", description: "Current frames per second" },
			deltaTime: {
				type: "property",
				description: "Time elapsed since last frame (seconds)",
			},
			cpu_load: { type: "property", description: "CPU load percentage" },
			update_rate: { type: "property", description: "Target update rate" },
			language: { type: "property", description: "Browser language" },
			loading: {
				type: "property",
				description: "Asset loading progress (0-1)",
			},
			inputs: { type: "property", description: "Input device availability" },
			pause: {
				type: "method",
				signature: "system.pause()",
				description: "Pause game execution",
			},
			exit: {
				type: "method",
				signature: "system.exit()",
				description: "Exit game",
			},
			prompt: {
				type: "method",
				signature: "system.prompt(text, callback)",
				description: "Prompt user for input",
			},
			say: {
				type: "method",
				signature: "system.say(text)",
				description: "Show alert message",
			},
		},
	},
};
