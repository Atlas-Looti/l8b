# @al8b/time

**LootiScript API Binding** - System information and timing utilities.

> **Note**: This package is used as an API binding for LootiScript in the l8b engine.

## API Reference

### system

Global object providing system information and utilities.

### System Properties

#### system.time

Get current time in milliseconds since epoch.

```lua
local currentTime = system.time
// Returns: 1701234567890
```

#### system.fps

Get current frames per second.

```lua
local fps = system.fps
// Returns: 60
```

#### system.cpu_load

Get CPU load (0.0 to 1.0).

```lua
local load = system.cpu_load
// Returns: 0.45
```

#### system.update_rate

Get update rate (updates per second).

```lua
local rate = system.update_rate
// Returns: 60
```

#### system.language

Get browser/system language.

```lua
local lang = system.language
// Returns: "en-US"
```

#### system.loading

Get loading progress (0 to 100).

```lua
local progress = system.loading
// Returns: 100 (when fully loaded)

// Check if still loading
if system.loading < 100 then
  // Show loading screen
end
```

### Input Availability

#### system.inputs.keyboard

Check if keyboard is available.

```lua
if system.inputs.keyboard == 1 then
  // Keyboard is available
end
```

#### system.inputs.mouse

Check if mouse is available.

```lua
if system.inputs.mouse == 1 then
  // Mouse is available
end
```

#### system.inputs.touch

Check if touch is available.

```lua
if system.inputs.touch == 1 then
  // Touch screen is available
  // Show touch controls
end
```

#### system.inputs.gamepad

Check if gamepad is available.

```lua
if system.inputs.gamepad == 1 then
  // Gamepad API is available
  // Show gamepad controls
end
```

### System Functions

#### system.pause()

Pause the game execution.

```lua
system.pause()
```

#### system.exit()

Exit the game (close window).

```lua
system.exit()
```

#### system.prompt()

Show a prompt dialog and get user input.

```lua
system.prompt("Enter your name:", function(result)
  Console.log("Hello " .. result)
  playerName = result
end)
```

**Parameters:**
- `text` (string) - Prompt message
- `callback` (function) - Called with user input

#### system.say()

Show an alert dialog.

```lua
system.say("Game Over!")
system.say("You won! Score: " .. score)
```

**Parameters:**
- `text` (string) - Alert message

### File Drop Support

#### system.file.dropped

Check if a file was dropped (drag and drop).

```lua
if system.file.dropped == 1 then
  // File was dropped
  // Handle file
end
```

### JavaScript Interop

#### system.javascript

Object for JavaScript interoperability.

```lua
// Access JavaScript functions
system.javascript.myFunction()

// Access JavaScript objects
local value = system.javascript.myObject.property
```

### Thread Management

#### system.threads

Array of active threads.

```lua
local threadCount = #system.threads
Console.log("Active threads: " .. threadCount)
```

### Additional Flags

#### system.disable_autofullscreen

Disable automatic fullscreen.

```lua
system.disable_autofullscreen = 1  // Disable
system.disable_autofullscreen = 0  // Enable
```

#### system.preemptive

Enable preemptive threading.

```lua
system.preemptive = 1  // Enable
system.preemptive = 0  // Disable
```

## Example Usage

### Loading Screen

```lua
function draw()
  if system.loading < 100 then
    // Show loading screen
    screen.clear("#000")
    screen.setColor("#FFF")
    screen.drawText("Loading...", 10, 10, 16)
    
    // Draw progress bar
    local progress = system.loading / 100
    screen.fillRect(10, 30, progress * 200, 10, "#0F0")
    screen.drawRect(10, 30, 200, 10, "#FFF")
  else
    // Game is loaded, draw game
    drawGame()
  end
end
```

### FPS Counter

```lua
function draw()
  screen.clear("#000")
  
  // Draw FPS
  screen.setColor("#FFFF00")
  screen.drawText("FPS: " .. system.fps, 10, 10, 12)
  
  // Draw game
  drawGame()
end
```

### Input Detection

```lua
function init()
  // Detect available inputs
  if system.inputs.touch == 1 then
    Console.log("Touch controls available")
    showTouchControls = true
  end
  
  if system.inputs.gamepad == 1 then
    Console.log("Gamepad available")
    showGamepadHints = true
  end
end
```

### User Input

```lua
function showNamePrompt()
  system.prompt("Enter your name:", function(name)
    if name ~= "" then
      playerName = name
      system.say("Welcome, " .. name .. "!")
      startGame()
    end
  end)
end
```

### Pause Menu

```lua
local paused = false

function update()
  if keyboard.press.ESCAPE == 1 then
    if paused then
      // Resume
      paused = false
    else
      // Pause
      paused = true
      system.pause()
    end
  end
  
  if not paused then
    // Update game logic
    updateGame()
  end
end
```

### Platform Detection

```lua
function init()
  // Check platform capabilities
  local isMobile = system.inputs.touch == 1
  local hasGamepad = system.inputs.gamepad == 1
  
  if isMobile then
    // Setup mobile controls
    setupTouchControls()
  else
    // Setup desktop controls
    setupKeyboardControls()
  end
  
  if hasGamepad then
    // Enable gamepad support
    enableGamepad()
  end
  
  // Log system info
  Console.log("Language: " .. system.language)
  Console.log("Update rate: " .. system.update_rate)
end
```

### Time-Based Events

```lua
local startTime = 0
local eventTriggered = false

function init()
  startTime = system.time
end

function update()
  local elapsed = system.time - startTime
  
  // Trigger event after 5 seconds (5000ms)
  if elapsed > 5000 and not eventTriggered then
    system.say("5 seconds have passed!")
    eventTriggered = true
  end
end
```
