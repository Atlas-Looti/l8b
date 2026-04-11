import type { RealtimeBridge } from "./types";

export interface WebSocketBridgeOptions {
	/**
	 * WebSocket URL.
	 * Example: "wss://realtime.mygame.com/ws"
	 */
	url: string;

	/**
	 * Auto-reconnect on disconnect. Default: true.
	 */
	reconnect?: boolean;

	/**
	 * Base delay (ms) before first reconnect attempt. Default: 1000.
	 * Doubles on each failure (exponential backoff), capped at maxReconnectDelay.
	 */
	reconnectDelay?: number;

	/**
	 * Maximum reconnect delay (ms). Default: 30000.
	 */
	maxReconnectDelay?: number;

	/**
	 * Maximum number of reconnect attempts before giving up. Default: Infinity.
	 */
	maxReconnectAttempts?: number;

	/**
	 * Called when connected (including reconnects).
	 */
	onConnect?: () => void;

	/**
	 * Called when disconnected.
	 */
	onDisconnect?: (event: CloseEvent) => void;

	/**
	 * Called on connection error.
	 */
	onError?: (event: Event) => void;
}

interface Envelope {
	channel: string;
	payload: unknown;
}

/**
 * Creates a RealtimeBridge backed by a WebSocket connection.
 *
 * Messages are framed as JSON envelopes: `{ channel: string, payload: unknown }`.
 * Supports auto-reconnect with exponential backoff.
 *
 * @example
 * ```ts
 * const realtime = createWebSocketBridge({ url: "wss://realtime.mygame.com" });
 * await realtime.connect();
 *
 * const bridge = {
 *   ...createRealtimeBridge(realtime),
 *   ...createHttpBridge({ baseUrl: "https://api.mygame.com" }),
 *   getSession: () => fetchSession(),
 * };
 * ```
 */
export function createWebSocketBridge(options: WebSocketBridgeOptions): RealtimeBridge {
	const {
		url,
		reconnect = true,
		reconnectDelay = 1000,
		maxReconnectDelay = 30_000,
		maxReconnectAttempts = Infinity,
		onConnect,
		onDisconnect,
		onError,
	} = options;

	let ws: WebSocket | null = null;
	let intentionalClose = false;
	let reconnectAttempts = 0;
	let reconnectTimer: ReturnType<typeof setTimeout> | null = null;
	let currentDelay = reconnectDelay;

	// Pending messages queued while disconnected
	const sendQueue: Envelope[] = [];

	// Subscriptions: channel → Set of handlers
	const subs = new Map<string, Set<(payload: unknown) => void>>();

	// Connect resolve/reject for the current connect() call
	let connectResolve: (() => void) | null = null;
	let connectReject: ((err: Error) => void) | null = null;

	function dispatch(channel: string, payload: unknown): void {
		const handlers = subs.get(channel);
		if (handlers) {
			for (const h of handlers) {
				try { h(payload); } catch {}
			}
		}
	}

	function flushQueue(): void {
		while (sendQueue.length > 0 && ws?.readyState === WebSocket.OPEN) {
			const msg = sendQueue.shift()!;
			ws.send(JSON.stringify(msg));
		}
	}

	function openConnection(): void {
		ws = new WebSocket(url);

		ws.onopen = () => {
			reconnectAttempts = 0;
			currentDelay = reconnectDelay;
			flushQueue();
			onConnect?.();
			connectResolve?.();
			connectResolve = null;
			connectReject = null;
		};

		ws.onmessage = (event) => {
			try {
				const envelope = JSON.parse(event.data as string) as Envelope;
				if (envelope && typeof envelope.channel === "string") {
					dispatch(envelope.channel, envelope.payload);
				}
			} catch {
				// Non-JSON or malformed message — ignore
			}
		};

		ws.onerror = (event) => {
			onError?.(event);
			connectReject?.(new Error("WebSocket connection failed"));
			connectReject = null;
		};

		ws.onclose = (event) => {
			onDisconnect?.(event);

			if (!intentionalClose && reconnect) {
				reconnectAttempts++;
				if (reconnectAttempts > maxReconnectAttempts) return;

				reconnectTimer = setTimeout(() => {
					openConnection();
				}, currentDelay);

				currentDelay = Math.min(currentDelay * 2, maxReconnectDelay);
			}
		};
	}

	return {
		async connect(): Promise<void> {
			if (ws?.readyState === WebSocket.OPEN) return;
			intentionalClose = false;

			return new Promise<void>((resolve, reject) => {
				connectResolve = resolve;
				connectReject = reject;
				openConnection();
			});
		},

		async disconnect(): Promise<void> {
			intentionalClose = true;
			if (reconnectTimer !== null) {
				clearTimeout(reconnectTimer);
				reconnectTimer = null;
			}
			ws?.close();
			ws = null;
		},

		send(channel: string, payload: unknown): void {
			const envelope: Envelope = { channel, payload };
			if (ws?.readyState === WebSocket.OPEN) {
				ws.send(JSON.stringify(envelope));
			} else {
				// Queue for when connection reopens
				sendQueue.push(envelope);
			}
		},

		subscribe(channel: string, handler: (payload: unknown) => void): () => void {
			if (!subs.has(channel)) subs.set(channel, new Set());
			subs.get(channel)!.add(handler);
			return () => {
				subs.get(channel)?.delete(handler);
			};
		},
	};
}
