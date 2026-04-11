# Event Bus (`events.*`)

Synchronous and deferred pub/sub event system. No setup required — available in every game.

## API

```lua
-- Subscribe — returns a numeric handle
local h = events.on("player_died", function(payload)
    lives = lives - 1
end)

-- Subscribe once — auto-removes after first fire
events.once("level_complete", function(payload)
    show_victory_screen(payload.level)
end)

-- Emit immediately (synchronous — fires all listeners before returning)
events.emit("enemy_hit", { id = eid, damage = 10 })
events.emit("coin_collected")   -- payload is optional

-- Emit deferred — queued and fires after update() completes this frame
events.defer("explosion", { x = px, y = py })

-- Unsubscribe by handle
events.off(h)

-- Remove all listeners for one event
events.clear("player_died")

-- Remove ALL listeners for ALL events
events.clear()
```

## emit vs defer

| | `events.emit` | `events.defer` |
|---|---|---|
| Timing | Fires instantly, synchronously | Fires at end of frame (after `update()`) |
| Use when | Direct response needed immediately | Emitting from inside another event handler or loop |
| Infinite loop risk | Yes, if handlers emit the same event | No — queue is consumed once per frame |

**Rule:** Use `emit` for direct game-to-game signals. Use `defer` when calling from inside an event callback or when you want effects to appear "next frame."

If `defer` is called during the flush phase itself (from a deferred callback), it emits immediately — preventing queue buildup.

## Patterns

### Decoupled system communication

```lua
-- Enemy module: fires event, doesn't know who's listening
function enemy_take_damage(id, amount)
    hp[id] = hp[id] - amount
    if hp[id] <= 0 then
        events.emit("enemy_died", { id = id, x = ex[id], y = ey[id], score = 100 })
        remove_enemy(id)
    end
end

-- Score module: reacts without coupling to enemy code
events.on("enemy_died", function(e)
    score = score + e.score
end)

-- Particle module: reacts independently
events.on("enemy_died", function(e)
    particles.burst(e.x, e.y, 20, burst_cfg)
end)

-- Sound module: reacts independently
events.on("enemy_died", function(e)
    audio.play(sounds["enemy_die"])
end)
```

### State-driven subscriptions

Only listen while in a specific state:

```lua
local combat_listeners = {}

function enter_combat()
    table.insert(combat_listeners, events.on("player_hit", on_player_hit))
    table.insert(combat_listeners, events.on("enemy_died", on_enemy_died))
end

function exit_combat()
    for _, h in ipairs(combat_listeners) do
        events.off(h)
    end
    combat_listeners = {}
end
```

### One-shot trigger with timeout guard

```lua
local boss_arrived = false

events.once("boss_arrived", function()
    boss_arrived = true
    audio.play(sounds["boss_roar"])
    camera.shake(cam, 12, 500)
end)
```

### Deferred batch update

Collect changes during `update()`, apply at end of frame:

```lua
function update()
    -- Lots of collision checks that might trigger same event
    for _, enemy in ipairs(enemies) do
        if check_hit(player, enemy) then
            events.defer("damage_player", { amount = enemy.damage })
        end
    end
end

-- Only fires once per frame even if triggered many times
local damage_this_frame = 0
events.on("damage_player", function(e)
    damage_this_frame = damage_this_frame + e.amount
end)
-- Process damage_this_frame in a single place
```

### Global event log (debug)

```lua
local all_handler = events.on("*", function(payload)
    -- Note: "*" is a literal event name, not a wildcard
    -- For debugging, emit a "debug" event from code you want to trace
end)
```
