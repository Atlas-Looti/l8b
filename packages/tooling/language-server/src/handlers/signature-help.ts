import { type Connection, type ParameterInformation, Position, type SignatureHelp, SignatureInformation, type TextDocuments } from "vscode-languageserver/node";
import type { TextDocument } from "vscode-languageserver-textdocument";
import { GLOBAL_API } from "../api-definitions/index";
import { getDocumentSettings } from "../settings";

export function setupSignatureHelpHandler(connection: Connection, documents: TextDocuments<TextDocument>, hasConfigurationCapability: boolean) {
	// Signature help provides parameter information when typing function calls
	connection.onSignatureHelp(async (params): Promise<SignatureHelp | null> => {
		const document = documents.get(params.textDocument.uri);
		if (!document) return null;

		const settings = await getDocumentSettings(connection, hasConfigurationCapability, params.textDocument.uri);
		if (!settings.signatureHelp.enable) {
			return null;
		}

		const line = document.getText({
			start: Position.create(params.position.line, 0),
			end: Position.create(params.position.line, params.position.character),
		});

		// Extract function name from the line
		const functionMatch = line.match(/([A-Za-z_][A-Za-z0-9_.]*)\s*\([^)]*$/);
		if (!functionMatch) return null;

		const functionName = functionMatch[1];

		// Check if it's a method call (e.g., screen.drawSprite)
		const parts = functionName.split(".");
		let signature: string | undefined;
		let description: string | undefined;

		if (parts.length === 2) {
			// Property method call
			const [objectName, methodName] = parts;
			const api = GLOBAL_API[objectName];
			if (api && api.properties && api.properties[methodName]) {
				signature = api.properties[methodName].signature;
				description = api.properties[methodName].description;
			}
		} else {
			// Global function call
			const api = GLOBAL_API[functionName];
			if (api) {
				signature = api.signature;
				description = api.description;
			}
		}

		if (!signature) return null;

		// Parse signature to extract parameters
		const paramMatch = signature.match(/\(([^)]*)\)/);
		const paramsStr = paramMatch ? paramMatch[1] : "";
		const parameters: ParameterInformation[] = paramsStr
			.split(",")
			.filter((p) => p.trim())
			.map((param) => ({
				label: param.trim(),
			}));

		// Count commas to determine active parameter
		const commaCount = (line.match(/,/g) || []).length;
		const activeParameter = Math.min(commaCount, parameters.length - 1);

		return {
			signatures: [SignatureInformation.create(signature, description, ...parameters)],
			activeSignature: 0,
			activeParameter: activeParameter >= 0 ? activeParameter : 0,
		};
	});
}
