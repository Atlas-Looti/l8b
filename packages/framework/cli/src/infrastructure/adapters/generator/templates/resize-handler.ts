/**
 * Resize Handler Generator
 *
 * Generates window resize handler for canvas
 */

export function generateResizeHandler(): string {
	return `
      // Handle window resize
      let resizeTimeout = null;
      const handleResize = () => {
        if (resizeTimeout) clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
          const newSize = calculateCanvasSize();
          applyCanvasSize(newSize);
          
          if (runtime.screen) {
            runtime.screen.resize(canvas.width, canvas.height);
          }
        }, 100);
      };
    `;
}
