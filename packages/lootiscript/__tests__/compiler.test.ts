import { describe, expect, it } from "vitest";
import { Compiler } from "../src/v1/compiler";
import { Parser } from "../src/v1/parser";
import { Program } from "../src/v1/program";
import { Routine } from "../src/v1/routine";

describe("Compiler", () => {
	function compile(source: string) {
		const parser = new Parser(source, "test.loot");
		parser.parse();
		expect((parser as any).error_info).toBeUndefined();
		const compiler = new Compiler(parser.program);
		return compiler;
	}

	describe("basic compilation", () => {
		it("should compile a simple assignment", () => {
			const compiler = compile("x = 42");
			expect(compiler.routine).toBeDefined();
			expect(compiler.routine).toBeInstanceOf(Routine);
		});

		it("should compile a function declaration", () => {
			const compiler = compile(`add = function(a, b)
  return a + b
end`);
			expect(compiler.routine).toBeDefined();
		});

		it("should compile arithmetic expressions", () => {
			const compiler = compile("x = 2 + 3 * 4 - 1");
			expect(compiler.routine).toBeDefined();
		});

		it("should compile string literals", () => {
			const compiler = compile('msg = "hello world"');
			expect(compiler.routine).toBeDefined();
		});
	});

	describe("control flow compilation", () => {
		it("should compile if-then-end", () => {
			const compiler = compile(`if 1 then
  x = 1
end`);
			expect(compiler.routine).toBeDefined();
		});

		it("should compile for loop", () => {
			const compiler = compile(`for i = 0 to 10
  x = i
end`);
			expect(compiler.routine).toBeDefined();
		});

		it("should compile while loop", () => {
			const compiler = compile(`while 1
  break
end`);
			expect(compiler.routine).toBeDefined();
		});
	});

	describe("routine serialization", () => {
		it("should export and import routine", () => {
			const compiler = compile("x = 42");
			const exported = compiler.routine.export();
			expect(exported).toBeDefined();

			const imported = new Routine(0).import(exported);
			expect(imported).toBeInstanceOf(Routine);
		});
	});

	describe("Program utility", () => {
		it("should convert values to string representation", () => {
			expect(Program.toString(42)).toBe(42);
			// LootiScript wraps string values in quotes for display
			expect(Program.toString("hello")).toBe('"hello"');
			expect(Program.toString(null)).toBe(0);
			expect(Program.toString(undefined)).toBe(0);
		});
	});
});
