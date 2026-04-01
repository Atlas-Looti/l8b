// VM public surface — StorageService is intentionally NOT re-exported here.
// Import it directly from "@l8b/io" if you need it.
export { createMetaFunctions, createVMContext } from "./context";
export { setupArrayExtensions } from "./extensions";
export { L8BVM } from "./l8bvm";
export type {
	ErrorInfo,
	GlobalAPI,
	MetaFunctions,
	PlayerAPI,
	SystemAPI,
	VMContext,
	VMWarnings,
	WarningInfo,
} from "./types";

// Re-export language primitives that runtime and host code legitimately need.
// This keeps runtime from bypassing the vm layer and importing lootiscript directly.
export { Random, Routine } from "@l8b/lootiscript";
