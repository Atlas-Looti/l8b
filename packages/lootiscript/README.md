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
x %= 3      // Modulo and assign
x &= 5      // Binary AND and assign
x |= 2      // Binary OR and assign
```

#### Bitwise Operators

```lua
local a = 5 & 3   // Binary AND: 1
local b = 5 | 3   // Binary OR: 7
local c = 5 << 2  // Left shift: 20
local d = 20 >> 2 // Right shift: 5
```

#### Power Operator

```lua
local result = 2 ^ 8  // Exponentiation: 256
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

// For loop with step (using 'to' and 'by')
for i = 0 to 100 by 10 do
  Console.log(i)  // 0, 10, 20, ..., 100
end

// For loop with negative step
for i = 10 to 0 by -1 do
  Console.log(i)  // 10, 9, 8, ..., 0
end
```

#### For-In Loops

```lua
local items = {1, 2, 3, 4, 5}

// Iterate over array (1-indexed)
for value in items do
  Console.log("Value: " .. value)
end

// Iterate over object keys
local player = object
  x = 100,
  y = 200,
  health = 50
end

for key in player do
  Console.log(key .. " = " .. player[key])
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

// Arrow function (shorthand)
local multiply = (a, b) => a * b

// Arrow function with single parameter
local square = x => x * x

// Arrow function with no parameters
local getTime = () => Date.now()

// Function with default parameters
function greet(name, greeting = "Hello")
  return greeting .. ", " .. name
end

local msg1 = greet("Alice")        // "Hello, Alice"
local msg2 = greet("Bob", "Hi")    // "Hi, Bob"

// Function as parameter
function apply(fn, x, y)
  return fn(x, y)
end

local result = apply(add, 5, 3)  // 8

// Access to 'arguments' variable
function sum()
  local total = 0
  for i = 1, #arguments do
    total += arguments[i]
  end
  return total
end

local s = sum(1, 2, 3, 4)  // 10
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
// Define a base class
class Entity
  constructor = function(self, x, y)
    self.x = x
    self.y = y
  end,
  
  move = function(self, dx, dy)
    self.x += dx
    self.y += dy
  end
end

// Define a class with inheritance
class Enemy extends Entity
  constructor = function(self, x, y)
    super(x, y)  // Call parent constructor
    self.health = 50
  end,
  
  update = function(self)
    // Update logic
  end,
  
  draw = function(self)
    screen.fillRect(self.x, self.y, 16, 16, "#FF0000")
  end,
  
  takeDamage = function(self, amount)
    self.health -= amount
    if self.health <= 0 then
      self.die()
    end
  end,
  
  die = function(self)
    Console.log("Enemy died!")
  end
end

// Create instances
local enemy1 = new Enemy(100, 100)
local enemy2 = new Enemy(200, 150)

// Use instances
enemy1.update()
enemy1.draw()
enemy1.move(5, 0)  // Inherited method

// Call parent method using super
class Boss extends Enemy
  takeDamage = function(self, amount)
    super.takeDamage(amount / 2)  // Half damage
  end
end
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
List.push(items, 60)

// Remove element
List.remove(items, 1)   // Removes element at index 1
```

### String Operations

```lua
// Concatenation
local full = "Hello" .. " " .. "World"

// String length
local len = #"Hello"     // 5

// Template strings (interpolation)
local name = "Alice"
local age = 30
local msg = `Hello, ${name}! You are ${age} years old.`

// Multi-line strings (triple quotes)
local text = """
This is a multi-line string.
It can span multiple lines.
Useful for long text blocks.
"""

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
    sleep(100)  // Wait 100ms
    
    // Attack if in range
    if inRange() then
      attack()
      sleep(1000)  // Wait 1 second
    end
  end
end

// Start as thread using 'do' keyword
local thread = do
  enemyAI()
end

// Thread control
thread.pause()   // Pause the thread
thread.resume()  // Resume the thread
thread.stop()    // Stop the thread

// Check thread status
if thread.status == "running" then
  Console.log("Thread is active")
end
```

### Timing Functions

```lua
// Sleep for duration (in milliseconds by default)
sleep(1000)  // Sleep for 1000ms (1 second)

// Sleep with time units
sleep(1 second)    // Sleep for 1 second
sleep(500 milliseconds)  // Sleep for 500ms
sleep(2 minutes)   // Sleep for 2 minutes
sleep(1 hour)      // Sleep for 1 hour

// Execute after delay
after(2.0 seconds, function()
  Console.log("2 seconds passed")
end)

// Execute repeatedly
every(0.5 seconds, function()
  Console.log("Called every 500ms")
end)

// Do block (executes immediately as thread)
do
  Console.log("This runs immediately")
  sleep(1 second)
  Console.log("This runs after 1 second")
end

// Do-while pattern (not supported - use while loop instead)
local running = true
while running do
  updateGame()
  sleep(1/60)  // 60 FPS
end
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

The `random` object provides pseudorandom number generation:

```lua
// Random float [0.0, 1.0)
local chance = random.next()

// Random integer [0, num)
local dice = random.nextInt(6) + 1  // 1 to 6

// Set seed for deterministic randomness
random.seed(12345)

// Clone random generator
local rng2 = random.clone(67890)

// Random from array
local items = {"sword", "shield", "potion"}
local index = random.nextInt(#items) + 1
local item = items[index]
```

### Console

```lua
// Logging
Console.log("Debug message")
Console.log("Score: " .. score)

// Print (alias for Console.log)
print("Hello World")
```

### Delete Operator

Remove properties from objects:

```lua
local player = object
  x = 100,
  y = 200,
  health = 50
end

delete player.health  // Remove health property
delete player.x        // Remove x property
```

### Type Checking

```lua
// Get type of value
local t = type(x)  // Returns "number", "string", "object", "list", "function", or "null"

// Check variable type
local varType = variable.type  // Returns type string

// Check property type
local propType = object.property.type  // Returns type string
```

### Special Keywords

```lua
// 'this' refers to current object context
local obj = object
  value = 10,
  getValue = function(self)
    return this.value  // 'this' refers to 'self'
  end
end

// 'global' refers to global scope
global.myGlobalVar = 100
local value = global.myGlobalVar

// 'null' represents absence of value
local empty = null
if value == null then
  Console.log("Value is null")
end
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

## Complete API Reference

### Built-in Math Functions

LootiScript provides mathematical functions through the global scope:

#### Unary Math Functions

```lua
round(x)    // Round to nearest integer
floor(x)    // Round down
ceil(x)     // Round up
abs(x)      // Absolute value
sqrt(x)     // Square root
sin(x)      // Sine (radians)
cos(x)      // Cosine (radians)
tan(x)      // Tangent (radians)
asin(x)     // Arc sine (radians)
acos(x)     // Arc cosine (radians)
atan(x)     // Arc tangent (radians)
sind(x)     // Sine (degrees)
cosd(x)     // Cosine (degrees)
tand(x)     // Tangent (degrees)
asind(x)    // Arc sine (degrees)
acosd(x)    // Arc cosine (degrees)
atand(x)    // Arc tangent (degrees)
log(x)      // Natural logarithm
exp(x)      // Exponential function
```

#### Binary Math Functions

```lua
min(a, b)      // Minimum of two values
max(a, b)      // Maximum of two values
pow(a, b)      // a raised to power b (a^b)
atan2(y, x)    // Arc tangent of y/x (radians)
atan2d(y, x)   // Arc tangent of y/x (degrees)
```

#### Math Constants

```lua
PI      // 3.141592653589793
true    // 1
false   // 0
```

### Built-in Libraries

#### Math Library

Access via `Math` global object:

```lua
Math.sin(x)
Math.cos(x)
Math.PI
// ... (see @l8b/stdlib for complete API)
```

#### String Library

Access via `String` global object:

```lua
String.upper(str)      // Convert to uppercase
String.lower(str)      // Convert to lowercase
String.sub(str, i, j)  // Substring from i to j
String.fromCharCode(...)  // Create string from char codes
// ... (see @l8b/stdlib for complete API)
```

#### List Library

Access via `List` global object:

```lua
List.push(list, value)      // Add element to end
List.pop(list)              // Remove and return last element
List.remove(list, index)    // Remove element at index
List.insert(list, index, value)  // Insert at index
List.sort(list)             // Sort list
// ... (see @l8b/stdlib for complete API)
```

#### JSON Library

Access via `JSON` global object:

```lua
JSON.stringify(obj)    // Convert object to JSON string
JSON.parse(str)        // Parse JSON string to object
// ... (see @l8b/stdlib for complete API)
```

#### Number Library

Access via `Number` global object:

```lua
Number.parse(str)      // Parse string to number
number.toString()      // Convert number to string
```

#### Object Library

Access via `Object` global object. Provides default operator overloads:

```lua
Object["+"](a, b)  // Default addition
Object["-"](a, b)  // Default subtraction
Object["*"](a, b)  // Default multiplication
Object["/"](a, b)  // Default division
Object["%"](a, b)  // Default modulo
```

#### Function Library

Access via `Function` global object:

```lua
// Bind function to object
local boundFn = Function.bind(fn, obj)
```

### System Object

The `system` object provides VM state and controls:

```lua
system.preemptive     // Preemptive threading (1 or 0)
system.threads        // Array of active threads
system.fps            // Current frames per second
system.cpu_load       // CPU load percentage (0-100)
system.profiler       // Profiler API (see below)
```

### Profiler API

Performance profiling for LootiScript execution:

```lua
// Start profiling
system.profiler.start()

// Stop profiling and get metrics
local metrics = system.profiler.stop()

// Get average metrics without stopping
local avgMetrics = system.profiler.getMetrics()

// Metrics object contains:
// - ops: Number of operations executed
// - allocations: Number of memory allocations
// - cacheHits: Inline cache hits
// - cacheMisses: Inline cache misses
```

### Operator Precedence

Operators are evaluated in the following order (highest to lowest):

1. `^` (exponentiation)
2. `*`, `/`, `%` (multiplication, division, modulo)
3. `+`, `-` (addition, subtraction)
4. `<`, `<=`, `>`, `>=` (comparison)
5. `==`, `!=` (equality)
6. `<<`, `>>` (bitwise shifts)
7. `&` (bitwise AND)
8. `|` (bitwise OR)
9. `and` (logical AND)
10. `or` (logical OR)

### Truthiness

In LootiScript, the following values are considered "falsy":

- `0` (zero)
- `null`
- `false` (which is `0`)

All other values are "truthy", including:

- Non-zero numbers
- Non-empty strings
- Objects and arrays
- Functions

### Type System Details

LootiScript is dynamically typed. The `type()` function returns one of:

- `"number"` - Numeric values
- `"string"` - String values
- `"object"` - Object instances
- `"list"` - Array values
- `"function"` - Function values
- `"null"` - Null value

### Time Units

Time values can be specified with units (case-insensitive):

- `millisecond` or `milliseconds` - 1ms
- `second` or `seconds` - 1000ms
- `minute` or `minutes` - 60000ms
- `hour` or `hours` - 3600000ms
- `day` or `days` - 86400000ms

Example:

```lua
sleep(1 second)
after(2 minutes, function() end)
every(500 milliseconds, function() end)
```

## Syntax and Language Rules

### Reserved Keywords

The following words are reserved and cannot be used as identifiers:

- `function` - Function declaration
- `if`, `then`, `else`, `elsif`, `end` - Conditional statements
- `for`, `to`, `by`, `in`, `while`, `do` - Loop statements
- `break`, `continue`, `return` - Control flow
- `local`, `var`, `let` - Variable declaration
- `object`, `class`, `extends`, `new` - Object-oriented features
- `and`, `or`, `not` - Logical operators
- `after`, `every`, `sleep`, `delete` - Special functions
- `this`, `global`, `super`, `null` - Special values
- `true`, `false` - Boolean literals

### Identifiers

Identifiers must follow these rules:

- Start with a letter (a-z, A-Z) or underscore (`_`)
- Can contain letters, digits (0-9), and underscores
- Case-sensitive (`myVar` ≠ `MyVar`)
- Cannot be a reserved keyword
- Unicode letters are supported

Valid identifiers:

```lua
local myVariable = 10
local _private = 20
local player1 = "Alice"
local 玩家 = "Player"  // Unicode supported
```

Invalid identifiers:

```lua
local 123abc = 10     // Cannot start with digit
local my-var = 10     // Cannot contain hyphens
local function = 10   // Cannot use reserved keyword
```

### Literals

#### Number Literals

```lua
10          // Integer
3.14        // Float
-5          // Negative
0.5         // Decimal
1e10        // Scientific notation
0xFF        // Hexadecimal
```

#### String Literals

```lua
"Hello"           // Double quotes
'World'           // Single quotes
`Template ${x}`    // Template string
"""Multi-line"""  // Triple-quoted multi-line
```

#### Boolean Literals

```lua
true   // 1
false  // 0
```

#### Null Literal

```lua
null   // Absence of value
```

#### Array Literals

```lua
{1, 2, 3}                    // Array of numbers
{"a", "b", "c"}              // Array of strings
{1, "mixed", true, null}      // Mixed types
{}                            // Empty array
```

### Statement Syntax

#### Variable Declaration

```lua
local identifier = expression
local identifier: type = expression  // Type annotation (optional)
```

#### Assignment

```lua
identifier = expression
object.property = expression
array[index] = expression
```

#### Self-Assignment

```lua
identifier += expression
identifier -= expression
identifier *= expression
identifier /= expression
identifier %= expression
identifier &= expression
identifier |= expression
```

#### Function Declaration

```lua
function name(param1, param2, param3 = default)
  // body
end

// Or as assignment
local name = function(param1, param2)
  // body
end

// Arrow function
local name = (param1, param2) => expression
```

#### If Statement

```lua
if condition then
  // statements
elseif condition then
  // statements
else
  // statements
end
```

#### While Loop

```lua
while condition do
  // statements
end
```

#### For Loop

```lua
// Numeric for
for identifier = start to end by step do
  // statements
end

// For-in loop
for identifier in collection do
  // statements
end
```

#### Break and Continue

```lua
while condition do
  if someCondition then
    break      // Exit loop
  end
  if otherCondition then
    continue   // Skip to next iteration
  end
end
```

#### Return Statement

```lua
return expression
return              // Returns null
```

### Expression Syntax

#### Primary Expressions

```lua
identifier          // Variable
literal            // Literal value
(expression)       // Parenthesized expression
```

#### Property Access

```lua
object.property
object["property"]
array[index]
object.property.subproperty
```

#### Function Calls

```lua
functionName()
functionName(arg1, arg2)
object.method()
object.method(arg1, arg2)
```

#### Operator Expressions

Operators follow precedence rules (see Operator Precedence section):

```lua
a + b * c        // Multiplication first
(a + b) * c      // Parentheses override
a and b or c     // 'and' before 'or'
```

### Block Structure

All blocks must be properly closed:

```lua
// Function block
function name()
  // statements
end

// If block
if condition then
  // statements
end

// Loop blocks
while condition do
  // statements
end

for i = 1 to 10 do
  // statements
end

// Object/Class blocks
object
  property = value
end

class Name
  method = function(self)
    // body
  end
end
```

### Scoping Rules

1. **Global Scope**: Variables declared without `local` are global
2. **Local Scope**: Variables declared with `local` are scoped to the current block
3. **Function Scope**: Parameters and local variables are scoped to the function
4. **Block Scope**: Variables in `if`, `while`, `for` blocks are scoped to that block
5. **Shadowing**: Inner scopes can shadow outer scope variables

```lua
// Global variable
globalVar = 100

function example()
  // Local variable shadows global
  local globalVar = 50
  Console.log(globalVar)  // 50
  
  if true then
    // Another local shadows function local
    local globalVar = 25
    Console.log(globalVar)  // 25
  end
  
  Console.log(globalVar)  // 50
end

Console.log(globalVar)  // 100
```

### Type Annotations (Optional)

Type annotations are parsed but not enforced at runtime:

{% raw %}

```lua
local name: string = "Alice"
local age: number = 30
local items: number[] = {1, 2, 3}
local matrix: number[][] = {{1, 2}, {3, 4}}
```

{% endraw %}

Supported types:

- `number` - Numeric type
- `string` - String type
- `object` - Object type
- `list` or `number[]` - Array type
- `function` - Function type
- `number[]` - Array of numbers
- `number[][]` - Multi-dimensional arrays

### Object Syntax

```lua
// Object literal
object
  property1 = value1,
  property2 = value2,
  method = function(self, param)
    // body
  end
end

// Class definition
class ClassName extends ParentClass
  constructor = function(self, param)
    super(param)  // Call parent constructor
    self.property = value
  end,
  
  method = function(self)
    // body
  end
end

// Class instantiation
local instance = new ClassName(arg1, arg2)
```

### Special Syntax

#### Template Strings

```lua
local name = "Alice"
local msg = `Hello, ${name}!`  // "Hello, Alice!"
local expr = `Value: ${x + y}` // Expression interpolation
```

#### Arrow Functions

```lua
// Single parameter
local square = x => x * x

// Multiple parameters
local add = (a, b) => a + b

// No parameters
local getTime = () => Date.now()

// Multi-line (requires explicit return)
local complex = (x) => {
  local y = x * 2
  return y + 1
}
```

#### Time Unit Syntax

```lua
sleep(1 second)
sleep(500 milliseconds)
after(2 minutes, function() end)
every(1 hour, function() end)
```

### Syntax Errors to Avoid

1. **Missing `end`**: All blocks must be closed
2. **Unclosed strings**: All strings must be properly closed
3. **Invalid operators**: Use `==` not `=`, `!=` not `<>`
4. **Reserved keywords**: Cannot use keywords as identifiers
5. **Invalid property access**: Use `.` or `[]` for properties
6. **Missing commas**: Object/array elements must be comma-separated
7. **Invalid function syntax**: Arrow functions require `=>`

### Naming Conventions

While not enforced, these conventions are recommended:

- **Constants**: `UPPER_SNAKE_CASE` (e.g., `MAX_HEALTH`)
- **Variables**: `camelCase` (e.g., `playerHealth`)
- **Functions**: `camelCase` (e.g., `calculateDamage`)
- **Classes**: `PascalCase` (e.g., `Enemy`, `PlayerController`)
- **Private members**: Prefix with `_` (e.g., `_internalState`)

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
