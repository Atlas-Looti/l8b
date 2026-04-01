import { PREVENT_DEFAULT_REGEX } from "../shared/constants";
import { hasDocument } from "../shared/utils";
import type { KeyboardState } from "../types";

export class KeyboardInput {
	public readonly state: KeyboardState = {
		press: {},
		release: {},
		UP: 0,
		DOWN: 0,
		LEFT: 0,
		RIGHT: 0,
	};

	private previous: Record<string, number> = {};

	// Track only keys that changed since last update() — avoids O(n) iteration of all keys
	private dirtyKeys: Set<string> = new Set();

	constructor(target: Document = hasDocument ? document : (undefined as any)) {
		if (!target) {
			return;
		}
		target.addEventListener("keydown", (event) => this.handleKeyDown(event));
		target.addEventListener("keyup", (event) => this.handleKeyUp(event));
	}

	private convertCode(code: string): string {
		let res = "";
		let low = false;
		for (let i = 0; i < code.length; i++) {
			const c = code.charAt(i);
			if (c === c.toUpperCase() && low) {
				res += "_";
				low = false;
			} else {
				low = true;
			}
			res += c.toUpperCase();
		}
		return res;
	}

	private handleKeyDown(event: KeyboardEvent): void {
		if (!(event.altKey || event.ctrlKey || event.metaKey || PREVENT_DEFAULT_REGEX.test(event.key))) {
			event.preventDefault();
		}
		const codeKey = this.convertCode(event.code);
		const upperKey = event.key.toUpperCase();
		this.state[codeKey] = 1;
		this.state[upperKey] = 1;
		this.dirtyKeys.add(codeKey);
		this.dirtyKeys.add(upperKey);
		this.updateDirectional();
	}

	private handleKeyUp(event: KeyboardEvent): void {
		const codeKey = this.convertCode(event.code);
		const upperKey = event.key.toUpperCase();
		this.state[codeKey] = 0;
		this.state[upperKey] = 0;
		this.dirtyKeys.add(codeKey);
		this.dirtyKeys.add(upperKey);
		this.updateDirectional();
	}

	private updateDirectional(): void {
		this.state.UP = (this.state.KEY_W as number) || (this.state.ARROW_UP as number) || 0;
		this.state.DOWN = (this.state.KEY_S as number) || (this.state.ARROW_DOWN as number) || 0;
		this.state.LEFT = (this.state.KEY_A as number) || (this.state.ARROW_LEFT as number) || 0;
		this.state.RIGHT = (this.state.KEY_D as number) || (this.state.ARROW_RIGHT as number) || 0;
	}

	public update(): void {
		// Clear previous press/release state only for dirty keys
		for (const key of this.dirtyKeys) {
			if (this.state.press[key]) this.state.press[key] = 0;
			if (this.state.release[key]) this.state.release[key] = 0;
		}

		// Detect press/release transitions only for dirty keys
		for (const key of this.dirtyKeys) {
			const current = this.state[key] as number;
			const prev = this.previous[key] || 0;

			if (current && !prev) {
				this.state.press[key] = 1;
			} else if (!current && prev) {
				this.state.release[key] = 1;
			}

			this.previous[key] = current;
		}

		this.dirtyKeys.clear();
	}

	public reset(): void {
		for (const key in this.state) {
			if (key === "press" || key === "release") continue;
			this.state[key] = 0;
		}
		for (const key in this.previous) {
			this.previous[key] = 0;
		}
		this.dirtyKeys.clear();
	}
}
