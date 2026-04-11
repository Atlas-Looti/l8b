/**
 * Error Handler - Error formatting and reporting for the runtime
 */

import type { RuntimeListener } from "../types";
import type { L8BVM } from "@al8b/vm";

/**
 * Format error message
 */
export function formatRuntimeError(error: any): any {
	if (error.code || error.context || error.suggestions) {
		return error;
	}

	return {
		...error,
		code: error.code || "E2005",
		formatted: error.message || String(error),
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
