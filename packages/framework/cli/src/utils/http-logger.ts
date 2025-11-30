/**
 * HTTP Request Logger for Development
 *
 * Logs HTTP requests made from LootiScript for debugging
 */

import pc from "picocolors";

export interface HttpLogEntry {
	method: string;
	url: string;
	status?: number;
	time?: number;
	size?: number;
	error?: string;
	timestamp: number;
}

class HttpLogger {
	private logs: HttpLogEntry[] = [];
	private maxLogs: number = 100;
	private enabled: boolean = true;

	/**
	 * Enable or disable logging
	 */
	setEnabled(enabled: boolean): void {
		this.enabled = enabled;
	}

	/**
	 * Log an HTTP request
	 */
	logRequest(method: string, url: string, status?: number, time?: number, size?: number, error?: string): void {
		if (!this.enabled) return;

		const entry: HttpLogEntry = {
			method,
			url,
			status,
			time,
			size,
			error,
			timestamp: Date.now(),
		};

		this.logs.push(entry);

		// Keep only last N logs
		if (this.logs.length > this.maxLogs) {
			this.logs.shift();
		}

		// Print to console
		this.printLog(entry);
	}

	/**
	 * Print log entry to console
	 */
	private printLog(entry: HttpLogEntry): void {
		const methodColor =
			entry.method === "GET" ? pc.blue : entry.method === "POST" ? pc.green : entry.method === "PUT" ? pc.yellow : entry.method === "DELETE" ? pc.red : pc.gray;

		const statusColor = entry.status && entry.status >= 200 && entry.status < 300 ? pc.green : entry.status && entry.status >= 400 ? pc.red : pc.yellow;

		let output = pc.gray("[HTTP] ") + methodColor(entry.method.padEnd(6));

		if (entry.status !== undefined) {
			output += " " + statusColor(String(entry.status));
		}

		output += " " + pc.cyan(entry.url);

		if (entry.time !== undefined) {
			output += pc.gray(` (${entry.time}ms)`);
		}

		if (entry.size !== undefined) {
			const sizeStr =
				entry.size < 1024 ? `${entry.size}B` : entry.size < 1024 * 1024 ? `${(entry.size / 1024).toFixed(1)}KB` : `${(entry.size / (1024 * 1024)).toFixed(1)}MB`;
			output += pc.gray(` ${sizeStr}`);
		}

		if (entry.error) {
			output += pc.red(` - ${entry.error}`);
		}

		console.log(output);
	}

	/**
	 * Get all logs
	 */
	getLogs(): HttpLogEntry[] {
		return [...this.logs];
	}

	/**
	 * Clear logs
	 */
	clear(): void {
		this.logs = [];
	}

	/**
	 * Get logs summary
	 */
	getSummary(): {
		total: number;
		success: number;
		errors: number;
		averageTime: number;
	} {
		const total = this.logs.length;
		const success = this.logs.filter((log) => log.status && log.status >= 200 && log.status < 300).length;
		const errors = this.logs.filter((log) => log.error || (log.status && log.status >= 400)).length;
		const times = this.logs.map((log) => log.time || 0).filter((time) => time > 0);
		const averageTime = times.length > 0 ? times.reduce((a, b) => a + b, 0) / times.length : 0;

		return {
			total,
			success,
			errors,
			averageTime: Math.round(averageTime),
		};
	}
}

// Singleton instance
export const httpLogger = new HttpLogger();
