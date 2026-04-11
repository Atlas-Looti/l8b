# Camera System (`camera.*`)

Smooth-follow camera with dead zone, screen shake, bounds clamping, and zoom. Updated automatically before `update()` each frame.

## API

```lua
// Create a camera — returns a numeric id
local cam = camera.create()

// Set as the active camera used by begin/end
camera.setActive(cam)

// Follow a target (any table with x and y fields)
camera.follow(cam, player)                      // default lerp 0.1
camera.follow(cam, player, 0.12)                // lerp speed 0.0–1.0
camera.follow(cam, player, 0.12, 0, -40)        // + offset x, y (look-ahead)
camera.unfollow(cam)

// Dead zone: camera only moves when target exits a rectangle centered on screen
camera.setDeadZone(cam, 40, 20)                 // width, height in pixels

// Screen shake
camera.shake(cam, intensity, durationMs)
camera.shake(cam, 8, 300)                       // intensity=8px, 300ms

// World bounds — camera will not scroll outside these limits
camera.setBounds(cam, minX, minY, maxX, maxY)
camera.setBounds(cam, 0, 0, 2000, 1500)
camera.clearBounds(cam)

// Zoom
camera.setZoom(cam, 2.0)          // 1.0 = normal, 2.0 = 2x zoom in
camera.setZoom(cam, 1.0, true)    // true = smooth transition

// Read state
local x = camera.getX(cam)
local y = camera.getY(cam)
local z = camera.getZoom(cam)

// Coordinate conversion
local sx, sy = camera.worldToScreen(cam, wx, wy)    // world → screen px
local wx, wy = camera.screenToWorld(cam, sx, sy)    // screen px → world

// Wrap all world-space draw calls
draw = function()
    camera.begin(cam)         // applies transform (ctx.save + translate/scale)
        draw_world()
    camera.end(cam)           // restores transform (ctx.restore)

    draw_hud()                // outside begin/end = screen space (not affected by camera)
end

// Destroy when no longer needed
camera.destroy(cam)
```

## Camera Transform

The transform applied by `camera.begin()`:

```
ctx.save()
ctx.translate(screenW/2 + shakeOffX - camX * zoom,
              screenH/2 + shakeOffY - camY * zoom)
ctx.scale(zoom, zoom)
```

Camera `x, y` is the world position of the **center of the screen**.

## Follow & Dead Zone

```lua
// Simple follow
camera.follow(cam, player, 0.1)

// With dead zone: camera only moves if player exits a 40×20 rectangle at screen center
camera.setDeadZone(cam, 40, 20)

// Look-ahead: offset camera ahead of movement direction
// Offset y = -50 keeps player lower on screen (more sky visible)
camera.follow(cam, player, 0.1, 0, -50)
```

**Lerp guide:**
- `0.05` — very slow, dreamy
- `0.1` — smooth, natural (recommended for most games)
- `0.2` — responsive, slightly snappy
- `1.0` — instant snap (no smoothing)

## Shake

```lua
// Intensity = max offset in pixels
// Duration = how long shake lasts (ms)
// Falloff is quadratic — shake fades out smoothly

camera.shake(cam, 4, 200)    -- light hit
camera.shake(cam, 10, 350)   -- heavy hit
camera.shake(cam, 16, 500)   -- explosion nearby
```

## Patterns

### Basic 2D platformer setup

```lua
local cam

init = function()
    cam = camera.create()
    camera.setActive(cam)
    camera.follow(cam, player, 0.1)
    camera.setDeadZone(cam, 30, 15)
    camera.setBounds(cam, 0, 0, level_w, level_h)
end

draw = function()
    camera.begin(cam)
        draw_tilemap()
        draw_enemies()
        draw_player()
        draw_collectibles()
    camera.end(cam)
    // HUD is drawn here, outside the camera
    draw_hud()
end
```

### Trauma-based shake on events

```lua
events.on("player_hit", function(e)
    camera.shake(cam, e.damage * 1.5, 250)
end)

events.on("explosion", function(e)
    // Shake intensity scales with distance to explosion
    local b = physics.getBody(player_body)
    local dist = math.distance(b.x, b.y, e.x, e.y)
    local intensity = math.clamp(500 / dist, 0, 18)
    camera.shake(cam, intensity, 400)
end)
```

### Cinematic zoom on boss entry

```lua
local zoom_t = object v = 1 end

events.on("boss_appeared", function()
    tween.create(object
        from = 1
        to = 1.5
        duration = 1000
        easing = "easeInOutQuad"
        onUpdate = function(v)
            zoom_t.v = v
            camera.setZoom(cam, v)
        end
    end)
end)
```

### Mouse aim look-ahead

Pull the camera toward where the player is aiming:

```lua
local look_target = object x = 0  y = 0 end

update = function()
    local b = physics.getBody(player_body)
    local wx, wy = camera.screenToWorld(cam, mouse.x, mouse.y)
    look_target.x = b.x + (wx - b.x) * 0.35
    look_target.y = b.y + (wy - b.y) * 0.35
    camera.follow(cam, look_target, 0.07)
end
```

### Room-based camera snap

```lua
local ROOM_W, ROOM_H = 400, 240

enter_room = function(rx, ry)
    // Snap camera to room center with a short tween
    local target_x = rx * ROOM_W + ROOM_W / 2
    local target_y = ry * ROOM_H + ROOM_H / 2
    local fake = object x = camera.getX(cam)  y = camera.getY(cam) end
    camera.unfollow(cam)
    tween.create(object
        from = fake.x
        to = target_x
        duration = 300
        easing = "easeInOutCubic"
        onUpdate = function(v)
            fake.x = v
            // set camera position via follow on a fake point
        end
    end)
end
```

### 2D pixel-art (pixel-perfect rendering)

```lua
// Prevent sub-pixel blurring by rounding camera position each frame
local draw_pixel_perfect = function()
    camera.begin(cam)
        // Force integer coordinates in draw calls by rounding player.x/y
        local rx = math.round(camera.getX(cam))
        local ry = math.round(camera.getY(cam))
        draw_world_at(rx, ry)
    camera.end(cam)
end
```
