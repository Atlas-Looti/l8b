# L8B Game Engine - AI Agent Instructions

## Project Overview

L8B (Looti Engine) is a TypeScript-based 2D game engine with a custom scripting language (LootiScript). The project is organized as a monorepo using Bun and Turbo.

## Project Structure

```
l8b/
├── packages/
│   ├── core/          # Core APIs (sprites, screen, audio, input, time, map, palette, scene, assets)
│   ├── enggine/       # Runtime engine (VM, I/O, runtime orchestrator, stdlib)
│   ├── framework/     # CLI, compiler
│   ├── tooling/       # Language server, diagnostics, VSCode extension
│   └── lootiscript/   # LootiScript parser and language implementation
├── examples/          # Example projects and demos
├── docs/             # VitePress documentation (English)
└── apps/             # Applications
```

## How It All Works Together

### Development Workflow

1. **Developer writes LootiScript** (`.loot` files in `src/`)
2. **CLI dev server** (`l8b dev`):
   - Watches for changes in `src/`, `public/`, `l8b.config.json`
   - Compiles `.loot` files on-the-fly using `@l8b/compiler`
   - Generates HTML with embedded runtime
   - Provides HMR via Vite
3. **Runtime** loads compiled code and executes via VM
4. **Core APIs** are exposed to LootiScript through VM globals

### Build Workflow

1. **CLI build** (`l8b build`):
   - Discovers all `.loot` files in `src/`
   - Compiles each to bytecode using `@l8b/compiler`
   - Saves compiled bytecode to `.l8b/`
   - Bundles runtime using Vite
   - Copies public assets
   - Generates production HTML
2. **Production HTML** includes:
   - Embedded runtime bundle
   - Compiled bytecode modules
   - Resource manifest
3. **Runtime** loads and executes bytecode

### Compilation Pipeline

```
.loot source → Parser → AST → Compiler → Bytecode → Serialize → .l8b/
```

1. **Parser** (`packages/lootiscript`) - Tokenizes and parses source
2. **Compiler** (`packages/lootiscript`) - Compiles AST to bytecode
3. **Framework** (`packages/framework/compiler`) - Serializes bytecode
4. **Runtime** (`packages/enggine/vm`) - Executes bytecode

### Runtime Execution

1. **Runtime Orchestrator** initializes:
   - Core services (screen, audio, input, etc.)
   - VM with global APIs
   - Scene manager
2. **VM** loads compiled routines
3. **Game loop** runs:
   - Update input
   - Call `update()` or scene `update()`
   - Call `draw()` or scene `draw()`
4. **Core APIs** handle game logic

## Package Manager

**CRITICAL: Always use pnpm, never npm/yarn/bun**

- Installation: `pnpm install`
- Running scripts: `pnpm run <script>`
- Adding dependencies: `pnpm add <package>`
- For workspace packages: Use `workspace:*` protocol

## Code Style & Formatting

This project uses **Biome** for linting and formatting:

- **Indentation**: TABS (not spaces) - this is critical
- **Quotes**: Double quotes for JavaScript/TypeScript
- **Format code**: `pnpm run format`
- **Lint code**: `pnpm run lint`
- Always format code before committing

## TypeScript Conventions

- Use meaningful variable and function names
- Add JSDoc comments for public APIs and complex logic
- Prefer explicit types over inference for function signatures
- Use `interface` for object shapes, `type` for unions/intersections
- Organize imports: external packages → internal packages → relative imports
- Use `@l8b/` namespace for internal packages

## Monorepo Workflow

The project uses **Turbo** for build orchestration:

- Build all packages: `pnpm run build`
- Dev mode (all packages): `pnpm run dev`
- Type checking: `pnpm run check-types`
- Create new package: `pnpm run new`

## Build System

- Uses `tsup` for building TypeScript packages
- Base configuration: `tsup.config.base.ts` (shared across packages)
- Each package can override with its own `tsup.config.ts`
- Build output goes to `dist/` directory

## Framework Workflow

### CLI Commands

- **`l8b init <name>`** - Create new project
- **`l8b dev [root]`** - Start dev server with HMR
- **`l8b build [root]`** - Build for production
- **`l8b start [root]`** - Serve production build

### Dev Server

The dev server (`l8b dev`):

1. Loads config from `l8b.config.json`
2. Watches `src/`, `public/`, `l8b.config.json`
3. Uses Vite with custom LootiScript plugin
4. Compiles `.loot` files on-the-fly
5. Generates HTML with runtime on each request
6. Provides HMR via WebSocket

### Build Process

The build process (`l8b build`):

1. Discovers all `.loot` files in `src/`
2. Compiles each to bytecode
3. Saves compiled bytecode to `.l8b/`
4. Bundles runtime using Vite
5. Copies public assets
6. Generates production HTML

See `packages/framework/AGENTS.md` for detailed framework documentation.

## Core API Development

Core APIs are exposed to LootiScript via VM globals. Each API:

1. Implements service class with `getInterface()` method
2. Is registered in runtime orchestrator
3. Has language server definition for autocompletion
4. Is documented in package README.md

See `packages/core/AGENTS.md` for detailed core API patterns.

## Runtime Architecture

The runtime orchestrator:

1. Initializes core services
2. Creates VM with global APIs
3. Loads compiled routines or sources
4. Runs game loop (update/draw)
5. Manages scene lifecycle

See `packages/enggine/AGENTS.md` for detailed runtime documentation.

## Language Server

The language server:

1. Provides autocompletion based on API definitions
2. Validates LootiScript code
3. Shows diagnostics from compiler
4. Provides hover documentation

See `packages/tooling/AGENTS.md` for detailed tooling documentation.

## LootiScript Language

LootiScript is compiled to bytecode:

1. Source → Parser → AST
2. AST → Compiler → Bytecode
3. Bytecode → VM → Execution

See `packages/lootiscript/AGENTS.md` for detailed language documentation.

## Testing

- Test files: `*.test.ts` or `*.spec.ts`
- Run tests: `pnpm run test`
- Watch mode: `pnpm run test:watch`
- Coverage: `pnpm run test:coverage`
- Use Vitest for all testing

## Documentation

- Uses VitePress for documentation (in `docs/`)
- All documentation is in English
- Dev server: `pnpm run docs:dev`
- Build docs: `pnpm run docs:build`
- API documentation in package README.md files
- See `docs/fundamentals/api-reference.md` for complete API reference

## Common Tasks

### Adding a New Core API

1. Create package: `pnpm run new` (choose `core/<api-name>`)
2. Implement service with `getInterface()` method
3. Register in `packages/enggine/runtime/src/core/orchestrator.ts`
4. Add API definition in `packages/tooling/language-server/src/api-definitions/`
5. Update type definitions in `packages/enggine/vm/src/types/global-api.ts`
6. Write documentation in package README.md
7. Update `docs/fundamentals/api-reference.md`
8. Add examples in `examples/`

### Modifying Framework CLI

1. Edit command in `packages/framework/cli/src/commands/`
2. Update CLI registration in `packages/framework/cli/src/cli.ts`
3. Test with example project
4. Update documentation

### Adding Language Feature

1. Update parser in `packages/lootiscript/src/v1/parser.ts`
2. Update compiler in `packages/lootiscript/src/v1/compiler.ts`
3. Update VM if needed in `packages/enggine/vm/`
4. Add tests in `packages/lootiscript/__tests__/`
5. Update documentation in `docs/fundamentals/looti-script-programming.md`

## Key Files Reference

### Framework

- `packages/framework/cli/src/commands/dev.ts` - Dev server
- `packages/framework/cli/src/commands/build.ts` - Build process
- `packages/framework/cli/src/loader/source-loader.ts` - Source discovery
- `packages/framework/cli/src/loader/auto-detect.ts` - Resource detection
- `packages/framework/cli/src/generator/html-generator.ts` - HTML generation

### Runtime

- `packages/enggine/runtime/src/core/orchestrator.ts` - Main orchestrator
- `packages/enggine/vm/src/` - VM implementation
- `packages/enggine/stdlib/src/` - Standard library

### Core APIs

- `packages/core/*/src/index.ts` - API implementations
- `packages/tooling/language-server/src/api-definitions/` - API definitions

### Language

- `packages/lootiscript/src/v1/parser.ts` - Parser
- `packages/lootiscript/src/v1/compiler.ts` - Compiler

## Getting Help

- Check package-specific AGENTS.md files:
  - `packages/framework/AGENTS.md` - Framework workflow
  - `packages/core/AGENTS.md` - Core API patterns
  - `packages/enggine/AGENTS.md` - Runtime architecture
  - `packages/tooling/AGENTS.md` - Language server
  - `packages/lootiscript/AGENTS.md` - Language implementation
- Review package README.md files for API documentation
- Review VitePress documentation in `docs/`
- Look at examples in `examples/` directory
- See `.cursorrules` for Cursor AI agent rules
