/**
 * Verify: docs-site/lootiscript/stdlib.mdx (Math section) matches MathLib
 * Source of truth: packages/enggine/stdlib/src/math.ts
 */
import { describe, expect, it } from "vitest";
import { MathLib } from "@al8b/stdlib";

describe("MathLib — docs vs source", () => {
	// Every function documented in lootiscript/stdlib.mdx Math section
	const documented = [
		"abs", "sqrt", "floor", "ceil", "round",
		"min", "max", "pow", "exp", "log", "log10",
		"sin", "cos", "tan", "asin", "acos", "atan", "atan2",
		"random", "randomInt", "randomFloat",
		"clamp", "lerp", "distance", "distance3D", "angleBetween",
		"degToRad", "radToDeg", "sign", "mod",
	];

	for (const fn of documented) {
		it(`has ${fn}`, () => {
			expect(MathLib).toHaveProperty(fn);
		});
	}

	// Constants
	it("has PI", () => expect(MathLib.PI).toBeCloseTo(Math.PI));
	it("has E", () => expect(MathLib.E).toBeCloseTo(Math.E));

	// Spot-check return values documented in docs
	it("abs(-5) = 5", () => expect(MathLib.abs(-5)).toBe(5));
	it("floor(3.7) = 3", () => expect(MathLib.floor(3.7)).toBe(3));
	it("ceil(3.2) = 4", () => expect(MathLib.ceil(3.2)).toBe(4));
	it("round(3.5) = 4", () => expect(MathLib.round(3.5)).toBe(4));
	it("clamp(15, 0, 10) = 10", () => expect(MathLib.clamp(15, 0, 10)).toBe(10));
	it("lerp(0, 100, 0.5) = 50", () => expect(MathLib.lerp(0, 100, 0.5)).toBe(50));
	it("distance(0, 0, 3, 4) = 5", () => expect(MathLib.distance(0, 0, 3, 4)).toBe(5));
	it("degToRad(180) ≈ PI", () => expect(MathLib.degToRad(180)).toBeCloseTo(Math.PI));
	it("sign(-10) = -1", () => expect(MathLib.sign(-10)).toBe(-1));
});
