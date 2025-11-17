export const normalizeRefForStorage = (ref: string): string =>
	ref.replace(/\//g, "-");
export const normalizeRefForUsage = (ref: string): string =>
	ref.replace(/-/g, "/");
