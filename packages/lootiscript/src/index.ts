/**
 * @al8b/lootiscript - Scripting language for game development
 *
 * A dynamic, easy-to-learn scripting language designed for games.
 *
 * Pipeline: source → Tokenizer → Parser → Compiler → Routine (bytecode) → Processor/Runner
 *
 * Public surface:
 * - Tokenizer / Parser / Compiler  — language front-end
 * - Routine / OPCODES              — bytecode representation
 * - Processor / Runner / Thread    — execution engine
 * - Program + AST node classes     — AST node types (mostly used by tooling)
 * - Random                         — seeded PRNG exposed to scripts
 */

// ─── Utilities ───────────────────────────────────────────────────────────────
export { Random } from "./random";

// ─── Front-end: Lexer → Parser → Compiler ────────────────────────────────────
export { Tokenizer } from "./v1/tokenizer";
export { Token } from "./v1/token";
export { Parser } from "./v1/parser";
export { Compiler, LocalLayer, Locals } from "./v1/compiler";

// ─── Bytecode representation ──────────────────────────────────────────────────
export { Routine, OPCODES } from "./v1/routine";

// ─── Execution engine ─────────────────────────────────────────────────────────
export { Processor } from "./v1/processor";
export type { RuntimeClass, RuntimeContext, RuntimeGlobal, RuntimeValue } from "./v1/processor-types";
export { Runner, Thread } from "./v1/runner";

// ─── Debugging / dev tools ────────────────────────────────────────────────────
export { Transpiler } from "./v1/transpiler";

// ─── AST node types (used by tooling — language-server, compiler) ─────────────
export {
	After,
	Assignment,
	Braced,
	Break,
	Condition,
	Continue,
	CreateClass,
	CreateObject,
	Delete,
	Do,
	Every,
	Expression,
	Field,
	For,
	ForIn,
	Function,
	FunctionCall,
	Negate,
	NewCall,
	Not,
	Operation,
	Program,
	Return,
	SelfAssignment,
	Sleep,
	type Statement,
	Value,
	Variable,
	While,
} from "./v1/program";
