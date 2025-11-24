# @l8b/scene

> Scene management system for organizing game logic into discrete scenes

## Installation

```bash
bun add @l8b/scene
```

## Usage

### Basic Scene

```typescript
import { Scene } from "@l8b/scene";

class MenuScene extends Scene {
  init() {
    // Initialize menu resources
    console.log("Menu initialized");
  }

  update() {
    // Update menu logic
  }

  draw() {
    // Draw menu
  }

  destroy() {
    // Cleanup resources
    console.log("Menu destroyed");
  }
}
```

### Scene Manager

```typescript
import { Scene, SceneManager } from "@l8b/scene";

// Create scenes
const menuScene = new MenuScene("menu");
const gameScene = new GameScene("game");

// Create manager
const manager = new SceneManager({
  autoUpdate: true,
  autoDraw: true,
  defaultTransitionDuration: 500,
});

// Add scenes
manager.addScene(menuScene);
manager.addScene(gameScene);

// Set active scene
manager.setActiveScene("menu");

// In game loop
function gameLoop() {
  manager.update();
  manager.draw();
  requestAnimationFrame(gameLoop);
}
```

### Scene Transitions

```typescript
// Transition with default duration
manager.transitionTo("game", {
  duration: 1000,
  destroyPrevious: false,
  pausePrevious: true,
});

// Custom transition function (ease-in-out)
manager.transitionTo("game", {
  duration: 500,
  transition: (progress) => {
    return progress < 0.5
      ? 2 * progress * progress
      : 1 - Math.pow(-2 * progress + 2, 2) / 2;
  },
});
```

### Scene Stacking (Overlays)

```typescript
// Push a scene on top (e.g., pause menu)
manager.pushScene("pause");

// Pop the top scene
manager.popScene();

// Pop and destroy
manager.popScene(true);
```

### Manual Control

```typescript
// Disable auto-update/draw for manual control
const manager = new SceneManager({
  autoUpdate: false,
  autoDraw: false,
});

// Manual update/draw
const activeScene = manager.getActiveScene();
if (activeScene) {
  activeScene.update?.();
  activeScene.draw?.();
}
```

## API

### Scene

Base class for all scenes.

#### Methods

- `init()`: Called once when scene is created
- `update()`: Called every frame
- `draw()`: Called every frame
- `onPause()`: Called when scene is paused
- `onResume()`: Called when scene is resumed
- `destroy()`: Called when scene is destroyed

#### Properties

- `id`: Unique identifier
- `status`: Current status (`idle`, `initializing`, `active`, `paused`, `destroyed`)

### SceneManager

Manages multiple scenes and their lifecycle.

#### Methods

- `addScene(scene)`: Add a scene to the manager
- `removeScene(sceneId)`: Remove a scene
- `getScene(sceneId)`: Get a scene by ID
- `setActiveScene(sceneId)`: Set active scene (immediate)
- `transitionTo(sceneId, options)`: Transition to a scene
- `pushScene(sceneId)`: Push scene onto stack
- `popScene(destroy?)`: Pop scene from stack
- `update()`: Update active scenes
- `draw()`: Draw active scenes
- `clear()`: Clear all scenes
- `getActiveScene()`: Get currently active scene
- `getSceneStack()`: Get scene stack

## Development

```bash
# Build
bun run build

# Test
bun run test

# Clean
bun run clean
```

