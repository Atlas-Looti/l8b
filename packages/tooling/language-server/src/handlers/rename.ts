import {
	type Connection,
	Position,
	type PrepareRenameParams,
	Range,
	type RenameParams,
	type TextDocuments,
	TextEdit,
	type WorkspaceEdit,
} from "vscode-languageserver/node";
import type { TextDocument } from "vscode-languageserver-textdocument";
import { getWordAtPosition } from "../document-state";

// Reserved keywords that cannot be used as identifiers
const RESERVED_KEYWORDS = [
	"function",
	"end",
	"if",
	"then",
	"else",
	"elsif",
	"for",
	"to",
	"by",
	"in",
	"while",
	"do",
	"return",
	"break",
	"continue",
	"local",
	"var",
	"let",
	"and",
	"or",
	"not",
	"true",
	"false",
	"null",
	"object",
	"class",
	"extends",
	"new",
	"delete",
	"after",
	"every",
	"sleep",
];

// Global API names that should not be renamed
const API_RESERVED = [
	"screen",
	"audio",
	"keyboard",
	"mouse",
	"touch",
	"gamepad",
	"sprites",
	"maps",
	"sounds",
	"music",
	"assets",
	"system",
	"storage",
	"scene",
	"route",
	"router",
	"print",
	"List",
	"Math",
	"String",
	"JSON",
	"Random",
	"ObjectPool",
	"Image",
	"Sprite",
	"Map",
	"Sound",
];

export function setupRenameHandler(connection: Connection, documents: TextDocuments<TextDocument>) {
	// Prepare rename - validate if symbol can be renamed
	connection.onPrepareRename(
		(
			params: PrepareRenameParams,
		):
			| Range
			| {
					range: Range;
					placeholder: string;
			  }
			| null => {
			try {
				const document = documents.get(params.textDocument.uri);
				if (!document) return null;

				const word = getWordAtPosition(document, params.position);
				if (!word) return null;

				// Check if it's a reserved keyword or API name
				if (RESERVED_KEYWORDS.includes(word) || API_RESERVED.includes(word)) {
					return null; // Cannot rename reserved words
				}

				// Return range and placeholder
				const line = document.getText({
					start: Position.create(params.position.line, 0),
					end: Position.create(params.position.line + 1, 0),
				});

				const wordIndex = line.indexOf(word);
				if (wordIndex === -1) return null;

				return {
					range: Range.create(
						Position.create(params.position.line, wordIndex),
						Position.create(params.position.line, wordIndex + word.length),
					),
					placeholder: word,
				};
			} catch (error) {
				connection.console.error(`Prepare rename error: ${error instanceof Error ? error.message : String(error)}`);
				return null;
			}
		},
	);

	// Perform rename
	connection.onRenameRequest((params: RenameParams): WorkspaceEdit | null => {
		try {
			const document = documents.get(params.textDocument.uri);
			if (!document) return null;

			const word = getWordAtPosition(document, params.position);
			if (!word) return null;

			const newName = params.newName;

			// Validate new name
			if (RESERVED_KEYWORDS.includes(newName) || API_RESERVED.includes(newName)) {
				return null; // Cannot use reserved words as new name
			}

			// Find all occurrences and create edits
			const edits: TextEdit[] = [];
			const text = document.getText();
			const lines = text.split("\n");
			const wordRegex = new RegExp(`\\b${word}\\b`, "g");

			lines.forEach((line, lineIndex) => {
				let match;
				while ((match = wordRegex.exec(line)) !== null) {
					edits.push(
						TextEdit.replace(
							Range.create(Position.create(lineIndex, match.index), Position.create(lineIndex, match.index + word.length)),
							newName,
						),
					);
				}
			});

			return {
				changes: {
					[params.textDocument.uri]: edits,
				},
			};
		} catch (error) {
			connection.console.error(`Rename error: ${error instanceof Error ? error.message : String(error)}`);
			return null;
		}
	});
}
