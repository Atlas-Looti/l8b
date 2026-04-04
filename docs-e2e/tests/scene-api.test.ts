/**
 * Verify: docs-site/api/scene.mdx matches SceneManager + Router getInterface()
 * Source of truth: packages/core/scene/src/scene-manager.ts + router.ts
 *
 * CRITICAL: scenes.goto/scenes.current removed from docs (not a global)
 */
import { describe, expect, it } from "vitest";
import { SceneManager } from "@al8b/scene";

describe("SceneManager API — docs vs source", () => {
	const sm = new SceneManager();
	const api = sm.getInterface();

	it("has register()", () => expect(typeof api.register).toBe("function"));
	it("has route()", () => expect(typeof api.route).toBe("function"));
	it("has goto()", () => expect(typeof api.goto).toBe("function"));
	it("has current()", () => expect(typeof api.current).toBe("function"));
});

describe("Router API — docs vs source", () => {
	const sm = new SceneManager();
	const router = sm.router.getInterface();

	// Documented methods
	it("has push()", () => expect(typeof router.push).toBe("function"));
	it("has replace()", () => expect(typeof router.replace).toBe("function"));
	it("has back()", () => expect(typeof router.back).toBe("function"));
	it("has getPath()", () => expect(typeof router.getPath).toBe("function"));
	it("has getParams()", () => expect(typeof router.getParams).toBe("function"));
	it("has getSceneName()", () => expect(typeof router.getSceneName).toBe("function"));

	// Documented properties (dynamic getters)
	it("has path property", () => expect(router).toHaveProperty("path"));
	it("has params property", () => expect(router).toHaveProperty("params"));
	it("has sceneName property", () => expect(router).toHaveProperty("sceneName"));
});
