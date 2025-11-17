import { OUT_OF_BOUNDS } from "../shared/constants";
import { computeRelativePosition, hasDocument } from "../shared/utils";
import type { MouseState } from "../types";

type MouseListener = (event: MouseEvent) => void;
type WheelListener = (event: WheelEvent | Event) => void;

export class MouseInput {
	public readonly state: MouseState = {
		x: OUT_OF_BOUNDS,
		y: OUT_OF_BOUNDS,
		pressed: 0,
		left: 0,
		middle: 0,
		right: 0,
		press: 0,
		release: 0,
		wheel: 0,
	};

	private previousPressed = false;
	private wheel = 0;
	private canvas?: HTMLCanvasElement;
	private removeListeners?: () => void;

	constructor(canvas?: HTMLCanvasElement) {
		if (canvas) {
			this.setCanvas(canvas);
		}
	}

	public setCanvas(canvas: HTMLCanvasElement): void {
		this.detach();
		this.canvas = canvas;
		this.attach();
	}

	public syncFromTouch(x: number, y: number, touching: boolean): void {
		this.state.x = x;
		this.state.y = y;
		if (touching) {
			this.state.left = 1;
			this.state.middle = 0;
			this.state.right = 0;
			this.state.pressed = 1;
		} else {
			this.state.left = 0;
			this.state.middle = 0;
			this.state.right = 0;
			this.state.pressed = 0;
		}
	}

	public update(): void {
		if (this.state.pressed && !this.previousPressed) {
			this.previousPressed = true;
			this.state.press = 1;
		} else {
			this.state.press = 0;
		}

		if (!this.state.pressed && this.previousPressed) {
			this.previousPressed = false;
			this.state.release = 1;
		} else {
			this.state.release = 0;
		}

		this.state.wheel = this.wheel;
		this.wheel = 0;
	}

	private attach(): void {
		if (!hasDocument) {
			return;
		}
		const target = document;
		const onDown: MouseListener = (event) => this.handleMouseDown(event);
		const onMove: MouseListener = (event) => this.handleMouseMove(event);
		const onUp: MouseListener = (event) => this.handleMouseUp(event);
		const onWheel: WheelListener = (event) =>
			this.handleWheel(event as WheelEvent);
		const onDomWheel: WheelListener = (event) =>
			this.handleWheel(event as WheelEvent);

		target.addEventListener("mousedown", onDown, { passive: false });
		target.addEventListener("mousemove", onMove, { passive: false });
		target.addEventListener("mouseup", onUp, { passive: false });
		target.addEventListener("mousewheel", onWheel as EventListener, {
			passive: false,
		});
		target.addEventListener("DOMMouseScroll", onDomWheel as EventListener, {
			passive: false,
		});

		this.removeListeners = () => {
			target.removeEventListener("mousedown", onDown);
			target.removeEventListener("mousemove", onMove);
			target.removeEventListener("mouseup", onUp);
			target.removeEventListener("mousewheel", onWheel as EventListener);
			target.removeEventListener("DOMMouseScroll", onDomWheel as EventListener);
		};
	}

	private detach(): void {
		this.removeListeners?.();
		this.removeListeners = undefined;
		this.canvas = undefined;
	}

	private handleMouseDown(event: MouseEvent): void {
		if (!this.canvas) return;
		event.preventDefault();
		const { x, y } = computeRelativePosition(
			this.canvas,
			event.clientX,
			event.clientY,
		);
		this.state.x = x;
		this.state.y = y;
		switch (event.button) {
			case 0:
				this.state.left = 1;
				break;
			case 1:
				this.state.middle = 1;
				break;
			case 2:
				this.state.right = 1;
				break;
		}
		this.state.pressed = Math.min(
			1,
			this.state.left + this.state.right + this.state.middle,
		);
	}

	private handleMouseMove(event: MouseEvent): void {
		if (!this.canvas) return;
		event.preventDefault();
		const { x, y } = computeRelativePosition(
			this.canvas,
			event.clientX,
			event.clientY,
		);
		this.state.x = x;
		this.state.y = y;
	}

	private handleMouseUp(event: MouseEvent): void {
		if (!this.canvas) return;
		event.preventDefault();
		const { x, y } = computeRelativePosition(
			this.canvas,
			event.clientX,
			event.clientY,
		);
		this.state.x = x;
		this.state.y = y;
		switch (event.button) {
			case 0:
				this.state.left = 0;
				break;
			case 1:
				this.state.middle = 0;
				break;
			case 2:
				this.state.right = 0;
				break;
		}
		this.state.pressed = Math.min(
			1,
			this.state.left + this.state.right + this.state.middle,
		);
	}

	private handleWheel(event: WheelEvent | Event): void {
		const wheelEvent = event as WheelEvent & {
			wheelDelta?: number;
			detail?: number;
		};
		if (typeof wheelEvent.deltaY === "number" && wheelEvent.deltaY !== 0) {
			this.wheel = wheelEvent.deltaY > 0 ? -1 : 1;
		} else if (
			typeof wheelEvent.wheelDelta === "number" &&
			wheelEvent.wheelDelta !== 0
		) {
			this.wheel = wheelEvent.wheelDelta < 0 ? -1 : 1;
		} else if (
			typeof wheelEvent.detail === "number" &&
			wheelEvent.detail !== 0
		) {
			this.wheel = wheelEvent.detail > 0 ? -1 : 1;
		} else {
			this.wheel = 0;
		}
		event.preventDefault();
	}
}
