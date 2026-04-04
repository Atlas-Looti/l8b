/**
 * Verify: docs-site/api/player.mdx matches PlayerService.getInterface()
 * Source of truth: packages/core/player/src/player-service.ts
 */
import { describe, expect, it } from "vitest";
import { PlayerService } from "@al8b/player";

describe("Player API — docs vs source", () => {
	// PlayerService requires a delegate — provide a mock
	const mockDelegate = {
		pause: () => {},
		resume: () => {},
		postMessage: () => {},
		setUpdateRate: () => {},
		getFps: () => 60,
		getUpdateRate: () => 60,
	};

	const player = new PlayerService(mockDelegate as any);
	const api = player.getInterface();

	// Documented methods
	const methods = ["pause", "resume", "postMessage", "setFps"];
	for (const m of methods) {
		it(`has ${m}()`, () => expect(typeof api[m]).toBe("function"));
	}

	// fps and update_rate are dynamic getters via Object.defineProperty
	it("has fps property (getter)", () => {
		expect(api.fps).toBe(60);
	});

	it("has update_rate property (getter)", () => {
		expect(api.update_rate).toBe(60);
	});
});
