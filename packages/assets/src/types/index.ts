export interface Runtime {
	assets: Record<
		string,
		{
			file: string;
		}
	>;
}

export interface LoaderResult {
	ready: number;
}

export interface ImageLoaderResult extends LoaderResult {
	image?: any;
}

export interface JSONLoaderResult extends LoaderResult {
	data?: any;
}

export interface TextLoaderResult extends LoaderResult {
	text?: string;
}

export interface AssetManagerOptions {
	runtime: Runtime;
}
