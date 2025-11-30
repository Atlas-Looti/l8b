/**
 * Scene error message templates (E5xxx)
 */

import { SceneErrorCode } from "../codes";
import { DiagnosticCategory, DiagnosticSeverity, type MessageTemplate } from "../types";

export const sceneMessages: Record<string, MessageTemplate> = {
	[SceneErrorCode.E5001]: {
		code: SceneErrorCode.E5001,
		severity: DiagnosticSeverity.Error,
		category: DiagnosticCategory.Scene,
		message: (args) => `Invalid path: ${args.path}`,
		description: "An invalid scene path was provided",
		suggestions: ["Check the path format", "Verify the path is valid"],
	},
	[SceneErrorCode.E5002]: {
		code: SceneErrorCode.E5002,
		severity: DiagnosticSeverity.Error,
		category: DiagnosticCategory.Scene,
		message: (args) => `Invalid scene name: ${args.name}`,
		description: "An invalid scene name was provided",
		suggestions: ["Check the scene name format", "Verify the scene name is valid"],
	},
	[SceneErrorCode.E5003]: {
		code: SceneErrorCode.E5003,
		severity: DiagnosticSeverity.Error,
		category: DiagnosticCategory.Scene,
		message: (args) => `Invalid scene definition for '${args.name}'`,
		description: "A scene was defined with invalid configuration",
		suggestions: ["Check the scene definition syntax", "Verify all required properties are provided"],
	},
	[SceneErrorCode.E5004]: {
		code: SceneErrorCode.E5004,
		severity: DiagnosticSeverity.Error,
		category: DiagnosticCategory.Scene,
		message: (args) => `Scene not found: ${args.name}`,
		description: "A requested scene could not be found",
		suggestions: ["Check if the scene is registered", "Verify the scene name is correct"],
	},
	[SceneErrorCode.E5005]: {
		code: SceneErrorCode.E5005,
		severity: DiagnosticSeverity.Error,
		category: DiagnosticCategory.Scene,
		message: (args) => `No route matched for path: ${args.path}`,
		description: "No scene route matched the provided path",
		suggestions: ["Check if a route exists for this path", "Verify the path format matches the route pattern"],
	},
	[SceneErrorCode.E5006]: {
		code: SceneErrorCode.E5006,
		severity: DiagnosticSeverity.Error,
		category: DiagnosticCategory.Scene,
		message: "No scenes registered",
		description: "No scenes have been registered in the router",
		suggestions: ["Register at least one scene before using the router", "Check if scene registration is called"],
	},
	[SceneErrorCode.E5007]: {
		code: SceneErrorCode.E5007,
		severity: DiagnosticSeverity.Error,
		category: DiagnosticCategory.Scene,
		message: (args) => `Scene '${args.name}' has no draw() function`,
		description: "A scene is missing the required draw function",
		suggestions: ["Add a draw() function to the scene", "Check if the function name is correct"],
	},
};
