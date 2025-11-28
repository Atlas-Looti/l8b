# @l8b/cli

**Command-Line Interface** - Development tools for LootiScript game projects.

## Overview

The L8B CLI provides a complete development workflow for LootiScript games:

- **Development Server** - Hot module replacement (HMR) for rapid development
- **Production Build** - Optimized builds for deployment
- **Production Server** - Serve built projects

## Installation

```bash
npm install -g @l8b/cli
```

Or use with npx:

```bash
npx @l8b/cli dev
```

## Commands

### dev

Start development server with hot module replacement.

```bash
l8b dev [root]
```

**Options:**
- `root` - Path to project root (default: current directory)
- `--port <number>` - Port to use (default: 3000)
- `--host <hostname>` - Expose to network (use `0.0.0.0` to expose)

**Examples:**

```bash
# Start dev server in current directory
l8b dev

# Start dev server in specific directory
l8b dev ./my-game

# Use custom port
l8b dev --port 8080

# Expose to network
l8b dev --host 0.0.0.0

# Custom port and host
l8b dev --port 8080 --host 0.0.0.0
```

**Features:**
- Hot module replacement (HMR)
- Automatic browser refresh
- LootiScript compilation
- Asset serving
- Error overlay

### build

Build project for production.

```bash
l8b build [root]
```

**Options:**
- `root` - Path to project root (default: current directory)

**Examples:**

```bash
# Build current directory
l8b build

# Build specific directory
l8b build ./my-game
```

**Output:**
- Compiled LootiScript bytecode
- Optimized assets
- Generated HTML with embedded runtime
- Production-ready bundle in `.l8b/` directory

### start

Serve production build.

```bash
l8b start [root]
```

**Options:**
- `root` - Path to project root (default: current directory)
- `--port <number>` - Port to use (default: 3000)
- `--host <hostname>` - Expose to network

**Examples:**

```bash
# Serve production build
l8b start

# Custom port
l8b start --port 8080

# Expose to network
l8b start --host 0.0.0.0
```

## Project Structure

The CLI expects this project structure:

```
my-game/
├── src/                   # LootiScript files (all .loot files loaded)
│   └── game.loot
├── public/                # Static assets (sprites, sounds, maps)
│   ├── sprites/
│   ├── sounds/
│   └── maps/
└── l8b.config.json        # Optional configuration
```

## Configuration

Create `l8b.config.json` in your project root:

```json
{
  "name": "My Game",
  "orientation": "landscape",
  "aspect": "16x9",
  "width": 1920,
  "height": 1080,
  "canvas": {
    "id": "game"
  },
  "dev": {
    "port": 3000,
    "host": "localhost"
  },
  "logging": {
    "browser": {
      "lifecycle": false,
      "canvas": false
    },
    "terminal": {
      "lifecycle": false,
      "canvas": false,
      "listener": false,
      "errors": true
    }
  }
}
```

**Configuration Options:**

- `name` - Game name (default: "LootiScript Game")
- `orientation` - Screen orientation: `"portrait"`, `"landscape"`, or `"any"` (default: "any")
- `aspect` - Aspect ratio: `"16x9"`, `"4x3"`, `"1x1"`, `"2x1"`, `"free"`, or with `>` prefix for minimum (default: "free")
- `width` / `height` - Canvas dimensions (auto-calculated from aspect if not specified)
- `canvas.id` - Canvas element ID (default: "game")
- `dev.port` - Development server port (default: 3000)
- `dev.host` - Development server host (default: "localhost", use `"0.0.0.0"` to expose)
- `logging` - Control logging output to browser console and terminal

> **Note:** Scripts are automatically loaded from `src/` directory. All `.loot` files are compiled. Build output goes to `.l8b/` directory.

## Development Workflow

### 1. Create Project

```bash
mkdir my-game
cd my-game
npm init -y
npm install @l8b/cli
```

### 2. Create Source File

**src/game.loot:**

```lua
// Initialize
local player = object
  x = 100,
  y = 100
end

// Update loop
function update()
  if keyboard.UP == 1 then
    player.y -= 2
  end
  if keyboard.DOWN == 1 then
    player.y += 2
  end
end

// Draw loop
function draw()
  screen.clear("#000")
  screen.fillRect(player.x, player.y, 16, 16, "#FFF")
end
```

> **Note**: The CLI automatically generates the HTML file and loads all `.loot` files from `src/`.

### 3. Start Development

```bash
npx l8b dev
```

Open http://localhost:3000 in your browser.

### 4. Build for Production

```bash
npx l8b build
```

### 5. Serve Production Build

```bash
npx l8b start
```

## Hot Module Replacement

The dev server supports HMR for rapid development:

- **Code Changes** - Automatically recompiles and refreshes
- **Asset Changes** - Automatically reloads assets
- **Error Overlay** - Shows compilation errors in browser

## Asset Loading

Assets are automatically discovered and loaded:

```
public/
├── sprites/
│   ├── player.png
│   └── enemy.png
├── sounds/
│   └── jump.wav
└── maps/
    └── level1.json
```

Access in LootiScript:

```lua
// Sprites are auto-loaded
screen.drawSprite("player", 100, 100)

// Sounds are auto-loaded
Audio.playSound("jump.wav")

// Maps are auto-loaded
local level = maps["level1"]
```

## Error Handling

The CLI provides detailed error messages:

```
✗ Compilation Error

  File: src/game.loot:15:5
  Error: Unexpected token 'end'
  
  13 |   player.y += 2
  14 | end
> 15 | end
     |     ^
  16 |
```

## Programmatic API

Use the CLI programmatically:

```typescript
import { dev, build, start } from '@l8b/cli';

// Start dev server
await dev('/path/to/project', {
  port: 3000,
  host: 'localhost',
});

// Build project
await build('/path/to/project');

// Start production server
await start('/path/to/project', {
  port: 8080,
});
```

## Troubleshooting

### Port Already in Use

```bash
# Use different port
l8b dev --port 3001
```

### Assets Not Loading

Check that assets are in the correct directory:
- `public/sprites/` for sprites
- `public/sounds/` for sounds
- `public/maps/` for maps

### Build Fails

```bash
# Check for compilation errors
l8b build
```

## See Also

- **@l8b/compiler** - LootiScript compiler
- **@l8b/runtime** - Runtime engine
- **LootiScript Language Reference** - Language documentation
