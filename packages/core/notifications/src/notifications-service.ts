/**
 * Notifications Service - Farcaster notification management
 */

import { sdk } from "@farcaster/miniapp-sdk";
import type { NotificationsAPI, NotificationDetails } from "./types";

export class NotificationsService {
	private initialized: boolean = false;
	private notificationDetails: NotificationDetails | null = null;

	constructor() {
		// Lazy initialization - only when needed
	}

	/**
	 * Initialize notifications service from Farcaster SDK
	 * This is called lazily to avoid issues in non-Mini App environments
	 */
	private async initialize(): Promise<void> {
		if (this.initialized) {
			return;
		}

		this.initialized = true;

		// Only initialize in browser environment
		if (typeof window === "undefined") {
			this.notificationDetails = null;
			return;
		}

		try {
			// Use sdk.isInMiniApp() for accurate detection
			const isInMiniApp = await sdk.isInMiniApp();
			if (!isInMiniApp) {
				this.notificationDetails = null;
				return;
			}

			const fcContext = await sdk.context;

			// Extract notification details from client context
			if (fcContext.client.notificationDetails) {
				this.notificationDetails = {
					url: fcContext.client.notificationDetails.url,
					token: fcContext.client.notificationDetails.token,
				};
			} else {
				this.notificationDetails = null;
			}
		} catch (err) {
			// Not in Mini App environment or SDK not available
			this.notificationDetails = null;
		}
	}

	/**
	 * Get interface for LootiScript exposure
	 */
	getInterface(): NotificationsAPI {
		const service = this;

		// Ensure initialization
		if (!this.initialized) {
			// Initialize asynchronously but don't block
			this.initialize().catch(() => {
				// Silent fail if not in Mini App
			});
		}

		return {
			isEnabled: () => {
				// Initialize if needed (synchronous check)
				if (!service.initialized) {
					service.initialize().catch(() => {});
					return false;
				}
				return !!service.notificationDetails;
			},

			getToken: () => {
				// Initialize if needed
				if (!service.initialized) {
					service.initialize().catch(() => {});
					return undefined;
				}
				return service.notificationDetails?.token;
			},

			getUrl: () => {
				// Initialize if needed
				if (!service.initialized) {
					service.initialize().catch(() => {});
					return undefined;
				}
				return service.notificationDetails?.url;
			},

			getDetails: () => {
				// Initialize if needed
				if (!service.initialized) {
					service.initialize().catch(() => {});
					return undefined;
				}
				return service.notificationDetails || undefined;
			},

			sendTokenToServer: async (serverUrl: string, options?: RequestInit) => {
				await service.initialize();

				if (!service.notificationDetails) {
					throw new Error("Notifications not enabled or not available");
				}

				// Send token to server for storage
				const response = await fetch(serverUrl, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						...(options?.headers || {}),
					},
					body: JSON.stringify({
						token: service.notificationDetails.token,
						url: service.notificationDetails.url,
						fid: (await sdk.context).user.fid,
					}),
					...options,
				});

				return response;
			},
		};
	}

	/**
	 * Cleanup resources
	 */
	dispose(): void {
		this.notificationDetails = null;
		this.initialized = false;
	}
}

