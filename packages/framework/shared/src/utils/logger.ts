/**
 * Logging utilities for L8B framework
 */

type LogLevel = "debug" | "info" | "warn" | "error" | "silent";

const LEVEL_PRIORITY: Record<LogLevel, number> = {
	debug: 0,
	info: 1,
	warn: 2,
	error: 3,
	silent: 4,
};

const COLORS = {
	reset: "\x1b[0m",
	bright: "\x1b[1m",
	dim: "\x1b[2m",
	red: "\x1b[31m",
	green: "\x1b[32m",
	yellow: "\x1b[33m",
	blue: "\x1b[34m",
	magenta: "\x1b[35m",
	cyan: "\x1b[36m",
	white: "\x1b[37m",
	gray: "\x1b[90m",
} as const;

/**
 * Logger class for L8B framework
 */
export class Logger {
	private prefix: string;
	private level: LogLevel;

	constructor(prefix = "l8b", level: LogLevel = "info") {
		this.prefix = prefix;
		this.level = level;
	}

	private shouldLog(level: LogLevel): boolean {
		return LEVEL_PRIORITY[level] >= LEVEL_PRIORITY[this.level];
	}

	private formatTime(): string {
		const now = new Date();
		return `${COLORS.gray}${now.toLocaleTimeString()}${COLORS.reset}`;
	}

	private formatPrefix(): string {
		return `${COLORS.cyan}[${this.prefix}]${COLORS.reset}`;
	}

	setLevel(level: LogLevel): void {
		this.level = level;
	}

	debug(...args: unknown[]): void {
		if (this.shouldLog("debug")) {
			console.log(this.formatTime(), this.formatPrefix(), `${COLORS.gray}DEBUG${COLORS.reset}`, ...args);
		}
	}

	info(...args: unknown[]): void {
		if (this.shouldLog("info")) {
			console.log(this.formatTime(), this.formatPrefix(), `${COLORS.green}INFO${COLORS.reset}`, ...args);
		}
	}

	warn(...args: unknown[]): void {
		if (this.shouldLog("warn")) {
			console.warn(this.formatTime(), this.formatPrefix(), `${COLORS.yellow}WARN${COLORS.reset}`, ...args);
		}
	}

	error(...args: unknown[]): void {
		if (this.shouldLog("error")) {
			console.error(this.formatTime(), this.formatPrefix(), `${COLORS.red}ERROR${COLORS.reset}`, ...args);
		}
	}

	success(...args: unknown[]): void {
		if (this.shouldLog("info")) {
			console.log(this.formatTime(), this.formatPrefix(), `${COLORS.green}✓${COLORS.reset}`, ...args);
		}
	}

	box(title: string, content: string): void {
		if (this.shouldLog("info")) {
			const lines = content.split("\n");
			const maxLen = Math.max(title.length, ...lines.map((l) => l.length));
			const border = "─".repeat(maxLen + 2);

			console.log(`${COLORS.cyan}┌${border}┐${COLORS.reset}`);
			console.log(
				`${COLORS.cyan}│${COLORS.reset} ${COLORS.bright}${title.padEnd(maxLen)}${COLORS.reset} ${COLORS.cyan}│${COLORS.reset}`,
			);
			console.log(`${COLORS.cyan}├${border}┤${COLORS.reset}`);
			for (const line of lines) {
				console.log(`${COLORS.cyan}│${COLORS.reset} ${line.padEnd(maxLen)} ${COLORS.cyan}│${COLORS.reset}`);
			}
			console.log(`${COLORS.cyan}└${border}┘${COLORS.reset}`);
		}
	}
}

/**
 * Default logger instance
 */
export const logger = new Logger();

/**
 * Create a namespaced logger
 */
export function createLogger(namespace: string, level?: LogLevel): Logger {
	return new Logger(`l8b:${namespace}`, level);
}
