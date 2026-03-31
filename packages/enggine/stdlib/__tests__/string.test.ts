import { describe, expect, it } from "vitest";
import { StringLib } from "../src/string";

describe("StringLib", () => {
	describe("split/join", () => {
		it("should split string", () => {
			expect(StringLib.split("a,b,c", ",")).toEqual(["a", "b", "c"]);
		});

		it("should join array", () => {
			expect(StringLib.join(["a", "b", "c"], "-")).toBe("a-b-c");
		});
	});

	describe("trimming", () => {
		it("should trim whitespace", () => {
			expect(StringLib.trim("  hello  ")).toBe("hello");
			expect(StringLib.trimStart("  hello  ")).toBe("hello  ");
			expect(StringLib.trimEnd("  hello  ")).toBe("  hello");
		});
	});

	describe("replacement", () => {
		it("should replace first occurrence", () => {
			expect(StringLib.replace("hello world", "world", "there")).toBe("hello there");
		});

		it("should replace all occurrences", () => {
			expect(StringLib.replaceAll("aabaa", "a", "x")).toBe("xxbxx");
		});
	});

	describe("content checking", () => {
		it("should check startsWith/endsWith", () => {
			expect(StringLib.startsWith("hello", "hel")).toBe(true);
			expect(StringLib.endsWith("hello", "llo")).toBe(true);
		});

		it("should check contains", () => {
			expect(StringLib.contains("hello world", "world")).toBe(true);
			expect(StringLib.contains("hello world", "xyz")).toBe(false);
		});
	});

	describe("case transformation", () => {
		it("should convert case", () => {
			expect(StringLib.toLowerCase("Hello")).toBe("hello");
			expect(StringLib.toUpperCase("Hello")).toBe("HELLO");
		});
	});

	describe("character access", () => {
		it("should access characters", () => {
			expect(StringLib.charAt("hello", 1)).toBe("e");
			expect(StringLib.charCodeAt("A", 0)).toBe(65);
			expect(StringLib.fromCharCode(65)).toBe("A");
		});
	});

	describe("substring extraction", () => {
		it("should extract substring", () => {
			expect(StringLib.substring("hello", 1, 3)).toBe("el");
			expect(StringLib.slice("hello", -3)).toBe("llo");
		});
	});

	describe("search", () => {
		it("should find index", () => {
			expect(StringLib.indexOf("hello", "l")).toBe(2);
			expect(StringLib.lastIndexOf("hello", "l")).toBe(3);
			expect(StringLib.indexOf("hello", "x")).toBe(-1);
		});
	});

	describe("padding and repeat", () => {
		it("should repeat", () => {
			expect(StringLib.repeat("ab", 3)).toBe("ababab");
		});

		it("should pad", () => {
			expect(StringLib.padStart("5", 3, "0")).toBe("005");
			expect(StringLib.padEnd("5", 3, "0")).toBe("500");
		});
	});

	describe("length", () => {
		it("should return length", () => {
			expect(StringLib.length("hello")).toBe(5);
			expect(StringLib.length("")).toBe(0);
		});
	});

	describe("parsing", () => {
		it("should parse integers", () => {
			expect(StringLib.parseInt("42")).toBe(42);
			expect(StringLib.parseInt("abc")).toBe(0);
			expect(StringLib.parseInt("FF", 16)).toBe(255);
		});

		it("should parse floats", () => {
			expect(StringLib.parseFloat("3.14")).toBeCloseTo(3.14);
			expect(StringLib.parseFloat("abc")).toBe(0);
		});
	});

	describe("format", () => {
		it("should format template", () => {
			expect(StringLib.format("Hello {0}!", "world")).toBe("Hello world!");
			expect(StringLib.format("{0} + {1} = {2}", 1, 2, 3)).toBe("1 + 2 = 3");
		});
	});
});
