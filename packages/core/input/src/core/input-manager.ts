import { GamepadInput } from "../devices/gamepad";
import { KeyboardInput } from "../devices/keyboard";
import { MouseInput } from "../devices/mouse";
import { TouchInput } from "../devices/touch";
import type { KeyboardState, MouseState, TouchState } from "../types";

/**
 * Input manager - orchestrates keyboard, mouse, touch, and gamepad handlers.
 */
export class Input {
	private readonly keyboard: KeyboardInput;
	private readonly mouse: MouseInput;
	private readonly touch: TouchInput;
	private readonly gamepad: GamepadInput;
	private runtime?: any;

	constructor(canvas?: HTMLCanvasElement, runtime?: any) {
		this.runtime = runtime;
		this.keyboard = new KeyboardInput();
		this.mouse = new MouseInput(canvas);
		this.touch = new TouchInput(this.mouse, canvas);
		this.gamepad = new GamepadInput();
	}

	/**
	 * Poll all devices for state updates.
	 */
	public update(): void {
		this.keyboard.update();
		this.mouse.update();
		this.touch.update();
		this.gamepad.update();
	}

	public getKeyboard(): KeyboardState {
		// Validate keyboard state exists before returning
		if (!this.keyboard || !this.keyboard.state) {
			this.runtime?.listener?.reportError?.({ code: "E7052", message: "Keyboard state not available", data: { error: "Keyboard state not available" } });
			// Return empty state as fallback to prevent crashes
			return {} as KeyboardState;
		}
		return this.keyboard.state;
	}

	public getMouse(): MouseState {
		// Validate mouse state exists before returning
		if (!this.mouse || !this.mouse.state) {
			this.runtime?.listener?.reportError?.({ code: "E7052", message: "Mouse state not available", data: { error: "Mouse state not available" } });
			// Return empty state as fallback to prevent crashes
			return {} as MouseState;
		}
		return this.mouse.state;
	}

	public getTouch(): TouchState {
		// Validate touch state exists before returning
		if (!this.touch || !this.touch.state) {
			this.runtime?.listener?.reportError?.({ code: "E7052", message: "Touch state not available", data: { error: "Touch state not available" } });
			// Return empty state as fallback to prevent crashes
			return {} as TouchState;
		}
		return this.touch.state;
	}

	public getGamepad(): GamepadInput {
		// Check if gamepad API is available in the browser
		if (!this.gamepad || !navigator.getGamepads) {
			this.runtime?.listener?.reportError?.({ code: "E7051", message: "Gamepad API not available", data: { device: "gamepad" } });
		}
		return this.gamepad;
	}

	public setCanvas(canvas: HTMLCanvasElement): void {
		this.mouse.setCanvas(canvas);
		this.touch.setCanvas(canvas);
	}
}
