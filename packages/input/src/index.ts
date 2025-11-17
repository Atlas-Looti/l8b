/**
 * @l8b/input - Modular input subsystem
 *
 * Architecture:
 * - core/: Input orchestrator
 * - devices/: Keyboard, mouse, touch, and gamepad handlers
 * - shared/: Cross-device helpers
 * - types/: Shared state definitions
 */

export { Input, Input as default } from "./core/input-manager";
export { GamepadInput } from "./devices/gamepad";
export { KeyboardInput } from "./devices/keyboard";
export { MouseInput } from "./devices/mouse";
export { TouchInput } from "./devices/touch";
export * from "./types";
