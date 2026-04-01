---
description: Load Bun skill for configuring dependencies, managing Workspaces, and running scripts native to Bun. Use when users ask to "install packages", "setup tsconfig for bun", or "execute typescript".
---

Load the Bun skill and help with dependency management, script execution, native TypeScript handling, and workspace configuration.

## Workflow

### Step 1: Load bun skill

```
skill({ name: 'bun' })
```

### Step 2: Identify task type from user request

Analyze $ARGUMENTS to determine:

- **Topic**: dependencies, workspace management, typescript config, or cli execution
- **Task type**: new installation, debugging scripts, or configuration

Use decision trees in SKILL.md to select the relevant reference files.

### Step 3: Read relevant reference files

Based on task type, read from `references/`:

| Task                       | Files to Read                   |
| -------------------------- | ------------------------------- |
| Install/manage packages    | `commands.md`                   |
| TypeScript configurations  | `typescript.md`                 |
| Manage packages in apps    | `workspaces.md`                 |

### Step 4: Execute task

Apply Bun-specific patterns from references to complete the user's request.

**CRITICAL - When running or adding packages:**

1. **DO NOT use npm, yarn, or pnpm** - Always use Bun natively
2. Use `bun install` for all installation routines at monorepo root
3. Use `bun run` or native executable instead of `ts-node` or `tsc`
4. Use `bun add <pkg>` inside the relevant workspace directory

### Step 5: Summarize

```
=== Bun Task Complete ===

Topic: <dependencies|workspaces|typescript|cli>
Files referenced: <reference files consulted>

<brief summary of what was done, emphasizing Bun workflows>
```

<user-request>
$ARGUMENTS
</user-request>
