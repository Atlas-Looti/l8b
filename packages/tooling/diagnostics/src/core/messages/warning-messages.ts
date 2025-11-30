/**
 * Warning message templates (W1xxx - W5xxx)
 */

import { WarningCode } from "../codes";
import { DiagnosticCategory, DiagnosticSeverity, type MessageTemplate } from "../types";

export const warningMessages: Record<string, MessageTemplate> = {
	// Syntax Warnings (W1xxx)
	[WarningCode.W1001]: {
		code: WarningCode.W1001,
		severity: DiagnosticSeverity.Warning,
		category: DiagnosticCategory.Syntax,
		message: (args) => `Assigning to API variable '${args.variableName}'`,
		description: "You are modifying a read-only API variable",
		suggestions: ["Use a local variable instead", "Check if you meant to use a different variable"],
	},
	[WarningCode.W1002]: {
		code: WarningCode.W1002,
		severity: DiagnosticSeverity.Warning,
		category: DiagnosticCategory.Syntax,
		message: "Assignment used as condition",
		description: "An assignment operator (=) was used in a condition instead of comparison (==)",
		suggestions: ["Use == for comparison instead of =", "Check if you meant to assign before comparing"],
	},

	// Runtime Warnings (W2xxx)
	[WarningCode.W2001]: {
		code: WarningCode.W2001,
		severity: DiagnosticSeverity.Warning,
		category: DiagnosticCategory.Runtime,
		message: (args) => `Deprecated API usage: ${args.apiName}`,
		description: "A deprecated API is being used",
		suggestions: ["Update to the new API", "Check the documentation for migration guide"],
	},

	// Scene Warnings (W5xxx)
	[WarningCode.W5001]: {
		code: WarningCode.W5001,
		severity: DiagnosticSeverity.Warning,
		category: DiagnosticCategory.Scene,
		message: (args) => `Activating first available scene: ${args.sceneName}`,
		description: "No route matched, so the first scene was activated",
		suggestions: ["Register a route for the initial path", "Check if the route pattern is correct"],
	},
	[WarningCode.W5002]: {
		code: WarningCode.W5002,
		severity: DiagnosticSeverity.Warning,
		category: DiagnosticCategory.Scene,
		message: (args) => `No route matched initial path, activating first scene: ${args.sceneName}`,
		description: "The initial path didn't match any route",
		suggestions: ["Register a route for the initial path", "Check if the route pattern matches the initial path"],
	},
	[WarningCode.W5003]: {
		code: WarningCode.W5003,
		severity: DiagnosticSeverity.Warning,
		category: DiagnosticCategory.Scene,
		message: "No scenes registered. Game may show blank screen.",
		description: "No scenes have been registered",
		suggestions: ["Register at least one scene", "Check if scene registration is called"],
	},
	[WarningCode.W5004]: {
		code: WarningCode.W5004,
		severity: DiagnosticSeverity.Warning,
		category: DiagnosticCategory.Scene,
		message: "No scenes registered. Make sure to call scene() before router.init().",
		description: "Router was initialized before any scenes were registered",
		suggestions: ["Register scenes before calling router.init()", "Check the order of initialization"],
	},
};
