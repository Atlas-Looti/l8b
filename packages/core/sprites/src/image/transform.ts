/**
 * Transform operations for Image class
 * Handles translation, rotation, scaling, and anchoring
 */

import type { ImageContextState } from "./context";
import { updateImageTransform } from "./context";

export function setTranslation(state: ImageContextState, translation_x: number, translation_y: number): void {
	state.translation_x = translation_x;
	state.translation_y = translation_y;

	if (!isFinite(state.translation_x)) {
		state.translation_x = 0;
	}
	if (!isFinite(state.translation_y)) {
		state.translation_y = 0;
	}

	updateImageTransform(state);
}

export function setScale(state: ImageContextState, scale_x: number, scale_y: number): void {
	state.scale_x = scale_x;
	state.scale_y = scale_y;

	if (!isFinite(state.scale_x) || state.scale_x === 0) {
		state.scale_x = 1;
	}
	if (!isFinite(state.scale_y) || state.scale_y === 0) {
		state.scale_y = 1;
	}

	updateImageTransform(state);
}

export function setRotation(state: ImageContextState, rotation: number): void {
	state.rotation = rotation;

	if (!isFinite(state.rotation)) {
		state.rotation = 0;
	}

	updateImageTransform(state);
}

export function setDrawAnchor(state: ImageContextState, anchor_x: number, anchor_y: number): void {
	state.anchor_x = anchor_x;
	state.anchor_y = anchor_y;

	if (typeof state.anchor_x !== "number") {
		state.anchor_x = 0;
	}
	if (typeof state.anchor_y !== "number") {
		state.anchor_y = 0;
	}
}

export function setDrawRotation(state: ImageContextState, object_rotation: number): void {
	state.object_rotation = object_rotation;
}

export function setDrawScale(state: ImageContextState, object_scale_x: number, object_scale_y: number): void {
	state.object_scale_x = object_scale_x;
	state.object_scale_y = object_scale_y;
}
