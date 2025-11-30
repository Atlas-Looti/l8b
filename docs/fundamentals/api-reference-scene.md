# Scene

The scene system allows you to organize your game into separate scenes with lifecycle management.

## Defining Scene

Use the `scene()` function to define a scene with lifecycle methods:

```lua
scene("home", object
  init = function(self)
    // Called once when scene is first registered
    print("Home scene initialized")
  end

  onEnter = function(self, params)
    // Called when scene becomes active
    // params contains route parameters if any
    print("Entered home scene")
  end

  onLeave = function(self)
    // Called when scene is deactivated
    print("Left home scene")
  end

  update = function(self)
    // Called every frame
    if keyboard.press.SPACE == 1 then
      router.push("/game")
    end
  end

  draw = function(self)
    // Called every frame
    screen.clear("blue")
    screen.drawText("Press SPACE to start", 0, 0, 20)
  end
end)
```

## Lifecycle Methods

### `init()`

Called once when the scene is first registered. Use this to initialize scene-specific data.

### `onEnter(params)`

Called when the scene becomes active. The `params` object contains route parameters if the scene was navigated to via a route with parameters.

### `onLeave()`

Called when the scene is deactivated (another scene becomes active).

### `update()`

Called every frame while the scene is active. Use this for game logic.

### `draw()`

Called every frame while the scene is active. Use this for rendering.

For complete Scene API documentation, see [@l8b/scene README](https://github.com/Atlas-Looti/l8b2/blob/main/packages/core/scene/README.md).
