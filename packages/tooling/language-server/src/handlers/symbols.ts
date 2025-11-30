import {
	type DefinitionParams,
	type DocumentSymbolParams,
	Location,
	type ReferenceParams,
	type RenameParams,
	type SymbolInformation,
	SymbolKind,
	type TextEdit,
	type WorkspaceEdit,
} from "vscode-languageserver/node";
import { getDocumentStates } from "../document-state";
import type { SymbolInfo } from "../types";
import { getWordAtPosition } from "../utils";

export function setupSymbolHandlers(connection: any) {
	connection.onDefinition((params: DefinitionParams) => {
		const documentStates = getDocumentStates();
		const state = documentStates.get(params.textDocument.uri);
		if (!state) return [];
		const word = getWordAtPosition(state.textDocument, params.position);
		if (!word) return [];
		const symbol = findSymbolByName(state, word);
		if (!symbol) return [];
		return Location.create(symbol.documentUri, symbol.range);
	});

	connection.onDocumentSymbol((params: DocumentSymbolParams) => {
		const documentStates = getDocumentStates();
		const state = documentStates.get(params.textDocument.uri);
		if (!state) return [];
		return state.symbols.map((symbol) => ({
			name: symbol.name,
			kind: symbol.type === "function" ? SymbolKind.Function : SymbolKind.Variable,
			location: Location.create(symbol.documentUri, symbol.range),
		}));
	});

	connection.onWorkspaceSymbol(() => {
		const documentStates = getDocumentStates();
		const infos: SymbolInformation[] = [];
		for (const state of documentStates.values()) {
			state.symbols.forEach((symbol) => {
				infos.push({
					name: symbol.name,
					kind: symbol.type === "function" ? SymbolKind.Function : SymbolKind.Variable,
					location: Location.create(symbol.documentUri, symbol.range),
				});
			});
		}
		return infos;
	});

	// Find all references to a symbol across the workspace
	connection.onReferences((params: ReferenceParams) => {
		const documentStates = getDocumentStates();
		const state = documentStates.get(params.textDocument.uri);
		if (!state) return [];

		const word = getWordAtPosition(state.textDocument, params.position);
		if (!word) return [];

		const references: Location[] = [];

		// Search across all open documents in the workspace
		for (const [uri, docState] of documentStates) {
			const text = docState.textDocument.getText();
			const regex = new RegExp(`\\b${word}\\b`, "g");
			let match;

			while ((match = regex.exec(text))) {
				const start = docState.textDocument.positionAt(match.index);
				const end = docState.textDocument.positionAt(match.index + word.length);
				references.push(
					Location.create(uri, {
						start,
						end,
					}),
				);
			}
		}

		return references;
	});

	connection.onRenameRequest((params: RenameParams): WorkspaceEdit | null => {
		const documentStates = getDocumentStates();
		const state = documentStates.get(params.textDocument.uri);
		if (!state) return null;
		const word = getWordAtPosition(state.textDocument, params.position);
		if (!word) return null;
		const edits: TextEdit[] = [];
		const text = state.textDocument.getText();
		const regex = new RegExp(`\\b${word}\\b`, "g");
		let match;
		while ((match = regex.exec(text))) {
			const start = state.textDocument.positionAt(match.index);
			const end = state.textDocument.positionAt(match.index + word.length);
			edits.push({
				range: {
					start,
					end,
				},
				newText: params.newName,
			});
		}
		return {
			changes: {
				[params.textDocument.uri]: edits,
			},
		};
	});
}

function findSymbolByName(
	state: {
		symbols: SymbolInfo[];
	},
	name: string,
): SymbolInfo | undefined {
	return state.symbols.find((sym) => sym.name === name);
}
