# HTTP API

The `http` object provides fetch-like functionality for making HTTP requests to external APIs.

## Basic Methods

### `http.get(url, options?)`

Make a GET request.

```lua
local response = await http.get("https://api.example.com/data")
if response.ok() == 1 then
  local data = response.json()
  print("Data: " .. data)
end
```

### `http.post(url, body?, options?)`

Make a POST request.

```lua
local response = await http.post(
  "https://api.example.com/data",
  {
    name = "John",
    age = 30
  }
)
```

### `http.put(url, body?, options?)`

Make a PUT request.

```lua
local response = await http.put(
  "https://api.example.com/data/123",
  {
    name = "Jane",
    age = 25
  }
)
```

### `http.delete(url, options?)`

Make a DELETE request.

```lua
local response = await http.delete("https://api.example.com/data/123")
```

### `http.request(url, options)`

Make a custom HTTP request with full control.

```lua
local response = await http.request("https://api.example.com/data", {
  method = "POST",
  headers = {
    ["Authorization"] = "Bearer token123",
    ["Content-Type"] = "application/json"
  },
  body = {
    key = "value"
  },
  timeout = 5000  -- 5 seconds
})
```

## Response Object

All HTTP methods return a `HttpResponse` object.

### Properties

- `response.status` - HTTP status code (number)
- `response.headers` - Response headers (table)

### Methods

#### `response.ok()`

Check if response is OK (status 200-299). Returns `1` for true, `0` for false.

```lua
if response.ok() == 1 then
  print("Request successful")
end
```

#### `response.json()`

Parse response body as JSON.

```lua
local data = response.json()
```

#### `response.jsonOrThrow()`

Parse response body as JSON. Throws error if response is not OK or invalid JSON.

```lua
// Throws error if status is not 200-299
local data = response.jsonOrThrow()
```

#### `response.jsonOrNull()`

Parse response body as JSON. Returns null if response is not OK or invalid JSON.

```lua
local data = response.jsonOrNull()
if data then
  print("Success: " .. data.name)
end
```

#### `response.ensureOk()`

Ensure response is OK, throws error if not.

```lua
response.ensureOk()  // Throws if not OK
local data = response.json()  // Safe to use
```

#### `response.text()`

Get response body as text.

```lua
local text = response.text()
```

#### `response.data()`

Alias for `text()`. Get response body as text.

```lua
local data = response.data()
```

## Request Options

### Headers

Set custom headers:

```lua
local response = await http.get("https://api.example.com/data", {
  headers = {
    ["Authorization"] = "Bearer token123",
    ["X-Custom-Header"] = "value"
  }
})
```

### Timeout

Set request timeout in milliseconds (default: 30000 = 30 seconds):

```lua
local response = await http.get("https://api.example.com/data", {
  timeout = 5000  -- 5 seconds
})
```

### Body

For POST/PUT requests, body can be:

- Object (will be JSON stringified)
- String (sent as-is)

```lua
// Object (auto JSON stringified)
local response = await http.post("https://api.example.com/data", {
  name = "John",
  age = 30
})

// String (sent as-is)
local response = await http.post("https://api.example.com/data", '{"name":"John"}', {
  headers = {
    ["Content-Type"] = "application/json"
  }
})
```

## Development Features

### HTTP Request Logging

In development mode, all HTTP requests are automatically logged to the console:

```text
[HTTP] GET    200 https://api.example.com/data (45ms) 1.2KB
[HTTP] POST   201 https://api.example.com/users (120ms) 500B
```

### Enhanced Error Messages

HTTP errors include helpful context:

- **CORS errors**: Includes URL, method, and suggestions
- **Timeout errors**: Shows timeout duration and suggestions
- **Network errors**: Provides troubleshooting tips

## Examples

### Fetching Data

```lua
async function fetchUserData(userId)
  try
    local response = await http.get("https://api.example.com/users/" .. userId)

    if response.ok() == 1 then
      local user = response.json()
      return user
    else
      print("Error: " .. response.status)
      return null
    end
  catch (error)
    print("Request failed: " .. error)
    return null
  end
end
```

### Posting Data

```lua
async function saveScore(score)
  try
    local response = await http.post("https://api.example.com/scores", {
      score = score,
      timestamp = system.time
    }, {
      headers = {
        ["Authorization"] = "Bearer " .. authToken
      }
    })

    if response.ok() == 1 then
      return response.json()
    else
      return null
    end
  catch (error)
    print("Request failed: " .. error)
    return null
  end
end
```

### Using Helpers

```lua
// Using jsonOrNull for safe handling
local data = await http.get("https://api.example.com/data").jsonOrNull()
if data then
  print("Success: " .. data.name)
end

// Using ensureOk for strict error handling
try
  local response = await http.get("https://api.example.com/data")
  response.ensureOk()  // Throws if not OK
  local data = response.json()
catch (error)
  print("Error: " .. error)
end
```
