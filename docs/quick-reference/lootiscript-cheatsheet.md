# LootiScript Cheatsheet

Quick reference untuk LootiScript 2.0

## Variables

### Local

```lua
f = function()
  local count = 0
  while count < 100
    // ...
  end
end // visibility of local variable stops here
```

**Aliases:** `var` dan `let` juga dapat digunakan sebagai alias untuk `local`

```lua
var x = 10
let y = 20
local z = 30  // semua sama
```

**Tips:**

- Gunakan local variables untuk temporary values dalam functions
- Hindari mixing local dan global variables dengan nama sama

### Global

```lua
score = 0
level = 1
```

### Object Properties

```lua
player = object
  position_x = 0
  position_y = 0
  setPosition = function(x,y)
    position_x = x // sets player.position_x
    position_y = y // sets player.position_y
  end
end
```

- Global variables dapat diakses dengan prefix `global.`

```lua
player = object
  update = function()
    global.score += 1
  end
end
```

### Type Checking

```lua
myvar.type
myobject.some_property.type
```

| Check | Meaning |
|-------|---------|
| `myvar.type == 0` | not defined |
| `myvar.type == "number"` | number |
| `myvar.type == "string"` | string |
| `myvar.type == "function"` | function |
| `myvar.type == "list"` | list |
| `myvar.type == "object"` | object |

### Delete Properties

```lua
delete myobject.some_property
delete this.something
delete some_variable
delete myobject[getPropertyToDelete()]
```

## Numbers

### Formatting

```lua
a = 1
b = 1.2
c = -4.5e-5    // = -4.5*10^(-5)
```

### Hexadecimal

```lua
h = 0x7FFF
```

### Conversion

| Function | Description |
|----------|-------------|
| `Number.parse(string)` | Parse string to number |
| `num.toString()` | Number to string |

### Operations

| Operator | Description | Operator | Description |
|----------|-------------|----------|-------------|
| `a + b` | Addition | `a - b` | Subtraction |
| `a * b` | Multiplication | `a / b` | Division |
| `a ^ b` | Exponent | `a % b` | Remainder |
| `a & b` | Binary AND | `a \| b` | Binary OR |
| `a += b` | Add assign | `a -= b` | Subtract assign |
| `a *= b` | Multiply assign | `a /= b` | Divide assign |
| `a %= b` | Modulo assign | `a &= b` | AND assign |
| `a \|= b` | OR assign | | |

## Strings

### Delimiters

```lua
"double-quote delimited string"
'simple-quote delimited string'
"""triple double-quote delimited string"""
`template string`  // backtick template strings
```

### Escaping

| Escape | Result |
|--------|--------|
| `\"` | double quote |
| `\n` | line feed |
| `\\` | backslash |
| `""` | single double-quote (in double-quoted string) |

### Operations

| Operation | Description |
|-----------|-------------|
| `string1 + string2` | Concatenate strings |
| `string.length` | Length of string |
| `string.substring(i1, i2)` | Substring from i1 to i2 |
| `string.startsWith(s)` | Check if starts with s |
| `string.endsWith(s)` | Check if ends with s |
| `string.indexOf(s)` | First occurrence index or -1 |
| `string.lastIndexOf(s)` | Last occurrence index or -1 |
| `string.replace(s1, s2)` | Replace s1 with s2 |
| `string.toUpperCase()` | Convert to uppercase |
| `string.toLowerCase()` | Convert to lowercase |
| `string.split(s)` | Split into list by separator |
| `string.charAt(pos)` | Character at position |
| `string.charCodeAt(pos)` | UTF-16 code at position |
| `string.concat(str2)` | Concatenate with str2 |
| `string.trim()` | Remove leading/trailing spaces |
| `string.trimEnd()` | Remove trailing spaces |
| `string.trimStart()` | Remove leading spaces |
| `String.fromCharCode(code)` | Character from code |

## Lists

### Operations

| Operation | Description |
|-----------|-------------|
| `list = []` | Empty list |
| `list.length` | Length of list |
| `list.push(element)` | Add to end |
| `list.pop()` | Remove and return last element |
| `list += element` | Same as push |
| `list.insert(element)` | Insert at beginning |
| `list.insertAt(element, index)` | Insert at index |
| `list.indexOf(element)` | Position or -1 |
| `list.contains(element)` | 1 if found, 0 otherwise |
| `list.removeAt(index)` | Remove at index |
| `list.removeElement(element)` | Remove element |
| `list1.concat(list2)` | Concatenate lists |
| `list1 += list2` | Same as concat |
| `list3 = list1 + list2` | Concatenation |
| `list.sortList(func)` | Sort with comparison function |

## Objects

### Create

```lua
obj = object
  x = 1
  y = 2
end
```

### Properties

```lua
obj.x = 2
obj["y"] = obj.x + 3
```

### Methods

```lua
obj.incrementX = function() x += 1 end
obj.incrementX()
```

## Functions

### Definition

```lua
add = function(x, y)
  return x + y
end
```

### Arrow Functions

```lua
// Single parameter
double = x => x * 2

// Multiple parameters
add = (a, b) => a + b

// Empty parameters
greet = () => print("Hello!")
```

### Invocation

```lua
five = add(2, 3)
```

### Default Args

```lua
display = function(text = "placeholder text")
  print(text)
end

display("My text")
display()
```

### Implicit Returns

```lua
square = function(x) x * x end
```

## Loops

### For Loop

```lua
// Range
for i = 1 to 10
  print(i)
end

// With step
for i = 10 to 0 by -1
  print("countdown: " + i)
end

// Iterate list
list = [1, 2, 3, 4, 5]
for element in list
  print(element)
end

// Iterate object properties
obj = object
  x = 1
  y = 2
  z = 3
end

for prop in obj
  print(prop + " = " + obj[prop])
end
```

### While Loop

```lua
count = 0
while count < 1000
  print(count)
  count += 1
end
```

### Break & Continue

```lua
while true
  x += 1
  if x >= 100 then break end
end

for i = 0 to 100
  if i % 10 == 0 then continue end
  doSomething(i)
end
```

## Conditionals

### If Statement

```lua
if x == 1 then
  print("one")
elsif x == 2 then
  print("two")
elsif x > 2 then
  print("more")
else
  print("less than one")
end
```

### Conditional Expressions

```lua
sign_x = if x >= 0 then "positive" else "negative" end
```

## Random

```lua
// Random number [0..1]
random.next()

// Random integer [0..99]
random.nextInt(100)

// Reseed generator
random.seed(1234)

// Clone generator
r = random.clone()

// Reseeded clone
r = random.clone(1234)

// Use clone
r.next()
```

## Scheduler

### After

```lua
after 5 seconds do
  backToMainMenu()
end
```

### Every

```lua
every 200 milliseconds do
  score += 100
end
```

### Do (Threads)

```lua
do  // Execute in separate thread
  for i = 1 to 100000000
    doHeavyWork(i)
  end
end
```

### Sleep

```lua
sleep 1 second
sleep 200 milliseconds
sleep 200  // default: milliseconds
```

### Time Units

| Unit | Example |
|------|---------|
| `millisecond(s)` | `after 500 milliseconds` |
| `second(s)` | `every 2 seconds` |
| `minute(s)` | `after 5 minutes` |
| `hour(s)` | `every 1 hour` |
| `day(s)` | `after 1 day` |

## Threads

```lua
// All return thread value
thread = every 1000 do print(counter += 1) end

thread.pause()
thread.resume()
thread.stop()

// List secondary threads
for t in system.threads
  t.pause()
end
```

## Predefined Functions

### Math

| Function | Description | Function | Description |
|----------|-------------|----------|-------------|
| `round(x)` | Round | `sin(x)` | Sine (radians) |
| `floor(x)` | Floor | `cos(x)` | Cosine (radians) |
| `ceil(x)` | Ceiling | `tan(x)` | Tangent (radians) |
| `abs(x)` | Absolute | `asin(x)` | Arc sine |
| `sqrt(x)` | Square root | `acos(x)` | Arc cosine |
| `log(x)` | Natural log | `atan(x)` | Arc tangent |
| `exp(x)` | Exponential | `atan2(y,x)` | Arc tangent 2 |
| `pow(x,y)` | Power | | |
| `min(x,y)` | Minimum | `max(x,y)` | Maximum |

### Trigonometry (Degrees)

| Function | Description |
|----------|-------------|
| `sind(x)` | Sine (degrees) |
| `cosd(x)` | Cosine (degrees) |
| `tand(x)` | Tangent (degrees) |
| `asind(x)` | Arc sine (degrees) |
| `acosd(x)` | Arc cosine (degrees) |
| `atand(x)` | Arc tangent (degrees) |
| `atan2d(y,x)` | Arc tangent 2 (degrees) |

### Constants

| Constant | Value |
|----------|-------|
| `PI` | Number Pi |
| `true` | 1 |
| `false` | 0 |

## Classes

### Definition

```lua
MyClass = class extends MyParentClass
  constructor = function(x, y, size)
    super(x, y)
    this.size = size
  end

  getSize = function()
    return size
  end
end
```

### Usage

```lua
my_object = new MyClass(10, 12, 20)
print(my_object.getSize())
```

## Comments

```lua
// Line comment
x = 1 // End of line comment

/* Block
   comment
   */

if /*inline*/ false then doSomething() end
```

## Comparison Operators

| Operator | Description |
|----------|-------------|
| `==` | Equal |
| `!=` | Not equal |
| `<` | Less than |
| `>` | Greater than |
| `<=` | Less or equal |
| `>=` | Greater or equal |

## Boolean Operators

| Operator | Description |
|----------|-------------|
| `and` | Logical AND |
| `or` | Logical OR |
| `not` | Logical NOT |
