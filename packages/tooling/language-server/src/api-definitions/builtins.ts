/**
 * API definitions for built-in globals: print, Random, ObjectPool, storage.
 */

import type { GlobalApi } from "../types";

export const builtinsApi: Partial<GlobalApi> = {
	print: {
		type: "function",
		description: "Prints text to the debug console",
		signature: "print(text: any)",
	},
	Random: {
		type: "constructor",
		description: "Seeded random number generator for deterministic randomness",
		signature: "new Random(seed?: number)",
		properties: {
			next: { type: "method", signature: "random.next()", description: "Get next random number (0-1)" },
			nextInt: { type: "method", signature: "random.nextInt(max)", description: "Get random integer (0 to max-1)" },
			seed: { type: "method", signature: "random.seed(newSeed?)", description: "Set new seed value" },
			clone: { type: "method", signature: "random.clone(seed?)", description: "Clone random generator with optional new seed" },
		},
	},
	ObjectPool: {
		type: "constructor",
		description: "Object pooling utility for performance optimization",
		signature: "new ObjectPool(factory, maxSize?)",
		properties: {
			acquire: { type: "method", signature: "pool.acquire()", description: "Get object from pool or create new" },
			release: { type: "method", signature: "pool.release(obj)", description: "Return object to pool for reuse" },
			clear: { type: "method", signature: "pool.clear()", description: "Clear all objects from pool" },
			getSize: { type: "method", signature: "pool.getSize()", description: "Get current pool size" },
			getMaxSize: { type: "method", signature: "pool.getMaxSize()", description: "Get maximum pool size" },
		},
	},
	storage: {
		type: "module",
		description: "Persistent storage API (localStorage wrapper)",
		properties: {
			get: { type: "method", signature: "storage.get(key, defaultValue?)", description: "Get value from storage" },
			set: { type: "method", signature: "storage.set(key, value)", description: "Save value to storage" },
			delete: { type: "method", signature: "storage.delete(key)", description: "Delete a single key from storage" },
			remove: { type: "method", signature: "storage.remove(key)", description: "Remove value from storage" },
			clear: { type: "method", signature: "storage.clear()", description: "Clear all storage" },
			has: { type: "method", signature: "storage.has(key)", description: "Check if key exists in storage" },
			keys: { type: "method", signature: "storage.keys()", description: "Get all storage keys" },
		},
	},
};
