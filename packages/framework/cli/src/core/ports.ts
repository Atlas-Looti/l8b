/**
 * Ports (Interfaces)
 *
 * All port interfaces for dependency inversion
 */

import type {
	CompiledModule,
	LootiConfig,
	Resources,
	ContractABI,
	Diagnostic,
	CompiledRoutine,
	ViteDevServer,
} from "./types";

// File System
export interface IFileSystem {
	pathExists(path: string): Promise<boolean>;
	readFile(filePath: string, encoding?: string): Promise<string>;
	writeFile(filePath: string, content: string, encoding?: string): Promise<void>;
	readJson<T = unknown>(filePath: string): Promise<T>;
	writeJson(filePath: string, object: unknown, options?: { spaces?: number }): Promise<void>;
	ensureDir(dirPath: string): Promise<void>;
	copy(src: string, dest: string, options?: { overwrite?: boolean; filter?: (src: string) => boolean }): Promise<void>;
	remove(path: string): Promise<void>;
	readdir(dirPath: string, options?: { withFileTypes?: boolean }): Promise<string[] | import("fs").Dirent[]>;
	stat(path: string): Promise<import("fs").Stats>;
	existsSync(path: string): boolean;
	statSync(path: string): import("fs").Stats;
}

// Logger
export enum LogLevel {
	ERROR = 0,
	WARN = 1,
	INFO = 2,
	DEBUG = 3,
}

export interface ILogger {
	setLevel(level: LogLevel): void;
	getLevel(): LogLevel;
	error(message: string, ...args: unknown[]): void;
	warn(message: string, ...args: unknown[]): void;
	info(message: string, ...args: unknown[]): void;
	success(message: string, ...args: unknown[]): void;
	debug(message: string, ...args: unknown[]): void;
	raw(message: string, ...args: unknown[]): void;
}

// Config Loader
export interface IConfigLoader {
	loadConfig(projectPath: string): Promise<LootiConfig>;
	getCanvasSize(config: LootiConfig): { width: number; height: number };
}

// Source Loader
export interface ISourceLoader {
	loadSources(projectPath: string): Promise<Record<string, string>>;
	readSourceContent(filePath: string): Promise<string>;
}

// Resource Detector
export interface IResourceDetector {
	detectResources(projectPath: string): Promise<Resources>;
}

// Compiler
export interface CompileError {
	file?: string;
	error: string;
	line?: number;
	column?: number;
	code?: string;
	context?: string;
	suggestions?: string[];
	diagnostic?: Diagnostic;
}

export interface CompileWarning {
	file?: string;
	warning: string;
	line?: number;
	column?: number;
	code?: string;
	context?: string;
	suggestions?: string[];
	diagnostic?: Diagnostic;
}

export interface CompileResult {
	compiled: CompiledModule[];
	errors: CompileError[];
	warnings: CompileWarning[];
}

export interface ICompiler {
	compileFile(
		filePath: string,
		filename: string,
	): Promise<{
		routine?: CompiledRoutine;
		errors: CompileError[];
		warnings: CompileWarning[];
		filename: string;
	}>;
	compileSources(sources: Record<string, string>, projectPath: string): Promise<CompileResult>;
	saveCompiled(compiled: CompiledModule[], outputDir: string): Promise<void>;
}

// Bundler
export interface IBundler {
	bundleRuntime(distDir: string, projectPath: string): Promise<void>;
}

// HTML Generator
export interface IHTMLGenerator {
	generateHTML(
		config: LootiConfig,
		sources: Record<string, string>,
		resources: Resources,
		compiledModules?: CompiledModule[],
		routePath?: string,
		env?: Record<string, string>,
	): string;
	generate404HTML(config: LootiConfig, isProduction?: boolean): string;
}

// Contract Fetcher
export interface IContractFetcher {
	fetchABI(address: string, chain: string, apiKey?: string): Promise<ContractABI>;
}

// Dev Server
export interface DevServerOptions {
	port?: number;
	host?: string | boolean;
	tunnel?: boolean;
}

export interface IDevServer {
	start(projectPath: string, options?: DevServerOptions): Promise<ViteDevServer>;
}

