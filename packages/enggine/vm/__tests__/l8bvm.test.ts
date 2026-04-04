import { describe, expect, it } from "vitest";
import { Compiler, Parser } from "@al8b/lootiscript";
import type { CompiledModuleArtifact } from "@al8b/framework-shared";
import { L8BVM } from "../src/l8bvm";

describe("L8BVM.loadRoutine", () => {
	it("accepts compiled module artifacts", () => {
		const vm = new L8BVM();
		const parser = new Parser(
			`
			init = function()
				test_value = 42
			end
			`,
			"src/main.loot",
		);
		parser.parse();
		const compiler = new Compiler(parser.program);
		const artifact: CompiledModuleArtifact = {
			format: "l8b-compiled-routine",
			version: 1,
			module: "main",
			file: "src/main.loot",
			routine: compiler.routine.export(),
		};

		expect(() => vm.loadRoutine(artifact, "main")).not.toThrow();
		expect(vm.context.global.init).toBeDefined();
		expect(vm.context.global.test_value).toBeUndefined();

		vm.call("init");
		vm.runner.tick();

		expect(vm.context.global.test_value).toBe(42);
	});
});
