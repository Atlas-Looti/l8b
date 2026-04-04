# @al8b/compiler

Framework-facing wrapper around the LootiScript compiler. It adds file-aware error reporting, batch compilation, incremental caching, and framework module naming.

## Public API

- `compileSource`
- `compileFile`
- `compileFiles`
- `IncrementalCompiler`
- `createIncrementalCompiler`
- Types from `./compiler`, including `CompileOptions`

## Notes

- Uses `@al8b/lootiscript` for parse and compile stages.
- This is the boundary the framework should use instead of reaching into LootiScript directly.

## Scripts

```bash
bun run build
bun run test
bun run clean
```
