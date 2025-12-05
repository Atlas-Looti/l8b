/**
 * Async utilities for L8B framework
 */

/**
 * Debounce function execution
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
	fn: T,
	delay: number,
): (...args: Parameters<T>) => void {
	let timeoutId: ReturnType<typeof setTimeout> | null = null;

	return (...args: Parameters<T>) => {
		if (timeoutId) {
			clearTimeout(timeoutId);
		}
		timeoutId = setTimeout(() => {
			fn(...args);
			timeoutId = null;
		}, delay);
	};
}

/**
 * Throttle function execution
 */
export function throttle<T extends (...args: unknown[]) => unknown>(
	fn: T,
	limit: number,
): (...args: Parameters<T>) => void {
	let lastRun = 0;
	let timeoutId: ReturnType<typeof setTimeout> | null = null;

	return (...args: Parameters<T>) => {
		const now = Date.now();

		if (now - lastRun >= limit) {
			fn(...args);
			lastRun = now;
		} else if (!timeoutId) {
			timeoutId = setTimeout(
				() => {
					fn(...args);
					lastRun = Date.now();
					timeoutId = null;
				},
				limit - (now - lastRun),
			);
		}
	};
}

/**
 * Sleep for specified milliseconds
 */
export function sleep(ms: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Run async function with timeout
 */
export async function withTimeout<T>(promise: Promise<T>, ms: number, message = "Operation timed out"): Promise<T> {
	let timeoutId: ReturnType<typeof setTimeout>;

	const timeoutPromise = new Promise<never>((_, reject) => {
		timeoutId = setTimeout(() => reject(new Error(message)), ms);
	});

	try {
		const result = await Promise.race([promise, timeoutPromise]);
		clearTimeout(timeoutId!);
		return result;
	} catch (error) {
		clearTimeout(timeoutId!);
		throw error;
	}
}

/**
 * Retry async function with exponential backoff
 */
export async function retry<T>(
	fn: () => Promise<T>,
	options: {
		maxRetries?: number;
		initialDelay?: number;
		maxDelay?: number;
		factor?: number;
	} = {},
): Promise<T> {
	const { maxRetries = 3, initialDelay = 100, maxDelay = 5000, factor = 2 } = options;

	let lastError: Error | undefined;
	let delay = initialDelay;

	for (let attempt = 0; attempt <= maxRetries; attempt++) {
		try {
			return await fn();
		} catch (error) {
			lastError = error as Error;

			if (attempt < maxRetries) {
				await sleep(delay);
				delay = Math.min(delay * factor, maxDelay);
			}
		}
	}

	throw lastError;
}

/**
 * Create an async queue for sequential execution
 */
export class AsyncQueue {
	private queue: (() => Promise<void>)[] = [];
	private running = false;

	async add<T>(fn: () => Promise<T>): Promise<T> {
		return new Promise((resolve, reject) => {
			this.queue.push(async () => {
				try {
					resolve(await fn());
				} catch (error) {
					reject(error);
				}
			});

			this.process();
		});
	}

	private async process(): Promise<void> {
		if (this.running) return;
		this.running = true;

		while (this.queue.length > 0) {
			const task = this.queue.shift();
			if (task) {
				await task();
			}
		}

		this.running = false;
	}
}
