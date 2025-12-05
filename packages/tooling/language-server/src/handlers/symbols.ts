import {
	type Connection,
	type DocumentSymbolParams,
	Location,
	type SymbolInformation,
	SymbolKind,
} from "vscode-languageserver/node";
import { getDocumentStates } from "../document-state";
import type { SymbolInfo } from "../types";

export function setupSymbolHandlers(connection: Connection) {
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
}
