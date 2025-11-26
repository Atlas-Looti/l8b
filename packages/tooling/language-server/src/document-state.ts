import { TextDocument } from "vscode-languageserver-textdocument";
import { Parser } from "@l8b/lootiscript/dist/v1/parser";
import { Range, Position } from "vscode-languageserver/node";
import { Connection } from "vscode-languageserver/node";
import { ASTNode, Scope, SymbolInfo, DocumentState } from "./types";

const documentStates: Map<string, DocumentState> = new Map();

export function getDocumentStates(): Map<string, DocumentState> {
	return documentStates;
}

export function updateDocumentState(
	textDocument: TextDocument,
	connection: Connection,
): void {
	const text = textDocument.getText();
	const state: DocumentState = {
		textDocument,
		ast: null,
		scope: null,
		symbols: [],
	};

	try {
		const parser = new Parser(text, textDocument.uri);
		parser.parse();

		const ast = convertParserAst(parser);
		const scope = buildScope(ast);
		const symbols = collectSymbols(ast, textDocument.uri);

		state.ast = ast;
		state.scope = scope;
		state.symbols = symbols;
	} catch (err) {
		connection.console.error(`AST build failed: ${err}`);
	}

	documentStates.set(textDocument.uri, state);
}

export function deleteDocumentState(uri: string): void {
	documentStates.delete(uri);
}

function convertParserAst(parser: any): ASTNode | null {
	const root = {
		type: "root",
		line: 1,
		column: 0,
		children: [],
		scope: {
			symbols: new Map(),
		},
	} as ASTNode;

	const statements = parser.program?.statements || [];
	for (const stmt of statements) {
		root.children?.push(convertNode(stmt));
	}

	return root;
}

function convertNode(node: any): ASTNode {
	const base: ASTNode = {
		type: node.constructor?.name || "Unknown",
		line: node?.token?.line || 1,
		column: node?.token?.column || 0,
		endLine: node?.token?.line || 1,
		endColumn: node?.token?.column || 0,
		children: [],
	};

	if (node.identifier) {
		base.name = node.identifier;
	}

	if (node.sequence) {
		for (const child of node.sequence) {
			base.children?.push(convertNode(child));
		}
	}

	if (node.body) {
		for (const child of node.body) {
			base.children?.push(convertNode(child));
		}
	}

	if (node.expression) {
		base.children?.push(convertNode(node.expression));
	}

	if (node.statements) {
		for (const child of node.statements) {
			base.children?.push(convertNode(child));
		}
	}

	if (node.function_body) {
		for (const child of node.function_body) {
			base.children?.push(convertNode(child));
		}
	}

	return base;
}

function buildScope(ast: ASTNode | null, parent?: Scope): Scope | null {
	if (!ast) return null;

	const scope: Scope = {
		parent,
		symbols: new Map(),
	};

	if (ast.children) {
		for (const child of ast.children) {
			buildScope(child, scope);
		}
	}

	ast.scope = scope;
	return scope;
}

function collectSymbols(ast: ASTNode | null, uri: string): SymbolInfo[] {
	if (!ast) return [];
	const symbols: SymbolInfo[] = [];

	function visit(node: ASTNode) {
		if (node.type === "Function" && node.name) {
			const symbol: SymbolInfo = {
				name: node.name,
				type: "function",
				documentUri: uri,
				range: buildRange(node),
			};
			symbols.push(symbol);
			node.scope?.symbols.set(node.name, symbol);
		} else if (node.type === "Assignment" && node.name) {
			const symbol: SymbolInfo = {
				name: node.name,
				type: "variable",
				documentUri: uri,
				range: buildRange(node),
			};
			symbols.push(symbol);
			node.scope?.symbols.set(node.name, symbol);
		}

		if (node.children) {
			for (const child of node.children) {
				visit(child);
			}
		}
	}

	visit(ast);
	return symbols;
}

function buildRange(node: ASTNode): Range {
	return Range.create(
		Position.create(Math.max(node.line - 1, 0), Math.max(node.column, 0)),
		Position.create(
			Math.max((node.endLine || node.line) - 1, 0),
			Math.max(node.endColumn || node.column + (node.name?.length || 1), 0),
		),
	);
}


