# Assets & Resources

## Declaring Assets

Pass a `resources` manifest to `createRuntime`. The `url` field sets the base path for all asset files.

```ts
createRuntime({
  url: "/assets",           // base URL — all file paths are relative to this
  resources: {
    images: [
      { file: "player.png" },
      { file: "tileset.png" },
    ],
    sounds: [
      { file: "jump.wav" },
      { file: "explosion.ogg" },
    ],
    music: [
      { file: "theme.mp3" },
      { file: "boss.mp3" },
    ],
    maps: [
      { file: "level1.json" },
      { file: "world.json" },
    ],
    assets: [
      { file: "config.json" },
      { file: "dialogue.json" },
    ],
  },
});
```

## Asset Categories

| Category | LootiScript global | Used with | Format |
|---|---|---|---|
| `images` | `sprites["name"]` | `screen.drawSprite()` | PNG, JPG, GIF |
| `maps` | `maps["name"]` | `screen.drawMap()` | JSON (Tiled) |
| `sounds` | `sounds["name"]` | `audio.play()` | WAV, OGG, MP3 |
| `music` | `music["name"]` | `music.play()` | MP3, OGG |
| `assets` | `assets["name"]` | Parsed if JSON, raw string otherwise | Any |

The key used to access in LootiScript is the **file name without the extension**.

```ts
// Declared as: { file: "player_sheet.png" }
// Access in LootiScript as: sprites["player_sheet"]
```

## Sprite Sheets (Animation Frames)

For animated sprites, specify `fps` in the resource properties:

```ts
resources: {
  images: [
    { file: "player_run.png", properties: { fps: 12, frameWidth: 32, frameHeight: 32 } },
    { file: "explosion.png", properties: { fps: 24, frameWidth: 64, frameHeight: 64 } },
  ],
}
```

Then in LootiScript, the sprite handles frame cycling automatically based on the current time.

## Cache Busting

Use the `version` field to bust the browser cache when assets change:

```ts
{ file: "level1.json", version: "v3" }
// Fetches: /assets/level1.json?v=v3
```

## Accessing Assets in LootiScript

```lua
-- Sprites
screen.drawSprite(sprites["player"], x, y)
screen.drawSprite(sprites["player"], x, y, 32, 32)

-- Tilemaps
screen.drawMap(maps["level1"], 0, 0, 400, 400)

-- Audio
audio.play(sounds["jump"])
music.play(music["theme"])

-- Generic assets (JSON is auto-parsed to a LootiScript table)
local cfg = assets["config"]
print(cfg.difficulty)
print(cfg.max_enemies)
```

## Inline Assets (No URL)

For small games or demos, embed asset data directly in sources — no server needed:

```ts
createRuntime({
  // No url or resources — use inline data in LootiScript
  sources: {
    "main.ls": `
      function init()
          -- Use screen.fillRect for graphics instead of sprites
      end
    `,
  },
});
```

## Asset Loading Progress

Assets load asynchronously before `init()` is called. Track progress via `listener.onAssetProgress`:

```ts
createRuntime({
  resources: { ... },
  listener: {
    onAssetProgress: (pct) => {
      loadingBar.style.width = pct + "%";
    },
    onReady: () => {
      loadingScreen.style.display = "none";
    },
  },
});
```

## Dynamic Asset Replacement (Host Side)

After the runtime is running, you can replace asset collections:

```ts
// runtime.screen / runtime.assets are accessible from host
// For advanced use cases, assets can be swapped at runtime via bridge events
runtime.sendHostEvent({
  type: "runtime.import_snapshot",
  payload: updatedSnapshot,
});
```
