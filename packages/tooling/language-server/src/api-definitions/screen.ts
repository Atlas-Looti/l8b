/**
 * Screen API definitions
 */

import type { GlobalApi } from "../types";

export const screenApi: Partial<GlobalApi> = {
	screen: {
		type: "object",
		description: "Screen drawing and display interface",
		properties: {
			width: {
				type: "property",
				description: "Screen width in pixels",
			},
			height: {
				type: "property",
				description: "Screen height in pixels",
			},
			drawSprite: {
				type: "method",
				description: "Draw a sprite at the specified position",
				signature: "screen.drawSprite(sprite: string, x: number, y: number, width?: number, height?: number)",
			},
			fillRect: {
				type: "method",
				description: "Fill a rectangle with the current color",
				signature: "screen.fillRect(x: number, y: number, width: number, height: number, color: string)",
			},
			drawRect: {
				type: "method",
				description: "Draw a rectangle outline",
				signature: "screen.drawRect(x: number, y: number, width: number, height: number, color: string)",
			},
			drawText: {
				type: "method",
				description: "Draw text at the specified position",
				signature: "screen.drawText(text: string, x: number, y: number, color?: string, size?: number)",
			},
			clearScreen: {
				type: "method",
				description: "Clear the screen with a color",
				signature: "screen.clearScreen(color?: string)",
			},
			drawCircle: {
				type: "method",
				description: "Draw a circle",
				signature: "screen.drawCircle(x: number, y: number, radius: number, color: string)",
			},
			fillCircle: {
				type: "method",
				description: "Fill a circle",
				signature: "screen.fillCircle(x: number, y: number, radius: number, color: string)",
			},
			drawLine: {
				type: "method",
				signature: "screen.drawLine(x1, y1, x2, y2, color?)",
				description: "Draw line between two points",
			},
			clear: {
				type: "method",
				signature: "screen.clear(color?)",
				description: "Clear screen (alias for clearScreen)",
			},
			setColor: {
				type: "method",
				signature: "screen.setColor(color)",
				description: "Set drawing color",
			},
			setAlpha: {
				type: "method",
				signature: "screen.setAlpha(alpha)",
				description: "Set opacity (0-1)",
			},
			setPixelated: {
				type: "method",
				signature: "screen.setPixelated(pixelated)",
				description: "Enable/disable pixelated rendering",
			},
			setBlending: {
				type: "method",
				signature: "screen.setBlending(mode)",
				description: "Set blending mode",
			},
			setLinearGradient: {
				type: "method",
				signature: "screen.setLinearGradient(x1, y1, x2, y2, c1, c2)",
				description: "Set linear gradient",
			},
			setRadialGradient: {
				type: "method",
				signature: "screen.setRadialGradient(x, y, radius, c1, c2)",
				description: "Set radial gradient",
			},
			setFont: {
				type: "method",
				signature: "screen.setFont(font)",
				description: "Set font family",
			},
			loadFont: {
				type: "method",
				signature: "screen.loadFont(font)",
				description: "Load font",
			},
			isFontReady: {
				type: "method",
				signature: "screen.isFontReady(font?)",
				description: "Check if font is loaded",
			},
			setTranslation: {
				type: "method",
				signature: "screen.setTranslation(tx, ty)",
				description: "Set translation offset",
			},
			setScale: {
				type: "method",
				signature: "screen.setScale(x, y)",
				description: "Set scale",
			},
			setRotation: {
				type: "method",
				signature: "screen.setRotation(rotation)",
				description: "Set rotation",
			},
			setDrawAnchor: {
				type: "method",
				signature: "screen.setDrawAnchor(ax, ay)",
				description: "Set sprite drawing anchor",
			},
			setDrawRotation: {
				type: "method",
				signature: "screen.setDrawRotation(rotation)",
				description: "Set sprite rotation",
			},
			setDrawScale: {
				type: "method",
				signature: "screen.setDrawScale(x, y?)",
				description: "Set sprite scale",
			},
			fillRoundRect: {
				type: "method",
				signature: "screen.fillRoundRect(x, y, w, h, r?, color?)",
				description: "Fill rounded rectangle",
			},
			fillRound: {
				type: "method",
				signature: "screen.fillRound(x, y, w, h, color?)",
				description: "Fill round (ellipse in rect)",
			},
			drawRoundRect: {
				type: "method",
				signature: "screen.drawRoundRect(x, y, w, h, r?, color?)",
				description: "Draw rounded rectangle outline",
			},
			drawRound: {
				type: "method",
				signature: "screen.drawRound(x, y, w, h, color?)",
				description: "Draw round outline",
			},
			drawImage: {
				type: "method",
				signature: "screen.drawImage(sprite, x, y, w?, h?)",
				description: "Draw image (alias for drawSprite)",
			},
			drawSpritePart: {
				type: "method",
				signature: "screen.drawSpritePart(sprite, sx, sy, sw, sh, x, y, w?, h?)",
				description: "Draw part of sprite",
			},
			drawImagePart: {
				type: "method",
				signature: "screen.drawImagePart(sprite, sx, sy, sw, sh, x, y, w?, h?)",
				description: "Draw part of image",
			},
			drawMap: {
				type: "method",
				signature: "screen.drawMap(map, x, y, w, h)",
				description: "Draw tile map",
			},
			drawTextOutline: {
				type: "method",
				signature: "screen.drawTextOutline(text, x, y, size, color?)",
				description: "Draw text with outline",
			},
			textWidth: {
				type: "method",
				signature: "screen.textWidth(text, size)",
				description: "Measure text width",
			},
			setLineWidth: {
				type: "method",
				signature: "screen.setLineWidth(width)",
				description: "Set line width",
			},
			setLineDash: {
				type: "method",
				signature: "screen.setLineDash(dash)",
				description: "Set line dash pattern",
			},
			drawPolygon: {
				type: "method",
				signature: "screen.drawPolygon(...points)",
				description: "Draw polygon outline",
			},
			drawPolyline: {
				type: "method",
				signature: "screen.drawPolyline(...points)",
				description: "Draw polyline",
			},
			fillPolygon: {
				type: "method",
				signature: "screen.fillPolygon(...points)",
				description: "Fill polygon",
			},
			drawQuadCurve: {
				type: "method",
				signature: "screen.drawQuadCurve(...args)",
				description: "Draw quadratic curve",
			},
			drawBezierCurve: {
				type: "method",
				signature: "screen.drawBezierCurve(...args)",
				description: "Draw bezier curve",
			},
			drawArc: {
				type: "method",
				signature: "screen.drawArc(x, y, radius, angle1, angle2, ccw, color?)",
				description: "Draw arc",
			},
			fillArc: {
				type: "method",
				signature: "screen.fillArc(x, y, radius, angle1, angle2, ccw, color?)",
				description: "Fill arc",
			},
			setCursorVisible: {
				type: "method",
				signature: "screen.setCursorVisible(visible)",
				description: "Show/hide cursor",
			},
			tri: {
				type: "method",
				signature: "screen.tri(x1, y1, x2, y2, x3, y3, color?)",
				description: "Draw triangle outline",
			},
			trib: {
				type: "method",
				signature: "screen.trib(x1, y1, x2, y2, x3, y3, color?)",
				description: "Fill triangle",
			},
			ttri: {
				type: "method",
				signature: "screen.ttri(x1, y1, x2, y2, x3, y3, u1, v1, u2, v2, u3, v3, texture, ...)",
				description: "Textured triangle (3D)",
			},
		},
	},
};
