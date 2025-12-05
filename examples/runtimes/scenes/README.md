# Scene Routing Example

This example demonstrates the Scene + Router system in L8B game engine.

## Features

- **Scene-based architecture**: Organize game code into scenes
- **Shallow routing**: Navigate between scenes without page reload
- **Route definitions**: Map URL paths to scenes
- **Dynamic routes**: Handle route parameters (e.g., `/player/:id`)
- **Scene lifecycle**: Use `init()`, `onEnter()`, `onLeave()`, `update()`, `draw()`

## Project Structure

```
scenes/
├── src/
│   ├── main.ts              # Runtime setup
│   └── scripts/
│       ├── main.loot        # Route definitions
│       └── scenes/
│           ├── home.loot    # Home scene
│           ├── battle.loot  # Battle scene
│           └── player.loot  # Player scene (with dynamic params)
├── index.html
└── package.json
```

## Usage

### Install dependencies

```bash
pnpm install
```

### Development

```bash
pnpm run dev
```

### Build

```bash
pnpm run build
```

### Preview production build

```bash
pnpm run preview
```

## How It Works

### 1. Define Routes

In `scripts/main.loot`:

```loot
route("/", "home")
route("/battle", "battle")
route("/player/:id", "player")
```

### 2. Define Scenes

In `scripts/scenes/home.loot`:

```loot
scene("home", object
  onEnter = function()
    print("Entered home scene")
  end
  
  update = function()
    if keyboard.press.SPACE then
      router.push("/battle")
    end
  end
  
  draw = function()
    screen.clear("rgb(40, 44, 52)")
    screen.drawText("HOME SCENE", 0, 50, 30, "white")
  end
end)
```

### 3. Navigate Between Scenes

- `router.push("/battle")` - Navigate and add to history
- `router.replace("/player/1")` - Navigate without adding to history
- `router.back()` - Go back in browser history

### 4. Access Route Parameters

In scenes with dynamic routes:

```loot
onEnter = function(params)
  local idStr = params.id
  this.id = Number.parse(idStr)
end
```

## Scene Lifecycle

1. **`init()`** - Called once when scene is registered
2. **`onEnter(params)`** - Called every time scene becomes active
3. **`onLeave()`** - Called when leaving the scene
4. **`update()`** - Called every frame (game logic)
5. **`draw()`** - Called every frame (rendering)

## Router API

- `router.push(path)` - Navigate to path (adds to history)
- `router.replace(path)` - Navigate to path (replaces current history entry)
- `router.back()` - Go back in browser history
- `router.getPath()` - Get current path
- `router.getParams()` - Get current route parameters
- `router.getSceneName()` - Get current scene name

## Keyboard Controls

- **SPACE** - Navigate to Battle scene (from Home)
- **P** - Navigate to Player 1 (from Home)
- **ESC** - Go back (from Battle/Player)
- **LEFT/RIGHT** - Navigate between players (in Player scene)

