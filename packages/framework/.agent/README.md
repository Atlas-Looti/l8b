# L8B Framework Agent Configuration

This directory contains AI agent prompts and workflows for maintaining the L8B Framework.

## Contents

### Prompts

- **`prompts/audit-and-optimize.md`** - Comprehensive agent prompt for code auditing, bug hunting, and optimization

### Workflows

- **`workflows/audit-framework.md`** - Step-by-step workflow for framework audit

## Quick Start

### For AI Agents

1. Read the audit prompt:
   ```bash
   cat prompts/audit-and-optimize.md
   ```

2. Follow the audit workflow:
   ```bash
   cat workflows/audit-framework.md
   ```

3. Reference codebases:
   - MicroStudio: `/home/nonom/Desktop/atlas-game/microstudio`
   - L8B Runtime: `/home/nonom/Desktop/atlas-game/l8b/packages/enggine/runtime`
   - L8B VM: `/home/nonom/Desktop/atlas-game/l8b/packages/enggine/vm`
   - Vite: `/home/nonom/Desktop/atlas-game/vite`

### Common Tasks

**Audit entire framework:**
```bash
# Read prompt and workflow, then analyze all packages
```

**Find bugs in specific package:**
```bash
cd /home/nonom/Desktop/atlas-game/l8b/packages/framework/[package-name]
# Apply bug hunting techniques from prompt
```

**Optimize code:**
```bash
# Compare with Vite/MicroStudio patterns
# Identify optimization opportunities
# Suggest improvements
```

## Agent Capabilities

The agent can:
- ✅ Find bugs (race conditions, memory leaks, error handling)
- ✅ Audit production readiness (security, performance, reliability)
- ✅ Optimize code (performance, clean code, structure)
- ✅ Cross-reference with MicroStudio, Vite, Runtime, VM
- ✅ Generate detailed reports with fixes
- ✅ Prioritize issues by severity

## Framework Context

**L8B** is a local, self-hosted version of MicroStudio game engine:
- Runs development server locally
- Provides HMR for game development
- Bundles games for production
- Integrates with LootiScript VM

**Architecture:**
```
l8b/packages/framework/
├── bundler/      # Production build system
├── cli/          # Command-line interface
├── compiler/     # LootiScript compiler
├── config/       # Configuration management
├── html/         # HTML generation & HMR client
├── server/       # Development server
├── shared/       # Shared utilities
└── watcher/      # File system watcher
```

## Best Practices

When auditing:
1. Always reference MicroStudio for game engine patterns
2. Always reference Vite for dev server patterns
3. Check Runtime/VM for integration points
4. Provide code examples in suggestions
5. Prioritize issues by impact
6. Be constructive and helpful

## Examples

See the prompt and workflow files for detailed examples of:
- Bug reports
- Optimization suggestions
- Code quality improvements
- Audit reports
