/**
 * Player Service - Farcaster player context management
 */

import { sdk } from "@farcaster/miniapp-sdk";
import type { PlayerAPI, PlayerContext } from "./types";

export class PlayerService {
	private context: PlayerContext | null = null;
	private initialized: boolean = false;

	constructor() {
		// Lazy initialization - only when needed
	}

	/**
	 * Initialize player context from Farcaster SDK
	 * This is called lazily to avoid issues in non-Mini App environments
	 */
	private async initialize(): Promise<void> {
		if (this.initialized) {
			return;
		}

		this.initialized = true;

		// Only initialize in browser environment
		if (typeof window === "undefined") {
			this.context = null;
			return;
		}

		try {
			// Use sdk.isInMiniApp() for accurate detection
			const isInMiniApp = await sdk.isInMiniApp();
			if (!isInMiniApp) {
				this.context = null;
				return;
			}

			const fcContext = await sdk.context;

			this.context = {
				fid: fcContext.user.fid,
				username: fcContext.user.username,
				displayName: fcContext.user.displayName,
				pfpUrl: fcContext.user.pfpUrl,
				location: fcContext.location ? this.mapLocationContext(fcContext.location) : undefined,
				client: {
					platformType: fcContext.client.platformType,
					clientFid: fcContext.client.clientFid,
					added: fcContext.client.added,
				},
				features: {
					haptics: fcContext.features?.haptics ?? false,
					cameraAndMicrophoneAccess: fcContext.features?.cameraAndMicrophoneAccess,
				},
			};
		} catch (err) {
			// Not in Mini App environment or SDK not available
			this.context = null;
		}
	}

	/**
	 * Map Farcaster SDK location context to our PlayerContext format
	 */
	private mapLocationContext(location: any): PlayerContext["location"] {
		if (!location) return undefined;

		const base = {
			type: location.type,
		};

		switch (location.type) {
			case "cast_embed":
			case "cast_share":
				return {
					...base,
					cast: {
						author: {
							fid: location.cast.author.fid,
							username: location.cast.author.username,
							displayName: location.cast.author.displayName,
							pfpUrl: location.cast.author.pfpUrl,
						},
						hash: location.cast.hash,
						text: location.cast.text,
						timestamp: location.cast.timestamp,
						parentHash: location.cast.parentHash,
						parentFid: location.cast.parentFid,
					},
				};

			case "notification":
				return {
					...base,
					notification: {
						notificationId: location.notification.notificationId,
						title: location.notification.title,
						body: location.notification.body,
					},
				};

			case "channel":
				return {
					...base,
					channel: {
						key: location.channel.key,
						name: location.channel.name,
						imageUrl: location.channel.imageUrl,
					},
				};

			case "open_miniapp":
				return {
					...base,
					referrerDomain: location.referrerDomain,
				};

			default:
				return base;
		}
	}

	/**
	 * Get default context when not in Mini App
	 */
	private getDefaultContext(): PlayerContext {
		return {
			fid: 0,
			client: {
				clientFid: 0,
				added: false,
			},
		};
	}

	/**
	 * Get interface for LootiScript exposure
	 */
	getInterface(): PlayerAPI {
		const service = this;

		// Ensure initialization
		if (!this.initialized) {
			// Initialize asynchronously but don't block
			this.initialize().catch(() => {
				// Silent fail if not in Mini App
			});
		}

		return {
			get fid() {
				return service.context?.fid || 0;
			},
			get username() {
				return service.context?.username;
			},
			get displayName() {
				return service.context?.displayName;
			},
			get pfpUrl() {
				return service.context?.pfpUrl;
			},
			getFid: () => {
				return service.context?.fid || 0;
			},
			getUsername: () => {
				return service.context?.username;
			},
			getDisplayName: () => {
				return service.context?.displayName;
			},
			getPfpUrl: () => {
				return service.context?.pfpUrl;
			},
			getContext: () => {
				return service.context || service.getDefaultContext();
			},
			isInMiniApp: () => {
				return !!service.context;
			},
		};
	}

	/**
	 * Cleanup resources
	 */
	dispose(): void {
		this.context = null;
		this.initialized = false;
	}
}
