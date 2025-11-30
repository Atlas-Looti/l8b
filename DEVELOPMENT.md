# Development Guide

Quick reference for common development tasks in the l8b monorepo.

## Initial Setup

```bash
# Clone and install
git clone <repo-url>
cd l8b
pnpm install
pnpm run build
```

## Daily Development

```bash
# Start all packages in watch mode
pnpm run dev

# Run tests in watch mode
pnpm run test:watch

# Format and lint
pnpm run format
pnpm run lint
```

## Building

```bash
# Build all packages
pnpm run build

# Build with type checking
pnpm run check-types
pnpm run build
```

## Testing

```bash
# Run all tests
pnpm run test

# Watch mode
pnpm run test:watch

# Coverage report
pnpm run test:coverage

# Test specific package
cd packages/core/sprites
pnpm run test
```

## Documentation

```bash
# Start docs dev server
pnpm run docs:dev

# Build docs
pnpm run docs:build

# Preview built docs
pnpm run docs:preview
```

## Working with Packages

### Add Dependency to Package

```bash
cd packages/core/sprites

# External package
pnpm add some-package

# Workspace package
pnpm add @l8b/core/screen@workspace:*
```

### Create New Package

```bash
pnpm run new
```

Follow the prompts to create a new package with proper structure.

## Common Workflows

### Adding a New Core API

1. Create package: `pnpm run new`
2. Implement API in `src/`
3. Add tests in `tests/`
4. Add API definition in `tooling/language-server/src/api-definitions/`
5. Update docs in `docs/`

### Working with Language Server

1. Update API definitions in `tooling/language-server/src/api-definitions/`
2. Update diagnostics in `tooling/diagnostics/` if needed
3. Rebuild VSCode extension: `cd packages/tooling/vscode && pnpm run build`

## CI

The CI runs this command:

```bash
pnpm run ci
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
pnpm run clean

# Reinstall dependencies
rm -rf node_modules
pnpm install

# Rebuild everything
pnpm run build
```

### Clear Turbo Cache

```bash
rm -rf .turbo
pnpm run build
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
pnpm run build --dry-run

# Run specific package script
pnpm --filter @l8b/core/sprites build

# Clean node_modules in all packages
find . -name "node_modules" -type d -prune -exec rm -rf '{}' +
```
