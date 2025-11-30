/**
 * Context management for Image class
 * Handles canvas context initialization and state management
 */

export interface ImageContextState {
	alpha: number;
	pixelated: number;
	line_width: number;
	translation_x: number;
	translation_y: number;
	rotation: number;
	scale_x: number;
	scale_y: number;
	image_transform: boolean;
	anchor_x: number;
	anchor_y: number;
	object_rotation: number;
	object_scale_x: number;
	object_scale_y: number;
	font: string;
}

export function createDefaultContextState(centered: boolean): ImageContextState {
	if (centered) {
		return {
			alpha: 1,
			pixelated: 1,
			line_width: 1,
			translation_x: 0, // Will be set to width/2
			translation_y: 0, // Will be set to height/2
			rotation: 0,
			scale_x: 1,
			scale_y: -1,
			image_transform: true,
			anchor_x: 0,
			anchor_y: 0,
			object_rotation: 0,
			object_scale_x: 1,
			object_scale_y: -1,
			font: "BitCell",
		};
	} else {
		return {
			alpha: 1,
			pixelated: 1,
			line_width: 1,
			translation_x: 0,
			translation_y: 0,
			rotation: 0,
			scale_x: 1,
			scale_y: 1,
			image_transform: false,
			anchor_x: -1,
			anchor_y: 1,
			object_rotation: 0,
			object_scale_x: 1,
			object_scale_y: 1,
			font: "BitCell",
		};
	}
}

export function updateImageTransform(state: ImageContextState): void {
	state.image_transform = state.translation_x !== 0 || state.translation_y !== 0 || state.scale_x !== 1 || state.scale_y !== 1 || state.rotation !== 0;
}
