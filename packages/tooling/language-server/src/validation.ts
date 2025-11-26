import { TextDocument } from "vscode-languageserver-textdocument";
import { Diagnostic, DiagnosticSeverity } from "vscode-languageserver/node";
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

		const fullPath = match[1]; // e.g., "screen", "sprites.player", "map.level1"
		const propertyName = match[2]; // e.g., "drawSprite", "invalidProperty"

		// Extract root object name (first part before first dot)
		const rootObjectName = fullPath.split(".")[0];
		const isNested = fullPath.includes(".");

		// Known runtime objects that support nested properties
		// These are not in GLOBAL_API but exist at runtime
		const knownRuntimeObjects = new Set([
			"sprites",
			"map",
			"sounds",
			"music",
			"assets",
		]);

		// For nested properties (e.g., sprites.player.x), we validate
		// by checking if the root object is known
		if (isNested) {
			const api = GLOBAL_API[rootObjectName];
			if (!api && !knownRuntimeObjects.has(rootObjectName)) {
				// Root object doesn't exist, report error
				const propertyStart = matchIndex + fullPath.length + 1;
				const startPos = textDocument.positionAt(propertyStart);

				const diagnosticData = createDiagnostic("E7100", {
					file: textDocument.uri,
					line: startPos.line + 1,
					column: startPos.character + 1,
					length: propertyName.length,
					data: {
						propertyName,
						objectName: rootObjectName,
						suggestion: undefined,
					},
				});

				const lspDiagnostic = formatForLSP(diagnosticData);
				diagnostics.push(lspDiagnostic as Diagnostic);
				continue;
			}

			// For known runtime objects (sprites, map, etc.), we always report
			// errors for nested property access since we can't validate
			// instance properties at compile time. This helps catch typos.
			// Note: This may produce false positives for valid instance properties.
			if (knownRuntimeObjects.has(rootObjectName)) {
				const propertyStart = matchIndex + fullPath.length + 1;
				const startPos = textDocument.positionAt(propertyStart);

				const diagnosticData = createDiagnostic("E7100", {
					file: textDocument.uri,
					line: startPos.line + 1,
					column: startPos.character + 1,
					length: propertyName.length,
					data: {
						propertyName,
						objectName: fullPath,
						suggestion: undefined,
					},
				});

				const lspDiagnostic = formatForLSP(diagnosticData);
				diagnostics.push(lspDiagnostic as Diagnostic);
			}
			continue;
		}

		// For single-level properties (e.g., screen.drawSprite), validate normally
		const api = GLOBAL_API[fullPath];
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

		const propertyStart = matchIndex + fullPath.length + 1;

		const suggestion = getClosestPropertySuggestion(
			propertyName,
			Object.keys(api.properties),
		);

		// Calculate line and column from position
		const startPos = textDocument.positionAt(propertyStart);

		// Use diagnostics package to create and format diagnostic
		const diagnosticData = createDiagnostic("E7100", {
			file: textDocument.uri,
			line: startPos.line + 1, // 1-based
			column: startPos.character + 1, // 1-based
			length: propertyName.length,
			data: {
				propertyName,
				objectName: fullPath,
				suggestion,
			},
		});

		// Format for LSP using diagnostics formatter
		const lspDiagnostic = formatForLSP(diagnosticData);
		diagnostics.push(lspDiagnostic as Diagnostic);
	}
}
