import * as vscode from "vscode";

export class ApiProvider implements vscode.TreeDataProvider<ApiItem> {
	private _onDidChangeTreeData: vscode.EventEmitter<
		ApiItem | undefined | void
	> = new vscode.EventEmitter<ApiItem | undefined | void>();
	readonly onDidChangeTreeData: vscode.Event<ApiItem | undefined | void> =
		this._onDidChangeTreeData.event;

	refresh(): void {
		this._onDidChangeTreeData.fire();
	}

	getTreeItem(element: ApiItem): vscode.TreeItem {
		return element;
	}

	getChildren(element?: ApiItem): Thenable<ApiItem[]> {
		if (!element) {
			// Root level - show API categories
			return Promise.resolve([
				new ApiItem(
					"Screen",
					"Drawing and display",
					vscode.TreeItemCollapsibleState.Collapsed,
					"screen",
				),
				new ApiItem(
					"Audio",
					"Sound and music",
					vscode.TreeItemCollapsibleState.Collapsed,
					"audio",
				),
				new ApiItem(
					"Input",
					"Keyboard, mouse, gamepad",
					vscode.TreeItemCollapsibleState.Collapsed,
					"input",
				),
				new ApiItem(
					"System",
					"System utilities",
					vscode.TreeItemCollapsibleState.Collapsed,
					"system",
				),
				new ApiItem(
					"List",
					"Array manipulation",
					vscode.TreeItemCollapsibleState.Collapsed,
					"list",
				),
				new ApiItem(
					"Math",
					"Mathematical functions",
					vscode.TreeItemCollapsibleState.Collapsed,
					"math",
				),
				new ApiItem(
					"String",
					"String utilities",
					vscode.TreeItemCollapsibleState.Collapsed,
					"string",
				),
				new ApiItem(
					"JSON",
					"JSON encoding/decoding",
					vscode.TreeItemCollapsibleState.Collapsed,
					"json",
				),
			]);
		}

		// Child level - show methods for each category
		switch (element.category) {
			case "screen":
				return Promise.resolve([
					new ApiItem(
						"clearScreen()",
						"Clear screen with color",
						vscode.TreeItemCollapsibleState.None,
					),
					new ApiItem(
						"drawSprite()",
						"Draw sprite",
						vscode.TreeItemCollapsibleState.None,
					),
					new ApiItem(
						"fillRect()",
						"Fill rectangle",
						vscode.TreeItemCollapsibleState.None,
					),
					new ApiItem(
						"drawText()",
						"Draw text",
						vscode.TreeItemCollapsibleState.None,
					),
					new ApiItem(
						"setColor()",
						"Set drawing color",
						vscode.TreeItemCollapsibleState.None,
					),
				]);
			case "audio":
				return Promise.resolve([
					new ApiItem(
						"beep()",
						"Play beep sound",
						vscode.TreeItemCollapsibleState.None,
					),
					new ApiItem(
						"playSound()",
						"Play sound",
						vscode.TreeItemCollapsibleState.None,
					),
					new ApiItem(
						"playMusic()",
						"Play background music",
						vscode.TreeItemCollapsibleState.None,
					),
				]);
			case "input":
				return Promise.resolve([
					new ApiItem(
						"keyboard",
						"Keyboard input state",
						vscode.TreeItemCollapsibleState.None,
					),
					new ApiItem(
						"mouse",
						"Mouse input state",
						vscode.TreeItemCollapsibleState.None,
					),
					new ApiItem(
						"touch",
						"Touch input state",
						vscode.TreeItemCollapsibleState.None,
					),
				]);
			case "list":
				return Promise.resolve([
					new ApiItem(
						"map()",
						"Map over array",
						vscode.TreeItemCollapsibleState.None,
					),
					new ApiItem(
						"filter()",
						"Filter array",
						vscode.TreeItemCollapsibleState.None,
					),
					new ApiItem(
						"reduce()",
						"Reduce array",
						vscode.TreeItemCollapsibleState.None,
					),
					new ApiItem(
						"find()",
						"Find element",
						vscode.TreeItemCollapsibleState.None,
					),
				]);
			case "math":
				return Promise.resolve([
					new ApiItem(
						"clamp()",
						"Clamp value",
						vscode.TreeItemCollapsibleState.None,
					),
					new ApiItem(
						"lerp()",
						"Linear interpolation",
						vscode.TreeItemCollapsibleState.None,
					),
					new ApiItem(
						"distance()",
						"2D distance",
						vscode.TreeItemCollapsibleState.None,
					),
					new ApiItem(
						"degToRad()",
						"Degrees to radians",
						vscode.TreeItemCollapsibleState.None,
					),
				]);
			default:
				return Promise.resolve([]);
		}
	}
}

class ApiItem extends vscode.TreeItem {
	constructor(
		public readonly label: string,
		private desc: string,
		public readonly collapsibleState: vscode.TreeItemCollapsibleState,
		public readonly category?: string,
	) {
		super(label, collapsibleState);
		this.tooltip = desc;
		this.description = desc;

		if (collapsibleState === vscode.TreeItemCollapsibleState.None) {
			this.iconPath = new vscode.ThemeIcon("symbol-method");
		} else {
			this.iconPath = new vscode.ThemeIcon("symbol-class");
		}
	}
}
