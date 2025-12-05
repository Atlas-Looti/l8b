/**
 * Canvas Helpers Generator
 *
 * Generates canvas sizing and positioning helpers
 */

export function generateCanvasHelpers(): string {
	return `
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

      // Calculate canvas dimensions based on orientation and aspect ratio
      const calculateCanvasSize = () => {
        const cw = window.innerWidth;
        const ch = window.innerHeight;
        
        // Normalize aspect ratio format (handle both ':' and 'x' separators)
        const normalizedAspect = aspect.replace(':', 'x');
        
        // Handle free aspect - use full window
        if (normalizedAspect === 'free') {
          return { width: cw, height: ch };
        }

        // Convert aspect ratio string to number
        const aspectRatioMap = {
          '4x3': 4 / 3,
          '16x9': 16 / 9,
          '2x1': 2 / 1,
          '1x1': 1 / 1,
          '>4x3': 4 / 3,
          '>16x9': 16 / 9,
          '>2x1': 2 / 1,
          '>1x1': 1 / 1,
        };
        
        let ratio = aspectRatioMap[normalizedAspect];
        const isMinAspect = normalizedAspect.startsWith('>');
        
        // If ratio not found, default to 16:9
        if (ratio == null) {
          ratio = 16 / 9;
        }
        
        // Handle minimum aspect ratio
        if (isMinAspect) {
          switch (orientation) {
            case 'portrait':
              ratio = Math.max(ratio, ch / cw);
              break;
            case 'landscape':
              ratio = Math.max(ratio, cw / ch);
              break;
            default: // 'any'
              if (ch > cw) {
                ratio = Math.max(ratio, ch / cw);
              } else {
                ratio = Math.max(ratio, cw / ch);
              }
          }
        }

        let w, h, r;

        // Calculate dimensions based on orientation
        if (ratio != null) {
          switch (orientation) {
            case 'portrait':
              r = Math.min(cw, ch / ratio) / cw;
              w = cw * r;
              h = cw * r * ratio;
              break;
            case 'landscape':
              r = Math.min(cw / ratio, ch) / ch;
              w = ch * r * ratio;
              h = ch * r;
              break;
            default: // 'any'
              if (cw > ch) {
                // Landscape screen
                r = Math.min(cw / ratio, ch) / ch;
                w = ch * r * ratio;
                h = ch * r;
              } else {
                // Portrait screen
                r = Math.min(cw, ch / ratio) / cw;
                w = cw * r;
                h = cw * r * ratio;
              }
          }
        } else {
          // Free aspect or unknown - use full window
          w = cw;
          h = ch;
        }

        return { width: Math.round(w), height: Math.round(h) };
      };

      // Helper to apply canvas sizing and centering
      const applyCanvasSize = (size) => {
        const ratio = getRatio();
        const cw = window.innerWidth;
        const ch = window.innerHeight;
        
        // Center vertically with margin-top
        canvas.style.marginTop = Math.round((ch - size.height) / 2) + 'px';
        
        // Set canvas display size
        canvas.style.width = Math.round(size.width) + 'px';
        canvas.style.height = Math.round(size.height) + 'px';
        
        // Set canvas internal size with devicePixelRatio
        canvas.width = Math.round(size.width) * ratio;
        canvas.height = Math.round(size.height) * ratio;
      };
    `;
}
