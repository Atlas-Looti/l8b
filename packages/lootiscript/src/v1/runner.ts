/**
 * Runner - Manages LootiScript execution lifecycle
 *
 * Handles multiple threads, scheduling, and global environment setup.
 */

import { JSONLib, ListLib, MathLib, StringLib } from "@l8b/stdlib";

import { Random } from "../random";

import { Parser } from "./parser";
import { Processor } from "./processor";
import { VMProfiler } from "./profiler";
import { Program } from "./program";
import { Routine } from "./routine";

// Forward declarations for circular dependencies
declare class Compiler {
	program: Program;
	routine: Routine;
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
		this.processor = new Processor(this.runner);
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
				if ((f === "update()" || f === "serverUpdate()") && (this.runner as any).updateControls != null) {
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
 * Runner - Manages LootiScript execution lifecycle
 *
 * Handles multiple threads, scheduling, and global environment setup.
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
	profiler: VMProfiler;

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
		// Main thread and profiler are initialized lazily in init()
		// to ensure proper dependency setup with L8BVM context
		this.profiler = new VMProfiler(null as any);
	}

	init(): boolean {
		this.initialized = true;
		// Initialize system object if not provided by runtime
		// This object exposes VM state and controls to LootiScript code
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

		// Initialize profiler with main thread processor for performance monitoring
		this.profiler = new VMProfiler(this.main_thread.processor);

		// Expose profiler API to system object for LootiScript code access
		this.system.profiler = {
			start: () => {
				this.main_thread.processor.profilingEnabled = true;
				this.profiler.start();
			},
			stop: () => {
				this.main_thread.processor.profilingEnabled = false;
				return this.profiler.stop();
			},
			getMetrics: () => this.profiler.getAverageMetrics(),
		};

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
		// Inject standard library into global scope for LootiScript code
		// Provides Math, JSON, List, and String utility functions
		this.l8bvm.context.global.Math = MathLib;
		this.l8bvm.context.global.JSON = JSONLib;
		this.l8bvm.context.global.List = ListLib;

		this.l8bvm.context.global.Function = {
			bind: (...args: any[]) => {
				return args[0].bind.apply(args[0], args.slice(1));
			},
		} as any;
		// Extend String with stdlib utilities for LootiScript
		this.l8bvm.context.global.String = {
			...StringLib,
			// Override fromCharCode to use proper calling convention with variable arguments
			fromCharCode: function () {
				return String.fromCharCode.apply(null, arguments as any);
			},
		};

		this.l8bvm.context.global.Number = {
			parse: (str: string) => {
				const res = Number.parseFloat(str);
				return isFinite(res) ? res : 0;
			},
			toString: function (this: number) {
				return this.toString();
			},
		};

		// Initialize Object with default operator overloads for LootiScript
		// Enables operator syntax like obj1 + obj2, obj1 - obj2, etc.
		this.l8bvm.context.global.Object = {
			"+": (a: any, b: any) => (a != null ? a + b : b),
			"-": (a: any, b: any) => a - b,
			"*": (a: any, b: any) => a * b,
			"/": (a: any, b: any) => a / b,
			"%": (a: any, b: any) => a % b,
		};
		this.fps = 60;
		this.fps_max = 60;
		this.cpu_load = 0;
		this.l8bvm.context.meta.print("LootiScript 1.0");
		return (this.triggers_controls_update = true);
	}

	run(src: string, filename: string = "", callback?: (result: string) => void): any {
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
						if (this.l8bvm.context.warnings.assigning_api_variable[id] == null) {
							this.l8bvm.context.warnings.assigning_api_variable[id] = {
								file: filename,
								line: w.line,
								column: w.column,
								expression: w.identifier,
							};
						}
						break;
					case "assignment_as_condition":
						if (this.l8bvm.context.warnings.assignment_as_condition[id] == null) {
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
					f = this.main_thread.processor.routineAsFunction(routine, this.l8bvm.context) as any;
					return f(...args);
				} else if (typeof routine === "function") {
					return (routine as any)(...args);
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
		// Allocate 100ms time budget for main thread to prevent interrupting draw() mid-frame
		// This ensures smooth rendering even under heavy computational load
		time_limit = time + 100;
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
		while (processor.done && Date.now() < time_out && this.main_thread.loadNext()) {
			this.process(this.main_thread, time_out);
		}
		// Secondary threads receive remaining time budget after main thread completes
		// This prevents background tasks from impacting frame rate and ensures main thread priority
		time_limit = time + margin;
		time_out = this.system.preemptive ? time_limit : Infinity;

		// Record frame metrics in profiler for performance analysis
		if (this.main_thread.processor.profilingEnabled) {
			this.profiler.frame();
		}

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
		// Reuse variable for main thread reference to avoid allocation
		t = this.threads[0];
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
