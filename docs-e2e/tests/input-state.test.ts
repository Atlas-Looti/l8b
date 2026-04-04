/**
 * Verify: docs-site/api/input-keyboard.mdx, input-mouse.mdx, input-touch.mdx
 * Source of truth: packages/core/input/src/devices/*.ts + types/index.ts
 *
 * Key doc claims after audit fix:
 * - keyboard: direct key access (keyboard.SPACE), keyboard.press.KEY, keyboard.release.KEY
 * - mouse: flat numbers — x, y, left, right, middle, pressed, press, release, wheel
 * - touch: flat numbers — touching, x, y, press, release, touches[]
 */
import { describe, expect, it } from "vitest";
import { KeyboardInput, MouseInput, TouchInput } from "@al8b/input";

describe("Keyboard state shape — docs vs source", () => {
	const kb = new KeyboardInput();

	it("has press sub-object", () => {
		expect(typeof kb.state.press).toBe("object");
	});

	it("has release sub-object", () => {
		expect(typeof kb.state.release).toBe("object");
	});

	it("has directional shortcuts as numbers", () => {
		expect(typeof kb.state.UP).toBe("number");
		expect(typeof kb.state.DOWN).toBe("number");
		expect(typeof kb.state.LEFT).toBe("number");
		expect(typeof kb.state.RIGHT).toBe("number");
	});

	it("does NOT have a 'held' sub-object (removed from docs)", () => {
		expect(kb.state).not.toHaveProperty("held");
	});
});

describe("Mouse state shape — docs vs source", () => {
	const mouse = new MouseInput();

	const numericProps = ["x", "y", "left", "right", "middle", "pressed", "press", "release", "wheel"];

	for (const prop of numericProps) {
		it(`has ${prop} as number`, () => {
			expect(typeof mouse.state[prop]).toBe("number");
		});
	}

	it("press is a number, NOT an object", () => {
		expect(typeof mouse.state.press).toBe("number");
	});

	it("release is a number, NOT an object", () => {
		expect(typeof mouse.state.release).toBe("number");
	});
});

describe("Touch state shape — docs vs source", () => {
	const touch = new TouchInput();

	it("has touching as number", () => {
		expect(typeof touch.state.touching).toBe("number");
	});

	it("has x, y as numbers", () => {
		expect(typeof touch.state.x).toBe("number");
		expect(typeof touch.state.y).toBe("number");
	});

	it("has press and release as numbers", () => {
		expect(typeof touch.state.press).toBe("number");
		expect(typeof touch.state.release).toBe("number");
	});

	it("has touches as array", () => {
		expect(Array.isArray(touch.state.touches)).toBe(true);
	});

	it("does NOT have count (removed from docs)", () => {
		expect(touch.state).not.toHaveProperty("count");
	});

	it("does NOT have held (removed from docs)", () => {
		expect(touch.state).not.toHaveProperty("held");
	});
});
