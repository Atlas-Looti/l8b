import * as vscode from "vscode";

export class ExamplesProvider implements vscode.TreeDataProvider<ExampleItem> {
	private _onDidChangeTreeData: vscode.EventEmitter<ExampleItem | undefined | void> = new vscode.EventEmitter<ExampleItem | undefined | void>();
	readonly onDidChangeTreeData: vscode.Event<ExampleItem | undefined | void> = this._onDidChangeTreeData.event;

	refresh(): void {
		this._onDidChangeTreeData.fire();
	}

	getTreeItem(element: ExampleItem): vscode.TreeItem {
		return element;
	}

	getChildren(element?: ExampleItem): Thenable<ExampleItem[]> {
		if (element) {
			return Promise.resolve([]);
		}

		return Promise.resolve([
			new ExampleItem(
				"Hello World",
				"Basic game loop with text",
				`init = function()
\tprint("Game started!")
end

draw = function()
\tscreen.clearScreen("#000")
\tscreen.drawText("Hello World!", 100, 100, "#FFF", 24)
end`,
			),
			new ExampleItem(
				"Moving Player",
				"Player movement with keyboard",
				`player = { x = 100, y = 100 }

update = function()
\tif input.keyboard.pressed("ArrowLeft") then
\t\tplayer.x = player.x - 2
\tend
\tif input.keyboard.pressed("ArrowRight") then
\t\tplayer.x = player.x + 2
\tend
end

draw = function()
\tscreen.clearScreen("#000")
\tscreen.fillRect(player.x, player.y, 20, 20, "#FF0000")
end`,
			),
			new ExampleItem(
				"Arrow Functions",
				"Modern arrow function syntax",
				`// Arrow function expression
add = (a, b) => a + b

// Arrow function block
update = () => {
\tprint("Updating...")
}`,
			),
			new ExampleItem(
				"Template Strings",
				"String interpolation",
				`player = { name = "Alice", score = 100 }

// Template string with interpolation
message = \`Player \${player.name} has \${player.score} points\`
print(message)`,
			),
			new ExampleItem(
				"List Operations",
				"Array manipulation",
				`numbers = [1, 2, 3, 4, 5]

// Filter even numbers
evens = List.filter(numbers, (n) => n % 2 == 0)

// Map to squares
squares = List.map(numbers, (n) => n * n)

// Sum
total = List.sum(numbers)`,
			),
		]);
	}
}

class ExampleItem extends vscode.TreeItem {
	constructor(
		public readonly label: string,
		public description: string,
		private code: string,
	) {
		super(label, vscode.TreeItemCollapsibleState.None);
		this.tooltip = description;
		this.description = description;
		this.iconPath = new vscode.ThemeIcon("file-code");

		// Add command to insert code
		this.command = {
			command: "lootiscript.insertExample",
			title: "Insert Example",
			arguments: [code],
		};
	}
}
