import type {
	RuntimeBridge,
	RuntimeSnapshot,
	RuntimeSnapshotMeta,
	RuntimeSessionSnapshot,
	HostEvent,
} from "@al8b/runtime";
import { createHttpBridge, type HttpBridgeConfig } from "./index";

/**
 * Minimal RealtimeBridge interface — matches @al8b/runtime-realtime without importing it.
 * This avoids a circular dependency between http-bridge and runtime-realtime.
 */
interface RealtimeBridgeLike {
	connect(): Promise<void>;
	disconnect(): Promise<void>;
	send(channel: string, payload: unknown): void;
	subscribe(channel: string, handler: (payload: unknown) => void): () => void;
}

type SessionProvider =
	| RuntimeSessionSnapshot
	| (() => RuntimeSessionSnapshot | null | Promise<RuntimeSessionSnapshot | null>);

type SaveHandler = (snapshot: RuntimeSnapshot, meta?: RuntimeSnapshotMeta) => Promise<void> | void;
type LoadHandler = (meta?: RuntimeSnapshotMeta) => Promise<RuntimeSnapshot | null> | RuntimeSnapshot | null;

/**
 * Fluent builder for composing a complete RuntimeBridge.
 *
 * Handles the common mistake of accidentally overwriting `emit` when spreading
 * multiple bridges together. Each capability is set explicitly through typed methods.
 *
 * @example
 * ```ts
 * const bridge = new BridgeBuilder()
 *   .http({
 *     baseUrl: "https://api.mygame.com",
 *     endpoints: { "user.profile": "/users/{id}" },
 *     defaults: { headers: { Authorization: "Bearer " + token } },
 *   })
 *   .realtime(createWebSocketBridge({ url: "wss://realtime.mygame.com" }))
 *   .session(() => fetchSession())
 *   .snapshot({
 *     save: (snap, meta) => saveToCloud(snap, meta),
 *     load: (meta) => loadFromCloud(meta),
 *   })
 *   .on("score_updated", (payload) => updateScoreUI(payload))
 *   .build();
 * ```
 */
export class BridgeBuilder {
	private httpConfig: HttpBridgeConfig | null = null;
	private realtimeBridge: RealtimeBridgeLike | null = null;
	private sessionProvider: SessionProvider | null = null;
	private saveHandler: SaveHandler | null = null;
	private loadHandler: LoadHandler | null = null;
	private emitHandlers: Map<string, ((payload: unknown) => void)[]> = new Map();
	private catchAllEmit: ((name: string, payload: unknown) => void) | null = null;

	/**
	 * Configure the HTTP bridge for host.request() calls.
	 */
	http(config: HttpBridgeConfig): this {
		this.httpConfig = config;
		return this;
	}

	/**
	 * Attach a RealtimeBridge (e.g. createWebSocketBridge) for multiplayer.
	 * Provides subscribe (incoming host events) and emit (game → realtime).
	 */
	realtime(bridge: RealtimeBridgeLike): this {
		this.realtimeBridge = bridge;
		return this;
	}

	/**
	 * Provide session data — user, player, game, room.
	 * Accepts a static object or an async/sync function.
	 */
	session(provider: SessionProvider): this {
		this.sessionProvider = provider;
		return this;
	}

	/**
	 * Configure save/load snapshot handlers.
	 */
	snapshot(handlers: { save?: SaveHandler; load?: LoadHandler }): this {
		if (handlers.save) this.saveHandler = handlers.save;
		if (handlers.load) this.loadHandler = handlers.load;
		return this;
	}

	/**
	 * Listen for a specific event emitted by the game via host.emit(name, payload).
	 * Multiple listeners for the same event are supported.
	 *
	 * @example
	 * builder.on("score_updated", ({ score }) => updateUI(score))
	 */
	on(name: string, handler: (payload: unknown) => void): this {
		if (!this.emitHandlers.has(name)) this.emitHandlers.set(name, []);
		this.emitHandlers.get(name)!.push(handler);
		return this;
	}

	/**
	 * Catch-all listener for any event emitted by the game.
	 */
	onEmit(handler: (name: string, payload: unknown) => void): this {
		this.catchAllEmit = handler;
		return this;
	}

	/**
	 * Build and return the composed RuntimeBridge.
	 */
	build(): RuntimeBridge {
		const httpBridge = this.httpConfig ? createHttpBridge(this.httpConfig) : null;
		const rt = this.realtimeBridge;
		const sessionProvider = this.sessionProvider;
		const saveHandler = this.saveHandler;
		const loadHandler = this.loadHandler;
		const emitHandlers = this.emitHandlers;
		const catchAllEmit = this.catchAllEmit;

		// emit: fires realtime + named listeners + catch-all
		const emit: RuntimeBridge["emit"] = (name, payload) => {
			// Forward to realtime transport
			rt?.send("runtime.emit", { name, payload });

			// Fire named listeners
			const handlers = emitHandlers.get(name);
			if (handlers) {
				for (const h of handlers) h(payload);
			}

			// Fire catch-all
			catchAllEmit?.(name, payload);
		};

		// subscribe: only realtime provides inbound events
		const subscribe: RuntimeBridge["subscribe"] = rt
			? (handler: (event: HostEvent) => void) => {
					const isHostEvent = (p: unknown): p is HostEvent =>
						p != null && typeof p === "object" && "type" in p && typeof (p as any).type === "string";

					const unsub1 = rt.subscribe("host.event", (p) => {
						if (isHostEvent(p)) handler({ ...p, source: (p.source ?? "realtime") as HostEvent["source"] });
					});
					const unsub2 = rt.subscribe("player.message", (p) => {
						handler({ type: "player.message", payload: p, source: "realtime" });
					});
					return () => { unsub1(); unsub2(); };
				}
			: undefined;

		// request: from http bridge
		const request = httpBridge?.request;

		// getSession
		const getSession: RuntimeBridge["getSession"] = sessionProvider
			? () => {
					if (typeof sessionProvider === "function") return sessionProvider();
					return sessionProvider;
				}
			: undefined;

		const bridge: RuntimeBridge = {};
		if (request) bridge.request = request.bind(httpBridge!);
		bridge.emit = emit;
		if (subscribe) bridge.subscribe = subscribe;
		if (getSession) bridge.getSession = getSession;
		if (saveHandler) bridge.saveSnapshot = saveHandler;
		if (loadHandler) bridge.loadSnapshot = loadHandler;

		return bridge;
	}
}
