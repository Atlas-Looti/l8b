# TypeScript Configuration for Bun

Bun is uniquely qualified to execute TypeScript without friction. Use the configurations below to optimize development natively.

## The Optimal `tsconfig.json`

Bun doesn't require tsc to type-check before execution, but using this precise configuration aligns your project's types with Bun's module bundler and top-level await capabilities:

```json
{
  "compilerOptions": {
    "lib": ["ESNext"],
    "target": "ESNext",
    "module": "Preserve",
    "moduleDetection": "force",
    "jsx": "react-jsx",
    "allowJs": true,
    
    // Types explicitly pointing to bun APIs
    "types": ["bun"],

    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "noEmit": true,

    "strict": true,
    "skipLibCheck": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true,
    
    // Loosened for development
    "noUnusedLocals": false,
    "noUnusedParameters": false,
    "noPropertyAccessFromIndexSignature": false
  }
}
```

## Setup & Integrations

For any Bun project relying heavily on built-in APIs (`Bun.file`, `Bun.serve`, etc.), it's critical to install its types.

```bash
bun add -d @types/bun
```

## Running Scripts

Never use Node's `tsx` or `ts-node` to run scripts within this codebase. Bypassing Bun's compiler is slow and unnecessary. 
Use:
```bash
bun run script.ts
```
