# @al8b/vscode

VS Code extension for LootiScript and the L8B framework. It packages the language client, ships the bundled language server, and exposes the editor workflow for authoring `.loot` files.

## Features

- Language server integration
- Completion and hover information
- Rename, references, symbols, and semantic tokens
- Formatting and code actions
- Extension views and commands defined in `src/extension.ts`

## Development Scripts

```bash
bun run compile
bun run watch
bun run package
bun run test
bun run test:e2e
bun run vsce:package
```

## Notes

- The extension depends on the sibling `@al8b/language-server` package and bundles its build output into `server/`.
- `.vscode-test/` is test tooling output and is not part of the authored package surface.
