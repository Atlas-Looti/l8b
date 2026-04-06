---
"@al8b/audio": patch
"@al8b/scene": patch
"@al8b/runtime": minor
"@al8b/io": patch
"@al8b/input": patch
"@al8b/screen": patch
"@al8b/sprites": patch
"@al8b/map": patch
"@al8b/palette": patch
"@al8b/time": patch
"@al8b/player": patch
"@al8b/vm": patch
"@al8b/stdlib": patch
"@al8b/lootiscript": patch
"@al8b/cli": patch
"@al8b/language-server": patch
"@al8b/diagnostics": patch
---

Fix critical bugs and consolidate utilities

- Fix Music.stop() not removing itself from playing list
- Expose scene lifecycle errors instead of silently swallowing them
- Strengthen isRuntimeSnapshot validation
- Remove dead API stubs and aliases
- Consolidate deep-clone and shallow-equal utilities
- Fix TypeScript compatibility with vscode-jsonrpc
- Update docs and examples (removed runtime-react dependency)
