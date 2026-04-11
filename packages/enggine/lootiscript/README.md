# @al8b/lootiscript

LootiScript language implementation. This package contains the tokenizer, parser, compiler, bytecode routine model, execution engine, AST nodes, and debugging helpers that power the rest of the L8B stack.

## Public API

- Front-end: `Tokenizer`, `Token`, `Parser`, `Compiler`, `LocalLayer`, `Locals`
- Bytecode: `Routine`, `OPCODES`
- Runtime: `Processor`, `Runner`, `Thread`
- Tooling/dev: `Transpiler`
- Utilities: `Random`
- AST exports from `./v1/program`
- Runtime types from `./v1/processor-types`

## Notes

- Consumed by compiler, VM, language server, and diagnostics flows.
- This is the language source of truth; framework packages should use wrappers when available instead of reaching into internals ad hoc.

## Scripts

```bash
bun run build
bun run test
bun run check-types
bun run clean
```
