import {
	DocumentFormattingParams,
	TextEdit,
	Range,
	Position,
} from "vscode-languageserver/node";
import { TextDocument } from "vscode-languageserver-textdocument";
import { TextDocuments } from "vscode-languageserver/node";
import { getDocumentSettings } from "../settings";
import { Connection } from "vscode-languageserver/node";

export function setupFormattingHandler(
	connection: Connection,
	documents: TextDocuments<TextDocument>,
	hasConfigurationCapability: boolean,
) {
	connection.onDocumentFormatting(async (params: DocumentFormattingParams) => {
		const doc = documents.get(params.textDocument.uri);
		if (!doc) return [];
		const settings = await getDocumentSettings(
			connection,
			hasConfigurationCapability,
			params.textDocument.uri,
		);
		if (!settings.format.enable) {
			return [];
		}
		const text = doc.getText();
		const lines = text.split(/\r?\n/);
		const indentWidth = Math.max(settings.format.indentSize, 1);
		const indentUnit = params.options.insertSpaces
			? " ".repeat(indentWidth)
			: "	".repeat(indentWidth);
		let indent = 0;
		const formatted = lines.map((line) => {
			let trimmed = line.trim();
			if (/^(end|else|elseif)/.test(trimmed)) {
				indent = Math.max(indent - 1, 0);
			}
			const formattedLine = `${indentUnit.repeat(indent)}${trimmed}`;
			if (
				/(then|do|function|repeat)\b.*$/.test(trimmed) &&
				!trimmed.includes("end")
			) {
				indent++;
			}
			return formattedLine;
		});
		const fullRange = Range.create(
			Position.create(0, 0),
			doc.positionAt(text.length),
		);
		return [TextEdit.replace(fullRange, formatted.join("\n"))];
	});
}
