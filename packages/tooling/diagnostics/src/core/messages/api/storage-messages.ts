/**
 * Storage API error message templates (E7061-E7070)
 */

import { APIErrorCode } from "../../codes";
import { DiagnosticCategory, DiagnosticSeverity, type MessageTemplate } from "../../types";

export const storageMessages: Record<string, MessageTemplate> = {
	[APIErrorCode.E7061]: {
		code: APIErrorCode.E7061,
		severity: DiagnosticSeverity.Error,
		category: DiagnosticCategory.API,
		message: "Storage quota exceeded",
		description: "The storage quota has been exceeded",
		suggestions: ["Clear old storage data", "Reduce the amount of data stored", "Check storage quota limits"],
	},
	[APIErrorCode.E7062]: {
		code: APIErrorCode.E7062,
		severity: DiagnosticSeverity.Error,
		category: DiagnosticCategory.API,
		message: (args) => `Storage operation failed: ${args.error || "unknown"}`,
		description: "A storage operation could not be completed",
		suggestions: ["Check storage permissions", "Verify storage is available", "Check browser console for details"],
	},
	[APIErrorCode.E7063]: {
		code: APIErrorCode.E7063,
		severity: DiagnosticSeverity.Error,
		category: DiagnosticCategory.API,
		message: (args) => `Invalid storage key: '${args.key}'`,
		description: "The storage key is invalid",
		suggestions: ["Use a valid key format", "Check key length and characters"],
	},
};
