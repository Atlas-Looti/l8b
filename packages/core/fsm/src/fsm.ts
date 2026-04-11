export interface StateConfig {
	onEnter?: () => void;
	onExit?: () => void;
	onUpdate?: (dtMs: number) => void;
}

export class FSM {
	id = 0;
	private states: Map<string, StateConfig> = new Map();
	private current: string | null = null;
	private previous: string | null = null;
	private enterTime = 0;
	private pendingTransition: string | null = null;
	private inUpdate = false;

	addState(name: string, config: StateConfig): void {
		this.states.set(name, config);
	}

	removeState(name: string): void {
		this.states.delete(name);
	}

	transition(name: string): void {
		if (!this.states.has(name)) return;
		if (this.inUpdate) {
			this.pendingTransition = name;
			return;
		}
		this._doTransition(name);
	}

	update(dtMs: number): void {
		if (this.current === null) return;
		const state = this.states.get(this.current);
		if (state?.onUpdate) {
			this.inUpdate = true;
			try {
				state.onUpdate(dtMs);
			} finally {
				this.inUpdate = false;
			}
		}
		if (this.pendingTransition !== null) {
			const next = this.pendingTransition;
			this.pendingTransition = null;
			this._doTransition(next);
		}
	}

	getState(): string | null {
		return this.current;
	}

	getPrevious(): string | null {
		return this.previous;
	}

	getTimeInState(): number {
		if (this.current === null) return 0;
		return Date.now() - this.enterTime;
	}

	reset(): void {
		this.states.clear();
		this.current = null;
		this.previous = null;
		this.enterTime = 0;
		this.pendingTransition = null;
		this.inUpdate = false;
	}

	private _doTransition(name: string): void {
		const state = this.states.get(name);
		if (!state) return;
		if (this.current !== null) {
			const cur = this.states.get(this.current);
			cur?.onExit?.();
		}
		this.previous = this.current;
		this.current = name;
		this.enterTime = Date.now();
		state.onEnter?.();
	}
}
