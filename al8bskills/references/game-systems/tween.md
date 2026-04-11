# Tween System (`tween.*`)

Interpolates numeric values over time with easing. Runs automatically before `update()` each frame.

## API

```lua
-- Shorthand: tween a property on a table from its current value to a target
local id = tween.to(target, durationMs, property, toValue)
local id = tween.to(target, durationMs, property, toValue, easing)
local id = tween.to(target, durationMs, property, toValue, easing, onComplete)

-- Full config
local id = tween.create({
    from = 0,               -- start value (required)
    to = 1,                 -- end value (required)
    duration = 400,         -- milliseconds (required)
    easing = "easeOutQuad", -- easing name (default: "linear")
    onUpdate = function(v)  -- called each frame with current value (required)
        alpha = v
    end,
    onComplete = function() -- called when finished (optional)
        scene_ready = true
    end,
    loop = false,           -- repeat forever (default false)
    pingpong = false,       -- reverse on each loop (default false)
    delay = 0,              -- ms before starting (default 0)
})

-- Control
tween.pause(id)
tween.resume(id)
tween.stop(id)
tween.stopAll()
```

## tween.to — convenience

```lua
tween.to(target, durationMs, property, toValue, easing?, onComplete?)
```

- Reads `target[property]` as the start value at call time
- Sets `target[property] = v` each frame automatically
- Returns an `id` for pause/resume/stop

```lua
local enemy = { x = 0, y = 100, alpha = 1 }

tween.to(enemy, 800, "x", 400, "easeOutCubic")
tween.to(enemy, 300, "alpha", 0, "linear", function()
    destroy(enemy)
end)
```

## Easing Functions

```
linear

-- Quadratic
easeInQuad    easeOutQuad    easeInOutQuad

-- Cubic
easeInCubic   easeOutCubic   easeInOutCubic

-- Quartic
easeInQuart   easeOutQuart   easeInOutQuart

-- Sine
easeInSine    easeOutSine    easeInOutSine

-- Exponential
easeInExpo    easeOutExpo    easeInOutExpo

-- Back (overshoots slightly)
easeInBack    easeOutBack    easeInOutBack

-- Elastic (spring-like)
easeInElastic easeOutElastic easeInOutElastic

-- Bounce
easeInBounce  easeOutBounce  easeInOutBounce
```

**Choosing an easing:**
- `easeOutQuad` / `easeOutCubic` — most natural for UI movement (fast start, slow end)
- `easeInOutCubic` — smooth transitions (slow → fast → slow)
- `easeOutBack` — overshoot effect for popups / spawn animations
- `easeOutElastic` — bouncy spring feel
- `easeOutBounce` — ball-drop style
- `easeInExpo` — dramatic charge-up
- `linear` — constant speed (use sparingly — usually looks mechanical)

## Patterns

### Scene transition (fade to black)

```lua
local fade = { alpha = 0 }

function fade_out(onDone)
    tween.to(fade, 400, "alpha", 1, "linear", onDone)
end

function fade_in()
    tween.to(fade, 400, "alpha", 0, "linear")
end

function draw()
    -- draw game...
    if fade.alpha > 0 then
        screen.setAlpha(fade.alpha)
        screen.fillRect(0, 0, screen.width, screen.height, "#000000")
        screen.setAlpha(1)
    end
end
```

### Spawn bounce (scale punch)

```lua
local spawn_scale = { v = 0 }

function spawn_enemy(e)
    spawn_scale.v = 0
    tween.create({
        from = 0, to = 1.3, duration = 120, easing = "easeOutBack",
        onUpdate = function(v) spawn_scale.v = v end,
        onComplete = function()
            tween.create({
                from = 1.3, to = 1, duration = 80, easing = "easeInQuad",
                onUpdate = function(v) spawn_scale.v = v end,
            })
        end,
    })
end
```

### Looping heartbeat pulse

```lua
local icon = { scale = 1 }
tween.create({
    from = 1, to = 1.15, duration = 500,
    easing = "easeInOutSine",
    pingpong = true,
    loop = true,
    onUpdate = function(v) icon.scale = v end,
})
```

### Move along a path (chain of tweens)

```lua
local pos = { x = 0, y = 0 }
local waypoints = { {x=100,y=50}, {x=200,y=150}, {x=300,y=50} }
local step = 0

local function move_next()
    step = step + 1
    if step > #waypoints then return end
    local wp = waypoints[step]
    tween.to(pos, 600, "x", wp.x, "easeInOutCubic")
    tween.to(pos, 600, "y", wp.y, "easeInOutCubic", move_next)
end

move_next()
```

### Number counter (score pop)

```lua
local display = { score = 0 }
local target_score = 0

function add_score(amount)
    target_score = target_score + amount
    tween.to(display, 600, "score", target_score, "easeOutCubic")
end

function draw()
    screen.drawText(math.floor(display.score), 10, 10, 20)
end
```
