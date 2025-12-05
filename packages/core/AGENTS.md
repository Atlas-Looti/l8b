# Core Package - AI Agent Guide

## Overview

Core packages provide fundamental game engine APIs that are exposed to LootiScript:
- **screen** - 2D rendering
- **audio** - Sound and music playback
- **input** - Keyboard, mouse, touch, gamepad
- **sprites** - Sprite and image management
- **map** - Tile-based map system
- **palette** - Color palette management
- **scene** - Scene management and routing
- **assets** - Asset loading
- **time** - System information and timing

## Package Structure

All core packages follow this structure:

```
packages/core/<name>/
├── src/
│   ├── index.ts          # Main exports
│   ├── types.ts          # TypeScript type definitions
│   └── ...               # Implementation files
├── package.json
├── tsconfig.json
├── tsup.config.ts
└── README.md               # Full API documentation
```

## API Interface Pattern

Core APIs must expose an interface for LootiScript:

```typescript
// src/index.ts
export interface MyAPI {
  // Properties exposed to LootiScript
  property: number;
  
  // Methods exposed to LootiScript
  method(param: string): void;
}

export class MyService {
  private state: ServiceState;
  
  constructor() {
    // Initialize service
  }
  
  /**
   * Get interface for LootiScript exposure
   * This is called by runtime orchestrator
   */
  getInterface(): MyAPI {
    return {
      property: this.state.property,
      method: (param: string) => {
        // Implementation
      },
    };
  }
  
  /**
   * Cleanup resources
   */
  dispose(): void {
    // Cleanup
  }
}
```

## VM Registration

Core APIs are registered in the VM by the runtime orchestrator:

```typescript
// packages/enggine/runtime/src/core/orchestrator.ts
const global: GlobalAPI = {
  screen: this.screen.getInterface(),
  audio: this.audio.getInterface(),
  Assets: this.assets.getInterface(),
  // ... other APIs
};

this.vm = new L8BVM(meta, global, ...);
```

## Language Server Definition

Every core API must have a language server definition:

```typescript
// packages/tooling/language-server/src/api-definitions/<api-name>.ts
export const myAPI = {
  myAPI: {
    property: {
      type: "number",
      description: "Property description",
    },
    method: {
      type: "function",
      parameters: [
        {
          name: "param",
          type: "string",
          description: "Parameter description",
        },
      ],
      returnType: "void",
      description: "Method description",
      examples: [
        {
          code: "myAPI.method('value')",
          description: "Example usage",
        },
      ],
    },
  },
};
```

## Documentation Requirements

Each core package must have:

1. **README.md** - Complete API documentation with:
   - Overview
   - All methods with signatures
   - Parameters and return types
   - Examples
   - Error codes

2. **JSDoc comments** - For all public methods:
   ```typescript
   /**
    * Draws a filled rectangle on the screen.
    *
    * @param x - X coordinate (center)
    * @param y - Y coordinate (center)
    * @param width - Rectangle width
    * @param height - Rectangle height
    * @param color - Optional fill color (hex string or named color)
    */
   fillRect(x: number, y: number, width: number, height: number, color?: string): void;
   ```

3. **Type definitions** - Clear TypeScript types in `types.ts`

## Testing

Core APIs should be tested with:

```typescript
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { MyService } from "./index";

describe("MyService", () => {
  let service: MyService;
  
  beforeEach(() => {
    service = new MyService();
  });
  
  afterEach(() => {
    service.dispose();
  });
  
  it("should expose interface correctly", () => {
    const api = service.getInterface();
    expect(api).toBeDefined();
    expect(typeof api.method).toBe("function");
  });
  
  it("should handle LootiScript calls", () => {
    const api = service.getInterface();
    api.method("test");
    // Assert expected behavior
  });
});
```

## Adding a New Core API

### Step 1: Create Package

```bash
pnpm run new
# Choose: core/<api-name>
```

### Step 2: Implement Service

```typescript
// packages/core/<api-name>/src/index.ts
export interface MyAPI {
  // Define interface
}

export class MyService {
  getInterface(): MyAPI {
    // Return interface
  }
  
  dispose(): void {
    // Cleanup
  }
}
```

### Step 3: Register in Runtime

```typescript
// packages/enggine/runtime/src/core/orchestrator.ts
import { MyService } from "@l8b/core/<api-name>";

// In constructor:
this.myService = new MyService();

// In initializeVM():
const global: GlobalAPI = {
  // ...
  myAPI: this.myService.getInterface(),
};
```

### Step 4: Add Language Server Definition

```typescript
// packages/tooling/language-server/src/api-definitions/<api-name>.ts
export const myAPI = {
  myAPI: {
    // API definition
  },
};
```

### Step 5: Update Type Definitions

```typescript
// packages/enggine/vm/src/types/global-api.ts
export interface GlobalAPI {
  // ...
  myAPI: MyAPI;
}
```

### Step 6: Write Documentation

- Add README.md in package
- Update `docs/fundamentals/api-reference.md`
- Add examples in `examples/`

## Common Patterns

### Loader Object Pattern

For async operations, return loader objects:

```typescript
interface LoaderResult<T> {
  ready: 0 | 1;  // 0 = loading, 1 = ready
  data?: T;      // Available when ready === 1
}

export interface AssetsAPI {
  loadImage(path: string, callback?: (image: Image) => void): ImageLoaderResult;
}
```

### Error Handling

Use error codes for API errors:

```typescript
throw new Error(`[E7xxx] Error message: ${details}`);
```

See `packages/error-tests/` for error test cases.

### State Management

Services should manage their own state:

```typescript
class MyService {
  private state = {
    initialized: false,
    // ... other state
  };
  
  getInterface(): MyAPI {
    return {
      // Expose only what LootiScript needs
    };
  }
}
```

## Performance Considerations

Core APIs are called frequently (60 FPS), so:

1. **Avoid allocations in hot paths**
2. **Use object pooling** for frequently created objects
3. **Cache expensive computations**
4. **Minimize property access** - cache values when possible

## Integration with Framework

Core APIs are:
- **Compiled** - No direct interaction with CLI/compiler
- **Bundled** - Included in runtime bundle by framework
- **Exposed** - Made available to LootiScript via VM

The framework handles:
- Compiling LootiScript code that uses core APIs
- Bundling runtime that includes core APIs
- Generating HTML that loads runtime with core APIs

## Key Files

- `packages/enggine/runtime/src/core/orchestrator.ts` - VM registration
- `packages/tooling/language-server/src/api-definitions/` - API definitions
- `packages/enggine/vm/src/types/global-api.ts` - Type definitions
- `packages/error-tests/` - Error test cases
