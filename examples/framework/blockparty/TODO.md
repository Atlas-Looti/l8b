# Block Party — TODO

## Levels Mode (Blocked)
Add a level progression system alongside the existing Classic mode:
- Level 1: Empty board, target 50 points
- Level 2+: Pre-placed random blocks, escalating score targets (30 + level * 20)
- Level complete celebration between levels
- Menu shows Classic + Levels buttons
- Track highest level reached

**Blocker:** The LootiScript compiler throws "Invalid string length" when main.loot exceeds ~500 lines. The level logic needs to be split into a separate `levels.loot` file. The compiler currently handles multi-file projects (see board.loot, pieces.loot, audio.loot, input.loot) so this should work — just needs the state variables and functions organized across files.

### What was planned:
- `gameMode` variable: "classic" or "levels"
- `currentLevel`, `levelTarget`, `levelScore` state
- `setupLevel(n)` function: init board + pre-place `min(n*3, 30)` random blocks
- `drawLevelHUD()`: progress bar showing score/target
- `drawLevelComplete()`: celebration screen between levels
- Level check in update loop: if score >= levelTarget → state = "levelcomplete"
- Menu with two buttons: CLASSIC (top) and LEVELS (bottom)
