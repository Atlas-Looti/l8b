# Engine Package - AI Agent Guide

## Overview

Engine packages handle the runtime execution of LootiScript games:

- **runtime** - Runtime orchestrator and game loop
- **vm** - Virtual machine for bytecode execution
- **stdlib** - Standard library functions
- **io** - I/O operations and storage

## Runtime Orchestrator

### Architecture

The runtime orchestrator (`packages/enggine/runtime`) coordinates all engine subsystems:

```typescript
class RuntimeOrchestrator {
  // Core services
  private screen: Screen;
  private audio: Audio;
  private input: Input;
  private assets: Assets;
  private sceneManager: SceneManager;
  
  // VM
  private vm: L8BVM;
  
  // Game loop
  private gameLoop(timestamp: number): void {
    // 1. Update input
    this.input.update();
    
    // 2. Update scene or global update()
    if (this.sceneManager.hasActiveScene()) {
      this.sceneManager.update();
    } else {
      this.vm.callGlobal("update");
    }
    
    // 3. Draw scene or global draw()
    if (this.sceneManager.hasActiveScene()) {
      this.sceneManager.draw();
    } else {
      this.vm.callGlobal("draw");
    }
    
    requestAnimationFrame((t) => this.gameLoop(t));
  }
}
```

### Initialization Flow

```typescript
async initialize(): Promise<void> {
  // 1. Initialize core services
  this.screen = new Screen(canvas);
  this.audio = new Audio();
  this.input = new Input();
  this.assets = new Assets();
  this.sceneManager = new SceneManager();
  
  // 2. Initialize VM with global APIs
  this.initializeVM();
  
  // 3. Load compiled routines or sources
  await this.loadCode();
  
  // 4. Start game loop
  this.start();
}
```

### VM Initialization

```typescript
private initializeVM(): void {
  // Create meta functions (print, etc.)
  const meta = createMetaFunctions();
  
  // Create global API object
  const global: GlobalAPI = {
    screen: this.screen.getInterface(),
    audio: this.audio.getInterface(),
    Assets: this.assets.getInterface(),
    keyboard: this.input.getStates().keyboard,
    mouse: this.input.getStates().mouse,
    touch: this.input.getStates().touch,
    gamepad: this.input.getStates().gamepad,
    system: this.system.getAPI(),
    scene: (name, def) => this.sceneManager.registerScene(name, def),
    route: (path, sceneName) => this.sceneManager.registerRoute(path, sceneName),
    router: this.sceneManager.router.getInterface(),
    // ... constructors
    Image: Image,
    Sprite: Sprite,
    Map: Map,
    Palette: Palette,
  };
  
  // Create VM
  this.vm = new L8BVM(meta, global, namespace, preserveStorage);
}
```

## Virtual Machine

### Architecture

The VM (`packages/enggine/vm`) executes compiled LootiScript bytecode:

```typescript
class L8BVM {
  // Execute bytecode
  execute(routine: Routine): Value {
    // Bytecode execution
  }
  
  // Call global function
  callGlobal(name: string, ...args: Value[]): Value {
    // Find and call function
  }
  
  // Set global value
  setGlobal(name: string, value: Value): void {
    // Set global
  }
}
```

### Bytecode Execution

The VM:

1. Loads compiled routines
2. Executes bytecode instructions
3. Manages call stack
4. Handles errors

### Global API Binding

Global APIs are bound to VM globals:

```typescript
// APIs are accessible in LootiScript as:
screen.clear("#000")
audio.playSound("jump.wav")
Assets.loadImage("player.png")
```

## Standard Library

### Structure

Standard library (`packages/enggine/stdlib`) provides utility functions:

```typescript
// Math utilities
Math.distance(x1, y1, x2, y2)
Math.lerp(a, b, t)
Math.clamp(value, min, max)

// String utilities
String.split(str, separator)
String.join(arr, separator)

// List utilities
List.map(arr, fn)
List.filter(arr, fn)

// JSON utilities
JSON.encode(value)
JSON.decode(json)
```

### Registration

Stdlib functions are registered in VM:

```typescript
// In VM initialization
vm.setGlobal("Math", MathAPI);
vm.setGlobal("String", StringAPI);
vm.setGlobal("List", ListAPI);
vm.setGlobal("JSON", JSONAPI);
```

## I/O Operations

### Storage

Storage (`packages/enggine/io`) provides persistent storage:

```typescript
// Exposed to LootiScript as:
storage.set("key", value)
storage.get("key")
```

Uses localStorage with:

- Batched writes for performance
- Caching for reads
- Error handling

## Code Loading

### Development Mode

In development, sources are loaded directly:

```typescript
// Load sources from dev server
const sources = {
  "main": "/src/main.loot",
  "scenes/intro": "/src/scenes/intro.loot",
};

// Compile on-the-fly
for (const [name, path] of Object.entries(sources)) {
  const source = await fetch(path + "?raw").then(r => r.text());
  const result = compileSource(source);
  vm.loadRoutine(name, result.routine);
}
```

### Production Mode

In production, compiled bytecode is loaded:

```typescript
// Load compiled routines
const routines = await loadCompiledRoutines();
for (const routine of routines) {
  vm.loadRoutine(routine.name, routine.routine);
}
```

## Scene Management

### Scene Lifecycle

Scenes are managed by SceneManager:

```typescript
class SceneManager {
  registerScene(name: string, definition: SceneDefinition): void {
    // Register scene
  }
  
  registerRoute(path: string, sceneName: string): void {
    // Register route
  }
  
  update(): void {
    // Call active scene's update()
  }
  
  draw(): void {
    // Call active scene's draw()
  }
}
```

### Router Integration

Router handles URL-based navigation:

```typescript
// In LootiScript:
route("/", "home")
route("/game", "game")
router.push("/game")
```

## Error Handling

### VM Errors

VM errors are caught and formatted:

```typescript
try {
  vm.callGlobal("update");
} catch (error) {
  // Format error with stack trace
  const formatted = formatVMError(error);
  console.error(formatted);
  // Report to listener
  this.listener.reportError?.(formatted);
}
```

### Error Formatting

Errors include:

- Error code
- File location
- Stack trace
- Suggestions

## Performance

### Game Loop Optimization

- Update runs at fixed 60 FPS
- Draw runs at display refresh rate
- Use requestAnimationFrame for rendering
- Minimize allocations in hot paths

### Object Pooling

Runtime uses object pooling for:

- Arrays
- Objects
- Temporary values

## Integration with Framework

The runtime:

- **Receives** compiled bytecode from framework build
- **Bundles** with framework CLI for production
- **Loads** sources directly in development
- **Exposes** APIs to LootiScript code

Framework handles:

- Compiling LootiScript to bytecode
- Bundling runtime for browser
- Generating HTML with runtime
- Hot module replacement in dev

## Key Files

- `packages/enggine/runtime/src/core/orchestrator.ts` - Main orchestrator
- `packages/enggine/vm/src/` - VM implementation
- `packages/enggine/stdlib/src/` - Standard library
- `packages/enggine/io/src/` - I/O operations
