import { TextDocument } from "vscode-languageserver-textdocument";
import { Diagnostic, DiagnosticSeverity, Range } from "vscode-languageserver/node";
import { Parser } from "@l8b/lootiscript/dist/v1/parser";
import { formatForLSP, createDiagnostic } from "@l8b/diagnostics";
import { Connection } from "vscode-languageserver/node";
import { LanguageModes, DocumentRegionsCache } from "./embedded/mode-manager";
import { GLOBAL_API, API_ACCESS_REGEX } from "./api-definitions/index";
import { getClosestPropertySuggestion } from "./utils";
import { getDocumentSettings } from "./settings";

export async function validateTextDocument(
	textDocument: TextDocument,
	connection: Connection,
	hasConfigurationCapability: boolean,
	languageModes: LanguageModes,
	documentRegionsCache: DocumentRegionsCache,
): Promise<void> {
	const settings = await getDocumentSettings(
		connection,
		hasConfigurationCapability,
		textDocument.uri,
	);
	if (!settings.diagnostics.enable) {
		connection.sendDiagnostics({ uri: textDocument.uri, diagnostics: [] });
		return;
	}
	const text = textDocument.getText();
	const diagnostics: Diagnostic[] = [];

	// Validate embedded languages (only if they exist in document)
	const documentRegions = documentRegionsCache.get(textDocument);
	const allModes = languageModes.getAllModes();
	for (const mode of allModes) {
		if (mode.doValidation) {
			// Check if this mode's language actually exists in the document
			const embeddedDoc = documentRegions.getEmbeddedDocument(mode.getId());
			const hasEmbeddedContent = embeddedDoc.getText().trim().length > 0;

			if (hasEmbeddedContent) {
				const embeddedDiagnostics = await mode.doValidation(textDocument);
				diagnostics.push(...embeddedDiagnostics);
			}
		}
	}

	// Validate LootiScript
	try {
		const parser = new Parser(text, textDocument.uri);
		parser.parse();

		if ((parser as any).error_info) {
			const err = (parser as any).error_info;

			// Use diagnostics package to create and format diagnostic
			const diagnosticData = createDiagnostic(err.code || "E1004", {
				file: textDocument.uri,
				line: err.line,
				column: err.column,
				length: err.length,
				context: err.context,
				suggestions: err.suggestions,
				related: err.related
					? {
							file: textDocument.uri,
							line: err.related.line,
							column: err.related.column,
							message: err.related.message || "Related location",
						}
					: undefined,
				data: {
					error: err.error,
				},
			});

			// Format for LSP using diagnostics formatter
			const lspDiagnostic = formatForLSP(diagnosticData);
			diagnostics.push(lspDiagnostic as Diagnostic);
		}
	} catch (e: any) {
		const diagnostic: Diagnostic = {
			severity: DiagnosticSeverity.Error,
			range: {
				start: { line: 0, character: 0 },
				end: { line: 0, character: 10 },
			},
			message: e.message || "Unknown parser error",
			source: "lootiscript",
		};
		diagnostics.push(diagnostic);
	}

	validateApiUsage(textDocument, diagnostics);

	connection.sendDiagnostics({ uri: textDocument.uri, diagnostics });
}

function validateApiUsage(
	textDocument: TextDocument,
	diagnostics: Diagnostic[],
): void {
	const text = textDocument.getText();
	API_ACCESS_REGEX.lastIndex = 0;

	const seenPositions = new Set<number>();
	let match: RegExpExecArray | null;

	while ((match = API_ACCESS_REGEX.exec(text))) {
		const matchIndex = match.index;
		if (seenPositions.has(matchIndex)) {
			continue;
		}
		seenPositions.add(matchIndex);

		const objectName = match[1];
		const propertyName = match[2];
		const api = GLOBAL_API[objectName];
		if (!api || !api.properties) {
			continue;
		}

		if (api.properties[propertyName]) {
			continue;
		}

		const prevChar = matchIndex > 0 ? text[matchIndex - 1] : "";
		if (prevChar === '"' || prevChar === "'" || prevChar === "`") {
			continue;
		}

		const propertyStart = matchIndex + objectName.length + 1;
		const propertyEnd = propertyStart + propertyName.length;

		const suggestion = getClosestPropertySuggestion(
			propertyName,
			Object.keys(api.properties),
		);

		const message = suggestion
			? `Unknown property '${propertyName}' on ${objectName}. Did you mean '${suggestion}'?`
			: `Unknown property '${propertyName}' on ${objectName}.`;

		diagnostics.push({
			severity: DiagnosticSeverity.Error,
			range: Range.create(
				textDocument.positionAt(propertyStart),
				textDocument.positionAt(propertyEnd),
			),
			message,
			source: "lootiscript",
			code: "API1001",
		});
	}
}

