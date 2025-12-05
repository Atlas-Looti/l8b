/**
 * Logging Helpers Generator
 *
 * Generates logging utility functions
 */

import { INTERNAL_ENDPOINTS } from "../../../../utils/constants";

export interface LoggingHelpersOptions {
	terminalLoggingEnabled: boolean;
	showBrowserLifecycleLogs: boolean;
	showTerminalLifecycleLogs: boolean;
	showBrowserCanvasLogs: boolean;
	showTerminalCanvasLogs: boolean;
}

export function generateLoggingHelpers(options: LoggingHelpersOptions): string {
	const {
		terminalLoggingEnabled,
		showBrowserLifecycleLogs,
		showTerminalLifecycleLogs,
		showBrowserCanvasLogs,
		showTerminalCanvasLogs,
	} = options;

	// Skip generation if all logging is disabled
	const anyLoggingEnabled = showBrowserLifecycleLogs || showTerminalLifecycleLogs || 
	                          showBrowserCanvasLogs || showTerminalCanvasLogs || terminalLoggingEnabled;
	
	if (!anyLoggingEnabled) {
	return `
      // Logging disabled - using no-op functions
      const logLifecycle = () => {};
      const logCanvasSize = () => {};
    `;
	}

	// Generate terminal logging helper if any terminal logging is enabled
	const needsTerminalLog = showTerminalLifecycleLogs || showTerminalCanvasLogs || terminalLoggingEnabled;
	const terminalLogHelper = needsTerminalLog
		? `const sendTerminalLog = (entry) => {
        const payload = JSON.stringify({ ...entry, timestamp: Date.now() });
        if (navigator.sendBeacon) {
          navigator.sendBeacon('${INTERNAL_ENDPOINTS.LOGGER}', new Blob([payload], { type: 'application/json' }));
        } else {
          fetch('${INTERNAL_ENDPOINTS.LOGGER}', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: payload,
            keepalive: true,
          }).catch(() => {});
        }
      };`
		: "";

	return `
      ${terminalLogHelper}
      const logLifecycle = (message) => {
        ${showBrowserLifecycleLogs ? "console.log(message);" : ""}
        ${showTerminalLifecycleLogs ? "sendTerminalLog({ level: 'info', scope: 'runtime', message });" : ""}
      };
      const logCanvasSize = () => {
        ${showBrowserCanvasLogs || showTerminalCanvasLogs ? `const msg = 'Canvas: ' + canvas.width + 'x' + canvas.height + ' (display: ' + canvas.clientWidth + 'x' + canvas.clientHeight + ')';` : ""}
        ${showBrowserCanvasLogs ? "console.log(msg);" : ""}
        ${showTerminalCanvasLogs ? "sendTerminalLog({ level: 'info', scope: 'runtime', message: msg });" : ""}
      };
    `;
}
