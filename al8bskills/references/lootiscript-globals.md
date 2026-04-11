# LootiScript Built-in Globals

All globals are available in every `.ls` file automatically — no imports needed.

---

## Lifecycle

```lua
function init()
    -- Called once at startup, after all assets are loaded.
    -- Initialize game state, spawn entities, set up systems here.
end

function update()
    -- Called every frame (default 60 fps).
    -- Run all game logic here.
    -- system.dt = smoothed milliseconds since last frame.
end

function draw()
    -- Called every frame for rendering.
    -- All screen.* calls go here.
    -- Particles are drawn automatically after this.
end
```

---

## Screen & Drawing

Full reference: [screen.md](./screen.md)

```lua
screen.width, screen.height          -- canvas dimensions

screen.clear("#1a1a2e")              -- clear to color
screen.setColor("#ff6600")           -- set draw color
screen.setAlpha(0.5)                 -- opacity 0–1

screen.fillRect(x, y, w, h)         -- filled rectangle
screen.drawRect(x, y, w, h)         -- outline rectangle
screen.fillRound(x, y, w, h)        -- filled ellipse/circle
screen.drawRound(x, y, w, h)        -- outline ellipse

screen.drawLine(x1, y1, x2, y2)
screen.drawText(text, x, y, size)
screen.drawText(text, x, y, size, "#color")
screen.textWidth(text, size)        -- measure text width in px

screen.drawSprite(sprites["key"], x, y)
screen.drawSprite(sprites["key"], x, y, w, h)
screen.drawMap(maps["key"], x, y, w, h)
```

→ See [screen.md](./screen.md) for arcs, polygons, curves, gradients, blend modes, transforms, and textured triangles.

---

## Input

Full reference: [input.md](./input.md)

```lua
-- Keyboard
keyboard.down("space")       -- held
keyboard.pressed("space")    -- just pressed (1 frame)
keyboard.released("space")   -- just released
keyboard.UP / DOWN / LEFT / RIGHT   -- WASD + arrow key aggregates

-- Mouse
mouse.x, mouse.y
mouse.down("left") / mouse.pressed("left") / mouse.released("left")
mouse.wheel       -- -1 / 0 / 1 scroll direction

-- Touch
touch.count
touch.x(0), touch.y(0)
touch.pressed(0), touch.released(0)

-- Gamepad
gamepad.down(0, "a")
gamepad.pressed(0, "start")
gamepad.count
```

→ See [input.md](./input.md) for all key names, analog stick access, and multi-input patterns.

---

## Audio

Full reference: [audio.md](./audio.md)

```lua
-- Sound effects
audio.play(sounds["jump"])
audio.play(sounds["jump"], volume, pitch, pan, loop)
audio.stopAll()
audio.setVolume(0.8)

-- Music (streaming)
music.play(music["theme"])
music.play(music["theme"], volume, loop)

-- Chiptune notation
audio.beep("t120 square C4:4 E4:4 G4:2")
audio.cancelBeeps()
```

→ See [audio.md](./audio.md) for control handles (stop/setVolume/seek), fade patterns, and procedural audio.

---

## Assets

Full reference: [assets.md](./assets.md)

```lua
sprites["player"]      -- loaded image/sprite
maps["level1"]         -- loaded tilemap
sounds["jump"]         -- loaded sound effect
music["theme"]         -- loaded music track
assets["config"]       -- loaded generic asset (JSON auto-parsed)
```

→ See [assets.md](./assets.md) for declaring assets in the resources manifest.

---

## System

```lua
system.fps           -- current measured FPS (read-only)
system.update_rate   -- target update rate; set to change game speed (default 60)
system.dt            -- smoothed delta time in ms since last frame

system.pause()       -- pause the game loop (fires listener.codePaused on host)
```

Frame-rate-independent movement:

```lua
function update()
    x = x + speed * (system.dt / 1000)   -- speed in px/s
end
```

---

## Host Communication

```lua
-- One-way event to host app (fires listener.onHostEmit)
host.emit("score_updated", { score = points })
host.emit("player_died", { x = px, y = py })
host.emit("level_complete")   -- payload optional

-- Request / response to backend (fires bridge.request)
host.request("leaderboard.get", { limit = 10 }, function(res)
    if res.ok then
        for i, entry in ipairs(res.entries) do
            print(entry.name .. ": " .. entry.score)
        end
    else
        print("Error: " .. res.error)
    end
end)

-- Request returns a requestId string (or nil if no bridge)
local req_id = host.request("user.getProfile", { id = uid }, callback)
```

---

## Session

Read-only snapshot of the current user, player, game, and room context. Set by the host via `initialSession` or `runtime.sendHostEvent({ type: "session.update", ... })`.

```lua
-- All fields may be nil if not provided by host
local u = session.user()
-- u.id, u.displayName, u.roles (list), u.metadata (table)

local p = session.player()
-- p.id, p.name, p.slot, p.metadata

local g = session.game()
-- g.id, g.slug, g.version

local r = session.room()
-- r.id, r.role, r.metadata

-- Guard against nil
if session.user() ~= nil then
    name_label = session.user().displayName or "Guest"
end
```

---

## Memory (Persistence)

```lua
-- Save game state (delegates to bridge.saveSnapshot)
memory.save(nil, function(res)
    if res.ok then show_saved_toast() end
end)
memory.save({ slot = "slot1", label = "Chapter 2" }, callback)

-- Load game state (delegates to bridge.loadSnapshot)
memory.load(nil, callback)
memory.load({ slot = "slot1" }, callback)

-- In-memory export/import (no bridge — useful for checkpoints)
local snap = memory.export()
memory.import(snap)

-- Full restart
memory.reset()
memory.reset({ preserveStorage = true })   -- keep localStorage
```

---

## Math

```lua
-- Basics
math.abs(x)
math.floor(x), math.ceil(x), math.round(x)
math.sqrt(x), math.pow(base, exp)
math.sign(x)                       -- -1, 0, or 1
math.mod(n, m)                     -- Euclidean modulo (always positive)

-- Min / Max / Clamp
math.min(a, b), math.max(a, b)
math.clamp(v, lo, hi)

-- Interpolation / Distance
math.lerp(a, b, t)                 -- linear interpolation
math.distance(x1, y1, x2, y2)     -- 2D distance
math.distance3D(x1,y1,z1, x2,y2,z2)
math.angleBetween(x1,y1, x2,y2)   -- angle in radians from point1 to point2

-- Trigonometry (radians)
math.sin(a), math.cos(a), math.tan(a)
math.asin(a), math.acos(a), math.atan(a)
math.atan2(y, x)

-- Conversion
math.degToRad(deg)
math.radToDeg(rad)

-- Logarithmic / Exponential
math.exp(x), math.log(x), math.log10(x)

-- Random
math.random()              -- float 0.0–1.0
math.randomInt(min, max)   -- integer min–max inclusive
math.randomFloat(min, max) -- float min–max

-- Constants
math.PI    -- 3.14159...
math.E     -- 2.71828...
```

---

## String

```lua
string.length(s)
string.split(s, sep)               -- returns list
string.join(list, sep)
string.trim(s)
string.trimStart(s), string.trimEnd(s)
string.replace(s, search, rep)     -- first occurrence
string.replaceAll(s, search, rep)  -- all occurrences
string.startsWith(s, prefix)
string.endsWith(s, suffix)
string.contains(s, search)
string.indexOf(s, search)          -- -1 if not found
string.lastIndexOf(s, search)
string.substring(s, start, end?)
string.slice(s, start, end?)       -- supports negative indices
string.toLowerCase(s), string.toUpperCase(s)
string.charAt(s, i)
string.charCodeAt(s, i)
string.fromCharCode(code, ...)
string.padStart(s, len, pad?)
string.padEnd(s, len, pad?)
string.repeat(s, count)
string.parseInt(s, radix?)         -- parse string to integer
string.parseFloat(s)
string.format(template, ...)       -- "{0} has {1} hp", name, hp
```

---

## List

```lua
-- Mutation
list.push(t, v)            -- append, returns t
list.pop(t)                -- remove + return last
list.shift(t)              -- remove + return first
list.unshift(t, v)         -- prepend
list.splice(t, i, del, ...) -- remove del items at i, insert rest

-- Access
list.length(t)
list.first(t), list.last(t)
list.at(t, i)              -- negative index supported
list.indexOf(t, v)
list.lastIndexOf(t, v)
list.includes(t, v)

-- Functional (return new list)
list.map(t, fn)
list.filter(t, fn)
list.reduce(t, fn, init)
list.find(t, fn)           -- returns item or nil
list.findIndex(t, fn)      -- returns index or -1
list.some(t, fn)
list.every(t, fn)
list.flat(t, depth?)
list.flatMap(t, fn)

-- Transformation
list.slice(t, start, end?)
list.concat(t1, t2, ...)
list.reverse(t)
list.sort(t)
list.sort(t, fn)           -- fn(a, b) returns negative/0/positive
list.unique(t)             -- deduplicate
list.shuffle(t)            -- random order
list.chunk(t, size)        -- split into groups

-- Math utilities (numeric lists)
list.sum(t)
list.average(t)
list.min(t), list.max(t)

-- Other
list.join(t, sep)
list.fill(t, val, start?, end?)
```

---

## JSON

```lua
local str = json.encode(value)    -- table/number/string/bool → JSON string
local val = json.decode(str)      -- JSON string → LootiScript value
```

---

## Classes & Utilities

### ObjectPool

Reuse objects to avoid garbage collection pauses:

```lua
-- Create a pool with a factory function and initial size
local bullet_pool = ObjectPool.new(function()
    return { x = 0, y = 0, vx = 0, vy = 0, active = false }
end, 50)

-- Get an object from pool (creates new if pool is empty)
local b = bullet_pool:get()
b.x = player.x
b.vx = 200

-- Return to pool when done
bullet_pool:release(b)
```

### Random (seeded PRNG)

`math.random()` uses the `Random` global under the hood. For reproducible sequences:

```lua
local rng = Random.new(12345)       -- seeded
local v = rng:next()                -- 0.0–1.0
local i = rng:nextInt(1, 10)
```

### Palette

```lua
local c = Palette.fromHex("#ff6600")   -- { r = 255, g = 102, b = 0 }
local hex = Palette.toHex(255, 102, 0) -- "#ff6600"
local mixed = Palette.mix("#ff0000", "#0000ff", 0.5)  -- midpoint color
```

### Image / Sprite / Sound constructors

For dynamically creating asset objects:

```lua
-- Rarely needed — most assets come from the resources manifest
local img = Image.new(url)
local spr = Sprite.new(url, options)
local snd = Sound.new(url)
```

---

## Game Systems

All six game systems are built-in and need no setup:

| Global | Description | Reference |
|---|---|---|
| `events.*` | Event bus with deferred dispatch | [game-systems/events.md](./game-systems/events.md) |
| `tween.*` | Property tweening with easing | [game-systems/tween.md](./game-systems/tween.md) |
| `fsm.*` | Finite state machines | [game-systems/fsm.md](./game-systems/fsm.md) |
| `physics.*` | 2D rigid body physics | [game-systems/physics.md](./game-systems/physics.md) |
| `camera.*` | Camera follow, shake, zoom | [game-systems/camera.md](./game-systems/camera.md) |
| `particles.*` | Particle emitters | [game-systems/particles.md](./game-systems/particles.md) |
