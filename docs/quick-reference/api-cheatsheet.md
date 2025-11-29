# API Cheatsheet

Quick reference untuk L8B API

## Drawing

### Screen

| Member | Description |
|--------|-------------|
| `screen.width` | The current width of the screen in L8B coordinate units |
| `screen.height` | The current height of the screen in L8B coordinate units |
| `screen.clear([color])` | Clears the screen (fills it in black, or in the optional color argument passed) |
| `screen.setColor(color)` | Sets the color for subsequent drawing operations |
| `screen.setAlpha(opacity)` | Sets the opacity of subsequent drawing operations, in the range [0 .. 1] |
| `screen.setBlending(blending)` | Sets the blending mode for subsequent drawing operations |
| `screen.setLinearGradient(x1, y1, x2, y2, color1, color2)` | Sets a linear gradient for subsequent drawing operations |
| `screen.setRadialGradient(x, y, radius, color1, color2)` | Sets a radial gradient for subsequent drawing operations |
| `screen.setFont(font_name)` | Sets the name of the font to use for subsequent text drawing operations |
| `screen.setTranslation(tx, ty)` | Translates the screen coordinates |
| `screen.setScale(sx, sy)` | Scales the screen coordinates |
| `screen.setRotation(rotation)` | Rotates the screen coordinates |
| `screen.setDrawAnchor(x, y)` | Sets the anchor (pivot) point for drawing elements. Range for x and y: [-1 .. 1] |
| `screen.setDrawRotation(rotation)` | Sets a rotation angle for drawing elements, around their anchor point |
| `screen.setDrawScale(x, y)` | Sets the drawing scale for elements, on their x-axis and y-axis |
| `screen.fillRect(x, y, width, height [,color])` | Draws a filled rectangle |
| `screen.fillRoundRect(x, y, width, height, roundness [,color])` | Draws a filled rounded rectangle |
| `screen.fillRound(x, y, width, height [,color])` | Draws a filled round shape (ellipse or circle depending on your arguments) |
| `screen.drawRect(x, y, width, height [,color])` | Draws a rectangle outline |
| `screen.drawRoundRect(x, y, width, height, roundness [,color])` | Draws a rounded rectangle outline |
| `screen.drawRound(x, y, width, height [,color])` | Draws a round shape outline (ellipse or circle depending on your arguments) |
| `screen.drawSprite(name, x, y, width [,height])` | Draws a sprite at given coordinates |
| `screen.drawSpritePart(name, px, py, pw, ph, x, y, width [,height])` | Draws an area of this sprite at given coordinates |
| `screen.drawImage(image, x, y, width [,height])` | Draws an image at given coordinates |
| `screen.drawImagePart(image, px, py, pw, ph, x, y, width [,height])` | Draws an area of the image at given coordinates |
| `screen.drawMap(name, x, y, width [,height])` | Draws a map at given coordinates |
| `screen.setPixelated(pixelated)` | Sets how sprites or images must be rendered: pixelated or smoothed |
| `screen.drawText(text, x, y, size [,color])` | Draws text at given coordinates with given size |
| `screen.drawTextOutline(text, x, y, size [,color])` | Draws text outline at given coordinates with given size |
| `screen.textWidth(text, size)` | Returns the width of the given text when drawn at given size |
| `screen.setLineWidth(width)` | Sets the width of lines for subsequent drawing operations |
| `screen.setLineDash([2,4])` | Sets the line style, as an array of lines and gaps |
| `screen.drawLine(x1, y1, x2, y2 [,color])` | Draws a line |
| `screen.drawPolygon(x1, y1, x2, y2, x3, y3 ... [,color])` | The coordinates can also be passed as an array |
| `screen.drawPolyline(x1, y1, x2, y2, x3, y3 ... [,color])` | The coordinates can also be passed as an array |
| `screen.fillPolygon(x1, y1, x2, y2, x3, y3 ... [,color])` | The coordinates can also be passed as an array |
| `screen.drawArc(x, y, radius, start_angle, end_angle, counter_clockwise [,color])` | Draws an arc of a circle |
| `screen.fillArc(x, y, radius, start_angle, end_angle, counter_clockwise [,color])` | Fills an arc of a circle |
| `screen.drawQuadCurve(x1, y1, cp1x, cp1y, x2, y2, ... [,color])` | You can pass as many points as needed; you can pass all the points as an array |
| `screen.drawBezierCurve(x1, y1, cp1x, cp1y, cp2x, cp2y, x2, y2, ... [,color])` | You can pass as many points as needed; you can pass all the points as an array |
| `screen.setCursorVisible(visible)` | Sets whether the mouse cursor should be visible |
| `screen.loadFont(fontname)` | Initiates the loading of a font |
| `screen.isFontReady(fontname)` | Checks whether the font is ready to use |
| `screen.tri(x1, y1, x2, y2, x3, y3 [,color])` | Draws a filled triangle |
| `screen.trib(x1, y1, x2, y2, x3, y3 [,color])` | Draws a triangle outline |
| `screen.ttri(x1, y1, x2, y2, x3, y3, u1, v1, u2, v2, u3, v3, texture [,textureSource, z1, z2, z3, useDepth])` | Draws a textured triangle with UV coordinates |

### Colors

```lua
"rgb(128,160,196)"
"rgba(128,160,196,0.5)"
"#8090A0"
"hsl(200,50%,50%)"
"hsla(200,50%,50%,0.25)"
```

### Blending Modes

| Mode | Mode | Mode | Mode | Mode |
|------|------|------|------|------|
| `"normal"` | `"additive"` | `"source-out"` | `"source-atop"` | `"destination-over"` |
| `"destination-in"` | `"destination-out"` | `"destination-atop"` | `"lighter"` | `"copy"` |
| `"xor"` | `"multiply"` | `"screen"` | `"overlay"` | `"darken"` |
| `"lighten"` | `"color-dodge"` | `"color-burn"` | `"hard-light"` | `"soft-light"` |
| `"difference"` | `"exclusion"` | `"hue"` | `"saturation"` | `"color"` |
| `"luminosity"` | `"source-over"` | `"source-in"` | | |

See [MDN Canvas Blending Modes](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation)

## Inputs / Control

### Keyboard

| Member | Member | Member | Member |
|--------|--------|--------|--------|
| `keyboard.A` | `keyboard.B` | `keyboard.UP` | `keyboard.SPACE` |
| `keyboard.press.A` | `keyboard.press.B` | `keyboard.press.UP` | `keyboard.press.SPACE` |
| `keyboard.release.A` | `keyboard.release.B` | `keyboard.release.UP` | `keyboard.release.SPACE` |

### Gamepad

| Member | Member | Member |
|--------|--------|--------|
| `gamepad.A` | `gamepad.B` | `gamepad.X` |
| `gamepad.Y` | `gamepad.LB` | `gamepad.RB` |
| `gamepad.VIEW` | `gamepad.MENU` | `gamepad.LS` |
| `gamepad.RS` | `gamepad.DPAD_UP` | `gamepad.DPAD_DOWN` |
| `gamepad.DPAD_LEFT` | `gamepad.DPAD_RIGHT` | `gamepad.LT` |
| `gamepad.RT` | `gamepad.UP` | `gamepad.DOWN` |
| `gamepad.LEFT` | `gamepad.RIGHT` | `gamepad.LEFT_STICK_UP` |
| `gamepad.LEFT_STICK_DOWN` | `gamepad.LEFT_STICK_LEFT` | `gamepad.LEFT_STICK_RIGHT` |
| `gamepad.RIGHT_STICK_UP` | `gamepad.RIGHT_STICK_DOWN` | `gamepad.RIGHT_STICK_LEFT` |
| `gamepad.RIGHT_STICK_RIGHT` | `gamepad.LEFT_STICK_ANGLE` | `gamepad.LEFT_STICK_AMOUNT` |
| `gamepad.RIGHT_STICK_ANGLE` | `gamepad.RIGHT_STICK_AMOUNT` | |

**Gamepad Events:**

```lua
gamepad.press.A  // (B, X, Y ...)
gamepad.release.A  // (B, X, Y ...)
gamepad[0].A  // (B, X, Y ...)
gamepad[1].A  // (B, X, Y ...)
gamepad[2].press.A  // (B, X, Y ...)
gamepad[3].release.A  // (B, X, Y ...)
```

### Touch

| Member | Description |
|--------|-------------|
| `touch.touching` | |
| `touch.press` | |
| `touch.release` | |
| `touch.x` | |
| `touch.y` | |
| `touch.touches` | List of all current active touches |

### Mouse

| Member | Description |
|--------|-------------|
| `mouse.x` | Current mouse pointer position x |
| `mouse.y` | Current mouse pointer position y |
| `mouse.pressed` | 1 if any mouse button is pressed, else 0 |
| `mouse.left` | 1 if left mouse button is pressed, else 0 |
| `mouse.middle` | 1 if middle mouse button is pressed, else 0 |
| `mouse.right` | 1 if right mouse button is pressed, else 0 |
| `mouse.wheel` | Value can be 1 (up), -1 (down) or 0 |
| `mouse.press` | 1 if any mouse button was just first pressed |
| `mouse.release` | 1 when the last active mouse button was just released |

## Assets

### Asset Manager

| Method | Description |
|--------|-------------|
| `Assets.loadFont(font)` | Initiates loading of the font asset (from `assets/{font}.ttf`) |
| `Assets.loadImage(path, callback?)` | Loads image, returns a loader object with `ready` and `image` properties |
| `Assets.loadJSON(path, callback?)` | Loads JSON file, returns a loader object with `ready` and `data` properties |
| `Assets.loadText(path, callback?, ext?)` | Loads text file, returns a loader object with `ready` and `text` properties |
| `Assets.loadCSV(path, callback?)` | Loads CSV file (shorthand for `loadText` with `.csv` extension) |
| `Assets.loadMarkdown(path, callback?)` | Loads Markdown file (shorthand for `loadText` with `.md` extension) |

**Note:** 3D Models and WASM are not supported in L8B (2D only).

## Misc

### System

| Member | Description |
|--------|-------------|
| `system.time` | Returns the system time in milliseconds (time elapsed since January 1st 1970) |
| `system.language` | Returns the language of the user |
| `system.inputs` | Allows to check which input methods are available on the user's system |
| `system.inputs.keyboard` | Returns 1 if the user's system has a keyboard |
| `system.inputs.mouse` | Returns 1 if the user's system has a mouse pointer |
| `system.inputs.touch` | Returns 1 if the user's system has a touch screen |
| `system.inputs.gamepad` | Returns 1 if there is at least one plugged in, active gamepad |
| `system.prompt(text, callback)` | Prompts the user to enter text and calls callback with result |
| `system.say(text)` | Displays a message to the user, in a dialog box |
| `system.pause()` | Pauses execution |
| `system.exit()` | Exits the program |
| `system.preemptive` | Set to 1 by default, can be set to 0 to make the threading system non-preemptive |
| `system.threads` | Holds a list of all the active threads (running or paused) |
| `system.update_rate` | Writable call rate of update(), example: `system.update_rate = 120` |
| `system.fps` | Current frames per second |
| `system.cpu_load` | Current CPU load |
| `system.loading` | Loading progress (0-100) |

### Storage

Persistent storage untuk menyimpan data yang tetap tersimpan meskipun browser ditutup. Menggunakan localStorage dengan batched writes dan caching.

| Method | Description |
|--------|-------------|
| `storage.set(name, value)` | Menyimpan nilai secara permanen. Value bisa berupa number, string, list, atau object. Writes are batched for performance. |
| `storage.get(name)` | Mengambil nilai yang tersimpan. Mengembalikan `null` jika data tidak ditemukan. |

**Example:**

```lua
// Save data
storage.set("highscore", 5000)
storage.set("settings", {sound: true, music: false, difficulty: "hard"})

// Load data
highscore = storage.get("highscore")
if !highscore then highscore = 0 end

settings = storage.get("settings")
if !settings then
  settings = {sound: true, music: true, difficulty: "normal"}
end
```

## Images

### Create Image

```lua
image = new Image(width, height)
// Or with centered, y-axis up coordinate system:
image = new Image(width, height, true)
```

**Note:** The default coordinates system for drawing into an image differs a lot from drawing on screen. When drawing on an image, the default unit is one pixel; the origin is set to the upper left corner of the image. The y-axis is oriented downwards.

### Draw on Image

| Member | Description |
|--------|-------------|
| `image.width` | Width of the image in pixels |
| `image.height` | Height of the image in pixels |
| `image.clear([color])` | Clears the image |
| `image.setRGB(x, y, r, g, b)` | Sets pixel color |
| `image.setRGBA(x, y, r, g, b, a)` | Sets pixel color and opacity |
| `image.getRGB(x, y [,result])` | Returns pixel color as an object with R, G and B components |
| `image.getRGBA(x, y [,result])` | Returns pixel color as an object with R, G, B and A components |
| `image.setColor(color)` | Sets the color for subsequent drawing operations |
| `image.setAlpha(opacity)` | Sets the opacity of subsequent drawing operations, in the range [0 .. 1] |
| `image.setBlending(blending)` | Sets the blending mode for subsequent drawing operations |
| `image.setLinearGradient(x1, y1, x2, y2, color1, color2)` | Sets a linear gradient for subsequent drawing operations |
| `image.setRadialGradient(x, y, radius, color1, color2)` | Sets a radial gradient for subsequent drawing operations |
| `image.setFont(font_name)` | Sets the name of the font to use for subsequent text drawing operations |
| `image.setTranslation(tx, ty)` | Translates the image coordinates |
| `image.setScale(sx, sy)` | Scales the image coordinates |
| `image.setRotation(rotation)` | Rotates the image coordinates |
| `image.setDrawAnchor(x, y)` | Sets the anchor (pivot) point for drawing elements. Range for x and y: [-1 .. 1] |
| `image.setDrawRotation(rotation)` | Sets a rotation angle for drawing elements, around their anchor point |
| `image.setDrawScale(x, y)` | Sets the drawing scale for elements, on their x-axis and y-axis |
| `image.fillRect(x, y, width, height [,color])` | Draws a filled rectangle |
| `image.fillRoundRect(x, y, width, height, roundness [,color])` | Draws a filled rounded rectangle |
| `image.fillRound(x, y, width, height [,color])` | Draws a filled round shape (ellipse or circle depending on your arguments) |
| `image.drawRect(x, y, width, height [,color])` | Draws a rectangle outline |
| `image.drawRoundRect(x, y, width, height, roundness [,color])` | Draws a rounded rectangle outline |
| `image.drawRound(x, y, width, height [,color])` | Draws a round shape outline (ellipse or circle depending on your arguments) |
| `image.drawSprite(name, x, y, width [,height])` | Draws a sprite at given coordinates |
| `image.drawSpritePart(name, px, py, pw, ph, x, y, width [,height])` | Draws an area of this sprite at given coordinates |
| `image.drawImage(image, x, y, width [,height])` | Draws an image at given coordinates |
| `image.drawImagePart(image, px, py, pw, ph, x, y, width [,height])` | Draws an area of the image at given coordinates |
| `image.drawMap(name, x, y, width [,height])` | Draws a map at given coordinates |
| `image.setPixelated(pixelated)` | Sets how sprites or images must be rendered: pixelated or smoothed |
| `image.drawText(text, x, y, size [,color])` | Draws text at given coordinates with given size |
| `image.drawTextOutline(text, x, y, size [,color])` | Draws text outline at given coordinates with given size |
| `image.textWidth(text, size)` | Returns the width of the given text when drawn at given size |
| `image.setLineWidth(width)` | Sets the width of lines for subsequent drawing operations |
| `image.setLineDash([2,4])` | Sets the line style, as an array of lines and gaps |
| `image.drawLine(x1, y1, x2, y2)` | Draws a line |
| `image.drawPolygon(x1, y1, x2, y2, x3, y3 ... [,color])` | The coordinates can also be passed as an array |
| `image.drawPolyline(x1, y1, x2, y2, x3, y3 ... [,color])` | The coordinates can also be passed as an array |
| `image.fillPolygon(x1, y1, x2, y2, x3, y3 ... [,color])` | The coordinates can also be passed as an array |
| `image.drawArc(x, y, radius, start_angle, end_angle, counter_clockwise [,color])` | Draws an arc of a circle |
| `image.fillArc(x, y, radius, start_angle, end_angle, counter_clockwise [,color])` | Fills an arc of a circle |
| `image.drawQuadCurve(x1, y1, cp1x, cp1y, x2, y2, ... [,color])` | You can pass as many points as needed; you can pass all the points as an array |
| `image.drawBezierCurve(x1, y1, cp1x, cp1y, cp2x, cp2y, x2, y2, ... [,color])` | You can pass as many points as needed; you can pass all the points as an array |

### Save Image

**Note:** Image saving functionality is not currently implemented in L8B runtime.

## Sprites

### Create and Modify

```lua
sprite = new Sprite(width, height)  // Create a new sprite
sprite.fps = 10  // Change the animation speed in case of an animated sprite
sprite.setFPS(10)  // Change the animation speed while preserving the current phase
sprite.setFrame(0)  // Sets the current animation frame
sprite.getFrame()  // Gets the current animation frame
image = sprite.frames[0]  // Get the Image object of the first (or only) sprite frame
sprite.frames.push(image)  // Add a new frame to this sprite
```

## Maps

### Create Map

```lua
map = new Map(width_in_tiles, height_in_tiles, tile_pixel_width, tile_pixel_height)
```

### Map Functions

```lua
map = new Map(width_in_tiles, height_in_tiles, tile_pixel_width, tile_pixel_height)
map.get(x, y)  // Gets tile at position (x, y)
map.set(x, y, "sprite")  // Sets tile at position (x, y) to sprite
map.set(x, y, "tilemap:4,6")  // Sets tile using tilemap reference
map.clear()  // Clears all tiles
```

## Sounds

### Beeps

```lua
Audio.beep("C4 E G C5 E G")
Audio.beep("volume 50 span 50 tempo 240 loop 4 C4 E G C5 E G end")
Audio.cancelBeeps()
```

### Play Sounds

```lua
sound = Audio.playSound("mysound")  // Starts playing the sound "mysound" and returns a controller object
```

### Control Sound Playback

| Method | Description |
|--------|-------------|
| `sound.setVolume(volume)` | Sets the volume for the playback of the sound (0-1) |
| `sound.setPitch(pitch)` | Sets the pitch for the playback of the sound |
| `sound.setPan(pan)` | Sets the pan of the playing sound (-1 to 1) |
| `sound.getDuration()` | Returns the duration of the sound in seconds |
| `sound.stop()` | Stops the playback of the sound |
| `sound.finished` | Boolean indicating if the sound has finished playing |

### Play Music

```lua
music = Audio.playMusic("mymusic")  // Starts playing the music "mymusic" and returns a controller object
```

### Control Music Playback

| Method | Description |
|--------|-------------|
| `music.setVolume(volume)` | Sets the volume (0-1) |
| `music.stop()` | Stops the music |
| `music.play()` | Resumes/plays the music |
| `music.getDuration()` | Returns duration in seconds |
| `music.getPosition()` | Returns current position in seconds |
| `music.setPosition(position)` | Sets playback position in seconds |

### Create Sound

```lua
sound = new Sound(channels, length, sampleRate)  // Creates a procedural sound object
sound.write(channel, index, value)  // Writes sample data to buffer
sound.read(channel, index)  // Reads sample data from buffer
sound.play([volume, pitch, pan, loop])  // Plays the sound
```

## Palette

### Create Palette

```lua
palette = new Palette()  // Create empty palette
palette = new Palette({name: "My Palette", colors: ["#000000", "#FFFFFF"]})  // Create with colors
```

### Palette Methods

| Method | Description |
|--------|-------------|
| `palette.get(index)` | Get color by index (returns hex string like "#FF0000") |
| `palette.getRGB(index)` | Get color as RGB object `{r, g, b}` |
| `palette.set(index, color)` | Set color at index (color must be hex like "#FF0000") |
| `palette.add(color)` | Add color to palette, returns new index |
| `palette.remove(index)` | Remove color at index |
| `palette.setPalette(colors)` | Replace entire palette with array of hex colors |
| `palette.getAll()` | Get all colors as array |
| `palette.size` | Get palette size (number of colors) |
| `palette.paletteName` | Get palette name |
| `palette.findClosest(hexColor)` | Find closest color index to given hex color |
| `palette.gradient(startIndex, endIndex, steps)` | Create gradient array between two colors |
| `palette.lighten(index, amount)` | Lighten color (amount 0-1, default 0.2) |
| `palette.darken(index, amount)` | Darken color (amount 0-1, default 0.2) |
| `palette.mix(index1, index2, ratio)` | Mix two colors (ratio 0-1, default 0.5) |
| `palette.toData()` | Export palette data as object `{name, colors}` |
| `Palette.rgbToHex(r, g, b)` | Static method: Convert RGB to hex string |

### Palette Example

```lua
palette = new Palette({colors: ["#000000", "#FF0000", "#00FF00", "#0000FF"]})
screen.setColor(palette.get(1))  // Use red color
screen.fillRect(0, 0, 100, 100)

// Get RGB
rgb = palette.getRGB(2)  // {r: 0, g: 255, b: 0}
```

## Scene Management

### Register Scene

```lua
scene("home", object
  init = function()
    // Called once when scene is first registered
  end

  onEnter = function(params)
    // Called when scene becomes active
    // params contains route parameters if any
  end

  onLeave = function()
    // Called when scene is deactivated
  end

  update = function()
    // Called every frame
  end

  draw = function()
    // Called every frame
    screen.clear("black")
  end
end)
```

### Register Route

```lua
route("/", "home")  // Map path to scene name
route("/player/:id", "player")  // Route with parameter
route("/game/:level/:difficulty", "game")  // Multiple parameters
```

### Router API

| Member | Description |
|--------|-------------|
| `router.push(path)` | Navigate to path (adds to browser history) |
| `router.replace(path)` | Replace current path (doesn't add to history) |
| `router.back()` | Go back in browser history |
| `router.path` | Current path |
| `router.params` | Current route parameters (object) |
| `router.sceneName` | Current scene name |
| `router.getPath()` | Get current path (function) |
| `router.getParams()` | Get current route parameters (function) |
| `router.getSceneName()` | Get current scene name (function) |

### Scene API

| Method | Description |
|--------|-------------|
| `scene(name, definition)` | Register a scene with lifecycle methods |
| `route(path, sceneName)` | Register a route mapping path to scene |
| `scenes.goto(name, params)` | Navigate to scene by name (params optional) |
| `scenes.current()` | Get current active scene name |

### Scene Example

```lua
// Define routes
route("/", "home")
route("/game", "game")
route("/player/:id", "player")

// Define home scene
scene("home", object
  update = function()
    if keyboard.press.SPACE then
      router.push("/game")
    end
  end

  draw = function()
    screen.clear("blue")
    screen.drawText("Press SPACE to start", 0, 0, 20)
  end
end)

// Define player scene with parameter
scene("player", object
  onEnter = function(params)
    playerId = params.id  // Get route parameter
  end

  update = function()
    if keyboard.press.ESCAPE then
      router.back()  // Go back to previous scene
    end
  end

  draw = function()
    screen.clear("green")
    screen.drawText("Player: " + playerId, 0, 0, 20)
  end
end)
```

## Farcaster Mini Apps APIs

### Player API

| Member | Description |
|--------|-------------|
| `player.fid` | Farcaster ID (number, 0 if not in Mini App) |
| `player.username` | Username (string, undefined if not available) |
| `player.displayName` | Display name (string, undefined if not available) |
| `player.pfpUrl` | Profile picture URL (string, undefined if not available) |
| `player.getFid()` | Get Farcaster ID |
| `player.getUsername()` | Get username |
| `player.getDisplayName()` | Get display name |
| `player.getPfpUrl()` | Get profile picture URL |
| `player.getContext()` | Get complete player context |
| `player.isInMiniApp()` | Check if running in Mini App (returns 1 or 0) |

### Wallet API

| Method | Description |
|--------|-------------|
| `wallet.isConnected()` | Check if wallet is connected (returns 1 or 0) |
| `wallet.connect()` | Connect wallet (async) |
| `wallet.getAddress()` | Get wallet address (async, returns string or null) |
| `wallet.getChainId()` | Get current chain ID (async, returns number) |
| `wallet.sendTransaction(tx)` | Send transaction (async, returns hash) |
| `wallet.signMessage(message)` | Sign message (async, returns signature) |
| `wallet.sendBatch(calls)` | Send batch transactions EIP-5792 (async, returns {hash, transactions}) |
| `wallet.switchChain(chainId)` | Switch to different chain (async) |
| `wallet.waitForTx(hash, confirmations?, timeout?)` | Wait for transaction confirmation (async) |

**Transaction Request:**
```lua
{
  to = "0x...",      // Recipient address (required)
  value = "0x0",     // Amount in wei (hex string, optional)
  data = "0x...",    // Transaction data (hex string, optional)
  gas = "0x5208",    // Gas limit (hex string, optional)
  gasPrice = "0x3b9aca00"  // Gas price (hex string, optional)
}
```

### EVM API

| Method | Description |
|--------|-------------|
| `evm.read(address, abi, functionName, args?)` | Read from contract (async, no transaction) |
| `evm.write(address, abi, functionName, args?)` | Write to contract (async, sends transaction) |
| `evm.call(address, abi, functionName, args?)` | Simulate contract call (async, no transaction) |
| `evm.getBalance(address?)` | Get balance in wei (async, returns string) |
| `evm.formatEther(value)` | Convert wei to ether (returns string) |
| `evm.parseEther(value)` | Convert ether to wei (returns string) |

### Actions API

| Method | Description |
|--------|-------------|
| `actions.ready(disableNativeGestures?)` | Hide splash screen (async) |
| `actions.close()` | Close Mini App (async) |
| `actions.share({text?, embeds?})` | Share content (async) |
| `actions.signIn({nonce, acceptAuthAddress?})` | Sign in with Farcaster (async, returns {signature, message}) |
| `actions.addMiniApp()` | Prompt user to add Mini App (async) |
| `actions.openMiniApp({url})` | Open another Mini App (async) |
| `actions.openUrl({url})` | Open external URL (async) |
| `actions.viewProfile({fid})` | View Farcaster profile (async) |
| `actions.viewCast({hash, close?})` | View cast (async) |
| `actions.swapToken({sellToken?, buyToken?, sellAmount?})` | Open swap form (async) |
| `actions.sendToken({token?, amount?, recipientAddress?, recipientFid?})` | Open send form (async) |
| `actions.viewToken({token})` | View token (async) |
| `actions.composeCast({text?, embeds?, parent?, close?, channelKey?})` | Open cast composer (async) |

### HTTP API

| Method | Description |
|--------|-------------|
| `http.get(url, options?)` | GET request (async, returns HttpResponse) |
| `http.post(url, body?, options?)` | POST request (async, returns HttpResponse) |
| `http.put(url, body?, options?)` | PUT request (async, returns HttpResponse) |
| `http.delete(url, options?)` | DELETE request (async, returns HttpResponse) |
| `http.request(url, options)` | Custom request (async, returns HttpResponse) |

**Request Options:**
```lua
{
  method = "POST",           // HTTP method
  headers = {                // Request headers
    ["Authorization"] = "Bearer token"
  },
  body = {key = "value"},    // Request body (auto JSON stringified)
  timeout = 5000             // Timeout in ms (default: 30000)
}
```

**Response Object:**
| Property/Method | Description |
|----------------|-------------|
| `response.status` | HTTP status code (number) |
| `response.headers` | Response headers (table) |
| `response.ok()` | Check if OK (returns 1 or 0) |
| `response.json()` | Parse as JSON |
| `response.jsonOrThrow()` | Parse JSON, throws if not OK |
| `response.jsonOrNull()` | Parse JSON, returns null if error |
| `response.ensureOk()` | Ensure OK, throws if not |
| `response.text()` | Get as text |
| `response.data()` | Alias for text() |

## Standard Library

L8B provides standard library utilities accessible as global objects: `Math`, `String`, `List`, and `JSON`.

### Math

| Method | Description |
|--------|-------------|
| `Math.abs(x)` | Absolute value |
| `Math.sqrt(x)` | Square root |
| `Math.floor(x)` | Floor (round down) |
| `Math.ceil(x)` | Ceiling (round up) |
| `Math.round(x)` | Round to nearest integer |
| `Math.min(...args)` | Minimum value |
| `Math.max(...args)` | Maximum value |
| `Math.pow(base, exp)` | Power (base^exp) |
| `Math.exp(x)` | Exponential (e^x) |
| `Math.log(x)` | Natural logarithm |
| `Math.log10(x)` | Base 10 logarithm |
| `Math.sin(x)` | Sine (radians) |
| `Math.cos(x)` | Cosine (radians) |
| `Math.tan(x)` | Tangent (radians) |
| `Math.asin(x)` | Arc sine |
| `Math.acos(x)` | Arc cosine |
| `Math.atan(x)` | Arc tangent |
| `Math.atan2(y, x)` | Arc tangent 2 |
| `Math.random()` | Random number [0..1) |
| `Math.randomInt(min, max)` | Random integer [min..max] |
| `Math.randomFloat(min, max)` | Random float [min..max) |
| `Math.clamp(value, min, max)` | Clamp value between min and max |
| `Math.lerp(a, b, t)` | Linear interpolation |
| `Math.distance(x1, y1, x2, y2)` | Distance between two points |
| `Math.distance3D(x1, y1, z1, x2, y2, z2)` | 3D distance |
| `Math.angleBetween(x1, y1, x2, y2)` | Angle between two points (radians) |
| `Math.degToRad(degrees)` | Convert degrees to radians |
| `Math.radToDeg(radians)` | Convert radians to degrees |
| `Math.sign(x)` | Sign of number (-1, 0, or 1) |
| `Math.mod(n, m)` | Euclidean modulo |
| `Math.PI` | Pi constant |
| `Math.E` | Euler's number |

### String

| Method | Description |
|--------|-------------|
| `String.split(str, separator)` | Split string into array |
| `String.join(arr, separator)` | Join array into string |
| `String.trim(str)` | Remove whitespace from both ends |
| `String.trimStart(str)` | Remove whitespace from start |
| `String.trimEnd(str)` | Remove whitespace from end |
| `String.replace(str, search, replacement)` | Replace first occurrence |
| `String.replaceAll(str, search, replacement)` | Replace all occurrences |
| `String.startsWith(str, prefix)` | Check if starts with prefix |
| `String.endsWith(str, suffix)` | Check if ends with suffix |
| `String.contains(str, search)` | Check if contains substring |
| `String.toLowerCase(str)` | Convert to lowercase |
| `String.toUpperCase(str)` | Convert to uppercase |
| `String.charAt(str, index)` | Get character at index |
| `String.charCodeAt(str, index)` | Get character code at index |
| `String.fromCharCode(...codes)` | Create string from character codes |
| `String.substring(str, start, end)` | Extract substring |
| `String.slice(str, start, end)` | Extract substring (slice) |
| `String.indexOf(str, search, fromIndex)` | Find first occurrence |
| `String.lastIndexOf(str, search, fromIndex)` | Find last occurrence |
| `String.repeat(str, count)` | Repeat string |
| `String.padStart(str, length, pad)` | Pad start with character |
| `String.padEnd(str, length, pad)` | Pad end with character |
| `String.length(str)` | Get string length |
| `String.parseInt(str, radix)` | Parse integer |
| `String.parseFloat(str)` | Parse float |
| `String.format(template, ...args)` | Format string with placeholders `{0}`, `{1}`, etc. |

### List (Array)

| Method | Description |
|--------|-------------|
| `List.map(arr, fn)` | Map array elements |
| `List.filter(arr, fn)` | Filter array elements |
| `List.reduce(arr, fn, initial)` | Reduce array to single value |
| `List.find(arr, fn)` | Find first matching element |
| `List.findIndex(arr, fn)` | Find index of first match |
| `List.some(arr, fn)` | Check if any element matches |
| `List.every(arr, fn)` | Check if all elements match |
| `List.reverse(arr)` | Reverse array (returns new array) |
| `List.sort(arr, fn)` | Sort array (returns new array) |
| `List.slice(arr, start, end)` | Extract subarray |
| `List.concat(...arrays)` | Concatenate arrays |
| `List.flat(arr, depth)` | Flatten nested arrays |
| `List.flatMap(arr, fn)` | Map and flatten |
| `List.indexOf(arr, item, fromIndex)` | Find index of item |
| `List.lastIndexOf(arr, item, fromIndex)` | Find last index of item |
| `List.includes(arr, item, fromIndex)` | Check if array includes item |
| `List.length(arr)` | Get array length |
| `List.first(arr)` | Get first element |
| `List.last(arr)` | Get last element |
| `List.at(arr, index)` | Get element at index (supports negative) |
| `List.push(arr, ...items)` | Add items to end (mutates) |
| `List.pop(arr)` | Remove and return last element |
| `List.shift(arr)` | Remove and return first element |
| `List.unshift(arr, ...items)` | Add items to start (mutates) |
| `List.splice(arr, start, deleteCount, ...items)` | Insert/remove elements |
| `List.fill(arr, value, start, end)` | Fill array with value (returns new) |
| `List.join(arr, separator)` | Join array into string |
| `List.unique(arr)` | Remove duplicates (returns new) |
| `List.shuffle(arr)` | Shuffle array (returns new) |
| `List.chunk(arr, size)` | Split into chunks |
| `List.sum(arr)` | Sum of numbers |
| `List.average(arr)` | Average of numbers |
| `List.min(arr)` | Minimum value |
| `List.max(arr)` | Maximum value |

### JSON

| Method | Description |
|--------|-------------|
| `JSON.encode(value)` | Encode value to JSON string |
| `JSON.decode(json)` | Decode JSON string to value |
| `JSON.pretty(value, indent)` | Pretty-print JSON with indentation |

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
