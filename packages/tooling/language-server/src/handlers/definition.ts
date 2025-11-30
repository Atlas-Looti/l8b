import { type Connection, type Definition, Location, type TextDocuments } from "vscode-languageserver/node";
import type { TextDocument } from "vscode-languageserver-textdocument";
import { getDocumentStates, getWordAtPosition } from "../document-state";

export function setupDefinitionHandler(connection: Connection, documents: TextDocuments<TextDocument>) {
	connection.onDefinition((params): Definition | null => {
		const document = documents.get(params.textDocument.uri);
		if (!document) return null;

		const documentStates = getDocumentStates();
		const state = documentStates.get(params.textDocument.uri);
		if (!state) return null;

		const word = getWordAtPosition(document, params.position);
		if (!word) return null;

		// Find symbol definition
		for (const symbol of state.symbols) {
			if (symbol.name === word) {
				return Location.create(params.textDocument.uri, symbol.range);
			}
		}

		return null;
	});
}
