/**
 * Custom error classes for CLI
 *
 * Provides structured error handling with context information.
 */

import pc from "picocolors";
import type { ExitCode } from "./exit-codes";
import { EXIT_CODES } from "./exit-codes";

/**
 * Base CLI error class
 */
export class CLIError extends Error {
	public readonly exitCode: ExitCode;

	constructor(
		message: string,
		public readonly code?: string,
		public readonly context?: Record<string, unknown>,
		exitCode: ExitCode = EXIT_CODES.ERROR,
	) {
		super(message);
		this.name = "CLIError";
		this.exitCode = exitCode;
		Object.setPrototypeOf(this, CLIError.prototype);
	}

	/**
	 * Format error for console output
	 */
	format(): string {
		let output = pc.red(`\n✗ ${this.message}\n`);

		if (this.context && Object.keys(this.context).length > 0) {
			output += pc.gray("\nContext:\n");
			for (const [key, value] of Object.entries(this.context)) {
				output += pc.gray(`  ${key}: ${String(value)}\n`);
			}
		}

		return output;
	}
}

/**
 * Configuration error
 */
export class ConfigError extends CLIError {
	constructor(message: string, context?: Record<string, unknown>, exitCode: ExitCode = EXIT_CODES.INVALID_USAGE) {
		super(message, "CONFIG_ERROR", context, exitCode);
		this.name = "ConfigError";
		Object.setPrototypeOf(this, ConfigError.prototype);
	}
}

/**
 * Build error
 */
export class BuildError extends CLIError {
	constructor(message: string, context?: Record<string, unknown>) {
		super(message, "BUILD_ERROR", context);
		this.name = "BuildError";
		Object.setPrototypeOf(this, BuildError.prototype);
	}
}

/**
 * Compilation error
 */
export class CompilationError extends CLIError {
	constructor(
		message: string,
		public readonly file?: string,
		public readonly line?: number,
		public readonly column?: number,
		context?: Record<string, unknown>,
	) {
		super(message, "COMPILATION_ERROR", {
			file,
			line,
			column,
			...context,
		});
		this.name = "CompilationError";
		Object.setPrototypeOf(this, CompilationError.prototype);
	}

	format(): string {
		let output = pc.red(`\n✗ Compilation error`);

		if (this.file) {
			output += pc.gray(` in ${this.file}`);
		}

		if (this.line !== undefined) {
			output += pc.gray(` (line ${this.line}`);
			if (this.column !== undefined) {
				output += pc.gray(`, column ${this.column}`);
			}
			output += pc.gray(")");
		}

		output += pc.red(`\n  ${this.message}\n`);

		return output;
	}
}

/**
 * Server error
 */
export class ServerError extends CLIError {
	constructor(message: string, context?: Record<string, unknown>) {
		super(message, "SERVER_ERROR", context);
		this.name = "ServerError";
		Object.setPrototypeOf(this, ServerError.prototype);
	}
}
