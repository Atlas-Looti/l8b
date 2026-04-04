import { describe, expect, it } from "vitest";
import { RuntimeAssetsRegistry } from "../src/core/assets-registry";

describe("RuntimeAssetsRegistry", () => {
	it("replaces and exposes asset collections consistently", () => {
		const registry = new RuntimeAssetsRegistry();
		registry.replace({
			sprites: { hero: { ready: true } },
			maps: { world: { ready: true } },
			sounds: { click: { ready: true } },
			music: { theme: { ready: true } },
			assets: { atlas: { file: "atlas.bin" } },
		});

		expect(registry.sprites.hero.ready).toBe(true);
		expect(registry.maps.world.ready).toBe(true);
		expect(registry.sounds.click.ready).toBe(true);
		expect(registry.music.theme.ready).toBe(true);
		expect(registry.assets.atlas.file).toBe("atlas.bin");
	});
});
