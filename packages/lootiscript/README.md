# @l8b/lootiscript

**LootiScript** - A dynamic scripting language designed for game development with the l8b engine.

## Overview

LootiScript is a Lua-inspired scripting language optimized for game development. It features:

- **Familiar Syntax** - Similar to Lua with modern improvements
- **Object-Oriented** - Support for objects and classes
- **Fast Execution** - Compiled to bytecode and executed by a custom VM
- **Game-Focused** - Built-in features for game development patterns

## Language Basics

### Comments

LootiScript uses C-style comments:

```lua
// Single-line comment

/*
  Multi-line comment
  Can span multiple lines
*/
```

### Variables

Variables are dynamically typed and don't require declaration:

```lua
// Numbers
local x = 10
local y = 3.14
local z = -5

// Strings
local name = "Player"
local message = 'Hello World'

// Booleans
local isActive = true
local isDead = false

// Null
local empty = null
```

### Operators

#### Arithmetic Operators

```lua
local a = 10 + 5   // Addition: 15
local b = 10 - 5   // Subtraction: 5
local c = 10 * 5   // Multiplication: 50
local d = 10 / 5   // Division: 2
local e = 10 % 3   // Modulo: 1
```

#### Comparison Operators

```lua
x == y    // Equal
x != y    // Not equal
x < y     // Less than
x > y     // Greater than
x <= y    // Less than or equal
x >= y    // Greater than or equal
```

#### Logical Operators

```lua
a and b   // Logical AND
a or b    // Logical OR
not a     // Logical NOT
```

#### Assignment Operators

```lua
x = 10      // Assignment
x += 5      // Add and assign (x = x + 5)
x -= 3      // Subtract and assign
x *= 2      // Multiply and assign
x /= 2      // Divide and assign
```

### Control Flow

#### If Statements

```lua
if score > 100 then
  Console.log("High score!")
elseif score > 50 then
  Console.log("Good score")
else
  Console.log("Try again")
end
```

#### While Loops

```lua
local i = 0
while i < 10 do
  Console.log(i)
  i += 1
end
```

#### For Loops

```lua
// Numeric for loop
for i = 1, 10 do
  Console.log(i)
end

// For loop with step
for i = 0, 100, 10 do
  Console.log(i)  // 0, 10, 20, ..., 100
end
```

#### For-In Loops

```lua
local items = {1, 2, 3, 4, 5}

for i, value in items do
  Console.log("Index: " .. i .. ", Value: " .. value)
end
```

### Functions

Functions are first-class values in LootiScript:

```lua
// Function declaration
function greet(name)
  return "Hello, " .. name
end

// Call function
local message = greet("Alice")

// Anonymous function
local add = function(a, b)
  return a + b
end

// Function as parameter
function apply(fn, x, y)
  return fn(x, y)
end

local result = apply(add, 5, 3)  // 8
```

### Objects

LootiScript supports object-oriented programming:

```lua
// Create an object
local player = object
  x = 100,
  y = 100,
  health = 100,
  
  move = function(self, dx, dy)
    self.x += dx
    self.y += dy
  end,
  
  takeDamage = function(self, amount)
    self.health -= amount
    if self.health <= 0 then
      self.die()
    end
  end,
  
  die = function(self)
    Console.log("Player died!")
  end
end

// Use object
player.move(10, 0)
player.takeDamage(25)
Console.log(player.health)  // 75
```

### Classes

Define reusable object templates with classes:

```lua
// Define a class
class Enemy
  constructor = function(self, x, y)
    self.x = x
    self.y = y
    self.health = 50
  end,
  
  update = function(self)
    // Update logic
  end,
  
  draw = function(self)
    screen.fillRect(self.x, self.y, 16, 16, "#FF0000")
  end
end

// Create instances
local enemy1 = new Enemy(100, 100)
local enemy2 = new Enemy(200, 150)

// Use instances
enemy1.update()
enemy1.draw()
```

### Arrays/Lists

Arrays are 1-indexed like Lua:

```lua
// Create array
local items = {10, 20, 30, 40, 50}

// Access elements
local first = items[1]   // 10
local last = items[5]    // 50

// Modify elements
items[1] = 15

// Array length
local count = #items     // 5

// Add element
table.insert(items, 60)

// Remove element
table.remove(items, 1)   // Removes first element
```

### String Operations

```lua
// Concatenation
local full = "Hello" .. " " .. "World"

// String length
local len = #"Hello"     // 5

// String methods (via stdlib)
local upper = String.upper("hello")      // "HELLO"
local lower = String.lower("WORLD")      // "world"
local sub = String.sub("Hello", 1, 3)    // "Hel"
```

## Advanced Features

### Coroutines/Threads

LootiScript supports cooperative multitasking:

```lua
function enemyAI()
  while true do
    // Move towards player
    moveTowardsPlayer()
    sleep(0.1)  // Wait 100ms
    
    // Attack if in range
    if inRange() then
      attack()
      sleep(1.0)  // Wait 1 second
    end
  end
end

// Start as thread
thread(enemyAI)
```

### Timing Functions

```lua
// Sleep for duration
sleep(1.0)  // Sleep for 1 second

// Execute after delay
after(2.0, function()
  Console.log("2 seconds passed")
end)

// Execute repeatedly
every(0.5, function()
  Console.log("Called every 500ms")
end)

// Do-while pattern
do
  updateGame()
  sleep(1/60)  // 60 FPS
while running
```

### Global API Access

LootiScript provides global access to engine APIs:

```lua
// Screen API
screen.clear("#000")
screen.drawSprite("player", 100, 100)

// Input API
if keyboard.SPACE == 1 then
  player.jump()
end

// Audio API
Audio.playSound("jump.wav")

// Assets API
Assets.loadImage("enemy.png", function(img)
  enemySprite = img
end)
```

## Built-in Utilities

### Random

```lua
// Random number generator
local rng = Random()

// Random integer
local dice = rng.int(1, 6)  // 1 to 6

// Random float
local chance = rng.float()  // 0.0 to 1.0

// Random from array
local items = {"sword", "shield", "potion"}
local item = rng.choice(items)
```

### Console

```lua
// Logging
Console.log("Debug message")
Console.log("Score: " .. score)

// Print (alias for Console.log)
print("Hello World")
```

## Type System

LootiScript is dynamically typed:

```lua
// Variables can change type
local x = 10        // Number
x = "Hello"         // Now a string
x = {1, 2, 3}      // Now an array

// Type checking
local t = type(x)   // Returns "table", "string", "number", etc.
```

## Scope Rules

```lua
// Global scope
globalVar = 100

// Local scope
local localVar = 50

function example()
  // Function scope
  local innerVar = 25
  
  // Can access outer scopes
  Console.log(localVar)   // 50
  Console.log(globalVar)  // 100
end

// innerVar not accessible here
```

## Best Practices

### Use Local Variables

```lua
// Good - local variables are faster
local x = 10
local y = 20

// Avoid - global variables are slower
x = 10
y = 20
```

### Cache Frequently Used Values

```lua
// Good - cache in local variable
local sin = math.sin
for i = 1, 1000 do
  local y = sin(i)
end

// Slower - repeated global lookup
for i = 1, 1000 do
  local y = math.sin(i)
end
```

### Prefer Objects Over Tables

```lua
// Good - object with methods
local player = object
  x = 0,
  y = 0,
  move = function(self, dx, dy)
    self.x += dx
    self.y += dy
  end
end

// Less efficient - separate functions
local player = {x = 0, y = 0}
function movePlayer(dx, dy)
  player.x += dx
  player.y += dy
end
```

## Differences from Lua

LootiScript is inspired by Lua but has some differences:

| Feature | Lua | LootiScript |
|---------|-----|-------------|
| Comments | `--` and `--[[ ]]` | `//` and `/* */` |
| Not Equal | `~=` | `!=` |
| Null | `nil` | `null` |
| Objects | Tables only | `object` keyword |
| Classes | Metatables | `class` keyword |
| Increment | `x = x + 1` | `x += 1` |
| Threads | `coroutine` | `thread()` |

## Example: Complete Game Loop

```lua
// Initialize
local player = object
  x = 100,
  y = 100,
  speed = 2
end

local score = 0

// Update function (called every frame)
function update()
  // Handle input
  if keyboard.UP == 1 then
    player.y -= player.speed
  end
  if keyboard.DOWN == 1 then
    player.y += player.speed
  end
  if keyboard.LEFT == 1 then
    player.x -= player.speed
  end
  if keyboard.RIGHT == 1 then
    player.x += player.speed
  end
  
  // Update score
  score += 1
end

// Draw function (called every frame)
function draw()
  // Clear screen
  screen.clear("#000000")
  
  // Draw player
  screen.setColor("#FFFFFF")
  screen.fillRect(player.x, player.y, 16, 16)
  
  // Draw UI
  screen.drawText("Score: " .. score, 10, 10, 12)
end
```

## Learn More

- **Core API Reference**: See individual package READMEs in `packages/core/`
- **Examples**: Check `examples/` directory for complete game examples
- **Documentation**: Visit the full documentation for advanced topics

## Package Structure

This package exports:

- `Parser` - Parses LootiScript source code into AST
- `Compiler` - Compiles AST into bytecode
- `Processor` - Executes bytecode
- `Runner` - Manages threads and coroutines
- `Routine` - Compiled bytecode representation
- `Random` - Random number generator
- `Tokenizer` - Lexical analyzer

For engine developers integrating LootiScript, see the TypeScript API documentation.
