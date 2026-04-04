/**
 * Verify: docs-site/lootiscript/stdlib.mdx (JSON section) matches JSONLib
 * Source of truth: packages/enggine/stdlib/src/json.ts
 */
import { describe, expect, it } from "vitest";
import { JSONLib } from "@al8b/stdlib";

describe("JSONLib — docs vs source", () => {
	it("has encode", () => expect(typeof JSONLib.encode).toBe("function"));
	it("has decode", () => expect(typeof JSONLib.decode).toBe("function"));
	it("has pretty", () => expect(typeof JSONLib.pretty).toBe("function"));

	// Functional tests from docs
	it("encode({a:1}) produces valid JSON", () => {
		const result = JSONLib.encode({ a: 1 });
		expect(typeof result).toBe("string");
		expect(JSON.parse(result)).toEqual({ a: 1 });
	});

	it("decode parses JSON string", () => {
		const result = JSONLib.decode('{"x":10,"y":20}');
		expect(result.x).toBe(10);
		expect(result.y).toBe(20);
	});

	it("pretty produces formatted string", () => {
		const result = JSONLib.pretty({ a: 1 }, 2);
		expect(typeof result).toBe("string");
		expect(result).toContain("\n");
	});
});
