/**
 * Diagnostic codes for L8B ecosystem
 *
 * Code format:
 * - E1xxx: Syntax errors
 * - E2xxx: Runtime errors
 * - E3xxx: Compilation errors
 * - E4xxx: Type errors
 * - E5xxx: Scene errors
 * - E6xxx: CLI errors
 * - W1xxx: Syntax warnings
 * - W2xxx: Runtime warnings
 * - W3xxx: Compilation warnings
 * - W4xxx: Type warnings
 * - W5xxx: Scene warnings
 */

/**
 * Syntax Error Codes (E1xxx)
 */
export enum SyntaxErrorCode {
	E1001 = "E1001", // Unterminated function
	E1002 = "E1002", // Too many 'end'
	E1003 = "E1003", // Missing 'end'
	E1004 = "E1004", // Unexpected token
	E1005 = "E1005", // Missing token
	E1006 = "E1006", // Unexpected end of file
	E1007 = "E1007", // Misuse of reserved keyword
	E1008 = "E1008", // Unterminated string
	E1009 = "E1009", // Unterminated object/array
}

/**
 * Runtime Error Codes (E2xxx)
 */
export enum RuntimeErrorCode {
	E2001 = "E2001", // Undefined variable
	E2002 = "E2002", // Type mismatch
	E2003 = "E2003", // Division by zero
	E2004 = "E2004", // Function not found
	E2005 = "E2005", // Invalid operation
}

/**
 * Compilation Error Codes (E3xxx)
 */
export enum CompilationErrorCode {
	E3001 = "E3001", // Compilation failed
	E3002 = "E3002", // File not found
	E3003 = "E3003", // Parse error
}

/**
 * Scene Error Codes (E5xxx)
 */
export enum SceneErrorCode {
	E5001 = "E5001", // Invalid path
	E5002 = "E5002", // Invalid scene name
	E5003 = "E5003", // Invalid scene definition
	E5004 = "E5004", // Scene not found
	E5005 = "E5005", // No route matched
	E5006 = "E5006", // No scenes registered
	E5007 = "E5007", // Scene has no draw function
}

/**
 * CLI Error Codes (E6xxx)
 */
export enum CLIErrorCode {
	E6001 = "E6001", // Config error
	E6002 = "E6002", // Build error
	E6003 = "E6003", // Server error
}

/**
 * API Error Codes (E7xxx)
 */
export enum APIErrorCode {
	// Screen API Errors (E7001-E7010)
	E7001 = "E7001", // Failed to get canvas context
	E7002 = "E7002", // Invalid canvas dimensions
	E7003 = "E7003", // Invalid color format
	E7004 = "E7004", // Sprite not found
	E7005 = "E7005", // Sprite not ready
	E7006 = "E7006", // Invalid font
	E7007 = "E7007", // Invalid blend mode

	// Audio API Errors (E7011-E7020)
	E7011 = "E7011", // Audio context creation failed
	E7012 = "E7012", // Audio worklet failed to start
	E7013 = "E7013", // Sound not found
	E7014 = "E7014", // Music not found
	E7015 = "E7015", // Audio context suspended
	E7016 = "E7016", // Invalid audio parameters

	// Sprite API Errors (E7021-E7030)
	E7021 = "E7021", // Sprite loading failed
	E7022 = "E7022", // Invalid sprite properties
	E7023 = "E7023", // Invalid sprite URL
	E7024 = "E7024", // Sprite frame out of bounds

	// Map API Errors (E7031-E7040)
	E7031 = "E7031", // Map canvas context failed
	E7032 = "E7032", // Invalid tile coordinates
	E7033 = "E7033", // Tile sprite not found
	E7034 = "E7034", // Invalid map dimensions

	// Asset API Errors (E7041-E7050)
	E7041 = "E7041", // Asset not found
	E7042 = "E7042", // Asset loading failed
	E7043 = "E7043", // Invalid asset type
	E7044 = "E7044", // Asset not ready

	// Input API Errors (E7051-E7060)
	E7051 = "E7051", // Input device not available
	E7052 = "E7052", // Invalid input state

	// Storage API Errors (E7061-E7070)
	E7061 = "E7061", // Storage quota exceeded
	E7062 = "E7062", // Storage operation failed
	E7063 = "E7063", // Invalid storage key

	// Palette API Errors (E7071-E7080)
	E7071 = "E7071", // Palette not found
	E7072 = "E7072", // Invalid palette format
	E7073 = "E7073", // Invalid color index
	E7074 = "E7074", // Palette loading failed
	E7075 = "E7075", // Invalid palette size

	// Time API Errors (E7081-E7090)
	E7081 = "E7081", // Invalid time value
	E7082 = "E7082", // Time playback failed
	E7083 = "E7083", // Time recording failed
	E7084 = "E7084", // Invalid time format

	// Drawing API Errors (E7091-E7100)
	E7091 = "E7091", // Drawing operation failed
	E7092 = "E7092", // Invalid drawing context
	E7093 = "E7093", // Invalid drawing parameters

	// API Validation Errors (E7100-E7199)
	E7100 = "E7100", // Unknown API property
}

/**
 * Warning Codes (W1xxx - W5xxx)
 */
export enum WarningCode {
	// Syntax Warnings (W1xxx)
	W1001 = "W1001", // Assigning to API variable
	W1002 = "W1002", // Assignment as condition

	// Runtime Warnings (W2xxx)
	W2001 = "W2001", // Deprecated API usage

	// Scene Warnings (W5xxx)
	W5001 = "W5001", // Activating first scene
	W5002 = "W5002", // No route matched initial
	W5003 = "W5003", // No scenes registered warning
	W5004 = "W5004", // No scenes before init
}

/**
 * Union type of all error codes
 */
export type ErrorCode = SyntaxErrorCode | RuntimeErrorCode | CompilationErrorCode | SceneErrorCode | CLIErrorCode | APIErrorCode;

/**
 * Union type of all diagnostic codes
 */
export type DiagnosticCode = ErrorCode | WarningCode;
