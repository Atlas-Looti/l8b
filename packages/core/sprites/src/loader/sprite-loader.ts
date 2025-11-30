/**
 * Sprite loading operations
 * Handles loading sprites from URLs
 */

import { APIErrorCode, createDiagnostic, formatForBrowser } from "@l8b/diagnostics";
import { Image } from "../image";
import { Sprite } from "../sprite";
import { createFrame } from "../sprite/frame";
import type { SpriteProperties } from "../types";

export function loadSprite(url: string, properties?: SpriteProperties, loaded?: () => void, runtime?: any): Sprite {
	// Validate sprite URL
	if (!url || typeof url !== "string" || url.trim() === "") {
		const diagnostic = createDiagnostic(APIErrorCode.E7023, {
			data: {
				url: String(url),
			},
		});
		const formatted = formatForBrowser(diagnostic);

		if (runtime?.listener?.reportError) {
			runtime.listener.reportError(formatted);
		}
		// Return empty sprite on invalid URL
		const sprite = new Sprite(0, 0);
		sprite.ready = 1;
		return sprite;
	}

	const sprite = new Sprite(0, 0);
	sprite.ready = 0;

	const img = document.createElement("img");
	if (typeof window !== "undefined" && window.location.protocol !== "file:") {
		img.crossOrigin = "Anonymous";
	}
	img.src = url;

	img.onload = () => {
		sprite.ready = 1;
		updateSprite(sprite, img, properties, runtime);
		loaded?.();
	};

	img.onerror = () => {
		sprite.ready = 1;
		const diagnostic = createDiagnostic(APIErrorCode.E7021, {
			data: {
				url,
			},
		});
		const formatted = formatForBrowser(diagnostic);

		if (runtime?.listener?.reportError) {
			runtime.listener.reportError(formatted);
		}
	};

	return sprite;
}

export function updateSprite(
	sprite: Sprite,
	img: HTMLImageElement,
	properties?: SpriteProperties,
	runtime?: any,
): void {
	if (!(img.width > 0 && img.height > 0)) {
		return;
	}

	const numframes = properties?.frames ?? 1;

	// Validate sprite properties
	if (numframes <= 0 || !isFinite(numframes) || !Number.isInteger(numframes)) {
		const diagnostic = createDiagnostic(APIErrorCode.E7022, {
			data: {
				error: `Invalid frames: ${numframes}`,
			},
		});
		const formatted = formatForBrowser(diagnostic);

		if (runtime?.listener?.reportError) {
			runtime.listener.reportError(formatted);
		}
		return;
	}

	const fps = properties?.fps;
	if (fps !== undefined && (fps <= 0 || !isFinite(fps))) {
		const diagnostic = createDiagnostic(APIErrorCode.E7022, {
			data: {
				error: `Invalid fps: ${fps}`,
			},
		});
		const formatted = formatForBrowser(diagnostic);

		if (runtime?.listener?.reportError) {
			runtime.listener.reportError(formatted);
		}
		return;
	}

	sprite.fps = fps ?? sprite.fps;

	sprite.width = img.width;
	sprite.height = Math.round(img.height / numframes);
	sprite.frames = [];

	for (let i = 0; i < numframes; i++) {
		const frame = new Image(sprite.width, sprite.height);
		frame.initContext();
		const ctx = frame.canvas.getContext("2d");
		if (ctx) {
			ctx.drawImage(img, 0, -i * sprite.height);
		}
		sprite.frames.push(createFrame(frame));
	}

	sprite.ready = 1;
}
