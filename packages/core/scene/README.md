# @al8b/scene

Scene registry, routing, and scene lifecycle management for L8B. This package groups the classes that map paths to scenes and coordinate navigation state inside the runtime.

## Public API

- `SceneManager`
- `SceneRegistry`
- `Router`
- `RouteManager`
- Types: `RouteDefinition`, `RouterState`, `SceneConfig`, `SceneData`, `SceneDefinition`, `SceneEvents`, `SceneInterface`, `SceneManagerOptions`, `SceneStatus`, `SceneTransitionOptions`

## Notes

- Used by `@al8b/runtime` to power `scene`, `route`, and `router`.
- Routing concerns live here rather than being mixed into VM or runtime orchestration code.

## Scripts

```bash
bun run build
bun run test
bun run clean
```
