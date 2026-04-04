/**
 * @al8b/audio - Audio subsystem
 *
 * Architecture:
 * - core/: Audio orchestrator (context + VM interface)
 * - devices/: Beeper, Sound, Music implementations
 */

export { AudioCore } from "./core";
export * from "./devices";
