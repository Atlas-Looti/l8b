/**
 * Sprite - Animated sprite class for game graphics
 *
 * Provides sprite animation support with multiple frames.
 */

import { Image } from "@l8b/image";

export interface SpriteProperties {
	frames?: number;
	fps?: number;
}

export class Sprite {
	public name: string = "";
	public frames: Image[] = [];
	public animation_start: number = 0;
	public fps: number = 5;
	public ready: number = 0;
	public width: number;
	public height: number;

	constructor(width: number, height: number) {
		this.width = width;
		this.height = height;
		this.frames = [];
		this.animation_start = 0;
		this.fps = 5;

		if (this.width > 0 && this.height > 0) {
			this.frames.push(new Image(this.width, this.height));
			this.ready = 1;
		}
	}

	/**
	 * Set animation frames per second
	 * Preserves current animation position when changing FPS
	 */
	setFPS(fps: number): number {
		const dt = 1000 / this.fps;
		const frame = ((Date.now() - this.animation_start) / dt) % this.frames.length;
		this.fps = fps;
		const newDt = 1000 / fps;
		this.animation_start = Date.now() - frame * newDt;
		return fps;
	}

	/**
	 * Set the current animation frame
	 */
	setFrame(frame: number): void {
		this.animation_start = Date.now() - (1000 / this.fps) * frame;
	}

	/**
	 * Get the current animation frame index
	 */
	getFrame(): number {
		const dt = 1000 / this.fps;
		return Math.floor((Date.now() - this.animation_start) / dt) % this.frames.length;
	}

	/**
	 * Get the canvas of the current frame
	 */
	getCurrentFrameCanvas(): HTMLCanvasElement | null {
		if (!this.ready || this.frames.length === 0) {
			return null;
		}

		if (this.frames.length > 1) {
			if (this.animation_start === 0) {
				this.animation_start = Date.now();
			}
			const frame = this.getFrame();
			if (frame >= 0 && frame < this.frames.length) {
				return this.frames[frame].canvas;
			}
			return this.frames[0].canvas;
		}

		return this.frames[0].canvas;
	}
}

/**
 * Load a sprite from a URL
 * Supports multi-frame spritesheets (vertical stacking)
 */
export function LoadSprite(
	url: string,
	properties?: SpriteProperties,
	loaded?: () => void,
): Sprite {
	const sprite = new Sprite(0, 0);
	sprite.ready = 0;

	const img = new window.Image();
	if (location.protocol !== "file:") {
		img.crossOrigin = "Anonymous";
	}
	img.src = url;

	img.onload = () => {
		sprite.ready = 1;

		if (img.width > 0 && img.height > 0) {
			let numframes = 1;
			if (properties?.frames) {
				numframes = properties.frames;
			}

			if (properties?.fps) {
				sprite.fps = properties.fps;
			}

			sprite.width = img.width;

			// Adjust numframes for square sprites if image height is divisible by width
			if (img.height % sprite.width === 0) {
				const actualFrames = img.height / sprite.width;
				if (actualFrames < numframes) {
					numframes = actualFrames;
				}
			}

			sprite.height = Math.round(img.height / numframes);
			sprite.frames = [];

			for (let i = 0; i < numframes; i++) {
				const frame = new Image(sprite.width, sprite.height);
				frame.initContext();
				const ctx = frame.context!;
				ctx.setTransform(1, 0, 0, 1, 0, 0);
				ctx.drawImage(img, 0, -i * sprite.height);
				sprite.frames.push(frame);
			}
			sprite.ready = 1;
		}

		if (loaded) {
			loaded();
		}
	};

	img.onerror = () => {
		sprite.ready = 1;
	};

	return sprite;
}

/**
 * Update a sprite from an image element
 * Supports multi-frame spritesheets (vertical stacking)
 */
export function UpdateSprite(sprite: Sprite, img: HTMLImageElement, properties?: SpriteProperties): void {
	if (img.width > 0 && img.height > 0) {
		let numframes = 1;
		if (properties?.frames) {
			numframes = properties.frames;
		}
		if (properties?.fps) {
			sprite.fps = properties.fps;
		}
		sprite.width = img.width;

		// Adjust numframes for square sprites if image height is divisible by width
		if (img.height % sprite.width === 0) {
			const actualFrames = img.height / sprite.width;
			if (actualFrames < numframes) {
				numframes = actualFrames;
			}
		}

		sprite.height = Math.round(img.height / numframes);
		sprite.frames = [];

		for (let i = 0; i < numframes; i++) {
			const frame = new Image(sprite.width, sprite.height);
			frame.initContext();
			const ctx = frame.context!;
			ctx.setTransform(1, 0, 0, 1, 0, 0);
			ctx.drawImage(img, 0, -i * sprite.height);
			sprite.frames.push(frame);
		}
		sprite.ready = 1;
	}
}

