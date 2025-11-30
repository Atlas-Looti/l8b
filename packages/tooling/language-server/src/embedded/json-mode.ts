import { getLanguageService, type LanguageService } from "vscode-json-languageservice";
import type { CompletionList, Diagnostic, DocumentSymbol, Hover, Position } from "vscode-languageserver/node";
import type { TextDocument } from "vscode-languageserver-textdocument";
import type { LanguageMode } from "./language-modes";
import type { DocumentRegionsCache } from "./mode-manager";

/**
 * JSON language mode for embedded JSON support
 */
export function getJSONMode(jsonLanguageService: LanguageService, documentRegionsCache: DocumentRegionsCache): LanguageMode {
	return {
		getId() {
			return "json";
		},

		async doComplete(document: TextDocument, position: Position): Promise<CompletionList | null> {
			// Get virtual JSON document with all non-JSON content replaced with whitespace
			const documentRegions = documentRegionsCache.get(document);
			const embedded = documentRegions.getEmbeddedDocument("json");

			// Parse JSON document
			const jsonDocument = jsonLanguageService.parseJSONDocument(embedded);

			// Get completions
			const completions = await jsonLanguageService.doComplete(embedded, position, jsonDocument);

			return completions;
		},

		async doHover(document: TextDocument, position: Position): Promise<Hover | null> {
			const documentRegions = documentRegionsCache.get(document);
			const embedded = documentRegions.getEmbeddedDocument("json");
			const jsonDocument = jsonLanguageService.parseJSONDocument(embedded);

			return await jsonLanguageService.doHover(embedded, position, jsonDocument);
		},

		async doValidation(document: TextDocument): Promise<Diagnostic[]> {
			const documentRegions = documentRegionsCache.get(document);
			const embedded = documentRegions.getEmbeddedDocument("json");
			const jsonDocument = jsonLanguageService.parseJSONDocument(embedded);

			return await jsonLanguageService.doValidation(embedded, jsonDocument, {
				schemaValidation: "error",
			});
		},

		findDocumentSymbols(document: TextDocument): DocumentSymbol[] {
			const documentRegions = documentRegionsCache.get(document);
			const embedded = documentRegions.getEmbeddedDocument("json");
			const jsonDocument = jsonLanguageService.parseJSONDocument(embedded);

			// Use findDocumentSymbols2 which returns DocumentSymbol[] instead of SymbolInformation[]
			return jsonLanguageService.findDocumentSymbols2(embedded, jsonDocument);
		},
	};
}

/**
 * Create JSON language service instance
 */
export function createJSONLanguageService(): LanguageService {
	return getLanguageService({
		schemaRequestService: async (_uri: string): Promise<string> => {
			// Return empty schema for now
			// Can be extended to load schemas from URLs
			return "";
		},
		workspaceContext: {
			resolveRelativePath: (relativePath: string, resource: string) => {
				// Simple path resolution
				const base = resource.substring(0, resource.lastIndexOf("/"));
				return base + "/" + relativePath;
			},
		},
	});
}
