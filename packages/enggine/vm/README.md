# @al8b/vm

Execution wrapper around LootiScript for L8B. It exposes the VM class, context builders, host meta functions, and the subset of language primitives the runtime legitimately needs.

## Public API

- `L8BVM`
- `createVMContext`
- `createMetaFunctions`
- `setupArrayExtensions`
- Re-exported language primitives: `Random`, `Routine`
- Types: `ErrorInfo`, `GlobalAPI`, `MetaFunctions`, `PlayerAPI`, `SystemAPI`, `VMContext`, `VMWarnings`, `WarningInfo`

## Notes

- `StorageService` is intentionally not re-exported here; import it from `@al8b/io` directly.
- Used by `@al8b/runtime` as the host-facing VM boundary.

## Scripts

```bash
bun run build
bun run test
bun run clean
```
