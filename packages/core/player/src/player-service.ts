/**
 * PlayerService - Controls player UX from LootiScript
 *
 * Provides game scripts with the ability to control the player lifecycle
 * (quit, pause, resume, exit), adjust performance (fps, update_rate),
 * and communicate with the host application (postMessage).
 */

import type { PlayerDelegate } from "./types";

export class PlayerService {
	private delegate: PlayerDelegate;
	private interfaceCache: Record<string, any> | null = null;

	constructor(delegate: PlayerDelegate) {
		this.delegate = delegate;
	}

	/**
	 * Get interface for game code (LootiScript `player.*`)
	 */
	getInterface(): Record<string, any> {
		if (this.interfaceCache) {
			return this.interfaceCache;
		}

		const iface: Record<string, any> = {
			pause: () => this.delegate.pause(),
			resume: () => this.delegate.resume(),
			postMessage: (message: any) => this.delegate.postMessage(message),
			setFps: (fps: number) => {
				if (typeof fps === "number" && isFinite(fps) && fps > 0) {
					this.delegate.setUpdateRate(fps);
				}
			},
		};

		Object.defineProperty(iface, "fps", {
			get: () => this.delegate.getFps(),
			enumerable: true,
		});

		Object.defineProperty(iface, "update_rate", {
			get: () => this.delegate.getUpdateRate(),
			set: (value: number) => {
				if (typeof value === "number" && isFinite(value) && value > 0) {
					this.delegate.setUpdateRate(value);
				}
			},
			enumerable: true,
		});

		this.interfaceCache = iface;
		return this.interfaceCache;
	}
}
