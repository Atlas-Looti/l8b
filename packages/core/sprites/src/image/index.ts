/**
 * Image - Canvas-based image class for game graphics
 *
 * Provides a canvas wrapper for image manipulation and drawing operations.
 */

import { BLENDING_MODES } from "../blending";
import * as ColorOps from "./color";
import { createDefaultContextState, type ImageContextState } from "./context";
import * as DrawingOps from "./drawing";
import * as FontOps from "./font";
import * as MapRenderingOps from "./map-rendering";
import * as PixelOps from "./pixel";
import * as ShapeOps from "./shapes";
import * as SpriteRenderingOps from "./sprite-rendering";
import * as TextOps from "./text";
import * as TransformOps from "./transform";

export class Image {
	private _canvas!: HTMLCanvasElement;
	private _context: CanvasRenderingContext2D | null = null;
	private _image: HTMLImageElement | null = null;
	private _state!: ImageContextState;
	private _centered: boolean;

	public width: number;
	public height: number;

	constructor(widthOrImage: number | HTMLImageElement | HTMLCanvasElement, height?: number, centered: boolean = false) {
		this._centered = centered;

		if (typeof widthOrImage === "object" && "naturalWidth" in widthOrImage) {
			// HTMLImageElement
			this._image = widthOrImage as HTMLImageElement;
			this.width = this._image.width;
			this.height = this._image.height;
		} else if (typeof widthOrImage === "object" && "getContext" in widthOrImage) {
			// HTMLCanvasElement
			this._canvas = widthOrImage as HTMLCanvasElement;
			this.width = this._canvas.width;
			this.height = this._canvas.height;
		} else {
			// Number
			this._canvas = document.createElement("canvas");
			this.width = Math.round(widthOrImage as number);
			this.height = Math.round(height || (widthOrImage as number));
			this._canvas.width = this.width;
			this._canvas.height = this.height;
		}
	}

	/**
	 * Initialize or get the canvas context
	 */
	initContext(): CanvasRenderingContext2D {
		if (this._context) {
			return this._context;
		}

		// Convert image to canvas if needed
		if (!this._canvas && this._image) {
			this._canvas = document.createElement("canvas");
			this._canvas.width = this._image.width;
			this._canvas.height = this._image.height;
			this._context = this._canvas.getContext("2d")!;
			this._context.drawImage(this._image, 0, 0);
			this._image = null;
		}

		if (!this._context) {
			this._context = this._canvas.getContext("2d")!;
			if (this._context) {
				this._context.lineCap = "round";
			}
		}

		// Initialize state
		if (!this._state) {
			this._state = createDefaultContextState(this._centered);
			if (this._centered) {
				this._state.translation_x = this.width / 2;
				this._state.translation_y = this.height / 2;
			}
		}

		return this._context;
	}

	/**
	 * Get the canvas element
	 */
	get canvas(): HTMLCanvasElement {
		this.initContext();
		return this._canvas;
	}

	/**
	 * Get the image element (if still available)
	 */
	get image(): HTMLImageElement | null {
		return this._image;
	}

	/**
	 * Get the rendering context
	 */
	get context(): CanvasRenderingContext2D | null {
		return this._context;
	}

	// ===== PIXEL OPERATIONS =====

	setRGB(x: number, y: number, r: number | PixelOps.RGBColor, g?: number, b?: number): void {
		this.initContext();
		PixelOps.setRGB(this._context!, x, y, r, g, b);
	}

	setRGBA(x: number, y: number, r: number | PixelOps.RGBAColor, g?: number, b?: number, a?: number): void {
		this.initContext();
		PixelOps.setRGBA(this._context!, x, y, r, g, b, a);
	}

	getRGB(x: number, y: number, result?: PixelOps.RGBColor): PixelOps.RGBColor {
		this.initContext();
		return PixelOps.getRGB(this._context!, x, y, result);
	}

	getRGBA(x: number, y: number, result?: PixelOps.RGBAColor): PixelOps.RGBAColor {
		this.initContext();
		return PixelOps.getRGBA(this._context!, x, y, result);
	}

	// ===== CANVAS OPERATIONS =====

	clear(color?: string): void {
		this.initContext();
		const c = this._context!.fillStyle;
		const s = this._context!.strokeStyle;
		const blending_save = this._context!.globalCompositeOperation;

		this._context!.globalAlpha = 1;
		this._context!.globalCompositeOperation = "source-over";

		if (color != null) {
			this.setColor(color);
		} else {
			this._context!.fillStyle = "#000";
		}

		this._context!.fillRect(0, 0, this.width, this.height);
		this._context!.fillStyle = c;
		this._context!.strokeStyle = s;
		this._context!.globalCompositeOperation = blending_save;
	}

	// ===== COLOR OPERATIONS =====

	setColor(color?: string): void {
		this.initContext();
		ColorOps.setColor(this._context!, color);
	}

	setAlpha(alpha: number): void {
		this.initContext();
		this._state.alpha = alpha;
	}

	setPixelated(pixelated: number): void {
		this.initContext();
		this._state.pixelated = pixelated;
	}

	setBlending(blending?: string): void {
		this.initContext();
		const mode = BLENDING_MODES[blending || "normal"] || "source-over";
		this._context!.globalCompositeOperation = mode;
	}

	setLineWidth(line_width: number): void {
		this.initContext();
		this._state.line_width = line_width;
	}

	setLineDash(dash: number[] | any): void {
		this.initContext();
		if (!Array.isArray(dash)) {
			this._context!.setLineDash([]);
		} else {
			this._context!.setLineDash(dash);
		}
	}

	setLinearGradient(x1: number, y1: number, x2: number, y2: number, c1: string, c2: string): void {
		this.initContext();
		ColorOps.setLinearGradient(this._context!, x1, y1, x2, y2, c1, c2);
	}

	setRadialGradient(x: number, y: number, radius: number, c1: string, c2: string): void {
		this.initContext();
		ColorOps.setRadialGradient(this._context!, x, y, radius, c1, c2);
	}

	// ===== FONT OPERATIONS =====

	setFont(font?: string): void {
		this.initContext();
		this._state.font = font || "Verdana";
		this.loadFont(this._state.font);
	}

	loadFont(font: string): Promise<void> | void {
		return FontOps.loadFont(font);
	}

	isFontReady(font?: string): boolean {
		return FontOps.isFontReady(font || this._state?.font || "Verdana");
	}

	// ===== TRANSFORM OPERATIONS =====

	setTranslation(translation_x: number, translation_y: number): void {
		this.initContext();
		TransformOps.setTranslation(this._state, translation_x, translation_y);
	}

	setScale(scale_x: number, scale_y: number): void {
		this.initContext();
		TransformOps.setScale(this._state, scale_x, scale_y);
	}

	setRotation(rotation: number): void {
		this.initContext();
		TransformOps.setRotation(this._state, rotation);
	}

	setDrawAnchor(anchor_x: number, anchor_y: number): void {
		this.initContext();
		TransformOps.setDrawAnchor(this._state, anchor_x, anchor_y);
	}

	setDrawRotation(object_rotation: number): void {
		this.initContext();
		TransformOps.setDrawRotation(this._state, object_rotation);
	}

	setDrawScale(object_scale_x: number, object_scale_y: number = object_scale_x): void {
		this.initContext();
		TransformOps.setDrawScale(this._state, object_scale_x, object_scale_y);
	}

	// ===== DRAWING OPERATIONS =====

	fillRect(x: number, y: number, w: number, h: number, color?: string): void {
		this.initContext();
		this.setColor(color);
		DrawingOps.fillRect(this._context!, this._state, x, y, w, h);
	}

	fillRoundRect(x: number, y: number, w: number, h: number, round: number = 10, color?: string): void {
		this.initContext();
		this.setColor(color);
		DrawingOps.fillRoundRect(this._context!, this._state, x, y, w, h, round);
	}

	fillRound(x: number, y: number, w: number, h: number, color?: string): void {
		this.initContext();
		this.setColor(color);
		DrawingOps.fillRound(this._context!, this._state, x, y, w, h);
	}

	drawRect(x: number, y: number, w: number, h: number, color?: string): void {
		this.initContext();
		this.setColor(color);
		DrawingOps.drawRect(this._context!, this._state, x, y, w, h);
	}

	drawRoundRect(x: number, y: number, w: number, h: number, round: number = 10, color?: string): void {
		this.initContext();
		this.setColor(color);
		DrawingOps.drawRoundRect(this._context!, this._state, x, y, w, h, round);
	}

	drawRound(x: number, y: number, w: number, h: number, color?: string): void {
		this.initContext();
		this.setColor(color);
		DrawingOps.drawRound(this._context!, this._state, x, y, w, h);
	}

	drawLine(x1: number, y1: number, x2: number, y2: number, color?: string): void {
		this.initContext();
		this.setColor(color);
		DrawingOps.drawLine(this._context!, this._state, x1, y1, x2, y2);
	}

	// ===== SHAPE OPERATIONS =====

	drawPolyline(...args: any[]): void {
		this.initContext();
		if (args.length > 0 && args.length % 2 === 1 && typeof args[args.length - 1] === "string") {
			this.setColor(args[args.length - 1]);
			args = args.slice(0, -1);
		}
		ShapeOps.drawPolyline(this._context!, this._state, args);
	}

	drawPolygon(...args: any[]): void {
		this.initContext();
		if (args.length > 0 && args.length % 2 === 1 && typeof args[args.length - 1] === "string") {
			this.setColor(args[args.length - 1]);
			args = args.slice(0, -1);
		}
		ShapeOps.drawPolygon(this._context!, this._state, args);
	}

	fillPolygon(...args: any[]): void {
		this.initContext();
		if (args.length > 0 && args.length % 2 === 1 && typeof args[args.length - 1] === "string") {
			this.setColor(args[args.length - 1]);
			args = args.slice(0, -1);
		}
		ShapeOps.fillPolygon(this._context!, this._state, args);
	}

	drawQuadCurve(...args: any[]): void {
		this.initContext();
		if (args.length > 0 && args.length % 2 === 1 && typeof args[args.length - 1] === "string") {
			this.setColor(args[args.length - 1]);
			args = args.slice(0, -1);
		}
		ShapeOps.drawQuadCurve(this._context!, this._state, args);
	}

	drawBezierCurve(...args: any[]): void {
		this.initContext();
		if (args.length > 0 && args.length % 2 === 1 && typeof args[args.length - 1] === "string") {
			this.setColor(args[args.length - 1]);
			args = args.slice(0, -1);
		}
		ShapeOps.drawBezierCurve(this._context!, this._state, args);
	}

	drawArc(x: number, y: number, radius: number, angle1: number, angle2: number, ccw: boolean, color?: string): void {
		this.initContext();
		this.setColor(color);
		ShapeOps.drawArc(this._context!, this._state, x, y, radius, angle1, angle2, ccw);
	}

	fillArc(x: number, y: number, radius: number, angle1: number, angle2: number, ccw: boolean, color?: string): void {
		this.initContext();
		this.setColor(color);
		ShapeOps.fillArc(this._context!, this._state, x, y, radius, angle1, angle2, ccw);
	}

	// ===== TEXT OPERATIONS =====

	textWidth(text: string, size: number): number {
		this.initContext();
		return TextOps.textWidth(this._context!, this._state, text, size);
	}

	drawText(text: string, x: number, y: number, size: number, color?: string): void {
		this.initContext();
		this.setColor(color);
		TextOps.drawText(this._context!, this._state, text, x, y, size);
	}

	drawTextOutline(text: string, x: number, y: number, size: number, color?: string): void {
		this.initContext();
		this.setColor(color);
		TextOps.drawTextOutline(this._context!, this._state, text, x, y, size);
	}

	// ===== SPRITE RENDERING =====

	drawSprite(sprite: SpriteRenderingOps.SpriteSource | string, x: number, y: number, w?: number, h?: number): void {
		this.initContext();
		SpriteRenderingOps.drawSprite(this._context!, this._state, sprite, x, y, w, h);
	}

	drawImage(sprite: SpriteRenderingOps.SpriteSource | string, x: number, y: number, w?: number, h?: number): void {
		this.drawSprite(sprite, x, y, w, h);
	}

	drawSpritePart(
		sprite: SpriteRenderingOps.SpriteSource | string,
		sx: number,
		sy: number,
		sw: number,
		sh: number,
		x: number,
		y: number,
		w?: number,
		h?: number,
	): void {
		this.initContext();
		SpriteRenderingOps.drawSpritePart(this._context!, this._state, sprite, sx, sy, sw, sh, x, y, w, h);
	}

	drawImagePart(
		sprite: SpriteRenderingOps.SpriteSource | string,
		sx: number,
		sy: number,
		sw: number,
		sh: number,
		x: number,
		y: number,
		w?: number,
		h?: number,
	): void {
		this.drawSpritePart(sprite, sx, sy, sw, sh, x, y, w, h);
	}

	// ===== MAP RENDERING =====

	drawMap(map: MapRenderingOps.MapSource | string, x: number, y: number, w: number, h: number): void {
		this.initContext();
		MapRenderingOps.drawMap(this._context!, this._state, map, x, y, w, h);
	}
}
