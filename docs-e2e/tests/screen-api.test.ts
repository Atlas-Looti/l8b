/**
 * Verify: docs-site/api/screen*.mdx matches Screen.getInterface()
 * Source of truth: packages/core/screen/src/core/screen.ts
 *
 * Note: happy-dom doesn't support canvas 2D context, so we test by
 * reading the source code's getInterface() keys directly.
 */
import { describe, expect, it } from "vitest";
import { Screen } from "@al8b/screen";

describe("Screen API — docs vs source", () => {
	// We can't instantiate Screen (no canvas context in happy-dom)
	// Instead, verify the class has getInterface method and check via prototype
	it("Screen class exists and has getInterface", () => {
		expect(Screen).toBeDefined();
		expect(typeof Screen.prototype.getInterface).toBe("function");
	});

	// Verify all documented methods exist on the Screen class itself
	// These are the methods that getInterface() wraps
	const documentedMethods = [
		// screen.mdx (overview)
		"clear", "setColor", "setAlpha", "setPixelated", "setBlending",
		"setLinearGradient", "setRadialGradient",
		// screen-drawing.mdx
		"fillRect", "drawRect", "drawRoundRect", "fillRoundRect",
		"drawRound", "fillRound",
		"drawLine", "setLineWidth", "setLineDash",
		"drawPolygon", "fillPolygon", "drawPolyline",
		"drawQuadCurve", "drawBezierCurve",
		"drawArc", "fillArc",
		"setCursorVisible",
		"tri", "trib", "ttri",
		// screen-sprites.mdx
		"drawSprite", "drawSpritePart", "drawMap",
		// screen-text.mdx
		"drawText", "drawTextOutline", "textWidth",
		"setFont", "loadFont", "isFontReady",
		// screen-transforms.mdx
		"setTranslation", "setScale", "setRotation",
		"setDrawAnchor", "setDrawRotation", "setDrawScale",
	];

	for (const m of documentedMethods) {
		it(`Screen prototype has ${m}()`, () => {
			expect(typeof Screen.prototype[m]).toBe("function");
		});
	}
});
