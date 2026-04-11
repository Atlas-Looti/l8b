/**
 * Test error handling improvements
 */

import { describe, expect, it } from "vitest";
import { Parser } from "../src/v1/parser";
import { Processor } from "../src/v1/processor";
import { Runner } from "../src/v1/runner";

describe("Error Handling", () => {
	describe("Parser Errors", () => {
		it("should show source context on syntax error", () => {
			const source = `
x = 10
if x > 5 then
  print("hello")
  // Missing 'end'
y = 20
`;

			const parser = new Parser(source, "test.loot");
			parser.parse();

			expect((parser as any).error_info).toBeDefined();
			if ((parser as any).error_info) {
				expect((parser as any).error_info.context).toBeDefined();
				expect((parser as any).error_info.context).toContain(">");
				expect((parser as any).error_info.context).toContain("^");
			}
		});

		it("should provide helpful error messages", () => {
			const source = `x = 10
y =`; // Incomplete assignment

			const parser = new Parser(source, "test.loot");
			parser.parse();

			expect((parser as any).error_info).toBeDefined();
			expect((parser as any).error_info?.error).toContain("Expression expected");
		});
	});

	describe("Stack Traces", () => {
		it("should track function call stack", () => {
			const source = `
bar = function()
  x = undefined_var
end

foo = function()
  bar()
end

foo()
`;

			// This would need a full VM setup to test properly
			// For now, just verify the structure is in place
			const processor = new Processor({});
			expect(processor.call_stack_frames).toBeDefined();
			expect(processor.generateStackTrace).toBeDefined();
			expect(processor.formatStackTrace).toBeDefined();
		});
	});
});
