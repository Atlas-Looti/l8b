# Audio API

Audio is played from LootiScript using the `audio` and `music` globals.

## Sound Effects (`audio.*`)

```lua
// Play a sound (loaded from resources.sounds)
audio.play(sounds["jump"])
audio.play(sounds["jump"], 0.8)              // volume 0.0–1.0 (default 1)
audio.play(sounds["jump"], 0.8, 1.2)         // volume, pitch (1.0 = normal)
audio.play(sounds["jump"], 0.8, 1.0, -0.5)  // volume, pitch, pan (-1=left, 1=right)
audio.play(sounds["jump"], 1, 1, 0, true)    // loop

// The play() call returns a control handle
local sfx = audio.play(sounds["shoot"])
sfx.stop()
sfx.setVolume(0.5)
sfx.setPitch(0.9)
sfx.setPan(0.5)
local dur = sfx.getDuration()  // length in seconds
local done = sfx.finished      // true when playback ended

// Stop all sounds
audio.stopAll()

// Master volume
audio.setVolume(0.8)           // 0.0–1.0
local v = audio.getVolume()
```

## Music (`music.*`)

Music is streamed using HTML5 Audio, suitable for longer background tracks.

```lua
// Play background music (loaded from resources.music)
music.play(music["theme"])
music.play(music["theme"], 0.7)       // with volume
music.play(music["theme"], 0.7, true) // loop (default true)

// Music control handle
local track = music.play(music["boss"])
track.stop()
track.setVolume(0.5)
track.play()                 // resume
local pos = track.getPosition()    // current position in seconds
local dur = track.getDuration()
track.setPosition(30)        // seek to 30 seconds
```

## Beeper (Chiptune Notation)

Generate procedural chiptune sounds using text notation:

```lua
audio.beep("C4 D4 E4 F4 G4")            // scale
audio.beep("C4:8 . E4:4 G4:2")          // with durations (:8=eighth, :4=quarter, :2=half)
audio.beep("t120 C4 D4 E4")             // tempo in BPM
audio.beep("v0.5 C4 D4")               // volume (0-1)
audio.beep("square C4 E4 G4")          // waveform: square, sine, saw, noise
audio.beep("C4 [E4 G4]")               // chord (play together)
audio.beep("loop2 C4 D4 E4")           // repeat 2 times

audio.cancelBeeps()                     // stop all beeper sounds
```

## Loading Audio Assets

Sounds are loaded by listing them in the `resources` manifest passed to `createRuntime`:

```ts
createRuntime({
  url: "/assets",
  resources: {
    sounds: [
      { file: "jump.wav" },
      { file: "shoot.ogg" },
      { file: "explosion.mp3" },
    ],
    music: [
      { file: "theme.mp3" },
      { file: "boss.ogg" },
    ],
  },
});
```

Then in LootiScript, access them by file name (without extension):

```lua
audio.play(sounds["jump"])
music.play(music["theme"])
```

## Procedural Audio (MicroSound)

For fully programmatic audio synthesis:

```lua
// Create a raw audio buffer
local snd = Sound.createSoundClass()(1, 44100)   // 1 channel, 44100 samples
// Write samples (value -1.0 to 1.0)
for i = 0, 44099 do
    snd.write(0, i, math.sin(i * 0.1) * 0.5)
end
audio.play(snd)
```

## Common Patterns

### Play sound only if loaded

```lua
if sounds["hit"] then
    audio.play(sounds["hit"])
end
```

### Randomize pitch for variation

```lua
play_footstep = function()
    local pitch = 0.9 + math.random() * 0.2  // 0.9–1.1
    audio.play(sounds["step"], 0.6, pitch)
end
```

### Fade in music on scene start

```lua
local bg_music
local music_volume = object v = 0 end

init = function()
    bg_music = music.play(music["level1"], 0, true)
    tween.create(object
        from = 0  to = 0.8  duration = 2000
        easing = "easeOutSine"
        onUpdate = function(v)
            music_volume.v = v
            bg_music.setVolume(v)
        end
    end)
end
```

### Crossfade between tracks

```lua
local current_track = nil

play_track = function(name, duration)
    if current_track then
        local old = current_track
        tween.create(object
            from = 0.8  to = 0  duration = duration or 1000
            easing = "linear"
            onUpdate = function(v) old.setVolume(v) end
            onComplete = function() old.stop() end
        end)
    end
    current_track = music.play(music[name], 0, true)
    tween.create(object
        from = 0  to = 0.8  duration = duration or 1000
        easing = "linear"
        onUpdate = function(v) current_track.setVolume(v) end
    end)
end
```
