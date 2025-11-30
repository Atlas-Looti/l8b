/**
 * Diagnostic formatters for different output formats
 *
 * Provides formatting functions for CLI, LSP, Browser console, etc.
 */

import {
	formatMessage,
	getSuggestions,
} from "./messages";
import {
	type Diagnostic,
	DiagnosticSeverity,
	type RelatedLocation,
} from "./types";

/**
 * Format diagnostic for CLI output (terminal)
 */
export function formatForCLI(
	diagnostic: Diagnostic,
): string {
	const lines: string[] =
		[];
	const code =
		diagnostic.code ||
		"";
	const severity =
		diagnostic.severity ||
		DiagnosticSeverity.Error;
	const message =
		diagnostic.message ||
		"Unknown error";

	// Add severity indicator (✗ for errors, ⚠ for warnings)
	const indicator =
		severity ===
		DiagnosticSeverity.Error
			? "✗"
			: "⚠";
	lines.push(
		`${indicator} [${code}] ${message}`,
	);

	// Add file location with line and column numbers
	if (
		diagnostic.file
	) {
		let location = `  at ${diagnostic.file}`;
		if (
			diagnostic.line !==
			undefined
		) {
			location += `:${diagnostic.line}`;
			if (
				diagnostic.column !==
				undefined
			) {
				location += `:${diagnostic.column}`;
			}
		}
		lines.push(
			location,
		);
	}

	// Add source code context if available
	if (
		diagnostic.context
	) {
		lines.push(
			"",
		);
		lines.push(
			diagnostic.context,
		);
	}

	// Add actionable suggestions for fixing the error
	const suggestions =
		diagnostic.suggestions ||
		getSuggestions(
			code,
			diagnostic.data,
		);
	if (
		suggestions.length >
		0
	) {
		lines.push(
			"",
		);
		lines.push(
			"Suggestions:",
		);
		for (const suggestion of suggestions) {
			lines.push(
				`  • ${suggestion}`,
			);
		}
	}

	// Add related location information if available
	if (
		diagnostic.related
	) {
		lines.push(
			"",
		);
		lines.push(
			`Related: ${diagnostic.related.message} at ${diagnostic.related.file}:${diagnostic.related.line}:${diagnostic.related.column}`,
		);
	}

	// Add stack trace for runtime errors
	if (
		diagnostic.stackTrace &&
		diagnostic
			.stackTrace
			.length >
			0
	) {
		lines.push(
			"",
		);
		lines.push(
			"Stack trace:",
		);
		for (const frame of diagnostic.stackTrace) {
			const functionName =
				frame.functionName ||
				"<anonymous>";
			lines.push(
				`  at ${functionName} (${frame.file}:${frame.line}:${frame.column})`,
			);
		}
	}

	return lines.join(
		"\n",
	);
}

/**
 * Format diagnostic for Language Server Protocol (LSP)
 */
export function formatForLSP(
	diagnostic: Diagnostic,
): {
	range: {
		start: {
			line: number;
			character: number;
		};
		end: {
			line: number;
			character: number;
		};
	};
	severity: number;
	code?: string;
	source?: string;
	message: string;
	relatedInformation?: Array<{
		location: {
			uri: string;
			range: {
				start: {
					line: number;
					character: number;
				};
				end: {
					line: number;
					character: number;
				};
			};
		};
		message: string;
	}>;
} {
	const line =
		Math.max(
			0,
			(diagnostic.line ||
				1) -
				1,
		); // Convert 1-based to 0-based
	const column =
		Math.max(
			0,
			(diagnostic.column ||
				1) -
				1,
		); // Convert 1-based to 0-based
	const length =
		diagnostic.length ||
		1;
	const endColumn =
		column +
		length;

	// Map diagnostic severity to LSP severity levels
	let lspSeverity: number;
	switch (
		diagnostic.severity
	) {
		case DiagnosticSeverity.Error:
			lspSeverity = 1; // Error
			break;
		case DiagnosticSeverity.Warning:
			lspSeverity = 2; // Warning
			break;
		case DiagnosticSeverity.Info:
			lspSeverity = 3; // Information
			break;
		default:
			lspSeverity = 1;
	}

	const result: any =
		{
			range:
				{
					start:
						{
							line,
							character:
								column,
						},
					end: {
						line,
						character:
							endColumn,
					},
				},
			severity:
				lspSeverity,
			message:
				diagnostic.message ||
				"Unknown error",
			source:
				"l8b",
		};

	if (
		diagnostic.code
	) {
		result.code =
			diagnostic.code;
	}

	// Collect related information for LSP diagnostic
	const relatedInformation: any[] =
		[];

	// Include related location if provided
	if (
		diagnostic.related
	) {
		relatedInformation.push(
			{
				location:
					{
						uri: diagnostic
							.related
							.file,
						range:
							{
								start:
									{
										line:
											diagnostic
												.related
												.line -
											1,
										character:
											diagnostic
												.related
												.column -
											1,
									},
								end: {
									line:
										diagnostic
											.related
											.line -
										1,
									character:
										diagnostic
											.related
											.column +
										10,
								},
							},
					},
				message:
					diagnostic
						.related
						.message ||
					"Related location",
			},
		);
	}

	// Include first suggestion as related information with lightbulb icon
	const suggestions =
		diagnostic.suggestions ||
		getSuggestions(
			diagnostic.code ||
				"",
			diagnostic.data,
		);
	if (
		suggestions.length >
		0
	) {
		relatedInformation.push(
			{
				location:
					{
						uri:
							diagnostic.file ||
							"",
						range:
							{
								start:
									{
										line,
										character:
											column,
									},
								end: {
									line,
									character:
										endColumn,
								},
							},
					},
				message: `💡 ${suggestions[0]}`,
			},
		);
	}

	if (
		relatedInformation.length >
		0
	) {
		result.relatedInformation =
			relatedInformation;
	}

	return result;
}

/**
 * Format diagnostic for browser console
 */
export function formatForBrowser(
	diagnostic: Diagnostic,
): string {
	const code =
		diagnostic.code ||
		"";
	const message =
		diagnostic.message ||
		"Unknown error";

	// Build message with code
	let formatted =
		"";
	if (
		code
	) {
		formatted += `[${code}] `;
	}
	formatted +=
		message;

	// Add location
	if (
		diagnostic.file
	) {
		formatted += `\n  at ${diagnostic.file}`;
		if (
			diagnostic.line !==
			undefined
		) {
			formatted += `:${diagnostic.line}`;
			if (
				diagnostic.column !==
				undefined
			) {
				formatted += `:${diagnostic.column}`;
			}
		}
	}

	// Add context
	if (
		diagnostic.context
	) {
		formatted += `\n\n${diagnostic.context}`;
	}

	// Add suggestions
	const suggestions =
		diagnostic.suggestions ||
		getSuggestions(
			code,
			diagnostic.data,
		);
	if (
		suggestions.length >
		0
	) {
		formatted +=
			"\n\nSuggestions:";
		for (const suggestion of suggestions) {
			formatted += `\n  • ${suggestion}`;
		}
	}

	// Add related location
	if (
		diagnostic.related
	) {
		formatted += `\n\nRelated: ${diagnostic.related.message} at ${diagnostic.related.file}:${diagnostic.related.line}:${diagnostic.related.column}`;
	}

	// Add stack trace
	if (
		diagnostic.stackTrace &&
		diagnostic
			.stackTrace
			.length >
			0
	) {
		formatted +=
			"\n\nStack trace:";
		for (const frame of diagnostic.stackTrace) {
			const functionName =
				frame.functionName ||
				"<anonymous>";
			formatted += `\n  at ${functionName} (${frame.file}:${frame.line}:${frame.column})`;
		}
	}

	return formatted;
}

/**
 * Format diagnostic as a simple string (for logging)
 */
export function formatSimple(
	diagnostic: Diagnostic,
): string {
	const code =
		diagnostic.code ||
		"";
	const message =
		diagnostic.message ||
		"Unknown error";
	const location =
		diagnostic.file
			? ` at ${diagnostic.file}${diagnostic.line ? `:${diagnostic.line}` : ""}`
			: "";

	return `[${code}] ${message}${location}`;
}

/**
 * Create a diagnostic object from code and arguments
 */
export function createDiagnostic(
	code: string,
	args: {
		file?: string;
		line?: number;
		column?: number;
		length?: number;
		context?: string;
		suggestions?: string[];
		related?: RelatedLocation;
		stackTrace?: Array<{
			functionName: string;
			file: string;
			line: number;
			column: number;
		}>;
		data?: Record<
			string,
			unknown
		>;
	} = {},
): Diagnostic {
	const message =
		formatMessage(
			code,
			{
				...args,
				...args.data,
			},
		);
	const suggestions =
		args.suggestions ||
		getSuggestions(
			code,
			{
				...args,
				...args.data,
			},
		);

	return {
		code,
		severity:
			code.startsWith(
				"E",
			)
				? DiagnosticSeverity.Error
				: DiagnosticSeverity.Warning,
		message,
		file:
			args.file,
		line:
			args.line,
		column:
			args.column,
		length:
			args.length,
		context:
			args.context,
		suggestions,
		related:
			args.related,
		stackTrace:
			args.stackTrace,
		data:
			args.data,
	};
}
