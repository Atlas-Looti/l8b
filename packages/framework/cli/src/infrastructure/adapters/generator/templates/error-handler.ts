/**
 * Error Handler Generator
 *
 * Generates error handling code for runtime listener
 */

export function generateErrorHandler(mirrorListenerErrors: boolean = false): string {
	// Simplified error handler - extract message more efficiently
	return `
            const getErrorText = (err) => {
              if (typeof err === 'string') return err;
              if (!err) return 'Runtime error';
              if (err.error && typeof err.error === 'string') return err.error;
              if (err.message && typeof err.message === 'string') return err.message;
              if (err.formatted && typeof err.formatted === 'string') return err.formatted;
              return String(err);
            };
            
            let msg = error.code ? '[' + error.code + '] ' : '';
            msg += getErrorText(error?.error || error?.message || error?.formatted);
            
            if (error.file) {
              msg += '\\n  at ' + error.file;
              if (error.line !== undefined) {
                msg += ':' + error.line;
                if (error.column !== undefined) msg += ':' + error.column;
              }
            }
            
            if (error.context) {
              const ctx = getErrorText(error.context);
              if (ctx) msg += '\\n\\n' + ctx;
              }
            
            if (error.suggestions?.length) {
              msg += '\\n\\nSuggestions:';
              error.suggestions.forEach(s => {
                const sText = getErrorText(s);
                if (sText) msg += '\\n  • ' + sText;
              });
            }
            
            console.error('[GAME ERROR]', msg);
            ${mirrorListenerErrors ? "sendTerminalLog({ level: 'error', scope: 'game', message: msg, details: error });" : ""}
          `;
}
