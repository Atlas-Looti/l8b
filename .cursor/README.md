# Cursor AI Agent Configuration

This directory contains Cursor AI agent rules and configuration for the L8B codebase.

## Rules Structure

- **`.cursorrules`** (root): Main rules file with comprehensive project overview
- **`.cursor/rules/`**: Specific rules files organized by domain:
  - `core-apis.md` - Core API development patterns
  - `lootiscript.md` - LootiScript language development
  - `typescript.md` - TypeScript coding standards
  - `monorepo.md` - Monorepo workflow and package management

## How Rules Work

Cursor automatically applies rules based on:
1. **Global rules**: `.cursorrules` applies to entire codebase
2. **Glob patterns**: Rules in `.cursor/rules/` apply to matching files
3. **Context**: Rules are included when relevant files are open or mentioned

## Best Practices

1. **Use Chat mode** for large, multi-file changes
2. **Use @ mentions** to provide context:
   - `@.cursorrules` - Include main rules
   - `@packages/core/screen` - Reference similar code
   - `@docs/fundamentals/api-reference.md` - Include documentation
3. **Create focused chats** for specific tasks
4. **Reference existing patterns** when adding new features

## Indexing

Cursor indexes all files except those in `.cursorignore`:
- Build outputs (`dist/`, `.l8b/`)
- Dependencies (`node_modules/`)
- Large binary assets (images, audio, video)
- Environment files (`.env`)

See `.cursorignore` for complete list.

## Getting Help

- Check `.cursorrules` for project overview
- Check domain-specific rules in `.cursor/rules/`
- Reference `AGENTS.md` and `DEVELOPMENT.md` for more context
- Look at existing code patterns in the codebase

