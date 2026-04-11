# Graph Report - .  (2026-04-11)

## Corpus Check
- 175 files · ~70,044 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1037 nodes · 1707 edges · 56 communities detected
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 18 edges (avg confidence: 0.77)
- Token cost: 0 input · 0 output

## God Nodes (most connected - your core abstractions)
1. `Routine` - 78 edges
2. `Image` - 50 edges
3. `Parser` - 44 edges
4. `RuntimeControllerImpl` - 40 edges
5. `Compiler` - 36 edges
6. `Palette` - 31 edges
7. `BaseScreen` - 31 edges
8. `AudioCore` - 19 edges
9. `TimeMachine` - 19 edges
10. `Transpiler` - 19 edges

## Surprising Connections (you probably didn't know these)
- `Palette` --semantically_similar_to--> `StorageService`  [INFERRED] [semantically similar]
  packages\core\palette\src\core\palette.ts → packages/enggine/io/src/storage/index.ts
- `TileMap` --semantically_similar_to--> `Sound`  [INFERRED] [semantically similar]
  packages/core/map/src/core/tile-map.ts → packages\core\audio\src\devices\sound.ts
- `Palette` --shares_data_with--> `@al8b/image`  [INFERRED]
  packages\core\palette\src\core\palette.ts → packages/core/image/README.md
- `Palette` --references--> `@al8b/palette`  [EXTRACTED]
  packages\core\palette\src\core\palette.ts → packages/core/palette/README.md
- `StorageService` --conceptually_related_to--> `@al8b/runtime`  [INFERRED]
  packages/enggine/io/src/storage/index.ts → CONTRIBUTING.md

## Communities

### Community 0 - "LootiScript Language Core"
Cohesion: 0.02
Nodes (47): argToNative(), routineAsFunction(), ICMetrics, LootiScriptError, LootiSyntaxError, dispatchBinaryOp(), operatorAdd(), operatorBand() (+39 more)

### Community 1 - "Enggine Runtime"
Cohesion: 0.03
Nodes (13): System, RuntimeAssetsRegistry, DebugLogger, getEnabledInputChannels(), shallowEqual(), formatRuntimeError(), reportError(), reportWarnings() (+5 more)

### Community 2 - "Routine Execution Engine"
Cohesion: 0.05
Nodes (1): Routine

### Community 3 - "Image Rendering Primitives"
Cohesion: 0.05
Nodes (14): closeDrawOp(), drawLine(), drawRect(), drawRound(), drawRoundRect(), fillRect(), fillRound(), fillRoundRect() (+6 more)

### Community 4 - "Image Canvas API"
Cohesion: 0.09
Nodes (2): Image, splitColorArg()

### Community 5 - "Runtime Controller"
Cohesion: 0.09
Nodes (9): asRecord(), cloneSnapshot(), createRequestId(), deepCloneValue(), isPromiseLike(), isRecord(), isRuntimeSnapshot(), RuntimeControllerImpl (+1 more)

### Community 6 - "LootiScript Compiler"
Cohesion: 0.1
Nodes (3): Compiler, LocalLayer, Locals

### Community 7 - "LootiScript Parser"
Cohesion: 0.17
Nodes (2): formatSourceContext(), Parser

### Community 8 - "Tile Map & Sprites"
Cohesion: 0.07
Nodes (19): @al8b/image, @al8b/map, @al8b/sprites, BaseScreen, ZBuffer, PrimitiveScreen, drawTile(), ensureCanvas() (+11 more)

### Community 9 - "Base Screen"
Cohesion: 0.08
Nodes (1): BaseScreen

### Community 10 - "Controller Tests"
Cohesion: 0.07
Nodes (0): 

### Community 11 - "Color Palette"
Cohesion: 0.11
Nodes (9): @al8b/palette, darken, findClosest, gradient, hexToRGB, lighten, mix, Palette (+1 more)

### Community 12 - "Audio Engine"
Cohesion: 0.1
Nodes (2): AudioCore, Beeper

### Community 13 - "Screen Drawing"
Cohesion: 0.11
Nodes (2): PrimitiveScreen, SpriteScreen

### Community 14 - "Transpiler"
Cohesion: 0.17
Nodes (3): isDevelopmentMode(), Stack, Transpiler

### Community 15 - "Text & Triangle Rendering"
Cohesion: 0.11
Nodes (7): TextScreen, TriangleScreen, drawTexturedTriangle(), edgeFn(), getMapPixel(), getSpritePixel(), ZBuffer

### Community 16 - "Core Packages"
Cohesion: 0.12
Nodes (18): @al8b/audio, @al8b/input, @al8b/runtime, @al8b/time, AudioCore, PlayingHandle, WakeUpItem, GamepadInput (+10 more)

### Community 17 - "Time Machine"
Cohesion: 0.26
Nodes (1): TimeMachine

### Community 18 - "Processor"
Cohesion: 0.16
Nodes (1): Processor

### Community 19 - "Runner"
Cohesion: 0.16
Nodes (2): Runner, Thread

### Community 20 - "LootiScript Stdlib"
Cohesion: 0.13
Nodes (16): LootiScript Compilation Pipeline, Compiler, LootiScript Dev Server, LootiScript Framework CLI, LootiScript Language, LootiScript Language Server, Parser, Processor (+8 more)

### Community 21 - "Asset Loader"
Cohesion: 0.25
Nodes (1): AssetLoader

### Community 22 - "L8BVM"
Cohesion: 0.19
Nodes (4): extractErrorInfo(), isCompiledModuleArtifact(), L8BVM, normalizeSerializedRoutine()

### Community 23 - "Runtime Bridge & VM"
Cohesion: 0.2
Nodes (12): StorageService, createRealtimeBridge, RealtimeBridge, createRuntime, host Globals API, memory Globals API, RuntimeBridge, RuntimeController (+4 more)

### Community 24 - "Mouse Input"
Cohesion: 0.24
Nodes (1): MouseInput

### Community 25 - "Storage Index"
Cohesion: 0.27
Nodes (1): StorageService

### Community 26 - "Gamepad Input"
Cohesion: 0.36
Nodes (3): createState(), ensureState(), GamepadInput

### Community 27 - "Touch Input"
Cohesion: 0.29
Nodes (1): TouchInput

### Community 28 - "Sprite"
Cohesion: 0.24
Nodes (3): resolveFrameCount(), Sprite, UpdateSprite()

### Community 29 - "State Recorder"
Cohesion: 0.22
Nodes (1): StateRecorder

### Community 30 - "Game Loop"
Cohesion: 0.24
Nodes (1): GameLoop

### Community 31 - "State Player"
Cohesion: 0.25
Nodes (1): StatePlayer

### Community 32 - "Keyboard Input"
Cohesion: 0.39
Nodes (1): KeyboardInput

### Community 33 - "Random"
Cohesion: 0.36
Nodes (1): Random

### Community 34 - "VM Profiler"
Cohesion: 0.33
Nodes (1): VMProfiler

### Community 35 - "Music"
Cohesion: 0.4
Nodes (1): Music

### Community 36 - "Input Manager"
Cohesion: 0.4
Nodes (1): InputManager

### Community 37 - "Game Hub UI"
Cohesion: 0.5
Nodes (4): Bird Game Tile, Block Party Game Tile, Game Tiles Component, Game Hub Selection Screen

### Community 38 - "Build Config"
Cohesion: 0.67
Nodes (0): 

### Community 39 - "Deep Clone"
Cohesion: 1.0
Nodes (0): 

### Community 40 - "Shallow Equal"
Cohesion: 1.0
Nodes (0): 

### Community 41 - "List Utils"
Cohesion: 1.0
Nodes (0): 

### Community 42 - "String Utils"
Cohesion: 1.0
Nodes (0): 

### Community 43 - "Math Utils"
Cohesion: 1.0
Nodes (0): 

### Community 44 - "Test Config"
Cohesion: 1.0
Nodes (0): 

### Community 45 - "State Types"
Cohesion: 1.0
Nodes (0): 

### Community 46 - "JSON Utils"
Cohesion: 1.0
Nodes (0): 

### Community 47 - "Player Package"
Cohesion: 1.0
Nodes (1): @al8b/player

### Community 48 - "Graph Report"
Cohesion: 1.0
Nodes (1): Graph Report

### Community 49 - "Runtime Snapshot"
Cohesion: 1.0
Nodes (1): RuntimeSnapshot

### Community 50 - "Runtime Session Snapshot"
Cohesion: 1.0
Nodes (1): RuntimeSessionSnapshot

### Community 51 - "Transpiler"
Cohesion: 1.0
Nodes (1): Transpiler

### Community 52 - "OPCODES"
Cohesion: 1.0
Nodes (1): OPCODES

### Community 53 - "Parser Reader"
Cohesion: 1.0
Nodes (1): Parser (from AGENTS)

### Community 54 - "Compiler Reader"
Cohesion: 1.0
Nodes (1): Compiler (from AGENTS)

### Community 55 - "Error Test Fixture"
Cohesion: 1.0
Nodes (1): error-tests Fixture Package

## Knowledge Gaps
- **45 isolated node(s):** `ICMetrics`, `Transpiler`, `Compiler`, `PlayingHandle`, `WakeUpItem` (+40 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Deep Clone`** (2 nodes): `deep-clone.ts`, `deepClone()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Shallow Equal`** (2 nodes): `shallow-equal.ts`, `shallowEqual()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `List Utils`** (2 nodes): `list.ts`, `list.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `String Utils`** (2 nodes): `string.ts`, `string.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Math Utils`** (2 nodes): `math.ts`, `math.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Test Config`** (1 nodes): `vitest.config.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `State Types`** (1 nodes): `state.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `JSON Utils`** (1 nodes): `json.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Player Package`** (1 nodes): `@al8b/player`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Graph Report`** (1 nodes): `Graph Report`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Runtime Snapshot`** (1 nodes): `RuntimeSnapshot`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Runtime Session Snapshot`** (1 nodes): `RuntimeSessionSnapshot`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Transpiler`** (1 nodes): `Transpiler`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `OPCODES`** (1 nodes): `OPCODES`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Parser Reader`** (1 nodes): `Parser (from AGENTS)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Compiler Reader`** (1 nodes): `Compiler (from AGENTS)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Error Test Fixture`** (1 nodes): `error-tests Fixture Package`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.