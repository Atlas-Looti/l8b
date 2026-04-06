# Contributing to AL8B

Thank you for your interest in contributing to AL8B! This guide will help you set up your development environment and understand our release process.

## Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Atlas-Looti/l8b.git
   cd l8b
   ```

2. **Install dependencies** (requires Bun >=1.3.0 and Node >=24.0.0)
   ```bash
   bun install
   ```

3. **Verify your setup**
   ```bash
   bun run ci
   ```

## Development

### Available Commands

```bash
bun run dev              # Start dev server with watch mode
bun run build            # Build all packages
bun run test             # Run all tests
bun run test:watch       # Tests in watch mode
bun run lint             # Lint and fix formatting
bun run lint:check       # Check linting without fixing
bun run check-types      # TypeScript type checking
bun run ci               # Full CI: lint, format, types, build, test
```

### Code Style

We use **Biome** for formatting and linting. Configuration is in `biome.json`.

- **Indentation**: Tabs
- **Quotes**: Double quotes
- **Line width**: 120 characters

```bash
bun run format           # Format all files
bun run lint             # Auto-fix linting issues
```

### Testing

Each package has tests in `src/**/__tests__` or `src/**/*.test.ts`.

```bash
bun run test             # Run all tests
cd packages/core/screen && bun run test  # Test one package
```

### TypeScript

We use strict TypeScript mode. Type check before committing:

```bash
bun run check-types
```

## Git Workflow

1. **Create a feature branch** from `main`
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** and commit

3. **Add a changeset** (if your change affects users)
   ```bash
   bun run changeset
   ```
   - Select affected packages
   - Choose version bump (`patch`, `minor`, `major`)
   - Write a summary (appears in CHANGELOG)

4. **Push and create a pull request**
   ```bash
   git push origin feature/your-feature-name
   ```

5. **Wait for CI checks** to pass (tests, types, lint, build)

6. **Merge** — a maintainer will merge your PR

## Release Process

### Automated Workflow

When changesets are merged to `main`:

1. **Create Release PR** — changesets action creates a PR that:
   - Bumps versions in all `package.json` files
   - Updates `CHANGELOG.md` with your changes
   - Title: `[ci] release`

2. **Review and Merge** — maintainer reviews and merges

3. **Publish to npm** — after merge:
   - Runs full test suite
   - Publishes to npm (requires `NPM_TOKEN` in secrets)
   - Creates GitHub Release with version tag

### Manual Release (Maintainers Only)

```bash
bun run release
```

This runs `changeset version` followed by `changeset publish`.

## Changeset Guide

### What is a changeset?

A changeset is a file that describes:
- Which packages changed
- What kind of change (patch/minor/major)
- Summary for the changelog

### Creating a changeset

```bash
bun run changeset
```

Then answer the prompts:
1. Select packages that changed
2. Choose version bump type
3. Write a summary (keep it concise and user-focused)

### Example changeset

File `.changeset/add-memory-api.md`:

```markdown
---
"@al8b/runtime": minor
"@al8b/vm": patch
---

Add memory.snapshot() and memory.restore() APIs for save/load workflows
```

### Changeset conventions

- **patch**: Bug fixes, internal refactors, documentation
- **minor**: New features, new APIs, non-breaking improvements
- **major**: Breaking changes to public APIs

## Branch Protection Rules

The `main` branch requires:

- ✅ All status checks pass (lint, format, types, build, test)
- ✅ Code review (1 approval minimum)
- ✅ Branches up to date before merge

## NPM Publishing

Packages are published to npm automatically when:

1. Changesets are merged to `main`
2. Release PR is created and merged
3. `bun run changeset-publish` is executed

All public packages use `"publishConfig": { "access": "public" }` in `package.json`.

### Verifying npm packages

```bash
# Check npm registry (published packages appear here)
npm info @al8b/runtime
npm info @al8b/runtime-react
npm info @al8b/runtime-realtime
```

## Troubleshooting

### "Canvas not found" in tests

Some packages need jsdom for canvas testing. Check the package's `vitest.config.ts` has:

```ts
environment: "jsdom"
```

### Type errors after changes

```bash
bun run check-types
```

### CI pipeline failed

Check the failed step in GitHub Actions (Actions tab in your PR) and see the error log.

Common issues:
- Formatting: run `bun run format`
- Linting: run `bun run lint`
- Types: run `bun run check-types`
- Tests: run `bun run test`

## Architecture

See [CLAUDE.md](./CLAUDE.md) for architecture overview and key integration points.

## Questions?

- Check existing issues: https://github.com/Atlas-Looti/l8b/issues
- Review RFC docs in `proposals/`
- Check docs-site for API reference

Thank you for contributing! 🎉
