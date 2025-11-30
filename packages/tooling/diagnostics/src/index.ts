/**
 * @l8b/diagnostics - Centralized diagnostics system for L8B ecosystem
 *
 * Provides error codes, message templates, and formatters for consistent
 * error and warning messages across all L8B tools.
 */

// Export error and warning code enums
export {
    APIErrorCode,
    CLIErrorCode,
    CompilationErrorCode,
    type DiagnosticCode,
    type ErrorCode,
    RuntimeErrorCode,
    SceneErrorCode,
    SyntaxErrorCode,
    WarningCode,
} from "./core/codes";
// Export diagnostic formatting functions for different output targets
export {
    createDiagnostic,
    formatForBrowser,
    formatForCLI,
    formatForLSP,
    formatSimple,
} from "./core/formatter";

// Export message template system and utilities
export {
    formatMessage,
    getMessageTemplate,
    getSuggestions,
    MESSAGES,
} from "./core/messages";
// Export diagnostic type definitions and enums
export {
    type CallFrame,
    type Diagnostic,
    DiagnosticCategory,
    DiagnosticSeverity,
    type MessageArgs,
    type MessageTemplate,
    type RelatedLocation,
} from "./core/types";
