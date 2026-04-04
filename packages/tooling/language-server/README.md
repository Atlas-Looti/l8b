# @al8b/language-server

Language Server Protocol implementation for LootiScript and L8B authoring workflows.

## Provided Features

- Completion
- Signature help
- Hover
- Go to definition
- References
- Rename
- Document and workspace symbols
- Formatting
- Quick fixes and refactors
- Semantic tokens
- Embedded JSON validation support

## Public Surface

- Binary: `l8b-language-server`
- Main entrypoint: `src/server.ts`

## Notes

- Consumes `@al8b/lootiscript` for language structure and `@al8b/diagnostics` for reporting.
- This package is meant to be embedded by editors or editor extensions rather than used as an app-level library.

## Scripts

```bash
bun run build
bun run clean
```
