type EventCallback = (payload: unknown) => void;

interface Subscription {
	id: number;
	event: string;
	cb: EventCallback;
	once: boolean;
}

export class EventBus {
	private subs: Map<string, Subscription[]> = new Map();
	private idToEvent: Map<number, string> = new Map();
	private nextId = 0;
	private deferredQueue: Array<{ event: string; payload: unknown }> = [];
	private flushing = false;

	on(event: string, cb: EventCallback): number {
		return this._add(event, cb, false);
	}

	once(event: string, cb: EventCallback): number {
		return this._add(event, cb, true);
	}

	off(id: number): void {
		const event = this.idToEvent.get(id);
		if (!event) return;
		const list = this.subs.get(event);
		if (!list) return;
		const idx = list.findIndex((s) => s.id === id);
		if (idx !== -1) list.splice(idx, 1);
		this.idToEvent.delete(id);
	}

	emit(event: string, payload?: unknown): void {
		const list = this.subs.get(event);
		if (!list || list.length === 0) return;
		// Snapshot to allow modifications during iteration
		const snap = list.slice();
		for (const sub of snap) {
			if (sub.once) this.off(sub.id);
			sub.cb(payload);
		}
	}

	defer(event: string, payload?: unknown): void {
		if (this.flushing) {
			// If called during flush, emit immediately to avoid infinite queue
			this.emit(event, payload);
		} else {
			this.deferredQueue.push({ event, payload });
		}
	}

	flushDeferred(): void {
		if (this.deferredQueue.length === 0) return;
		this.flushing = true;
		const queue = this.deferredQueue.splice(0);
		for (const item of queue) {
			this.emit(item.event, item.payload);
		}
		this.flushing = false;
	}

	clear(event?: string): void {
		if (event !== undefined) {
			const list = this.subs.get(event);
			if (list) {
				for (const sub of list) this.idToEvent.delete(sub.id);
				this.subs.delete(event);
			}
		} else {
			this.subs.clear();
			this.idToEvent.clear();
		}
	}

	reset(): void {
		this.subs.clear();
		this.idToEvent.clear();
		this.deferredQueue.length = 0;
		this.nextId = 0;
		this.flushing = false;
	}

	getInterface(): Record<string, unknown> {
		return {
			on: (event: string, cb: EventCallback) => this.on(event, cb),
			once: (event: string, cb: EventCallback) => this.once(event, cb),
			off: (id: number) => this.off(id),
			emit: (event: string, payload?: unknown) => this.emit(event, payload),
			defer: (event: string, payload?: unknown) => this.defer(event, payload),
			clear: (event?: string) => this.clear(event),
		};
	}

	private _add(event: string, cb: EventCallback, once: boolean): number {
		const id = this.nextId++;
		const sub: Subscription = { id, event, cb, once };
		let list = this.subs.get(event);
		if (!list) {
			list = [];
			this.subs.set(event, list);
		}
		list.push(sub);
		this.idToEvent.set(id, event);
		return id;
	}
}
