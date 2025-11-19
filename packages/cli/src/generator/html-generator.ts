import type { LootiConfig } from '../types/config';
import { getCanvasSize } from '../core/config-loader';
import type { Resources } from '@l8b/runtime';

/**
 * Generate variable name from module name (sanitized for JS)
 */
function sanitizeVarName(name: string): string {
    return name.replace(/[^a-zA-Z0-9]/g, '_');
}

export function generateHTML(
    config: LootiConfig,
    sources: Record<string, string>,
    resources: Resources
): string {
    const { width, height } = getCanvasSize(config);
    
    const canvasId = config.canvas?.id || 'game';
    const isFreeAspect = config.aspect === 'free';
    const baseUrl = config.url || '/';

    // Generate import statements and source map in single pass
    const sourceEntries = Object.entries(sources);
    const sourceImports = sourceEntries
        .map(([name, filePath]) => {
            const varName = sanitizeVarName(name);
            return `import ${varName} from '${filePath}?raw';`;
        })
        .join('\n      ');

    const sourceMap = sourceEntries
        .map(([name]) => {
            const varName = sanitizeVarName(name);
            return `'${name}': ${varName}`;
        })
        .join(',\n          ');

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
        src: url("/@l8b/fonts/BitCell.ttf") format("truetype");
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
      import { Runtime } from '@l8b/runtime';
      
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

      const runtime = new Runtime({
        canvas: canvas,
        width: canvas.width,
        height: canvas.height,
        url: '${baseUrl}',
        sources: {
          ${sourceMap}
        },
        resources: resources,
        listener: {
          log: (message) => {
            console.log('[GAME]', message);
          },
          reportError: (error) => {
            console.error('[GAME ERROR]', error);
          },
          postMessage: (msg) => {
            console.log('[GAME MESSAGE]', msg);
          },
        },
      });

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
