# Environment Variables API

The `env` object provides read-only access to environment variables from LootiScript. Environment variables are loaded from `.env` files during development and build, and exposed to your game via the global `env` object.

## Overview

Environment variables allow you to configure your game for different environments (development, production, etc.) without hardcoding values in your game code. This is especially useful for API keys, service URLs, and feature flags.

## Environment Files

Create `.env` files in your project root:

```bash
# .env
API_KEY=your-api-key-here
API_URL=https://api.example.com
DEBUG=true
```

For different environments:

- `.env` - Default (loaded in all environments)
- `.env.local` - Local overrides (gitignored)
- `.env.development` - Development environment
- `.env.production` - Production environment

Files are loaded in order, with later files overriding earlier ones.

## Methods

### `env.get(key)`

Get environment variable value by key. Returns `undefined` if not found.

```lua
local apiKey = env.get("API_KEY")
local apiUrl = env.get("API_URL") or "https://api.example.com"
```

### `env.has(key)`

Check if environment variable exists. Returns `1` if exists, `0` otherwise.

```lua
if env.has("DEBUG") == 1 then
  print("Debug mode enabled")
end
```

### `env.keys()`

Get all available environment variable keys as a list.

```lua
local keys = env.keys()
for i = 1, #keys do
  print("Env var: " .. keys[i] .. " = " .. env.get(keys[i]))
end
```

## Examples

### Using API Keys

```lua
function init()
  local apiKey = env.get("API_KEY")
  if not apiKey then
    print("Warning: API_KEY not set")
    return
  end
  
  -- Use API key for requests
  local response = await http.get("https://api.example.com/data", {
    headers = {
      ["Authorization"] = "Bearer " .. apiKey
    }
  })
end
```

### Feature Flags

```lua
function update()
  if env.has("ENABLE_DEBUG_MODE") == 1 then
    -- Debug features enabled
    drawDebugInfo()
  end
end
```

### Environment-Specific Configuration

```lua
function init()
  local apiUrl = env.get("API_URL") or "https://api.example.com"
  local isProduction = env.has("NODE_ENV") == 1 and env.get("NODE_ENV") == "production"
  
  if not isProduction then
    print("Running in development mode")
    print("API URL: " .. apiUrl)
  end
end
```

## Security

- **Read-only access**: Environment variables can only be read, never modified from LootiScript
- **No sensitive data exposure**: Only variables explicitly loaded from `.env` files are available
- **Case-sensitive**: Keys are case-sensitive for consistency

## Best Practices

1. **Never commit `.env` files**: Add `.env.local` and `.env.*.local` to `.gitignore`
2. **Use `.env.example`**: Create example file with placeholder values
3. **Prefix sensitive keys**: Use prefixes like `API_`, `SECRET_` for clarity
4. **Document required vars**: List required environment variables in README
