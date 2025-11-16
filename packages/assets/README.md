# @l8b/assets

Asset management system for loading and managing game resources.

## Features

- **Image Loading**: Load images and convert to `Image` instances from `@l8b/sprites`
- **JSON Loading**: Load and parse JSON data files
- **Text Loading**: Load text files (TXT, CSV, Markdown)
- **Font Loading**: Load and register custom fonts
- **Async Loading**: All loaders return result objects with `ready` status
- **Path Normalization**: Automatic path conversion (slashes to dashes)

## Installation

```bash
bun add @l8b/assets
```

## Usage

### Basic Setup

```typescript
import { AssetManager } from "@l8b/assets";

// Create runtime context
const runtime = {
  assets: {
    // Optional: Map logical paths to actual files
    "player-sprite": { file: "player-character.png" },
    "level-data": { file: "level1.json" },
  },
};

const assetManager = new AssetManager(runtime);

// Get interface for game code
const assets = assetManager.getInterface();
```

### Loading Images

```typescript
// Load image with callback
const loader = assets.loadImage("player/sprite", (image) => {
  console.log("Image loaded!", image);
  // image is an Image instance from @l8b/sprites
  image.draw(screen, 0, 0, 64, 64);
});

// Check loading status
if (loader.ready) {
  console.log("Image is ready:", loader.image);
}

// Without callback (poll for ready)
const bgLoader = assets.loadImage("backgrounds/sky");
// Later in game loop:
if (bgLoader.ready && bgLoader.image) {
  bgLoader.image.draw(screen, 0, 0, 800, 600);
}
```

### Loading JSON

```typescript
// Load JSON data
const configLoader = assets.loadJSON("config/settings", (data) => {
  console.log("Settings loaded:", data);
  applySettings(data);
});

// Load level data
const levelLoader = assets.loadJSON("levels/level1", (data) => {
  console.log("Level data:", data);
  initLevel(data);
});
```

### Loading Text Files

```typescript
// Load plain text
const textLoader = assets.loadText("story/intro", (text) => {
  console.log("Story text:", text);
  displayText(text);
});

// Load CSV
const csvLoader = assets.loadCSV("data/highscores", (csv) => {
  console.log("CSV data:", csv);
  parseHighScores(csv);
});

// Load Markdown
const mdLoader = assets.loadMarkdown("docs/help", (markdown) => {
  console.log("Help text:", markdown);
  renderMarkdown(markdown);
});
```

### Loading Fonts

```typescript
// Load custom font
assets.loadFont("fonts/pixel-font");

// Font will be available as "pixel-font" in CSS
// Use it in your Image text rendering:
image.setFont("pixel-font");
image.drawText("Hello World", 0, 0, 16, "white");
```

### Path Mapping

```typescript
// Setup asset mapping
const runtime = {
  assets: {
    // Map short names to actual files
    player: { file: "characters/player-sprite.png" },
    enemy1: { file: "enemies/goblin.png" },
    config: { file: "game-config.json" },
  },
};

const assetManager = new AssetManager(runtime);
const assets = assetManager.getInterface();

// Load using short names
assets.loadImage("player", (img) => {
  // Loads from: assets/characters/player-sprite.png
});

assets.loadJSON("config", (data) => {
  // Loads from: assets/game-config.json
});
```

## API Reference

### AssetManager

#### Constructor

```typescript
new AssetManager(runtime: Runtime)
```

**Runtime Interface:**

```typescript
interface Runtime {
  assets: Record<string, { file: string }>;
}
```

#### Methods

##### getInterface()

Returns the asset loading interface for game code.

```typescript
getInterface(): {
  loadFont: (font: string) => void;
  loadImage: (path: string, callback?: (image: Image) => void) => ImageLoaderResult;
  loadJSON: (path: string, callback?: (data: any) => void) => JSONLoaderResult;
  loadText: (path: string, callback?: (text: string) => void, ext?: string) => TextLoaderResult;
  loadCSV: (path: string, callback?: (text: string) => void) => TextLoaderResult;
  loadMarkdown: (path: string, callback?: (text: string) => void) => TextLoaderResult;
}
```

### Loader Methods

#### loadImage(path, callback?)

Load an image file and convert to `Image` instance.

**Parameters:**

- `path: string` - Image path (without extension)
- `callback?: (image: Image) => void` - Optional callback when loaded

**Returns:** `ImageLoaderResult`

```typescript
interface ImageLoaderResult {
  ready: number; // 0 = loading, 1 = ready
  image?: Image; // Image instance when ready
}
```

**File Resolution:**

- Path: `"player/sprite"` → `assets/player-sprite.png`
- With mapping: Uses `runtime.assets[path].file`

#### loadJSON(path, callback?)

Load and parse a JSON file.

**Parameters:**

- `path: string` - JSON file path (without .json extension)
- `callback?: (data: any) => void` - Optional callback when loaded

**Returns:** `JSONLoaderResult`

```typescript
interface JSONLoaderResult {
  ready: number; // 0 = loading, 1 = ready
  data?: any; // Parsed JSON data when ready
}
```

**File Resolution:**

- Path: `"config/settings"` → `assets/config-settings.json`

#### loadText(path, callback?, ext?)

Load a text file.

**Parameters:**

- `path: string` - Text file path (without extension)
- `callback?: (text: string) => void` - Optional callback when loaded
- `ext?: string` - File extension (default: "txt")

**Returns:** `TextLoaderResult`

```typescript
interface TextLoaderResult {
  ready: number; // 0 = loading, 1 = ready
  text?: string; // Text content when ready
}
```

**File Resolution:**

- Path: `"story/intro"` → `assets/story-intro.txt`
- Path: `"data/scores"`, ext: `"csv"` → `assets/data-scores.csv`

#### loadCSV(path, callback?)

Load a CSV file (convenience method for `loadText` with `ext="csv"`).

**Parameters:**

- `path: string` - CSV file path (without .csv extension)
- `callback?: (text: string) => void` - Optional callback when loaded

**Returns:** `TextLoaderResult`

#### loadMarkdown(path, callback?)

Load a Markdown file (convenience method for `loadText` with `ext="md"`).

**Parameters:**

- `path: string` - Markdown file path (without .md extension)
- `callback?: (text: string) => void` - Optional callback when loaded

**Returns:** `TextLoaderResult`

#### loadFont(font)

Load and register a custom font.

**Parameters:**

- `font: string` - Font path (without .ttf extension)

**File Resolution:**

- Path: `"fonts/pixel-font"` → `assets/fonts-pixel-font.ttf`
- Font name: Last segment of path (e.g., "pixel-font")

**Usage:**

```typescript
assets.loadFont("fonts/custom");
// Later:
image.setFont("custom");
```

## Path Conventions

### Path to File Conversion

Paths are automatically converted:

1. Slashes (`/`) → Dashes (`-`)
2. Extension added based on loader type

**Examples:**

```typescript
"player/sprite"      → "assets/player-sprite.png"
"config/game"        → "assets/config-game.json"
"data/levels"        → "assets/data-levels.txt"
"fonts/custom-font"  → "assets/fonts-custom-font.ttf"
```

### Asset Directory Structure

```
assets/
├── player-sprite.png
├── enemy-goblin.png
├── config-game.json
├── levels-level1.json
├── story-intro.txt
├── data-highscores.csv
├── docs-help.md
└── fonts-pixel-font.ttf
```

## Loading Patterns

### Preload Assets

```typescript
const assets = assetManager.getInterface();
const loaders = [];

// Queue all assets
loaders.push(assets.loadImage("player/sprite"));
loaders.push(assets.loadImage("enemy/goblin"));
loaders.push(assets.loadJSON("config/game"));

// Check if all loaded
function allAssetsReady() {
  return loaders.every((loader) => loader.ready === 1);
}

// Wait for all
function waitForAssets(callback) {
  const check = setInterval(() => {
    if (allAssetsReady()) {
      clearInterval(check);
      callback();
    }
  }, 100);
}

waitForAssets(() => {
  console.log("All assets loaded!");
  startGame();
});
```

### Lazy Loading

```typescript
// Load on demand
function loadLevel(levelNum) {
  const loader = assets.loadJSON(`levels/level${levelNum}`, (data) => {
    initLevel(data);
  });

  // Show loading screen until ready
  showLoadingScreen();
  const check = setInterval(() => {
    if (loader.ready) {
      clearInterval(check);
      hideLoadingScreen();
    }
  }, 100);
}
```

### Error Handling

```typescript
// Loaders mark ready=1 even on error
const loader = assets.loadImage("nonexistent/image");

// Check console for error messages
// Loader will have ready=1 but no image property
setTimeout(() => {
  if (loader.ready && !loader.image) {
    console.error("Failed to load image");
    useFallbackImage();
  }
}, 5000);
```

## Integration with Other Packages

### With @l8b/sprites

```typescript
import { AssetManager } from "@l8b/assets";
import { Image } from "@l8b/sprites";

const assets = assetManager.getInterface();

// Load image
const loader = assets.loadImage("player/sprite", (image) => {
  // image is already an Image instance
  image.draw(screen, 0, 0, 64, 64);

  // Use Image methods
  image.setAlpha(0.5);
  image.setRotation(45);
});
```

### With Game Loop

```typescript
class Game {
  constructor() {
    this.assets = new AssetManager({ assets: {} }).getInterface();
    this.loaders = [];
    this.assetsReady = false;
  }

  preload() {
    this.loaders.push(this.assets.loadImage("player"));
    this.loaders.push(this.assets.loadImage("enemy"));
    this.loaders.push(this.assets.loadJSON("config"));
  }

  update() {
    if (!this.assetsReady) {
      this.assetsReady = this.loaders.every((l) => l.ready === 1);
      if (this.assetsReady) {
        this.init();
      }
    } else {
      // Game logic
    }
  }
}
```

## Browser Compatibility

- **Fetch API**: Required for loading JSON/text files
- **FontFace API**: Required for font loading
- **CORS**: Images loaded with `crossOrigin="Anonymous"` for cross-origin support

## License

MIT
