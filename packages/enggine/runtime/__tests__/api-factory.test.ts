import { describe, expect, it, vi } from "vitest";
import { createRuntimeMeta } from "../src/core/api-factory";

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
			assets: {} as any,
			getVM: () => null,
		});

		meta.print?.("hello");

		expect(log).toHaveBeenCalledWith("hello");
	});
});
