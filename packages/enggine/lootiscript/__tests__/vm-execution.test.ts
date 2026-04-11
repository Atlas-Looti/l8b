/**
 * VM execution integration tests
 *
 * Tests actual LootiScript code execution through the full pipeline:
 * tokenizer -> parser -> compiler -> runner -> processor
 *
 * These tests verify end-to-end behavior, not just parsing/compilation.
 * Uses variable assignment pattern: check global state after execution.
 */

import { describe, expect, it } from "vitest";
import { Compiler } from "../src/v1/compiler";
import { Parser } from "../src/v1/parser";
import { Runner } from "../src/v1/runner";

/**
 * Helper to compile and run LootiScript source
 * Returns the runner with global scope after execution
 */
function runScript(source: string): Runner {
	const parser = new Parser(source, "test.ls");
	parser.parse();
	if ((parser as any).error_info) {
		throw new Error(`Parse error: ${(parser as any).error_info.error}`);
	}
	const compiler = new Compiler(parser.program);

	// Create a mock L8BVM context
	const mockVM = {
		context: {
			global: {},
			meta: { print: () => {} },
			warnings: {
				using_undefined_variable: {},
				assigning_field_to_undefined: {},
				invoking_non_function: {},
				assigning_api_variable: {},
				assignment_as_condition: {},
			},
		},
	};

	const runner = new Runner(mockVM as any);
	runner.init();
	runner.main_thread.addCall(compiler.routine);
	runner.tick();

	return runner;
}

describe("VM execution", () => {
	describe("arithmetic", () => {
		it("executes addition", () => {
			const runner = runScript("x = 5 + 3");
			expect((runner.l8bvm.context.global as any).x).toBe(8);
		});

		it("executes subtraction", () => {
			const runner = runScript("x = 10 - 4");
			expect((runner.l8bvm.context.global as any).x).toBe(6);
		});

		it("executes multiplication", () => {
			const runner = runScript("x = 6 * 7");
			expect((runner.l8bvm.context.global as any).x).toBe(42);
		});

		it("executes division", () => {
			const runner = runScript("x = 20 / 4");
			expect((runner.l8bvm.context.global as any).x).toBe(5);
		});

		it("handles operator precedence", () => {
			const runner = runScript("x = 2 + 3 * 4");
			expect((runner.l8bvm.context.global as any).x).toBe(14);
		});

		it("handles parentheses", () => {
			const runner = runScript("x = (2 + 3) * 4");
			expect((runner.l8bvm.context.global as any).x).toBe(20);
		});

		it("handles modulo", () => {
			const runner = runScript("x = 17 % 5");
			expect((runner.l8bvm.context.global as any).x).toBe(2);
		});
	});

	describe("variables", () => {
		it("assigns and reads variables", () => {
			const runner = runScript("x = 42");
			expect((runner.l8bvm.context.global as any).x).toBe(42);
		});

		it("chains assignments", () => {
			const runner = runScript("a = b = c = 10");
			expect((runner.l8bvm.context.global as any).a).toBe(10);
			expect((runner.l8bvm.context.global as any).b).toBe(10);
			expect((runner.l8bvm.context.global as any).c).toBe(10);
		});

		it("reassigns variables", () => {
			const runner = runScript("x = 1\nx = 2\nx = 3");
			expect((runner.l8bvm.context.global as any).x).toBe(3);
		});
	});

	describe("comparison operators", () => {
		it("evaluates less than", () => {
			const runner = runScript("x = 3 < 5");
			expect((runner.l8bvm.context.global as any).x).toBe(1); // truthy
		});

		it("evaluates greater than", () => {
			const runner = runScript("x = 5 > 3");
			expect((runner.l8bvm.context.global as any).x).toBe(1);
		});

		it("evaluates equality", () => {
			const runner = runScript("x = 5 == 5");
			expect((runner.l8bvm.context.global as any).x).toBe(1);
		});

		it("evaluates inequality", () => {
			const runner = runScript("x = 5 != 3");
			expect((runner.l8bvm.context.global as any).x).toBe(1);
		});

		it("evaluates less than or equal", () => {
			const runner = runScript("x = 3 <= 3");
			expect((runner.l8bvm.context.global as any).x).toBe(1);
		});

		it("evaluates greater than or equal", () => {
			const runner = runScript("x = 5 >= 5");
			expect((runner.l8bvm.context.global as any).x).toBe(1);
		});
	});

	describe("logical operators", () => {
		it("evaluates and", () => {
			const runner = runScript("x = 1 and 1");
			expect((runner.l8bvm.context.global as any).x).toBe(1);
		});

		it("evaluates or", () => {
			const runner = runScript("x = 0 or 1");
			expect((runner.l8bvm.context.global as any).x).toBe(1);
		});

		it("evaluates not", () => {
			const runner = runScript("x = not 0");
			expect((runner.l8bvm.context.global as any).x).toBe(1);
		});
	});

	describe("control flow", () => {
		it("executes if-then-end", () => {
			const runner = runScript(`
				x = 0
				if 1 then
					x = 42
				end
			`);
			expect((runner.l8bvm.context.global as any).x).toBe(42);
		});

		it("executes if-then-else-end", () => {
			const runner = runScript(`
				x = 0
				if 0 then
					x = 1
				else
					x = 2
				end
			`);
			expect((runner.l8bvm.context.global as any).x).toBe(2);
		});

		it("executes while loop", () => {
			const runner = runScript(`
				x = 0
				while x < 5
					x = x + 1
				end
			`);
			expect((runner.l8bvm.context.global as any).x).toBe(5);
		});

		it("executes for loop", () => {
			const runner = runScript(`
				sum = 0
				for i = 1 to 5
					sum = sum + i
				end
			`);
			expect((runner.l8bvm.context.global as any).sum).toBe(15);
		});
	});

	describe("error handling", () => {
		it("reports syntax errors from parser", () => {
			const parser = new Parser("x = 10 +", "test.ls");
			parser.parse();
			expect((parser as any).error_info).toBeDefined();
			expect((parser as any).error_info.error).toBeDefined();
		});

		it("reports helpful error context", () => {
			const parser = new Parser("x =", "test.ls");
			parser.parse();
			expect((parser as any).error_info).toBeDefined();
			expect((parser as any).error_info.line).toBeDefined();
		});
	});
});
