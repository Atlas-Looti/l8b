/**
 * Core types for diagnostics system
 */

/**
 * Severity level of a diagnostic
 */
export enum DiagnosticSeverity {
	Error = "error",
	Warning = "warning",
	Info = "info",
}

/**
 * Diagnostic code categories
 */
export enum DiagnosticCategory {
	Syntax = "syntax",
	Runtime = "runtime",
	Compilation = "compilation",
	Type = "type",
	Scene = "scene",
	CLI = "cli",
	API = "api",
}

/**
 * Related location for diagnostics (e.g., where function started)
 */
export interface RelatedLocation {
	file: string;
	line: number;
	column: number;
	message: string;
}

/**
 * Call frame for stack traces
 */
export interface CallFrame {
	functionName: string;
	file: string;
	line: number;
	column: number;
}

/**
 * Base diagnostic information
 */
export interface Diagnostic {
	/** Diagnostic code (e.g., "E1001") */
	code: string;
	/** Severity level */
	severity: DiagnosticSeverity;
	/** Formatted message */
	message: string;
	/** Optional file path */
	file?: string;
	/** Optional line number (1-based) */
	line?: number;
	/** Optional column number (1-based) */
	column?: number;
	/** Optional error span length */
	length?: number;
	/** Optional source context */
	context?: string;
	/** Optional fix suggestions */
	suggestions?: string[];
	/** Optional related location */
	related?: RelatedLocation;
	/** Optional stack trace */
	stackTrace?: CallFrame[];
	/** Optional category */
	category?: DiagnosticCategory;
	/** Optional additional data */
	data?: Record<string, unknown>;
}

/**
 * Message template function arguments
 */
export interface MessageArgs {
	[key: string]: string | number | boolean | undefined;
}

/**
 * Message template definition
 */
export interface MessageTemplate {
	/** Diagnostic code */
	code: string;
	/** Severity level */
	severity: DiagnosticSeverity;
	/** Message template (string or function) */
	message: string | ((args: MessageArgs) => string);
	/** Optional description */
	description?: string;
	/** Optional default suggestions */
	suggestions?: string[] | ((args: MessageArgs) => string[]);
	/** Optional category */
	category?: DiagnosticCategory;
}
