/**
 * Program - AST structures for LootiScript
 *
 * Abstract Syntax Tree node definitions for the language.
 */

import { Routine } from "./routine";
import type { Token } from "./token";

/**
 * Base class for all AST expressions
 */
export class Expression {
	nowarning?: boolean;
	nopop?: boolean;
	constructor() {}
}

/**
 * Type alias for all AST node types
 */
export type Statement =
	| Assignment
	| SelfAssignment
	| Value
	| Variable
	| Field
	| Operation
	| Negate
	| Not
	| Braced
	| Return
	| Condition
	| For
	| ForIn
	| While
	| Break
	| Continue
	| Function
	| FunctionCall
	| CreateObject
	| CreateClass
	| NewCall
	| After
	| Every
	| Do
	| Sleep
	| Delete;

/**
 * Main Program class containing all statements
 */
export class Program {
	statements: Statement[] = [];

	// Static references (will be assigned after class declarations)
	static Field: typeof Field;
	static Variable: typeof Variable;
	static Assignment: typeof Assignment;

	constructor() {
		this.statements = [];
	}

	add(statement: Statement): number {
		return this.statements.push(statement);
	}

	isAssignment(): boolean {
		return (
			this.statements.length > 0 &&
			this.statements[this.statements.length - 1] instanceof Assignment
		);
	}

	/**
	 * Convert value to string representation
	 */
	static toString(value: any, nesting: number = 0): string {
		let i: number;
		let key: string;
		let pref: string;
		let s: string;
		let v: any;

		if (value instanceof Routine) {
			if (nesting === 0) {
				return (value as any).source || "[function]";
			} else {
				return "[function]";
			}
		} else if (typeof value === "function") {
			return "[native function]";
		} else if (typeof value === "string") {
			return `"${value}"`;
		} else if (Array.isArray(value)) {
			if (nesting >= 1) {
				return "[list]";
			}
			s = "[";
			for (i = 0; i < value.length; i++) {
				v = value[i];
				s +=
					Program.toString(v, nesting + 1) + (i < value.length - 1 ? "," : "");
			}
			return s + "]";
		} else if (typeof value === "object" && value !== null) {
			if (nesting >= 1) {
				return "[object]";
			}
			s = "object\n";
			pref = "";
			for (i = 1; i <= nesting; i++) {
				pref += "  ";
			}
			for (key in value) {
				v = value[key];
				s += pref + `  ${key} = ${Program.toString(v, nesting + 1)}\n`;
			}
			return s + pref + "end";
		}
		return value || 0;
	}

	/**
	 * Operator precedence table
	 */
	static readonly Precedence: Record<string | number, number> = {
		"^": 21,
		"/": 20,
		"*": 19,
		"%": 18,
		"+": 17,
		"-": 17,
		"<": 16,
		"<=": 15,
		">": 14,
		">=": 13,
		"==": 12,
		"!=": 11,
		"<<": 10,
		">>": 9,
		"&": 8,
		"|": 7,
		and: 6,
		or: 5,
	};

	/**
	 * Create field access expression
	 */
	static CreateFieldAccess(
		token: Token,
		expression: Statement,
		field: Statement,
	): Field {
		if (expression instanceof Field) {
			expression.appendField(field);
			return expression;
		} else {
			return new Field(token, expression, [field]);
		}
	}

	/**
	 * Build operation tree from operators and terms
	 */
	static BuildOperations(
		ops: Array<{ token: Token; operation: string }>,
		terms: Statement[],
	): Operation {
		let i: number;
		let o: Operation;
		let o1: { token: Token; operation: string };
		let o2: { token: Token; operation: string };
		let t1: Statement;
		let t2: Statement;

		while (ops.length > 1) {
			i = 0;
			while (i < ops.length - 1) {
				o1 = ops[i];
				o2 = ops[i + 1];
				if (
					Program.Precedence[o2.operation] <= Program.Precedence[o1.operation]
				) {
					break;
				}
				i++;
			}
			t1 = terms[i];
			t2 = terms[i + 1];
			o = new Operation(ops[i].token, ops[i].operation, t1, t2);
			terms.splice(i, 2, o);
			ops.splice(i, 1);
		}
		return new Operation(ops[0].token, ops[0].operation, terms[0], terms[1]);
	}
}

/**
 * Assignment statement
 */
export class Assignment extends Expression {
	token: Token;
	field: Statement | null;
	expression: Statement;
	local: boolean;

	constructor(
		token: Token,
		field: Statement | null,
		expression: Statement,
		local: boolean,
	) {
		super();
		this.token = token;
		this.field = field;
		this.expression = expression;
		this.local = local;
	}
}

/**
 * Self-assignment statement (e.g., +=, -=)
 */
export class SelfAssignment extends Expression {
	token: Token;
	field: Statement | null;
	operation: string;
	expression: Statement;

	constructor(
		token: Token,
		field: Statement | null,
		operation: string,
		expression: Statement,
	) {
		super();
		this.token = token;
		this.field = field;
		this.operation = operation;
		this.expression = expression;
	}
}

/**
 * Value literal (number, string, array, object, function, class)
 */
export class Value extends Expression {
	token: Token;
	type: number;
	value: any;

	static readonly TYPE_NUMBER = 1;
	static readonly TYPE_STRING = 2;
	static readonly TYPE_ARRAY = 3;
	static readonly TYPE_OBJECT = 4;
	static readonly TYPE_FUNCTION = 5;
	static readonly TYPE_CLASS = 6;

	constructor(token: Token, type: number, value: any) {
		super();
		this.token = token;
		this.type = type;
		this.value = value;
	}
}

/**
 * Variable reference
 */
export class Variable extends Expression {
	token: Token;
	identifier: string;

	constructor(token: Token, identifier: string) {
		super();
		this.token = token;
		this.identifier = identifier;
	}
}

/**
 * Field/property access
 */
export class Field extends Expression {
	token: Token;
	expression: Statement;
	chain: Statement[];

	constructor(token: Token, expression: Statement, chain: Statement[]) {
		super();
		this.token = token;
		this.expression = expression;
		this.chain = chain;
		this.token =
			expression instanceof Expression ? (expression as any).token : token;
	}

	appendField(field: Statement): number {
		return this.chain.push(field);
	}
}

/**
 * Binary operation
 */
export class Operation extends Expression {
	token: Token;
	operation: string;
	term1: Statement;
	term2: Statement;

	constructor(
		token: Token,
		operation: string,
		term1: Statement,
		term2: Statement,
	) {
		super();
		this.token = token;
		this.operation = operation;
		this.term1 = term1;
		this.term2 = term2;
	}
}

/**
 * Negate operation (-expression)
 */
export class Negate extends Expression {
	token: Token;
	expression: Statement;

	constructor(token: Token, expression: Statement) {
		super();
		this.token = token;
		this.expression = expression;
	}
}

/**
 * Not operation (not expression)
 */
export class Not extends Expression {
	token: Token;
	expression: Statement;

	constructor(token: Token, expression: Statement) {
		super();
		this.token = token;
		this.expression = expression;
	}
}

/**
 * Braced expression ((expression))
 */
export class Braced extends Expression {
	token: Token;
	expression: Statement;

	constructor(token: Token, expression: Statement) {
		super();
		this.token = token;
		this.expression = expression;
	}
}

/**
 * Return statement
 */
export class Return extends Expression {
	token: Token;
	expression: Statement | null;

	constructor(token: Token, expression: Statement | null) {
		super();
		this.token = token;
		this.expression = expression;
	}
}

/**
 * Conditional statement chain (if-then-else-elsif)
 */
export class Condition extends Expression {
	token: Token;
	chain: Array<{
		condition: Statement;
		sequence: Statement[];
		else?: Statement[];
	}>;

	constructor(
		token: Token,
		chain: Array<{
			condition: Statement;
			sequence: Statement[];
			else?: Statement[];
		}>,
	) {
		super();
		this.token = token;
		this.chain = chain;
	}
}

/**
 * For loop statement
 */
export class For extends Expression {
	token: Token;
	iterator: string;
	range_from: Statement;
	range_to: Statement;
	range_by: Statement | null;
	sequence: Statement[];

	constructor(
		token: Token,
		iterator: string,
		range_from: Statement,
		range_to: Statement,
		range_by: Statement | null,
		sequence: Statement[],
	) {
		super();
		this.token = token;
		this.iterator = iterator;
		this.range_from = range_from;
		this.range_to = range_to;
		this.range_by = range_by;
		this.sequence = sequence;
	}
}

/**
 * For-in loop statement
 */
export class ForIn extends Expression {
	token: Token;
	iterator: string;
	list: Statement;
	sequence: Statement[];

	constructor(
		token: Token,
		iterator: string,
		list: Statement,
		sequence: Statement[],
	) {
		super();
		this.token = token;
		this.iterator = iterator;
		this.list = list;
		this.sequence = sequence;
	}
}

/**
 * While loop statement
 */
export class While extends Expression {
	token: Token;
	condition: Statement;
	sequence: Statement[];

	constructor(token: Token, condition: Statement, sequence: Statement[]) {
		super();
		this.token = token;
		this.condition = condition;
		this.sequence = sequence;
	}
}

/**
 * Break statement
 */
export class Break extends Expression {
	token: Token;
	nopop: boolean = true;

	constructor(token: Token) {
		super();
		this.token = token;
		this.nopop = true;
	}
}

/**
 * Continue statement
 */
export class Continue extends Expression {
	token: Token;
	nopop: boolean = true;

	constructor(token: Token) {
		super();
		this.token = token;
		this.nopop = true;
	}
}

/**
 * Function argument with optional default value
 */
export interface FunctionArg {
	name: string;
	default?: Statement;
}

/**
 * Function definition
 */
export class Function extends Expression {
	token: Token;
	args: FunctionArg[];
	sequence: Statement[];
	source: string;

	constructor(
		token: Token,
		args: FunctionArg[],
		sequence: Statement[],
		end: Token,
	) {
		super();
		this.token = token;
		this.args = args;
		this.sequence = sequence;
		this.source =
			"function" + token.tokenizer.input.substring(token.index, end.index + 2);
	}
}

/**
 * Function call
 */
export class FunctionCall extends Expression {
	token: Token;
	expression: Statement;
	args: Statement[];

	constructor(token: Token, expression: Statement, args: Statement[]) {
		super();
		this.token = token;
		this.expression = expression;
		this.args = args;
	}
}

/**
 * Object literal creation
 */
export class CreateObject extends Expression {
	token: Token;
	fields: Array<{ field: string | number | null; value: Statement }>;

	constructor(
		token: Token,
		fields: Array<{ field: string | number | null; value: Statement }>,
	) {
		super();
		this.token = token;
		this.fields = fields;
	}
}

/**
 * Class definition
 */
export class CreateClass extends Expression {
	token: Token;
	ext: Statement | null;
	fields: Array<{ field: string | number; value: Statement }>;

	constructor(
		token: Token,
		ext: Statement | null,
		fields: Array<{ field: string | number; value: Statement }>,
	) {
		super();
		this.token = token;
		this.ext = ext;
		this.fields = fields;
	}
}

/**
 * New call (constructor invocation)
 */
export class NewCall extends Expression {
	token: Token;
	expression: Statement;

	constructor(token: Token, expression: Statement) {
		super();
		this.token = token;
		this.expression = expression;
		if (!(this.expression instanceof FunctionCall)) {
			this.expression = new FunctionCall(this.token, this.expression, []);
		}
	}
}

/**
 * After statement (delayed execution)
 */
export class After extends Expression {
	token: Token;
	delay: Statement;
	sequence: Statement[];
	multiplier: number | null;
	source: string;

	constructor(
		token: Token,
		delay: Statement,
		sequence: Statement[],
		end: Token,
		multiplier: number | null,
	) {
		super();
		this.token = token;
		this.delay = delay;
		this.sequence = sequence;
		this.multiplier = multiplier;
		this.source =
			"after " + token.tokenizer.input.substring(token.index, end.index + 2);
	}
}

/**
 * Every statement (periodic execution)
 */
export class Every extends Expression {
	token: Token;
	delay: Statement;
	sequence: Statement[];
	multiplier: number | null;
	source: string;

	constructor(
		token: Token,
		delay: Statement,
		sequence: Statement[],
		end: Token,
		multiplier: number | null,
	) {
		super();
		this.token = token;
		this.delay = delay;
		this.sequence = sequence;
		this.multiplier = multiplier;
		this.source =
			"every " + token.tokenizer.input.substring(token.index, end.index + 2);
	}
}

/**
 * Do statement (immediate async execution)
 */
export class Do extends Expression {
	token: Token;
	sequence: Statement[];
	source: string;

	constructor(token: Token, sequence: Statement[], end: Token) {
		super();
		this.token = token;
		this.sequence = sequence;
		this.source =
			"do " + token.tokenizer.input.substring(token.index, end.index + 2);
	}
}

/**
 * Sleep statement
 */
export class Sleep extends Expression {
	token: Token;
	delay: Statement;
	multiplier: number | null;

	constructor(token: Token, delay: Statement, multiplier: number | null) {
		super();
		this.token = token;
		this.delay = delay;
		this.multiplier = multiplier;
	}
}

/**
 * Delete statement
 */
export class Delete extends Expression {
	token: Token;
	field: Statement;

	constructor(token: Token, field: Statement) {
		super();
		this.token = token;
		this.field = field;
	}
}

// Static references - placed at end to avoid "used before declaration" errors
Program.Field = Field;
Program.Variable = Variable;
Program.Assignment = Assignment;
