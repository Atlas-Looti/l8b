import { describe, expect, it } from "vitest";
import { ListLib } from "../src/list";

describe("ListLib", () => {
	describe("functional methods", () => {
		it("should map array elements", () => {
			expect(ListLib.map([1, 2, 3], (x) => x * 2)).toEqual([2, 4, 6]);
		});

		it("should filter array elements", () => {
			expect(ListLib.filter([1, 2, 3, 4], (x) => x % 2 === 0)).toEqual([2, 4]);
		});

		it("should reduce array", () => {
			expect(ListLib.reduce([1, 2, 3], (acc, x) => acc + x, 0)).toBe(6);
		});

		it("should find element", () => {
			expect(ListLib.find([1, 2, 3], (x) => x === 2)).toBe(2);
			expect(ListLib.find([1, 2, 3], (x) => x === 5)).toBeNull();
		});

		it("should find index", () => {
			expect(ListLib.findIndex([1, 2, 3], (x) => x === 2)).toBe(1);
			expect(ListLib.findIndex([1, 2, 3], (x) => x === 5)).toBe(-1);
		});

		it("should check some/every", () => {
			expect(ListLib.some([1, 2, 3], (x) => x > 2)).toBe(true);
			expect(ListLib.every([1, 2, 3], (x) => x > 0)).toBe(true);
			expect(ListLib.every([1, 2, 3], (x) => x > 1)).toBe(false);
		});
	});

	describe("array manipulation", () => {
		it("should reverse without mutating", () => {
			const arr = [1, 2, 3];
			expect(ListLib.reverse(arr)).toEqual([3, 2, 1]);
			expect(arr).toEqual([1, 2, 3]);
		});

		it("should sort without mutating", () => {
			const arr = [3, 1, 2];
			expect(ListLib.sort(arr)).toEqual([1, 2, 3]);
			expect(arr).toEqual([3, 1, 2]);
		});

		it("should sort with comparator", () => {
			expect(ListLib.sort([3, 1, 2], (a, b) => b - a)).toEqual([3, 2, 1]);
		});

		it("should slice", () => {
			expect(ListLib.slice([1, 2, 3, 4], 1, 3)).toEqual([2, 3]);
		});

		it("should concat", () => {
			expect(ListLib.concat([1, 2], [3, 4])).toEqual([1, 2, 3, 4]);
		});
	});

	describe("search methods", () => {
		it("should indexOf", () => {
			expect(ListLib.indexOf([1, 2, 3], 2)).toBe(1);
			expect(ListLib.indexOf([1, 2, 3], 5)).toBe(-1);
		});

		it("should includes", () => {
			expect(ListLib.includes([1, 2, 3], 2)).toBe(true);
			expect(ListLib.includes([1, 2, 3], 5)).toBe(false);
		});
	});

	describe("element access", () => {
		it("should get first and last", () => {
			expect(ListLib.first([1, 2, 3])).toBe(1);
			expect(ListLib.last([1, 2, 3])).toBe(3);
			expect(ListLib.first([])).toBeNull();
			expect(ListLib.last([])).toBeNull();
		});

		it("should support negative index with at()", () => {
			expect(ListLib.at([1, 2, 3], -1)).toBe(3);
			expect(ListLib.at([1, 2, 3], 0)).toBe(1);
		});
	});

	describe("mutation methods", () => {
		it("should push and return array", () => {
			const arr = [1, 2];
			expect(ListLib.push(arr, 3)).toEqual([1, 2, 3]);
			expect(arr).toEqual([1, 2, 3]);
		});

		it("should pop", () => {
			expect(ListLib.pop([1, 2, 3])).toBe(3);
			expect(ListLib.pop([])).toBeNull();
		});

		it("should shift", () => {
			expect(ListLib.shift([1, 2, 3])).toBe(1);
			expect(ListLib.shift([])).toBeNull();
		});
	});

	describe("utility methods", () => {
		it("should join", () => {
			expect(ListLib.join([1, 2, 3], "-")).toBe("1-2-3");
		});

		it("should unique", () => {
			expect(ListLib.unique([1, 2, 2, 3, 3])).toEqual([1, 2, 3]);
		});

		it("should chunk", () => {
			expect(ListLib.chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
		});

		it("should shuffle (same elements)", () => {
			const arr = [1, 2, 3, 4, 5];
			const shuffled = ListLib.shuffle(arr);
			expect(shuffled).toHaveLength(5);
			expect(shuffled.sort()).toEqual([1, 2, 3, 4, 5]);
			expect(arr).toEqual([1, 2, 3, 4, 5]); // not mutated
		});
	});

	describe("numeric methods", () => {
		it("should sum", () => {
			expect(ListLib.sum([1, 2, 3])).toBe(6);
		});

		it("should average", () => {
			expect(ListLib.average([2, 4, 6])).toBe(4);
			expect(ListLib.average([])).toBe(0);
		});

		it("should min/max", () => {
			expect(ListLib.min([3, 1, 2])).toBe(1);
			expect(ListLib.max([3, 1, 2])).toBe(3);
			expect(ListLib.min([])).toBe(0);
			expect(ListLib.max([])).toBe(0);
		});
	});
});
