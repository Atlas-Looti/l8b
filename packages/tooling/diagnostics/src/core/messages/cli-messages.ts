/**
 * CLI error message templates (E6xxx)
 */

import { CLIErrorCode } from "../codes";
import { DiagnosticCategory, DiagnosticSeverity, type MessageTemplate } from "../types";

export const cliMessages: Record<string, MessageTemplate> = {
	[CLIErrorCode.E6001]: {
		code: CLIErrorCode.E6001,
		severity: DiagnosticSeverity.Error,
		category: DiagnosticCategory.CLI,
		message: (args) => String(args.error || "Configuration error"),
		description: "An error occurred while processing configuration",
		suggestions: ["Check the configuration file", "Verify all required configuration options are present"],
	},
	[CLIErrorCode.E6002]: {
		code: CLIErrorCode.E6002,
		severity: DiagnosticSeverity.Error,
		category: DiagnosticCategory.CLI,
		message: (args) => String(args.error || "Build error"),
		description: "An error occurred during the build process",
		suggestions: ["Check the build output for details", "Fix the reported errors and try again"],
	},
	[CLIErrorCode.E6003]: {
		code: CLIErrorCode.E6003,
		severity: DiagnosticSeverity.Error,
		category: DiagnosticCategory.CLI,
		message: (args) => String(args.error || "Server error"),
		description: "An error occurred in the development server",
		suggestions: ["Check the server logs for details", "Restart the development server"],
	},
};
