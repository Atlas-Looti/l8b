---
description: TypeScript coding standards for L8B
globs: **/*.ts
---

# TypeScript Coding Standards

## Code Style

- **Indentation**: TABS (not spaces) - critical
- **Quotes**: Double quotes
- **Semicolons**: Use semicolons
- **Trailing commas**: Use in multi-line objects/arrays

## Type Definitions

```typescript
// Use interface for object shapes
interface Player {
  x: number;
  y: number;
  hp: number;
}

// Use type for unions/intersections
type InputState = KeyboardState | MouseState | TouchState;
```

## Function Signatures

```typescript
// Prefer explicit return types
function calculateDistance(x1: number, y1: number, x2: number, y2: number): number {
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

// Use arrow functions for callbacks
const handler = (event: Event): void => {
  // ...
};
```

## Import Organization

```typescript
// 1. External packages
import { something } from "external-package";

// 2. Internal packages (@l8b namespace)
import { ScreenAPI } from "@l8b/core/screen";
import { RuntimeOrchestrator } from "@l8b/runtime";

// 3. Relative imports
import { helper } from "./helper";
import { types } from "../types";
```

## JSDoc Comments

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
function fillRect(x: number, y: number, width: number, height: number, color?: string): void {
  // ...
}
```

## Error Handling

```typescript
// Use descriptive error messages
throw new Error(`[E7001] Failed to get 2D canvas context: ${error.message}`);

// Include error codes
const ERROR_CODES = {
  CANVAS_CONTEXT_FAILED: "E7001",
  INVALID_COLOR_FORMAT: "E7003",
} as const;
```

## Naming Conventions

- **Classes**: PascalCase (`Screen`, `AudioManager`)
- **Functions/Methods**: camelCase (`loadImage`, `playSound`)
- **Variables**: camelCase (`playerX`, `gameState`)
- **Constants**: UPPER_SNAKE_CASE (`MAX_FPS`, `DEFAULT_WIDTH`)
- **Types/Interfaces**: PascalCase (`ScreenAPI`, `LoaderResult`)

## File Organization

```typescript
// 1. Imports
import { ... } from "...";

// 2. Type definitions
interface MyType { ... }

// 3. Constants
const CONSTANT = 100;

// 4. Class/Function definitions
export class MyClass { ... }

// 5. Exports
export { MyClass, MyType };
```

