import * as vscode from "vscode";

export type GlobalApiEntry = {
	type: string;
	description: string;
	signature?: string;
	properties?: Record<string, GlobalApiEntry>;
};

export type GlobalApiMap = Record<string, GlobalApiEntry>;

type ProviderState = "loading" | "ready" | "error";

export class ApiProvider implements vscode.TreeDataProvider<ApiItem> {
	private readonly _onDidChangeTreeData = new vscode.EventEmitter<ApiItem | undefined | void>();
	readonly onDidChangeTreeData = this._onDidChangeTreeData.event;

	private apiData?: GlobalApiMap;
	private state: ProviderState = "loading";
	private errorMessage?: string;

	setLoading(): void {
		this.state = "loading";
		this.errorMessage = undefined;
		this._onDidChangeTreeData.fire();
	}

	setApiData(data: GlobalApiMap): void {
		this.apiData = data;
		this.state = "ready";
		this.errorMessage = undefined;
		this._onDidChangeTreeData.fire();
	}

	setError(message: string): void {
		this.apiData = undefined;
		this.state = "error";
		this.errorMessage = message;
		this._onDidChangeTreeData.fire();
	}

	refresh(): void {
		this._onDidChangeTreeData.fire();
	}

	getTreeItem(element: ApiItem): vscode.TreeItem {
		return element;
	}

	getChildren(element?: ApiItem): Promise<ApiItem[]> {
		if (this.state === "loading") {
			return Promise.resolve([ApiItem.message("Loading API reference…")]);
		}

		if (this.state === "error") {
			return Promise.resolve([ApiItem.message(this.errorMessage ?? "Unable to load API reference", true)]);
		}

		if (!this.apiData) {
			return Promise.resolve([ApiItem.message("API reference unavailable", true)]);
		}

		if (!element) {
			const categories = Object.entries(this.apiData).filter(([, entry]) => entry.properties && Object.keys(entry.properties).length > 0);

			if (categories.length === 0) {
				return Promise.resolve([ApiItem.message("No API sections registered", true)]);
			}

			return Promise.resolve(categories.map(([key, entry]) => ApiItem.category(key, entry.description)));
		}

		const entry = element.category ? this.apiData[element.category] : undefined;
		if (!entry?.properties) {
			return Promise.resolve([]);
		}

		return Promise.resolve(Object.entries(entry.properties).map(([name, prop]) => ApiItem.member(element.category!, name, prop)));
	}
}

class ApiItem extends vscode.TreeItem {
	private constructor(
		label: string,
		description: string | undefined,
		collapsibleState: vscode.TreeItemCollapsibleState,
		public readonly category?: string,
		iconId?: string,
	) {
		super(label, collapsibleState);
		this.description = description;
		this.tooltip = description;
		if (iconId) {
			this.iconPath = new vscode.ThemeIcon(iconId);
		}
	}

	static category(key: string, description: string): ApiItem {
		return new ApiItem(key, description, vscode.TreeItemCollapsibleState.Collapsed, key, "symbol-namespace");
	}

	static member(category: string, name: string, prop: GlobalApiEntry): ApiItem {
		const signatureSuffix = prop.type === "method" && !name.endsWith("()") ? "()" : "";
		const detail = prop.signature ?? prop.description;
		const item = new ApiItem(
			`${name}${signatureSuffix}`,
			detail,
			vscode.TreeItemCollapsibleState.None,
			category,
			prop.type === "method" ? "symbol-method" : "symbol-property",
		);

		if (prop.signature && prop.description) {
			item.tooltip = `${prop.description}\n\n${prop.signature}`;
		}

		return item;
	}

	static message(label: string, isError = false): ApiItem {
		return new ApiItem(label, undefined, vscode.TreeItemCollapsibleState.None, undefined, isError ? "error" : "loading~spin");
	}
}
