import { describe, expect, it, vi } from "vitest";
import { convertSceneDefinition, createRuntimeMeta } from "../src/core/api-factory";

describe("createRuntimeMeta", () => {
	it("routes print output to the runtime listener", () => {
		const log = vi.fn();
		const meta = createRuntimeMeta({
			listener: { log },
			options: {},
			screen: {} as any,
			audio: {} as any,
			input: {} as any,
			system: {} as any,
			playerService: {} as any,
			sceneManager: {} as any,
			assets: {} as any,
			getVM: () => null,
		});

		meta.print?.("hello");

		expect(log).toHaveBeenCalledWith("hello");
	});
});

describe("convertSceneDefinition", () => {
	it("returns definition unchanged when VM is not ready", () => {
		const log = vi.fn();
		const definition = { setup: { enabled: true } };

		const result = convertSceneDefinition(definition, null, { log });

		expect(result).toBe(definition);
		expect(log).toHaveBeenCalled();
	});
});
