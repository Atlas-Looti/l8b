# @l8b/compiler

LootiScript compiler utilities and helpers for the L8B Engine.

## Features

- **Compile LootiScript** - Transform source code into executable bytecode routines
- **Consistent Types** - `CompileResult`, `CompileError`, `CompileWarning` for predictable error handling
- **Serialization** - Save and load compiled routines to/from JSON
- **Tree-shakeable** - Use only what you need (e.g., runtime can import serialization without the full compiler)

## Installation

```bash
npm install @l8b/compiler
```

## Usage

### Compiling Source Code

```typescript
import { compileSource } from '@l8b/compiler';

const source = `
function greet(name) {
    print("Hello, " + name + "!");
}

greet("World");
`;

const result = compileSource(source, 'example.loot');

if (result.errors.length > 0) {
    console.error('Compilation errors:', result.errors);
} else {
    console.log('Compiled successfully!');
    console.log('Routine:', result.routine);
}

// Check warnings
if (result.warnings.length > 0) {
    console.warn('Warnings:', result.warnings);
}
```

### Compiling Files (Node.js only)

```typescript
import { compileFile } from '@l8b/compiler';

const result = await compileFile('/path/to/script.loot');
```

### Serialization

```typescript
import { 
    serializeRoutine, 
    deserializeRoutine,
    serializeRoutineToModule 
} from '@l8b/compiler';

// Serialize to JSON
const json = serializeRoutine(result.routine);

// Deserialize from JSON
const routine = deserializeRoutine(json);

// Generate JS module (useful for build tools)
const moduleCode = serializeRoutineToModule(
    result.routine,
    'myScript',
    'script.loot',
    { minify: true } // minified JSON by default
);
// Output (minified): export default {"name":"myScript","filename":"script.loot","routine":{...}};
```

## API

### Compilation

#### `compileSource(source: string, filename?: string): CompileResult`

Compile LootiScript source code to a bytecode routine.

- **source**: Source code string
- **filename**: Optional filename for error reporting (default: `'source.loot'`)
- **Returns**: `CompileResult` with routine, errors, and warnings

#### `compileFile(filePath: string): Promise<CompileResult>`

Compile a LootiScript file to a bytecode routine. **Node.js only.**

- **filePath**: Absolute path to `.loot` file
- **Returns**: Promise resolving to `CompileResult`

### Types

#### `CompileResult`

```typescript
interface CompileResult {
    routine?: any;           // Compiled routine (if successful)
    errors: CompileError[];  // Compilation errors
    warnings: CompileWarning[]; // Compilation warnings
    filename?: string;       // Source filename
}
```

#### `CompileError`

```typescript
interface CompileError {
    file: string;     // File path where error occurred
    error: string;    // Error message
    line?: number;    // Line number
    column?: number;  // Column number
}
```

#### `CompileWarning`

```typescript
interface CompileWarning {
    file: string;     // File path where warning occurred
    warning: string;  // Warning message
    line?: number;    // Line number
    column?: number;  // Column number
}
```

### Serialization

#### `serializeRoutine(routine: any): string`

Serialize a routine to JSON string.

#### `deserializeRoutine(json: string): any`

Deserialize a routine from JSON string.

#### `serializeRoutineToModule(routine: any, moduleName?: string, filename?: string): string`

Generate JavaScript module code that exports a compiled routine.

- Automatically minifies JSON output for smaller bundle size
- Pass `{ minify: false }` as the fourth argument to keep pretty-printed JSON (useful for debugging)

#### `isValidRoutine(routine: any): boolean`

Validate that a routine has the expected structure.

## Tree-shaking

The package is designed for optimal tree-shaking:

- **Runtime builds** can import only serialization utilities (`deserializeRoutine`) without pulling in the full compiler
- **Build tools** can use the full compiler API without bloating client bundles
- All exports are marked as side-effect-free
