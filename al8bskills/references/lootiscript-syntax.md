# LootiScript Syntax Reference

LootiScript is a custom scripting language for al8b. It looks like Lua at a glance but has **different syntax** in several areas. Read this before writing game code.

---

## Comments

```
// single-line comment

/* multi-line
   comment */
```

---

## Variables

```
local x = 10       // block-scoped (also: var or let — all equivalent)
name = "hello"     // global (no keyword)
```

`local`, `var`, and `let` are identical — all declare a block-scoped variable.

---

## Functions

Functions are values assigned to variables:

```
greet = function()
    return "hello"
end

add = function(a, b)
    return a + b
end

// Default argument values
spawn = function(x, y, type = "enemy")
    // ...
end
```

Arrow functions (single expression, returns implicitly):

```
double = (x) => x * 2
clamp = (v, lo, hi) => math.max(lo, math.min(hi, v))
```

---

## Lifecycle Functions

The game lifecycle hooks are just regular variables set to functions:

```
init = function()
    // called once, after all assets load
end

update = function()
    // called every frame
    local dt = system.dt / 1000
end

draw = function()
    // called every frame for rendering
    screen.clear("#1a1a2e")
end
```

---

## Objects

Objects use `object ... end` syntax. Fields are `key = value` pairs, no commas:

```
local player = object
    x = 100
    y = 200
    hp = 100
    name = "hero"
end

// Access and modify
player.x = 150
player["name"] = "warrior"

// Nested objects
local config = object
    position = object
        x = 0
        y = 0
    end
    size = object
        w = 16
        h = 32
    end
end
```

Objects can be passed **inline** as function arguments:

```
physics.addBody(object
    x = 100
    y = 50
    mass = 1
    shape = object
        type = "aabb"
        x = -8
        y = -16
        w = 16
        h = 32
    end
    tag = "player"
end)
```

---

## Arrays

Arrays use `[...]` bracket syntax:

```
local scores = [10, 20, 30]
local names  = ["alice", "bob", "carol"]
local empty  = []

// Access by index (0-based)
local first = scores[0]
scores[0] = 99

// Nested
local grid = [[1, 2], [3, 4]]
```

---

## Conditionals

```
if x > 0 then
    positive()
elsif x == 0 then
    zero()
else
    negative()
end
```

Note: the keyword is `elsif`, **not** `elseif`.

---

## For Loop (numeric)

```
for i = 0 to 10
    print(i)    // 0, 1, 2, ... 10
end

// With step
for i = 0 to 100 by 5
    print(i)    // 0, 5, 10, ... 100
end

// Countdown
for i = 10 to 0 by -1
    print(i)
end
```

---

## For-in Loop (iterator)

```
local items = ["sword", "shield", "potion"]

for item in items
    print(item)
end
```

---

## While Loop

```
while x > 0
    x -= 1
end
```

No `do` keyword — the body runs until `end`.

---

## Break / Continue / Return

```
for i = 0 to 10
    if i == 5 then
        break       // exit loop
    end
    if i == 3 then
        continue    // skip to next iteration
    end
end

my_func = function()
    if early then
        return      // return without value
    end
    return 42       // return with value
end
```

---

## Classes

```
Animal = class
    name = "unknown"
    sound = "..."

    speak = function(self)
        print(self.name + " says " + self.sound)
    end
end

Dog = class extends Animal
    sound = "woof"

    fetch = function(self, item)
        print(self.name + " fetches " + item)
    end
end

local rex = new Dog()
rex.name = "Rex"
rex.speak()            // Rex says woof
rex.fetch("ball")
```

The first argument of methods is always `self` (the instance).

---

## Time Operators

Built-in timed execution — no external timer needed:

```
// Run once after a delay
after 500 milliseconds do
    spawn_powerup()
end

// Run repeatedly
every 2 seconds do
    wave_count += 1
    spawn_wave(wave_count)
end

// Pause execution (inside a coroutine-like context)
sleep 1 second
```

Time units: `millisecond`, `milliseconds`, `second`, `seconds`, `minute`, `minutes`, `hour`, `hours`, `day`, `days`

---

## Template Strings

Embed expressions inside strings with `` ` `` and `${}`:

```
local msg = `Hello ${player.name}!`
local info = `HP: ${hp} / ${max_hp}  Level: ${level}`
screen.drawText(info, 10, 10, 14)
```

---

## String Concatenation

Use `+` to join strings (not `..`):

```
local full_name = first + " " + last
local label = "Score: " + score
```

---

## Operators

| Category | Operators |
|---|---|
| Arithmetic | `+`, `-`, `*`, `/`, `%`, `^` (power) |
| Comparison | `==`, `!=`, `<`, `<=`, `>`, `>=` |
| Logical | `and`, `or`, `not` |
| Bitwise | `&`, `\|`, `<<`, `>>` |
| Self-assign | `+=`, `-=`, `*=`, `/=`, `%=`, `&=`, `\|=` |

---

## Delete

```
delete player.temp_data     // remove a field
delete local_cache          // remove a variable
```

---

## Predefined Constants

| Constant | Value |
|---|---|
| `nil` | null / no value |
| `true` | boolean true |
| `false` | boolean false |

---

## Not Like Lua

If you know Lua, watch out for these differences:

| Feature | Lua | LootiScript |
|---|---|---|
| Comments | `-- text` | `// text` |
| Object literal | `{ key = val }` | `object key = val end` |
| Array literal | `{ 1, 2, 3 }` | `[1, 2, 3]` |
| Function declaration | `function name() end` | `name = function() end` |
| Numeric for | `for i = 1, 10 do ... end` | `for i = 1 to 10 ... end` |
| Iterator for | `for k, v in pairs(t) do ... end` | `for v in list ... end` |
| While | `while cond do ... end` | `while cond ... end` |
| Else-if | `elseif` | `elsif` |
| Not equal | `~=` | `!=` |
| Concatenation | `..` | `+` |
| No `do` blocks | `do ... end` (standalone) | not supported |
