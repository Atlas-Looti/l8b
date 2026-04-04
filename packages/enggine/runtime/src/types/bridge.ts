import type { StateSnapshot } from "@al8b/time";

export type HostEventSource = "host" | "backend" | "realtime";

export interface HostEvent {
	type: string;
	payload?: unknown;
	requestId?: string;
	source?: HostEventSource;
}

export interface RuntimeSessionSnapshot {
	user?: {
		id: string;
		displayName?: string;
		roles?: string[];
		metadata?: Record<string, unknown>;
	} | null;
	player?: {
		id: string;
		name?: string;
		slot?: string;
		metadata?: Record<string, unknown>;
	} | null;
	game?: {
		id: string;
		slug?: string;
		version?: string;
	} | null;
	room?: {
		id: string;
		role?: string;
		metadata?: Record<string, unknown>;
	} | null;
}

export interface RuntimeSnapshotMeta {
	slot?: string;
	label?: string;
	metadata?: Record<string, unknown>;
}

export interface RuntimeSnapshot {
	version: 1;
	global: StateSnapshot;
	session: RuntimeSessionSnapshot | null;
	router: {
		path: string;
		sceneName: string | null;
	};
	system: {
		updateRate: number;
	};
}

export interface RuntimeResetOptions {
	preserveStorage?: boolean;
	preserveSession?: boolean;
	preserveSnapshot?: boolean;
	reinitializeSources?: boolean;
}

export interface RuntimeBridge {
	request?<TResponse = unknown>(name: string, payload?: unknown): Promise<TResponse> | TResponse;
	emit?(name: string, payload?: unknown): void;
	subscribe?(handler: (event: HostEvent) => void): (() => void) | void;
	getSession?(): Promise<RuntimeSessionSnapshot | null> | RuntimeSessionSnapshot | null;
	saveSnapshot?(snapshot: RuntimeSnapshot, meta?: RuntimeSnapshotMeta): Promise<void> | void;
	loadSnapshot?(meta?: RuntimeSnapshotMeta): Promise<RuntimeSnapshot | null> | RuntimeSnapshot | null;
}
