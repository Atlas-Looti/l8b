/**
 * @l8b/compiler - LootiScript compiler utilities and helpers
 *
 * Provides a clean API for compiling LootiScript source code into routines
 * and utilities for serializing/deserializing routines.
 */

// Compiler API
export {
    type CompileError,
    type CompileResult,
    type CompileWarning,
    compileFile,
    compileSource,
} from "./compiler";

// Serialization utilities
export {
    deserializeRoutine,
    isValidRoutine,
    serializeRoutine,
    serializeRoutineToModule,
} from "./serialization";
