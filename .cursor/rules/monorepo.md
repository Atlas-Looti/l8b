---
description: Monorepo workflow and package management rules
globs: package.json, turbo.json, **/package.json
---

# Monorepo Rules

## Package Manager

**ALWAYS use Bun**, never npm/yarn/pnpm:

```bash
bun install
bun add <package>
bun run <script>
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
- Framework packages: `@l8b/framework/<name>`
- Tooling packages: `@l8b/tooling/<name>`

## Turbo Configuration

Build orchestration is handled by Turbo. See `turbo.json` for pipeline configuration.

## Creating New Packages

```bash
bun run new
```

Follow prompts to create package with proper structure.

## Build Commands

- `bun run build` - Build all packages
- `bun run dev` - Watch mode for all packages
- `bun run check-types` - Type check all packages
- `bun run test` - Run all tests
- `bun run format` - Format all code
- `bun run lint` - Lint all code

## Package Structure

Each package should have:
- `package.json` with proper name and dependencies
- `tsconfig.json` extending `tsconfig.base.json`
- `tsup.config.ts` (can extend base config)
- `src/` directory with source code
- `README.md` with documentation

