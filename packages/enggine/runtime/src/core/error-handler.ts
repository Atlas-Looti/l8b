/**
 * Error Handler - Error formatting and reporting for the runtime
 */

import { createDiagnostic, formatForBrowser } from "@al8b/diagnostics";
import type { RuntimeListener } from "../types";
import type { L8BVM } from "@al8b/vm";

/**
 * Format error message with diagnostic information
 */
export function formatRuntimeError(error: any): any {
	if (error.code || error.context || error.suggestions) {
		return error;
	}

	const code = error.code || "E2005";
	const diagnostic = createDiagnostic(code, {
		file: error.file,
		line: error.line,
		column: error.column,
		context: error.context,
		suggestions: error.suggestions,
		related: error.related,
		stackTrace: error.stackTrace,
		data: {
			error: error.error || error.message,
		},
	});

	const formattedMessage = formatForBrowser(diagnostic);

	return {
		...error,
		...diagnostic,
		formatted: formattedMessage,
	};
}

/**
 * Report error to listener with enhanced formatting
 */
export function reportError(listener: RuntimeListener, error: any): void {
	if (listener.reportError) {
		const formatted = formatRuntimeError(error);
		listener.reportError(formatted);
	}
}

/**
 * Report warnings from VM context (invoking_non_function, using_undefined_variable)
 */
export function reportWarnings(vm: L8BVM | null, listener: RuntimeListener): void {
	if (!vm) return;

	const warnings = vm.context?.warnings;
	if (!warnings) return;

	if (warnings.invoking_non_function) {
		for (const value of Object.values(warnings.invoking_non_function)) {
			const warning = value as any;
			if (!warning.reported) {
				warning.reported = true;
				reportError(listener, {
					error: "",
					type: "non_function",
					expression: warning.expression,
					line: warning.line,
					column: warning.column,
					file: warning.file,
				});
			}
		}
	}

	if (warnings.using_undefined_variable) {
		for (const value of Object.values(warnings.using_undefined_variable)) {
			const warning = value as any;
			if (!warning.reported) {
				warning.reported = true;
				reportError(listener, {
					error: "",
					type: "undefined_variable",
					expression: warning.expression,
					line: warning.line,
					column: warning.column,
					file: warning.file,
				});
			}
		}
	}
}
