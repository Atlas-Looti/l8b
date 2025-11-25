/**
 * Parser - Parser for LootiScript
 *
 * Transforms tokens into an Abstract Syntax Tree (AST).
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
	type FunctionArg,
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
} from "./program";
import { Token } from "./token";
import { Tokenizer } from "./tokenizer";
import {
	SyntaxError as LootiSyntaxError,
	formatSourceContext,
	ErrorCode,
} from "./error-handler";

/**
 * Parser for LootiScript
 * Converts tokens into AST structures
 */
export class Parser {
	input: string;
	filename: string;
	tokenizer: Tokenizer;
	program: Program;
	current_block: Statement[];
	current: Token;
	verbose: boolean;
	nesting: number;
	object_nesting: number;
	not_terminated: Token[];
	// Track function names and their start locations for better error messages
	function_stack: Array<{
		name: string;
		line: number;
		column: number;
		token: Token;
	}>;
	api_reserved: Record<string, boolean>;
	warnings: Array<{
		type: string;
		identifier?: string;
		line: number;
		column: number;
	}>;
	unexpected_eof?: boolean;
	error_info?: {
		error: string;
		line: number;
		column: number;
		context?: string;
		code?: string;
		suggestions?: string[];
		related?: {
			file: string;
			line: number;
			column: number;
			message: string;
		};
	};
	last_function_call?: FunctionCall;
	static multipliers: Record<string, number> = {
		millisecond: 1,
		milliseconds: 1,
		second: 1000,
		seconds: 1000,
		minute: 60000,
		minutes: 60000,
		hour: 60000 * 60,
		hours: 60000 * 60,
		day: 60000 * 60 * 24,
		days: 60000 * 60 * 24,
	};

	constructor(input: string, filename: string = "") {
		this.input = input;
		this.filename = filename;
		if (/^\s*\/\/\s*javascript\s*\n/.test(this.input)) {
			this.input =
				'system.javascript("""\n\n' +
				this.input.replace(/\\/g, "\\\\") +
				'\n\n""")';
		}
		this.tokenizer = new Tokenizer(this.input, this.filename);
		this.program = new Program();
		this.current_block = [];
		// Initialize with a dummy token (will be replaced by first nextToken call)
		this.current = {
			line: 1,
			column: 1,
			tokenizer: this.tokenizer,
			type: 0,
			value: "",
			start: 0,
			length: 0,
			index: 0,
			is_binary_operator: false,
		} as Token;
		this.verbose = false;
		this.nesting = 0;
		this.object_nesting = 0;
		this.not_terminated = [];
		this.function_stack = [];
		this.api_reserved = {
			screen: true,
			audio: true,
			keyboard: true,
			gamepad: true,
			sprites: true,
			sounds: true,
			music: true,
			assets: true,
			asset_manager: true,
			maps: true,
			touch: true,
			mouse: true,
			fonts: true,
			Sound: true,
			Image: true,
			Sprite: true,
			Map: true,
			system: true,
			storage: true,
			print: true,
			random: true,
			Function: true,
			List: true,
			Object: true,
			String: true,
			Number: true,
			scenes: true,
			scene: true,
			route: true,
			router: true,
		};
		this.warnings = [];
	}

	nextToken(): Token {
		const token = this.tokenizer.next();
		if (token == null) {
			this.unexpected_eof = true;
			throw "Unexpected end of file";
		}
		return (this.current = token);
	}

	nextTokenOptional(): Token | null {
		const token = this.tokenizer.next();
		if (token != null) {
			this.current = token;
		}
		return token;
	}

	parse(): Parser | { error: string; line: number; column: number } {
		let err: any;
		let expression: Statement | null;
		let nt: Token;
		let token: Token | null;
		try {
			this.warnings = [];
			while (true) {
				expression = this.parseLine();
				if (expression == null && !this.tokenizer.finished()) {
					token = this.tokenizer.next();
					if (token != null && token.reserved_keyword) {
						if (token.value === "end") {
							// Enhanced error for too many 'end'
							const context = formatSourceContext(
								this.input,
								token.line,
								token.column,
								3,
								3, // "end" length
							);
							const suggestions = [
								"Remove this extra 'end' statement",
								"Check if you're missing an opening statement (if, for, while, function)",
								"Verify all blocks are properly matched",
							];
							return (this.error_info = {
								error:
									"Too many 'end' statements - no matching opening statement found",
								line: token.line,
								column: token.column,
								context: context,
								code: ErrorCode.E1002,
								suggestions: suggestions,
							}) as any;
						} else {
							this.error(`Misuse of reserved keyword: '${token.value}'`);
						}
					} else {
						this.error("Unexpected data");
					}
				}
				if (expression === null) {
					break;
				}
				this.current_block.push(expression);
				this.program.add(expression);
				if (this.verbose) {
					console.info(expression);
				}
			}
			return this;
		} catch (error1) {
			err = error1;

			// Handle LootiSyntaxError (already formatted)
			if (err instanceof LootiSyntaxError) {
				return (this.error_info = {
					error: err.message,
					line: err.line,
					column: err.column,
					context: err.context,
				}) as any;
			}

			if (this.not_terminated.length > 0 && err === "Unexpected end of file") {
				nt = this.not_terminated[this.not_terminated.length - 1];

				// Try to get function name if this is a function
				let functionName: string | null = null;
				let functionStartLine: number | null = null;
				let functionStartColumn: number | null = null;

				if (nt.value === "function") {
					// Look for function name in function_stack
					for (let i = this.function_stack.length - 1; i >= 0; i--) {
						const func = this.function_stack[i];
						if (func.token === nt) {
							functionName = func.name;
							functionStartLine = func.line;
							functionStartColumn = func.column;
							break;
						}
					}
				}

				const errorLength = typeof nt.value === "string" ? nt.value.length : 1;
				const context = formatSourceContext(
					nt.tokenizer.input,
					nt.line,
					nt.column,
					3,
					errorLength,
				);

				// Build enhanced error message
				let errorMessage: string;
				let suggestions: string[] = [];
				let related: any = undefined;

				if (nt.value === "function" && functionName) {
					errorMessage = `Function '${functionName}' started at line ${functionStartLine} is not closed`;
					suggestions = [
						`Add 'end' after the last statement to close function '${functionName}'`,
						`Check if you have an extra 'end' statement somewhere`,
						`Verify all nested blocks (if, for, while) are properly closed`,
					];
					related = {
						file: this.filename,
						line: functionStartLine!,
						column: functionStartColumn!,
						message: `Function '${functionName}' started here`,
					};
				} else {
					errorMessage = `Unterminated '${nt.value}' ; no matching 'end' found`;
					suggestions = [
						`Add 'end' to close the '${nt.value}' statement`,
						`Check if you have nested blocks that need to be closed first`,
					];
				}

				return (this.error_info = {
					error: errorMessage,
					line: nt.line,
					column: nt.column,
					context: context,
					code: ErrorCode.E1001,
					suggestions: suggestions,
					related: related,
				}) as any;
			} else {
				// Enhanced error with context for other errors
				const context = formatSourceContext(
					this.input,
					this.current.line,
					this.current.column,
					3,
					1,
				);
				return (this.error_info = {
					error: typeof err === "string" ? err : err.message || String(err),
					line: this.current.line,
					column: this.current.column,
					context: context,
					code: ErrorCode.E1004,
				}) as any;
			}
		}
	}

	parseLine(): Statement | null {
		const token = this.nextTokenOptional();
		if (token == null) {
			return null;
		}
		switch (token.type) {
			case Token.TYPE_RETURN:
				return new Return(token, this.parseExpression());
			case Token.TYPE_BREAK:
				return new Break(token);
			case Token.TYPE_CONTINUE:
				return new Continue(token);
			case Token.TYPE_LOCAL:
				return this.parseLocalAssignment(token);
			default:
				this.tokenizer.pushBack(token);
				return this.parseExpression();
		}
	}

	parseExpression(
		filter?: string | null,
		first_function_call: boolean = false,
	): Statement | null {
		let access: Statement | null;
		let expression: Statement | null;
		expression = this.parseExpressionStart();
		if (expression == null) {
			return null;
		}
		while (true) {
			access = this.parseExpressionSuffix(expression, filter);
			if (access == null) {
				return expression;
			}
			if (first_function_call && access instanceof FunctionCall) {
				return access;
			}
			expression = access;
		}
	}

	assertExpression(
		filter?: string | null,
		first_function_call: boolean = false,
	): Statement {
		const exp = this.parseExpression(filter, first_function_call);
		if (exp == null) {
			throw "Expression expected";
		}
		return exp;
	}

	parseExpressionSuffix(
		expression: Statement,
		filter?: string | null,
	): Statement | null {
		let field: Statement;
		let identifier: Token;
		const token = this.nextTokenOptional();
		if (token == null) {
			return filter === "self" ? expression : null;
		}
		switch (token.type) {
			case Token.TYPE_DOT:
				if (
					expression instanceof Value &&
					expression.type === Value.TYPE_NUMBER
				) {
					this.tokenizer.pushBack(token);
					return null;
				} else {
					this.tokenizer.changeNumberToIdentifier();
					identifier = this.assertBroadIdentifier("Expected identifier");
					return Program.CreateFieldAccess(
						token,
						expression,
						new Value(
							identifier,
							Value.TYPE_STRING,
							identifier.value as string,
						),
					);
				}
				break;
			case Token.TYPE_OPEN_BRACKET:
				field = this.assertExpression();
				this.assert(Token.TYPE_CLOSED_BRACKET, "Expected ']'");
				return Program.CreateFieldAccess(token, expression, field);
			case Token.TYPE_OPEN_BRACE:
				return this.parseFunctionCall(token, expression);
			case Token.TYPE_EQUALS:
				return this.parseAssignment(token, expression);
			case Token.TYPE_PLUS_EQUALS:
				return this.parseSelfAssignment(token, expression, token.type);
			case Token.TYPE_MINUS_EQUALS:
				return this.parseSelfAssignment(token, expression, token.type);
			case Token.TYPE_MULTIPLY_EQUALS:
				return this.parseSelfAssignment(token, expression, token.type);
			case Token.TYPE_DIVIDE_EQUALS:
				return this.parseSelfAssignment(token, expression, token.type);
			case Token.TYPE_MODULO_EQUALS:
			case Token.TYPE_AND_EQUALS:
			case Token.TYPE_OR_EQUALS:
				return this.parseSelfAssignment(token, expression, token.type);
			default:
				if (filter === "self") {
					this.tokenizer.pushBack(token);
					return expression;
				} else if (token.is_binary_operator && filter !== "noop") {
					return this.parseBinaryOperation(token, expression);
				} else {
					this.tokenizer.pushBack(token);
					return null;
				}
		}
	}

	parseExpressionStart(): Statement | null {
		let next: Token;
		const token = this.nextTokenOptional();
		if (token == null) {
			return null;
		}
		switch (token.type) {
			case Token.TYPE_IDENTIFIER: // variable name
				return new Variable(token, token.value as string);
			case Token.TYPE_NUMBER:
				return this.parseNumberExpression(token);
			case Token.TYPE_PLUS:
				return this.assertExpression();
			case Token.TYPE_MINUS:
				return this.parseExpressionSuffix(
					new Negate(token, this.assertExpression("noop")),
					"self",
				);
			case Token.TYPE_NOT:
				return this.parseExpressionSuffix(
					new Not(token, this.assertExpression("noop")),
					"self",
				);
			case Token.TYPE_STRING:
				return this.parseStringExpression(token);
			case Token.TYPE_TEMPLATE:
				return this.parseTemplate(token);
			case Token.TYPE_IF:
				return this.parseIf(token);
			case Token.TYPE_FOR:
				return this.parseFor(token);
			case Token.TYPE_WHILE:
				return this.parseWhile(token);
			case Token.TYPE_OPEN_BRACE:
				return this.parseBracedExpression(token);
			case Token.TYPE_OPEN_BRACKET:
				return this.parseArray(token);
			case Token.TYPE_FUNCTION:
				return this.parseFunction(token);
			case Token.TYPE_OBJECT:
				return this.parseObject(token);
			case Token.TYPE_CLASS:
				return this.parseClass(token);
			case Token.TYPE_NEW:
				return this.parseNew(token);
			case Token.TYPE_DOT:
				next = this.assert(Token.TYPE_NUMBER, "malformed number");
				if (!Number.isInteger(next.value as number)) {
					throw "malformed number";
				}
				return new Value(
					token,
					Value.TYPE_NUMBER,
					Number.parseFloat(`.${next.string_value}`),
				);
			case Token.TYPE_AFTER:
				return this.parseAfter(token);
			case Token.TYPE_EVERY:
				return this.parseEvery(token);
			case Token.TYPE_DO:
				return this.parseDo(token);
			case Token.TYPE_SLEEP:
				return this.parseSleep(token);
			case Token.TYPE_DELETE:
				return this.parseDelete(token);
			default:
				this.tokenizer.pushBack(token);
				return null;
		}
	}

	parseNumberExpression(number: Token): Value {
		return new Value(number, Value.TYPE_NUMBER, number.value as number);
	}

	parseStringExpression(string: Token): Value {
		const token = this.nextTokenOptional();
		if (token != null) {
			this.tokenizer.pushBack(token);
		}
		return new Value(string, Value.TYPE_STRING, string.value as string);
	}

	parseArray(bracket: Token): Value {
		const res: Statement[] = [];
		while (true) {
			const token = this.nextToken();
			if (token.type === Token.TYPE_CLOSED_BRACKET) {
				return new Value(bracket, Value.TYPE_ARRAY, res);
			} else if (token.type === Token.TYPE_COMMA) {
				// Skip comma
			} else {
				this.tokenizer.pushBack(token);
				res.push(this.assertExpression());
			}
		}
	}

	parseBinaryOperation(operation: Token, term1: Statement): Statement {
		const ops: Array<{ token: Token; operation: string }> = [
			{ token: operation, operation: operation.value as string },
		];
		const terms: Statement[] = [term1];
		terms.push(this.assertExpression("noop"));
		while (true) {
			const token = this.nextTokenOptional();
			if (token == null) {
				break;
			}
			if (!token.is_binary_operator) {
				this.tokenizer.pushBack(token);
				break;
			}
			ops.push({ token: token, operation: token.value as string });
			terms.push(this.assertExpression("noop"));
		}
		return Program.BuildOperations(ops, terms);
	}

	parseAssignment(token: Token, expression: Statement): Assignment {
		let res: Assignment;
		if (!(expression instanceof Variable || expression instanceof Field)) {
			throw "Expected variable identifier or property";
		}
		if (
			this.object_nesting === 0 &&
			expression instanceof Variable &&
			this.api_reserved[expression.identifier]
		) {
			this.warnings.push({
				type: "assigning_api_variable",
				identifier: expression.identifier,
				line: token.line,
				column: token.column,
			});
		}

		// Peek ahead to see if we're assigning a function
		const peekToken = this.tokenizer.peek();
		let functionName: string | null = null;

		if (expression instanceof Variable) {
			functionName = expression.identifier;
		}

		// If next token is 'function', we're assigning a named function
		// Store the function name so parseFunction can use it
		if (peekToken && peekToken.type === Token.TYPE_FUNCTION && functionName) {
			// We'll update function_stack in parseFunction after it's created
		}

		const assignedValue = this.assertExpression();

		// If assigned value is a function and we have a name, update function_stack
		// Find the most recently added function (should be the one we just parsed)
		if (
			assignedValue instanceof Function &&
			functionName &&
			this.function_stack.length > 0
		) {
			// Find function that matches the function token
			const funcToken = (assignedValue as any).token;
			for (let i = this.function_stack.length - 1; i >= 0; i--) {
				const func = this.function_stack[i];
				if (func.token === funcToken && func.name === "anonymous") {
					func.name = functionName;
					break;
				}
			}
		}

		if (expression instanceof Field) {
			this.object_nesting += 1;
			res = new Assignment(token, expression, assignedValue, false);
			this.object_nesting -= 1;
		} else {
			res = new Assignment(token, expression, assignedValue, false);
		}
		return res;
	}

	parseSelfAssignment(
		token: Token,
		expression: Statement,
		operation: number,
	): SelfAssignment {
		if (!(expression instanceof Variable || expression instanceof Field)) {
			throw "Expected variable identifier or property";
		}
		// Convert operation type number to string representation
		let opStr: string;
		if (operation === Token.TYPE_PLUS_EQUALS) {
			opStr = "+=";
		} else if (operation === Token.TYPE_MINUS_EQUALS) {
			opStr = "-=";
		} else if (operation === Token.TYPE_MULTIPLY_EQUALS) {
			opStr = "*=";
		} else if (operation === Token.TYPE_DIVIDE_EQUALS) {
			opStr = "/=";
		} else if (operation === Token.TYPE_MODULO_EQUALS) {
			opStr = "%=";
		} else if (operation === Token.TYPE_AND_EQUALS) {
			opStr = "&=";
		} else if (operation === Token.TYPE_OR_EQUALS) {
			opStr = "|=";
		} else {
			opStr = String(operation);
		}
		return new SelfAssignment(
			token,
			expression,
			opStr,
			this.assertExpression(),
		);
	}

	parseLocalAssignment(local: Token): Assignment {
		const identifier = this.assert(
			Token.TYPE_IDENTIFIER,
			"Expected identifier",
		);
		this.parseOptionalType();
		this.assert(Token.TYPE_EQUALS, "Expected '='");
		return new Assignment(
			local,
			new Variable(identifier, identifier.value as string),
			this.assertExpression(),
			true,
		);
	}

	parseBracedExpression(open: Token): Statement {
		// Check for empty arrow function () => ...
		if (this.current.type === Token.TYPE_CLOSED_BRACE) {
			const close = this.nextToken(); // consume )
			const next = this.nextToken();
			if (next.type === Token.TYPE_ARROW) {
				return this.parseArrowFunction(next, []);
			}
			this.tokenizer.pushBack(next);
			this.current = close;
			return this.error("Unexpected ')'") as Statement;
		}

		const expression = this.assertExpression();
		this.parseOptionalType();
		const token = this.nextToken();

		// Check for single arg arrow function (arg) => ...
		if (token.type === Token.TYPE_CLOSED_BRACE) {
			const next = this.nextToken();
			if (next.type === Token.TYPE_ARROW) {
				return this.parseArrowFunction(next, [expression]);
			}
			this.tokenizer.pushBack(next);
			this.current = token;
			return new Braced(open, expression);
		}
		// Check for multi arg arrow function (arg1, arg2) => ...
		else if (token.type === Token.TYPE_COMMA) {
			const args: Statement[] = [expression];
			while (true) {
				args.push(this.assertExpression());
				this.parseOptionalType();
				const next = this.nextToken();
				if (next.type === Token.TYPE_CLOSED_BRACE) {
					break;
				} else if (next.type !== Token.TYPE_COMMA) {
					return this.error("Expected ',' or ')'") as Statement;
				}
			}
			const arrow = this.nextToken();
			if (arrow.type === Token.TYPE_ARROW) {
				return this.parseArrowFunction(arrow, args);
			}
			return this.error("Expected '=>' after parameter list") as Statement;
		} else {
			return this.error("missing closing parenthese") as Braced;
		}
	}
	parseArrowFunction(arrow: Token, args: Statement[]): Function {
		const funcArgs: FunctionArg[] = [];
		for (const arg of args) {
			if (arg instanceof Variable) {
				// Check for type annotation if the variable was parsed with one?
				// Actually, parseExpression doesn't parse types.
				// So (x: int) => ... would fail in parseExpression because : is unexpected.
				// We need to handle types inside parseBracedExpression or here?
				// If we use (x: int), parseExpression stops at :?
				// No, parseExpression expects operators. : is not an operator.
				// So parseExpression returns 'x', and next token is ':'.
				// We need to handle that here!

				funcArgs.push({ name: arg.identifier, default: undefined });
			} else {
				throw this.error("Invalid argument in arrow function");
			}
		}

		const sequence: Statement[] = [];
		// Parse single statement/expression body
		const body = this.parseLine();
		if (body) {
			// If it's an expression (not a control flow statement), wrap in Return
			if (
				body instanceof Value ||
				body instanceof Variable ||
				body instanceof Operation ||
				body instanceof FunctionCall ||
				body instanceof Assignment ||
				body instanceof Braced
			) {
				sequence.push(new Return(arrow, body));
			} else {
				sequence.push(body);
			}
		}

		return new Function(arrow, funcArgs, sequence, arrow);
	}

	parseFunctionCall(brace_token: Token, expression: Statement): FunctionCall {
		const args: Statement[] = [];
		this.last_function_call = new FunctionCall(brace_token, expression, args);
		while (true) {
			const token = this.nextTokenOptional();
			if (token == null) {
				return this.error("missing closing parenthese") as FunctionCall;
			} else if (token.type === Token.TYPE_CLOSED_BRACE) {
				return new FunctionCall(token, expression, args);
			} else if (token.type === Token.TYPE_COMMA) {
				// Skip comma
			} else {
				this.tokenizer.pushBack(token);
				args.push(this.assertExpression());
			}
		}
	}

	addTerminable(token: Token): number {
		return this.not_terminated.push(token);
	}

	endTerminable(): void {
		if (this.not_terminated.length > 0) {
			this.not_terminated.splice(this.not_terminated.length - 1, 1);
		}
	}

	parseFunction(funk: Token): Function {
		let line: Statement | null;
		const args = this.parseFunctionArgs();
		const sequence: Statement[] = [];
		this.nesting += 1;

		// Track this function (name will be set later if it's an assignment)
		const funcInfo = {
			name: "anonymous",
			line: funk.line,
			column: funk.column,
			token: funk,
		};
		this.function_stack.push(funcInfo);
		this.addTerminable(funk);

		try {
			while (true) {
				const token = this.nextToken();
				if (token.type === Token.TYPE_END) {
					this.nesting -= 1;
					this.endTerminable();
					this.function_stack.pop();
					return new Function(funk, args, sequence, token);
				} else {
					this.tokenizer.pushBack(token);
					line = this.parseLine();
					if (line != null) {
						sequence.push(line);
					} else {
						this.error("Unexpected data while parsing function");
					}
				}
			}
		} catch (error) {
			// Remove from stack on error
			if (
				this.function_stack.length > 0 &&
				this.function_stack[this.function_stack.length - 1].token === funk
			) {
				this.function_stack.pop();
			}
			throw error;
		}
	}

	parseFunctionArgs(): FunctionArg[] {
		const args: FunctionArg[] = [];
		let last: string | null = null;
		let token = this.nextToken();
		if (token.type !== Token.TYPE_OPEN_BRACE) {
			return this.error("Expected opening parenthese") as FunctionArg[];
		}
		while (true) {
			token = this.nextToken();
			if (token.type === Token.TYPE_CLOSED_BRACE) {
				return args;
			} else if (token.type === Token.TYPE_COMMA) {
				last = null;
			} else if (token.type === Token.TYPE_EQUALS && last === "argument") {
				// Set default value for the last argument
				const defaultExpr = this.assertExpression();
				if (args.length > 0) {
					args[args.length - 1].default = defaultExpr;
				}
			} else if (token.type === Token.TYPE_IDENTIFIER) {
				last = "argument";
				args.push({
					name: token.value as string,
				});
				this.parseOptionalType();
			} else {
				return this.error("Unexpected token") as FunctionArg[];
			}
		}
	}

	warningAssignmentCondition(expression: Statement): void {
		if (expression instanceof Assignment) {
			this.warnings.push({
				type: "assignment_as_condition",
				line: expression.token.line,
				column: expression.token.column,
			});
		}
	}

	parseIf(iftoken: Token): Condition {
		let line: Statement;
		let token: Token;
		const chain: Array<{
			condition: Statement;
			sequence: Statement[];
			else?: Statement[];
		}> = [];
		let current: {
			condition: Statement;
			sequence: Statement[];
			else?: Statement[];
		} = {
			condition: this.assertExpression(),
			sequence: [],
		};
		this.addTerminable(iftoken);
		this.warningAssignmentCondition(current.condition);
		token = this.nextToken();
		if (token.type !== Token.TYPE_THEN) {
			return this.error("Expected 'then'") as Condition;
		}
		while (true) {
			token = this.nextToken();
			if (token.type === Token.TYPE_ELSIF) {
				chain.push(current);
				current = {
					condition: this.assertExpression(),
					sequence: [],
				};
				this.warningAssignmentCondition(current.condition);
				this.assert(Token.TYPE_THEN, "Expected 'then'");
			} else if (token.type === Token.TYPE_ELSE) {
				current.else = [];
			} else if (token.type === Token.TYPE_END) {
				chain.push(current);
				this.endTerminable();
				return new Condition(iftoken, chain);
			} else {
				this.tokenizer.pushBack(token);
				const parsedLine = this.parseLine();
				if (parsedLine == null) {
					throw Error("Unexpected data while parsing if");
				}
				line = parsedLine;
				if (current.else != null) {
					current.else.push(line);
				} else {
					current.sequence.push(line);
				}
			}
		}
	}

	assert(type: number, error: string): Token {
		const token = this.nextToken();
		if (token.type !== type) {
			throw error;
		}
		return token;
	}

	assertBroadIdentifier(error: string): Token {
		const token = this.nextToken();
		if (token.type !== Token.TYPE_IDENTIFIER && token.reserved_keyword) {
			token.type = Token.TYPE_IDENTIFIER;
		}
		if (token.type !== Token.TYPE_IDENTIFIER) {
			throw error;
		}
		return token;
	}

	/**
	 * Throw enhanced error with source context
	 */
	error(text: string): never {
		const token = this.current;
		const context = formatSourceContext(
			token.tokenizer.input,
			token.line,
			token.column,
			2,
		);

		throw new LootiSyntaxError(
			text,
			token.tokenizer.filename,
			token.line,
			token.column,
			context,
		);
	}

	/**
	 * Parse optional type annotation (e.g. : string)
	 * Currently just consumes the tokens without storing type info
	 */
	parseOptionalType(): void {
		let token = this.nextTokenOptional();
		if (token == null) return;

		if (token.type === Token.TYPE_COLON) {
			// Consume type identifier
			this.assert(Token.TYPE_IDENTIFIER, "Expected type identifier");

			// Handle array types: number[] or number[][]
			while (true) {
				token = this.nextTokenOptional();
				if (token && (token as any).type === Token.TYPE_OPEN_BRACKET) {
					this.assert(Token.TYPE_CLOSED_BRACKET, "Expected ']'");
				} else {
					if (token) this.tokenizer.pushBack(token);
					break;
				}
			}
		} else {
			this.tokenizer.pushBack(token);
		}
	}

	parseFor(fortoken: Token): For | ForIn {
		let list: Statement;
		let range_by: Statement | null;
		let range_from: Statement;
		let range_to: Statement;
		let token: Token;
		const iterator = this.assertExpression();
		if (iterator instanceof Assignment) {
			range_from = iterator.expression;
			const iter = iterator.field;
			token = this.nextToken();
			if (token.type !== Token.TYPE_TO) {
				return this.error("Expected 'to'") as For;
			}
			range_to = this.assertExpression();
			token = this.nextToken();
			if (token.type === Token.TYPE_BY) {
				range_by = this.assertExpression();
			} else {
				range_by = null;
				this.tokenizer.pushBack(token);
			}
			if (iter instanceof Variable) {
				return new For(
					fortoken,
					iter.identifier,
					range_from,
					range_to,
					range_by,
					this.parseSequence(fortoken),
				);
			}
			return this.error("Malformed for loop") as For;
		} else if (iterator instanceof Variable) {
			this.assert(Token.TYPE_IN, "Error expected keyword 'in'");
			list = this.assertExpression();
			return new ForIn(
				fortoken,
				iterator.identifier,
				list,
				this.parseSequence(fortoken),
			);
		} else {
			return this.error("Malformed for loop") as For;
		}
	}

	parseWhile(whiletoken: Token): While {
		const condition = this.assertExpression();
		return new While(whiletoken, condition, this.parseSequence(whiletoken));
	}

	parseSequence(start_token: Token | null): Statement[] {
		let line: Statement | null;
		const sequence: Statement[] = [];
		if (start_token != null) {
			this.addTerminable(start_token);
		}
		this.nesting += 1;
		while (true) {
			const token = this.nextToken();
			if (token.type === Token.TYPE_END) {
				if (start_token != null) {
					this.endTerminable();
				}
				this.nesting -= 1;
				return sequence;
			} else {
				this.tokenizer.pushBack(token);
				line = this.parseLine();
				if (line == null) {
					throw this.error("Unexpected data");
				}
				sequence.push(line);
			}
		}
	}

	parseObject(object: Token): CreateObject {
		let exp: Statement;
		const fields: Array<{ field: string | number | null; value: Statement }> =
			[];
		this.nesting += 1;
		this.object_nesting += 1;
		this.addTerminable(object);
		while (true) {
			const token = this.nextToken();
			if (token.type === Token.TYPE_END) {
				this.nesting -= 1;
				this.object_nesting -= 1;
				this.endTerminable();
				return new CreateObject(object, fields);
			} else {
				if (token.type !== Token.TYPE_IDENTIFIER && token.reserved_keyword) {
					token.type = Token.TYPE_IDENTIFIER;
				}
				if (token.type === Token.TYPE_STRING) {
					token.type = Token.TYPE_IDENTIFIER;
				}
				if (token.type === Token.TYPE_IDENTIFIER) {
					this.assert(Token.TYPE_EQUALS, "Expected '='");
					exp = this.assertExpression();
					fields.push({
						field: token.value as string,
						value: exp,
					});
				} else {
					return this.error("Malformed object") as CreateObject;
				}
			}
		}
	}

	parseClass(object: Token): CreateClass {
		let exp: Statement;
		let ext: Statement | null = null;
		const fields: Array<{ field: string | number; value: Statement }> = [];
		this.nesting += 1;
		this.object_nesting += 1;
		this.addTerminable(object);
		let token = this.nextToken();
		if (token.type === Token.TYPE_EXTENDS) {
			ext = this.assertExpression();
			token = this.nextToken();
		}
		while (true) {
			if (token.type === Token.TYPE_END) {
				this.nesting -= 1;
				this.object_nesting -= 1;
				this.endTerminable();
				return new CreateClass(object, ext, fields);
			} else {
				if (token.type !== Token.TYPE_IDENTIFIER && token.reserved_keyword) {
					token.type = Token.TYPE_IDENTIFIER;
				}
				if (token.type === Token.TYPE_STRING) {
					token.type = Token.TYPE_IDENTIFIER;
				}
				if (token.type === Token.TYPE_IDENTIFIER) {
					this.assert(Token.TYPE_EQUALS, "Expected '='");
					exp = this.assertExpression();
					fields.push({
						field: token.value as string,
						value: exp,
					});
				} else {
					return this.error("Malformed object") as CreateClass;
				}
			}
			token = this.nextToken();
		}
	}

	parseNew(token: Token): NewCall {
		const exp = this.assertExpression(null, true);
		return new NewCall(token, exp);
	}

	parseAfter(after: Token): After {
		let line: Statement | null;
		let multiplier: number | null = null;
		const sequence: Statement[] = [];
		this.nesting += 1;
		this.addTerminable(after);
		const delay = this.assertExpression();
		let token = this.nextToken();
		if (
			token.type === Token.TYPE_IDENTIFIER &&
			Parser.multipliers[token.value as string]
		) {
			// Get multiplier value directly as number
			multiplier = Parser.multipliers[token.value as string];
			token = this.nextToken();
		}
		if (token == null || token.type !== Token.TYPE_DO) {
			return this.error("Expected keyword 'do'") as After;
		}
		while (true) {
			token = this.nextToken();
			if (token.type === Token.TYPE_END) {
				this.nesting -= 1;
				this.endTerminable();
				return new After(after, delay, sequence, token, multiplier);
			} else {
				this.tokenizer.pushBack(token);
				line = this.parseLine();
				if (line != null) {
					sequence.push(line);
				} else {
					this.error("Unexpected data while parsing after");
				}
			}
		}
	}

	parseEvery(every: Token): Every {
		let line: Statement | null;
		let multiplier: number | null = null;
		const sequence: Statement[] = [];
		this.nesting += 1;
		this.addTerminable(every);
		const delay = this.assertExpression();
		let token = this.nextToken();
		if (
			token.type === Token.TYPE_IDENTIFIER &&
			Parser.multipliers[token.value as string]
		) {
			// Get multiplier value directly as number
			multiplier = Parser.multipliers[token.value as string];
			token = this.nextToken();
		}
		if (token == null || token.type !== Token.TYPE_DO) {
			return this.error("Expected keyword 'do'") as Every;
		}
		while (true) {
			token = this.nextToken();
			if (token.type === Token.TYPE_END) {
				this.nesting -= 1;
				this.endTerminable();
				return new Every(every, delay, sequence, token, multiplier);
			} else {
				this.tokenizer.pushBack(token);
				line = this.parseLine();
				if (line != null) {
					sequence.push(line);
				} else {
					this.error("Unexpected data while parsing after");
				}
			}
		}
	}

	parseDo(do_token: Token): Do {
		let line: Statement | null;
		const sequence: Statement[] = [];
		this.nesting += 1;
		this.addTerminable(do_token);
		while (true) {
			const token = this.nextToken();
			if (token.type === Token.TYPE_END) {
				this.nesting -= 1;
				this.endTerminable();
				return new Do(do_token, sequence, token);
			} else {
				this.tokenizer.pushBack(token);
				line = this.parseLine();
				if (line != null) {
					sequence.push(line);
				} else {
					this.error("Unexpected data while parsing after");
				}
			}
		}
	}

	parseSleep(sleep: Token): Sleep {
		let multiplier: number | null = null;
		const delay = this.assertExpression();
		const token = this.nextToken();
		if (token != null) {
			if (
				token.type === Token.TYPE_IDENTIFIER &&
				Parser.multipliers[token.value as string]
			) {
				// Get multiplier value directly as number
				multiplier = Parser.multipliers[token.value as string];
			} else {
				this.tokenizer.pushBack(token);
			}
		}
		return new Sleep(sleep, delay, multiplier);
	}

	parseDelete(del: Token): Delete {
		const v = this.parseExpression();
		if (v == null || !(v instanceof Variable || v instanceof Field)) {
			return this.error(
				"expecting variable name or property access after keyword `delete`",
			) as Delete;
		} else {
			return new Delete(del, v);
		}
	}
	parseTemplate(token: Token): Statement {
		const raw = token.value as string;
		let current = 0;
		const parts: Statement[] = [];

		while (current < raw.length) {
			const start = raw.indexOf("${", current);
			if (start === -1) {
				// No more interpolation, add remaining string
				if (current < raw.length) {
					parts.push(
						new Value(token, Value.TYPE_STRING, raw.substring(current)),
					);
				}
				break;
			}

			// Add string part before ${
			if (start > current) {
				parts.push(
					new Value(token, Value.TYPE_STRING, raw.substring(current, start)),
				);
			}

			// Find matching }
			let depth = 1;
			let end = start + 2;
			let inString = false;
			let stringChar = "";

			while (end < raw.length && depth > 0) {
				const char = raw[end];

				if (inString) {
					if (char === stringChar && raw[end - 1] !== "\\") {
						inString = false;
					}
				} else {
					if (char === '"' || char === "'" || char === "`") {
						inString = true;
						stringChar = char;
					} else if (char === "{") {
						depth++;
					} else if (char === "}") {
						depth--;
					}
				}

				if (depth > 0) end++;
			}

			if (depth > 0) {
				throw this.error("Unclosed template interpolation");
			}

			// Extract expression source
			const exprSource = raw.substring(start + 2, end);

			// Parse expression using a new Parser instance
			const subParser = new (this.constructor as any)(
				exprSource,
				token.tokenizer.filename,
			);
			const expr = subParser.parseExpression();

			if (expr) {
				parts.push(expr);
			}

			current = end + 1;
		}

		if (parts.length === 0) {
			return new Value(token, Value.TYPE_STRING, "");
		}

		// Combine parts with +
		let result = parts[0];
		for (let i = 1; i < parts.length; i++) {
			result = new Operation(token, "+", result, parts[i]);
		}

		return result;
	}
}
