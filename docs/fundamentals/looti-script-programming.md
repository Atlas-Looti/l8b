# LootiScript Programming

LootiScript is a lightweight scripting language inspired by Lua, designed to be easy to learn, expressive, and comfortable to use in the L8B ecosystem. LootiScript is equipped with a **bytecode compiler**, **inline cache optimization**, and **scheduler blocks** for better performance and productivity. This guide summarizes the language fundamentals along with the most commonly used idioms when building games or Web3 mini-apps with L8B.

## Basic Principles

- Variables are global by default; use `local` to create local variables within functions.
- Newlines are treated like spaces; code writing can be flexible.
- There is no `null`, `nil`, or `undefined` value. Variables that have never been assigned have a value of `0`.
- There is no special boolean type. `0` is considered _false_, everything else is _true_.
- There are no runtime errors for undefined variables; calling a non-function value as a function will return the value itself.
- **LootiScript is compiled to bytecode** for faster execution compared to direct interpretation.

## Variables

Variables are identifiers that store values. You don't need to declare variables beforehand; once assigned a value, the variable is immediately available.

### Declaration & Assignment

```lua
x = 1
```

The value of `x` is now 1. All variables that have never been used automatically have a value of `0`, so you won't encounter "undefined" errors.

### Local Variables

By default, assignment creates a global variable. Use `local` inside functions to limit scope:

```lua
init = function()
  local score = 0
end
```

### Summary

- No special keyword needed to create global variables.
- Uninitialized variables have a value of `0`.
- `local` only applies to the function block where it's defined.

## Types of Values

LootiScript recognizes five main types: **Number**, **String**, **List**, **Object**, and **Function**. Managing these types is the core of programming gameplay and application logic.

### Number

```lua
pi = 3.1415
count = 42
ratio = 1/2
```

### String

```lua
animal = "cat"
print("Hello " + animal)
```

### List

```lua
empty = []
primes = [2,3,5,7,11]
mixed = [1,"cat",[1,2,3]]

print(primes[0])  // access by index from 0

for value in primes do
  print(value)
end
```

### Object

```lua
player = object
  x = 0
  y = 0
  name = "hero"
end

player.x = 10
player["y"] = 20

for field in player do
  print(field + " = " + player[field])
end
```

### Function

```lua
draw = function()
  print("render frame")
end
```

## Functions

```lua
nextNumber = function(start)
  return start + 1
end

useLocal = function()
  local i = 0
  i += 1
end

print(nextNumber(10))
```

Functions are defined with the `function` keyword and ended with `end`. You can break your program into many small functions without having to define them all at once—calling a value that isn't a function will just return `0`, so it won't cause an error.

### Local Variables

Variables declared with `local` inside a function only live while the function runs. Use this to prevent side effects on global variables.

### Calling Non-Function Values

Calling a non-function value as a function just returns its value (without error):

```lua
x = 1
print(x(0))  // result: 1
```

This allows you to design function frameworks from the start even if the implementation doesn't exist yet.

## Arrow Functions

LootiScript supports modern arrow function syntax for writing functions more concisely:

```lua
// Single parameter (without parentheses)
double = x => x * 2

// Multiple parameters
add = (a, b) => a + b

// Empty parameters
greet = () => print("Hello!")

// Multi-line body
calculate = (x, y) => {
  local result = x * y
  return result + 10
}
```

Arrow functions are very useful for callbacks and list operations:

```lua
numbers = [1, 2, 3, 4, 5]

// Use with map/filter (if available in API)
doubled = numbers.map(x => x * 2)

// As callback for event handler
button.onClick = () => print("Clicked!")
```

### Differences from Regular Functions

- More concise syntax for simple functions
- Suitable for callbacks and functional programming
- Still supports `local`, `return`, and all normal function features

## Conditions

```lua
if age < 18 then
  print("child")
else
  print("adult")
end
```

Use `elsif` for additional branches:

```lua
if age < 10 then
  print("child")
elsif age < 18 then
  print("teen")
elsif age < 30 then
  print("young adult")
else
  print("wise")
end
```

Comparison operators (`==`, `!=`, `<`, `>`, `<=`, `>=`) and boolean operators (`and`, `or`, `not`) follow standard rules and are explained in more detail in the **Operators** section.

## Loops

```lua
for i = 1 to 10 do
  print(i)
end

for i = 0 to 10 by 2 do
  print(i)
end

list = [2,3,5]
for value in list do
  print(value)
end
```

### While Loop

```lua
x = 1
while x * x < 100 do
  print(x * x)
  x += 1
end
```

Use `break` to exit early, `continue` to jump to the next iteration:

```lua
while true do
  x += 1
  if x >= 100 then break end
end
```

## Time & Scheduler Blocks

LootiScript has special constructs for scheduling code without the hassle of managing manual timers. This feature makes it easy to create animations, spawn systems, and delayed actions.

### `after`

Execute a block once after a delay. Supports various time units for convenience.

```lua
// Delay in milliseconds (default)
after 1000 do
  spawnEnemy()
end

// Use more readable time units
after 2 seconds do
  showMessage("2 seconds have passed")
end

after 5 minutes do
  saveGame()
end
```

### `every`

Execute a block repeatedly at intervals. Suitable for spawn systems, periodic checks, or animations.

```lua
// Spawn enemy every 3 seconds
every 3 seconds do
  spawnEnemy()
end

// Update UI every 500ms
every 500 do
  updateHealthBar()
end

// Periodic save every 10 minutes
every 10 minutes do
  autoSave()
end
```

### `sleep`

Pause execution within an active function—useful for simple coroutines or step-by-step animations.

```lua
animateSequence = function()
  character.x = 0
  sleep 500
  character.x = 50
  sleep 500
  character.x = 100
end

// Cutscene with timing
playCutscene = function()
  showDialogue("Hello!")
  sleep 2 seconds

  showDialogue("Welcome to the game")
  sleep 2 seconds

  startGame()
end
```

### Time Multipliers

All schedulers support the following time units:

| Unit             | Value (ms) | Example                  |
| ---------------- | ---------- | ------------------------ |
| `millisecond(s)` | 1          | `after 500 milliseconds` |
| `second(s)`      | 1000       | `every 2 seconds`        |
| `minute(s)`      | 60000      | `after 5 minutes`        |
| `hour(s)`        | 3600000    | `every 1 hour`           |
| `day(s)`         | 86400000   | `after 1 day`            |

If no unit is specified, the value is assumed to be in milliseconds.

### Important Notes

- All schedulers are integrated with the runtime loop, safe to use alongside `update`/`draw`
- `sleep` only works inside functions called from the runtime
- Schedulers run in a separate background thread to avoid blocking

## Operators

### Comparison Operators

| Operator | Meaning                  |
| -------- | ------------------------ |
| `==`     | Equal to                 |
| `!=`     | Not equal                |
| `<`      | Less than                |
| `>`      | Greater than             |
| `<=`     | Less than or equal to    |
| `>=`     | Greater than or equal to |

### Boolean Operators

- `and`: true only if both operands are true
- `or`: true if either operand is true
- `not`: inverts truth value

LootiScript doesn't have a special boolean type; `0` is false and other values are true. Constants `true` (1) and `false` (0) are available.

### Arithmetic Operators

| Operator | Meaning                                      |
| -------- | -------------------------------------------- |
| `+`      | Addition                                     |
| `-`      | Subtraction                                  |
| `*`      | Multiplication                               |
| `/`      | Division                                     |
| `%`      | Modulo (remainder)                           |
| `^`      | Power (`x ^ y` is equivalent to `pow(x, y)`) |

## Built-ins

### Math & Constants

- `max`, `min`, `round`, `floor`, `ceil`, `abs`, `sqrt`, `pow`, `log`, `exp`, `PI`
- Radian trigonometry: `sin`, `cos`, `tan`, `asin`, `acos`, `atan`, `atan2`
- Degree trigonometry: `sind`, `cosd`, `tand`, `asind`, `acosd`, `atand`, `atan2d`

### Random

```lua
random.seed(42)
random.next()     // 0..1
random.nextInt(6)  // 0..5
```

### String Operations

- `a + b` concatenate strings
- `str.length`
- `str.substring(i1, i2)`
- `str.startsWith(s)`, `str.endsWith(s)`
- `str.indexOf(s)`, `str.lastIndexOf(s)`
- `str.replace(s1, s2)`
- `str.toUpperCase()`, `str.toLowerCase()`
- `str.split(sep)`

### List Operations

- `list.length`
- `list.push(value)`
- `list.insert(value)` (at beginning)
- `list.insertAt(value, index)`
- `list.indexOf(value)`
- `list.contains(value)`
- `list.removeAt(index)`
- `list.removeElement(value)`
- `list1.concat(list2)`

#### Sorting

```lua
compare = function(a, b)
  return a.x - b.x
end

points.sortList(compare)
```

If no comparison function is provided, the list is sorted alphabetically.

## Comments

Use `//` until the end of the line:

```lua
update = function()
  // calculate delta time
end
```

## Classes

Classes are blueprints for creating objects in LootiScript. A class can store default properties and functions that will be carried by each instance. Use classes when you want many objects to share basic behavior (enemies, projectiles, NPCs, etc.).

### Define a Class

Example `Enemy` that stores position, HP, and speed, then provides `move` and `hit` functions:

```lua
Enemy = class
  constructor = function(position)
    this.position = position
  end

  hp = 10
  velocity = 1

  move = function()
    position += velocity
  end

  hit = function(damage)
    hp -= damage
  end
end
```

- `constructor` is called automatically when a new instance is created.
- Use `this` to access properties belonging to the currently running object.

### Create Instances

```lua
enemy1 = new Enemy(50)
enemy2 = new Enemy(100)

enemy2.velocity = 2

enemy1.move()
enemy2.move()
```

The `new` operator creates a new instance based on the target class. Each instance carries default properties/functions from the class, but you can still change their values individually (`enemy2.velocity = 2`).

### Inheritance

Use `extends` to create class variations while inheriting default behavior.

```lua
Boss = class extends Enemy
  constructor = function(position)
    super(position)
    hp = 50
  end

  move = function()
    super()
    hp += 1
  end
end

finalBoss = new Boss(120)
```

- `super()` calls the function with the same name in the parent class. In the constructor, this ensures basic properties remain initialized.
- Override behavior by rewriting the function (e.g., `move`). Call `super()` if you want to keep the old behavior and add new logic.

### Quick Notes

- Functions called via instances (`enemy1.move()`) automatically use that instance's properties—you don't need to write `this` if accessing a variable with the same name.
- You're free to add new properties after an instance is created (e.g., `enemy1.state = "idle"`), just like regular objects.

## Performance & Optimizations

LootiScript is designed with performance as a top priority. Here are optimizations running behind the scenes:

### Bytecode Compilation

**LootiScript is compiled to bytecode** before execution:

1. **Parser** converts code into Abstract Syntax Tree (AST)
2. **Compiler** converts AST into bytecode with optimizations
3. **VM Processor** executes bytecode with high performance

This process provides excellent performance for games and interactive applications.

### Inline Cache

Property access is optimized using **inline cache** that caches object shapes:

```lua
// First access: cache object shape
player.x = 10  // O(n) hash lookup

// Subsequent accesses: use cached shape
player.x = 20  // O(1) direct access
player.y = 30  // O(1) direct access
```

Cache has 3 states:

- **Monomorphic**: Single object shape (fastest, O(1))
- **Polymorphic**: 2-4 different object shapes (fast)
- **Megamorphic**: Many shapes (fallback to hash lookup)

### Compiler Optimizations

The compiler performs several automatic optimizations:

**1. Peephole Optimization (Opcode Fusion)**

```lua
// Your code:
x = getValue()
x()

// Compiler combines opcodes:
// LOAD_VARIABLE + FUNCTION_CALL → LOAD_VAR_CALL (faster)
```

**2. Constant Folding**

```lua
// Your code:
x = 2 + 3 * 4

// Compiler calculates at compile-time:
x = 14  // No runtime operation
```

**3. Dead Code Elimination**

```lua
// Your code:
if false then
  expensiveOperation()  // Will never execute
end

// Compiler removes code that will never run
```

### Object Pooling

The runtime uses **object pooling** to reduce garbage collection:

- Arrays and simple objects are recycled
- Reduces allocation overhead
- More stable performance, especially in game loops

### Best Practices for Performance

1. **Use local variables** for frequently accessed variables:

```lua
update = function()
  local px = player.x  // Cache to local
  local py = player.y

  // Use local variables
  if px > 100 and py > 100 then
    // ...
  end
end
```

2. **Avoid repeated property access** in loops:

```lua
// ❌ Bad
for i = 0 to 100 do
  doSomething(player.position.x, player.position.y)
end

// ✅ Good
local pos = player.position
for i = 0 to 100 do
  doSomething(pos.x, pos.y)
end
```

3. **Use arrow functions** for simple callbacks:

```lua
// More efficient for small functions
enemies.forEach(e => e.update())
```

## Summary

LootiScript maintains the simplicity of a minimalist scripting language while bringing an identity aligned with the L8B ecosystem. This language makes it easy to write gameplay loops, Web3 integration, and interactive logic without dealing with complex runtime errors. Start from a simple idea, break it into small functions, and develop your game or mini-app iteratively. Happy coding!
