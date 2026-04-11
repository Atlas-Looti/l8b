import { FSM, type StateConfig } from "./fsm";

export class FSMManager {
	private instances: Map<number, FSM> = new Map();
	private nextId = 0;

	update(dtMs: number): void {
		for (const fsm of this.instances.values()) {
			fsm.update(dtMs);
		}
	}

	create(): number {
		const fsm = new FSM();
		fsm.id = this.nextId++;
		this.instances.set(fsm.id, fsm);
		return fsm.id;
	}

	destroy(id: number): void {
		const fsm = this.instances.get(id);
		if (fsm) {
			fsm.reset();
			this.instances.delete(id);
		}
	}

	reset(): void {
		for (const fsm of this.instances.values()) {
			fsm.reset();
		}
		this.instances.clear();
		this.nextId = 0;
	}

	getInterface(): Record<string, unknown> {
		return {
			create: () => this.create(),
			destroy: (id: number) => this.destroy(id),
			addState: (id: number, name: string, config: StateConfig) => {
				this.instances.get(id)?.addState(name, config);
			},
			removeState: (id: number, name: string) => {
				this.instances.get(id)?.removeState(name);
			},
			transition: (id: number, name: string) => {
				this.instances.get(id)?.transition(name);
			},
			getState: (id: number): string | null => this.instances.get(id)?.getState() ?? null,
			getPrevious: (id: number): string | null => this.instances.get(id)?.getPrevious() ?? null,
			getTimeInState: (id: number): number => this.instances.get(id)?.getTimeInState() ?? 0,
		};
	}
}
