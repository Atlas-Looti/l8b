/**
 * Verify: docs-site/api/sprites.mdx matches Sprite class
 * Source of truth: packages/core/sprites/src/sprite.ts
 */
import { describe, expect, it } from "vitest";
import { Sprite } from "@al8b/sprites";

describe("Sprite class — docs vs source", () => {
	it("Sprite class exists", () => {
		expect(Sprite).toBeDefined();
	});

	// Documented methods on prototype
	const methods = ["setFPS", "setFrame", "getFrame", "getCurrentFrameCanvas"];
	for (const m of methods) {
		it(`has ${m}()`, () => {
			expect(typeof Sprite.prototype[m]).toBe("function");
		});
	}

	// Documented properties — check they exist on an instance (use valid constructor args)
	it("has name, frames, fps, ready properties", () => {
		// Sprite constructor: (name, width, height) or similar
		const sprite = new (Sprite as any)("test", 16, 16);
		expect(sprite).toHaveProperty("name");
		expect(sprite).toHaveProperty("frames");
		expect(sprite).toHaveProperty("fps");
		expect(sprite).toHaveProperty("ready");
	});
});
