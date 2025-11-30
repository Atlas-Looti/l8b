/**
 * Object Pool utility for game entities
 *
 * Provides object pooling to reduce GC pressure and improve performance
 * for frequently created/destroyed game objects.
 */

/**
 * Object pool for reusing objects
 *
 * @template T - Type of objects in the pool
 */
export class ObjectPool<T> {
	private pool: T[] = [];
	private factory: () => T;
	private reset: (obj: T) => void;
	private maxSize: number;

	/**
	 * Create a new object pool
	 *
	 * @param factory - Function to create new objects
	 * @param reset - Function to reset object state for reuse
	 * @param maxSize - Maximum pool size (default: 100)
	 */
	constructor(factory: () => T, reset: (obj: T) => void, maxSize: number = 100) {
		this.factory = factory;
		this.reset = reset;
		this.maxSize = maxSize;
	}

	/**
	 * Acquire an object from the pool
	 *
	 * Returns a new object if pool is empty, otherwise reuses a pooled object.
	 *
	 * @returns Object from pool or newly created
	 */
	acquire(): T {
		if (this.pool.length > 0) {
			return this.pool.pop()!;
		}
		return this.factory();
	}

	/**
	 * Release an object back to the pool
	 *
	 * Resets the object and adds it back to the pool for reuse.
	 * If pool is at max size, the object is discarded.
	 *
	 * @param obj - Object to release
	 */
	release(obj: T): void {
		if (this.pool.length >= this.maxSize) {
			// Pool is full, discard object
			return;
		}

		this.reset(obj);
		this.pool.push(obj);
	}

	/**
	 * Clear all objects from the pool
	 */
	clear(): void {
		this.pool = [];
	}

	/**
	 * Get current pool size
	 *
	 * @returns Number of objects in pool
	 */
	size(): number {
		return this.pool.length;
	}

	/**
	 * Get maximum pool size
	 *
	 * @returns Maximum pool size
	 */
	getMaxSize(): number {
		return this.maxSize;
	}

	/**
	 * Set maximum pool size
	 *
	 * @param maxSize - New maximum pool size
	 */
	setMaxSize(maxSize: number): void {
		this.maxSize = maxSize;
		// Trim pool if it exceeds new max size
		if (this.pool.length > maxSize) {
			this.pool = this.pool.slice(0, maxSize);
		}
	}
}
