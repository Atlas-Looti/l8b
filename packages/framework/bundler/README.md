# @al8b/framework-bundler

Production build system for L8B games. It compiles LootiScript sources, runs the framework plugin pipeline, emits runtime and HTML assets, and writes the final build output.

## Public API

- `L8BBundler`
- `createBundler`
- `build`
- Types: `BundleResult`, `L8BBuildOptions`, `L8BPlugin`
- Plugin helpers: `PluginContainer`, `createPluginContainer`
- Built-in plugins: `runtimePlugin`, `assetsPlugin`, `htmlPlugin`, `minifyPlugin`

## Notes

- Depends on `@al8b/compiler`, `@al8b/framework-config`, `@al8b/framework-shared`, and `@al8b/runtime`.
- The package is plugin-driven, but the default pipeline is the production standard for this repo.

## Scripts

```bash
bun run build
bun run test
bun run clean
```
