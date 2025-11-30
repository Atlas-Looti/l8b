/**
 * Sprite - Animated sprite management class
 *
 * Supports multiple frames and animation control for game sprites.
 */

import { Image } from "../image";
import * as AnimationOps from "./animation";
import type { SpriteFrame } from "./frame";
import { createFrame } from "./frame";

export class Sprite {
	public name: string = "";
	public width: number;
	public height: number;
	public frames: SpriteFrame[] = [];
	public animation_start: number = 0;
	public fps: number = 5;
	public ready: number = 0;

	constructor(width: number, height: number) {
		this.width = width;
		this.height = height;

		if (width > 0 && height > 0) {
			const image = new Image(width, height);
			image.initContext();
			this.frames.push(createFrame(image));
			this.ready = 1;
		}
	}

	setFPS(fps: number): number {
		return AnimationOps.setFPS(this, fps);
	}

	setFrame(f: number, runtime?: any): void {
		AnimationOps.setFrame(this, f, runtime);
	}

	getFrame(): number {
		return AnimationOps.getFrame(this);
	}

	getCurrentFrameCanvas(): HTMLCanvasElement | null {
		return AnimationOps.getCurrentFrameCanvas(this);
	}
}
