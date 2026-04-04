# @al8b/framework-server

Development server for L8B with HTTP serving, live source delivery, asset serving, and WebSocket-based HMR.

## Public API

- Re-exports from `server`, `hmr`, `middleware`, and `shortcuts`
- Main server class: `L8BDevServer`
- Helper: `createDevServer`

## Notes

- Watches the source and public trees through `@al8b/framework-watcher`.
- Serves framework HTML and runtime clients without depending on an external dev server.

## Scripts

```bash
bun run build
bun run test
bun run clean
```
