/**
 * Sprite API error message templates (E7021-E7030)
 */

import { APIErrorCode } from "../../codes";
import { DiagnosticCategory, DiagnosticSeverity, type MessageTemplate } from "../../types";

export const spriteMessages: Record<string, MessageTemplate> = {
	[APIErrorCode.E7021]: {
		code: APIErrorCode.E7021,
		severity: DiagnosticSeverity.Error,
		category: DiagnosticCategory.API,
		message: (args) => `Sprite loading failed: ${args.url || "unknown URL"}`,
		description: "The sprite image could not be loaded",
		suggestions: [
			"Check if the URL is correct",
			"Verify the image file exists",
			"Check CORS settings if loading from different domain",
			"Check browser console for network errors",
		],
	},
	[APIErrorCode.E7022]: {
		code: APIErrorCode.E7022,
		severity: DiagnosticSeverity.Error,
		category: DiagnosticCategory.API,
		message: (args) => `Invalid sprite properties: ${args.error || "unknown"}`,
		description: "Sprite properties are invalid",
		suggestions: ["Check frames is a positive number", "Check fps is a positive number", "Verify all required properties are set"],
	},
	[APIErrorCode.E7023]: {
		code: APIErrorCode.E7023,
		severity: DiagnosticSeverity.Error,
		category: DiagnosticCategory.API,
		message: (args) => `Invalid sprite URL: ${args.url}`,
		description: "The sprite URL is invalid or malformed",
		suggestions: ["Use a valid URL or relative path", "Check if the URL is properly formatted", "Verify the file extension is correct"],
	},
	[APIErrorCode.E7024]: {
		code: APIErrorCode.E7024,
		severity: DiagnosticSeverity.Error,
		category: DiagnosticCategory.API,
		message: (args) => `Sprite frame out of bounds: frame ${args.frame} of ${args.totalFrames}`,
		description: "The requested frame index is out of range",
		suggestions: ["Check frame index is between 0 and totalFrames-1", "Verify the sprite has the expected number of frames"],
	},
};
