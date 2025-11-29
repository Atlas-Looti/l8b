---
description: Rules for LootiScript language development
globs: packages/lootiscript/**/*.ts, **/*.loot
---

# LootiScript Language Development Rules

## Language Overview

LootiScript is a custom scripting language compiled to bytecode for the L8B game engine.

## Key Language Features

- **No null/undefined**: Variables default to `0` if undefined
- **No boolean type**: `0` is false, everything else is true
- **Global by default**: Use `local` for local variables
- **Bytecode compilation**: Compiled for performance
- **Scheduler blocks**: `after`, `every`, `sleep` for timing

## Parser Location

- Parser: `packages/lootiscript/src/v1/`
- Compiler: `packages/lootiscript/src/v1/compiler.ts`
- VM: `packages/enggine/vm/`

## Syntax Patterns

### Variables
```lua
x = 1              // Global
local y = 2        // Local
```

### Functions
```lua
myFunc = function(x, y)
  return x + y
end

// Arrow function
myFunc = (x, y) => x + y
```

### Classes
```lua
MyClass = class
  constructor = function(x, y)
    this.x = x
    this.y = y
  end
end
```

### Scheduler
```lua
after 2 seconds do
  doSomething()
end

every 1 second do
  updateScore()
end
```

## Adding Language Features

1. Update parser in `packages/lootiscript/src/v1/parser.ts`
2. Update compiler in `packages/lootiscript/src/v1/compiler.ts`
3. Update VM if needed in `packages/enggine/vm/`
4. Add tests in `packages/lootiscript/__tests__/`
5. Update documentation in `docs/fundamentals/looti-script-programming.md`

## Error Codes

- E1xxx: Syntax errors
- E2xxx: Runtime errors
- E3xxx: Compilation errors
- See `packages/error-tests/` for error test cases

