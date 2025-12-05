/**
 * HTML Generator Adapter
 *
 * Implementation of IHTMLGenerator for generating HTML output
 */

import type { CompiledModule, LootiConfig, Resources as ResourcesEntity } from "../../../core/types";
import type { IHTMLGenerator } from "../../../core/ports";
import { generateFarcasterEmbedTag } from "./farcaster-embed-generator.adapter";
import { generateHTMLTemplate } from "./templates/html-template";
import { generateDevelopmentImports, generateProductionImports } from "./templates/module-imports-generator";
import { generateRuntimeScript } from "./templates/runtime-script-generator";
import { generateStyles } from "./templates/styles-generator";

export class HTMLGenerator implements IHTMLGenerator {

	generateHTML(
		config: LootiConfig,
		sources: Record<string, string>,
		resources: ResourcesEntity,
		compiledModules?: CompiledModule[],
		routePath: string = "/",
		env?: Record<string, string>,
	): string {
		const canvasId = config.canvas?.id || "game";

		// Determine if we're using pre-compiled routines (production) or sources (development)
		const isProduction = compiledModules && compiledModules.length > 0;

		// Validate sources in development mode
		if (!isProduction) {
			const sourceCount = Object.keys(sources).length;
			if (sourceCount === 0) {
				throw new Error("No LootiScript source files found. Make sure you have .loot files in the src/ directory.");
			}
		}

		// Validate compiled modules in production mode
		if (isProduction && (!compiledModules || compiledModules.length === 0)) {
			throw new Error("No compiled modules found. Please run `l8b build` first.");
		}

		// Generate module imports based on mode
		const moduleImports =
			isProduction && compiledModules ? generateProductionImports(compiledModules) : generateDevelopmentImports(sources);

		// Escape config.name for HTML to prevent XSS
		const escapedName = config.name
			.replace(/&/g, "&amp;")
			.replace(/</g, "&lt;")
			.replace(/>/g, "&gt;")
			.replace(/"/g, "&quot;")
			.replace(/'/g, "&#39;");

		// Generate template components
		const styles = generateStyles(canvasId);
		const script = generateRuntimeScript({
			config,
			resources,
			isProduction: Boolean(isProduction),
			moduleImports,
			env,
		});

		// Generate Farcaster embed meta tag for this route
		const embedTag = generateFarcasterEmbedTag(config, routePath);

		// Use icon.png from public folder
		// Multiple sizes for better browser support
		const iconTags = this.generateIconTags();

		// Generate final HTML using template
		return generateHTMLTemplate({
			title: escapedName,
			canvasId,
			styles,
			script,
			embedTag: embedTag || undefined,
			iconTags,
		});
	}

	/**
	 * Generate icon tags for favicon
	 * Uses public/icon.png with multiple sizes
	 */
	private generateIconTags(): string {
		// Generate multiple icon sizes
		// Browser will use the appropriate size
		return `    <link rel="icon" type="image/png" href="/icon.png" />
    <link rel="apple-touch-icon" sizes="180x180" href="/icon.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="/icon.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/icon.png" />
`;
	}

	generate404HTML(config: LootiConfig, isProduction: boolean = true): string {
		const escapedName = config.name
			.replace(/&/g, "&amp;")
			.replace(/</g, "&lt;")
			.replace(/>/g, "&gt;")
			.replace(/"/g, "&quot;")
			.replace(/'/g, "&#39;");

		const canvasId = config.canvas?.id || "game";
		const iconTags = this.generateIconTags();

		// LootiScript code for 404 page
		const lootiScriptCode = `
function update()
  // Check for input to navigate home
  if keyboard.any == 1 or mouse.left == 1 then
    // Navigation handled in JavaScript
  end
end

function draw()
  // Clear screen with gradient-like background
  screen.clear("#667eea")
  
  // Get screen center
  local centerX = screen.width / 2
  local centerY = screen.height / 2
  
  // Draw "404" text - large
  screen.setColor("#FFFFFF")
  screen.drawText("404", centerX, centerY - 80, 120)
  
  // Draw "Page Not Found" text - medium
  screen.setColor("#FFFFFF")
  screen.drawText("Page Not Found", centerX, centerY, 32)
  
  // Draw description text - small
  screen.setColor("#E0E0E0")
  screen.drawText("The page you're looking for", centerX, centerY + 50, 18)
  screen.drawText("doesn't exist or has been moved.", centerX, centerY + 75, 18)
  
  // Draw "Go Home" hint
  screen.setColor("#FFD700")
  screen.drawText("Press any key or click to go home", centerX, centerY + 150, 16)
end
`.trim();

		// Runtime script for 404 page
		const runtimeScript = `
      ${isProduction ? `import { Runtime } from '/runtime.js';` : `import { Runtime } from '@l8b/runtime';`}
      
      const canvas = document.getElementById('${canvasId}');
      if (!canvas) throw new Error('Canvas element with id "${canvasId}" not found');
      
      // Set canvas to fullscreen
      canvas.style.width = '100vw';
      canvas.style.height = '100vh';
      canvas.style.display = 'block';
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // LootiScript code for 404 page
      const code = ${JSON.stringify(lootiScriptCode)};
      
      // Initialize runtime
      const runtime = new Runtime({
        canvas: canvas,
        width: canvas.width,
        height: canvas.height,
        listener: {
          reportError: (error) => console.error('404 page error:', error),
        },
      });
      
      // Load and start
      (async () => {
        try {
          await runtime.loadCode(code);
          runtime.start();
          
          // Add click handler
          canvas.addEventListener('click', () => {
            window.location.href = '/';
          });
          
          // Add keyboard handler
          window.addEventListener('keydown', () => {
            window.location.href = '/';
          });
        } catch (err) {
          console.error('Failed to start 404 page:', err);
        }
      })();
    `.trim();

		return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, minimal-ui=1" />
    <meta name="mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <title>404 - ${escapedName}</title>
${iconTags}    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      body {
        overflow: hidden;
        background: #667eea;
      }
      #${canvasId} {
        display: block;
        width: 100vw;
        height: 100vh;
      }
    </style>
  </head>
  <body>
    <canvas id="${canvasId}"></canvas>
    <script type="module">${runtimeScript}</script>
  </body>
</html>`;
	}
}
