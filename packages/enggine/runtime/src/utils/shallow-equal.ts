/**
 * Shallow equality comparison for objects and arrays
 */

/**
 * Compare two values for shallow equality
 * For objects and arrays, only checks if top-level properties have the same references
 * For primitives, uses === comparison
 *
 * @param a First value
 * @param b Second value
 * @returns true if values are shallowly equal
 */
export function shallowEqual(a: unknown, b: unknown): boolean {
	// Same reference
	if (a === b) {
		return true;
	}

	// Different types
	if (typeof a !== "object" || typeof b !== "object" || a === null || b === null) {
		return false;
	}

	const aObj = a as Record<string, unknown>;
	const bObj = b as Record<string, unknown>;

	// Get keys
	const aKeys = Object.keys(aObj);
	const bKeys = Object.keys(bObj);

	// Different number of keys
	if (aKeys.length !== bKeys.length) {
		return false;
	}

	// Check all keys have same reference values
	for (const key of aKeys) {
		if (!(key in bObj) || aObj[key] !== bObj[key]) {
			return false;
		}
	}

	return true;
}
