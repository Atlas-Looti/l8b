# @l8b/input

Game input management system for keyboard, mouse, touch, and gamepad.

## Features

- **Keyboard Input**: Key press/release detection with directional keys
- **Mouse Input**: Position tracking, button states, and wheel events
- **Touch Input**: Multi-touch support with position tracking
- **Gamepad Input**: Full gamepad support with buttons, triggers, and analog sticks

## Installation

```bash
bun add @l8b/input
```

## Usage

### Basic Setup

```typescript
import { Input } from "@l8b/input";

const canvas = document.getElementById("game-canvas") as HTMLCanvasElement;
const input = new Input(canvas);

// Game loop
function update() {
  input.update();

  const keyboard = input.getKeyboard();
  const mouse = input.getMouse();
  const touch = input.getTouch();
  const gamepad = input.getGamepad();

  // Use input states...

  requestAnimationFrame(update);
}

update();
```

### Keyboard Input

```typescript
const keyboard = input.getKeyboard();

// Check if key is pressed
if (keyboard.KEY_W || keyboard.UP) {
  // Move up
}

// Check for key press (once)
if (keyboard.press.SPACE) {
  // Jump
}

// Check for key release
if (keyboard.release.ENTER) {
  // Action released
}

// Directional keys
if (keyboard.LEFT) {
  // Move left
}
```

### Mouse Input

```typescript
const mouse = input.getMouse();

// Mouse position (normalized to canvas)
console.log(mouse.x, mouse.y);

// Button states
if (mouse.left) {
  // Left button pressed
}

if (mouse.press) {
  // Any button just pressed
}

// Mouse wheel
if (mouse.wheel > 0) {
  // Scroll up
} else if (mouse.wheel < 0) {
  // Scroll down
}
```

### Touch Input

```typescript
const touch = input.getTouch();

// Check if touching
if (touch.touching) {
  console.log(touch.x, touch.y);
}

// Touch press/release
if (touch.press) {
  // Touch started
}

if (touch.release) {
  // Touch ended
}

// Multi-touch
for (const point of touch.touches) {
  console.log(point.id, point.x, point.y);
}
```

### Gamepad Input

```typescript
const gamepad = input.getGamepad();

// Check button states
if (gamepad.status.A) {
  // A button pressed
}

// Analog sticks
const leftStickAngle = gamepad.status.LEFT_STICK_ANGLE;
const leftStickAmount = gamepad.status.LEFT_STICK_AMOUNT;

// Triggers
const leftTrigger = gamepad.status.LT;
const rightTrigger = gamepad.status.RT;

// D-pad
if (gamepad.status.DPAD_UP) {
  // D-pad up pressed
}

// Per-gamepad access
if (gamepad.count > 0) {
  const pad1 = gamepad.status[0];
  if (pad1.A) {
    // Player 1 pressed A
  }
}
```

## API Reference

### Input Class

#### Constructor

```typescript
new Input(canvas?: HTMLCanvasElement)
```

#### Methods

- `update(): void` - Update all input states (call once per frame)
- `getKeyboard(): KeyboardState` - Get keyboard state
- `getMouse(): MouseState` - Get mouse state
- `getTouch(): TouchState` - Get touch state
- `getGamepad(): GamepadInput` - Get gamepad manager
- `setCanvas(canvas: HTMLCanvasElement): void` - Change target canvas

### KeyboardState

```typescript
interface KeyboardState {
  press: Record<string, number>; // Keys just pressed
  release: Record<string, number>; // Keys just released
  UP: number; // W or Arrow Up
  DOWN: number; // S or Arrow Down
  LEFT: number; // A or Arrow Left
  RIGHT: number; // D or Arrow Right
  [key: string]: number; // Any key state (1 = pressed, 0 = released)
}
```

### MouseState

```typescript
interface MouseState {
  x: number; // X position (normalized)
  y: number; // Y position (normalized)
  pressed: number; // Any button pressed
  left: number; // Left button
  middle: number; // Middle button
  right: number; // Right button
  press: number; // Just pressed
  release: number; // Just released
  wheel: number; // Wheel delta (-1, 0, 1)
}
```

### TouchState

```typescript
interface TouchState {
  touching: number; // Is touching
  x: number; // Primary touch X
  y: number; // Primary touch Y
  press: number; // Just started touching
  release: number; // Just stopped touching
  touches: TouchPoint[]; // All active touches
}

interface TouchPoint {
  x: number;
  y: number;
  id: number | string;
}
```

### GamepadInput

#### Properties

- `status: StateMap` - Current gamepad state (aggregated from all gamepads)
- `status[0-3]: StateMap` - Individual gamepad states
- `count: number` - Number of connected gamepads

#### Gamepad Buttons

- `A`, `B`, `X`, `Y` - Face buttons
- `LB`, `RB` - Shoulder buttons
- `LT`, `RT` - Triggers (0-1 analog)
- `DPAD_UP`, `DPAD_DOWN`, `DPAD_LEFT`, `DPAD_RIGHT` - D-pad
- `LS`, `RS` - Stick buttons
- `VIEW`, `MENU` - View/Menu buttons

#### Analog Sticks

- `LEFT_STICK_ANGLE`, `LEFT_STICK_AMOUNT` - Left stick
- `RIGHT_STICK_ANGLE`, `RIGHT_STICK_AMOUNT` - Right stick
- `LEFT_STICK_UP`, `LEFT_STICK_DOWN`, `LEFT_STICK_LEFT`, `LEFT_STICK_RIGHT` - Digital directions
- `RIGHT_STICK_UP`, `RIGHT_STICK_DOWN`, `RIGHT_STICK_LEFT`, `RIGHT_STICK_RIGHT` - Digital directions

## Key Codes

Keyboard keys are available in two formats:

1. **Physical key codes**: `KEY_W`, `KEY_A`, `ARROW_UP`, `SPACE`, etc.
2. **Character codes**: `W`, `A`, `ARROWUP`, ` `, etc.

Both formats work, use whichever is more convenient.

## License

MIT
