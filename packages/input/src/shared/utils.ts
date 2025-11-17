import { NORMALIZED_SCALE } from "./constants";

interface RelativePosition {
	x: number;
	y: number;
}

export const hasDocument = typeof document !== "undefined";

export const computeRelativePosition = (
	canvas: HTMLCanvasElement,
	clientX: number,
	clientY: number,
): RelativePosition => {
	const rect = canvas.getBoundingClientRect();
	const min = Math.min(canvas.clientWidth, canvas.clientHeight) || 1;
	const x =
		((clientX - rect.left - canvas.clientWidth / 2) / min) * NORMALIZED_SCALE;
	const y =
		((canvas.clientHeight / 2 - (clientY - rect.top)) / min) * NORMALIZED_SCALE;
	return { x, y };
};

export const addEventListener = <K extends keyof DocumentEventMap>(
	target: Document | HTMLElement,
	type: K,
	listener: (this: Document | HTMLElement, ev: DocumentEventMap[K]) => any,
): void => {
	target.addEventListener(type, listener as EventListener, { passive: false });
};
