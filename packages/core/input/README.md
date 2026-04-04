# @al8b/input

**LootiScript API Binding** - Input handling for keyboard, mouse, touch, and gamepad.

> **Note**: This package is used as an API binding for LootiScript in the l8b engine.

## API Reference

### keyboard

Global object for keyboard input state.

```lua
// Check if key is held down (returns 1 or 0)
if keyboard.UP == 1 then
  // Move up
end

if keyboard.SPACE == 1 then
  // Jump
end

// Arrow keys
keyboard.UP, keyboard.DOWN, keyboard.LEFT, keyboard.RIGHT

// Letter keys
keyboard.A, keyboard.B, keyboard.C, ... keyboard.Z

// Number keys
keyboard["0"], keyboard["1"], ... keyboard["9"]

// Special keys
keyboard.ENTER, keyboard.ESCAPE, keyboard.SHIFT, keyboard.CTRL
keyboard.ALT, keyboard.TAB, keyboard.BACKSPACE, keyboard.DELETE

// Check for key press (triggers once per press)
if keyboard.press.ENTER == 1 then
  // Select option
end

// Check for key release
if keyboard.release.SPACE == 1 then
  // Released jump
end
```

**Properties:**
- `keyboard[KEY]` - 1 if key is held, 0 if not
- `keyboard.press[KEY]` - 1 on frame key was pressed, 0 otherwise
- `keyboard.release[KEY]` - 1 on frame key was released, 0 otherwise

### mouse

Global object for mouse input state.

```lua
// Mouse position (screen coordinates)
local mx = mouse.x
local my = mouse.y

// Mouse buttons (1 if pressed, 0 if not)
if mouse.left == 1 then
  // Left button held
end

if mouse.right == 1 then
  // Right button held
end

if mouse.middle == 1 then
  // Middle button held
end

// Button press (triggers once)
if mouse.press == 1 then
  // Any button just pressed
end

// Button release
if mouse.release == 1 then
  // Any button just released
end

// Mouse wheel
local wheelDelta = mouse.wheel  // -1, 0, or 1

// Check if any button is pressed
if mouse.pressed == 1 then
  // At least one button is held
end
```

**Properties:**
- `mouse.x` - Mouse X position
- `mouse.y` - Mouse Y position
- `mouse.left` - Left button state (1 or 0)
- `mouse.right` - Right button state (1 or 0)
- `mouse.middle` - Middle button state (1 or 0)
- `mouse.pressed` - Any button pressed (1 or 0)
- `mouse.press` - Button just pressed (1 or 0)
- `mouse.release` - Button just released (1 or 0)
- `mouse.wheel` - Wheel delta (-1, 0, or 1)

### touch

Global object for touch input state (mobile/tablet).

```lua
// Check if touching
if touch.touching == 1 then
  local tx = touch.x
  local ty = touch.y
  // Handle touch drag
end

// Touch press (first contact)
if touch.press == 1 then
  // Touch started
end

// Touch release
if touch.release == 1 then
  // Touch ended
end

// Multi-touch support
local touchCount = #touch.touches
for i = 1, touchCount do
  local t = touch.touches[i]
  local tx = t.x
  local ty = t.y
  local id = t.id
  // Handle each touch point
end
```

**Properties:**
- `touch.touching` - 1 if screen is touched, 0 if not
- `touch.x` - Primary touch X position
- `touch.y` - Primary touch Y position
- `touch.press` - 1 on touch start, 0 otherwise
- `touch.release` - 1 on touch end, 0 otherwise
- `touch.touches` - Array of all active touch points

**Touch Point Object:**
- `x` - Touch X position
- `y` - Touch Y position
- `id` - Unique touch identifier

### gamepad

Global object for gamepad input state.

```lua
// Face buttons
if gamepad.A == 1 then
  // A button pressed
end

if gamepad.B == 1 then
  // B button pressed
end

if gamepad.X == 1 then
  // X button pressed
end

if gamepad.Y == 1 then
  // Y button pressed
end

// D-pad
if gamepad.UP == 1 then
  // D-pad up
end

if gamepad.DOWN == 1 then
  // D-pad down
end

if gamepad.LEFT == 1 then
  // D-pad left
end

if gamepad.RIGHT == 1 then
  // D-pad right
end

// Shoulder buttons
if gamepad.L1 == 1 then
  // Left bumper
end

if gamepad.R1 == 1 then
  // Right bumper
end

// Triggers (analog, 0.0 to 1.0)
local leftTrigger = gamepad.L2
local rightTrigger = gamepad.R2

// Analog sticks (-1.0 to 1.0)
local leftX = gamepad.LSX
local leftY = gamepad.LSY
local rightX = gamepad.RSX
local rightY = gamepad.RSY

// Stick buttons
if gamepad.LS == 1 then
  // Left stick pressed
end

if gamepad.RS == 1 then
  // Right stick pressed
end

// Start/Select
if gamepad.START == 1 then
  // Start button
end

if gamepad.SELECT == 1 then
  // Select button
end
```

**Properties:**
- `gamepad.A`, `gamepad.B`, `gamepad.X`, `gamepad.Y` - Face buttons
- `gamepad.UP`, `gamepad.DOWN`, `gamepad.LEFT`, `gamepad.RIGHT` - D-pad
- `gamepad.L1`, `gamepad.R1` - Shoulder buttons
- `gamepad.L2`, `gamepad.R2` - Triggers (0.0 to 1.0)
- `gamepad.LSX`, `gamepad.LSY` - Left stick (-1.0 to 1.0)
- `gamepad.RSX`, `gamepad.RSY` - Right stick (-1.0 to 1.0)
- `gamepad.LS`, `gamepad.RS` - Stick buttons
- `gamepad.START`, `gamepad.SELECT` - Menu buttons

## Input Patterns

### Movement with Keyboard

```lua
local speed = 2

if keyboard.UP == 1 then
  playerY = playerY - speed
end

if keyboard.DOWN == 1 then
  playerY = playerY + speed
end

if keyboard.LEFT == 1 then
  playerX = playerX - speed
end

if keyboard.RIGHT == 1 then
  playerX = playerX + speed
end
```

### Click Detection

```lua
if mouse.press == 1 then
  // Check if clicked on button
  if mouse.x > buttonX and mouse.x < buttonX + buttonW and
     mouse.y > buttonY and mouse.y < buttonY + buttonH then
    // Button clicked
  end
end
```

### Gamepad Movement

```lua
// Analog stick movement
playerX = playerX + gamepad.LSX * speed
playerY = playerY + gamepad.LSY * speed

// D-pad movement
if gamepad.UP == 1 then
  playerY = playerY - speed
end
```
