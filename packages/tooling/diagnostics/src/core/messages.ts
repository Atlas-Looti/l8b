/**
 * Message templates for all diagnostics in L8B ecosystem
 *
 * Each diagnostic code has a message template that can be a string or a function
 * that takes arguments and returns a formatted message.
 */

import {
	SyntaxErrorCode,
	RuntimeErrorCode,
	CompilationErrorCode,
	SceneErrorCode,
	CLIErrorCode,
	WarningCode,
} from "./codes";
import { MessageTemplate, DiagnosticSeverity, DiagnosticCategory } from "./types";

/**
 * All diagnostic message templates
 */
export const MESSAGES: Record<string, MessageTemplate> = {
	// Syntax Errors (E1xxx)
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
			return [
				`Add 'end' to close the '${args.blockType || "block"}' statement`,
				"Check if you have nested blocks that need to be closed first",
			];
		},
	},
	[SyntaxErrorCode.E1002]: {
		code: SyntaxErrorCode.E1002,
		severity: DiagnosticSeverity.Error,
		category: DiagnosticCategory.Syntax,
		message: "Too many 'end' statements",
		description: "An 'end' keyword was found without a matching opening statement",
		suggestions: [
			"Remove the extra 'end' statement",
			"Check if you have a missing opening statement (if, for, while, function)",
		],
	},
	[SyntaxErrorCode.E1003]: {
		code: SyntaxErrorCode.E1003,
		severity: DiagnosticSeverity.Error,
		category: DiagnosticCategory.Syntax,
		message: "Missing 'end' statement",
		description: "A block was opened but not closed with 'end'",
		suggestions: [
			"Add an 'end' statement to close the block",
			"Check all nested blocks are properly closed",
		],
	},
	[SyntaxErrorCode.E1004]: {
		code: SyntaxErrorCode.E1004,
		severity: DiagnosticSeverity.Error,
		category: DiagnosticCategory.Syntax,
		message: (args) => String(args.error || "Unexpected token"),
		description: "An unexpected token was encountered during parsing",
		suggestions: [
			"Check the syntax around this location",
			"Verify you're using the correct syntax for this statement",
		],
	},
	[SyntaxErrorCode.E1005]: {
		code: SyntaxErrorCode.E1005,
		severity: DiagnosticSeverity.Error,
		category: DiagnosticCategory.Syntax,
		message: (args) => `Missing ${args.expected || "token"}`,
		description: "A required token was expected but not found",
		suggestions: [
			"Check if you're missing a required keyword or symbol",
			"Verify the syntax is complete",
		],
	},
	[SyntaxErrorCode.E1006]: {
		code: SyntaxErrorCode.E1006,
		severity: DiagnosticSeverity.Error,
		category: DiagnosticCategory.Syntax,
		message: "Unexpected end of file",
		description: "The file ended while parsing was incomplete",
		suggestions: [
			"Check if you're missing a closing statement",
			"Verify all blocks are properly closed",
		],
	},
	[SyntaxErrorCode.E1007]: {
		code: SyntaxErrorCode.E1007,
		severity: DiagnosticSeverity.Error,
		category: DiagnosticCategory.Syntax,
		message: (args) => `Misuse of reserved keyword '${args.keyword}'`,
		description: "A reserved keyword was used incorrectly",
		suggestions: [
			"Use a different identifier name",
			"Check the context where this keyword is used",
		],
	},
	[SyntaxErrorCode.E1008]: {
		code: SyntaxErrorCode.E1008,
		severity: DiagnosticSeverity.Error,
		category: DiagnosticCategory.Syntax,
		message: "Unterminated string",
		description: "A string literal was started but not closed",
		suggestions: [
			"Add a closing quote to terminate the string",
			"Check for escaped quotes within the string",
		],
	},
	[SyntaxErrorCode.E1009]: {
		code: SyntaxErrorCode.E1009,
		severity: DiagnosticSeverity.Error,
		category: DiagnosticCategory.Syntax,
		message: (args) => `Unterminated ${args.type || "object/array"}`,
		description: "An object or array was started but not closed",
		suggestions: [
			"Add a closing brace or bracket",
			"Check for nested objects/arrays that need to be closed first",
		],
	},

	// Runtime Errors (E2xxx)
	[RuntimeErrorCode.E2001]: {
		code: RuntimeErrorCode.E2001,
		severity: DiagnosticSeverity.Error,
		category: DiagnosticCategory.Runtime,
		message: (args) => `Undefined variable '${args.variableName}'`,
		description: "A variable was referenced but not defined",
		suggestions: [
			"Check if the variable name is spelled correctly",
			"Verify the variable is defined before use",
			"Check the variable scope",
		],
	},
	[RuntimeErrorCode.E2002]: {
		code: RuntimeErrorCode.E2002,
		severity: DiagnosticSeverity.Error,
		category: DiagnosticCategory.Runtime,
		message: (args) =>
			`Type mismatch: expected ${args.expectedType}, got ${args.actualType}`,
		description: "An operation was performed with incompatible types",
		suggestions: [
			"Check the types of the operands",
			"Use type conversion if needed",
		],
	},
	[RuntimeErrorCode.E2003]: {
		code: RuntimeErrorCode.E2003,
		severity: DiagnosticSeverity.Error,
		category: DiagnosticCategory.Runtime,
		message: "Division by zero",
		description: "An attempt was made to divide by zero",
		suggestions: [
			"Check the divisor before division",
			"Add a conditional check to prevent division by zero",
		],
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
		suggestions: [
			"Check the operation and its operands",
			"Verify the operation is valid for the given types",
		],
	},

	// Compilation Errors (E3xxx)
	[CompilationErrorCode.E3001]: {
		code: CompilationErrorCode.E3001,
		severity: DiagnosticSeverity.Error,
		category: DiagnosticCategory.Compilation,
		message: (args) => String(args.error || "Compilation failed"),
		description: "The compilation process encountered an error",
		suggestions: [
			"Check the error messages above for details",
			"Fix the reported errors and try again",
		],
	},
	[CompilationErrorCode.E3002]: {
		code: CompilationErrorCode.E3002,
		severity: DiagnosticSeverity.Error,
		category: DiagnosticCategory.Compilation,
		message: (args) =>
			`File not found: ${args.filePath || args.file || "unknown file"}`,
		description: "A required file could not be found",
		suggestions: [
			"Check if the file path is correct",
			"Verify the file exists at the specified location",
		],
	},
	[CompilationErrorCode.E3003]: {
		code: CompilationErrorCode.E3003,
		severity: DiagnosticSeverity.Error,
		category: DiagnosticCategory.Compilation,
		message: (args) => String(args.error || "Parse error"),
		description: "The source code could not be parsed",
		suggestions: [
			"Check the syntax of the source code",
			"Look for syntax errors in the file",
		],
	},

	// Scene Errors (E5xxx)
	[SceneErrorCode.E5001]: {
		code: SceneErrorCode.E5001,
		severity: DiagnosticSeverity.Error,
		category: DiagnosticCategory.Scene,
		message: (args) => `Invalid path: ${args.path}`,
		description: "An invalid scene path was provided",
		suggestions: [
			"Check the path format",
			"Verify the path is valid",
		],
	},
	[SceneErrorCode.E5002]: {
		code: SceneErrorCode.E5002,
		severity: DiagnosticSeverity.Error,
		category: DiagnosticCategory.Scene,
		message: (args) => `Invalid scene name: ${args.name}`,
		description: "An invalid scene name was provided",
		suggestions: [
			"Check the scene name format",
			"Verify the scene name is valid",
		],
	},
	[SceneErrorCode.E5003]: {
		code: SceneErrorCode.E5003,
		severity: DiagnosticSeverity.Error,
		category: DiagnosticCategory.Scene,
		message: (args) => `Invalid scene definition for '${args.name}'`,
		description: "A scene was defined with invalid configuration",
		suggestions: [
			"Check the scene definition syntax",
			"Verify all required properties are provided",
		],
	},
	[SceneErrorCode.E5004]: {
		code: SceneErrorCode.E5004,
		severity: DiagnosticSeverity.Error,
		category: DiagnosticCategory.Scene,
		message: (args) => `Scene not found: ${args.name}`,
		description: "A requested scene could not be found",
		suggestions: [
			"Check if the scene is registered",
			"Verify the scene name is correct",
		],
	},
	[SceneErrorCode.E5005]: {
		code: SceneErrorCode.E5005,
		severity: DiagnosticSeverity.Error,
		category: DiagnosticCategory.Scene,
		message: (args) => `No route matched for path: ${args.path}`,
		description: "No scene route matched the provided path",
		suggestions: [
			"Check if a route exists for this path",
			"Verify the path format matches the route pattern",
		],
	},
	[SceneErrorCode.E5006]: {
		code: SceneErrorCode.E5006,
		severity: DiagnosticSeverity.Error,
		category: DiagnosticCategory.Scene,
		message: "No scenes registered",
		description: "No scenes have been registered in the router",
		suggestions: [
			"Register at least one scene before using the router",
			"Check if scene registration is called",
		],
	},
	[SceneErrorCode.E5007]: {
		code: SceneErrorCode.E5007,
		severity: DiagnosticSeverity.Error,
		category: DiagnosticCategory.Scene,
		message: (args) => `Scene '${args.name}' has no draw() function`,
		description: "A scene is missing the required draw function",
		suggestions: [
			"Add a draw() function to the scene",
			"Check if the function name is correct",
		],
	},

	// CLI Errors (E6xxx)
	[CLIErrorCode.E6001]: {
		code: CLIErrorCode.E6001,
		severity: DiagnosticSeverity.Error,
		category: DiagnosticCategory.CLI,
		message: (args) => String(args.error || "Configuration error"),
		description: "An error occurred while processing configuration",
		suggestions: [
			"Check the configuration file",
			"Verify all required configuration options are present",
		],
	},
	[CLIErrorCode.E6002]: {
		code: CLIErrorCode.E6002,
		severity: DiagnosticSeverity.Error,
		category: DiagnosticCategory.CLI,
		message: (args) => String(args.error || "Build error"),
		description: "An error occurred during the build process",
		suggestions: [
			"Check the build output for details",
			"Fix the reported errors and try again",
		],
	},
	[CLIErrorCode.E6003]: {
		code: CLIErrorCode.E6003,
		severity: DiagnosticSeverity.Error,
		category: DiagnosticCategory.CLI,
		message: (args) => String(args.error || "Server error"),
		description: "An error occurred in the development server",
		suggestions: [
			"Check the server logs for details",
			"Restart the development server",
		],
	},

	// Warnings (W1xxx - W5xxx)
	[WarningCode.W1001]: {
		code: WarningCode.W1001,
		severity: DiagnosticSeverity.Warning,
		category: DiagnosticCategory.Syntax,
		message: (args) => `Assigning to API variable '${args.variableName}'`,
		description: "You are modifying a read-only API variable",
		suggestions: [
			"Use a local variable instead",
			"Check if you meant to use a different variable",
		],
	},
	[WarningCode.W1002]: {
		code: WarningCode.W1002,
		severity: DiagnosticSeverity.Warning,
		category: DiagnosticCategory.Syntax,
		message: "Assignment used as condition",
		description: "An assignment operator (=) was used in a condition instead of comparison (==)",
		suggestions: [
			"Use == for comparison instead of =",
			"Check if you meant to assign before comparing",
		],
	},
	[WarningCode.W2001]: {
		code: WarningCode.W2001,
		severity: DiagnosticSeverity.Warning,
		category: DiagnosticCategory.Runtime,
		message: (args) => `Deprecated API usage: ${args.apiName}`,
		description: "A deprecated API is being used",
		suggestions: [
			"Update to the new API",
			"Check the documentation for migration guide",
		],
	},
	[WarningCode.W5001]: {
		code: WarningCode.W5001,
		severity: DiagnosticSeverity.Warning,
		category: DiagnosticCategory.Scene,
		message: (args) => `Activating first available scene: ${args.sceneName}`,
		description: "No route matched, so the first scene was activated",
		suggestions: [
			"Register a route for the initial path",
			"Check if the route pattern is correct",
		],
	},
	[WarningCode.W5002]: {
		code: WarningCode.W5002,
		severity: DiagnosticSeverity.Warning,
		category: DiagnosticCategory.Scene,
		message: (args) =>
			`No route matched initial path, activating first scene: ${args.sceneName}`,
		description: "The initial path didn't match any route",
		suggestions: [
			"Register a route for the initial path",
			"Check if the route pattern matches the initial path",
		],
	},
	[WarningCode.W5003]: {
		code: WarningCode.W5003,
		severity: DiagnosticSeverity.Warning,
		category: DiagnosticCategory.Scene,
		message: "No scenes registered. Game may show blank screen.",
		description: "No scenes have been registered",
		suggestions: [
			"Register at least one scene",
			"Check if scene registration is called",
		],
	},
	[WarningCode.W5004]: {
		code: WarningCode.W5004,
		severity: DiagnosticSeverity.Warning,
		category: DiagnosticCategory.Scene,
		message: "No scenes registered. Make sure to call scene() before router.init().",
		description: "Router was initialized before any scenes were registered",
		suggestions: [
			"Register scenes before calling router.init()",
			"Check the order of initialization",
		],
	},
};

/**
 * Get a message template for a diagnostic code
 */
export function getMessageTemplate(code: string): MessageTemplate | undefined {
	return MESSAGES[code];
}

/**
 * Format a message from a template with arguments
 */
export function formatMessage(
	code: string,
	args: Record<string, any> = {},
): string {
	const template = getMessageTemplate(code);
	if (!template) {
		return args.error || args.message || `Unknown error: ${code}`;
	}

	if (typeof template.message === "string") {
		return template.message;
	}

	return template.message(args);
}

/**
 * Get suggestions for a diagnostic code
 */
export function getSuggestions(
	code: string,
	args: Record<string, any> = {},
): string[] {
	const template = getMessageTemplate(code);
	if (!template || !template.suggestions) {
		return [];
	}

	if (typeof template.suggestions === "function") {
		return template.suggestions(args);
	}

	return template.suggestions;
}

