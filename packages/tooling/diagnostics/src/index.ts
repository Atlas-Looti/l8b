/**
 * @l8b/diagnostics - Centralized diagnostics system for L8B ecosystem
 *
 * Provides error codes, message templates, and formatters for consistent
 * error and warning messages across all L8B tools.
 */

// Export codes
export {
	SyntaxErrorCode,
	RuntimeErrorCode,
	CompilationErrorCode,
	SceneErrorCode,
	CLIErrorCode,
	APIErrorCode,
	WarningCode,
	type ErrorCode,
	type DiagnosticCode,
} from "./core/codes";

// Export types
export {
	DiagnosticSeverity,
	DiagnosticCategory,
	type Diagnostic,
	type RelatedLocation,
	type CallFrame,
	type MessageTemplate,
	type MessageArgs,
} from "./core/types";

// Export messages
export {
	MESSAGES,
	getMessageTemplate,
	formatMessage,
	getSuggestions,
} from "./core/messages";

// Export formatters
export {
	formatForCLI,
	formatForLSP,
	formatForBrowser,
	formatSimple,
	createDiagnostic,
} from "./core/formatter";
