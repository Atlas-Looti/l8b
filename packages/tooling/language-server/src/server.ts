import {
	createConnection,
	TextDocuments,
	ProposedFeatures,
	InitializeParams,
	DidChangeConfigurationNotification,
	TextDocumentSyncKind,
	InitializeResult,
	CodeActionKind,
} from "vscode-languageserver/node";
import { TextDocument } from "vscode-languageserver-textdocument";
import { LanguageModes, DocumentRegionsCache } from "./embedded/mode-manager";
import { getJSONMode, createJSONLanguageService } from "./embedded/json-mode";
import { GLOBAL_API } from "./api-definitions/index";
import { updateDocumentState, deleteDocumentState } from "./document-state";
import { validateTextDocument } from "./validation";
import { setupCompletionHandlers } from "./handlers/completion";
import { setupHoverHandler } from "./handlers/hover";
import { setupSignatureHelpHandler } from "./handlers/signature-help";
import { setupSymbolHandlers } from "./handlers/symbols";
import { setupFormattingHandler } from "./handlers/formatting";
import { setupCodeActionsHandler } from "./handlers/code-actions";
import { setupDefinitionHandler } from "./handlers/definition";
import { setupReferencesHandler } from "./handlers/references";
import { setupRenameHandler } from "./handlers/rename";
import {
	setupSemanticTokensHandler,
	TOKEN_TYPES,
	TOKEN_MODIFIERS,
} from "./handlers/semantic-tokens";
import {
	clearDocumentSettings,
	setGlobalSettings,
	sanitizeSettings,
} from "./settings";

// Create a connection for the server
const connection = createConnection(ProposedFeatures.all);

// Create a simple text document manager
const documents: TextDocuments<TextDocument> = new TextDocuments(TextDocument);

// Setup embedded language support
const documentRegionsCache = new DocumentRegionsCache();
const languageModes = new LanguageModes(documentRegionsCache);

// Register JSON mode for embedded JSON support
const jsonLanguageService = createJSONLanguageService();
languageModes.registerMode(
	getJSONMode(jsonLanguageService, documentRegionsCache),
);

const GLOBAL_API_REQUEST = "lootiscript/globalApi";
connection.onRequest(GLOBAL_API_REQUEST, () => GLOBAL_API);

let hasConfigurationCapability = false;
let hasWorkspaceFolderCapability = false;

connection.onInitialize((params: InitializeParams) => {
	const capabilities = params.capabilities;

	// Does the client support the `workspace/configuration` request?
	// If not, we fall back using global settings.
	hasConfigurationCapability = !!(
		capabilities.workspace && !!capabilities.workspace.configuration
	);
	hasWorkspaceFolderCapability = !!(
		capabilities.workspace && !!capabilities.workspace.workspaceFolders
	);

	const result: InitializeResult = {
		capabilities: {
			textDocumentSync: TextDocumentSyncKind.Incremental,
			// Tell the client that this server supports code completion.
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
		// Register for all configuration changes.
		connection.client.register(
			DidChangeConfigurationNotification.type,
			undefined,
		);
	}
	if (hasWorkspaceFolderCapability) {
		connection.workspace.onDidChangeWorkspaceFolders((_event) => {
			connection.console.log("Workspace folder change event received.");
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
		await validateTextDocument(
			doc,
			connection,
			hasConfigurationCapability,
			languageModes,
			documentRegionsCache,
		);
	}
});

// The content of a text document has changed. This event is emitted
// when the text document first opened or when its content has changed.
documents.onDidChangeContent((change) => {
	updateDocumentState(change.document, connection);
	validateTextDocument(
		change.document,
		connection,
		hasConfigurationCapability,
		languageModes,
		documentRegionsCache,
	);
});

documents.onDidOpen((change) => {
	updateDocumentState(change.document, connection);
	validateTextDocument(
		change.document,
		connection,
		hasConfigurationCapability,
		languageModes,
		documentRegionsCache,
	);
});

documents.onDidClose((change) => {
	deleteDocumentState(change.document.uri);
	connection.sendDiagnostics({ uri: change.document.uri, diagnostics: [] });
});

connection.onDidChangeWatchedFiles((_change) => {
	// Monitored files have change in VSCode
	connection.console.log("We received an file change event");
});

// Setup all handlers
setupCompletionHandlers(
	connection,
	documents,
	languageModes,
	hasConfigurationCapability,
);
setupHoverHandler(connection, documents, languageModes);
setupSignatureHelpHandler(connection, documents, hasConfigurationCapability);
setupSymbolHandlers(connection);
setupFormattingHandler(connection, documents, hasConfigurationCapability);
setupCodeActionsHandler(connection, documents);
setupDefinitionHandler(connection, documents);
setupReferencesHandler(connection, documents);
setupRenameHandler(connection, documents);
setupSemanticTokensHandler(connection, documents);

// Make the text document manager listen on the connection
// for open, change and close text document events
documents.listen(connection);

// Listen on the connection
connection.listen();
