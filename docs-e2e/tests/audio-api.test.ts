/**
 * Verify: docs-site/api/audio.mdx matches AudioCore.getInterface()
 * Source of truth: packages/core/audio/src/core/audio-core.ts
 *
 * Note: happy-dom doesn't support AudioContext, so we verify the class shape.
 */
import { describe, expect, it } from "vitest";
import { AudioCore } from "@al8b/audio";

describe("Audio API — docs vs source", () => {
	it("AudioCore class exists", () => {
		expect(AudioCore).toBeDefined();
	});

	it("has getInterface method", () => {
		expect(typeof AudioCore.prototype.getInterface).toBe("function");
	});

	// Verify the documented methods exist on the prototype
	const documented = ["beep", "cancelBeeps", "playSound", "playMusic", "setVolume", "getVolume", "stopAll"];

	for (const m of documented) {
		it(`AudioCore prototype has ${m}()`, () => {
			expect(typeof AudioCore.prototype[m]).toBe("function");
		});
	}
});
