import { describe, expect, it } from "vitest";
import { Compiler, Parser } from "@al8b/lootiscript";
import { L8BVM } from "../src/l8bvm";

// CompiledModuleArtifact type is inlined in l8bvm.ts
type CompiledModuleArtifact = {
	format: "l8b-compiled-routine";
	routine: {
		num_args: number;
		ops: number[];
		args: unknown[];
		import_refs: unknown[];
		import_values: unknown[];
		import_self: number;
		locals_size?: number;
	};
};

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
			routine: compiler.routine.export() as CompiledModuleArtifact["routine"],
		};

		expect(() => vm.loadRoutine(artifact, "main")).not.toThrow();
		expect(vm.context.global.init).toBeDefined();
		expect(vm.context.global.test_value).toBeUndefined();

		vm.call("init");
		vm.runner.tick();

		expect(vm.context.global.test_value).toBe(42);
	});
});
