/**
 * @l8b/lootiscript - Scripting language for game development
 *
 * A dynamic, easy-to-learn scripting language designed for games.
 */

// Core language components
export { Random } from "./random";
// Compiler
export { Compiler, LocalLayer, Locals } from "./v1/compiler";
export { Parser } from "./v1/parser";
// Runtime
export { Processor } from "./v1/processor";
// AST and Program structures
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

// VM and bytecode
export { OPCODES, Routine } from "./v1/routine";
export { Runner, Thread } from "./v1/runner";
// Lexer and Parser
export { Token, type Tokenizer as ITokenizer } from "./v1/token";
export { Tokenizer } from "./v1/tokenizer";
export { Transpiler } from "./v1/transpiler";
