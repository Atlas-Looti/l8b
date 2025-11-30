/**
 * Asset API error message templates (E7041-E7050)
 */

import { APIErrorCode } from "../../codes";
import { DiagnosticCategory, DiagnosticSeverity, type MessageTemplate } from "../../types";

export const assetMessages: Record<string, MessageTemplate> = {
	[APIErrorCode.E7041]: {
		code: APIErrorCode.E7041,
		severity: DiagnosticSeverity.Error,
		category: DiagnosticCategory.API,
		message: (args) => `Asset not found: '${args.assetName}'`,
		description: "The requested asset does not exist",
		suggestions: ["Check if the asset name is correct", "Verify the asset was loaded", "Check asset loading order"],
	},
	[APIErrorCode.E7042]: {
		code: APIErrorCode.E7042,
		severity: DiagnosticSeverity.Error,
		category: DiagnosticCategory.API,
		message: (args) => `Asset loading failed: ${args.assetName || "unknown"}`,
		description: "The asset could not be loaded",
		suggestions: ["Check if the asset URL is correct", "Verify the file exists", "Check network connection", "Check CORS settings"],
	},
	[APIErrorCode.E7043]: {
		code: APIErrorCode.E7043,
		severity: DiagnosticSeverity.Error,
		category: DiagnosticCategory.API,
		message: (args) => `Invalid asset type: '${args.assetType}'`,
		description: "The asset type is not supported",
		suggestions: ["Use a supported asset type", "Check asset type documentation"],
	},
	[APIErrorCode.E7044]: {
		code: APIErrorCode.E7044,
		severity: DiagnosticSeverity.Error,
		category: DiagnosticCategory.API,
		message: (args) => `Asset '${args.assetName}' is not ready`,
		description: "The asset exists but has not finished loading",
		suggestions: ["Wait for the asset to finish loading", "Check asset.ready before using it"],
	},
};
