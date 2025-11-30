/**
 * Tokenizer - Lexical analyzer for LootiScript
 *
 * Breaks source code into tokens for parsing.
 */

import { type Tokenizer as ITokenizer, Token } from "./token";

/**
 * Tokenizer class for tokenizing LootiScript source code
 */
export class Tokenizer implements ITokenizer {
	input: string;
	filename: string;
	index: number = 0;
	line: number = 1;
	column: number = 0;
	last_column: number = 0;
	buffer: Token[] = [];
	token_start: number = 0;
	chars: Record<string, number> = {};
	doubles: Record<string, [number, number]> = {};
	shifts: Record<string, number> = {};
	letter_regex: RegExp = /^\p{L}/u;

	constructor(input: string, filename: string) {
		this.input = input;
		this.filename = filename;

		// Initialize single character tokens
		this.chars["("] = Token.TYPE_OPEN_BRACE;
		this.chars[")"] = Token.TYPE_CLOSED_BRACE;
		this.chars["["] = Token.TYPE_OPEN_BRACKET;
		this.chars["]"] = Token.TYPE_CLOSED_BRACKET;
		this.chars["{"] = 22; // TYPE_OPEN_CURLY_BRACE (not defined in Token)
		this.chars["}"] = 23; // TYPE_CLOSED_CURLY_BRACE (not defined in Token)
		this.chars["^"] = Token.TYPE_POWER;
		this.chars[","] = Token.TYPE_COMMA;
		this.chars["."] = Token.TYPE_DOT;
		this.chars[":"] = Token.TYPE_COLON;

		// Initialize double character tokens (single + equals)
		this.doubles[">"] = [Token.TYPE_GREATER, Token.TYPE_GREATER_OR_EQUALS];
		this.doubles["<"] = [Token.TYPE_LOWER, Token.TYPE_LOWER_OR_EQUALS];
		this.doubles["="] = [Token.TYPE_EQUALS, Token.TYPE_DOUBLE_EQUALS];
		this.doubles["+"] = [Token.TYPE_PLUS, Token.TYPE_PLUS_EQUALS];
		this.doubles["-"] = [Token.TYPE_MINUS, Token.TYPE_MINUS_EQUALS];
		this.doubles["*"] = [Token.TYPE_MULTIPLY, Token.TYPE_MULTIPLY_EQUALS];
		this.doubles["/"] = [Token.TYPE_DIVIDE, Token.TYPE_DIVIDE_EQUALS];
		this.doubles["%"] = [Token.TYPE_MODULO, Token.TYPE_MODULO_EQUALS];
		this.doubles["&"] = [Token.TYPE_BINARY_AND, Token.TYPE_AND_EQUALS];
		this.doubles["|"] = [Token.TYPE_BINARY_OR, Token.TYPE_OR_EQUALS];

		// Initialize shift operators
		this.shifts["<"] = Token.TYPE_SHIFT_LEFT;
		this.shifts[">"] = Token.TYPE_SHIFT_RIGHT;
	}

	pushBack(token: Token): Token {
		this.buffer.splice(0, 0, token);
		return token;
	}

	/**
	 * Peek at next token without consuming it
	 */
	peek(): Token | null {
		if (this.buffer.length > 0) {
			return this.buffer[0];
		}
		const token = this.next();
		if (token) {
			this.pushBack(token);
		}
		return token;
	}

	finished(): boolean {
		return this.index >= this.input.length && this.buffer.length === 0;
	}

	nextChar(ignore_comments: boolean = false): string {
		let c: string;
		let endseq: number;
		c = this.input.charAt(this.index++);

		if (c === "\n") {
			this.line += 1;
			this.last_column = this.column;
			this.column = 0;
		} else if (c === "/" && !ignore_comments) {
			if (this.input.charAt(this.index) === "/") {
				// Single line comment
				while (true) {
					c = this.input.charAt(this.index++);
					if (c === "\n" || this.index >= this.input.length) {
						break;
					}
				}
				this.line += 1;
				this.last_column = this.column;
				this.column = 0;
				return this.nextChar();
			} else if (this.input.charAt(this.index) === "*") {
				// Multi-line comment
				endseq = 0;
				while (true) {
					c = this.input.charAt(this.index++);
					if (c === "\n") {
						this.line += 1;
						this.last_column = this.column;
						this.column = 0;
						endseq = 0;
					} else if (c === "*") {
						endseq = 1;
					} else if (c === "/" && endseq === 1) {
						break;
					} else {
						endseq = 0;
					}
					if (this.index >= this.input.length) {
						break;
					}
				}
				return this.nextChar();
			}
		} else {
			this.column += 1;
		}
		return c;
	}

	rewind(): void {
		this.index -= 1;
		this.column -= 1;
		if (this.input.charAt(this.index) === "\n") {
			this.line -= 1;
			this.column = this.last_column;
		}
	}

	next(): Token | null {
		let c: string;
		let code: number;

		if (this.buffer.length > 0) {
			return this.buffer.splice(0, 1)[0];
		}

		while (true) {
			if (this.index >= this.input.length) {
				return null;
			}
			c = this.nextChar();
			code = c.charCodeAt(0);
			if (code > 32 && code !== 160) {
				break;
			}
		}

		this.token_start = this.index - 1;

		if (this.doubles[c] != null) {
			return this.parseDouble(c, this.doubles[c]);
		}

		if (this.chars[c] != null) {
			return new Token(this, this.chars[c], c);
		}

		if (c === "!") {
			return this.parseUnequals(c);
		} else if (code >= 48 && code <= 57) {
			return this.parseNumber(c);
		} else if ((code >= 65 && code <= 90) || (code >= 97 && code <= 122) || code === 95 || this.letter_regex.test(c)) {
			return this.parseIdentifier(c);
		} else if (c === '"') {
			return this.parseString(c, '"');
		} else if (c === "'") {
			return this.parseString(c, "'");
		} else if (c === "`") {
			return this.parseString(c, "`");
		} else {
			return this.error("Syntax Error");
		}
	}

	changeNumberToIdentifier(): Token[] | Token | undefined {
		let i: number;
		let token: Token | null;
		let v: string[];
		const results: Token[] = [];

		token = this.next();
		if (token != null && token.type === Token.TYPE_NUMBER) {
			v = (token.string_value || String(token.value)).split(".");
			for (i = v.length - 1; i >= 0; i--) {
				if (v[i].length > 0) {
					this.pushBack(new Token(this, Token.TYPE_IDENTIFIER, v[i]));
				}
				if (i > 0) {
					results.push(this.pushBack(new Token(this, Token.TYPE_DOT, ".")));
				}
			}
			return results;
		} else if (token != null && token.type === Token.TYPE_STRING) {
			return this.pushBack(new Token(this, Token.TYPE_IDENTIFIER, token.value));
		} else {
			return token ? this.pushBack(token) : undefined;
		}
	}

	parseDouble(c: string, d?: [number, number]): Token {
		const c2: string = this.input.charAt(this.index);

		// Check for arrow function =>
		if (c === "=" && c2 === ">") {
			this.nextChar();
			return new Token(this, Token.TYPE_ARROW, "=>");
		}

		// Check for shift operators (<<, >>)
		if (this.shifts[c] != null && this.index < this.input.length && c2 === c) {
			this.nextChar();
			return new Token(this, this.shifts[c], c + c);
		}

		// Check for assignment operators (+=, -=, etc.)
		if (d && this.index < this.input.length && c2 === "=") {
			this.nextChar();
			return new Token(this, d[1], c + "=");
		}

		// Return single character token
		return new Token(this, d ? d[0] : this.chars[c], c);
	}

	parseEquals(_c: string): Token {
		if (this.index < this.input.length && this.input.charAt(this.index) === "=") {
			this.nextChar();
			return new Token(this, Token.TYPE_DOUBLE_EQUALS, "==");
		} else {
			return new Token(this, Token.TYPE_EQUALS, "=");
		}
	}

	parseGreater(_c: string): Token {
		if (this.index < this.input.length && this.input.charAt(this.index) === "=") {
			this.nextChar();
			return new Token(this, Token.TYPE_GREATER_OR_EQUALS, ">=");
		} else {
			return new Token(this, Token.TYPE_GREATER, ">");
		}
	}

	parseLower(_c: string): Token {
		if (this.index < this.input.length && this.input.charAt(this.index) === "=") {
			this.nextChar();
			return new Token(this, Token.TYPE_LOWER_OR_EQUALS, "<=");
		} else {
			return new Token(this, Token.TYPE_LOWER, "<");
		}
	}

	parseUnequals(_c: string): Token {
		if (this.index < this.input.length && this.input.charAt(this.index) === "=") {
			this.nextChar();
			return new Token(this, Token.TYPE_UNEQUALS, "!=");
		} else {
			return this.error("Expected inequality !=");
		}
	}

	parseIdentifier(s: string): Token {
		let c: string;
		let code: number;

		while (true) {
			if (this.index >= this.input.length) {
				return new Token(this, Token.TYPE_IDENTIFIER, s);
			}
			c = this.nextChar();
			code = c.charCodeAt(0);
			if ((code >= 65 && code <= 90) || (code >= 97 && code <= 122) || code === 95 || (code >= 48 && code <= 57) || this.letter_regex.test(c)) {
				s += c;
			} else {
				this.rewind();
				return new Token(this, Token.TYPE_IDENTIFIER, s);
			}
		}
	}

	parseNumber(s: string): Token {
		let c: string;
		let code: number;
		let exp: boolean = false;
		let pointed: boolean = false;

		while (true) {
			if (this.index >= this.input.length) {
				return new Token(this, Token.TYPE_NUMBER, Number.parseFloat(s), s);
			}
			c = this.nextChar();
			code = c.charCodeAt(0);

			if (c === "." && !pointed && !exp) {
				pointed = true;
				s += c;
			} else if (code >= 48 && code <= 57) {
				s += c;
			} else if ((c === "e" || c === "E") && !exp && this.index < this.input.length) {
				exp = true;
				s += c;
				c = this.nextChar();
				if (c === "+" || c === "-") {
					s += c;
				} else {
					this.rewind();
				}
			} else if ((c === "x" || c === "X") && s === "0") {
				return this.parseHexNumber("0x");
			} else {
				this.rewind();
				return new Token(this, Token.TYPE_NUMBER, Number.parseFloat(s), s);
			}
		}
	}

	parseHexNumber(s: string): Token {
		let c: string;

		while (true) {
			if (this.index >= this.input.length) {
				return new Token(this, Token.TYPE_NUMBER, Number.parseInt(s), s);
			}
			c = this.nextChar();
			if (/[a-fA-F0-9]/.test(c)) {
				s += c;
			} else {
				this.rewind();
				return new Token(this, Token.TYPE_NUMBER, Number.parseInt(s), s);
			}
		}
	}

	parseString(s: string, close: string): Token {
		let c: string;
		let count_close: number = 0;
		let n: string;

		if (close == null) {
			close = '"';
		}

		if (close === '"') {
			// Check for triple-quoted string
			if (this.input.charAt(this.index) === '"' && this.input.charAt(this.index + 1) === '"' && this.input.charAt(this.index + 2) !== '"') {
				close = '"""';
				this.nextChar(true);
				this.nextChar(true);
			}
		}

		while (true) {
			if (this.index >= this.input.length) {
				return this.error("Unclosed string value");
			}
			c = this.nextChar(true);

			if (c === "\\") {
				n = this.nextChar(true);
				switch (n) {
					case "n":
						s += "\n";
						break;
					case "\\":
						s += "\\";
						break;
					case close:
						s += close;
						break;
					default:
						s += "\\" + n;
				}
			} else if (c === close) {
				n = this.nextChar(true);
				if (n === close) {
					s += c;
				} else {
					this.rewind();
					s += c;
					return new Token(this, close === "`" ? Token.TYPE_TEMPLATE : Token.TYPE_STRING, s.substring(1, s.length - 1));
				}
			} else {
				if (close === '"""' && c === '"') {
					count_close += 1;
					if (count_close === 3) {
						return new Token(this, Token.TYPE_STRING, s.substring(1, s.length - 2));
					}
				} else {
					count_close = 0;
				}
				s += c;
			}
		}
	}

	error(s: string): never {
		throw new Error(s);
	}
}
