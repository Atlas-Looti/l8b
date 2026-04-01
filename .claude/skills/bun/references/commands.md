# Bun Command Reference

Essential commands for managing dependencies and executing code using Bun:

## Install Dependencies
```bash
# Global install (at the root of your project)
bun install

# Re-install everything clean
rm -rf node_modules
bun install
```

## Add Dependencies
```bash
# Add to dependencies
bun add <package>

# Add to devDependencies
bun add -d <package>
bun add --dev <package>

# Add specific version
bun add <package>@<version>
```

## Running Scripts
```bash
# Run a script from package.json
bun run <script_name>

# Execute a native run (equivalent to bun run)
bun <script_name>
```

## Executing Code Directly
```bash
# Execute TypeScript seamlessly
bun run src/index.ts

# Execute JavaScript
bun run dist/index.js
```

## Testing
```bash
# Run tests
bun test

# Watch mode
bun test --watch
```

> **Warning:** Never use `npm`, `yarn`, or `pnpm` side-by-side with Bun as it will scramble the lockfile and cache.
