# API Reference

Complete and detailed documentation for L8B's built-in APIs.

> **Note:** For detailed API documentation with full method signatures, parameters, and examples, see the individual package READMEs in `packages/core/`.

## Screen

In L8B, the screen is represented by the predefined `screen` object. To display shapes or images on the screen, simply call functions (methods) on this object.

### Coordinate System

To make your work easier, L8B automatically scales screen coordinates regardless of the actual display resolution.

- **Origin (0,0)**: Located at the **center of the screen**.
- **Scale**: The smallest display dimension (width in portrait mode, height in landscape mode) is always normalized to **200**.
- **Range**: Since 0 is at the center, the smallest dimension ranges from **-100 to +100**.

The largest dimension will adjust to the screen aspect ratio. For example, on a 16:9 screen:

- Landscape: Y from -100 to +100, X from -178 to +178.
- Portrait: X from -100 to +100, Y from -178 to +178.

### Properties

| Property | Description |
|----------|-------------|
| `screen.width` | Current screen width in L8B coordinate units. |
| `screen.height` | Current screen height in L8B coordinate units. |
| `screen.context` | Canvas rendering context (for advanced usage). |

### Drawing State

#### `screen.clear(color?)`

Clears the screen (fills it with the given color, or black if no color is provided).

```lua
screen.clear("#000")  // Fill screen with black
screen.clear("#FF0000")  // Fill screen with red
```

#### `screen.setColor(color)`

Sets the color for subsequent drawing operations.

Color can be defined as:

- **RGB**: `"rgb(255,0,0)"` (bright red), `"rgb(255,255,255)"` (white). Values 0-255.
- **Hex**: `"#FFF"` or `"#FFFFFF"` (white), `"#F00"` (red).
- **Named**: `"red"`, `"blue"`, `"white"`, etc. (HTML5 standard colors).

#### `screen.setAlpha(opacity)`

Sets the opacity level for subsequent drawing operations.

- `0`: Fully transparent (invisible).
- `1`: Fully opaque (covers what's underneath).

```lua
screen.setAlpha(0.5)  // Next elements will be semi-transparent
// ... draw something ...
screen.setAlpha(1)    // Reset to default
```

#### `screen.setBlending(mode)`

Sets how subsequent drawing operations will be composited with existing graphics.

- `"normal"`: Overwrites graphics underneath (default).
- `"additive"`: Adds color values (light/glowing effect).
- `"multiply"`: Multiplies colors.
- `"screen"`: Screen blend mode.

See [Screen API](/packages/core/screen/README.md) for all available blending modes.

### Drawing Primitives

#### `screen.fillRect(x, y, width, height, color?)`

Draws a **filled** rectangle.

- `x, y`: Center coordinates of the rectangle.
- `width, height`: Width and height.
- `color`: (Optional) Fill color. If omitted, uses the last set color.

#### `screen.drawRect(x, y, width, height, color?)`

Draws a rectangle **outline**. Same parameters as `fillRect`.

#### `screen.fillRoundRect(x, y, width, height, roundness, color?)`

Draws a filled rounded rectangle.

- `roundness`: Corner radius in pixels.

#### `screen.drawRoundRect(x, y, width, height, roundness, color?)`

Draws a rounded rectangle outline.

#### `screen.fillRound(x, y, width, height, color?)`

Draws a filled round shape (circle or ellipse depending on dimensions).

- `x, y`: Center coordinates.
- `width, height`: Horizontal and vertical diameter.

#### `screen.drawRound(x, y, width, height, color?)`

Draws a round shape outline.

#### `screen.drawLine(x1, y1, x2, y2, color?)`

Draws a straight line connecting points `(x1, y1)` and `(x2, y2)`.

#### `screen.setLineWidth(width)`

Sets the line width for subsequent `draw...` (outline) operations. Default is 1.

#### `screen.setLineDash(dash)`

Sets the line dash pattern.

```lua
screen.setLineDash([5, 5])  // 5px dash, 5px gap
screen.setLineDash([10, 5, 2, 5])  // Complex pattern
screen.setLineDash(null)  // Solid line
```

### Advanced Shapes

#### `screen.fillPolygon(x1, y1, x2, y2, ..., color?)`

Fills a polygon defined by a list of coordinate points.
Can also accept an array as the first argument: `screen.fillPolygon([x1, y1, x2, y2, ...], color)`.

#### `screen.drawPolygon(x1, y1, x2, y2, ..., color?)`

Draws a polygon outline.

#### `screen.drawPolyline(x1, y1, x2, y2, ..., color?)`

Similar to polygon but the line doesn't automatically close back to the starting point.

#### `screen.drawArc(x, y, radius, startAngle, endAngle, counterClockwise, color?)`

Draws a circle arc.

- `radius`: Circle radius.
- `startAngle, endAngle`: Angles in **degrees**.
- `counterClockwise`: Boolean, draw counter-clockwise if true.

#### `screen.fillArc(x, y, radius, startAngle, endAngle, counterClockwise, color?)`

Fills a circle arc.

### Sprites & Maps

#### `screen.drawSprite(name, x, y, width, height?)`

Draws a sprite that you've created.

- `name`: Sprite name (string), e.g., `"player"`.
- `x, y`: Center coordinates of the sprite.
- `width`: Display width.
- `height`: (Optional) Display height. If omitted, calculated proportionally.

**Animated Sprites:**
If the sprite has animation, L8B automatically plays the appropriate frame.

- `sprites["name"].setFrame(0)`: Reset animation to first frame.
- `screen.drawSprite("name.0", ...)`: Draw specific frame (frame 0).

#### `screen.drawImage(image, x, y, width, height?)`

Alias for `drawSprite`. Can accept Image object or sprite name.

#### `screen.drawSpritePart(name, sx, sy, sw, sh, x, y, width?, height?)`

Draws part of a sprite (spritesheet).

- `sx, sy`: Source position in sprite.
- `sw, sh`: Source size.
- `x, y`: Destination position.
- `width, height`: Destination size.

#### `screen.drawImagePart(image, sx, sy, sw, sh, x, y, width?, height?)`

Alias for `drawSpritePart`.

#### `screen.drawMap(map, x, y, width, height)`

Draws a map created in the Maps tab.

- `map`: Map object or map name (string).
- `x, y`: Center coordinates of the map display.
- `width, height`: Map display size on screen.

### Text

#### `screen.drawText(text, x, y, size, color?)`

Displays text on the screen.

- `text`: String to display.
- `x, y`: Center coordinates of the text.
- `size`: Text height in pixels.

#### `screen.drawTextOutline(text, x, y, size, color?)`

Draws outlined text.

#### `screen.setFont(fontName)`

Sets the font for subsequent `drawText` calls.
Example built-in fonts: `"BitCell"`, `"DigitalDisco"`, `"PressStart2P"`, etc.

#### `screen.loadFont(fontName)`

Initiates font loading. Fonts must be loaded before they can be used properly. Use `screen.isFontReady(fontName)` to check status.

#### `screen.isFontReady(fontName?)`

Checks if a font is ready to use. Returns `1` if ready, `0` if not.

#### `screen.textWidth(text, size)`

Returns the width of the given text when drawn at the given size.

### Screen Transformations

These functions change the coordinate system for subsequent drawing operations. **Important:** Always reset transformation values after drawing the desired section.

#### `screen.setTranslation(tx, ty)`

Shifts the coordinate origin.

```lua
screen.setTranslation(50, 50)
// Drawing at (0,0) will now appear at (50,50)
screen.setTranslation(0, 0)  // Reset
```

#### `screen.setRotation(angle)`

Rotates the entire coordinate system by `angle` degrees.

```lua
screen.setRotation(45)
// Graphics rotated 45 degrees
screen.setRotation(0)  // Reset
```

#### `screen.setScale(x, y)`

Scales the coordinate system.

```lua
screen.setScale(2, 2)  // 2x zoom
screen.setScale(1, 1)  // Reset
```

### Object Transformations (Draw Parameters)

Unlike screen transformations, these functions only affect **how objects are drawn**, not the coordinate system.

#### `screen.setDrawRotation(angle)`

Rotates objects (sprite/text/rect) around their own axis.

```lua
screen.setDrawRotation(90)
screen.drawSprite("player", 0, 0, 32)  // Player rotated 90 degrees
screen.setDrawRotation(0)  // Reset
```

#### `screen.setDrawAnchor(anchorX, anchorY)`

Changes the anchor (pivot) point of graphics. Default is center (0, 0).

- `x`: -1 (left), 0 (center), 1 (right)
- `y`: -1 (bottom), 0 (center), 1 (top)

```lua
screen.setDrawAnchor(-1, 1)  // Anchor at top-left corner
screen.drawText("Score", -100, 100, 20)  // Text left-aligned at corner
screen.setDrawAnchor(0, 0)  // Reset
```

#### `screen.setDrawScale(x, y?)`

Sets the drawing scale for elements.

```lua
screen.setDrawScale(2, 2)  // 2x scale
screen.setDrawScale(1, -1)  // Flip vertically
screen.setDrawScale(1, 1)  // Reset
```

### 3D Triangles

#### `screen.tri(x1, y1, x2, y2, x3, y3, color?)`

Draws a filled triangle.

#### `screen.trib(x1, y1, x2, y2, x3, y3, color?)`

Draws a triangle outline.

#### `screen.ttri(x1, y1, x2, y2, x3, y3, u1, v1, u2, v2, u3, v3, texture, textureSource?, z1?, z2?, z3?, useDepth?)`

Draws a textured triangle with UV coordinates for 3D rendering.

### Cursor

#### `screen.setCursorVisible(visible)`

Show or hide the mouse cursor.

```lua
screen.setCursorVisible(false)  // Hide cursor
screen.setCursorVisible(true)   // Show cursor
```

For complete Screen API documentation, see [@l8b/screen README](/packages/core/screen/README.md).

## Inputs

To create interactive programs, you need to read input from users.

### Keyboard

The `keyboard` object stores the current button state.

```lua
if keyboard.UP == 1 then y += 1 end
if keyboard.SPACE == 1 then shoot() end
```

**Detecting button press (once):**
Use `keyboard.press.<KEY>` inside the `update()` function. Returns `1` only on the frame when the button was first pressed.

```lua
if keyboard.press.SPACE == 1 then
  // Executed only once when button is pressed
  jump()
end
```

**Detecting button release:**
Use `keyboard.release.<KEY>` to detect when a key is released.

```lua
if keyboard.release.SPACE == 1 then
  // Key was just released
end
```

**Available Keys:**

- Arrow keys: `UP`, `DOWN`, `LEFT`, `RIGHT`
- Letter keys: `A`, `B`, `C`, ... `Z`
- Number keys: `keyboard["0"]`, `keyboard["1"]`, ... `keyboard["9"]`
- Special keys: `ENTER`, `ESCAPE`, `SHIFT`, `CTRL`, `ALT`, `TAB`, `BACKSPACE`, `DELETE`, `SPACE`

### Mouse

The `mouse` object reports mouse pointer position and button status.

| Field | Description |
|-------|-------------|
| `mouse.x`, `mouse.y` | Mouse pointer position in screen coordinates. |
| `mouse.left` | `1` if left button is pressed, `0` if not. |
| `mouse.right` | `1` if right button is pressed, `0` if not. |
| `mouse.middle` | `1` if middle button is pressed, `0` if not. |
| `mouse.pressed` | `1` if any button is pressed, `0` otherwise. |
| `mouse.press` | `1` if any button was just pressed. |
| `mouse.release` | `1` if any button was just released. |
| `mouse.wheel` | Wheel delta: `-1` (down), `0` (no movement), `1` (up). |

### Touch

The `touch` object for touch screens (also reports mouse status as single touch).

| Field | Description |
|-------|-------------|
| `touch.touching` | `1` if user is touching the screen, `0` if not. |
| `touch.x`, `touch.y` | Touch position. |
| `touch.press` | `1` on touch start. |
| `touch.release` | `1` on touch end. |
| `touch.touches` | Array of all active touch points (for multi-touch). |

**Touch Point Object:**

- `x` - Touch X position
- `y` - Touch Y position
- `id` - Unique touch identifier

### Gamepad

The `gamepad` object for physical controllers.

```lua
if gamepad.UP == 1 then y += 1 end
if gamepad.press.A == 1 then jump() end
```

**Available Buttons:**

- Face buttons: `A`, `B`, `X`, `Y`
- D-pad: `UP`, `DOWN`, `LEFT`, `RIGHT`
- Shoulder buttons: `L1`, `R1`
- Triggers: `L2`, `R2` (0.0 to 1.0)
- Analog sticks: `LSX`, `LSY`, `RSX`, `RSY` (-1.0 to 1.0)
- Stick buttons: `LS`, `RS`
- Menu buttons: `START`, `SELECT`

For complete Input API documentation, see [@l8b/input README](/packages/core/input/README.md).

## Audio

L8B allows you to play sound effects and music.

### `Audio.playSound(name, volume?, pitch?, pan?, loop?)`

Plays a sound effect (SFX).

**Parameters:**

- `name`: Sound file name (relative to `assets/` directory)
- `volume`: 0.0 to 1.0 (default: 1.0)
- `pitch`: 0.5 to 2.0 (default: 1.0)
- `pan`: Stereo pan, -1.0 (left) to 1.0 (right) (default: 0)
- `loop`: `true` to loop continuously (default: `false`)

**Returns:** Sound control object with methods:

- `stop()` - Stop the sound
- `setVolume(v)` - Set volume (0.0-1.0)
- `setPitch(p)` - Set pitch (0.5-2.0)
- `setPan(p)` - Set pan (-1.0 to 1.0)
- `getDuration()` - Get sound duration in seconds
- `finished` - Boolean indicating if sound has finished

```lua
sfx = Audio.playSound("explosion")
sfx.setVolume(0.5)
sfx.stop()
```

### `Audio.playMusic(name, volume?, loop?)`

Plays background music (BGM).

**Parameters:**

- `name`: Music file name (relative to `assets/` directory)
- `volume`: 0.0 to 1.0 (default: 1.0)
- `loop`: `true` to loop (default: `false`)

**Returns:** Music control object with methods:

- `play()` - Resume playback
- `stop()` - Stop the music
- `setVolume(v)` - Set volume (0.0-1.0)
- `getPosition()` - Get current playback position in seconds
- `getDuration()` - Get total duration in seconds
- `setPosition(pos)` - Seek to position in seconds

```lua
bgm = Audio.playMusic("theme", 0.8, true)
bgm.stop()
bgm.play()  // Resume
```

### `Audio.beep(pattern)`

Plays synthesized beep sequences.

```lua
Audio.beep("C4 E4 G4")  // Play C Major chord
Audio.beep("tempo 120 C4 D4 E4 F4")
```

**Note Format:**

- Note names: `C`, `D`, `E`, `F`, `G`, `A`, `B`
- Octaves: `0-8` (e.g., `C4`, `A3`)
- Sharps: `#` (e.g., `C#4`)
- Duration: Optional number after note (in seconds)
- Commands: `tempo`, `volume`, `duration`, `span`, `square`, `sine`, `saw`, `noise`, `loop`

### `Audio.cancelBeeps()`

Stops all currently playing beeps and sounds.

For complete Audio API documentation, see [@l8b/audio README](/packages/core/audio/README.md).

## Assets

The asset manager allows you to load external files. Loading is **asynchronous**.

### `Assets.loadImage(path, callback?)`

Loads an image file.

**Parameters:**

- `path`: Image file path relative to `assets/` directory
- `callback`: Optional callback called when image is loaded

**Returns:** Loader object with:

- `ready`: `0` (loading) or `1` (ready)
- `image`: Image object when loaded

```lua
// With callback
Assets.loadImage("player.png", function(image)
  // Image is ready to use
end)

// With loader object
loader = Assets.loadImage("enemy.png")
if loader.ready == 1 then
  mySprite = loader.image
end
```

### `Assets.loadJSON(path, callback?)`

Loads a JSON file and parses it into an L8B object.

**Parameters:**

- `path`: JSON file path (without .json extension)
- `callback`: Optional callback called when JSON is loaded

**Returns:** Loader object with:

- `ready`: `0` (loading) or `1` (ready)
- `data`: Parsed JSON data when loaded

```lua
Assets.loadJSON("config", function(data)
  items = data
end)
```

### `Assets.loadText(path, callback?, ext?)`

Loads a text file.

**Parameters:**

- `path`: Text file path (without extension)
- `callback`: Optional callback
- `ext`: File extension (default: "txt")

**Returns:** Loader object with `text` property.

### `Assets.loadCSV(path, callback?)`

Loads a CSV file (shorthand for `loadText` with `.csv` extension).

### `Assets.loadMarkdown(path, callback?)`

Loads a Markdown file (shorthand for `loadText` with `.md` extension).

### `Assets.loadFont(font)`

Loads a custom font file (.ttf).

```lua
Assets.loadFont("myfont")  // Loads assets/myfont.ttf
```

For complete Assets API documentation, see [@l8b/assets README](/packages/core/assets/README.md).

## System

The `system` object provides system information and flow control.

### Information

- `system.time`: Current time in milliseconds (since January 1, 1970).
- `system.fps`: Current effective frame rate.
- `system.cpu_load`: Current CPU load (0.0 to 1.0).
- `system.update_rate`: Update rate (updates per second).
- `system.language`: User's preferred language (e.g., "en", "id").
- `system.loading`: Loading progress (0 to 100).

### Input Availability

- `system.inputs.keyboard`: Returns `1` if keyboard is available.
- `system.inputs.mouse`: Returns `1` if mouse pointer is available.
- `system.inputs.touch`: Returns `1` if touch screen is available.
- `system.inputs.gamepad`: Returns `1` if at least one gamepad is connected.

### Control Functions

#### `system.say(message)`

Displays a message dialog.

```lua
system.say("Game Over!")
```

#### `system.prompt(message, callback)`

Displays a text input dialog.

```lua
system.prompt("What is your name?", function(result)
  if result then
    playerName = result
  end
end)
```

#### `system.pause()`

Pauses program execution (only in development environment).

#### `system.exit()`

Exits the program.

### Additional Properties

- `system.file.dropped`: `1` if a file was dropped (drag and drop).
- `system.javascript`: Object for JavaScript interoperability.
- `system.threads`: Array of active threads.
- `system.disable_autofullscreen`: Set to `1` to disable automatic fullscreen.
- `system.preemptive`: Set to `1` to enable preemptive threading (default: `1`).

For complete System API documentation, see [@l8b/time README](/packages/core/time/README.md).

## Storage

The `storage` object enables persistent data storage. Data remains saved even after the browser is closed.

### `storage.set(name, value)`

Saves a value permanently. Value can be a number, string, list, or object.

```lua
storage.set("highscore", 5000)
storage.set("settings", {sound: true, music: false})
```

### `storage.get(name)`

Retrieves a saved value. Returns `null` if data is not found.

```lua
highscore = storage.get("highscore")
if not highscore then highscore = 0 end
```

## Palette

Palette allows you to manage color palettes for your game. Useful for visual effects like palette swapping or color cycling.

### Creating Palette

```lua
// Create empty palette
palette = Palette({})

// Create with colors
palette = Palette({
  name: "Game Palette",
  colors: ["#000000", "#FF0000", "#00FF00", "#0000FF"]
})
```

### Using Palette

#### `palette.get(index)`

Gets color by index. Returns hex string like `"#FF0000"`.

#### `palette.getRGB(index)`

Gets color as RGB object `{r, g, b}` with values 0-255.

#### `palette.set(index, color)`

Sets color at index. Color must be in hex format like `"#FF0000"`.

#### `palette.add(color)`

Adds a new color to the palette and returns the new index.

#### `palette.remove(index)`

Removes color at index.

#### `palette.setPalette(colors)`

Replaces the entire palette with a new array of colors.

### Palette Effects

#### `palette.lighten(index, amount?)`

Lightens a color. `amount` between 0-1 (default: 0.2).

#### `palette.darken(index, amount?)`

Darkens a color. `amount` between 0-1 (default: 0.2).

#### `palette.mix(index1, index2, ratio?)`

Mixes two colors. `ratio` between 0-1 (default: 0.5).

#### `palette.gradient(startIndex, endIndex, steps)`

Creates a gradient array between two colors.

#### `palette.findClosest(hexColor)`

Finds the index of the color closest to the given hex color.

### Utility

- `palette.size`: Number of colors in palette
- `palette.paletteName`: Palette name
- `palette.getAll()`: Get all colors as array
- `Palette.rgbToHex(r, g, b)`: Static method to convert RGB to hex string

For complete Palette API documentation, see [@l8b/palette README](/packages/core/palette/README.md).

## Scene Management

The scene management system allows you to organize your game into separate scenes with URL-based routing.

### Defining Scene

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

### Routing

Use the `route()` function to map paths to scenes:

```lua
route("/", "home")                    // Root path to home scene
route("/game", "game")                 // /game path to game scene
route("/player/:id", "player")         // Path with parameter :id
route("/game/:level/:difficulty", "game")  // Multiple parameters
```

Route parameters are passed to `onEnter` as an object:

```lua
scene("player", object
  onEnter = function(self, params)
    playerId = params.id  // Get :id parameter from route
    print("Viewing player: " + playerId)
  end
end)
```

### Router API

The `router` object provides navigation and routing information:

#### `router.push(path)`

Navigate to a new path (adds to browser history).

```lua
router.push("/game")           // Navigate to /game
router.push("/player/42")      // Navigate with parameter
```

#### `router.replace(path)`

Replace current path without adding to history.

```lua
router.replace("/menu")  // Replace without adding to history
```

#### `router.back()`

Go back to the previous page in history.

```lua
if keyboard.press.ESCAPE == 1 then
  router.back()
end
```

#### Router Properties

- `router.path`: Current path
- `router.params`: Current route parameters (object)
- `router.sceneName`: Current scene name

For complete Scene API documentation, see [@l8b/scene README](/packages/core/scene/README.md).

## Sprites

### Creating Sprites

```lua
sprite = Sprite(32, 32)  // Create a new 32x32 sprite
```

### Sprite Properties

- `sprite.width`, `sprite.height`: Sprite dimensions
- `sprite.frames`: Array of animation frames
- `sprite.fps`: Animation frames per second
- `sprite.ready`: `1` if sprite is ready, `0` if not

### Sprite Methods

- `sprite.setFPS(fps)`: Set animation speed
- `sprite.setFrame(frame)`: Set current animation frame
- `sprite.getFrame()`: Get current animation frame
- `sprite.getCurrentFrameCanvas()`: Get canvas of current frame

For complete Sprites API documentation, see [@l8b/sprites README](/packages/core/sprites/README.md).

## Maps

### Creating Maps

```lua
map = Map(20, 15, 16, 16)  // 20x15 tiles, 16x16 pixels per tile
```

### Map Methods

- `map.set(x, y, ref)`: Set tile at position (x, y) to sprite reference
- `map.get(x, y)`: Get tile at position (x, y)
- `map.clear()`: Clear all tiles
- `map.draw(context, x, y, w, h)`: Draw map to canvas context
- `map.update()`: Force update the map's internal canvas
- `map.loadFile(url, callback?)`: Load map from JSON file
- `map.load(data, sprites)`: Load map from JSON string
- `map.clone()`: Create a copy of the map
- `map.copyFrom(map)`: Copy data from another map

### Helper Functions

- `loadMap(url, sprites?, callback?)`: Load map from URL
- `updateMap(map, data, sprites?)`: Update existing map with new data
- `saveMap(map)`: Save map data to JSON string

For complete Map API documentation, see [@l8b/map README](/packages/core/map/README.md).

## Images

### Creating Images

```lua
image = Image(100, 100)  // Create a 100x100 image
// Or from existing image/canvas
image = Image(imageElement)
image = Image(canvasElement)
```

### Image Properties

- `image.width`, `image.height`: Image dimensions
- `image.canvas`: Canvas element
- `image.context`: Rendering context

### Pixel Operations

- `image.setRGB(x, y, r, g, b)`: Set pixel color (RGB)
- `image.setRGBA(x, y, r, g, b, a)`: Set pixel color with alpha
- `image.getRGB(x, y)`: Get pixel color as RGB object
- `image.getRGBA(x, y)`: Get pixel color as RGBA object

### Drawing on Images

Images support the same drawing API as screen:

- `image.clear(color)`, `image.setColor(color)`, `image.setAlpha(alpha)`
- `image.fillRect()`, `image.drawRect()`, `image.drawLine()`, etc.
- `image.drawSprite()`, `image.drawText()`, `image.drawMap()`

For complete Image API documentation, see [@l8b/sprites README](/packages/core/sprites/README.md).

## Standard Library

L8B provides standard library utilities accessible as global objects: `Math`, `String`, `List`, and `JSON`.

### Math

#### Basic Functions

- `Math.abs(x)`, `Math.sqrt(x)`, `Math.floor(x)`, `Math.ceil(x)`, `Math.round(x)`
- `Math.min(...args)`, `Math.max(...args)`, `Math.pow(base, exp)`
- `Math.log(x)`, `Math.exp(x)`

#### Trigonometry

- `Math.sin(x)`, `Math.cos(x)`, `Math.tan(x)`: Functions in radians
- `Math.asin(x)`, `Math.acos(x)`, `Math.atan(x)`: Inverse functions
- `Math.atan2(y, x)`: Arc tangent 2

#### Angle Conversion

- `Math.degToRad(degrees)`: Convert degrees to radians
- `Math.radToDeg(radians)`: Convert radians to degrees

#### Random

- `Math.random()`: Random number [0..1)
- `Math.randomInt(min, max)`: Random integer [min..max]
- `Math.randomFloat(min, max)`: Random float [min..max)

#### Game Utilities

- `Math.clamp(value, min, max)`: Clamp value between min and max
- `Math.lerp(a, b, t)`: Linear interpolation
- `Math.distance(x1, y1, x2, y2)`: Distance between two points
- `Math.distance3D(x1, y1, z1, x2, y2, z2)`: 3D distance
- `Math.angleBetween(x1, y1, x2, y2)`: Angle between two points (radians)
- `Math.sign(x)`: Sign of number (-1, 0, or 1)
- `Math.mod(n, m)`: Euclidean modulo

#### Constants

- `Math.PI`: Pi (3.14159...)
- `Math.E`: Euler's number (2.71828...)

### String

#### Split & Join

- `String.split(str, separator)`: Split string into array
- `String.join(arr, separator)`: Join array into string

#### Trim

- `String.trim(str)`: Remove whitespace from both ends
- `String.trimStart(str)`: Remove whitespace from start
- `String.trimEnd(str)`: Remove whitespace from end

#### Replace

- `String.replace(str, search, replacement)`: Replace first occurrence
- `String.replaceAll(str, search, replacement)`: Replace all occurrences

#### Case

- `String.toLowerCase(str)`: Convert to lowercase
- `String.toUpperCase(str)`: Convert to uppercase

#### Search

- `String.startsWith(str, prefix)`: Check if starts with prefix
- `String.endsWith(str, suffix)`: Check if ends with suffix
- `String.contains(str, search)`: Check if contains substring
- `String.indexOf(str, search, fromIndex?)`: Find first occurrence index
- `String.lastIndexOf(str, search, fromIndex?)`: Find last occurrence index

#### Substring

- `String.substring(str, start, end)`: Extract substring
- `String.slice(str, start, end)`: Extract substring (slice)

#### Character

- `String.charAt(str, index)`: Get character at index
- `String.charCodeAt(str, index)`: Get character code
- `String.fromCharCode(...codes)`: Create string from character codes

#### Formatting

- `String.repeat(str, count)`: Repeat string
- `String.padStart(str, length, pad)`: Pad start with character
- `String.padEnd(str, length, pad)`: Pad end with character
- `String.format(template, ...args)`: Format string with placeholders `{0}`, `{1}`, etc.

#### Parse

- `String.parseInt(str, radix?)`: Parse integer
- `String.parseFloat(str)`: Parse float

### List (Array)

#### Functional Methods

- `List.map(arr, fn)`: Map array elements
- `List.filter(arr, fn)`: Filter array elements
- `List.reduce(arr, fn, initial)`: Reduce array to single value
- `List.find(arr, fn)`: Find first matching element
- `List.findIndex(arr, fn)`: Find index of first match
- `List.some(arr, fn)`: Check if any element matches
- `List.every(arr, fn)`: Check if all elements match

#### Manipulation (Non-mutating)

- `List.reverse(arr)`: Reverse array (returns new array)
- `List.sort(arr, fn?)`: Sort array (returns new array)
- `List.slice(arr, start, end)`: Extract subarray
- `List.concat(...arrays)`: Concatenate arrays
- `List.flat(arr, depth?)`: Flatten nested arrays
- `List.flatMap(arr, fn)`: Map and flatten

#### Search

- `List.indexOf(arr, item, fromIndex?)`: Find index of item
- `List.lastIndexOf(arr, item, fromIndex?)`: Find last index of item
- `List.includes(arr, item, fromIndex?)`: Check if array includes item

#### Access

- `List.first(arr)`: Get first element
- `List.last(arr)`: Get last element
- `List.at(arr, index)`: Get element at index (supports negative)

#### Mutating Methods

- `List.push(arr, ...items)`: Add items to end (mutates)
- `List.pop(arr)`: Remove and return last element
- `List.shift(arr)`: Remove and return first element
- `List.unshift(arr, ...items)`: Add items to start (mutates)
- `List.splice(arr, start, deleteCount, ...items)`: Insert/remove elements

#### Utilities

- `List.fill(arr, value, start?, end?)`: Fill array with value (returns new)
- `List.join(arr, separator)`: Join array into string
- `List.unique(arr)`: Remove duplicates (returns new)
- `List.shuffle(arr)`: Shuffle array (returns new)
- `List.chunk(arr, size)`: Split into chunks
- `List.sum(arr)`: Sum of numbers
- `List.average(arr)`: Average of numbers
- `List.min(arr)`: Minimum value
- `List.max(arr)`: Maximum value

### JSON

- `JSON.encode(value)`: Encode value to JSON string
- `JSON.decode(json)`: Decode JSON string to value
- `JSON.pretty(value, indent?)`: Pretty-print JSON with indentation

### Standard Library Examples

```lua
// Math examples
distance = Math.distance(0, 0, 10, 10)
angle = Math.angleBetween(0, 0, 10, 10)
clamped = Math.clamp(value, 0, 100)
randomNum = Math.randomInt(1, 10)

// String examples
parts = String.split("hello,world", ",")
joined = String.join(["a", "b", "c"], "-")
formatted = String.format("Hello {0}, you have {1} points", "Player", 100)

// List examples
doubled = List.map([1, 2, 3], function(x) return x * 2 end)
evens = List.filter([1, 2, 3, 4], function(x) return x % 2 == 0 end)
sum = List.sum([1, 2, 3, 4, 5])
shuffled = List.shuffle([1, 2, 3, 4, 5])

// JSON examples
jsonStr = JSON.encode({name: "Player", score: 100})
data = JSON.decode(jsonStr)
pretty = JSON.pretty({x: 1, y: 2}, 2)
```

## Additional Resources

For detailed API documentation with complete method signatures, parameters, return types, and examples, see the individual package READMEs:

- [@l8b/screen](/packages/core/screen/README.md) - Screen rendering API
- [@l8b/audio](/packages/core/audio/README.md) - Audio playback API
- [@l8b/input](/packages/core/input/README.md) - Input handling API
- [@l8b/assets](/packages/core/assets/README.md) - Asset loading API
- [@l8b/sprites](/packages/core/sprites/README.md) - Sprite and Image API
- [@l8b/map](/packages/core/map/README.md) - Map API
- [@l8b/palette](/packages/core/palette/README.md) - Palette API
- [@l8b/scene](/packages/core/scene/README.md) - Scene management API
- [@l8b/time](/packages/core/time/README.md) - System API
