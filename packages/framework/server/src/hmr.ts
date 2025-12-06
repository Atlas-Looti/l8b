/**
 * HMR WebSocket Server
 * Based on microstudio's playerclient.coffee pattern
 */
import { type Server as HTTPServer } from "node:http";
import { WebSocketServer, WebSocket } from "ws";
import { type HMRMessage, createLogger } from "@l8b/framework-shared";

const logger = createLogger("hmr");

/**
 * Typed event map for HMR server events
 */
export interface HMREventMap {
	"client:connect": [ws: WebSocket];
	"client:disconnect": [ws: WebSocket];
	message: [message: Record<string, unknown>, ws: WebSocket];
	error: [error: Error];
}

/** Event names for HMR server */
export type HMREventName = keyof HMREventMap;

/** Event listener type */
export type HMREventListener<K extends HMREventName> = (...args: HMREventMap[K]) => void;

/**
 * HMR Channel interface (inspired by Vite)
 */
export interface HotChannel {
	send(payload: HMRMessage): void;
	listen(): void;
	close(): void;
	on<K extends HMREventName>(event: K, listener: HMREventListener<K>): void;
	off<K extends HMREventName>(event: K, listener: HMREventListener<K>): void;
}

/**
 * HMR WebSocket Server
 */
export class HMRServer implements HotChannel {
	private wss: WebSocketServer;
	private clients: Set<WebSocket> = new Set();
	private listeners: Map<HMREventName, Set<HMREventListener<HMREventName>>> = new Map();
	private bufferedMessage: HMRMessage | null = null;

	constructor(server: HTTPServer) {
		this.wss = new WebSocketServer({
			server,
			path: "/__l8b_hmr__",
		});

		this.wss.on("connection", (ws) => {
			this.handleConnection(ws);
		});

		this.wss.on("error", (err) => {
			logger.error("WebSocket server error:", err);
			this.emit("error", err);
		});

		logger.debug("HMR WebSocket server initialized");
	}

	/**
	 * Start listening (no-op for WebSocketServer as it attaches to existing server)
	 */
	listen(): void {
		// No-op
	}

	/**
	 * Handle new WebSocket connection
	 */
	private handleConnection(ws: WebSocket): void {
		logger.info("Client connected");
		this.clients.add(ws);

		// Emit connection event
		this.emit("client:connect", ws);

		// Send connected message
		ws.send(JSON.stringify({ type: "connected" }));

		// Send buffered message if any
		if (this.bufferedMessage) {
			ws.send(JSON.stringify(this.bufferedMessage));
			this.bufferedMessage = null;
		}

		ws.on("message", (data) => {
			try {
				const message = JSON.parse(data.toString());
				this.handleMessage(ws, message);
			} catch (err) {
				logger.error("Failed to parse message:", err);
			}
		});

		ws.on("close", () => {
			logger.info("Client disconnected");
			this.clients.delete(ws);
			this.emit("client:disconnect", ws);
		});

		ws.on("error", (err) => {
			logger.error("WebSocket error:", err);
			this.clients.delete(ws);
			this.emit("error", err);
		});
	}

	/**
	 * Handle incoming message from client
	 */
	private handleMessage(ws: WebSocket, message: Record<string, unknown>): void {
		logger.debug("Received message:", message);

		// Handle different message types if needed
		switch (message.name || message.type) {
			case "ping":
				// Send pong response (not a standard HMRMessage type, sent directly)
				if (ws.readyState === WebSocket.OPEN) {
					ws.send(JSON.stringify({ type: "pong" }));
				}
				break;

			default:
				this.emit("message", message, ws);
				break;
		}
	}

	/**
	 * Broadcast message to all connected clients
	 */
	send(message: HMRMessage): void {
		// Buffer error and full_reload messages when no clients are connected
		if ((message.type === "error" || message.type === "full_reload") && this.clients.size === 0) {
			this.bufferedMessage = message;
			logger.debug("Buffered message (no clients connected):", message.type);
			return;
		}

		// Stringify once for all clients (performance optimization)
		const data = JSON.stringify(message);
		let sent = 0;

		for (const client of this.clients) {
			if (client.readyState === WebSocket.OPEN) {
				client.send(data);
				sent++;
			}
		}

		logger.debug(`Broadcast to ${sent} clients:`, message.type);
	}

	/**
	 * Register event listener with type safety
	 */
	on<K extends HMREventName>(event: K, listener: HMREventListener<K>): void {
		if (!this.listeners.has(event)) {
			this.listeners.set(event, new Set());
		}
		this.listeners.get(event)!.add(listener as HMREventListener<HMREventName>);
	}

	/**
	 * Unregister event listener
	 */
	off<K extends HMREventName>(event: K, listener: HMREventListener<K>): void {
		const listeners = this.listeners.get(event);
		if (listeners) {
			listeners.delete(listener as HMREventListener<HMREventName>);
		}
	}

	/**
	 * Emit event with type safety
	 */
	private emit<K extends HMREventName>(event: K, ...args: HMREventMap[K]): void {
		const listeners = this.listeners.get(event);
		if (listeners) {
			for (const listener of listeners) {
				(listener as HMREventListener<K>)(...args);
			}
		}
	}

	/**
	 * Get number of connected clients
	 */
	getClientCount(): number {
		return this.clients.size;
	}

	/**
	 * Close the WebSocket server
	 */
	close(): void {
		// Close all client connections
		for (const client of this.clients) {
			client.close();
		}
		this.clients.clear();

		// Close the server
		this.wss.close();
		logger.debug("HMR server closed");
	}
}
