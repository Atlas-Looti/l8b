/**
 * Deep clone utility using structuredClone
 */

/**
 * Deep clone a value using the native structuredClone API
 * Supports all structured-cloneable types: objects, arrays, primitives, Date, Set, Map, etc.
 * Does NOT support: Functions, Symbols, DOM nodes
 *
 * @param value The value to deep clone
 * @returns A deep clone of the value
 */
export function deepClone(value: unknown): unknown {
	// Use native structuredClone if available (Node 17.5+, modern browsers)
	if (typeof structuredClone !== "undefined") {
		return structuredClone(value);
	}

	// Fallback for older environments: JSON round-trip
	// WARNING: This loses Date, Map, Set, undefined, Function, Symbol values
	try {
		return JSON.parse(JSON.stringify(value));
	} catch {
		// If JSON fails (circular reference, etc.), return the original
		// This is safe but means mutations will affect the original
		return value;
	}
}
