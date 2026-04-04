import { describe, expect, it } from "vitest";
import { compileSource } from "../src/compiler";

describe("compileSource", () => {
	it("returns a stable compiled module artifact instead of opaque bytecode", () => {
		const result = compileSource(
			`
			init = function()
				value = 1 + 2
			end
			`,
			{ filePath: "src/main.loot", srcDir: "src" },
		);

		expect(result.success).toBe(true);
		expect(result.artifact).toMatchObject({
			format: "l8b-compiled-routine",
			version: 1,
			module: "main",
			file: "src/main.loot",
		});
		expect(result.artifact?.routine.ops.length).toBeGreaterThan(0);
	});
});
