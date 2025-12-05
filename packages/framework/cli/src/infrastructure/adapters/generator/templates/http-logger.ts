/**
 * HTTP Logger Generator
 *
 * Generates HTTP request logging for development
 */

export function generateHTTPLogger(isProduction: boolean): string {
	if (isProduction) {
		return "";
	}

	// Only generate HTTP logger in development
	return `
      window.__l8b_http_logger = {
        logRequest: (method, url, status, time, size, error) => {
          const colors = {
            GET: '#4A9EFF', POST: '#4CAF50', PUT: '#FFC107', DELETE: '#F44336'
          };
          const methodColor = colors[method] || '#9E9E9E';
          const statusColor = status >= 200 && status < 300 ? '#4CAF50' : status >= 400 ? '#F44336' : '#FFC107';
          let log = '%c[HTTP]%c ' + method.padEnd(6);
          if (status !== undefined) log += ' %c' + status;
          log += ' ' + url;
          if (time !== undefined) log += ' (' + time + 'ms)';
          if (size !== undefined) {
            const sizeStr = size < 1024 ? size + 'B' : 
                           size < 1024 * 1024 ? (size / 1024).toFixed(1) + 'KB' : 
                           (size / (1024 * 1024)).toFixed(1) + 'MB';
            log += ' ' + sizeStr;
          }
          if (error) log += ' - ' + error;
          console.log(log, 'color: #9E9E9E', 'color: ' + methodColor, status !== undefined ? 'color: ' + statusColor : '', '');
        }
      };
    `;
}
