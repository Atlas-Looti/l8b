/**
 * InputManager - Manages all input systems
 *
 * Responsibilities:
 * - Initialize input systems
 * - Update input state each frame
 * - Provide unified input interface
 */

import {
	GamepadInput,
	KeyboardInput,
	MouseInput,
	TouchInput,
} from "@l8b/input";

export class InputManager {
	public keyboard: KeyboardInput;
	public mouse: MouseInput;
	public touch: TouchInput;
	public gamepad: GamepadInput;

	constructor(canvas?: HTMLCanvasElement) {
		// Create input systems
		this.keyboard = new KeyboardInput();
		this.mouse = new MouseInput();
		this.touch = new TouchInput(this.mouse);
		this.gamepad = new GamepadInput();

		// Attach to canvas if provided
		if (canvas) {
			this.attachCanvas(canvas);
		}
	}

	/**
	 * Attach input systems to canvas
	 */
	attachCanvas(canvas: HTMLCanvasElement): void {
		this.mouse.setCanvas(canvas);
		this.touch.setCanvas(canvas);
	}

	/**
	 * Update all input systems (call each frame)
	 */
	update(): void {
		this.keyboard.update();
		this.mouse.update();
		this.touch.update();
		this.gamepad.update();
	}

	/**
	 * Get input states for game code
	 */
	getStates(): {
		keyboard: any;
		mouse: any;
		touch: any;
		gamepad: any;
	} {
		return {
			keyboard: this.keyboard.state,
			mouse: this.mouse.state,
			touch: this.touch.state,
			gamepad: this.gamepad.status,
		};
	}
}
