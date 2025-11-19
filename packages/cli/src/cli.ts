#!/usr/bin/env node
import cac from 'cac';
import pc from 'picocolors';
import path from 'path';
import { dev } from './core';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const packageJson = JSON.parse(
    readFileSync(path.join(__dirname, '../package.json'), 'utf-8')
);
const version = packageJson.version;

const cli = cac('l8b');

cli
    .command('dev [root]', 'Start dev server')
    .option('--port <port>', 'Port to use', { 
        default: 3000
    })
    .option('--host [host]', 'Expose to network (use 0.0.0.0 to expose, or specify hostname)', { 
        default: false 
    })
    .action(async (root, options) => {
        try {
            const projectPath = root ? path.resolve(root) : process.cwd();
            
            console.log(pc.cyan(`\n  🎮 L8B CLI v${version}\n`));
            console.log(pc.gray(`  Project: ${projectPath}\n`));
            
            // Parse port as number
            const port = typeof options.port === 'string' ? parseInt(options.port, 10) : options.port;
            
            await dev(projectPath, {
                port: port || 3000,
                host: options.host,
            });
        } catch (e) {
            console.error(pc.red('\n✗ Error starting server:\n'));
            console.error(e);
            process.exit(1);
        }
    });

cli.help();
cli.version(version);

cli.parse();
