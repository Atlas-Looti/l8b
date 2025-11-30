/**
 * Map API error message templates (E7031-E7040)
 */

import { APIErrorCode } from "../../codes";
import { DiagnosticCategory, DiagnosticSeverity, type MessageTemplate } from "../../types";

export const mapMessages: Record<string, MessageTemplate> = {
	[APIErrorCode.E7031]: {
		code: APIErrorCode.E7031,
		severity: DiagnosticSeverity.Error,
		category: DiagnosticCategory.API,
		message: "Map canvas context failed",
		description: "Could not get 2D context for map rendering canvas",
		suggestions: ["Check if canvas element is valid", "Verify browser supports canvas"],
	},
	[APIErrorCode.E7032]: {
		code: APIErrorCode.E7032,
		severity: DiagnosticSeverity.Error,
		category: DiagnosticCategory.API,
		message: (args) => `Invalid tile coordinates: (${args.x}, ${args.y})`,
		description: "Tile coordinates are out of map bounds",
		suggestions: ["Check coordinates are within map dimensions", "Verify map was properly initialized"],
	},
	[APIErrorCode.E7033]: {
		code: APIErrorCode.E7033,
		severity: DiagnosticSeverity.Error,
		category: DiagnosticCategory.API,
		message: (args) => `Tile sprite not found: '${args.spriteName}'`,
		description: "The sprite for the tile does not exist",
		suggestions: ["Check if the sprite name is correct", "Verify the sprite was loaded", "Check tile definition"],
	},
	[APIErrorCode.E7034]: {
		code: APIErrorCode.E7034,
		severity: DiagnosticSeverity.Error,
		category: DiagnosticCategory.API,
		message: (args) => `Invalid map dimensions: ${args.width || "?"}x${args.height || "?"}`,
		description: "Map dimensions are invalid",
		suggestions: ["Ensure width and height are positive numbers", "Check map initialization"],
	},
};
