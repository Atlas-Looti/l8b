# @l8b/runtime

Game runtime orchestrator that combines all l8b packages into a complete game engine.

## Features

- **Complete Game Loop**: Automatic update/draw cycle with frame rate management
- **Asset Management**: Load and manage sprites, maps, sounds, and music
- **Hot Reload**: Update code and assets without restarting
- **VM Integration**: Execute game scripts with lootiscript
- **Persistent Storage**: localStorage wrapper with automatic serialization
- **System API**: Access to system information and controls
- **Input Handling**: Integrated keyboard, mouse, touch, and gamepad support
- **Error Handling**: Comprehensive error reporting and debugging

## Installation

```bash
bun add @l8b/runtime
```

## Usage

### Basic Setup

```typescript
import { Runtime } from "@l8b/runtime";

// Create runtime
const runtime = new Runtime({
  sources: {
    main: `
      init = function()
        print("Game started!")
      end
      
      update = function()
        // Game logic here
      end
      
      draw = function()
        screen.clear("#000")
        screen.fillRect(0, 0, 50, 50, "#0f0")
      end
    `,
  },
  width: 400,
  height: 400,
});

// Add canvas to DOM
document.body.appendChild(runtime.getCanvas());

// Start the game
runtime.start();
```

### With Assets

```typescript
import { Runtime } from "@l8b/runtime";

const runtime = new Runtime({
  url: "/assets/",
  sources: {
    main: gameCode,
  },
  resources: {
    images: [
      { file: "player.png", version: 1 },
      { file: "enemy.png", version: 1 },
    ],
    sounds: [{ file: "jump.wav", version: 1 }],
    music: [{ file: "theme.mp3", version: 1 }],
  },
  width: 400,
  height: 400,
});

runtime.start();
```

### Game Script Example

```javascript
// Game variables
player = object
  x = 0
  y = 0
  speed = 2
end

score = 0

// Initialize game
init = function()
  print("Game initialized!")
  player.x = 0
  player.y = 0
  score = 0
end

// Update game logic (60 times per second)
update = function()
  // Move player with keyboard
  if keyboard.LEFT then
    player.x -= player.speed
  end
  if keyboard.RIGHT then
    player.x += player.speed
  end
  if keyboard.UP then
    player.y += player.speed
  end
  if keyboard.DOWN then
    player.y -= player.speed
  end
  
  // Keep player in bounds
  if player.x < -screen.width/2 then
    player.x = -screen.width/2
  end
  if player.x > screen.width/2 then
    player.x = screen.width/2
  end
end

// Draw graphics (60 times per second)
draw = function()
  // Clear screen
  screen.clear("#000")
  
  // Draw player
  screen.fillRect(player.x, player.y, 32, 32, "#0f0")
  
  // Draw score
  screen.setDrawAnchor(-1, 1)
  screen.drawText("Score: " + score, -screen.width/2 + 10, screen.height/2 - 10, 16, "#fff")
  screen.setDrawAnchor(0, 0)
end
```

### Hot Reload

```typescript
// Update source code without restarting
runtime.updateSource("main", newGameCode, true);

// The game will:
// 1. Compile the new code
// 2. Re-run init() if it changed
// 3. Continue running with new code
```

### Event Listener

```typescript
const runtime = new Runtime({
  sources: { main: gameCode },
  listener: {
    log: (message) => {
      console.log("[Game]", message);
    },
    reportError: (error) => {
      console.error("[Game Error]", error);
    },
    codePaused: () => {
      console.log("Game paused by code");
    },
    postMessage: (msg) => {
      // For iframe communication
      window.parent.postMessage(msg, "*");
    },
  },
});
```

### Lifecycle Logging

Enable verbose console output for each startup step:

```typescript
const runtime = new Runtime({
  sources: { main: gameCode },
  debug: {
    lifecycle: true,
  },
});
```

With `lifecycle` enabled, the runtime prints messages such as:

- `startup: loading assets`
- `startup: initializing VM`
- `vm: init() executed`
- `loop: started`

This helps trace the exact point where initialization succeeds or fails.

### Storage API

Game code can use persistent storage:

```javascript
// Save data
storage.set("highscore", 1000);
storage.set("player_name", "Hero");

// Load data
highscore = storage.get("highscore");
name = storage.get("player_name");

// Data is automatically saved to localStorage
// and persists between sessions
```

### System API

Game code has access to system information:

```javascript
// Get system info
print("FPS: " + system.fps);
print("Language: " + system.language);
print("Time: " + system.time);

// Control game
system.pause(); // Pause execution
system.exit(); // Exit game

// Show dialogs
system.say("Hello World!"); // Alert
system.prompt("Enter name:", function(name)
  print("Hello " + name)
end);

// Change update rate
system.update_rate = 30; // 30 updates per second
// draw() still runs at 60fps
```

### Available Global APIs

Game scripts have access to:

```javascript
// Graphics
screen.clear("#000");
screen.fillRect(x, y, w, h, color);
screen.drawSprite("player", x, y, w, h);
// ... and many more

// Audio
audio.beep("C4 E4 G4");
sounds.jump.play();
music.theme.play();

// Input
keyboard.LEFT; // Is left arrow pressed?
keyboard.press.SPACE; // Was space just pressed?
mouse.x; // Mouse X position
mouse.y; // Mouse Y position
touch.touching; // Is screen being touched?
gamepad[0].A; // Is gamepad A button pressed?

// Assets
sprites.player; // Access sprite
maps.level1; // Access map
sounds.jump; // Access sound
music.theme; // Access music

// Storage
storage.set(key, value);
storage.get(key);

// System
system.time; // Current time
system.fps; // Current FPS
system.language; // Browser language

// Classes
random = new Random();
img = new Image(width, height);
```

## API Reference

### Runtime

Main runtime class that orchestrates the game engine.

#### Constructor

```typescript
new Runtime(options?: RuntimeOptions)
```

**RuntimeOptions:**

```typescript
interface RuntimeOptions {
  url?: string; // Base URL for assets
  sources?: Record<string, string>; // Source code files
  resources?: Resources; // Asset metadata
  listener?: RuntimeListener; // Event listener
  canvas?: HTMLCanvasElement; // Canvas element
  width?: number; // Screen width (default: 400)
  height?: number; // Screen height (default: 400)
  namespace?: string; // localStorage namespace
  preserveStorage?: boolean; // Keep storage on reset
  debug?: {
    input?: InputDebugSetting; // Log input snapshots
    screen?: boolean; // Log screen/canvas changes
    lifecycle?: boolean; // Step-by-step runtime logs
  };
}
```

#### Methods

- `start(): Promise<void>` - Start the runtime (loads assets and begins game loop)
- `stop(): void` - Stop the game loop
- `resume(): void` - Resume the game loop
- `getCanvas(): HTMLCanvasElement` - Get the canvas element
- `updateSource(file: string, code: string, reinit?: boolean): boolean` - Update source code (hot reload)
- `runCommand(command: string, callback?: Function): void` - Run command in console

#### Properties

- `screen: Screen` - Screen system
- `audio: AudioCore` - Audio system
- `keyboard: Keyboard` - Keyboard input
- `mouse: Mouse` - Mouse input
- `touch: Touch` - Touch input
- `gamepad: Gamepad` - Gamepad input
- `sprites: Record<string, any>` - Loaded sprites
- `maps: Record<string, any>` - Loaded maps
- `sounds: Record<string, any>` - Loaded sounds
- `music: Record<string, any>` - Loaded music
- `vm: L8BVM | null` - Virtual machine instance

### L8BVM

Virtual machine wrapper for lootiscript execution.

#### Constructor

```typescript
new L8BVM(meta?: MetaFunctions, global?: GlobalAPI, namespace?: string, preserve_ls?: boolean)
```

#### Methods

- `run(source: string, timeout?: number, filename?: string, callback?: Function): any` - Run source code
- `call(name: string, args?: any[], timeout?: number): any` - Call a function
- `clearWarnings(): void` - Clear accumulated warnings
- `getWarnings(): Record<string, any>` - Get warnings

#### Properties

- `context: VMContext` - Execution context
- `runner: Runner` - Lootiscript runner
- `storage_service: StorageService` - Storage service
- `error_info: ErrorInfo | null` - Last error

### StorageService

Persistent storage with localStorage backend.

#### Constructor

```typescript
new StorageService(namespace?: string, preserve?: boolean)
```

#### Methods

- `get(name: string): any` - Get value from storage
- `set(name: string, value: any): void` - Set value (batched write)
- `flush(): void` - Flush pending writes immediately
- `check(): void` - Check and flush if needed
- `clear(): void` - Clear all storage for namespace
- `getInterface(): { get, set }` - Get interface for game code

### System

System API for game information and control.

#### Constructor

```typescript
new System(listener?: RuntimeListener)
```

#### Methods

- `getAPI(): SystemAPI` - Get system API for game code
- `setFPS(fps: number): void` - Update FPS counter
- `setCPULoad(load: number): void` - Update CPU load
- `setLoading(progress: number): void` - Update loading progress

## Game Loop

The runtime uses a sophisticated game loop:

1. **Variable Frame Rate**: Adapts to browser frame rate
2. **Fixed Update Rate**: Game logic runs at consistent rate (default 60 updates/sec)
3. **Frame Skipping**: Catches up if updates fall behind
4. **Delta Time Smoothing**: Reduces jitter

```
requestAnimationFrame
  ↓
Calculate delta time
  ↓
Determine update steps needed
  ↓
Call update() N times ← Game logic
  ↓
Call draw() once ← Rendering
  ↓
Schedule next frame
```

### Update Rate Control

```javascript
// Run game logic at 30 updates per second
system.update_rate = 30;

// draw() still runs at 60fps for smooth rendering
// update() runs at 30fps for game logic
```

## Error Handling

The runtime provides comprehensive error handling:

```typescript
const runtime = new Runtime({
  sources: { main: gameCode },
  listener: {
    reportError: (error) => {
      console.error("Error:", error.error);
      console.error("Type:", error.type); // "init", "update", "draw"
      console.error("File:", error.file);
      console.error("Line:", error.line);
      console.error("Stack:", error.stack);
    },
  },
});
```

Error types:

- `compile` - Syntax error during compilation
- `init` - Error in init() function
- `update` - Error in update() function
- `draw` - Error in draw() function
- `runtime` - General runtime error

## Integration with Other Packages

The runtime automatically integrates:

- **@l8b/lootiscript** - Scripting language and VM
- **@l8b/screen** - Canvas rendering
- **@l8b/audio** - Sound and music
- **@l8b/input** - Keyboard, mouse, touch, gamepad

All APIs are exposed to game scripts automatically.

## Performance

The runtime is optimized for performance:

- **Batched Storage Writes**: localStorage writes are batched
- **Delta Time Smoothing**: Reduces frame time jitter
- **Frame Skipping**: Maintains consistent game speed
- **Asset Caching**: Assets are loaded once and reused
- **Hot Reload**: Update code without full restart

## Browser Compatibility

- **Canvas 2D API**: Required (all modern browsers)
- **Web Audio API**: Required for audio
- **localStorage**: Required for storage
- **requestAnimationFrame**: Required for game loop
- **Gamepad API**: Optional (graceful degradation)

## License

MIT
