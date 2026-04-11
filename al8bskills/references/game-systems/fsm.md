# Finite State Machine (`fsm.*`)

Manages named states with enter/exit/update callbacks. Multiple FSM instances can run simultaneously. Updated automatically before `update()` each frame.

## API

```lua
-- Create an FSM instance — returns a numeric id
local m = fsm.create()

-- Add a state
fsm.addState(m, "idle", {
    onEnter  = function() end,          -- called when entering this state
    onUpdate = function(dt) end,        -- called every frame while in this state (dt = ms)
    onExit   = function() end,          -- called when leaving this state
})

-- All three callbacks are optional
fsm.addState(m, "dead", {
    onEnter = function()
        play_death_animation()
        events.defer("player_died", {})
    end,
})

-- Remove a state
fsm.removeState(m, "idle")

-- Transition to a state (fires onExit on current, then onEnter on next)
fsm.transition(m, "idle")

-- Read state
local state = fsm.getState(m)        -- current state name (string or nil)
local prev  = fsm.getPrevious(m)     -- previous state name (string or nil)
local ms    = fsm.getTimeInState(m)  -- milliseconds in current state

-- Destroy FSM when no longer needed
fsm.destroy(m)
```

## Deferred Transitions

Transitions called from inside `onUpdate` are **deferred** — applied after the callback returns. This is intentional and prevents state mutation mid-update.

```lua
fsm.addState(m, "run", {
    onUpdate = function(dt)
        move(dt)
        if hit_wall then
            fsm.transition(m, "idle")   -- safe: queued, not instant
        end
    end
})
```

Transitions in `onEnter` and `onExit` are applied immediately.

## Full Example: Platformer Player

```lua
local player_fsm = fsm.create()
local on_ground = false

fsm.addState(player_fsm, "idle", {
    onEnter = function()
        anim = "idle"
    end,
    onUpdate = function(dt)
        if keyboard.down("arrowleft") or keyboard.down("arrowright") then
            fsm.transition(player_fsm, "run")
        end
        if keyboard.pressed("space") and on_ground then
            fsm.transition(player_fsm, "jump")
        end
    end,
})

fsm.addState(player_fsm, "run", {
    onEnter = function()
        anim = "run"
    end,
    onUpdate = function(dt)
        local dir = 0
        if keyboard.down("arrowleft")  then dir = -1 end
        if keyboard.down("arrowright") then dir =  1 end
        if dir == 0 then
            fsm.transition(player_fsm, "idle")
            return
        end
        vx = dir * 150
        if keyboard.pressed("space") and on_ground then
            fsm.transition(player_fsm, "jump")
        end
    end,
})

fsm.addState(player_fsm, "jump", {
    onEnter = function()
        anim = "jump"
        vy = -400
        audio.play(sounds["jump"])
    end,
    onUpdate = function(dt)
        local dir = 0
        if keyboard.down("arrowleft")  then dir = -1 end
        if keyboard.down("arrowright") then dir =  1 end
        vx = dir * 130
        if on_ground and vy >= 0 then
            fsm.transition(player_fsm, dir ~= 0 and "run" or "idle")
        end
    end,
    onExit = function()
        anim = "land"
    end,
})

fsm.addState(player_fsm, "hurt", {
    onEnter = function()
        anim = "hurt"
        vy = -200
        vx = facing * -100
        tween.create({
            from = 0, to = 1, duration = 600, easing = "linear",
            onComplete = function()
                fsm.transition(player_fsm, "idle")
            end,
        })
    end,
})

-- Start in idle
fsm.transition(player_fsm, "idle")
```

## Enemy AI State Machine

```lua
local ai = fsm.create()

fsm.addState(ai, "patrol", {
    onUpdate = function(dt)
        walk_patrol_path(dt)
        if dist_to_player() < 120 then
            fsm.transition(ai, "chase")
        end
    end,
})

fsm.addState(ai, "chase", {
    onEnter = function()
        audio.play(sounds["alert"])
    end,
    onUpdate = function(dt)
        move_toward_player(dt)
        if dist_to_player() < 30 then
            fsm.transition(ai, "attack")
        elseif dist_to_player() > 200 then
            fsm.transition(ai, "search")
        end
    end,
})

fsm.addState(ai, "attack", {
    onEnter = function()
        attack_timer = 0
    end,
    onUpdate = function(dt)
        attack_timer = attack_timer + dt
        if attack_timer >= 800 then
            do_attack()
            attack_timer = 0
        end
        if dist_to_player() > 40 then
            fsm.transition(ai, "chase")
        end
    end,
})

fsm.addState(ai, "search", {
    onEnter = function()
        search_timer = 3000
    end,
    onUpdate = function(dt)
        search_timer = search_timer - dt
        if search_timer <= 0 then
            fsm.transition(ai, "patrol")
        end
        if dist_to_player() < 120 then
            fsm.transition(ai, "chase")
        end
    end,
})

fsm.transition(ai, "patrol")
```

## UI Screen Manager

```lua
local ui_fsm = fsm.create()

fsm.addState(ui_fsm, "main_menu", {
    onEnter = function() show("main_menu") end,
    onExit  = function() hide("main_menu") end,
    onUpdate = function(dt)
        if button_pressed("play") then fsm.transition(ui_fsm, "playing") end
        if button_pressed("settings") then fsm.transition(ui_fsm, "settings") end
    end,
})

fsm.addState(ui_fsm, "playing", {
    onEnter = function() start_game() end,
    onExit  = function() end,
    onUpdate = function(dt)
        if keyboard.pressed("escape") then fsm.transition(ui_fsm, "paused") end
        if game_over then fsm.transition(ui_fsm, "game_over") end
    end,
})

fsm.addState(ui_fsm, "paused", {
    onEnter = function() show("pause_menu") end,
    onExit  = function() hide("pause_menu") end,
    onUpdate = function(dt)
        if keyboard.pressed("escape") then fsm.transition(ui_fsm, "playing") end
    end,
})

fsm.addState(ui_fsm, "game_over", {
    onEnter = function()
        show("game_over")
        host.emit("game_over", { score = score })
    end,
})

fsm.transition(ui_fsm, "main_menu")
```
