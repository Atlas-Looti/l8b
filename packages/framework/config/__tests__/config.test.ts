import { afterEach, describe, expect, it } from "vitest";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { loadConfig } from "../src/config";

const tempDirs: string[] = [];

afterEach(() => {
	for (const dir of tempDirs.splice(0)) {
		rmSync(dir, { recursive: true, force: true });
	}
});

describe("loadConfig", () => {
	it("loads JSON config and returns metadata", () => {
		const root = createTempProject();
		writeFileSync(
			join(root, "l8b.config.json"),
			JSON.stringify({
				title: "JSON Game",
				port: 9001,
			}),
		);

		const config = loadConfig(root);

		expect(config.title).toBe("JSON Game");
		expect(config.port).toBe(9001);
		expect(config.configFormat).toBe("json");
		expect(config.configFile).toBe(join(root, "l8b.config.json"));
	});

	it("loads JS config default export", () => {
		const root = createTempProject();
		writeFileSync(
			join(root, "l8b.config.js"),
			`export default { title: "JS Game", port: 7001, orientation: "portrait" };`,
		);

		const config = loadConfig(root);

		expect(config.title).toBe("JS Game");
		expect(config.port).toBe(7001);
		expect(config.orientation).toBe("portrait");
		expect(config.configFormat).toBe("js");
	});

	it("loads TS config named export", () => {
		const root = createTempProject();
		writeFileSync(
			join(root, "l8b.config.ts"),
			`export const config = { title: "TS Game", port: 6060, aspect: "4x3" as const };`,
		);

		const config = loadConfig(root);

		expect(config.title).toBe("TS Game");
		expect(config.port).toBe(6060);
		expect(config.aspect).toBe("4x3");
		expect(config.configFormat).toBe("ts");
	});

	it("prefers TypeScript over JavaScript and JSON", () => {
		const root = createTempProject();
		writeFileSync(join(root, "l8b.config.json"), JSON.stringify({ title: "JSON Game", port: 8000 }));
		writeFileSync(join(root, "l8b.config.js"), `export default { title: "JS Game", port: 8001 };`);
		writeFileSync(join(root, "l8b.config.ts"), `export default { title: "TS Game", port: 8002 };`);

		const config = loadConfig(root);

		expect(config.title).toBe("TS Game");
		expect(config.port).toBe(8002);
		expect(config.configFormat).toBe("ts");
		expect(config.configFile).toBe(join(root, "l8b.config.ts"));
	});

	it("throws actionable errors for invalid module exports", () => {
		const root = createTempProject();
		writeFileSync(join(root, "l8b.config.ts"), `export default 42;`);

		expect(() => loadConfig(root)).toThrow(/must export an object/i);
	});

	it("returns default metadata when no config exists", () => {
		const root = createTempProject();

		const config = loadConfig(root);

		expect(config.configFile).toBeNull();
		expect(config.configFormat).toBe("default");
		expect(config.port).toBe(8080);
	});
});

function createTempProject(): string {
	const root = mkdtempSync(join(tmpdir(), "l8b-config-"));
	tempDirs.push(root);
	return root;
}
