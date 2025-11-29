# @l8b/http

**LootiScript API Binding** - HTTP client for external API requests.

> **Note**: This package is used as an API binding for LootiScript in the l8b engine. It provides fetch-like functionality for making HTTP requests to external APIs.

## API Reference

### Basic Usage

#### http.get()

Make a GET request.

```lua
local response = await http.get("https://api.example.com/data")
if response.ok() == 1 then
  local data = response.json()
  print("Data: " .. data)
else
  print("Error: " .. response.status)
end
```

#### http.post()

Make a POST request.

```lua
local response = await http.post(
  "https://api.example.com/data",
  {
    name = "John",
    age = 30
  }
)
if response.ok() == 1 then
  local result = response.json()
  print("Result: " .. result)
end
```

#### http.put()

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

#### http.delete()

Make a DELETE request.

```lua
local response = await http.delete("https://api.example.com/data/123")
```

#### http.request()

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

### Response Object

All HTTP methods return a `HttpResponse` object with the following methods:

#### response.status

HTTP status code (number).

```lua
local status = response.status
if status == 200 then
  print("Success!")
end
```

#### response.ok()

Check if response is OK (status 200-299). Returns `1` for true, `0` for false.

```lua
if response.ok() == 1 then
  print("Request successful")
else
  print("Request failed")
end
```

#### response.json()

Parse response body as JSON.

```lua
local data = response.json()
print("Name: " .. data.name)
```

#### response.jsonOrThrow()

Parse response body as JSON. Throws error if response is not OK or invalid JSON.

```lua
// Throws error if status is not 200-299
local data = response.jsonOrThrow()
// Use data directly without checking ok()
```

#### response.jsonOrNull()

Parse response body as JSON. Returns null if response is not OK or invalid JSON.

```lua
// Returns null if error, otherwise parsed JSON
local data = response.jsonOrNull()
if data then
  print("Success: " .. data.name)
else
  print("Request failed")
end
```

#### response.ensureOk()

Ensure response is OK, throws error if not.

```lua
// Throws error if status is not 200-299
response.ensureOk()
// Now safe to use response
local data = response.json()
```

#### response.text()

Get response body as text.

```lua
local text = response.text()
print("Response: " .. text)
```

#### response.data()

Alias for `text()`. Get response body as text.

```lua
local data = response.data()
```

#### response.headers

Access response headers.

```lua
local contentType = response.headers["Content-Type"]
```

### Request Options

#### Headers

Set custom headers:

```lua
local response = await http.get("https://api.example.com/data", {
  headers = {
    ["Authorization"] = "Bearer token123",
    ["X-Custom-Header"] = "value"
  }
})
```

#### Timeout

Set request timeout in milliseconds (default: 30000 = 30 seconds):

```lua
local response = await http.get("https://api.example.com/data", {
  timeout = 5000  -- 5 seconds
})
```

#### Body

For POST/PUT requests, body can be:
- Object (will be JSON stringified)
- String (sent as-is)

```lua
-- Object (auto JSON stringified)
local response = await http.post("https://api.example.com/data", {
  name = "John",
  age = 30
})

-- String (sent as-is)
local response = await http.post("https://api.example.com/data", '{"name":"John"}', {
  headers = {
    ["Content-Type"] = "application/json"
  }
})
```

## Example Usage

### Fetching Data from API

```lua
async function fetchUserData(userId)
  try
    local response = await http.get("https://api.example.com/users/" .. userId)
    
    if response.ok() == 1 then
      local user = response.json()
      print("User: " .. user.name)
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

### Posting Data to API

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
      local result = response.json()
      print("Score saved: " .. result.id)
      return result
    else
      print("Failed to save score: " .. response.status)
      return null
    end
  catch (error)
    print("Request failed: " .. error)
    return null
  end
end
```

### Webhook Integration

```lua
async function sendWebhook(event, data)
  try
    local response = await http.post("https://webhook.example.com/events", {
      event = event,
      data = data,
      timestamp = system.time
    }, {
      headers = {
        ["X-Webhook-Secret"] = webhookSecret
      },
      timeout = 10000  -- 10 seconds
    })
    
    return response.ok() == 1
  catch (error)
    print("Webhook failed: " .. error)
    return false
  end
end
```

### Error Handling

```lua
async function safeRequest(url)
  try
    local response = await http.get(url, {
      timeout = 5000
    })
    
    if response.ok() == 1 then
      return response.json()
    else
      print("HTTP Error: " .. response.status)
      return null
    end
  catch (error)
    print("Network Error: " .. error)
    return null
  end
end
```

### Custom Request

```lua
async function customRequest()
  local response = await http.request("https://api.example.com/data", {
    method = "PATCH",
    headers = {
      ["Authorization"] = "Bearer token",
      ["Content-Type"] = "application/json",
      ["X-Custom-Header"] = "value"
    },
    body = {
      field = "value"
    },
    timeout = 10000
  })
  
  if response.ok() == 1 then
    return response.json()
  else
    print("Error: " .. response.status)
    return null
  end
end
```

## Development Features

### HTTP Request Logging

In development mode, all HTTP requests are automatically logged to the console:

```
[HTTP] GET    200 https://api.example.com/data (45ms) 1.2KB
[HTTP] POST   201 https://api.example.com/users (120ms) 500B
[HTTP] GET    404 https://api.example.com/notfound (30ms) - Not Found
```

This helps with debugging API calls during development.

### Enhanced Error Messages

HTTP errors include helpful context:

```lua
// CORS errors
[E7xxx] CORS error: API server needs to allow requests from your domain.
  URL: https://api.example.com/data
  Method: GET
  Suggestion: Check CORS headers on API server or use a proxy

// Timeout errors
[E7xxx] Request timeout: Server took too long to respond.
  URL: https://api.example.com/data
  Timeout: 30000ms
  Suggestion: Increase timeout or check server status
```

## Notes

- All requests are asynchronous and must be awaited
- Default timeout is 30 seconds
- Request body objects are automatically JSON stringified
- Response headers are accessible as a table
- CORS is handled by the browser/runtime environment
- Errors are thrown as exceptions and should be caught with try/catch
- HTTP requests are automatically logged in development mode

