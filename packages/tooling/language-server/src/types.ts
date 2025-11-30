import type { Range } from "vscode-languageserver/node";
import type { TextDocument } from "vscode-languageserver-textdocument";

// Simple AST node interface
export interface ASTNode {
    type: string;
    name?: string;
    line: number;
    column: number;
    endLine?: number;
    endColumn?: number;
    children?: ASTNode[];
    scope?: Scope;
}

export interface Scope {
    parent?: Scope;
    symbols: Map<string, SymbolInfo>;
}

export interface SymbolInfo {
    name: string;
    type: "function" | "variable" | "argument" | "global";
    range: Range;
    documentUri: string;
}

// Document state storage
export interface DocumentState {
    textDocument: TextDocument;
    ast: ASTNode | null;
    scope: Scope | null;
    symbols: SymbolInfo[];
}

export interface LootiScriptSettings {
    diagnostics: { enable: boolean };
    completion: { enable: boolean };
    signatureHelp: { enable: boolean };
    format: { enable: boolean; indentSize: number };
}

export type PartialLootiScriptSettings = {
    diagnostics?: Partial<LootiScriptSettings["diagnostics"]>;
    completion?: Partial<LootiScriptSettings["completion"]>;
    signatureHelp?: Partial<LootiScriptSettings["signatureHelp"]>;
    format?: Partial<LootiScriptSettings["format"]>;
};

export interface CompletionContext {
    type: "property" | "function_call" | "default";
    object?: string;
    inFunctionCall?: boolean;
}

export interface ApiDefinition {
    type: string;
    description: string;
    signature?: string;
    properties?: Record<string, { type: string; description: string; signature?: string }>;
}

export type GlobalApi = Record<string, ApiDefinition>;
