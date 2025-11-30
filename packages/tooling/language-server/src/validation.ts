import { createDiagnostic, formatForLSP } from "@l8b/diagnostics";
import { Parser } from "@l8b/lootiscript/dist/v1/parser";
import { type Connection, type Diagnostic, DiagnosticSeverity } from "vscode-languageserver/node";
import type { TextDocument } from "vscode-languageserver-textdocument";
import { API_ACCESS_REGEX, GLOBAL_API } from "./api-definitions/index";
import type { DocumentRegionsCache, LanguageModes } from "./embedded/mode-manager";
import { getDocumentSettings } from "./settings";
import { getClosestPropertySuggestion } from "./utils";

export async function validateTextDocument(
	textDocument: TextDocument,
	connection: Connection,
	hasConfigurationCapability: boolean,
	languageModes: LanguageModes,
	documentRegionsCache: DocumentRegionsCache,
): Promise<void> {
	const settings = await getDocumentSettings(connection, hasConfigurationCapability, textDocument.uri);
	if (!settings.diagnostics.enable) {
		connection.sendDiagnostics({
			uri: textDocument.uri,
			diagnostics: [],
		});
		return;
	}
	const text = textDocument.getText();
	const diagnostics: Diagnostic[] = [];

	// Validate embedded languages (JSON, etc.) only where they actually exist
	// Skips validation for modes with no embedded content to improve performance
	const documentRegions = documentRegionsCache.get(textDocument);
	const allModes = languageModes.getAllModes();
	for (const mode of allModes) {
		if (mode.doValidation) {
			// Verify this language mode has actual content in the document
			const embeddedDoc = documentRegions.getEmbeddedDocument(mode.getId());
			const hasEmbeddedContent = embeddedDoc.getText().trim().length > 0;

			if (hasEmbeddedContent) {
				const embeddedDiagnostics = await mode.doValidation(textDocument);
				diagnostics.push(...embeddedDiagnostics);
			}
		}
	}

	// Validate LootiScript syntax and API usage using the parser
	// This is the primary validation layer for .loot files
	try {
		const parser = new Parser(text, textDocument.uri);
		parser.parse();

		if ((parser as any).error_info) {
			const err = (parser as any).error_info;

			// Convert parser error to diagnostic using centralized diagnostics package
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

			// Convert diagnostic to LSP format for editor integration
			const lspDiagnostic = formatForLSP(diagnosticData);
			diagnostics.push(lspDiagnostic as Diagnostic);
		}
	} catch (e: any) {
		const diagnostic: Diagnostic = {
			severity: DiagnosticSeverity.Error,
			range: {
				start: {
					line: 0,
					character: 0,
				},
				end: {
					line: 0,
					character: 10,
				},
			},
			message: e.message || "Unknown parser error",
			source: "lootiscript",
		};
		diagnostics.push(diagnostic);
	}

	validateApiUsage(textDocument, diagnostics);

	connection.sendDiagnostics({
		uri: textDocument.uri,
		diagnostics,
	});
}

function validateApiUsage(textDocument: TextDocument, diagnostics: Diagnostic[]): void {
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

		// Extract root object name from property path (e.g., "sprites" from "sprites.player")
		const rootObjectName = fullPath.split(".")[0];
		const isNested = fullPath.includes(".");

		// Runtime collections that are populated dynamically (sprites, maps, etc.)
		// Cannot validate instance properties statically since they're loaded at runtime
		const knownRuntimeObjects = new Set(["sprites", "map", "sounds", "music", "assets"]);

		// For nested property access (e.g., sprites.player.x), validate
		// that the root object exists in the API
		if (isNested) {
			const api = GLOBAL_API[rootObjectName];
			// If root object is not a known global API or runtime object,
			// it's likely a user-defined object - skip validation
			if (!api && !knownRuntimeObjects.has(rootObjectName)) {
				// Skip validation for user-defined objects
				continue;
			}

			// Report errors for runtime collection property access
			// This helps catch typos but may produce false positives for valid runtime properties
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

		// For single-level API access (e.g., screen.drawSprite),
		// validate property exists in the API definition
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

		const suggestion = getClosestPropertySuggestion(propertyName, Object.keys(api.properties));

		const startPos = textDocument.positionAt(propertyStart);

		// Create diagnostic with error code, location, and suggested fix
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

		// Convert diagnostic to LSP format for editor integration
		const lspDiagnostic = formatForLSP(diagnosticData);
		diagnostics.push(lspDiagnostic as Diagnostic);
	}
}
