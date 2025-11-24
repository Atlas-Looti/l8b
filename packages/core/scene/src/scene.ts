/**
 * @l8b/scene - Scene class
 *
 * Base scene implementation that provides lifecycle management.
 */

import type { SceneInterface, SceneStatus } from "./types";

/**
 * Base Scene class
 *
 * Provides a base implementation of SceneInterface with lifecycle management.
 * Extend this class to create custom scenes.
 *
 * @example
 * ```typescript
 * class MyScene extends Scene {
 *   init() {
 *     // Initialize your scene
 *   }
 *
 *   update() {
 *     // Update logic
 *   }
 *
 *   draw() {
 *     // Drawing logic
 *   }
 * }
 * ```
 */
export class Scene implements SceneInterface {
	/**
	 * Unique identifier for the scene
	 */
	public readonly id: string;
	/**
	 * Current status of the scene
	 */
	protected _status: SceneStatus = "idle";

	/**
	 * Get the current status
	 */
	public get status(): SceneStatus {
		return this._status;
	}

	/**
	 * Create a new scene
	 *
	 * @param id - Unique identifier for the scene
	 */
	constructor(id: string) {
		this.id = id;
	}

	/**
	 * Initialize the scene
	 *
	 * Override this method to set up your scene.
	 * Called once when the scene is first created.
	 */
	public init(): void | Promise<void> {
		// Override in subclasses
	}

	/**
	 * Update the scene
	 *
	 * Override this method to implement update logic.
	 * Called every frame during the game loop.
	 */
	public update(): void {
		// Override in subclasses
	}

	/**
	 * Draw the scene
	 *
	 * Override this method to implement drawing logic.
	 * Called every frame during the game loop.
	 */
	public draw(): void {
		// Override in subclasses
	}

	/**
	 * Called when the scene is paused
	 *
	 * Override this method to handle pause events.
	 */
	public onPause(): void {
		// Override in subclasses
	}

	/**
	 * Called when the scene is resumed
	 *
	 * Override this method to handle resume events.
	 */
	public onResume(): void {
		// Override in subclasses
	}

	/**
	 * Cleanup the scene
	 *
	 * Override this method to clean up resources.
	 * Called when the scene is destroyed.
	 */
	public destroy(): void {
		// Override in subclasses
	}

	/**
	 * Set the scene status (internal use)
	 *
	 * @internal
	 */
	public _setStatus(status: SceneStatus): void {
		this._status = status;
	}
}

