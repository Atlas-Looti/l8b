# Router

The router provides URL-based routing and navigation for scenes.

## Routing

Use the `route()` function to map paths to scenes:

```lua
route("/", "home")                    // Root path to home scene
route("/game", "game")                 // /game path to game scene
route("/player/:id", "player")         // Path with parameter :id
route("/game/:level/:difficulty", "game")  // Multiple parameters
```

Route parameters are passed to the scene's `onEnter` method as an object:

```lua
scene("player", object
  onEnter = function(self, params)
    playerId = params.id  // Get :id parameter from route
    print("Viewing player: " + playerId)
  end
end)
```

## Methods

### `router.push(path)`

Navigate to a new path (adds to browser history).

```lua
router.push("/game")           // Navigate to /game
router.push("/player/42")      // Navigate with parameter
```

### `router.replace(path)`

Replace current path without adding to history.

```lua
router.replace("/menu")  // Replace without adding to history
```

### `router.back()`

Go back to the previous page in history.

```lua
if keyboard.press.ESCAPE == 1 then
  router.back()
end
```

## Properties

- `router.path`: Current path
- `router.params`: Current route parameters (object)
- `router.sceneName`: Current scene name

For complete Router API documentation, see [@l8b/scene README](https://github.com/Atlas-Looti/l8b2/blob/main/packages/core/scene/README.md).
