/**
 * Sprite loading operations
 * Handles loading sprites from URLs
 */

import { Image } from "../image";
import { Sprite } from "../sprite";
import { createFrame } from "../sprite/frame";
import type { SpriteProperties } from "../types";

export function loadSprite(
	url: string,
	properties?: SpriteProperties,
	loaded?: () => void,
): Sprite {
	const sprite = new Sprite(0, 0);
	sprite.ready = 0;

	const img = document.createElement("img");
	if (typeof window !== "undefined" && window.location.protocol !== "file:") {
		img.crossOrigin = "Anonymous";
	}
	img.src = url;

	img.onload = () => {
		sprite.ready = 1;
		updateSprite(sprite, img, properties);
		loaded?.();
	};

	img.onerror = () => {
		sprite.ready = 1;
	};

	return sprite;
}

export function updateSprite(
	sprite: Sprite,
	img: HTMLImageElement,
	properties?: SpriteProperties,
): void {
	if (!(img.width > 0 && img.height > 0)) {
		return;
	}

	const numframes = properties?.frames ?? 1;
	sprite.fps = properties?.fps ?? sprite.fps;

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
