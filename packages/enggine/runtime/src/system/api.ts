/**
 * System API - System information and control
 */

import type { SystemAPI } from "@l8b/vm";
import { DEFAULT_FPS, DEFAULT_UPDATE_RATE } from "../constants";

export class System {
	private systemAPI: SystemAPI;

	constructor() {
		// Create system API with mutable state
		this.systemAPI = {
			// Time
			get time() {
				return Date.now();
			},

			// FPS
			fps: DEFAULT_FPS,

			// CPU load
			cpu_load: 0,

			// Update rate
			update_rate: DEFAULT_UPDATE_RATE,

			// Language
			get language() {
				return typeof navigator !== "undefined" ? navigator.language : "en";
			},

			// Input availability
			inputs: {
				get keyboard() {
					return 1;
				},
				get mouse() {
					return 1;
				},
				get touch() {
					return typeof window !== "undefined" && "ontouchstart" in window ? 1 : 0;
				},
				get gamepad() {
					return typeof navigator !== "undefined" && typeof navigator.getGamepads === "function" ? 1 : 0;
				},
			},

			// Loading progress
			loading: 0,

			// Utility functions
			prompt: (text: string, callback: (result: string) => void) => {
				if (typeof window !== "undefined") {
					const result = window.prompt(text);
					if (result !== null && callback) {
						callback(result);
					}
				}
			},

			say: (text: string) => {
				if (typeof window !== "undefined") {
					window.alert(text);
				}
			},

			// File drop support
			file: {
				dropped: 0,
			},

			// JavaScript interop (for calling JS from game code)
			javascript: {},

			// Thread management
			threads: [],

			// Additional flags
			disable_autofullscreen: 0,
			preemptive: 1,
		};
	}

	/**
	 * Get system API for game code
	 */
	getAPI(): SystemAPI {
		return this.systemAPI;
	}

	/**
	 * Update FPS
	 */
	setFPS(fps: number): void {
		this.systemAPI.fps = fps;
	}

	/**
	 * Update CPU load
	 */
	setCPULoad(load: number): void {
		this.systemAPI.cpu_load = load;
	}

	/**
	 * Update loading progress
	 */
	setLoading(progress: number): void {
		this.systemAPI.loading = progress;
	}
}
