# L8B Framework

Custom build framework for L8B Game Engine. **Does not use Vite** - implements a custom build system optimized for game development.

## Packages

| Package                   | Description                 |
| ------------------------- | --------------------------- |
| `@l8b/cli`                | Command line interface      |
| `@l8b/framework-server`   | Development server with HMR |
| `@l8b/framework-bundler`  | Production bundler          |
| `@l8b/framework-compiler` | LootiScript compilation     |
| `@l8b/framework-watcher`  | File watching system        |
| `@l8b/framework-html`     | HTML template generation    |
| `@l8b/framework-config`   | Configuration management    |
| `@l8b/framework-shared`   | Shared utilities            |

## Architecture

```text
┌─────────────────────────────────────────────────────────────┐
│                         @l8b/cli                            │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐                     │
│  │   dev   │  │  build  │  │  init   │                     │
│  └────┬────┘  └────┬────┘  └─────────┘                     │
└───────┼────────────┼────────────────────────────────────────┘
        │            │
        ▼            ▼
┌───────────────┐ ┌────────────────┐
│  @l8b/server  │ │ @l8b/bundler   │
│  ┌──────────┐ │ │ ┌────────────┐ │
│  │   HTTP   │ │ │ │   Assets   │ │
│  │  Server  │ │ │ │  Processor │ │
│  └──────────┘ │ │ └────────────┘ │
│  ┌──────────┐ │ │ ┌────────────┐ │
│  │   HMR    │ │ │ │   Minify   │ │
│  │WebSocket │ │ │ │            │ │
│  └──────────┘ │ │ └────────────┘ │
└───────┬───────┘ └───────┬────────┘
        │                 │
        ▼                 ▼
┌─────────────────────────────────────┐
│        @l8b/framework-compiler      │
│  ┌──────────┐  ┌─────────────────┐  │
│  │  Parser  │→ │    Compiler     │  │
│  │(tokenize)│  │  (bytecode)     │  │
│  └──────────┘  └─────────────────┘  │
│        Uses @l8b/lootiscript        │
└─────────────────────────────────────┘
        │
        ▼
┌─────────────────────────────────────┐
│        @l8b/framework-shared        │
│  Types, Constants, Utilities        │
└─────────────────────────────────────┘
```

## Usage

### Development

```bash
# Start dev server
l8b dev [root]

# With options
l8b dev --port 3000 --open
```

### Production Build

```bash
# Build for production
l8b build [root]

# With minification
l8b build --minify
```

### Create New Project

```bash
# Create new project
l8b init my-game
```

## Development Server Features

- **Hot Module Replacement (HMR)** - Source code changes reload instantly
- **Live Sprite Reload** - Sprite changes reflect immediately
- **Map Updates** - Map changes sync in real-time
- **Error Overlay** - Compilation errors shown in browser
- **WebSocket Communication** - Based on microstudio's player/playerclient pattern

## Build Output

```text
dist/
├── index.html      # Entry HTML
├── game.js         # Bundled runtime + compiled sources
├── sprites/        # Sprite images
├── maps/           # Map JSON files
├── sounds/         # Sound effects
└── music/          # Background music
```

## Configuration

Create `l8b.config.json` in project root:

```json
{
  "title": "My Game",
  "orientation": "landscape",
  "aspect": "16x9",
  "graphics": "M2D",
  "port": 8080,
  "srcDir": "src",
  "publicDir": "public",
  "outDir": "dist"
}
```

## Relationship to Microstudio

This framework is inspired by microstudio's architecture:

- `Player` class → `L8BDevServer` + runtime loader
- `PlayerClient` class → `HMRServer` + client script
- `Runtime` class → Engine runtime (separate package)

Key differences:

- Written in TypeScript instead of CoffeeScript
- Modular package architecture
- Custom build system (no Vite)
- LootiScript instead of MicroScript
