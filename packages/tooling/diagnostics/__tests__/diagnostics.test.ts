import { describe, expect, it } from "vitest";
import {
	DiagnosticSeverity,
	createDiagnostic,
	formatForBrowser,
	formatForCLI,
	formatForLSP,
	formatSimple,
} from "../src";

describe("Diagnostics", () => {
	describe("createDiagnostic", () => {
		it("should create a diagnostic with code and defaults", () => {
			const diag = createDiagnostic("E1001");
			expect(diag.code).toBe("E1001");
			expect(diag.severity).toBe(DiagnosticSeverity.Error);
			expect(diag.message).toBeDefined();
		});

		it("should set error severity for E codes", () => {
			const diag = createDiagnostic("E1001");
			expect(diag.severity).toBe(DiagnosticSeverity.Error);
		});

		it("should set warning severity for W codes", () => {
			const diag = createDiagnostic("W1001");
			expect(diag.severity).toBe(DiagnosticSeverity.Warning);
		});

		it("should include file location", () => {
			const diag = createDiagnostic("E1001", {
				file: "test.loot",
				line: 10,
				column: 5,
			});
			expect(diag.file).toBe("test.loot");
			expect(diag.line).toBe(10);
			expect(diag.column).toBe(5);
		});

		it("should include stack trace", () => {
			const diag = createDiagnostic("E1001", {
				stackTrace: [{ functionName: "foo", file: "test.loot", line: 1, column: 1 }],
			});
			expect(diag.stackTrace).toHaveLength(1);
			expect(diag.stackTrace![0].functionName).toBe("foo");
		});
	});

	describe("formatForCLI", () => {
		it("should format error with indicator", () => {
			const diag = createDiagnostic("E1001", { file: "test.loot", line: 5 });
			const output = formatForCLI(diag);
			expect(output).toContain("E1001");
			expect(output).toContain("test.loot:5");
		});

		it("should include suggestions", () => {
			const diag = createDiagnostic("E1001", {
				suggestions: ["Try this fix"],
			});
			const output = formatForCLI(diag);
			expect(output).toContain("Suggestions:");
			expect(output).toContain("Try this fix");
		});
	});

	describe("formatForLSP", () => {
		it("should convert to LSP format", () => {
			const diag = createDiagnostic("E1001", {
				file: "test.loot",
				line: 5,
				column: 3,
			});
			const lsp = formatForLSP(diag);
			// LSP uses 0-based positions
			expect(lsp.range.start.line).toBe(4);
			expect(lsp.range.start.character).toBe(2);
			expect(lsp.severity).toBe(1); // Error
			expect(lsp.message).toBeDefined();
		});

		it("should map warning severity", () => {
			const diag = createDiagnostic("W1001", {
				file: "test.loot",
				line: 1,
				column: 1,
			});
			const lsp = formatForLSP(diag);
			expect(lsp.severity).toBe(2); // Warning
		});
	});

	describe("formatForBrowser", () => {
		it("should format with code prefix", () => {
			const diag = createDiagnostic("E1001");
			const output = formatForBrowser(diag);
			expect(output).toContain("[E1001]");
		});

		it("should include file location", () => {
			const diag = createDiagnostic("E1001", {
				file: "test.loot",
				line: 10,
				column: 5,
			});
			const output = formatForBrowser(diag);
			expect(output).toContain("test.loot:10:5");
		});
	});

	describe("formatSimple", () => {
		it("should produce one-line format", () => {
			const diag = createDiagnostic("E1001", { file: "test.loot", line: 5 });
			const output = formatSimple(diag);
			expect(output).toContain("[E1001]");
			expect(output).toContain("test.loot:5");
		});
	});
});
