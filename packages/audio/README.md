# @l8b/audio

Audio system for game development with support for sound effects, music, and procedural beep generation.

## Features

- **Sound Effects**: Play audio buffers with volume, pitch, pan, and loop control
- **Music Streaming**: HTML5 Audio-based music playback with position control
- **Procedural Beeps**: Generate sounds from text notation (e.g., "square tempo 120 C4 D4 E4")
- **Web Audio API**: Full Web Audio API integration with automatic context management
- **Mobile Support**: Automatic audio activation on user interaction

## Installation

```bash
bun add @l8b/audio
```

## Usage

### Basic Setup

```typescript
import { AudioCore, Sound, Music } from "@l8b/audio";

// Create audio core with runtime context
const runtime = {
  sounds: {},
  music: {},
};

const audio = new AudioCore(runtime);

// Get audio interface
const audioInterface = audio.getInterface();
```

### Playing Sound Effects

```typescript
import { Sound } from "@l8b/audio";

// Load sound from URL
const sound = new Sound(audio, "/sounds/jump.wav");

// Play with default settings
sound.play();

// Play with custom parameters
const playback = sound.play(
  0.8, // volume (0-1)
  1.2, // pitch (playback rate)
  0.5, // pan (-1 to 1, left to right)
  false, // loop
);

// Control playback
playback.setVolume(0.5);
playback.setPitch(1.0);
playback.setPan(-0.5);
playback.stop();

// Check if finished
if (playback.finished) {
  console.log("Sound finished playing");
}
```

### Playing Music

```typescript
import { Music } from "@l8b/audio";

// Load music from URL
const music = new Music(audio, "/music/theme.mp3");

// Play music
const playback = music.play(
  0.7, // volume (0-1)
  true, // loop
);

// Control playback
playback.setVolume(0.5);
playback.stop();

// Position control
playback.setPosition(30); // Jump to 30 seconds
const pos = playback.getPosition();
const duration = playback.getDuration();
```

### Procedural Beeps

```typescript
// Simple beep
audio.beep("C4 E4 G4");

// With tempo
audio.beep("tempo 120 C4 D4 E4 F4 G4");

// Different waveforms
audio.beep("square C4 D4 E4");
audio.beep("sine A4 B4 C5");
audio.beep("saw G3 A3 B3");
audio.beep("noise - - - -"); // Noise/percussion

// Volume and duration
audio.beep("volume 50 duration 200 C4 E4 G4");

// Loops
audio.beep("loop 4 C4 E4 G4 end");

// Slides
audio.beep("C4 to C5"); // Slide from C4 to C5

// Complex sequence
audio.beep("square tempo 140 volume 80 loop 2 C4 E4 G4 end C5");

// Cancel all beeps
audio.cancelBeeps();
```

### Procedural Sound Generation

```typescript
// Create Sound class for procedural generation
const SoundClass = Sound.createSoundClass(audio);

// Create a 1-second stereo sound at 44100 Hz
const procSound = new SoundClass(2, 44100, 44100);

// Write samples (generate waveform)
for (let i = 0; i < procSound.length; i++) {
  const t = i / procSound.sampleRate;
  const freq = 440; // A4
  const sample = Math.sin(2 * Math.PI * freq * t) * 0.5;

  procSound.write(0, i, sample); // Left channel
  procSound.write(1, i, sample); // Right channel
}

// Play the generated sound
procSound.play();

// Read samples
const leftSample = procSound.read(0, 1000);
const rightSample = procSound.read(1, 1000);
```

### Runtime Integration

```typescript
// Setup runtime with sounds and music
const runtime = {
  sounds: {
    jump: new Sound(audio, "/sounds/jump.wav"),
    coin: new Sound(audio, "/sounds/coin.wav"),
    hit: new Sound(audio, "/sounds/hit.wav"),
  },
  music: {
    theme: new Music(audio, "/music/theme.mp3"),
    gameover: new Music(audio, "/music/gameover.mp3"),
  },
};

const audio = new AudioCore(runtime);

// Play by name
audio.playSound("jump", 1.0, 1.0, 0, false);
audio.playMusic("theme", 0.7, true);
```

## API Reference

### AudioCore

#### Constructor

```typescript
new AudioCore(runtime: any)
```

#### Methods

- `isStarted(): boolean` - Check if audio context is running
- `getInterface(): AudioInterface` - Get audio interface for game code
- `playSound(sound: string | Sound, volume?, pitch?, pan?, loop?): any` - Play sound effect
- `playMusic(music: string | Music, volume?, loop?): any` - Play music
- `beep(sequence: string): void` - Play beep sequence
- `cancelBeeps(): void` - Cancel all playing beeps
- `getContext(): AudioContext` - Get Web Audio context
- `stopAll(): void` - Stop all playing audio

### Sound

#### Constructor

```typescript
new Sound(audio: AudioCore, url: string | AudioBuffer)
```

#### Properties

- `ready: number` - Load status (0 = loading, 1 = ready)
- `buffer: AudioBuffer` - Audio buffer
- `name: string` - Sound name
- `url: string` - Sound URL

#### Methods

- `play(volume?, pitch?, pan?, loop?): PlaybackControl` - Play sound

#### PlaybackControl

```typescript
interface PlaybackControl {
  stop(): void;
  setVolume(v: number): void;
  setPitch(p: number): void;
  setPan(p: number): void;
  getDuration(): number;
  finished: boolean;
}
```

#### Static Methods

- `Sound.createSoundClass(audio: AudioCore): SoundClass` - Create procedural sound class

### SoundClass (Procedural)

#### Constructor

```typescript
new SoundClass(channels: number, length: number, sampleRate?: number)
```

#### Properties

- `channels: number` - Number of channels (1 or 2)
- `length: number` - Length in samples
- `sampleRate: number` - Sample rate (Hz)

#### Methods

- `play(volume?, pitch?, pan?, loop?): PlaybackControl` - Play sound
- `write(channel: number, position: number, value: number): void` - Write sample
- `read(channel: number, position: number): number` - Read sample

### Music

#### Constructor

```typescript
new Music(audio: AudioCore, url: string)
```

#### Properties

- `ready: number` - Load status (always 1 for HTML5 Audio)
- `name: string` - Music name
- `url: string` - Music URL
- `playing: boolean` - Is currently playing

#### Methods

- `play(volume?, loop?): MusicControl` - Play music
- `stop(): void` - Stop music

#### MusicControl

```typescript
interface MusicControl {
  play(): void;
  stop(): void;
  setVolume(v: number): void;
  getPosition(): number;
  getDuration(): number;
  setPosition(pos: number): void;
}
```

### Beep Notation

The beep system supports a text-based music notation:

#### Notes

- `C`, `D`, `E`, `F`, `G`, `A`, `B` - Note names
- `C#`, `Db`, `D#`, `Eb`, etc. - Sharps and flats
- `C4`, `D4`, `E4`, etc. - Notes with octave
- `-` - Rest/silence

#### Commands

- `tempo <bpm>` - Set tempo (beats per minute)
- `duration <ms>` - Set note duration in milliseconds
- `volume <0-100>` - Set volume percentage
- `span <0-100>` - Set note span (sustain) percentage
- `loop <count>` ... `end` - Loop section
- `<note> to <note>` - Slide between notes

#### Waveforms

- `square` - Square wave (default)
- `sine` - Sine wave
- `saw` - Sawtooth wave
- `noise` - White noise

#### Examples

```typescript
// Simple melody
audio.beep("C4 E4 G4 C5");

// With tempo and waveform
audio.beep("sine tempo 120 C4 D4 E4 F4");

// Looped pattern
audio.beep("loop 4 C4 E4 G4 end");

// Complex sequence
audio.beep(
  "square tempo 140 volume 80 span 90 loop 2 C4 E4 G4 C5 end G4 to C4",
);
```

## Browser Compatibility

The audio system handles browser autoplay policies automatically:

- Audio context starts on first user interaction (click, touch, key press)
- Queued sounds/music will play after activation
- Works on desktop and mobile browsers

### Web Audio API Support

This package uses the [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API) which is well supported across modern browsers (Baseline: Widely available since April 2021).

**Note on Implementation**: Currently uses `ScriptProcessorNode` for beep generation, which is [deprecated](https://developer.mozilla.org/en-US/docs/Web/API/ScriptProcessorNode) but still widely supported. Future versions will migrate to `AudioWorklet` for better performance and lower latency.

## Known Limitations

- **Beep Generation**: Uses deprecated `ScriptProcessorNode` API (will be migrated to `AudioWorklet` in future)
- **Autoplay Policy**: Requires user interaction before audio can play (browser security feature)
- **Mobile Safari**: May require additional user interaction for audio context activation

## License

MIT
