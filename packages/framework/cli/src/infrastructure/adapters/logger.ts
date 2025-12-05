/**
 * Console Logger Adapter
 *
 * Implementation of ILogger using picocolors
 */

import pc from "picocolors";
import type { ILogger } from "../../core/ports";
import { LogLevel } from "../../core/ports";

export class ConsoleLogger implements ILogger {
	private level: LogLevel;

	constructor(level: LogLevel = LogLevel.INFO) {
		this.level = level;
	}

	setLevel(level: LogLevel): void {
		this.level = level;
	}

	getLevel(): LogLevel {
		return this.level;
	}

	error(message: string, ...args: unknown[]): void {
		if (this.level >= LogLevel.ERROR) {
			console.error(pc.red(`✗ ${message}`), ...args);
		}
	}

	warn(message: string, ...args: unknown[]): void {
		if (this.level >= LogLevel.WARN) {
			console.warn(pc.yellow(`⚠ ${message}`), ...args);
		}
	}

	info(message: string, ...args: unknown[]): void {
		if (this.level >= LogLevel.INFO) {
			console.log(pc.cyan(message), ...args);
		}
	}

	success(message: string, ...args: unknown[]): void {
		if (this.level >= LogLevel.INFO) {
			console.log(pc.green(`✓ ${message}`), ...args);
		}
	}

	debug(message: string, ...args: unknown[]): void {
		if (this.level >= LogLevel.DEBUG) {
			console.log(pc.gray(`[DEBUG] ${message}`), ...args);
		}
	}

	raw(message: string, ...args: unknown[]): void {
		console.log(message, ...args);
	}
}

// LogLevel is exported from core/ports.ts
