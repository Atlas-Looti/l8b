/**
 * Verify: docs-site/lootiscript/stdlib.mdx (List section) matches ListLib
 * Source of truth: packages/enggine/stdlib/src/list.ts
 */
import { describe, expect, it } from "vitest";
import { ListLib } from "@al8b/stdlib";

describe("ListLib — docs vs source", () => {
	const documented = [
		"map", "filter", "reduce", "find", "findIndex", "some", "every",
		"reverse", "sort", "slice", "concat", "flat", "flatMap",
		"indexOf", "lastIndexOf", "includes",
		"length", "first", "last", "at",
		"push", "pop", "shift", "unshift", "splice", "fill",
		"join", "unique", "shuffle", "chunk",
		"sum", "average", "min", "max",
	];

	for (const fn of documented) {
		it(`has ${fn}`, () => {
			expect(ListLib).toHaveProperty(fn);
		});
	}

	// Spot-check documented examples
	it("map([1,2,3], x => x*2) = [2,4,6]", () => {
		expect(ListLib.map([1, 2, 3], (x: number) => x * 2)).toEqual([2, 4, 6]);
	});
	it("filter([1,2,3,4], x => x%2==0) = [2,4]", () => {
		expect(ListLib.filter([1, 2, 3, 4], (x: number) => x % 2 === 0)).toEqual([2, 4]);
	});
	it("reduce([1,2,3,4], (acc,x) => acc+x, 0) = 10", () => {
		expect(ListLib.reduce([1, 2, 3, 4], (acc: number, x: number) => acc + x, 0)).toBe(10);
	});
	it("first([1,2,3]) = 1", () => expect(ListLib.first([1, 2, 3])).toBe(1));
	it("last([1,2,3]) = 3", () => expect(ListLib.last([1, 2, 3])).toBe(3));
	it("includes([1,2,3], 2) = true", () => expect(ListLib.includes([1, 2, 3], 2)).toBe(true));
	it("unique([1,2,2,3]) = [1,2,3]", () => expect(ListLib.unique([1, 2, 2, 3])).toEqual([1, 2, 3]));
	it("sum([1,2,3,4]) = 10", () => expect(ListLib.sum([1, 2, 3, 4])).toBe(10));
	it("chunk([1,2,3,4,5], 2) = [[1,2],[3,4],[5]]", () => {
		expect(ListLib.chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
	});
});
