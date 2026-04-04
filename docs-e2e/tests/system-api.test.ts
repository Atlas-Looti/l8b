/**
 * Verify: docs-site/api/system.mdx matches System.getAPI() shape
 * Source of truth: packages/enggine/runtime/src/system/api.ts
 *
 * CRITICAL: docs removed deltaTime (doesn't exist in source)
 */
import { describe, expect, it } from "vitest";
import { System } from "@al8b/runtime";

describe("System API — docs vs source", () => {
	const sys = new System();
	const api = sys.getAPI();

	// Documented properties
	it("has time (number)", () => expect(typeof api.time).toBe("number"));
	it("has fps (number)", () => expect(typeof api.fps).toBe("number"));
	it("has cpu_load (number)", () => expect(typeof api.cpu_load).toBe("number"));
	it("has update_rate (number)", () => expect(typeof api.update_rate).toBe("number"));
	it("has language (string)", () => expect(typeof api.language).toBe("string"));
	it("has loading (number)", () => expect(typeof api.loading).toBe("number"));

	// Documented sub-objects
	it("has inputs object", () => expect(typeof api.inputs).toBe("object"));
	it("has inputs.keyboard", () => expect(typeof api.inputs.keyboard).toBe("number"));
	it("has inputs.mouse", () => expect(typeof api.inputs.mouse).toBe("number"));
	it("has inputs.touch", () => expect(typeof api.inputs.touch).toBe("number"));
	it("has inputs.gamepad", () => expect(typeof api.inputs.gamepad).toBe("number"));

	// Documented methods
	it("has prompt()", () => expect(typeof api.prompt).toBe("function"));
	it("has say()", () => expect(typeof api.say).toBe("function"));

	// MUST NOT have deltaTime (removed from docs after audit)
	it("does NOT have deltaTime", () => expect(api).not.toHaveProperty("deltaTime"));
});
