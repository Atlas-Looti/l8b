/**
 * Runner - Runtime execution engine for LootiScript
 *
 * Manages script execution, threads, and runtime context.
 */

import { Random } from "../random";
import { Parser } from "./parser";
import { Program } from "./program";
import { Routine } from "./routine";

// Forward declarations for circular dependencies
declare class Compiler {
	program: Program;
	routine: Routine;
}

declare class Processor {
	done: boolean;
	time_limit: number;
	load(routine: Routine): void;
	run(context: any): any;
	routineAsFunction(routine: Routine, context: any): (...args: any[]) => any;
}

/**
 * L8BVM context interface
 */
interface L8BVMContext {
	global: Record<string, any>;
	meta: {
		print: (text: string) => void;
	};
	warnings: {
		using_undefined_variable: Record<string, any>;
		assigning_field_to_undefined: Record<string, any>;
		invoking_non_function: Record<string, any>;
		assigning_api_variable: Record<string, any>;
		assignment_as_condition: Record<string, any>;
	};
	location?: any;
}

/**
 * L8BVM interface
 */
interface L8BVM {
	context: L8BVMContext;
}

/**
 * Thread interface
 */
export interface ThreadInterface {
	pause: () => number;
	resume: () => number;
	stop: () => number;
	status: "running" | "paused" | "stopped";
}

/**
 * Thread - Execution thread for LootiScript
 */
export class Thread {
	runner: Runner;
	loop: boolean;
	processor: Processor;
	paused: boolean;
	terminated: boolean;
	next_calls: (string | Routine)[];
	interface: ThreadInterface;
	routine?: Routine;
	start_time?: number;
	delay?: number;
	repeat?: boolean;
	sleep_until?: number;

	constructor(runner: Runner) {
		this.runner = runner;
		this.loop = false;
		this.processor = new (globalThis as any).Processor(this.runner);
		this.paused = false;
		this.terminated = false;
		this.next_calls = [];
		this.interface = {
			pause: () => {
				return this.pause();
			},
			resume: () => {
				return this.resume();
			},
			stop: () => {
				return this.stop();
			},
			status: "running",
		};
	}

	addCall(call: string | Routine): void {
		if (this.next_calls.indexOf(call) < 0) {
			this.next_calls.push(call);
		}
	}

	loadNext(): boolean {
		let compiler: Compiler;
		let f: string | Routine;
		let parser: Parser;
		let program: Program;
		if (this.next_calls.length > 0) {
			f = this.next_calls.splice(0, 1)[0];
			if (f instanceof Routine) {
				this.processor.load(f);
			} else {
				parser = new Parser(f, "");
				parser.parse();
				program = parser.program;
				compiler = new (globalThis as any).Compiler(program);
				this.processor.load(compiler.routine);
				if (
					(f === "update()" || f === "serverUpdate()") &&
					(this.runner as any).updateControls != null
				) {
					(this.runner as any).updateControls();
				}
			}
			return true;
		} else {
			return false;
		}
	}

	pause(): number {
		if (this.interface.status === "running") {
			this.interface.status = "paused";
			this.paused = true;
			return 1;
		} else {
			return 0;
		}
	}

	resume(): number {
		if (this.interface.status === "paused") {
			this.interface.status = "running";
			this.paused = false;
			return 1;
		} else {
			return 0;
		}
	}

	stop(): number {
		this.interface.status = "stopped";
		this.terminated = true;
		return 1;
	}
}

/**
 * Runner - Runtime execution engine for LootiScript
 */
export class Runner {
	l8bvm: L8BVM;
	initialized: boolean;
	system: any;
	main_thread!: Thread;
	threads: Thread[];
	current_thread: Thread | null;
	thread_index: number;
	fps: number;
	fps_max: number;
	cpu_load: number;
	triggers_controls_update: boolean;
	updateControls?: () => void;

	constructor(l8bvm: L8BVM) {
		this.l8bvm = l8bvm;
		this.initialized = false;
		this.threads = [];
		this.current_thread = null;
		this.thread_index = 0;
		this.fps = 60;
		this.fps_max = 60;
		this.cpu_load = 0;
		this.triggers_controls_update = false;
		// main_thread will be initialized in init()
	}

	init(): boolean {
		this.initialized = true;
		// Initialize system object if it doesn't exist
		if (!this.l8bvm.context.global.system) {
			this.l8bvm.context.global.system = {};
		}
		this.system = this.l8bvm.context.global.system;
		this.system.preemptive = 1;
		this.system.threads = [];
		this.main_thread = new Thread(this);
		this.threads = [this.main_thread];
		this.current_thread = this.main_thread;
		this.thread_index = 0;
		this.l8bvm.context.global.print = this.l8bvm.context.meta.print;
		this.l8bvm.context.global.random = new Random(0);
		this.l8bvm.context.global.Function = {
			bind: function (this: any, obj: any) {
				let rc: Routine;
				if (this instanceof Routine) {
					rc = this.clone();
					(rc as any).object = obj;
					return rc;
				} else {
					return this;
				}
			},
		} as any;
		this.l8bvm.context.global.List = {
			sortList: (f: any) => {
				let funk: any;
				const self = this;
				const Function = Program as any;
				if (f != null && f instanceof Function.Function) {
					funk = (a: any, b: any) =>
						f.call(self.l8bvm.context.global, [a, b], true);
				} else if (f != null && typeof f === "function") {
					funk = f;
				}
				return (self as any).sort(funk);
			},
			"+": (a: any[], b: any, self?: boolean) => {
				if (!self) {
					// not +=, clone array a
					a = [...a];
				}
				if (Array.isArray(b)) {
					return a.concat(b);
				} else {
					a.push(b);
					return a;
				}
			},
			"-": (a: any[], b: any, self?: boolean) => {
				let index: number;
				if (!self) {
					// not -=, clone array a
					a = [...a];
				}
				index = a.indexOf(b);
				if (index >= 0) {
					a.splice(index, 1);
				}
				return a;
			},
		};
		this.l8bvm.context.global.Object = {};
		this.l8bvm.context.global.String = {
			fromCharCode: (...args: number[]) => String.fromCharCode(...args),
			"+": (a: string, b: any) => a + b,
		};
		this.l8bvm.context.global.Number = {
			parse: (s: string | number) => {
				let res: number;
				res = Number.parseFloat(String(s));
				if (isFinite(res)) {
					return res;
				} else {
					return 0;
				}
			},
			toString: function (this: number) {
				return this.toString();
			},
		};
		this.fps = 60;
		this.fps_max = 60;
		this.cpu_load = 0;
		this.l8bvm.context.meta.print("LootiScript 1.0");
		return (this.triggers_controls_update = true);
	}

	run(
		src: string,
		filename: string = "",
		callback?: (result: string) => void,
	): any {
		let compiler: Compiler;
		let err: any;
		let id: string;
		let j: number;
		let len: number;
		let parser: Parser;
		let program: Program;
		let ref: any[];
		let result: any = null;
		let w: any;
		if (!this.initialized) {
			this.init();
		}
		parser = new Parser(src, filename);
		parser.parse();
		if ((parser as any).error_info != null) {
			err = (parser as any).error_info;
			err.type = "compile";
			throw err;
		}
		if (parser.warnings.length > 0) {
			ref = parser.warnings;
			for (j = 0, len = ref.length; j < len; j++) {
				w = ref[j];
				id = filename + "-" + w.line + "-" + w.column;
				switch (w.type) {
					case "assigning_api_variable":
						if (
							this.l8bvm.context.warnings.assigning_api_variable[id] == null
						) {
							this.l8bvm.context.warnings.assigning_api_variable[id] = {
								file: filename,
								line: w.line,
								column: w.column,
								expression: w.identifier,
							};
						}
						break;
					case "assignment_as_condition":
						if (
							this.l8bvm.context.warnings.assignment_as_condition[id] == null
						) {
							this.l8bvm.context.warnings.assignment_as_condition[id] = {
								file: filename,
								line: w.line,
								column: w.column,
							};
						}
				}
			}
		}
		program = parser.program;
		compiler = new (globalThis as any).Compiler(program);
		result = null;
		(compiler.routine as any).callback = (res: any) => {
			if (callback != null) {
				return callback(Program.toString(res));
			} else {
				return (result = res);
			}
		};
		this.main_thread.addCall(compiler.routine);
		this.tick();
		return result;
	}

	call(name: string, args?: any[]): any {
		let f: (...args: any[]) => any;
		let routine: any;
		if (name === "draw" || name === "update" || name === "serverUpdate") {
			if (this.l8bvm.context.global[name] != null) {
				this.main_thread.addCall(`${name}()`);
			}
			return;
		}
		if (this.l8bvm.context.global[name] != null) {
			if (args == null || !args.length) {
				this.main_thread.addCall(`${name}()`);
			} else {
				routine = this.l8bvm.context.global[name];
				if (routine instanceof Routine) {
					f = this.main_thread.processor.routineAsFunction(
						routine,
						this.l8bvm.context,
					);
					return f(...args);
				} else if (typeof routine === "function") {
					return routine(...args);
				}
			}
		} else {
			return 0;
		}
	}

	toString(obj: any): string {
		return Program.toString(obj);
	}

	process(thread: Thread, time_limit: number): any {
		let processor: Processor;
		processor = thread.processor;
		processor.time_limit = time_limit;
		this.current_thread = thread;
		return processor.run(this.l8bvm.context);
	}

	tick(): void {
		let dt: number;
		let i: number;
		let index: number;
		let j: number;
		let len: number;
		let load: number;
		let margin: number;
		let processing: boolean;
		let processor: Processor;
		let ref: Thread[];
		let t: Thread;
		let time: number;
		let time_limit: number;
		let time_out: number;
		if (this.system.fps != null) {
			this.fps = this.fps * 0.9 + this.system.fps * 0.1;
		}
		this.fps_max = Math.max(this.fps, this.fps_max);
		if (this.fps < 59) {
			margin = 10;
		} else {
			margin = Math.floor((1000 / this.fps) * 0.8);
		}
		time = Date.now();
		time_limit = time + 100; // allow more time to prevent interrupting main_thread in the middle of a draw()
		time_out = this.system.preemptive ? time_limit : Infinity;
		processor = this.main_thread.processor;
		if (!processor.done) {
			if (this.main_thread.sleep_until != null) {
				if (Date.now() >= this.main_thread.sleep_until) {
					delete this.main_thread.sleep_until;
					this.process(this.main_thread, time_out);
				}
			} else {
				this.process(this.main_thread, time_out);
			}
		}
		while (
			processor.done &&
			Date.now() < time_out &&
			this.main_thread.loadNext()
		) {
			this.process(this.main_thread, time_out);
		}
		time_limit = time + margin; // secondary threads get remaining time
		time_out = this.system.preemptive ? time_limit : Infinity;
		processing = true;
		while (processing) {
			processing = false;
			ref = this.threads;
			for (j = 0, len = ref.length; j < len; j++) {
				t = ref[j];
				if (t !== this.main_thread) {
					if (t.paused || t.terminated) {
						continue;
					}
					processor = t.processor;
					if (!processor.done) {
						if (t.sleep_until != null) {
							if (Date.now() >= t.sleep_until) {
								delete t.sleep_until;
								this.process(t, time_out);
								processing = true;
							}
						} else {
							this.process(t, time_out);
							processing = true;
						}
					} else if (t.start_time != null) {
						if (t.repeat) {
							while (time >= t.start_time && !(t.paused || t.terminated)) {
								if (time >= t.start_time + 150) {
									t.start_time = time + (t.delay || 0);
								} else {
									t.start_time += t.delay || 0;
								}
								processor.load(t.routine!);
								this.process(t, time_out);
								processing = true;
							}
						} else {
							if (time >= t.start_time) {
								delete t.start_time;
								processor.load(t.routine!);
								this.process(t, time_out);
								processing = true;
							}
						}
					} else {
						t.terminated = true;
					}
				}
			}
			if (Date.now() > time_limit) {
				break;
			}
		}
		for (i = this.threads.length - 1; i >= 1; i--) {
			t = this.threads[i];
			if (t.terminated) {
				this.threads.splice(i, 1);
				index = this.system.threads.indexOf(t.interface);
				if (index >= 0) {
					this.system.threads.splice(index, 1);
				}
			}
		}
		t = this.threads[0]; // reuse variable
		dt = Date.now() - time;
		const dt_limit = time_limit - time;
		load = (dt / dt_limit) * 100;
		this.cpu_load = this.cpu_load * 0.9 + load * 0.1;
		this.system.cpu_load = Math.min(100, Math.round(this.cpu_load));
		return;
	}

	createThread(routine: Routine, delay: number, repeat: boolean): ThreadInterface {
		let i: number;
		let t: Thread;
		t = new Thread(this);
		t.routine = routine;
		this.threads.push(t);
		t.start_time = Date.now() + delay - 1000 / this.fps;
		if (repeat) {
			t.repeat = repeat;
			t.delay = delay;
		}
		this.system.threads.push(t.interface);
		for (i = 0; i < (routine as any).import_values.length; i++) {
			if ((routine as any).import_values[i] === routine) {
				(routine as any).import_values[i] = t.interface;
			}
		}
		return t.interface;
	}

	sleep(value: number): void {
		if (this.current_thread != null) {
			this.current_thread.sleep_until = Date.now() + Math.max(0, value);
		}
	}
}
