/**
 * Realtime transport bridge for multiplayer and synchronization features.
 *
 * This interface abstracts over specific realtime transports (WebSocket, WebRTC, etc.)
 * and can be adapted into a RuntimeBridge for host-side communication.
 */
export interface RealtimeBridge {
	/**
	 * Connect to the realtime service.
	 */
	connect(): Promise<void>;

	/**
	 * Disconnect from the realtime service.
	 */
	disconnect(): Promise<void>;

	/**
	 * Send a message on a channel.
	 * @param channel - Channel name
	 * @param payload - Message payload
	 */
	send(channel: string, payload: unknown): void;

	/**
	 * Subscribe to a channel.
	 * @param channel - Channel name
	 * @param handler - Called when a message arrives on the channel
	 * @returns Unsubscribe function
	 */
	subscribe(channel: string, handler: (payload: unknown) => void): () => void;
}
