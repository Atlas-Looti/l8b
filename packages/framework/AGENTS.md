# Framework Package - AI Agent Guide

## Overview

The framework package provides build tooling for L8B:

- **CLI** - Command line interface (`l8b` command)
- **Server** - Development server with HMR
- **Bundler** - Production build system
- **Compiler** - LootiScript compilation wrapper
- **Watcher** - File watching for hot reload
- **HTML** - Template generation
- **Config** - Configuration management
- **Shared** - Common utilities

## Critical: No Vite

This framework does NOT use Vite. It implements a custom build system because:

1. Game engines have specific requirements
2. Direct control over the build pipeline
3. Integration with microstudio patterns
4. Optimized for LootiScript compilation

## Package Dependencies

```
@l8b/cli
├── @l8b/framework-server
│   ├── @l8b/framework-compiler
│   ├── @l8b/framework-watcher
│   ├── @l8b/framework-html
│   └── @l8b/framework-config
├── @l8b/framework-bundler
│   ├── @l8b/framework-compiler
│   └── @l8b/framework-config
└── @l8b/framework-shared (all packages depend on this)
```

## Key Patterns

### HMR Pattern (from microstudio)

The HMR system mirrors microstudio's player/playerclient:

```typescript
// Server side (hmr.ts)
class HMRServer {
  broadcast(message: HMRMessage): void {
    // Send to all connected clients
  }
}

// Client side (client.ts - runs in browser)
const L8BClient = {
  handleSourceUpdate(msg) {
    // Update runtime source
    window.player.runtime.updateSource(msg.name, msg.data, true);
  },
};
```

### Resource Discovery Pattern

```typescript
// discovery.ts
function discoverResources(config: ResolvedConfig): ProjectResources {
  return {
    sources: discoverSourceFiles(config.srcPath),
    images: discoverSprites(join(config.publicPath, "sprites")),
    maps: discoverMaps(join(config.publicPath, "maps")),
    // ...
  };
}
```

### Configuration Pattern

```typescript
// config.ts
function loadConfig(root: string): ResolvedConfig {
  // Load l8b.config.json
  // Merge with defaults
  // Resolve all paths
  return resolvedConfig;
}
```

## CLI Commands

### dev

```typescript
// commands/dev.ts
async function devCommand(options: DevOptions): Promise<void> {
  const server = await createDevServer({
    root: options.root,
    port: options.port,
  });
}
```

### build

```typescript
// commands/build.ts
async function buildCommand(options: BuildOptions): Promise<void> {
  const config = loadConfig(options.root);
  const result = await build({
    config,
    minify: options.minify,
  });
}
```

### init

```typescript
// commands/init.ts
async function initCommand(options: InitOptions): Promise<void> {
  // Create project structure
  // Generate config file
  // Create starter files
}
```

## File Structure

```
packages/framework/
├── cli/src/
│   ├── bin.ts           # Entry point
│   ├── cli.ts           # Argument parsing
│   └── commands/        # Command implementations
├── server/src/
│   ├── server.ts        # HTTP server
│   ├── hmr.ts           # WebSocket HMR
│   └── middleware.ts    # Request handlers
├── bundler/src/
│   ├── bundler.ts       # Build orchestrator
│   └── plugins/         # Plugin-based system (Vite-style)
│       ├── index.ts     # Plugin container
│       ├── assets.ts    # Asset processing
│       ├── html.ts      # HTML generation
│       ├── runtime.ts   # Runtime bundling
│       └── minify.ts    # Minification
├── compiler/src/
│   └── compiler.ts      # LootiScript compilation
├── watcher/src/
│   ├── watcher.ts       # File watcher (chokidar)
│   └── events.ts        # Event types
├── html/src/
│   ├── templates.ts     # HTML templates
│   ├── client.ts        # Client HMR script
│   ├── player.ts        # Player class (microstudio-style)
│   ├── overlay.ts       # Error overlay (Web Component)
│   └── dev-badge.ts     # Dev badge (Web Component)
├── config/src/
│   ├── config.ts        # Config loading
│   └── discovery.ts     # Resource discovery
└── shared/src/
    ├── types.ts         # Shared types
    ├── constants.ts     # Constants
    └── utils/           # Utility functions
```

## Testing

Run framework tests:

```bash
pnpm test --filter "@l8b/cli"
pnpm test --filter "@l8b/framework-*"
```

## Development

Build all framework packages:

```bash
pnpm build --filter "./packages/framework/**"
```

Watch mode:

```bash
pnpm dev --filter "./packages/framework/**"
```

## Integration with Core

The framework bundles and exposes core APIs:

1. **Dev mode**: Runtime loads sources, uses core APIs
2. **Prod mode**: Bundler includes compiled core APIs

Runtime initialization (in HTML):

```javascript
window.player = new Player(listener);
// Player creates Runtime
// Runtime initializes Screen, Audio, Input, etc.
// Runtime creates VM with global APIs
```

## Common Tasks

### Adding New CLI Command

1. Create command file in `cli/src/commands/`
2. Export from `cli/src/index.ts`
3. Add case to `cli.ts` switch

### Modifying HMR Messages

1. Add type to `shared/src/types.ts`
2. Handle in `server/src/hmr.ts`
3. Handle in `html/src/client.ts`

### Adding Resource Type

1. Add type to `shared/src/types.ts`
2. Add discovery in `config/src/discovery.ts`
3. Handle in `server/src/server.ts`
4. Add copy logic in `bundler/src/plugins/assets.ts`
