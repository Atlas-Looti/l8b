# @l8b/io

IO and Storage utilities for the L8B Engine.

## Features

- **StorageService**: localStorage wrapper with automatic serialization, batched writes, and caching

## Installation

```bash
npm install @l8b/io
```

## Usage

```typescript
import { StorageService } from '@l8b/io';

// Create a storage service with a namespace
const storage = new StorageService('/my-app');

// Store values (batched write)
storage.set('player-name', 'Alice');
storage.set('score', 1000);

// Get values
const name = storage.get('player-name'); // 'Alice'
const score = storage.get('score'); // 1000

// Flush pending writes immediately
storage.flush();

// Clear all storage for this namespace
storage.clear();
```

## API

### `StorageService`

#### Constructor

```typescript
new StorageService(namespace?: string, preserve?: boolean)
```

- `namespace`: Storage namespace prefix (default: `/l8b`)
- `preserve`: If `false`, clears existing storage on creation (default: `false`)

#### Methods

- `get(name: string): any` - Get value from storage
- `set(name: string, value: any): void` - Set value in storage (batched)
- `flush(): void` - Flush pending writes to localStorage immediately
- `check(): void` - Check and flush if there are pending writes
- `clear(): void` - Clear all storage for this namespace
- `getInterface()` - Get a simplified interface for game code

## Future Extensions

This package is designed to accommodate future IO helpers such as:
- File loading utilities
- Logging services
- Network request helpers
