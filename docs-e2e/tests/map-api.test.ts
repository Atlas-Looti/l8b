/**
 * Verify: docs-site/api/map.mdx matches TileMap class
 * Source of truth: packages/core/map/src/core/tile-map.ts
 */
import { describe, expect, it } from "vitest";
import { TileMap } from "@al8b/map";

describe("TileMap class — docs vs source", () => {
	// Provide valid dimensions to avoid validation error
	const map = new TileMap(10, 10, 16, 16);

	// Documented properties
	it("has width", () => expect(typeof map.width).toBe("number"));
	it("has height", () => expect(typeof map.height).toBe("number"));

	// Documented methods — get/set for tile access
	it("has get()", () => expect(typeof map.get).toBe("function"));
	it("has set()", () => expect(typeof map.set).toBe("function"));
});
