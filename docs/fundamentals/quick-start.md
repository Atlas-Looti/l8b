# Quick Start

This guide will help you get started with your first L8B game project. For an overview of L8B, see [What is L8B?](/).

## Project Setup

### Installation

Install L8B CLI as a dev dependency:

```bash
npm install l8b --save-dev
```

**Note:** The runtime is automatically bundled with your project. You don't need to install it separately.

Alternatively, use npx:

```bash
npx l8b init my-game
cd my-game
npm install
npx l8b dev
```

### Project Structure

L8B uses a standard project structure:

```text
my-game/
├── src/                   # LootiScript files (.loot)
│   └── main.loot         # Main game code
├── public/                # Static assets
│   ├── sprites/          # Sprite images (.png, .jpg, .webp)
│   ├── maps/             # Map files (.json)
│   ├── sounds/           # Sound effects (.mp3, .wav, .ogg)
│   ├── music/            # Music files (.mp3, .wav, .ogg)
│   └── fonts/            # Font files (.ttf)
├── l8b.config.json       # Project configuration
├── package.json
└── .l8b/                 # Build output (generated)
```

**Note:** All `.loot` files in the `src/` directory are automatically compiled and loaded.

### Configuration

The `l8b.config.json` file in the project root is used to configure metadata and behavior:

```json
{
  "name": "my-game",
  "orientation": "any",
  "aspect": "free",
  "width": 1920,
  "height": 1080,
  "dev": {
    "port": 3000,
    "host": "localhost"
  },
  "logging": {
    "browser": { "lifecycle": false, "canvas": false },
    "terminal": { "listener": true, "errors": true }
  }
}
```

**Options:**

- `name`: Project name (identifier)
- `orientation`: Screen orientation (`any`, `portrait`, `landscape`)
- `aspect`: Aspect ratio (`free`, `16x9`, `4x3`, `1x1`, `2x1`, or with `>` prefix for minimum)
- `width` / `height`: Canvas dimensions (auto-calculated from aspect if not specified)
- `dev.port`: Port for development server (default: 3000)
- `dev.host`: Host for development server (default: "localhost", use `"0.0.0.0"` to expose)
- `logging`: Configuration for debug output in browser and terminal
- `farcaster`: Farcaster Mini App configuration (see [Farcaster Mini Apps Guide](/fundamentals/farcaster-miniapps))

### Package.json

Add scripts for development and build in `package.json`:

```json
{
  "name": "my-game",
  "type": "module",
  "scripts": {
    "dev": "l8b dev",
    "build": "l8b build",
    "start": "l8b start"
  },
  "devDependencies": {
    "l8b": "^0.0.1"
  }
}
```

**Note:** Replace `^0.0.1` with the latest version of L8B from npm.

**Commands:**

- `npm run dev` or `l8b dev`: Run development server with HMR (Hot Module Replacement)
- `npm run build` or `l8b build`: Build project for production (output to `.l8b/`)
- `npm run start` or `l8b start`: Preview production build

**Development Server Options:**

```bash
l8b dev [root]              # Start dev server
l8b dev --port 3000         # Custom port
l8b dev --host 0.0.0.0      # Expose to network
```

### Code Editor Integration

#### VSCode

For optimal development experience, install the **LootiScript extension** for VSCode:

1. Open VSCode
2. Press `Ctrl+Shift+X` (or `Cmd+Shift+X` on Mac) to open Extensions
3. Search for "LootiScript"
4. Click **Install**

**Extension Features:**

- ✅ Syntax highlighting for `.loot` files
- ✅ Code completion and IntelliSense
- ✅ Error detection and diagnostics
- ✅ Code snippets for common patterns
- ✅ Formatting support

## First Program

Create a file `src/main.loot` and start with a simple program:

```lua
init = function()
  x = 0
  y = 0
end

update = function()
  if keyboard.LEFT == 1 then x -= 1 end
  if keyboard.RIGHT == 1 then x += 1 end
  if keyboard.UP == 1 then y += 1 end
  if keyboard.DOWN == 1 then y -= 1 end
end

draw = function()
  screen.clear("#000")
  screen.fillRect(x, y, 32, 32, "#FFF")
end
```

## Lifecycle Functions

L8B uses 3 main functions for the game loop:

### `init()`

Called **once** when the program starts. Use for initializing variables and initial state.

```lua
init = function()
  score = 0
  level = 1
  player_x = 0
  player_y = 0
  enemies = []
end
```

### `update()`

Called **60 times per second**. Best place for:

- Game logic and physics
- Movement and collision detection
- Input handling (keyboard, mouse, gamepad)
- State changes

```lua
update = function()
  // Update player position
  if keyboard.UP == 1 then player_y -= 2 end
  if keyboard.DOWN == 1 then player_y += 2 end

  // Update enemies
  for enemy in enemies do
    enemy.update()
  end

  // Check collisions
  checkCollisions()
end
```

### `draw()`

Called **every frame** (usually 60 FPS, but may vary by device). Use for rendering:

```lua
draw = function()
  // Clear screen
  screen.clear("#000")

  // Draw player
  screen.fillRect(player_x, player_y, 32, 32, "#FFF")

  // Draw enemies
  for enemy in enemies do
    screen.fillRect(enemy.x, enemy.y, 32, 32, "#F00")
  end

  // Draw UI
  screen.setColor("#FFF")
  screen.drawText("Score: " + score, 10, 10, 16)
end
```

**Important:** `update()` is always called 60x/second, while `draw()` is called according to the device's refresh rate.

### Execution Order

Execution order within one frame:

1. **Input Update** - Input devices (keyboard, mouse, touch, gamepad) are updated
2. **Scene Update** - If there's an active scene, `scene.update()` is called, otherwise global `update()` is called
3. **Scene Draw** - If there's an active scene, `scene.draw()` is called, otherwise global `draw()` is called

```lua
// Execution flow per frame:
// 1. Input update
// 2. update() or scene.update()
// 3. draw() or scene.draw()
```

**Note:** If using Scene Management, scene lifecycle methods (`init`, `onEnter`, `onLeave`, `update`, `draw`) will be called according to the active scene.

## Input Handling

### Keyboard

```lua
update = function()
  if keyboard.LEFT == 1 then x -= 2 end
  if keyboard.RIGHT == 1 then x += 2 end
  if keyboard.UP == 1 then y += 2 end
  if keyboard.DOWN == 1 then y -= 2 end

  if keyboard.SPACE == 1 then shoot() end
end
```

### Mouse

```lua
update = function()
  // Mouse position
  player_x = mouse.x
  player_y = mouse.y

  // Mouse click
  if mouse.press == 1 then
    shoot(mouse.x, mouse.y)
  end
end
```

### Touch (Mobile)

```lua
update = function()
  if touch.touching == 1 then
    player_x = touch.x
    player_y = touch.y
  end
end
```

## Scheduler Blocks

L8B provides powerful scheduler features for time-based operations:

### `after` - Delayed Execution

```lua
init = function()
  // Spawn enemy after 3 seconds
  after 3 seconds do
    spawnEnemy()
  end
end
```

### `every` - Repeated Execution

```lua
init = function()
  // Spawn enemy every 5 seconds
  every 5 seconds do
    spawnEnemy()
  end

  // Update score every second
  every 1 second do
    score += 10
  end
end
```

### `sleep` - Pause Execution

```lua
playCutscene = function()
  showDialogue("Welcome!")
  sleep 2 seconds

  showDialogue("Let's start the game")
  sleep 2 seconds

  startGame()
end
```

## Working with Sprites

### Load Sprite

Sprites are automatically loaded from `public/sprites/` directory. Access them by name:

```lua
init = function()
  // Sprites loaded automatically from public/sprites/
  player_sprite = sprites.player
end
```

### Draw Sprite

```lua
draw = function()
  // drawSprite(name, x, y, width, height)
  screen.drawSprite("player", x, y, 32, 32)
end
```

## Classes & Objects

Use classes to organize code:

```lua
Enemy = class
  constructor = function(x, y)
    this.x = x
    this.y = y
    this.hp = 100
    this.speed = 1
  end

  update = function()
    // Move towards player
    if this.x < player_x then this.x += this.speed end
    if this.x > player_x then this.x -= this.speed end
  end

  takeDamage = function(damage)
    this.hp -= damage
    if this.hp <= 0 then
      this.destroy()
    end
  end

  destroy = function()
    // Remove from enemies list
    enemies.removeElement(this)
  end
end

// Create enemy
init = function()
  enemies = []
  enemies.push(new Enemy(100, 100))
  enemies.push(new Enemy(-100, 50))
end
```

## Arrow Functions

Use arrow functions for more concise code:

```lua
// Traditional function
enemies.forEach(function(e) e.update() end)

// Arrow function
enemies.forEach(e => e.update())

// Multiple parameters
bullets.forEach((b, i) => {
  b.update()
  if b.isOffScreen() then bullets.removeAt(i) end
})
```

## Console & Debugging

### Print to Console

The `print()` function sends output to both browser console and terminal:

```lua
update = function()
  print("Player position: " + player_x + ", " + player_y)
  print("Score: " + score)

  // Print multiple values
  print("Health:", hp, "Mana:", mana)
end
```

**Output:**

- Browser: View in Developer Tools Console (F12)
- Terminal: Output appears in the terminal where the dev server is running

### Interactive Console

L8B provides an interactive console for debugging during development. You can:

1. **Inspect Variables** - Type variable name to see its value
2. **Execute Commands** - Run LootiScript code directly from console
3. **Call Functions** - Call functions that have been defined

```lua
// In browser console or terminal:
> player_x
150

> score
1250

> enemies.length
3

> enemies[0].hp
100

// Execute code
> x = 50
> y = 100

// Call functions
> spawnEnemy(100, 200)
```

### Error Handling & Stack Trace

When an error occurs, L8B displays a detailed stack trace:

```lua
// Example error
update = function()
  local enemy = enemies[0]
  enemy.hp -= damage  // Error if enemies is empty!
end
```

**Error Output:**

```text
Error: Cannot read property 'hp' of undefined
  at update (main.loot:15:3)
  at RuntimeOrchestrator.update (orchestrator.ts:483:5)
Stack trace:
  1. update() - main.loot:15
  2. RuntimeOrchestrator.update() - orchestrator.ts:483
```

### Debugging Tips

#### 1. Use print() for tracing

```lua
update = function()
  print("Frame:", system.time)
  print("Player:", player_x, player_y)
  print("Enemies:", enemies.length)
end
```

#### 2. Check variable values

```lua
// In console, type:
> player_x
> enemies
> GameState.current
```

#### 3. Test functions

```lua
// In console, call function:
> calculateDistance(0, 0, 10, 10)
> spawnEnemy(100, 100)
```

#### 4. Inspect objects

```lua
// In console:
> player
{ x: 0, y: 0, hp: 100, speed: 2 }

> player.hp
100
```

## Best Practices

### 1. Use Local Variables

```lua
update = function()
  local dx = player_x - enemy_x
  local dy = player_y - enemy_y
  local distance = sqrt(dx * dx + dy * dy)

  if distance < 50 then
    // Collision!
  end
end
```

### 2. Organize with Classes

```lua
Player = class
  constructor = function()
    this.x = 0
    this.y = 0
    this.hp = 100
  end

  update = function()
    this.handleInput()
    this.checkCollisions()
  end

  handleInput = function()
    if keyboard.LEFT == 1 then this.x -= 2 end
    if keyboard.RIGHT == 1 then this.x += 2 end
  end
end
```

### 3. Separate Concerns

```lua
// Game state management
GameState = object
  current = "menu"

  setState = function(newState)
    this.current = newState
  end
end

update = function()
  if GameState.current == "menu" then
    updateMenu()
  elsif GameState.current == "playing" then
    updateGame()
  elsif GameState.current == "gameover" then
    updateGameOver()
  end
end
```

### 4. Use Scheduler for Timing

```lua
// ❌ Manual timing (complicated)
init = function()
  spawn_timer = 0
end

update = function()
  spawn_timer += 1
  if spawn_timer >= 300 then  // 5 seconds at 60 FPS
    spawnEnemy()
    spawn_timer = 0
  end
end

// ✅ Scheduler (simple)
init = function()
  every 5 seconds do
    spawnEnemy()
  end
end
```

## Next Steps

Now you understand the basics of L8B! Next:

1. **Explore LootiScript** - Learn more about the LootiScript language in [LootiScript Programming](/fundamentals/looti-script-programming)
2. **API Reference** - See all available APIs in [API Reference](/fundamentals/api-reference)
3. **Cheatsheet** - Use [LootiScript Cheatsheet](/quick-reference/lootiscript-cheatsheet) as a quick reference

Happy game making! 🎮
