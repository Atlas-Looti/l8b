/**
 * @l8b/scene - Type definitions
 *
 * Type definitions for scene management system.
 */

/**
 * Scene lifecycle status
 */
export type SceneStatus = "idle" | "initializing" | "active" | "paused" | "destroyed";

/**
 * Scene transition options
 */
export interface SceneTransitionOptions {
	/**
	 * Duration of the transition in milliseconds
	 */
	duration?: number;
	/**
	 * Custom transition function
	 */
	transition?: (progress: number) => number;
	/**
	 * Whether to destroy the previous scene after transition
	 */
	destroyPrevious?: boolean;
	/**
	 * Whether to pause the previous scene instead of destroying it
	 */
	pausePrevious?: boolean;
}

/**
 * Scene interface that all scenes must implement
 */
export interface SceneInterface {
	/**
	 * Unique identifier for the scene
	 */
	readonly id: string;
	/**
	 * Current status of the scene
	 */
	readonly status: SceneStatus;
	/**
	 * Initialize the scene
	 * Called once when the scene is first created
	 */
	init?(): void | Promise<void>;
	/**
	 * Update the scene
	 * Called every frame during the game loop
	 */
	update?(): void;
	/**
	 * Draw the scene
	 * Called every frame during the game loop
	 */
	draw?(): void;
	/**
	 * Called when the scene is paused
	 */
	onPause?(): void;
	/**
	 * Called when the scene is resumed
	 */
	onResume?(): void;
	/**
	 * Cleanup the scene
	 * Called when the scene is destroyed
	 */
	destroy?(): void;
}

/**
 * Scene manager configuration
 */
export interface SceneManagerOptions {
	/**
	 * Whether to automatically update active scenes
	 */
	autoUpdate?: boolean;
	/**
	 * Whether to automatically draw active scenes
	 */
	autoDraw?: boolean;
	/**
	 * Default transition duration in milliseconds
	 */
	defaultTransitionDuration?: number;
}

