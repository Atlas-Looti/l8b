# L8B Framework

Custom build framework for L8B Game Engine. **Does not use Vite** - implements a custom build system optimized for game development.

## Packages

| Package                   | Description                 |
| ------------------------- | --------------------------- |
| `@l8b/cli`                | Command line interface      |
| `@l8b/framework-server`   | Development server with HMR |
| `@l8b/framework-bundler`  | Production bundler          |
| `@l8b/compiler`            | LootiScript compilation     |
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
│        @l8b/compiler               │
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
- **WebSocket Communication** - Real-time communication channel

## Build Output

```text
.l8b/
├── index.html      # Entry HTML
├── runtime.js      # Bundled runtime
├── modules/        # Compiled bytecode
│   ├── main.l8b
│   └── ...
└── assets/         # Copied assets
    ├── sprites/    # Sprite images
    ├── maps/       # Map JSON files
    ├── sounds/     # Sound effects
    └── music/      # Background music
```

## Configuration

Create `l8b.config.json` in project root:

```json
{
  "name": "my-game",
  "orientation": "landscape",
  "aspect": "16x9",
  "width": 1920,
  "height": 1080,
  "srcDir": "src",
  "publicDir": "public",
  "outDir": ".l8b",
  "dev": {
    "port": 3000,
    "host": "localhost"
  }
}
```
