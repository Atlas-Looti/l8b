/**
 * @l8b/scene - Scene Management and Routing System
 *
 * Provides scene lifecycle management, routing, and shallow navigation.
 *
 * Architecture:
 * - SceneManager: Manages scenes, routes, and active scene
 * - Router: Handles browser history and navigation
 * - RouteManager: Matches paths to scenes
 * - SceneRegistry: Stores scene definitions
 *
 * @example
 * ```loot
 * // Define routes
 * route("/", "home")
 * route("/player/:id", "player")
 *
 * // Define scene
 * scene("home", object
 *   update = function()
 *     if keyboard.press.SPACE then
 *       router.push("/player/1")
 *     end
 *   end
 *
 *   draw = function()
 *     screen.clear("black")
 *   end
 * end)
 * ```
 */

export { RouteManager } from "./route-manager";
export { Router } from "./router";
export { SceneManager } from "./scene-manager";
export { SceneRegistry } from "./scene-registry";
export type {
    RouteDefinition,
    RouterState,
    SceneConfig,
    SceneData,
    SceneDefinition,
    SceneEvents,
    SceneInterface,
    SceneManagerOptions,
    SceneStatus,
    SceneTransitionOptions,
} from "./types";
