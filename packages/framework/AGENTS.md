# Framework Package - AI Agent Guide

## Overview

The framework package provides developer-facing tools for LootiScript game development:
- **CLI** (`packages/framework/cli`) - Command-line interface
- **Compiler** (`packages/framework/compiler`) - LootiScript compilation utilities

## CLI Architecture

### Command Structure

All CLI commands are in `packages/framework/cli/src/commands/`:

```typescript
// Command signature pattern
export async function commandName(
  projectPath: string = process.cwd(),
  options: CommandOptions = {},
): Promise<Result> {
  // 1. Load config
  const config = await loadConfig(projectPath);
  
  // 2. Execute command logic
  // 3. Handle errors with helpful messages
}
```

### Available Commands

1. **`init`** - Initialize new project
   - Creates project structure
   - Generates `l8b.config.json`
   - Creates example `src/main.loot`
   - Sets up `package.json`

2. **`dev`** - Development server with HMR
   - Uses Vite as base server
   - Custom LootiScript plugin for `.loot` files
   - File watcher for `src/`, `public/`, `l8b.config.json`
   - Generates HTML on-the-fly
   - Hot module replacement for `.loot` files

3. **`build`** - Production build
   - Compiles all `.loot` files to bytecode
   - Bundles runtime dependencies
   - Copies public assets
   - Generates production HTML
   - Output to `.l8b/` directory

4. **`start`** - Serve production build
   - Serves built project from `.l8b/`
   - Static file server
   - No compilation (pre-built)

## Development Server Workflow

### Initialization

```typescript
// 1. Load config
const config = await loadConfig(projectPath);

// 2. Setup file watcher
const watcher = chokidar.watch([
  path.join(projectPath, "src"),
  path.join(projectPath, "public"),
  path.join(projectPath, "l8b.config.json"),
]);

// 3. Create Vite server
const server = await createServer({
  root: projectPath,
  plugins: [lootiScriptPlugin()],
});
```

### Source Loading

Sources are automatically discovered from `src/`:

```typescript
// packages/framework/cli/src/loader/source-loader.ts
const sources = await loadSources(projectPath);
// Returns: { "module-name": "relative/path/to/file.loot" }
```

All `.loot` files in `src/` are:
- Discovered recursively
- Named by relative path (e.g., `"scenes/intro"` for `src/scenes/intro.loot`)
- Loaded and compiled on-demand

### HTML Generation

HTML is generated on each request (dev) or once (build):

```typescript
// Development: Generated on each request
const html = generateHTML(config, sources, resources, false);

// Production: Generated once during build
const html = generateHTML(config, sources, resources, true);
```

HTML includes:
- Runtime script (bundled or source)
- Source imports (dev) or compiled routines (prod)
- Resource manifest
- Configuration

### Hot Module Replacement

HMR flow:
1. File watcher detects change in `src/*.loot`
2. Vite plugin recompiles changed file
3. WebSocket sends HMR update to browser
4. Runtime reloads changed module

## Build Process

### Build Pipeline

```typescript
// 1. Load sources
const sources = await loadSources(projectPath);

// 2. Detect resources (sprites, sounds, maps)
const resources = await detectResources(projectPath);

// 3. Compile LootiScript to bytecode
const compileResult = await compileSources(sources, projectPath);

// 4. Save compiled bytecode
await saveCompiled(compileResult.compiled, distDir);

// 5. Bundle runtime
await bundleRuntime(distDir, projectPath);

// 6. Copy public assets
await fs.copy(publicDir, distDir);

// 7. Generate production HTML
const html = generateHTML(config, sources, resources, true);
await fs.writeFile(path.join(distDir, "index.html"), html);
```

### Compilation

Each `.loot` file is compiled:

```typescript
// For each source file:
const result = compileSource(sourceCode, {
  filename: relativePath,
});

// Serialize to module
const module = serializeRoutineToModule(result.routine, moduleName);

// Save to dist/
await saveCompiled([module], distDir);
```

### Runtime Bundling

Runtime is bundled using Vite:

```typescript
await build({
  build: {
    lib: {
      entry: runtimeEntry,
      formats: ["iife"],
      name: "L8BRuntime",
    },
    outDir: distDir,
    rollupOptions: {
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
import { compileSource, compileFile } from "@l8b/compiler";

// Compile from string
const result = compileSource(sourceCode, {
  filename: "game.loot",
});

// Compile from file
const result = await compileFile("path/to/file.loot");
```

### Compile Result

```typescript
interface CompileResult {
  routine: Routine;           // Compiled bytecode
  errors: CompileError[];     // Compilation errors
  warnings: CompileWarning[]; // Compilation warnings
}
```

### Error Structure

```typescript
interface CompileError {
  file: string;
  error: string;
  line: number;
  column: number;
  code: string;              // Error code (e.g., "E1001")
  context?: string;
  suggestions?: string[];
  diagnostic: Diagnostic;
}
```

## Resource Detection

Resources are auto-detected from `public/`:

```typescript
// packages/framework/cli/src/loader/auto-detect.ts
const resources = await detectResources(projectPath);
// Returns:
// {
//   images: ["sprites/player.png", ...],
//   maps: ["maps/level1.json", ...],
//   sounds: ["sounds/jump.wav", ...],
//   music: ["music/theme.mp3", ...],
//   fonts: ["fonts/custom.ttf", ...]
// }
```

## Configuration

### Config File

`l8b.config.json` in project root:

```json
{
  "name": "my-game",
  "orientation": "any",
  "aspect": "free",
  "width": 1920,
  "height": 1080,
  "dev": {
    "port": 3000,
    "host": "localhost"
  },
  "logging": {
    "browser": { "lifecycle": false, "canvas": false },
    "terminal": { "listener": true, "errors": true }
  }
}
```

### Config Loading

```typescript
// packages/framework/cli/src/config/index.ts
const config = await loadConfig(projectPath);
// Loads and validates l8b.config.json
// Merges with defaults
// Returns typed LootiConfig
```

## Error Handling

### Error Types

```typescript
// Compilation errors
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

// Server errors
class ServerError extends Error {
  constructor(message: string, cause?: Error);
}

// Build errors
class BuildError extends Error {
  constructor(message: string, cause?: Error);
}
```

### Error Formatting

Errors are formatted using diagnostics:

```typescript
import { formatForCLI } from "@l8b/diagnostics";

const formatted = formatForCLI(diagnostic);
// Returns formatted string with:
// - Error code
// - File location
// - Source context with pointer
// - Suggestions
```

## File Structure

```
packages/framework/
├── cli/
│   ├── src/
│   │   ├── cli.ts              # CLI entry point
│   │   ├── commands/           # Command implementations
│   │   │   ├── dev.ts          # Dev server
│   │   │   ├── build.ts        # Build process
│   │   │   ├── start.ts        # Production server
│   │   │   └── init.ts         # Project initialization
│   │   ├── config/              # Config loading
│   │   ├── loader/              # Source/resource loading
│   │   │   ├── source-loader.ts
│   │   │   └── auto-detect.ts
│   │   ├── build/               # Build utilities
│   │   │   └── index.ts
│   │   ├── bundler/             # Runtime bundling
│   │   │   └── runtime-bundler.ts
│   │   ├── generator/           # HTML generation
│   │   │   └── html-generator.ts
│   │   ├── plugin/              # Vite plugins
│   │   │   └── vite-plugin-lootiscript.ts
│   │   └── utils/               # Utilities
│   │       ├── paths.ts
│   │       ├── errors.ts
│   │       └── constants.ts
│   └── package.json
└── compiler/
    ├── src/
    │   ├── index.ts             # Public API
    │   ├── compiler.ts           # Compilation logic
    │   └── serialization.ts     # Routine serialization
    └── package.json
```

## Key Dependencies

- **Vite** - Dev server and build tool
- **chokidar** - File watching
- **fs-extra** - File system operations
- **picocolors** - Terminal colors
- **@l8b/compiler** - LootiScript compiler
- **@l8b/diagnostics** - Error formatting
- **@l8b/runtime** - Runtime bundle

## Common Patterns

### Path Resolution

Always use `resolveProjectPath()`:

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

### Async Error Handling

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

## Testing

- Use test fixtures for project structure
- Mock file system operations
- Test error cases
- Integration tests for full workflows

## Adding New Commands

1. Create command file in `src/commands/`
2. Implement command function
3. Register in `src/cli.ts`
4. Add tests
5. Update documentation
