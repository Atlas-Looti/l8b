# @l8b/scene

**LootiScript API Binding** - Scene management and routing system for organizing game states.

> **Note**: This package is used as an API binding for LootiScript in the l8b engine.

## API Reference

### scene()

Define a new scene with lifecycle methods.

```lua
scene("main_menu", {
  // Called when scene starts
  init = function(self)
    self.selected = 0
  end,

  // Called every frame
  update = function(self)
    if keyboard.press.ENTER == 1 then
      router.push("/game")
    end

    if keyboard.press.UP == 1 then
      self.selected = self.selected - 1
    end
  end,

  // Called every frame for rendering
  draw = function(self)
    screen.clear("#000000")
    screen.setColor("#FFFFFF")
    screen.drawText("Main Menu", 10, 10, 16)
  end,

  // Called when leaving scene
  cleanup = function(self)
    // Clean up resources
  end
})
```

**Parameters:**

- `name` (string) - Scene name
- `definition` (table) - Scene definition object
  - `init` (function, optional) - Called when scene starts
  - `update` (function, optional) - Called every frame
  - `draw` (function, optional) - Called every frame for rendering
  - `cleanup` (function, optional) - Called when leaving scene

### route()

Map a URL path to a scene.

```lua
// Map root path to main menu
route("/", "main_menu")

// Map /game to game scene
route("/game", "game_scene")

// Map with parameters
route("/level/:id", "level_scene")
route("/player/:playerId/inventory", "inventory_scene")
```

**Parameters:**

- `path` (string) - URL path pattern
- `sceneName` (string) - Scene name to activate

**Path Parameters:**

- Use `:paramName` for dynamic segments
- Access via `router.params.paramName`

### router

Global object for navigation and route state.

#### router.push()

Navigate to a path (adds to history).

```lua
// Navigate to game scene
router.push("/game")

// Navigate with parameters
router.push("/level/5")
router.push("/player/123/inventory")
```

**Parameters:**

- `path` (string) - Path to navigate to

#### router.replace()

Navigate to a path (replaces current history entry).

```lua
// Replace current path
router.replace("/game_over")
```

**Parameters:**

- `path` (string) - Path to navigate to

#### router.back()

Go back in browser history.

```lua
// Go back
router.back()
```

#### router.path

Get current path.

```lua
local currentPath = router.path
// Returns: "/level/5"
```

#### router.params

Get current route parameters.

```lua
// For route "/level/:id" at path "/level/5"
local levelId = router.params.id  // "5"

// For route "/player/:playerId/inventory" at "/player/123/inventory"
local playerId = router.params.playerId  // "123"
```

#### router.sceneName

Get current scene name.

```lua
local current = router.sceneName
// Returns: "level_scene"
```

## Scene Lifecycle

Scenes have a defined lifecycle:

1. **init()** - Called once when scene becomes active
2. **update()** - Called every frame while scene is active
3. **draw()** - Called every frame for rendering
4. **cleanup()** - Called when leaving scene

```lua
scene("game", {
  init = function(self)
    // Initialize scene state
    self.score = 0
    self.player = {x = 100, y = 100}
  end,

  update = function(self)
    // Update game logic
    if keyboard.UP == 1 then
      self.player.y = self.player.y - 2
    end
  end,

  draw = function(self)
    // Render scene
    screen.clear("#000")
    screen.fillRect(self.player.x, self.player.y, 16, 16, "#FFF")
  end,

  cleanup = function(self)
    // Clean up when leaving scene
    self.score = 0
  end
})
```

## Scene State

Access scene state via `self`:

```lua
scene("example", {
  init = function(self)
    // Set initial state
    self.counter = 0
    self.items = {}
  end,

  update = function(self)
    // Access and modify state
    self.counter = self.counter + 1

    if keyboard.press.SPACE == 1 then
      table.insert(self.items, {x = 10, y = 10})
    end
  end,

  draw = function(self)
    // Use state for rendering
    screen.drawText("Count: " .. self.counter, 10, 10, 12)
  end
})
```

## Complete Example

```lua
// Define routes
route("/", "menu")
route("/game", "game")
route("/level/:id", "level")

// Main menu scene
scene("menu", {
  init = function(self)
    self.options = {"Start Game", "Options", "Quit"}
    self.selected = 0
  end,

  update = function(self)
    if keyboard.press.UP == 1 then
      self.selected = math.max(0, self.selected - 1)
    end

    if keyboard.press.DOWN == 1 then
      self.selected = math.min(#self.options - 1, self.selected + 1)
    end

    if keyboard.press.ENTER == 1 then
      if self.selected == 0 then
        router.push("/game")
      end
    end
  end,

  draw = function(self)
    screen.clear("#000")

    for i = 0, #self.options - 1 do
      local color = "#FFF"
      if i == self.selected then
        color = "#FF0"
      end
      screen.setColor(color)
      screen.drawText(self.options[i + 1], 100, 100 + i * 20, 14)
    end
  end
})

// Game scene
scene("game", {
  init = function(self)
    self.score = 0
  end,

  update = function(self)
    if keyboard.press.ESCAPE == 1 then
      router.push("/")
    end
  end,

  draw = function(self)
    screen.clear("#000")
    screen.setColor("#FFF")
    screen.drawText("Score: " .. self.score, 10, 10, 12)
  end
})

// Level scene with parameters
scene("level", {
  init = function(self)
    // Access route parameter
    self.levelId = router.params.id
    Console.log("Loading level " .. self.levelId)
  end,

  update = function(self)
    // Level logic
  end,

  draw = function(self)
    screen.clear("#000")
    screen.drawText("Level " .. self.levelId, 10, 10, 16)
  end
})
```
