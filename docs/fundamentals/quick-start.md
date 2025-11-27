# Quick Start

Selamat datang di **l8b** - game engine web berbasis LootiScript! Panduan ini akan membantu Anda memulai project game pertama Anda.

## Apa itu l8b?

l8b adalah game engine web yang powerful dan mudah digunakan. l8b menyediakan:

- **LootiScript** - Bahasa scripting yang simple namun powerful, dilengkapi bytecode compiler dan inline cache optimization
- **Scheduler Blocks** - Fitur `after`, `every`, dan `sleep` untuk time-based operations
- **Runtime System** - Game loop yang efisien dengan `init`, `update`, dan `draw` lifecycle
- **Web3 Integration** - Built-in support untuk blockchain dan NFT
- **Asset Management** - Sistem untuk mengelola sprites, sounds, dan assets lainnya

## Setup Project

### Instalasi

```bash
npm install l8b
```

### Integrasi dengan Code Editor

#### VSCode

Untuk pengalaman development yang optimal, install **LootiScript extension** untuk VSCode:

1. Buka VSCode
2. Tekan `Ctrl+Shift+X` (atau `Cmd+Shift+X` di Mac) untuk membuka Extensions
3. Cari "LootiScript"
4. Klik **Install**

**Fitur extension:**

- ✅ Syntax highlighting untuk file `.loot`
- ✅ Code completion dan IntelliSense
- ✅ Error detection dan diagnostics
- ✅ Code snippets untuk pattern umum
- ✅ Formatting support

### Struktur Project

```
my-game/
├── src/
│   └── main.loot       # Main game code
├── assets/
│   ├── sprites/        # Sprite images
│   └── sounds/         # Sound files
├── l8b.config.json     # Project configuration
└── package.json
```

### Configuration

File `l8b.config.json` di root project digunakan untuk mengatur metadata dan behavior:

```json
{
  "name": "my-game",
  "orientation": "any",
  "aspect": "free",
  "logging": {
    "browser": { "lifecycle": false, "canvas": false },
    "terminal": { "listener": true, "errors": true }
  }
}
```

**Options:**

- `name`: Nama project (identifier)
- `orientation`: Orientasi layar (`any`, `portrait`, `landscape`)
- `aspect`: Rasio aspek layar (`free`, `16:9`, `4:3`, dll)
- `logging`: Konfigurasi output debug di browser dan terminal

### Package.json

Tambahkan scripts untuk development dan build di `package.json`:

```json
{
  "name": "my-game",
  "type": "module",
  "scripts": {
    "dev": "l8b dev",
    "build": "l8b build",
    "preview": "l8b start"
  },
  "dependencies": {
    "l8b": "^0.0.1"
  }
}
```

- `npm run dev`: Menjalankan development server dengan HMR
- `npm run build`: Build project untuk production
- `npm run preview`: Preview hasil build

## First Program

Buat file `main.loot` dan mulai dengan program sederhana:

```lua
init = function()
  x = 0
  y = 0
end

update = function()
  if keyboard.LEFT then x -= 1 end
  if keyboard.RIGHT then x += 1 end
  if keyboard.UP then y += 1 end
  if keyboard.DOWN then y -= 1 end
end

draw = function()
  screen.fillRect(0, 0, screen.width, screen.height, "#000")
  screen.drawSprite("player", x, y, 32, 32)
end
```

## Lifecycle Functions

l8b menggunakan 3 fungsi utama untuk game loop:

### `init()`

Dipanggil **sekali** saat program dimulai. Gunakan untuk inisialisasi variabel dan state awal.

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

Dipanggil **60 kali per detik**. Tempat terbaik untuk:

- Game logic dan physics
- Movement dan collision detection
- Input handling (keyboard, mouse, gamepad)
- State changes

```lua
update = function()
  // Update player position
  if keyboard.UP then player_y += 1 end
  if keyboard.DOWN then player_y -= 1 end
  
  // Update enemies
  for enemy in enemies
    enemy.update()
  end
  
  // Check collisions
  checkCollisions()
end
```

### `draw()`

Dipanggil **setiap frame** (biasanya 60 FPS, tapi bisa berbeda tergantung device). Gunakan untuk rendering:

```lua
draw = function()
  // Clear screen
  screen.fillRect(0, 0, screen.width, screen.height, "#000")
  
  // Draw player
  screen.drawSprite("player", player_x, player_y, 32, 32)
  
  // Draw enemies
  for enemy in enemies
    screen.drawSprite("enemy", enemy.x, enemy.y, 32, 32)
  end
  
  // Draw UI
  screen.drawText("Score: " + score, -screen.width/2 + 10, screen.height/2 - 20, 16, "#FFF")
end
```

**Penting:** `update()` selalu dipanggil 60x/detik, sedangkan `draw()` dipanggil sesuai refresh rate device.

## Input Handling

### Keyboard

```lua
update = function()
  if keyboard.LEFT then x -= 2 end
  if keyboard.RIGHT then x += 2 end
  if keyboard.UP then y += 2 end
  if keyboard.DOWN then y -= 2 end
  
  if keyboard.SPACE then shoot() end
end
```

### Mouse

```lua
update = function()
  // Mouse position
  player_x = mouse.x
  player_y = mouse.y
  
  // Mouse click
  if mouse.press then
    shoot(mouse.x, mouse.y)
  end
end
```

### Touch (Mobile)

```lua
update = function()
  if touch.touching then
    player_x = touch.x
    player_y = touch.y
  end
end
```

## Scheduler Blocks

l8b menyediakan fitur scheduler yang powerful untuk time-based operations:

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

```lua
init = function()
  // Sprites loaded automatically from assets/sprites/
  player_sprite = sprites.player
end
```

### Draw Sprite

```lua
draw = function()
  // drawSprite(name, x, y, width, height)
  screen.drawSprite("player", x, y, 32, 32)
  
  // With rotation
  screen.drawSprite("player", x, y, 32, 32, rotation)
end
```

## Classes & Objects

Gunakan classes untuk mengorganisir code:

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

Gunakan arrow functions untuk code yang lebih ringkas:

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

```lua
update = function()
  print("Player position: " + player_x + ", " + player_y)
  print("Score: " + score)
end
```

### Check Variable Values

Gunakan console untuk inspect variables saat development:

```
> player_x
150
> score
1250
> enemies.length
3
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
    if keyboard.LEFT then this.x -= 2 end
    if keyboard.RIGHT then this.x += 2 end
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

Sekarang Anda sudah memahami dasar-dasar l8b! Selanjutnya:

1. **Explore LootiScript** - Pelajari lebih dalam tentang bahasa LootiScript di [LootiScript Programming](/fundamentals/looti-script-programming)
2. **API Reference** - Lihat semua API yang tersedia di [API Reference](/fundamentals/api-reference)
3. **Cheatsheet** - Gunakan [LootiScript Cheatsheet](/quick-reference/lootiscript-cheatsheet) sebagai quick reference

Selamat membuat game! 🎮
