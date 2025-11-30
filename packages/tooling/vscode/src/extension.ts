import { existsSync } from "fs";
import * as path from "path";
import * as vscode from "vscode";
import { LanguageClient, type LanguageClientOptions, type ServerOptions, TransportKind } from "vscode-languageclient/node";
import { ActionsProvider } from "./views/actionsProvider";
import type { GlobalApiMap } from "./views/apiProvider";
import { ApiProvider } from "./views/apiProvider";
import { ExamplesProvider } from "./views/examplesProvider";

let client: LanguageClient;
let statusBarItem: vscode.StatusBarItem;
const GLOBAL_API_REQUEST = "lootiscript/globalApi";

export function activate(context: vscode.ExtensionContext) {
    console.log("LootiScript Language Server extension is activating...");

    // Create status bar item
    statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    statusBarItem.text = "$(loading~spin) L8B";
    statusBarItem.tooltip = "LootiScript Language Server: Starting...";
    statusBarItem.command = "workbench.actions.view.problems"; // Open problems on click
    statusBarItem.show();
    context.subscriptions.push(statusBarItem);

    // Register tree data providers for sidebar views
    const actionsProvider = new ActionsProvider();
    const apiProvider = new ApiProvider();
    const examplesProvider = new ExamplesProvider();

    vscode.window.registerTreeDataProvider("lootiscript-actions", actionsProvider);
    vscode.window.registerTreeDataProvider("lootiscript-api", apiProvider);
    vscode.window.registerTreeDataProvider("lootiscript-examples", examplesProvider);

    // The server is implemented in node
    // In packaged extension, server is bundled in ./server directory
    // In development, it's in ../language-server/dist
    const bundledServerPath = context.asAbsolutePath(path.join("server", "server.js"));
    const devServerPath = context.asAbsolutePath(path.join("..", "language-server", "dist", "server.js"));

    // Use bundled server if it exists (packaged), otherwise use dev path
    const serverModule = existsSync(bundledServerPath) ? bundledServerPath : devServerPath;

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
    client = new LanguageClient("lootiscriptLanguageServer", "LootiScript Language Server", serverOptions, clientOptions);

    // Start the client. This will also launch the server
    client
        .start()
        .then(async () => {
            statusBarItem.text = "$(pass) L8B";
            statusBarItem.tooltip = "LootiScript Language Server: Running";
            console.log("LootiScript Language Server started successfully");
            await hydrateApiReference(apiProvider);
        })
        .catch((error) => {
            statusBarItem.text = "$(error) L8B";
            statusBarItem.tooltip = `LootiScript Language Server: Error - ${error}`;
            apiProvider.setError("Unable to load API reference");
            console.error("Failed to start LootiScript Language Server:", error);
        });

    // Register commands
    registerCommands(context, apiProvider);

    // Listen to diagnostics for error count in status bar
    context.subscriptions.push(
        vscode.languages.onDidChangeDiagnostics((e) => {
            updateStatusBarWithDiagnostics();
        }),
    );

    // Register enhanced hover provider for better error display
    context.subscriptions.push(
        vscode.languages.registerHoverProvider(
            { scheme: "file", language: "lootiscript" },
            {
                provideHover(document, position) {
                    const diagnostics = vscode.languages.getDiagnostics(document.uri);
                    for (const diagnostic of diagnostics) {
                        if (diagnostic.range.contains(position) && diagnostic.severity === vscode.DiagnosticSeverity.Error) {
                            return createEnhancedHover(diagnostic);
                        }
                    }
                    return null;
                },
            },
        ),
    );

    console.log("LootiScript Language Server extension is now active!");
}

function registerCommands(context: vscode.ExtensionContext, apiProvider: ApiProvider) {
    // Command: Format Document
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

    // Command: Run Script
    context.subscriptions.push(
        vscode.commands.registerCommand("lootiscript.runScript", async () => {
            const editor = vscode.window.activeTextEditor;
            if (editor && editor.document.languageId === "lootiscript") {
                // Try to find and run with l8b if available
                const terminal = vscode.window.createTerminal("L8B Run");
                terminal.show();

                // Check if we're in a workspace with l8b CLI
                const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
                if (workspaceFolder) {
                    terminal.sendText(`cd "${workspaceFolder.uri.fsPath}"`);
                    terminal.sendText(`npx l8b dev`);
                } else {
                    vscode.window.showWarningMessage("No workspace folder found. Please open a L8B project.");
                }
            } else {
                vscode.window.showWarningMessage("No LootiScript file is currently active");
            }
        }),
    );

    // Command: Restart Language Server
    context.subscriptions.push(
        vscode.commands.registerCommand("lootiscript.restartLanguageServer", async () => {
            if (!client) {
                vscode.window.showWarningMessage("Language server is not running.");
                return;
            }

            statusBarItem.text = "$(sync~spin) L8B";
            statusBarItem.tooltip = "LootiScript Language Server: Restarting...";

            try {
                await client.stop();
                await client.start();
                await hydrateApiReference(apiProvider);

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

    // Command: Insert Example Code
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
        statusBarItem.backgroundColor = new vscode.ThemeColor("statusBarItem.errorBackground");
    } else if (totalWarnings > 0) {
        statusBarItem.text = `$(warning) L8B`;
        statusBarItem.tooltip = `LootiScript: ${totalWarnings} warning${totalWarnings !== 1 ? "s" : ""}`;
        statusBarItem.backgroundColor = new vscode.ThemeColor("statusBarItem.warningBackground");
    } else {
        statusBarItem.text = "$(pass) L8B";
        statusBarItem.tooltip = "LootiScript Language Server: No problems";
        statusBarItem.backgroundColor = undefined;
    }
}

/**
 * Create enhanced hover content for diagnostics
 * Shows error code, context, suggestions, and related information
 */
function createEnhancedHover(diagnostic: vscode.Diagnostic): vscode.Hover {
    const contents: vscode.MarkdownString[] = [];

    // Extract error code from message if present
    const message = diagnostic.message;
    const errorCodeMatch = message.match(/\[([A-Z]\d+)\]/);
    const errorCode = errorCodeMatch ? errorCodeMatch[1] : (diagnostic.code as string | undefined);

    // Main error message
    const mainContent = new vscode.MarkdownString();

    if (errorCode) {
        mainContent.appendMarkdown(`**Error Code:** \`${errorCode}\`\n\n`);
    }

    // Clean message (remove error code prefix if present)
    const cleanMessage = message.replace(/^\[[A-Z]\d+\]\s*/, "");
    mainContent.appendMarkdown(`**Error:** ${cleanMessage}\n\n`);

    contents.push(mainContent);

    // Add related information if available
    if (diagnostic.relatedInformation && diagnostic.relatedInformation.length > 0) {
        const relatedContent = new vscode.MarkdownString();
        relatedContent.appendMarkdown("**Related Information:**\n\n");

        for (const related of diagnostic.relatedInformation) {
            const filePath = vscode.workspace.asRelativePath(related.location.uri);
            relatedContent.appendMarkdown(
                `- ${related.message} \n  \`${filePath}:${related.location.range.start.line + 1}:${related.location.range.start.character + 1}\`\n\n`,
            );
        }

        contents.push(relatedContent);
    }

    // Add suggestions if present in message
    if (message.includes("💡") || message.includes("Suggestion")) {
        const suggestionContent = new vscode.MarkdownString();
        suggestionContent.appendMarkdown("**💡 Suggestions:**\n\n");

        // Extract suggestions from related information
        if (diagnostic.relatedInformation) {
            for (const related of diagnostic.relatedInformation) {
                if (related.message.includes("💡")) {
                    suggestionContent.appendMarkdown(`- ${related.message.replace("💡", "").trim()}\n\n`);
                }
            }
        }

        if (suggestionContent.value.includes("💡")) {
            contents.push(suggestionContent);
        }
    }

    // Add documentation link for error codes
    if (errorCode) {
        const docContent = new vscode.MarkdownString();
        docContent.appendMarkdown(`[View Error Documentation](https://l8b.dev/docs/errors#${errorCode.toLowerCase()})`);
        contents.push(docContent);
    }

    return new vscode.Hover(contents, diagnostic.range);
}

async function hydrateApiReference(apiProvider: ApiProvider): Promise<void> {
    if (!client) {
        return;
    }

    apiProvider.setLoading();

    try {
        const apiData = await client.sendRequest<GlobalApiMap>(GLOBAL_API_REQUEST);
        apiProvider.setApiData(apiData);
    } catch (error) {
        apiProvider.setError("Unable to load API reference");
        console.error("Failed to load LootiScript API reference", error);
    }
}

export function deactivate(): Thenable<void> | undefined {
    if (!client) {
        return undefined;
    }
    return client.stop();
}
