/**
 * Notifications API types for Farcaster Mini Apps integration
 */

/**
 * Notification details from Farcaster client
 */
export interface NotificationDetails {
	/** URL to send notifications to */
	url: string;
	/** Authentication token for sending notifications */
	token: string;
}

/**
 * Notification API interface exposed to LootiScript
 */
export interface NotificationsAPI {
	/**
	 * Check if notifications are enabled for this user
	 * @returns true if notifications are enabled, false otherwise
	 */
	isEnabled(): boolean;

	/**
	 * Get notification token (if available)
	 * @returns Notification token string or undefined
	 */
	getToken(): string | undefined;

	/**
	 * Get notification URL (if available)
	 * @returns Notification URL string or undefined
	 */
	getUrl(): string | undefined;

	/**
	 * Get notification details (token and URL)
	 * @returns NotificationDetails object or undefined
	 */
	getDetails(): NotificationDetails | undefined;

	/**
	 * Send notification token to server for storage
	 * This is a helper method that sends the token to your server endpoint
	 * @param serverUrl - Your server endpoint URL
	 * @param options - Optional fetch options
	 * @returns Promise that resolves when token is sent
	 */
	sendTokenToServer(serverUrl: string, options?: RequestInit): Promise<Response>;
}

