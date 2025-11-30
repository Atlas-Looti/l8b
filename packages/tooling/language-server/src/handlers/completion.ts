import {
	type CompletionItem,
	CompletionItemKind,
	type CompletionList,
	type Connection,
	InsertTextFormat,
	type TextDocuments,
} from "vscode-languageserver/node";
import type { TextDocument } from "vscode-languageserver-textdocument";
import { GLOBAL_API } from "../api-definitions/index";
import { getDocumentStates } from "../document-state";
import type { LanguageModes } from "../embedded/mode-manager";
import { getDocumentSettings } from "../settings";
import { detectCompletionContext } from "../utils";

export function setupCompletionHandlers(
	connection: Connection,
	documents: TextDocuments<TextDocument>,
	languageModes: LanguageModes,
	hasConfigurationCapability: boolean,
) {
	// This handler provides the initial list of the completion items.
	connection.onCompletion(async (params: any): Promise<CompletionItem[] | CompletionList | null> => {
		const uri = params.textDocument.uri;
		const document = documents.get(uri);
		if (!document) {
			return null;
		}

		const settings = await getDocumentSettings(connection, hasConfigurationCapability, uri);
		if (!settings.completion.enable) {
			return null;
		}

		const position = params.position;

		// Check if we're in an embedded language region
		const mode = languageModes.getModeAtPosition(document, position);
		if (mode && mode.doComplete) {
			const result = await mode.doComplete(document, position);
			if (result) {
				return result;
			}
		}

		// Detect completion context
		const context = detectCompletionContext(document, position);

		// Property access completion (e.g., screen.drawSprite)
		if (context.type === "property" && context.object) {
			return getPropertyCompletions(context.object);
		}

		// Default LootiScript completion
		const documentStates = getDocumentStates();
		const state = documentStates.get(uri);
		const items: CompletionItem[] = [];

		// Add code snippets (high priority)
		items.push(...getSnippetCompletions());

		// Local symbols get highest priority (sortText: "0")
		// These are user-defined variables and functions in current scope
		state?.symbols.forEach((symbol) => {
			items.push({
				label: symbol.name,
				kind: symbol.type === "function" ? CompletionItemKind.Function : CompletionItemKind.Variable,
				detail: symbol.type,
				data: symbol.name,
				sortText: `0_${symbol.name}`, // Priority: local symbols
			});
		});

		// Global APIs get medium priority (sortText: "1")
		// Includes screen, audio, keyboard, etc.
		for (const [name, info] of Object.entries(GLOBAL_API)) {
			items.push({
				label: name,
				kind: info.type === "function" ? CompletionItemKind.Function : CompletionItemKind.Class,
				detail: info.description,
				documentation: info.signature,
				data: name,
				sortText: `1_${name}`, // Priority: globals
			});
		}

		// Keywords get lower priority (sortText: "2")
		// Prevents keywords from overshadowing user symbols
		["function", "return", "local", "global", "if", "then", "else", "end", "while", "for"].forEach((keyword) => {
			items.push({
				label: keyword,
				kind: CompletionItemKind.Keyword,
				data: keyword,
				sortText: `2_${keyword}`, // Priority: keywords
			});
		});

		return items;
	});

	// This handler resolves additional information for the item selected in
	// the completion list.
	connection.onCompletionResolve((item: CompletionItem): CompletionItem => {
		const info = GLOBAL_API[item.data as string];
		if (info) {
			item.detail = info.signature || info.type;
			item.documentation = info.description;
		}
		return item;
	});
}

/**
 * Get property completions for an object
 */
function getPropertyCompletions(objectName: string): CompletionItem[] {
	const api = GLOBAL_API[objectName];
	const items: CompletionItem[] = [];

	if (api && api.properties) {
		for (const [propName, propInfo] of Object.entries(api.properties)) {
			items.push({
				label: propName,
				kind: propInfo.type === "method" ? CompletionItemKind.Method : CompletionItemKind.Property,
				detail: propInfo.description,
				documentation: propInfo.signature,
				insertText: propInfo.type === "method" ? `${propName}($0)` : propName,
				insertTextFormat: propInfo.type === "method" ? InsertTextFormat.Snippet : InsertTextFormat.PlainText,
			});
		}
	}

	return items;
}

/**
 * Get code snippet completions
 */
function getSnippetCompletions(): CompletionItem[] {
	return [
		{
			label: "func",
			kind: CompletionItemKind.Snippet,
			detail: "Function definition",
			insertText: "${1:name} = function(${2:args})\n\t${3:// body}\nend",
			insertTextFormat: InsertTextFormat.Snippet,
			documentation: "Creates a new function",
		},
		{
			label: "update",
			kind: CompletionItemKind.Snippet,
			detail: "Update loop function",
			insertText: "update = function()\n\t${1:// update logic}\nend",
			insertTextFormat: InsertTextFormat.Snippet,
			documentation: "Game update loop function",
		},
		{
			label: "draw",
			kind: CompletionItemKind.Snippet,
			detail: "Draw loop function",
			insertText: "draw = function()\n\t${1:// draw logic}\nend",
			insertTextFormat: InsertTextFormat.Snippet,
			documentation: "Game draw loop function",
		},
		{
			label: "if",
			kind: CompletionItemKind.Snippet,
			detail: "If statement",
			insertText: "if ${1:condition} then\n\t${2:// code}\nend",
			insertTextFormat: InsertTextFormat.Snippet,
			documentation: "If conditional statement",
		},
		{
			label: "ifelse",
			kind: CompletionItemKind.Snippet,
			detail: "If-else statement",
			insertText: "if ${1:condition} then\n\t${2:// true}\nelse\n\t${3:// false}\nend",
			insertTextFormat: InsertTextFormat.Snippet,
			documentation: "If-else conditional statement",
		},
		{
			label: "for",
			kind: CompletionItemKind.Snippet,
			detail: "For loop",
			insertText: "for ${1:i} in ${2:list} do\n\t${3:// code}\nend",
			insertTextFormat: InsertTextFormat.Snippet,
			documentation: "For loop iteration",
		},
		{
			label: "while",
			kind: CompletionItemKind.Snippet,
			detail: "While loop",
			insertText: "while ${1:condition} do\n\t${2:// code}\nend",
			insertTextFormat: InsertTextFormat.Snippet,
			documentation: "While loop",
		},
	];
}
