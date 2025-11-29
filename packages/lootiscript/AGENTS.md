# LootiScript Package - AI Agent Guide

## Overview

The LootiScript package (`packages/lootiscript`) provides the parser and compiler for the LootiScript language. It transforms `.loot` source code into bytecode that can be executed by the VM.

## Architecture

### Parser

The parser (`packages/lootiscript/src/v1/parser.ts`) converts source code to AST:

```typescript
class Parser {
  private tokens: Token[];
  private current = 0;
  
  parse(): Program {
    const statements = [];
    while (!this.isAtEnd()) {
      statements.push(this.statement());
    }
    return { type: "Program", body: statements };
  }
  
  private statement(): Statement {
    // Parse different statement types
  }
}
```

### Compiler

The compiler (`packages/lootiscript/src/v1/compiler.ts`) converts AST to bytecode:

```typescript
class Compiler {
  compile(ast: Program): Routine {
    // Convert AST to bytecode
    // Return compiled routine
  }
}
```

### Public API

The package exposes a clean API:

```typescript
// packages/lootiscript/src/index.ts
export { compileSource, compileFile } from "./compiler";
export { parseSource, parseFile } from "./parser";
```

## Compilation Process

### Step 1: Tokenization

Source code is tokenized:

```typescript
const tokens = tokenize(sourceCode);
// Returns: Token[]
```

### Step 2: Parsing

Tokens are parsed into AST:

```typescript
const parser = new Parser(tokens);
const ast = parser.parse();
// Returns: Program (AST)
```

### Step 3: Compilation

AST is compiled to bytecode:

```typescript
const compiler = new Compiler();
const routine = compiler.compile(ast);
// Returns: Routine (bytecode)
```

### Step 4: Serialization

Routine is serialized for storage:

```typescript
const serialized = serializeRoutine(routine);
// Returns: JSON-serializable object
```

## Error Handling

### Parse Errors

Parse errors include:
- Line and column
- Error message
- Source context

```typescript
class ParseError extends Error {
  constructor(
    message: string,
    public line: number,
    public column: number,
    public source: string
  ) {
    super(message);
  }
}
```

### Compile Errors

Compile errors include:
- Error code
- Diagnostic information
- Suggestions

## Language Features

### Supported Syntax

- Variables (global and local)
- Functions (regular and arrow)
- Classes and inheritance
- Control flow (if, for, while)
- Scheduler blocks (after, every, sleep)
- Built-in types (number, string, list, object)

### Bytecode Instructions

The compiler generates bytecode instructions:
- Load/store operations
- Arithmetic operations
- Function calls
- Control flow
- Object/array operations

## Integration with Framework

The LootiScript compiler is used by:

1. **Framework CLI** - Compiles `.loot` files during build
2. **Dev Server** - Compiles on-the-fly for HMR
3. **Language Server** - Validates code and provides diagnostics

## Testing

Parser and compiler are tested with:

```typescript
describe("Parser", () => {
  it("should parse variable declaration", () => {
    const ast = parseSource("x = 10");
    expect(ast.body[0].type).toBe("VariableDeclaration");
  });
});

describe("Compiler", () => {
  it("should compile simple expression", () => {
    const routine = compileSource("x = 10");
    expect(routine).toBeDefined();
  });
});
```

## Key Files

- `packages/lootiscript/src/v1/parser.ts` - Parser implementation
- `packages/lootiscript/src/v1/compiler.ts` - Compiler implementation
- `packages/lootiscript/src/index.ts` - Public API
- `packages/lootiscript/__tests__/` - Tests
