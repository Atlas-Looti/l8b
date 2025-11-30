import { type CodeAction, CodeActionKind, type CodeActionParams, Position, type TextDocuments, TextEdit } from "vscode-languageserver/node";
import type { TextDocument } from "vscode-languageserver-textdocument";
import { getWordAtPosition } from "../utils";

export function setupCodeActionsHandler(connection: any, documents: TextDocuments<TextDocument>) {
	connection.onCodeAction((params: CodeActionParams): CodeAction[] => {
		const actions: CodeAction[] = [];

		for (const diagnostic of params.context.diagnostics) {
			const message = diagnostic.message.toLowerCase();
			const errorCode = diagnostic.code as string | undefined;

			// Quick fix for unterminated blocks (E1001, E1003)
			// Automatically inserts missing 'end' statement at appropriate location
			if (errorCode === "E1001" || errorCode === "E1003") {
				const document = documents.get(params.textDocument.uri);
				if (document) {
					const errorLine = diagnostic.range.end.line;

					// Find appropriate insertion point - skip empty lines and existing 'end' statements
					let insertLine = errorLine + 1;
					while (insertLine < document.lineCount) {
						const nextLine = document.getText({
							start: {
								line: insertLine,
								character: 0,
							},
							end: {
								line: insertLine,
								character: Number.MAX_SAFE_INTEGER,
							},
						});
						if (nextLine.trim() && !nextLine.trim().startsWith("end")) {
							break;
						}
						insertLine++;
					}

					actions.push({
						title: "Add missing 'end' to close block",
						kind: CodeActionKind.QuickFix,
						edit: {
							changes: {
								[params.textDocument.uri]: [TextEdit.insert(Position.create(insertLine, 0), "end\n")],
							},
						},
						diagnostics: [diagnostic],
					});
				}
			}

			// Quick fix for extra 'end' statements (E1002)
			// Simply removes the redundant 'end' keyword
			if (errorCode === "E1002" || message.includes("too many 'end'")) {
				actions.push({
					title: "Remove extra 'end' statement",
					kind: CodeActionKind.QuickFix,
					edit: {
						changes: {
							[params.textDocument.uri]: [TextEdit.replace(diagnostic.range, "")],
						},
					},
					diagnostics: [diagnostic],
				});
			}

			// Generic quick fix for unterminated blocks without specific error code
			// Fallback for parsers that don't provide detailed error codes
			if ((message.includes("unterminated") || message.includes("missing 'end'")) && !errorCode) {
				actions.push({
					title: "Insert 'end'",
					kind: CodeActionKind.QuickFix,
					edit: {
						changes: {
							[params.textDocument.uri]: [TextEdit.insert(Position.create(diagnostic.range.end.line + 1, 0), "end\n")],
						},
					},
					diagnostics: [diagnostic],
				});
			}

			// Quick fix for undefined variables
			// Suggests declaring the variable with 'local' keyword
			if (message.includes("undefined") || message.includes("not defined")) {
				const document = documents.get(params.textDocument.uri);
				if (document) {
					const word = getWordAtPosition(document, diagnostic.range.start);
					if (word) {
						actions.push({
							title: `Declare variable '${word}'`,
							kind: CodeActionKind.QuickFix,
							edit: {
								changes: {
									[params.textDocument.uri]: [TextEdit.insert(Position.create(diagnostic.range.start.line, 0), `local ${word} = nil\n`)],
								},
							},
							diagnostics: [diagnostic],
						});
					}
				}
			}
		}

		// Refactor action: Extract to function (if there's a selection)
		if (params.range && (params.range.start.line !== params.range.end.line || params.range.start.character !== params.range.end.character)) {
			const document = documents.get(params.textDocument.uri);
			if (document) {
				const selectedText = document.getText(params.range);
				if (selectedText.trim()) {
					actions.push({
						title: "Extract to function",
						kind: CodeActionKind.RefactorExtract,
						edit: {
							changes: {
								[params.textDocument.uri]: [
									// Replace selection with function call
									TextEdit.replace(params.range, "extracted_function()"),
									// Insert function definition at end
									TextEdit.insert(Position.create(document.lineCount, 0), `\n\nextracted_function = function()\n\t${selectedText.replace(/\n/g, "\n\t")}\nend\n`),
								],
							},
						},
					});
				}
			}
		}

		return actions;
	});
}
