# @l8b/palette

Color palette management system for games.

## Features

- **Palette Management**: Define and manage color palettes by index
- **Color Utilities**: Convert between hex and RGB, find closest colors
- **Palette Effects**: Lighten, darken, mix, and create gradients
- **Palette Swapping**: Easy runtime palette changes for effects
- **No Limits**: Unlike retro consoles, use as many colors as you want

## Installation

```bash
bun add @l8b/palette
```

## Usage

### Basic Palette

```typescript
import { Palette } from "@l8b/palette";

// Create empty palette
const palette = new Palette();

// Add colors
palette.set(0, "#000000"); // Black
palette.set(1, "#FFFFFF"); // White
palette.set(2, "#FF0000"); // Red
palette.set(3, "#00FF00"); // Green
palette.set(4, "#0000FF"); // Blue

// Get colors by index
const black = palette.get(0); // "#000000"
const white = palette.get(1); // "#FFFFFF"

// Use with screen
scr.fillRect(0, 0, 50, 50, palette.get(2)); // Red rectangle
```

### Create Palette from Array

```typescript
const palette = new Palette({
  name: "My Game Palette",
  colors: [
    "#000000", // 0: Black
    "#1D2B53", // 1: Dark blue
    "#7E2553", // 2: Dark purple
    "#008751", // 3: Dark green
    "#AB5236", // 4: Brown
    "#5F574F", // 5: Dark gray
    "#C2C3C7", // 6: Light gray
    "#FFF1E8", // 7: White
    "#FF004D", // 8: Red
    "#FFA300", // 9: Orange
    "#FFEC27", // 10: Yellow
    "#00E436", // 11: Green
    "#29ADFF", // 12: Blue
    "#83769C", // 13: Indigo
    "#FF77A8", // 14: Pink
    "#FFCCAA", // 15: Peach
  ],
});

// Now use by index
scr.setColor(palette.get(8)); // Red
scr.fillRect(0, 0, 100, 100);
```

### Dynamic Palette

```typescript
const palette = new Palette();

// Add colors dynamically
const blackIndex = palette.add("#000000");
const whiteIndex = palette.add("#FFFFFF");
const redIndex = palette.add("#FF0000");

console.log(palette.size); // 3

// Remove a color
palette.remove(1); // Remove white

// Get all colors
const allColors = palette.getAll();
```

### RGB Conversion

```typescript
const palette = new Palette({
  colors: ["#FF0000", "#00FF00", "#0000FF"],
});

// Get as RGB object
const red = palette.getRGB(0);
console.log(red); // { r: 255, g: 0, b: 0 }

// Convert RGB to hex
const hex = Palette.rgbToHex(255, 128, 0);
console.log(hex); // "#FF8000"
```

### Color Utilities

```typescript
const palette = new Palette({
  colors: [
    "#000000", // Black
    "#FF0000", // Red
    "#00FF00", // Green
  ],
});

// Lighten a color
const lightRed = palette.lighten(1, 0.3); // "#FF4D4D"

// Darken a color
const darkGreen = palette.darken(2, 0.5); // "#008000"

// Mix two colors
const yellow = palette.mix(1, 2); // Mix red and green

// Find closest color in palette
const closestIndex = palette.findClosest("#FF1111"); // Returns 1 (red)
```

### Gradients

```typescript
const palette = new Palette({
  colors: [
    "#000000", // Black
    "#FFFFFF", // White
    "#FF0000", // Red
    "#0000FF", // Blue
  ],
});

// Create gradient from black to white
const gradient = palette.gradient(0, 1, 5);
// ["#000000", "#404040", "#808080", "#BFBFBF", "#FFFFFF"]

// Create gradient from red to blue
const colorGradient = palette.gradient(2, 3, 8);
// Use for smooth color transitions
```

### Palette Swapping

```typescript
// Day palette
const dayPalette = new Palette({
  name: "Day",
  colors: [
    "#87CEEB", // Sky blue
    "#FFFF00", // Yellow sun
    "#00FF00", // Green grass
  ],
});

// Night palette
const nightPalette = new Palette({
  name: "Night",
  colors: [
    "#191970", // Midnight blue
    "#F0E68C", // Pale moon
    "#006400", // Dark green
  ],
});

let currentPalette = dayPalette;

function draw() {
  scr.clear(currentPalette.get(0)); // Sky color
  scr.fillRound(0, 50, 20, 20, currentPalette.get(1)); // Sun/Moon
  scr.fillRect(-100, -50, 200, 10, currentPalette.get(2)); // Grass
}

// Switch to night
currentPalette = nightPalette;
```

### Save/Load Palette

```typescript
const palette = new Palette({
  name: "Game Colors",
  colors: ["#000000", "#FF0000", "#00FF00", "#0000FF"],
});

// Export palette data (for saving)
const data = palette.toData();
// { name: "Game Colors", colors: [...] }

// Save to localStorage
localStorage.setItem("myPalette", JSON.stringify(data));

// Load from localStorage
const saved = JSON.parse(localStorage.getItem("myPalette"));
const loadedPalette = new Palette(saved);
```

### Integration with Screen

```typescript
import { Screen } from "@l8b/screen";
import { Palette } from "@l8b/palette";

const screen = new Screen({ width: 400, height: 400 });
const scr = screen.getInterface();

const palette = new Palette({
  colors: [
    "#000000", // 0: Background
    "#FFFFFF", // 1: Foreground
    "#FF0000", // 2: Player
    "#00FF00", // 3: Enemy
    "#0000FF", // 4: Item
  ],
});

function draw() {
  scr.clear(palette.get(0)); // Black background
  
  // Draw player
  scr.fillRect(playerX, playerY, 16, 16, palette.get(2));
  
  // Draw enemies
  for (const enemy of enemies) {
    scr.fillRect(enemy.x, enemy.y, 16, 16, palette.get(3));
  }
  
  // Draw items
  for (const item of items) {
    scr.fillRound(item.x, item.y, 8, 8, palette.get(4));
  }
}
```

### Color Cycling Animation

```typescript
const palette = new Palette({
  colors: [
    "#FF0000",
    "#FF7F00",
    "#FFFF00",
    "#00FF00",
    "#0000FF",
    "#4B0082",
    "#9400D3",
  ],
});

let colorIndex = 0;

function animate() {
  scr.clear("#000");
  scr.fillRound(0, 0, 50, 50, palette.get(colorIndex));
  
  colorIndex = (colorIndex + 1) % palette.size;
  
  requestAnimationFrame(animate);
}

animate();
```

### Retro Console Style

```typescript
// PICO-8 style (16 colors)
const pico8 = new Palette({
  name: "PICO-8",
  colors: [
    "#000000", "#1D2B53", "#7E2553", "#008751",
    "#AB5236", "#5F574F", "#C2C3C7", "#FFF1E8",
    "#FF004D", "#FFA300", "#FFEC27", "#00E436",
    "#29ADFF", "#83769C", "#FF77A8", "#FFCCAA",
  ],
});

// TIC-80 style (16 colors)
const tic80 = new Palette({
  name: "TIC-80",
  colors: [
    "#1a1c2c", "#5d275d", "#b13e53", "#ef7d57",
    "#ffcd75", "#a7f070", "#38b764", "#257179",
    "#29366f", "#3b5dc9", "#41a6f6", "#73eff7",
    "#f4f4f4", "#94b0c2", "#566c86", "#333c57",
  ],
});

// Use them
scr.fillRect(0, 0, 50, 50, pico8.get(8)); // PICO-8 red
scr.fillRect(60, 0, 50, 50, tic80.get(2)); // TIC-80 red
```

## API Reference

### Palette Class

#### Constructor

```typescript
new Palette(options?: PaletteOptions | PaletteData)
```

**Options:**
```typescript
interface PaletteOptions {
  colors?: string[];  // Array of hex colors
  name?: string;      // Palette name
}
```

#### Properties

- `size: number` - Number of colors in palette
- `paletteName: string` - Palette name

#### Methods

##### Color Access
- `get(index: number): string` - Get color by index
- `getRGB(index: number): ColorRGB` - Get color as RGB object
- `getAll(): string[]` - Get all colors

##### Palette Modification
- `set(index: number, color: string): void` - Set color at index
- `add(color: string): number` - Add color, returns index
- `remove(index: number): void` - Remove color at index
- `setPalette(colors: string[]): void` - Replace entire palette
- `reset(paletteData?: PaletteData): void` - Reset palette

##### Color Utilities
- `findClosest(targetHex: string): number` - Find closest color index
- `lighten(index: number, amount?: number): string` - Lighten color
- `darken(index: number, amount?: number): string` - Darken color
- `mix(index1: number, index2: number, ratio?: number): string` - Mix two colors
- `gradient(startIndex: number, endIndex: number, steps: number): string[]` - Create gradient

##### Export
- `getAll(): string[]` - Get all colors as array
- `toData(): PaletteData` - Export palette data (for saving)

##### Static Methods
- `Palette.rgbToHex(r: number, g: number, b: number): string` - Convert RGB to hex

## Use Cases

- **Retro Games**: Limit colors for authentic retro feel
- **Consistent Theming**: Ensure all game elements use same color scheme
- **Palette Swapping**: Day/night cycles, different game modes
- **Color Cycling**: Animated water, fire, etc.
- **Accessibility**: Easy to adjust colors for colorblind modes
- **Art Direction**: Lock colors during development for consistency

## License

MIT
