/**
 * Runtime error message templates (E2xxx)
 */

import { RuntimeErrorCode } from "../codes";
import { DiagnosticCategory, DiagnosticSeverity, type MessageTemplate } from "../types";

export const runtimeMessages: Record<string, MessageTemplate> = {
	[RuntimeErrorCode.E2001]: {
		code: RuntimeErrorCode.E2001,
		severity: DiagnosticSeverity.Error,
		category: DiagnosticCategory.Runtime,
		message: (args) => `Undefined variable '${args.variableName}'`,
		description: "A variable was referenced but not defined",
		suggestions: ["Check if the variable name is spelled correctly", "Verify the variable is defined before use", "Check the variable scope"],
	},
	[RuntimeErrorCode.E2002]: {
		code: RuntimeErrorCode.E2002,
		severity: DiagnosticSeverity.Error,
		category: DiagnosticCategory.Runtime,
		message: (args) => `Type mismatch: expected ${args.expectedType}, got ${args.actualType}`,
		description: "An operation was performed with incompatible types",
		suggestions: ["Check the types of the operands", "Use type conversion if needed"],
	},
	[RuntimeErrorCode.E2003]: {
		code: RuntimeErrorCode.E2003,
		severity: DiagnosticSeverity.Error,
		category: DiagnosticCategory.Runtime,
		message: "Division by zero",
		description: "An attempt was made to divide by zero",
		suggestions: ["Check the divisor before division", "Add a conditional check to prevent division by zero"],
	},
	[RuntimeErrorCode.E2004]: {
		code: RuntimeErrorCode.E2004,
		severity: DiagnosticSeverity.Error,
		category: DiagnosticCategory.Runtime,
		message: (args) => `Function '${args.functionName}' not found`,
		description: "A function was called but not defined",
		suggestions: [
			"Check if the function name is spelled correctly",
			"Verify the function is defined before use",
			"Check if the function is in the correct scope",
		],
	},
	[RuntimeErrorCode.E2005]: {
		code: RuntimeErrorCode.E2005,
		severity: DiagnosticSeverity.Error,
		category: DiagnosticCategory.Runtime,
		message: (args) => String(args.error || "Invalid operation"),
		description: "An invalid operation was attempted",
		suggestions: ["Check the operation and its operands", "Verify the operation is valid for the given types"],
	},
};
