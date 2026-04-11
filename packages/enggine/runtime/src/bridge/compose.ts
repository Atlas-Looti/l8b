import type { RuntimeBridge, HostEvent, RuntimeSnapshot, RuntimeSnapshotMeta, RuntimeSessionSnapshot } from "../types";

/**
 * Compose multiple RuntimeBridge objects into one, with correct precedence:
 *
 * - `request`      — last bridge that defines it wins (right-most takes priority)
 * - `emit`         — fires on ALL bridges that define it (fanout)
 * - `subscribe`    — subscribes to ALL bridges, merges all incoming events
 * - `getSession`   — first bridge that defines it wins (left-most takes priority)
 * - `saveSnapshot` — first bridge that defines it wins
 * - `loadSnapshot` — first bridge that defines it wins
 *
 * @example
 * ```ts
 * const bridge = composeBridge(
 *   createRealtimeBridge(ws),                         // subscribe + emit
 *   createHttpBridge({ baseUrl: "https://api.com" }), // request
 *   {
 *     getSession: () => fetchSession(),
 *     saveSnapshot: (snap, meta) => saveToCloud(snap, meta),
 *     loadSnapshot: (meta) => loadFromCloud(meta),
 *   },
 * );
 * ```
 */
export function composeBridge(...bridges: RuntimeBridge[]): RuntimeBridge {
	// request: rightmost wins
	let requestFn: RuntimeBridge["request"] | undefined;
	for (const b of bridges) {
		if (b.request) requestFn = b.request.bind(b);
	}

	// emit: fanout to all
	const emitFns = bridges.filter((b) => b.emit).map((b) => b.emit!.bind(b));
	const emit: RuntimeBridge["emit"] =
		emitFns.length > 0
			? (name, payload) => {
					for (const fn of emitFns) fn(name, payload);
				}
			: undefined;

	// subscribe: merge all
	const subscribeFns = bridges.filter((b) => b.subscribe).map((b) => b.subscribe!.bind(b));
	const subscribe: RuntimeBridge["subscribe"] =
		subscribeFns.length > 0
			? (handler: (event: HostEvent) => void) => {
					const unsubs = subscribeFns.map((fn) => fn(handler)).filter((u): u is () => void => typeof u === "function");
					return () => {
						for (const u of unsubs) u();
					};
				}
			: undefined;

	// getSession: leftmost wins
	let getSessionFn: RuntimeBridge["getSession"] | undefined;
	for (const b of bridges) {
		if (b.getSession) { getSessionFn = b.getSession.bind(b); break; }
	}

	// saveSnapshot: leftmost wins
	let saveSnapshotFn: RuntimeBridge["saveSnapshot"] | undefined;
	for (const b of bridges) {
		if (b.saveSnapshot) { saveSnapshotFn = b.saveSnapshot.bind(b); break; }
	}

	// loadSnapshot: leftmost wins
	let loadSnapshotFn: RuntimeBridge["loadSnapshot"] | undefined;
	for (const b of bridges) {
		if (b.loadSnapshot) { loadSnapshotFn = b.loadSnapshot.bind(b); break; }
	}

	const composed: RuntimeBridge = {};
	if (requestFn) composed.request = <TResponse>(name: string, payload?: unknown) => (requestFn as NonNullable<RuntimeBridge["request"]>)<TResponse>(name, payload);
	if (emit) composed.emit = emit;
	if (subscribe) composed.subscribe = subscribe;
	if (getSessionFn) composed.getSession = (): Promise<RuntimeSessionSnapshot | null> | RuntimeSessionSnapshot | null => getSessionFn!();
	if (saveSnapshotFn) composed.saveSnapshot = (snap: RuntimeSnapshot, meta?: RuntimeSnapshotMeta) => saveSnapshotFn!(snap, meta);
	if (loadSnapshotFn) composed.loadSnapshot = (meta?: RuntimeSnapshotMeta) => loadSnapshotFn!(meta);

	return composed;
}
