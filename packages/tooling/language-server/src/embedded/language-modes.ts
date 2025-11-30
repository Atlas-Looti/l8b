import type { CompletionItem, CompletionList, Diagnostic, DocumentSymbol, Hover } from "vscode-languageserver/node";
import { type Position, TextDocument } from "vscode-languageserver-textdocument";

/**
 * Language mode interface for handling embedded languages
 */
export interface LanguageMode {
	getId(): string;
	doComplete?(document: TextDocument, position: Position): CompletionList | CompletionItem[] | null | Promise<CompletionList | CompletionItem[] | null>;
	doHover?(document: TextDocument, position: Position): Hover | null | Promise<Hover | null>;
	doValidation?(document: TextDocument): Diagnostic[] | Promise<Diagnostic[]>;
	findDocumentSymbols?(document: TextDocument): DocumentSymbol[] | Promise<DocumentSymbol[]>;
}

/**
 * Language region represents an embedded language section in a document
 */
export interface LanguageRegion {
	languageId: string;
	start: number;
	end: number;
	startLine: number;
	startCharacter: number;
	endLine: number;
	endCharacter: number;
}

/**
 * Document regions manager - tracks embedded language regions in a document
 */
export class DocumentRegions {
	private regions: LanguageRegion[] = [];

	constructor(private document: TextDocument) {
		this.scanRegions();
	}

	/**
	 * Scan document for embedded language regions
	 * Currently supports:
	 * - JSON in `json` blocks: ```json ... ```
	 * - JSON in JSON.parse() calls
	 * - Template string interpolation
	 */
	private scanRegions(): void {
		const text = this.document.getText();
		const lines = text.split("\n");

		// Scan for ```json code blocks
		let inJsonBlock = false;
		let jsonBlockStart = 0;

		for (let i = 0; i < lines.length; i++) {
			const line = lines[i];
			const jsonBlockMatch = line.match(/^```(json|JSON)$/);
			const jsonBlockEnd = line.match(/^```$/);

			if (jsonBlockMatch && !inJsonBlock) {
				inJsonBlock = true;
				jsonBlockStart = i;
			} else if (jsonBlockEnd && inJsonBlock) {
				// Calculate positions
				const startOffset = this.document.offsetAt({
					line: jsonBlockStart,
					character: 0,
				});
				const endOffset = this.document.offsetAt({
					line: i,
					character: 0,
				});

				this.regions.push({
					languageId: "json",
					start: startOffset,
					end: endOffset,
					startLine: jsonBlockStart,
					startCharacter: 0,
					endLine: i,
					endCharacter: 0,
				});

				inJsonBlock = false;
			}
		}

		// Scan for JSON.parse("...") patterns
		const jsonParseRegex = /JSON\.parse\s*\(\s*(["'`])((?:\\.|(?!\1).)*)\1\s*\)/gs;
		let match;
		while ((match = jsonParseRegex.exec(text)) !== null) {
			const startOffset = match.index + match[0].indexOf(match[2]);
			const endOffset = startOffset + match[2].length;

			const startPos = this.document.positionAt(startOffset);
			const endPos = this.document.positionAt(endOffset);

			this.regions.push({
				languageId: "json",
				start: startOffset,
				end: endOffset,
				startLine: startPos.line,
				startCharacter: startPos.character,
				endLine: endPos.line,
				endCharacter: endPos.character,
			});
		}
	}

	/**
	 * Get the language mode at a given position
	 */
	getLanguageAtPosition(position: Position): string | null {
		const offset = this.document.offsetAt(position);

		for (const region of this.regions) {
			if (offset >= region.start && offset <= region.end) {
				return region.languageId;
			}
		}

		return null;
	}

	/**
	 * Get all regions for a specific language
	 */
	getRegionsForLanguage(languageId: string): LanguageRegion[] {
		return this.regions.filter((r) => r.languageId === languageId);
	}

	/**
	 * Get embedded document content for a specific language
	 * Replaces all non-matching regions with whitespace
	 */
	getEmbeddedDocument(languageId: string): TextDocument {
		const text = this.document.getText();
		const languageRegions = this.getRegionsForLanguage(languageId);

		// If no regions for this language, return empty document
		if (languageRegions.length === 0) {
			return TextDocument.create(
				this.document.uri + "." + languageId,
				languageId,
				this.document.version,
				"", // Empty content
			);
		}

		// Build virtual document with only the matching language content
		let result = "";
		let lastOffset = 0;

		// Sort regions by start position
		const sortedRegions = [...languageRegions].sort((a, b) => a.start - b.start);

		for (const region of sortedRegions) {
			// Add whitespace for content before this region
			if (region.start > lastOffset) {
				result += " ".repeat(region.start - lastOffset);
			}

			// Add region content
			result += text.substring(region.start, region.end);
			lastOffset = region.end;
		}

		// Add whitespace for remaining content
		if (lastOffset < text.length) {
			result += " ".repeat(text.length - lastOffset);
		}

		return TextDocument.create(this.document.uri + "." + languageId, languageId, this.document.version, result);
	}

	/**
	 * Check if position is inside any embedded region
	 */
	isInEmbeddedRegion(position: Position): boolean {
		return this.getLanguageAtPosition(position) !== null;
	}
}
