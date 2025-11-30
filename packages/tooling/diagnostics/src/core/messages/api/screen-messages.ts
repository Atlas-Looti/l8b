/**
 * Screen API error message templates (E7001-E7010)
 */

import { APIErrorCode } from "../../codes";
import { DiagnosticCategory, DiagnosticSeverity, type MessageTemplate } from "../../types";

export const screenMessages: Record<string, MessageTemplate> = {
	[APIErrorCode.E7001]: {
		code: APIErrorCode.E7001,
		severity: DiagnosticSeverity.Error,
		category: DiagnosticCategory.API,
		message: "Failed to get 2D canvas context",
		description: "The browser could not create a 2D rendering context for the canvas",
		suggestions: ["Check if the canvas element is valid", "Verify the browser supports canvas 2D rendering", "Check for conflicting canvas contexts"],
	},
	[APIErrorCode.E7002]: {
		code: APIErrorCode.E7002,
		severity: DiagnosticSeverity.Error,
		category: DiagnosticCategory.API,
		message: (args) => `Invalid canvas dimensions: ${args.width || "?"}x${args.height || "?"}`,
		description: "Canvas dimensions are invalid (zero or negative)",
		suggestions: ["Ensure width and height are positive numbers", "Check if canvas was properly initialized"],
	},
	[APIErrorCode.E7003]: {
		code: APIErrorCode.E7003,
		severity: DiagnosticSeverity.Error,
		category: DiagnosticCategory.API,
		message: (args) => `Invalid color format: ${args.color}`,
		description: "The color value provided is not in a valid format",
		suggestions: ["Use hex format: '#RRGGBB' or '#RGB'", "Use named colors: 'red', 'blue', etc.", "Use numeric format for palette colors"],
	},
	[APIErrorCode.E7004]: {
		code: APIErrorCode.E7004,
		severity: DiagnosticSeverity.Error,
		category: DiagnosticCategory.API,
		message: (args) => `Sprite not found: '${args.spriteName}'`,
		description: "The requested sprite does not exist in the sprite collection",
		suggestions: ["Check if the sprite name is spelled correctly", "Verify the sprite was loaded before use", "Check if the sprite is in the correct namespace"],
	},
	[APIErrorCode.E7005]: {
		code: APIErrorCode.E7005,
		severity: DiagnosticSeverity.Error,
		category: DiagnosticCategory.API,
		message: (args) => `Sprite '${args.spriteName}' is not ready`,
		description: "The sprite exists but has not finished loading",
		suggestions: ["Wait for the sprite to finish loading", "Check sprite.ready before using it", "Use a callback or promise to wait for loading"],
	},
	[APIErrorCode.E7006]: {
		code: APIErrorCode.E7006,
		severity: DiagnosticSeverity.Error,
		category: DiagnosticCategory.API,
		message: (args) => `Invalid font: '${args.font}'`,
		description: "The font name is invalid or not available",
		suggestions: ["Use a valid font name", "Check if the font is loaded", "Use a fallback font"],
	},
	[APIErrorCode.E7007]: {
		code: APIErrorCode.E7007,
		severity: DiagnosticSeverity.Error,
		category: DiagnosticCategory.API,
		message: (args) => `Invalid blend mode: '${args.blendMode}'`,
		description: "The blend mode is not supported",
		suggestions: ["Use a valid blend mode: 'normal', 'additive', 'multiply', etc.", "Check the list of supported blend modes"],
	},
};
