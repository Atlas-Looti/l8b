/**
 * Storage service - localStorage wrapper with automatic serialization
 */

export class StorageService {
	private namespace: string;
	private cache: Map<string, any> = new Map();
	private pendingWrites: Map<string, any> = new Map();
	private writeTimer: ReturnType<typeof setTimeout> | null = null;
	private runtime?: any;

	constructor(namespace = "/l8b", preserve = false, runtime?: any) {
		this.namespace = namespace;
		this.runtime = runtime;

		// Clear storage if not preserving
		if (!preserve && typeof localStorage !== "undefined") {
			this.clear();
		}
	}

	/**
	 * Get value from storage
	 */
	get(name: string): any {
		// Validate storage key
		if (!name || typeof name !== "string" || name.trim() === "") {
			this.runtime?.listener?.reportError?.({ code: "E7063", message: `Invalid storage key: ${name}` });
			return null;
		}

		// Check cache first
		if (this.cache.has(name)) {
			return this.cache.get(name);
		}

		// Try localStorage
		if (typeof localStorage !== "undefined") {
			try {
				const key = `${this.namespace}.${name}`;
				const value = localStorage.getItem(key);
				if (value !== null) {
					const parsed = JSON.parse(value);
					this.cache.set(name, parsed);
					return parsed;
				}
			} catch (err: any) {
				this.runtime?.listener?.reportError?.({ code: "E7062", message: `Get operation failed: ${String(err)}` });
			}
		}

		return null;
	}

	/**
	 * Set value in storage (batched write)
	 */
	set(name: string, value: any): void {
		// Validate storage key
		if (!name || typeof name !== "string" || name.trim() === "") {
			this.runtime?.listener?.reportError?.({ code: "E7063", message: `Invalid storage key: ${name}` });
			return;
		}

		// Update cache
		this.cache.set(name, value);

		// Queue write
		this.pendingWrites.set(name, value);

		// Schedule batch write
		if (this.writeTimer === null) {
			const schedule =
				typeof window !== "undefined" && typeof window.setTimeout === "function"
					? window.setTimeout.bind(window)
					: setTimeout;

			this.writeTimer = schedule(() => {
				this.flush();
			}, 100);
		}
	}

	/**
	 * Flush pending writes to localStorage
	 */
	flush(): void {
		if (this.writeTimer !== null) {
			clearTimeout(this.writeTimer);
			this.writeTimer = null;
		}

		if (typeof localStorage === "undefined") {
			this.pendingWrites.clear();
			return;
		}

		for (const [name, value] of this.pendingWrites) {
			try {
				const key = `${this.namespace}.${name}`;
				const serialized = JSON.stringify(this.sanitize(value));
				localStorage.setItem(key, serialized);
			} catch (err: any) {
				// Check for quota exceeded error
				if (err.name === "QuotaExceededError" || err.code === 22) {
					this.runtime?.listener?.reportError?.({ code: "E7061", message: "Storage quota exceeded" });
				} else {
					this.runtime?.listener?.reportError?.({ code: "E7062", message: `Set operation failed: ${String(err)}` });
				}
			}
		}

		this.pendingWrites.clear();
	}

	/**
	 * Check if there are pending writes and flush if needed
	 */
	check(): void {
		if (this.pendingWrites.size > 0) {
			this.flush();
		}
	}

	/**
	 * Delete a single key from storage (cache + localStorage + any pending write)
	 */
	delete(name: string): void {
		if (!name || typeof name !== "string" || name.trim() === "") {
			this.runtime?.listener?.reportError?.({ code: "E7063", message: `Invalid storage key: ${name}` });
			return;
		}

		// Remove from in-memory state
		this.cache.delete(name);
		this.pendingWrites.delete(name);

		// Remove from localStorage
		if (typeof localStorage !== "undefined") {
			try {
				localStorage.removeItem(`${this.namespace}.${name}`);
			} catch (err: any) {
				this.runtime?.listener?.reportError?.({ code: "E7062", message: `Delete operation failed: ${String(err)}` });
			}
		}
	}

	/**
	 * Clear all storage for this namespace
	 */
	clear(): void {
		if (typeof localStorage === "undefined") {
			return;
		}

		const prefix = `${this.namespace}.`;
		const keysToRemove: string[] = [];

		// Find all keys with this namespace
		for (let i = 0; i < localStorage.length; i++) {
			const key = localStorage.key(i);
			if (key && key.startsWith(prefix)) {
				keysToRemove.push(key);
			}
		}

		// Remove them
		for (const key of keysToRemove) {
			localStorage.removeItem(key);
		}

		// Clear cache
		this.cache.clear();
		this.pendingWrites.clear();
	}

	/**
	 * Sanitize value for JSON serialization
	 * Removes functions and handles circular references
	 */
	private sanitize(value: any, seen = new WeakSet()): any {
		if (value === null || value === undefined) {
			return value;
		}

		// Primitives
		if (typeof value !== "object") {
			// Remove functions
			if (typeof value === "function") {
				return undefined;
			}
			return value;
		}

		// Check for circular reference
		if (seen.has(value)) {
			return undefined;
		}
		seen.add(value);

		// Arrays
		if (Array.isArray(value)) {
			return value.map((item) => this.sanitize(item, seen)).filter((item) => item !== undefined);
		}

		// Objects
		const result: any = {};
		for (const key in value) {
			if (Object.hasOwn(value, key)) {
				const sanitized = this.sanitize(value[key], seen);
				if (sanitized !== undefined) {
					result[key] = sanitized;
				}
			}
		}
		return result;
	}

	private interfaceCache: {
		set: (name: string, value: unknown) => void;
		get: (name: string) => unknown;
		delete: (name: string) => void;
	} | null = null;

	/**
	 * Get storage interface for game code
	 */
	getInterface() {
		if (this.interfaceCache) {
			return this.interfaceCache;
		}
		this.interfaceCache = {
			set: (name: string, value: any) => this.set(name, value),
			get: (name: string) => this.get(name),
			delete: (name: string) => this.delete(name),
		};
		return this.interfaceCache;
	}
}
