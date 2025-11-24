/**
 * @l8b/scene - Scene Management System
 *
 * Provides scene lifecycle management, transitions, and stacking.
 *
 * Architecture:
 * - Scene: Base scene class with lifecycle methods
 * - SceneManager: Manages multiple scenes, transitions, and updates
 * - types: Type definitions for scenes and managers
 *
 * @example
 * ```typescript
 * import { Scene, SceneManager } from "@l8b/scene";
 *
 * class MenuScene extends Scene {
 *   init() {
 *     // Initialize menu
 *   }
 *
 *   update() {
 *     // Update menu logic
 *   }
 *
 *   draw() {
 *     // Draw menu
 *   }
 * }
 *
 * const manager = new SceneManager();
 * const menuScene = new MenuScene("menu");
 * manager.addScene(menuScene);
 * manager.setActiveScene("menu");
 *
 * // In game loop
 * manager.update();
 * manager.draw();
 * ```
 */

export { Scene } from "./scene";
export { SceneManager } from "./manager";
export type {
	SceneInterface,
	SceneManagerOptions,
	SceneStatus,
	SceneTransitionOptions,
} from "./types";

