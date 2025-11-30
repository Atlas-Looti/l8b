/**
 * Map rendering for Image class
 * Handles drawing map objects onto the canvas
 */

import type { ImageContextState } from "./context";
import { closeDrawOp, initDrawOp } from "./drawing";

export interface MapSource {
	ready?: boolean | number;
	draw?: (context: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) => void;
}

const resolveStringMap = (name: string): MapSource | null => {
	const playerRuntime = (globalThis as any)?.player?.runtime;
	if (!playerRuntime) {
		return null;
	}

	// Resolved maps are stored under runtime.maps; fall back to
	// screen.runtime.maps if provided by host environments.
	const directMaps = playerRuntime.maps as Record<string, MapSource> | undefined;
	if (directMaps && directMaps[name]) {
		return directMaps[name];
	}

	const screenMaps = playerRuntime.screen?.runtime?.maps as Record<string, MapSource> | undefined;
	if (screenMaps && screenMaps[name]) {
		return screenMaps[name];
	}

	return null;
};

export function drawMap(
	context: CanvasRenderingContext2D,
	state: ImageContextState,
	map: MapSource | string,
	x: number,
	y: number,
	w: number,
	h: number,
): void {
	const resolvedMap: MapSource | null = typeof map === "string" ? resolveStringMap(map) : (map ?? null);

	if (!resolvedMap || !resolvedMap.ready || !resolvedMap.draw) {
		return;
	}

	context.globalAlpha = state.alpha;
	context.imageSmoothingEnabled = !state.pixelated;

	if (initDrawOp(context, state, x, y)) {
		resolvedMap.draw(context, -w / 2 - (state.anchor_x * w) / 2, -h / 2 + (state.anchor_y * h) / 2, w, h);
		closeDrawOp(context);
	} else {
		resolvedMap.draw(context, x - w / 2 - (state.anchor_x * w) / 2, y - h / 2 + (state.anchor_y * h) / 2, w, h);
	}
}
