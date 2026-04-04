import type { AssetCollections } from "../types";

export class RuntimeAssetsRegistry {
	private collections: AssetCollections = {
		sprites: {},
		maps: {},
		sounds: {},
		music: {},
		assets: {},
	};

	replace(collections: AssetCollections): void {
		this.collections = collections;
	}

	getCollections(): AssetCollections {
		return this.collections;
	}

	get sprites(): AssetCollections["sprites"] {
		return this.collections.sprites;
	}

	get maps(): AssetCollections["maps"] {
		return this.collections.maps;
	}

	get sounds(): AssetCollections["sounds"] {
		return this.collections.sounds;
	}

	get music(): AssetCollections["music"] {
		return this.collections.music;
	}

	get assets(): AssetCollections["assets"] {
		return this.collections.assets;
	}
}
