/**
 * Simple Dependency Injection Container
 *
 * Provides centralized dependency management with lazy loading
 */

export class DIContainer {
	private services = new Map<string, any>();
	private factories = new Map<string, () => any>();
	private singletons = new Set<string>();

	/**
	 * Register a factory function for a service
	 * @param key - Unique identifier for the service
	 * @param factory - Factory function that creates the service
	 * @param singleton - Whether to cache the instance (default: true)
	 */
	register<T>(key: string, factory: () => T, singleton: boolean = true): void {
		this.factories.set(key, factory);
		if (singleton) {
			this.singletons.add(key);
		}
	}

	/**
	 * Resolve a service by key
	 * @throws Error if service is not registered
	 */
	resolve<T>(key: string): T {
		// Return cached instance if singleton
		if (this.singletons.has(key) && this.services.has(key)) {
			return this.services.get(key);
		}

		// Create new instance
		const factory = this.factories.get(key);
		if (!factory) {
			throw new Error(`Service "${key}" is not registered`);
		}

		const instance = factory();
		
		// Cache if singleton
		if (this.singletons.has(key)) {
			this.services.set(key, instance);
		}

		return instance;
	}

	/**
	 * Override a service (useful for testing)
	 */
	override<T>(key: string, instance: T): void {
		this.services.set(key, instance);
		this.singletons.add(key);
	}

	/**
	 * Check if a service is registered
	 */
	has(key: string): boolean {
		return this.factories.has(key);
	}

	/**
	 * Clear all registered services (useful for testing)
	 */
	clear(): void {
		this.services.clear();
		this.factories.clear();
		this.singletons.clear();
	}
}

