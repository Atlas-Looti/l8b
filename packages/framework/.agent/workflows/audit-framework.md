---
description: Audit L8B Framework for bugs, optimizations, and code quality
---

# Audit L8B Framework

This workflow guides the AI agent through a comprehensive framework audit.

## Prerequisites

Read the agent prompt first:
```bash
cat /home/nonom/Desktop/atlas-game/l8b/packages/framework/.agent/prompts/audit-and-optimize.md
```

## Workflow Steps

### 1. Initial Assessment

Get overview of framework structure:
```bash
cd /home/nonom/Desktop/atlas-game/l8b/packages/framework
ls -la
```

List all packages:
```bash
find . -name "package.json" -not -path "*/node_modules/*" | head -20
```

### 2. Identify High-Priority Files

Find largest/most complex files:
```bash
find . -name "*.ts" -not -path "*/node_modules/*" -not -path "*/dist/*" -exec wc -l {} + | sort -rn | head -20
```

### 3. Bug Hunting Phase

Search for common bug patterns:

**Unhandled Promises:**
```bash
grep -rn "async\|Promise" --include="*.ts" | grep -v "await\|catch\|then"
```

**Any Types:**
```bash
grep -rn ": any" --include="*.ts" src/
```

**Console.log (should use logger):**
```bash
grep -rn "console\." --include="*.ts" src/
```

**TODO/FIXME:**
```bash
grep -rn "TODO\|FIXME" --include="*.ts" src/
```

### 4. Cross-Reference Analysis

For each critical file, compare with references:

**Example: Compare server implementation**
```bash
# L8B server
cat /home/nonom/Desktop/atlas-game/l8b/packages/framework/server/src/server.ts

# Vite server reference
cat /home/nonom/Desktop/atlas-game/vite/packages/vite/src/node/server/index.ts
```

### 5. Performance Analysis

Check for performance issues:

**Large bundle sizes:**
```bash
find dist/ -name "*.js" -exec ls -lh {} + | sort -k5 -rh | head -10
```

**Synchronous file operations:**
```bash
grep -rn "readFileSync\|writeFileSync" --include="*.ts" src/
```

### 6. Code Quality Check

**Function complexity (functions >50 lines):**
```bash
# Use AST tools or manual review
```

**Code duplication:**
```bash
# Look for similar patterns across files
```

### 7. Generate Report

Create audit report with findings:
- Critical bugs
- Performance issues
- Code quality improvements
- Optimization opportunities

### 8. Prioritize Action Items

Categorize findings:
1. **P0 - Critical:** Security issues, data loss bugs
2. **P1 - High:** Performance problems, major bugs
3. **P2 - Medium:** Code quality, minor bugs
4. **P3 - Low:** Style issues, minor optimizations

## Example Usage

```bash
# Quick audit of server package
cd /home/nonom/Desktop/atlas-game/l8b/packages/framework/server
cat src/server.ts | wc -l  # Check size
grep -n "any" src/server.ts  # Check type safety
grep -n "console" src/server.ts  # Check logging

# Compare with Vite
diff -u src/server.ts /home/nonom/Desktop/atlas-game/vite/packages/vite/src/node/server/index.ts
```

## Output Template

```markdown
# Framework Audit Report - [Date]

## Executive Summary
- Files Audited: X
- Bugs Found: Y
- Optimizations Identified: Z
- Code Quality Issues: W

## Critical Issues (P0)
[List critical bugs that need immediate attention]

## High Priority (P1)
[List important bugs and performance issues]

## Optimizations
[List performance improvements]

## Code Quality
[List clean code suggestions]

## Action Plan
1. [First priority fix]
2. [Second priority fix]
...

## References
- Vite patterns used: [list]
- MicroStudio patterns checked: [list]
```
