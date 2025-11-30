/**
 * Time API error message templates (E7081-E7090)
 */

import { APIErrorCode } from "../../codes";
import { DiagnosticCategory, DiagnosticSeverity, type MessageTemplate } from "../../types";

export const timeMessages: Record<string, MessageTemplate> = {
	[APIErrorCode.E7081]: {
		code: APIErrorCode.E7081,
		severity: DiagnosticSeverity.Error,
		category: DiagnosticCategory.API,
		message: (args) => `Invalid time value: ${args.value || "unknown"}`,
		description: "The time value is invalid or out of range",
		suggestions: ["Check time value is a positive number", "Verify time is within valid range", "Check time format"],
	},
	[APIErrorCode.E7082]: {
		code: APIErrorCode.E7082,
		severity: DiagnosticSeverity.Error,
		category: DiagnosticCategory.API,
		message: (args) => `Time playback failed: ${args.error || "unknown"}`,
		description: "Time playback operation could not be completed",
		suggestions: ["Check if time playback is initialized", "Verify playback state", "Check for conflicting time operations"],
	},
	[APIErrorCode.E7083]: {
		code: APIErrorCode.E7083,
		severity: DiagnosticSeverity.Error,
		category: DiagnosticCategory.API,
		message: (args) => `Time recording failed: ${args.error || "unknown"}`,
		description: "Time recording operation could not be completed",
		suggestions: ["Check if time recording is initialized", "Verify recording state", "Check available storage space"],
	},
	[APIErrorCode.E7084]: {
		code: APIErrorCode.E7084,
		severity: DiagnosticSeverity.Error,
		category: DiagnosticCategory.API,
		message: (args) => `Invalid time format: ${args.format || "unknown"}`,
		description: "The time format is not supported",
		suggestions: ["Use a supported time format", "Check time format documentation", "Verify time string format"],
	},
};
