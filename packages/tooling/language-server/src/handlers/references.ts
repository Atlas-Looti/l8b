import { type Connection, Location, Position, Range, type TextDocuments } from "vscode-languageserver/node";
import type { TextDocument } from "vscode-languageserver-textdocument";
import { getDocumentStates, getWordAtPosition } from "../document-state";

export function setupReferencesHandler(connection: Connection, documents: TextDocuments<TextDocument>) {
	connection.onReferences((params): Location[] | null => {
		const document = documents.get(params.textDocument.uri);
		if (!document) return null;

		const documentStates = getDocumentStates();
		const state = documentStates.get(params.textDocument.uri);
		if (!state) return null;

		const word = getWordAtPosition(document, params.position);
		if (!word) return null;

		const locations: Location[] = [];
		const text = document.getText();
		const lines = text.split("\n");

		// Find all occurrences of the word
		const wordRegex = new RegExp(`\\b${word}\\b`, "g");
		lines.forEach((line, lineIndex) => {
			let match;
			while ((match = wordRegex.exec(line)) !== null) {
				locations.push(
					Location.create(params.textDocument.uri, Range.create(Position.create(lineIndex, match.index), Position.create(lineIndex, match.index + word.length))),
				);
			}
		});

		return locations.length > 0 ? locations : null;
	});
}
