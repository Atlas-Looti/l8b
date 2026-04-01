/**
 * VS Code command registrations for the LootiScript extension.
 * Receives mutable state via callbacks to avoid circular imports with extension.ts.
 */

import * as vscode from "vscode";
import type { LanguageClient } from "vscode-languageclient/node";
import type { ApiProvider } from "./views/apiProvider";

export interface CommandDeps {
	/** Returns the current LanguageClient instance (may be undefined while starting). */
	getClient: () => LanguageClient | undefined;
	/** The status-bar item owned by extension.ts. */
	statusBarItem: vscode.StatusBarItem;
	/** Re-hydrate the API reference tree from the language server. */
	hydrateApiRef: (apiProvider: ApiProvider) => Promise<void>;
}

export function registerCommands(
	context: vscode.ExtensionContext,
	apiProvider: ApiProvider,
	deps: CommandDeps,
): void {
	const { getClient, statusBarItem, hydrateApiRef } = deps;

	// ── Format Document ──────────────────────────────────────────────────────
	context.subscriptions.push(
		vscode.commands.registerCommand("lootiscript.formatDocument", async () => {
			const editor = vscode.window.activeTextEditor;
			if (editor && editor.document.languageId === "lootiscript") {
				await vscode.commands.executeCommand("editor.action.formatDocument");
				vscode.window.showInformationMessage("Document formatted!");
			} else {
				vscode.window.showWarningMessage("No LootiScript file is currently active");
			}
		}),
	);

	// ── Run Script ───────────────────────────────────────────────────────────
	context.subscriptions.push(
		vscode.commands.registerCommand("lootiscript.runScript", async () => {
			const editor = vscode.window.activeTextEditor;
			if (editor && editor.document.languageId === "lootiscript") {
				const terminal = vscode.window.createTerminal("L8B Run");
				terminal.show();
				const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
				if (workspaceFolder) {
					terminal.sendText(`cd "${workspaceFolder.uri.fsPath}"`);
					terminal.sendText("npx l8b dev");
				} else {
					vscode.window.showWarningMessage("No workspace folder found. Please open a L8B project.");
				}
			} else {
				vscode.window.showWarningMessage("No LootiScript file is currently active");
			}
		}),
	);

	// ── Restart Language Server ───────────────────────────────────────────────
	context.subscriptions.push(
		vscode.commands.registerCommand("lootiscript.restartLanguageServer", async () => {
			const client = getClient();
			if (!client) {
				vscode.window.showWarningMessage("Language server is not running.");
				return;
			}

			statusBarItem.text = "$(sync~spin) L8B";
			statusBarItem.tooltip = "LootiScript Language Server: Restarting...";

			try {
				await client.stop();
				await client.start();
				try {
					await hydrateApiRef(apiProvider);
				} catch {
					apiProvider.setError("Unable to load API reference");
				}
				statusBarItem.text = "$(check) L8B";
				statusBarItem.tooltip = "LootiScript Language Server: Running";
				vscode.window.showInformationMessage("LootiScript Language Server restarted");
			} catch (error) {
				statusBarItem.text = "$(error) L8B";
				statusBarItem.tooltip = `LootiScript Language Server: Error - ${error}`;
				apiProvider.setError("Unable to load API reference");
				vscode.window.showErrorMessage("Failed to restart LootiScript Language Server.");
			}
		}),
	);

	// ── Insert Example Code ───────────────────────────────────────────────────
	context.subscriptions.push(
		vscode.commands.registerCommand("lootiscript.insertExample", async (code: string) => {
			const editor = vscode.window.activeTextEditor;
			if (editor) {
				const position = editor.selection.active;
				await editor.edit((editBuilder) => {
					editBuilder.insert(position, code);
				});
			}
		}),
	);
}
