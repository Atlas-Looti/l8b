/**
 * Arithmetic and bitwise operator implementations for LootiScript.
 *
 * These are standalone functions extracted from the Processor class so
 * the hot `run()` dispatch loop stays focused on opcode execution.
 * Each operator follows the LootiScript operator-overloading protocol:
 * look up the operator symbol ("+", "-", …) on the value or its prototype
 * chain, then invoke it via the applicable-function bridge.
 *
 * Calling convention:
 *   operatorXxx(runner, context, a, b[, self])
 *   - runner  – the Runner instance (needed by the routine-as-function bridge)
 *   - context – the current VMContext / RuntimeContext
 *   - a, b    – the operands
 *   - self    – the opcode's arg1 slot (used by add/sub as a "self" hint)
 *
 * @module lootiscript/processor-operators
 */

import { routineAsApplicableFunction as _routineAsApplicableFunction } from "./function-bridge";
import { Routine } from "./routine";
import type { RuntimeContext } from "./processor-types";

// ─── Internal helper ───────────────────────────────────────────────────────

/**
 * If `f` is a Routine, lazily cache its JS wrapper on `f.as_function` and
 * return it.  If `f` is already a native JS function, return it unchanged.
 * Returns `null` for anything else.
 */
function resolveCallable(
	runner: any,
	f: any,
	context: RuntimeContext,
): ((...args: any[]) => any) | null {
	if (f instanceof Routine) {
		if (f.as_function == null) {
			f.as_function = _routineAsApplicableFunction(runner, f, context);
		}
		return f.as_function as (...args: any[]) => any;
	}
	if (typeof f === "function") return f as (...args: any[]) => any;
	return null;
}

// ─── Operator implementations ──────────────────────────────────────────────

export function operatorAdd(
	runner: any,
	context: RuntimeContext,
	a: any,
	b: any,
	self: number,
): any {
	let f: any, obj: any;
	if (Array.isArray(a)) {
		obj = context.global.List;
	} else if (typeof a === "string") {
		obj = context.global.String;
	} else {
		obj = a;
	}
	f = obj["+"];
	while (f == null && obj.class != null) {
		obj = obj.class;
		f = obj["+"];
	}
	if (f == null) {
		f = context.global.Object["+"];
	}
	if (f != null) {
		const fn = resolveCallable(runner, f, context);
		if (fn) return fn.call(context.global, a, b, self);
	}
	return 0;
}

export function operatorSub(
	runner: any,
	context: RuntimeContext,
	a: any,
	b: any,
	self: number,
): any {
	let f: any, obj: any;
	if (Array.isArray(a)) {
		obj = context.global.List;
	} else if (typeof a === "string") {
		if (isFinite(a as any)) {
			const r = (a as any) - b;
			return isFinite(r) ? r : 0;
		}
		obj = context.global.String;
	} else {
		obj = a;
	}
	f = obj["-"];
	while (f == null && obj.class != null) {
		obj = obj.class;
		f = obj["-"];
	}
	if (f == null) {
		f = context.global.Object["-"];
	}
	if (f != null) {
		const fn = resolveCallable(runner, f, context);
		if (fn) return fn.call(context.global, a, b, self);
	}
	return 0;
}

export function operatorMul(
	runner: any,
	context: RuntimeContext,
	a: any,
	b: any,
	self: number,
): any {
	let f: any, obj: any;
	if (Array.isArray(a)) {
		obj = context.global.List;
	} else if (typeof a === "string") {
		if (isFinite(a as any)) {
			const r = (a as any) * b;
			return isFinite(r) ? r : 0;
		}
		obj = context.global.String;
	} else {
		obj = a;
	}
	f = obj["*"];
	while (f == null && obj.class != null) {
		obj = obj.class;
		f = obj["*"];
	}
	if (f == null) {
		f = context.global.Object["*"];
	}
	if (f != null) {
		const fn = resolveCallable(runner, f, context);
		if (fn) return fn.call(context.global, a, b, self);
	}
	return 0;
}

export function operatorDiv(
	runner: any,
	context: RuntimeContext,
	a: any,
	b: any,
	self: number,
): any {
	let f: any, obj: any;
	if (Array.isArray(a)) {
		obj = context.global.List;
	} else if (typeof a === "string") {
		if (isFinite(a as any)) {
			const r = (a as any) / b;
			return isFinite(r) ? r : 0;
		}
		obj = context.global.String;
	} else {
		obj = a;
	}
	f = obj["/"];
	while (f == null && obj.class != null) {
		obj = obj.class;
		f = obj["/"];
	}
	if (f == null) {
		f = context.global.Object["/"];
	}
	if (f != null) {
		const fn = resolveCallable(runner, f, context);
		if (fn) return fn.call(context.global, a, b, self);
	}
	return 0;
}

export function operatorModulo(
	runner: any,
	context: RuntimeContext,
	a: any,
	b: any,
): any {
	let f: any, obj: any;
	if (Array.isArray(a)) {
		obj = context.global.List;
	} else if (typeof a === "string") {
		if (isFinite(a as any)) {
			const r = (a as any) % b;
			return isFinite(r) ? r : 0;
		}
		obj = context.global.String;
	} else {
		obj = a;
	}
	f = obj["%"];
	while (f == null && obj.class != null) {
		obj = obj.class;
		f = obj["%"];
	}
	if (f == null) {
		f = context.global.Object["%"];
	}
	// modulo only dispatches Routine operators, not native functions
	if (f != null && f instanceof Routine) {
		if (f.as_function == null) {
			f.as_function = _routineAsApplicableFunction(runner, f, context);
		}
		f = f.as_function;
		return f.call(context.global, a, b);
	}
	return 0;
}

export function operatorBand(
	runner: any,
	context: RuntimeContext,
	a: any,
	b: any,
	self: number,
): any {
	let f: any, obj: any;
	if (Array.isArray(a)) {
		obj = context.global.List;
	} else if (typeof a === "string") {
		if (isFinite(a as any)) {
			const r = (a as any) & b;
			return isFinite(r) ? r : 0;
		}
		obj = context.global.String;
	} else {
		obj = a;
	}
	f = obj["&"];
	while (f == null && obj.class != null) {
		obj = obj.class;
		f = obj["&"];
	}
	if (f == null) {
		f = context.global.Object["&"];
	}
	if (f != null) {
		const fn = resolveCallable(runner, f, context);
		if (fn) return fn.call(context.global, a, b, self);
	}
	return 0;
}

export function operatorBor(
	runner: any,
	context: RuntimeContext,
	a: any,
	b: any,
	self: number,
): any {
	let f: any, obj: any;
	if (Array.isArray(a)) {
		obj = context.global.List;
	} else if (typeof a === "string") {
		if (isFinite(a as any)) {
			const r = (a as any) | b;
			return isFinite(r) ? r : 0;
		}
		obj = context.global.String;
	} else {
		obj = a;
	}
	f = obj["|"];
	while (f == null && obj.class != null) {
		obj = obj.class;
		f = obj["|"];
	}
	if (f == null) {
		f = context.global.Object["|"];
	}
	if (f != null) {
		const fn = resolveCallable(runner, f, context);
		if (fn) return fn.call(context.global, a, b, self);
	}
	return 0;
}

export function operatorNegate(runner: any, context: RuntimeContext, a: any): any {
	let f: any, obj: any;
	if (Array.isArray(a)) {
		obj = context.global.List;
	} else if (typeof a === "string") {
		if (isFinite(a as any)) return -(a as any);
		obj = context.global.String;
	} else {
		obj = a;
	}
	f = obj["-"];
	while (f == null && obj.class != null) {
		obj = obj.class;
		f = obj["-"];
	}
	if (f == null) {
		f = context.global.Object["-"];
	}
	if (f != null) {
		const fn = resolveCallable(runner, f, context);
		if (fn) return fn.call(context.global, 0, a);
	}
	return 0;
}
