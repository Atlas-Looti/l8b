import { GamepadInput } from "../devices/gamepad";
import { KeyboardInput } from "../devices/keyboard";
import { MouseInput } from "../devices/mouse";
import { TouchInput } from "../devices/touch";
import type { KeyboardState, MouseState, TouchState } from "../types";
import {
	createDiagnostic,
	APIErrorCode,
	formatForBrowser,
} from "@l8b/diagnostics";

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
		// Validate input state
		if (!this.keyboard || !this.keyboard.state) {
			const diagnostic = createDiagnostic(APIErrorCode.E7052, {
				data: { error: "Keyboard state not available" },
			});
			const formatted = formatForBrowser(diagnostic);

			if (this.runtime?.listener?.reportError) {
				this.runtime.listener.reportError(formatted);
			}
			// Return empty state as fallback
			return {} as KeyboardState;
		}
		return this.keyboard.state;
	}

	public getMouse(): MouseState {
		// Validate input state
		if (!this.mouse || !this.mouse.state) {
			const diagnostic = createDiagnostic(APIErrorCode.E7052, {
				data: { error: "Mouse state not available" },
			});
			const formatted = formatForBrowser(diagnostic);

			if (this.runtime?.listener?.reportError) {
				this.runtime.listener.reportError(formatted);
			}
			// Return empty state as fallback
			return {} as MouseState;
		}
		return this.mouse.state;
	}

	public getTouch(): TouchState {
		// Validate input state
		if (!this.touch || !this.touch.state) {
			const diagnostic = createDiagnostic(APIErrorCode.E7052, {
				data: { error: "Touch state not available" },
			});
			const formatted = formatForBrowser(diagnostic);

			if (this.runtime?.listener?.reportError) {
				this.runtime.listener.reportError(formatted);
			}
			// Return empty state as fallback
			return {} as TouchState;
		}
		return this.touch.state;
	}

	public getGamepad(): GamepadInput {
		// Check if gamepad is available
		if (!this.gamepad || !navigator.getGamepads) {
			const diagnostic = createDiagnostic(APIErrorCode.E7051, {
				data: { device: "gamepad" },
			});
			const formatted = formatForBrowser(diagnostic);

			if (this.runtime?.listener?.reportError) {
				this.runtime.listener.reportError(formatted);
			}
		}
		return this.gamepad;
	}

	public setCanvas(canvas: HTMLCanvasElement): void {
		this.mouse.setCanvas(canvas);
		this.touch.setCanvas(canvas);
	}
}
