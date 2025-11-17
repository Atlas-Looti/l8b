import type { Map } from "@l8b/map";
import type { Sprite } from "@l8b/sprites";
import type { TextureSource } from "../tri";

/**
 * Screen initialization options
 */
export interface ScreenOptions {
	runtime?: any; // Reference to runtime for accessing sprites and maps
	canvas?: HTMLCanvasElement;
	width?: number;
	height?: number;
}

/**
 * Public API exposed to the runtime/VM layer
 */
export interface ScreenInterface {
	width: number;
	height: number;
	clear: (color?: string) => void;
	setColor: (color: string | number) => void;
	setAlpha: (alpha: number) => void;
	setPixelated: (pixelated: number) => void;
	setBlending: (blending: string) => void;
	setLinearGradient: (
		x1: number,
		y1: number,
		x2: number,
		y2: number,
		c1: string,
		c2: string,
	) => void;
	setRadialGradient: (
		x: number,
		y: number,
		radius: number,
		c1: string,
		c2: string,
	) => void;
	setFont: (font: string) => void;
	setTranslation: (tx: number, ty: number) => void;
	setScale: (x: number, y: number) => void;
	setRotation: (rotation: number) => void;
	setDrawAnchor: (ax: number, ay: number) => void;
	setDrawRotation: (rotation: number) => void;
	setDrawScale: (x: number, y?: number) => void;
	fillRect: (
		x: number,
		y: number,
		w: number,
		h: number,
		c?: string | number,
	) => void;
	fillRoundRect: (
		x: number,
		y: number,
		w: number,
		h: number,
		r?: number,
		c?: string | number,
	) => void;
	fillRound: (
		x: number,
		y: number,
		w: number,
		h: number,
		c?: string | number,
	) => void;
	drawRect: (
		x: number,
		y: number,
		w: number,
		h: number,
		c?: string | number,
	) => void;
	drawRoundRect: (
		x: number,
		y: number,
		w: number,
		h: number,
		r?: number,
		c?: string | number,
	) => void;
	drawRound: (
		x: number,
		y: number,
		w: number,
		h: number,
		c?: string | number,
	) => void;
	drawSprite: (
		sprite: Sprite | string,
		x: number,
		y: number,
		w?: number,
		h?: number,
	) => void;
	drawImage: (
		sprite: Sprite | string | any,
		x: number,
		y: number,
		w?: number,
		h?: number,
	) => void;
	drawSpritePart: (
		sprite: Sprite | string | any,
		sx: number,
		sy: number,
		sw: number,
		sh: number,
		x: number,
		y: number,
		w?: number,
		h?: number,
	) => void;
	drawImagePart: (
		sprite: Sprite | string | any,
		sx: number,
		sy: number,
		sw: number,
		sh: number,
		x: number,
		y: number,
		w?: number,
		h?: number,
	) => void;
	drawMap: (
		map: Map | string,
		x: number,
		y: number,
		w: number,
		h: number,
	) => void;
	drawText: (
		text: string,
		x: number,
		y: number,
		size: number,
		color?: string | number,
	) => void;
	drawTextOutline: (
		text: string,
		x: number,
		y: number,
		size: number,
		color?: string | number,
	) => void;
	textWidth: (text: string, size: number) => number;
	setLineWidth: (width: number) => void;
	setLineDash: (dash: number[] | null) => void;
	drawLine: (
		x1: number,
		y1: number,
		x2: number,
		y2: number,
		color?: string | number,
	) => void;
	drawPolygon: (...args: any[]) => void;
	drawPolyline: (...args: any[]) => void;
	fillPolygon: (...args: any[]) => void;
	drawQuadCurve: (...args: any[]) => void;
	drawBezierCurve: (...args: any[]) => void;
	drawArc: (
		x: number,
		y: number,
		radius: number,
		angle1: number,
		angle2: number,
		ccw: boolean,
		color?: string | number,
	) => void;
	fillArc: (
		x: number,
		y: number,
		radius: number,
		angle1: number,
		angle2: number,
		ccw: boolean,
		color?: string | number,
	) => void;
	setCursorVisible: (visible: boolean) => void;
	loadFont: (font: string) => void;
	isFontReady: (font?: string) => number;
	tri: (
		x1: number,
		y1: number,
		x2: number,
		y2: number,
		x3: number,
		y3: number,
		color?: string | number,
	) => void;
	trib: (
		x1: number,
		y1: number,
		x2: number,
		y2: number,
		x3: number,
		y3: number,
		color?: string | number,
	) => void;
	ttri: (
		x1: number,
		y1: number,
		x2: number,
		y2: number,
		x3: number,
		y3: number,
		u1: number,
		v1: number,
		u2: number,
		v2: number,
		u3: number,
		v3: number,
		texture: Sprite | Map | string,
		textureSource?: TextureSource,
		z1?: number,
		z2?: number,
		z3?: number,
		useDepth?: boolean,
	) => void;
}
