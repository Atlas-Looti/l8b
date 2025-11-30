/**
 * OG Image Generation Page
 *
 * Generates an HTML page that uses Screen API to render OG images
 * This page is loaded by the /og-image endpoint and executes in browser
 */

import type { LootiConfig, OGImageOptions } from "../config";

/**
 * Generate HTML page for OG image generation
 *
 * This page will:
 * 1. Load the runtime
 * 2. Create a Screen instance
 * 3. Call the OG image generation function (if configured)
 * 4. Export the canvas as PNG and return it
 *
 * @param config - LootiScript configuration
 * @param options - OG image generation options
 * @param sources - Source files map
 * @returns HTML string
 */
export function generateOGImagePage(config: LootiConfig, options: OGImageOptions, sources: Record<string, string>): string {
	const canvasId = "og-image-canvas";
	const width = options.width || 1200;
	const height = options.height || 800;

	// Find OG image function name from embed config
	const routePath = options.routePath;
	const embedConfig = config.farcaster?.embeds?.[routePath];
	const ogImageFunction = embedConfig?.ogImageFunction || "generateOGImage";

	// Generate source imports
	const sourceEntries = Object.entries(sources);
	const sourceImports = sourceEntries
		.map(([name, filePath]) => {
			const varName = name.replace(/[^a-zA-Z0-9]/g, "_");
			return `import ${varName} from '${filePath}?raw';`;
		})
		.join("\n      ");

	const sourceMap = sourceEntries
		.map(([name]) => {
			const varName = name.replace(/[^a-zA-Z0-9]/g, "_");
			return `'${name}': ${varName}`;
		})
		.join(",\n          ");

	return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>OG Image Generator</title>
  </head>
  <body>
    <canvas id="${canvasId}" width="${width}" height="${height}"></canvas>
    <script type="module">
      import { Runtime } from '@l8b/runtime';
      import { Screen } from '@l8b/screen';
      
      ${sourceImports}

      const canvas = document.getElementById('${canvasId}');
      const routePath = ${JSON.stringify(options.routePath)};
      const params = ${JSON.stringify(options.params)};

      // Create Screen instance for OG image
      const screen = new Screen({
        canvas: canvas,
        width: ${width},
        height: ${height},
      });

      const screenInterface = screen.getInterface();

      // Initialize runtime (minimal setup for OG image generation)
      const runtime = new Runtime({
        canvas: canvas,
        width: ${width},
        height: ${height},
        url: '/',
        resources: {},
        sources: {
          ${sourceMap}
        },
      });

      // Wait for runtime to initialize
      runtime.start().then(async () => {
        try {
          let imageGenerated = false;
          
          // Try to call OG image generation function if it exists
          if (runtime.vm && typeof runtime.vm.callGlobal === 'function') {
            try {
              // Call the OG image generation function
              // Function signature: function generateOGImage(routePath, params, screen)
              runtime.vm.callGlobal('${ogImageFunction}', routePath, params, screenInterface);
              imageGenerated = true;
            } catch (err) {
              // Function doesn't exist or failed - use default rendering
              console.warn('OG image function not found, using default:', err);
            }
          }
          
          // If no custom function or function failed, use default rendering
          if (!imageGenerated) {
            renderDefaultOGImage(screenInterface, routePath, params);
          }

          // Export canvas as PNG and set as page content
          // This allows the page to be used as an image URL
          const dataUrl = canvas.toDataURL('image/png');
          
          // Replace page content with image
          document.body.innerHTML = '';
          const img = document.createElement('img');
          img.src = dataUrl;
          img.style.width = '100%';
          img.style.height = '100%';
          img.style.objectFit = 'contain';
          document.body.appendChild(img);
          
          // Also set as page background for better compatibility
          document.body.style.margin = '0';
          document.body.style.padding = '0';
          document.body.style.background = 'transparent';
        } catch (error) {
          console.error('Error generating OG image:', error);
          document.body.innerHTML = '<p>Error generating OG image</p>';
        }
      });

      // Default OG image rendering function
      function renderDefaultOGImage(screen, routePath, params) {
        // Clear with background
        screen.clear('#1a1a1a');
        
        // Set color
        screen.setColor('#ffffff');
        screen.setFont('BitCell');
        
        // Draw title
        const title = ${JSON.stringify(config.name)};
        screen.drawText(title, ${width / 2}, ${height / 2 - 100}, 48);
        
        // Draw route info
        if (routePath !== '/') {
          screen.setColor('#888888');
          screen.drawText(routePath, ${width / 2}, ${height / 2}, 24);
        }
        
        // Draw params if any
        if (Object.keys(params).length > 0) {
          screen.setColor('#666666');
          const paramsText = JSON.stringify(params);
          screen.drawText(paramsText, ${width / 2}, ${height / 2 + 50}, 20);
        }
      }
    </script>
  </body>
</html>`;
}
