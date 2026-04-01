# Bun Workspaces Guide

Managing a large monorepo requires disciplined package installation. 

## The Prime Rule
A workspace is designated inside `package.json` under `"workspaces"`. Bun automatically figures out dependency graphs. To install the graph, run this command from the root folder:

```bash
# This must never be done by NPM or Yarn. Only Bun.
bun install
```

## Adding Dependencies to a Node within Workspaces

Currently, the most robust way to add an app-only or package-only dependency (`packages/ui` for example) without inflating the root `package.json` is to transition to the actual directory.

**Method 1: Direct Directory execution (Recommended)**
```bash
cd packages/ui
bun add <package>
```
## Inter-Package Dependencies

Link packages together simply by declaring the local workspace package name.

For instance, inside `apps/web/package.json`:
```json
{
  "dependencies": {
    "@repo/ui": "workspace:*"  // Linking workspace versions allows Bun to manage symlinks seamlessly.
  }
}
```

## Orchestrating Scripts

Workspaces shouldn't be executed directly by traversing paths like `bun run ./apps/api`.
Delegate tasks natively via Turborepo when running scripts that potentially touch caching.

```bash
turbo run build
```
This commands your root system to query Bun inside specific packages.
