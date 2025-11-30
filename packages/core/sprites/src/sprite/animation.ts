/**
 * Animation management for Sprite class
 * Handles frame timing and animation control
 */

import {
	APIErrorCode,
	createDiagnostic,
	formatForBrowser,
} from "@l8b/diagnostics";

export function setFPS(
	sprite: {
		fps: number;
		animation_start: number;
		frames: any[];
	},
	fps: number,
): number {
	const dt =
		1000 /
		sprite.fps;
	const frame =
		((Date.now() -
			sprite.animation_start) /
			dt) %
		sprite
			.frames
			.length;
	sprite.fps =
		fps;
	const newDt =
		1000 /
		fps;
	sprite.animation_start =
		Date.now() -
		frame *
			newDt;
	return fps;
}

export function setFrame(
	sprite: {
		fps: number;
		animation_start: number;
		frames: any[];
	},
	f: number,
	runtime?: any,
): void {
	// Validate frame index
	if (
		sprite.frames &&
		sprite
			.frames
			.length >
			0
	) {
		if (
			f <
				0 ||
			f >=
				sprite
					.frames
					.length ||
			!isFinite(
				f,
			)
		) {
			const diagnostic =
				createDiagnostic(
					APIErrorCode.E7024,
					{
						data:
							{
								frame:
									f,
								totalFrames:
									sprite
										.frames
										.length,
							},
					},
				);
			const formatted =
				formatForBrowser(
					diagnostic,
				);

			if (
				runtime
					?.listener
					?.reportError
			) {
				runtime.listener.reportError(
					formatted,
				);
			}
			// Clamp to valid range
			f =
				Math.max(
					0,
					Math.min(
						sprite
							.frames
							.length -
							1,
						Math.floor(
							f,
						),
					),
				);
		}
	}

	sprite.animation_start =
		Date.now() -
		(1000 /
			sprite.fps) *
			f;
}

export function getFrame(sprite: {
	fps: number;
	animation_start: number;
	frames: any[];
}): number {
	const dt =
		1000 /
		sprite.fps;
	return (
		Math.floor(
			(Date.now() -
				sprite.animation_start) /
				dt,
		) %
		sprite
			.frames
			.length
	);
}

export function getCurrentFrameCanvas(sprite: {
	frames: Array<{
		canvas: HTMLCanvasElement;
	}>;
	fps: number;
	animation_start: number;
}): HTMLCanvasElement | null {
	if (
		sprite
			.frames
			.length ===
		0
	) {
		return null;
	}

	if (
		sprite
			.frames
			.length ===
		1
	) {
		return sprite
			.frames[0]
			.canvas;
	}

	const frameIndex =
		getFrame(
			sprite,
		);
	if (
		frameIndex >=
			0 &&
		frameIndex <
			sprite
				.frames
				.length
	) {
		return sprite
			.frames[
			frameIndex
		]
			.canvas;
	}

	return sprite
		.frames[0]
		.canvas;
}
