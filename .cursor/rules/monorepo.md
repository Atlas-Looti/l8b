---
description: Monorepo workflow and package management rules
globs: package.json, turbo.json, **/package.json
---

# Monorepo Rules

## Package Manager

**ALWAYS use pnpm**, never npm/yarn/bun:

```bash
pnpm install
pnpm add <package>
pnpm run <script>
```

## Workspace Dependencies

For internal packages, use `workspace:*` protocol:

```json
{
  "dependencies": {
    "@l8b/core/screen": "workspace:*",
    "@l8b/runtime": "workspace:*"
  }
}
```

## Package Naming

- Core packages: `@l8b/core/<name>`
- Engine packages: `@l8b/<name>` (e.g., `@l8b/runtime`, `@l8b/vm`)
- Framework packages:
  - CLI: `l8b` (product name, not scoped)
  - Compiler: `@l8b/compiler` (internal package)
- Tooling packages: `@l8b/tooling/<name>`

## Turbo Configuration

Build orchestration is handled by Turbo. See `turbo.json` for pipeline configuration.

## Creating New Packages

```bash
pnpm run new
```

Follow prompts to create package with proper structure.

## Build Commands

- `pnpm run build` - Build all packages
- `pnpm run dev` - Watch mode for all packages
- `pnpm run check-types` - Type check all packages
- `pnpm run test` - Run all tests
- `pnpm run format` - Format all code
- `pnpm run lint` - Lint all code

## Package Structure

Each package should have:
- `package.json` with proper name and dependencies
- `tsconfig.json` extending `tsconfig.base.json`
- `tsup.config.ts` (can extend base config)
- `src/` directory with source code
- `README.md` with documentation

