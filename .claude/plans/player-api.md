# Player API + Audio Volume Enhancement

## Konsep

**Player API** (`player.*`) - API baru untuk mengontrol UX player dari LootiScript.
Game bisa mengatur lifecycle (quit, pause, resume), performa (fps), dan komunikasi ke host (postMessage).

**Audio Volume** (`audio.setVolume/getVolume`) - Tambah master volume control ke audio API yang sudah ada.

**System Refactor** - Pindahkan `pause`, `exit`, `postMessage` dari `system.*` ke `player.*` (breaking change). System tetap handle info: time, fps (read-only), language, inputs, loading.

## Files yang akan dibuat/diubah

### New Files (Player Package)
1. `packages/core/player/package.json` - package scaffold
2. `packages/core/player/tsconfig.json` - TS config
3. `packages/core/player/tsup.config.ts` - build config
4. `packages/core/player/src/index.ts` - barrel export
5. `packages/core/player/src/player-service.ts` - PlayerService class
6. `packages/core/player/src/types.ts` - PlayerDelegate interface

### Modified Files
7. `packages/enggine/vm/src/types/index.ts` - tambah PlayerAPI interface + GlobalAPI.player
8. `packages/enggine/runtime/src/core/orchestrator.ts` - register player, wire delegate
9. `packages/enggine/runtime/package.json` - tambah @l8b/player dependency
10. `packages/enggine/runtime/src/system/api.ts` - hapus pause/exit/postMessage (BREAKING)
11. `packages/core/audio/src/core/audio-core.ts` - tambah setVolume/getVolume + update interface cache
12. `packages/tooling/language-server/src/api-definitions/player.ts` - LSP definitions baru
13. `packages/tooling/language-server/src/api-definitions/index.ts` - register playerApi
14. `packages/tooling/language-server/src/api-definitions/system.ts` - hapus pause/exit/postMessage
15. `packages/tooling/language-server/src/api-definitions/audio.ts` - tambah volume methods

## Player API Design

```typescript
// Dari LootiScript:
player.quit()                  // Kirim quit signal ke host → kembali ke hub
player.pause()                 // Pause game loop
player.resume()                // Resume game loop
player.exit()                  // Close window/exit
player.postMessage(msg)        // Kirim custom message ke host
player.setFps(fps)             // Set target update rate
player.fps                     // Baca current FPS (getter)
player.update_rate             // Baca/set target update rate
```

## Audio Volume Design

```typescript
// Dari LootiScript:
audio.setVolume(0.5)           // Set master volume (0-1)
audio.getVolume()              // Get current master volume
```

## Architecture

```
PlayerService (core/player)
  ├── Receives PlayerDelegate (callbacks)
  ├── getInterface() → cached object for VM
  └── Methods delegate to orchestrator

Orchestrator wires PlayerDelegate:
  ├── quit → listener.postMessage({type:"quit"}) + gameLoop.stop()
  ├── pause → gameLoop.stop()
  ├── resume → gameLoop.resume()
  ├── exit → window.close()
  ├── postMessage → listener.postMessage()
  ├── setFps → system.update_rate = fps
  ├── getFps → system.fps
  └── getUpdateRate → system.update_rate
```

## Breaking Changes

- `system.pause()` → pindah ke `player.pause()`
- `system.exit()` → pindah ke `player.exit()`
- `system.postMessage()` → pindah ke `player.postMessage()`

## Implementation Order

1. Buat player package scaffold
2. Implement PlayerService + types
3. Update VM types (PlayerAPI + GlobalAPI)
4. Update orchestrator (register player, wire delegate)
5. Refactor System API (hapus methods yang pindah)
6. Tambah audio volume control
7. Update LSP definitions
8. bun install + build + test
