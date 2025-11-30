# Audio

L8B allows you to play sound effects and music.

## Methods

### `Audio.playSound(name, volume?, pitch?, pan?, loop?)`

Plays a sound effect (SFX).

**Parameters:**

- `name`: Sound file name (relative to `assets/` directory)
- `volume`: 0.0 to 1.0 (default: 1.0)
- `pitch`: 0.5 to 2.0 (default: 1.0)
- `pan`: Stereo pan, -1.0 (left) to 1.0 (right) (default: 0)
- `loop`: `true` to loop continuously (default: `false`)

**Returns:** Sound control object with methods:

- `stop()` - Stop the sound
- `setVolume(v)` - Set volume (0.0-1.0)
- `setPitch(p)` - Set pitch (0.5-2.0)
- `setPan(p)` - Set pan (-1.0 to 1.0)
- `getDuration()` - Get sound duration in seconds
- `finished` - Boolean indicating if sound has finished

```lua
sfx = Audio.playSound("explosion")
sfx.setVolume(0.5)
sfx.stop()
```

### `Audio.playMusic(name, volume?, loop?)`

Plays background music (BGM).

**Parameters:**

- `name`: Music file name (relative to `assets/` directory)
- `volume`: 0.0 to 1.0 (default: 1.0)
- `loop`: `true` to loop (default: `false`)

**Returns:** Music control object with methods:

- `play()` - Resume playback
- `stop()` - Stop the music
- `setVolume(v)` - Set volume (0.0-1.0)
- `getPosition()` - Get current playback position in seconds
- `getDuration()` - Get total duration in seconds
- `setPosition(pos)` - Seek to position in seconds

```lua
bgm = Audio.playMusic("theme", 0.8, true)
bgm.stop()
bgm.play()  // Resume
```

### `Audio.beep(pattern)`

Plays synthesized beep sequences.

```lua
Audio.beep("C4 E4 G4")  // Play C Major chord
Audio.beep("tempo 120 C4 D4 E4 F4")
```

**Note Format:**

- Note names: `C`, `D`, `E`, `F`, `G`, `A`, `B`
- Octaves: `0-8` (e.g., `C4`, `A3`)
- Sharps: `#` (e.g., `C#4`)
- Duration: Optional number after note (in seconds)
- Commands: `tempo`, `volume`, `duration`, `span`, `square`, `sine`, `saw`, `noise`, `loop`

### `Audio.cancelBeeps()`

Stops all currently playing beeps and sounds.

For complete Audio API documentation, see [@l8b/audio README](https://github.com/Atlas-Looti/l8b2/blob/main/packages/core/audio/README.md).
