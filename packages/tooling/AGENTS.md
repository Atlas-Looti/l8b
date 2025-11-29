# Tooling Package - AI Agent Guide

## Overview

Tooling packages provide IDE support for LootiScript development:
- **language-server** - Language Server Protocol implementation
- **diagnostics** - Error and warning diagnostics
- **vscode** - VSCode extension

## Language Server

### Architecture

The language server (`packages/tooling/language-server`) implements LSP:

```typescript
// Connection setup
const connection = createConnection(
  ProposedFeatures.all
);

// Initialize server
connection.onInitialize((params) => {
  return {
    capabilities: {
      textDocumentSync: TextDocumentSyncKind.Incremental,
      completionProvider: { triggerCharacters: [".", "("] },
      hoverProvider: true,
      diagnosticsProvider: true,
    },
  };
});
```

### API Definitions

API definitions drive autocompletion:

```typescript
// packages/tooling/language-server/src/api-definitions/<api-name>.ts
export const screenAPI = {
  screen: {
    width: {
      type: "number",
      description: "Screen width in L8B coordinate units",
    },
    clear: {
      type: "function",
      parameters: [
        {
          name: "color",
          type: "string",
          optional: true,
          description: "Fill color (hex or named)",
        },
      ],
      returnType: "void",
      description: "Clear the screen",
      examples: [
        {
          code: "screen.clear(\"#000\")",
          description: "Clear screen with black",
        },
      ],
    },
  },
};
```

### Completion Provider

```typescript
connection.onCompletion((params) => {
  const document = documents.get(params.textDocument.uri);
  const position = params.position;
  
  // Get context at position
  const context = getContext(document, position);
  
  // Return completions based on API definitions
  return getCompletions(context);
});
```

### Hover Provider

```typescript
connection.onHover((params) => {
  const document = documents.get(params.textDocument.uri);
  const position = params.position;
  
  // Get symbol at position
  const symbol = getSymbol(document, position);
  
  // Return documentation
  return {
    contents: formatDocumentation(symbol),
  };
});
```

## Diagnostics

### Diagnostic Structure

Diagnostics (`packages/tooling/diagnostics`) provide error/warning information:

```typescript
interface Diagnostic {
  code: string;              // Error code (e.g., "E1001")
  severity: "error" | "warning" | "info";
  message: string;
  line: number;
  column: number;
  context?: string;
  suggestions?: string[];
}
```

### Creating Diagnostics

```typescript
import { createDiagnostic, CompilationErrorCode } from "@l8b/diagnostics";

const diagnostic = createDiagnostic(CompilationErrorCode.E1001, {
  file: "game.loot",
  line: 15,
  column: 5,
  context: "Missing 'end' keyword",
  suggestions: [
    "Add 'end' to close the function",
    "Check for unmatched 'if' or 'for' statements",
  ],
});
```

### Formatting

Diagnostics are formatted for different outputs:

```typescript
// CLI format
const cliFormat = formatForCLI(diagnostic);

// LSP format
const lspFormat = formatForLSP(diagnostic);

// Browser format
const browserFormat = formatForBrowser(diagnostic);
```

## VSCode Extension

### Activation

Extension (`packages/tooling/vscode`) activates on `.loot` files:

```typescript
export function activate(context: vscode.ExtensionContext) {
  // Start language client
  const client = new LanguageClient(
    "lootiscript",
    "LootiScript Language Server",
    serverOptions,
    clientOptions
  );
  
  client.start();
  
  // Register commands
  context.subscriptions.push(
    vscode.commands.registerCommand("l8b.command", handler)
  );
}
```

### Features

- Syntax highlighting
- Code completion
- Hover documentation
- Error diagnostics
- Code snippets

## API Definition Pattern

### Structure

Each API definition file exports an object:

```typescript
export const apiName = {
  apiName: {
    // Properties
    property: {
      type: "number" | "string" | "boolean" | "object" | "function",
      description: "Property description",
    },
    
    // Methods
    method: {
      type: "function",
      parameters: [
        {
          name: "param",
          type: "string",
          optional: true,
          description: "Parameter description",
        },
      ],
      returnType: "string",
      description: "Method description",
      examples: [
        {
          code: "apiName.method('value')",
          description: "Example usage",
        },
      ],
    },
  },
};
```

### Nested Objects

For nested objects (e.g., `keyboard.press.SPACE`):

```typescript
export const inputAPI = {
  keyboard: {
    UP: { type: "number", description: "Up arrow key" },
    press: {
      type: "object",
      properties: {
        SPACE: { type: "number", description: "Space key press" },
      },
    },
  },
};
```

## Adding New API Definition

### Step 1: Create Definition File

```typescript
// packages/tooling/language-server/src/api-definitions/new-api.ts
export const newAPI = {
  newAPI: {
    // API definition
  },
};
```

### Step 2: Register Definition

```typescript
// packages/tooling/language-server/src/api-definitions/index.ts
import { newAPI } from "./new-api";

export const allAPIs = {
  ...screenAPI,
  ...audioAPI,
  ...newAPI,  // Add here
};
```

### Step 3: Update Language Server

The language server automatically picks up new definitions from the index.

## Error Codes

Error codes are defined in diagnostics:

```typescript
// packages/tooling/diagnostics/src/codes.ts
export enum CompilationErrorCode {
  E1001 = "E1001",  // Unterminated function/block
  E1002 = "E1002",  // Too many 'end'
  // ...
}
```

## Testing

Language server features should be tested:

```typescript
describe("Completion Provider", () => {
  it("should provide completions for screen API", () => {
    const completions = getCompletions({
      text: "screen.",
      position: { line: 0, column: 7 },
    });
    
    expect(completions).toContainEqual({
      label: "clear",
      kind: CompletionItemKind.Method,
    });
  });
});
```

## Integration with Framework

The tooling:
- **Provides** autocompletion for APIs exposed by runtime
- **Validates** LootiScript code during development
- **Shows** errors from compiler
- **Works** with framework CLI dev server

Framework:
- **Uses** compiler that generates diagnostics
- **Shows** diagnostics in browser error overlay
- **Integrates** with language server in VSCode

## Key Files

- `packages/tooling/language-server/src/api-definitions/` - API definitions
- `packages/tooling/diagnostics/src/` - Diagnostic utilities
- `packages/tooling/vscode/src/` - VSCode extension
