/**
 * Token - Represents a token in the LootiScript lexer
 *
 * Basic unit of lexical analysis.
 */

export interface Tokenizer {
	line: number;
	column: number;
	token_start: number;
	index: number;
	input: string;
	filename: string;
}

/**
 * Token class representing lexical tokens in LootiScript
 */
export class Token {
	tokenizer: Tokenizer;
	type: number;
	value: string | number;
	string_value?: string;
	line: number;
	column: number;
	start: number;
	length: number;
	index: number;
	reserved_keyword?: boolean;
	is_binary_operator: boolean;

	constructor(
		tokenizer: Tokenizer,
		type: number,
		value: string | number,
		string_value?: string,
	) {
		this.tokenizer = tokenizer;
		this.type = type;
		this.value = value;
		this.string_value = string_value;
		this.line = tokenizer.line;
		this.column = tokenizer.column;
		this.start = tokenizer.token_start;
		this.length = tokenizer.index - this.start;
		this.index = tokenizer.index;

		if (
			this.type === Token.TYPE_IDENTIFIER &&
			Object.hasOwn(Token.predefined, String(this.value))
		) {
			this.type = Token.predefined[String(this.value)];
			this.reserved_keyword = true;
		}

		this.is_binary_operator =
			(this.type >= 30 && this.type <= 39) ||
			(this.type >= 200 && this.type <= 201) ||
			(this.type >= 2 && this.type <= 7);
	}

	toString(): string {
		return String(this.value) + " : " + this.type;
	}

	// Token type constants
	static readonly TYPE_EQUALS = 1;
	static readonly TYPE_DOUBLE_EQUALS = 2;
	static readonly TYPE_GREATER = 3;
	static readonly TYPE_GREATER_OR_EQUALS = 4;
	static readonly TYPE_LOWER = 5;
	static readonly TYPE_LOWER_OR_EQUALS = 6;
	static readonly TYPE_UNEQUALS = 7;
	static readonly TYPE_IDENTIFIER = 10;
	static readonly TYPE_NUMBER = 11;
	static readonly TYPE_STRING = 12;
	static readonly TYPE_OPEN_BRACE = 20;
	static readonly TYPE_CLOSED_BRACE = 21;
	// TYPE_OPEN_CURLY_BRACE = 22
	// TYPE_CLOSED_CURLY_BRACE = 23
	static readonly TYPE_OPEN_BRACKET = 24;
	static readonly TYPE_CLOSED_BRACKET = 25;
	static readonly TYPE_COMMA = 26;
	static readonly TYPE_DOT = 27;
	static readonly TYPE_COLON = 28; // NEW: Colon for types
	static readonly TYPE_PLUS = 30;
	static readonly TYPE_MINUS = 31;
	static readonly TYPE_MULTIPLY = 32;
	static readonly TYPE_DIVIDE = 33;
	static readonly TYPE_POWER = 34;
	static readonly TYPE_MODULO = 35;
	static readonly TYPE_BINARY_AND = 36;
	static readonly TYPE_BINARY_OR = 37;
	static readonly TYPE_SHIFT_LEFT = 38;
	static readonly TYPE_SHIFT_RIGHT = 39;
	static readonly TYPE_PLUS_EQUALS = 40;
	static readonly TYPE_MINUS_EQUALS = 41;
	static readonly TYPE_MULTIPLY_EQUALS = 42;
	static readonly TYPE_DIVIDE_EQUALS = 43;
	static readonly TYPE_MODULO_EQUALS = 44;
	static readonly TYPE_AND_EQUALS = 45;
	static readonly TYPE_OR_EQUALS = 46;
	static readonly TYPE_RETURN = 100;
	static readonly TYPE_BREAK = 101;
	static readonly TYPE_CONTINUE = 102;
	static readonly TYPE_FUNCTION = 103;
	static readonly TYPE_IF = 104;
	static readonly TYPE_THEN = 105;
	static readonly TYPE_ELSE = 106;
	static readonly TYPE_ELSIF = 107;
	static readonly TYPE_END = 108;
	static readonly TYPE_FOR = 109;
	static readonly TYPE_TO = 110;
	static readonly TYPE_BY = 111;
	static readonly TYPE_IN = 112;
	static readonly TYPE_WHILE = 113;
	static readonly TYPE_OBJECT = 114;
	static readonly TYPE_CLASS = 115;
	static readonly TYPE_EXTENDS = 116;
	static readonly TYPE_NEW = 117;
	static readonly TYPE_ARROW = 118;
	static readonly TYPE_TEMPLATE = 119; // NEW: Template string `...`
	static readonly TYPE_AFTER = 61;
	static readonly TYPE_EVERY = 62;
	static readonly TYPE_DO = 63;
	static readonly TYPE_SLEEP = 64;
	static readonly TYPE_LOCAL = 70;
	static readonly TYPE_AND = 200;
	static readonly TYPE_OR = 201;
	static readonly TYPE_NOT = 202;
	static readonly TYPE_ERROR = 404;
	static readonly TYPE_DELETE = 403;

	// Predefined keyword mapping
	static readonly predefined: Record<string, number> = {
		return: Token.TYPE_RETURN,
		break: Token.TYPE_BREAK,
		continue: Token.TYPE_CONTINUE,
		function: Token.TYPE_FUNCTION,
		for: Token.TYPE_FOR,
		to: Token.TYPE_TO,
		by: Token.TYPE_BY,
		in: Token.TYPE_IN,
		while: Token.TYPE_WHILE,
		if: Token.TYPE_IF,
		then: Token.TYPE_THEN,
		else: Token.TYPE_ELSE,
		elsif: Token.TYPE_ELSIF,
		end: Token.TYPE_END,
		object: Token.TYPE_OBJECT,
		class: Token.TYPE_CLASS,
		extends: Token.TYPE_EXTENDS,
		new: Token.TYPE_NEW,
		and: Token.TYPE_AND,
		or: Token.TYPE_OR,
		not: Token.TYPE_NOT,
		after: Token.TYPE_AFTER,
		every: Token.TYPE_EVERY,
		do: Token.TYPE_DO,
		sleep: Token.TYPE_SLEEP,
		delete: Token.TYPE_DELETE,
		local: Token.TYPE_LOCAL,
		var: Token.TYPE_LOCAL, // Alias
		let: Token.TYPE_LOCAL, // Alias
	};
}
