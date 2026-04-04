# @al8b/time

Time-machine debugging support for L8B. It records runtime state, replays snapshots, and exposes the playback and recording primitives used by the runtime debugger flow.

## Public API

- `TimeMachine`
- `StatePlayer`
- `StateRecorder`
- Types: `TimeMachineRuntime`, `StateSnapshot`, `TimeMachineCommand`, `TimeMachineMessage`, `TimeMachineStatus`

## Notes

- Consumed by `@al8b/runtime`.
- This package is about recording and replay infrastructure, not the frame loop itself.

## Scripts

```bash
bun run build
bun run test
bun run clean
```
