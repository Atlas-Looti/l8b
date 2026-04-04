# @al8b/audio

**LootiScript API Binding** - Audio playback for sound effects, music, and synthesized beeps.

> **Note**: This package is used as an API binding for LootiScript in the l8b engine.

## API Reference

### Audio.playSound()

Play a sound effect with optional parameters.

**Signature:**

```lua
Audio.playSound(sound: string, volume?: number, pitch?: number, pan?: number, loop?: boolean): number
```

**Parameters:**

- `sound` (string) - Sound file name (relative to `assets/` directory)
- `volume` (number, optional) - Volume level 0.0-1.0, default: 1.0
- `pitch` (number, optional) - Pitch 0.5-2.0, default: 1.0
- `pan` (number, optional) - Stereo pan -1.0 (left) to 1.0 (right), default: 0
- `loop` (boolean, optional) - Loop the sound, default: false

**Returns:** Sound ID (number) - Control object with methods:

- `stop()` - Stop the sound
- `setVolume(v: number)` - Set volume (0.0-1.0)
- `setPitch(p: number)` - Set pitch (0.5-2.0)
- `setPan(p: number)` - Set pan (-1.0 to 1.0)
- `getDuration()` - Get sound duration in seconds
- `finished` (boolean) - Whether sound has finished playing

**Examples:**

```lua
// Basic usage
Audio.playSound("jump.wav")

// With volume (0.0 to 1.0)
Audio.playSound("explosion.wav", 0.8)

// With volume and pitch (0.5 to 2.0)
Audio.playSound("coin.wav", 1.0, 1.5)

// With volume, pitch, and pan (-1.0 to 1.0)
Audio.playSound("footstep.wav", 0.7, 1.0, -0.5)

// With all parameters including loop
local soundId = Audio.playSound("engine.wav", 0.9, 1.0, 0, true)

// Control playback
local sound = Audio.playSound("laser.wav")
sound.setVolume(0.5)
sound.setPitch(1.2)
sound.stop()
```

**Sound Control Example:**

```lua
local engineSound = nil

function startEngine()
  engineSound = Audio.playSound("engine.wav", 0.8, 1.0, 0, true)
end

function stopEngine()
  if engineSound then
    engineSound.stop()
    engineSound = nil
  end
end

function update()
  if keyboard.press.SPACE == 1 then
    if engineSound then
      stopEngine()
    else
      startEngine()
    end
  end
end
```

---

### Audio.playMusic()

Play background music with optional looping.

**Signature:**

```lua
Audio.playMusic(music: string, volume?: number, loop?: boolean): number
```

**Parameters:**

- `music` (string) - Music file name (relative to `assets/` directory)
- `volume` (number, optional) - Volume level 0.0-1.0, default: 1.0
- `loop` (boolean, optional) - Loop the music, default: false

**Returns:** Music ID (number) - Control object with methods:

- `play()` - Resume playback
- `stop()` - Stop the music
- `setVolume(v: number)` - Set volume (0.0-1.0)
- `getPosition()` - Get current playback position in seconds
- `getDuration()` - Get total duration in seconds
- `setPosition(pos: number)` - Seek to position in seconds

**Examples:**

```lua
// Basic usage
Audio.playMusic("theme.mp3")

// With volume
Audio.playMusic("battle.mp3", 0.6)

// With volume and loop
local musicId = Audio.playMusic("menu.mp3", 0.8, true)

// Control playback
local music = Audio.playMusic("credits.mp3", 1.0, false)
music.setVolume(0.5)
music.setPosition(30)  // Jump to 30 seconds
music.stop()
```

**Music Control Example:**

```lua
local currentMusic = nil

function playMenuMusic()
  if currentMusic then
    currentMusic.stop()
  end
  currentMusic = Audio.playMusic("menu.mp3", 0.7, true)
end

function playGameMusic()
  if currentMusic then
    currentMusic.stop()
  end
  currentMusic = Audio.playMusic("game.mp3", 0.6, true)
end

function fadeOutMusic()
  if currentMusic then
    local volume = 0.7
    local fadeInterval = setInterval(function()
      volume = volume - 0.05
      if volume <= 0 then
        currentMusic.stop()
        currentMusic = nil
        clearInterval(fadeInterval)
      else
        currentMusic.setVolume(volume)
      end
    end, 100)
  end
end
```

---

### Audio.beep()

Play synthesized beep sequences.

**Signature:**

```lua
Audio.beep(sequence: string): void
```

**Parameters:**

- `sequence` (string) - Beep sequence string with notes and commands

**Returns:** `void`

**Note Format:**

- Note names: `C`, `D`, `E`, `F`, `G`, `A`, `B`
- Octaves: `0-8` (e.g., `C4`, `A3`)
- Sharps: `#` (e.g., `C#4`, `F#3`)
- Flats: `b` (e.g., `Db4`, `Eb3`)
- Duration: Optional number after note (in seconds)
- Separator: Space or comma
- Commands:
  - `tempo <number>` - Set tempo (BPM)
  - `duration <number>` - Set default duration in seconds
  - `volume <number>` - Set volume (0.0-1.0)
  - `span <number>` - Set span
  - `square`, `sine`, `saw`, `noise` - Set waveform
  - `loop` - Loop the sequence
  - `to <note>` - Jump to note

**Examples:**

```lua
// Single note
Audio.beep("C4")

// Multiple notes
Audio.beep("C4 E4 G4")

// With duration (in seconds)
Audio.beep("A3 0.1, B3 0.1, C4 0.2")

// Complex melody
Audio.beep("C4 0.25, D4 0.25, E4 0.25, F4 0.5")

// With tempo
Audio.beep("tempo 120 C4 D4 E4 F4 G4")

// With waveform
Audio.beep("square C4 E4 G4")
Audio.beep("sine A3 B3 C4")

// Full sequence with commands
Audio.beep("tempo 100 volume 0.8 square C4 0.2 D4 0.2 E4 0.4")

// Loop sequence
Audio.beep("loop C4 E4 G4 C5")
```

**Advanced Beep Examples:**

```lua
// Play a scale
Audio.beep("C4 D4 E4 F4 G4 A4 B4 C5")

// Play a chord
Audio.beep("C4 E4 G4")

// Play with different waveforms
Audio.beep("square C4")  // Square wave
Audio.beep("sine C4")    // Sine wave
Audio.beep("saw C4")     // Sawtooth wave
Audio.beep("noise")      // White noise

// Control tempo and volume
Audio.beep("tempo 60 volume 0.5 C4 D4 E4")
```

---

### Audio.cancelBeeps()

Stop all currently playing beeps and sounds.

**Signature:**

```lua
Audio.cancelBeeps(): void
```

**Parameters:** None

**Returns:** `void`

**Examples:**

```lua
// Stop everything
Audio.cancelBeeps()

// Stop beeps when game pauses
function pauseGame()
  Audio.cancelBeeps()
  paused = true
end
```

---

## Sound File Formats

Supported audio formats:

- `.wav` - Uncompressed audio (best quality, larger file size)
- `.mp3` - Compressed audio (good compatibility)
- `.ogg` - Compressed audio (recommended for web, good compression)

**Recommendations:**

- Use `.ogg` for web games (best compression, good quality)
- Use `.wav` for short sound effects (no compression artifacts)
- Use `.mp3` for music (good balance of quality and file size)

---

## File Paths

All audio paths are relative to the `assets/` directory:

```lua
// Loads from: assets/sounds/jump.wav
Audio.playSound("sounds/jump.wav")

// Loads from: assets/music/theme.mp3
Audio.playMusic("music/theme.mp3")

// Supports subdirectories
Audio.playSound("sfx/player/jump.wav")
Audio.playMusic("bgm/menu.mp3")
```

---

## Volume Control

Volume values range from 0.0 (silent) to 1.0 (full volume):

```lua
Audio.playSound("quiet.wav", 0.3)   // 30% volume
Audio.playSound("normal.wav", 0.7)  // 70% volume
Audio.playSound("loud.wav", 1.0)    // 100% volume

// Dynamic volume control
local sound = Audio.playSound("ambient.wav", 1.0)
sound.setVolume(0.5)  // Reduce to 50%
```

---

## Pitch Control

Pitch values range from 0.5 (half speed, lower pitch) to 2.0 (double speed, higher pitch):

```lua
Audio.playSound("voice.wav", 1.0, 0.5)  // Lower pitch (slow)
Audio.playSound("voice.wav", 1.0, 1.0)  // Normal pitch
Audio.playSound("voice.wav", 1.0, 2.0)  // Higher pitch (fast)

// Dynamic pitch control
local sound = Audio.playSound("effect.wav", 1.0, 1.0)
sound.setPitch(1.5)  // Increase pitch
```

**Use Cases:**

- Lower pitch (0.5-0.8): Deep voices, slow motion effects
- Normal pitch (1.0): Standard playback
- Higher pitch (1.2-2.0): Fast-forward effects, chipmunk voices

---

## Pan Control

Pan values range from -1.0 (left) to 1.0 (right):

```lua
Audio.playSound("left.wav", 1.0, 1.0, -1.0)   // Left speaker only
Audio.playSound("center.wav", 1.0, 1.0, 0.0)  // Center (both speakers)
Audio.playSound("right.wav", 1.0, 1.0, 1.0)   // Right speaker only

// Dynamic pan control
local sound = Audio.playSound("footstep.wav", 1.0, 1.0, 0.0)
sound.setPan(-0.5)  // Slightly left
```

**Use Cases:**

- Positional audio (left/right based on game object position)
- Stereo effects
- 3D audio simulation

---

## Audio Context and Autoplay Policy

The audio system automatically handles browser autoplay policies:

- Audio context is created lazily on first use
- If the context is suspended (due to autoplay policy), it will automatically resume on user interaction
- No manual intervention needed - the system handles this transparently

**Note:** Some browsers require user interaction before audio can play. The first audio call may be delayed until the user interacts with the page.

---

## Complete Example

```lua
// Game audio manager
local sounds = {}
local music = nil

function init()
  // Pre-load sounds (optional)
  Audio.playSound("jump.wav", 0, 1.0, 0, false)  // Silent preload
end

function playJumpSound()
  Audio.playSound("jump.wav", 0.8, 1.0, 0, false)
end

function playCoinSound()
  Audio.playSound("coin.wav", 0.6, 1.2, 0, false)
end

function playExplosionSound()
  Audio.playSound("explosion.wav", 1.0, 0.9, 0, false)
end

function startBackgroundMusic()
  if music then
    music.stop()
  end
  music = Audio.playMusic("theme.mp3", 0.6, true)
end

function stopBackgroundMusic()
  if music then
    music.stop()
    music = nil
  end
end

function playVictoryBeep()
  Audio.beep("tempo 120 volume 0.8 C4 E4 G4 C5")
end

function update()
  if keyboard.press.SPACE == 1 then
    playJumpSound()
  end
  
  if keyboard.press.ENTER == 1 then
    if music then
      stopBackgroundMusic()
    else
      startBackgroundMusic()
    end
  end
  
  if keyboard.press.B == 1 then
    playVictoryBeep()
  end
end

function cleanup()
  Audio.cancelBeeps()
  if music then
    music.stop()
  end
end
```

---

## Performance Tips

1. **Preload sounds**: Play sounds at volume 0 to preload them
2. **Reuse sound objects**: Store sound control objects for frequently used sounds
3. **Limit concurrent sounds**: Too many simultaneous sounds can cause performance issues
4. **Use appropriate formats**: `.ogg` for web, `.wav` for short effects
5. **Control loop count**: Limit the number of looping sounds

---

## Error Handling

Audio errors are automatically handled:

- Missing files are reported but don't crash the game
- Invalid parameters are clamped to valid ranges
- Browser compatibility issues are handled gracefully
