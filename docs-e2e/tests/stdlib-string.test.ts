/**
 * Verify: docs-site/lootiscript/stdlib.mdx (String section) matches StringLib
 * Source of truth: packages/enggine/stdlib/src/string.ts
 */
import { describe, expect, it } from "vitest";
import { StringLib } from "@al8b/stdlib";

describe("StringLib — docs vs source", () => {
	const documented = [
		"split", "join", "trim", "trimStart", "trimEnd",
		"replace", "replaceAll", "startsWith", "endsWith", "contains",
		"toLowerCase", "toUpperCase",
		"charAt", "charCodeAt", "fromCharCode",
		"substring", "slice", "indexOf", "lastIndexOf",
		"repeat", "padStart", "padEnd",
		"length", "parseInt", "parseFloat", "format",
	];

	for (const fn of documented) {
		it(`has ${fn}`, () => {
			expect(StringLib).toHaveProperty(fn);
		});
	}

	// Spot-check documented examples
	it('toLowerCase("HELLO") = "hello"', () => expect(StringLib.toLowerCase("HELLO")).toBe("hello"));
	it('contains("hello world", "world") = true', () => expect(StringLib.contains("hello world", "world")).toBe(true));
	it('split("a,b,c", ",") = ["a","b","c"]', () => expect(StringLib.split("a,b,c", ",")).toEqual(["a", "b", "c"]));
	it('repeat("ab", 3) = "ababab"', () => expect(StringLib.repeat("ab", 3)).toBe("ababab"));
	it("length('hello') = 5", () => expect(StringLib.length("hello")).toBe(5));
	it('charCodeAt("A", 0) = 65', () => expect(StringLib.charCodeAt("A", 0)).toBe(65));
});
