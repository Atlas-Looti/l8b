# RuntimeListener

Callbacks for host-side events fired by the engine. Pass as `listener` to `createRuntime`.

```ts
const runtime = createRuntime({
  listener: {
    log: (msg) => console.log("[game]", msg),
    reportError: (err) => console.error("[game error]", err),
    codePaused: () => showPauseScreen(),
    onReady: () => hideLoadingScreen(),
    onHostEmit: (name, payload) => handleGameEvent(name, payload),
    onAssetProgress: (pct) => setLoadingBar(pct),
  },
});
```

## Callbacks

### `log(message: string)`

Fired when LootiScript calls `print(value)`.

```ts
log: (msg) => {
  document.getElementById("console")!.textContent += msg + "\n";
}
```

### `reportError(error: ErrorInfo)`

Fired on any runtime or game code error. `error.type` is one of:
- `"compile"` — LootiScript syntax error during source load
- `"init"` — exception thrown inside `init()`
- `"update"` — exception thrown inside `update()`
- `"draw"` — exception thrown inside `draw()`

```ts
reportError: (err) => {
  console.error(`[${err.type}] ${err.error}`, err.stack);
  Sentry.captureException(new Error(err.error));
}
```

### `codePaused()`

Fired when LootiScript calls `system.pause()`. Use to show an in-game pause menu.

### `onReady()`

Fired once per `runtime.start()`, after all assets are loaded and `init()` completes. The game loop is running when this fires.

```ts
onReady: () => {
  document.getElementById("loading")!.style.display = "none";
  document.getElementById("game")!.style.display = "block";
}
```

### `onHostEmit(name: string, payload: unknown)`

Fired when the game calls `host.emit(name, payload)`. This is the primary way for the game to send data to the host app without a custom bridge.

Internal events (`runtime.started`, `runtime.snapshot`, `time_machine_status`) are **filtered out** — `onHostEmit` only receives game-authored events.

```ts
onHostEmit: (name, payload) => {
  switch (name) {
    case "score_updated":
      updateScoreUI((payload as any).score);
      break;
    case "level_complete":
      unlockAchievement((payload as any).level);
      break;
    case "player_died":
      analytics.track("death", payload);
      break;
  }
}
```

### `onAssetProgress(progress: number)`

Fired repeatedly during `runtime.start()` as assets load. Value is `0`–`100`.

```ts
onAssetProgress: (pct) => {
  document.getElementById("progress")!.style.width = pct + "%";
}
```
