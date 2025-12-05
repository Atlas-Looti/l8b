# @l8b/vm

**Virtual Machine** - LootiScript bytecode execution engine.

> **Note**: This package is for engine developers. Game developers use LootiScript directly.

## Overview

The VM package provides the execution environment for LootiScript:

- **Compiler** - Compiles LootiScript AST to bytecode
- **Processor** - Executes bytecode instructions
- **Runner** - Manages threads and coroutines
- **Memory Management** - Handles variable scopes and garbage collection

## Installation

```bash
pnpm install @l8b/vm
```

## Basic Usage

```typescript
import { VM } from '@l8b/vm';

// Create VM instance
const vm = new VM({
  // Global API bindings
  screen: screenAPI,
  audio: audioAPI,
  keyboard: keyboardState,
  // ... other globals
});

// Load and run code
const code = `
  function update() {
    print("Hello from LootiScript!")
  }
`;

vm.loadCode(code);
vm.start();
```

## Architecture

### Compilation Pipeline

```text
LootiScript Source
      ↓
   Tokenizer (Lexical Analysis)
      ↓
   Parser (Syntax Analysis)
      ↓
   AST (Abstract Syntax Tree)
      ↓
   Compiler (Code Generation)
      ↓
   Bytecode
      ↓
   Processor (Execution)
```

### Components

1. **Tokenizer** - Breaks source code into tokens
2. **Parser** - Builds Abstract Syntax Tree (AST)
3. **Compiler** - Generates bytecode from AST
4. **Processor** - Executes bytecode instructions
5. **Runner** - Manages execution threads

## VM API

### Constructor

```typescript
new VM(globals: Record<string, any>)
```

Provide global API bindings that will be available in LootiScript.

### loadCode()

Compile and load LootiScript code.

```typescript
vm.loadCode(source: string): void
```

### start()

Start VM execution.

```typescript
vm.start(): void
```

### pause()

Pause VM execution.

```typescript
vm.pause(): void
```

### resume()

Resume VM execution.

```typescript
vm.resume(): void
```

### stop()

Stop VM execution.

```typescript
vm.stop(): void
```

## Bytecode Instructions

The VM uses a stack-based bytecode format with opcodes for:

- **Stack Operations** - PUSH, POP, DUP
- **Arithmetic** - ADD, SUB, MUL, DIV, MOD
- **Logic** - AND, OR, NOT
- **Comparison** - EQ, NE, LT, GT, LE, GE
- **Control Flow** - JUMP, JUMP_IF, CALL, RETURN
- **Variables** - LOAD, STORE, LOAD_GLOBAL, STORE_GLOBAL
- **Objects** - GET_FIELD, SET_FIELD, NEW_OBJECT
- **Arrays** - GET_INDEX, SET_INDEX, NEW_ARRAY

## Performance Considerations

### Inline Caching

The VM uses inline caching for property access to improve performance:

```typescript
// First access: slow lookup
obj.property

// Subsequent accesses: cached, fast
obj.property
obj.property
```

### Performance Optimizations

The VM uses several optimization techniques:

- **Inline Caching** - Property access is cached after first lookup
- **Bytecode Optimization** - Common operation patterns are fused into single opcodes
- **Efficient Stack Operations** - Minimized allocations in hot paths

### Memory Management

The VM uses efficient memory management:

- **Reference Counting** - Immediate cleanup of unused objects
- **Mark-and-Sweep GC** - Periodic cleanup of circular references
- **Object Pooling** - Reuse of common objects

## Thread Management

The VM supports cooperative multitasking through scheduler blocks (`after`, `every`, `sleep`, `do`). These blocks allow code to run concurrently without blocking the main game loop.

```lua
// In LootiScript - using scheduler blocks
do
  while true do
    doWork()
    sleep(100)  // Yield to other threads
  end
end
```

Scheduler blocks are managed by the `Runner` class and scheduled cooperatively. The `do` block executes code immediately as a background thread, while `after` and `every` schedule code for future execution.

## Error Handling

The VM provides detailed error messages with:

- Line numbers
- Stack traces
- Variable states
- Call context

```typescript
vm.on('error', (error) => {
  console.error('VM Error:', error.message);
  console.error('Line:', error.line);
  console.error('Stack:', error.stack);
});
```

## Integration with Runtime

The VM is typically used via `@l8b/runtime`:

```typescript
import { RuntimeOrchestrator } from '@l8b/runtime';

const runtime = new RuntimeOrchestrator({
  canvas: myCanvas,
});

// Runtime handles VM initialization
await runtime.loadCode(gameCode);
runtime.start();
```

## Package Structure

```text
vm/
├── src/
│   ├── compiler.ts      # AST to bytecode compiler
│   ├── processor.ts     # Bytecode executor
│   ├── runner.ts        # Thread manager
│   ├── routine.ts       # Bytecode representation
│   ├── memory.ts        # Memory management
│   └── types.ts         # TypeScript types
└── index.ts
```

## See Also

- **@l8b/lootiscript** - LootiScript language (Parser, Tokenizer)
- **@l8b/runtime** - Runtime orchestrator
- **@l8b/stdlib** - Standard library functions
