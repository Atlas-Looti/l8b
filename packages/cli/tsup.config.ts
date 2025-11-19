import { defineConfig } from 'tsup';
import { copyFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';

export default defineConfig({
    entry: ['src/index.ts', 'src/cli.ts'],
    format: ['esm'],
    dts: true,
    clean: true,
    shims: true,
    onSuccess: async () => {
        // Copy assets (fonts) to dist after build
        const distAssetsDir = join(process.cwd(), 'dist', 'assets', 'fonts');
        mkdirSync(distAssetsDir, { recursive: true });
        copyFileSync(
            join(process.cwd(), 'src', 'assets', 'fonts', 'BitCell.ttf'),
            join(distAssetsDir, 'BitCell.ttf')
        );
    },
});
