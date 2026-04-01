/**
 * LSP client factory — pure functions for creating server/client options.
 * No mutable state; all VS Code lifecycle wiring lives in extension.ts.
 */

import { existsSync } from "fs";
import * as path from "path";
import * as vscode from "vscode";
import { type LanguageClientOptions, type ServerOptions, TransportKind } from "vscode-languageclient/node";

/**
 * Resolve the language server module path.
 * Prefers the bundled server (packaged extension) and falls back to the dev build.
 */
export function resolveServerModule(context: vscode.ExtensionContext): string {
	const bundledServerPath = context.asAbsolutePath(path.join("server", "server.js"));
	const devServerPath = context.asAbsolutePath(path.join("..", "language-server", "dist", "server.js"));
	return existsSync(bundledServerPath) ? bundledServerPath : devServerPath;
}

/** Build ServerOptions for both run and debug modes. */
export function createServerOptions(serverModule: string): ServerOptions {
	return {
		run: { module: serverModule, transport: TransportKind.ipc },
		debug: {
			module: serverModule,
			transport: TransportKind.ipc,
			options: { execArgv: ["--nolazy", "--inspect=6009"] },
		},
	};
}

/** Build LanguageClientOptions targeting .loot files. */
export function createClientOptions(): LanguageClientOptions {
	return {
		documentSelector: [{ scheme: "file", language: "lootiscript" }],
		synchronize: {
			fileEvents: vscode.workspace.createFileSystemWatcher("**/*.loot"),
		},
	};
}
