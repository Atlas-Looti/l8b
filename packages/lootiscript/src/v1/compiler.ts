/**
 * Compiler - Compiles AST to bytecode
 *
 * Transforms parsed AST into executable bytecode for the VM.
 * Handles optimization, label resolution, and scope management.
 *
 * Responsibilities:
 * - Traverse AST and generate opcodes
 * - Manage local variable scope and allocation
 * - Resolve control flow labels (break/continue)
 * - Perform peephole optimizations (opcode fusion)
 *
 * @module lootiscript/compiler
 */

import {
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
	Field,
	For,
	ForIn,
	Function,
	FunctionCall,
	Negate,
	NewCall,
	Not,
	Operation,
	type Program,
	Return,
	SelfAssignment,
	Sleep,
	type Statement,
	Value,
	Variable,
	While,
} from "./program";
import { OPCODES, Routine } from "./routine";

// Forward declaration for Processor (circular dependency)
declare class Processor {
	load(routine: Routine): void;
	run(context: any): any;
}

// Forward declaration for Locals and LocalLayer (defined below)
// They are now exported classes, so we can reference them directly

/**
 * Compiler - Compiles LootiScript AST to bytecode
 *
 * The compiler works in a single pass for code generation, followed by
 * optimization passes for label resolution and opcode fusion.
 *
 * @example
 * const compiler = new Compiler(programAst);
 * const routine = compiler.routine;
 */
export class Compiler {
	program: Program;
	code_saves: any[];
	code: string[];
	routine: Routine;
	locals: Locals;
	count: number;
	break_label: string | null;
	continue_label: string | null;
	processor?: Processor;

	constructor(program: Program) {
		let i: number, j: number, len: number, ref: Statement[], s: Statement;
		this.program = program;
		this.code_saves = [];
		this.code = [""];
		this.routine = new Routine(0);
		this.locals = new Locals(this);
		this.count = 0;
		this.break_label = null;
		this.continue_label = null;
		ref = this.program.statements;
		for (i = j = 0, len = ref.length; j < len; i = ++j) {
			s = ref[i];
			this.compile(s);
			if (i < this.program.statements.length - 1) {
				this.routine.POP(s);
			}

			// OPTIMIZATION: Dead Code Elimination
			// Stop compiling after return, break, or continue statements
			if (s instanceof Return || s instanceof Break || s instanceof Continue) {
				break;
			}
		}
		this.routine.optimize();
		this.routine.resolveLabels();
		this.optimizeFusedOpcodes();
		this.count += this.routine.opcodes.length;
		this.routine.locals_size = this.locals.max_index;
	}

	/**
	 * Optimize bytecode by fusing common opcode patterns
	 *
	 * Performs peephole optimization by combining adjacent opcodes into
	 * more efficient fused instructions. This reduces opcode dispatch overhead
	 * and improves execution performance.
	 *
	 * Optimization patterns:
	 * - LOAD_VARIABLE + FUNCTION_CALL -> LOAD_VAR_CALL
	 * - LOAD_PROPERTY + FUNCTION_CALL -> LOAD_PROP_CALL
	 * - LOAD_VALUE (number) + ADD -> LOAD_CONST_ADD
	 *
	 * @remarks
	 * This method modifies the routine's opcode array in place.
	 * Should be called after label resolution.
	 */
	optimizeFusedOpcodes(): void {
		const ops = this.routine.opcodes;
		const args = this.routine.arg1;
		const refs = this.routine.ref;
		let i = 0;

		while (i < ops.length - 1) {
			// Fusion: LOAD_VARIABLE + FUNCTION_CALL -> LOAD_VAR_CALL
			if (
				ops[i] === OPCODES.LOAD_VARIABLE &&
				ops[i + 1] === OPCODES.FUNCTION_CALL
			) {
				const varName = args[i];
				const numArgs = args[i + 1];
				const ref = refs[i + 1];

				ops[i] = OPCODES.LOAD_VAR_CALL;
				args[i] = { name: varName, args: numArgs };
				refs[i] = ref;

				ops.splice(i + 1, 1);
				args.splice(i + 1, 1);
				refs.splice(i + 1, 1);
				continue;
			}

			// Fusion: LOAD_PROPERTY + FUNCTION_CALL -> LOAD_PROP_CALL
			if (
				ops[i] === OPCODES.LOAD_PROPERTY &&
				ops[i + 1] === OPCODES.FUNCTION_CALL
			) {
				const numArgs = args[i + 1];
				const ref = refs[i + 1];

				ops[i] = OPCODES.LOAD_PROP_CALL;
				args[i] = numArgs;
				refs[i] = ref;

				ops.splice(i + 1, 1);
				args.splice(i + 1, 1);
				refs.splice(i + 1, 1);
				continue;
			}

			// Fusion: LOAD_VALUE (number) + ADD -> LOAD_CONST_ADD
			if (
				ops[i] === OPCODES.LOAD_VALUE &&
				typeof args[i] === "number" &&
				ops[i + 1] === OPCODES.ADD
			) {
				const val = args[i];
				const ref = refs[i + 1];

				ops[i] = OPCODES.LOAD_CONST_ADD;
				args[i] = val;
				refs[i] = ref;

				ops.splice(i + 1, 1);
				args.splice(i + 1, 1);
				refs.splice(i + 1, 1);
				continue;
			}

			i++;
		}
	}

	/**
	 * Main compile method - dispatches to appropriate compile method based on statement type
	 *
	 * Acts as the central dispatcher for the compilation process.
	 * Recursively calls specific compile methods for each AST node type.
	 *
	 * @param {Statement} statement - The AST node to compile
	 * @throws {string} If the statement type is not implemented
	 */
	compile(statement: Statement): void {
		if (statement instanceof Value) {
			this.compileValue(statement);
		} else if (statement instanceof Operation) {
			this.compileOperation(statement);
		} else if (statement instanceof Assignment) {
			this.compileAssignment(statement);
		} else if (statement instanceof Variable) {
			this.compileVariable(statement);
		} else if (statement instanceof Function) {
			this.compileFunction(statement);
		} else if (statement instanceof FunctionCall) {
			this.compileFunctionCall(statement);
		} else if (statement instanceof While) {
			this.compileWhile(statement);
		} else if (statement instanceof SelfAssignment) {
			this.compileSelfAssignment(statement);
		} else if (statement instanceof Braced) {
			this.compileBraced(statement);
		} else if (statement instanceof CreateObject) {
			this.compileCreateObject(statement);
		} else if (statement instanceof Field) {
			this.compileField(statement);
		} else if (statement instanceof Negate) {
			this.compileNegate(statement);
		} else if (statement instanceof For) {
			this.compileFor(statement);
		} else if (statement instanceof ForIn) {
			this.compileForIn(statement);
		} else if (statement instanceof Not) {
			this.compileNot(statement);
		} else if (statement instanceof Return) {
			this.compileReturn(statement);
		} else if (statement instanceof Condition) {
			this.compileCondition(statement);
		} else if (statement instanceof Break) {
			this.compileBreak(statement);
		} else if (statement instanceof Continue) {
			this.compileContinue(statement);
		} else if (statement instanceof CreateClass) {
			this.compileCreateClass(statement);
		} else if (statement instanceof NewCall) {
			this.compileNewCall(statement);
		} else if (statement instanceof After) {
			this.compileAfter(statement);
		} else if (statement instanceof Every) {
			this.compileEvery(statement);
		} else if (statement instanceof Do) {
			this.compileDo(statement);
		} else if (statement instanceof Sleep) {
			this.compileSleep(statement);
		} else if (statement instanceof Delete) {
			this.compileDelete(statement);
		} else {
			console.info(statement);
			throw "Not implemented";
		}
	}

	/**
	 * Compile assignment statement
	 *
	 * Handles variable assignment, property assignment, and local variable declaration.
	 * Manages the complexity of assigning to:
	 * - Local variables (optimized access)
	 * - Global variables
	 * - Object properties
	 * - "this" context
	 *
	 * @param {Assignment} statement - The assignment AST node
	 */
	compileAssignment(statement: Assignment): void {
		let arg_index: number,
			f: Field,
			i: number,
			index: number,
			j: number,
			ref: number;
		if (statement.local) {
			if (statement.field instanceof Variable) {
				if (statement.expression instanceof Function) {
					index = this.locals.register(statement.field.identifier); // register function locally first
					this.compile(statement.expression); // then compile function which may refer to itself
					this.routine.arg1[this.routine.arg1.length - 1].import_self = index;
					this.routine.STORE_LOCAL(index, statement);
				} else if (
					statement.expression instanceof After ||
					statement.expression instanceof Do ||
					statement.expression instanceof Every
				) {
					index = this.locals.register(statement.field.identifier); // register thread locally first
					arg_index = this.routine.arg1.length; // thread main routine will land here
					this.compile(statement.expression); // then compile function which may refer to itself
					this.routine.arg1[arg_index].import_self = index;
					this.routine.STORE_LOCAL(index, statement);
				} else {
					this.compile(statement.expression); // first compile expression which may refer to another local with same name
					index = this.locals.register(statement.field.identifier); // then register a local for that name
					this.routine.STORE_LOCAL(index, statement);
				}
			} else {
				throw "illegal";
			}
		} else {
			if (statement.field instanceof Variable) {
				if (this.locals.get(statement.field.identifier) != null) {
					this.compile(statement.expression);
					index = this.locals.get(statement.field.identifier)!;
					this.routine.STORE_LOCAL(index, statement);
				} else if (statement.expression instanceof CreateClass) {
					this.compileUpdateClass(
						statement.expression,
						statement.field.identifier,
					);
				} else {
					this.compile(statement.expression);
					this.routine.STORE_VARIABLE(statement.field.identifier, statement);
				}
			} else {
				f = statement.field as Field;
				if (f.expression instanceof Variable) {
					if (f.expression.identifier === "this") {
						this.routine.LOAD_THIS(f);
					} else if (this.locals.get(f.expression.identifier) != null) {
						index = this.locals.get(f.expression.identifier)!;
						this.routine.LOAD_LOCAL_OBJECT(index, f.expression);
					} else if (f.expression.identifier === "global") {
						this.routine.LOAD_GLOBAL(f);
					} else {
						this.routine.LOAD_VARIABLE_OBJECT(
							f.expression.identifier,
							statement,
						);
					}
				} else {
					this.compile(f.expression);
					this.routine.MAKE_OBJECT(statement);
				}
				for (i = j = 0, ref = f.chain.length - 2; j <= ref; i = j += 1) {
					this.compile(f.chain[i]);
					this.routine.LOAD_PROPERTY_OBJECT(f.chain[i]);
				}
				this.compile(f.chain[f.chain.length - 1]);
				this.compile(statement.expression);
				this.routine.STORE_PROPERTY(statement);
			}
		}
	}

	compileSelfAssignment(statement: SelfAssignment): void {
		let f: Field, i: number, index: number, j: number, op: string, ref: number;
		switch (statement.operation) {
			case "+=":
				op = "ADD";
				break;
			case "-=":
				op = "SUB";
				break;
			case "*=":
				op = "MUL";
				break;
			case "/=":
				op = "DIV";
				break;
			case "%=":
				op = "MODULO";
				break;
			case "&=":
				op = "BINARY_AND";
				break;
			case "|=":
				op = "BINARY_OR";
				break;
			default:
				throw "Unknown self-assignment operation: " + statement.operation;
		}
		if (statement.field instanceof Variable) {
			if (this.locals.get(statement.field.identifier) != null) {
				index = this.locals.get(statement.field.identifier)!;
				this.routine.LOAD_LOCAL(index, statement);
				this.compile(statement.expression);
				(this.routine as any)[op](statement);
				this.routine.STORE_LOCAL(index, statement);
			} else {
				this.routine.LOAD_VARIABLE(statement.field.identifier, statement);
				this.compile(statement.expression);
				(this.routine as any)[op](statement);
				this.routine.STORE_VARIABLE(statement.field.identifier, statement);
			}
		} else {
			f = statement.field as Field;
			if (f.expression instanceof Variable) {
				if (f.expression.identifier === "this") {
					this.routine.LOAD_THIS(f);
				} else if (this.locals.get(f.expression.identifier) != null) {
					index = this.locals.get(f.expression.identifier)!;
					this.routine.LOAD_LOCAL_OBJECT(index, statement);
				} else if (f.expression.identifier === "global") {
					this.routine.LOAD_GLOBAL(f);
				} else {
					this.routine.LOAD_VARIABLE_OBJECT(f.expression.identifier, statement);
				}
			} else {
				this.compile(f.expression);
				this.routine.MAKE_OBJECT(statement);
			}
			for (i = j = 0, ref = f.chain.length - 2; j <= ref; i = j += 1) {
				this.compile(f.chain[i]);
				this.routine.LOAD_PROPERTY_OBJECT(f.chain[i]);
			}
			this.compile(f.chain[f.chain.length - 1]);
			this.routine.LOAD_PROPERTY_ATOP(statement);
			this.compile(statement.expression);
			(this.routine as any)[op](statement);
			this.routine.STORE_PROPERTY(statement);
		}
	}

	/**
	 * Compile binary or unary operation
	 *
	 * Generates opcodes for mathematical and logical operations.
	 * Handles short-circuit evaluation for 'and'/'or' operators.
	 *
	 * @param {Operation} op - The operation AST node
	 */
	compileOperation(op: Operation): void {
		let jump: string, ref: string, ref1: string;
		if (
			(ref = op.operation) === "+" ||
			ref === "-" ||
			ref === "*" ||
			ref === "/" ||
			ref === "%" ||
			ref === "&" ||
			ref === "|" ||
			ref === "<<" ||
			ref === ">>"
		) {
			// OPTIMIZATION: Constant Folding
			// If both operands are constant values, compute the result at compile time
			if (
				op.term1 instanceof Value &&
				op.term1.type === Value.TYPE_NUMBER &&
				op.term2 instanceof Value &&
				op.term2.type === Value.TYPE_NUMBER
			) {
				let result: number;
				const v1 = op.term1.value as number;
				const v2 = op.term2.value as number;

				switch (op.operation) {
					case "+":
						result = v1 + v2;
						break;
					case "-":
						result = v1 - v2;
						break;
					case "*":
						result = v1 * v2;
						break;
					case "/":
						result = v1 / v2;
						break;
					case "%":
						result = v1 % v2;
						break;
					case "&":
						result = v1 & v2;
						break;
					case "|":
						result = v1 | v2;
						break;
					case "<<":
						result = v1 << v2;
						break;
					case ">>":
						result = v1 >> v2;
						break;
					default:
						result = 0;
				}
				this.routine.LOAD_VALUE(result, op);
				return;
			}

			this.compile(op.term1);
			this.compile(op.term2);
			switch (op.operation) {
				case "+":
					this.routine.ADD(op);
					break;
				case "-":
					this.routine.SUB(op);
					break;
				case "*":
					this.routine.MUL(op);
					break;
				case "/":
					this.routine.DIV(op);
					break;
				case "%":
					this.routine.MODULO(op);
					break;
				case "&":
					this.routine.BINARY_AND(op);
					break;
				case "|":
					this.routine.BINARY_OR(op);
					break;
				case "<<":
					this.routine.SHIFT_LEFT(op);
					break;
				case ">>":
					this.routine.SHIFT_RIGHT(op);
			}
		} else if (
			(ref1 = op.operation) === "==" ||
			ref1 === "!=" ||
			ref1 === "<" ||
			ref1 === ">" ||
			ref1 === "<=" ||
			ref1 === ">="
		) {
			this.compile(op.term1);
			this.compile(op.term2);
			switch (op.operation) {
				case "==":
					this.routine.EQ(op);
					break;
				case "!=":
					this.routine.NEQ(op);
					break;
				case "<":
					this.routine.LT(op);
					break;
				case ">":
					this.routine.GT(op);
					break;
				case "<=":
					this.routine.LTE(op);
					break;
				case ">=":
					this.routine.GTE(op);
			}
		} else if (op.operation === "and") {
			jump = this.routine.createLabel("and");
			op.term1.nowarning = true;
			op.term2.nowarning = true;
			this.compile(op.term1);
			this.routine.JUMPN_NOPOP(jump, op);
			this.routine.POP(op);
			this.compile(op.term2);
			this.routine.setLabel(jump);
		} else if (op.operation === "or") {
			jump = this.routine.createLabel("or");
			op.term1.nowarning = true;
			op.term2.nowarning = true;
			this.compile(op.term1);
			this.routine.JUMPY_NOPOP(jump, op);
			this.routine.POP(op);
			this.compile(op.term2);
			this.routine.setLabel(jump);
		} else if (op.operation === "^") {
			this.compile(op.term1);
			this.compile(op.term2);
			this.routine.BINARY_OP(Compiler.predefined_binary_functions.pow, op);
		}
	}

	compileBraced(expression: Braced): void {
		this.compile(expression.expression);
	}

	compileNegate(expression: Negate): void {
		if (
			expression.expression instanceof Value &&
			expression.expression.type === Value.TYPE_NUMBER
		) {
			this.routine.LOAD_VALUE(-expression.expression.value, expression);
		} else {
			this.compile(expression.expression);
			this.routine.NEGATE(expression);
		}
	}

	compileNot(expression: Not): void {
		expression.expression.nowarning = true;
		this.compile(expression.expression);
		this.routine.NOT(expression);
	}

	compileValue(value: Value): void {
		let i: number, j: number, ref: number;
		switch (value.type) {
			case Value.TYPE_NUMBER:
				this.routine.LOAD_VALUE(value.value, value);
				break;
			case Value.TYPE_STRING:
				this.routine.LOAD_VALUE(value.value, value);
				break;
			case Value.TYPE_ARRAY:
				this.routine.CREATE_ARRAY(value);
				for (
					i = j = 0, ref = (value.value as Statement[]).length - 1;
					j <= ref;
					i = j += 1
				) {
					this.routine.LOAD_VALUE(i, value);
					this.compile((value.value as Statement[])[i]);
					this.routine.CREATE_PROPERTY(value);
				}
		}
	}

	compileVariable(variable: Variable): void {
		let index: number, v: string;
		v = variable.identifier;
		if (v === "this") {
			this.routine.LOAD_THIS(variable);
		} else if (v === "global") {
			this.routine.LOAD_GLOBAL(variable);
		} else if (Compiler.predefined_values[v] != null) {
			this.routine.LOAD_VALUE(Compiler.predefined_values[v], variable);
		} else if (this.locals.get(v) != null) {
			index = this.locals.get(v)!;
			this.routine.LOAD_LOCAL(index, variable);
		} else {
			this.routine.LOAD_VARIABLE(v, variable);
		}
	}

	compileField(field: Field): void {
		var c: Statement,
			i: number,
			id: string,
			index: number,
			j: number,
			k: number,
			len: number,
			ref: number,
			ref1: Statement[];
		if (
			(field.expression as Variable).identifier === "keyboard" ||
			(field.expression as Variable).identifier === "gamepad"
		) {
			field.nowarning = true;
		}
		c = field.chain[field.chain.length - 1];
		if (c instanceof Value && c.value === "type") {
			if (field.chain.length === 1) {
				if (field.expression instanceof Variable) {
					// variable.type
					id = field.expression.identifier;
					if (this.locals.get(id) != null) {
						index = this.locals.get(id)!;
						this.routine.LOAD_LOCAL(index, field);
						this.routine.TYPE(field);
					} else if (Compiler.predefined_values[id] != null) {
						this.routine.LOAD_VALUE("number", field);
					} else if (
						Compiler.predefined_unary_functions[id] != null ||
						Compiler.predefined_binary_functions[id]
					) {
						this.routine.LOAD_VALUE("function", field);
					} else {
						this.routine.VARIABLE_TYPE(id, field.expression);
					}
				} else {
					this.compile(field.expression);
					this.routine.TYPE(field);
				}
			} else {
				this.compile(field.expression);
				for (i = j = 0, ref = field.chain.length - 3; j <= ref; i = j += 1) {
					this.compile(field.chain[i]);
					this.routine.LOAD_PROPERTY(field);
				}
				this.compile(field.chain[field.chain.length - 2]);
				this.routine.PROPERTY_TYPE(field.expression);
			}
		} else {
			this.compile(field.expression);
			ref1 = field.chain;
			for (k = 0, len = ref1.length; k < len; k++) {
				c = ref1[k];
				this.compile(c);
				this.routine.LOAD_PROPERTY(field);
			}
		}
	}

	compileFieldParent(field: Field): void {
		var c: Statement, i: number, j: number, ref: number;
		this.compile(field.expression);
		for (i = j = 0, ref = field.chain.length - 2; j <= ref; i = j += 1) {
			c = field.chain[i];
			this.compile(c);
			this.routine.LOAD_PROPERTY(field);
		}
	}

	compileFunctionCall(call: FunctionCall): void {
		var a,
			funk,
			i,
			index,
			j,
			k,
			l,
			len,
			len1,
			len2,
			len3,
			len4,
			m,
			n,
			ref,
			ref1,
			ref2,
			ref3,
			ref4;
		if (call.expression instanceof Field) {
			ref = call.args;
			for (i = j = 0, len = ref.length; j < len; i = ++j) {
				a = ref[i];
				this.compile(a);
			}
			this.compileFieldParent(call.expression as Field);
			this.compile(
				(call.expression as Field).chain[
				(call.expression as Field).chain.length - 1
				],
			);
			this.routine.FUNCTION_APPLY_PROPERTY(call.args.length, call);
		} else if (call.expression instanceof Variable) {
			if (
				Compiler.predefined_unary_functions[
				(call.expression as Variable).identifier
				] != null
			) {
				funk =
					Compiler.predefined_unary_functions[
					(call.expression as Variable).identifier
					];
				if (call.args.length > 0) {
					this.compile(call.args[0]);
				} else {
					this.routine.LOAD_VALUE(0, call);
				}
				this.routine.UNARY_OP(funk, call);
			} else if (
				Compiler.predefined_binary_functions[
				(call.expression as Variable).identifier
				] != null
			) {
				funk =
					Compiler.predefined_binary_functions[
					(call.expression as Variable).identifier
					];
				if (call.args.length > 0) {
					this.compile(call.args[0]);
				} else {
					this.routine.LOAD_VALUE(0, call);
				}
				if (call.args.length > 1) {
					this.compile(call.args[1]);
				} else {
					this.routine.LOAD_VALUE(0, call);
				}
				this.routine.BINARY_OP(funk, call);
			} else if ((call.expression as Variable).identifier === "super") {
				ref1 = call.args;
				for (i = k = 0, len1 = ref1.length; k < len1; i = ++k) {
					a = ref1[i];
					this.compile(a);
				}
				this.routine.SUPER_CALL(call.args.length, call);
			} else if (
				this.locals.get((call.expression as Variable).identifier) != null
			) {
				ref2 = call.args;
				for (i = l = 0, len2 = ref2.length; l < len2; i = ++l) {
					a = ref2[i];
					this.compile(a);
				}
				index = this.locals.get((call.expression as Variable).identifier)!;
				this.routine.LOAD_LOCAL(index, call);
				this.routine.FUNCTION_CALL(call.args.length, call);
			} else {
				ref3 = call.args;
				for (i = m = 0, len3 = ref3.length; m < len3; i = ++m) {
					a = ref3[i];
					this.compile(a);
				}
				this.routine.LOAD_VALUE((call.expression as Variable).identifier, call);
				this.routine.FUNCTION_APPLY_VARIABLE(call.args.length, call);
			}
		} else {
			ref4 = call.args;
			for (n = 0, len4 = ref4.length; n < len4; n++) {
				a = ref4[n];
				this.compile(a);
			}
			this.compile(call.expression);
			this.routine.FUNCTION_CALL(call.args.length, call);
		}
	}

	/**
	 * Compile 'for' loop
	 *
	 * Generates bytecode for numeric range loops.
	 * Structure:
	 * 1. Initialize iterator and bounds
	 * 2. Loop start label
	 * 3. Check condition (jump to end if false)
	 * 4. Execute body
	 * 5. Increment iterator
	 * 6. Jump to start
	 *
	 * @param {For} forloop - The for loop AST node
	 */
	compileFor(forloop: For): void {
		// OPTIMIZATION: Loop Unrolling
		// If the loop has constant bounds and is small (≤ 5 iterations), unroll it
		if (
			forloop.range_from instanceof Value &&
			forloop.range_from.type === Value.TYPE_NUMBER &&
			forloop.range_to instanceof Value &&
			forloop.range_to.type === Value.TYPE_NUMBER &&
			(forloop.range_by == null ||
				(forloop.range_by instanceof Value &&
					forloop.range_by.type === Value.TYPE_NUMBER))
		) {
			const from = forloop.range_from.value as number;
			const to = forloop.range_to.value as number;
			const step =
				forloop.range_by instanceof Value
					? (forloop.range_by.value as number)
					: 1;

			// Calculate iteration count
			let iterations = 0;
			if (step > 0 && to >= from) {
				iterations = Math.floor((to - from) / step) + 1;
			} else if (step < 0 && to <= from) {
				iterations = Math.floor((from - to) / Math.abs(step)) + 1;
			}

			// Only unroll if iterations are small (≤ 5)
			if (iterations > 0 && iterations <= 5) {
				const iterator = this.locals.register(forloop.iterator);
				this.locals.push();

				for (let i = 0; i < iterations; i++) {
					const iterValue = from + i * step;
					// Set iterator value
					this.routine.LOAD_VALUE(iterValue, forloop);
					this.routine.STORE_LOCAL(iterator, forloop);
					this.routine.POP(forloop);

					// Compile loop body
					this.compileSequence(forloop.sequence);
				}

				this.locals.pop();
				return;
			}
		}

		// Standard loop compilation (not unrolled)
		var for_continue: string,
			for_end: string,
			for_start: string,
			iterator: number,
			save_break: string | null,
			save_continue: string | null;
		iterator = this.locals.register(forloop.iterator);
		this.locals.allocate(); // range_to
		this.locals.allocate(); // step
		this.compile(forloop.range_from);
		this.routine.STORE_LOCAL(iterator, forloop);
		this.routine.POP(forloop);
		this.compile(forloop.range_to);
		if (forloop.range_by != null) {
			this.compile(forloop.range_by);
		} else {
			this.routine.LOAD_VALUE(0, forloop);
		}
		for_start = this.routine.createLabel("for_start");
		for_continue = this.routine.createLabel("for_continue");
		for_end = this.routine.createLabel("for_end");
		this.routine.FORLOOP_INIT([iterator, for_end], forloop);
		this.routine.setLabel(for_start);
		this.locals.push();
		save_break = this.break_label;
		save_continue = this.continue_label;
		this.break_label = for_end;
		this.continue_label = for_continue;
		this.compileSequence(forloop.sequence);
		this.break_label = save_break;
		this.continue_label = save_continue;
		this.routine.setLabel(for_continue);
		this.routine.FORLOOP_CONTROL([iterator, for_start], forloop);
		this.routine.setLabel(for_end);
		this.locals.pop();
	}

	compileForIn(forloop: ForIn): void {
		var for_continue: string,
			for_end: string,
			for_start: string,
			iterator: number,
			save_break: string | null,
			save_continue: string | null;
		iterator = this.locals.register(forloop.iterator);
		this.locals.allocate(); // array
		this.locals.allocate(); // index
		this.compile(forloop.list);
		for_start = this.routine.createLabel("for_start");
		for_continue = this.routine.createLabel("for_continue");
		for_end = this.routine.createLabel("for_end");
		this.routine.FORIN_INIT([iterator, for_end], forloop);
		this.routine.setLabel(for_start);
		this.locals.push();
		save_break = this.break_label;
		save_continue = this.continue_label;
		this.break_label = for_end;
		this.continue_label = for_continue;
		this.compileSequence(forloop.sequence);
		this.break_label = save_break;
		this.continue_label = save_continue;
		this.routine.setLabel(for_continue);
		this.routine.FORIN_CONTROL([iterator, for_start], forloop);
		this.routine.setLabel(for_end);
		this.locals.pop();
	}

	compileSequence(sequence: Statement[]): void {
		var i: number, j: number, ref: number;
		for (i = j = 0, ref = sequence.length - 1; j <= ref; i = j += 1) {
			if (!sequence[i].nopop) {
				this.routine.POP(sequence[i]);
			}
			this.compile(sequence[i]);

			// OPTIMIZATION: Dead Code Elimination
			// Stop compiling after return, break, or continue statements
			if (
				sequence[i] instanceof Return ||
				sequence[i] instanceof Break ||
				sequence[i] instanceof Continue
			) {
				break;
			}
		}
	}

	/**
	 * Compile 'while' loop
	 *
	 * Generates bytecode for condition-based loops.
	 * Manages break/continue labels for control flow within the loop.
	 *
	 * @param {While} whiloop - The while loop AST node
	 */
	compileWhile(whiloop: While): void {
		var end: string,
			save_break: string | null,
			save_continue: string | null,
			start: string;
		this.locals.push();
		start = this.routine.createLabel("while_start");
		end = this.routine.createLabel("while_end");
		this.routine.LOAD_VALUE(0, whiloop);
		this.routine.setLabel(start);
		this.compile(whiloop.condition);
		this.routine.JUMPN(end);
		save_break = this.break_label;
		save_continue = this.continue_label;
		this.break_label = end;
		this.continue_label = start;
		this.compileSequence(whiloop.sequence);
		this.routine.JUMP(start, whiloop);
		this.break_label = save_break;
		this.continue_label = save_continue;
		this.routine.setLabel(end);
		this.locals.pop();
	}

	compileBreak(statement: Break): void {
		if (this.break_label != null) {
			this.routine.JUMP(this.break_label, statement);
		}
	}

	compileContinue(statement: Continue): void {
		if (this.continue_label != null) {
			this.routine.JUMP(this.continue_label, statement);
		}
	}

	compileFunction(func: Function): void {
		var r: Routine;
		r = this.compileFunctionBody(func);
		this.routine.LOAD_ROUTINE(r, func);
	}

	compileFunctionBody(func: Function | After | Every | Do): Routine {
		// Type guard to check if func has args property (only Function has it)
		const hasArgs = "args" in func && func.args != null;
		var a: any,
			args: number,
			i: number,
			index: number,
			j: number,
			k: number,
			l: number,
			label: string,
			len: number,
			locals: Locals,
			m: number,
			numargs: number,
			r: Routine,
			// ref: number, // unused
			ref1: number,
			ref2: number,
			ref3: any[],
			routine: Routine;
		routine = this.routine;
		locals = this.locals;
		this.routine = new Routine(hasArgs ? (func as Function).args.length : 0);
		this.locals = new Locals(this, locals);
		// local_index = this.locals.index; // unused
		this.routine.uses_arguments = true;
		if (hasArgs) {
			const funcArgs = (func as Function).args;
			if (this.routine.uses_arguments) {
				args = this.locals.register("arguments");
				this.routine.STORE_LOCAL(args, func);
				this.routine.POP(func);
			}
			numargs = this.locals.register("+numargs");
			this.routine.STORE_LOCAL(numargs, func);
			this.routine.POP(func);
			for (i = j = ref1 = funcArgs.length - 1; j >= 0; i = j += -1) {
				a = funcArgs[i];
				index = this.locals.register(a.name);
				this.routine.STORE_LOCAL(index, func);
				this.routine.POP(func);
			}
			for (i = k = 0, ref1 = funcArgs.length - 1; k <= ref1; i = k += 1) {
				a = funcArgs[i];
				if (a.default != null) {
					index = this.locals.get(a.name)!;
					label = this.routine.createLabel("default_arg");
					this.routine.LOAD_VALUE(i, func);
					this.routine.LOAD_LOCAL(numargs, func);
					this.routine.LT(func);
					this.routine.JUMPY(label, func);
					this.compile(a.default);
					this.routine.STORE_LOCAL(index, func);
					this.routine.POP(func);
					this.routine.setLabel(label);
				}
			}
		}
		if (func.sequence.length > 0) {
			for (i = l = 0, ref2 = func.sequence.length - 1; l <= ref2; i = l += 1) {
				this.compile(func.sequence[i]);
				if (i < func.sequence.length - 1) {
					this.routine.POP(func.sequence[i]);
				} else {
					this.routine.RETURN(func.sequence[i]);
				}
			}
		} else {
			this.routine.LOAD_VALUE(0, func);
			this.routine.RETURN(func);
		}
		if (hasArgs && !this.locals.arguments_used) {
			this.routine.uses_arguments = false;
			this.routine.remove(0);
			this.routine.remove(0);
		}
		index = 0;
		ref3 = this.locals.imports;
		for (m = 0, len = ref3.length; m < len; m++) {
			const imp = ref3[m];
			this.routine.OP_INSERT(OPCODES.LOAD_IMPORT, func, index, index * 3);
			this.routine.OP_INSERT(
				OPCODES.STORE_LOCAL,
				func,
				imp.index,
				index * 3 + 1,
			);
			this.routine.OP_INSERT(OPCODES.POP, func, 0, index * 3 + 2);
			this.routine.import_refs.push(imp.source);
			index += 1;
		}
		this.routine.optimize();
		this.routine.resolveLabels();
		this.count += this.routine.opcodes.length;
		r = this.routine;
		// console.info r.toString()
		this.routine.locals_size = this.locals.max_index;
		this.routine = routine;
		this.locals = locals;
		return r;
	}

	compileReturn(ret: Return): void {
		if (ret.expression != null) {
			this.compile(ret.expression);
			this.routine.RETURN(ret);
		} else {
			this.routine.LOAD_VALUE(0, ret);
			this.routine.RETURN(ret);
		}
	}

	compileCondition(condition: Condition): void {
		var c, chain, condition_end, condition_next, i, j, ref;
		chain = condition.chain;
		this.routine.LOAD_VALUE(0, condition);
		condition_end = this.routine.createLabel("condition_end");
		for (i = j = 0, ref = chain.length - 1; j <= ref; i = j += 1) {
			condition_next = this.routine.createLabel("condition_next");
			c = chain[i];
			c.condition.nowarning = true;
			this.compile(c.condition);
			this.routine.JUMPN(condition_next);
			this.locals.push();
			this.compileSequence(c.sequence);
			this.locals.pop();
			this.routine.JUMP(condition_end, condition);
			this.routine.setLabel(condition_next);
			if (i === chain.length - 1 && c.else != null) {
				this.locals.push();
				this.compileSequence(c.else);
				this.locals.pop();
			}
		}
		this.routine.setLabel(condition_end);
	}

	formatField(field: string | number): string {
		if (field === "constructor") {
			field = "_constructor";
		}
		return String(field).replace(/"/g, '\\"');
	}

	compileCreateObject(statement: CreateObject): void {
		let f: { field: string | number | null; value: Statement },
			j: number,
			len: number,
			ref: Array<{ field: string | number | null; value: Statement }>;
		this.routine.CREATE_OBJECT(statement);
		ref = statement.fields;
		for (j = 0, len = ref.length; j < len; j++) {
			f = ref[j];
			this.routine.LOAD_VALUE(f.field, statement);
			this.compile(f.value);
			this.routine.CREATE_PROPERTY(statement);
		}
	}

	compileCreateClass(statement: CreateClass): void {
		let f: { field: string | number; value: Statement },
			j: number,
			len: number,
			ref: Array<{ field: string | number; value: Statement }>,
			variable: string | number;
		if (statement.ext != null) {
			statement.ext.nowarning = true;
			this.compile(statement.ext);
		} else {
			this.routine.LOAD_VALUE(0, statement);
		}
		variable =
			statement.ext != null && statement.ext instanceof Variable
				? statement.ext.identifier
				: 0;
		this.routine.CREATE_CLASS(variable, statement);
		ref = statement.fields;
		for (j = 0, len = ref.length; j < len; j++) {
			f = ref[j];
			this.routine.LOAD_VALUE(f.field, statement);
			this.compile(f.value);
			this.routine.CREATE_PROPERTY(statement);
		}
	}

	compileUpdateClass(statement: CreateClass, variable: string): void {
		this.compileCreateClass(statement);
		this.routine.UPDATE_CLASS(variable, statement);
	}

	compileNewCall(statement: NewCall): void {
		let a: Statement,
			call: FunctionCall,
			i: number,
			j: number,
			len: number,
			ref: Statement[];
		call = statement.expression as FunctionCall;
		this.routine.LOAD_VALUE(0, statement); // reserve spot on stack for the class instance
		ref = call.args;
		for (i = j = 0, len = ref.length; j < len; i = ++j) {
			a = ref[i];
			this.compile(a);
		}
		this.compile(call.expression);
		this.routine.NEW_CALL(call.args.length, statement);
		this.routine.POP(statement); // pop return value of class constructor
	}

	compileAfter(after: After): void {
		let r: Routine;
		r = this.compileFunctionBody(after);
		this.routine.LOAD_ROUTINE(r, after);
		this.compile(after.delay);
		if (after.multiplier != null && after.multiplier !== 1) {
			this.routine.LOAD_VALUE(after.multiplier, after);
			this.routine.MUL(after);
		}
		this.routine.AFTER(after);
	}

	compileEvery(every: Every): void {
		let r: Routine;
		r = this.compileFunctionBody(every);
		this.routine.LOAD_ROUTINE(r, every);
		this.compile(every.delay);
		if (every.multiplier != null && every.multiplier !== 1) {
			this.routine.LOAD_VALUE(every.multiplier, every);
			this.routine.MUL(every);
		}
		this.routine.EVERY(every);
	}

	compileDo(dostuff: Do): void {
		let r: Routine;
		r = this.compileFunctionBody(dostuff);
		this.routine.LOAD_ROUTINE(r, dostuff);
		this.routine.DO(dostuff);
	}

	compileSleep(sleep: Sleep): void {
		this.compile(sleep.delay);
		if (sleep.multiplier != null && sleep.multiplier !== 1) {
			this.routine.LOAD_VALUE(sleep.multiplier, sleep);
			this.routine.MUL(sleep);
		}
		this.routine.SLEEP(sleep);
	}

	compileDelete(del: Delete): void {
		let chain: Statement[], i: number, j: number, ref: number;
		if (del.field instanceof Variable) {
			this.routine.LOAD_THIS(del);
			this.routine.LOAD_VALUE(del.field.identifier, del);
			this.routine.DELETE(del);
		} else if (del.field instanceof Field) {
			this.compile(del.field.expression);
			chain = del.field.chain;
			for (i = j = 0, ref = chain.length - 1; j <= ref; i = j += 1) {
				this.compile(chain[i]);
				if (i < chain.length - 1) {
					this.routine.LOAD_PROPERTY(del);
				}
			}
			this.routine.DELETE(del);
		} else {
			throw "Delete expects variable or field access";
		}
	}

	exec(context: any): any {
		if (!this.processor) {
			this.processor = new (globalThis as any).Processor();
		}
		if (!this.routine) {
			throw new Error("No routine to execute");
		}
		this.processor!.load(this.routine);
		return this.processor!.run(context);
	}

	static predefined_unary_functions: Record<string, (x: any) => number> = {
		round: Math.round,
		floor: Math.floor,
		ceil: Math.ceil,
		abs: Math.abs,
		sqrt: Math.sqrt,
		sin: Math.sin,
		cos: Math.cos,
		tan: Math.tan,
		acos: Math.acos,
		asin: Math.asin,
		atan: Math.atan,
		sind: (x: number) => Math.sin((x * Math.PI) / 180),
		cosd: (x: number) => Math.cos((x * Math.PI) / 180),
		tand: (x: number) => Math.tan((x * Math.PI) / 180),
		asind: (x: number) => (Math.asin(x) / Math.PI) * 180,
		acosd: (x: number) => (Math.acos(x) / Math.PI) * 180,
		atand: (x: number) => (Math.atan(x) / Math.PI) * 180,
		log: Math.log,
		exp: Math.exp,
	};

	static predefined_binary_functions: Record<
		string,
		(a: any, b: any) => number
	> = {
			min: Math.min,
			max: Math.max,
			pow: Math.pow,
			atan2: Math.atan2,
			atan2d: (y: number, x: number) => (Math.atan2(y, x) / Math.PI) * 180,
		};

	static predefined_values: Record<string, number> = {
		PI: Math.PI,
		true: 1,
		false: 0,
	};
}

/**
 * Locals - Manages local variable scopes and allocations
 */
export class Locals {
	compiler: Compiler;
	parent: Locals | null;
	layers: LocalLayer[];
	index: number;
	max_index: number;
	imports: Array<{ name: string; index: number; source: number }>;
	arguments_used?: boolean;

	constructor(compiler: Compiler, parent: Locals | null = null) {
		this.compiler = compiler;
		this.parent = parent;
		this.layers = [];
		this.index = 0;
		this.max_index = 0;
		this.imports = [];
		this.push();
	}

	increment(): number {
		const spot = this.index++;
		this.max_index = Math.max(this.index, this.max_index);
		return spot;
	}

	push(): number {
		return this.layers.push(new LocalLayer(this));
	}

	pop(): LocalLayer[] {
		// resetting the @index below was causing erasure of outer locals
		// when used after the block ; such reset is not needed
		//@index = @layers[@layers.length-1].start_index
		return this.layers.splice(this.layers.length - 1, 1);
	}

	register(name: string): number {
		return this.layers[this.layers.length - 1].register(name);
	}

	allocate(): number {
		return this.layers[this.layers.length - 1].allocate();
	}

	get(name: string): number | null {
		let i: number, index: number, j: number, v: number | null;
		if (name === "arguments") {
			this.arguments_used = true;
		}
		for (i = j = this.layers.length - 1; j >= 0; i = j -= 1) {
			v = this.layers[i].get(name);
			if (v != null) {
				return v;
			}
		}
		if (this.parent != null) {
			v = this.parent.get(name);
			if (v != null) {
				index = this.register(name);
				this.imports.push({
					name: name,
					index: index,
					source: v,
				});
				return index;
			}
		}
		return null;
	}
}

/**
 * LocalLayer - Represents a single scope layer for local variables
 */
export class LocalLayer {
	locals: Locals;
	start_index: number;
	registered: Record<string, number>;

	constructor(locals: Locals) {
		this.locals = locals;
		this.start_index = this.locals.index;
		this.registered = {};
	}

	register(name: string): number {
		return (this.registered[name] = this.locals.increment());
	}

	allocate(): number {
		return this.locals.increment();
	}

	get(name: string): number | null {
		if (this.registered[name] != null) {
			return this.registered[name];
		} else {
			return null;
		}
	}
}
