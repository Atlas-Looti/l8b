import {
	CodeActionKind,
	createConnection,
	DidChangeConfigurationNotification,
	type InitializeParams,
	type InitializeResult,
	ProposedFeatures,
	TextDocumentSyncKind,
	TextDocuments,
} from "vscode-languageserver/node";
import { TextDocument } from "vscode-languageserver-textdocument";
import { GLOBAL_API } from "./api-definitions/index";
import { deleteDocumentState, updateDocumentState } from "./document-state";
import { createJSONLanguageService, getJSONMode } from "./embedded/json-mode";
import { DocumentRegionsCache, LanguageModes } from "./embedded/mode-manager";
import { setupCodeActionsHandler } from "./handlers/code-actions";
import { setupCompletionHandlers } from "./handlers/completion";
import { setupDefinitionHandler } from "./handlers/definition";
import { setupFormattingHandler } from "./handlers/formatting";
import { setupHoverHandler } from "./handlers/hover";
import { setupReferencesHandler } from "./handlers/references";
import { setupRenameHandler } from "./handlers/rename";
import { setupSemanticTokensHandler, TOKEN_MODIFIERS, TOKEN_TYPES } from "./handlers/semantic-tokens";
import { setupSignatureHelpHandler } from "./handlers/signature-help";
import { setupSymbolHandlers } from "./handlers/symbols";
import { clearDocumentSettings, sanitizeSettings, setGlobalSettings } from "./settings";
import { validateTextDocument } from "./validation";

// Create LSP connection with all proposed protocol features enabled
const connection = createConnection(ProposedFeatures.all);

// Document manager tracks all open text documents and their state
const documents: TextDocuments<TextDocument> = new TextDocuments(TextDocument);

// Initialize embedded language support system for JSON, etc.
const documentRegionsCache = new DocumentRegionsCache();
const languageModes = new LanguageModes(documentRegionsCache);

// Register JSON language mode for embedded JSON validation and completion
const jsonLanguageService = createJSONLanguageService();
languageModes.registerMode(getJSONMode(jsonLanguageService, documentRegionsCache));

const GLOBAL_API_REQUEST = "lootiscript/globalApi";
connection.onRequest(GLOBAL_API_REQUEST, () => GLOBAL_API);

let hasConfigurationCapability = false;
let hasWorkspaceFolderCapability = false;

connection.onInitialize((params: InitializeParams) => {
	const capabilities = params.capabilities;

	// Check if client supports workspace/configuration requests
	// If not supported, fall back to global settings
	hasConfigurationCapability = !!(capabilities.workspace && !!capabilities.workspace.configuration);
	hasWorkspaceFolderCapability = !!(capabilities.workspace && !!capabilities.workspace.workspaceFolders);

	const result: InitializeResult = {
		capabilities: {
			textDocumentSync: TextDocumentSyncKind.Incremental,
			// Declare all LSP features this server implements
			completionProvider: {
				resolveProvider: true,
				triggerCharacters: ["."],
			},
			signatureHelpProvider: {
				triggerCharacters: ["(", ","],
			},
			hoverProvider: true,
			definitionProvider: true,
			documentSymbolProvider: true,
			workspaceSymbolProvider: true,
			referencesProvider: true,
			documentFormattingProvider: true,
			renameProvider: {
				prepareProvider: true,
			},
			codeActionProvider: {
				codeActionKinds: [CodeActionKind.QuickFix, CodeActionKind.Refactor],
			},
			semanticTokensProvider: {
				legend: {
					tokenTypes: TOKEN_TYPES,
					tokenModifiers: TOKEN_MODIFIERS,
				},
				full: true,
			},
		},
	};
	if (hasWorkspaceFolderCapability) {
		result.capabilities.workspace = {
			workspaceFolders: {
				supported: true,
			},
		};
	}
	return result;
});

connection.onInitialized(() => {
	if (hasConfigurationCapability) {
		// Subscribe to configuration change notifications from the client
		connection.client.register(DidChangeConfigurationNotification.type, undefined);
	}
	if (hasWorkspaceFolderCapability) {
		connection.workspace.onDidChangeWorkspaceFolders((_event) => {
			// Workspace folder change handled
		});
	}
});

connection.onDidChangeConfiguration(async (change) => {
	if (hasConfigurationCapability) {
		clearDocumentSettings();
	} else {
		setGlobalSettings(sanitizeSettings(change.settings?.lootiscript));
	}

	for (const doc of documents.all()) {
		await validateTextDocument(doc, connection, hasConfigurationCapability, languageModes, documentRegionsCache);
	}
});

// Triggered when document content changes (typing, paste, etc.)
documents.onDidChangeContent((change) => {
	updateDocumentState(change.document, connection);
	validateTextDocument(change.document, connection, hasConfigurationCapability, languageModes, documentRegionsCache);
});

documents.onDidOpen((change) => {
	updateDocumentState(change.document, connection);
	validateTextDocument(change.document, connection, hasConfigurationCapability, languageModes, documentRegionsCache);
});

documents.onDidClose((change) => {
	deleteDocumentState(change.document.uri);
	connection.sendDiagnostics({
		uri: change.document.uri,
		diagnostics: [],
	});
});

connection.onDidChangeWatchedFiles((_change) => {
	// React to file system changes for watched files (e.g., .loot files)
	// File changes are handled automatically by document change handlers
});

// Register all LSP feature handlers
// Provides IDE features: autocomplete, hover tooltips, go-to-definition, etc.
setupCompletionHandlers(connection, documents, languageModes, hasConfigurationCapability);
setupHoverHandler(connection, documents, languageModes);
setupSignatureHelpHandler(connection, documents, hasConfigurationCapability);
setupSymbolHandlers(connection);
setupFormattingHandler(connection, documents, hasConfigurationCapability);
setupCodeActionsHandler(connection, documents);
setupDefinitionHandler(connection, documents);
setupReferencesHandler(connection, documents);
setupRenameHandler(connection, documents);
setupSemanticTokensHandler(connection, documents);

// Connect document manager to LSP connection
// Handles document lifecycle events (open, change, close)
documents.listen(connection);

// Start the LSP server and begin processing client requests
connection.listen();
