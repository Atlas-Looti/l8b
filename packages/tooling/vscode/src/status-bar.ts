/**
 * Status-bar helpers — pure functions that receive the StatusBarItem as a parameter.
 * No module-level state; the item is owned by extension.ts.
 */

import * as vscode from "vscode";

/**
 * Recompute status-bar text/tooltip/colour from the current workspace diagnostics.
 * Only counts diagnostics for LootiScript (.loot) files.
 */
export function updateStatusBarWithDiagnostics(statusBarItem: vscode.StatusBarItem): void {
	const diagnostics = vscode.languages.getDiagnostics();
	let totalErrors = 0;
	let totalWarnings = 0;

	for (const [uri, diags] of diagnostics) {
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

	if (totalErrors > 0) {
		statusBarItem.text = "$(error) L8B";
		statusBarItem.tooltip = `LootiScript: ${totalErrors} error${totalErrors !== 1 ? "s" : ""}${totalWarnings > 0 ? `, ${totalWarnings} warning${totalWarnings !== 1 ? "s" : ""}` : ""}`;
		statusBarItem.backgroundColor = new vscode.ThemeColor("statusBarItem.errorBackground");
	} else if (totalWarnings > 0) {
		statusBarItem.text = "$(warning) L8B";
		statusBarItem.tooltip = `LootiScript: ${totalWarnings} warning${totalWarnings !== 1 ? "s" : ""}`;
		statusBarItem.backgroundColor = new vscode.ThemeColor("statusBarItem.warningBackground");
	} else {
		statusBarItem.text = "$(pass) L8B";
		statusBarItem.tooltip = "LootiScript Language Server: No problems";
		statusBarItem.backgroundColor = undefined;
	}
}

/**
 * Build an enhanced Hover for a diagnostic.
 * Shows error code, cleaned message, related information, and a docs link.
 */
export function createEnhancedHover(diagnostic: vscode.Diagnostic): vscode.Hover {
	const contents: vscode.MarkdownString[] = [];

	const message = diagnostic.message;
	const errorCodeMatch = message.match(/\[([A-Z]\d+)\]/);
	const errorCode = errorCodeMatch ? errorCodeMatch[1] : (diagnostic.code as string | undefined);

	const mainContent = new vscode.MarkdownString();
	if (errorCode) {
		mainContent.appendMarkdown(`**Error Code:** \`${errorCode}\`\n\n`);
	}
	const cleanMessage = message.replace(/^\[[A-Z]\d+\]\s*/, "");
	mainContent.appendMarkdown(`**Error:** ${cleanMessage}\n\n`);
	contents.push(mainContent);

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

	if (message.includes("💡") || message.includes("Suggestion")) {
		const suggestionContent = new vscode.MarkdownString();
		suggestionContent.appendMarkdown("**💡 Suggestions:**\n\n");
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

	if (errorCode) {
		const docContent = new vscode.MarkdownString();
		docContent.appendMarkdown(`[View Error Documentation](https://l8b.dev/docs/errors#${errorCode.toLowerCase()})`);
		contents.push(docContent);
	}

	return new vscode.Hover(contents, diagnostic.range);
}
