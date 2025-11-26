import {
	CodeActionParams,
	CodeAction,
	CodeActionKind,
	TextEdit,
	Position,
} from "vscode-languageserver/node";
import { TextDocument } from "vscode-languageserver-textdocument";
import { TextDocuments } from "vscode-languageserver/node";
import { getWordAtPosition } from "../utils";

export function setupCodeActionsHandler(
	connection: any,
	documents: TextDocuments<TextDocument>,
) {
	connection.onCodeAction((params: CodeActionParams): CodeAction[] => {
		const actions: CodeAction[] = [];

		for (const diagnostic of params.context.diagnostics) {
			const message = diagnostic.message.toLowerCase();
			const errorCode = diagnostic.code as string | undefined;

			// Enhanced quick fixes based on error codes
			if (errorCode === "E1001" || errorCode === "E1003") {
				// Unterminated function or missing 'end'
				// Try to find where to insert 'end' - after the error line
				const document = documents.get(params.textDocument.uri);
				if (document) {
					const errorLine = diagnostic.range.end.line;

					// Find the end of the line or next non-empty line
					let insertLine = errorLine + 1;
					while (insertLine < document.lineCount) {
						const nextLine = document.getText({
							start: { line: insertLine, character: 0 },
							end: { line: insertLine, character: Number.MAX_SAFE_INTEGER },
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
								[params.textDocument.uri]: [
									TextEdit.insert(Position.create(insertLine, 0), "end\n"),
								],
							},
						},
						diagnostics: [diagnostic],
					});
				}
			}

			// Quick fix: Too many 'end' (E1002)
			if (errorCode === "E1002" || message.includes("too many 'end'")) {
				actions.push({
					title: "Remove extra 'end' statement",
					kind: CodeActionKind.QuickFix,
					edit: {
						changes: {
							[params.textDocument.uri]: [
								TextEdit.replace(diagnostic.range, ""),
							],
						},
					},
					diagnostics: [diagnostic],
				});
			}

			// Quick fix: Missing 'end' keyword (generic)
			if (
				(message.includes("unterminated") ||
					message.includes("missing 'end'")) &&
				!errorCode
			) {
				actions.push({
					title: "Insert 'end'",
					kind: CodeActionKind.QuickFix,
					edit: {
						changes: {
							[params.textDocument.uri]: [
								TextEdit.insert(
									Position.create(diagnostic.range.end.line + 1, 0),
									"end\n",
								),
							],
						},
					},
					diagnostics: [diagnostic],
				});
			}

			// Quick fix: Undefined variable - suggest declaration
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
									[params.textDocument.uri]: [
										TextEdit.insert(
											Position.create(diagnostic.range.start.line, 0),
											`local ${word} = nil\n`,
										),
									],
								},
							},
							diagnostics: [diagnostic],
						});
					}
				}
			}
		}

		// Refactor action: Extract to function (if there's a selection)
		if (
			params.range &&
			(params.range.start.line !== params.range.end.line ||
				params.range.start.character !== params.range.end.character)
		) {
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
									TextEdit.insert(
										Position.create(document.lineCount, 0),
										`\n\nextracted_function = function()\n\t${selectedText.replace(/\n/g, "\n\t")}\nend\n`,
									),
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
