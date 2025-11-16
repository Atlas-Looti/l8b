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
	current: { line: number; column: number };
	verbose: boolean;
	nesting: number;
	object_nesting: number;
	not_terminated: Token[];
	api_reserved: Record<string, boolean>;
	warnings: Array<{
		type: string;
		identifier?: string;
		line: number;
		column: number;
	}>;
	unexpected_eof?: boolean;
	error_info?: { error: string; line: number; column: number };
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
		this.current = {
			line: 1,
			column: 1,
		};
		this.verbose = false;
		this.nesting = 0;
		this.object_nesting = 0;
		this.not_terminated = [];
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
							this.error("Too many 'end'");
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
			//console.info "Error at line: #{@current.line} column: #{@current.column}"
			if (this.not_terminated.length > 0 && err === "Unexpected end of file") {
				nt = this.not_terminated[this.not_terminated.length - 1];
				return (this.error_info = {
					error: `Unterminated '${nt.value}' ; no matching 'end' found`,
					line: nt.line,
					column: nt.column,
				}) as { error: string; line: number; column: number };
			} else {
				return (this.error_info = {
					error: err,
					line: this.current.line,
					column: this.current.column,
				}) as { error: string; line: number; column: number };
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
		if (expression instanceof Field) {
			this.object_nesting += 1;
			res = new Assignment(token, expression, this.assertExpression(), false);
			this.object_nesting -= 1;
		} else {
			res = new Assignment(token, expression, this.assertExpression(), false);
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
		this.assert(Token.TYPE_EQUALS, "Expected '='");
		return new Assignment(
			local,
			new Variable(identifier, identifier.value as string),
			this.assertExpression(),
			true,
		);
	}

	parseBracedExpression(open: Token): Braced {
		const expression = this.assertExpression();
		const token = this.nextToken();
		if (token.type === Token.TYPE_CLOSED_BRACE) {
			return new Braced(open, expression);
		} else {
			return this.error("missing closing parenthese") as Braced;
		}
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
		this.addTerminable(funk);
		while (true) {
			const token = this.nextToken();
			if (token.type === Token.TYPE_END) {
				this.nesting -= 1;
				this.endTerminable();
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

	error(text: string): never {
		throw text;
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
}
