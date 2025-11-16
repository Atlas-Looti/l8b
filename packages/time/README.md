# @l8b/time

Time machine debugging for L8B game engine. Record, replay, and loop game state for debugging.

## Features

- **State Recording**: Capture game state history (30 seconds at 60fps)
- **Step Through Time**: Move backward/forward frame by frame
- **Loop Playback**: Replay specific sections repeatedly (4 second loops)
- **Smart Serialization**: Automatically excludes non-serializable objects
- **Modular Architecture**: Clean separation of recording, playback, and control

## Installation

```bash
bun add @l8b/time
```

## Usage

### Basic Setup

```typescript
import { TimeMachine } from "@l8b/time";

// Create time machine with runtime reference
const timeMachine = new TimeMachine(runtime);

// Listen to status updates
timeMachine.onStatus((status) => {
  console.log("Recording:", status.recording);
  console.log("Position:", status.position);
  console.log("Length:", status.length);
});

// Call step() each frame
function gameLoop() {
  // ... game logic ...
  timeMachine.step();
}
```

### Control Commands

```typescript
// Start recording
timeMachine.messageReceived({
  name: "time_machine",
  command: "start_recording",
});

// Stop recording
timeMachine.messageReceived({
  name: "time_machine",
  command: "stop_recording",
});

// Step backward
timeMachine.messageReceived({
  name: "time_machine",
  command: "step_backward",
});

// Step forward
timeMachine.messageReceived({
  name: "time_machine",
  command: "step_forward",
});

// Jump to position
timeMachine.messageReceived({
  name: "time_machine",
  command: "replay_position",
  position: 120, // frames from current
});

// Start looping
timeMachine.messageReceived({
  name: "time_machine",
  command: "start_looping",
});

// Stop looping
timeMachine.messageReceived({
  name: "time_machine",
  command: "stop_looping",
});
```

### Advanced Usage

```typescript
import { StateRecorder, StatePlayer } from "@l8b/time";

// Use recorder independently
const recorder = new StateRecorder(60 * 60); // 60 seconds
recorder.setExcluded([systemObjects]);
recorder.record(gameState);

// Use player independently
const player = new StatePlayer(60 * 5); // 5 second loops
player.startLoop(position, callback);
const snapshot = recorder.getState(0);
player.restoreState(target, snapshot);
```

## Architecture

```
@l8b/time/
├── core/
│   └── machine.ts      # Main TimeMachine coordinator
├── recording/
│   └── recorder.ts     # State recording logic
├── playback/
│   └── player.ts       # Replay and loop logic
└── types/
    └── state.ts        # Type definitions
```

### Design Principles

- **< 500 lines per file**: Easy to understand and maintain
- **Single responsibility**: Each module has one clear purpose
- **No dependencies**: Pure TypeScript, no external packages
- **Type-safe**: Full TypeScript support

## API Reference

### TimeMachine

Main controller for time machine functionality.

```typescript
class TimeMachine {
  constructor(runtime: TimeMachineRuntime);
  step(): void;
  messageReceived(data: TimeMachineMessage): void;
  onStatus(callback: (status: TimeMachineStatus) => void): void;
  isRecording(): boolean;
  isLooping(): boolean;
}
```

### StateRecorder

Records game state snapshots in a circular buffer.

```typescript
class StateRecorder {
  constructor(maxLength?: number);
  setExcluded(excluded: any[]): void;
  record(state: any): void;
  getState(position: number): StateSnapshot | null;
  getLength(): number;
  clear(): void;
  trimTo(position: number): void;
}
```

### StatePlayer

Handles state restoration and loop playback.

```typescript
class StatePlayer {
  constructor(loopLength?: number);
  isLooping(): boolean;
  startLoop(position: number, callback: () => void): void;
  stopLoop(): number;
  updateLoop(): number | null;
  restoreState(target: any, snapshot: StateSnapshot): void;
}
```

## Integration with @l8b/runtime

The time machine is designed to integrate seamlessly with `@l8b/runtime`:

```typescript
import { Runtime } from "@l8b/runtime";
import { TimeMachine } from "@l8b/time";

const runtime = new Runtime(options);
const timeMachine = new TimeMachine(runtime);

// Time machine automatically records during game loop
// and can be controlled via messages
```

## How It Works

1. **Recording**: Each frame, the time machine captures a snapshot of the game's global state
2. **Circular Buffer**: Snapshots are stored in a circular buffer (default 30 seconds)
3. **Exclusions**: System APIs and non-serializable objects are automatically excluded
4. **Replay**: When stepping back, the state is restored from the snapshot
5. **Looping**: A section of recorded frames can be played repeatedly for debugging

## Limitations

- Only serializable data is recorded (primitives, objects, arrays)
- Functions, DOM elements, and system APIs are excluded
- Maximum history length is configurable but limited by memory
- Replay accuracy depends on game state being fully captured

## Development

```bash
# Build
bun run build

# Test
bun run test

# Clean
bun run clean
```

## License

MIT

