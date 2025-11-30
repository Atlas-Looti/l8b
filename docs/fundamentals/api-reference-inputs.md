# Inputs

To create interactive programs, you need to read input from users.

## Keyboard

The `keyboard` object stores the current button state.

```lua
if keyboard.UP == 1 then y += 1 end
if keyboard.SPACE == 1 then shoot() end
```

**Detecting button press (once):**
Use `keyboard.press.<KEY>` inside the `update()` function. Returns `1` only on the frame when the button was first pressed.

```lua
if keyboard.press.SPACE == 1 then
  // Executed only once when button is pressed
  jump()
end
```

**Detecting button release:**
Use `keyboard.release.<KEY>` to detect when a key is released.

```lua
if keyboard.release.SPACE == 1 then
  // Key was just released
end
```

**Available Keys:**

- Arrow keys: `UP`, `DOWN`, `LEFT`, `RIGHT`
- Letter keys: `A`, `B`, `C`, ... `Z`
- Number keys: `keyboard["0"]`, `keyboard["1"]`, ... `keyboard["9"]`
- Special keys: `ENTER`, `ESCAPE`, `SHIFT`, `CTRL`, `ALT`, `TAB`, `BACKSPACE`, `DELETE`, `SPACE`

## Mouse

The `mouse` object reports mouse pointer position and button status.

| Field                | Description                                            |
| -------------------- | ------------------------------------------------------ |
| `mouse.x`, `mouse.y` | Mouse pointer position in screen coordinates.          |
| `mouse.left`         | `1` if left button is pressed, `0` if not.             |
| `mouse.right`        | `1` if right button is pressed, `0` if not.            |
| `mouse.middle`       | `1` if middle button is pressed, `0` if not.           |
| `mouse.pressed`      | `1` if any button is pressed, `0` otherwise.           |
| `mouse.press`        | `1` if any button was just pressed.                    |
| `mouse.release`      | `1` if any button was just released.                   |
| `mouse.wheel`        | Wheel delta: `-1` (down), `0` (no movement), `1` (up). |

## Touch

The `touch` object for touch screens (also reports mouse status as single touch).

| Field                | Description                                         |
| -------------------- | --------------------------------------------------- |
| `touch.touching`     | `1` if user is touching the screen, `0` if not.     |
| `touch.x`, `touch.y` | Touch position.                                     |
| `touch.press`        | `1` on touch start.                                 |
| `touch.release`      | `1` on touch end.                                   |
| `touch.touches`      | Array of all active touch points (for multi-touch). |

**Touch Point Object:**

- `x` - Touch X position
- `y` - Touch Y position
- `id` - Unique touch identifier

## Gamepad

The `gamepad` object for physical controllers.

```lua
if gamepad.UP == 1 then y += 1 end
if gamepad.press.A == 1 then jump() end
```

**Available Buttons:**

- Face buttons: `A`, `B`, `X`, `Y`
- D-pad: `UP`, `DOWN`, `LEFT`, `RIGHT`
- Shoulder buttons: `L1`, `R1`
- Triggers: `L2`, `R2` (0.0 to 1.0)
- Analog sticks: `LSX`, `LSY`, `RSX`, `RSY` (-1.0 to 1.0)
- Stick buttons: `LS`, `RS`
- Menu buttons: `START`, `SELECT`

For complete Input API documentation, see [@l8b/input README](https://github.com/Atlas-Looti/l8b2/blob/main/packages/core/input/README.md).
