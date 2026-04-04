/**
 * Verify: LootiScript code from docs actually runs without errors on the VM
 * Source of truth: packages/enggine/vm/src/l8bvm.ts
 */
import { describe, expect, it } from "vitest";
import { L8BVM, createMetaFunctions } from "@al8b/vm";
import { MathLib, StringLib, ListLib, JSONLib } from "@al8b/stdlib";

function createTestVM() {
	const logs: string[] = [];
	const meta = createMetaFunctions((text: string) => logs.push(text));

	// Minimal global object matching what orchestrator provides
	const global: Record<string, any> = {
		// Stdlib functions (flattened as globals)
		...MathLib,
		...StringLib,
		...ListLib,
		encode: JSONLib.encode,
		decode: JSONLib.decode,
		pretty: JSONLib.pretty,
		// Minimal stubs for APIs that need canvas
		screen: {
			width: 128, height: 128,
			clear: () => {},
			fillRect: () => {},
			drawRect: () => {},
			drawText: () => {},
			drawTextOutline: () => {},
			textWidth: () => 0,
			drawLine: () => {},
			drawSprite: () => {},
			setAlpha: () => {},
			setColor: () => {},
		},
		keyboard: { press: {}, release: {}, UP: 0, DOWN: 0, LEFT: 0, RIGHT: 0 },
		mouse: { x: 0, y: 0, left: 0, right: 0, middle: 0, pressed: 0, press: 0, release: 0, wheel: 0 },
		touch: { touching: 0, x: 0, y: 0, press: 0, release: 0, touches: [] },
		audio: { playSound: () => 0, playMusic: () => 0, stopAll: () => {}, setVolume: () => {}, getVolume: () => 1 },
		player: { pause: () => {}, resume: () => {}, fps: 60, update_rate: 60 },
		storage: { set: () => {}, get: () => null, delete: () => {} },
		sprites: {},
		maps: {},
		sounds: {},
		music: {},
		assets: {},
		scene: () => {},
		route: () => {},
		router: { push: () => {}, replace: () => {}, back: () => {}, path: "/", params: {}, sceneName: "" },
		system: { time: 0, fps: 60, cpu_load: 0, update_rate: 60, language: "en", loading: 1, inputs: { keyboard: 1, mouse: 1, touch: 0, gamepad: 0 } },
		print: (text: any) => logs.push(String(text)),
	};

	const vm = new L8BVM(meta, global, "/test", true);
	return { vm, logs };
}

describe("VM integration — docs code examples run", () => {
	it("runs basic variable assignment and math", () => {
		const { vm } = createTestVM();
		vm.run(`
			x = 10
			y = clamp(x + 5, 0, 12)
		`);
		expect(vm.error_info).toBeNull();
	});

	it("runs function declaration and call", () => {
		const { vm, logs } = createTestVM();
		vm.run(`
			greet = function(name)
				return "Hello, " + name + "!"
			end
			print(greet("Alice"))
		`);
		expect(vm.error_info).toBeNull();
		expect(logs).toContain("Hello, Alice!");
	});

	it("runs for loop", () => {
		const { vm, logs } = createTestVM();
		vm.run(`
			for i = 0 to 4
				print(i)
			end
		`);
		expect(vm.error_info).toBeNull();
		// logs may include VM startup messages, check at least 5 prints happened
		expect(logs.filter(l => ["0","1","2","3","4"].includes(String(l))).length).toBe(5);
	});

	it("runs if/elsif/else", () => {
		const { vm, logs } = createTestVM();
		vm.run(`
			x = 5
			if x > 10 then
				print("big")
			elsif x > 3 then
				print("medium")
			else
				print("small")
			end
		`);
		expect(vm.error_info).toBeNull();
		expect(logs).toContain("medium");
	});

	it("runs stdlib math functions", () => {
		const { vm, logs } = createTestVM();
		vm.run(`
			print(abs(-5))
			print(floor(3.7))
			print(clamp(15, 0, 10))
			print(distance(0, 0, 3, 4))
		`);
		expect(vm.error_info).toBeNull();
		// Check values are in logs (may be numbers or strings)
		expect(logs.map(String)).toContain("5");
		expect(logs.map(String)).toContain("3");
		expect(logs.map(String)).toContain("10");
	});

	it("runs stdlib list functions", () => {
		const { vm, logs } = createTestVM();
		vm.run(`
			nums = [1, 2, 3, 4, 5]
			doubled = map(nums, (x) => x * 2)
			print(length(doubled))
			print(sum(doubled))
		`);
		expect(vm.error_info).toBeNull();
		expect(logs.map(String)).toContain("5");
		expect(logs.map(String)).toContain("30");
	});

	it("runs scene/route registration without error", () => {
		const { vm } = createTestVM();
		// LootiScript uses object...end syntax, not { }
		vm.run(`
			route("/", "game")
			scene("game", object
				init = function()
					this.x = 0
				end
				update = function() end
				draw = function() end
			end)
		`);
		expect(vm.error_info).toBeNull();
	});

	it("runs screen API calls without error", () => {
		const { vm } = createTestVM();
		vm.run(`
			screen.clear(0)
			screen.fillRect(10, 10, 50, 30, 7)
			screen.drawText("Hello", 4, 4, 12, 7)
			screen.drawLine(0, 0, 128, 128, 7)
		`);
		expect(vm.error_info).toBeNull();
	});

	it("runs storage API calls without error", () => {
		const { vm } = createTestVM();
		vm.run(`
			storage.set("score", 42)
			val = storage.get("score")
			storage.delete("score")
		`);
		expect(vm.error_info).toBeNull();
	});

	it("runs arrow functions", () => {
		const { vm, logs } = createTestVM();
		vm.run(`
			add = (a, b) => a + b
			print(add(3, 4))
		`);
		expect(vm.error_info).toBeNull();
		expect(logs.map(String)).toContain("7");
	});
});
