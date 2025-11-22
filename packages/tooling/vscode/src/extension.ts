import * as vscode from "vscode";
import * as path from "path";
import {
	LanguageClient,
	LanguageClientOptions,
	ServerOptions,
	TransportKind,
} from "vscode-languageclient/node";

let client: LanguageClient;
let statusBarItem: vscode.StatusBarItem;

export function activate(context: vscode.ExtensionContext) {
	console.log("LootiScript Language Server extension is activating...");

	// Create status bar item
	statusBarItem = vscode.window.createStatusBarItem(
		vscode.StatusBarAlignment.Right,
		100,
	);
	statusBarItem.text = "$(loading~spin) L8B";
	statusBarItem.tooltip = "LootiScript Language Server: Starting...";
	statusBarItem.command = "workbench.actions.view.problems"; // Open problems on click
	statusBarItem.show();
	context.subscriptions.push(statusBarItem);

	// The server is implemented in node
	const serverModule = context.asAbsolutePath(
		path.join("..", "language-server", "dist", "server.js"),
	);

	// The debug options for the server
	const debugOptions = { execArgv: ["--nolazy", "--inspect=6009"] };

	// If the extension is launched in debug mode then the debug server options are used
	// Otherwise the run options are used
	const serverOptions: ServerOptions = {
		run: { module: serverModule, transport: TransportKind.ipc },
		debug: {
			module: serverModule,
			transport: TransportKind.ipc,
			options: debugOptions,
		},
	};

	// Options to control the language client
	const clientOptions: LanguageClientOptions = {
		// Register the server for LootiScript documents
		documentSelector: [{ scheme: "file", language: "lootiscript" }],
		synchronize: {
			// Notify the server about file changes to .loot files contained in the workspace
			fileEvents: vscode.workspace.createFileSystemWatcher("**/*.loot"),
		},
	};

	// Create the language client and start the client.
	client = new LanguageClient(
		"lootiscriptLanguageServer",
		"LootiScript Language Server",
		serverOptions,
		clientOptions,
	);

	// Start the client. This will also launch the server
	client
		.start()
		.then(() => {
			statusBarItem.text = "$(pass) L8B";
			statusBarItem.tooltip = "LootiScript Language Server: Running";
			console.log("LootiScript Language Server started successfully");
		})
		.catch((error) => {
			statusBarItem.text = "$(error) L8B";
			statusBarItem.tooltip = `LootiScript Language Server: Error - ${error}`;
			console.error("Failed to start LootiScript Language Server:", error);
		});

	// Register commands
	registerCommands(context);

	// Listen to diagnostics for error count in status bar
	context.subscriptions.push(
		vscode.languages.onDidChangeDiagnostics((e) => {
			updateStatusBarWithDiagnostics();
		}),
	);

	console.log("LootiScript Language Server extension is now active!");
}

function registerCommands(context: vscode.ExtensionContext) {
	// Command: Format Document
	context.subscriptions.push(
		vscode.commands.registerCommand("lootiscript.formatDocument", async () => {
			const editor = vscode.window.activeTextEditor;
			if (editor && editor.document.languageId === "lootiscript") {
				await vscode.commands.executeCommand("editor.action.formatDocument");
				vscode.window.showInformationMessage("Document formatted!");
			} else {
				vscode.window.showWarningMessage(
					"No LootiScript file is currently active",
				);
			}
		}),
	);

	// Command: Run Script
	context.subscriptions.push(
		vscode.commands.registerCommand("lootiscript.runScript", async () => {
			const editor = vscode.window.activeTextEditor;
			if (editor && editor.document.languageId === "lootiscript") {
				const filePath = editor.document.uri.fsPath;

				// Try to find and run with @l8b/cli if available
				const terminal = vscode.window.createTerminal("L8B Run");
				terminal.show();

				// Check if we're in a workspace with l8b CLI
				const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
				if (workspaceFolder) {
					terminal.sendText(`cd "${workspaceFolder.uri.fsPath}"`);
					terminal.sendText(`npx @l8b/cli dev`);
				} else {
					vscode.window.showWarningMessage(
						"No workspace folder found. Please open a L8B project.",
					);
				}
			} else {
				vscode.window.showWarningMessage(
					"No LootiScript file is currently active",
				);
			}
		}),
	);

	// Command: Restart Language Server
	context.subscriptions.push(
		vscode.commands.registerCommand(
			"lootiscript.restartLanguageServer",
			async () => {
				if (client) {
					statusBarItem.text = "$(sync~spin) L8B";
					statusBarItem.tooltip = "LootiScript Language Server: Restarting...";

					await client.stop();
					await client.start();

					statusBarItem.text = "$(check) L8B";
					statusBarItem.tooltip = "LootiScript Language Server: Running";

					vscode.window.showInformationMessage(
						"LootiScript Language Server restarted",
					);
				}
			},
		),
	);
}

function updateStatusBarWithDiagnostics() {
	if (!statusBarItem) {
		return;
	}

	const diagnostics = vscode.languages.getDiagnostics();
	let totalErrors = 0;
	let totalWarnings = 0;

	for (const [uri, diags] of diagnostics) {
		// Only count diagnostics for LootiScript files
		if (uri.path.endsWith(".loot")) {
			for (const diag of diags) {
				if (diag.severity === vscode.DiagnosticSeverity.Error) {
					totalErrors++;
				} else if (diag.severity === vscode.DiagnosticSeverity.Warning) {
					totalWarnings++;
				}
			}
		}
	}

	// Update status bar based on diagnostics
	if (totalErrors > 0) {
		statusBarItem.text = `$(error) L8B`;
		statusBarItem.tooltip = `LootiScript: ${totalErrors} error${totalErrors !== 1 ? "s" : ""}${totalWarnings > 0 ? `, ${totalWarnings} warning${totalWarnings !== 1 ? "s" : ""}` : ""}`;
		statusBarItem.backgroundColor = new vscode.ThemeColor(
			"statusBarItem.errorBackground",
		);
	} else if (totalWarnings > 0) {
		statusBarItem.text = `$(warning) L8B`;
		statusBarItem.tooltip = `LootiScript: ${totalWarnings} warning${totalWarnings !== 1 ? "s" : ""}`;
		statusBarItem.backgroundColor = new vscode.ThemeColor(
			"statusBarItem.warningBackground",
		);
	} else {
		statusBarItem.text = "$(pass) L8B";
		statusBarItem.tooltip = "LootiScript Language Server: No problems";
		statusBarItem.backgroundColor = undefined;
	}
}

export function deactivate(): Thenable<void> | undefined {
	if (!client) {
		return undefined;
	}
	return client.stop();
}
