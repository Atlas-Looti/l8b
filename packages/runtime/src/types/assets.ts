/**
 * Asset type definitions
 */

/**
 * Resources metadata
 */
export interface Resources {
	/** Image/sprite resources */
	images?: ResourceFile[];
	/** Map resources */
	maps?: ResourceFile[];
	/** Sound resources */
	sounds?: ResourceFile[];
	/** Music resources */
	music?: ResourceFile[];
	/** Generic asset resources */
	assets?: ResourceFile[];
	/** Source code files */
	sources?: ResourceFile[];
}

/**
 * Resource file metadata
 */
export interface ResourceFile {
	/** File name */
	file: string;
	/** Version/hash for cache busting */
	version?: string | number;
	/** Additional properties (for sprites, etc) */
	properties?: any;
}

/**
 * Asset collections
 */
export interface AssetCollections {
	sprites: Record<string, any>;
	maps: Record<string, any>;
	sounds: Record<string, any>;
	music: Record<string, any>;
	assets: Record<string, any>;
}
