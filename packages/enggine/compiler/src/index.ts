/**
 * @l8b/compiler - LootiScript compiler utilities and helpers
 * 
 * Provides a clean API for compiling LootiScript source code into routines
 * and utilities for serializing/deserializing routines.
 */

// Compiler API
export {
    compileSource,
    compileFile,
    type CompileResult,
    type CompileError,
    type CompileWarning,
} from './compiler';

// Serialization utilities
export {
    serializeRoutine,
    deserializeRoutine,
    serializeRoutineToModule,
    isValidRoutine,
} from './serialization';
