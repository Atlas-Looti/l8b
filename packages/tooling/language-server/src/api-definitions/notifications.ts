/**
 * Notifications API definitions for Farcaster Mini Apps
 */

import type { GlobalApi } from "../types";

export const notificationsApi: Partial<GlobalApi> = {
	notifications: {
		type: "object",
		description: "Farcaster notification management for Mini Apps",
		properties: {
			isEnabled: {
				type: "method",
				signature: "notifications.isEnabled()",
				description: "Check if notifications are enabled for the current user. Returns 1 if enabled, 0 if not",
			},
			getToken: {
				type: "method",
				signature: "notifications.getToken()",
				description: "Get the notification token (if available). Returns string | undefined",
			},
			getUrl: {
				type: "method",
				signature: "notifications.getUrl()",
				description: "Get the notification URL (if available). Returns string | undefined",
			},
			getDetails: {
				type: "method",
				signature: "notifications.getDetails()",
				description: "Get both notification token and URL. Returns {token: string, url: string} | undefined",
			},
			sendTokenToServer: {
				type: "method",
				signature: "notifications.sendTokenToServer(serverUrl: string, options?: object)",
				description: "Helper method to send notification token to your server for storage. Returns Promise<Response>",
			},
		},
	},
};
