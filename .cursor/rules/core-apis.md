---
description: Rules for working with Core API packages
globs: packages/core/**/*.ts
---

# Core API Development Rules

## Package Structure

All core API packages follow this structure:

```
packages/core/<api-name>/
├── src/
│   ├── index.ts          # Main export
│   ├── types.ts          # TypeScript type definitions
│   └── ...               # Implementation files
├── package.json
├── tsconfig.json
└── tsup.config.ts
```

## API Interface Pattern

Core APIs expose an interface to LootiScript:

```typescript
// src/index.ts
export interface ScreenAPI {
  width: number;
  height: number;
  clear(color?: string): void;
  fillRect(x: number, y: number, w: number, h: number, color?: string): void;
  // ...
}

export class Screen {
  getInterface(): ScreenAPI {
    return {
      width: this.width,
      height: this.height,
      clear: (color) => this.clear(color),
      // ...
    };
  }
}
```

## VM Registration

Register the API in `packages/enggine/runtime/src/core/orchestrator.ts`:

```typescript
const global: GlobalAPI = {
  screen: this.screen.getInterface(),
  // Add your API here
};
```

## Language Server Definition

Create API definition in `packages/tooling/language-server/src/api-definitions/<api-name>.ts`:

```typescript
export const screenAPI = {
  screen: {
    width: { type: "number", description: "Screen width" },
    height: { type: "number", description: "Screen height" },
    clear: {
      type: "function",
      parameters: [{ name: "color", type: "string", optional: true }],
      description: "Clear the screen"
    },
    // ...
  }
};
```

## Documentation Requirements

- **README.md**: Full API documentation with examples
- **JSDoc comments**: For all public methods and properties
- **Type definitions**: Clear TypeScript types

## Testing

- Write unit tests for all public APIs
- Test both TypeScript usage and LootiScript exposure
- Use Vitest for testing


