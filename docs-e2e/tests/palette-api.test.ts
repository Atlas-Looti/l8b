/**
 * Verify: docs-site/api/palette.mdx matches Palette public methods
 * Source of truth: packages/core/palette/src/core/palette.ts
 */
import { describe, expect, it } from "vitest";
import { Palette } from "@al8b/palette";

describe("Palette API — docs vs source", () => {
	const palette = new Palette();

	// Documented methods
	const methods = ["get", "set", "add", "lighten", "darken", "mix", "gradient", "findClosest"];
	for (const m of methods) {
		it(`has ${m}()`, () => expect(typeof (palette as any)[m]).toBe("function"));
	}

	// Documented properties
	it("has size property", () => expect(typeof palette.size).toBe("number"));
	it("has paletteName property", () => expect(typeof palette.paletteName).toBe("string"));
});
