/**
 * Syntax error message templates (E1xxx)
 */

import { SyntaxErrorCode } from "../codes";
import { DiagnosticCategory, DiagnosticSeverity, type MessageTemplate } from "../types";

export const syntaxMessages: Record<string, MessageTemplate> = {
	[SyntaxErrorCode.E1001]: {
		code: SyntaxErrorCode.E1001,
		severity: DiagnosticSeverity.Error,
		category: DiagnosticCategory.Syntax,
		message: (args) => {
			if (args.functionName) {
				return `Function '${args.functionName}' started at line ${args.functionStartLine} is not closed`;
			}
			return `Unterminated '${args.blockType || "block"}' ; no matching 'end' found`;
		},
		description: "A function or block declaration was started but not properly closed",
		suggestions: (args) => {
			if (args.functionName) {
				return [
					`Add 'end' after the last statement to close function '${args.functionName}'`,
					"Check if you have an extra 'end' statement somewhere",
					"Verify all nested blocks (if, for, while) are properly closed",
				];
			}
			return [`Add 'end' to close the '${args.blockType || "block"}' statement`, "Check if you have nested blocks that need to be closed first"];
		},
	},
	[SyntaxErrorCode.E1002]: {
		code: SyntaxErrorCode.E1002,
		severity: DiagnosticSeverity.Error,
		category: DiagnosticCategory.Syntax,
		message: "Too many 'end' statements",
		description: "An 'end' keyword was found without a matching opening statement",
		suggestions: ["Remove the extra 'end' statement", "Check if you have a missing opening statement (if, for, while, function)"],
	},
	[SyntaxErrorCode.E1003]: {
		code: SyntaxErrorCode.E1003,
		severity: DiagnosticSeverity.Error,
		category: DiagnosticCategory.Syntax,
		message: "Missing 'end' statement",
		description: "A block was opened but not closed with 'end'",
		suggestions: ["Add an 'end' statement to close the block", "Check all nested blocks are properly closed"],
	},
	[SyntaxErrorCode.E1004]: {
		code: SyntaxErrorCode.E1004,
		severity: DiagnosticSeverity.Error,
		category: DiagnosticCategory.Syntax,
		message: (args) => String(args.error || "Unexpected token"),
		description: "An unexpected token was encountered during parsing",
		suggestions: ["Check the syntax around this location", "Verify you're using the correct syntax for this statement"],
	},
	[SyntaxErrorCode.E1005]: {
		code: SyntaxErrorCode.E1005,
		severity: DiagnosticSeverity.Error,
		category: DiagnosticCategory.Syntax,
		message: (args) => `Missing ${args.expected || "token"}`,
		description: "A required token was expected but not found",
		suggestions: ["Check if you're missing a required keyword or symbol", "Verify the syntax is complete"],
	},
	[SyntaxErrorCode.E1006]: {
		code: SyntaxErrorCode.E1006,
		severity: DiagnosticSeverity.Error,
		category: DiagnosticCategory.Syntax,
		message: "Unexpected end of file",
		description: "The file ended while parsing was incomplete",
		suggestions: ["Check if you're missing a closing statement", "Verify all blocks are properly closed"],
	},
	[SyntaxErrorCode.E1007]: {
		code: SyntaxErrorCode.E1007,
		severity: DiagnosticSeverity.Error,
		category: DiagnosticCategory.Syntax,
		message: (args) => `Misuse of reserved keyword '${args.keyword}'`,
		description: "A reserved keyword was used incorrectly",
		suggestions: ["Use a different identifier name", "Check the context where this keyword is used"],
	},
	[SyntaxErrorCode.E1008]: {
		code: SyntaxErrorCode.E1008,
		severity: DiagnosticSeverity.Error,
		category: DiagnosticCategory.Syntax,
		message: "Unterminated string",
		description: "A string literal was started but not closed",
		suggestions: ["Add a closing quote to terminate the string", "Check for escaped quotes within the string"],
	},
	[SyntaxErrorCode.E1009]: {
		code: SyntaxErrorCode.E1009,
		severity: DiagnosticSeverity.Error,
		category: DiagnosticCategory.Syntax,
		message: (args) => `Unterminated ${args.type || "object/array"}`,
		description: "An object or array was started but not closed",
		suggestions: ["Add a closing brace or bracket", "Check for nested objects/arrays that need to be closed first"],
	},
};
