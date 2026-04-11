/**
 * Opcode handler index
 *
 * Re-exports all handler groups so processor.ts can import them all
 * with a single statement.
 *
 * @module lootiscript/handlers
 */

export { handleTypeOps } from "./type-handlers";
export { handleLoadOps } from "./load-handlers";
export { handleObjectOps } from "./object-handlers";
export { handleStoreOps } from "./store-handlers";
export { handleComparisonOps } from "./comparison-handlers";
export { handleUnaryOps } from "./unary-handlers";
export { handleJumpOps } from "./jump-handlers";
export { handleLoopOps } from "./loop-handlers";
export { handleFunctionOps } from "./function-handlers";
export { handleAsyncOps } from "./async-handlers";
export { handleFusedOps } from "./fused-handlers";
