# L8B Framework

The framework layer turns source files and public assets into a working L8B development or production experience. It covers config loading, source compilation, dev serving with HMR, production bundling, HTML generation, file watching, and shared framework utilities.

## Packages

| Package | Responsibility |
| --- | --- |
| `@al8b/cli` | User-facing CLI entrypoint for `dev`, `build`, `preview`, and `init` |
| `@al8b/compiler` | LootiScript compilation wrappers and incremental compilation |
| `@al8b/framework-config` | Project config loading, validation, and resource discovery |
| `@al8b/framework-server` | Development server and HMR flow |
| `@al8b/framework-bundler` | Production build pipeline and plugin system |
| `@al8b/framework-html` | HTML shell, overlay, and dev client generation |
| `@al8b/framework-watcher` | Debounced file watching for source and asset changes |
| `@al8b/framework-shared` | Shared framework types, constants, logging, hashing, and path helpers |

## Command Surface

```bash
l8b dev [root]
l8b build [root]
l8b preview [root]
l8b init [name]
```

## Notes

- This layer is intentionally custom and does not depend on Vite.
- Most product-facing workflow changes start in this part of the monorepo.
