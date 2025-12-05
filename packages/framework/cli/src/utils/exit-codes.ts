/**
 * Exit codes for CLI commands
 *
 * Following standard Unix exit code conventions:
 * - 0: Success
 * - 1: General error
 * - 2: Misuse of shell command (invalid arguments)
 * - 130: User interrupt (Ctrl+C)
 */

export const EXIT_CODES = {
	/** Success */
	SUCCESS: 0,
	/** General error */
	ERROR: 1,
	/** Invalid usage/arguments */
	INVALID_USAGE: 2,
	/** User interrupt (SIGINT) */
	USER_INTERRUPT: 130,
} as const;

export type ExitCode = (typeof EXIT_CODES)[keyof typeof EXIT_CODES];
