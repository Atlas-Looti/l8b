# @al8b/audio

Audio primitives for the L8B runtime. This package provides the browser-facing audio core plus the asset wrappers used for sound effects, music playback, and synthesized beeps.

## Public API

- `AudioCore`
- `Sound`
- `Music`
- `Beeper`

## Notes

- Primarily consumed by `@al8b/runtime`.
- Depends on browser audio APIs and is not a standalone CLI-facing package.

## Scripts

```bash
bun run build
bun run test
bun run clean
```
