---
name: bun
description: |
  Bun runtime and package manager guidance. Triggers on: bun.lock, bunfig.toml, tsconfig.json,
  "bun run", "bun install", "bun build", "bun test", "bun add".
  Use when user: installs dependencies, runs scripts, or works with Bun workspaces and TypeScript.
metadata:
  version: 1.0.0
---

# Bun Skill

Build system, package manager, test runner, and JavaScript/TypeScript runtime. Bun acts as a fast, drop-in replacement for Node.js, npm/yarn/pnpm, and ts-node/tsx.

## IMPORTANT: Package Manager Consistency

**DO NOT use npm, yarn, or pnpm in this repository. ALWAYS use bun.**

When interacting with dependencies, you MUST:

1. Use `bun install` to install all dependencies across the workspace.
2. Use `bun add <pkg>` to add dependencies to a specific package/app.
3. Use `bun add -d <pkg>` (or `--dev`) to add dev dependencies.
4. Execute scripts via `bun run <script>`.

**DO NOT** leave `package-lock.json`, `yarn.lock`, or `pnpm-lock.yaml` in the repository. The sole source of truth for dependencies is `bun.lock`.

## Secondary Rule: Native TypeScript Execution

**Always run TypeScript files directly with Bun:**

```bash
# DO THIS: Native execution, extremely fast
bun run src/index.ts
bun run scripts/deploy.ts
```

```bash
# DO NOT DO THIS: Unnecessary transpilation/extra tools
npx tsx src/index.ts
bun run ts-node src/index.ts
tsc && node dist/index.js
```

## Quick Decision Trees

### "I need to configure TypeScript"

```
Configure TypeScript?
├─ Get Type definitions → bun add -d @types/bun
├─ Enable top-level await/JSX → Use recommended compilerOptions (below)
├─ TypeScript 6.0+ → Add "types": ["bun"]
└─ Read full TS docs → https://bun.sh/docs/llms.txt
```

### "How should I manage workspaces?"

```
Workspace management?
├─ Add package to specific workspace → cd packages/foo && bun add <pkg>
├─ Install all workspace deps → run `bun install` at monorepo root
└─ Run tasks across workspaces → Delegate to Turborepo (turbo run <task>)
```

### "I want to run scripts"

```
Script execution?
├─ Run package.json script → bun run <script>
├─ Run script in specific workspace → cd packages/foo && bun run <script>
├─ Execute TS/JS file natively → bun run path/to/file.ts
└─ Run tests → bun test
```

## Critical Anti-Patterns

### Using other Package Managers

Mixing package managers breaks the monorepo cache and lockfile resolving.

```bash
# WRONG - using npm or pnpm
npm install
pnpm add lodash

# CORRECT - always use bun
bun install
bun add lodash
```

### Compiling TypeScript just to execute a script

Do not use `tsc` or `ts-node` to run utility scripts. Bun has a built-in transpiler that handles TypeScript seamlessly.

```bash
# WRONG
tsc --noEmit && node dist/script.js

# CORRECT
bun run scripts/setup-db.ts
```
*Note: `tsc` is often still used (e.g., via `turbo run typecheck` or `turbo run build`) specifically for type-checking and building distributable packages, but it is NOT needed merely to execute code.*

### Bypassing Turborepo in the Monorepo

While `bun run` is fast, root `package.json` scripts should lean on Turborepo's task graph for executing operations across multiple packages in parallel.

```json
// WRONG: Root package.json bypassing turbo's parallelization
{
  "scripts": {
    "build": "bun build ./apps/web && bun build ./apps/api"
  }
}

// CORRECT: Root package.json delegates to turbo
{
  "scripts": {
    "build": "turbo run build"
  }
}
```

## Common Task Configurations

### Suggested `tsconfig.json`

Bun supports top-level await, JSX, and extensioned `.ts` imports natively. Use these `compilerOptions` to strictly align TypeScript's behavior with Bun and avoid compilation warnings:

```json
{
  "compilerOptions": {
    // Environment setup & latest features
    "lib": ["ESNext"],
    "target": "ESNext",
    "module": "Preserve",
    "moduleDetection": "force",
    "jsx": "react-jsx",
    "allowJs": true,
    "types": ["bun"],

    // Bundler mode
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "noEmit": true,

    // Best practices
    "strict": true,
    "skipLibCheck": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true,

    // Some stricter flags (disabled by default)
    "noUnusedLocals": false,
    "noUnusedParameters": false,
    "noPropertyAccessFromIndexSignature": false
  }
}
```

### Documentation Index
Fetch the complete documentation index at: [https://bun.sh/docs/llms.txt](https://bun.com/docs/llms.txt).
You can also consult the full structured, categorized list of official Bun documentation in the local references file: [references/docs.md](file:///c:/Users/hi/Desktop/workspace/l8b/.claude/skills/bun/references/docs.md). Always look there to find the correct official guide or reference for any Bun-related APIs, bundling, testing, or runtime behavior.

