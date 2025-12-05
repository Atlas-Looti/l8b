/**
 * Structured logger for CLI
 *
 * Provides log levels and structured logging with support for
 * verbose/quiet modes.
 */

import pc from "picocolors";
import { LogLevel } from "../core/ports";

/**
 * Logger class for structured logging
 */
export class Logger {
	private level: LogLevel;

	constructor(level: LogLevel = LogLevel.INFO) {
		this.level = level;
	}

	/**
	 * Set log level
	 */
	setLevel(level: LogLevel): void {
		this.level = level;
	}

	/**
	 * Get current log level
	 */
	getLevel(): LogLevel {
		return this.level;
	}

	/**
	 * Log error message
	 */
	error(message: string, ...args: unknown[]): void {
		if (this.level >= LogLevel.ERROR) {
			console.error(pc.red(`✗ ${message}`), ...args);
		}
	}

	/**
	 * Log warning message
	 */
	warn(message: string, ...args: unknown[]): void {
		if (this.level >= LogLevel.WARN) {
			console.warn(pc.yellow(`⚠ ${message}`), ...args);
		}
	}

	/**
	 * Log info message
	 */
	info(message: string, ...args: unknown[]): void {
		if (this.level >= LogLevel.INFO) {
			console.log(pc.cyan(message), ...args);
		}
	}

	/**
	 * Log success message
	 */
	success(message: string, ...args: unknown[]): void {
		if (this.level >= LogLevel.INFO) {
			console.log(pc.green(`✓ ${message}`), ...args);
		}
	}

	/**
	 * Log debug message
	 */
	debug(message: string, ...args: unknown[]): void {
		if (this.level >= LogLevel.DEBUG) {
			console.log(pc.gray(`[DEBUG] ${message}`), ...args);
		}
	}

	/**
	 * Log raw message (no formatting)
	 */
	raw(message: string, ...args: unknown[]): void {
		console.log(message, ...args);
	}
}

/**
 * Global logger instance
 */
export const logger = new Logger();

/**
 * Create logger with specific level
 */
export function createLogger(level: LogLevel): Logger {
	return new Logger(level);
}

