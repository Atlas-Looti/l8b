/**
 * Palette API error message templates (E7071-E7080)
 */

import { APIErrorCode } from "../../codes";
import { DiagnosticCategory, DiagnosticSeverity, type MessageTemplate } from "../../types";

export const paletteMessages: Record<string, MessageTemplate> = {
	[APIErrorCode.E7071]: {
		code: APIErrorCode.E7071,
		severity: DiagnosticSeverity.Error,
		category: DiagnosticCategory.API,
		message: (args) => `Palette not found: '${args.paletteName}'`,
		description: "The requested palette does not exist",
		suggestions: ["Check if the palette name is correct", "Verify the palette was loaded", "Check palette loading order"],
	},
	[APIErrorCode.E7072]: {
		code: APIErrorCode.E7072,
		severity: DiagnosticSeverity.Error,
		category: DiagnosticCategory.API,
		message: (args) => `Invalid palette format: ${args.format || "unknown"}`,
		description: "The palette format is not supported",
		suggestions: ["Use a supported palette format", "Check palette format documentation", "Verify the palette file format"],
	},
	[APIErrorCode.E7073]: {
		code: APIErrorCode.E7073,
		severity: DiagnosticSeverity.Error,
		category: DiagnosticCategory.API,
		message: (args) => `Invalid color index: ${args.index} (valid range: 0-${args.maxIndex || 255})`,
		description: "The color index is out of palette range",
		suggestions: ["Check color index is within palette range", "Verify palette size", "Use a valid color index"],
	},
	[APIErrorCode.E7074]: {
		code: APIErrorCode.E7074,
		severity: DiagnosticSeverity.Error,
		category: DiagnosticCategory.API,
		message: (args) => `Palette loading failed: ${args.paletteName || "unknown"}`,
		description: "The palette could not be loaded",
		suggestions: ["Check if the palette file exists", "Verify the palette file format", "Check file permissions", "Check network connection if loading from URL"],
	},
	[APIErrorCode.E7075]: {
		code: APIErrorCode.E7075,
		severity: DiagnosticSeverity.Error,
		category: DiagnosticCategory.API,
		message: (args) => `Invalid palette size: ${args.size || "unknown"} (expected: ${args.expectedSize || "256"})`,
		description: "The palette size is invalid",
		suggestions: ["Check palette size matches expected size", "Verify palette data is complete", "Check palette initialization"],
	},
};
