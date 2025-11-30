/**
 * Drawing API error message templates (E7091-E7100)
 */

import { APIErrorCode } from "../../codes";
import { DiagnosticCategory, DiagnosticSeverity, type MessageTemplate } from "../../types";

export const drawMessages: Record<string, MessageTemplate> = {
	[APIErrorCode.E7091]: {
		code: APIErrorCode.E7091,
		severity: DiagnosticSeverity.Error,
		category: DiagnosticCategory.API,
		message: (args) => `Drawing operation failed: ${args.operation || "unknown"}`,
		description: "A drawing operation could not be completed",
		suggestions: ["Check if drawing context is valid", "Verify drawing parameters", "Check canvas state"],
	},
	[APIErrorCode.E7092]: {
		code: APIErrorCode.E7092,
		severity: DiagnosticSeverity.Error,
		category: DiagnosticCategory.API,
		message: "Invalid drawing context",
		description: "The drawing context is invalid or not available",
		suggestions: ["Check if canvas context is initialized", "Verify context is not destroyed", "Reinitialize drawing context"],
	},
	[APIErrorCode.E7093]: {
		code: APIErrorCode.E7093,
		severity: DiagnosticSeverity.Error,
		category: DiagnosticCategory.API,
		message: (args) => `Invalid drawing parameters: ${args.error || "unknown"}`,
		description: "Drawing parameters are invalid",
		suggestions: [
			"Check coordinate values are valid numbers",
			"Verify dimensions are positive",
			"Check color values are valid",
			"Verify all required parameters are provided",
		],
	},
};
