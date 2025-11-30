import type { SceneDefinition } from "./types";

export class SceneRegistry {
	private scenes: Map<string, SceneDefinition> = new Map();

	/**
	 * Register a new scene
	 */
	register(name: string, definition: SceneDefinition): void {
		this.scenes.set(name, definition);
	}

	/**
	 * Get a scene definition
	 */
	get(name: string): SceneDefinition | undefined {
		return this.scenes.get(name);
	}

	/**
	 * Check if scene exists
	 */
	has(name: string): boolean {
		return this.scenes.has(name);
	}

	/**
	 * Get all registered scene names
	 */
	getNames(): string[] {
		return Array.from(this.scenes.keys());
	}

	/**
	 * Clear all scenes
	 */
	clear(): void {
		this.scenes.clear();
	}
}
