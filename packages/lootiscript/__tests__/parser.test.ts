import { describe, expect, it } from "vitest";
import { Parser } from "../src/v1/parser";

describe("Parser", () => {
	describe("variable assignments", () => {
		it("should parse simple assignment", () => {
			const parser = new Parser("x = 10", "test.loot");
			parser.parse();
			expect((parser as any).error_info).toBeUndefined();
			expect(parser.program).toBeDefined();
		});

		it("should parse string assignment", () => {
			const parser = new Parser('name = "hello"', "test.loot");
			parser.parse();
			expect((parser as any).error_info).toBeUndefined();
		});

		it("should parse multiple assignments", () => {
			const source = `x = 10
y = 20
z = x + y`;
			const parser = new Parser(source, "test.loot");
			parser.parse();
			expect((parser as any).error_info).toBeUndefined();
		});
	});

	describe("function declarations", () => {
		it("should parse function with no args", () => {
			const source = `greet = function()
  return "hello"
end`;
			const parser = new Parser(source, "test.loot");
			parser.parse();
			expect((parser as any).error_info).toBeUndefined();
		});

		it("should parse function with args", () => {
			const source = `add = function(a, b)
  return a + b
end`;
			const parser = new Parser(source, "test.loot");
			parser.parse();
			expect((parser as any).error_info).toBeUndefined();
		});
	});

	describe("expressions", () => {
		it("should parse arithmetic expressions", () => {
			const parser = new Parser("x = 2 + 3 * 4", "test.loot");
			parser.parse();
			expect((parser as any).error_info).toBeUndefined();
		});

		it("should parse comparison expressions", () => {
			const parser = new Parser("x = a > b", "test.loot");
			parser.parse();
			expect((parser as any).error_info).toBeUndefined();
		});

		it("should parse logical expressions", () => {
			const parser = new Parser("x = a and b or c", "test.loot");
			parser.parse();
			expect((parser as any).error_info).toBeUndefined();
		});
	});

	describe("control flow", () => {
		it("should parse if-then-end", () => {
			const source = `if x > 0 then
  y = 1
end`;
			const parser = new Parser(source, "test.loot");
			parser.parse();
			expect((parser as any).error_info).toBeUndefined();
		});

		it("should parse if-then-else-end", () => {
			const source = `if x > 0 then
  y = 1
else
  y = -1
end`;
			const parser = new Parser(source, "test.loot");
			parser.parse();
			expect((parser as any).error_info).toBeUndefined();
		});

		it("should parse for loop", () => {
			const source = `for i = 0 to 10
  x = i
end`;
			const parser = new Parser(source, "test.loot");
			parser.parse();
			expect((parser as any).error_info).toBeUndefined();
		});

		it("should parse while loop", () => {
			const source = `while x > 0
  x = x - 1
end`;
			const parser = new Parser(source, "test.loot");
			parser.parse();
			expect((parser as any).error_info).toBeUndefined();
		});
	});

	describe("error reporting", () => {
		it("should report error with line info", () => {
			const source = `x = 10
y =`;
			const parser = new Parser(source, "test.loot");
			parser.parse();
			expect((parser as any).error_info).toBeDefined();
			expect((parser as any).error_info?.line).toBeDefined();
		});

		it("should report error for unclosed block", () => {
			const source = `if x > 0 then
  y = 1`;
			const parser = new Parser(source, "test.loot");
			parser.parse();
			expect((parser as any).error_info).toBeDefined();
		});
	});

	describe("warnings", () => {
		it("should collect warnings", () => {
			expect(Array.isArray(new Parser("x = 1", "test.loot").warnings)).toBe(true);
		});
	});
});
