// Explicit re-exports from @l8b/vm — wildcard avoided so changes in vm
// don't silently widen the @l8b/runtime public surface.
export { L8BVM, createMetaFunctions, createVMContext, setupArrayExtensions } from "@l8b/vm";
export type {
	ErrorInfo,
	GlobalAPI,
	MetaFunctions,
	SystemAPI,
	VMContext,
	VMWarnings,
	WarningInfo,
} from "@l8b/vm";
