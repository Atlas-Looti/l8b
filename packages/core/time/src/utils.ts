/**
 * Deep copy a value, optionally skipping excluded references.
 *
 * @param value - The value to deep copy
 * @param excluded - Optional array of object references to skip (replaced with null)
 */
export function deepCopy(value: any, excluded?: any[]): any {
	if (value == null) {
		return value;
	}

	if (excluded && excluded.includes(value)) {
		return null;
	}

	if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
		return value;
	}

	if (Array.isArray(value)) {
		const result: any[] = [];
		for (let i = 0; i < value.length; i++) {
			result[i] = deepCopy(value[i], excluded);
		}
		return result;
	}

	if (typeof value === "object") {
		const result: any = {};
		for (const key in value) {
			if (Object.hasOwn(value, key)) {
				result[key] = deepCopy(value[key], excluded);
			}
		}
		return result;
	}

	// Non-serializable types: return null when filtering, passthrough otherwise
	return excluded ? null : value;
}
