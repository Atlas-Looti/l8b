/**
 * Utility functions for Scene Management System
 */

/**
 * Check if code is running in browser environment
 */
export function isBrowser(): boolean {
	return typeof window !== "undefined";
}

/**
 * Safely execute a function with error handling
 */
export function safeExecute<T>(fn: () => T, errorHandler: (error: unknown, context?: string) => void, context?: string): T | undefined {
	try {
		return fn();
	} catch (error) {
		errorHandler(error, context);
		return undefined;
	}
}

/**
 * Check if a value is a valid non-empty string
 */
export function isValidString(value: unknown): value is string {
	return typeof value === "string" && value.length > 0;
}

/**
 * Check if a value is a valid object
 */
export function isValidObject(value: unknown): value is Record<string, unknown> {
	return value !== null && typeof value === "object" && !Array.isArray(value);
}

/**
 * Normalize path by removing query string, hash, and ensuring leading slash
 */
export function normalizePath(path: string): string {
	const cleanPath = path.split("?")[0].split("#")[0];
	return cleanPath.startsWith("/") ? cleanPath : `/${cleanPath}`;
}
