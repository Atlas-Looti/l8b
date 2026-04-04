// Explicit re-exports from @al8b/vm — wildcard avoided so changes in vm
// don't silently widen the @al8b/runtime public surface.
export { L8BVM, createMetaFunctions, createVMContext, setupArrayExtensions } from "@al8b/vm";
export type {
	ErrorInfo,
	GlobalAPI,
	MetaFunctions,
	SystemAPI,
	VMContext,
	VMWarnings,
	WarningInfo,
} from "@al8b/vm";
