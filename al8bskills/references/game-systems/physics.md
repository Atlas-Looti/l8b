# Physics & Collision (`physics.*`)

2D rigid-body physics with AABB and circle shapes. Impulse-based collision resolution. Updated automatically before `update()` each frame.

## API

```lua
-- Global settings
physics.setGravity(980)    -- px/s² downward (default: 980; set 0 for top-down games)

-- Add a body — returns a numeric id
local id = physics.addBody({
    x = 100, y = 50,         -- initial world position (required)
    vx = 0, vy = 0,          -- initial velocity px/s (default 0)
    mass = 1,                -- kg; 0 = static/immovable (default 1)
    friction = 0.05,         -- velocity damping per frame (0 = no friction, 1 = instant stop)
    restitution = 0.2,       -- bounciness: 0 = no bounce, 1 = perfect elastic
    gravityScale = 1,        -- multiply global gravity (0 = float, 2 = heavy)
    shape = {
        type = "aabb",       -- axis-aligned bounding box
        x = -8, y = -16,     -- offset from body origin (center-align: -w/2, -h/2)
        w = 16, h = 32,      -- width, height in px
    },
    isTrigger = false,       -- true = detect collision but don't resolve (pass-through)
    tag = "player",          -- string label, readable in collision callbacks
})

-- Circle shape
local ball = physics.addBody({
    x = 200, y = 50, mass = 1,
    restitution = 0.8,
    shape = { type = "circle", x = 0, y = 0, r = 12 },
    tag = "ball",
})

-- Static body (mass = 0 = cannot be moved by physics)
local wall = physics.addBody({
    x = 0, y = 280, mass = 0,
    shape = { type = "aabb", x = 0, y = 0, w = 400, h = 20 },
    tag = "ground",
})
```

## Reading Body State

```lua
local b = physics.getBody(id)
-- b is nil if body was removed, otherwise:
-- b.x, b.y    — current position
-- b.vx, b.vy  — current velocity
-- b.tag       — tag string

player.x = b.x
player.y = b.y
```

## Collision Callback

```lua
physics.onCollide(id, function(hit)
    -- hit.otherId   — numeric id of the other body
    -- hit.otherTag  — tag string of the other body
    -- hit.nx, hit.ny — collision normal (direction away from other body, unit vector)
    -- hit.depth      — penetration depth in pixels
    
    if hit.otherTag == "spike" then
        take_damage(10)
    end
    if hit.otherTag == "coin" then
        score = score + 10
        physics.removeBody(hit.otherId)
        audio.play(sounds["coin"])
    end
    -- Detect landing on ground (normal pointing upward = ny < 0)
    if hit.otherTag == "ground" and hit.ny < -0.5 then
        on_ground = true
    end
end)
```

## Forces & Impulses

```lua
physics.setPosition(id, x, y)          -- teleport (ignores physics)
physics.setVelocity(id, vx, vy)        -- set velocity directly

-- applyForce: added to body each frame until cleared (for continuous thrust, wind)
physics.applyForce(id, fx, fy)         -- force in Newtons (mass-scaled)

-- applyImpulse: instant velocity change (for jumps, knockback, explosions)
physics.applyImpulse(id, ix, iy)       -- impulse px/s directly added to velocity

physics.removeBody(id)                 -- destroy body
```

**applyForce vs applyImpulse:**

| | `applyForce` | `applyImpulse` |
|---|---|---|
| Effect | Accumulated each frame, then cleared | Instant, applied once |
| Use for | Continuous thrust, wind, gravity override | Jump, knockback, explosion |
| Scale | Divided by mass | Added directly to velocity |

## Spatial Query

```lua
-- Get all body ids whose AABB overlaps the given rectangle
local ids = physics.query(x, y, w, h)
for _, bid in ipairs(ids) do
    local b = physics.getBody(bid)
    -- process b
end
```

## Integration Order (per frame)

1. Apply gravity → velocity
2. Apply accumulated forces → velocity, then clear forces
3. Integrate velocity → position (`dt` capped at 50ms)
4. Apply friction: `vel *= (1 - friction * dt)`
5. Clamp to `maxVelocity` (2000 px/s)
6. Detect all collisions (O(N²), all body pairs)
7. Resolve with impulse + positional correction (Baumgarte)
8. Fire collision callbacks

The 50ms delta cap prevents physics explosion when the tab is backgrounded.

## Full Platformer Example

```lua
local player_body
local on_ground = false

function init()
    physics.setGravity(900)
    
    -- Player
    player_body = physics.addBody({
        x = 100, y = 100, mass = 1,
        friction = 0.1, restitution = 0,
        shape = { type = "aabb", x = -8, y = -16, w = 16, h = 32 },
        tag = "player",
    })
    physics.onCollide(player_body, function(hit)
        if hit.ny < -0.5 then on_ground = true end
        if hit.otherTag == "hazard" then respawn() end
    end)
    
    -- Platforms
    local platforms = {
        { x = 0, y = 300, w = 400, h = 20 },
        { x = 100, y = 220, w = 80, h = 16 },
        { x = 240, y = 180, w = 80, h = 16 },
    }
    for _, p in ipairs(platforms) do
        physics.addBody({
            x = p.x, y = p.y, mass = 0,
            shape = { type = "aabb", x = 0, y = 0, w = p.w, h = p.h },
            tag = "ground",
        })
    end
end

function update()
    on_ground = false   -- reset each frame; collision sets it true

    local b = physics.getBody(player_body)
    if not b then return end

    -- Horizontal movement
    local vx = 0
    if keyboard.down("arrowleft")  then vx = -160 end
    if keyboard.down("arrowright") then vx =  160 end
    physics.setVelocity(player_body, vx, b.vy)

    -- Jump
    if keyboard.pressed("space") and on_ground then
        physics.applyImpulse(player_body, 0, -480)
        audio.play(sounds["jump"])
    end

    -- Sync render
    player.x = b.x
    player.y = b.y
end
```

## Top-down Physics (No Gravity)

```lua
function init()
    physics.setGravity(0)
    
    player_body = physics.addBody({
        x = 200, y = 200, mass = 1,
        friction = 0.3,
        shape = { type = "circle", x = 0, y = 0, r = 10 },
        tag = "player",
    })
end

function update()
    local b = physics.getBody(player_body)
    local dx, dy = 0, 0
    if keyboard.down("arrowleft")  then dx = -1 end
    if keyboard.down("arrowright") then dx =  1 end
    if keyboard.down("arrowup")    then dy = -1 end
    if keyboard.down("arrowdown")  then dy =  1 end
    physics.setVelocity(player_body, dx * 200, dy * 200)
    player.x = b.x
    player.y = b.y
end
```

## Trigger Zones

```lua
local zone = physics.addBody({
    x = 180, y = 140, mass = 0,
    shape = { type = "aabb", x = 0, y = 0, w = 40, h = 40 },
    isTrigger = true,   -- no collision response — just detection
    tag = "checkpoint",
})

physics.onCollide(player_body, function(hit)
    if hit.otherTag == "checkpoint" then
        save_checkpoint()
        physics.removeBody(hit.otherId)  -- remove after first touch
    end
end)
```
