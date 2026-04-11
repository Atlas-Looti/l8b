# Input API

## Keyboard

```lua
-- State checks (returns 1 = true, 0 = false in LootiScript)
keyboard.down("space")      -- held this frame
keyboard.pressed("space")   -- just pressed (1 frame only)
keyboard.released("space")  -- just released (1 frame only)

-- Directional aggregates (WASD + Arrow keys combined)
keyboard.UP     -- W or ArrowUp
keyboard.DOWN   -- S or ArrowDown
keyboard.LEFT   -- A or ArrowLeft
keyboard.RIGHT  -- D or ArrowRight
```

### Key Names

| Category | Keys |
|---|---|
| Letters | `"a"` – `"z"` |
| Digits | `"0"` – `"9"` |
| Arrows | `"arrowup"`, `"arrowdown"`, `"arrowleft"`, `"arrowright"` |
| WASD | `"w"`, `"a"`, `"s"`, `"d"` |
| Space / Enter | `"space"`, `"enter"` |
| Escape | `"escape"` |
| Backspace / Delete | `"backspace"`, `"delete"` |
| Tab | `"tab"` |
| Shift | `"shift"`, `"shiftleft"`, `"shiftright"` |
| Ctrl | `"control"`, `"controlleft"`, `"controlright"` |
| Alt | `"alt"`, `"altleft"`, `"altright"` |
| Function keys | `"f1"` – `"f12"` |
| Numpad | `"numpad0"` – `"numpad9"`, `"numpadadd"`, `"numpadsubtract"`, `"numpadmultiply"`, `"numpaddivide"`, `"numpadenter"` |
| Brackets | `"bracketleft"`, `"bracketright"` |
| Punctuation | `"period"`, `"comma"`, `"semicolon"`, `"quote"`, `"backquote"`, `"slash"`, `"backslash"`, `"minus"`, `"equal"` |

Key names are lowercase, matching the browser `KeyboardEvent.code` convention without the "Key" prefix.

---

## Mouse

```lua
mouse.x           -- cursor X in canvas coordinates
mouse.y           -- cursor Y in canvas coordinates

-- Button state
mouse.down("left")        -- held
mouse.pressed("left")     -- just clicked
mouse.released("left")    -- just released
-- button names: "left", "middle", "right"

-- Aliases
mouse.left        -- left button state (1 = held)
mouse.middle
mouse.right
mouse.press       -- any button pressed this frame
mouse.release     -- any button released this frame

-- Scroll wheel
mouse.wheel       -- -1 (scroll up), 0, or 1 (scroll down) this frame
```

### Common Mouse Patterns

```lua
-- Click to shoot
if mouse.pressed("left") then
    shoot(mouse.x, mouse.y)
end

-- Hover detection
function is_hovering(x, y, w, h)
    return mouse.x >= x and mouse.x <= x + w
       and mouse.y >= y and mouse.y <= y + h
end

-- Drag
local dragging = false
local drag_ox, drag_oy = 0, 0

function update()
    if mouse.pressed("left") then
        dragging = true
        drag_ox = mouse.x - obj.x
        drag_oy = mouse.y - obj.y
    end
    if mouse.released("left") then
        dragging = false
    end
    if dragging then
        obj.x = mouse.x - drag_ox
        obj.y = mouse.y - drag_oy
    end
end
```

---

## Touch

```lua
touch.count          -- number of active touches (0 = none)
touch.x(0)           -- x of first touch (index 0-based)
touch.y(0)           -- y of first touch
touch.x(1)           -- x of second touch
touch.down(0)        -- is touch 0 held
touch.pressed(0)     -- touch 0 just started
touch.released(0)    -- touch 0 just ended

-- Convenience: primary touch
touch.touching       -- 1 if any touch active
touch.x              -- alias for touch.x(0)
touch.y              -- alias for touch.y(0)
touch.press          -- primary touch started
touch.release        -- primary touch ended
```

### Common Touch Pattern

```lua
-- Treat touch as mouse for simple games
function get_pointer()
    if touch.count > 0 then
        return touch.x(0), touch.y(0), touch.pressed(0), touch.released(0)
    end
    return mouse.x, mouse.y, mouse.pressed("left"), mouse.released("left")
end
```

---

## Gamepad

```lua
-- Check button (pad = 0–3, button name = see below)
gamepad.down(0, "a")
gamepad.pressed(0, "b")
gamepad.released(0, "x")

-- Directional aggregates on pad 0
gamepad.down(0, "up")    -- D-pad up or left stick up
gamepad.down(0, "down")
gamepad.down(0, "left")
gamepad.down(0, "right")

-- Analog sticks (returns -1.0 to 1.0)
gamepad.status[0].LEFT_STICK_AMOUNT   -- left stick magnitude (0–1)
gamepad.status[0].LEFT_STICK_ANGLE    -- left stick angle in radians
gamepad.status[0].RIGHT_STICK_AMOUNT

-- Connection
gamepad.count          -- number of connected gamepads
gamepad.connected(0)   -- is gamepad 0 connected
```

### Button Names

| Group | Names |
|---|---|
| Face buttons | `"a"`, `"b"`, `"x"`, `"y"` |
| Bumpers | `"lb"`, `"rb"` |
| Triggers | `"lt"`, `"rt"` |
| Menu | `"start"`, `"select"`, `"view"`, `"menu"` |
| Sticks | `"ls"`, `"rs"` (click) |
| D-pad | `"up"`, `"down"`, `"left"`, `"right"` |
| Left stick directional | `"left_stick_up"`, `"left_stick_down"`, `"left_stick_left"`, `"left_stick_right"` |
| Right stick directional | `"right_stick_up"`, `"right_stick_down"`, `"right_stick_left"`, `"right_stick_right"` |

### Common Gamepad Patterns

```lua
-- Movement with left stick or D-pad
function get_move_input(pad)
    local dx, dy = 0, 0
    if gamepad.down(pad, "left")  then dx = -1 end
    if gamepad.down(pad, "right") then dx =  1 end
    if gamepad.down(pad, "up")    then dy = -1 end
    if gamepad.down(pad, "down")  then dy =  1 end

    -- Analog stick overrides digital if tilted
    local lx = gamepad.status[pad] and gamepad.status[pad].LEFT_STICK_AMOUNT or 0
    if lx > 0.2 then
        local angle = gamepad.status[pad].LEFT_STICK_ANGLE
        dx = math.cos(angle) * lx
        dy = math.sin(angle) * lx
    end
    return dx, dy
end

-- Universal input (keyboard + gamepad)
function any_jump()
    return keyboard.pressed("space")
        or keyboard.pressed("arrowup")
        or gamepad.pressed(0, "a")
end
```
