import { describe, expect, it } from "vitest";
import { MathLib } from "../src/math";

describe("MathLib", () => {
	describe("basic operations", () => {
		it("should compute abs", () => {
			expect(MathLib.abs(-5)).toBe(5);
			expect(MathLib.abs(5)).toBe(5);
		});

		it("should compute sqrt", () => {
			expect(MathLib.sqrt(9)).toBe(3);
			expect(MathLib.sqrt(2)).toBeCloseTo(1.4142);
		});

		it("should floor/ceil/round", () => {
			expect(MathLib.floor(3.7)).toBe(3);
			expect(MathLib.ceil(3.2)).toBe(4);
			expect(MathLib.round(3.5)).toBe(4);
			expect(MathLib.round(3.4)).toBe(3);
		});
	});

	describe("min/max", () => {
		it("should find min and max", () => {
			expect(MathLib.min(1, 2, 3)).toBe(1);
			expect(MathLib.max(1, 2, 3)).toBe(3);
		});
	});

	describe("exponential/log", () => {
		it("should compute pow", () => {
			expect(MathLib.pow(2, 3)).toBe(8);
		});

		it("should compute log", () => {
			expect(MathLib.log(Math.E)).toBeCloseTo(1);
			expect(MathLib.log10(100)).toBeCloseTo(2);
		});
	});

	describe("trigonometry", () => {
		it("should compute sin/cos/tan", () => {
			expect(MathLib.sin(0)).toBeCloseTo(0);
			expect(MathLib.cos(0)).toBeCloseTo(1);
			expect(MathLib.tan(0)).toBeCloseTo(0);
		});

		it("should compute atan2", () => {
			expect(MathLib.atan2(1, 0)).toBeCloseTo(Math.PI / 2);
		});
	});

	describe("random", () => {
		it("should generate random int in range", () => {
			for (let i = 0; i < 50; i++) {
				const val = MathLib.randomInt(1, 10);
				expect(val).toBeGreaterThanOrEqual(1);
				expect(val).toBeLessThanOrEqual(10);
				expect(Number.isInteger(val)).toBe(true);
			}
		});

		it("should generate random float in range", () => {
			for (let i = 0; i < 50; i++) {
				const val = MathLib.randomFloat(0, 1);
				expect(val).toBeGreaterThanOrEqual(0);
				expect(val).toBeLessThan(1);
			}
		});
	});

	describe("constants", () => {
		it("should have PI and E", () => {
			expect(MathLib.PI).toBeCloseTo(3.14159);
			expect(MathLib.E).toBeCloseTo(2.71828);
		});
	});

	describe("game utilities", () => {
		it("should clamp values", () => {
			expect(MathLib.clamp(5, 0, 10)).toBe(5);
			expect(MathLib.clamp(-1, 0, 10)).toBe(0);
			expect(MathLib.clamp(15, 0, 10)).toBe(10);
		});

		it("should lerp", () => {
			expect(MathLib.lerp(0, 10, 0.5)).toBe(5);
			expect(MathLib.lerp(0, 10, 0)).toBe(0);
			expect(MathLib.lerp(0, 10, 1)).toBe(10);
		});

		it("should compute distance", () => {
			expect(MathLib.distance(0, 0, 3, 4)).toBe(5);
			expect(MathLib.distance(0, 0, 0, 0)).toBe(0);
		});

		it("should compute 3D distance", () => {
			expect(MathLib.distance3D(0, 0, 0, 1, 2, 2)).toBe(3);
		});

		it("should convert degrees/radians", () => {
			expect(MathLib.degToRad(180)).toBeCloseTo(Math.PI);
			expect(MathLib.radToDeg(Math.PI)).toBeCloseTo(180);
		});

		it("should compute sign", () => {
			expect(MathLib.sign(5)).toBe(1);
			expect(MathLib.sign(-5)).toBe(-1);
			expect(MathLib.sign(0)).toBe(0);
		});

		it("should compute euclidean mod", () => {
			expect(MathLib.mod(7, 3)).toBe(1);
			expect(MathLib.mod(-1, 3)).toBe(2);
		});
	});
});
