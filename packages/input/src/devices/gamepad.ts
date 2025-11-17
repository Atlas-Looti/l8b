/**
 * Gamepad - Game controller input handling
 *
 * Provides gamepad polling and state management.
 */

type ButtonMap = Record<number, string>;
type BrowserGamepad = globalThis.Gamepad;

interface StateMap extends Record<string, any> {
	press: Record<string, number>;
	release: Record<string, number>;
}

const createState = (): StateMap => ({
	press: {},
	release: {},
});

const BUTTONS_MAP: ButtonMap = {
	0: "A",
	1: "B",
	2: "X",
	3: "Y",
	4: "LB",
	5: "RB",
	8: "VIEW",
	9: "MENU",
	10: "LS",
	11: "RS",
	12: "DPAD_UP",
	13: "DPAD_DOWN",
	14: "DPAD_LEFT",
	15: "DPAD_RIGHT",
};

const TRIGGERS_MAP: ButtonMap = {
	6: "LT",
	7: "RT",
};

const ensureState = (state?: StateMap): StateMap => {
	if (!state) {
		return createState();
	}
	state.press ??= {};
	state.release ??= {};
	return state;
};

export class GamepadInput {
	public status: StateMap & Record<number, StateMap>;
	public previous: { global: StateMap } & Record<number, StateMap>;
	public count = 0;

	constructor() {
		this.status = createState();
		this.previous = { global: createState() };
	}

	update(): void {
		const pads = this.getGamepads();
		if (!pads) {
			this.count = 0;
			return;
		}

		let padCount = 0;
		for (let i = 0; i < pads.length; i++) {
			const pad = pads[i];
			if (!pad) {
				break;
			}
			padCount++;
			this.status[i] = ensureState(this.status[i]);
			this.previous[i] = ensureState(this.previous[i]);

			for (const [index, name] of Object.entries(BUTTONS_MAP)) {
				const idx = Number(index);
				const button = pad.buttons[idx];
				if (button) {
					this.status[i][name] = button.pressed ? 1 : 0;
				}
			}

			for (const [index, name] of Object.entries(TRIGGERS_MAP)) {
				const idx = Number(index);
				const trigger = pad.buttons[idx];
				if (trigger) {
					this.status[i][name] = trigger.value ?? 0;
				}
			}

			if (pad.axes.length >= 2) {
				this.updateStick(pad.axes[0], -pad.axes[1], this.status[i], "LEFT");
			}
			if (pad.axes.length >= 4) {
				this.updateStick(pad.axes[2], -pad.axes[3], this.status[i], "RIGHT");
			}
		}

		this.aggregateStatus(pads, padCount);
		this.count = padCount;
		this.updateChanges(this.status, this.previous.global);
		for (let i = 0; i < padCount; i++) {
			this.updateChanges(this.status[i], this.previous[i]);
		}

		for (let i = padCount; i < 4; i++) {
			delete this.status[i];
			delete this.previous[i];
		}
	}

	private getGamepads(): (BrowserGamepad | null)[] | null {
		if (typeof navigator === "undefined" || !navigator.getGamepads) {
			return null;
		}
		try {
			return navigator.getGamepads();
		} catch {
			return null;
		}
	}

	private updateStick(
		x: number,
		y: number,
		target: StateMap,
		prefix: "LEFT" | "RIGHT",
	): void {
		const radius = Math.sqrt(x * x + y * y);
		const angle = Math.floor(
			(((Math.atan2(y, x) + Math.PI * 2) % (Math.PI * 2)) / (Math.PI * 2)) *
				360,
		);
		target[`${prefix}_STICK_ANGLE`] = angle;
		target[`${prefix}_STICK_AMOUNT`] = radius;
		target[`${prefix}_STICK_UP`] = y > 0.5 ? 1 : 0;
		target[`${prefix}_STICK_DOWN`] = y < -0.5 ? 1 : 0;
		target[`${prefix}_STICK_LEFT`] = x < -0.5 ? 1 : 0;
		target[`${prefix}_STICK_RIGHT`] = x > 0.5 ? 1 : 0;
	}

	private aggregateStatus(
		pads: (BrowserGamepad | null)[],
		padCount: number,
	): void {
		for (const [index, name] of Object.entries(BUTTONS_MAP)) {
			this.status[name] = 0;
			const idx = Number(index);
			for (const pad of pads) {
				if (!pad) break;
				if (pad.buttons[idx]?.pressed) {
					this.status[name] = 1;
					break;
				}
			}
		}

		for (const [index, name] of Object.entries(TRIGGERS_MAP)) {
			this.status[name] = 0;
			const idx = Number(index);
			for (const pad of pads) {
				if (!pad) break;
				const button = pad.buttons[idx];
				if (button) {
					this.status[name] = button.value ?? 0;
				}
			}
		}

		this.status.UP = 0;
		this.status.DOWN = 0;
		this.status.LEFT = 0;
		this.status.RIGHT = 0;
		this.status.LEFT_STICK_UP = 0;
		this.status.LEFT_STICK_DOWN = 0;
		this.status.LEFT_STICK_LEFT = 0;
		this.status.LEFT_STICK_RIGHT = 0;
		this.status.RIGHT_STICK_UP = 0;
		this.status.RIGHT_STICK_DOWN = 0;
		this.status.RIGHT_STICK_LEFT = 0;
		this.status.RIGHT_STICK_RIGHT = 0;
		this.status.LEFT_STICK_ANGLE = 0;
		this.status.LEFT_STICK_AMOUNT = 0;
		this.status.RIGHT_STICK_ANGLE = 0;
		this.status.RIGHT_STICK_AMOUNT = 0;
		this.status.RT = 0;
		this.status.LT = 0;

		for (let i = 0; i < padCount; i++) {
			const padState = this.status[i];
			if (!padState) continue;

			padState.UP =
				padState.DPAD_UP ||
				padState.LEFT_STICK_UP ||
				padState.RIGHT_STICK_UP ||
				0
					? 1
					: 0;
			padState.DOWN =
				padState.DPAD_DOWN ||
				padState.LEFT_STICK_DOWN ||
				padState.RIGHT_STICK_DOWN ||
				0
					? 1
					: 0;
			padState.LEFT =
				padState.DPAD_LEFT ||
				padState.LEFT_STICK_LEFT ||
				padState.RIGHT_STICK_LEFT ||
				0
					? 1
					: 0;
			padState.RIGHT =
				padState.DPAD_RIGHT ||
				padState.LEFT_STICK_RIGHT ||
				padState.RIGHT_STICK_RIGHT ||
				0
					? 1
					: 0;

			if (padState.UP) this.status.UP = 1;
			if (padState.DOWN) this.status.DOWN = 1;
			if (padState.LEFT) this.status.LEFT = 1;
			if (padState.RIGHT) this.status.RIGHT = 1;

			if (padState.LEFT_STICK_UP) this.status.LEFT_STICK_UP = 1;
			if (padState.LEFT_STICK_DOWN) this.status.LEFT_STICK_DOWN = 1;
			if (padState.LEFT_STICK_LEFT) this.status.LEFT_STICK_LEFT = 1;
			if (padState.LEFT_STICK_RIGHT) this.status.LEFT_STICK_RIGHT = 1;
			if (padState.RIGHT_STICK_UP) this.status.RIGHT_STICK_UP = 1;
			if (padState.RIGHT_STICK_DOWN) this.status.RIGHT_STICK_DOWN = 1;
			if (padState.RIGHT_STICK_LEFT) this.status.RIGHT_STICK_LEFT = 1;
			if (padState.RIGHT_STICK_RIGHT) this.status.RIGHT_STICK_RIGHT = 1;
			if (padState.LT) this.status.LT = padState.LT;
			if (padState.RT) this.status.RT = padState.RT;

			if (
				(padState.LEFT_STICK_AMOUNT ?? 0) > (this.status.LEFT_STICK_AMOUNT ?? 0)
			) {
				this.status.LEFT_STICK_AMOUNT = padState.LEFT_STICK_AMOUNT;
				this.status.LEFT_STICK_ANGLE = padState.LEFT_STICK_ANGLE;
			}
			if (
				(padState.RIGHT_STICK_AMOUNT ?? 0) >
				(this.status.RIGHT_STICK_AMOUNT ?? 0)
			) {
				this.status.RIGHT_STICK_AMOUNT = padState.RIGHT_STICK_AMOUNT;
				this.status.RIGHT_STICK_ANGLE = padState.RIGHT_STICK_ANGLE;
			}
		}
	}

	private updateChanges(current: StateMap, previous: StateMap): void {
		for (const key in current.press) {
			current.press[key] = 0;
		}
		for (const key in current.release) {
			current.release[key] = 0;
		}
		for (const key in previous) {
			if (key === "press" || key === "release") continue;
			if (previous[key] && !current[key]) {
				current.release[key] = 1;
			}
		}
		for (const key in current) {
			if (key === "press" || key === "release") continue;
			if (current[key] && !previous[key]) {
				current.press[key] = 1;
			}
		}
		for (const key in previous) {
			if (key === "press" || key === "release") continue;
			previous[key] = 0;
		}
		for (const key in current) {
			if (key === "press" || key === "release") continue;
			previous[key] = current[key];
		}
	}
}
