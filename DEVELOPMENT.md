# Development Guide

Quick reference for common development tasks in the l8b monorepo.

## Initial Setup

```bash
# Clone and install
git clone <repo-url>
cd l8b
bun install
bun run build
```

## Daily Development

```bash
# Start all packages in watch mode
bun run dev

# Run tests in watch mode
bun run test:watch

# Format and lint
bun run format
bun run lint
```

## Building

```bash
# Build all packages
bun run build

# Build with type checking
bun run check-types
bun run build
```

## Testing

```bash
# Run all tests
bun run test

# Watch mode
bun run test:watch

# Coverage report
bun run test:coverage

# Test specific package
cd packages/core/sprites
bun run test
```

## Documentation

```bash
# Start docs dev server
bun run docs:dev

# Build docs
bun run docs:build

# Preview built docs
bun run docs:preview
```

## Working with Packages

### Add Dependency to Package

```bash
cd packages/core/sprites

# External package
bun add some-package

# Workspace package
bun add @l8b/core/screen@workspace:*
```

### Create New Package

```bash
bun run new
```

Follow the prompts to create a new package with proper structure.

## Common Workflows

### Adding a New Core API

1. Create package: `bun run new`
2. Implement API in `src/`
3. Add tests in `tests/`
4. Add API definition in `tooling/language-server/src/api-definitions/`
5. Update docs in `docs/`

### Working with Language Server

1. Update API definitions in `tooling/language-server/src/api-definitions/`
2. Update diagnostics in `tooling/diagnostics/` if needed
3. Rebuild VSCode extension: `cd packages/tooling/vscode && bun run build`

## CI

The CI runs this command:

```bash
bun run ci
```

Which executes:
1. Lint check
2. Format check
3. Type checking
4. Build all packages
5. Run all tests

## Troubleshooting

### Clean Build

```bash
# Clean all build artifacts
bun run clean

# Reinstall dependencies
rm -rf node_modules
bun install

# Rebuild everything
bun run build
```

### Clear Turbo Cache

```bash
rm -rf .turbo
bun run build
```

### Port Already in Use

```bash
# Find and kill process on port 5173
lsof -ti:5173 | xargs kill -9
```

## Package Structure Reference

```
packages/<category>/<name>/
├── src/
│   ├── index.ts
│   └── ...
├── tests/
│   └── *.test.ts
├── package.json
├── tsconfig.json
└── tsup.config.ts
```

## Useful Commands

```bash
# Check which packages would be affected by changes
bun run build --dry-run

# Run specific package script
turbo build --filter=@l8b/core/sprites

# Clean node_modules in all packages
find . -name "node_modules" -type d -prune -exec rm -rf '{}' +
```
