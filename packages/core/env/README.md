# @l8b/env

**Environment Variables API** - Read-only access to environment variables from LootiScript.

## Overview

The `@l8b/env` package provides a secure, read-only interface for accessing environment variables from LootiScript game code. Environment variables are loaded from `.env` files during development and build, and exposed to your game via the global `env` object.

## Installation

This package is part of the L8B monorepo and is automatically available when using `@l8b/runtime`.

## Usage

### In LootiScript

```loot
function init()
  -- Get environment variable
  local apiKey = env.get("API_KEY")
  local apiUrl = env.get("API_URL") or "https://api.example.com"

  -- Check if variable exists
  if env.has("DEBUG") then
    print("Debug mode enabled")
  end

  -- Get all keys
  local keys = env.keys()
  for i = 1, #keys do
    print("Env var: " .. keys[i])
  end
end
```

### Environment Files

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

## API Reference

### `env.get(key: string): string | undefined`

Get environment variable value by key.

**Parameters:**

- `key` - Environment variable key (case-sensitive)

**Returns:**

- Environment variable value as string, or `undefined` if not found

**Example:**

```loot
local apiKey = env.get("API_KEY")
if apiKey then
  print("API Key found: " .. apiKey)
end
```

### `env.has(key: string): boolean`

Check if environment variable exists.

**Parameters:**

- `key` - Environment variable key (case-sensitive)

**Returns:**

- `true` if variable exists, `false` otherwise

**Example:**

```loot
if env.has("DEBUG") then
  print("Debug mode enabled")
end
```

### `env.keys(): string[]`

Get all environment variable keys.

**Returns:**

- Array of all available environment variable keys

**Example:**

```loot
local keys = env.keys()
for i = 1, #keys do
  print("Env var: " .. keys[i] .. " = " .. env.get(keys[i]))
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

## Integration

The `EnvService` is automatically initialized by the runtime orchestrator when environment variables are provided in `RuntimeOptions`. No manual setup required.

```typescript
import { RuntimeOrchestrator } from "@l8b/runtime";

const runtime = new RuntimeOrchestrator({
  canvas: document.getElementById("game"),
  env: {
    API_KEY: process.env.API_KEY,
    API_URL: process.env.API_URL,
  },
});
```
