import type { RuntimeBridge, HostEvent } from "@al8b/runtime";
import type { RealtimeBridge } from "./types";

/**
 * Create a RuntimeBridge adapter from a RealtimeBridge.
 *
 * This adapter maps realtime transport channels to RuntimeBridge events.
 * Incoming messages on the `"host.event"` channel are delivered as HostEvent.
 * Outgoing `bridge.emit` calls are sent on the `"runtime.emit"` channel.
 *
 * Note: This adapter does not implement `request`, `getSession`, `saveSnapshot`,
 * or `loadSnapshot`. Compose those capabilities separately:
 *
 * ```ts
 * const bridge = {
 *   ...createRealtimeBridge(realtime),
 *   getSession: () => fetchSession(userId),
 *   saveSnapshot: (snap) => cloudSave(userId, snap),
 * };
 * ```
 *
 * @param realtime - The realtime transport bridge
 * @returns A RuntimeBridge that integrates with the realtime transport
 */
export function createRealtimeBridge(realtime: RealtimeBridge): RuntimeBridge {
	const isHostEvent = (payload: unknown): payload is HostEvent => {
		return (
			payload !== null &&
			typeof payload === "object" &&
			"type" in payload &&
			typeof (payload as any).type === "string"
		);
	};

	const subscribe: RuntimeBridge["subscribe"] = (handler) => {
		// Subscribe to incoming host events from realtime
		const unsub1 = realtime.subscribe("host.event", (payload) => {
			if (isHostEvent(payload)) {
				handler({
					...payload,
					source: (payload.source ?? "realtime") as "host" | "backend" | "realtime",
				});
			}
		});

		// Also subscribe to player messages for direct game-to-host communication
		const unsub2 = realtime.subscribe("player.message", (payload) => {
			handler({
				type: "player.message",
				payload,
				source: "realtime",
			});
		});

		return () => {
			unsub1();
			unsub2();
		};
	};

	const emit: RuntimeBridge["emit"] = (name, payload) => {
		// Forward game emissions back to the realtime transport
		realtime.send("runtime.emit", { name, payload });
	};

	return {
		emit,
		subscribe,
	};
}
