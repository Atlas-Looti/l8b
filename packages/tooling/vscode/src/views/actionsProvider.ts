import * as vscode from "vscode";

export class ActionsProvider implements vscode.TreeDataProvider<ActionItem> {
	private _onDidChangeTreeData: vscode.EventEmitter<ActionItem | undefined | void> = new vscode.EventEmitter<ActionItem | undefined | void>();
	readonly onDidChangeTreeData: vscode.Event<ActionItem | undefined | void> = this._onDidChangeTreeData.event;

	refresh(): void {
		this._onDidChangeTreeData.fire();
	}

	getTreeItem(element: ActionItem): vscode.TreeItem {
		return element;
	}

	getChildren(element?: ActionItem): Thenable<ActionItem[]> {
		if (element) {
			return Promise.resolve([]);
		}

		return Promise.resolve([
			new ActionItem("Format Document", "Format current .loot file", vscode.TreeItemCollapsibleState.None, {
				command: "lootiscript.formatDocument",
				title: "Format Document",
			}),
			new ActionItem("Run Script", "Run current .loot file", vscode.TreeItemCollapsibleState.None, {
				command: "lootiscript.runScript",
				title: "Run Script",
			}),
			new ActionItem("Restart Language Server", "Restart LootiScript Language Server", vscode.TreeItemCollapsibleState.None, {
				command: "lootiscript.restartLanguageServer",
				title: "Restart Language Server",
			}),
		]);
	}
}

class ActionItem extends vscode.TreeItem {
	constructor(
		public readonly label: string,
		public description: string,
		public readonly collapsibleState: vscode.TreeItemCollapsibleState,
		public readonly command?: vscode.Command,
	) {
		super(label, collapsibleState);
		this.tooltip = description;
		this.description = description;
	}

	iconPath = new vscode.ThemeIcon("zap");
}
