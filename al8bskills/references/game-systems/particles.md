# Particle System (`particles.*`)

Pre-allocated particle pools with zero GC pressure. Emitters update before `update()` and **draw automatically after `draw()`** — do not call `particles.draw()` manually.

## API

### Continuous emitter

```lua
local id = particles.create({
    x = player.x, y = player.y,   -- emitter world position (required)
    emitRate = 60,                  -- particles per second
    lifeMin = 300, lifeMax = 800,   -- particle lifetime range in ms (required)
    speedMin = 30, speedMax = 80,   -- spawn speed range px/s (required)
    angleMin = -0.8, angleMax = 0.8, -- spawn angle range in radians (required)
    sizeStart = 6, sizeEnd = 0,     -- size at birth and death in px (required)
    alphaStart = 1, alphaEnd = 0,   -- opacity at birth and death 0–1 (required)
    gravity = -50,                  -- extra gravity px/s² (negative = upward)
    color = "#ff6600",              -- hex color string (required)
    sprite = nil,                   -- sprite name to draw instead of rectangle
    maxParticles = 200,             -- pool size limit (default 200)
    loop = true,                    -- keep emitting (default true)
})

-- Move emitter each frame to follow something
function update()
    local b = physics.getBody(player_body)
    particles.move(id, b.x, b.y)
end

-- Pause/resume/stop
particles.pause(id)
particles.resume(id)
particles.stop(id)    -- stop emitting; existing particles still finish their life
```

### One-shot burst

Fire-and-forget — no id returned. The emitter auto-recycles when all particles die.

```lua
particles.burst(x, y, count, config)

particles.burst(enemy.x, enemy.y, 25, {
    lifeMin = 200, lifeMax = 500,
    speedMin = 60, speedMax = 200,
    angleMin = 0, angleMax = 6.28,   -- full circle: 0 to 2π
    sizeStart = 4, sizeEnd = 0,
    alphaStart = 1, alphaEnd = 0,
    gravity = 150,
    color = "#ffcc00",
})
```

## EmitterConfig Fields

| Field | Required | Default | Description |
|---|---|---|---|
| `x`, `y` | yes | — | Emitter world position |
| `lifeMin`, `lifeMax` | yes | — | Particle lifetime range (ms) |
| `speedMin`, `speedMax` | yes | — | Spawn speed range (px/s) |
| `angleMin`, `angleMax` | yes | — | Spawn angle range (radians; 0=right, π/2=down, π=left) |
| `sizeStart`, `sizeEnd` | yes | — | Particle size at birth/death (px) |
| `alphaStart`, `alphaEnd` | yes | — | Particle opacity at birth/death (0–1) |
| `color` | yes | — | Hex color string `"#rrggbb"` |
| `emitRate` | no | `60` | Particles per second (continuous mode) |
| `burstCount` | no | — | Emit exactly N particles then stop |
| `maxParticles` | no | `200` | Pool size — limits total active particles |
| `gravity` | no | `0` | Additional gravity on particles (px/s²) |
| `sprite` | no | — | Sprite name to use instead of filled rectangle |
| `loop` | no | `true` | Keep emitting after pool fills |

## Angle Reference

```
0        = right (→)
math.PI/2  = down  (↓)
math.PI    = left  (←)
-math.PI/2 = up    (↑)

-- Upward spread (like fire, jets):
angleMin = -0.5, angleMax = 0.5   -- ±30° around up

-- Full circle (explosion):
angleMin = 0, angleMax = 6.28     -- 0 to 2π
```

## Patterns

### Fire trail following player

```lua
local trail_id

function init()
    trail_id = particles.create({
        x = 0, y = 0,
        emitRate = 50,
        lifeMin = 150, lifeMax = 400,
        speedMin = 10, speedMax = 40,
        angleMin = 0, angleMax = 6.28,
        sizeStart = 5, sizeEnd = 0,
        alphaStart = 0.8, alphaEnd = 0,
        gravity = -60,
        color = "#ff4400",
        loop = true,
    })
end

function update()
    local b = physics.getBody(player_body)
    particles.move(trail_id, b.x, b.y)
end
```

### Death explosion (multi-burst)

```lua
events.on("enemy_died", function(e)
    -- Body chunks
    particles.burst(e.x, e.y, 12, {
        lifeMin = 400, lifeMax = 900,
        speedMin = 40, speedMax = 120,
        angleMin = 0, angleMax = 6.28,
        sizeStart = 5, sizeEnd = 2,
        alphaStart = 1, alphaEnd = 0,
        gravity = 250,
        color = "#cc2200",
    })
    -- Sparks
    particles.burst(e.x, e.y, 20, {
        lifeMin = 200, lifeMax = 500,
        speedMin = 80, speedMax = 220,
        angleMin = 0, angleMax = 6.28,
        sizeStart = 2, sizeEnd = 0,
        alphaStart = 1, alphaEnd = 0,
        gravity = 400,
        color = "#ffaa00",
    })
    -- Smoke
    particles.burst(e.x, e.y, 8, {
        lifeMin = 600, lifeMax = 1200,
        speedMin = 10, speedMax = 30,
        angleMin = -0.8, angleMax = 0.8,
        sizeStart = 8, sizeEnd = 20,
        alphaStart = 0.4, alphaEnd = 0,
        gravity = -30,
        color = "#555555",
    })
end)
```

### Rain effect

```lua
function init()
    particles.create({
        x = screen.width / 2, y = -10,
        emitRate = 120,
        lifeMin = 1000, lifeMax = 1500,
        speedMin = 300, speedMax = 400,
        angleMin = 1.4, angleMax = 1.7,   -- mostly downward
        sizeStart = 2, sizeEnd = 1,
        alphaStart = 0.6, alphaEnd = 0.2,
        gravity = 50,
        color = "#aaccff",
        maxParticles = 300,
        loop = true,
    })
end
```

### Campfire (layered emitters)

```lua
local fire_x, fire_y = 200, 250

function init()
    -- Flames
    particles.create({
        x = fire_x, y = fire_y,
        emitRate = 35,
        lifeMin = 500, lifeMax = 900,
        speedMin = 10, speedMax = 35,
        angleMin = -0.35, angleMax = 0.35,
        sizeStart = 10, sizeEnd = 2,
        alphaStart = 0.9, alphaEnd = 0,
        gravity = -70,
        color = "#ff4400",
        loop = true,
    })
    -- Embers
    particles.create({
        x = fire_x, y = fire_y,
        emitRate = 8,
        lifeMin = 1000, lifeMax = 2000,
        speedMin = 20, speedMax = 55,
        angleMin = -0.5, angleMax = 0.5,
        sizeStart = 3, sizeEnd = 0,
        alphaStart = 1, alphaEnd = 0,
        gravity = -100,
        color = "#ffaa00",
        loop = true,
    })
    -- Smoke
    particles.create({
        x = fire_x, y = fire_y - 20,
        emitRate = 5,
        lifeMin = 1200, lifeMax = 2500,
        speedMin = 5, speedMax = 15,
        angleMin = -0.3, angleMax = 0.3,
        sizeStart = 6, sizeEnd = 18,
        alphaStart = 0.25, alphaEnd = 0,
        gravity = -20,
        color = "#666666",
        loop = true,
    })
end
```

### Healing / pickup sparkle

```lua
function spawn_pickup_effect(x, y)
    particles.burst(x, y, 10, {
        lifeMin = 400, lifeMax = 800,
        speedMin = 20, speedMax = 60,
        angleMin = 0, angleMax = 6.28,
        sizeStart = 4, sizeEnd = 0,
        alphaStart = 1, alphaEnd = 0,
        gravity = -80,
        color = "#88ffaa",
    })
end
```
