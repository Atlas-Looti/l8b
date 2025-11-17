import { TOUCH_MOUSE_ID } from "../shared/constants";
import { computeRelativePosition, hasDocument } from "../shared/utils";
import type { PointerIdentifier, TouchPoint, TouchState } from "../types";
import type { MouseInput } from "./mouse";

type TouchListener = (event: TouchEvent) => void;

export class TouchInput {
	public readonly state: TouchState = {
		touching: 0,
		x: 0,
		y: 0,
		press: 0,
		release: 0,
		touches: [],
	};

	private touches = new Map<PointerIdentifier, { x: number; y: number }>();
	private previousTouching = false;
	private canvas?: HTMLCanvasElement;
	private removeListeners?: () => void;

	constructor(
		private mouse: MouseInput,
		canvas?: HTMLCanvasElement,
	) {
		if (canvas) {
			this.setCanvas(canvas);
		}
	}

	public setCanvas(canvas: HTMLCanvasElement): void {
		this.detach();
		this.canvas = canvas;
		this.attach();
	}

	public update(): void {
		this.syncMouseTouch();

		const list: TouchPoint[] = [];
		for (const [id, { x, y }] of this.touches.entries()) {
			list.push({ id, x, y });
			this.state.x = x;
			this.state.y = y;
		}
		this.state.touches = list;
		this.state.touching = this.touches.size > 0 ? 1 : 0;

		if (this.state.touching && !this.previousTouching) {
			this.previousTouching = true;
			this.state.press = 1;
		} else {
			this.state.press = 0;
		}

		if (!this.state.touching && this.previousTouching) {
			this.previousTouching = false;
			this.state.release = 1;
		} else {
			this.state.release = 0;
		}
	}

	private syncMouseTouch(): void {
		const mouseState = this.mouse.state;
		if (mouseState.pressed) {
			this.touches.set(TOUCH_MOUSE_ID, { x: mouseState.x, y: mouseState.y });
		} else {
			this.touches.delete(TOUCH_MOUSE_ID);
		}
	}

	private attach(): void {
		if (!hasDocument) return;
		const onStart: TouchListener = (event) => this.handleTouchStart(event);
		const onMove: TouchListener = (event) => this.handleTouchMove(event);
		const onEnd: TouchListener = (event) => this.handleTouchEnd(event);

		document.addEventListener("touchstart", onStart, { passive: false });
		document.addEventListener("touchmove", onMove, { passive: false });
		document.addEventListener("touchend", onEnd, { passive: false });
		document.addEventListener("touchcancel", onEnd, { passive: false });

		this.removeListeners = () => {
			document.removeEventListener("touchstart", onStart);
			document.removeEventListener("touchmove", onMove);
			document.removeEventListener("touchend", onEnd);
			document.removeEventListener("touchcancel", onEnd);
		};
	}

	private detach(): void {
		this.removeListeners?.();
		this.removeListeners = undefined;
		this.canvas = undefined;
		this.touches.clear();
	}

	private handleTouchStart(event: TouchEvent): void {
		if (!this.canvas) return;
		event.preventDefault();
		event.stopPropagation();
		for (let i = 0; i < event.changedTouches.length; i++) {
			const t = event.changedTouches[i];
			const { x, y } = computeRelativePosition(
				this.canvas,
				t.clientX,
				t.clientY,
			);
			this.touches.set(t.identifier, { x, y });
			this.mouse.syncFromTouch(x, y, true);
		}
	}

	private handleTouchMove(event: TouchEvent): void {
		if (!this.canvas) return;
		event.preventDefault();
		event.stopPropagation();
		for (let i = 0; i < event.changedTouches.length; i++) {
			const t = event.changedTouches[i];
			if (!this.touches.has(t.identifier)) continue;
			const { x, y } = computeRelativePosition(
				this.canvas,
				t.clientX,
				t.clientY,
			);
			this.touches.set(t.identifier, { x, y });
			this.mouse.syncFromTouch(x, y, true);
		}
	}

	private handleTouchEnd(event: TouchEvent): void {
		if (!this.canvas) return;
		event.preventDefault();
		event.stopPropagation();
		for (let i = 0; i < event.changedTouches.length; i++) {
			const t = event.changedTouches[i];
			this.touches.delete(t.identifier);
		}
		this.mouse.syncFromTouch(this.state.x, this.state.y, false);
	}
}
