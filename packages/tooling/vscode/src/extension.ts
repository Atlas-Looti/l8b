/**
 * VS Code extension entry-point.
 * Owns all mutable lifecycle state; delegates pure logic to focused modules.
 */

import * as vscode from "vscode";
import { LanguageClient } from "vscode-languageclient/node";
import { registerCommands } from "./commands";
import { createClientOptions, createServerOptions, resolveServerModule } from "./lsp-client";
import { createEnhancedHover, updateStatusBarWithDiagnostics } from "./status-bar";
import { ActionsProvider } from "./views/actionsProvider";
import type { GlobalApiMap } from "./views/apiProvider";
import { ApiProvider } from "./views/apiProvider";
import { ExamplesProvider } from "./views/examplesProvider";

// ── Module-level state (owned here, passed to helpers as needed) ──────────────
let client: LanguageClient;
let statusBarItem: vscode.StatusBarItem;
let statusBarUpdateTimeout: NodeJS.Timeout | undefined;

const GLOBAL_API_REQUEST = "lootiscript/globalApi";
const STATUS_BAR_DEBOUNCE_MS = 300;

// ── Helpers ───────────────────────────────────────────────────────────────────

async function hydrateApiReference(apiProvider: ApiProvider): Promise<void> {
	if (!client) return;
	apiProvider.setLoading();
	try {
		const apiData = await client.sendRequest<GlobalApiMap>(GLOBAL_API_REQUEST);
		apiProvider.setApiData(apiData);
	} catch {
		apiProvider.setError("Unable to load API reference");
	}
}

// ── Activation ────────────────────────────────────────────────────────────────

export function activate(context: vscode.ExtensionContext) {
	// Status bar
	statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
	statusBarItem.text = "$(loading~spin) L8B";
	statusBarItem.tooltip = "LootiScript Language Server: Starting...";
	statusBarItem.command = "workbench.actions.view.problems";
	statusBarItem.show();
	context.subscriptions.push(statusBarItem);

	// Sidebar tree providers
	vscode.window.registerTreeDataProvider("lootiscript-actions", new ActionsProvider());
	const apiProvider = new ApiProvider();
	vscode.window.registerTreeDataProvider("lootiscript-api", apiProvider);
	vscode.window.registerTreeDataProvider("lootiscript-examples", new ExamplesProvider());

	// Language client
	const serverModule = resolveServerModule(context);
	client = new LanguageClient(
		"lootiscriptLanguageServer",
		"LootiScript Language Server",
		createServerOptions(serverModule),
		createClientOptions(),
	);

	client
		.start()
		.then(async () => {
			statusBarItem.text = "$(pass) L8B";
			statusBarItem.tooltip = "LootiScript Language Server: Running";
			try {
				await hydrateApiReference(apiProvider);
			} catch {
				apiProvider.setError("Unable to load API reference");
			}
		})
		.catch((error) => {
			statusBarItem.text = "$(error) L8B";
			const errorMessage = error instanceof Error ? error.message : String(error);
			statusBarItem.tooltip = `LootiScript Language Server: Error - ${errorMessage}`;
			apiProvider.setError("Unable to load API reference");
		});

	// Commands
	registerCommands(context, apiProvider, {
		getClient: () => client,
		statusBarItem,
		hydrateApiRef: hydrateApiReference,
	});

	// Debounced diagnostics → status bar
	context.subscriptions.push(
		vscode.languages.onDidChangeDiagnostics(() => {
			if (statusBarUpdateTimeout) clearTimeout(statusBarUpdateTimeout);
			statusBarUpdateTimeout = setTimeout(() => {
				updateStatusBarWithDiagnostics(statusBarItem);
				statusBarUpdateTimeout = undefined;
			}, STATUS_BAR_DEBOUNCE_MS);
		}),
	);

	// Enhanced hover for .loot diagnostics
	context.subscriptions.push(
		vscode.languages.registerHoverProvider(
			{ scheme: "file", language: "lootiscript" },
			{
				provideHover(document, position) {
					const diagnostics = vscode.languages.getDiagnostics(document.uri);
					for (const diagnostic of diagnostics) {
						if (
							diagnostic.range.contains(position) &&
							diagnostic.severity === vscode.DiagnosticSeverity.Error
						) {
							return createEnhancedHover(diagnostic);
						}
					}
					return null;
				},
			},
		),
	);
}

// ── Deactivation ──────────────────────────────────────────────────────────────

export function deactivate(): Thenable<void> | undefined {
	if (statusBarUpdateTimeout) {
		clearTimeout(statusBarUpdateTimeout);
		statusBarUpdateTimeout = undefined;
	}
	if (statusBarItem) statusBarItem.dispose();
	if (client) return client.stop();
	return undefined;
}
