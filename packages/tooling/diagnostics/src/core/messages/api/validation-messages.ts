/**
 * API Validation error message templates (E7100-E7199)
 */

import { APIErrorCode } from "../../codes";
import { DiagnosticCategory, DiagnosticSeverity, type MessageTemplate } from "../../types";

export const validationMessages: Record<string, MessageTemplate> = {
	[APIErrorCode.E7100]: {
		code: APIErrorCode.E7100,
		severity: DiagnosticSeverity.Error,
		category: DiagnosticCategory.API,
		message: (args) => {
			const suggestion = args.suggestion as string | undefined;
			if (suggestion) {
				return `Unknown property '${args.propertyName}' on ${args.objectName}. Did you mean '${suggestion}'?`;
			}
			return `Unknown property '${args.propertyName}' on ${args.objectName}.`;
		},
		description: "A property or method that does not exist on the API object was accessed",
		suggestions: [
			"Check if the property name is spelled correctly",
			"Verify the API object supports this property",
			"Check the API documentation for available properties",
		],
	},
};
