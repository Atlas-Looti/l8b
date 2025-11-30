/**
 * Compilation error message templates (E3xxx)
 */

import { CompilationErrorCode } from "../codes";
import { DiagnosticCategory, DiagnosticSeverity, type MessageTemplate } from "../types";

export const compilationMessages: Record<string, MessageTemplate> = {
	[CompilationErrorCode.E3001]: {
		code: CompilationErrorCode.E3001,
		severity: DiagnosticSeverity.Error,
		category: DiagnosticCategory.Compilation,
		message: (args) => String(args.error || "Compilation failed"),
		description: "The compilation process encountered an error",
		suggestions: ["Check the error messages above for details", "Fix the reported errors and try again"],
	},
	[CompilationErrorCode.E3002]: {
		code: CompilationErrorCode.E3002,
		severity: DiagnosticSeverity.Error,
		category: DiagnosticCategory.Compilation,
		message: (args) => `File not found: ${args.filePath || args.file || "unknown file"}`,
		description: "A required file could not be found",
		suggestions: ["Check if the file path is correct", "Verify the file exists at the specified location"],
	},
	[CompilationErrorCode.E3003]: {
		code: CompilationErrorCode.E3003,
		severity: DiagnosticSeverity.Error,
		category: DiagnosticCategory.Compilation,
		message: (args) => String(args.error || "Parse error"),
		description: "The source code could not be parsed",
		suggestions: ["Check the syntax of the source code", "Look for syntax errors in the file"],
	},
};
