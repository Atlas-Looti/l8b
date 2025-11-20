/**
 * HTML generator for LootiScript projects
 * 
 * Generates production and development HTML files with proper
 * script loading and runtime initialization.
 */

import type { LootiConfig } from '../types/config';
import { getCanvasSize } from '../core/config-loader';
import type { Resources } from '@l8b/runtime';
import type { CompiledModule } from '../compiler';

/**
 * Generate variable name from module name (sanitized for JavaScript)
 * 
 * @param name - Module name (may contain special characters)
 * @returns Sanitized variable name safe for JavaScript identifiers
 */
function sanitizeVarName(name: string): string {
    return name.replace(/[^a-zA-Z0-9]/g, '_');
}

/**
 * Generate HTML file for LootiScript project
 * 
 * @param config - LootiScript configuration
 * @param sources - Map of module names to source file paths (for development)
 * @param resources - Detected resources (images, maps, sounds, music)
 * @param compiledModules - Pre-compiled modules (for production)
 * @returns Complete HTML string
 */
export function generateHTML(
    config: LootiConfig,
    sources: Record<string, string>,
    resources: Resources,
    compiledModules?: CompiledModule[]
): string {
    const { width, height } = getCanvasSize(config);
    
    const canvasId = config.canvas?.id || 'game';
    const isFreeAspect = config.aspect === 'free';
    const baseUrl = config.url || '/';

    // Determine if we're using pre-compiled routines (production) or sources (development)
    const isProduction = compiledModules && compiledModules.length > 0;
    
    let sourceImports = '';
    let sourceMap = '';
    let compiledRoutinesMap = '';
    
    if (isProduction && compiledModules) {
        // Production: Use pre-compiled routines
        // Import compiled routines as JS modules
        const compiledImports = compiledModules
            .map((module) => {
                const varName = sanitizeVarName(module.name);
                return `import ${varName} from '/compiled/${module.name}.js';`;
            })
            .join('\n      ');
        
        sourceImports = compiledImports;
        
        // Create map of compiled routines (with Routine.import())
        // When using default import, the variable is already the default export
        compiledRoutinesMap = compiledModules
            .map((module) => {
                const varName = sanitizeVarName(module.name);
                return `'${module.name}': new Routine(0).import(${varName}.routine)`;
            })
            .join(',\n          ');
    } else {
        // Development: Use source files
        const sourceEntries = Object.entries(sources);
        sourceImports = sourceEntries
            .map(([name, filePath]) => {
                const varName = sanitizeVarName(name);
                return `import ${varName} from '${filePath}?raw';`;
            })
            .join('\n      ');

        sourceMap = sourceEntries
            .map(([name]) => {
                const varName = sanitizeVarName(name);
                return `'${name}': ${varName}`;
            })
            .join(',\n          ');
    }

    // Prepare resources object for Runtime (with null coalescing)
    const resourcesObj = {
        images: resources.images ?? [],
        maps: resources.maps ?? [],
        sounds: resources.sounds ?? [],
        music: resources.music ?? [],
        assets: resources.assets ?? [],
    };

    // Escape config.name for HTML to prevent XSS
    const escapedName = config.name
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');

    return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapedName}</title>
    <style>
      @font-face {
        font-family: "BitCell";
        src: url("/fonts/BitCell.ttf") format("truetype");
        font-display: swap;
      }
      ${/* External fonts (like PressStart2P) should be added manually by developers in public/fonts */ ''}
      :root {
        color-scheme: dark;
      }
      * {
        box-sizing: border-box;
      }
      html,
      body {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
        background: #0d1117;
        font-family: system-ui, sans-serif;
      }
      body {
        display: flex;
        align-items: stretch;
        justify-content: stretch;
      }
      canvas {
        width: 100%;
        height: 100%;
        display: block;
        background: #000;
      }
    </style>
  </head>
  <body>
    <canvas id="${canvasId}"></canvas>
    <script type="module">
      ${isProduction 
        ? `// Production: Use bundled runtime
import { Runtime, Routine } from '/runtime.js';`
        : `// Development: Use Vite-resolved modules
import { Runtime } from '@l8b/runtime';`}
      
      ${sourceImports}

      const canvas = document.getElementById('${canvasId}');
      if (!canvas) throw new Error('Canvas element with id "${canvasId}" not found');

      // Get window size for responsive canvas (if aspect is free)
      const getWindowSize = () => ({
        width: window.innerWidth,
        height: window.innerHeight,
      });

      // Helper to get device pixel ratio
      const getRatio = () => {
        const ctx = canvas.getContext('2d');
        const devicePixelRatio = window.devicePixelRatio || 1;
        const backingStoreRatio = ctx?.webkitBackingStorePixelRatio ||
          ctx?.mozBackingStorePixelRatio ||
          ctx?.msBackingStorePixelRatio ||
          ctx?.oBackingStorePixelRatio ||
          ctx?.backingStorePixelRatio || 1;
        return devicePixelRatio / backingStoreRatio;
      };

      // Initialize canvas size
      const isFreeAspect = ${isFreeAspect};
      let initialSize = isFreeAspect ? getWindowSize() : { width: ${width}, height: ${height} };
      const ratio = getRatio();

      // Set canvas internal size with devicePixelRatio
      canvas.width = initialSize.width * ratio;
      canvas.height = initialSize.height * ratio;

      // Set canvas display size
      canvas.style.width = Math.round(initialSize.width) + 'px';
      canvas.style.height = Math.round(initialSize.height) + 'px';

      const resources = ${JSON.stringify(resourcesObj)};

      const runtimeOptions = {
        canvas: canvas,
        width: canvas.width,
        height: canvas.height,
        url: '${baseUrl}',
        resources: resources,
        listener: {
          log: (message) => {
            console.log('[GAME]', message);
          },
          reportError: (error) => {
            console.error('[GAME ERROR]', error);
          },
          postMessage: (msg) => {
            ${isProduction ? '// Compilation messages are handled during build' : "console.log('[GAME MESSAGE]', msg);"}
          },
        },
      };

      ${isProduction ? `
      // Production: Use pre-compiled routines
      runtimeOptions.compiledRoutines = {
        ${compiledRoutinesMap}
      };
      ` : `
      // Development: Use source files
      runtimeOptions.sources = {
        ${sourceMap}
      };
      `}

      const runtime = new Runtime(runtimeOptions);

      // Handle window resize - make canvas responsive (with debounce)
      let resizeTimeout = null;
      const handleResize = () => {
        if (resizeTimeout) {
          clearTimeout(resizeTimeout);
        }
        
        resizeTimeout = setTimeout(() => {
          if (isFreeAspect) {
            const newSize = getWindowSize();
            const ratio = getRatio();
            
            // Set canvas internal size with devicePixelRatio
            canvas.width = newSize.width * ratio;
            canvas.height = newSize.height * ratio;
            
            // Set canvas display size 
            canvas.style.width = Math.round(newSize.width) + 'px';
            canvas.style.height = Math.round(newSize.height) + 'px';
            
            // Resize the screen in runtime (this will update screen.width and screen.height)
            if (runtime.screen) {
              runtime.screen.resize(canvas.width, canvas.height);
            }
          }
        }, 100); // Debounce 100ms
      };

      const logCanvasSize = () => {
        console.log(
          'Canvas internal size: ' + canvas.width + 'x' + canvas.height + ', display size: ' + canvas.clientWidth + 'x' + canvas.clientHeight
        );
      };

      // Start the game
      console.log('Starting L8B Runtime...');
      try {
        await runtime.start();
        console.log('Runtime started successfully!');
        console.log('Game is running...');
        logCanvasSize();
      } catch (err) {
        console.error(err);
      }

      // Make runtime accessible from console for debugging
      window.runtime = runtime;
      console.log('Runtime available as window.runtime');

      // Add resize listener for responsive canvas
      window.addEventListener('resize', handleResize);
    </script>
  </body>
</html>`;
}
