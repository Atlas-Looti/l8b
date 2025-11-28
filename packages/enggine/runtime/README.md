# @l8b/runtime

**Runtime Orchestrator** - Core runtime system for the l8b game engine.

> **Note**: This package is for engine developers integrating l8b into applications.

## Overview

The runtime package provides `RuntimeOrchestrator`, which coordinates all engine subsystems:

- Screen rendering
- Audio playback
- Input handling
- Asset loading
- Scene management
- Storage/IO
- Standard library
- VM execution

## Installation

```bash
npm install @l8b/runtime
```

## Basic Usage

```typescript
import { RuntimeOrchestrator } from '@l8b/runtime';

// Create runtime instance
const runtime = new RuntimeOrchestrator({
  canvas: document.getElementById('game-canvas'),
  listener: {
    // Optional callbacks
    codeStarted: () => console.log('Game started'),
    codePaused: () => console.log('Game paused'),
    codeEnded: () => console.log('Game ended'),
    reportError: (error) => console.error('Runtime error:', error),
  },
});

// Load and run LootiScript code
const code = `
  function update() {
    // Game logic
  }
  
  function draw() {
    screen.clear("#000")
    screen.drawText("Hello World", 10, 10, 16)
  }
`;

await runtime.loadCode(code);
runtime.start();
```

## Configuration

### RuntimeOptions

```typescript
interface RuntimeOptions {
  canvas?: HTMLCanvasElement;
  width?: number;
  height?: number;
  listener?: RuntimeListener;
  preserveStorage?: boolean;
}
```

- `canvas` - Canvas element for rendering (optional, creates one if not provided)
- `width` - Canvas width in pixels (default: 1080)
- `height` - Canvas height in pixels (default: 1920)
- `listener` - Event callbacks for runtime lifecycle
- `preserveStorage` - Keep existing storage data (default: false)

### RuntimeListener

```typescript
interface RuntimeListener {
  codeStarted?: () => void;
  codePaused?: () => void;
  codeEnded?: () => void;
  reportError?: (error: string) => void;
}
```

## API Methods

### loadCode()

Load and compile LootiScript code.

```typescript
await runtime.loadCode(sourceCode: string): Promise<void>
```

### start()

Start the game loop.

```typescript
runtime.start(): void
```

### pause()

Pause the game loop.

```typescript
runtime.pause(): void
```

### resume()

Resume the game loop.

```typescript
runtime.resume(): void
```

### stop()

Stop the game loop and reset.

```typescript
runtime.stop(): void
```

### getCanvas()

Get the canvas element.

```typescript
const canvas = runtime.getCanvas(): HTMLCanvasElement
```

## Architecture

The `RuntimeOrchestrator` initializes and coordinates:

1. **Screen** (`@l8b/screen`) - 2D/3D rendering
2. **Audio** (`@l8b/audio`) - Sound and music playback
3. **Input** (`@l8b/input`) - Keyboard, mouse, touch, gamepad
4. **Assets** - Asset loading and management
5. **Storage** (`@l8b/io`) - Persistent data storage
6. **System** - System information and utilities
7. **Scene** (`@l8b/scene`) - Scene and routing management
8. **VM** (`@l8b/vm`) - LootiScript execution
9. **Stdlib** (`@l8b/stdlib`) - Standard library functions

All subsystems are exposed to LootiScript via global objects.

## Integration Example

```typescript
import { RuntimeOrchestrator } from '@l8b/runtime';

class GameEngine {
  private runtime: RuntimeOrchestrator;
  
  constructor(canvas: HTMLCanvasElement) {
    this.runtime = new RuntimeOrchestrator({
      canvas,
      listener: {
        codeStarted: () => this.onGameStart(),
        codePaused: () => this.onGamePause(),
        codeEnded: () => this.onGameEnd(),
        reportError: (error) => this.onError(error),
      },
    });
  }
  
  async loadGame(code: string) {
    await this.runtime.loadCode(code);
  }
  
  start() {
    this.runtime.start();
  }
  
  pause() {
    this.runtime.pause();
  }
  
  private onGameStart() {
    console.log('Game started');
  }
  
  private onGamePause() {
    console.log('Game paused');
  }
  
  private onGameEnd() {
    console.log('Game ended');
  }
  
  private onError(error: string) {
    console.error('Game error:', error);
  }
}

// Usage
const canvas = document.getElementById('game-canvas');
const engine = new GameEngine(canvas);

await engine.loadGame(gameCode);
engine.start();
```

## Package Structure

```
runtime/
├── src/
│   ├── core/
│   │   └── orchestrator.ts    # Main RuntimeOrchestrator
│   ├── assets/
│   │   └── loader.ts           # Asset loading
│   ├── input/
│   │   └── manager.ts          # Input management
│   ├── system/
│   │   └── api.ts              # System API
│   └── types/
│       └── index.ts            # TypeScript types
└── index.ts
```

## See Also

- **@l8b/vm** - LootiScript virtual machine
- **@l8b/screen** - Rendering system
- **@l8b/audio** - Audio system
- **@l8b/input** - Input system
- **@l8b/scene** - Scene management
- **@l8b/io** - Storage and IO
- **@l8b/stdlib** - Standard library
