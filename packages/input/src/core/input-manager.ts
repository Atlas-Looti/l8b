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

	constructor(canvas?: HTMLCanvasElement) {
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
		return this.keyboard.state;
	}

	public getMouse(): MouseState {
		return this.mouse.state;
	}

	public getTouch(): TouchState {
		return this.touch.state;
	}

	public getGamepad(): GamepadInput {
		return this.gamepad;
	}

	public setCanvas(canvas: HTMLCanvasElement): void {
		this.mouse.setCanvas(canvas);
		this.touch.setCanvas(canvas);
	}
}
