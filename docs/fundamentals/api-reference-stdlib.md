# Standard Library

L8B provides standard library utilities accessible as global objects: `Math`, `String`, `List`, and `JSON`.

## Math

### Basic Functions

- `Math.abs(x)`, `Math.sqrt(x)`, `Math.floor(x)`, `Math.ceil(x)`, `Math.round(x)`
- `Math.min(...args)`, `Math.max(...args)`, `Math.pow(base, exp)`
- `Math.log(x)`, `Math.exp(x)`

### Trigonometry

- `Math.sin(x)`, `Math.cos(x)`, `Math.tan(x)`: Functions in radians
- `Math.asin(x)`, `Math.acos(x)`, `Math.atan(x)`: Inverse functions
- `Math.atan2(y, x)`: Arc tangent 2

### Angle Conversion

- `Math.degToRad(degrees)`: Convert degrees to radians
- `Math.radToDeg(radians)`: Convert radians to degrees

### Random

- `Math.random()`: Random number [0..1)
- `Math.randomInt(min, max)`: Random integer [min..max]
- `Math.randomFloat(min, max)`: Random float [min..max)

### Game Utilities

- `Math.clamp(value, min, max)`: Clamp value between min and max
- `Math.lerp(a, b, t)`: Linear interpolation
- `Math.distance(x1, y1, x2, y2)`: Distance between two points
- `Math.distance3D(x1, y1, z1, x2, y2, z2)`: 3D distance
- `Math.angleBetween(x1, y1, x2, y2)`: Angle between two points (radians)
- `Math.sign(x)`: Sign of number (-1, 0, or 1)
- `Math.mod(n, m)`: Euclidean modulo

### Constants

- `Math.PI`: Pi (3.14159...)
- `Math.E`: Euler's number (2.71828...)

## String

### Split & Join

- `String.split(str, separator)`: Split string into array
- `String.join(arr, separator)`: Join array into string

### Trim

- `String.trim(str)`: Remove whitespace from both ends
- `String.trimStart(str)`: Remove whitespace from start
- `String.trimEnd(str)`: Remove whitespace from end

### Replace

- `String.replace(str, search, replacement)`: Replace first occurrence
- `String.replaceAll(str, search, replacement)`: Replace all occurrences

### Case

- `String.toLowerCase(str)`: Convert to lowercase
- `String.toUpperCase(str)`: Convert to uppercase

### Search

- `String.startsWith(str, prefix)`: Check if starts with prefix
- `String.endsWith(str, suffix)`: Check if ends with suffix
- `String.contains(str, search)`: Check if contains substring
- `String.indexOf(str, search, fromIndex?)`: Find first occurrence index
- `String.lastIndexOf(str, search, fromIndex?)`: Find last occurrence index

### Substring

- `String.substring(str, start, end)`: Extract substring
- `String.slice(str, start, end)`: Extract substring (slice)

### Character

- `String.charAt(str, index)`: Get character at index
- `String.charCodeAt(str, index)`: Get character code
- `String.fromCharCode(...codes)`: Create string from character codes

### Formatting

- `String.repeat(str, count)`: Repeat string
- `String.padStart(str, length, pad)`: Pad start with character
- `String.padEnd(str, length, pad)`: Pad end with character
- `String.format(template, ...args)`: Format string with placeholders `{0}`, `{1}`, etc.

### Parse

- `String.parseInt(str, radix?)`: Parse integer
- `String.parseFloat(str)`: Parse float

## List (Array)

### Functional Methods

- `List.map(arr, fn)`: Map array elements
- `List.filter(arr, fn)`: Filter array elements
- `List.reduce(arr, fn, initial)`: Reduce array to single value
- `List.find(arr, fn)`: Find first matching element
- `List.findIndex(arr, fn)`: Find index of first match
- `List.some(arr, fn)`: Check if any element matches
- `List.every(arr, fn)`: Check if all elements match

### Manipulation (Non-mutating)

- `List.reverse(arr)`: Reverse array (returns new array)
- `List.sort(arr, fn?)`: Sort array (returns new array)
- `List.slice(arr, start, end)`: Extract subarray
- `List.concat(...arrays)`: Concatenate arrays
- `List.flat(arr, depth?)`: Flatten nested arrays
- `List.flatMap(arr, fn)`: Map and flatten

### Search

- `List.indexOf(arr, item, fromIndex?)`: Find index of item
- `List.lastIndexOf(arr, item, fromIndex?)`: Find last index of item
- `List.includes(arr, item, fromIndex?)`: Check if array includes item

### Access

- `List.first(arr)`: Get first element
- `List.last(arr)`: Get last element
- `List.at(arr, index)`: Get element at index (supports negative)

### Mutating Methods

- `List.push(arr, ...items)`: Add items to end (mutates)
- `List.pop(arr)`: Remove and return last element
- `List.shift(arr)`: Remove and return first element
- `List.unshift(arr, ...items)`: Add items to start (mutates)
- `List.splice(arr, start, deleteCount, ...items)`: Insert/remove elements

### Utilities

- `List.fill(arr, value, start?, end?)`: Fill array with value (returns new)
- `List.join(arr, separator)`: Join array into string
- `List.unique(arr)`: Remove duplicates (returns new)
- `List.shuffle(arr)`: Shuffle array (returns new)
- `List.chunk(arr, size)`: Split into chunks
- `List.sum(arr)`: Sum of numbers
- `List.average(arr)`: Average of numbers
- `List.min(arr)`: Minimum value
- `List.max(arr)`: Maximum value

## JSON

- `JSON.encode(value)`: Encode value to JSON string
- `JSON.decode(json)`: Decode JSON string to value
- `JSON.pretty(value, indent?)`: Pretty-print JSON with indentation

## Examples

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
