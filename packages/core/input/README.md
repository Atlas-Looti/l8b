# @al8b/input

Modular input subsystem for keyboard, mouse, touch, and gamepad state. The package exposes a single input manager plus concrete device handlers and shared state types.

## Public API

- `Input` (`default`)
- `KeyboardInput`
- `MouseInput`
- `TouchInput`
- `GamepadInput`
- Shared input types from `./types`

## Notes

- Primarily consumed by `@al8b/runtime`.
- Designed for browser event sources rather than server-side use.

## Scripts

```bash
bun run build
bun run test
bun run clean
```
