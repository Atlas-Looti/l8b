/**
 * HTML Template
 *
 * Base HTML structure template
 */

export interface HTMLTemplateOptions {
	title: string;
	canvasId: string;
	styles: string;
	script: string;
	embedTag?: string;
	iconTags?: string;
}

export function generateHTMLTemplate(options: HTMLTemplateOptions): string {
	const { title, canvasId, styles, script, embedTag, iconTags } = options;

	return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, minimal-ui=1" />
    <meta name="mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <title>${title}</title>
${iconTags || ""}${embedTag ? embedTag + "\n" : ""}    <style>${styles}</style>
  </head>
  <body class="noselect custom-cursor" oncontextmenu="return false;">
    <div id="canvaswrapper">
      <canvas id="${canvasId}"></canvas>
    </div>
    <script type="module">${script}</script>
  </body>
</html>`;
}
