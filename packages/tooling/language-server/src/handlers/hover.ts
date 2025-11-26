import { Hover } from "vscode-languageserver/node";
import { TextDocument } from "vscode-languageserver-textdocument";
import { TextDocuments } from "vscode-languageserver/node";
import { HoverParams } from "vscode-languageserver-protocol";
import { LanguageModes } from "../embedded/mode-manager";
import { getDocumentStates } from "../document-state";
import { GLOBAL_API } from "../api-definitions/index";
import { getWordAtPosition } from "../utils";
import { SymbolInfo } from "../types";

export function setupHoverHandler(
	connection: any,
	documents: TextDocuments<TextDocument>,
	languageModes: LanguageModes,
) {
	connection.onHover(async (params: HoverParams): Promise<Hover | null> => {
		const document = documents.get(params.textDocument.uri);
		if (!document) return null;

		// Check if we're in an embedded language region
		try {
			const mode = languageModes.getModeAtPosition(document, params.position);
			if (mode && mode.doHover) {
				const result = await mode.doHover(document, params.position);
				if (result) {
					return result;
				}
			}
		} catch (error: any) {
			// Log error but continue with default hover
			connection.console?.error(
				`Hover error in embedded mode: ${error?.message || error}`,
			);
		}

		// Default LootiScript hover
		const documentStates = getDocumentStates();
		const state = documentStates.get(params.textDocument.uri);
		if (!state) return null;
		const word = getWordAtPosition(state.textDocument, params.position);
		if (!word) return null;

		const symbol = findSymbolByName(state, word);
		if (symbol) {
			return {
				contents: {
					kind: "markdown",
					value: `**${symbol.name}** (${symbol.type})`,
				},
			};
		}

		const globalInfo = GLOBAL_API[word];
		if (globalInfo) {
			return {
				contents: {
					kind: "markdown",
					value: `**${word}** - ${globalInfo.description}\n\n${globalInfo.signature || ""}`,
				},
			};
		}

		return null;
	});
}

function findSymbolByName(
	state: { symbols: SymbolInfo[] },
	name: string,
): SymbolInfo | undefined {
	return state.symbols.find((sym) => sym.name === name);
}
