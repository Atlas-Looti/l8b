# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

L8B (Looti Engine) is a TypeScript-based 2D game engine with a custom scripting language called LootiScript (`.loot` files). It compiles LootiScript to bytecode executed by a custom VM. The project lives in the `l8b/` subdirectory and is organized as a monorepo using **bun** workspaces and **Turborepo**.

## Commands

All commands run from the `l8b/` directory.

```bash
bun install                     # Install dependencies
bun run build                   # Build all packages (turbo)
bun run dev                     # Watch mode for all packages
bun run test                    # Run all tests (vitest)
bun run test:watch              # Tests in watch mode
bun run check-types             # TypeScript type checking
bun run lint                    # Biome lint + autofix
bun run lint:check              # Lint without fixing
bun run format                  # Biome format + autofix
bun run ci                      # Full CI: lint:check, format:check, check-types, build, test

# Single package
cd packages/core/sprites && bun run test             # Test one package
turbo build --filter=@l8b/core/sprites               # Build one package
turbo build --filter="./packages/framework/**"        # Build a group

# Docs (VitePress)
bun run docs:dev                # Dev server
bun run docs:build              # Build docs

# New package scaffold
bun run new
```

## Critical Rules

- **Always use bun** (never npm/yarn/pnpm). Node `^24.0.0`.
- **Biome** for formatting and linting. Indentation is **tabs**, double quotes, line width 120.
- The framework does **NOT** use Vite. It has a custom build system (server, bundler, compiler, watcher).

## Architecture

The monorepo has four package groups under `l8b/packages/`:

### `core/` - Game Engine APIs
Individual packages (screen, audio, input, sprites, map, palette, scene, assets, time) each expose a service class with a `getInterface()` method that returns the API object for LootiScript. Each also needs a language server API definition in `packages/tooling/language-server/src/api-definitions/`.

### `enggine/` - Runtime Engine
- **runtime** - Orchestrator: initializes core services, creates the VM with global APIs, runs the game loop (input -> update -> draw at 60 FPS)
- **vm** - Bytecode VM that executes compiled LootiScript
- **stdlib** - Standard library (Math, String, List, JSON utilities)
- **io** - Persistent storage (localStorage with batched writes)

### `lootiscript/` - Language
Parser (tokenize -> AST) and compiler (AST -> bytecode) for `.loot` files. Public API: `compileSource`, `parseSource`.

### `framework/` - Build Tooling
CLI (`l8b dev`, `l8b build`, `l8b init`), dev server with WebSocket HMR, production bundler with plugin system, file watcher, HTML template generation, config loading. The bundler uses a plugin architecture (assets, html, runtime, minify).

### `tooling/` - IDE Support
Language server (LSP with completion, hover, diagnostics), diagnostics package (error codes like `E1xxx`), and VSCode extension for `.loot` files.

## Key Integration Points

- **Orchestrator** (`packages/enggine/runtime/src/core/orchestrator.ts`): wires core services into the VM as global APIs
- **GlobalAPI type** (`packages/enggine/vm/src/types/global-api.ts`): defines the shape of APIs available to LootiScript
- **API definitions** (`packages/tooling/language-server/src/api-definitions/`): drive autocompletion; must match actual core API interfaces

## Adding a New Core API

1. `bun run new` to scaffold package under `core/`
2. Implement service with `getInterface()` and `dispose()`
3. Register in orchestrator (`enggine/runtime/src/core/orchestrator.ts`)
4. Add type to `GlobalAPI` (`enggine/vm/src/types/global-api.ts`)
5. Add language server definition (`tooling/language-server/src/api-definitions/`)
6. Add docs page in `site/docs/`
