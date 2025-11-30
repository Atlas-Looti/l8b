/**
 * Transpiler - Transpiles bytecode to JavaScript for optimization
 *
 * Converts bytecode to optimized JavaScript for better performance.
 */

import { OPCODES, type Routine } from "./routine";

/**
 * Stack - Internal stack tracking for transpiler
 */
class Stack {
	stack: string[];
	index: number;
	touched: Record<number, boolean>;

	constructor() {
		this.stack = ["stack[stack_index]"];
		this.index = 0;
		this.touched = {};
	}

	push(value: string): boolean {
		this.stack[++this.index] = value;
		return (this.touched[this.index] = true);
	}

	pop(): string {
		let res: string;
		if (this.index >= 0) {
			res = this.stack.splice(this.index, 1)[0];
		} else if (this.stack[this.index] != null) {
			res = this.stack[this.index];
		} else {
			res = "stack[stack_index-" + this.index + "]";
		}
		this.index -= 1;
		return res;
	}

	get(index: number = 0): string {
		let i: number;
		if (index == null) {
			index = 0;
		}
		i = this.index + index;
		if (i >= 0) {
			return this.stack[i];
		} else if (this.stack[i] != null) {
			return this.stack[i];
		} else {
			return "stack[stack_index-" + -i + "]";
		}
	}
}

/**
 * Transpiler - Transpiles bytecode sequences to optimized JavaScript functions
 */
export class Transpiler {
	private vcount: number = 0;
	private stack?: Stack;
	private locals?: Record<number, string>;
	private variables?: Record<string, string>;
	private readonly opcodeHandlers: Record<string, (arg: any) => string | undefined>;

	constructor() {
		this.opcodeHandlers = {
			LOAD_VALUE: this.LOAD_VALUE.bind(this),
			LOAD_LOCAL: this.LOAD_LOCAL.bind(this),
			LOAD_LOCAL_OBJECT: this.LOAD_LOCAL_OBJECT.bind(this),
			STORE_LOCAL: this.STORE_LOCAL.bind(this),
			POP: this.POP.bind(this),
			CREATE_PROPERTY: this.CREATE_PROPERTY.bind(this),
			LOAD_PROPERTY: this.LOAD_PROPERTY.bind(this),
			LOAD_PROPERTY_ATOP: this.LOAD_PROPERTY_ATOP.bind(this),
			NEW_OBJECT: this.NEW_OBJECT.bind(this),
			NEW_ARRAY: this.NEW_ARRAY.bind(this),
			MAKE_OBJECT: this.MAKE_OBJECT.bind(this),
			STORE_VARIABLE: this.STORE_VARIABLE.bind(this),
			STORE_PROPERTY: this.STORE_PROPERTY.bind(this),
		};
	}

	/**
	 * Transpile a routine to JavaScript
	 */
	transpile(r: Routine): void {
		for (let i = 0; i < r.opcodes.length; i++) {
			const op = OPCODES[r.opcodes[i] as keyof typeof OPCODES] as string;
			if (this.transpilable(op, r.arg1[i])) {
				let j = i + 1;
				while (j < r.opcodes.length && r.removeable(j) && this.transpilable(OPCODES[r.opcodes[j] as keyof typeof OPCODES] as string, r.arg1[j])) {
					j += 1;
				}
				j -= 1;
				if (j - i >= 2) {
					this.transpileSegment(r, i, j);
				}
			}
		}
	}

	/**
	 * Transpile a segment of bytecode to JavaScript
	 */
	private transpileSegment(r: Routine, i: number, j: number): void {
		let comp: string | undefined;
		let err: any;
		let index: number | string;
		let k: number;
		let s: string;
		this.vcount = 0;
		this.stack = new Stack();
		this.locals = {};
		this.variables = {};
		s = "f = function(stack,stack_index,locals,locals_offset,object,global) {\n";
		for (k = i; k <= j; k++) {
			const op = OPCODES[r.opcodes[k] as keyof typeof OPCODES] as string;
			const handler = this.opcodeHandlers[op];
			if (handler) {
				comp = handler(r.arg1[k]);
			} else {
				comp = undefined;
			}
			if (comp) {
				s += comp + "\n";
			}
		}
		for (index in this.stack!.touched) {
			if (this.stack!.touched[index as any]) {
				const idx = Number(index);
				if (idx < 0) {
					s += "stack[stack_index-" + Math.abs(idx) + "] = " + this.stack!.stack[idx] + " ;\n";
				} else if (idx > 0) {
					s += "stack[stack_index+" + index + "] = " + this.stack!.stack[idx] + " ;\n";
				} else {
					s += "stack[stack_index] = " + this.stack!.stack[idx] + " ;\n";
				}
			}
		}
		if (this.stack!.index < 0) {
			s += "stack_index -= " + Math.abs(this.stack!.index) + " ;\n";
		} else if (this.stack!.index > 0) {
			s += "stack_index += " + this.stack!.index + " ;\n";
		}
		s += "return stack_index ;\n}";
		console.info(s);
		try {
			eval(s);
		} catch (error) {
			err = error;
			console.error(s);
			console.error(err);
		}
		r.opcodes[i] = OPCODES.COMPILED;
		const f = (globalThis as any).f;
		r.arg1[i] = f;
		for (k = i + 1; k <= j; k++) {
			r.remove(i + 1);
		}
	}

	/**
	 * Create a new variable name
	 */
	private createVariable(): string {
		return "v" + this.vcount++;
	}

	/**
	 * Check if an opcode is transpilable
	 */
	private transpilable(op: string, arg: any): boolean {
		if (op === "LOAD_VALUE") {
			return typeof arg === "string" || typeof arg === "number";
		} else {
			return this.opcodeHandlers[op] != null;
		}
	}

	/**
	 * Transpile LOAD_VALUE opcode
	 * @internal Called dynamically via transpileSegment
	 */
	private LOAD_VALUE(arg: any): string {
		if (typeof arg === "string") {
			this.stack!.push(' "' + arg.replace(/"/g, '\\"') + '" ');
		} else if (typeof arg === "number") {
			this.stack!.push(arg + "");
		}
		return "";
	}

	/**
	 * Transpile LOAD_LOCAL opcode
	 */
	private LOAD_LOCAL(arg: number): string {
		const v = this.createVariable();
		this.stack!.push(v);
		return "let " + v + " = locals[locals_offset+" + arg + "] ; // LOAD_LOCAL";
	}

	/**
	 * Transpile LOAD_LOCAL_OBJECT opcode
	 */
	private LOAD_LOCAL_OBJECT(arg: number): string {
		let res: string;
		let v: string;
		if (this.locals![arg] != null) {
			v = this.locals![arg];
			this.stack!.push(v);
			return "if (typeof " + v + ' != "object") { ' + v + " = locals[locals_offset+" + arg + "] = {} } ;";
		} else {
			v = this.createVariable();
			res = "let " + v + " = locals[locals_offset+" + arg + "] ;\nif (typeof " + v + ' != "object") { ' + v + " = locals[locals_offset+" + arg + "] = {} } ;";
			this.stack!.push(v);
			this.locals![arg] = v;
			return res;
		}
	}

	/**
	 * Transpile STORE_LOCAL opcode
	 */
	private STORE_LOCAL(arg: number): string {
		const v = this.stack!.get();
		return "locals[locals_offset+" + arg + "] = " + v + " ; // STORE_LOCAL";
	}

	/**
	 * Transpile POP opcode
	 */
	private POP(): string {
		this.stack!.pop();
		return "";
	}

	/**
	 * Transpile CREATE_PROPERTY opcode
	 */
	private CREATE_PROPERTY(_arg: any): string {
		const res = this.stack!.get(-2) + "[" + this.stack!.get(-1) + "] = " + this.stack!.get() + " ;";
		this.stack!.pop();
		this.stack!.pop();
		return res;
	}

	/**
	 * Transpile LOAD_PROPERTY opcode
	 */
	private LOAD_PROPERTY(_arg: any): string {
		let res: string;
		let v: string;
		v = this.createVariable();
		res = "let " + v + " = " + this.stack!.get(-1) + "[" + this.stack!.get() + "] ; // LOAD_PROPERTY\nif (" + v + " == null) { " + v + " = 0 ; }";
		this.stack!.pop();
		this.stack!.pop();
		this.stack!.push(v);
		return res;
	}

	/**
	 * Transpile LOAD_PROPERTY_ATOP opcode
	 */
	private LOAD_PROPERTY_ATOP(_arg: any): string {
		let res: string;
		let v: string;
		v = this.createVariable();
		res = "let " + v + " = " + this.stack!.get(-1) + "[" + this.stack!.get() + "] ; // LOAD_PROPERTY_ATOP\nif (" + v + " == null) { " + v + " = 0 ; }";
		this.stack!.push(v);
		return res;
	}

	/**
	 * Transpile NEW_OBJECT opcode
	 */
	private NEW_OBJECT(): string {
		const v = this.createVariable();
		this.stack!.push(v);
		return "let " + v + " = {} ;";
	}

	/**
	 * Transpile NEW_ARRAY opcode
	 */
	private NEW_ARRAY(): string {
		const v = this.createVariable();
		this.stack!.push(v);
		return "let " + v + " = [] ;";
	}

	/**
	 * Transpile MAKE_OBJECT opcode
	 */
	private MAKE_OBJECT(): string {
		let res: string;
		let v: string;
		v = this.createVariable();
		res = "let " + v + " = " + this.stack!.get() + " ;\nif (typeof " + v + ' != "object") ' + v + " = {} ; ";
		this.stack!.pop();
		this.stack!.push(v);
		return res;
	}

	/**
	 * Transpile STORE_VARIABLE opcode
	 */
	private STORE_VARIABLE(arg: string): string {
		if (this.variables![arg] != null) {
			return this.variables![arg] + ' = object["' + arg + '"] = ' + this.stack!.get() + " ; // STORE_VARIABLE";
		} else {
			return 'object["' + arg + '"] = ' + this.stack!.get() + " ; // STORE_VARIABLE";
		}
	}

	/**
	 * Transpile STORE_PROPERTY opcode
	 */
	private STORE_PROPERTY(_arg: any): string {
		let res: string;
		let v: string;
		v = this.createVariable();
		res = "let " + v + " = " + this.stack!.get(-2) + "[" + this.stack!.get(-1) + "] = " + this.stack!.get(0) + " ; // STORE_PROPERTY";
		this.stack!.pop();
		this.stack!.pop();
		this.stack!.pop();
		this.stack!.push(v);
		return res;
	}
}
