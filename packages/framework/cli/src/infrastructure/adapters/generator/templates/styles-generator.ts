/**
 * Styles Generator
 *
 * Generates CSS styles for the HTML page
 */

import { BITCELL_FONT_BASE64 } from "../../../../utils/bitcell-font";

export function generateStyles(canvasId: string): string {
	return `
      @font-face {
        font-family: "BitCell";
        src: url("data:font/truetype;charset=utf-8;base64,${BITCELL_FONT_BASE64}") format("truetype");
        font-display: swap;
      }
      :root {
        color-scheme: dark;
      }
      html,
      body {
        margin: 0;
        padding: 0;
        background-color: #000;
        overflow: hidden;
        font-family: Verdana;
      }
      body {
        touch-action: none;
      }
      .noselect {
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }
      #canvaswrapper {
        text-align: center;
      }
      #${canvasId} {
        image-rendering: pixelated; /* Ensure crisp pixels */
      }
    `;
}
