/**
 * Inline Cache interfaces and structures
 *
 * Inline caches optimize property access by caching object shapes and property offsets.
 * This reduces property lookup time from O(n) hash table lookups to O(1) direct access
 * when the same object shape is accessed repeatedly.
 */

export const IC_STATE = {
	UNINITIALIZED: 0,
	MONOMORPHIC: 1,
	POLYMORPHIC: 2,
	MEGAMORPHIC: 3,
};

export interface InlineCache {
	state: number;
	hits: number;
	misses: number;
	property: string | number;

	/**
	 * Monomorphic cache - Single object shape optimization
	 *
	 * When property access consistently uses the same object shape,
	 * we cache the shape and offset for O(1) lookup instead of O(n) hash lookup.
	 * This is the fastest cache state and handles the majority of property accesses.
	 */
	shape?: any; // The cached object shape/class/constructor
	offset?: number | string; // The pre-resolved property key or array index

	/**
	 * Polymorphic cache - Multiple object shapes (2-4 shapes)
	 *
	 * When property access uses a small set of different shapes,
	 * we maintain parallel arrays for quick linear search.
	 * This provides good performance when dealing with a few different object types.
	 */
	shapes?: any[];
	offsets?: any[];
}

/**
 * Global metrics for inline cache performance tracking
 *
 * Tracks cache hit/miss rates and invalidation counts across all inline caches
 * for performance analysis and optimization.
 */
export class ICMetrics {
	static hits = 0;
	static misses = 0;
	static invalidations = 0;
}
