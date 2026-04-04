# @al8b/cli

Command-line entrypoint for L8B framework workflows.

## Commands

- `l8b dev [root]`
- `l8b build [root]`
- `l8b preview [root]`
- `l8b init [name]`

## Public API

- Re-exports from `cli`, `commands/dev`, `commands/build`, and `commands/init`
- Binary: `l8b`

## Notes

- This package is the user-facing wrapper around framework config, server, bundler, and compiler packages.
- `preview` exists in the codebase even though it was not previously documented consistently.

## Scripts

```bash
bun run build
bun run test
bun run clean
```
