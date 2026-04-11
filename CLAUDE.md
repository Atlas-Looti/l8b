# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **monorepo** for the Atlas Looti Game Engine (AL8B) — a TypeScript game engine with a custom language (LootiScript), bytecode VM, and browser runtime. Uses **Bun** as package manager and **Turbo** as build orchestrator.

## Build Commands

```bash
bun run build          # Build all packages
bun run dev            # Watch mode (starts dev servers)
bun run test           # Run all tests
bun run test:watch     # Watch mode for tests
bun run lint           # Auto-fix lint/format issues (Biome)
bun run lint:check     # Check linting without fixing
bun run format         # Format all files
bun run format:check   # Check formatting without fixing
bun run check-types    # TypeScript type checking across all packages
bun run ci             # Full CI: lint → format:check → check-types → build → test
```

**Single package:**
```bash
cd packages/core/screen && bun run build
cd packages/lootiscript && bun run test
```

## Architecture

### Package Hierarchy

```
@al8b/lootiscript        # Custom language: tokenizer → parser → compiler → bytecode
@al8b/stdlib              # Built-in libs (MathLib, StringLib, ListLib, JSONLib) for LootiScript
@al8b/vm                 # Execution wrapper: L8BVM, context builders, host meta functions
@al8b/io                 # StorageService (key-value persistence)
@al8b/runtime            # MAIN INTEGRATION POINT — orchestrates everything
  ├── @al8b/core/*       # Browser-facing APIs (audio, screen, input, map, sprites, etc.)
  └── @al8b/runtime-realtime  # Multiplayer transport adapter (WebSocket/WebRTC bridge)
```

### The LootiScript Language Pipeline

1. **Tokenizer** (`packages/lootiscript/src/v1/tokenizer.ts`) — source `.loot` → `Token[]`
2. **Parser** (`packages/lootiscript/src/v1/parser.ts`) — `Token[]` → AST `Program`
3. **Compiler** (`packages/lootiscript/src/v1/compiler.ts`) — AST → bytecode `Routine`
4. **Runtime: Processor + Runner + Thread** — executes `Routine` bytecode

Key classes: `Tokenizer`, `Parser`, `Compiler`, `Routine`, `Processor`, `Runner`, `Thread`, `OPCODES`

### Runtime Responsibilities (`@al8b/runtime`)

- Bootstraps the VM with compiled `Routine` artifacts
- Builds the **script-facing globals API**: `screen`, `audio`, `input`, `player`, `scene`, `router`, `system`
- Exposes **host-facing APIs**: `host` (emit events, request data), `session` (user/game/room context), `memory` (save/load snapshots)
- Coordinates the game loop, asset loading, and hot reload
- Route: `RuntimeController` → `RuntimeBridge` → host app

### `@al8b/core/*` Packages

These are **browser-only** primitives consumed by `@al8b/runtime`. They are NOT standalone CLI packages:

- `@al8b/audio` — `AudioCore`, `Sound`, `Music`, `Beeper` (Web Audio API)
- `@al8b/screen` — `Screen` (main render surface), `ZBuffer`, triangle rasterization
- `@al8b/image` — `Image` canvas API, `DrawingOps`, `ShapeOps`, `ColorOps`, fonts, transforms
- `@al8b/input` — `Input` manager, `KeyboardInput`, `MouseInput`, `TouchInput`, `GamepadInput`
- `@al8b/sprites` — `Sprite` wrappers around `Image` frames
- `@al8b/map` — `TileMap` data structure + sprite-backed rendering
- `@al8b/palette` — `Palette` (indexed color management)
- `@al8b/time` — `TimeMachine` (record/replay for debugging)
- `@al8b/player` — `PlayerService` (runtime ↔ host lifecycle hooks)

### Error Test Fixtures (`packages/error-tests`)

Fixture package of intentionally broken `.loot` files for validating diagnostics, parser failures, and error codes. Not published to npm.

## Code Conventions

- **Formatter/Linter**: Biome (configured in `biome.json`)
- **Indentation**: Tabs
- **Quotes**: Double quotes
- **Line width**: 120 characters
- **Tests**: Vitest (files in `src/**/__tests__/` or `**/*.test.ts`)
- **tsup** for bundling TypeScript packages (see `tsup.config.base.ts`)

## Changesets

Version bumps and CHANGELOGs are managed via Changesets. Before merging a PR that affects published packages:

```bash
bun run changeset   # Select packages, bump type (patch/minor/major), write summary
```

## Key Files

- `packages/lootiscript/src/v1/compiler.ts` — AST → bytecode compilation
- `packages/lootiscript/src/v1/processor.ts` — bytecode execution engine
- `packages/enggine/runtime/src/core/controller.ts` — `RuntimeController` (main orchestrator)
- `packages/enggine/vm/src/l8bvm.ts` — `L8BVM` (VM wrapper)
