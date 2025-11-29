# L8B Optimizations untuk Farcaster Mini App + HTTP

Dokumen ini menjelaskan optimasi yang bisa dilakukan di LootiScript dan Framework untuk meningkatkan Developer Experience dengan Farcaster Mini App API + HTTP.

## 1. LootiScript Optimizations

### 1.1 Enhanced Error Handling untuk HTTP

**Masalah:** Error dari HTTP request tidak memberikan context yang cukup.

**Solusi:** Tambahkan syntax sugar untuk HTTP error handling:

```lua
// Current (verbose)
try
  local response = await http.get("https://api.example.com/data")
  if response.ok() == 0 then
    print("Error: " .. response.status)
    return
  end
  local data = response.json()
catch (error)
  print("Request failed: " .. error)
end

// Optimized (proposed)
local response = await http.get("https://api.example.com/data")
  .catch(function(error)
    print("Request failed: " .. error)
    return null
  end)

if response == null then
  return
end

local data = response.json()
```

**Implementasi:**
- Extend HTTP service untuk return Promise-like object
- Add `.catch()` method untuk error handling
- Auto-parse common error responses

### 1.2 HTTP Response Helpers

**Masalah:** Response handling terlalu verbose.

**Solusi:** Tambahkan helper methods:

```lua
// Current
local response = await http.get(url)
if response.ok() == 1 then
  local data = response.json()
  // use data
end

// Optimized
local data = await http.get(url).json()  // Auto-throws if not ok
// atau
local data = await http.get(url).jsonOr(null)  // Returns null on error
```

### 1.3 Request Builder Pattern

**Masalah:** Complex requests dengan banyak options sulit dibaca.

**Solusi:** Fluent API builder:

```lua
// Current
local response = await http.request("https://api.example.com/data", {
  method = "POST",
  headers = {
    ["Authorization"] = "Bearer " .. token,
    ["Content-Type"] = "application/json"
  },
  body = { key = "value" },
  timeout = 5000
})

// Optimized
local response = await http
  .post("https://api.example.com/data")
  .header("Authorization", "Bearer " .. token)
  .header("Content-Type", "application/json")
  .body({ key = "value" })
  .timeout(5000)
  .send()
```

### 1.4 Auto-Retry untuk HTTP

**Masalah:** Network errors perlu manual retry logic.

**Solusi:** Built-in retry dengan exponential backoff:

```lua
// Optimized
local response = await http.get("https://api.example.com/data")
  .retry(3)  // Retry 3 times
  .backoff(1000)  // Start with 1s delay, exponential

// atau dengan options
local response = await http.get(url)
  .retry({
    maxAttempts = 3,
    delay = 1000,
    exponential = true,
    onRetry = function(attempt, error)
      print("Retry attempt " .. attempt)
    end
  })
```

### 1.5 Request/Response Interceptors

**Masalah:** Perlu add auth headers atau logging di setiap request.

**Solusi:** Global interceptors:

```lua
// Setup interceptor (in init)
http.interceptors.request.add(function(config)
  // Add auth token to all requests
  config.headers = config.headers || {}
  config.headers["Authorization"] = "Bearer " .. authToken
  return config
end)

http.interceptors.response.add(function(response)
  // Log all responses
  print("Response: " .. response.status)
  return response
end)
```

## 2. Framework Optimizations

### 2.1 Enhanced HTTP Error Messages

**Masalah:** HTTP errors tidak memberikan context yang berguna.

**Solusi:** Framework auto-enhance error messages:

```typescript
// packages/core/http/src/http-service.ts
// Auto-detect common errors and provide suggestions
if (error.message.includes("CORS")) {
  throw new Error(
    "[E7xxx] CORS error: API server needs to allow requests from your domain.\n" +
    "  URL: " + url + "\n" +
    "  Suggestion: Check CORS headers on API server"
  );
}

if (error.message.includes("timeout")) {
  throw new Error(
    "[E7xxx] Request timeout: Server took too long to respond.\n" +
    "  URL: " + url + "\n" +
    "  Timeout: " + timeout + "ms\n" +
    "  Suggestion: Increase timeout or check server status"
  );
}
```

### 2.2 HTTP Request Caching

**Masalah:** Repeated requests ke same URL waste bandwidth.

**Solusi:** Built-in caching dengan TTL:

```lua
// Auto-cache GET requests
local response1 = await http.get("https://api.example.com/data")
  .cache(60)  // Cache for 60 seconds

// Same URL within 60s returns cached response
local response2 = await http.get("https://api.example.com/data")
  // Returns cached response1, no network call
```

### 2.3 Dev Tools untuk HTTP Debugging

**Masalah:** Sulit debug HTTP requests di development.

**Solusi:** Built-in HTTP logger di dev mode:

```typescript
// packages/framework/cli/src/commands/dev.ts
// Add HTTP request logger middleware
if (process.env.NODE_ENV === "development") {
  // Log all HTTP requests from LootiScript
  // Show in terminal: method, URL, status, time
}
```

**Output:**
```
[HTTP] GET https://api.example.com/data
  Status: 200
  Time: 45ms
  Size: 1.2KB
```

### 2.4 Type Generation dari Contract Imports

**Masalah:** Contract imports tidak generate types untuk autocomplete.

**Solusi:** Generate TypeScript definitions untuk language server:

```bash
l8b contract import 0x... --chain base --name MyContract --generate-types
```

**Output:**
- `src/contracts/MyContract.loot` - LootiScript wrapper
- `src/contracts/MyContract.d.ts` - TypeScript definitions (untuk language server)

### 2.5 Request Validation

**Masalah:** HTTP requests dengan invalid data tidak terdeteksi early.

**Solusi:** Schema validation untuk request body:

```lua
// Validate request before sending
local response = await http.post("https://api.example.com/save", {
  score = 100,
  player = "Alice"
})
  .validate({
    score = "number",
    player = "string"
  })
```

### 2.6 Response Transformation

**Masalah:** API responses perlu di-transform sebelum digunakan.

**Solusi:** Built-in transformers:

```lua
// Auto-transform response
local users = await http.get("https://api.example.com/users")
  .json()
  .map(function(user)
    return {
      id = user.id,
      name = user.full_name,
      avatar = user.profile_picture_url
    }
  end)
```

## 3. LootiScript Language Enhancements

### 3.1 Optional Chaining untuk HTTP Responses

**Masalah:** Nested property access bisa error jika response structure berbeda.

**Solusi:** Optional chaining operator:

```lua
// Current
local response = await http.get(url)
if response.ok() == 1 then
  local data = response.json()
  if data and data.user and data.user.name then
    print(data.user.name)
  end
end

// Optimized
local name = await http.get(url)
  .json()
  ?.user
  ?.name

if name then
  print(name)
end
```

### 3.2 Nullish Coalescing untuk Default Values

**Masalah:** Perlu banyak if checks untuk default values.

**Solusi:** Nullish coalescing operator:

```lua
// Current
local response = await http.get(url)
local data = response.json()
local score = data.score
if score == null then
  score = 0
end

// Optimized
local score = (await http.get(url).json()).score ?? 0
```

### 3.3 Destructuring untuk Response Data

**Masalah:** Manual property extraction verbose.

**Solusi:** Destructuring assignment:

```lua
// Current
local response = await http.get(url)
local data = response.json()
local name = data.name
local age = data.age
local email = data.email

// Optimized
local { name, age, email } = await http.get(url).json()
```

## 4. Framework Dev Tools

### 4.1 HTTP Request Inspector

**Masalah:** Tidak ada visual tool untuk inspect HTTP requests.

**Solusi:** Dev overlay dengan HTTP inspector:

```typescript
// packages/framework/cli/src/utils/http-inspector.ts
// Show HTTP requests in dev overlay
// - Request/response headers
// - Request/response body
// - Timing information
// - Error details
```

### 4.2 Network Tab (seperti browser DevTools)

**Masalah:** Sulit track semua HTTP requests.

**Solusi:** Network tab di dev overlay:

- List semua requests
- Filter by method/status
- Search requests
- Export as HAR

### 4.3 Auto-Generate API Client dari OpenAPI Spec

**Masalah:** Manual typing untuk external APIs.

**Solusi:** Generate LootiScript client dari OpenAPI:

```bash
l8b api import https://api.example.com/openapi.json --name MyAPI
```

**Output:**
- `src/apis/MyAPI.loot` - Generated client dengan semua endpoints
- Type-safe method calls
- Auto-complete support

## 5. Prioritas Implementasi

### Phase 1 (Quick Wins)
1. ✅ Enhanced HTTP error messages
2. ✅ Request builder pattern
3. ✅ HTTP response helpers (.json(), .text())
4. ✅ Dev HTTP logger

### Phase 2 (DX Improvements)
1. Auto-retry dengan backoff
2. Request/response interceptors
3. HTTP caching
4. Response transformation helpers

### Phase 3 (Language Features)
1. Optional chaining (?.)
2. Nullish coalescing (??)
3. Destructuring assignment
4. Request validation

### Phase 4 (Advanced Tools)
1. HTTP inspector overlay
2. Network tab
3. OpenAPI client generation
4. Type generation dari contracts

## 6. Contoh Penggunaan Setelah Optimasi

### Before (Current)
```lua
async function fetchUserData(userId)
  try
    local response = await http.get("https://api.example.com/users/" .. userId)
    if response.ok() == 1 then
      local data = response.json()
      if data and data.user and data.user.name then
        return data.user
      else
        print("Invalid response format")
        return null
      end
    else
      print("HTTP Error: " .. response.status)
      return null
    end
  catch (error)
    print("Request failed: " .. error)
    return null
  end
end
```

### After (Optimized)
```lua
async function fetchUserData(userId)
  local user = await http
    .get("https://api.example.com/users/" .. userId)
    .retry(3)
    .json()
    ?.user
    
  return user ?? null
end
```

**Benefits:**
- 70% less code
- Better error handling
- Auto-retry
- Type-safe property access
- Cleaner syntax

