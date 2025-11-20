/**
 * Serialization utilities for LootiScript routines
 */

/**
 * Serialize a routine to JSON string
 * 
 * @param routine - Exported routine data (from routine.export())
 * @returns JSON string representation
 */
export function serializeRoutine(routine: any): string {
    return JSON.stringify(routine);
}

/**
 * Deserialize a routine from JSON string
 * 
 * @param json - JSON string representation
 * @returns Routine data that can be imported via Routine.import()
 */
export function deserializeRoutine(json: string): any {
    return JSON.parse(json);
}

/**
 * Serialize a routine to a JavaScript module string
 * 
 * Useful for generating .js files that export compiled routines.
 * 
 * @param routine - Exported routine data
 * @param moduleName - Optional module name for metadata
 * @param filename - Optional source filename for metadata
 * @returns JavaScript module code as string
 */
export function serializeRoutineToModule(
    routine: any,
    moduleName?: string,
    filename?: string,
    options?: {
        /**
         * Minify JSON output (default: true)
         */
        minify?: boolean;
    }
): string {
    const data = {
        ...(moduleName && { name: moduleName }),
        ...(filename && { filename }),
        routine,
    };

    const minify = options?.minify !== undefined ? options.minify : true;
    const json = minify ? JSON.stringify(data) : JSON.stringify(data, null, 2);

    return `export default ${json};`;
}

/**
 * Validate that a routine has the expected structure
 * 
 * @param routine - Routine data to validate
 * @returns True if valid, false otherwise
 */
export function isValidRoutine(routine: any): boolean {
    if (!routine || typeof routine !== 'object') {
        return false;
    }

    // Check for essential routine properties
    // These are based on the Routine structure from @l8b/lootiscript
    return (
        'bytecode' in routine &&
        'constants' in routine &&
        Array.isArray(routine.bytecode) &&
        Array.isArray(routine.constants)
    );
}
