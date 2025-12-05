# L8B Game Engine - AI Agent Instructions

## Project Overview

L8B (Looti Engine) is a TypeScript-based 2D game engine with a custom scripting language (LootiScript). The project is organized as a monorepo using **pnpm** and Turbo.

## Critical Rules

1.**Package Manager**: **ALWAYS use pnpm**. Never use npm, yarn, or bun.
    - See `.cursor/rules/monorepo.md` for details.
2.**Code Style**: Use **Biome** for formatting. Indentation must be **TABS**.
    - See `.cursor/rules/project-essentials.mdc` and `.cursor/rules/typescript.md`.

## Project Structure

```l8b/
├── packages/
│   ├── core/          # Core APIs (sprites, screen, audio, input, etc.)
│   ├── enggine/       # Runtime engine (VM, I/O, orchestrator)
│   ├── framework/     # CLI, compiler
│   ├── tooling/       # Language server, diagnostics
│   └── lootiscript/   # LootiScript parser/compiler
├── examples/          # Example projects
├── docs/             # VitePress documentation
└── .cursor/rules/    # Project-specific AI rules
```

## Detailed Rules & Workflows

Please refer to the specific rule files in `.cursor/rules/` for detailed instructions. These are the **Single Source of Truth**.

- **Monorepo & Package Management**: [monorepo.md](.cursor/rules/monorepo.md)
- **Framework (CLI, Build)**: [framework.md](.cursor/rules/framework.md)
- **Core APIs**: [core-apis.md](.cursor/rules/core-apis.md)
- **LootiScript Language**: [lootiscript.md](.cursor/rules/lootiscript.md)
- **TypeScript Standards**: [typescript.md](.cursor/rules/typescript.md)
- **Project Essentials**: [project-essentials.mdc](.cursor/rules/project-essentials.mdc)

## Package-Specific Guides

For deep dives into specific packages, see their local `AGENTS.md`:

- **Core**: `packages/core/AGENTS.md`
- **Engine**: `packages/enggine/AGENTS.md`
- **LootiScript**: `packages/lootiscript/AGENTS.md`
- **Tooling**: `packages/tooling/AGENTS.md`

## Common Tasks

### Adding a New Core API

See `.cursor/rules/core-apis.md` and `packages/core/AGENTS.md`.

### Modifying Framework CLI

See `.cursor/rules/framework.md`.

### Adding Language Feature

See `.cursor/rules/lootiscript.md` and `packages/lootiscript/AGENTS.md`.

## Documentation

- Documentation is in `docs/` (VitePress).
- Run `pnpm run docs:dev` to preview.
