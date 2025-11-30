/**
 * Input API error message templates (E7051-E7060)
 */

import { APIErrorCode } from "../../codes";
import { DiagnosticCategory, DiagnosticSeverity, type MessageTemplate } from "../../types";

export const inputMessages: Record<string, MessageTemplate> = {
	[APIErrorCode.E7051]: {
		code: APIErrorCode.E7051,
		severity: DiagnosticSeverity.Error,
		category: DiagnosticCategory.API,
		message: (args) => `Input device not available: '${args.device}'`,
		description: "The requested input device is not available",
		suggestions: ["Check if the device is connected", "Verify browser permissions", "Check device support"],
	},
	[APIErrorCode.E7052]: {
		code: APIErrorCode.E7052,
		severity: DiagnosticSeverity.Error,
		category: DiagnosticCategory.API,
		message: (args) => `Invalid input state: ${args.error || "unknown"}`,
		description: "Input state is invalid or corrupted",
		suggestions: ["Reinitialize input system", "Check input device connections"],
	},
};
