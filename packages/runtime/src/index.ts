/**
 * @l8b/runtime - Game runtime orchestrator
 *
 * Modular runtime that combines all l8b packages into a complete game engine.
 *
 * Architecture:
 * - core/: Main coordinator
 * - vm/: Virtual machine for script execution
 * - assets/: Asset loading and management
 * - loop/: Game loop (update/draw cycle)
 * - input/: Input management (keyboard, mouse, touch, gamepad)
 * - system/: System API for game code
 * - storage/: Persistent storage (localStorage)
 * - hot-reload/: Hot reload system
 * - types/: Type definitions
 */

export * from "./assets";
// Component exports (for advanced usage)
export * from "./core";
// Main runtime
export { RuntimeOrchestrator, RuntimeOrchestrator as Runtime } from "./core";
export * from "./hot-reload";
export * from "./input";
export * from "./loop";
export * from "./storage";
export * from "./system";
// Type exports
export * from "./types";
export * from "./vm";
