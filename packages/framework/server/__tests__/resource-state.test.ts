import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import type { ResolvedConfig } from "@al8b/framework-config";
import type { FileEvent } from "@al8b/framework-watcher";
import { applyResourceEvent, createEmptyProjectResources, createSourceMap } from "../src/resource-state";
import { resolvePathWithinBase } from "../src/file-handler";

const tempDirs: string[] = [];

afterEach(async () => {
	await Promise.all(tempDirs.splice(0).map((dir) => rm(dir, { recursive: true, force: true })));
});

describe("resource-state", () => {
	it("updates source resources incrementally for add, change, and unlink", async () => {
		const config = await createConfigFixture();
		const resources = createEmptyProjectResources();
		const sourcePath = join(config.srcPath, "main.loot");

		await writeFile(sourcePath, 'print("v1")', "utf-8");
		await applyResourceEvent(resources, config, createEvent("add", sourcePath, "source"));

		expect(resources.sources).toHaveLength(1);
		expect(resources.sources[0]?.file).toBe("main.loot");
		expect(resources.sources[0]?.name).toBe("main");
		expect(resources.sources[0]?.content).toContain("v1");
		expect(createSourceMap(resources).get("main.loot")?.content).toContain("v1");

		await writeFile(sourcePath, 'print("v2")', "utf-8");
		await applyResourceEvent(resources, config, createEvent("change", sourcePath, "source"));
		expect(resources.sources[0]?.content).toContain("v2");

		await rm(sourcePath);
		await applyResourceEvent(resources, config, createEvent("unlink", sourcePath, "source"));
		expect(resources.sources).toHaveLength(0);
	});

	it("updates sprite and map resources without a full rediscovery", async () => {
		const config = await createConfigFixture();
		const resources = createEmptyProjectResources();
		const spritePath = join(config.publicPath, "sprites", "hero.png");
		const mapPath = join(config.publicPath, "maps", "level-1.json");

		await writeFile(spritePath, "png", "utf-8");
		await applyResourceEvent(resources, config, createEvent("add", spritePath, "sprite"));
		expect(resources.images[0]?.name).toBe("hero");

		await writeFile(mapPath, JSON.stringify({ width: 1, height: 1, data: [0], sprites: [0], block_width: 8, block_height: 8 }), "utf-8");
		await applyResourceEvent(resources, config, createEvent("add", mapPath, "map"));
		expect(resources.maps[0]?.name).toBe("level-1");
		expect(resources.maps[0]?.data).toMatchObject({ width: 1, height: 1 });
	});
});

describe("resolvePathWithinBase", () => {
	it("blocks traversal outside the configured public directory", async () => {
		const config = await createConfigFixture();
		expect(resolvePathWithinBase(config.publicPath, "/sprites/hero.png")).toContain("sprites");
		expect(resolvePathWithinBase(config.publicPath, "/../secret.txt")).toBeNull();
	});
});

async function createConfigFixture(): Promise<ResolvedConfig> {
	const root = await mkdtemp(join(tmpdir(), "l8b-framework-server-"));
	tempDirs.push(root);

	const srcPath = join(root, "src");
	const publicPath = join(root, "public");
	await mkdir(srcPath, { recursive: true });
	await mkdir(join(publicPath, "sprites"), { recursive: true });
	await mkdir(join(publicPath, "maps"), { recursive: true });
	await mkdir(join(publicPath, "sounds"), { recursive: true });
	await mkdir(join(publicPath, "music"), { recursive: true });
	await mkdir(join(publicPath, "fonts"), { recursive: true });
	await mkdir(join(publicPath, "assets"), { recursive: true });

	return {
		title: "Test",
		orientation: "any",
		aspect: "16x9",
		port: 8080,
		root,
		srcPath,
		publicPath,
		outPath: join(root, "dist"),
		cachePath: join(root, ".l8b"),
	};
}

function createEvent(type: FileEvent["type"], path: string, resourceType: FileEvent["resourceType"]): FileEvent {
	return { type, path, resourceType };
}
