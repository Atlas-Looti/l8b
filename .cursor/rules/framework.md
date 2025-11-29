---
description: Framework development rules - CLI, compiler, and build pipeline
globs: packages/framework/**/*.ts
---

# Framework Development Rules

## Overview

The framework package provides developer-facing tools:
- **CLI** (`packages/framework/cli`) - Command-line interface for project management
- **Compiler** (`packages/framework/compiler`) - LootiScript compilation utilities

## CLI Architecture

### Command Structure

All CLI commands follow this pattern:

```typescript
// packages/framework/cli/src/commands/<command>.ts
export interface CommandOptions {
  // Command-specific options
}

export async function command(
  projectPath: string = process.cwd(),
  options: CommandOptions = {},
): Promise<Result> {
  // 1. Load config
  const config = await loadConfig(projectPath);
  
  // 2. Validate project structure
  // 3. Execute command logic
  // 4. Handle errors with helpful messages
}
```

### Command Registration

Commands are registered in `packages/framework/cli/src/cli.ts`:

```typescript
.command<CommandArgs>(
  "command-name [arg]",
  "Command description",
  (yargsBuilder) => yargsBuilder
    .positional("arg", { type: "string" })
    .option("flag", { type: "boolean" }),
  async (args) => {
    await command(resolveProjectPathArg(args.arg), {
      // Map args to options
    });
  }
)
```

## Development Server (dev)

### Architecture

The dev server uses **Vite** as the base with custom plugins:

1. **Vite Server** - Base HTTP server and HMR
2. **LootiScript Plugin** - Handles `.loot` file imports
3. **HTML Generator** - Generates index.html with runtime
4. **File Watcher** - Watches for changes in `src/`, `public/`, `l8b.config.json`

### Workflow

```typescript
// 1. Load project config
const config = await loadConfig(projectPath);

// 2. Setup file watcher
const watcher = chokidar.watch([
  path.join(projectPath, "src"),
  path.join(projectPath, "public"),
  path.join(projectPath, "l8b.config.json"),
]);

// 3. Create Vite server with plugins
const server = await createServer({
  root: projectPath,
  plugins: [
    lootiScriptPlugin(),  // Handles .loot imports
    htmlGeneratorPlugin(), // Generates HTML on request
  ],
});

// 4. Setup middleware for:
//    - Runtime logs (/__l8b/log)
//    - Font serving
//    - HTML generation
```

### Source Loading

Sources are loaded from `src/` directory:

```typescript
// packages/framework/cli/src/loader/source-loader.ts
export async function loadSources(
  projectPath: string,
): Promise<Record<string, string>> {
  // Finds all .loot files in src/
  // Returns: { "module-name": "relative/path/to/file.loot" }
}
```

### Hot Module Replacement

HMR works through:
1. **File watcher** detects changes
2. **Vite plugin** recompiles changed `.loot` files
3. **Browser** receives HMR update via WebSocket
4. **Runtime** reloads changed modules

## Build Process (build)

### Build Pipeline

```typescript
// 1. Load sources and resources
const sources = await loadSources(projectPath);
const resources = await detectResources(projectPath);

// 2. Compile LootiScript to bytecode
const compileResult = await compileSources(sources, projectPath);

// 3. Save compiled bytecode
await saveCompiled(compileResult.compiled, distDir);

// 4. Bundle runtime dependencies
await bundleRuntime(distDir, projectPath);

// 5. Copy public assets
await fs.copy(publicDir, distDir);

// 6. Generate production HTML
const html = generateHTML(config, sources, resources, true);
await fs.writeFile(path.join(distDir, "index.html"), html);
```

### Compilation Process

```typescript
// For each .loot file:
// 1. Read source code
const source = await fs.readFile(filePath, "utf-8");

// 2. Compile to bytecode
const result = compileSource(source, {
  filename: relativePath,
  // ... options
});

// 3. Serialize routine
const module = serializeRoutineToModule(result.routine, moduleName);

// 4. Save to dist/
await saveCompiled([module], distDir);
```

### Runtime Bundling

Runtime is bundled using Vite's build:

```typescript
// packages/framework/cli/src/bundler/runtime-bundler.ts
await build({
  build: {
    lib: {
      entry: runtimeEntry,
      formats: ["iife"],
      name: "L8BRuntime",
    },
    outDir: distDir,
    rollupOptions: {
      external: [],
      output: {
        inlineDynamicImports: true,
      },
    },
  },
});
```

## Compiler Package

### API

```typescript
// packages/framework/compiler/src/index.ts
import { compileSource, compileFile } from "@l8b/compiler";

// Compile from string
const result = compileSource(sourceCode, {
  filename: "game.loot",
});

// Compile from file
const result = await compileFile("path/to/file.loot");

// Result contains:
// - routine: Compiled bytecode
// - errors: Compilation errors
// - warnings: Compilation warnings
```

### Error Handling

Compiler errors follow this structure:

```typescript
interface CompileError {
  file: string;
  error: string;
  line: number;
  column: number;
  code: string;  // Error code (e.g., "E1001")
  context?: string;
  suggestions?: string[];
  diagnostic: Diagnostic;
}
```

## HTML Generation

### Development HTML

```typescript
// packages/framework/cli/src/generator/html-generator.ts
export function generateHTML(
  config: LootiConfig,
  sources: Record<string, string>,
  resources: Resources,
  isProduction: boolean = false,
): string {
  // 1. Generate source imports (dev) or compiled routines (prod)
  // 2. Generate resource map
  // 3. Generate runtime script
  // 4. Combine into HTML
}
```

### Production HTML

Production HTML includes:
- Embedded runtime bundle
- Compiled bytecode modules
- Resource manifest
- No source maps (smaller size)

## Configuration

### Config Loading

```typescript
// packages/framework/cli/src/config/index.ts
export async function loadConfig(
  projectPath: string,
): Promise<LootiConfig> {
  const configPath = path.join(projectPath, "l8b.config.json");
  
  // Load and validate config
  // Merge with defaults
  // Return typed config
}
```

### Config Structure

```typescript
interface LootiConfig {
  name: string;
  orientation?: "portrait" | "landscape" | "any";
  aspect?: string;
  width?: number;
  height?: number;
  dev?: {
    port?: number;
    host?: string;
  };
  logging?: {
    browser?: { lifecycle?: boolean; canvas?: boolean };
    terminal?: { listener?: boolean; errors?: boolean };
  };
}
```

## Error Handling

### Error Types

```typescript
// packages/framework/cli/src/utils/errors.ts
class CompilationError extends Error {
  constructor(
    message: string,
    file: string,
    line: number,
    column: number,
    context?: {
      totalErrors?: number;
      errors?: CompileError[];
      suggestion?: string;
    }
  );
}

class ServerError extends Error {
  constructor(message: string, cause?: Error);
}

class BuildError extends Error {
  constructor(message: string, cause?: Error);
}
```

### Error Formatting

Errors are formatted for CLI output:

```typescript
import { formatForCLI } from "@l8b/diagnostics";

const formatted = formatForCLI(diagnostic);
// Returns formatted string with:
// - Error code
// - File location
// - Source context
// - Suggestions
```

## File Structure

```
packages/framework/cli/
├── src/
│   ├── cli.ts              # CLI entry point
│   ├── commands/           # Command implementations
│   │   ├── dev.ts
│   │   ├── build.ts
│   │   ├── start.ts
│   │   └── init.ts
│   ├── config/             # Config loading
│   ├── loader/              # Source/resource loading
│   ├── build/               # Build utilities
│   ├── bundler/             # Runtime bundling
│   ├── generator/           # HTML generation
│   ├── plugin/              # Vite plugins
│   └── utils/               # Utilities
```

## Testing

CLI commands should be tested with:
- Mock file system
- Test project fixtures
- Error case testing
- Integration tests for full workflows

## Common Patterns

### Path Resolution

Always use `resolveProjectPath()` for project-relative paths:

```typescript
import { resolveProjectPath } from "../utils/paths";

const absolutePath = resolveProjectPath(projectPath, relativePath);
```

### Logging

Use `picocolors` for colored output:

```typescript
import pc from "picocolors";

console.log(pc.green("✓ Success"));
console.log(pc.red("✗ Error"));
console.log(pc.yellow("⚠ Warning"));
console.log(pc.gray("Info"));
```

### Async Operations

Always handle errors properly:

```typescript
try {
  await operation();
} catch (error) {
  if (error instanceof KnownError) {
    // Handle known error
  } else {
    throw new ServerError("Operation failed", error);
  }
}
```

