// Convert forward slashes to dashes for safe storage in map data format
export const normalizeRefForStorage = (ref: string): string => ref.replace(/\//g, "-");
// Convert dashes back to forward slashes for sprite reference lookup
export const normalizeRefForUsage = (ref: string): string => ref.replace(/-/g, "/");
