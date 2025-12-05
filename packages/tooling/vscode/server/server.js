"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __esm = (fn, res) =>
	function __init() {
		return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])((fn = 0))), res;
	};
var __commonJS = (cb, mod) =>
	function __require() {
		return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
	};
var __export = (target, all) => {
	for (var name in all) __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
	if ((from && typeof from === "object") || typeof from === "function") {
		for (let key of __getOwnPropNames(from))
			if (!__hasOwnProp.call(to, key) && key !== except)
				__defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
	}
	return to;
};
var __toESM = (mod, isNodeMode, target) => (
	(target = mod != null ? __create(__getProtoOf(mod)) : {}),
	__copyProps(
		// If the importer is in node compatibility mode or this is not an ESM
		// file that has been converted to a CommonJS file using a Babel-
		// compatible transform (i.e. "__esModule" has not been set), then set
		// "default" to the CommonJS "module.exports" for node compatibility.
		isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
		mod,
	)
);
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// ../../../node_modules/.pnpm/tsup@8.5.1_@swc+core@1.15.3_@swc+helpers@0.5.17__jiti@2.6.1_postcss@8.5.6_typescript@5.9.3_yaml@2.8.2/node_modules/tsup/assets/cjs_shims.js
var init_cjs_shims = __esm({
	"../../../node_modules/.pnpm/tsup@8.5.1_@swc+core@1.15.3_@swc+helpers@0.5.17__jiti@2.6.1_postcss@8.5.6_typescript@5.9.3_yaml@2.8.2/node_modules/tsup/assets/cjs_shims.js"() {
		"use strict";
	},
});

// ../../../node_modules/.pnpm/vscode-languageserver@9.0.1/node_modules/vscode-languageserver/lib/common/utils/is.js
var require_is = __commonJS({
	"../../../node_modules/.pnpm/vscode-languageserver@9.0.1/node_modules/vscode-languageserver/lib/common/utils/is.js"(
		exports2,
	) {
		"use strict";
		init_cjs_shims();
		Object.defineProperty(exports2, "__esModule", {
			value: true,
		});
		exports2.thenable =
			exports2.typedArray =
			exports2.stringArray =
			exports2.array =
			exports2.func =
			exports2.error =
			exports2.number =
			exports2.string =
			exports2.boolean =
				void 0;
		function boolean(value) {
			return value === true || value === false;
		}
		__name(boolean, "boolean");
		exports2.boolean = boolean;
		function string(value) {
			return typeof value === "string" || value instanceof String;
		}
		__name(string, "string");
		exports2.string = string;
		function number(value) {
			return typeof value === "number" || value instanceof Number;
		}
		__name(number, "number");
		exports2.number = number;
		function error(value) {
			return value instanceof Error;
		}
		__name(error, "error");
		exports2.error = error;
		function func(value) {
			return typeof value === "function";
		}
		__name(func, "func");
		exports2.func = func;
		function array(value) {
			return Array.isArray(value);
		}
		__name(array, "array");
		exports2.array = array;
		function stringArray(value) {
			return array(value) && value.every((elem) => string(elem));
		}
		__name(stringArray, "stringArray");
		exports2.stringArray = stringArray;
		function typedArray(value, check) {
			return Array.isArray(value) && value.every(check);
		}
		__name(typedArray, "typedArray");
		exports2.typedArray = typedArray;
		function thenable(value) {
			return value && func(value.then);
		}
		__name(thenable, "thenable");
		exports2.thenable = thenable;
	},
});

// ../../../node_modules/.pnpm/vscode-jsonrpc@8.2.0/node_modules/vscode-jsonrpc/lib/common/is.js
var require_is2 = __commonJS({
	"../../../node_modules/.pnpm/vscode-jsonrpc@8.2.0/node_modules/vscode-jsonrpc/lib/common/is.js"(exports2) {
		"use strict";
		init_cjs_shims();
		Object.defineProperty(exports2, "__esModule", {
			value: true,
		});
		exports2.stringArray =
			exports2.array =
			exports2.func =
			exports2.error =
			exports2.number =
			exports2.string =
			exports2.boolean =
				void 0;
		function boolean(value) {
			return value === true || value === false;
		}
		__name(boolean, "boolean");
		exports2.boolean = boolean;
		function string(value) {
			return typeof value === "string" || value instanceof String;
		}
		__name(string, "string");
		exports2.string = string;
		function number(value) {
			return typeof value === "number" || value instanceof Number;
		}
		__name(number, "number");
		exports2.number = number;
		function error(value) {
			return value instanceof Error;
		}
		__name(error, "error");
		exports2.error = error;
		function func(value) {
			return typeof value === "function";
		}
		__name(func, "func");
		exports2.func = func;
		function array(value) {
			return Array.isArray(value);
		}
		__name(array, "array");
		exports2.array = array;
		function stringArray(value) {
			return array(value) && value.every((elem) => string(elem));
		}
		__name(stringArray, "stringArray");
		exports2.stringArray = stringArray;
	},
});

// ../../../node_modules/.pnpm/vscode-jsonrpc@8.2.0/node_modules/vscode-jsonrpc/lib/common/messages.js
var require_messages = __commonJS({
	"../../../node_modules/.pnpm/vscode-jsonrpc@8.2.0/node_modules/vscode-jsonrpc/lib/common/messages.js"(exports2) {
		"use strict";
		init_cjs_shims();
		Object.defineProperty(exports2, "__esModule", {
			value: true,
		});
		exports2.Message =
			exports2.NotificationType9 =
			exports2.NotificationType8 =
			exports2.NotificationType7 =
			exports2.NotificationType6 =
			exports2.NotificationType5 =
			exports2.NotificationType4 =
			exports2.NotificationType3 =
			exports2.NotificationType2 =
			exports2.NotificationType1 =
			exports2.NotificationType0 =
			exports2.NotificationType =
			exports2.RequestType9 =
			exports2.RequestType8 =
			exports2.RequestType7 =
			exports2.RequestType6 =
			exports2.RequestType5 =
			exports2.RequestType4 =
			exports2.RequestType3 =
			exports2.RequestType2 =
			exports2.RequestType1 =
			exports2.RequestType =
			exports2.RequestType0 =
			exports2.AbstractMessageSignature =
			exports2.ParameterStructures =
			exports2.ResponseError =
			exports2.ErrorCodes =
				void 0;
		var is = require_is2();
		var ErrorCodes;
		(function (ErrorCodes2) {
			ErrorCodes2.ParseError = -32700;
			ErrorCodes2.InvalidRequest = -32600;
			ErrorCodes2.MethodNotFound = -32601;
			ErrorCodes2.InvalidParams = -32602;
			ErrorCodes2.InternalError = -32603;
			ErrorCodes2.jsonrpcReservedErrorRangeStart = -32099;
			ErrorCodes2.serverErrorStart = -32099;
			ErrorCodes2.MessageWriteError = -32099;
			ErrorCodes2.MessageReadError = -32098;
			ErrorCodes2.PendingResponseRejected = -32097;
			ErrorCodes2.ConnectionInactive = -32096;
			ErrorCodes2.ServerNotInitialized = -32002;
			ErrorCodes2.UnknownErrorCode = -32001;
			ErrorCodes2.jsonrpcReservedErrorRangeEnd = -32e3;
			ErrorCodes2.serverErrorEnd = -32e3;
		})(ErrorCodes || (exports2.ErrorCodes = ErrorCodes = {}));
		var ResponseError = class ResponseError2 extends Error {
			static {
				__name(this, "ResponseError");
			}
			constructor(code, message, data) {
				super(message);
				this.code = is.number(code) ? code : ErrorCodes.UnknownErrorCode;
				this.data = data;
				Object.setPrototypeOf(this, ResponseError2.prototype);
			}
			toJson() {
				const result = {
					code: this.code,
					message: this.message,
				};
				if (this.data !== void 0) {
					result.data = this.data;
				}
				return result;
			}
		};
		exports2.ResponseError = ResponseError;
		var ParameterStructures = class ParameterStructures2 {
			static {
				__name(this, "ParameterStructures");
			}
			constructor(kind) {
				this.kind = kind;
			}
			static is(value) {
				return (
					value === ParameterStructures2.auto ||
					value === ParameterStructures2.byName ||
					value === ParameterStructures2.byPosition
				);
			}
			toString() {
				return this.kind;
			}
		};
		exports2.ParameterStructures = ParameterStructures;
		ParameterStructures.auto = new ParameterStructures("auto");
		ParameterStructures.byPosition = new ParameterStructures("byPosition");
		ParameterStructures.byName = new ParameterStructures("byName");
		var AbstractMessageSignature = class AbstractMessageSignature {
			static {
				__name(this, "AbstractMessageSignature");
			}
			constructor(method, numberOfParams) {
				this.method = method;
				this.numberOfParams = numberOfParams;
			}
			get parameterStructures() {
				return ParameterStructures.auto;
			}
		};
		exports2.AbstractMessageSignature = AbstractMessageSignature;
		var RequestType0 = class RequestType0 extends AbstractMessageSignature {
			static {
				__name(this, "RequestType0");
			}
			constructor(method) {
				super(method, 0);
			}
		};
		exports2.RequestType0 = RequestType0;
		var RequestType = class RequestType extends AbstractMessageSignature {
			static {
				__name(this, "RequestType");
			}
			constructor(method, _parameterStructures = ParameterStructures.auto) {
				super(method, 1);
				this._parameterStructures = _parameterStructures;
			}
			get parameterStructures() {
				return this._parameterStructures;
			}
		};
		exports2.RequestType = RequestType;
		var RequestType1 = class RequestType1 extends AbstractMessageSignature {
			static {
				__name(this, "RequestType1");
			}
			constructor(method, _parameterStructures = ParameterStructures.auto) {
				super(method, 1);
				this._parameterStructures = _parameterStructures;
			}
			get parameterStructures() {
				return this._parameterStructures;
			}
		};
		exports2.RequestType1 = RequestType1;
		var RequestType2 = class RequestType2 extends AbstractMessageSignature {
			static {
				__name(this, "RequestType2");
			}
			constructor(method) {
				super(method, 2);
			}
		};
		exports2.RequestType2 = RequestType2;
		var RequestType3 = class RequestType3 extends AbstractMessageSignature {
			static {
				__name(this, "RequestType3");
			}
			constructor(method) {
				super(method, 3);
			}
		};
		exports2.RequestType3 = RequestType3;
		var RequestType4 = class RequestType4 extends AbstractMessageSignature {
			static {
				__name(this, "RequestType4");
			}
			constructor(method) {
				super(method, 4);
			}
		};
		exports2.RequestType4 = RequestType4;
		var RequestType5 = class RequestType5 extends AbstractMessageSignature {
			static {
				__name(this, "RequestType5");
			}
			constructor(method) {
				super(method, 5);
			}
		};
		exports2.RequestType5 = RequestType5;
		var RequestType6 = class RequestType6 extends AbstractMessageSignature {
			static {
				__name(this, "RequestType6");
			}
			constructor(method) {
				super(method, 6);
			}
		};
		exports2.RequestType6 = RequestType6;
		var RequestType7 = class RequestType7 extends AbstractMessageSignature {
			static {
				__name(this, "RequestType7");
			}
			constructor(method) {
				super(method, 7);
			}
		};
		exports2.RequestType7 = RequestType7;
		var RequestType8 = class RequestType8 extends AbstractMessageSignature {
			static {
				__name(this, "RequestType8");
			}
			constructor(method) {
				super(method, 8);
			}
		};
		exports2.RequestType8 = RequestType8;
		var RequestType9 = class RequestType9 extends AbstractMessageSignature {
			static {
				__name(this, "RequestType9");
			}
			constructor(method) {
				super(method, 9);
			}
		};
		exports2.RequestType9 = RequestType9;
		var NotificationType = class NotificationType extends AbstractMessageSignature {
			static {
				__name(this, "NotificationType");
			}
			constructor(method, _parameterStructures = ParameterStructures.auto) {
				super(method, 1);
				this._parameterStructures = _parameterStructures;
			}
			get parameterStructures() {
				return this._parameterStructures;
			}
		};
		exports2.NotificationType = NotificationType;
		var NotificationType0 = class NotificationType0 extends AbstractMessageSignature {
			static {
				__name(this, "NotificationType0");
			}
			constructor(method) {
				super(method, 0);
			}
		};
		exports2.NotificationType0 = NotificationType0;
		var NotificationType1 = class NotificationType1 extends AbstractMessageSignature {
			static {
				__name(this, "NotificationType1");
			}
			constructor(method, _parameterStructures = ParameterStructures.auto) {
				super(method, 1);
				this._parameterStructures = _parameterStructures;
			}
			get parameterStructures() {
				return this._parameterStructures;
			}
		};
		exports2.NotificationType1 = NotificationType1;
		var NotificationType2 = class NotificationType2 extends AbstractMessageSignature {
			static {
				__name(this, "NotificationType2");
			}
			constructor(method) {
				super(method, 2);
			}
		};
		exports2.NotificationType2 = NotificationType2;
		var NotificationType3 = class NotificationType3 extends AbstractMessageSignature {
			static {
				__name(this, "NotificationType3");
			}
			constructor(method) {
				super(method, 3);
			}
		};
		exports2.NotificationType3 = NotificationType3;
		var NotificationType4 = class NotificationType4 extends AbstractMessageSignature {
			static {
				__name(this, "NotificationType4");
			}
			constructor(method) {
				super(method, 4);
			}
		};
		exports2.NotificationType4 = NotificationType4;
		var NotificationType5 = class NotificationType5 extends AbstractMessageSignature {
			static {
				__name(this, "NotificationType5");
			}
			constructor(method) {
				super(method, 5);
			}
		};
		exports2.NotificationType5 = NotificationType5;
		var NotificationType6 = class NotificationType6 extends AbstractMessageSignature {
			static {
				__name(this, "NotificationType6");
			}
			constructor(method) {
				super(method, 6);
			}
		};
		exports2.NotificationType6 = NotificationType6;
		var NotificationType7 = class NotificationType7 extends AbstractMessageSignature {
			static {
				__name(this, "NotificationType7");
			}
			constructor(method) {
				super(method, 7);
			}
		};
		exports2.NotificationType7 = NotificationType7;
		var NotificationType8 = class NotificationType8 extends AbstractMessageSignature {
			static {
				__name(this, "NotificationType8");
			}
			constructor(method) {
				super(method, 8);
			}
		};
		exports2.NotificationType8 = NotificationType8;
		var NotificationType9 = class NotificationType9 extends AbstractMessageSignature {
			static {
				__name(this, "NotificationType9");
			}
			constructor(method) {
				super(method, 9);
			}
		};
		exports2.NotificationType9 = NotificationType9;
		var Message;
		(function (Message2) {
			function isRequest(message) {
				const candidate = message;
				return candidate && is.string(candidate.method) && (is.string(candidate.id) || is.number(candidate.id));
			}
			__name(isRequest, "isRequest");
			Message2.isRequest = isRequest;
			function isNotification(message) {
				const candidate = message;
				return candidate && is.string(candidate.method) && message.id === void 0;
			}
			__name(isNotification, "isNotification");
			Message2.isNotification = isNotification;
			function isResponse(message) {
				const candidate = message;
				return (
					candidate &&
					(candidate.result !== void 0 || !!candidate.error) &&
					(is.string(candidate.id) || is.number(candidate.id) || candidate.id === null)
				);
			}
			__name(isResponse, "isResponse");
			Message2.isResponse = isResponse;
		})(Message || (exports2.Message = Message = {}));
	},
});

// ../../../node_modules/.pnpm/vscode-jsonrpc@8.2.0/node_modules/vscode-jsonrpc/lib/common/linkedMap.js
var require_linkedMap = __commonJS({
	"../../../node_modules/.pnpm/vscode-jsonrpc@8.2.0/node_modules/vscode-jsonrpc/lib/common/linkedMap.js"(exports2) {
		"use strict";
		init_cjs_shims();
		var _a;
		Object.defineProperty(exports2, "__esModule", {
			value: true,
		});
		exports2.LRUCache = exports2.LinkedMap = exports2.Touch = void 0;
		var Touch;
		(function (Touch2) {
			Touch2.None = 0;
			Touch2.First = 1;
			Touch2.AsOld = Touch2.First;
			Touch2.Last = 2;
			Touch2.AsNew = Touch2.Last;
		})(Touch || (exports2.Touch = Touch = {}));
		var LinkedMap = class LinkedMap {
			static {
				__name(this, "LinkedMap");
			}
			constructor() {
				this[_a] = "LinkedMap";
				this._map = /* @__PURE__ */ new Map();
				this._head = void 0;
				this._tail = void 0;
				this._size = 0;
				this._state = 0;
			}
			clear() {
				this._map.clear();
				this._head = void 0;
				this._tail = void 0;
				this._size = 0;
				this._state++;
			}
			isEmpty() {
				return !this._head && !this._tail;
			}
			get size() {
				return this._size;
			}
			get first() {
				return this._head?.value;
			}
			get last() {
				return this._tail?.value;
			}
			has(key) {
				return this._map.has(key);
			}
			get(key, touch = Touch.None) {
				const item = this._map.get(key);
				if (!item) {
					return void 0;
				}
				if (touch !== Touch.None) {
					this.touch(item, touch);
				}
				return item.value;
			}
			set(key, value, touch = Touch.None) {
				let item = this._map.get(key);
				if (item) {
					item.value = value;
					if (touch !== Touch.None) {
						this.touch(item, touch);
					}
				} else {
					item = {
						key,
						value,
						next: void 0,
						previous: void 0,
					};
					switch (touch) {
						case Touch.None:
							this.addItemLast(item);
							break;
						case Touch.First:
							this.addItemFirst(item);
							break;
						case Touch.Last:
							this.addItemLast(item);
							break;
						default:
							this.addItemLast(item);
							break;
					}
					this._map.set(key, item);
					this._size++;
				}
				return this;
			}
			delete(key) {
				return !!this.remove(key);
			}
			remove(key) {
				const item = this._map.get(key);
				if (!item) {
					return void 0;
				}
				this._map.delete(key);
				this.removeItem(item);
				this._size--;
				return item.value;
			}
			shift() {
				if (!this._head && !this._tail) {
					return void 0;
				}
				if (!this._head || !this._tail) {
					throw new Error("Invalid list");
				}
				const item = this._head;
				this._map.delete(item.key);
				this.removeItem(item);
				this._size--;
				return item.value;
			}
			forEach(callbackfn, thisArg) {
				const state = this._state;
				let current = this._head;
				while (current) {
					if (thisArg) {
						callbackfn.bind(thisArg)(current.value, current.key, this);
					} else {
						callbackfn(current.value, current.key, this);
					}
					if (this._state !== state) {
						throw new Error(`LinkedMap got modified during iteration.`);
					}
					current = current.next;
				}
			}
			keys() {
				const state = this._state;
				let current = this._head;
				const iterator = {
					[Symbol.iterator]: () => {
						return iterator;
					},
					next: /* @__PURE__ */ __name(() => {
						if (this._state !== state) {
							throw new Error(`LinkedMap got modified during iteration.`);
						}
						if (current) {
							const result = {
								value: current.key,
								done: false,
							};
							current = current.next;
							return result;
						} else {
							return {
								value: void 0,
								done: true,
							};
						}
					}, "next"),
				};
				return iterator;
			}
			values() {
				const state = this._state;
				let current = this._head;
				const iterator = {
					[Symbol.iterator]: () => {
						return iterator;
					},
					next: /* @__PURE__ */ __name(() => {
						if (this._state !== state) {
							throw new Error(`LinkedMap got modified during iteration.`);
						}
						if (current) {
							const result = {
								value: current.value,
								done: false,
							};
							current = current.next;
							return result;
						} else {
							return {
								value: void 0,
								done: true,
							};
						}
					}, "next"),
				};
				return iterator;
			}
			entries() {
				const state = this._state;
				let current = this._head;
				const iterator = {
					[Symbol.iterator]: () => {
						return iterator;
					},
					next: /* @__PURE__ */ __name(() => {
						if (this._state !== state) {
							throw new Error(`LinkedMap got modified during iteration.`);
						}
						if (current) {
							const result = {
								value: [current.key, current.value],
								done: false,
							};
							current = current.next;
							return result;
						} else {
							return {
								value: void 0,
								done: true,
							};
						}
					}, "next"),
				};
				return iterator;
			}
			[((_a = Symbol.toStringTag), Symbol.iterator)]() {
				return this.entries();
			}
			trimOld(newSize) {
				if (newSize >= this.size) {
					return;
				}
				if (newSize === 0) {
					this.clear();
					return;
				}
				let current = this._head;
				let currentSize = this.size;
				while (current && currentSize > newSize) {
					this._map.delete(current.key);
					current = current.next;
					currentSize--;
				}
				this._head = current;
				this._size = currentSize;
				if (current) {
					current.previous = void 0;
				}
				this._state++;
			}
			addItemFirst(item) {
				if (!this._head && !this._tail) {
					this._tail = item;
				} else if (!this._head) {
					throw new Error("Invalid list");
				} else {
					item.next = this._head;
					this._head.previous = item;
				}
				this._head = item;
				this._state++;
			}
			addItemLast(item) {
				if (!this._head && !this._tail) {
					this._head = item;
				} else if (!this._tail) {
					throw new Error("Invalid list");
				} else {
					item.previous = this._tail;
					this._tail.next = item;
				}
				this._tail = item;
				this._state++;
			}
			removeItem(item) {
				if (item === this._head && item === this._tail) {
					this._head = void 0;
					this._tail = void 0;
				} else if (item === this._head) {
					if (!item.next) {
						throw new Error("Invalid list");
					}
					item.next.previous = void 0;
					this._head = item.next;
				} else if (item === this._tail) {
					if (!item.previous) {
						throw new Error("Invalid list");
					}
					item.previous.next = void 0;
					this._tail = item.previous;
				} else {
					const next = item.next;
					const previous = item.previous;
					if (!next || !previous) {
						throw new Error("Invalid list");
					}
					next.previous = previous;
					previous.next = next;
				}
				item.next = void 0;
				item.previous = void 0;
				this._state++;
			}
			touch(item, touch) {
				if (!this._head || !this._tail) {
					throw new Error("Invalid list");
				}
				if (touch !== Touch.First && touch !== Touch.Last) {
					return;
				}
				if (touch === Touch.First) {
					if (item === this._head) {
						return;
					}
					const next = item.next;
					const previous = item.previous;
					if (item === this._tail) {
						previous.next = void 0;
						this._tail = previous;
					} else {
						next.previous = previous;
						previous.next = next;
					}
					item.previous = void 0;
					item.next = this._head;
					this._head.previous = item;
					this._head = item;
					this._state++;
				} else if (touch === Touch.Last) {
					if (item === this._tail) {
						return;
					}
					const next = item.next;
					const previous = item.previous;
					if (item === this._head) {
						next.previous = void 0;
						this._head = next;
					} else {
						next.previous = previous;
						previous.next = next;
					}
					item.next = void 0;
					item.previous = this._tail;
					this._tail.next = item;
					this._tail = item;
					this._state++;
				}
			}
			toJSON() {
				const data = [];
				this.forEach((value, key) => {
					data.push([key, value]);
				});
				return data;
			}
			fromJSON(data) {
				this.clear();
				for (const [key, value] of data) {
					this.set(key, value);
				}
			}
		};
		exports2.LinkedMap = LinkedMap;
		var LRUCache = class LRUCache extends LinkedMap {
			static {
				__name(this, "LRUCache");
			}
			constructor(limit, ratio = 1) {
				super();
				this._limit = limit;
				this._ratio = Math.min(Math.max(0, ratio), 1);
			}
			get limit() {
				return this._limit;
			}
			set limit(limit) {
				this._limit = limit;
				this.checkTrim();
			}
			get ratio() {
				return this._ratio;
			}
			set ratio(ratio) {
				this._ratio = Math.min(Math.max(0, ratio), 1);
				this.checkTrim();
			}
			get(key, touch = Touch.AsNew) {
				return super.get(key, touch);
			}
			peek(key) {
				return super.get(key, Touch.None);
			}
			set(key, value) {
				super.set(key, value, Touch.Last);
				this.checkTrim();
				return this;
			}
			checkTrim() {
				if (this.size > this._limit) {
					this.trimOld(Math.round(this._limit * this._ratio));
				}
			}
		};
		exports2.LRUCache = LRUCache;
	},
});

// ../../../node_modules/.pnpm/vscode-jsonrpc@8.2.0/node_modules/vscode-jsonrpc/lib/common/disposable.js
var require_disposable = __commonJS({
	"../../../node_modules/.pnpm/vscode-jsonrpc@8.2.0/node_modules/vscode-jsonrpc/lib/common/disposable.js"(exports2) {
		"use strict";
		init_cjs_shims();
		Object.defineProperty(exports2, "__esModule", {
			value: true,
		});
		exports2.Disposable = void 0;
		var Disposable;
		(function (Disposable2) {
			function create(func) {
				return {
					dispose: func,
				};
			}
			__name(create, "create");
			Disposable2.create = create;
		})(Disposable || (exports2.Disposable = Disposable = {}));
	},
});

// ../../../node_modules/.pnpm/vscode-jsonrpc@8.2.0/node_modules/vscode-jsonrpc/lib/common/ral.js
var require_ral = __commonJS({
	"../../../node_modules/.pnpm/vscode-jsonrpc@8.2.0/node_modules/vscode-jsonrpc/lib/common/ral.js"(exports2) {
		"use strict";
		init_cjs_shims();
		Object.defineProperty(exports2, "__esModule", {
			value: true,
		});
		var _ral;
		function RAL() {
			if (_ral === void 0) {
				throw new Error(`No runtime abstraction layer installed`);
			}
			return _ral;
		}
		__name(RAL, "RAL");
		(function (RAL2) {
			function install(ral) {
				if (ral === void 0) {
					throw new Error(`No runtime abstraction layer provided`);
				}
				_ral = ral;
			}
			__name(install, "install");
			RAL2.install = install;
		})(RAL || (RAL = {}));
		exports2.default = RAL;
	},
});

// ../../../node_modules/.pnpm/vscode-jsonrpc@8.2.0/node_modules/vscode-jsonrpc/lib/common/events.js
var require_events = __commonJS({
	"../../../node_modules/.pnpm/vscode-jsonrpc@8.2.0/node_modules/vscode-jsonrpc/lib/common/events.js"(exports2) {
		"use strict";
		init_cjs_shims();
		Object.defineProperty(exports2, "__esModule", {
			value: true,
		});
		exports2.Emitter = exports2.Event = void 0;
		var ral_1 = require_ral();
		var Event;
		(function (Event2) {
			const _disposable = {
				dispose() {},
			};
			Event2.None = function () {
				return _disposable;
			};
		})(Event || (exports2.Event = Event = {}));
		var CallbackList = class CallbackList {
			static {
				__name(this, "CallbackList");
			}
			add(callback, context = null, bucket) {
				if (!this._callbacks) {
					this._callbacks = [];
					this._contexts = [];
				}
				this._callbacks.push(callback);
				this._contexts.push(context);
				if (Array.isArray(bucket)) {
					bucket.push({
						dispose: /* @__PURE__ */ __name(() => this.remove(callback, context), "dispose"),
					});
				}
			}
			remove(callback, context = null) {
				if (!this._callbacks) {
					return;
				}
				let foundCallbackWithDifferentContext = false;
				for (let i = 0, len = this._callbacks.length; i < len; i++) {
					if (this._callbacks[i] === callback) {
						if (this._contexts[i] === context) {
							this._callbacks.splice(i, 1);
							this._contexts.splice(i, 1);
							return;
						} else {
							foundCallbackWithDifferentContext = true;
						}
					}
				}
				if (foundCallbackWithDifferentContext) {
					throw new Error("When adding a listener with a context, you should remove it with the same context");
				}
			}
			invoke(...args) {
				if (!this._callbacks) {
					return [];
				}
				const ret = [],
					callbacks = this._callbacks.slice(0),
					contexts = this._contexts.slice(0);
				for (let i = 0, len = callbacks.length; i < len; i++) {
					try {
						ret.push(callbacks[i].apply(contexts[i], args));
					} catch (e) {
						(0, ral_1.default)().console.error(e);
					}
				}
				return ret;
			}
			isEmpty() {
				return !this._callbacks || this._callbacks.length === 0;
			}
			dispose() {
				this._callbacks = void 0;
				this._contexts = void 0;
			}
		};
		var Emitter = class Emitter2 {
			static {
				__name(this, "Emitter");
			}
			constructor(_options) {
				this._options = _options;
			}
			/**
			 * For the public to allow to subscribe
			 * to events from this Emitter
			 */
			get event() {
				if (!this._event) {
					this._event = (listener, thisArgs, disposables) => {
						if (!this._callbacks) {
							this._callbacks = new CallbackList();
						}
						if (this._options && this._options.onFirstListenerAdd && this._callbacks.isEmpty()) {
							this._options.onFirstListenerAdd(this);
						}
						this._callbacks.add(listener, thisArgs);
						const result = {
							dispose: /* @__PURE__ */ __name(() => {
								if (!this._callbacks) {
									return;
								}
								this._callbacks.remove(listener, thisArgs);
								result.dispose = Emitter2._noop;
								if (this._options && this._options.onLastListenerRemove && this._callbacks.isEmpty()) {
									this._options.onLastListenerRemove(this);
								}
							}, "dispose"),
						};
						if (Array.isArray(disposables)) {
							disposables.push(result);
						}
						return result;
					};
				}
				return this._event;
			}
			/**
			 * To be kept private to fire an event to
			 * subscribers
			 */
			fire(event) {
				if (this._callbacks) {
					this._callbacks.invoke.call(this._callbacks, event);
				}
			}
			dispose() {
				if (this._callbacks) {
					this._callbacks.dispose();
					this._callbacks = void 0;
				}
			}
		};
		exports2.Emitter = Emitter;
		Emitter._noop = function () {};
	},
});

// ../../../node_modules/.pnpm/vscode-jsonrpc@8.2.0/node_modules/vscode-jsonrpc/lib/common/cancellation.js
var require_cancellation = __commonJS({
	"../../../node_modules/.pnpm/vscode-jsonrpc@8.2.0/node_modules/vscode-jsonrpc/lib/common/cancellation.js"(exports2) {
		"use strict";
		init_cjs_shims();
		Object.defineProperty(exports2, "__esModule", {
			value: true,
		});
		exports2.CancellationTokenSource = exports2.CancellationToken = void 0;
		var ral_1 = require_ral();
		var Is2 = require_is2();
		var events_1 = require_events();
		var CancellationToken;
		(function (CancellationToken2) {
			CancellationToken2.None = Object.freeze({
				isCancellationRequested: false,
				onCancellationRequested: events_1.Event.None,
			});
			CancellationToken2.Cancelled = Object.freeze({
				isCancellationRequested: true,
				onCancellationRequested: events_1.Event.None,
			});
			function is(value) {
				const candidate = value;
				return (
					candidate &&
					(candidate === CancellationToken2.None ||
						candidate === CancellationToken2.Cancelled ||
						(Is2.boolean(candidate.isCancellationRequested) && !!candidate.onCancellationRequested))
				);
			}
			__name(is, "is");
			CancellationToken2.is = is;
		})(CancellationToken || (exports2.CancellationToken = CancellationToken = {}));
		var shortcutEvent = Object.freeze(function (callback, context) {
			const handle = (0, ral_1.default)().timer.setTimeout(callback.bind(context), 0);
			return {
				dispose() {
					handle.dispose();
				},
			};
		});
		var MutableToken = class MutableToken {
			static {
				__name(this, "MutableToken");
			}
			constructor() {
				this._isCancelled = false;
			}
			cancel() {
				if (!this._isCancelled) {
					this._isCancelled = true;
					if (this._emitter) {
						this._emitter.fire(void 0);
						this.dispose();
					}
				}
			}
			get isCancellationRequested() {
				return this._isCancelled;
			}
			get onCancellationRequested() {
				if (this._isCancelled) {
					return shortcutEvent;
				}
				if (!this._emitter) {
					this._emitter = new events_1.Emitter();
				}
				return this._emitter.event;
			}
			dispose() {
				if (this._emitter) {
					this._emitter.dispose();
					this._emitter = void 0;
				}
			}
		};
		var CancellationTokenSource = class CancellationTokenSource {
			static {
				__name(this, "CancellationTokenSource");
			}
			get token() {
				if (!this._token) {
					this._token = new MutableToken();
				}
				return this._token;
			}
			cancel() {
				if (!this._token) {
					this._token = CancellationToken.Cancelled;
				} else {
					this._token.cancel();
				}
			}
			dispose() {
				if (!this._token) {
					this._token = CancellationToken.None;
				} else if (this._token instanceof MutableToken) {
					this._token.dispose();
				}
			}
		};
		exports2.CancellationTokenSource = CancellationTokenSource;
	},
});

// ../../../node_modules/.pnpm/vscode-jsonrpc@8.2.0/node_modules/vscode-jsonrpc/lib/common/sharedArrayCancellation.js
var require_sharedArrayCancellation = __commonJS({
	"../../../node_modules/.pnpm/vscode-jsonrpc@8.2.0/node_modules/vscode-jsonrpc/lib/common/sharedArrayCancellation.js"(
		exports2,
	) {
		"use strict";
		init_cjs_shims();
		Object.defineProperty(exports2, "__esModule", {
			value: true,
		});
		exports2.SharedArrayReceiverStrategy = exports2.SharedArraySenderStrategy = void 0;
		var cancellation_1 = require_cancellation();
		var CancellationState;
		(function (CancellationState2) {
			CancellationState2.Continue = 0;
			CancellationState2.Cancelled = 1;
		})(CancellationState || (CancellationState = {}));
		var SharedArraySenderStrategy = class SharedArraySenderStrategy {
			static {
				__name(this, "SharedArraySenderStrategy");
			}
			constructor() {
				this.buffers = /* @__PURE__ */ new Map();
			}
			enableCancellation(request) {
				if (request.id === null) {
					return;
				}
				const buffer = new SharedArrayBuffer(4);
				const data = new Int32Array(buffer, 0, 1);
				data[0] = CancellationState.Continue;
				this.buffers.set(request.id, buffer);
				request.$cancellationData = buffer;
			}
			async sendCancellation(_conn, id) {
				const buffer = this.buffers.get(id);
				if (buffer === void 0) {
					return;
				}
				const data = new Int32Array(buffer, 0, 1);
				Atomics.store(data, 0, CancellationState.Cancelled);
			}
			cleanup(id) {
				this.buffers.delete(id);
			}
			dispose() {
				this.buffers.clear();
			}
		};
		exports2.SharedArraySenderStrategy = SharedArraySenderStrategy;
		var SharedArrayBufferCancellationToken = class SharedArrayBufferCancellationToken {
			static {
				__name(this, "SharedArrayBufferCancellationToken");
			}
			constructor(buffer) {
				this.data = new Int32Array(buffer, 0, 1);
			}
			get isCancellationRequested() {
				return Atomics.load(this.data, 0) === CancellationState.Cancelled;
			}
			get onCancellationRequested() {
				throw new Error(`Cancellation over SharedArrayBuffer doesn't support cancellation events`);
			}
		};
		var SharedArrayBufferCancellationTokenSource = class SharedArrayBufferCancellationTokenSource {
			static {
				__name(this, "SharedArrayBufferCancellationTokenSource");
			}
			constructor(buffer) {
				this.token = new SharedArrayBufferCancellationToken(buffer);
			}
			cancel() {}
			dispose() {}
		};
		var SharedArrayReceiverStrategy = class SharedArrayReceiverStrategy {
			static {
				__name(this, "SharedArrayReceiverStrategy");
			}
			constructor() {
				this.kind = "request";
			}
			createCancellationTokenSource(request) {
				const buffer = request.$cancellationData;
				if (buffer === void 0) {
					return new cancellation_1.CancellationTokenSource();
				}
				return new SharedArrayBufferCancellationTokenSource(buffer);
			}
		};
		exports2.SharedArrayReceiverStrategy = SharedArrayReceiverStrategy;
	},
});

// ../../../node_modules/.pnpm/vscode-jsonrpc@8.2.0/node_modules/vscode-jsonrpc/lib/common/semaphore.js
var require_semaphore = __commonJS({
	"../../../node_modules/.pnpm/vscode-jsonrpc@8.2.0/node_modules/vscode-jsonrpc/lib/common/semaphore.js"(exports2) {
		"use strict";
		init_cjs_shims();
		Object.defineProperty(exports2, "__esModule", {
			value: true,
		});
		exports2.Semaphore = void 0;
		var ral_1 = require_ral();
		var Semaphore = class Semaphore {
			static {
				__name(this, "Semaphore");
			}
			constructor(capacity = 1) {
				if (capacity <= 0) {
					throw new Error("Capacity must be greater than 0");
				}
				this._capacity = capacity;
				this._active = 0;
				this._waiting = [];
			}
			lock(thunk) {
				return new Promise((resolve, reject) => {
					this._waiting.push({
						thunk,
						resolve,
						reject,
					});
					this.runNext();
				});
			}
			get active() {
				return this._active;
			}
			runNext() {
				if (this._waiting.length === 0 || this._active === this._capacity) {
					return;
				}
				(0, ral_1.default)().timer.setImmediate(() => this.doRunNext());
			}
			doRunNext() {
				if (this._waiting.length === 0 || this._active === this._capacity) {
					return;
				}
				const next = this._waiting.shift();
				this._active++;
				if (this._active > this._capacity) {
					throw new Error(`To many thunks active`);
				}
				try {
					const result = next.thunk();
					if (result instanceof Promise) {
						result.then(
							(value) => {
								this._active--;
								next.resolve(value);
								this.runNext();
							},
							(err) => {
								this._active--;
								next.reject(err);
								this.runNext();
							},
						);
					} else {
						this._active--;
						next.resolve(result);
						this.runNext();
					}
				} catch (err) {
					this._active--;
					next.reject(err);
					this.runNext();
				}
			}
		};
		exports2.Semaphore = Semaphore;
	},
});

// ../../../node_modules/.pnpm/vscode-jsonrpc@8.2.0/node_modules/vscode-jsonrpc/lib/common/messageReader.js
var require_messageReader = __commonJS({
	"../../../node_modules/.pnpm/vscode-jsonrpc@8.2.0/node_modules/vscode-jsonrpc/lib/common/messageReader.js"(exports2) {
		"use strict";
		init_cjs_shims();
		Object.defineProperty(exports2, "__esModule", {
			value: true,
		});
		exports2.ReadableStreamMessageReader = exports2.AbstractMessageReader = exports2.MessageReader = void 0;
		var ral_1 = require_ral();
		var Is2 = require_is2();
		var events_1 = require_events();
		var semaphore_1 = require_semaphore();
		var MessageReader;
		(function (MessageReader2) {
			function is(value) {
				let candidate = value;
				return (
					candidate &&
					Is2.func(candidate.listen) &&
					Is2.func(candidate.dispose) &&
					Is2.func(candidate.onError) &&
					Is2.func(candidate.onClose) &&
					Is2.func(candidate.onPartialMessage)
				);
			}
			__name(is, "is");
			MessageReader2.is = is;
		})(MessageReader || (exports2.MessageReader = MessageReader = {}));
		var AbstractMessageReader = class AbstractMessageReader {
			static {
				__name(this, "AbstractMessageReader");
			}
			constructor() {
				this.errorEmitter = new events_1.Emitter();
				this.closeEmitter = new events_1.Emitter();
				this.partialMessageEmitter = new events_1.Emitter();
			}
			dispose() {
				this.errorEmitter.dispose();
				this.closeEmitter.dispose();
			}
			get onError() {
				return this.errorEmitter.event;
			}
			fireError(error) {
				this.errorEmitter.fire(this.asError(error));
			}
			get onClose() {
				return this.closeEmitter.event;
			}
			fireClose() {
				this.closeEmitter.fire(void 0);
			}
			get onPartialMessage() {
				return this.partialMessageEmitter.event;
			}
			firePartialMessage(info) {
				this.partialMessageEmitter.fire(info);
			}
			asError(error) {
				if (error instanceof Error) {
					return error;
				} else {
					return new Error(`Reader received error. Reason: ${Is2.string(error.message) ? error.message : "unknown"}`);
				}
			}
		};
		exports2.AbstractMessageReader = AbstractMessageReader;
		var ResolvedMessageReaderOptions;
		(function (ResolvedMessageReaderOptions2) {
			function fromOptions(options) {
				let charset;
				let result;
				let contentDecoder;
				const contentDecoders = /* @__PURE__ */ new Map();
				let contentTypeDecoder;
				const contentTypeDecoders = /* @__PURE__ */ new Map();
				if (options === void 0 || typeof options === "string") {
					charset = options ?? "utf-8";
				} else {
					charset = options.charset ?? "utf-8";
					if (options.contentDecoder !== void 0) {
						contentDecoder = options.contentDecoder;
						contentDecoders.set(contentDecoder.name, contentDecoder);
					}
					if (options.contentDecoders !== void 0) {
						for (const decoder of options.contentDecoders) {
							contentDecoders.set(decoder.name, decoder);
						}
					}
					if (options.contentTypeDecoder !== void 0) {
						contentTypeDecoder = options.contentTypeDecoder;
						contentTypeDecoders.set(contentTypeDecoder.name, contentTypeDecoder);
					}
					if (options.contentTypeDecoders !== void 0) {
						for (const decoder of options.contentTypeDecoders) {
							contentTypeDecoders.set(decoder.name, decoder);
						}
					}
				}
				if (contentTypeDecoder === void 0) {
					contentTypeDecoder = (0, ral_1.default)().applicationJson.decoder;
					contentTypeDecoders.set(contentTypeDecoder.name, contentTypeDecoder);
				}
				return {
					charset,
					contentDecoder,
					contentDecoders,
					contentTypeDecoder,
					contentTypeDecoders,
				};
			}
			__name(fromOptions, "fromOptions");
			ResolvedMessageReaderOptions2.fromOptions = fromOptions;
		})(ResolvedMessageReaderOptions || (ResolvedMessageReaderOptions = {}));
		var ReadableStreamMessageReader = class ReadableStreamMessageReader extends AbstractMessageReader {
			static {
				__name(this, "ReadableStreamMessageReader");
			}
			constructor(readable, options) {
				super();
				this.readable = readable;
				this.options = ResolvedMessageReaderOptions.fromOptions(options);
				this.buffer = (0, ral_1.default)().messageBuffer.create(this.options.charset);
				this._partialMessageTimeout = 1e4;
				this.nextMessageLength = -1;
				this.messageToken = 0;
				this.readSemaphore = new semaphore_1.Semaphore(1);
			}
			set partialMessageTimeout(timeout) {
				this._partialMessageTimeout = timeout;
			}
			get partialMessageTimeout() {
				return this._partialMessageTimeout;
			}
			listen(callback) {
				this.nextMessageLength = -1;
				this.messageToken = 0;
				this.partialMessageTimer = void 0;
				this.callback = callback;
				const result = this.readable.onData((data) => {
					this.onData(data);
				});
				this.readable.onError((error) => this.fireError(error));
				this.readable.onClose(() => this.fireClose());
				return result;
			}
			onData(data) {
				try {
					this.buffer.append(data);
					while (true) {
						if (this.nextMessageLength === -1) {
							const headers = this.buffer.tryReadHeaders(true);
							if (!headers) {
								return;
							}
							const contentLength = headers.get("content-length");
							if (!contentLength) {
								this.fireError(
									new Error(`Header must provide a Content-Length property.
${JSON.stringify(Object.fromEntries(headers))}`),
								);
								return;
							}
							const length = parseInt(contentLength);
							if (isNaN(length)) {
								this.fireError(new Error(`Content-Length value must be a number. Got ${contentLength}`));
								return;
							}
							this.nextMessageLength = length;
						}
						const body = this.buffer.tryReadBody(this.nextMessageLength);
						if (body === void 0) {
							this.setPartialMessageTimer();
							return;
						}
						this.clearPartialMessageTimer();
						this.nextMessageLength = -1;
						this.readSemaphore
							.lock(async () => {
								const bytes = this.options.contentDecoder !== void 0 ? await this.options.contentDecoder.decode(body) : body;
								const message = await this.options.contentTypeDecoder.decode(bytes, this.options);
								this.callback(message);
							})
							.catch((error) => {
								this.fireError(error);
							});
					}
				} catch (error) {
					this.fireError(error);
				}
			}
			clearPartialMessageTimer() {
				if (this.partialMessageTimer) {
					this.partialMessageTimer.dispose();
					this.partialMessageTimer = void 0;
				}
			}
			setPartialMessageTimer() {
				this.clearPartialMessageTimer();
				if (this._partialMessageTimeout <= 0) {
					return;
				}
				this.partialMessageTimer = (0, ral_1.default)().timer.setTimeout(
					(token, timeout) => {
						this.partialMessageTimer = void 0;
						if (token === this.messageToken) {
							this.firePartialMessage({
								messageToken: token,
								waitingTime: timeout,
							});
							this.setPartialMessageTimer();
						}
					},
					this._partialMessageTimeout,
					this.messageToken,
					this._partialMessageTimeout,
				);
			}
		};
		exports2.ReadableStreamMessageReader = ReadableStreamMessageReader;
	},
});

// ../../../node_modules/.pnpm/vscode-jsonrpc@8.2.0/node_modules/vscode-jsonrpc/lib/common/messageWriter.js
var require_messageWriter = __commonJS({
	"../../../node_modules/.pnpm/vscode-jsonrpc@8.2.0/node_modules/vscode-jsonrpc/lib/common/messageWriter.js"(exports2) {
		"use strict";
		init_cjs_shims();
		Object.defineProperty(exports2, "__esModule", {
			value: true,
		});
		exports2.WriteableStreamMessageWriter = exports2.AbstractMessageWriter = exports2.MessageWriter = void 0;
		var ral_1 = require_ral();
		var Is2 = require_is2();
		var semaphore_1 = require_semaphore();
		var events_1 = require_events();
		var ContentLength = "Content-Length: ";
		var CRLF = "\r\n";
		var MessageWriter;
		(function (MessageWriter2) {
			function is(value) {
				let candidate = value;
				return (
					candidate &&
					Is2.func(candidate.dispose) &&
					Is2.func(candidate.onClose) &&
					Is2.func(candidate.onError) &&
					Is2.func(candidate.write)
				);
			}
			__name(is, "is");
			MessageWriter2.is = is;
		})(MessageWriter || (exports2.MessageWriter = MessageWriter = {}));
		var AbstractMessageWriter = class AbstractMessageWriter {
			static {
				__name(this, "AbstractMessageWriter");
			}
			constructor() {
				this.errorEmitter = new events_1.Emitter();
				this.closeEmitter = new events_1.Emitter();
			}
			dispose() {
				this.errorEmitter.dispose();
				this.closeEmitter.dispose();
			}
			get onError() {
				return this.errorEmitter.event;
			}
			fireError(error, message, count) {
				this.errorEmitter.fire([this.asError(error), message, count]);
			}
			get onClose() {
				return this.closeEmitter.event;
			}
			fireClose() {
				this.closeEmitter.fire(void 0);
			}
			asError(error) {
				if (error instanceof Error) {
					return error;
				} else {
					return new Error(`Writer received error. Reason: ${Is2.string(error.message) ? error.message : "unknown"}`);
				}
			}
		};
		exports2.AbstractMessageWriter = AbstractMessageWriter;
		var ResolvedMessageWriterOptions;
		(function (ResolvedMessageWriterOptions2) {
			function fromOptions(options) {
				if (options === void 0 || typeof options === "string") {
					return {
						charset: options ?? "utf-8",
						contentTypeEncoder: (0, ral_1.default)().applicationJson.encoder,
					};
				} else {
					return {
						charset: options.charset ?? "utf-8",
						contentEncoder: options.contentEncoder,
						contentTypeEncoder: options.contentTypeEncoder ?? (0, ral_1.default)().applicationJson.encoder,
					};
				}
			}
			__name(fromOptions, "fromOptions");
			ResolvedMessageWriterOptions2.fromOptions = fromOptions;
		})(ResolvedMessageWriterOptions || (ResolvedMessageWriterOptions = {}));
		var WriteableStreamMessageWriter = class WriteableStreamMessageWriter extends AbstractMessageWriter {
			static {
				__name(this, "WriteableStreamMessageWriter");
			}
			constructor(writable, options) {
				super();
				this.writable = writable;
				this.options = ResolvedMessageWriterOptions.fromOptions(options);
				this.errorCount = 0;
				this.writeSemaphore = new semaphore_1.Semaphore(1);
				this.writable.onError((error) => this.fireError(error));
				this.writable.onClose(() => this.fireClose());
			}
			async write(msg) {
				return this.writeSemaphore.lock(async () => {
					const payload = this.options.contentTypeEncoder.encode(msg, this.options).then((buffer) => {
						if (this.options.contentEncoder !== void 0) {
							return this.options.contentEncoder.encode(buffer);
						} else {
							return buffer;
						}
					});
					return payload.then(
						(buffer) => {
							const headers = [];
							headers.push(ContentLength, buffer.byteLength.toString(), CRLF);
							headers.push(CRLF);
							return this.doWrite(msg, headers, buffer);
						},
						(error) => {
							this.fireError(error);
							throw error;
						},
					);
				});
			}
			async doWrite(msg, headers, data) {
				try {
					await this.writable.write(headers.join(""), "ascii");
					return this.writable.write(data);
				} catch (error) {
					this.handleError(error, msg);
					return Promise.reject(error);
				}
			}
			handleError(error, msg) {
				this.errorCount++;
				this.fireError(error, msg, this.errorCount);
			}
			end() {
				this.writable.end();
			}
		};
		exports2.WriteableStreamMessageWriter = WriteableStreamMessageWriter;
	},
});

// ../../../node_modules/.pnpm/vscode-jsonrpc@8.2.0/node_modules/vscode-jsonrpc/lib/common/messageBuffer.js
var require_messageBuffer = __commonJS({
	"../../../node_modules/.pnpm/vscode-jsonrpc@8.2.0/node_modules/vscode-jsonrpc/lib/common/messageBuffer.js"(exports2) {
		"use strict";
		init_cjs_shims();
		Object.defineProperty(exports2, "__esModule", {
			value: true,
		});
		exports2.AbstractMessageBuffer = void 0;
		var CR = 13;
		var LF = 10;
		var CRLF = "\r\n";
		var AbstractMessageBuffer = class AbstractMessageBuffer {
			static {
				__name(this, "AbstractMessageBuffer");
			}
			constructor(encoding = "utf-8") {
				this._encoding = encoding;
				this._chunks = [];
				this._totalLength = 0;
			}
			get encoding() {
				return this._encoding;
			}
			append(chunk) {
				const toAppend = typeof chunk === "string" ? this.fromString(chunk, this._encoding) : chunk;
				this._chunks.push(toAppend);
				this._totalLength += toAppend.byteLength;
			}
			tryReadHeaders(lowerCaseKeys = false) {
				if (this._chunks.length === 0) {
					return void 0;
				}
				let state = 0;
				let chunkIndex = 0;
				let offset = 0;
				let chunkBytesRead = 0;
				row: while (chunkIndex < this._chunks.length) {
					const chunk = this._chunks[chunkIndex];
					offset = 0;
					column: while (offset < chunk.length) {
						const value = chunk[offset];
						switch (value) {
							case CR:
								switch (state) {
									case 0:
										state = 1;
										break;
									case 2:
										state = 3;
										break;
									default:
										state = 0;
								}
								break;
							case LF:
								switch (state) {
									case 1:
										state = 2;
										break;
									case 3:
										state = 4;
										offset++;
										break row;
									default:
										state = 0;
								}
								break;
							default:
								state = 0;
						}
						offset++;
					}
					chunkBytesRead += chunk.byteLength;
					chunkIndex++;
				}
				if (state !== 4) {
					return void 0;
				}
				const buffer = this._read(chunkBytesRead + offset);
				const result = /* @__PURE__ */ new Map();
				const headers = this.toString(buffer, "ascii").split(CRLF);
				if (headers.length < 2) {
					return result;
				}
				for (let i = 0; i < headers.length - 2; i++) {
					const header = headers[i];
					const index = header.indexOf(":");
					if (index === -1) {
						throw new Error(`Message header must separate key and value using ':'
${header}`);
					}
					const key = header.substr(0, index);
					const value = header.substr(index + 1).trim();
					result.set(lowerCaseKeys ? key.toLowerCase() : key, value);
				}
				return result;
			}
			tryReadBody(length) {
				if (this._totalLength < length) {
					return void 0;
				}
				return this._read(length);
			}
			get numberOfBytes() {
				return this._totalLength;
			}
			_read(byteCount) {
				if (byteCount === 0) {
					return this.emptyBuffer();
				}
				if (byteCount > this._totalLength) {
					throw new Error(`Cannot read so many bytes!`);
				}
				if (this._chunks[0].byteLength === byteCount) {
					const chunk = this._chunks[0];
					this._chunks.shift();
					this._totalLength -= byteCount;
					return this.asNative(chunk);
				}
				if (this._chunks[0].byteLength > byteCount) {
					const chunk = this._chunks[0];
					const result2 = this.asNative(chunk, byteCount);
					this._chunks[0] = chunk.slice(byteCount);
					this._totalLength -= byteCount;
					return result2;
				}
				const result = this.allocNative(byteCount);
				let resultOffset = 0;
				let chunkIndex = 0;
				while (byteCount > 0) {
					const chunk = this._chunks[chunkIndex];
					if (chunk.byteLength > byteCount) {
						const chunkPart = chunk.slice(0, byteCount);
						result.set(chunkPart, resultOffset);
						resultOffset += byteCount;
						this._chunks[chunkIndex] = chunk.slice(byteCount);
						this._totalLength -= byteCount;
						byteCount -= byteCount;
					} else {
						result.set(chunk, resultOffset);
						resultOffset += chunk.byteLength;
						this._chunks.shift();
						this._totalLength -= chunk.byteLength;
						byteCount -= chunk.byteLength;
					}
				}
				return result;
			}
		};
		exports2.AbstractMessageBuffer = AbstractMessageBuffer;
	},
});

// ../../../node_modules/.pnpm/vscode-jsonrpc@8.2.0/node_modules/vscode-jsonrpc/lib/common/connection.js
var require_connection = __commonJS({
	"../../../node_modules/.pnpm/vscode-jsonrpc@8.2.0/node_modules/vscode-jsonrpc/lib/common/connection.js"(exports2) {
		"use strict";
		init_cjs_shims();
		Object.defineProperty(exports2, "__esModule", {
			value: true,
		});
		exports2.createMessageConnection =
			exports2.ConnectionOptions =
			exports2.MessageStrategy =
			exports2.CancellationStrategy =
			exports2.CancellationSenderStrategy =
			exports2.CancellationReceiverStrategy =
			exports2.RequestCancellationReceiverStrategy =
			exports2.IdCancellationReceiverStrategy =
			exports2.ConnectionStrategy =
			exports2.ConnectionError =
			exports2.ConnectionErrors =
			exports2.LogTraceNotification =
			exports2.SetTraceNotification =
			exports2.TraceFormat =
			exports2.TraceValues =
			exports2.Trace =
			exports2.NullLogger =
			exports2.ProgressType =
			exports2.ProgressToken =
				void 0;
		var ral_1 = require_ral();
		var Is2 = require_is2();
		var messages_1 = require_messages();
		var linkedMap_1 = require_linkedMap();
		var events_1 = require_events();
		var cancellation_1 = require_cancellation();
		var CancelNotification;
		(function (CancelNotification2) {
			CancelNotification2.type = new messages_1.NotificationType("$/cancelRequest");
		})(CancelNotification || (CancelNotification = {}));
		var ProgressToken;
		(function (ProgressToken2) {
			function is(value) {
				return typeof value === "string" || typeof value === "number";
			}
			__name(is, "is");
			ProgressToken2.is = is;
		})(ProgressToken || (exports2.ProgressToken = ProgressToken = {}));
		var ProgressNotification;
		(function (ProgressNotification2) {
			ProgressNotification2.type = new messages_1.NotificationType("$/progress");
		})(ProgressNotification || (ProgressNotification = {}));
		var ProgressType = class ProgressType {
			static {
				__name(this, "ProgressType");
			}
			constructor() {}
		};
		exports2.ProgressType = ProgressType;
		var StarRequestHandler;
		(function (StarRequestHandler2) {
			function is(value) {
				return Is2.func(value);
			}
			__name(is, "is");
			StarRequestHandler2.is = is;
		})(StarRequestHandler || (StarRequestHandler = {}));
		exports2.NullLogger = Object.freeze({
			error: /* @__PURE__ */ __name(() => {}, "error"),
			warn: /* @__PURE__ */ __name(() => {}, "warn"),
			info: /* @__PURE__ */ __name(() => {}, "info"),
			log: /* @__PURE__ */ __name(() => {}, "log"),
		});
		var Trace;
		(function (Trace2) {
			Trace2[(Trace2["Off"] = 0)] = "Off";
			Trace2[(Trace2["Messages"] = 1)] = "Messages";
			Trace2[(Trace2["Compact"] = 2)] = "Compact";
			Trace2[(Trace2["Verbose"] = 3)] = "Verbose";
		})(Trace || (exports2.Trace = Trace = {}));
		var TraceValues;
		(function (TraceValues2) {
			TraceValues2.Off = "off";
			TraceValues2.Messages = "messages";
			TraceValues2.Compact = "compact";
			TraceValues2.Verbose = "verbose";
		})(TraceValues || (exports2.TraceValues = TraceValues = {}));
		(function (Trace2) {
			function fromString(value) {
				if (!Is2.string(value)) {
					return Trace2.Off;
				}
				value = value.toLowerCase();
				switch (value) {
					case "off":
						return Trace2.Off;
					case "messages":
						return Trace2.Messages;
					case "compact":
						return Trace2.Compact;
					case "verbose":
						return Trace2.Verbose;
					default:
						return Trace2.Off;
				}
			}
			__name(fromString, "fromString");
			Trace2.fromString = fromString;
			function toString(value) {
				switch (value) {
					case Trace2.Off:
						return "off";
					case Trace2.Messages:
						return "messages";
					case Trace2.Compact:
						return "compact";
					case Trace2.Verbose:
						return "verbose";
					default:
						return "off";
				}
			}
			__name(toString, "toString");
			Trace2.toString = toString;
		})(Trace || (exports2.Trace = Trace = {}));
		var TraceFormat;
		(function (TraceFormat2) {
			TraceFormat2["Text"] = "text";
			TraceFormat2["JSON"] = "json";
		})(TraceFormat || (exports2.TraceFormat = TraceFormat = {}));
		(function (TraceFormat2) {
			function fromString(value) {
				if (!Is2.string(value)) {
					return TraceFormat2.Text;
				}
				value = value.toLowerCase();
				if (value === "json") {
					return TraceFormat2.JSON;
				} else {
					return TraceFormat2.Text;
				}
			}
			__name(fromString, "fromString");
			TraceFormat2.fromString = fromString;
		})(TraceFormat || (exports2.TraceFormat = TraceFormat = {}));
		var SetTraceNotification;
		(function (SetTraceNotification2) {
			SetTraceNotification2.type = new messages_1.NotificationType("$/setTrace");
		})(SetTraceNotification || (exports2.SetTraceNotification = SetTraceNotification = {}));
		var LogTraceNotification;
		(function (LogTraceNotification2) {
			LogTraceNotification2.type = new messages_1.NotificationType("$/logTrace");
		})(LogTraceNotification || (exports2.LogTraceNotification = LogTraceNotification = {}));
		var ConnectionErrors;
		(function (ConnectionErrors2) {
			ConnectionErrors2[(ConnectionErrors2["Closed"] = 1)] = "Closed";
			ConnectionErrors2[(ConnectionErrors2["Disposed"] = 2)] = "Disposed";
			ConnectionErrors2[(ConnectionErrors2["AlreadyListening"] = 3)] = "AlreadyListening";
		})(ConnectionErrors || (exports2.ConnectionErrors = ConnectionErrors = {}));
		var ConnectionError = class ConnectionError2 extends Error {
			static {
				__name(this, "ConnectionError");
			}
			constructor(code, message) {
				super(message);
				this.code = code;
				Object.setPrototypeOf(this, ConnectionError2.prototype);
			}
		};
		exports2.ConnectionError = ConnectionError;
		var ConnectionStrategy;
		(function (ConnectionStrategy2) {
			function is(value) {
				const candidate = value;
				return candidate && Is2.func(candidate.cancelUndispatched);
			}
			__name(is, "is");
			ConnectionStrategy2.is = is;
		})(ConnectionStrategy || (exports2.ConnectionStrategy = ConnectionStrategy = {}));
		var IdCancellationReceiverStrategy;
		(function (IdCancellationReceiverStrategy2) {
			function is(value) {
				const candidate = value;
				return (
					candidate &&
					(candidate.kind === void 0 || candidate.kind === "id") &&
					Is2.func(candidate.createCancellationTokenSource) &&
					(candidate.dispose === void 0 || Is2.func(candidate.dispose))
				);
			}
			__name(is, "is");
			IdCancellationReceiverStrategy2.is = is;
		})(IdCancellationReceiverStrategy || (exports2.IdCancellationReceiverStrategy = IdCancellationReceiverStrategy = {}));
		var RequestCancellationReceiverStrategy;
		(function (RequestCancellationReceiverStrategy2) {
			function is(value) {
				const candidate = value;
				return (
					candidate &&
					candidate.kind === "request" &&
					Is2.func(candidate.createCancellationTokenSource) &&
					(candidate.dispose === void 0 || Is2.func(candidate.dispose))
				);
			}
			__name(is, "is");
			RequestCancellationReceiverStrategy2.is = is;
		})(
			RequestCancellationReceiverStrategy ||
				(exports2.RequestCancellationReceiverStrategy = RequestCancellationReceiverStrategy = {}),
		);
		var CancellationReceiverStrategy;
		(function (CancellationReceiverStrategy2) {
			CancellationReceiverStrategy2.Message = Object.freeze({
				createCancellationTokenSource(_) {
					return new cancellation_1.CancellationTokenSource();
				},
			});
			function is(value) {
				return IdCancellationReceiverStrategy.is(value) || RequestCancellationReceiverStrategy.is(value);
			}
			__name(is, "is");
			CancellationReceiverStrategy2.is = is;
		})(CancellationReceiverStrategy || (exports2.CancellationReceiverStrategy = CancellationReceiverStrategy = {}));
		var CancellationSenderStrategy;
		(function (CancellationSenderStrategy2) {
			CancellationSenderStrategy2.Message = Object.freeze({
				sendCancellation(conn, id) {
					return conn.sendNotification(CancelNotification.type, {
						id,
					});
				},
				cleanup(_) {},
			});
			function is(value) {
				const candidate = value;
				return candidate && Is2.func(candidate.sendCancellation) && Is2.func(candidate.cleanup);
			}
			__name(is, "is");
			CancellationSenderStrategy2.is = is;
		})(CancellationSenderStrategy || (exports2.CancellationSenderStrategy = CancellationSenderStrategy = {}));
		var CancellationStrategy;
		(function (CancellationStrategy2) {
			CancellationStrategy2.Message = Object.freeze({
				receiver: CancellationReceiverStrategy.Message,
				sender: CancellationSenderStrategy.Message,
			});
			function is(value) {
				const candidate = value;
				return (
					candidate && CancellationReceiverStrategy.is(candidate.receiver) && CancellationSenderStrategy.is(candidate.sender)
				);
			}
			__name(is, "is");
			CancellationStrategy2.is = is;
		})(CancellationStrategy || (exports2.CancellationStrategy = CancellationStrategy = {}));
		var MessageStrategy;
		(function (MessageStrategy2) {
			function is(value) {
				const candidate = value;
				return candidate && Is2.func(candidate.handleMessage);
			}
			__name(is, "is");
			MessageStrategy2.is = is;
		})(MessageStrategy || (exports2.MessageStrategy = MessageStrategy = {}));
		var ConnectionOptions;
		(function (ConnectionOptions2) {
			function is(value) {
				const candidate = value;
				return (
					candidate &&
					(CancellationStrategy.is(candidate.cancellationStrategy) ||
						ConnectionStrategy.is(candidate.connectionStrategy) ||
						MessageStrategy.is(candidate.messageStrategy))
				);
			}
			__name(is, "is");
			ConnectionOptions2.is = is;
		})(ConnectionOptions || (exports2.ConnectionOptions = ConnectionOptions = {}));
		var ConnectionState;
		(function (ConnectionState2) {
			ConnectionState2[(ConnectionState2["New"] = 1)] = "New";
			ConnectionState2[(ConnectionState2["Listening"] = 2)] = "Listening";
			ConnectionState2[(ConnectionState2["Closed"] = 3)] = "Closed";
			ConnectionState2[(ConnectionState2["Disposed"] = 4)] = "Disposed";
		})(ConnectionState || (ConnectionState = {}));
		function createMessageConnection(messageReader, messageWriter, _logger, options) {
			const logger = _logger !== void 0 ? _logger : exports2.NullLogger;
			let sequenceNumber = 0;
			let notificationSequenceNumber = 0;
			let unknownResponseSequenceNumber = 0;
			const version = "2.0";
			let starRequestHandler = void 0;
			const requestHandlers = /* @__PURE__ */ new Map();
			let starNotificationHandler = void 0;
			const notificationHandlers = /* @__PURE__ */ new Map();
			const progressHandlers = /* @__PURE__ */ new Map();
			let timer;
			let messageQueue = new linkedMap_1.LinkedMap();
			let responsePromises = /* @__PURE__ */ new Map();
			let knownCanceledRequests = /* @__PURE__ */ new Set();
			let requestTokens = /* @__PURE__ */ new Map();
			let trace = Trace.Off;
			let traceFormat = TraceFormat.Text;
			let tracer;
			let state = ConnectionState.New;
			const errorEmitter = new events_1.Emitter();
			const closeEmitter = new events_1.Emitter();
			const unhandledNotificationEmitter = new events_1.Emitter();
			const unhandledProgressEmitter = new events_1.Emitter();
			const disposeEmitter = new events_1.Emitter();
			const cancellationStrategy =
				options && options.cancellationStrategy ? options.cancellationStrategy : CancellationStrategy.Message;
			function createRequestQueueKey(id) {
				if (id === null) {
					throw new Error(`Can't send requests with id null since the response can't be correlated.`);
				}
				return "req-" + id.toString();
			}
			__name(createRequestQueueKey, "createRequestQueueKey");
			function createResponseQueueKey(id) {
				if (id === null) {
					return "res-unknown-" + (++unknownResponseSequenceNumber).toString();
				} else {
					return "res-" + id.toString();
				}
			}
			__name(createResponseQueueKey, "createResponseQueueKey");
			function createNotificationQueueKey() {
				return "not-" + (++notificationSequenceNumber).toString();
			}
			__name(createNotificationQueueKey, "createNotificationQueueKey");
			function addMessageToQueue(queue, message) {
				if (messages_1.Message.isRequest(message)) {
					queue.set(createRequestQueueKey(message.id), message);
				} else if (messages_1.Message.isResponse(message)) {
					queue.set(createResponseQueueKey(message.id), message);
				} else {
					queue.set(createNotificationQueueKey(), message);
				}
			}
			__name(addMessageToQueue, "addMessageToQueue");
			function cancelUndispatched(_message) {
				return void 0;
			}
			__name(cancelUndispatched, "cancelUndispatched");
			function isListening() {
				return state === ConnectionState.Listening;
			}
			__name(isListening, "isListening");
			function isClosed() {
				return state === ConnectionState.Closed;
			}
			__name(isClosed, "isClosed");
			function isDisposed() {
				return state === ConnectionState.Disposed;
			}
			__name(isDisposed, "isDisposed");
			function closeHandler() {
				if (state === ConnectionState.New || state === ConnectionState.Listening) {
					state = ConnectionState.Closed;
					closeEmitter.fire(void 0);
				}
			}
			__name(closeHandler, "closeHandler");
			function readErrorHandler(error) {
				errorEmitter.fire([error, void 0, void 0]);
			}
			__name(readErrorHandler, "readErrorHandler");
			function writeErrorHandler(data) {
				errorEmitter.fire(data);
			}
			__name(writeErrorHandler, "writeErrorHandler");
			messageReader.onClose(closeHandler);
			messageReader.onError(readErrorHandler);
			messageWriter.onClose(closeHandler);
			messageWriter.onError(writeErrorHandler);
			function triggerMessageQueue() {
				if (timer || messageQueue.size === 0) {
					return;
				}
				timer = (0, ral_1.default)().timer.setImmediate(() => {
					timer = void 0;
					processMessageQueue();
				});
			}
			__name(triggerMessageQueue, "triggerMessageQueue");
			function handleMessage(message) {
				if (messages_1.Message.isRequest(message)) {
					handleRequest(message);
				} else if (messages_1.Message.isNotification(message)) {
					handleNotification(message);
				} else if (messages_1.Message.isResponse(message)) {
					handleResponse(message);
				} else {
					handleInvalidMessage(message);
				}
			}
			__name(handleMessage, "handleMessage");
			function processMessageQueue() {
				if (messageQueue.size === 0) {
					return;
				}
				const message = messageQueue.shift();
				try {
					const messageStrategy = options?.messageStrategy;
					if (MessageStrategy.is(messageStrategy)) {
						messageStrategy.handleMessage(message, handleMessage);
					} else {
						handleMessage(message);
					}
				} finally {
					triggerMessageQueue();
				}
			}
			__name(processMessageQueue, "processMessageQueue");
			const callback = /* @__PURE__ */ __name((message) => {
				try {
					if (messages_1.Message.isNotification(message) && message.method === CancelNotification.type.method) {
						const cancelId = message.params.id;
						const key = createRequestQueueKey(cancelId);
						const toCancel = messageQueue.get(key);
						if (messages_1.Message.isRequest(toCancel)) {
							const strategy = options?.connectionStrategy;
							const response =
								strategy && strategy.cancelUndispatched
									? strategy.cancelUndispatched(toCancel, cancelUndispatched)
									: cancelUndispatched(toCancel);
							if (response && (response.error !== void 0 || response.result !== void 0)) {
								messageQueue.delete(key);
								requestTokens.delete(cancelId);
								response.id = toCancel.id;
								traceSendingResponse(response, message.method, Date.now());
								messageWriter.write(response).catch(() => logger.error(`Sending response for canceled message failed.`));
								return;
							}
						}
						const cancellationToken = requestTokens.get(cancelId);
						if (cancellationToken !== void 0) {
							cancellationToken.cancel();
							traceReceivedNotification(message);
							return;
						} else {
							knownCanceledRequests.add(cancelId);
						}
					}
					addMessageToQueue(messageQueue, message);
				} finally {
					triggerMessageQueue();
				}
			}, "callback");
			function handleRequest(requestMessage) {
				if (isDisposed()) {
					return;
				}
				function reply(resultOrError, method, startTime2) {
					const message = {
						jsonrpc: version,
						id: requestMessage.id,
					};
					if (resultOrError instanceof messages_1.ResponseError) {
						message.error = resultOrError.toJson();
					} else {
						message.result = resultOrError === void 0 ? null : resultOrError;
					}
					traceSendingResponse(message, method, startTime2);
					messageWriter.write(message).catch(() => logger.error(`Sending response failed.`));
				}
				__name(reply, "reply");
				function replyError(error, method, startTime2) {
					const message = {
						jsonrpc: version,
						id: requestMessage.id,
						error: error.toJson(),
					};
					traceSendingResponse(message, method, startTime2);
					messageWriter.write(message).catch(() => logger.error(`Sending response failed.`));
				}
				__name(replyError, "replyError");
				function replySuccess(result, method, startTime2) {
					if (result === void 0) {
						result = null;
					}
					const message = {
						jsonrpc: version,
						id: requestMessage.id,
						result,
					};
					traceSendingResponse(message, method, startTime2);
					messageWriter.write(message).catch(() => logger.error(`Sending response failed.`));
				}
				__name(replySuccess, "replySuccess");
				traceReceivedRequest(requestMessage);
				const element = requestHandlers.get(requestMessage.method);
				let type;
				let requestHandler;
				if (element) {
					type = element.type;
					requestHandler = element.handler;
				}
				const startTime = Date.now();
				if (requestHandler || starRequestHandler) {
					const tokenKey = requestMessage.id ?? String(Date.now());
					const cancellationSource = IdCancellationReceiverStrategy.is(cancellationStrategy.receiver)
						? cancellationStrategy.receiver.createCancellationTokenSource(tokenKey)
						: cancellationStrategy.receiver.createCancellationTokenSource(requestMessage);
					if (requestMessage.id !== null && knownCanceledRequests.has(requestMessage.id)) {
						cancellationSource.cancel();
					}
					if (requestMessage.id !== null) {
						requestTokens.set(tokenKey, cancellationSource);
					}
					try {
						let handlerResult;
						if (requestHandler) {
							if (requestMessage.params === void 0) {
								if (type !== void 0 && type.numberOfParams !== 0) {
									replyError(
										new messages_1.ResponseError(
											messages_1.ErrorCodes.InvalidParams,
											`Request ${requestMessage.method} defines ${type.numberOfParams} params but received none.`,
										),
										requestMessage.method,
										startTime,
									);
									return;
								}
								handlerResult = requestHandler(cancellationSource.token);
							} else if (Array.isArray(requestMessage.params)) {
								if (type !== void 0 && type.parameterStructures === messages_1.ParameterStructures.byName) {
									replyError(
										new messages_1.ResponseError(
											messages_1.ErrorCodes.InvalidParams,
											`Request ${requestMessage.method} defines parameters by name but received parameters by position`,
										),
										requestMessage.method,
										startTime,
									);
									return;
								}
								handlerResult = requestHandler(...requestMessage.params, cancellationSource.token);
							} else {
								if (type !== void 0 && type.parameterStructures === messages_1.ParameterStructures.byPosition) {
									replyError(
										new messages_1.ResponseError(
											messages_1.ErrorCodes.InvalidParams,
											`Request ${requestMessage.method} defines parameters by position but received parameters by name`,
										),
										requestMessage.method,
										startTime,
									);
									return;
								}
								handlerResult = requestHandler(requestMessage.params, cancellationSource.token);
							}
						} else if (starRequestHandler) {
							handlerResult = starRequestHandler(requestMessage.method, requestMessage.params, cancellationSource.token);
						}
						const promise = handlerResult;
						if (!handlerResult) {
							requestTokens.delete(tokenKey);
							replySuccess(handlerResult, requestMessage.method, startTime);
						} else if (promise.then) {
							promise.then(
								(resultOrError) => {
									requestTokens.delete(tokenKey);
									reply(resultOrError, requestMessage.method, startTime);
								},
								(error) => {
									requestTokens.delete(tokenKey);
									if (error instanceof messages_1.ResponseError) {
										replyError(error, requestMessage.method, startTime);
									} else if (error && Is2.string(error.message)) {
										replyError(
											new messages_1.ResponseError(
												messages_1.ErrorCodes.InternalError,
												`Request ${requestMessage.method} failed with message: ${error.message}`,
											),
											requestMessage.method,
											startTime,
										);
									} else {
										replyError(
											new messages_1.ResponseError(
												messages_1.ErrorCodes.InternalError,
												`Request ${requestMessage.method} failed unexpectedly without providing any details.`,
											),
											requestMessage.method,
											startTime,
										);
									}
								},
							);
						} else {
							requestTokens.delete(tokenKey);
							reply(handlerResult, requestMessage.method, startTime);
						}
					} catch (error) {
						requestTokens.delete(tokenKey);
						if (error instanceof messages_1.ResponseError) {
							reply(error, requestMessage.method, startTime);
						} else if (error && Is2.string(error.message)) {
							replyError(
								new messages_1.ResponseError(
									messages_1.ErrorCodes.InternalError,
									`Request ${requestMessage.method} failed with message: ${error.message}`,
								),
								requestMessage.method,
								startTime,
							);
						} else {
							replyError(
								new messages_1.ResponseError(
									messages_1.ErrorCodes.InternalError,
									`Request ${requestMessage.method} failed unexpectedly without providing any details.`,
								),
								requestMessage.method,
								startTime,
							);
						}
					}
				} else {
					replyError(
						new messages_1.ResponseError(messages_1.ErrorCodes.MethodNotFound, `Unhandled method ${requestMessage.method}`),
						requestMessage.method,
						startTime,
					);
				}
			}
			__name(handleRequest, "handleRequest");
			function handleResponse(responseMessage) {
				if (isDisposed()) {
					return;
				}
				if (responseMessage.id === null) {
					if (responseMessage.error) {
						logger.error(`Received response message without id: Error is: 
${JSON.stringify(responseMessage.error, void 0, 4)}`);
					} else {
						logger.error(`Received response message without id. No further error information provided.`);
					}
				} else {
					const key = responseMessage.id;
					const responsePromise = responsePromises.get(key);
					traceReceivedResponse(responseMessage, responsePromise);
					if (responsePromise !== void 0) {
						responsePromises.delete(key);
						try {
							if (responseMessage.error) {
								const error = responseMessage.error;
								responsePromise.reject(new messages_1.ResponseError(error.code, error.message, error.data));
							} else if (responseMessage.result !== void 0) {
								responsePromise.resolve(responseMessage.result);
							} else {
								throw new Error("Should never happen.");
							}
						} catch (error) {
							if (error.message) {
								logger.error(`Response handler '${responsePromise.method}' failed with message: ${error.message}`);
							} else {
								logger.error(`Response handler '${responsePromise.method}' failed unexpectedly.`);
							}
						}
					}
				}
			}
			__name(handleResponse, "handleResponse");
			function handleNotification(message) {
				if (isDisposed()) {
					return;
				}
				let type = void 0;
				let notificationHandler;
				if (message.method === CancelNotification.type.method) {
					const cancelId = message.params.id;
					knownCanceledRequests.delete(cancelId);
					traceReceivedNotification(message);
					return;
				} else {
					const element = notificationHandlers.get(message.method);
					if (element) {
						notificationHandler = element.handler;
						type = element.type;
					}
				}
				if (notificationHandler || starNotificationHandler) {
					try {
						traceReceivedNotification(message);
						if (notificationHandler) {
							if (message.params === void 0) {
								if (type !== void 0) {
									if (type.numberOfParams !== 0 && type.parameterStructures !== messages_1.ParameterStructures.byName) {
										logger.error(`Notification ${message.method} defines ${type.numberOfParams} params but received none.`);
									}
								}
								notificationHandler();
							} else if (Array.isArray(message.params)) {
								const params = message.params;
								if (message.method === ProgressNotification.type.method && params.length === 2 && ProgressToken.is(params[0])) {
									notificationHandler({
										token: params[0],
										value: params[1],
									});
								} else {
									if (type !== void 0) {
										if (type.parameterStructures === messages_1.ParameterStructures.byName) {
											logger.error(
												`Notification ${message.method} defines parameters by name but received parameters by position`,
											);
										}
										if (type.numberOfParams !== message.params.length) {
											logger.error(
												`Notification ${message.method} defines ${type.numberOfParams} params but received ${params.length} arguments`,
											);
										}
									}
									notificationHandler(...params);
								}
							} else {
								if (type !== void 0 && type.parameterStructures === messages_1.ParameterStructures.byPosition) {
									logger.error(`Notification ${message.method} defines parameters by position but received parameters by name`);
								}
								notificationHandler(message.params);
							}
						} else if (starNotificationHandler) {
							starNotificationHandler(message.method, message.params);
						}
					} catch (error) {
						if (error.message) {
							logger.error(`Notification handler '${message.method}' failed with message: ${error.message}`);
						} else {
							logger.error(`Notification handler '${message.method}' failed unexpectedly.`);
						}
					}
				} else {
					unhandledNotificationEmitter.fire(message);
				}
			}
			__name(handleNotification, "handleNotification");
			function handleInvalidMessage(message) {
				if (!message) {
					logger.error("Received empty message.");
					return;
				}
				logger.error(`Received message which is neither a response nor a notification message:
${JSON.stringify(message, null, 4)}`);
				const responseMessage = message;
				if (Is2.string(responseMessage.id) || Is2.number(responseMessage.id)) {
					const key = responseMessage.id;
					const responseHandler = responsePromises.get(key);
					if (responseHandler) {
						responseHandler.reject(new Error("The received response has neither a result nor an error property."));
					}
				}
			}
			__name(handleInvalidMessage, "handleInvalidMessage");
			function stringifyTrace(params) {
				if (params === void 0 || params === null) {
					return void 0;
				}
				switch (trace) {
					case Trace.Verbose:
						return JSON.stringify(params, null, 4);
					case Trace.Compact:
						return JSON.stringify(params);
					default:
						return void 0;
				}
			}
			__name(stringifyTrace, "stringifyTrace");
			function traceSendingRequest(message) {
				if (trace === Trace.Off || !tracer) {
					return;
				}
				if (traceFormat === TraceFormat.Text) {
					let data = void 0;
					if ((trace === Trace.Verbose || trace === Trace.Compact) && message.params) {
						data = `Params: ${stringifyTrace(message.params)}

`;
					}
					tracer.log(`Sending request '${message.method} - (${message.id})'.`, data);
				} else {
					logLSPMessage("send-request", message);
				}
			}
			__name(traceSendingRequest, "traceSendingRequest");
			function traceSendingNotification(message) {
				if (trace === Trace.Off || !tracer) {
					return;
				}
				if (traceFormat === TraceFormat.Text) {
					let data = void 0;
					if (trace === Trace.Verbose || trace === Trace.Compact) {
						if (message.params) {
							data = `Params: ${stringifyTrace(message.params)}

`;
						} else {
							data = "No parameters provided.\n\n";
						}
					}
					tracer.log(`Sending notification '${message.method}'.`, data);
				} else {
					logLSPMessage("send-notification", message);
				}
			}
			__name(traceSendingNotification, "traceSendingNotification");
			function traceSendingResponse(message, method, startTime) {
				if (trace === Trace.Off || !tracer) {
					return;
				}
				if (traceFormat === TraceFormat.Text) {
					let data = void 0;
					if (trace === Trace.Verbose || trace === Trace.Compact) {
						if (message.error && message.error.data) {
							data = `Error data: ${stringifyTrace(message.error.data)}

`;
						} else {
							if (message.result) {
								data = `Result: ${stringifyTrace(message.result)}

`;
							} else if (message.error === void 0) {
								data = "No result returned.\n\n";
							}
						}
					}
					tracer.log(
						`Sending response '${method} - (${message.id})'. Processing request took ${Date.now() - startTime}ms`,
						data,
					);
				} else {
					logLSPMessage("send-response", message);
				}
			}
			__name(traceSendingResponse, "traceSendingResponse");
			function traceReceivedRequest(message) {
				if (trace === Trace.Off || !tracer) {
					return;
				}
				if (traceFormat === TraceFormat.Text) {
					let data = void 0;
					if ((trace === Trace.Verbose || trace === Trace.Compact) && message.params) {
						data = `Params: ${stringifyTrace(message.params)}

`;
					}
					tracer.log(`Received request '${message.method} - (${message.id})'.`, data);
				} else {
					logLSPMessage("receive-request", message);
				}
			}
			__name(traceReceivedRequest, "traceReceivedRequest");
			function traceReceivedNotification(message) {
				if (trace === Trace.Off || !tracer || message.method === LogTraceNotification.type.method) {
					return;
				}
				if (traceFormat === TraceFormat.Text) {
					let data = void 0;
					if (trace === Trace.Verbose || trace === Trace.Compact) {
						if (message.params) {
							data = `Params: ${stringifyTrace(message.params)}

`;
						} else {
							data = "No parameters provided.\n\n";
						}
					}
					tracer.log(`Received notification '${message.method}'.`, data);
				} else {
					logLSPMessage("receive-notification", message);
				}
			}
			__name(traceReceivedNotification, "traceReceivedNotification");
			function traceReceivedResponse(message, responsePromise) {
				if (trace === Trace.Off || !tracer) {
					return;
				}
				if (traceFormat === TraceFormat.Text) {
					let data = void 0;
					if (trace === Trace.Verbose || trace === Trace.Compact) {
						if (message.error && message.error.data) {
							data = `Error data: ${stringifyTrace(message.error.data)}

`;
						} else {
							if (message.result) {
								data = `Result: ${stringifyTrace(message.result)}

`;
							} else if (message.error === void 0) {
								data = "No result returned.\n\n";
							}
						}
					}
					if (responsePromise) {
						const error = message.error ? ` Request failed: ${message.error.message} (${message.error.code}).` : "";
						tracer.log(
							`Received response '${responsePromise.method} - (${message.id})' in ${Date.now() - responsePromise.timerStart}ms.${error}`,
							data,
						);
					} else {
						tracer.log(`Received response ${message.id} without active response promise.`, data);
					}
				} else {
					logLSPMessage("receive-response", message);
				}
			}
			__name(traceReceivedResponse, "traceReceivedResponse");
			function logLSPMessage(type, message) {
				if (!tracer || trace === Trace.Off) {
					return;
				}
				const lspMessage = {
					isLSPMessage: true,
					type,
					message,
					timestamp: Date.now(),
				};
				tracer.log(lspMessage);
			}
			__name(logLSPMessage, "logLSPMessage");
			function throwIfClosedOrDisposed() {
				if (isClosed()) {
					throw new ConnectionError(ConnectionErrors.Closed, "Connection is closed.");
				}
				if (isDisposed()) {
					throw new ConnectionError(ConnectionErrors.Disposed, "Connection is disposed.");
				}
			}
			__name(throwIfClosedOrDisposed, "throwIfClosedOrDisposed");
			function throwIfListening() {
				if (isListening()) {
					throw new ConnectionError(ConnectionErrors.AlreadyListening, "Connection is already listening");
				}
			}
			__name(throwIfListening, "throwIfListening");
			function throwIfNotListening() {
				if (!isListening()) {
					throw new Error("Call listen() first.");
				}
			}
			__name(throwIfNotListening, "throwIfNotListening");
			function undefinedToNull(param) {
				if (param === void 0) {
					return null;
				} else {
					return param;
				}
			}
			__name(undefinedToNull, "undefinedToNull");
			function nullToUndefined(param) {
				if (param === null) {
					return void 0;
				} else {
					return param;
				}
			}
			__name(nullToUndefined, "nullToUndefined");
			function isNamedParam(param) {
				return param !== void 0 && param !== null && !Array.isArray(param) && typeof param === "object";
			}
			__name(isNamedParam, "isNamedParam");
			function computeSingleParam(parameterStructures, param) {
				switch (parameterStructures) {
					case messages_1.ParameterStructures.auto:
						if (isNamedParam(param)) {
							return nullToUndefined(param);
						} else {
							return [undefinedToNull(param)];
						}
					case messages_1.ParameterStructures.byName:
						if (!isNamedParam(param)) {
							throw new Error(`Received parameters by name but param is not an object literal.`);
						}
						return nullToUndefined(param);
					case messages_1.ParameterStructures.byPosition:
						return [undefinedToNull(param)];
					default:
						throw new Error(`Unknown parameter structure ${parameterStructures.toString()}`);
				}
			}
			__name(computeSingleParam, "computeSingleParam");
			function computeMessageParams(type, params) {
				let result;
				const numberOfParams = type.numberOfParams;
				switch (numberOfParams) {
					case 0:
						result = void 0;
						break;
					case 1:
						result = computeSingleParam(type.parameterStructures, params[0]);
						break;
					default:
						result = [];
						for (let i = 0; i < params.length && i < numberOfParams; i++) {
							result.push(undefinedToNull(params[i]));
						}
						if (params.length < numberOfParams) {
							for (let i = params.length; i < numberOfParams; i++) {
								result.push(null);
							}
						}
						break;
				}
				return result;
			}
			__name(computeMessageParams, "computeMessageParams");
			const connection2 = {
				sendNotification: /* @__PURE__ */ __name((type, ...args) => {
					throwIfClosedOrDisposed();
					let method;
					let messageParams;
					if (Is2.string(type)) {
						method = type;
						const first = args[0];
						let paramStart = 0;
						let parameterStructures = messages_1.ParameterStructures.auto;
						if (messages_1.ParameterStructures.is(first)) {
							paramStart = 1;
							parameterStructures = first;
						}
						let paramEnd = args.length;
						const numberOfParams = paramEnd - paramStart;
						switch (numberOfParams) {
							case 0:
								messageParams = void 0;
								break;
							case 1:
								messageParams = computeSingleParam(parameterStructures, args[paramStart]);
								break;
							default:
								if (parameterStructures === messages_1.ParameterStructures.byName) {
									throw new Error(`Received ${numberOfParams} parameters for 'by Name' notification parameter structure.`);
								}
								messageParams = args.slice(paramStart, paramEnd).map((value) => undefinedToNull(value));
								break;
						}
					} else {
						const params = args;
						method = type.method;
						messageParams = computeMessageParams(type, params);
					}
					const notificationMessage = {
						jsonrpc: version,
						method,
						params: messageParams,
					};
					traceSendingNotification(notificationMessage);
					return messageWriter.write(notificationMessage).catch((error) => {
						logger.error(`Sending notification failed.`);
						throw error;
					});
				}, "sendNotification"),
				onNotification: /* @__PURE__ */ __name((type, handler) => {
					throwIfClosedOrDisposed();
					let method;
					if (Is2.func(type)) {
						starNotificationHandler = type;
					} else if (handler) {
						if (Is2.string(type)) {
							method = type;
							notificationHandlers.set(type, {
								type: void 0,
								handler,
							});
						} else {
							method = type.method;
							notificationHandlers.set(type.method, {
								type,
								handler,
							});
						}
					}
					return {
						dispose: /* @__PURE__ */ __name(() => {
							if (method !== void 0) {
								notificationHandlers.delete(method);
							} else {
								starNotificationHandler = void 0;
							}
						}, "dispose"),
					};
				}, "onNotification"),
				onProgress: /* @__PURE__ */ __name((_type, token, handler) => {
					if (progressHandlers.has(token)) {
						throw new Error(`Progress handler for token ${token} already registered`);
					}
					progressHandlers.set(token, handler);
					return {
						dispose: /* @__PURE__ */ __name(() => {
							progressHandlers.delete(token);
						}, "dispose"),
					};
				}, "onProgress"),
				sendProgress: /* @__PURE__ */ __name((_type, token, value) => {
					return connection2.sendNotification(ProgressNotification.type, {
						token,
						value,
					});
				}, "sendProgress"),
				onUnhandledProgress: unhandledProgressEmitter.event,
				sendRequest: /* @__PURE__ */ __name((type, ...args) => {
					throwIfClosedOrDisposed();
					throwIfNotListening();
					let method;
					let messageParams;
					let token = void 0;
					if (Is2.string(type)) {
						method = type;
						const first = args[0];
						const last = args[args.length - 1];
						let paramStart = 0;
						let parameterStructures = messages_1.ParameterStructures.auto;
						if (messages_1.ParameterStructures.is(first)) {
							paramStart = 1;
							parameterStructures = first;
						}
						let paramEnd = args.length;
						if (cancellation_1.CancellationToken.is(last)) {
							paramEnd = paramEnd - 1;
							token = last;
						}
						const numberOfParams = paramEnd - paramStart;
						switch (numberOfParams) {
							case 0:
								messageParams = void 0;
								break;
							case 1:
								messageParams = computeSingleParam(parameterStructures, args[paramStart]);
								break;
							default:
								if (parameterStructures === messages_1.ParameterStructures.byName) {
									throw new Error(`Received ${numberOfParams} parameters for 'by Name' request parameter structure.`);
								}
								messageParams = args.slice(paramStart, paramEnd).map((value) => undefinedToNull(value));
								break;
						}
					} else {
						const params = args;
						method = type.method;
						messageParams = computeMessageParams(type, params);
						const numberOfParams = type.numberOfParams;
						token = cancellation_1.CancellationToken.is(params[numberOfParams]) ? params[numberOfParams] : void 0;
					}
					const id = sequenceNumber++;
					let disposable;
					if (token) {
						disposable = token.onCancellationRequested(() => {
							const p = cancellationStrategy.sender.sendCancellation(connection2, id);
							if (p === void 0) {
								logger.log(`Received no promise from cancellation strategy when cancelling id ${id}`);
								return Promise.resolve();
							} else {
								return p.catch(() => {
									logger.log(`Sending cancellation messages for id ${id} failed`);
								});
							}
						});
					}
					const requestMessage = {
						jsonrpc: version,
						id,
						method,
						params: messageParams,
					};
					traceSendingRequest(requestMessage);
					if (typeof cancellationStrategy.sender.enableCancellation === "function") {
						cancellationStrategy.sender.enableCancellation(requestMessage);
					}
					return new Promise(async (resolve, reject) => {
						const resolveWithCleanup = /* @__PURE__ */ __name((r) => {
							resolve(r);
							cancellationStrategy.sender.cleanup(id);
							disposable?.dispose();
						}, "resolveWithCleanup");
						const rejectWithCleanup = /* @__PURE__ */ __name((r) => {
							reject(r);
							cancellationStrategy.sender.cleanup(id);
							disposable?.dispose();
						}, "rejectWithCleanup");
						const responsePromise = {
							method,
							timerStart: Date.now(),
							resolve: resolveWithCleanup,
							reject: rejectWithCleanup,
						};
						try {
							await messageWriter.write(requestMessage);
							responsePromises.set(id, responsePromise);
						} catch (error) {
							logger.error(`Sending request failed.`);
							responsePromise.reject(
								new messages_1.ResponseError(
									messages_1.ErrorCodes.MessageWriteError,
									error.message ? error.message : "Unknown reason",
								),
							);
							throw error;
						}
					});
				}, "sendRequest"),
				onRequest: /* @__PURE__ */ __name((type, handler) => {
					throwIfClosedOrDisposed();
					let method = null;
					if (StarRequestHandler.is(type)) {
						method = void 0;
						starRequestHandler = type;
					} else if (Is2.string(type)) {
						method = null;
						if (handler !== void 0) {
							method = type;
							requestHandlers.set(type, {
								handler,
								type: void 0,
							});
						}
					} else {
						if (handler !== void 0) {
							method = type.method;
							requestHandlers.set(type.method, {
								type,
								handler,
							});
						}
					}
					return {
						dispose: /* @__PURE__ */ __name(() => {
							if (method === null) {
								return;
							}
							if (method !== void 0) {
								requestHandlers.delete(method);
							} else {
								starRequestHandler = void 0;
							}
						}, "dispose"),
					};
				}, "onRequest"),
				hasPendingResponse: /* @__PURE__ */ __name(() => {
					return responsePromises.size > 0;
				}, "hasPendingResponse"),
				trace: /* @__PURE__ */ __name(async (_value, _tracer, sendNotificationOrTraceOptions) => {
					let _sendNotification = false;
					let _traceFormat = TraceFormat.Text;
					if (sendNotificationOrTraceOptions !== void 0) {
						if (Is2.boolean(sendNotificationOrTraceOptions)) {
							_sendNotification = sendNotificationOrTraceOptions;
						} else {
							_sendNotification = sendNotificationOrTraceOptions.sendNotification || false;
							_traceFormat = sendNotificationOrTraceOptions.traceFormat || TraceFormat.Text;
						}
					}
					trace = _value;
					traceFormat = _traceFormat;
					if (trace === Trace.Off) {
						tracer = void 0;
					} else {
						tracer = _tracer;
					}
					if (_sendNotification && !isClosed() && !isDisposed()) {
						await connection2.sendNotification(SetTraceNotification.type, {
							value: Trace.toString(_value),
						});
					}
				}, "trace"),
				onError: errorEmitter.event,
				onClose: closeEmitter.event,
				onUnhandledNotification: unhandledNotificationEmitter.event,
				onDispose: disposeEmitter.event,
				end: /* @__PURE__ */ __name(() => {
					messageWriter.end();
				}, "end"),
				dispose: /* @__PURE__ */ __name(() => {
					if (isDisposed()) {
						return;
					}
					state = ConnectionState.Disposed;
					disposeEmitter.fire(void 0);
					const error = new messages_1.ResponseError(
						messages_1.ErrorCodes.PendingResponseRejected,
						"Pending response rejected since connection got disposed",
					);
					for (const promise of responsePromises.values()) {
						promise.reject(error);
					}
					responsePromises = /* @__PURE__ */ new Map();
					requestTokens = /* @__PURE__ */ new Map();
					knownCanceledRequests = /* @__PURE__ */ new Set();
					messageQueue = new linkedMap_1.LinkedMap();
					if (Is2.func(messageWriter.dispose)) {
						messageWriter.dispose();
					}
					if (Is2.func(messageReader.dispose)) {
						messageReader.dispose();
					}
				}, "dispose"),
				listen: /* @__PURE__ */ __name(() => {
					throwIfClosedOrDisposed();
					throwIfListening();
					state = ConnectionState.Listening;
					messageReader.listen(callback);
				}, "listen"),
				inspect: /* @__PURE__ */ __name(() => {
					(0, ral_1.default)().console.log("inspect");
				}, "inspect"),
			};
			connection2.onNotification(LogTraceNotification.type, (params) => {
				if (trace === Trace.Off || !tracer) {
					return;
				}
				const verbose = trace === Trace.Verbose || trace === Trace.Compact;
				tracer.log(params.message, verbose ? params.verbose : void 0);
			});
			connection2.onNotification(ProgressNotification.type, (params) => {
				const handler = progressHandlers.get(params.token);
				if (handler) {
					handler(params.value);
				} else {
					unhandledProgressEmitter.fire(params);
				}
			});
			return connection2;
		}
		__name(createMessageConnection, "createMessageConnection");
		exports2.createMessageConnection = createMessageConnection;
	},
});

// ../../../node_modules/.pnpm/vscode-jsonrpc@8.2.0/node_modules/vscode-jsonrpc/lib/common/api.js
var require_api = __commonJS({
	"../../../node_modules/.pnpm/vscode-jsonrpc@8.2.0/node_modules/vscode-jsonrpc/lib/common/api.js"(exports2) {
		"use strict";
		init_cjs_shims();
		Object.defineProperty(exports2, "__esModule", {
			value: true,
		});
		exports2.ProgressType =
			exports2.ProgressToken =
			exports2.createMessageConnection =
			exports2.NullLogger =
			exports2.ConnectionOptions =
			exports2.ConnectionStrategy =
			exports2.AbstractMessageBuffer =
			exports2.WriteableStreamMessageWriter =
			exports2.AbstractMessageWriter =
			exports2.MessageWriter =
			exports2.ReadableStreamMessageReader =
			exports2.AbstractMessageReader =
			exports2.MessageReader =
			exports2.SharedArrayReceiverStrategy =
			exports2.SharedArraySenderStrategy =
			exports2.CancellationToken =
			exports2.CancellationTokenSource =
			exports2.Emitter =
			exports2.Event =
			exports2.Disposable =
			exports2.LRUCache =
			exports2.Touch =
			exports2.LinkedMap =
			exports2.ParameterStructures =
			exports2.NotificationType9 =
			exports2.NotificationType8 =
			exports2.NotificationType7 =
			exports2.NotificationType6 =
			exports2.NotificationType5 =
			exports2.NotificationType4 =
			exports2.NotificationType3 =
			exports2.NotificationType2 =
			exports2.NotificationType1 =
			exports2.NotificationType0 =
			exports2.NotificationType =
			exports2.ErrorCodes =
			exports2.ResponseError =
			exports2.RequestType9 =
			exports2.RequestType8 =
			exports2.RequestType7 =
			exports2.RequestType6 =
			exports2.RequestType5 =
			exports2.RequestType4 =
			exports2.RequestType3 =
			exports2.RequestType2 =
			exports2.RequestType1 =
			exports2.RequestType0 =
			exports2.RequestType =
			exports2.Message =
			exports2.RAL =
				void 0;
		exports2.MessageStrategy =
			exports2.CancellationStrategy =
			exports2.CancellationSenderStrategy =
			exports2.CancellationReceiverStrategy =
			exports2.ConnectionError =
			exports2.ConnectionErrors =
			exports2.LogTraceNotification =
			exports2.SetTraceNotification =
			exports2.TraceFormat =
			exports2.TraceValues =
			exports2.Trace =
				void 0;
		var messages_1 = require_messages();
		Object.defineProperty(exports2, "Message", {
			enumerable: true,
			get: /* @__PURE__ */ __name(function () {
				return messages_1.Message;
			}, "get"),
		});
		Object.defineProperty(exports2, "RequestType", {
			enumerable: true,
			get: /* @__PURE__ */ __name(function () {
				return messages_1.RequestType;
			}, "get"),
		});
		Object.defineProperty(exports2, "RequestType0", {
			enumerable: true,
			get: /* @__PURE__ */ __name(function () {
				return messages_1.RequestType0;
			}, "get"),
		});
		Object.defineProperty(exports2, "RequestType1", {
			enumerable: true,
			get: /* @__PURE__ */ __name(function () {
				return messages_1.RequestType1;
			}, "get"),
		});
		Object.defineProperty(exports2, "RequestType2", {
			enumerable: true,
			get: /* @__PURE__ */ __name(function () {
				return messages_1.RequestType2;
			}, "get"),
		});
		Object.defineProperty(exports2, "RequestType3", {
			enumerable: true,
			get: /* @__PURE__ */ __name(function () {
				return messages_1.RequestType3;
			}, "get"),
		});
		Object.defineProperty(exports2, "RequestType4", {
			enumerable: true,
			get: /* @__PURE__ */ __name(function () {
				return messages_1.RequestType4;
			}, "get"),
		});
		Object.defineProperty(exports2, "RequestType5", {
			enumerable: true,
			get: /* @__PURE__ */ __name(function () {
				return messages_1.RequestType5;
			}, "get"),
		});
		Object.defineProperty(exports2, "RequestType6", {
			enumerable: true,
			get: /* @__PURE__ */ __name(function () {
				return messages_1.RequestType6;
			}, "get"),
		});
		Object.defineProperty(exports2, "RequestType7", {
			enumerable: true,
			get: /* @__PURE__ */ __name(function () {
				return messages_1.RequestType7;
			}, "get"),
		});
		Object.defineProperty(exports2, "RequestType8", {
			enumerable: true,
			get: /* @__PURE__ */ __name(function () {
				return messages_1.RequestType8;
			}, "get"),
		});
		Object.defineProperty(exports2, "RequestType9", {
			enumerable: true,
			get: /* @__PURE__ */ __name(function () {
				return messages_1.RequestType9;
			}, "get"),
		});
		Object.defineProperty(exports2, "ResponseError", {
			enumerable: true,
			get: /* @__PURE__ */ __name(function () {
				return messages_1.ResponseError;
			}, "get"),
		});
		Object.defineProperty(exports2, "ErrorCodes", {
			enumerable: true,
			get: /* @__PURE__ */ __name(function () {
				return messages_1.ErrorCodes;
			}, "get"),
		});
		Object.defineProperty(exports2, "NotificationType", {
			enumerable: true,
			get: /* @__PURE__ */ __name(function () {
				return messages_1.NotificationType;
			}, "get"),
		});
		Object.defineProperty(exports2, "NotificationType0", {
			enumerable: true,
			get: /* @__PURE__ */ __name(function () {
				return messages_1.NotificationType0;
			}, "get"),
		});
		Object.defineProperty(exports2, "NotificationType1", {
			enumerable: true,
			get: /* @__PURE__ */ __name(function () {
				return messages_1.NotificationType1;
			}, "get"),
		});
		Object.defineProperty(exports2, "NotificationType2", {
			enumerable: true,
			get: /* @__PURE__ */ __name(function () {
				return messages_1.NotificationType2;
			}, "get"),
		});
		Object.defineProperty(exports2, "NotificationType3", {
			enumerable: true,
			get: /* @__PURE__ */ __name(function () {
				return messages_1.NotificationType3;
			}, "get"),
		});
		Object.defineProperty(exports2, "NotificationType4", {
			enumerable: true,
			get: /* @__PURE__ */ __name(function () {
				return messages_1.NotificationType4;
			}, "get"),
		});
		Object.defineProperty(exports2, "NotificationType5", {
			enumerable: true,
			get: /* @__PURE__ */ __name(function () {
				return messages_1.NotificationType5;
			}, "get"),
		});
		Object.defineProperty(exports2, "NotificationType6", {
			enumerable: true,
			get: /* @__PURE__ */ __name(function () {
				return messages_1.NotificationType6;
			}, "get"),
		});
		Object.defineProperty(exports2, "NotificationType7", {
			enumerable: true,
			get: /* @__PURE__ */ __name(function () {
				return messages_1.NotificationType7;
			}, "get"),
		});
		Object.defineProperty(exports2, "NotificationType8", {
			enumerable: true,
			get: /* @__PURE__ */ __name(function () {
				return messages_1.NotificationType8;
			}, "get"),
		});
		Object.defineProperty(exports2, "NotificationType9", {
			enumerable: true,
			get: /* @__PURE__ */ __name(function () {
				return messages_1.NotificationType9;
			}, "get"),
		});
		Object.defineProperty(exports2, "ParameterStructures", {
			enumerable: true,
			get: /* @__PURE__ */ __name(function () {
				return messages_1.ParameterStructures;
			}, "get"),
		});
		var linkedMap_1 = require_linkedMap();
		Object.defineProperty(exports2, "LinkedMap", {
			enumerable: true,
			get: /* @__PURE__ */ __name(function () {
				return linkedMap_1.LinkedMap;
			}, "get"),
		});
		Object.defineProperty(exports2, "LRUCache", {
			enumerable: true,
			get: /* @__PURE__ */ __name(function () {
				return linkedMap_1.LRUCache;
			}, "get"),
		});
		Object.defineProperty(exports2, "Touch", {
			enumerable: true,
			get: /* @__PURE__ */ __name(function () {
				return linkedMap_1.Touch;
			}, "get"),
		});
		var disposable_1 = require_disposable();
		Object.defineProperty(exports2, "Disposable", {
			enumerable: true,
			get: /* @__PURE__ */ __name(function () {
				return disposable_1.Disposable;
			}, "get"),
		});
		var events_1 = require_events();
		Object.defineProperty(exports2, "Event", {
			enumerable: true,
			get: /* @__PURE__ */ __name(function () {
				return events_1.Event;
			}, "get"),
		});
		Object.defineProperty(exports2, "Emitter", {
			enumerable: true,
			get: /* @__PURE__ */ __name(function () {
				return events_1.Emitter;
			}, "get"),
		});
		var cancellation_1 = require_cancellation();
		Object.defineProperty(exports2, "CancellationTokenSource", {
			enumerable: true,
			get: /* @__PURE__ */ __name(function () {
				return cancellation_1.CancellationTokenSource;
			}, "get"),
		});
		Object.defineProperty(exports2, "CancellationToken", {
			enumerable: true,
			get: /* @__PURE__ */ __name(function () {
				return cancellation_1.CancellationToken;
			}, "get"),
		});
		var sharedArrayCancellation_1 = require_sharedArrayCancellation();
		Object.defineProperty(exports2, "SharedArraySenderStrategy", {
			enumerable: true,
			get: /* @__PURE__ */ __name(function () {
				return sharedArrayCancellation_1.SharedArraySenderStrategy;
			}, "get"),
		});
		Object.defineProperty(exports2, "SharedArrayReceiverStrategy", {
			enumerable: true,
			get: /* @__PURE__ */ __name(function () {
				return sharedArrayCancellation_1.SharedArrayReceiverStrategy;
			}, "get"),
		});
		var messageReader_1 = require_messageReader();
		Object.defineProperty(exports2, "MessageReader", {
			enumerable: true,
			get: /* @__PURE__ */ __name(function () {
				return messageReader_1.MessageReader;
			}, "get"),
		});
		Object.defineProperty(exports2, "AbstractMessageReader", {
			enumerable: true,
			get: /* @__PURE__ */ __name(function () {
				return messageReader_1.AbstractMessageReader;
			}, "get"),
		});
		Object.defineProperty(exports2, "ReadableStreamMessageReader", {
			enumerable: true,
			get: /* @__PURE__ */ __name(function () {
				return messageReader_1.ReadableStreamMessageReader;
			}, "get"),
		});
		var messageWriter_1 = require_messageWriter();
		Object.defineProperty(exports2, "MessageWriter", {
			enumerable: true,
			get: /* @__PURE__ */ __name(function () {
				return messageWriter_1.MessageWriter;
			}, "get"),
		});
		Object.defineProperty(exports2, "AbstractMessageWriter", {
			enumerable: true,
			get: /* @__PURE__ */ __name(function () {
				return messageWriter_1.AbstractMessageWriter;
			}, "get"),
		});
		Object.defineProperty(exports2, "WriteableStreamMessageWriter", {
			enumerable: true,
			get: /* @__PURE__ */ __name(function () {
				return messageWriter_1.WriteableStreamMessageWriter;
			}, "get"),
		});
		var messageBuffer_1 = require_messageBuffer();
		Object.defineProperty(exports2, "AbstractMessageBuffer", {
			enumerable: true,
			get: /* @__PURE__ */ __name(function () {
				return messageBuffer_1.AbstractMessageBuffer;
			}, "get"),
		});
		var connection_1 = require_connection();
		Object.defineProperty(exports2, "ConnectionStrategy", {
			enumerable: true,
			get: /* @__PURE__ */ __name(function () {
				return connection_1.ConnectionStrategy;
			}, "get"),
		});
		Object.defineProperty(exports2, "ConnectionOptions", {
			enumerable: true,
			get: /* @__PURE__ */ __name(function () {
				return connection_1.ConnectionOptions;
			}, "get"),
		});
		Object.defineProperty(exports2, "NullLogger", {
			enumerable: true,
			get: /* @__PURE__ */ __name(function () {
				return connection_1.NullLogger;
			}, "get"),
		});
		Object.defineProperty(exports2, "createMessageConnection", {
			enumerable: true,
			get: /* @__PURE__ */ __name(function () {
				return connection_1.createMessageConnection;
			}, "get"),
		});
		Object.defineProperty(exports2, "ProgressToken", {
			enumerable: true,
			get: /* @__PURE__ */ __name(function () {
				return connection_1.ProgressToken;
			}, "get"),
		});
		Object.defineProperty(exports2, "ProgressType", {
			enumerable: true,
			get: /* @__PURE__ */ __name(function () {
				return connection_1.ProgressType;
			}, "get"),
		});
		Object.defineProperty(exports2, "Trace", {
			enumerable: true,
			get: /* @__PURE__ */ __name(function () {
				return connection_1.Trace;
			}, "get"),
		});
		Object.defineProperty(exports2, "TraceValues", {
			enumerable: true,
			get: /* @__PURE__ */ __name(function () {
				return connection_1.TraceValues;
			}, "get"),
		});
		Object.defineProperty(exports2, "TraceFormat", {
			enumerable: true,
			get: /* @__PURE__ */ __name(function () {
				return connection_1.TraceFormat;
			}, "get"),
		});
		Object.defineProperty(exports2, "SetTraceNotification", {
			enumerable: true,
			get: /* @__PURE__ */ __name(function () {
				return connection_1.SetTraceNotification;
			}, "get"),
		});
		Object.defineProperty(exports2, "LogTraceNotification", {
			enumerable: true,
			get: /* @__PURE__ */ __name(function () {
				return connection_1.LogTraceNotification;
			}, "get"),
		});
		Object.defineProperty(exports2, "ConnectionErrors", {
			enumerable: true,
			get: /* @__PURE__ */ __name(function () {
				return connection_1.ConnectionErrors;
			}, "get"),
		});
		Object.defineProperty(exports2, "ConnectionError", {
			enumerable: true,
			get: /* @__PURE__ */ __name(function () {
				return connection_1.ConnectionError;
			}, "get"),
		});
		Object.defineProperty(exports2, "CancellationReceiverStrategy", {
			enumerable: true,
			get: /* @__PURE__ */ __name(function () {
				return connection_1.CancellationReceiverStrategy;
			}, "get"),
		});
		Object.defineProperty(exports2, "CancellationSenderStrategy", {
			enumerable: true,
			get: /* @__PURE__ */ __name(function () {
				return connection_1.CancellationSenderStrategy;
			}, "get"),
		});
		Object.defineProperty(exports2, "CancellationStrategy", {
			enumerable: true,
			get: /* @__PURE__ */ __name(function () {
				return connection_1.CancellationStrategy;
			}, "get"),
		});
		Object.defineProperty(exports2, "MessageStrategy", {
			enumerable: true,
			get: /* @__PURE__ */ __name(function () {
				return connection_1.MessageStrategy;
			}, "get"),
		});
		var ral_1 = require_ral();
		exports2.RAL = ral_1.default;
	},
});

// ../../../node_modules/.pnpm/vscode-jsonrpc@8.2.0/node_modules/vscode-jsonrpc/lib/node/ril.js
var require_ril = __commonJS({
	"../../../node_modules/.pnpm/vscode-jsonrpc@8.2.0/node_modules/vscode-jsonrpc/lib/node/ril.js"(exports2) {
		"use strict";
		init_cjs_shims();
		Object.defineProperty(exports2, "__esModule", {
			value: true,
		});
		var util_1 = require("util");
		var api_1 = require_api();
		var MessageBuffer = class MessageBuffer2 extends api_1.AbstractMessageBuffer {
			static {
				__name(this, "MessageBuffer");
			}
			constructor(encoding = "utf-8") {
				super(encoding);
			}
			emptyBuffer() {
				return MessageBuffer2.emptyBuffer;
			}
			fromString(value, encoding) {
				return Buffer.from(value, encoding);
			}
			toString(value, encoding) {
				if (value instanceof Buffer) {
					return value.toString(encoding);
				} else {
					return new util_1.TextDecoder(encoding).decode(value);
				}
			}
			asNative(buffer, length) {
				if (length === void 0) {
					return buffer instanceof Buffer ? buffer : Buffer.from(buffer);
				} else {
					return buffer instanceof Buffer ? buffer.slice(0, length) : Buffer.from(buffer, 0, length);
				}
			}
			allocNative(length) {
				return Buffer.allocUnsafe(length);
			}
		};
		MessageBuffer.emptyBuffer = Buffer.allocUnsafe(0);
		var ReadableStreamWrapper = class ReadableStreamWrapper {
			static {
				__name(this, "ReadableStreamWrapper");
			}
			constructor(stream) {
				this.stream = stream;
			}
			onClose(listener) {
				this.stream.on("close", listener);
				return api_1.Disposable.create(() => this.stream.off("close", listener));
			}
			onError(listener) {
				this.stream.on("error", listener);
				return api_1.Disposable.create(() => this.stream.off("error", listener));
			}
			onEnd(listener) {
				this.stream.on("end", listener);
				return api_1.Disposable.create(() => this.stream.off("end", listener));
			}
			onData(listener) {
				this.stream.on("data", listener);
				return api_1.Disposable.create(() => this.stream.off("data", listener));
			}
		};
		var WritableStreamWrapper = class WritableStreamWrapper {
			static {
				__name(this, "WritableStreamWrapper");
			}
			constructor(stream) {
				this.stream = stream;
			}
			onClose(listener) {
				this.stream.on("close", listener);
				return api_1.Disposable.create(() => this.stream.off("close", listener));
			}
			onError(listener) {
				this.stream.on("error", listener);
				return api_1.Disposable.create(() => this.stream.off("error", listener));
			}
			onEnd(listener) {
				this.stream.on("end", listener);
				return api_1.Disposable.create(() => this.stream.off("end", listener));
			}
			write(data, encoding) {
				return new Promise((resolve, reject) => {
					const callback = /* @__PURE__ */ __name((error) => {
						if (error === void 0 || error === null) {
							resolve();
						} else {
							reject(error);
						}
					}, "callback");
					if (typeof data === "string") {
						this.stream.write(data, encoding, callback);
					} else {
						this.stream.write(data, callback);
					}
				});
			}
			end() {
				this.stream.end();
			}
		};
		var _ril = Object.freeze({
			messageBuffer: Object.freeze({
				create: /* @__PURE__ */ __name((encoding) => new MessageBuffer(encoding), "create"),
			}),
			applicationJson: Object.freeze({
				encoder: Object.freeze({
					name: "application/json",
					encode: /* @__PURE__ */ __name((msg, options) => {
						try {
							return Promise.resolve(Buffer.from(JSON.stringify(msg, void 0, 0), options.charset));
						} catch (err) {
							return Promise.reject(err);
						}
					}, "encode"),
				}),
				decoder: Object.freeze({
					name: "application/json",
					decode: /* @__PURE__ */ __name((buffer, options) => {
						try {
							if (buffer instanceof Buffer) {
								return Promise.resolve(JSON.parse(buffer.toString(options.charset)));
							} else {
								return Promise.resolve(JSON.parse(new util_1.TextDecoder(options.charset).decode(buffer)));
							}
						} catch (err) {
							return Promise.reject(err);
						}
					}, "decode"),
				}),
			}),
			stream: Object.freeze({
				asReadableStream: /* @__PURE__ */ __name((stream) => new ReadableStreamWrapper(stream), "asReadableStream"),
				asWritableStream: /* @__PURE__ */ __name((stream) => new WritableStreamWrapper(stream), "asWritableStream"),
			}),
			console,
			timer: Object.freeze({
				setTimeout(callback, ms, ...args) {
					const handle = setTimeout(callback, ms, ...args);
					return {
						dispose: /* @__PURE__ */ __name(() => clearTimeout(handle), "dispose"),
					};
				},
				setImmediate(callback, ...args) {
					const handle = setImmediate(callback, ...args);
					return {
						dispose: /* @__PURE__ */ __name(() => clearImmediate(handle), "dispose"),
					};
				},
				setInterval(callback, ms, ...args) {
					const handle = setInterval(callback, ms, ...args);
					return {
						dispose: /* @__PURE__ */ __name(() => clearInterval(handle), "dispose"),
					};
				},
			}),
		});
		function RIL() {
			return _ril;
		}
		__name(RIL, "RIL");
		(function (RIL2) {
			function install() {
				api_1.RAL.install(_ril);
			}
			__name(install, "install");
			RIL2.install = install;
		})(RIL || (RIL = {}));
		exports2.default = RIL;
	},
});

// ../../../node_modules/.pnpm/vscode-jsonrpc@8.2.0/node_modules/vscode-jsonrpc/lib/node/main.js
var require_main = __commonJS({
	"../../../node_modules/.pnpm/vscode-jsonrpc@8.2.0/node_modules/vscode-jsonrpc/lib/node/main.js"(exports2) {
		"use strict";
		init_cjs_shims();
		var __createBinding =
			(exports2 && exports2.__createBinding) ||
			(Object.create
				? function (o, m, k, k2) {
						if (k2 === void 0) k2 = k;
						var desc = Object.getOwnPropertyDescriptor(m, k);
						if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
							desc = {
								enumerable: true,
								get: /* @__PURE__ */ __name(function () {
									return m[k];
								}, "get"),
							};
						}
						Object.defineProperty(o, k2, desc);
					}
				: function (o, m, k, k2) {
						if (k2 === void 0) k2 = k;
						o[k2] = m[k];
					});
		var __exportStar =
			(exports2 && exports2.__exportStar) ||
			function (m, exports1) {
				for (var p in m)
					if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports1, p)) __createBinding(exports1, m, p);
			};
		Object.defineProperty(exports2, "__esModule", {
			value: true,
		});
		exports2.createMessageConnection =
			exports2.createServerSocketTransport =
			exports2.createClientSocketTransport =
			exports2.createServerPipeTransport =
			exports2.createClientPipeTransport =
			exports2.generateRandomPipeName =
			exports2.StreamMessageWriter =
			exports2.StreamMessageReader =
			exports2.SocketMessageWriter =
			exports2.SocketMessageReader =
			exports2.PortMessageWriter =
			exports2.PortMessageReader =
			exports2.IPCMessageWriter =
			exports2.IPCMessageReader =
				void 0;
		var ril_1 = require_ril();
		ril_1.default.install();
		var path = require("path");
		var os = require("os");
		var crypto_1 = require("crypto");
		var net_1 = require("net");
		var api_1 = require_api();
		__exportStar(require_api(), exports2);
		var IPCMessageReader = class IPCMessageReader extends api_1.AbstractMessageReader {
			static {
				__name(this, "IPCMessageReader");
			}
			constructor(process1) {
				super();
				this.process = process1;
				let eventEmitter = this.process;
				eventEmitter.on("error", (error) => this.fireError(error));
				eventEmitter.on("close", () => this.fireClose());
			}
			listen(callback) {
				this.process.on("message", callback);
				return api_1.Disposable.create(() => this.process.off("message", callback));
			}
		};
		exports2.IPCMessageReader = IPCMessageReader;
		var IPCMessageWriter = class IPCMessageWriter extends api_1.AbstractMessageWriter {
			static {
				__name(this, "IPCMessageWriter");
			}
			constructor(process1) {
				super();
				this.process = process1;
				this.errorCount = 0;
				const eventEmitter = this.process;
				eventEmitter.on("error", (error) => this.fireError(error));
				eventEmitter.on("close", () => this.fireClose);
			}
			write(msg) {
				try {
					if (typeof this.process.send === "function") {
						this.process.send(msg, void 0, void 0, (error) => {
							if (error) {
								this.errorCount++;
								this.handleError(error, msg);
							} else {
								this.errorCount = 0;
							}
						});
					}
					return Promise.resolve();
				} catch (error) {
					this.handleError(error, msg);
					return Promise.reject(error);
				}
			}
			handleError(error, msg) {
				this.errorCount++;
				this.fireError(error, msg, this.errorCount);
			}
			end() {}
		};
		exports2.IPCMessageWriter = IPCMessageWriter;
		var PortMessageReader = class PortMessageReader extends api_1.AbstractMessageReader {
			static {
				__name(this, "PortMessageReader");
			}
			constructor(port) {
				super();
				this.onData = new api_1.Emitter();
				port.on("close", () => this.fireClose);
				port.on("error", (error) => this.fireError(error));
				port.on("message", (message) => {
					this.onData.fire(message);
				});
			}
			listen(callback) {
				return this.onData.event(callback);
			}
		};
		exports2.PortMessageReader = PortMessageReader;
		var PortMessageWriter = class PortMessageWriter extends api_1.AbstractMessageWriter {
			static {
				__name(this, "PortMessageWriter");
			}
			constructor(port) {
				super();
				this.port = port;
				this.errorCount = 0;
				port.on("close", () => this.fireClose());
				port.on("error", (error) => this.fireError(error));
			}
			write(msg) {
				try {
					this.port.postMessage(msg);
					return Promise.resolve();
				} catch (error) {
					this.handleError(error, msg);
					return Promise.reject(error);
				}
			}
			handleError(error, msg) {
				this.errorCount++;
				this.fireError(error, msg, this.errorCount);
			}
			end() {}
		};
		exports2.PortMessageWriter = PortMessageWriter;
		var SocketMessageReader = class SocketMessageReader extends api_1.ReadableStreamMessageReader {
			static {
				__name(this, "SocketMessageReader");
			}
			constructor(socket, encoding = "utf-8") {
				super((0, ril_1.default)().stream.asReadableStream(socket), encoding);
			}
		};
		exports2.SocketMessageReader = SocketMessageReader;
		var SocketMessageWriter = class SocketMessageWriter extends api_1.WriteableStreamMessageWriter {
			static {
				__name(this, "SocketMessageWriter");
			}
			constructor(socket, options) {
				super((0, ril_1.default)().stream.asWritableStream(socket), options);
				this.socket = socket;
			}
			dispose() {
				super.dispose();
				this.socket.destroy();
			}
		};
		exports2.SocketMessageWriter = SocketMessageWriter;
		var StreamMessageReader = class StreamMessageReader extends api_1.ReadableStreamMessageReader {
			static {
				__name(this, "StreamMessageReader");
			}
			constructor(readable, encoding) {
				super((0, ril_1.default)().stream.asReadableStream(readable), encoding);
			}
		};
		exports2.StreamMessageReader = StreamMessageReader;
		var StreamMessageWriter = class StreamMessageWriter extends api_1.WriteableStreamMessageWriter {
			static {
				__name(this, "StreamMessageWriter");
			}
			constructor(writable, options) {
				super((0, ril_1.default)().stream.asWritableStream(writable), options);
			}
		};
		exports2.StreamMessageWriter = StreamMessageWriter;
		var XDG_RUNTIME_DIR = process.env["XDG_RUNTIME_DIR"];
		var safeIpcPathLengths = /* @__PURE__ */ new Map([
			["linux", 107],
			["darwin", 103],
		]);
		function generateRandomPipeName() {
			const randomSuffix = (0, crypto_1.randomBytes)(21).toString("hex");
			if (process.platform === "win32") {
				return `\\\\.\\pipe\\vscode-jsonrpc-${randomSuffix}-sock`;
			}
			let result;
			if (XDG_RUNTIME_DIR) {
				result = path.join(XDG_RUNTIME_DIR, `vscode-ipc-${randomSuffix}.sock`);
			} else {
				result = path.join(os.tmpdir(), `vscode-${randomSuffix}.sock`);
			}
			const limit = safeIpcPathLengths.get(process.platform);
			if (limit !== void 0 && result.length > limit) {
				(0, ril_1.default)().console.warn(`WARNING: IPC handle "${result}" is longer than ${limit} characters.`);
			}
			return result;
		}
		__name(generateRandomPipeName, "generateRandomPipeName");
		exports2.generateRandomPipeName = generateRandomPipeName;
		function createClientPipeTransport(pipeName, encoding = "utf-8") {
			let connectResolve;
			const connected = new Promise((resolve, _reject) => {
				connectResolve = resolve;
			});
			return new Promise((resolve, reject) => {
				let server = (0, net_1.createServer)((socket) => {
					server.close();
					connectResolve([new SocketMessageReader(socket, encoding), new SocketMessageWriter(socket, encoding)]);
				});
				server.on("error", reject);
				server.listen(pipeName, () => {
					server.removeListener("error", reject);
					resolve({
						onConnected: /* @__PURE__ */ __name(() => {
							return connected;
						}, "onConnected"),
					});
				});
			});
		}
		__name(createClientPipeTransport, "createClientPipeTransport");
		exports2.createClientPipeTransport = createClientPipeTransport;
		function createServerPipeTransport(pipeName, encoding = "utf-8") {
			const socket = (0, net_1.createConnection)(pipeName);
			return [new SocketMessageReader(socket, encoding), new SocketMessageWriter(socket, encoding)];
		}
		__name(createServerPipeTransport, "createServerPipeTransport");
		exports2.createServerPipeTransport = createServerPipeTransport;
		function createClientSocketTransport(port, encoding = "utf-8") {
			let connectResolve;
			const connected = new Promise((resolve, _reject) => {
				connectResolve = resolve;
			});
			return new Promise((resolve, reject) => {
				const server = (0, net_1.createServer)((socket) => {
					server.close();
					connectResolve([new SocketMessageReader(socket, encoding), new SocketMessageWriter(socket, encoding)]);
				});
				server.on("error", reject);
				server.listen(port, "127.0.0.1", () => {
					server.removeListener("error", reject);
					resolve({
						onConnected: /* @__PURE__ */ __name(() => {
							return connected;
						}, "onConnected"),
					});
				});
			});
		}
		__name(createClientSocketTransport, "createClientSocketTransport");
		exports2.createClientSocketTransport = createClientSocketTransport;
		function createServerSocketTransport(port, encoding = "utf-8") {
			const socket = (0, net_1.createConnection)(port, "127.0.0.1");
			return [new SocketMessageReader(socket, encoding), new SocketMessageWriter(socket, encoding)];
		}
		__name(createServerSocketTransport, "createServerSocketTransport");
		exports2.createServerSocketTransport = createServerSocketTransport;
		function isReadableStream(value) {
			const candidate = value;
			return candidate.read !== void 0 && candidate.addListener !== void 0;
		}
		__name(isReadableStream, "isReadableStream");
		function isWritableStream(value) {
			const candidate = value;
			return candidate.write !== void 0 && candidate.addListener !== void 0;
		}
		__name(isWritableStream, "isWritableStream");
		function createMessageConnection(input, output, logger, options) {
			if (!logger) {
				logger = api_1.NullLogger;
			}
			const reader = isReadableStream(input) ? new StreamMessageReader(input) : input;
			const writer = isWritableStream(output) ? new StreamMessageWriter(output) : output;
			if (api_1.ConnectionStrategy.is(options)) {
				options = {
					connectionStrategy: options,
				};
			}
			return (0, api_1.createMessageConnection)(reader, writer, logger, options);
		}
		__name(createMessageConnection, "createMessageConnection");
		exports2.createMessageConnection = createMessageConnection;
	},
});

// ../../../node_modules/.pnpm/vscode-jsonrpc@8.2.0/node_modules/vscode-jsonrpc/node.js
var require_node = __commonJS({
	"../../../node_modules/.pnpm/vscode-jsonrpc@8.2.0/node_modules/vscode-jsonrpc/node.js"(exports2, module2) {
		"use strict";
		init_cjs_shims();
		module2.exports = require_main();
	},
});

// ../../../node_modules/.pnpm/vscode-languageserver-types@3.17.5/node_modules/vscode-languageserver-types/lib/umd/main.js
var require_main2 = __commonJS({
	"../../../node_modules/.pnpm/vscode-languageserver-types@3.17.5/node_modules/vscode-languageserver-types/lib/umd/main.js"(
		exports2,
		module2,
	) {
		"use strict";
		init_cjs_shims();
		(function (factory) {
			if (typeof module2 === "object" && typeof module2.exports === "object") {
				var v = factory(require, exports2);
				if (v !== void 0) module2.exports = v;
			} else if (typeof define === "function" && define.amd) {
				define(["require", "exports"], factory);
			}
		})(function (require1, exports1) {
			"use strict";
			Object.defineProperty(exports1, "__esModule", {
				value: true,
			});
			exports1.TextDocument =
				exports1.EOL =
				exports1.WorkspaceFolder =
				exports1.InlineCompletionContext =
				exports1.SelectedCompletionInfo =
				exports1.InlineCompletionTriggerKind =
				exports1.InlineCompletionList =
				exports1.InlineCompletionItem =
				exports1.StringValue =
				exports1.InlayHint =
				exports1.InlayHintLabelPart =
				exports1.InlayHintKind =
				exports1.InlineValueContext =
				exports1.InlineValueEvaluatableExpression =
				exports1.InlineValueVariableLookup =
				exports1.InlineValueText =
				exports1.SemanticTokens =
				exports1.SemanticTokenModifiers =
				exports1.SemanticTokenTypes =
				exports1.SelectionRange =
				exports1.DocumentLink =
				exports1.FormattingOptions =
				exports1.CodeLens =
				exports1.CodeAction =
				exports1.CodeActionContext =
				exports1.CodeActionTriggerKind =
				exports1.CodeActionKind =
				exports1.DocumentSymbol =
				exports1.WorkspaceSymbol =
				exports1.SymbolInformation =
				exports1.SymbolTag =
				exports1.SymbolKind =
				exports1.DocumentHighlight =
				exports1.DocumentHighlightKind =
				exports1.SignatureInformation =
				exports1.ParameterInformation =
				exports1.Hover =
				exports1.MarkedString =
				exports1.CompletionList =
				exports1.CompletionItem =
				exports1.CompletionItemLabelDetails =
				exports1.InsertTextMode =
				exports1.InsertReplaceEdit =
				exports1.CompletionItemTag =
				exports1.InsertTextFormat =
				exports1.CompletionItemKind =
				exports1.MarkupContent =
				exports1.MarkupKind =
				exports1.TextDocumentItem =
				exports1.OptionalVersionedTextDocumentIdentifier =
				exports1.VersionedTextDocumentIdentifier =
				exports1.TextDocumentIdentifier =
				exports1.WorkspaceChange =
				exports1.WorkspaceEdit =
				exports1.DeleteFile =
				exports1.RenameFile =
				exports1.CreateFile =
				exports1.TextDocumentEdit =
				exports1.AnnotatedTextEdit =
				exports1.ChangeAnnotationIdentifier =
				exports1.ChangeAnnotation =
				exports1.TextEdit =
				exports1.Command =
				exports1.Diagnostic =
				exports1.CodeDescription =
				exports1.DiagnosticTag =
				exports1.DiagnosticSeverity =
				exports1.DiagnosticRelatedInformation =
				exports1.FoldingRange =
				exports1.FoldingRangeKind =
				exports1.ColorPresentation =
				exports1.ColorInformation =
				exports1.Color =
				exports1.LocationLink =
				exports1.Location =
				exports1.Range =
				exports1.Position =
				exports1.uinteger =
				exports1.integer =
				exports1.URI =
				exports1.DocumentUri =
					void 0;
			var DocumentUri2;
			(function (DocumentUri3) {
				function is(value) {
					return typeof value === "string";
				}
				__name(is, "is");
				DocumentUri3.is = is;
			})(DocumentUri2 || (exports1.DocumentUri = DocumentUri2 = {}));
			var URI3;
			(function (URI4) {
				function is(value) {
					return typeof value === "string";
				}
				__name(is, "is");
				URI4.is = is;
			})(URI3 || (exports1.URI = URI3 = {}));
			var integer2;
			(function (integer3) {
				integer3.MIN_VALUE = -2147483648;
				integer3.MAX_VALUE = 2147483647;
				function is(value) {
					return typeof value === "number" && integer3.MIN_VALUE <= value && value <= integer3.MAX_VALUE;
				}
				__name(is, "is");
				integer3.is = is;
			})(integer2 || (exports1.integer = integer2 = {}));
			var uinteger2;
			(function (uinteger3) {
				uinteger3.MIN_VALUE = 0;
				uinteger3.MAX_VALUE = 2147483647;
				function is(value) {
					return typeof value === "number" && uinteger3.MIN_VALUE <= value && value <= uinteger3.MAX_VALUE;
				}
				__name(is, "is");
				uinteger3.is = is;
			})(uinteger2 || (exports1.uinteger = uinteger2 = {}));
			var Position9;
			(function (Position10) {
				function create(line, character) {
					if (line === Number.MAX_VALUE) {
						line = uinteger2.MAX_VALUE;
					}
					if (character === Number.MAX_VALUE) {
						character = uinteger2.MAX_VALUE;
					}
					return {
						line,
						character,
					};
				}
				__name(create, "create");
				Position10.create = create;
				function is(value) {
					var candidate = value;
					return Is2.objectLiteral(candidate) && Is2.uinteger(candidate.line) && Is2.uinteger(candidate.character);
				}
				__name(is, "is");
				Position10.is = is;
			})(Position9 || (exports1.Position = Position9 = {}));
			var Range6;
			(function (Range7) {
				function create(one, two, three, four) {
					if (Is2.uinteger(one) && Is2.uinteger(two) && Is2.uinteger(three) && Is2.uinteger(four)) {
						return {
							start: Position9.create(one, two),
							end: Position9.create(three, four),
						};
					} else if (Position9.is(one) && Position9.is(two)) {
						return {
							start: one,
							end: two,
						};
					} else {
						throw new Error(
							"Range#create called with invalid arguments["
								.concat(one, ", ")
								.concat(two, ", ")
								.concat(three, ", ")
								.concat(four, "]"),
						);
					}
				}
				__name(create, "create");
				Range7.create = create;
				function is(value) {
					var candidate = value;
					return Is2.objectLiteral(candidate) && Position9.is(candidate.start) && Position9.is(candidate.end);
				}
				__name(is, "is");
				Range7.is = is;
			})(Range6 || (exports1.Range = Range6 = {}));
			var Location5;
			(function (Location6) {
				function create(uri, range) {
					return {
						uri,
						range,
					};
				}
				__name(create, "create");
				Location6.create = create;
				function is(value) {
					var candidate = value;
					return (
						Is2.objectLiteral(candidate) &&
						Range6.is(candidate.range) &&
						(Is2.string(candidate.uri) || Is2.undefined(candidate.uri))
					);
				}
				__name(is, "is");
				Location6.is = is;
			})(Location5 || (exports1.Location = Location5 = {}));
			var LocationLink2;
			(function (LocationLink3) {
				function create(targetUri, targetRange, targetSelectionRange, originSelectionRange) {
					return {
						targetUri,
						targetRange,
						targetSelectionRange,
						originSelectionRange,
					};
				}
				__name(create, "create");
				LocationLink3.create = create;
				function is(value) {
					var candidate = value;
					return (
						Is2.objectLiteral(candidate) &&
						Range6.is(candidate.targetRange) &&
						Is2.string(candidate.targetUri) &&
						Range6.is(candidate.targetSelectionRange) &&
						(Range6.is(candidate.originSelectionRange) || Is2.undefined(candidate.originSelectionRange))
					);
				}
				__name(is, "is");
				LocationLink3.is = is;
			})(LocationLink2 || (exports1.LocationLink = LocationLink2 = {}));
			var Color2;
			(function (Color3) {
				function create(red, green, blue, alpha) {
					return {
						red,
						green,
						blue,
						alpha,
					};
				}
				__name(create, "create");
				Color3.create = create;
				function is(value) {
					var candidate = value;
					return (
						Is2.objectLiteral(candidate) &&
						Is2.numberRange(candidate.red, 0, 1) &&
						Is2.numberRange(candidate.green, 0, 1) &&
						Is2.numberRange(candidate.blue, 0, 1) &&
						Is2.numberRange(candidate.alpha, 0, 1)
					);
				}
				__name(is, "is");
				Color3.is = is;
			})(Color2 || (exports1.Color = Color2 = {}));
			var ColorInformation2;
			(function (ColorInformation3) {
				function create(range, color) {
					return {
						range,
						color,
					};
				}
				__name(create, "create");
				ColorInformation3.create = create;
				function is(value) {
					var candidate = value;
					return Is2.objectLiteral(candidate) && Range6.is(candidate.range) && Color2.is(candidate.color);
				}
				__name(is, "is");
				ColorInformation3.is = is;
			})(ColorInformation2 || (exports1.ColorInformation = ColorInformation2 = {}));
			var ColorPresentation2;
			(function (ColorPresentation3) {
				function create(label, textEdit, additionalTextEdits) {
					return {
						label,
						textEdit,
						additionalTextEdits,
					};
				}
				__name(create, "create");
				ColorPresentation3.create = create;
				function is(value) {
					var candidate = value;
					return (
						Is2.objectLiteral(candidate) &&
						Is2.string(candidate.label) &&
						(Is2.undefined(candidate.textEdit) || TextEdit5.is(candidate)) &&
						(Is2.undefined(candidate.additionalTextEdits) || Is2.typedArray(candidate.additionalTextEdits, TextEdit5.is))
					);
				}
				__name(is, "is");
				ColorPresentation3.is = is;
			})(ColorPresentation2 || (exports1.ColorPresentation = ColorPresentation2 = {}));
			var FoldingRangeKind2;
			(function (FoldingRangeKind3) {
				FoldingRangeKind3.Comment = "comment";
				FoldingRangeKind3.Imports = "imports";
				FoldingRangeKind3.Region = "region";
			})(FoldingRangeKind2 || (exports1.FoldingRangeKind = FoldingRangeKind2 = {}));
			var FoldingRange2;
			(function (FoldingRange3) {
				function create(startLine, endLine, startCharacter, endCharacter, kind, collapsedText) {
					var result = {
						startLine,
						endLine,
					};
					if (Is2.defined(startCharacter)) {
						result.startCharacter = startCharacter;
					}
					if (Is2.defined(endCharacter)) {
						result.endCharacter = endCharacter;
					}
					if (Is2.defined(kind)) {
						result.kind = kind;
					}
					if (Is2.defined(collapsedText)) {
						result.collapsedText = collapsedText;
					}
					return result;
				}
				__name(create, "create");
				FoldingRange3.create = create;
				function is(value) {
					var candidate = value;
					return (
						Is2.objectLiteral(candidate) &&
						Is2.uinteger(candidate.startLine) &&
						Is2.uinteger(candidate.startLine) &&
						(Is2.undefined(candidate.startCharacter) || Is2.uinteger(candidate.startCharacter)) &&
						(Is2.undefined(candidate.endCharacter) || Is2.uinteger(candidate.endCharacter)) &&
						(Is2.undefined(candidate.kind) || Is2.string(candidate.kind))
					);
				}
				__name(is, "is");
				FoldingRange3.is = is;
			})(FoldingRange2 || (exports1.FoldingRange = FoldingRange2 = {}));
			var DiagnosticRelatedInformation2;
			(function (DiagnosticRelatedInformation3) {
				function create(location, message) {
					return {
						location,
						message,
					};
				}
				__name(create, "create");
				DiagnosticRelatedInformation3.create = create;
				function is(value) {
					var candidate = value;
					return Is2.defined(candidate) && Location5.is(candidate.location) && Is2.string(candidate.message);
				}
				__name(is, "is");
				DiagnosticRelatedInformation3.is = is;
			})(DiagnosticRelatedInformation2 || (exports1.DiagnosticRelatedInformation = DiagnosticRelatedInformation2 = {}));
			var DiagnosticSeverity4;
			(function (DiagnosticSeverity5) {
				DiagnosticSeverity5.Error = 1;
				DiagnosticSeverity5.Warning = 2;
				DiagnosticSeverity5.Information = 3;
				DiagnosticSeverity5.Hint = 4;
			})(DiagnosticSeverity4 || (exports1.DiagnosticSeverity = DiagnosticSeverity4 = {}));
			var DiagnosticTag2;
			(function (DiagnosticTag3) {
				DiagnosticTag3.Unnecessary = 1;
				DiagnosticTag3.Deprecated = 2;
			})(DiagnosticTag2 || (exports1.DiagnosticTag = DiagnosticTag2 = {}));
			var CodeDescription2;
			(function (CodeDescription3) {
				function is(value) {
					var candidate = value;
					return Is2.objectLiteral(candidate) && Is2.string(candidate.href);
				}
				__name(is, "is");
				CodeDescription3.is = is;
			})(CodeDescription2 || (exports1.CodeDescription = CodeDescription2 = {}));
			var Diagnostic2;
			(function (Diagnostic3) {
				function create(range, message, severity, code, source, relatedInformation) {
					var result = {
						range,
						message,
					};
					if (Is2.defined(severity)) {
						result.severity = severity;
					}
					if (Is2.defined(code)) {
						result.code = code;
					}
					if (Is2.defined(source)) {
						result.source = source;
					}
					if (Is2.defined(relatedInformation)) {
						result.relatedInformation = relatedInformation;
					}
					return result;
				}
				__name(create, "create");
				Diagnostic3.create = create;
				function is(value) {
					var _a;
					var candidate = value;
					return (
						Is2.defined(candidate) &&
						Range6.is(candidate.range) &&
						Is2.string(candidate.message) &&
						(Is2.number(candidate.severity) || Is2.undefined(candidate.severity)) &&
						(Is2.integer(candidate.code) || Is2.string(candidate.code) || Is2.undefined(candidate.code)) &&
						(Is2.undefined(candidate.codeDescription) ||
							Is2.string((_a = candidate.codeDescription) === null || _a === void 0 ? void 0 : _a.href)) &&
						(Is2.string(candidate.source) || Is2.undefined(candidate.source)) &&
						(Is2.undefined(candidate.relatedInformation) ||
							Is2.typedArray(candidate.relatedInformation, DiagnosticRelatedInformation2.is))
					);
				}
				__name(is, "is");
				Diagnostic3.is = is;
			})(Diagnostic2 || (exports1.Diagnostic = Diagnostic2 = {}));
			var Command2;
			(function (Command3) {
				function create(title, command) {
					var args = [];
					for (var _i = 2; _i < arguments.length; _i++) {
						args[_i - 2] = arguments[_i];
					}
					var result = {
						title,
						command,
					};
					if (Is2.defined(args) && args.length > 0) {
						result.arguments = args;
					}
					return result;
				}
				__name(create, "create");
				Command3.create = create;
				function is(value) {
					var candidate = value;
					return Is2.defined(candidate) && Is2.string(candidate.title) && Is2.string(candidate.command);
				}
				__name(is, "is");
				Command3.is = is;
			})(Command2 || (exports1.Command = Command2 = {}));
			var TextEdit5;
			(function (TextEdit6) {
				function replace(range, newText) {
					return {
						range,
						newText,
					};
				}
				__name(replace, "replace");
				TextEdit6.replace = replace;
				function insert(position, newText) {
					return {
						range: {
							start: position,
							end: position,
						},
						newText,
					};
				}
				__name(insert, "insert");
				TextEdit6.insert = insert;
				function del(range) {
					return {
						range,
						newText: "",
					};
				}
				__name(del, "del");
				TextEdit6.del = del;
				function is(value) {
					var candidate = value;
					return Is2.objectLiteral(candidate) && Is2.string(candidate.newText) && Range6.is(candidate.range);
				}
				__name(is, "is");
				TextEdit6.is = is;
			})(TextEdit5 || (exports1.TextEdit = TextEdit5 = {}));
			var ChangeAnnotation2;
			(function (ChangeAnnotation3) {
				function create(label, needsConfirmation, description) {
					var result = {
						label,
					};
					if (needsConfirmation !== void 0) {
						result.needsConfirmation = needsConfirmation;
					}
					if (description !== void 0) {
						result.description = description;
					}
					return result;
				}
				__name(create, "create");
				ChangeAnnotation3.create = create;
				function is(value) {
					var candidate = value;
					return (
						Is2.objectLiteral(candidate) &&
						Is2.string(candidate.label) &&
						(Is2.boolean(candidate.needsConfirmation) || candidate.needsConfirmation === void 0) &&
						(Is2.string(candidate.description) || candidate.description === void 0)
					);
				}
				__name(is, "is");
				ChangeAnnotation3.is = is;
			})(ChangeAnnotation2 || (exports1.ChangeAnnotation = ChangeAnnotation2 = {}));
			var ChangeAnnotationIdentifier2;
			(function (ChangeAnnotationIdentifier3) {
				function is(value) {
					var candidate = value;
					return Is2.string(candidate);
				}
				__name(is, "is");
				ChangeAnnotationIdentifier3.is = is;
			})(ChangeAnnotationIdentifier2 || (exports1.ChangeAnnotationIdentifier = ChangeAnnotationIdentifier2 = {}));
			var AnnotatedTextEdit2;
			(function (AnnotatedTextEdit3) {
				function replace(range, newText, annotation) {
					return {
						range,
						newText,
						annotationId: annotation,
					};
				}
				__name(replace, "replace");
				AnnotatedTextEdit3.replace = replace;
				function insert(position, newText, annotation) {
					return {
						range: {
							start: position,
							end: position,
						},
						newText,
						annotationId: annotation,
					};
				}
				__name(insert, "insert");
				AnnotatedTextEdit3.insert = insert;
				function del(range, annotation) {
					return {
						range,
						newText: "",
						annotationId: annotation,
					};
				}
				__name(del, "del");
				AnnotatedTextEdit3.del = del;
				function is(value) {
					var candidate = value;
					return (
						TextEdit5.is(candidate) &&
						(ChangeAnnotation2.is(candidate.annotationId) || ChangeAnnotationIdentifier2.is(candidate.annotationId))
					);
				}
				__name(is, "is");
				AnnotatedTextEdit3.is = is;
			})(AnnotatedTextEdit2 || (exports1.AnnotatedTextEdit = AnnotatedTextEdit2 = {}));
			var TextDocumentEdit2;
			(function (TextDocumentEdit3) {
				function create(textDocument, edits) {
					return {
						textDocument,
						edits,
					};
				}
				__name(create, "create");
				TextDocumentEdit3.create = create;
				function is(value) {
					var candidate = value;
					return (
						Is2.defined(candidate) &&
						OptionalVersionedTextDocumentIdentifier2.is(candidate.textDocument) &&
						Array.isArray(candidate.edits)
					);
				}
				__name(is, "is");
				TextDocumentEdit3.is = is;
			})(TextDocumentEdit2 || (exports1.TextDocumentEdit = TextDocumentEdit2 = {}));
			var CreateFile2;
			(function (CreateFile3) {
				function create(uri, options, annotation) {
					var result = {
						kind: "create",
						uri,
					};
					if (options !== void 0 && (options.overwrite !== void 0 || options.ignoreIfExists !== void 0)) {
						result.options = options;
					}
					if (annotation !== void 0) {
						result.annotationId = annotation;
					}
					return result;
				}
				__name(create, "create");
				CreateFile3.create = create;
				function is(value) {
					var candidate = value;
					return (
						candidate &&
						candidate.kind === "create" &&
						Is2.string(candidate.uri) &&
						(candidate.options === void 0 ||
							((candidate.options.overwrite === void 0 || Is2.boolean(candidate.options.overwrite)) &&
								(candidate.options.ignoreIfExists === void 0 || Is2.boolean(candidate.options.ignoreIfExists)))) &&
						(candidate.annotationId === void 0 || ChangeAnnotationIdentifier2.is(candidate.annotationId))
					);
				}
				__name(is, "is");
				CreateFile3.is = is;
			})(CreateFile2 || (exports1.CreateFile = CreateFile2 = {}));
			var RenameFile2;
			(function (RenameFile3) {
				function create(oldUri, newUri, options, annotation) {
					var result = {
						kind: "rename",
						oldUri,
						newUri,
					};
					if (options !== void 0 && (options.overwrite !== void 0 || options.ignoreIfExists !== void 0)) {
						result.options = options;
					}
					if (annotation !== void 0) {
						result.annotationId = annotation;
					}
					return result;
				}
				__name(create, "create");
				RenameFile3.create = create;
				function is(value) {
					var candidate = value;
					return (
						candidate &&
						candidate.kind === "rename" &&
						Is2.string(candidate.oldUri) &&
						Is2.string(candidate.newUri) &&
						(candidate.options === void 0 ||
							((candidate.options.overwrite === void 0 || Is2.boolean(candidate.options.overwrite)) &&
								(candidate.options.ignoreIfExists === void 0 || Is2.boolean(candidate.options.ignoreIfExists)))) &&
						(candidate.annotationId === void 0 || ChangeAnnotationIdentifier2.is(candidate.annotationId))
					);
				}
				__name(is, "is");
				RenameFile3.is = is;
			})(RenameFile2 || (exports1.RenameFile = RenameFile2 = {}));
			var DeleteFile2;
			(function (DeleteFile3) {
				function create(uri, options, annotation) {
					var result = {
						kind: "delete",
						uri,
					};
					if (options !== void 0 && (options.recursive !== void 0 || options.ignoreIfNotExists !== void 0)) {
						result.options = options;
					}
					if (annotation !== void 0) {
						result.annotationId = annotation;
					}
					return result;
				}
				__name(create, "create");
				DeleteFile3.create = create;
				function is(value) {
					var candidate = value;
					return (
						candidate &&
						candidate.kind === "delete" &&
						Is2.string(candidate.uri) &&
						(candidate.options === void 0 ||
							((candidate.options.recursive === void 0 || Is2.boolean(candidate.options.recursive)) &&
								(candidate.options.ignoreIfNotExists === void 0 || Is2.boolean(candidate.options.ignoreIfNotExists)))) &&
						(candidate.annotationId === void 0 || ChangeAnnotationIdentifier2.is(candidate.annotationId))
					);
				}
				__name(is, "is");
				DeleteFile3.is = is;
			})(DeleteFile2 || (exports1.DeleteFile = DeleteFile2 = {}));
			var WorkspaceEdit2;
			(function (WorkspaceEdit3) {
				function is(value) {
					var candidate = value;
					return (
						candidate &&
						(candidate.changes !== void 0 || candidate.documentChanges !== void 0) &&
						(candidate.documentChanges === void 0 ||
							candidate.documentChanges.every(function (change) {
								if (Is2.string(change.kind)) {
									return CreateFile2.is(change) || RenameFile2.is(change) || DeleteFile2.is(change);
								} else {
									return TextDocumentEdit2.is(change);
								}
							}))
					);
				}
				__name(is, "is");
				WorkspaceEdit3.is = is;
			})(WorkspaceEdit2 || (exports1.WorkspaceEdit = WorkspaceEdit2 = {}));
			var TextEditChangeImpl =
				/** @class */
				(function () {
					function TextEditChangeImpl2(edits, changeAnnotations) {
						this.edits = edits;
						this.changeAnnotations = changeAnnotations;
					}
					__name(TextEditChangeImpl2, "TextEditChangeImpl");
					TextEditChangeImpl2.prototype.insert = function (position, newText, annotation) {
						var edit;
						var id;
						if (annotation === void 0) {
							edit = TextEdit5.insert(position, newText);
						} else if (ChangeAnnotationIdentifier2.is(annotation)) {
							id = annotation;
							edit = AnnotatedTextEdit2.insert(position, newText, annotation);
						} else {
							this.assertChangeAnnotations(this.changeAnnotations);
							id = this.changeAnnotations.manage(annotation);
							edit = AnnotatedTextEdit2.insert(position, newText, id);
						}
						this.edits.push(edit);
						if (id !== void 0) {
							return id;
						}
					};
					TextEditChangeImpl2.prototype.replace = function (range, newText, annotation) {
						var edit;
						var id;
						if (annotation === void 0) {
							edit = TextEdit5.replace(range, newText);
						} else if (ChangeAnnotationIdentifier2.is(annotation)) {
							id = annotation;
							edit = AnnotatedTextEdit2.replace(range, newText, annotation);
						} else {
							this.assertChangeAnnotations(this.changeAnnotations);
							id = this.changeAnnotations.manage(annotation);
							edit = AnnotatedTextEdit2.replace(range, newText, id);
						}
						this.edits.push(edit);
						if (id !== void 0) {
							return id;
						}
					};
					TextEditChangeImpl2.prototype.delete = function (range, annotation) {
						var edit;
						var id;
						if (annotation === void 0) {
							edit = TextEdit5.del(range);
						} else if (ChangeAnnotationIdentifier2.is(annotation)) {
							id = annotation;
							edit = AnnotatedTextEdit2.del(range, annotation);
						} else {
							this.assertChangeAnnotations(this.changeAnnotations);
							id = this.changeAnnotations.manage(annotation);
							edit = AnnotatedTextEdit2.del(range, id);
						}
						this.edits.push(edit);
						if (id !== void 0) {
							return id;
						}
					};
					TextEditChangeImpl2.prototype.add = function (edit) {
						this.edits.push(edit);
					};
					TextEditChangeImpl2.prototype.all = function () {
						return this.edits;
					};
					TextEditChangeImpl2.prototype.clear = function () {
						this.edits.splice(0, this.edits.length);
					};
					TextEditChangeImpl2.prototype.assertChangeAnnotations = function (value) {
						if (value === void 0) {
							throw new Error("Text edit change is not configured to manage change annotations.");
						}
					};
					return TextEditChangeImpl2;
				})();
			var ChangeAnnotations =
				/** @class */
				(function () {
					function ChangeAnnotations2(annotations) {
						this._annotations = annotations === void 0 ? /* @__PURE__ */ Object.create(null) : annotations;
						this._counter = 0;
						this._size = 0;
					}
					__name(ChangeAnnotations2, "ChangeAnnotations");
					ChangeAnnotations2.prototype.all = function () {
						return this._annotations;
					};
					Object.defineProperty(ChangeAnnotations2.prototype, "size", {
						get: /* @__PURE__ */ __name(function () {
							return this._size;
						}, "get"),
						enumerable: false,
						configurable: true,
					});
					ChangeAnnotations2.prototype.manage = function (idOrAnnotation, annotation) {
						var id;
						if (ChangeAnnotationIdentifier2.is(idOrAnnotation)) {
							id = idOrAnnotation;
						} else {
							id = this.nextId();
							annotation = idOrAnnotation;
						}
						if (this._annotations[id] !== void 0) {
							throw new Error("Id ".concat(id, " is already in use."));
						}
						if (annotation === void 0) {
							throw new Error("No annotation provided for id ".concat(id));
						}
						this._annotations[id] = annotation;
						this._size++;
						return id;
					};
					ChangeAnnotations2.prototype.nextId = function () {
						this._counter++;
						return this._counter.toString();
					};
					return ChangeAnnotations2;
				})();
			var WorkspaceChange =
				/** @class */
				(function () {
					function WorkspaceChange2(workspaceEdit) {
						var _this = this;
						this._textEditChanges = /* @__PURE__ */ Object.create(null);
						if (workspaceEdit !== void 0) {
							this._workspaceEdit = workspaceEdit;
							if (workspaceEdit.documentChanges) {
								this._changeAnnotations = new ChangeAnnotations(workspaceEdit.changeAnnotations);
								workspaceEdit.changeAnnotations = this._changeAnnotations.all();
								workspaceEdit.documentChanges.forEach(function (change) {
									if (TextDocumentEdit2.is(change)) {
										var textEditChange = new TextEditChangeImpl(change.edits, _this._changeAnnotations);
										_this._textEditChanges[change.textDocument.uri] = textEditChange;
									}
								});
							} else if (workspaceEdit.changes) {
								Object.keys(workspaceEdit.changes).forEach(function (key) {
									var textEditChange = new TextEditChangeImpl(workspaceEdit.changes[key]);
									_this._textEditChanges[key] = textEditChange;
								});
							}
						} else {
							this._workspaceEdit = {};
						}
					}
					__name(WorkspaceChange2, "WorkspaceChange");
					Object.defineProperty(WorkspaceChange2.prototype, "edit", {
						/**
						 * Returns the underlying {@link WorkspaceEdit} literal
						 * use to be returned from a workspace edit operation like rename.
						 */
						get: /* @__PURE__ */ __name(function () {
							this.initDocumentChanges();
							if (this._changeAnnotations !== void 0) {
								if (this._changeAnnotations.size === 0) {
									this._workspaceEdit.changeAnnotations = void 0;
								} else {
									this._workspaceEdit.changeAnnotations = this._changeAnnotations.all();
								}
							}
							return this._workspaceEdit;
						}, "get"),
						enumerable: false,
						configurable: true,
					});
					WorkspaceChange2.prototype.getTextEditChange = function (key) {
						if (OptionalVersionedTextDocumentIdentifier2.is(key)) {
							this.initDocumentChanges();
							if (this._workspaceEdit.documentChanges === void 0) {
								throw new Error("Workspace edit is not configured for document changes.");
							}
							var textDocument = {
								uri: key.uri,
								version: key.version,
							};
							var result = this._textEditChanges[textDocument.uri];
							if (!result) {
								var edits = [];
								var textDocumentEdit = {
									textDocument,
									edits,
								};
								this._workspaceEdit.documentChanges.push(textDocumentEdit);
								result = new TextEditChangeImpl(edits, this._changeAnnotations);
								this._textEditChanges[textDocument.uri] = result;
							}
							return result;
						} else {
							this.initChanges();
							if (this._workspaceEdit.changes === void 0) {
								throw new Error("Workspace edit is not configured for normal text edit changes.");
							}
							var result = this._textEditChanges[key];
							if (!result) {
								var edits = [];
								this._workspaceEdit.changes[key] = edits;
								result = new TextEditChangeImpl(edits);
								this._textEditChanges[key] = result;
							}
							return result;
						}
					};
					WorkspaceChange2.prototype.initDocumentChanges = function () {
						if (this._workspaceEdit.documentChanges === void 0 && this._workspaceEdit.changes === void 0) {
							this._changeAnnotations = new ChangeAnnotations();
							this._workspaceEdit.documentChanges = [];
							this._workspaceEdit.changeAnnotations = this._changeAnnotations.all();
						}
					};
					WorkspaceChange2.prototype.initChanges = function () {
						if (this._workspaceEdit.documentChanges === void 0 && this._workspaceEdit.changes === void 0) {
							this._workspaceEdit.changes = /* @__PURE__ */ Object.create(null);
						}
					};
					WorkspaceChange2.prototype.createFile = function (uri, optionsOrAnnotation, options) {
						this.initDocumentChanges();
						if (this._workspaceEdit.documentChanges === void 0) {
							throw new Error("Workspace edit is not configured for document changes.");
						}
						var annotation;
						if (ChangeAnnotation2.is(optionsOrAnnotation) || ChangeAnnotationIdentifier2.is(optionsOrAnnotation)) {
							annotation = optionsOrAnnotation;
						} else {
							options = optionsOrAnnotation;
						}
						var operation;
						var id;
						if (annotation === void 0) {
							operation = CreateFile2.create(uri, options);
						} else {
							id = ChangeAnnotationIdentifier2.is(annotation) ? annotation : this._changeAnnotations.manage(annotation);
							operation = CreateFile2.create(uri, options, id);
						}
						this._workspaceEdit.documentChanges.push(operation);
						if (id !== void 0) {
							return id;
						}
					};
					WorkspaceChange2.prototype.renameFile = function (oldUri, newUri, optionsOrAnnotation, options) {
						this.initDocumentChanges();
						if (this._workspaceEdit.documentChanges === void 0) {
							throw new Error("Workspace edit is not configured for document changes.");
						}
						var annotation;
						if (ChangeAnnotation2.is(optionsOrAnnotation) || ChangeAnnotationIdentifier2.is(optionsOrAnnotation)) {
							annotation = optionsOrAnnotation;
						} else {
							options = optionsOrAnnotation;
						}
						var operation;
						var id;
						if (annotation === void 0) {
							operation = RenameFile2.create(oldUri, newUri, options);
						} else {
							id = ChangeAnnotationIdentifier2.is(annotation) ? annotation : this._changeAnnotations.manage(annotation);
							operation = RenameFile2.create(oldUri, newUri, options, id);
						}
						this._workspaceEdit.documentChanges.push(operation);
						if (id !== void 0) {
							return id;
						}
					};
					WorkspaceChange2.prototype.deleteFile = function (uri, optionsOrAnnotation, options) {
						this.initDocumentChanges();
						if (this._workspaceEdit.documentChanges === void 0) {
							throw new Error("Workspace edit is not configured for document changes.");
						}
						var annotation;
						if (ChangeAnnotation2.is(optionsOrAnnotation) || ChangeAnnotationIdentifier2.is(optionsOrAnnotation)) {
							annotation = optionsOrAnnotation;
						} else {
							options = optionsOrAnnotation;
						}
						var operation;
						var id;
						if (annotation === void 0) {
							operation = DeleteFile2.create(uri, options);
						} else {
							id = ChangeAnnotationIdentifier2.is(annotation) ? annotation : this._changeAnnotations.manage(annotation);
							operation = DeleteFile2.create(uri, options, id);
						}
						this._workspaceEdit.documentChanges.push(operation);
						if (id !== void 0) {
							return id;
						}
					};
					return WorkspaceChange2;
				})();
			exports1.WorkspaceChange = WorkspaceChange;
			var TextDocumentIdentifier2;
			(function (TextDocumentIdentifier3) {
				function create(uri) {
					return {
						uri,
					};
				}
				__name(create, "create");
				TextDocumentIdentifier3.create = create;
				function is(value) {
					var candidate = value;
					return Is2.defined(candidate) && Is2.string(candidate.uri);
				}
				__name(is, "is");
				TextDocumentIdentifier3.is = is;
			})(TextDocumentIdentifier2 || (exports1.TextDocumentIdentifier = TextDocumentIdentifier2 = {}));
			var VersionedTextDocumentIdentifier2;
			(function (VersionedTextDocumentIdentifier3) {
				function create(uri, version) {
					return {
						uri,
						version,
					};
				}
				__name(create, "create");
				VersionedTextDocumentIdentifier3.create = create;
				function is(value) {
					var candidate = value;
					return Is2.defined(candidate) && Is2.string(candidate.uri) && Is2.integer(candidate.version);
				}
				__name(is, "is");
				VersionedTextDocumentIdentifier3.is = is;
			})(
				VersionedTextDocumentIdentifier2 ||
					(exports1.VersionedTextDocumentIdentifier = VersionedTextDocumentIdentifier2 = {}),
			);
			var OptionalVersionedTextDocumentIdentifier2;
			(function (OptionalVersionedTextDocumentIdentifier3) {
				function create(uri, version) {
					return {
						uri,
						version,
					};
				}
				__name(create, "create");
				OptionalVersionedTextDocumentIdentifier3.create = create;
				function is(value) {
					var candidate = value;
					return (
						Is2.defined(candidate) &&
						Is2.string(candidate.uri) &&
						(candidate.version === null || Is2.integer(candidate.version))
					);
				}
				__name(is, "is");
				OptionalVersionedTextDocumentIdentifier3.is = is;
			})(
				OptionalVersionedTextDocumentIdentifier2 ||
					(exports1.OptionalVersionedTextDocumentIdentifier = OptionalVersionedTextDocumentIdentifier2 = {}),
			);
			var TextDocumentItem2;
			(function (TextDocumentItem3) {
				function create(uri, languageId, version, text) {
					return {
						uri,
						languageId,
						version,
						text,
					};
				}
				__name(create, "create");
				TextDocumentItem3.create = create;
				function is(value) {
					var candidate = value;
					return (
						Is2.defined(candidate) &&
						Is2.string(candidate.uri) &&
						Is2.string(candidate.languageId) &&
						Is2.integer(candidate.version) &&
						Is2.string(candidate.text)
					);
				}
				__name(is, "is");
				TextDocumentItem3.is = is;
			})(TextDocumentItem2 || (exports1.TextDocumentItem = TextDocumentItem2 = {}));
			var MarkupKind2;
			(function (MarkupKind3) {
				MarkupKind3.PlainText = "plaintext";
				MarkupKind3.Markdown = "markdown";
				function is(value) {
					var candidate = value;
					return candidate === MarkupKind3.PlainText || candidate === MarkupKind3.Markdown;
				}
				__name(is, "is");
				MarkupKind3.is = is;
			})(MarkupKind2 || (exports1.MarkupKind = MarkupKind2 = {}));
			var MarkupContent2;
			(function (MarkupContent3) {
				function is(value) {
					var candidate = value;
					return Is2.objectLiteral(value) && MarkupKind2.is(candidate.kind) && Is2.string(candidate.value);
				}
				__name(is, "is");
				MarkupContent3.is = is;
			})(MarkupContent2 || (exports1.MarkupContent = MarkupContent2 = {}));
			var CompletionItemKind3;
			(function (CompletionItemKind4) {
				CompletionItemKind4.Text = 1;
				CompletionItemKind4.Method = 2;
				CompletionItemKind4.Function = 3;
				CompletionItemKind4.Constructor = 4;
				CompletionItemKind4.Field = 5;
				CompletionItemKind4.Variable = 6;
				CompletionItemKind4.Class = 7;
				CompletionItemKind4.Interface = 8;
				CompletionItemKind4.Module = 9;
				CompletionItemKind4.Property = 10;
				CompletionItemKind4.Unit = 11;
				CompletionItemKind4.Value = 12;
				CompletionItemKind4.Enum = 13;
				CompletionItemKind4.Keyword = 14;
				CompletionItemKind4.Snippet = 15;
				CompletionItemKind4.Color = 16;
				CompletionItemKind4.File = 17;
				CompletionItemKind4.Reference = 18;
				CompletionItemKind4.Folder = 19;
				CompletionItemKind4.EnumMember = 20;
				CompletionItemKind4.Constant = 21;
				CompletionItemKind4.Struct = 22;
				CompletionItemKind4.Event = 23;
				CompletionItemKind4.Operator = 24;
				CompletionItemKind4.TypeParameter = 25;
			})(CompletionItemKind3 || (exports1.CompletionItemKind = CompletionItemKind3 = {}));
			var InsertTextFormat3;
			(function (InsertTextFormat4) {
				InsertTextFormat4.PlainText = 1;
				InsertTextFormat4.Snippet = 2;
			})(InsertTextFormat3 || (exports1.InsertTextFormat = InsertTextFormat3 = {}));
			var CompletionItemTag2;
			(function (CompletionItemTag3) {
				CompletionItemTag3.Deprecated = 1;
			})(CompletionItemTag2 || (exports1.CompletionItemTag = CompletionItemTag2 = {}));
			var InsertReplaceEdit2;
			(function (InsertReplaceEdit3) {
				function create(newText, insert, replace) {
					return {
						newText,
						insert,
						replace,
					};
				}
				__name(create, "create");
				InsertReplaceEdit3.create = create;
				function is(value) {
					var candidate = value;
					return candidate && Is2.string(candidate.newText) && Range6.is(candidate.insert) && Range6.is(candidate.replace);
				}
				__name(is, "is");
				InsertReplaceEdit3.is = is;
			})(InsertReplaceEdit2 || (exports1.InsertReplaceEdit = InsertReplaceEdit2 = {}));
			var InsertTextMode2;
			(function (InsertTextMode3) {
				InsertTextMode3.asIs = 1;
				InsertTextMode3.adjustIndentation = 2;
			})(InsertTextMode2 || (exports1.InsertTextMode = InsertTextMode2 = {}));
			var CompletionItemLabelDetails2;
			(function (CompletionItemLabelDetails3) {
				function is(value) {
					var candidate = value;
					return (
						candidate &&
						(Is2.string(candidate.detail) || candidate.detail === void 0) &&
						(Is2.string(candidate.description) || candidate.description === void 0)
					);
				}
				__name(is, "is");
				CompletionItemLabelDetails3.is = is;
			})(CompletionItemLabelDetails2 || (exports1.CompletionItemLabelDetails = CompletionItemLabelDetails2 = {}));
			var CompletionItem2;
			(function (CompletionItem3) {
				function create(label) {
					return {
						label,
					};
				}
				__name(create, "create");
				CompletionItem3.create = create;
			})(CompletionItem2 || (exports1.CompletionItem = CompletionItem2 = {}));
			var CompletionList2;
			(function (CompletionList3) {
				function create(items, isIncomplete) {
					return {
						items: items ? items : [],
						isIncomplete: !!isIncomplete,
					};
				}
				__name(create, "create");
				CompletionList3.create = create;
			})(CompletionList2 || (exports1.CompletionList = CompletionList2 = {}));
			var MarkedString2;
			(function (MarkedString3) {
				function fromPlainText(plainText) {
					return plainText.replace(/[\\`*_{}[\]()#+\-.!]/g, "\\$&");
				}
				__name(fromPlainText, "fromPlainText");
				MarkedString3.fromPlainText = fromPlainText;
				function is(value) {
					var candidate = value;
					return (
						Is2.string(candidate) ||
						(Is2.objectLiteral(candidate) && Is2.string(candidate.language) && Is2.string(candidate.value))
					);
				}
				__name(is, "is");
				MarkedString3.is = is;
			})(MarkedString2 || (exports1.MarkedString = MarkedString2 = {}));
			var Hover2;
			(function (Hover3) {
				function is(value) {
					var candidate = value;
					return (
						!!candidate &&
						Is2.objectLiteral(candidate) &&
						(MarkupContent2.is(candidate.contents) ||
							MarkedString2.is(candidate.contents) ||
							Is2.typedArray(candidate.contents, MarkedString2.is)) &&
						(value.range === void 0 || Range6.is(value.range))
					);
				}
				__name(is, "is");
				Hover3.is = is;
			})(Hover2 || (exports1.Hover = Hover2 = {}));
			var ParameterInformation2;
			(function (ParameterInformation3) {
				function create(label, documentation) {
					return documentation
						? {
								label,
								documentation,
							}
						: {
								label,
							};
				}
				__name(create, "create");
				ParameterInformation3.create = create;
			})(ParameterInformation2 || (exports1.ParameterInformation = ParameterInformation2 = {}));
			var SignatureInformation3;
			(function (SignatureInformation4) {
				function create(label, documentation) {
					var parameters = [];
					for (var _i = 2; _i < arguments.length; _i++) {
						parameters[_i - 2] = arguments[_i];
					}
					var result = {
						label,
					};
					if (Is2.defined(documentation)) {
						result.documentation = documentation;
					}
					if (Is2.defined(parameters)) {
						result.parameters = parameters;
					} else {
						result.parameters = [];
					}
					return result;
				}
				__name(create, "create");
				SignatureInformation4.create = create;
			})(SignatureInformation3 || (exports1.SignatureInformation = SignatureInformation3 = {}));
			var DocumentHighlightKind2;
			(function (DocumentHighlightKind3) {
				DocumentHighlightKind3.Text = 1;
				DocumentHighlightKind3.Read = 2;
				DocumentHighlightKind3.Write = 3;
			})(DocumentHighlightKind2 || (exports1.DocumentHighlightKind = DocumentHighlightKind2 = {}));
			var DocumentHighlight2;
			(function (DocumentHighlight3) {
				function create(range, kind) {
					var result = {
						range,
					};
					if (Is2.number(kind)) {
						result.kind = kind;
					}
					return result;
				}
				__name(create, "create");
				DocumentHighlight3.create = create;
			})(DocumentHighlight2 || (exports1.DocumentHighlight = DocumentHighlight2 = {}));
			var SymbolKind3;
			(function (SymbolKind4) {
				SymbolKind4.File = 1;
				SymbolKind4.Module = 2;
				SymbolKind4.Namespace = 3;
				SymbolKind4.Package = 4;
				SymbolKind4.Class = 5;
				SymbolKind4.Method = 6;
				SymbolKind4.Property = 7;
				SymbolKind4.Field = 8;
				SymbolKind4.Constructor = 9;
				SymbolKind4.Enum = 10;
				SymbolKind4.Interface = 11;
				SymbolKind4.Function = 12;
				SymbolKind4.Variable = 13;
				SymbolKind4.Constant = 14;
				SymbolKind4.String = 15;
				SymbolKind4.Number = 16;
				SymbolKind4.Boolean = 17;
				SymbolKind4.Array = 18;
				SymbolKind4.Object = 19;
				SymbolKind4.Key = 20;
				SymbolKind4.Null = 21;
				SymbolKind4.EnumMember = 22;
				SymbolKind4.Struct = 23;
				SymbolKind4.Event = 24;
				SymbolKind4.Operator = 25;
				SymbolKind4.TypeParameter = 26;
			})(SymbolKind3 || (exports1.SymbolKind = SymbolKind3 = {}));
			var SymbolTag2;
			(function (SymbolTag3) {
				SymbolTag3.Deprecated = 1;
			})(SymbolTag2 || (exports1.SymbolTag = SymbolTag2 = {}));
			var SymbolInformation2;
			(function (SymbolInformation3) {
				function create(name, kind, range, uri, containerName) {
					var result = {
						name,
						kind,
						location: {
							uri,
							range,
						},
					};
					if (containerName) {
						result.containerName = containerName;
					}
					return result;
				}
				__name(create, "create");
				SymbolInformation3.create = create;
			})(SymbolInformation2 || (exports1.SymbolInformation = SymbolInformation2 = {}));
			var WorkspaceSymbol2;
			(function (WorkspaceSymbol3) {
				function create(name, kind, uri, range) {
					return range !== void 0
						? {
								name,
								kind,
								location: {
									uri,
									range,
								},
							}
						: {
								name,
								kind,
								location: {
									uri,
								},
							};
				}
				__name(create, "create");
				WorkspaceSymbol3.create = create;
			})(WorkspaceSymbol2 || (exports1.WorkspaceSymbol = WorkspaceSymbol2 = {}));
			var DocumentSymbol2;
			(function (DocumentSymbol3) {
				function create(name, detail, kind, range, selectionRange, children) {
					var result = {
						name,
						detail,
						kind,
						range,
						selectionRange,
					};
					if (children !== void 0) {
						result.children = children;
					}
					return result;
				}
				__name(create, "create");
				DocumentSymbol3.create = create;
				function is(value) {
					var candidate = value;
					return (
						candidate &&
						Is2.string(candidate.name) &&
						Is2.number(candidate.kind) &&
						Range6.is(candidate.range) &&
						Range6.is(candidate.selectionRange) &&
						(candidate.detail === void 0 || Is2.string(candidate.detail)) &&
						(candidate.deprecated === void 0 || Is2.boolean(candidate.deprecated)) &&
						(candidate.children === void 0 || Array.isArray(candidate.children)) &&
						(candidate.tags === void 0 || Array.isArray(candidate.tags))
					);
				}
				__name(is, "is");
				DocumentSymbol3.is = is;
			})(DocumentSymbol2 || (exports1.DocumentSymbol = DocumentSymbol2 = {}));
			var CodeActionKind4;
			(function (CodeActionKind5) {
				CodeActionKind5.Empty = "";
				CodeActionKind5.QuickFix = "quickfix";
				CodeActionKind5.Refactor = "refactor";
				CodeActionKind5.RefactorExtract = "refactor.extract";
				CodeActionKind5.RefactorInline = "refactor.inline";
				CodeActionKind5.RefactorRewrite = "refactor.rewrite";
				CodeActionKind5.Source = "source";
				CodeActionKind5.SourceOrganizeImports = "source.organizeImports";
				CodeActionKind5.SourceFixAll = "source.fixAll";
			})(CodeActionKind4 || (exports1.CodeActionKind = CodeActionKind4 = {}));
			var CodeActionTriggerKind2;
			(function (CodeActionTriggerKind3) {
				CodeActionTriggerKind3.Invoked = 1;
				CodeActionTriggerKind3.Automatic = 2;
			})(CodeActionTriggerKind2 || (exports1.CodeActionTriggerKind = CodeActionTriggerKind2 = {}));
			var CodeActionContext2;
			(function (CodeActionContext3) {
				function create(diagnostics, only, triggerKind) {
					var result = {
						diagnostics,
					};
					if (only !== void 0 && only !== null) {
						result.only = only;
					}
					if (triggerKind !== void 0 && triggerKind !== null) {
						result.triggerKind = triggerKind;
					}
					return result;
				}
				__name(create, "create");
				CodeActionContext3.create = create;
				function is(value) {
					var candidate = value;
					return (
						Is2.defined(candidate) &&
						Is2.typedArray(candidate.diagnostics, Diagnostic2.is) &&
						(candidate.only === void 0 || Is2.typedArray(candidate.only, Is2.string)) &&
						(candidate.triggerKind === void 0 ||
							candidate.triggerKind === CodeActionTriggerKind2.Invoked ||
							candidate.triggerKind === CodeActionTriggerKind2.Automatic)
					);
				}
				__name(is, "is");
				CodeActionContext3.is = is;
			})(CodeActionContext2 || (exports1.CodeActionContext = CodeActionContext2 = {}));
			var CodeAction2;
			(function (CodeAction3) {
				function create(title, kindOrCommandOrEdit, kind) {
					var result = {
						title,
					};
					var checkKind = true;
					if (typeof kindOrCommandOrEdit === "string") {
						checkKind = false;
						result.kind = kindOrCommandOrEdit;
					} else if (Command2.is(kindOrCommandOrEdit)) {
						result.command = kindOrCommandOrEdit;
					} else {
						result.edit = kindOrCommandOrEdit;
					}
					if (checkKind && kind !== void 0) {
						result.kind = kind;
					}
					return result;
				}
				__name(create, "create");
				CodeAction3.create = create;
				function is(value) {
					var candidate = value;
					return (
						candidate &&
						Is2.string(candidate.title) &&
						(candidate.diagnostics === void 0 || Is2.typedArray(candidate.diagnostics, Diagnostic2.is)) &&
						(candidate.kind === void 0 || Is2.string(candidate.kind)) &&
						(candidate.edit !== void 0 || candidate.command !== void 0) &&
						(candidate.command === void 0 || Command2.is(candidate.command)) &&
						(candidate.isPreferred === void 0 || Is2.boolean(candidate.isPreferred)) &&
						(candidate.edit === void 0 || WorkspaceEdit2.is(candidate.edit))
					);
				}
				__name(is, "is");
				CodeAction3.is = is;
			})(CodeAction2 || (exports1.CodeAction = CodeAction2 = {}));
			var CodeLens2;
			(function (CodeLens3) {
				function create(range, data) {
					var result = {
						range,
					};
					if (Is2.defined(data)) {
						result.data = data;
					}
					return result;
				}
				__name(create, "create");
				CodeLens3.create = create;
				function is(value) {
					var candidate = value;
					return (
						Is2.defined(candidate) &&
						Range6.is(candidate.range) &&
						(Is2.undefined(candidate.command) || Command2.is(candidate.command))
					);
				}
				__name(is, "is");
				CodeLens3.is = is;
			})(CodeLens2 || (exports1.CodeLens = CodeLens2 = {}));
			var FormattingOptions2;
			(function (FormattingOptions3) {
				function create(tabSize, insertSpaces) {
					return {
						tabSize,
						insertSpaces,
					};
				}
				__name(create, "create");
				FormattingOptions3.create = create;
				function is(value) {
					var candidate = value;
					return Is2.defined(candidate) && Is2.uinteger(candidate.tabSize) && Is2.boolean(candidate.insertSpaces);
				}
				__name(is, "is");
				FormattingOptions3.is = is;
			})(FormattingOptions2 || (exports1.FormattingOptions = FormattingOptions2 = {}));
			var DocumentLink2;
			(function (DocumentLink3) {
				function create(range, target, data) {
					return {
						range,
						target,
						data,
					};
				}
				__name(create, "create");
				DocumentLink3.create = create;
				function is(value) {
					var candidate = value;
					return (
						Is2.defined(candidate) &&
						Range6.is(candidate.range) &&
						(Is2.undefined(candidate.target) || Is2.string(candidate.target))
					);
				}
				__name(is, "is");
				DocumentLink3.is = is;
			})(DocumentLink2 || (exports1.DocumentLink = DocumentLink2 = {}));
			var SelectionRange2;
			(function (SelectionRange3) {
				function create(range, parent) {
					return {
						range,
						parent,
					};
				}
				__name(create, "create");
				SelectionRange3.create = create;
				function is(value) {
					var candidate = value;
					return (
						Is2.objectLiteral(candidate) &&
						Range6.is(candidate.range) &&
						(candidate.parent === void 0 || SelectionRange3.is(candidate.parent))
					);
				}
				__name(is, "is");
				SelectionRange3.is = is;
			})(SelectionRange2 || (exports1.SelectionRange = SelectionRange2 = {}));
			var SemanticTokenTypes2;
			(function (SemanticTokenTypes3) {
				SemanticTokenTypes3["namespace"] = "namespace";
				SemanticTokenTypes3["type"] = "type";
				SemanticTokenTypes3["class"] = "class";
				SemanticTokenTypes3["enum"] = "enum";
				SemanticTokenTypes3["interface"] = "interface";
				SemanticTokenTypes3["struct"] = "struct";
				SemanticTokenTypes3["typeParameter"] = "typeParameter";
				SemanticTokenTypes3["parameter"] = "parameter";
				SemanticTokenTypes3["variable"] = "variable";
				SemanticTokenTypes3["property"] = "property";
				SemanticTokenTypes3["enumMember"] = "enumMember";
				SemanticTokenTypes3["event"] = "event";
				SemanticTokenTypes3["function"] = "function";
				SemanticTokenTypes3["method"] = "method";
				SemanticTokenTypes3["macro"] = "macro";
				SemanticTokenTypes3["keyword"] = "keyword";
				SemanticTokenTypes3["modifier"] = "modifier";
				SemanticTokenTypes3["comment"] = "comment";
				SemanticTokenTypes3["string"] = "string";
				SemanticTokenTypes3["number"] = "number";
				SemanticTokenTypes3["regexp"] = "regexp";
				SemanticTokenTypes3["operator"] = "operator";
				SemanticTokenTypes3["decorator"] = "decorator";
			})(SemanticTokenTypes2 || (exports1.SemanticTokenTypes = SemanticTokenTypes2 = {}));
			var SemanticTokenModifiers2;
			(function (SemanticTokenModifiers3) {
				SemanticTokenModifiers3["declaration"] = "declaration";
				SemanticTokenModifiers3["definition"] = "definition";
				SemanticTokenModifiers3["readonly"] = "readonly";
				SemanticTokenModifiers3["static"] = "static";
				SemanticTokenModifiers3["deprecated"] = "deprecated";
				SemanticTokenModifiers3["abstract"] = "abstract";
				SemanticTokenModifiers3["async"] = "async";
				SemanticTokenModifiers3["modification"] = "modification";
				SemanticTokenModifiers3["documentation"] = "documentation";
				SemanticTokenModifiers3["defaultLibrary"] = "defaultLibrary";
			})(SemanticTokenModifiers2 || (exports1.SemanticTokenModifiers = SemanticTokenModifiers2 = {}));
			var SemanticTokens2;
			(function (SemanticTokens3) {
				function is(value) {
					var candidate = value;
					return (
						Is2.objectLiteral(candidate) &&
						(candidate.resultId === void 0 || typeof candidate.resultId === "string") &&
						Array.isArray(candidate.data) &&
						(candidate.data.length === 0 || typeof candidate.data[0] === "number")
					);
				}
				__name(is, "is");
				SemanticTokens3.is = is;
			})(SemanticTokens2 || (exports1.SemanticTokens = SemanticTokens2 = {}));
			var InlineValueText2;
			(function (InlineValueText3) {
				function create(range, text) {
					return {
						range,
						text,
					};
				}
				__name(create, "create");
				InlineValueText3.create = create;
				function is(value) {
					var candidate = value;
					return candidate !== void 0 && candidate !== null && Range6.is(candidate.range) && Is2.string(candidate.text);
				}
				__name(is, "is");
				InlineValueText3.is = is;
			})(InlineValueText2 || (exports1.InlineValueText = InlineValueText2 = {}));
			var InlineValueVariableLookup2;
			(function (InlineValueVariableLookup3) {
				function create(range, variableName, caseSensitiveLookup) {
					return {
						range,
						variableName,
						caseSensitiveLookup,
					};
				}
				__name(create, "create");
				InlineValueVariableLookup3.create = create;
				function is(value) {
					var candidate = value;
					return (
						candidate !== void 0 &&
						candidate !== null &&
						Range6.is(candidate.range) &&
						Is2.boolean(candidate.caseSensitiveLookup) &&
						(Is2.string(candidate.variableName) || candidate.variableName === void 0)
					);
				}
				__name(is, "is");
				InlineValueVariableLookup3.is = is;
			})(InlineValueVariableLookup2 || (exports1.InlineValueVariableLookup = InlineValueVariableLookup2 = {}));
			var InlineValueEvaluatableExpression2;
			(function (InlineValueEvaluatableExpression3) {
				function create(range, expression) {
					return {
						range,
						expression,
					};
				}
				__name(create, "create");
				InlineValueEvaluatableExpression3.create = create;
				function is(value) {
					var candidate = value;
					return (
						candidate !== void 0 &&
						candidate !== null &&
						Range6.is(candidate.range) &&
						(Is2.string(candidate.expression) || candidate.expression === void 0)
					);
				}
				__name(is, "is");
				InlineValueEvaluatableExpression3.is = is;
			})(
				InlineValueEvaluatableExpression2 ||
					(exports1.InlineValueEvaluatableExpression = InlineValueEvaluatableExpression2 = {}),
			);
			var InlineValueContext2;
			(function (InlineValueContext3) {
				function create(frameId, stoppedLocation) {
					return {
						frameId,
						stoppedLocation,
					};
				}
				__name(create, "create");
				InlineValueContext3.create = create;
				function is(value) {
					var candidate = value;
					return Is2.defined(candidate) && Range6.is(value.stoppedLocation);
				}
				__name(is, "is");
				InlineValueContext3.is = is;
			})(InlineValueContext2 || (exports1.InlineValueContext = InlineValueContext2 = {}));
			var InlayHintKind2;
			(function (InlayHintKind3) {
				InlayHintKind3.Type = 1;
				InlayHintKind3.Parameter = 2;
				function is(value) {
					return value === 1 || value === 2;
				}
				__name(is, "is");
				InlayHintKind3.is = is;
			})(InlayHintKind2 || (exports1.InlayHintKind = InlayHintKind2 = {}));
			var InlayHintLabelPart2;
			(function (InlayHintLabelPart3) {
				function create(value) {
					return {
						value,
					};
				}
				__name(create, "create");
				InlayHintLabelPart3.create = create;
				function is(value) {
					var candidate = value;
					return (
						Is2.objectLiteral(candidate) &&
						(candidate.tooltip === void 0 || Is2.string(candidate.tooltip) || MarkupContent2.is(candidate.tooltip)) &&
						(candidate.location === void 0 || Location5.is(candidate.location)) &&
						(candidate.command === void 0 || Command2.is(candidate.command))
					);
				}
				__name(is, "is");
				InlayHintLabelPart3.is = is;
			})(InlayHintLabelPart2 || (exports1.InlayHintLabelPart = InlayHintLabelPart2 = {}));
			var InlayHint2;
			(function (InlayHint3) {
				function create(position, label, kind) {
					var result = {
						position,
						label,
					};
					if (kind !== void 0) {
						result.kind = kind;
					}
					return result;
				}
				__name(create, "create");
				InlayHint3.create = create;
				function is(value) {
					var candidate = value;
					return (
						(Is2.objectLiteral(candidate) &&
							Position9.is(candidate.position) &&
							(Is2.string(candidate.label) || Is2.typedArray(candidate.label, InlayHintLabelPart2.is)) &&
							(candidate.kind === void 0 || InlayHintKind2.is(candidate.kind)) &&
							candidate.textEdits === void 0) ||
						(Is2.typedArray(candidate.textEdits, TextEdit5.is) &&
							(candidate.tooltip === void 0 || Is2.string(candidate.tooltip) || MarkupContent2.is(candidate.tooltip)) &&
							(candidate.paddingLeft === void 0 || Is2.boolean(candidate.paddingLeft)) &&
							(candidate.paddingRight === void 0 || Is2.boolean(candidate.paddingRight)))
					);
				}
				__name(is, "is");
				InlayHint3.is = is;
			})(InlayHint2 || (exports1.InlayHint = InlayHint2 = {}));
			var StringValue2;
			(function (StringValue3) {
				function createSnippet(value) {
					return {
						kind: "snippet",
						value,
					};
				}
				__name(createSnippet, "createSnippet");
				StringValue3.createSnippet = createSnippet;
			})(StringValue2 || (exports1.StringValue = StringValue2 = {}));
			var InlineCompletionItem2;
			(function (InlineCompletionItem3) {
				function create(insertText, filterText, range, command) {
					return {
						insertText,
						filterText,
						range,
						command,
					};
				}
				__name(create, "create");
				InlineCompletionItem3.create = create;
			})(InlineCompletionItem2 || (exports1.InlineCompletionItem = InlineCompletionItem2 = {}));
			var InlineCompletionList2;
			(function (InlineCompletionList3) {
				function create(items) {
					return {
						items,
					};
				}
				__name(create, "create");
				InlineCompletionList3.create = create;
			})(InlineCompletionList2 || (exports1.InlineCompletionList = InlineCompletionList2 = {}));
			var InlineCompletionTriggerKind2;
			(function (InlineCompletionTriggerKind3) {
				InlineCompletionTriggerKind3.Invoked = 0;
				InlineCompletionTriggerKind3.Automatic = 1;
			})(InlineCompletionTriggerKind2 || (exports1.InlineCompletionTriggerKind = InlineCompletionTriggerKind2 = {}));
			var SelectedCompletionInfo2;
			(function (SelectedCompletionInfo3) {
				function create(range, text) {
					return {
						range,
						text,
					};
				}
				__name(create, "create");
				SelectedCompletionInfo3.create = create;
			})(SelectedCompletionInfo2 || (exports1.SelectedCompletionInfo = SelectedCompletionInfo2 = {}));
			var InlineCompletionContext2;
			(function (InlineCompletionContext3) {
				function create(triggerKind, selectedCompletionInfo) {
					return {
						triggerKind,
						selectedCompletionInfo,
					};
				}
				__name(create, "create");
				InlineCompletionContext3.create = create;
			})(InlineCompletionContext2 || (exports1.InlineCompletionContext = InlineCompletionContext2 = {}));
			var WorkspaceFolder2;
			(function (WorkspaceFolder3) {
				function is(value) {
					var candidate = value;
					return Is2.objectLiteral(candidate) && URI3.is(candidate.uri) && Is2.string(candidate.name);
				}
				__name(is, "is");
				WorkspaceFolder3.is = is;
			})(WorkspaceFolder2 || (exports1.WorkspaceFolder = WorkspaceFolder2 = {}));
			exports1.EOL = ["\n", "\r\n", "\r"];
			var TextDocument3;
			(function (TextDocument4) {
				function create(uri, languageId, version, content) {
					return new FullTextDocument5(uri, languageId, version, content);
				}
				__name(create, "create");
				TextDocument4.create = create;
				function is(value) {
					var candidate = value;
					return Is2.defined(candidate) &&
						Is2.string(candidate.uri) &&
						(Is2.undefined(candidate.languageId) || Is2.string(candidate.languageId)) &&
						Is2.uinteger(candidate.lineCount) &&
						Is2.func(candidate.getText) &&
						Is2.func(candidate.positionAt) &&
						Is2.func(candidate.offsetAt)
						? true
						: false;
				}
				__name(is, "is");
				TextDocument4.is = is;
				function applyEdits(document2, edits) {
					var text = document2.getText();
					var sortedEdits = mergeSort2(edits, function (a2, b) {
						var diff = a2.range.start.line - b.range.start.line;
						if (diff === 0) {
							return a2.range.start.character - b.range.start.character;
						}
						return diff;
					});
					var lastModifiedOffset = text.length;
					for (var i = sortedEdits.length - 1; i >= 0; i--) {
						var e = sortedEdits[i];
						var startOffset = document2.offsetAt(e.range.start);
						var endOffset = document2.offsetAt(e.range.end);
						if (endOffset <= lastModifiedOffset) {
							text = text.substring(0, startOffset) + e.newText + text.substring(endOffset, text.length);
						} else {
							throw new Error("Overlapping edit");
						}
						lastModifiedOffset = startOffset;
					}
					return text;
				}
				__name(applyEdits, "applyEdits");
				TextDocument4.applyEdits = applyEdits;
				function mergeSort2(data, compare) {
					if (data.length <= 1) {
						return data;
					}
					var p = (data.length / 2) | 0;
					var left = data.slice(0, p);
					var right = data.slice(p);
					mergeSort2(left, compare);
					mergeSort2(right, compare);
					var leftIdx = 0;
					var rightIdx = 0;
					var i = 0;
					while (leftIdx < left.length && rightIdx < right.length) {
						var ret = compare(left[leftIdx], right[rightIdx]);
						if (ret <= 0) {
							data[i++] = left[leftIdx++];
						} else {
							data[i++] = right[rightIdx++];
						}
					}
					while (leftIdx < left.length) {
						data[i++] = left[leftIdx++];
					}
					while (rightIdx < right.length) {
						data[i++] = right[rightIdx++];
					}
					return data;
				}
				__name(mergeSort2, "mergeSort");
			})(TextDocument3 || (exports1.TextDocument = TextDocument3 = {}));
			var FullTextDocument5 =
				/** @class */
				(function () {
					function FullTextDocument6(uri, languageId, version, content) {
						this._uri = uri;
						this._languageId = languageId;
						this._version = version;
						this._content = content;
						this._lineOffsets = void 0;
					}
					__name(FullTextDocument6, "FullTextDocument");
					Object.defineProperty(FullTextDocument6.prototype, "uri", {
						get: /* @__PURE__ */ __name(function () {
							return this._uri;
						}, "get"),
						enumerable: false,
						configurable: true,
					});
					Object.defineProperty(FullTextDocument6.prototype, "languageId", {
						get: /* @__PURE__ */ __name(function () {
							return this._languageId;
						}, "get"),
						enumerable: false,
						configurable: true,
					});
					Object.defineProperty(FullTextDocument6.prototype, "version", {
						get: /* @__PURE__ */ __name(function () {
							return this._version;
						}, "get"),
						enumerable: false,
						configurable: true,
					});
					FullTextDocument6.prototype.getText = function (range) {
						if (range) {
							var start = this.offsetAt(range.start);
							var end = this.offsetAt(range.end);
							return this._content.substring(start, end);
						}
						return this._content;
					};
					FullTextDocument6.prototype.update = function (event, version) {
						this._content = event.text;
						this._version = version;
						this._lineOffsets = void 0;
					};
					FullTextDocument6.prototype.getLineOffsets = function () {
						if (this._lineOffsets === void 0) {
							var lineOffsets = [];
							var text = this._content;
							var isLineStart = true;
							for (var i = 0; i < text.length; i++) {
								if (isLineStart) {
									lineOffsets.push(i);
									isLineStart = false;
								}
								var ch = text.charAt(i);
								isLineStart = ch === "\r" || ch === "\n";
								if (ch === "\r" && i + 1 < text.length && text.charAt(i + 1) === "\n") {
									i++;
								}
							}
							if (isLineStart && text.length > 0) {
								lineOffsets.push(text.length);
							}
							this._lineOffsets = lineOffsets;
						}
						return this._lineOffsets;
					};
					FullTextDocument6.prototype.positionAt = function (offset) {
						offset = Math.max(Math.min(offset, this._content.length), 0);
						var lineOffsets = this.getLineOffsets();
						var low = 0,
							high = lineOffsets.length;
						if (high === 0) {
							return Position9.create(0, offset);
						}
						while (low < high) {
							var mid = Math.floor((low + high) / 2);
							if (lineOffsets[mid] > offset) {
								high = mid;
							} else {
								low = mid + 1;
							}
						}
						var line = low - 1;
						return Position9.create(line, offset - lineOffsets[line]);
					};
					FullTextDocument6.prototype.offsetAt = function (position) {
						var lineOffsets = this.getLineOffsets();
						if (position.line >= lineOffsets.length) {
							return this._content.length;
						} else if (position.line < 0) {
							return 0;
						}
						var lineOffset = lineOffsets[position.line];
						var nextLineOffset =
							position.line + 1 < lineOffsets.length ? lineOffsets[position.line + 1] : this._content.length;
						return Math.max(Math.min(lineOffset + position.character, nextLineOffset), lineOffset);
					};
					Object.defineProperty(FullTextDocument6.prototype, "lineCount", {
						get: /* @__PURE__ */ __name(function () {
							return this.getLineOffsets().length;
						}, "get"),
						enumerable: false,
						configurable: true,
					});
					return FullTextDocument6;
				})();
			var Is2;
			(function (Is3) {
				var toString = Object.prototype.toString;
				function defined(value) {
					return typeof value !== "undefined";
				}
				__name(defined, "defined");
				Is3.defined = defined;
				function undefined1(value) {
					return typeof value === "undefined";
				}
				__name(undefined1, "undefined1");
				Is3.undefined = undefined1;
				function boolean(value) {
					return value === true || value === false;
				}
				__name(boolean, "boolean");
				Is3.boolean = boolean;
				function string(value) {
					return toString.call(value) === "[object String]";
				}
				__name(string, "string");
				Is3.string = string;
				function number(value) {
					return toString.call(value) === "[object Number]";
				}
				__name(number, "number");
				Is3.number = number;
				function numberRange(value, min, max) {
					return toString.call(value) === "[object Number]" && min <= value && value <= max;
				}
				__name(numberRange, "numberRange");
				Is3.numberRange = numberRange;
				function integer3(value) {
					return toString.call(value) === "[object Number]" && -2147483648 <= value && value <= 2147483647;
				}
				__name(integer3, "integer");
				Is3.integer = integer3;
				function uinteger3(value) {
					return toString.call(value) === "[object Number]" && 0 <= value && value <= 2147483647;
				}
				__name(uinteger3, "uinteger");
				Is3.uinteger = uinteger3;
				function func(value) {
					return toString.call(value) === "[object Function]";
				}
				__name(func, "func");
				Is3.func = func;
				function objectLiteral(value) {
					return value !== null && typeof value === "object";
				}
				__name(objectLiteral, "objectLiteral");
				Is3.objectLiteral = objectLiteral;
				function typedArray(value, check) {
					return Array.isArray(value) && value.every(check);
				}
				__name(typedArray, "typedArray");
				Is3.typedArray = typedArray;
			})(Is2 || (Is2 = {}));
		});
	},
});

// ../../../node_modules/.pnpm/vscode-languageserver-protocol@3.17.5/node_modules/vscode-languageserver-protocol/lib/common/messages.js
var require_messages2 = __commonJS({
	"../../../node_modules/.pnpm/vscode-languageserver-protocol@3.17.5/node_modules/vscode-languageserver-protocol/lib/common/messages.js"(
		exports2,
	) {
		"use strict";
		init_cjs_shims();
		Object.defineProperty(exports2, "__esModule", {
			value: true,
		});
		exports2.ProtocolNotificationType =
			exports2.ProtocolNotificationType0 =
			exports2.ProtocolRequestType =
			exports2.ProtocolRequestType0 =
			exports2.RegistrationType =
			exports2.MessageDirection =
				void 0;
		var vscode_jsonrpc_1 = require_main();
		var MessageDirection;
		(function (MessageDirection2) {
			MessageDirection2["clientToServer"] = "clientToServer";
			MessageDirection2["serverToClient"] = "serverToClient";
			MessageDirection2["both"] = "both";
		})(MessageDirection || (exports2.MessageDirection = MessageDirection = {}));
		var RegistrationType = class RegistrationType {
			static {
				__name(this, "RegistrationType");
			}
			constructor(method) {
				this.method = method;
			}
		};
		exports2.RegistrationType = RegistrationType;
		var ProtocolRequestType0 = class ProtocolRequestType0 extends vscode_jsonrpc_1.RequestType0 {
			static {
				__name(this, "ProtocolRequestType0");
			}
			constructor(method) {
				super(method);
			}
		};
		exports2.ProtocolRequestType0 = ProtocolRequestType0;
		var ProtocolRequestType = class ProtocolRequestType extends vscode_jsonrpc_1.RequestType {
			static {
				__name(this, "ProtocolRequestType");
			}
			constructor(method) {
				super(method, vscode_jsonrpc_1.ParameterStructures.byName);
			}
		};
		exports2.ProtocolRequestType = ProtocolRequestType;
		var ProtocolNotificationType0 = class ProtocolNotificationType0 extends vscode_jsonrpc_1.NotificationType0 {
			static {
				__name(this, "ProtocolNotificationType0");
			}
			constructor(method) {
				super(method);
			}
		};
		exports2.ProtocolNotificationType0 = ProtocolNotificationType0;
		var ProtocolNotificationType = class ProtocolNotificationType extends vscode_jsonrpc_1.NotificationType {
			static {
				__name(this, "ProtocolNotificationType");
			}
			constructor(method) {
				super(method, vscode_jsonrpc_1.ParameterStructures.byName);
			}
		};
		exports2.ProtocolNotificationType = ProtocolNotificationType;
	},
});

// ../../../node_modules/.pnpm/vscode-languageserver-protocol@3.17.5/node_modules/vscode-languageserver-protocol/lib/common/utils/is.js
var require_is3 = __commonJS({
	"../../../node_modules/.pnpm/vscode-languageserver-protocol@3.17.5/node_modules/vscode-languageserver-protocol/lib/common/utils/is.js"(
		exports2,
	) {
		"use strict";
		init_cjs_shims();
		Object.defineProperty(exports2, "__esModule", {
			value: true,
		});
		exports2.objectLiteral =
			exports2.typedArray =
			exports2.stringArray =
			exports2.array =
			exports2.func =
			exports2.error =
			exports2.number =
			exports2.string =
			exports2.boolean =
				void 0;
		function boolean(value) {
			return value === true || value === false;
		}
		__name(boolean, "boolean");
		exports2.boolean = boolean;
		function string(value) {
			return typeof value === "string" || value instanceof String;
		}
		__name(string, "string");
		exports2.string = string;
		function number(value) {
			return typeof value === "number" || value instanceof Number;
		}
		__name(number, "number");
		exports2.number = number;
		function error(value) {
			return value instanceof Error;
		}
		__name(error, "error");
		exports2.error = error;
		function func(value) {
			return typeof value === "function";
		}
		__name(func, "func");
		exports2.func = func;
		function array(value) {
			return Array.isArray(value);
		}
		__name(array, "array");
		exports2.array = array;
		function stringArray(value) {
			return array(value) && value.every((elem) => string(elem));
		}
		__name(stringArray, "stringArray");
		exports2.stringArray = stringArray;
		function typedArray(value, check) {
			return Array.isArray(value) && value.every(check);
		}
		__name(typedArray, "typedArray");
		exports2.typedArray = typedArray;
		function objectLiteral(value) {
			return value !== null && typeof value === "object";
		}
		__name(objectLiteral, "objectLiteral");
		exports2.objectLiteral = objectLiteral;
	},
});

// ../../../node_modules/.pnpm/vscode-languageserver-protocol@3.17.5/node_modules/vscode-languageserver-protocol/lib/common/protocol.implementation.js
var require_protocol_implementation = __commonJS({
	"../../../node_modules/.pnpm/vscode-languageserver-protocol@3.17.5/node_modules/vscode-languageserver-protocol/lib/common/protocol.implementation.js"(
		exports2,
	) {
		"use strict";
		init_cjs_shims();
		Object.defineProperty(exports2, "__esModule", {
			value: true,
		});
		exports2.ImplementationRequest = void 0;
		var messages_1 = require_messages2();
		var ImplementationRequest;
		(function (ImplementationRequest2) {
			ImplementationRequest2.method = "textDocument/implementation";
			ImplementationRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
			ImplementationRequest2.type = new messages_1.ProtocolRequestType(ImplementationRequest2.method);
		})(ImplementationRequest || (exports2.ImplementationRequest = ImplementationRequest = {}));
	},
});

// ../../../node_modules/.pnpm/vscode-languageserver-protocol@3.17.5/node_modules/vscode-languageserver-protocol/lib/common/protocol.typeDefinition.js
var require_protocol_typeDefinition = __commonJS({
	"../../../node_modules/.pnpm/vscode-languageserver-protocol@3.17.5/node_modules/vscode-languageserver-protocol/lib/common/protocol.typeDefinition.js"(
		exports2,
	) {
		"use strict";
		init_cjs_shims();
		Object.defineProperty(exports2, "__esModule", {
			value: true,
		});
		exports2.TypeDefinitionRequest = void 0;
		var messages_1 = require_messages2();
		var TypeDefinitionRequest;
		(function (TypeDefinitionRequest2) {
			TypeDefinitionRequest2.method = "textDocument/typeDefinition";
			TypeDefinitionRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
			TypeDefinitionRequest2.type = new messages_1.ProtocolRequestType(TypeDefinitionRequest2.method);
		})(TypeDefinitionRequest || (exports2.TypeDefinitionRequest = TypeDefinitionRequest = {}));
	},
});

// ../../../node_modules/.pnpm/vscode-languageserver-protocol@3.17.5/node_modules/vscode-languageserver-protocol/lib/common/protocol.workspaceFolder.js
var require_protocol_workspaceFolder = __commonJS({
	"../../../node_modules/.pnpm/vscode-languageserver-protocol@3.17.5/node_modules/vscode-languageserver-protocol/lib/common/protocol.workspaceFolder.js"(
		exports2,
	) {
		"use strict";
		init_cjs_shims();
		Object.defineProperty(exports2, "__esModule", {
			value: true,
		});
		exports2.DidChangeWorkspaceFoldersNotification = exports2.WorkspaceFoldersRequest = void 0;
		var messages_1 = require_messages2();
		var WorkspaceFoldersRequest;
		(function (WorkspaceFoldersRequest2) {
			WorkspaceFoldersRequest2.method = "workspace/workspaceFolders";
			WorkspaceFoldersRequest2.messageDirection = messages_1.MessageDirection.serverToClient;
			WorkspaceFoldersRequest2.type = new messages_1.ProtocolRequestType0(WorkspaceFoldersRequest2.method);
		})(WorkspaceFoldersRequest || (exports2.WorkspaceFoldersRequest = WorkspaceFoldersRequest = {}));
		var DidChangeWorkspaceFoldersNotification;
		(function (DidChangeWorkspaceFoldersNotification2) {
			DidChangeWorkspaceFoldersNotification2.method = "workspace/didChangeWorkspaceFolders";
			DidChangeWorkspaceFoldersNotification2.messageDirection = messages_1.MessageDirection.clientToServer;
			DidChangeWorkspaceFoldersNotification2.type = new messages_1.ProtocolNotificationType(
				DidChangeWorkspaceFoldersNotification2.method,
			);
		})(
			DidChangeWorkspaceFoldersNotification ||
				(exports2.DidChangeWorkspaceFoldersNotification = DidChangeWorkspaceFoldersNotification = {}),
		);
	},
});

// ../../../node_modules/.pnpm/vscode-languageserver-protocol@3.17.5/node_modules/vscode-languageserver-protocol/lib/common/protocol.configuration.js
var require_protocol_configuration = __commonJS({
	"../../../node_modules/.pnpm/vscode-languageserver-protocol@3.17.5/node_modules/vscode-languageserver-protocol/lib/common/protocol.configuration.js"(
		exports2,
	) {
		"use strict";
		init_cjs_shims();
		Object.defineProperty(exports2, "__esModule", {
			value: true,
		});
		exports2.ConfigurationRequest = void 0;
		var messages_1 = require_messages2();
		var ConfigurationRequest;
		(function (ConfigurationRequest2) {
			ConfigurationRequest2.method = "workspace/configuration";
			ConfigurationRequest2.messageDirection = messages_1.MessageDirection.serverToClient;
			ConfigurationRequest2.type = new messages_1.ProtocolRequestType(ConfigurationRequest2.method);
		})(ConfigurationRequest || (exports2.ConfigurationRequest = ConfigurationRequest = {}));
	},
});

// ../../../node_modules/.pnpm/vscode-languageserver-protocol@3.17.5/node_modules/vscode-languageserver-protocol/lib/common/protocol.colorProvider.js
var require_protocol_colorProvider = __commonJS({
	"../../../node_modules/.pnpm/vscode-languageserver-protocol@3.17.5/node_modules/vscode-languageserver-protocol/lib/common/protocol.colorProvider.js"(
		exports2,
	) {
		"use strict";
		init_cjs_shims();
		Object.defineProperty(exports2, "__esModule", {
			value: true,
		});
		exports2.ColorPresentationRequest = exports2.DocumentColorRequest = void 0;
		var messages_1 = require_messages2();
		var DocumentColorRequest;
		(function (DocumentColorRequest2) {
			DocumentColorRequest2.method = "textDocument/documentColor";
			DocumentColorRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
			DocumentColorRequest2.type = new messages_1.ProtocolRequestType(DocumentColorRequest2.method);
		})(DocumentColorRequest || (exports2.DocumentColorRequest = DocumentColorRequest = {}));
		var ColorPresentationRequest;
		(function (ColorPresentationRequest2) {
			ColorPresentationRequest2.method = "textDocument/colorPresentation";
			ColorPresentationRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
			ColorPresentationRequest2.type = new messages_1.ProtocolRequestType(ColorPresentationRequest2.method);
		})(ColorPresentationRequest || (exports2.ColorPresentationRequest = ColorPresentationRequest = {}));
	},
});

// ../../../node_modules/.pnpm/vscode-languageserver-protocol@3.17.5/node_modules/vscode-languageserver-protocol/lib/common/protocol.foldingRange.js
var require_protocol_foldingRange = __commonJS({
	"../../../node_modules/.pnpm/vscode-languageserver-protocol@3.17.5/node_modules/vscode-languageserver-protocol/lib/common/protocol.foldingRange.js"(
		exports2,
	) {
		"use strict";
		init_cjs_shims();
		Object.defineProperty(exports2, "__esModule", {
			value: true,
		});
		exports2.FoldingRangeRefreshRequest = exports2.FoldingRangeRequest = void 0;
		var messages_1 = require_messages2();
		var FoldingRangeRequest;
		(function (FoldingRangeRequest2) {
			FoldingRangeRequest2.method = "textDocument/foldingRange";
			FoldingRangeRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
			FoldingRangeRequest2.type = new messages_1.ProtocolRequestType(FoldingRangeRequest2.method);
		})(FoldingRangeRequest || (exports2.FoldingRangeRequest = FoldingRangeRequest = {}));
		var FoldingRangeRefreshRequest;
		(function (FoldingRangeRefreshRequest2) {
			FoldingRangeRefreshRequest2.method = `workspace/foldingRange/refresh`;
			FoldingRangeRefreshRequest2.messageDirection = messages_1.MessageDirection.serverToClient;
			FoldingRangeRefreshRequest2.type = new messages_1.ProtocolRequestType0(FoldingRangeRefreshRequest2.method);
		})(FoldingRangeRefreshRequest || (exports2.FoldingRangeRefreshRequest = FoldingRangeRefreshRequest = {}));
	},
});

// ../../../node_modules/.pnpm/vscode-languageserver-protocol@3.17.5/node_modules/vscode-languageserver-protocol/lib/common/protocol.declaration.js
var require_protocol_declaration = __commonJS({
	"../../../node_modules/.pnpm/vscode-languageserver-protocol@3.17.5/node_modules/vscode-languageserver-protocol/lib/common/protocol.declaration.js"(
		exports2,
	) {
		"use strict";
		init_cjs_shims();
		Object.defineProperty(exports2, "__esModule", {
			value: true,
		});
		exports2.DeclarationRequest = void 0;
		var messages_1 = require_messages2();
		var DeclarationRequest;
		(function (DeclarationRequest2) {
			DeclarationRequest2.method = "textDocument/declaration";
			DeclarationRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
			DeclarationRequest2.type = new messages_1.ProtocolRequestType(DeclarationRequest2.method);
		})(DeclarationRequest || (exports2.DeclarationRequest = DeclarationRequest = {}));
	},
});

// ../../../node_modules/.pnpm/vscode-languageserver-protocol@3.17.5/node_modules/vscode-languageserver-protocol/lib/common/protocol.selectionRange.js
var require_protocol_selectionRange = __commonJS({
	"../../../node_modules/.pnpm/vscode-languageserver-protocol@3.17.5/node_modules/vscode-languageserver-protocol/lib/common/protocol.selectionRange.js"(
		exports2,
	) {
		"use strict";
		init_cjs_shims();
		Object.defineProperty(exports2, "__esModule", {
			value: true,
		});
		exports2.SelectionRangeRequest = void 0;
		var messages_1 = require_messages2();
		var SelectionRangeRequest;
		(function (SelectionRangeRequest2) {
			SelectionRangeRequest2.method = "textDocument/selectionRange";
			SelectionRangeRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
			SelectionRangeRequest2.type = new messages_1.ProtocolRequestType(SelectionRangeRequest2.method);
		})(SelectionRangeRequest || (exports2.SelectionRangeRequest = SelectionRangeRequest = {}));
	},
});

// ../../../node_modules/.pnpm/vscode-languageserver-protocol@3.17.5/node_modules/vscode-languageserver-protocol/lib/common/protocol.progress.js
var require_protocol_progress = __commonJS({
	"../../../node_modules/.pnpm/vscode-languageserver-protocol@3.17.5/node_modules/vscode-languageserver-protocol/lib/common/protocol.progress.js"(
		exports2,
	) {
		"use strict";
		init_cjs_shims();
		Object.defineProperty(exports2, "__esModule", {
			value: true,
		});
		exports2.WorkDoneProgressCancelNotification =
			exports2.WorkDoneProgressCreateRequest =
			exports2.WorkDoneProgress =
				void 0;
		var vscode_jsonrpc_1 = require_main();
		var messages_1 = require_messages2();
		var WorkDoneProgress;
		(function (WorkDoneProgress2) {
			WorkDoneProgress2.type = new vscode_jsonrpc_1.ProgressType();
			function is(value) {
				return value === WorkDoneProgress2.type;
			}
			__name(is, "is");
			WorkDoneProgress2.is = is;
		})(WorkDoneProgress || (exports2.WorkDoneProgress = WorkDoneProgress = {}));
		var WorkDoneProgressCreateRequest;
		(function (WorkDoneProgressCreateRequest2) {
			WorkDoneProgressCreateRequest2.method = "window/workDoneProgress/create";
			WorkDoneProgressCreateRequest2.messageDirection = messages_1.MessageDirection.serverToClient;
			WorkDoneProgressCreateRequest2.type = new messages_1.ProtocolRequestType(WorkDoneProgressCreateRequest2.method);
		})(WorkDoneProgressCreateRequest || (exports2.WorkDoneProgressCreateRequest = WorkDoneProgressCreateRequest = {}));
		var WorkDoneProgressCancelNotification;
		(function (WorkDoneProgressCancelNotification2) {
			WorkDoneProgressCancelNotification2.method = "window/workDoneProgress/cancel";
			WorkDoneProgressCancelNotification2.messageDirection = messages_1.MessageDirection.clientToServer;
			WorkDoneProgressCancelNotification2.type = new messages_1.ProtocolNotificationType(
				WorkDoneProgressCancelNotification2.method,
			);
		})(
			WorkDoneProgressCancelNotification ||
				(exports2.WorkDoneProgressCancelNotification = WorkDoneProgressCancelNotification = {}),
		);
	},
});

// ../../../node_modules/.pnpm/vscode-languageserver-protocol@3.17.5/node_modules/vscode-languageserver-protocol/lib/common/protocol.callHierarchy.js
var require_protocol_callHierarchy = __commonJS({
	"../../../node_modules/.pnpm/vscode-languageserver-protocol@3.17.5/node_modules/vscode-languageserver-protocol/lib/common/protocol.callHierarchy.js"(
		exports2,
	) {
		"use strict";
		init_cjs_shims();
		Object.defineProperty(exports2, "__esModule", {
			value: true,
		});
		exports2.CallHierarchyOutgoingCallsRequest =
			exports2.CallHierarchyIncomingCallsRequest =
			exports2.CallHierarchyPrepareRequest =
				void 0;
		var messages_1 = require_messages2();
		var CallHierarchyPrepareRequest;
		(function (CallHierarchyPrepareRequest2) {
			CallHierarchyPrepareRequest2.method = "textDocument/prepareCallHierarchy";
			CallHierarchyPrepareRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
			CallHierarchyPrepareRequest2.type = new messages_1.ProtocolRequestType(CallHierarchyPrepareRequest2.method);
		})(CallHierarchyPrepareRequest || (exports2.CallHierarchyPrepareRequest = CallHierarchyPrepareRequest = {}));
		var CallHierarchyIncomingCallsRequest;
		(function (CallHierarchyIncomingCallsRequest2) {
			CallHierarchyIncomingCallsRequest2.method = "callHierarchy/incomingCalls";
			CallHierarchyIncomingCallsRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
			CallHierarchyIncomingCallsRequest2.type = new messages_1.ProtocolRequestType(
				CallHierarchyIncomingCallsRequest2.method,
			);
		})(
			CallHierarchyIncomingCallsRequest ||
				(exports2.CallHierarchyIncomingCallsRequest = CallHierarchyIncomingCallsRequest = {}),
		);
		var CallHierarchyOutgoingCallsRequest;
		(function (CallHierarchyOutgoingCallsRequest2) {
			CallHierarchyOutgoingCallsRequest2.method = "callHierarchy/outgoingCalls";
			CallHierarchyOutgoingCallsRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
			CallHierarchyOutgoingCallsRequest2.type = new messages_1.ProtocolRequestType(
				CallHierarchyOutgoingCallsRequest2.method,
			);
		})(
			CallHierarchyOutgoingCallsRequest ||
				(exports2.CallHierarchyOutgoingCallsRequest = CallHierarchyOutgoingCallsRequest = {}),
		);
	},
});

// ../../../node_modules/.pnpm/vscode-languageserver-protocol@3.17.5/node_modules/vscode-languageserver-protocol/lib/common/protocol.semanticTokens.js
var require_protocol_semanticTokens = __commonJS({
	"../../../node_modules/.pnpm/vscode-languageserver-protocol@3.17.5/node_modules/vscode-languageserver-protocol/lib/common/protocol.semanticTokens.js"(
		exports2,
	) {
		"use strict";
		init_cjs_shims();
		Object.defineProperty(exports2, "__esModule", {
			value: true,
		});
		exports2.SemanticTokensRefreshRequest =
			exports2.SemanticTokensRangeRequest =
			exports2.SemanticTokensDeltaRequest =
			exports2.SemanticTokensRequest =
			exports2.SemanticTokensRegistrationType =
			exports2.TokenFormat =
				void 0;
		var messages_1 = require_messages2();
		var TokenFormat;
		(function (TokenFormat2) {
			TokenFormat2.Relative = "relative";
		})(TokenFormat || (exports2.TokenFormat = TokenFormat = {}));
		var SemanticTokensRegistrationType;
		(function (SemanticTokensRegistrationType2) {
			SemanticTokensRegistrationType2.method = "textDocument/semanticTokens";
			SemanticTokensRegistrationType2.type = new messages_1.RegistrationType(SemanticTokensRegistrationType2.method);
		})(SemanticTokensRegistrationType || (exports2.SemanticTokensRegistrationType = SemanticTokensRegistrationType = {}));
		var SemanticTokensRequest;
		(function (SemanticTokensRequest2) {
			SemanticTokensRequest2.method = "textDocument/semanticTokens/full";
			SemanticTokensRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
			SemanticTokensRequest2.type = new messages_1.ProtocolRequestType(SemanticTokensRequest2.method);
			SemanticTokensRequest2.registrationMethod = SemanticTokensRegistrationType.method;
		})(SemanticTokensRequest || (exports2.SemanticTokensRequest = SemanticTokensRequest = {}));
		var SemanticTokensDeltaRequest;
		(function (SemanticTokensDeltaRequest2) {
			SemanticTokensDeltaRequest2.method = "textDocument/semanticTokens/full/delta";
			SemanticTokensDeltaRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
			SemanticTokensDeltaRequest2.type = new messages_1.ProtocolRequestType(SemanticTokensDeltaRequest2.method);
			SemanticTokensDeltaRequest2.registrationMethod = SemanticTokensRegistrationType.method;
		})(SemanticTokensDeltaRequest || (exports2.SemanticTokensDeltaRequest = SemanticTokensDeltaRequest = {}));
		var SemanticTokensRangeRequest;
		(function (SemanticTokensRangeRequest2) {
			SemanticTokensRangeRequest2.method = "textDocument/semanticTokens/range";
			SemanticTokensRangeRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
			SemanticTokensRangeRequest2.type = new messages_1.ProtocolRequestType(SemanticTokensRangeRequest2.method);
			SemanticTokensRangeRequest2.registrationMethod = SemanticTokensRegistrationType.method;
		})(SemanticTokensRangeRequest || (exports2.SemanticTokensRangeRequest = SemanticTokensRangeRequest = {}));
		var SemanticTokensRefreshRequest;
		(function (SemanticTokensRefreshRequest2) {
			SemanticTokensRefreshRequest2.method = `workspace/semanticTokens/refresh`;
			SemanticTokensRefreshRequest2.messageDirection = messages_1.MessageDirection.serverToClient;
			SemanticTokensRefreshRequest2.type = new messages_1.ProtocolRequestType0(SemanticTokensRefreshRequest2.method);
		})(SemanticTokensRefreshRequest || (exports2.SemanticTokensRefreshRequest = SemanticTokensRefreshRequest = {}));
	},
});

// ../../../node_modules/.pnpm/vscode-languageserver-protocol@3.17.5/node_modules/vscode-languageserver-protocol/lib/common/protocol.showDocument.js
var require_protocol_showDocument = __commonJS({
	"../../../node_modules/.pnpm/vscode-languageserver-protocol@3.17.5/node_modules/vscode-languageserver-protocol/lib/common/protocol.showDocument.js"(
		exports2,
	) {
		"use strict";
		init_cjs_shims();
		Object.defineProperty(exports2, "__esModule", {
			value: true,
		});
		exports2.ShowDocumentRequest = void 0;
		var messages_1 = require_messages2();
		var ShowDocumentRequest;
		(function (ShowDocumentRequest2) {
			ShowDocumentRequest2.method = "window/showDocument";
			ShowDocumentRequest2.messageDirection = messages_1.MessageDirection.serverToClient;
			ShowDocumentRequest2.type = new messages_1.ProtocolRequestType(ShowDocumentRequest2.method);
		})(ShowDocumentRequest || (exports2.ShowDocumentRequest = ShowDocumentRequest = {}));
	},
});

// ../../../node_modules/.pnpm/vscode-languageserver-protocol@3.17.5/node_modules/vscode-languageserver-protocol/lib/common/protocol.linkedEditingRange.js
var require_protocol_linkedEditingRange = __commonJS({
	"../../../node_modules/.pnpm/vscode-languageserver-protocol@3.17.5/node_modules/vscode-languageserver-protocol/lib/common/protocol.linkedEditingRange.js"(
		exports2,
	) {
		"use strict";
		init_cjs_shims();
		Object.defineProperty(exports2, "__esModule", {
			value: true,
		});
		exports2.LinkedEditingRangeRequest = void 0;
		var messages_1 = require_messages2();
		var LinkedEditingRangeRequest;
		(function (LinkedEditingRangeRequest2) {
			LinkedEditingRangeRequest2.method = "textDocument/linkedEditingRange";
			LinkedEditingRangeRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
			LinkedEditingRangeRequest2.type = new messages_1.ProtocolRequestType(LinkedEditingRangeRequest2.method);
		})(LinkedEditingRangeRequest || (exports2.LinkedEditingRangeRequest = LinkedEditingRangeRequest = {}));
	},
});

// ../../../node_modules/.pnpm/vscode-languageserver-protocol@3.17.5/node_modules/vscode-languageserver-protocol/lib/common/protocol.fileOperations.js
var require_protocol_fileOperations = __commonJS({
	"../../../node_modules/.pnpm/vscode-languageserver-protocol@3.17.5/node_modules/vscode-languageserver-protocol/lib/common/protocol.fileOperations.js"(
		exports2,
	) {
		"use strict";
		init_cjs_shims();
		Object.defineProperty(exports2, "__esModule", {
			value: true,
		});
		exports2.WillDeleteFilesRequest =
			exports2.DidDeleteFilesNotification =
			exports2.DidRenameFilesNotification =
			exports2.WillRenameFilesRequest =
			exports2.DidCreateFilesNotification =
			exports2.WillCreateFilesRequest =
			exports2.FileOperationPatternKind =
				void 0;
		var messages_1 = require_messages2();
		var FileOperationPatternKind;
		(function (FileOperationPatternKind2) {
			FileOperationPatternKind2.file = "file";
			FileOperationPatternKind2.folder = "folder";
		})(FileOperationPatternKind || (exports2.FileOperationPatternKind = FileOperationPatternKind = {}));
		var WillCreateFilesRequest;
		(function (WillCreateFilesRequest2) {
			WillCreateFilesRequest2.method = "workspace/willCreateFiles";
			WillCreateFilesRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
			WillCreateFilesRequest2.type = new messages_1.ProtocolRequestType(WillCreateFilesRequest2.method);
		})(WillCreateFilesRequest || (exports2.WillCreateFilesRequest = WillCreateFilesRequest = {}));
		var DidCreateFilesNotification;
		(function (DidCreateFilesNotification2) {
			DidCreateFilesNotification2.method = "workspace/didCreateFiles";
			DidCreateFilesNotification2.messageDirection = messages_1.MessageDirection.clientToServer;
			DidCreateFilesNotification2.type = new messages_1.ProtocolNotificationType(DidCreateFilesNotification2.method);
		})(DidCreateFilesNotification || (exports2.DidCreateFilesNotification = DidCreateFilesNotification = {}));
		var WillRenameFilesRequest;
		(function (WillRenameFilesRequest2) {
			WillRenameFilesRequest2.method = "workspace/willRenameFiles";
			WillRenameFilesRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
			WillRenameFilesRequest2.type = new messages_1.ProtocolRequestType(WillRenameFilesRequest2.method);
		})(WillRenameFilesRequest || (exports2.WillRenameFilesRequest = WillRenameFilesRequest = {}));
		var DidRenameFilesNotification;
		(function (DidRenameFilesNotification2) {
			DidRenameFilesNotification2.method = "workspace/didRenameFiles";
			DidRenameFilesNotification2.messageDirection = messages_1.MessageDirection.clientToServer;
			DidRenameFilesNotification2.type = new messages_1.ProtocolNotificationType(DidRenameFilesNotification2.method);
		})(DidRenameFilesNotification || (exports2.DidRenameFilesNotification = DidRenameFilesNotification = {}));
		var DidDeleteFilesNotification;
		(function (DidDeleteFilesNotification2) {
			DidDeleteFilesNotification2.method = "workspace/didDeleteFiles";
			DidDeleteFilesNotification2.messageDirection = messages_1.MessageDirection.clientToServer;
			DidDeleteFilesNotification2.type = new messages_1.ProtocolNotificationType(DidDeleteFilesNotification2.method);
		})(DidDeleteFilesNotification || (exports2.DidDeleteFilesNotification = DidDeleteFilesNotification = {}));
		var WillDeleteFilesRequest;
		(function (WillDeleteFilesRequest2) {
			WillDeleteFilesRequest2.method = "workspace/willDeleteFiles";
			WillDeleteFilesRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
			WillDeleteFilesRequest2.type = new messages_1.ProtocolRequestType(WillDeleteFilesRequest2.method);
		})(WillDeleteFilesRequest || (exports2.WillDeleteFilesRequest = WillDeleteFilesRequest = {}));
	},
});

// ../../../node_modules/.pnpm/vscode-languageserver-protocol@3.17.5/node_modules/vscode-languageserver-protocol/lib/common/protocol.moniker.js
var require_protocol_moniker = __commonJS({
	"../../../node_modules/.pnpm/vscode-languageserver-protocol@3.17.5/node_modules/vscode-languageserver-protocol/lib/common/protocol.moniker.js"(
		exports2,
	) {
		"use strict";
		init_cjs_shims();
		Object.defineProperty(exports2, "__esModule", {
			value: true,
		});
		exports2.MonikerRequest = exports2.MonikerKind = exports2.UniquenessLevel = void 0;
		var messages_1 = require_messages2();
		var UniquenessLevel;
		(function (UniquenessLevel2) {
			UniquenessLevel2.document = "document";
			UniquenessLevel2.project = "project";
			UniquenessLevel2.group = "group";
			UniquenessLevel2.scheme = "scheme";
			UniquenessLevel2.global = "global";
		})(UniquenessLevel || (exports2.UniquenessLevel = UniquenessLevel = {}));
		var MonikerKind;
		(function (MonikerKind2) {
			MonikerKind2.$import = "import";
			MonikerKind2.$export = "export";
			MonikerKind2.local = "local";
		})(MonikerKind || (exports2.MonikerKind = MonikerKind = {}));
		var MonikerRequest;
		(function (MonikerRequest2) {
			MonikerRequest2.method = "textDocument/moniker";
			MonikerRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
			MonikerRequest2.type = new messages_1.ProtocolRequestType(MonikerRequest2.method);
		})(MonikerRequest || (exports2.MonikerRequest = MonikerRequest = {}));
	},
});

// ../../../node_modules/.pnpm/vscode-languageserver-protocol@3.17.5/node_modules/vscode-languageserver-protocol/lib/common/protocol.typeHierarchy.js
var require_protocol_typeHierarchy = __commonJS({
	"../../../node_modules/.pnpm/vscode-languageserver-protocol@3.17.5/node_modules/vscode-languageserver-protocol/lib/common/protocol.typeHierarchy.js"(
		exports2,
	) {
		"use strict";
		init_cjs_shims();
		Object.defineProperty(exports2, "__esModule", {
			value: true,
		});
		exports2.TypeHierarchySubtypesRequest =
			exports2.TypeHierarchySupertypesRequest =
			exports2.TypeHierarchyPrepareRequest =
				void 0;
		var messages_1 = require_messages2();
		var TypeHierarchyPrepareRequest;
		(function (TypeHierarchyPrepareRequest2) {
			TypeHierarchyPrepareRequest2.method = "textDocument/prepareTypeHierarchy";
			TypeHierarchyPrepareRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
			TypeHierarchyPrepareRequest2.type = new messages_1.ProtocolRequestType(TypeHierarchyPrepareRequest2.method);
		})(TypeHierarchyPrepareRequest || (exports2.TypeHierarchyPrepareRequest = TypeHierarchyPrepareRequest = {}));
		var TypeHierarchySupertypesRequest;
		(function (TypeHierarchySupertypesRequest2) {
			TypeHierarchySupertypesRequest2.method = "typeHierarchy/supertypes";
			TypeHierarchySupertypesRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
			TypeHierarchySupertypesRequest2.type = new messages_1.ProtocolRequestType(TypeHierarchySupertypesRequest2.method);
		})(TypeHierarchySupertypesRequest || (exports2.TypeHierarchySupertypesRequest = TypeHierarchySupertypesRequest = {}));
		var TypeHierarchySubtypesRequest;
		(function (TypeHierarchySubtypesRequest2) {
			TypeHierarchySubtypesRequest2.method = "typeHierarchy/subtypes";
			TypeHierarchySubtypesRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
			TypeHierarchySubtypesRequest2.type = new messages_1.ProtocolRequestType(TypeHierarchySubtypesRequest2.method);
		})(TypeHierarchySubtypesRequest || (exports2.TypeHierarchySubtypesRequest = TypeHierarchySubtypesRequest = {}));
	},
});

// ../../../node_modules/.pnpm/vscode-languageserver-protocol@3.17.5/node_modules/vscode-languageserver-protocol/lib/common/protocol.inlineValue.js
var require_protocol_inlineValue = __commonJS({
	"../../../node_modules/.pnpm/vscode-languageserver-protocol@3.17.5/node_modules/vscode-languageserver-protocol/lib/common/protocol.inlineValue.js"(
		exports2,
	) {
		"use strict";
		init_cjs_shims();
		Object.defineProperty(exports2, "__esModule", {
			value: true,
		});
		exports2.InlineValueRefreshRequest = exports2.InlineValueRequest = void 0;
		var messages_1 = require_messages2();
		var InlineValueRequest;
		(function (InlineValueRequest2) {
			InlineValueRequest2.method = "textDocument/inlineValue";
			InlineValueRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
			InlineValueRequest2.type = new messages_1.ProtocolRequestType(InlineValueRequest2.method);
		})(InlineValueRequest || (exports2.InlineValueRequest = InlineValueRequest = {}));
		var InlineValueRefreshRequest;
		(function (InlineValueRefreshRequest2) {
			InlineValueRefreshRequest2.method = `workspace/inlineValue/refresh`;
			InlineValueRefreshRequest2.messageDirection = messages_1.MessageDirection.serverToClient;
			InlineValueRefreshRequest2.type = new messages_1.ProtocolRequestType0(InlineValueRefreshRequest2.method);
		})(InlineValueRefreshRequest || (exports2.InlineValueRefreshRequest = InlineValueRefreshRequest = {}));
	},
});

// ../../../node_modules/.pnpm/vscode-languageserver-protocol@3.17.5/node_modules/vscode-languageserver-protocol/lib/common/protocol.inlayHint.js
var require_protocol_inlayHint = __commonJS({
	"../../../node_modules/.pnpm/vscode-languageserver-protocol@3.17.5/node_modules/vscode-languageserver-protocol/lib/common/protocol.inlayHint.js"(
		exports2,
	) {
		"use strict";
		init_cjs_shims();
		Object.defineProperty(exports2, "__esModule", {
			value: true,
		});
		exports2.InlayHintRefreshRequest = exports2.InlayHintResolveRequest = exports2.InlayHintRequest = void 0;
		var messages_1 = require_messages2();
		var InlayHintRequest;
		(function (InlayHintRequest2) {
			InlayHintRequest2.method = "textDocument/inlayHint";
			InlayHintRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
			InlayHintRequest2.type = new messages_1.ProtocolRequestType(InlayHintRequest2.method);
		})(InlayHintRequest || (exports2.InlayHintRequest = InlayHintRequest = {}));
		var InlayHintResolveRequest;
		(function (InlayHintResolveRequest2) {
			InlayHintResolveRequest2.method = "inlayHint/resolve";
			InlayHintResolveRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
			InlayHintResolveRequest2.type = new messages_1.ProtocolRequestType(InlayHintResolveRequest2.method);
		})(InlayHintResolveRequest || (exports2.InlayHintResolveRequest = InlayHintResolveRequest = {}));
		var InlayHintRefreshRequest;
		(function (InlayHintRefreshRequest2) {
			InlayHintRefreshRequest2.method = `workspace/inlayHint/refresh`;
			InlayHintRefreshRequest2.messageDirection = messages_1.MessageDirection.serverToClient;
			InlayHintRefreshRequest2.type = new messages_1.ProtocolRequestType0(InlayHintRefreshRequest2.method);
		})(InlayHintRefreshRequest || (exports2.InlayHintRefreshRequest = InlayHintRefreshRequest = {}));
	},
});

// ../../../node_modules/.pnpm/vscode-languageserver-protocol@3.17.5/node_modules/vscode-languageserver-protocol/lib/common/protocol.diagnostic.js
var require_protocol_diagnostic = __commonJS({
	"../../../node_modules/.pnpm/vscode-languageserver-protocol@3.17.5/node_modules/vscode-languageserver-protocol/lib/common/protocol.diagnostic.js"(
		exports2,
	) {
		"use strict";
		init_cjs_shims();
		Object.defineProperty(exports2, "__esModule", {
			value: true,
		});
		exports2.DiagnosticRefreshRequest =
			exports2.WorkspaceDiagnosticRequest =
			exports2.DocumentDiagnosticRequest =
			exports2.DocumentDiagnosticReportKind =
			exports2.DiagnosticServerCancellationData =
				void 0;
		var vscode_jsonrpc_1 = require_main();
		var Is2 = require_is3();
		var messages_1 = require_messages2();
		var DiagnosticServerCancellationData;
		(function (DiagnosticServerCancellationData2) {
			function is(value) {
				const candidate = value;
				return candidate && Is2.boolean(candidate.retriggerRequest);
			}
			__name(is, "is");
			DiagnosticServerCancellationData2.is = is;
		})(
			DiagnosticServerCancellationData ||
				(exports2.DiagnosticServerCancellationData = DiagnosticServerCancellationData = {}),
		);
		var DocumentDiagnosticReportKind;
		(function (DocumentDiagnosticReportKind2) {
			DocumentDiagnosticReportKind2.Full = "full";
			DocumentDiagnosticReportKind2.Unchanged = "unchanged";
		})(DocumentDiagnosticReportKind || (exports2.DocumentDiagnosticReportKind = DocumentDiagnosticReportKind = {}));
		var DocumentDiagnosticRequest;
		(function (DocumentDiagnosticRequest2) {
			DocumentDiagnosticRequest2.method = "textDocument/diagnostic";
			DocumentDiagnosticRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
			DocumentDiagnosticRequest2.type = new messages_1.ProtocolRequestType(DocumentDiagnosticRequest2.method);
			DocumentDiagnosticRequest2.partialResult = new vscode_jsonrpc_1.ProgressType();
		})(DocumentDiagnosticRequest || (exports2.DocumentDiagnosticRequest = DocumentDiagnosticRequest = {}));
		var WorkspaceDiagnosticRequest;
		(function (WorkspaceDiagnosticRequest2) {
			WorkspaceDiagnosticRequest2.method = "workspace/diagnostic";
			WorkspaceDiagnosticRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
			WorkspaceDiagnosticRequest2.type = new messages_1.ProtocolRequestType(WorkspaceDiagnosticRequest2.method);
			WorkspaceDiagnosticRequest2.partialResult = new vscode_jsonrpc_1.ProgressType();
		})(WorkspaceDiagnosticRequest || (exports2.WorkspaceDiagnosticRequest = WorkspaceDiagnosticRequest = {}));
		var DiagnosticRefreshRequest;
		(function (DiagnosticRefreshRequest2) {
			DiagnosticRefreshRequest2.method = `workspace/diagnostic/refresh`;
			DiagnosticRefreshRequest2.messageDirection = messages_1.MessageDirection.serverToClient;
			DiagnosticRefreshRequest2.type = new messages_1.ProtocolRequestType0(DiagnosticRefreshRequest2.method);
		})(DiagnosticRefreshRequest || (exports2.DiagnosticRefreshRequest = DiagnosticRefreshRequest = {}));
	},
});

// ../../../node_modules/.pnpm/vscode-languageserver-protocol@3.17.5/node_modules/vscode-languageserver-protocol/lib/common/protocol.notebook.js
var require_protocol_notebook = __commonJS({
	"../../../node_modules/.pnpm/vscode-languageserver-protocol@3.17.5/node_modules/vscode-languageserver-protocol/lib/common/protocol.notebook.js"(
		exports2,
	) {
		"use strict";
		init_cjs_shims();
		Object.defineProperty(exports2, "__esModule", {
			value: true,
		});
		exports2.DidCloseNotebookDocumentNotification =
			exports2.DidSaveNotebookDocumentNotification =
			exports2.DidChangeNotebookDocumentNotification =
			exports2.NotebookCellArrayChange =
			exports2.DidOpenNotebookDocumentNotification =
			exports2.NotebookDocumentSyncRegistrationType =
			exports2.NotebookDocument =
			exports2.NotebookCell =
			exports2.ExecutionSummary =
			exports2.NotebookCellKind =
				void 0;
		var vscode_languageserver_types_1 = require_main2();
		var Is2 = require_is3();
		var messages_1 = require_messages2();
		var NotebookCellKind;
		(function (NotebookCellKind2) {
			NotebookCellKind2.Markup = 1;
			NotebookCellKind2.Code = 2;
			function is(value) {
				return value === 1 || value === 2;
			}
			__name(is, "is");
			NotebookCellKind2.is = is;
		})(NotebookCellKind || (exports2.NotebookCellKind = NotebookCellKind = {}));
		var ExecutionSummary;
		(function (ExecutionSummary2) {
			function create(executionOrder, success) {
				const result = {
					executionOrder,
				};
				if (success === true || success === false) {
					result.success = success;
				}
				return result;
			}
			__name(create, "create");
			ExecutionSummary2.create = create;
			function is(value) {
				const candidate = value;
				return (
					Is2.objectLiteral(candidate) &&
					vscode_languageserver_types_1.uinteger.is(candidate.executionOrder) &&
					(candidate.success === void 0 || Is2.boolean(candidate.success))
				);
			}
			__name(is, "is");
			ExecutionSummary2.is = is;
			function equals2(one, other) {
				if (one === other) {
					return true;
				}
				if (one === null || one === void 0 || other === null || other === void 0) {
					return false;
				}
				return one.executionOrder === other.executionOrder && one.success === other.success;
			}
			__name(equals2, "equals");
			ExecutionSummary2.equals = equals2;
		})(ExecutionSummary || (exports2.ExecutionSummary = ExecutionSummary = {}));
		var NotebookCell;
		(function (NotebookCell2) {
			function create(kind, document2) {
				return {
					kind,
					document: document2,
				};
			}
			__name(create, "create");
			NotebookCell2.create = create;
			function is(value) {
				const candidate = value;
				return (
					Is2.objectLiteral(candidate) &&
					NotebookCellKind.is(candidate.kind) &&
					vscode_languageserver_types_1.DocumentUri.is(candidate.document) &&
					(candidate.metadata === void 0 || Is2.objectLiteral(candidate.metadata))
				);
			}
			__name(is, "is");
			NotebookCell2.is = is;
			function diff(one, two) {
				const result = /* @__PURE__ */ new Set();
				if (one.document !== two.document) {
					result.add("document");
				}
				if (one.kind !== two.kind) {
					result.add("kind");
				}
				if (one.executionSummary !== two.executionSummary) {
					result.add("executionSummary");
				}
				if ((one.metadata !== void 0 || two.metadata !== void 0) && !equalsMetadata(one.metadata, two.metadata)) {
					result.add("metadata");
				}
				if (
					(one.executionSummary !== void 0 || two.executionSummary !== void 0) &&
					!ExecutionSummary.equals(one.executionSummary, two.executionSummary)
				) {
					result.add("executionSummary");
				}
				return result;
			}
			__name(diff, "diff");
			NotebookCell2.diff = diff;
			function equalsMetadata(one, other) {
				if (one === other) {
					return true;
				}
				if (one === null || one === void 0 || other === null || other === void 0) {
					return false;
				}
				if (typeof one !== typeof other) {
					return false;
				}
				if (typeof one !== "object") {
					return false;
				}
				const oneArray = Array.isArray(one);
				const otherArray = Array.isArray(other);
				if (oneArray !== otherArray) {
					return false;
				}
				if (oneArray && otherArray) {
					if (one.length !== other.length) {
						return false;
					}
					for (let i = 0; i < one.length; i++) {
						if (!equalsMetadata(one[i], other[i])) {
							return false;
						}
					}
				}
				if (Is2.objectLiteral(one) && Is2.objectLiteral(other)) {
					const oneKeys = Object.keys(one);
					const otherKeys = Object.keys(other);
					if (oneKeys.length !== otherKeys.length) {
						return false;
					}
					oneKeys.sort();
					otherKeys.sort();
					if (!equalsMetadata(oneKeys, otherKeys)) {
						return false;
					}
					for (let i = 0; i < oneKeys.length; i++) {
						const prop = oneKeys[i];
						if (!equalsMetadata(one[prop], other[prop])) {
							return false;
						}
					}
				}
				return true;
			}
			__name(equalsMetadata, "equalsMetadata");
		})(NotebookCell || (exports2.NotebookCell = NotebookCell = {}));
		var NotebookDocument;
		(function (NotebookDocument2) {
			function create(uri, notebookType, version, cells) {
				return {
					uri,
					notebookType,
					version,
					cells,
				};
			}
			__name(create, "create");
			NotebookDocument2.create = create;
			function is(value) {
				const candidate = value;
				return (
					Is2.objectLiteral(candidate) &&
					Is2.string(candidate.uri) &&
					vscode_languageserver_types_1.integer.is(candidate.version) &&
					Is2.typedArray(candidate.cells, NotebookCell.is)
				);
			}
			__name(is, "is");
			NotebookDocument2.is = is;
		})(NotebookDocument || (exports2.NotebookDocument = NotebookDocument = {}));
		var NotebookDocumentSyncRegistrationType;
		(function (NotebookDocumentSyncRegistrationType2) {
			NotebookDocumentSyncRegistrationType2.method = "notebookDocument/sync";
			NotebookDocumentSyncRegistrationType2.messageDirection = messages_1.MessageDirection.clientToServer;
			NotebookDocumentSyncRegistrationType2.type = new messages_1.RegistrationType(
				NotebookDocumentSyncRegistrationType2.method,
			);
		})(
			NotebookDocumentSyncRegistrationType ||
				(exports2.NotebookDocumentSyncRegistrationType = NotebookDocumentSyncRegistrationType = {}),
		);
		var DidOpenNotebookDocumentNotification;
		(function (DidOpenNotebookDocumentNotification2) {
			DidOpenNotebookDocumentNotification2.method = "notebookDocument/didOpen";
			DidOpenNotebookDocumentNotification2.messageDirection = messages_1.MessageDirection.clientToServer;
			DidOpenNotebookDocumentNotification2.type = new messages_1.ProtocolNotificationType(
				DidOpenNotebookDocumentNotification2.method,
			);
			DidOpenNotebookDocumentNotification2.registrationMethod = NotebookDocumentSyncRegistrationType.method;
		})(
			DidOpenNotebookDocumentNotification ||
				(exports2.DidOpenNotebookDocumentNotification = DidOpenNotebookDocumentNotification = {}),
		);
		var NotebookCellArrayChange;
		(function (NotebookCellArrayChange2) {
			function is(value) {
				const candidate = value;
				return (
					Is2.objectLiteral(candidate) &&
					vscode_languageserver_types_1.uinteger.is(candidate.start) &&
					vscode_languageserver_types_1.uinteger.is(candidate.deleteCount) &&
					(candidate.cells === void 0 || Is2.typedArray(candidate.cells, NotebookCell.is))
				);
			}
			__name(is, "is");
			NotebookCellArrayChange2.is = is;
			function create(start, deleteCount, cells) {
				const result = {
					start,
					deleteCount,
				};
				if (cells !== void 0) {
					result.cells = cells;
				}
				return result;
			}
			__name(create, "create");
			NotebookCellArrayChange2.create = create;
		})(NotebookCellArrayChange || (exports2.NotebookCellArrayChange = NotebookCellArrayChange = {}));
		var DidChangeNotebookDocumentNotification;
		(function (DidChangeNotebookDocumentNotification2) {
			DidChangeNotebookDocumentNotification2.method = "notebookDocument/didChange";
			DidChangeNotebookDocumentNotification2.messageDirection = messages_1.MessageDirection.clientToServer;
			DidChangeNotebookDocumentNotification2.type = new messages_1.ProtocolNotificationType(
				DidChangeNotebookDocumentNotification2.method,
			);
			DidChangeNotebookDocumentNotification2.registrationMethod = NotebookDocumentSyncRegistrationType.method;
		})(
			DidChangeNotebookDocumentNotification ||
				(exports2.DidChangeNotebookDocumentNotification = DidChangeNotebookDocumentNotification = {}),
		);
		var DidSaveNotebookDocumentNotification;
		(function (DidSaveNotebookDocumentNotification2) {
			DidSaveNotebookDocumentNotification2.method = "notebookDocument/didSave";
			DidSaveNotebookDocumentNotification2.messageDirection = messages_1.MessageDirection.clientToServer;
			DidSaveNotebookDocumentNotification2.type = new messages_1.ProtocolNotificationType(
				DidSaveNotebookDocumentNotification2.method,
			);
			DidSaveNotebookDocumentNotification2.registrationMethod = NotebookDocumentSyncRegistrationType.method;
		})(
			DidSaveNotebookDocumentNotification ||
				(exports2.DidSaveNotebookDocumentNotification = DidSaveNotebookDocumentNotification = {}),
		);
		var DidCloseNotebookDocumentNotification;
		(function (DidCloseNotebookDocumentNotification2) {
			DidCloseNotebookDocumentNotification2.method = "notebookDocument/didClose";
			DidCloseNotebookDocumentNotification2.messageDirection = messages_1.MessageDirection.clientToServer;
			DidCloseNotebookDocumentNotification2.type = new messages_1.ProtocolNotificationType(
				DidCloseNotebookDocumentNotification2.method,
			);
			DidCloseNotebookDocumentNotification2.registrationMethod = NotebookDocumentSyncRegistrationType.method;
		})(
			DidCloseNotebookDocumentNotification ||
				(exports2.DidCloseNotebookDocumentNotification = DidCloseNotebookDocumentNotification = {}),
		);
	},
});

// ../../../node_modules/.pnpm/vscode-languageserver-protocol@3.17.5/node_modules/vscode-languageserver-protocol/lib/common/protocol.inlineCompletion.js
var require_protocol_inlineCompletion = __commonJS({
	"../../../node_modules/.pnpm/vscode-languageserver-protocol@3.17.5/node_modules/vscode-languageserver-protocol/lib/common/protocol.inlineCompletion.js"(
		exports2,
	) {
		"use strict";
		init_cjs_shims();
		Object.defineProperty(exports2, "__esModule", {
			value: true,
		});
		exports2.InlineCompletionRequest = void 0;
		var messages_1 = require_messages2();
		var InlineCompletionRequest;
		(function (InlineCompletionRequest2) {
			InlineCompletionRequest2.method = "textDocument/inlineCompletion";
			InlineCompletionRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
			InlineCompletionRequest2.type = new messages_1.ProtocolRequestType(InlineCompletionRequest2.method);
		})(InlineCompletionRequest || (exports2.InlineCompletionRequest = InlineCompletionRequest = {}));
	},
});

// ../../../node_modules/.pnpm/vscode-languageserver-protocol@3.17.5/node_modules/vscode-languageserver-protocol/lib/common/protocol.js
var require_protocol = __commonJS({
	"../../../node_modules/.pnpm/vscode-languageserver-protocol@3.17.5/node_modules/vscode-languageserver-protocol/lib/common/protocol.js"(
		exports2,
	) {
		"use strict";
		init_cjs_shims();
		Object.defineProperty(exports2, "__esModule", {
			value: true,
		});
		exports2.WorkspaceSymbolRequest =
			exports2.CodeActionResolveRequest =
			exports2.CodeActionRequest =
			exports2.DocumentSymbolRequest =
			exports2.DocumentHighlightRequest =
			exports2.ReferencesRequest =
			exports2.DefinitionRequest =
			exports2.SignatureHelpRequest =
			exports2.SignatureHelpTriggerKind =
			exports2.HoverRequest =
			exports2.CompletionResolveRequest =
			exports2.CompletionRequest =
			exports2.CompletionTriggerKind =
			exports2.PublishDiagnosticsNotification =
			exports2.WatchKind =
			exports2.RelativePattern =
			exports2.FileChangeType =
			exports2.DidChangeWatchedFilesNotification =
			exports2.WillSaveTextDocumentWaitUntilRequest =
			exports2.WillSaveTextDocumentNotification =
			exports2.TextDocumentSaveReason =
			exports2.DidSaveTextDocumentNotification =
			exports2.DidCloseTextDocumentNotification =
			exports2.DidChangeTextDocumentNotification =
			exports2.TextDocumentContentChangeEvent =
			exports2.DidOpenTextDocumentNotification =
			exports2.TextDocumentSyncKind =
			exports2.TelemetryEventNotification =
			exports2.LogMessageNotification =
			exports2.ShowMessageRequest =
			exports2.ShowMessageNotification =
			exports2.MessageType =
			exports2.DidChangeConfigurationNotification =
			exports2.ExitNotification =
			exports2.ShutdownRequest =
			exports2.InitializedNotification =
			exports2.InitializeErrorCodes =
			exports2.InitializeRequest =
			exports2.WorkDoneProgressOptions =
			exports2.TextDocumentRegistrationOptions =
			exports2.StaticRegistrationOptions =
			exports2.PositionEncodingKind =
			exports2.FailureHandlingKind =
			exports2.ResourceOperationKind =
			exports2.UnregistrationRequest =
			exports2.RegistrationRequest =
			exports2.DocumentSelector =
			exports2.NotebookCellTextDocumentFilter =
			exports2.NotebookDocumentFilter =
			exports2.TextDocumentFilter =
				void 0;
		exports2.MonikerRequest =
			exports2.MonikerKind =
			exports2.UniquenessLevel =
			exports2.WillDeleteFilesRequest =
			exports2.DidDeleteFilesNotification =
			exports2.WillRenameFilesRequest =
			exports2.DidRenameFilesNotification =
			exports2.WillCreateFilesRequest =
			exports2.DidCreateFilesNotification =
			exports2.FileOperationPatternKind =
			exports2.LinkedEditingRangeRequest =
			exports2.ShowDocumentRequest =
			exports2.SemanticTokensRegistrationType =
			exports2.SemanticTokensRefreshRequest =
			exports2.SemanticTokensRangeRequest =
			exports2.SemanticTokensDeltaRequest =
			exports2.SemanticTokensRequest =
			exports2.TokenFormat =
			exports2.CallHierarchyPrepareRequest =
			exports2.CallHierarchyOutgoingCallsRequest =
			exports2.CallHierarchyIncomingCallsRequest =
			exports2.WorkDoneProgressCancelNotification =
			exports2.WorkDoneProgressCreateRequest =
			exports2.WorkDoneProgress =
			exports2.SelectionRangeRequest =
			exports2.DeclarationRequest =
			exports2.FoldingRangeRefreshRequest =
			exports2.FoldingRangeRequest =
			exports2.ColorPresentationRequest =
			exports2.DocumentColorRequest =
			exports2.ConfigurationRequest =
			exports2.DidChangeWorkspaceFoldersNotification =
			exports2.WorkspaceFoldersRequest =
			exports2.TypeDefinitionRequest =
			exports2.ImplementationRequest =
			exports2.ApplyWorkspaceEditRequest =
			exports2.ExecuteCommandRequest =
			exports2.PrepareRenameRequest =
			exports2.RenameRequest =
			exports2.PrepareSupportDefaultBehavior =
			exports2.DocumentOnTypeFormattingRequest =
			exports2.DocumentRangesFormattingRequest =
			exports2.DocumentRangeFormattingRequest =
			exports2.DocumentFormattingRequest =
			exports2.DocumentLinkResolveRequest =
			exports2.DocumentLinkRequest =
			exports2.CodeLensRefreshRequest =
			exports2.CodeLensResolveRequest =
			exports2.CodeLensRequest =
			exports2.WorkspaceSymbolResolveRequest =
				void 0;
		exports2.InlineCompletionRequest =
			exports2.DidCloseNotebookDocumentNotification =
			exports2.DidSaveNotebookDocumentNotification =
			exports2.DidChangeNotebookDocumentNotification =
			exports2.NotebookCellArrayChange =
			exports2.DidOpenNotebookDocumentNotification =
			exports2.NotebookDocumentSyncRegistrationType =
			exports2.NotebookDocument =
			exports2.NotebookCell =
			exports2.ExecutionSummary =
			exports2.NotebookCellKind =
			exports2.DiagnosticRefreshRequest =
			exports2.WorkspaceDiagnosticRequest =
			exports2.DocumentDiagnosticRequest =
			exports2.DocumentDiagnosticReportKind =
			exports2.DiagnosticServerCancellationData =
			exports2.InlayHintRefreshRequest =
			exports2.InlayHintResolveRequest =
			exports2.InlayHintRequest =
			exports2.InlineValueRefreshRequest =
			exports2.InlineValueRequest =
			exports2.TypeHierarchySupertypesRequest =
			exports2.TypeHierarchySubtypesRequest =
			exports2.TypeHierarchyPrepareRequest =
				void 0;
		var messages_1 = require_messages2();
		var vscode_languageserver_types_1 = require_main2();
		var Is2 = require_is3();
		var protocol_implementation_1 = require_protocol_implementation();
		Object.defineProperty(exports2, "ImplementationRequest", {
			enumerable: true,
			get: /* @__PURE__ */ __name(function () {
				return protocol_implementation_1.ImplementationRequest;
			}, "get"),
		});
		var protocol_typeDefinition_1 = require_protocol_typeDefinition();
		Object.defineProperty(exports2, "TypeDefinitionRequest", {
			enumerable: true,
			get: /* @__PURE__ */ __name(function () {
				return protocol_typeDefinition_1.TypeDefinitionRequest;
			}, "get"),
		});
		var protocol_workspaceFolder_1 = require_protocol_workspaceFolder();
		Object.defineProperty(exports2, "WorkspaceFoldersRequest", {
			enumerable: true,
			get: /* @__PURE__ */ __name(function () {
				return protocol_workspaceFolder_1.WorkspaceFoldersRequest;
			}, "get"),
		});
		Object.defineProperty(exports2, "DidChangeWorkspaceFoldersNotification", {
			enumerable: true,
			get: /* @__PURE__ */ __name(function () {
				return protocol_workspaceFolder_1.DidChangeWorkspaceFoldersNotification;
			}, "get"),
		});
		var protocol_configuration_1 = require_protocol_configuration();
		Object.defineProperty(exports2, "ConfigurationRequest", {
			enumerable: true,
			get: /* @__PURE__ */ __name(function () {
				return protocol_configuration_1.ConfigurationRequest;
			}, "get"),
		});
		var protocol_colorProvider_1 = require_protocol_colorProvider();
		Object.defineProperty(exports2, "DocumentColorRequest", {
			enumerable: true,
			get: /* @__PURE__ */ __name(function () {
				return protocol_colorProvider_1.DocumentColorRequest;
			}, "get"),
		});
		Object.defineProperty(exports2, "ColorPresentationRequest", {
			enumerable: true,
			get: /* @__PURE__ */ __name(function () {
				return protocol_colorProvider_1.ColorPresentationRequest;
			}, "get"),
		});
		var protocol_foldingRange_1 = require_protocol_foldingRange();
		Object.defineProperty(exports2, "FoldingRangeRequest", {
			enumerable: true,
			get: /* @__PURE__ */ __name(function () {
				return protocol_foldingRange_1.FoldingRangeRequest;
			}, "get"),
		});
		Object.defineProperty(exports2, "FoldingRangeRefreshRequest", {
			enumerable: true,
			get: /* @__PURE__ */ __name(function () {
				return protocol_foldingRange_1.FoldingRangeRefreshRequest;
			}, "get"),
		});
		var protocol_declaration_1 = require_protocol_declaration();
		Object.defineProperty(exports2, "DeclarationRequest", {
			enumerable: true,
			get: /* @__PURE__ */ __name(function () {
				return protocol_declaration_1.DeclarationRequest;
			}, "get"),
		});
		var protocol_selectionRange_1 = require_protocol_selectionRange();
		Object.defineProperty(exports2, "SelectionRangeRequest", {
			enumerable: true,
			get: /* @__PURE__ */ __name(function () {
				return protocol_selectionRange_1.SelectionRangeRequest;
			}, "get"),
		});
		var protocol_progress_1 = require_protocol_progress();
		Object.defineProperty(exports2, "WorkDoneProgress", {
			enumerable: true,
			get: /* @__PURE__ */ __name(function () {
				return protocol_progress_1.WorkDoneProgress;
			}, "get"),
		});
		Object.defineProperty(exports2, "WorkDoneProgressCreateRequest", {
			enumerable: true,
			get: /* @__PURE__ */ __name(function () {
				return protocol_progress_1.WorkDoneProgressCreateRequest;
			}, "get"),
		});
		Object.defineProperty(exports2, "WorkDoneProgressCancelNotification", {
			enumerable: true,
			get: /* @__PURE__ */ __name(function () {
				return protocol_progress_1.WorkDoneProgressCancelNotification;
			}, "get"),
		});
		var protocol_callHierarchy_1 = require_protocol_callHierarchy();
		Object.defineProperty(exports2, "CallHierarchyIncomingCallsRequest", {
			enumerable: true,
			get: /* @__PURE__ */ __name(function () {
				return protocol_callHierarchy_1.CallHierarchyIncomingCallsRequest;
			}, "get"),
		});
		Object.defineProperty(exports2, "CallHierarchyOutgoingCallsRequest", {
			enumerable: true,
			get: /* @__PURE__ */ __name(function () {
				return protocol_callHierarchy_1.CallHierarchyOutgoingCallsRequest;
			}, "get"),
		});
		Object.defineProperty(exports2, "CallHierarchyPrepareRequest", {
			enumerable: true,
			get: /* @__PURE__ */ __name(function () {
				return protocol_callHierarchy_1.CallHierarchyPrepareRequest;
			}, "get"),
		});
		var protocol_semanticTokens_1 = require_protocol_semanticTokens();
		Object.defineProperty(exports2, "TokenFormat", {
			enumerable: true,
			get: /* @__PURE__ */ __name(function () {
				return protocol_semanticTokens_1.TokenFormat;
			}, "get"),
		});
		Object.defineProperty(exports2, "SemanticTokensRequest", {
			enumerable: true,
			get: /* @__PURE__ */ __name(function () {
				return protocol_semanticTokens_1.SemanticTokensRequest;
			}, "get"),
		});
		Object.defineProperty(exports2, "SemanticTokensDeltaRequest", {
			enumerable: true,
			get: /* @__PURE__ */ __name(function () {
				return protocol_semanticTokens_1.SemanticTokensDeltaRequest;
			}, "get"),
		});
		Object.defineProperty(exports2, "SemanticTokensRangeRequest", {
			enumerable: true,
			get: /* @__PURE__ */ __name(function () {
				return protocol_semanticTokens_1.SemanticTokensRangeRequest;
			}, "get"),
		});
		Object.defineProperty(exports2, "SemanticTokensRefreshRequest", {
			enumerable: true,
			get: /* @__PURE__ */ __name(function () {
				return protocol_semanticTokens_1.SemanticTokensRefreshRequest;
			}, "get"),
		});
		Object.defineProperty(exports2, "SemanticTokensRegistrationType", {
			enumerable: true,
			get: /* @__PURE__ */ __name(function () {
				return protocol_semanticTokens_1.SemanticTokensRegistrationType;
			}, "get"),
		});
		var protocol_showDocument_1 = require_protocol_showDocument();
		Object.defineProperty(exports2, "ShowDocumentRequest", {
			enumerable: true,
			get: /* @__PURE__ */ __name(function () {
				return protocol_showDocument_1.ShowDocumentRequest;
			}, "get"),
		});
		var protocol_linkedEditingRange_1 = require_protocol_linkedEditingRange();
		Object.defineProperty(exports2, "LinkedEditingRangeRequest", {
			enumerable: true,
			get: /* @__PURE__ */ __name(function () {
				return protocol_linkedEditingRange_1.LinkedEditingRangeRequest;
			}, "get"),
		});
		var protocol_fileOperations_1 = require_protocol_fileOperations();
		Object.defineProperty(exports2, "FileOperationPatternKind", {
			enumerable: true,
			get: /* @__PURE__ */ __name(function () {
				return protocol_fileOperations_1.FileOperationPatternKind;
			}, "get"),
		});
		Object.defineProperty(exports2, "DidCreateFilesNotification", {
			enumerable: true,
			get: /* @__PURE__ */ __name(function () {
				return protocol_fileOperations_1.DidCreateFilesNotification;
			}, "get"),
		});
		Object.defineProperty(exports2, "WillCreateFilesRequest", {
			enumerable: true,
			get: /* @__PURE__ */ __name(function () {
				return protocol_fileOperations_1.WillCreateFilesRequest;
			}, "get"),
		});
		Object.defineProperty(exports2, "DidRenameFilesNotification", {
			enumerable: true,
			get: /* @__PURE__ */ __name(function () {
				return protocol_fileOperations_1.DidRenameFilesNotification;
			}, "get"),
		});
		Object.defineProperty(exports2, "WillRenameFilesRequest", {
			enumerable: true,
			get: /* @__PURE__ */ __name(function () {
				return protocol_fileOperations_1.WillRenameFilesRequest;
			}, "get"),
		});
		Object.defineProperty(exports2, "DidDeleteFilesNotification", {
			enumerable: true,
			get: /* @__PURE__ */ __name(function () {
				return protocol_fileOperations_1.DidDeleteFilesNotification;
			}, "get"),
		});
		Object.defineProperty(exports2, "WillDeleteFilesRequest", {
			enumerable: true,
			get: /* @__PURE__ */ __name(function () {
				return protocol_fileOperations_1.WillDeleteFilesRequest;
			}, "get"),
		});
		var protocol_moniker_1 = require_protocol_moniker();
		Object.defineProperty(exports2, "UniquenessLevel", {
			enumerable: true,
			get: /* @__PURE__ */ __name(function () {
				return protocol_moniker_1.UniquenessLevel;
			}, "get"),
		});
		Object.defineProperty(exports2, "MonikerKind", {
			enumerable: true,
			get: /* @__PURE__ */ __name(function () {
				return protocol_moniker_1.MonikerKind;
			}, "get"),
		});
		Object.defineProperty(exports2, "MonikerRequest", {
			enumerable: true,
			get: /* @__PURE__ */ __name(function () {
				return protocol_moniker_1.MonikerRequest;
			}, "get"),
		});
		var protocol_typeHierarchy_1 = require_protocol_typeHierarchy();
		Object.defineProperty(exports2, "TypeHierarchyPrepareRequest", {
			enumerable: true,
			get: /* @__PURE__ */ __name(function () {
				return protocol_typeHierarchy_1.TypeHierarchyPrepareRequest;
			}, "get"),
		});
		Object.defineProperty(exports2, "TypeHierarchySubtypesRequest", {
			enumerable: true,
			get: /* @__PURE__ */ __name(function () {
				return protocol_typeHierarchy_1.TypeHierarchySubtypesRequest;
			}, "get"),
		});
		Object.defineProperty(exports2, "TypeHierarchySupertypesRequest", {
			enumerable: true,
			get: /* @__PURE__ */ __name(function () {
				return protocol_typeHierarchy_1.TypeHierarchySupertypesRequest;
			}, "get"),
		});
		var protocol_inlineValue_1 = require_protocol_inlineValue();
		Object.defineProperty(exports2, "InlineValueRequest", {
			enumerable: true,
			get: /* @__PURE__ */ __name(function () {
				return protocol_inlineValue_1.InlineValueRequest;
			}, "get"),
		});
		Object.defineProperty(exports2, "InlineValueRefreshRequest", {
			enumerable: true,
			get: /* @__PURE__ */ __name(function () {
				return protocol_inlineValue_1.InlineValueRefreshRequest;
			}, "get"),
		});
		var protocol_inlayHint_1 = require_protocol_inlayHint();
		Object.defineProperty(exports2, "InlayHintRequest", {
			enumerable: true,
			get: /* @__PURE__ */ __name(function () {
				return protocol_inlayHint_1.InlayHintRequest;
			}, "get"),
		});
		Object.defineProperty(exports2, "InlayHintResolveRequest", {
			enumerable: true,
			get: /* @__PURE__ */ __name(function () {
				return protocol_inlayHint_1.InlayHintResolveRequest;
			}, "get"),
		});
		Object.defineProperty(exports2, "InlayHintRefreshRequest", {
			enumerable: true,
			get: /* @__PURE__ */ __name(function () {
				return protocol_inlayHint_1.InlayHintRefreshRequest;
			}, "get"),
		});
		var protocol_diagnostic_1 = require_protocol_diagnostic();
		Object.defineProperty(exports2, "DiagnosticServerCancellationData", {
			enumerable: true,
			get: /* @__PURE__ */ __name(function () {
				return protocol_diagnostic_1.DiagnosticServerCancellationData;
			}, "get"),
		});
		Object.defineProperty(exports2, "DocumentDiagnosticReportKind", {
			enumerable: true,
			get: /* @__PURE__ */ __name(function () {
				return protocol_diagnostic_1.DocumentDiagnosticReportKind;
			}, "get"),
		});
		Object.defineProperty(exports2, "DocumentDiagnosticRequest", {
			enumerable: true,
			get: /* @__PURE__ */ __name(function () {
				return protocol_diagnostic_1.DocumentDiagnosticRequest;
			}, "get"),
		});
		Object.defineProperty(exports2, "WorkspaceDiagnosticRequest", {
			enumerable: true,
			get: /* @__PURE__ */ __name(function () {
				return protocol_diagnostic_1.WorkspaceDiagnosticRequest;
			}, "get"),
		});
		Object.defineProperty(exports2, "DiagnosticRefreshRequest", {
			enumerable: true,
			get: /* @__PURE__ */ __name(function () {
				return protocol_diagnostic_1.DiagnosticRefreshRequest;
			}, "get"),
		});
		var protocol_notebook_1 = require_protocol_notebook();
		Object.defineProperty(exports2, "NotebookCellKind", {
			enumerable: true,
			get: /* @__PURE__ */ __name(function () {
				return protocol_notebook_1.NotebookCellKind;
			}, "get"),
		});
		Object.defineProperty(exports2, "ExecutionSummary", {
			enumerable: true,
			get: /* @__PURE__ */ __name(function () {
				return protocol_notebook_1.ExecutionSummary;
			}, "get"),
		});
		Object.defineProperty(exports2, "NotebookCell", {
			enumerable: true,
			get: /* @__PURE__ */ __name(function () {
				return protocol_notebook_1.NotebookCell;
			}, "get"),
		});
		Object.defineProperty(exports2, "NotebookDocument", {
			enumerable: true,
			get: /* @__PURE__ */ __name(function () {
				return protocol_notebook_1.NotebookDocument;
			}, "get"),
		});
		Object.defineProperty(exports2, "NotebookDocumentSyncRegistrationType", {
			enumerable: true,
			get: /* @__PURE__ */ __name(function () {
				return protocol_notebook_1.NotebookDocumentSyncRegistrationType;
			}, "get"),
		});
		Object.defineProperty(exports2, "DidOpenNotebookDocumentNotification", {
			enumerable: true,
			get: /* @__PURE__ */ __name(function () {
				return protocol_notebook_1.DidOpenNotebookDocumentNotification;
			}, "get"),
		});
		Object.defineProperty(exports2, "NotebookCellArrayChange", {
			enumerable: true,
			get: /* @__PURE__ */ __name(function () {
				return protocol_notebook_1.NotebookCellArrayChange;
			}, "get"),
		});
		Object.defineProperty(exports2, "DidChangeNotebookDocumentNotification", {
			enumerable: true,
			get: /* @__PURE__ */ __name(function () {
				return protocol_notebook_1.DidChangeNotebookDocumentNotification;
			}, "get"),
		});
		Object.defineProperty(exports2, "DidSaveNotebookDocumentNotification", {
			enumerable: true,
			get: /* @__PURE__ */ __name(function () {
				return protocol_notebook_1.DidSaveNotebookDocumentNotification;
			}, "get"),
		});
		Object.defineProperty(exports2, "DidCloseNotebookDocumentNotification", {
			enumerable: true,
			get: /* @__PURE__ */ __name(function () {
				return protocol_notebook_1.DidCloseNotebookDocumentNotification;
			}, "get"),
		});
		var protocol_inlineCompletion_1 = require_protocol_inlineCompletion();
		Object.defineProperty(exports2, "InlineCompletionRequest", {
			enumerable: true,
			get: /* @__PURE__ */ __name(function () {
				return protocol_inlineCompletion_1.InlineCompletionRequest;
			}, "get"),
		});
		var TextDocumentFilter;
		(function (TextDocumentFilter2) {
			function is(value) {
				const candidate = value;
				return (
					Is2.string(candidate) ||
					Is2.string(candidate.language) ||
					Is2.string(candidate.scheme) ||
					Is2.string(candidate.pattern)
				);
			}
			__name(is, "is");
			TextDocumentFilter2.is = is;
		})(TextDocumentFilter || (exports2.TextDocumentFilter = TextDocumentFilter = {}));
		var NotebookDocumentFilter;
		(function (NotebookDocumentFilter2) {
			function is(value) {
				const candidate = value;
				return (
					Is2.objectLiteral(candidate) &&
					(Is2.string(candidate.notebookType) || Is2.string(candidate.scheme) || Is2.string(candidate.pattern))
				);
			}
			__name(is, "is");
			NotebookDocumentFilter2.is = is;
		})(NotebookDocumentFilter || (exports2.NotebookDocumentFilter = NotebookDocumentFilter = {}));
		var NotebookCellTextDocumentFilter;
		(function (NotebookCellTextDocumentFilter2) {
			function is(value) {
				const candidate = value;
				return (
					Is2.objectLiteral(candidate) &&
					(Is2.string(candidate.notebook) || NotebookDocumentFilter.is(candidate.notebook)) &&
					(candidate.language === void 0 || Is2.string(candidate.language))
				);
			}
			__name(is, "is");
			NotebookCellTextDocumentFilter2.is = is;
		})(NotebookCellTextDocumentFilter || (exports2.NotebookCellTextDocumentFilter = NotebookCellTextDocumentFilter = {}));
		var DocumentSelector;
		(function (DocumentSelector2) {
			function is(value) {
				if (!Array.isArray(value)) {
					return false;
				}
				for (let elem of value) {
					if (!Is2.string(elem) && !TextDocumentFilter.is(elem) && !NotebookCellTextDocumentFilter.is(elem)) {
						return false;
					}
				}
				return true;
			}
			__name(is, "is");
			DocumentSelector2.is = is;
		})(DocumentSelector || (exports2.DocumentSelector = DocumentSelector = {}));
		var RegistrationRequest;
		(function (RegistrationRequest2) {
			RegistrationRequest2.method = "client/registerCapability";
			RegistrationRequest2.messageDirection = messages_1.MessageDirection.serverToClient;
			RegistrationRequest2.type = new messages_1.ProtocolRequestType(RegistrationRequest2.method);
		})(RegistrationRequest || (exports2.RegistrationRequest = RegistrationRequest = {}));
		var UnregistrationRequest;
		(function (UnregistrationRequest2) {
			UnregistrationRequest2.method = "client/unregisterCapability";
			UnregistrationRequest2.messageDirection = messages_1.MessageDirection.serverToClient;
			UnregistrationRequest2.type = new messages_1.ProtocolRequestType(UnregistrationRequest2.method);
		})(UnregistrationRequest || (exports2.UnregistrationRequest = UnregistrationRequest = {}));
		var ResourceOperationKind;
		(function (ResourceOperationKind2) {
			ResourceOperationKind2.Create = "create";
			ResourceOperationKind2.Rename = "rename";
			ResourceOperationKind2.Delete = "delete";
		})(ResourceOperationKind || (exports2.ResourceOperationKind = ResourceOperationKind = {}));
		var FailureHandlingKind;
		(function (FailureHandlingKind2) {
			FailureHandlingKind2.Abort = "abort";
			FailureHandlingKind2.Transactional = "transactional";
			FailureHandlingKind2.TextOnlyTransactional = "textOnlyTransactional";
			FailureHandlingKind2.Undo = "undo";
		})(FailureHandlingKind || (exports2.FailureHandlingKind = FailureHandlingKind = {}));
		var PositionEncodingKind;
		(function (PositionEncodingKind2) {
			PositionEncodingKind2.UTF8 = "utf-8";
			PositionEncodingKind2.UTF16 = "utf-16";
			PositionEncodingKind2.UTF32 = "utf-32";
		})(PositionEncodingKind || (exports2.PositionEncodingKind = PositionEncodingKind = {}));
		var StaticRegistrationOptions;
		(function (StaticRegistrationOptions2) {
			function hasId(value) {
				const candidate = value;
				return candidate && Is2.string(candidate.id) && candidate.id.length > 0;
			}
			__name(hasId, "hasId");
			StaticRegistrationOptions2.hasId = hasId;
		})(StaticRegistrationOptions || (exports2.StaticRegistrationOptions = StaticRegistrationOptions = {}));
		var TextDocumentRegistrationOptions;
		(function (TextDocumentRegistrationOptions2) {
			function is(value) {
				const candidate = value;
				return candidate && (candidate.documentSelector === null || DocumentSelector.is(candidate.documentSelector));
			}
			__name(is, "is");
			TextDocumentRegistrationOptions2.is = is;
		})(
			TextDocumentRegistrationOptions || (exports2.TextDocumentRegistrationOptions = TextDocumentRegistrationOptions = {}),
		);
		var WorkDoneProgressOptions;
		(function (WorkDoneProgressOptions2) {
			function is(value) {
				const candidate = value;
				return (
					Is2.objectLiteral(candidate) && (candidate.workDoneProgress === void 0 || Is2.boolean(candidate.workDoneProgress))
				);
			}
			__name(is, "is");
			WorkDoneProgressOptions2.is = is;
			function hasWorkDoneProgress(value) {
				const candidate = value;
				return candidate && Is2.boolean(candidate.workDoneProgress);
			}
			__name(hasWorkDoneProgress, "hasWorkDoneProgress");
			WorkDoneProgressOptions2.hasWorkDoneProgress = hasWorkDoneProgress;
		})(WorkDoneProgressOptions || (exports2.WorkDoneProgressOptions = WorkDoneProgressOptions = {}));
		var InitializeRequest;
		(function (InitializeRequest2) {
			InitializeRequest2.method = "initialize";
			InitializeRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
			InitializeRequest2.type = new messages_1.ProtocolRequestType(InitializeRequest2.method);
		})(InitializeRequest || (exports2.InitializeRequest = InitializeRequest = {}));
		var InitializeErrorCodes;
		(function (InitializeErrorCodes2) {
			InitializeErrorCodes2.unknownProtocolVersion = 1;
		})(InitializeErrorCodes || (exports2.InitializeErrorCodes = InitializeErrorCodes = {}));
		var InitializedNotification;
		(function (InitializedNotification2) {
			InitializedNotification2.method = "initialized";
			InitializedNotification2.messageDirection = messages_1.MessageDirection.clientToServer;
			InitializedNotification2.type = new messages_1.ProtocolNotificationType(InitializedNotification2.method);
		})(InitializedNotification || (exports2.InitializedNotification = InitializedNotification = {}));
		var ShutdownRequest;
		(function (ShutdownRequest2) {
			ShutdownRequest2.method = "shutdown";
			ShutdownRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
			ShutdownRequest2.type = new messages_1.ProtocolRequestType0(ShutdownRequest2.method);
		})(ShutdownRequest || (exports2.ShutdownRequest = ShutdownRequest = {}));
		var ExitNotification;
		(function (ExitNotification2) {
			ExitNotification2.method = "exit";
			ExitNotification2.messageDirection = messages_1.MessageDirection.clientToServer;
			ExitNotification2.type = new messages_1.ProtocolNotificationType0(ExitNotification2.method);
		})(ExitNotification || (exports2.ExitNotification = ExitNotification = {}));
		var DidChangeConfigurationNotification2;
		(function (DidChangeConfigurationNotification3) {
			DidChangeConfigurationNotification3.method = "workspace/didChangeConfiguration";
			DidChangeConfigurationNotification3.messageDirection = messages_1.MessageDirection.clientToServer;
			DidChangeConfigurationNotification3.type = new messages_1.ProtocolNotificationType(
				DidChangeConfigurationNotification3.method,
			);
		})(
			DidChangeConfigurationNotification2 ||
				(exports2.DidChangeConfigurationNotification = DidChangeConfigurationNotification2 = {}),
		);
		var MessageType;
		(function (MessageType2) {
			MessageType2.Error = 1;
			MessageType2.Warning = 2;
			MessageType2.Info = 3;
			MessageType2.Log = 4;
			MessageType2.Debug = 5;
		})(MessageType || (exports2.MessageType = MessageType = {}));
		var ShowMessageNotification;
		(function (ShowMessageNotification2) {
			ShowMessageNotification2.method = "window/showMessage";
			ShowMessageNotification2.messageDirection = messages_1.MessageDirection.serverToClient;
			ShowMessageNotification2.type = new messages_1.ProtocolNotificationType(ShowMessageNotification2.method);
		})(ShowMessageNotification || (exports2.ShowMessageNotification = ShowMessageNotification = {}));
		var ShowMessageRequest;
		(function (ShowMessageRequest2) {
			ShowMessageRequest2.method = "window/showMessageRequest";
			ShowMessageRequest2.messageDirection = messages_1.MessageDirection.serverToClient;
			ShowMessageRequest2.type = new messages_1.ProtocolRequestType(ShowMessageRequest2.method);
		})(ShowMessageRequest || (exports2.ShowMessageRequest = ShowMessageRequest = {}));
		var LogMessageNotification;
		(function (LogMessageNotification2) {
			LogMessageNotification2.method = "window/logMessage";
			LogMessageNotification2.messageDirection = messages_1.MessageDirection.serverToClient;
			LogMessageNotification2.type = new messages_1.ProtocolNotificationType(LogMessageNotification2.method);
		})(LogMessageNotification || (exports2.LogMessageNotification = LogMessageNotification = {}));
		var TelemetryEventNotification;
		(function (TelemetryEventNotification2) {
			TelemetryEventNotification2.method = "telemetry/event";
			TelemetryEventNotification2.messageDirection = messages_1.MessageDirection.serverToClient;
			TelemetryEventNotification2.type = new messages_1.ProtocolNotificationType(TelemetryEventNotification2.method);
		})(TelemetryEventNotification || (exports2.TelemetryEventNotification = TelemetryEventNotification = {}));
		var TextDocumentSyncKind2;
		(function (TextDocumentSyncKind3) {
			TextDocumentSyncKind3.None = 0;
			TextDocumentSyncKind3.Full = 1;
			TextDocumentSyncKind3.Incremental = 2;
		})(TextDocumentSyncKind2 || (exports2.TextDocumentSyncKind = TextDocumentSyncKind2 = {}));
		var DidOpenTextDocumentNotification;
		(function (DidOpenTextDocumentNotification2) {
			DidOpenTextDocumentNotification2.method = "textDocument/didOpen";
			DidOpenTextDocumentNotification2.messageDirection = messages_1.MessageDirection.clientToServer;
			DidOpenTextDocumentNotification2.type = new messages_1.ProtocolNotificationType(
				DidOpenTextDocumentNotification2.method,
			);
		})(
			DidOpenTextDocumentNotification || (exports2.DidOpenTextDocumentNotification = DidOpenTextDocumentNotification = {}),
		);
		var TextDocumentContentChangeEvent;
		(function (TextDocumentContentChangeEvent2) {
			function isIncremental(event) {
				let candidate = event;
				return (
					candidate !== void 0 &&
					candidate !== null &&
					typeof candidate.text === "string" &&
					candidate.range !== void 0 &&
					(candidate.rangeLength === void 0 || typeof candidate.rangeLength === "number")
				);
			}
			__name(isIncremental, "isIncremental");
			TextDocumentContentChangeEvent2.isIncremental = isIncremental;
			function isFull(event) {
				let candidate = event;
				return (
					candidate !== void 0 &&
					candidate !== null &&
					typeof candidate.text === "string" &&
					candidate.range === void 0 &&
					candidate.rangeLength === void 0
				);
			}
			__name(isFull, "isFull");
			TextDocumentContentChangeEvent2.isFull = isFull;
		})(TextDocumentContentChangeEvent || (exports2.TextDocumentContentChangeEvent = TextDocumentContentChangeEvent = {}));
		var DidChangeTextDocumentNotification;
		(function (DidChangeTextDocumentNotification2) {
			DidChangeTextDocumentNotification2.method = "textDocument/didChange";
			DidChangeTextDocumentNotification2.messageDirection = messages_1.MessageDirection.clientToServer;
			DidChangeTextDocumentNotification2.type = new messages_1.ProtocolNotificationType(
				DidChangeTextDocumentNotification2.method,
			);
		})(
			DidChangeTextDocumentNotification ||
				(exports2.DidChangeTextDocumentNotification = DidChangeTextDocumentNotification = {}),
		);
		var DidCloseTextDocumentNotification;
		(function (DidCloseTextDocumentNotification2) {
			DidCloseTextDocumentNotification2.method = "textDocument/didClose";
			DidCloseTextDocumentNotification2.messageDirection = messages_1.MessageDirection.clientToServer;
			DidCloseTextDocumentNotification2.type = new messages_1.ProtocolNotificationType(
				DidCloseTextDocumentNotification2.method,
			);
		})(
			DidCloseTextDocumentNotification ||
				(exports2.DidCloseTextDocumentNotification = DidCloseTextDocumentNotification = {}),
		);
		var DidSaveTextDocumentNotification;
		(function (DidSaveTextDocumentNotification2) {
			DidSaveTextDocumentNotification2.method = "textDocument/didSave";
			DidSaveTextDocumentNotification2.messageDirection = messages_1.MessageDirection.clientToServer;
			DidSaveTextDocumentNotification2.type = new messages_1.ProtocolNotificationType(
				DidSaveTextDocumentNotification2.method,
			);
		})(
			DidSaveTextDocumentNotification || (exports2.DidSaveTextDocumentNotification = DidSaveTextDocumentNotification = {}),
		);
		var TextDocumentSaveReason;
		(function (TextDocumentSaveReason2) {
			TextDocumentSaveReason2.Manual = 1;
			TextDocumentSaveReason2.AfterDelay = 2;
			TextDocumentSaveReason2.FocusOut = 3;
		})(TextDocumentSaveReason || (exports2.TextDocumentSaveReason = TextDocumentSaveReason = {}));
		var WillSaveTextDocumentNotification;
		(function (WillSaveTextDocumentNotification2) {
			WillSaveTextDocumentNotification2.method = "textDocument/willSave";
			WillSaveTextDocumentNotification2.messageDirection = messages_1.MessageDirection.clientToServer;
			WillSaveTextDocumentNotification2.type = new messages_1.ProtocolNotificationType(
				WillSaveTextDocumentNotification2.method,
			);
		})(
			WillSaveTextDocumentNotification ||
				(exports2.WillSaveTextDocumentNotification = WillSaveTextDocumentNotification = {}),
		);
		var WillSaveTextDocumentWaitUntilRequest;
		(function (WillSaveTextDocumentWaitUntilRequest2) {
			WillSaveTextDocumentWaitUntilRequest2.method = "textDocument/willSaveWaitUntil";
			WillSaveTextDocumentWaitUntilRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
			WillSaveTextDocumentWaitUntilRequest2.type = new messages_1.ProtocolRequestType(
				WillSaveTextDocumentWaitUntilRequest2.method,
			);
		})(
			WillSaveTextDocumentWaitUntilRequest ||
				(exports2.WillSaveTextDocumentWaitUntilRequest = WillSaveTextDocumentWaitUntilRequest = {}),
		);
		var DidChangeWatchedFilesNotification;
		(function (DidChangeWatchedFilesNotification2) {
			DidChangeWatchedFilesNotification2.method = "workspace/didChangeWatchedFiles";
			DidChangeWatchedFilesNotification2.messageDirection = messages_1.MessageDirection.clientToServer;
			DidChangeWatchedFilesNotification2.type = new messages_1.ProtocolNotificationType(
				DidChangeWatchedFilesNotification2.method,
			);
		})(
			DidChangeWatchedFilesNotification ||
				(exports2.DidChangeWatchedFilesNotification = DidChangeWatchedFilesNotification = {}),
		);
		var FileChangeType;
		(function (FileChangeType2) {
			FileChangeType2.Created = 1;
			FileChangeType2.Changed = 2;
			FileChangeType2.Deleted = 3;
		})(FileChangeType || (exports2.FileChangeType = FileChangeType = {}));
		var RelativePattern;
		(function (RelativePattern2) {
			function is(value) {
				const candidate = value;
				return (
					Is2.objectLiteral(candidate) &&
					(vscode_languageserver_types_1.URI.is(candidate.baseUri) ||
						vscode_languageserver_types_1.WorkspaceFolder.is(candidate.baseUri)) &&
					Is2.string(candidate.pattern)
				);
			}
			__name(is, "is");
			RelativePattern2.is = is;
		})(RelativePattern || (exports2.RelativePattern = RelativePattern = {}));
		var WatchKind;
		(function (WatchKind2) {
			WatchKind2.Create = 1;
			WatchKind2.Change = 2;
			WatchKind2.Delete = 4;
		})(WatchKind || (exports2.WatchKind = WatchKind = {}));
		var PublishDiagnosticsNotification;
		(function (PublishDiagnosticsNotification2) {
			PublishDiagnosticsNotification2.method = "textDocument/publishDiagnostics";
			PublishDiagnosticsNotification2.messageDirection = messages_1.MessageDirection.serverToClient;
			PublishDiagnosticsNotification2.type = new messages_1.ProtocolNotificationType(
				PublishDiagnosticsNotification2.method,
			);
		})(PublishDiagnosticsNotification || (exports2.PublishDiagnosticsNotification = PublishDiagnosticsNotification = {}));
		var CompletionTriggerKind;
		(function (CompletionTriggerKind2) {
			CompletionTriggerKind2.Invoked = 1;
			CompletionTriggerKind2.TriggerCharacter = 2;
			CompletionTriggerKind2.TriggerForIncompleteCompletions = 3;
		})(CompletionTriggerKind || (exports2.CompletionTriggerKind = CompletionTriggerKind = {}));
		var CompletionRequest;
		(function (CompletionRequest2) {
			CompletionRequest2.method = "textDocument/completion";
			CompletionRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
			CompletionRequest2.type = new messages_1.ProtocolRequestType(CompletionRequest2.method);
		})(CompletionRequest || (exports2.CompletionRequest = CompletionRequest = {}));
		var CompletionResolveRequest;
		(function (CompletionResolveRequest2) {
			CompletionResolveRequest2.method = "completionItem/resolve";
			CompletionResolveRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
			CompletionResolveRequest2.type = new messages_1.ProtocolRequestType(CompletionResolveRequest2.method);
		})(CompletionResolveRequest || (exports2.CompletionResolveRequest = CompletionResolveRequest = {}));
		var HoverRequest;
		(function (HoverRequest2) {
			HoverRequest2.method = "textDocument/hover";
			HoverRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
			HoverRequest2.type = new messages_1.ProtocolRequestType(HoverRequest2.method);
		})(HoverRequest || (exports2.HoverRequest = HoverRequest = {}));
		var SignatureHelpTriggerKind;
		(function (SignatureHelpTriggerKind2) {
			SignatureHelpTriggerKind2.Invoked = 1;
			SignatureHelpTriggerKind2.TriggerCharacter = 2;
			SignatureHelpTriggerKind2.ContentChange = 3;
		})(SignatureHelpTriggerKind || (exports2.SignatureHelpTriggerKind = SignatureHelpTriggerKind = {}));
		var SignatureHelpRequest;
		(function (SignatureHelpRequest2) {
			SignatureHelpRequest2.method = "textDocument/signatureHelp";
			SignatureHelpRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
			SignatureHelpRequest2.type = new messages_1.ProtocolRequestType(SignatureHelpRequest2.method);
		})(SignatureHelpRequest || (exports2.SignatureHelpRequest = SignatureHelpRequest = {}));
		var DefinitionRequest;
		(function (DefinitionRequest2) {
			DefinitionRequest2.method = "textDocument/definition";
			DefinitionRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
			DefinitionRequest2.type = new messages_1.ProtocolRequestType(DefinitionRequest2.method);
		})(DefinitionRequest || (exports2.DefinitionRequest = DefinitionRequest = {}));
		var ReferencesRequest;
		(function (ReferencesRequest2) {
			ReferencesRequest2.method = "textDocument/references";
			ReferencesRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
			ReferencesRequest2.type = new messages_1.ProtocolRequestType(ReferencesRequest2.method);
		})(ReferencesRequest || (exports2.ReferencesRequest = ReferencesRequest = {}));
		var DocumentHighlightRequest;
		(function (DocumentHighlightRequest2) {
			DocumentHighlightRequest2.method = "textDocument/documentHighlight";
			DocumentHighlightRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
			DocumentHighlightRequest2.type = new messages_1.ProtocolRequestType(DocumentHighlightRequest2.method);
		})(DocumentHighlightRequest || (exports2.DocumentHighlightRequest = DocumentHighlightRequest = {}));
		var DocumentSymbolRequest;
		(function (DocumentSymbolRequest2) {
			DocumentSymbolRequest2.method = "textDocument/documentSymbol";
			DocumentSymbolRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
			DocumentSymbolRequest2.type = new messages_1.ProtocolRequestType(DocumentSymbolRequest2.method);
		})(DocumentSymbolRequest || (exports2.DocumentSymbolRequest = DocumentSymbolRequest = {}));
		var CodeActionRequest;
		(function (CodeActionRequest2) {
			CodeActionRequest2.method = "textDocument/codeAction";
			CodeActionRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
			CodeActionRequest2.type = new messages_1.ProtocolRequestType(CodeActionRequest2.method);
		})(CodeActionRequest || (exports2.CodeActionRequest = CodeActionRequest = {}));
		var CodeActionResolveRequest;
		(function (CodeActionResolveRequest2) {
			CodeActionResolveRequest2.method = "codeAction/resolve";
			CodeActionResolveRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
			CodeActionResolveRequest2.type = new messages_1.ProtocolRequestType(CodeActionResolveRequest2.method);
		})(CodeActionResolveRequest || (exports2.CodeActionResolveRequest = CodeActionResolveRequest = {}));
		var WorkspaceSymbolRequest;
		(function (WorkspaceSymbolRequest2) {
			WorkspaceSymbolRequest2.method = "workspace/symbol";
			WorkspaceSymbolRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
			WorkspaceSymbolRequest2.type = new messages_1.ProtocolRequestType(WorkspaceSymbolRequest2.method);
		})(WorkspaceSymbolRequest || (exports2.WorkspaceSymbolRequest = WorkspaceSymbolRequest = {}));
		var WorkspaceSymbolResolveRequest;
		(function (WorkspaceSymbolResolveRequest2) {
			WorkspaceSymbolResolveRequest2.method = "workspaceSymbol/resolve";
			WorkspaceSymbolResolveRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
			WorkspaceSymbolResolveRequest2.type = new messages_1.ProtocolRequestType(WorkspaceSymbolResolveRequest2.method);
		})(WorkspaceSymbolResolveRequest || (exports2.WorkspaceSymbolResolveRequest = WorkspaceSymbolResolveRequest = {}));
		var CodeLensRequest;
		(function (CodeLensRequest2) {
			CodeLensRequest2.method = "textDocument/codeLens";
			CodeLensRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
			CodeLensRequest2.type = new messages_1.ProtocolRequestType(CodeLensRequest2.method);
		})(CodeLensRequest || (exports2.CodeLensRequest = CodeLensRequest = {}));
		var CodeLensResolveRequest;
		(function (CodeLensResolveRequest2) {
			CodeLensResolveRequest2.method = "codeLens/resolve";
			CodeLensResolveRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
			CodeLensResolveRequest2.type = new messages_1.ProtocolRequestType(CodeLensResolveRequest2.method);
		})(CodeLensResolveRequest || (exports2.CodeLensResolveRequest = CodeLensResolveRequest = {}));
		var CodeLensRefreshRequest;
		(function (CodeLensRefreshRequest2) {
			CodeLensRefreshRequest2.method = `workspace/codeLens/refresh`;
			CodeLensRefreshRequest2.messageDirection = messages_1.MessageDirection.serverToClient;
			CodeLensRefreshRequest2.type = new messages_1.ProtocolRequestType0(CodeLensRefreshRequest2.method);
		})(CodeLensRefreshRequest || (exports2.CodeLensRefreshRequest = CodeLensRefreshRequest = {}));
		var DocumentLinkRequest;
		(function (DocumentLinkRequest2) {
			DocumentLinkRequest2.method = "textDocument/documentLink";
			DocumentLinkRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
			DocumentLinkRequest2.type = new messages_1.ProtocolRequestType(DocumentLinkRequest2.method);
		})(DocumentLinkRequest || (exports2.DocumentLinkRequest = DocumentLinkRequest = {}));
		var DocumentLinkResolveRequest;
		(function (DocumentLinkResolveRequest2) {
			DocumentLinkResolveRequest2.method = "documentLink/resolve";
			DocumentLinkResolveRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
			DocumentLinkResolveRequest2.type = new messages_1.ProtocolRequestType(DocumentLinkResolveRequest2.method);
		})(DocumentLinkResolveRequest || (exports2.DocumentLinkResolveRequest = DocumentLinkResolveRequest = {}));
		var DocumentFormattingRequest;
		(function (DocumentFormattingRequest2) {
			DocumentFormattingRequest2.method = "textDocument/formatting";
			DocumentFormattingRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
			DocumentFormattingRequest2.type = new messages_1.ProtocolRequestType(DocumentFormattingRequest2.method);
		})(DocumentFormattingRequest || (exports2.DocumentFormattingRequest = DocumentFormattingRequest = {}));
		var DocumentRangeFormattingRequest;
		(function (DocumentRangeFormattingRequest2) {
			DocumentRangeFormattingRequest2.method = "textDocument/rangeFormatting";
			DocumentRangeFormattingRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
			DocumentRangeFormattingRequest2.type = new messages_1.ProtocolRequestType(DocumentRangeFormattingRequest2.method);
		})(DocumentRangeFormattingRequest || (exports2.DocumentRangeFormattingRequest = DocumentRangeFormattingRequest = {}));
		var DocumentRangesFormattingRequest;
		(function (DocumentRangesFormattingRequest2) {
			DocumentRangesFormattingRequest2.method = "textDocument/rangesFormatting";
			DocumentRangesFormattingRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
			DocumentRangesFormattingRequest2.type = new messages_1.ProtocolRequestType(DocumentRangesFormattingRequest2.method);
		})(
			DocumentRangesFormattingRequest || (exports2.DocumentRangesFormattingRequest = DocumentRangesFormattingRequest = {}),
		);
		var DocumentOnTypeFormattingRequest;
		(function (DocumentOnTypeFormattingRequest2) {
			DocumentOnTypeFormattingRequest2.method = "textDocument/onTypeFormatting";
			DocumentOnTypeFormattingRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
			DocumentOnTypeFormattingRequest2.type = new messages_1.ProtocolRequestType(DocumentOnTypeFormattingRequest2.method);
		})(
			DocumentOnTypeFormattingRequest || (exports2.DocumentOnTypeFormattingRequest = DocumentOnTypeFormattingRequest = {}),
		);
		var PrepareSupportDefaultBehavior;
		(function (PrepareSupportDefaultBehavior2) {
			PrepareSupportDefaultBehavior2.Identifier = 1;
		})(PrepareSupportDefaultBehavior || (exports2.PrepareSupportDefaultBehavior = PrepareSupportDefaultBehavior = {}));
		var RenameRequest;
		(function (RenameRequest2) {
			RenameRequest2.method = "textDocument/rename";
			RenameRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
			RenameRequest2.type = new messages_1.ProtocolRequestType(RenameRequest2.method);
		})(RenameRequest || (exports2.RenameRequest = RenameRequest = {}));
		var PrepareRenameRequest;
		(function (PrepareRenameRequest2) {
			PrepareRenameRequest2.method = "textDocument/prepareRename";
			PrepareRenameRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
			PrepareRenameRequest2.type = new messages_1.ProtocolRequestType(PrepareRenameRequest2.method);
		})(PrepareRenameRequest || (exports2.PrepareRenameRequest = PrepareRenameRequest = {}));
		var ExecuteCommandRequest;
		(function (ExecuteCommandRequest2) {
			ExecuteCommandRequest2.method = "workspace/executeCommand";
			ExecuteCommandRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
			ExecuteCommandRequest2.type = new messages_1.ProtocolRequestType(ExecuteCommandRequest2.method);
		})(ExecuteCommandRequest || (exports2.ExecuteCommandRequest = ExecuteCommandRequest = {}));
		var ApplyWorkspaceEditRequest;
		(function (ApplyWorkspaceEditRequest2) {
			ApplyWorkspaceEditRequest2.method = "workspace/applyEdit";
			ApplyWorkspaceEditRequest2.messageDirection = messages_1.MessageDirection.serverToClient;
			ApplyWorkspaceEditRequest2.type = new messages_1.ProtocolRequestType("workspace/applyEdit");
		})(ApplyWorkspaceEditRequest || (exports2.ApplyWorkspaceEditRequest = ApplyWorkspaceEditRequest = {}));
	},
});

// ../../../node_modules/.pnpm/vscode-languageserver-protocol@3.17.5/node_modules/vscode-languageserver-protocol/lib/common/connection.js
var require_connection2 = __commonJS({
	"../../../node_modules/.pnpm/vscode-languageserver-protocol@3.17.5/node_modules/vscode-languageserver-protocol/lib/common/connection.js"(
		exports2,
	) {
		"use strict";
		init_cjs_shims();
		Object.defineProperty(exports2, "__esModule", {
			value: true,
		});
		exports2.createProtocolConnection = void 0;
		var vscode_jsonrpc_1 = require_main();
		function createProtocolConnection(input, output, logger, options) {
			if (vscode_jsonrpc_1.ConnectionStrategy.is(options)) {
				options = {
					connectionStrategy: options,
				};
			}
			return (0, vscode_jsonrpc_1.createMessageConnection)(input, output, logger, options);
		}
		__name(createProtocolConnection, "createProtocolConnection");
		exports2.createProtocolConnection = createProtocolConnection;
	},
});

// ../../../node_modules/.pnpm/vscode-languageserver-protocol@3.17.5/node_modules/vscode-languageserver-protocol/lib/common/api.js
var require_api2 = __commonJS({
	"../../../node_modules/.pnpm/vscode-languageserver-protocol@3.17.5/node_modules/vscode-languageserver-protocol/lib/common/api.js"(
		exports2,
	) {
		"use strict";
		init_cjs_shims();
		var __createBinding =
			(exports2 && exports2.__createBinding) ||
			(Object.create
				? function (o, m, k, k2) {
						if (k2 === void 0) k2 = k;
						var desc = Object.getOwnPropertyDescriptor(m, k);
						if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
							desc = {
								enumerable: true,
								get: /* @__PURE__ */ __name(function () {
									return m[k];
								}, "get"),
							};
						}
						Object.defineProperty(o, k2, desc);
					}
				: function (o, m, k, k2) {
						if (k2 === void 0) k2 = k;
						o[k2] = m[k];
					});
		var __exportStar =
			(exports2 && exports2.__exportStar) ||
			function (m, exports1) {
				for (var p in m)
					if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports1, p)) __createBinding(exports1, m, p);
			};
		Object.defineProperty(exports2, "__esModule", {
			value: true,
		});
		exports2.LSPErrorCodes = exports2.createProtocolConnection = void 0;
		__exportStar(require_main(), exports2);
		__exportStar(require_main2(), exports2);
		__exportStar(require_messages2(), exports2);
		__exportStar(require_protocol(), exports2);
		var connection_1 = require_connection2();
		Object.defineProperty(exports2, "createProtocolConnection", {
			enumerable: true,
			get: /* @__PURE__ */ __name(function () {
				return connection_1.createProtocolConnection;
			}, "get"),
		});
		var LSPErrorCodes;
		(function (LSPErrorCodes2) {
			LSPErrorCodes2.lspReservedErrorRangeStart = -32899;
			LSPErrorCodes2.RequestFailed = -32803;
			LSPErrorCodes2.ServerCancelled = -32802;
			LSPErrorCodes2.ContentModified = -32801;
			LSPErrorCodes2.RequestCancelled = -32800;
			LSPErrorCodes2.lspReservedErrorRangeEnd = -32800;
		})(LSPErrorCodes || (exports2.LSPErrorCodes = LSPErrorCodes = {}));
	},
});

// ../../../node_modules/.pnpm/vscode-languageserver-protocol@3.17.5/node_modules/vscode-languageserver-protocol/lib/node/main.js
var require_main3 = __commonJS({
	"../../../node_modules/.pnpm/vscode-languageserver-protocol@3.17.5/node_modules/vscode-languageserver-protocol/lib/node/main.js"(
		exports2,
	) {
		"use strict";
		init_cjs_shims();
		var __createBinding =
			(exports2 && exports2.__createBinding) ||
			(Object.create
				? function (o, m, k, k2) {
						if (k2 === void 0) k2 = k;
						var desc = Object.getOwnPropertyDescriptor(m, k);
						if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
							desc = {
								enumerable: true,
								get: /* @__PURE__ */ __name(function () {
									return m[k];
								}, "get"),
							};
						}
						Object.defineProperty(o, k2, desc);
					}
				: function (o, m, k, k2) {
						if (k2 === void 0) k2 = k;
						o[k2] = m[k];
					});
		var __exportStar =
			(exports2 && exports2.__exportStar) ||
			function (m, exports1) {
				for (var p in m)
					if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports1, p)) __createBinding(exports1, m, p);
			};
		Object.defineProperty(exports2, "__esModule", {
			value: true,
		});
		exports2.createProtocolConnection = void 0;
		var node_1 = require_node();
		__exportStar(require_node(), exports2);
		__exportStar(require_api2(), exports2);
		function createProtocolConnection(input, output, logger, options) {
			return (0, node_1.createMessageConnection)(input, output, logger, options);
		}
		__name(createProtocolConnection, "createProtocolConnection");
		exports2.createProtocolConnection = createProtocolConnection;
	},
});

// ../../../node_modules/.pnpm/vscode-languageserver@9.0.1/node_modules/vscode-languageserver/lib/common/utils/uuid.js
var require_uuid = __commonJS({
	"../../../node_modules/.pnpm/vscode-languageserver@9.0.1/node_modules/vscode-languageserver/lib/common/utils/uuid.js"(
		exports2,
	) {
		"use strict";
		init_cjs_shims();
		Object.defineProperty(exports2, "__esModule", {
			value: true,
		});
		exports2.generateUuid = exports2.parse = exports2.isUUID = exports2.v4 = exports2.empty = void 0;
		var ValueUUID = class ValueUUID {
			static {
				__name(this, "ValueUUID");
			}
			constructor(_value) {
				this._value = _value;
			}
			asHex() {
				return this._value;
			}
			equals(other) {
				return this.asHex() === other.asHex();
			}
		};
		var V4UUID = class V4UUID2 extends ValueUUID {
			static {
				__name(this, "V4UUID");
			}
			static _oneOf(array) {
				return array[Math.floor(array.length * Math.random())];
			}
			static _randomHex() {
				return V4UUID2._oneOf(V4UUID2._chars);
			}
			constructor() {
				super(
					[
						V4UUID2._randomHex(),
						V4UUID2._randomHex(),
						V4UUID2._randomHex(),
						V4UUID2._randomHex(),
						V4UUID2._randomHex(),
						V4UUID2._randomHex(),
						V4UUID2._randomHex(),
						V4UUID2._randomHex(),
						"-",
						V4UUID2._randomHex(),
						V4UUID2._randomHex(),
						V4UUID2._randomHex(),
						V4UUID2._randomHex(),
						"-",
						"4",
						V4UUID2._randomHex(),
						V4UUID2._randomHex(),
						V4UUID2._randomHex(),
						"-",
						V4UUID2._oneOf(V4UUID2._timeHighBits),
						V4UUID2._randomHex(),
						V4UUID2._randomHex(),
						V4UUID2._randomHex(),
						"-",
						V4UUID2._randomHex(),
						V4UUID2._randomHex(),
						V4UUID2._randomHex(),
						V4UUID2._randomHex(),
						V4UUID2._randomHex(),
						V4UUID2._randomHex(),
						V4UUID2._randomHex(),
						V4UUID2._randomHex(),
						V4UUID2._randomHex(),
						V4UUID2._randomHex(),
						V4UUID2._randomHex(),
						V4UUID2._randomHex(),
					].join(""),
				);
			}
		};
		V4UUID._chars = ["0", "1", "2", "3", "4", "5", "6", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];
		V4UUID._timeHighBits = ["8", "9", "a", "b"];
		exports2.empty = new ValueUUID("00000000-0000-0000-0000-000000000000");
		function v4() {
			return new V4UUID();
		}
		__name(v4, "v4");
		exports2.v4 = v4;
		var _UUIDPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
		function isUUID(value) {
			return _UUIDPattern.test(value);
		}
		__name(isUUID, "isUUID");
		exports2.isUUID = isUUID;
		function parse4(value) {
			if (!isUUID(value)) {
				throw new Error("invalid uuid");
			}
			return new ValueUUID(value);
		}
		__name(parse4, "parse");
		exports2.parse = parse4;
		function generateUuid() {
			return v4().asHex();
		}
		__name(generateUuid, "generateUuid");
		exports2.generateUuid = generateUuid;
	},
});

// ../../../node_modules/.pnpm/vscode-languageserver@9.0.1/node_modules/vscode-languageserver/lib/common/progress.js
var require_progress = __commonJS({
	"../../../node_modules/.pnpm/vscode-languageserver@9.0.1/node_modules/vscode-languageserver/lib/common/progress.js"(
		exports2,
	) {
		"use strict";
		init_cjs_shims();
		Object.defineProperty(exports2, "__esModule", {
			value: true,
		});
		exports2.attachPartialResult = exports2.ProgressFeature = exports2.attachWorkDone = void 0;
		var vscode_languageserver_protocol_1 = require_main3();
		var uuid_1 = require_uuid();
		var WorkDoneProgressReporterImpl = class WorkDoneProgressReporterImpl2 {
			static {
				__name(this, "WorkDoneProgressReporterImpl");
			}
			constructor(_connection, _token) {
				this._connection = _connection;
				this._token = _token;
				WorkDoneProgressReporterImpl2.Instances.set(this._token, this);
			}
			begin(title, percentage, message, cancellable) {
				let param = {
					kind: "begin",
					title,
					percentage,
					message,
					cancellable,
				};
				this._connection.sendProgress(vscode_languageserver_protocol_1.WorkDoneProgress.type, this._token, param);
			}
			report(arg0, arg1) {
				let param = {
					kind: "report",
				};
				if (typeof arg0 === "number") {
					param.percentage = arg0;
					if (arg1 !== void 0) {
						param.message = arg1;
					}
				} else {
					param.message = arg0;
				}
				this._connection.sendProgress(vscode_languageserver_protocol_1.WorkDoneProgress.type, this._token, param);
			}
			done() {
				WorkDoneProgressReporterImpl2.Instances.delete(this._token);
				this._connection.sendProgress(vscode_languageserver_protocol_1.WorkDoneProgress.type, this._token, {
					kind: "end",
				});
			}
		};
		WorkDoneProgressReporterImpl.Instances = /* @__PURE__ */ new Map();
		var WorkDoneProgressServerReporterImpl = class WorkDoneProgressServerReporterImpl extends WorkDoneProgressReporterImpl {
			static {
				__name(this, "WorkDoneProgressServerReporterImpl");
			}
			constructor(connection2, token) {
				super(connection2, token);
				this._source = new vscode_languageserver_protocol_1.CancellationTokenSource();
			}
			get token() {
				return this._source.token;
			}
			done() {
				this._source.dispose();
				super.done();
			}
			cancel() {
				this._source.cancel();
			}
		};
		var NullProgressReporter = class NullProgressReporter {
			static {
				__name(this, "NullProgressReporter");
			}
			constructor() {}
			begin() {}
			report() {}
			done() {}
		};
		var NullProgressServerReporter = class NullProgressServerReporter extends NullProgressReporter {
			static {
				__name(this, "NullProgressServerReporter");
			}
			constructor() {
				super();
				this._source = new vscode_languageserver_protocol_1.CancellationTokenSource();
			}
			get token() {
				return this._source.token;
			}
			done() {
				this._source.dispose();
			}
			cancel() {
				this._source.cancel();
			}
		};
		function attachWorkDone(connection2, params) {
			if (params === void 0 || params.workDoneToken === void 0) {
				return new NullProgressReporter();
			}
			const token = params.workDoneToken;
			delete params.workDoneToken;
			return new WorkDoneProgressReporterImpl(connection2, token);
		}
		__name(attachWorkDone, "attachWorkDone");
		exports2.attachWorkDone = attachWorkDone;
		var ProgressFeature = /* @__PURE__ */ __name((Base) => {
			return class extends Base {
				constructor() {
					super();
					this._progressSupported = false;
				}
				initialize(capabilities) {
					super.initialize(capabilities);
					if (capabilities?.window?.workDoneProgress === true) {
						this._progressSupported = true;
						this.connection.onNotification(
							vscode_languageserver_protocol_1.WorkDoneProgressCancelNotification.type,
							(params) => {
								let progress = WorkDoneProgressReporterImpl.Instances.get(params.token);
								if (progress instanceof WorkDoneProgressServerReporterImpl || progress instanceof NullProgressServerReporter) {
									progress.cancel();
								}
							},
						);
					}
				}
				attachWorkDoneProgress(token) {
					if (token === void 0) {
						return new NullProgressReporter();
					} else {
						return new WorkDoneProgressReporterImpl(this.connection, token);
					}
				}
				createWorkDoneProgress() {
					if (this._progressSupported) {
						const token = (0, uuid_1.generateUuid)();
						return this.connection
							.sendRequest(vscode_languageserver_protocol_1.WorkDoneProgressCreateRequest.type, {
								token,
							})
							.then(() => {
								const result = new WorkDoneProgressServerReporterImpl(this.connection, token);
								return result;
							});
					} else {
						return Promise.resolve(new NullProgressServerReporter());
					}
				}
			};
		}, "ProgressFeature");
		exports2.ProgressFeature = ProgressFeature;
		var ResultProgress;
		(function (ResultProgress2) {
			ResultProgress2.type = new vscode_languageserver_protocol_1.ProgressType();
		})(ResultProgress || (ResultProgress = {}));
		var ResultProgressReporterImpl = class ResultProgressReporterImpl {
			static {
				__name(this, "ResultProgressReporterImpl");
			}
			constructor(_connection, _token) {
				this._connection = _connection;
				this._token = _token;
			}
			report(data) {
				this._connection.sendProgress(ResultProgress.type, this._token, data);
			}
		};
		function attachPartialResult(connection2, params) {
			if (params === void 0 || params.partialResultToken === void 0) {
				return void 0;
			}
			const token = params.partialResultToken;
			delete params.partialResultToken;
			return new ResultProgressReporterImpl(connection2, token);
		}
		__name(attachPartialResult, "attachPartialResult");
		exports2.attachPartialResult = attachPartialResult;
	},
});

// ../../../node_modules/.pnpm/vscode-languageserver@9.0.1/node_modules/vscode-languageserver/lib/common/configuration.js
var require_configuration = __commonJS({
	"../../../node_modules/.pnpm/vscode-languageserver@9.0.1/node_modules/vscode-languageserver/lib/common/configuration.js"(
		exports2,
	) {
		"use strict";
		init_cjs_shims();
		Object.defineProperty(exports2, "__esModule", {
			value: true,
		});
		exports2.ConfigurationFeature = void 0;
		var vscode_languageserver_protocol_1 = require_main3();
		var Is2 = require_is();
		var ConfigurationFeature = /* @__PURE__ */ __name((Base) => {
			return class extends Base {
				getConfiguration(arg) {
					if (!arg) {
						return this._getConfiguration({});
					} else if (Is2.string(arg)) {
						return this._getConfiguration({
							section: arg,
						});
					} else {
						return this._getConfiguration(arg);
					}
				}
				_getConfiguration(arg) {
					let params = {
						items: Array.isArray(arg) ? arg : [arg],
					};
					return this.connection
						.sendRequest(vscode_languageserver_protocol_1.ConfigurationRequest.type, params)
						.then((result) => {
							if (Array.isArray(result)) {
								return Array.isArray(arg) ? result : result[0];
							} else {
								return Array.isArray(arg) ? [] : null;
							}
						});
				}
			};
		}, "ConfigurationFeature");
		exports2.ConfigurationFeature = ConfigurationFeature;
	},
});

// ../../../node_modules/.pnpm/vscode-languageserver@9.0.1/node_modules/vscode-languageserver/lib/common/workspaceFolder.js
var require_workspaceFolder = __commonJS({
	"../../../node_modules/.pnpm/vscode-languageserver@9.0.1/node_modules/vscode-languageserver/lib/common/workspaceFolder.js"(
		exports2,
	) {
		"use strict";
		init_cjs_shims();
		Object.defineProperty(exports2, "__esModule", {
			value: true,
		});
		exports2.WorkspaceFoldersFeature = void 0;
		var vscode_languageserver_protocol_1 = require_main3();
		var WorkspaceFoldersFeature = /* @__PURE__ */ __name((Base) => {
			return class extends Base {
				constructor() {
					super();
					this._notificationIsAutoRegistered = false;
				}
				initialize(capabilities) {
					super.initialize(capabilities);
					let workspaceCapabilities = capabilities.workspace;
					if (workspaceCapabilities && workspaceCapabilities.workspaceFolders) {
						this._onDidChangeWorkspaceFolders = new vscode_languageserver_protocol_1.Emitter();
						this.connection.onNotification(
							vscode_languageserver_protocol_1.DidChangeWorkspaceFoldersNotification.type,
							(params) => {
								this._onDidChangeWorkspaceFolders.fire(params.event);
							},
						);
					}
				}
				fillServerCapabilities(capabilities) {
					super.fillServerCapabilities(capabilities);
					const changeNotifications = capabilities.workspace?.workspaceFolders?.changeNotifications;
					this._notificationIsAutoRegistered = changeNotifications === true || typeof changeNotifications === "string";
				}
				getWorkspaceFolders() {
					return this.connection.sendRequest(vscode_languageserver_protocol_1.WorkspaceFoldersRequest.type);
				}
				get onDidChangeWorkspaceFolders() {
					if (!this._onDidChangeWorkspaceFolders) {
						throw new Error("Client doesn't support sending workspace folder change events.");
					}
					if (!this._notificationIsAutoRegistered && !this._unregistration) {
						this._unregistration = this.connection.client.register(
							vscode_languageserver_protocol_1.DidChangeWorkspaceFoldersNotification.type,
						);
					}
					return this._onDidChangeWorkspaceFolders.event;
				}
			};
		}, "WorkspaceFoldersFeature");
		exports2.WorkspaceFoldersFeature = WorkspaceFoldersFeature;
	},
});

// ../../../node_modules/.pnpm/vscode-languageserver@9.0.1/node_modules/vscode-languageserver/lib/common/callHierarchy.js
var require_callHierarchy = __commonJS({
	"../../../node_modules/.pnpm/vscode-languageserver@9.0.1/node_modules/vscode-languageserver/lib/common/callHierarchy.js"(
		exports2,
	) {
		"use strict";
		init_cjs_shims();
		Object.defineProperty(exports2, "__esModule", {
			value: true,
		});
		exports2.CallHierarchyFeature = void 0;
		var vscode_languageserver_protocol_1 = require_main3();
		var CallHierarchyFeature = /* @__PURE__ */ __name((Base) => {
			return class extends Base {
				get callHierarchy() {
					return {
						onPrepare: /* @__PURE__ */ __name((handler) => {
							return this.connection.onRequest(
								vscode_languageserver_protocol_1.CallHierarchyPrepareRequest.type,
								(params, cancel) => {
									return handler(params, cancel, this.attachWorkDoneProgress(params), void 0);
								},
							);
						}, "onPrepare"),
						onIncomingCalls: /* @__PURE__ */ __name((handler) => {
							const type = vscode_languageserver_protocol_1.CallHierarchyIncomingCallsRequest.type;
							return this.connection.onRequest(type, (params, cancel) => {
								return handler(
									params,
									cancel,
									this.attachWorkDoneProgress(params),
									this.attachPartialResultProgress(type, params),
								);
							});
						}, "onIncomingCalls"),
						onOutgoingCalls: /* @__PURE__ */ __name((handler) => {
							const type = vscode_languageserver_protocol_1.CallHierarchyOutgoingCallsRequest.type;
							return this.connection.onRequest(type, (params, cancel) => {
								return handler(
									params,
									cancel,
									this.attachWorkDoneProgress(params),
									this.attachPartialResultProgress(type, params),
								);
							});
						}, "onOutgoingCalls"),
					};
				}
			};
		}, "CallHierarchyFeature");
		exports2.CallHierarchyFeature = CallHierarchyFeature;
	},
});

// ../../../node_modules/.pnpm/vscode-languageserver@9.0.1/node_modules/vscode-languageserver/lib/common/semanticTokens.js
var require_semanticTokens = __commonJS({
	"../../../node_modules/.pnpm/vscode-languageserver@9.0.1/node_modules/vscode-languageserver/lib/common/semanticTokens.js"(
		exports2,
	) {
		"use strict";
		init_cjs_shims();
		Object.defineProperty(exports2, "__esModule", {
			value: true,
		});
		exports2.SemanticTokensBuilder = exports2.SemanticTokensDiff = exports2.SemanticTokensFeature = void 0;
		var vscode_languageserver_protocol_1 = require_main3();
		var SemanticTokensFeature = /* @__PURE__ */ __name((Base) => {
			return class extends Base {
				get semanticTokens() {
					return {
						refresh: /* @__PURE__ */ __name(() => {
							return this.connection.sendRequest(vscode_languageserver_protocol_1.SemanticTokensRefreshRequest.type);
						}, "refresh"),
						on: /* @__PURE__ */ __name((handler) => {
							const type = vscode_languageserver_protocol_1.SemanticTokensRequest.type;
							return this.connection.onRequest(type, (params, cancel) => {
								return handler(
									params,
									cancel,
									this.attachWorkDoneProgress(params),
									this.attachPartialResultProgress(type, params),
								);
							});
						}, "on"),
						onDelta: /* @__PURE__ */ __name((handler) => {
							const type = vscode_languageserver_protocol_1.SemanticTokensDeltaRequest.type;
							return this.connection.onRequest(type, (params, cancel) => {
								return handler(
									params,
									cancel,
									this.attachWorkDoneProgress(params),
									this.attachPartialResultProgress(type, params),
								);
							});
						}, "onDelta"),
						onRange: /* @__PURE__ */ __name((handler) => {
							const type = vscode_languageserver_protocol_1.SemanticTokensRangeRequest.type;
							return this.connection.onRequest(type, (params, cancel) => {
								return handler(
									params,
									cancel,
									this.attachWorkDoneProgress(params),
									this.attachPartialResultProgress(type, params),
								);
							});
						}, "onRange"),
					};
				}
			};
		}, "SemanticTokensFeature");
		exports2.SemanticTokensFeature = SemanticTokensFeature;
		var SemanticTokensDiff = class SemanticTokensDiff {
			static {
				__name(this, "SemanticTokensDiff");
			}
			constructor(originalSequence, modifiedSequence) {
				this.originalSequence = originalSequence;
				this.modifiedSequence = modifiedSequence;
			}
			computeDiff() {
				const originalLength = this.originalSequence.length;
				const modifiedLength = this.modifiedSequence.length;
				let startIndex = 0;
				while (
					startIndex < modifiedLength &&
					startIndex < originalLength &&
					this.originalSequence[startIndex] === this.modifiedSequence[startIndex]
				) {
					startIndex++;
				}
				if (startIndex < modifiedLength && startIndex < originalLength) {
					let originalEndIndex = originalLength - 1;
					let modifiedEndIndex = modifiedLength - 1;
					while (
						originalEndIndex >= startIndex &&
						modifiedEndIndex >= startIndex &&
						this.originalSequence[originalEndIndex] === this.modifiedSequence[modifiedEndIndex]
					) {
						originalEndIndex--;
						modifiedEndIndex--;
					}
					if (originalEndIndex < startIndex || modifiedEndIndex < startIndex) {
						originalEndIndex++;
						modifiedEndIndex++;
					}
					const deleteCount = originalEndIndex - startIndex + 1;
					const newData = this.modifiedSequence.slice(startIndex, modifiedEndIndex + 1);
					if (newData.length === 1 && newData[0] === this.originalSequence[originalEndIndex]) {
						return [
							{
								start: startIndex,
								deleteCount: deleteCount - 1,
							},
						];
					} else {
						return [
							{
								start: startIndex,
								deleteCount,
								data: newData,
							},
						];
					}
				} else if (startIndex < modifiedLength) {
					return [
						{
							start: startIndex,
							deleteCount: 0,
							data: this.modifiedSequence.slice(startIndex),
						},
					];
				} else if (startIndex < originalLength) {
					return [
						{
							start: startIndex,
							deleteCount: originalLength - startIndex,
						},
					];
				} else {
					return [];
				}
			}
		};
		exports2.SemanticTokensDiff = SemanticTokensDiff;
		var SemanticTokensBuilder2 = class SemanticTokensBuilder {
			static {
				__name(this, "SemanticTokensBuilder");
			}
			constructor() {
				this._prevData = void 0;
				this.initialize();
			}
			initialize() {
				this._id = Date.now();
				this._prevLine = 0;
				this._prevChar = 0;
				this._data = [];
				this._dataLen = 0;
			}
			push(line, char, length, tokenType, tokenModifiers) {
				let pushLine = line;
				let pushChar = char;
				if (this._dataLen > 0) {
					pushLine -= this._prevLine;
					if (pushLine === 0) {
						pushChar -= this._prevChar;
					}
				}
				this._data[this._dataLen++] = pushLine;
				this._data[this._dataLen++] = pushChar;
				this._data[this._dataLen++] = length;
				this._data[this._dataLen++] = tokenType;
				this._data[this._dataLen++] = tokenModifiers;
				this._prevLine = line;
				this._prevChar = char;
			}
			get id() {
				return this._id.toString();
			}
			previousResult(id) {
				if (this.id === id) {
					this._prevData = this._data;
				}
				this.initialize();
			}
			build() {
				this._prevData = void 0;
				return {
					resultId: this.id,
					data: this._data,
				};
			}
			canBuildEdits() {
				return this._prevData !== void 0;
			}
			buildEdits() {
				if (this._prevData !== void 0) {
					return {
						resultId: this.id,
						edits: new SemanticTokensDiff(this._prevData, this._data).computeDiff(),
					};
				} else {
					return this.build();
				}
			}
		};
		exports2.SemanticTokensBuilder = SemanticTokensBuilder2;
	},
});

// ../../../node_modules/.pnpm/vscode-languageserver@9.0.1/node_modules/vscode-languageserver/lib/common/showDocument.js
var require_showDocument = __commonJS({
	"../../../node_modules/.pnpm/vscode-languageserver@9.0.1/node_modules/vscode-languageserver/lib/common/showDocument.js"(
		exports2,
	) {
		"use strict";
		init_cjs_shims();
		Object.defineProperty(exports2, "__esModule", {
			value: true,
		});
		exports2.ShowDocumentFeature = void 0;
		var vscode_languageserver_protocol_1 = require_main3();
		var ShowDocumentFeature = /* @__PURE__ */ __name((Base) => {
			return class extends Base {
				showDocument(params) {
					return this.connection.sendRequest(vscode_languageserver_protocol_1.ShowDocumentRequest.type, params);
				}
			};
		}, "ShowDocumentFeature");
		exports2.ShowDocumentFeature = ShowDocumentFeature;
	},
});

// ../../../node_modules/.pnpm/vscode-languageserver@9.0.1/node_modules/vscode-languageserver/lib/common/fileOperations.js
var require_fileOperations = __commonJS({
	"../../../node_modules/.pnpm/vscode-languageserver@9.0.1/node_modules/vscode-languageserver/lib/common/fileOperations.js"(
		exports2,
	) {
		"use strict";
		init_cjs_shims();
		Object.defineProperty(exports2, "__esModule", {
			value: true,
		});
		exports2.FileOperationsFeature = void 0;
		var vscode_languageserver_protocol_1 = require_main3();
		var FileOperationsFeature = /* @__PURE__ */ __name((Base) => {
			return class extends Base {
				onDidCreateFiles(handler) {
					return this.connection.onNotification(
						vscode_languageserver_protocol_1.DidCreateFilesNotification.type,
						(params) => {
							handler(params);
						},
					);
				}
				onDidRenameFiles(handler) {
					return this.connection.onNotification(
						vscode_languageserver_protocol_1.DidRenameFilesNotification.type,
						(params) => {
							handler(params);
						},
					);
				}
				onDidDeleteFiles(handler) {
					return this.connection.onNotification(
						vscode_languageserver_protocol_1.DidDeleteFilesNotification.type,
						(params) => {
							handler(params);
						},
					);
				}
				onWillCreateFiles(handler) {
					return this.connection.onRequest(
						vscode_languageserver_protocol_1.WillCreateFilesRequest.type,
						(params, cancel) => {
							return handler(params, cancel);
						},
					);
				}
				onWillRenameFiles(handler) {
					return this.connection.onRequest(
						vscode_languageserver_protocol_1.WillRenameFilesRequest.type,
						(params, cancel) => {
							return handler(params, cancel);
						},
					);
				}
				onWillDeleteFiles(handler) {
					return this.connection.onRequest(
						vscode_languageserver_protocol_1.WillDeleteFilesRequest.type,
						(params, cancel) => {
							return handler(params, cancel);
						},
					);
				}
			};
		}, "FileOperationsFeature");
		exports2.FileOperationsFeature = FileOperationsFeature;
	},
});

// ../../../node_modules/.pnpm/vscode-languageserver@9.0.1/node_modules/vscode-languageserver/lib/common/linkedEditingRange.js
var require_linkedEditingRange = __commonJS({
	"../../../node_modules/.pnpm/vscode-languageserver@9.0.1/node_modules/vscode-languageserver/lib/common/linkedEditingRange.js"(
		exports2,
	) {
		"use strict";
		init_cjs_shims();
		Object.defineProperty(exports2, "__esModule", {
			value: true,
		});
		exports2.LinkedEditingRangeFeature = void 0;
		var vscode_languageserver_protocol_1 = require_main3();
		var LinkedEditingRangeFeature = /* @__PURE__ */ __name((Base) => {
			return class extends Base {
				onLinkedEditingRange(handler) {
					return this.connection.onRequest(
						vscode_languageserver_protocol_1.LinkedEditingRangeRequest.type,
						(params, cancel) => {
							return handler(params, cancel, this.attachWorkDoneProgress(params), void 0);
						},
					);
				}
			};
		}, "LinkedEditingRangeFeature");
		exports2.LinkedEditingRangeFeature = LinkedEditingRangeFeature;
	},
});

// ../../../node_modules/.pnpm/vscode-languageserver@9.0.1/node_modules/vscode-languageserver/lib/common/typeHierarchy.js
var require_typeHierarchy = __commonJS({
	"../../../node_modules/.pnpm/vscode-languageserver@9.0.1/node_modules/vscode-languageserver/lib/common/typeHierarchy.js"(
		exports2,
	) {
		"use strict";
		init_cjs_shims();
		Object.defineProperty(exports2, "__esModule", {
			value: true,
		});
		exports2.TypeHierarchyFeature = void 0;
		var vscode_languageserver_protocol_1 = require_main3();
		var TypeHierarchyFeature = /* @__PURE__ */ __name((Base) => {
			return class extends Base {
				get typeHierarchy() {
					return {
						onPrepare: /* @__PURE__ */ __name((handler) => {
							return this.connection.onRequest(
								vscode_languageserver_protocol_1.TypeHierarchyPrepareRequest.type,
								(params, cancel) => {
									return handler(params, cancel, this.attachWorkDoneProgress(params), void 0);
								},
							);
						}, "onPrepare"),
						onSupertypes: /* @__PURE__ */ __name((handler) => {
							const type = vscode_languageserver_protocol_1.TypeHierarchySupertypesRequest.type;
							return this.connection.onRequest(type, (params, cancel) => {
								return handler(
									params,
									cancel,
									this.attachWorkDoneProgress(params),
									this.attachPartialResultProgress(type, params),
								);
							});
						}, "onSupertypes"),
						onSubtypes: /* @__PURE__ */ __name((handler) => {
							const type = vscode_languageserver_protocol_1.TypeHierarchySubtypesRequest.type;
							return this.connection.onRequest(type, (params, cancel) => {
								return handler(
									params,
									cancel,
									this.attachWorkDoneProgress(params),
									this.attachPartialResultProgress(type, params),
								);
							});
						}, "onSubtypes"),
					};
				}
			};
		}, "TypeHierarchyFeature");
		exports2.TypeHierarchyFeature = TypeHierarchyFeature;
	},
});

// ../../../node_modules/.pnpm/vscode-languageserver@9.0.1/node_modules/vscode-languageserver/lib/common/inlineValue.js
var require_inlineValue = __commonJS({
	"../../../node_modules/.pnpm/vscode-languageserver@9.0.1/node_modules/vscode-languageserver/lib/common/inlineValue.js"(
		exports2,
	) {
		"use strict";
		init_cjs_shims();
		Object.defineProperty(exports2, "__esModule", {
			value: true,
		});
		exports2.InlineValueFeature = void 0;
		var vscode_languageserver_protocol_1 = require_main3();
		var InlineValueFeature = /* @__PURE__ */ __name((Base) => {
			return class extends Base {
				get inlineValue() {
					return {
						refresh: /* @__PURE__ */ __name(() => {
							return this.connection.sendRequest(vscode_languageserver_protocol_1.InlineValueRefreshRequest.type);
						}, "refresh"),
						on: /* @__PURE__ */ __name((handler) => {
							return this.connection.onRequest(vscode_languageserver_protocol_1.InlineValueRequest.type, (params, cancel) => {
								return handler(params, cancel, this.attachWorkDoneProgress(params));
							});
						}, "on"),
					};
				}
			};
		}, "InlineValueFeature");
		exports2.InlineValueFeature = InlineValueFeature;
	},
});

// ../../../node_modules/.pnpm/vscode-languageserver@9.0.1/node_modules/vscode-languageserver/lib/common/foldingRange.js
var require_foldingRange = __commonJS({
	"../../../node_modules/.pnpm/vscode-languageserver@9.0.1/node_modules/vscode-languageserver/lib/common/foldingRange.js"(
		exports2,
	) {
		"use strict";
		init_cjs_shims();
		Object.defineProperty(exports2, "__esModule", {
			value: true,
		});
		exports2.FoldingRangeFeature = void 0;
		var vscode_languageserver_protocol_1 = require_main3();
		var FoldingRangeFeature = /* @__PURE__ */ __name((Base) => {
			return class extends Base {
				get foldingRange() {
					return {
						refresh: /* @__PURE__ */ __name(() => {
							return this.connection.sendRequest(vscode_languageserver_protocol_1.FoldingRangeRefreshRequest.type);
						}, "refresh"),
						on: /* @__PURE__ */ __name((handler) => {
							const type = vscode_languageserver_protocol_1.FoldingRangeRequest.type;
							return this.connection.onRequest(type, (params, cancel) => {
								return handler(
									params,
									cancel,
									this.attachWorkDoneProgress(params),
									this.attachPartialResultProgress(type, params),
								);
							});
						}, "on"),
					};
				}
			};
		}, "FoldingRangeFeature");
		exports2.FoldingRangeFeature = FoldingRangeFeature;
	},
});

// ../../../node_modules/.pnpm/vscode-languageserver@9.0.1/node_modules/vscode-languageserver/lib/common/inlayHint.js
var require_inlayHint = __commonJS({
	"../../../node_modules/.pnpm/vscode-languageserver@9.0.1/node_modules/vscode-languageserver/lib/common/inlayHint.js"(
		exports2,
	) {
		"use strict";
		init_cjs_shims();
		Object.defineProperty(exports2, "__esModule", {
			value: true,
		});
		exports2.InlayHintFeature = void 0;
		var vscode_languageserver_protocol_1 = require_main3();
		var InlayHintFeature = /* @__PURE__ */ __name((Base) => {
			return class extends Base {
				get inlayHint() {
					return {
						refresh: /* @__PURE__ */ __name(() => {
							return this.connection.sendRequest(vscode_languageserver_protocol_1.InlayHintRefreshRequest.type);
						}, "refresh"),
						on: /* @__PURE__ */ __name((handler) => {
							return this.connection.onRequest(vscode_languageserver_protocol_1.InlayHintRequest.type, (params, cancel) => {
								return handler(params, cancel, this.attachWorkDoneProgress(params));
							});
						}, "on"),
						resolve: /* @__PURE__ */ __name((handler) => {
							return this.connection.onRequest(
								vscode_languageserver_protocol_1.InlayHintResolveRequest.type,
								(params, cancel) => {
									return handler(params, cancel);
								},
							);
						}, "resolve"),
					};
				}
			};
		}, "InlayHintFeature");
		exports2.InlayHintFeature = InlayHintFeature;
	},
});

// ../../../node_modules/.pnpm/vscode-languageserver@9.0.1/node_modules/vscode-languageserver/lib/common/diagnostic.js
var require_diagnostic = __commonJS({
	"../../../node_modules/.pnpm/vscode-languageserver@9.0.1/node_modules/vscode-languageserver/lib/common/diagnostic.js"(
		exports2,
	) {
		"use strict";
		init_cjs_shims();
		Object.defineProperty(exports2, "__esModule", {
			value: true,
		});
		exports2.DiagnosticFeature = void 0;
		var vscode_languageserver_protocol_1 = require_main3();
		var DiagnosticFeature = /* @__PURE__ */ __name((Base) => {
			return class extends Base {
				get diagnostics() {
					return {
						refresh: /* @__PURE__ */ __name(() => {
							return this.connection.sendRequest(vscode_languageserver_protocol_1.DiagnosticRefreshRequest.type);
						}, "refresh"),
						on: /* @__PURE__ */ __name((handler) => {
							return this.connection.onRequest(
								vscode_languageserver_protocol_1.DocumentDiagnosticRequest.type,
								(params, cancel) => {
									return handler(
										params,
										cancel,
										this.attachWorkDoneProgress(params),
										this.attachPartialResultProgress(
											vscode_languageserver_protocol_1.DocumentDiagnosticRequest.partialResult,
											params,
										),
									);
								},
							);
						}, "on"),
						onWorkspace: /* @__PURE__ */ __name((handler) => {
							return this.connection.onRequest(
								vscode_languageserver_protocol_1.WorkspaceDiagnosticRequest.type,
								(params, cancel) => {
									return handler(
										params,
										cancel,
										this.attachWorkDoneProgress(params),
										this.attachPartialResultProgress(
											vscode_languageserver_protocol_1.WorkspaceDiagnosticRequest.partialResult,
											params,
										),
									);
								},
							);
						}, "onWorkspace"),
					};
				}
			};
		}, "DiagnosticFeature");
		exports2.DiagnosticFeature = DiagnosticFeature;
	},
});

// ../../../node_modules/.pnpm/vscode-languageserver@9.0.1/node_modules/vscode-languageserver/lib/common/textDocuments.js
var require_textDocuments = __commonJS({
	"../../../node_modules/.pnpm/vscode-languageserver@9.0.1/node_modules/vscode-languageserver/lib/common/textDocuments.js"(
		exports2,
	) {
		"use strict";
		init_cjs_shims();
		Object.defineProperty(exports2, "__esModule", {
			value: true,
		});
		exports2.TextDocuments = void 0;
		var vscode_languageserver_protocol_1 = require_main3();
		var TextDocuments2 = class TextDocuments {
			static {
				__name(this, "TextDocuments");
			}
			/**
			 * Create a new text document manager.
			 */
			constructor(configuration) {
				this._configuration = configuration;
				this._syncedDocuments = /* @__PURE__ */ new Map();
				this._onDidChangeContent = new vscode_languageserver_protocol_1.Emitter();
				this._onDidOpen = new vscode_languageserver_protocol_1.Emitter();
				this._onDidClose = new vscode_languageserver_protocol_1.Emitter();
				this._onDidSave = new vscode_languageserver_protocol_1.Emitter();
				this._onWillSave = new vscode_languageserver_protocol_1.Emitter();
			}
			/**
			 * An event that fires when a text document managed by this manager
			 * has been opened.
			 */
			get onDidOpen() {
				return this._onDidOpen.event;
			}
			/**
			 * An event that fires when a text document managed by this manager
			 * has been opened or the content changes.
			 */
			get onDidChangeContent() {
				return this._onDidChangeContent.event;
			}
			/**
			 * An event that fires when a text document managed by this manager
			 * will be saved.
			 */
			get onWillSave() {
				return this._onWillSave.event;
			}
			/**
			 * Sets a handler that will be called if a participant wants to provide
			 * edits during a text document save.
			 */
			onWillSaveWaitUntil(handler) {
				this._willSaveWaitUntil = handler;
			}
			/**
			 * An event that fires when a text document managed by this manager
			 * has been saved.
			 */
			get onDidSave() {
				return this._onDidSave.event;
			}
			/**
			 * An event that fires when a text document managed by this manager
			 * has been closed.
			 */
			get onDidClose() {
				return this._onDidClose.event;
			}
			/**
			 * Returns the document for the given URI. Returns undefined if
			 * the document is not managed by this instance.
			 *
			 * @param uri The text document's URI to retrieve.
			 * @return the text document or `undefined`.
			 */
			get(uri) {
				return this._syncedDocuments.get(uri);
			}
			/**
			 * Returns all text documents managed by this instance.
			 *
			 * @return all text documents.
			 */
			all() {
				return Array.from(this._syncedDocuments.values());
			}
			/**
			 * Returns the URIs of all text documents managed by this instance.
			 *
			 * @return the URI's of all text documents.
			 */
			keys() {
				return Array.from(this._syncedDocuments.keys());
			}
			/**
			 * Listens for `low level` notification on the given connection to
			 * update the text documents managed by this instance.
			 *
			 * Please note that the connection only provides handlers not an event model. Therefore
			 * listening on a connection will overwrite the following handlers on a connection:
			 * `onDidOpenTextDocument`, `onDidChangeTextDocument`, `onDidCloseTextDocument`,
			 * `onWillSaveTextDocument`, `onWillSaveTextDocumentWaitUntil` and `onDidSaveTextDocument`.
			 *
			 * Use the corresponding events on the TextDocuments instance instead.
			 *
			 * @param connection The connection to listen on.
			 */
			listen(connection2) {
				connection2.__textDocumentSync = vscode_languageserver_protocol_1.TextDocumentSyncKind.Incremental;
				const disposables = [];
				disposables.push(
					connection2.onDidOpenTextDocument((event) => {
						const td = event.textDocument;
						const document2 = this._configuration.create(td.uri, td.languageId, td.version, td.text);
						this._syncedDocuments.set(td.uri, document2);
						const toFire = Object.freeze({
							document: document2,
						});
						this._onDidOpen.fire(toFire);
						this._onDidChangeContent.fire(toFire);
					}),
				);
				disposables.push(
					connection2.onDidChangeTextDocument((event) => {
						const td = event.textDocument;
						const changes = event.contentChanges;
						if (changes.length === 0) {
							return;
						}
						const { version } = td;
						if (version === null || version === void 0) {
							throw new Error(`Received document change event for ${td.uri} without valid version identifier`);
						}
						let syncedDocument = this._syncedDocuments.get(td.uri);
						if (syncedDocument !== void 0) {
							syncedDocument = this._configuration.update(syncedDocument, changes, version);
							this._syncedDocuments.set(td.uri, syncedDocument);
							this._onDidChangeContent.fire(
								Object.freeze({
									document: syncedDocument,
								}),
							);
						}
					}),
				);
				disposables.push(
					connection2.onDidCloseTextDocument((event) => {
						let syncedDocument = this._syncedDocuments.get(event.textDocument.uri);
						if (syncedDocument !== void 0) {
							this._syncedDocuments.delete(event.textDocument.uri);
							this._onDidClose.fire(
								Object.freeze({
									document: syncedDocument,
								}),
							);
						}
					}),
				);
				disposables.push(
					connection2.onWillSaveTextDocument((event) => {
						let syncedDocument = this._syncedDocuments.get(event.textDocument.uri);
						if (syncedDocument !== void 0) {
							this._onWillSave.fire(
								Object.freeze({
									document: syncedDocument,
									reason: event.reason,
								}),
							);
						}
					}),
				);
				disposables.push(
					connection2.onWillSaveTextDocumentWaitUntil((event, token) => {
						let syncedDocument = this._syncedDocuments.get(event.textDocument.uri);
						if (syncedDocument !== void 0 && this._willSaveWaitUntil) {
							return this._willSaveWaitUntil(
								Object.freeze({
									document: syncedDocument,
									reason: event.reason,
								}),
								token,
							);
						} else {
							return [];
						}
					}),
				);
				disposables.push(
					connection2.onDidSaveTextDocument((event) => {
						let syncedDocument = this._syncedDocuments.get(event.textDocument.uri);
						if (syncedDocument !== void 0) {
							this._onDidSave.fire(
								Object.freeze({
									document: syncedDocument,
								}),
							);
						}
					}),
				);
				return vscode_languageserver_protocol_1.Disposable.create(() => {
					disposables.forEach((disposable) => disposable.dispose());
				});
			}
		};
		exports2.TextDocuments = TextDocuments2;
	},
});

// ../../../node_modules/.pnpm/vscode-languageserver@9.0.1/node_modules/vscode-languageserver/lib/common/notebook.js
var require_notebook = __commonJS({
	"../../../node_modules/.pnpm/vscode-languageserver@9.0.1/node_modules/vscode-languageserver/lib/common/notebook.js"(
		exports2,
	) {
		"use strict";
		init_cjs_shims();
		Object.defineProperty(exports2, "__esModule", {
			value: true,
		});
		exports2.NotebookDocuments = exports2.NotebookSyncFeature = void 0;
		var vscode_languageserver_protocol_1 = require_main3();
		var textDocuments_1 = require_textDocuments();
		var NotebookSyncFeature = /* @__PURE__ */ __name((Base) => {
			return class extends Base {
				get synchronization() {
					return {
						onDidOpenNotebookDocument: /* @__PURE__ */ __name((handler) => {
							return this.connection.onNotification(
								vscode_languageserver_protocol_1.DidOpenNotebookDocumentNotification.type,
								(params) => {
									handler(params);
								},
							);
						}, "onDidOpenNotebookDocument"),
						onDidChangeNotebookDocument: /* @__PURE__ */ __name((handler) => {
							return this.connection.onNotification(
								vscode_languageserver_protocol_1.DidChangeNotebookDocumentNotification.type,
								(params) => {
									handler(params);
								},
							);
						}, "onDidChangeNotebookDocument"),
						onDidSaveNotebookDocument: /* @__PURE__ */ __name((handler) => {
							return this.connection.onNotification(
								vscode_languageserver_protocol_1.DidSaveNotebookDocumentNotification.type,
								(params) => {
									handler(params);
								},
							);
						}, "onDidSaveNotebookDocument"),
						onDidCloseNotebookDocument: /* @__PURE__ */ __name((handler) => {
							return this.connection.onNotification(
								vscode_languageserver_protocol_1.DidCloseNotebookDocumentNotification.type,
								(params) => {
									handler(params);
								},
							);
						}, "onDidCloseNotebookDocument"),
					};
				}
			};
		}, "NotebookSyncFeature");
		exports2.NotebookSyncFeature = NotebookSyncFeature;
		var CellTextDocumentConnection = class CellTextDocumentConnection2 {
			static {
				__name(this, "CellTextDocumentConnection");
			}
			onDidOpenTextDocument(handler) {
				this.openHandler = handler;
				return vscode_languageserver_protocol_1.Disposable.create(() => {
					this.openHandler = void 0;
				});
			}
			openTextDocument(params) {
				this.openHandler && this.openHandler(params);
			}
			onDidChangeTextDocument(handler) {
				this.changeHandler = handler;
				return vscode_languageserver_protocol_1.Disposable.create(() => {
					this.changeHandler = handler;
				});
			}
			changeTextDocument(params) {
				this.changeHandler && this.changeHandler(params);
			}
			onDidCloseTextDocument(handler) {
				this.closeHandler = handler;
				return vscode_languageserver_protocol_1.Disposable.create(() => {
					this.closeHandler = void 0;
				});
			}
			closeTextDocument(params) {
				this.closeHandler && this.closeHandler(params);
			}
			onWillSaveTextDocument() {
				return CellTextDocumentConnection2.NULL_DISPOSE;
			}
			onWillSaveTextDocumentWaitUntil() {
				return CellTextDocumentConnection2.NULL_DISPOSE;
			}
			onDidSaveTextDocument() {
				return CellTextDocumentConnection2.NULL_DISPOSE;
			}
		};
		CellTextDocumentConnection.NULL_DISPOSE = Object.freeze({
			dispose: /* @__PURE__ */ __name(() => {}, "dispose"),
		});
		var NotebookDocuments = class NotebookDocuments {
			static {
				__name(this, "NotebookDocuments");
			}
			constructor(configurationOrTextDocuments) {
				if (configurationOrTextDocuments instanceof textDocuments_1.TextDocuments) {
					this._cellTextDocuments = configurationOrTextDocuments;
				} else {
					this._cellTextDocuments = new textDocuments_1.TextDocuments(configurationOrTextDocuments);
				}
				this.notebookDocuments = /* @__PURE__ */ new Map();
				this.notebookCellMap = /* @__PURE__ */ new Map();
				this._onDidOpen = new vscode_languageserver_protocol_1.Emitter();
				this._onDidChange = new vscode_languageserver_protocol_1.Emitter();
				this._onDidSave = new vscode_languageserver_protocol_1.Emitter();
				this._onDidClose = new vscode_languageserver_protocol_1.Emitter();
			}
			get cellTextDocuments() {
				return this._cellTextDocuments;
			}
			getCellTextDocument(cell) {
				return this._cellTextDocuments.get(cell.document);
			}
			getNotebookDocument(uri) {
				return this.notebookDocuments.get(uri);
			}
			getNotebookCell(uri) {
				const value = this.notebookCellMap.get(uri);
				return value && value[0];
			}
			findNotebookDocumentForCell(cell) {
				const key = typeof cell === "string" ? cell : cell.document;
				const value = this.notebookCellMap.get(key);
				return value && value[1];
			}
			get onDidOpen() {
				return this._onDidOpen.event;
			}
			get onDidSave() {
				return this._onDidSave.event;
			}
			get onDidChange() {
				return this._onDidChange.event;
			}
			get onDidClose() {
				return this._onDidClose.event;
			}
			/**
			 * Listens for `low level` notification on the given connection to
			 * update the notebook documents managed by this instance.
			 *
			 * Please note that the connection only provides handlers not an event model. Therefore
			 * listening on a connection will overwrite the following handlers on a connection:
			 * `onDidOpenNotebookDocument`, `onDidChangeNotebookDocument`, `onDidSaveNotebookDocument`,
			 *  and `onDidCloseNotebookDocument`.
			 *
			 * @param connection The connection to listen on.
			 */
			listen(connection2) {
				const cellTextDocumentConnection = new CellTextDocumentConnection();
				const disposables = [];
				disposables.push(this.cellTextDocuments.listen(cellTextDocumentConnection));
				disposables.push(
					connection2.notebooks.synchronization.onDidOpenNotebookDocument((params) => {
						this.notebookDocuments.set(params.notebookDocument.uri, params.notebookDocument);
						for (const cellTextDocument of params.cellTextDocuments) {
							cellTextDocumentConnection.openTextDocument({
								textDocument: cellTextDocument,
							});
						}
						this.updateCellMap(params.notebookDocument);
						this._onDidOpen.fire(params.notebookDocument);
					}),
				);
				disposables.push(
					connection2.notebooks.synchronization.onDidChangeNotebookDocument((params) => {
						const notebookDocument = this.notebookDocuments.get(params.notebookDocument.uri);
						if (notebookDocument === void 0) {
							return;
						}
						notebookDocument.version = params.notebookDocument.version;
						const oldMetadata = notebookDocument.metadata;
						let metadataChanged = false;
						const change = params.change;
						if (change.metadata !== void 0) {
							metadataChanged = true;
							notebookDocument.metadata = change.metadata;
						}
						const opened = [];
						const closed = [];
						const data = [];
						const text = [];
						if (change.cells !== void 0) {
							const changedCells = change.cells;
							if (changedCells.structure !== void 0) {
								const array = changedCells.structure.array;
								notebookDocument.cells.splice(array.start, array.deleteCount, ...(array.cells !== void 0 ? array.cells : []));
								if (changedCells.structure.didOpen !== void 0) {
									for (const open of changedCells.structure.didOpen) {
										cellTextDocumentConnection.openTextDocument({
											textDocument: open,
										});
										opened.push(open.uri);
									}
								}
								if (changedCells.structure.didClose) {
									for (const close of changedCells.structure.didClose) {
										cellTextDocumentConnection.closeTextDocument({
											textDocument: close,
										});
										closed.push(close.uri);
									}
								}
							}
							if (changedCells.data !== void 0) {
								const cellUpdates = new Map(changedCells.data.map((cell) => [cell.document, cell]));
								for (let i = 0; i <= notebookDocument.cells.length; i++) {
									const change2 = cellUpdates.get(notebookDocument.cells[i].document);
									if (change2 !== void 0) {
										const old = notebookDocument.cells.splice(i, 1, change2);
										data.push({
											old: old[0],
											new: change2,
										});
										cellUpdates.delete(change2.document);
										if (cellUpdates.size === 0) {
											break;
										}
									}
								}
							}
							if (changedCells.textContent !== void 0) {
								for (const cellTextDocument of changedCells.textContent) {
									cellTextDocumentConnection.changeTextDocument({
										textDocument: cellTextDocument.document,
										contentChanges: cellTextDocument.changes,
									});
									text.push(cellTextDocument.document.uri);
								}
							}
						}
						this.updateCellMap(notebookDocument);
						const changeEvent = {
							notebookDocument,
						};
						if (metadataChanged) {
							changeEvent.metadata = {
								old: oldMetadata,
								new: notebookDocument.metadata,
							};
						}
						const added = [];
						for (const open of opened) {
							added.push(this.getNotebookCell(open));
						}
						const removed = [];
						for (const close of closed) {
							removed.push(this.getNotebookCell(close));
						}
						const textContent = [];
						for (const change2 of text) {
							textContent.push(this.getNotebookCell(change2));
						}
						if (added.length > 0 || removed.length > 0 || data.length > 0 || textContent.length > 0) {
							changeEvent.cells = {
								added,
								removed,
								changed: {
									data,
									textContent,
								},
							};
						}
						if (changeEvent.metadata !== void 0 || changeEvent.cells !== void 0) {
							this._onDidChange.fire(changeEvent);
						}
					}),
				);
				disposables.push(
					connection2.notebooks.synchronization.onDidSaveNotebookDocument((params) => {
						const notebookDocument = this.notebookDocuments.get(params.notebookDocument.uri);
						if (notebookDocument === void 0) {
							return;
						}
						this._onDidSave.fire(notebookDocument);
					}),
				);
				disposables.push(
					connection2.notebooks.synchronization.onDidCloseNotebookDocument((params) => {
						const notebookDocument = this.notebookDocuments.get(params.notebookDocument.uri);
						if (notebookDocument === void 0) {
							return;
						}
						this._onDidClose.fire(notebookDocument);
						for (const cellTextDocument of params.cellTextDocuments) {
							cellTextDocumentConnection.closeTextDocument({
								textDocument: cellTextDocument,
							});
						}
						this.notebookDocuments.delete(params.notebookDocument.uri);
						for (const cell of notebookDocument.cells) {
							this.notebookCellMap.delete(cell.document);
						}
					}),
				);
				return vscode_languageserver_protocol_1.Disposable.create(() => {
					disposables.forEach((disposable) => disposable.dispose());
				});
			}
			updateCellMap(notebookDocument) {
				for (const cell of notebookDocument.cells) {
					this.notebookCellMap.set(cell.document, [cell, notebookDocument]);
				}
			}
		};
		exports2.NotebookDocuments = NotebookDocuments;
	},
});

// ../../../node_modules/.pnpm/vscode-languageserver@9.0.1/node_modules/vscode-languageserver/lib/common/moniker.js
var require_moniker = __commonJS({
	"../../../node_modules/.pnpm/vscode-languageserver@9.0.1/node_modules/vscode-languageserver/lib/common/moniker.js"(
		exports2,
	) {
		"use strict";
		init_cjs_shims();
		Object.defineProperty(exports2, "__esModule", {
			value: true,
		});
		exports2.MonikerFeature = void 0;
		var vscode_languageserver_protocol_1 = require_main3();
		var MonikerFeature = /* @__PURE__ */ __name((Base) => {
			return class extends Base {
				get moniker() {
					return {
						on: /* @__PURE__ */ __name((handler) => {
							const type = vscode_languageserver_protocol_1.MonikerRequest.type;
							return this.connection.onRequest(type, (params, cancel) => {
								return handler(
									params,
									cancel,
									this.attachWorkDoneProgress(params),
									this.attachPartialResultProgress(type, params),
								);
							});
						}, "on"),
					};
				}
			};
		}, "MonikerFeature");
		exports2.MonikerFeature = MonikerFeature;
	},
});

// ../../../node_modules/.pnpm/vscode-languageserver@9.0.1/node_modules/vscode-languageserver/lib/common/server.js
var require_server = __commonJS({
	"../../../node_modules/.pnpm/vscode-languageserver@9.0.1/node_modules/vscode-languageserver/lib/common/server.js"(
		exports2,
	) {
		"use strict";
		init_cjs_shims();
		Object.defineProperty(exports2, "__esModule", {
			value: true,
		});
		exports2.createConnection =
			exports2.combineFeatures =
			exports2.combineNotebooksFeatures =
			exports2.combineLanguagesFeatures =
			exports2.combineWorkspaceFeatures =
			exports2.combineWindowFeatures =
			exports2.combineClientFeatures =
			exports2.combineTracerFeatures =
			exports2.combineTelemetryFeatures =
			exports2.combineConsoleFeatures =
			exports2._NotebooksImpl =
			exports2._LanguagesImpl =
			exports2.BulkUnregistration =
			exports2.BulkRegistration =
			exports2.ErrorMessageTracker =
				void 0;
		var vscode_languageserver_protocol_1 = require_main3();
		var Is2 = require_is();
		var UUID = require_uuid();
		var progress_1 = require_progress();
		var configuration_1 = require_configuration();
		var workspaceFolder_1 = require_workspaceFolder();
		var callHierarchy_1 = require_callHierarchy();
		var semanticTokens_1 = require_semanticTokens();
		var showDocument_1 = require_showDocument();
		var fileOperations_1 = require_fileOperations();
		var linkedEditingRange_1 = require_linkedEditingRange();
		var typeHierarchy_1 = require_typeHierarchy();
		var inlineValue_1 = require_inlineValue();
		var foldingRange_1 = require_foldingRange();
		var inlayHint_1 = require_inlayHint();
		var diagnostic_1 = require_diagnostic();
		var notebook_1 = require_notebook();
		var moniker_1 = require_moniker();
		function null2Undefined(value) {
			if (value === null) {
				return void 0;
			}
			return value;
		}
		__name(null2Undefined, "null2Undefined");
		var ErrorMessageTracker = class ErrorMessageTracker {
			static {
				__name(this, "ErrorMessageTracker");
			}
			constructor() {
				this._messages = /* @__PURE__ */ Object.create(null);
			}
			/**
			 * Add a message to the tracker.
			 *
			 * @param message The message to add.
			 */
			add(message) {
				let count = this._messages[message];
				if (!count) {
					count = 0;
				}
				count++;
				this._messages[message] = count;
			}
			/**
			 * Send all tracked messages to the connection's window.
			 *
			 * @param connection The connection established between client and server.
			 */
			sendErrors(connection2) {
				Object.keys(this._messages).forEach((message) => {
					connection2.window.showErrorMessage(message);
				});
			}
		};
		exports2.ErrorMessageTracker = ErrorMessageTracker;
		var RemoteConsoleImpl = class RemoteConsoleImpl {
			static {
				__name(this, "RemoteConsoleImpl");
			}
			constructor() {}
			rawAttach(connection2) {
				this._rawConnection = connection2;
			}
			attach(connection2) {
				this._connection = connection2;
			}
			get connection() {
				if (!this._connection) {
					throw new Error("Remote is not attached to a connection yet.");
				}
				return this._connection;
			}
			fillServerCapabilities(_capabilities) {}
			initialize(_capabilities) {}
			error(message) {
				this.send(vscode_languageserver_protocol_1.MessageType.Error, message);
			}
			warn(message) {
				this.send(vscode_languageserver_protocol_1.MessageType.Warning, message);
			}
			info(message) {
				this.send(vscode_languageserver_protocol_1.MessageType.Info, message);
			}
			log(message) {
				this.send(vscode_languageserver_protocol_1.MessageType.Log, message);
			}
			debug(message) {
				this.send(vscode_languageserver_protocol_1.MessageType.Debug, message);
			}
			send(type, message) {
				if (this._rawConnection) {
					this._rawConnection
						.sendNotification(vscode_languageserver_protocol_1.LogMessageNotification.type, {
							type,
							message,
						})
						.catch(() => {
							(0, vscode_languageserver_protocol_1.RAL)().console.error(`Sending log message failed`);
						});
				}
			}
		};
		var _RemoteWindowImpl = class _RemoteWindowImpl {
			static {
				__name(this, "_RemoteWindowImpl");
			}
			constructor() {}
			attach(connection2) {
				this._connection = connection2;
			}
			get connection() {
				if (!this._connection) {
					throw new Error("Remote is not attached to a connection yet.");
				}
				return this._connection;
			}
			initialize(_capabilities) {}
			fillServerCapabilities(_capabilities) {}
			showErrorMessage(message, ...actions) {
				let params = {
					type: vscode_languageserver_protocol_1.MessageType.Error,
					message,
					actions,
				};
				return this.connection
					.sendRequest(vscode_languageserver_protocol_1.ShowMessageRequest.type, params)
					.then(null2Undefined);
			}
			showWarningMessage(message, ...actions) {
				let params = {
					type: vscode_languageserver_protocol_1.MessageType.Warning,
					message,
					actions,
				};
				return this.connection
					.sendRequest(vscode_languageserver_protocol_1.ShowMessageRequest.type, params)
					.then(null2Undefined);
			}
			showInformationMessage(message, ...actions) {
				let params = {
					type: vscode_languageserver_protocol_1.MessageType.Info,
					message,
					actions,
				};
				return this.connection
					.sendRequest(vscode_languageserver_protocol_1.ShowMessageRequest.type, params)
					.then(null2Undefined);
			}
		};
		var RemoteWindowImpl = (0, showDocument_1.ShowDocumentFeature)((0, progress_1.ProgressFeature)(_RemoteWindowImpl));
		var BulkRegistration;
		(function (BulkRegistration2) {
			function create() {
				return new BulkRegistrationImpl();
			}
			__name(create, "create");
			BulkRegistration2.create = create;
		})(BulkRegistration || (exports2.BulkRegistration = BulkRegistration = {}));
		var BulkRegistrationImpl = class BulkRegistrationImpl {
			static {
				__name(this, "BulkRegistrationImpl");
			}
			constructor() {
				this._registrations = [];
				this._registered = /* @__PURE__ */ new Set();
			}
			add(type, registerOptions) {
				const method = Is2.string(type) ? type : type.method;
				if (this._registered.has(method)) {
					throw new Error(`${method} is already added to this registration`);
				}
				const id = UUID.generateUuid();
				this._registrations.push({
					id,
					method,
					registerOptions: registerOptions || {},
				});
				this._registered.add(method);
			}
			asRegistrationParams() {
				return {
					registrations: this._registrations,
				};
			}
		};
		var BulkUnregistration;
		(function (BulkUnregistration2) {
			function create() {
				return new BulkUnregistrationImpl(void 0, []);
			}
			__name(create, "create");
			BulkUnregistration2.create = create;
		})(BulkUnregistration || (exports2.BulkUnregistration = BulkUnregistration = {}));
		var BulkUnregistrationImpl = class BulkUnregistrationImpl {
			static {
				__name(this, "BulkUnregistrationImpl");
			}
			constructor(_connection, unregistrations) {
				this._connection = _connection;
				this._unregistrations = /* @__PURE__ */ new Map();
				unregistrations.forEach((unregistration) => {
					this._unregistrations.set(unregistration.method, unregistration);
				});
			}
			get isAttached() {
				return !!this._connection;
			}
			attach(connection2) {
				this._connection = connection2;
			}
			add(unregistration) {
				this._unregistrations.set(unregistration.method, unregistration);
			}
			dispose() {
				let unregistrations = [];
				for (let unregistration of this._unregistrations.values()) {
					unregistrations.push(unregistration);
				}
				let params = {
					unregisterations: unregistrations,
				};
				this._connection.sendRequest(vscode_languageserver_protocol_1.UnregistrationRequest.type, params).catch(() => {
					this._connection.console.info(`Bulk unregistration failed.`);
				});
			}
			disposeSingle(arg) {
				const method = Is2.string(arg) ? arg : arg.method;
				const unregistration = this._unregistrations.get(method);
				if (!unregistration) {
					return false;
				}
				let params = {
					unregisterations: [unregistration],
				};
				this._connection.sendRequest(vscode_languageserver_protocol_1.UnregistrationRequest.type, params).then(
					() => {
						this._unregistrations.delete(method);
					},
					(_error) => {
						this._connection.console.info(`Un-registering request handler for ${unregistration.id} failed.`);
					},
				);
				return true;
			}
		};
		var RemoteClientImpl = class RemoteClientImpl {
			static {
				__name(this, "RemoteClientImpl");
			}
			attach(connection2) {
				this._connection = connection2;
			}
			get connection() {
				if (!this._connection) {
					throw new Error("Remote is not attached to a connection yet.");
				}
				return this._connection;
			}
			initialize(_capabilities) {}
			fillServerCapabilities(_capabilities) {}
			register(typeOrRegistrations, registerOptionsOrType, registerOptions) {
				if (typeOrRegistrations instanceof BulkRegistrationImpl) {
					return this.registerMany(typeOrRegistrations);
				} else if (typeOrRegistrations instanceof BulkUnregistrationImpl) {
					return this.registerSingle1(typeOrRegistrations, registerOptionsOrType, registerOptions);
				} else {
					return this.registerSingle2(typeOrRegistrations, registerOptionsOrType);
				}
			}
			registerSingle1(unregistration, type, registerOptions) {
				const method = Is2.string(type) ? type : type.method;
				const id = UUID.generateUuid();
				let params = {
					registrations: [
						{
							id,
							method,
							registerOptions: registerOptions || {},
						},
					],
				};
				if (!unregistration.isAttached) {
					unregistration.attach(this.connection);
				}
				return this.connection.sendRequest(vscode_languageserver_protocol_1.RegistrationRequest.type, params).then(
					(_result) => {
						unregistration.add({
							id,
							method,
						});
						return unregistration;
					},
					(_error) => {
						this.connection.console.info(`Registering request handler for ${method} failed.`);
						return Promise.reject(_error);
					},
				);
			}
			registerSingle2(type, registerOptions) {
				const method = Is2.string(type) ? type : type.method;
				const id = UUID.generateUuid();
				let params = {
					registrations: [
						{
							id,
							method,
							registerOptions: registerOptions || {},
						},
					],
				};
				return this.connection.sendRequest(vscode_languageserver_protocol_1.RegistrationRequest.type, params).then(
					(_result) => {
						return vscode_languageserver_protocol_1.Disposable.create(() => {
							this.unregisterSingle(id, method).catch(() => {
								this.connection.console.info(`Un-registering capability with id ${id} failed.`);
							});
						});
					},
					(_error) => {
						this.connection.console.info(`Registering request handler for ${method} failed.`);
						return Promise.reject(_error);
					},
				);
			}
			unregisterSingle(id, method) {
				let params = {
					unregisterations: [
						{
							id,
							method,
						},
					],
				};
				return this.connection
					.sendRequest(vscode_languageserver_protocol_1.UnregistrationRequest.type, params)
					.catch(() => {
						this.connection.console.info(`Un-registering request handler for ${id} failed.`);
					});
			}
			registerMany(registrations) {
				let params = registrations.asRegistrationParams();
				return this.connection.sendRequest(vscode_languageserver_protocol_1.RegistrationRequest.type, params).then(
					() => {
						return new BulkUnregistrationImpl(
							this._connection,
							params.registrations.map((registration) => {
								return {
									id: registration.id,
									method: registration.method,
								};
							}),
						);
					},
					(_error) => {
						this.connection.console.info(`Bulk registration failed.`);
						return Promise.reject(_error);
					},
				);
			}
		};
		var _RemoteWorkspaceImpl = class _RemoteWorkspaceImpl {
			static {
				__name(this, "_RemoteWorkspaceImpl");
			}
			constructor() {}
			attach(connection2) {
				this._connection = connection2;
			}
			get connection() {
				if (!this._connection) {
					throw new Error("Remote is not attached to a connection yet.");
				}
				return this._connection;
			}
			initialize(_capabilities) {}
			fillServerCapabilities(_capabilities) {}
			applyEdit(paramOrEdit) {
				function isApplyWorkspaceEditParams(value) {
					return value && !!value.edit;
				}
				__name(isApplyWorkspaceEditParams, "isApplyWorkspaceEditParams");
				let params = isApplyWorkspaceEditParams(paramOrEdit)
					? paramOrEdit
					: {
							edit: paramOrEdit,
						};
				return this.connection.sendRequest(vscode_languageserver_protocol_1.ApplyWorkspaceEditRequest.type, params);
			}
		};
		var RemoteWorkspaceImpl = (0, fileOperations_1.FileOperationsFeature)(
			(0, workspaceFolder_1.WorkspaceFoldersFeature)((0, configuration_1.ConfigurationFeature)(_RemoteWorkspaceImpl)),
		);
		var TracerImpl = class TracerImpl {
			static {
				__name(this, "TracerImpl");
			}
			constructor() {
				this._trace = vscode_languageserver_protocol_1.Trace.Off;
			}
			attach(connection2) {
				this._connection = connection2;
			}
			get connection() {
				if (!this._connection) {
					throw new Error("Remote is not attached to a connection yet.");
				}
				return this._connection;
			}
			initialize(_capabilities) {}
			fillServerCapabilities(_capabilities) {}
			set trace(value) {
				this._trace = value;
			}
			log(message, verbose) {
				if (this._trace === vscode_languageserver_protocol_1.Trace.Off) {
					return;
				}
				this.connection
					.sendNotification(vscode_languageserver_protocol_1.LogTraceNotification.type, {
						message,
						verbose: this._trace === vscode_languageserver_protocol_1.Trace.Verbose ? verbose : void 0,
					})
					.catch(() => {});
			}
		};
		var TelemetryImpl = class TelemetryImpl {
			static {
				__name(this, "TelemetryImpl");
			}
			constructor() {}
			attach(connection2) {
				this._connection = connection2;
			}
			get connection() {
				if (!this._connection) {
					throw new Error("Remote is not attached to a connection yet.");
				}
				return this._connection;
			}
			initialize(_capabilities) {}
			fillServerCapabilities(_capabilities) {}
			logEvent(data) {
				this.connection
					.sendNotification(vscode_languageserver_protocol_1.TelemetryEventNotification.type, data)
					.catch(() => {
						this.connection.console.log(`Sending TelemetryEventNotification failed`);
					});
			}
		};
		var _LanguagesImpl = class _LanguagesImpl {
			static {
				__name(this, "_LanguagesImpl");
			}
			constructor() {}
			attach(connection2) {
				this._connection = connection2;
			}
			get connection() {
				if (!this._connection) {
					throw new Error("Remote is not attached to a connection yet.");
				}
				return this._connection;
			}
			initialize(_capabilities) {}
			fillServerCapabilities(_capabilities) {}
			attachWorkDoneProgress(params) {
				return (0, progress_1.attachWorkDone)(this.connection, params);
			}
			attachPartialResultProgress(_type, params) {
				return (0, progress_1.attachPartialResult)(this.connection, params);
			}
		};
		exports2._LanguagesImpl = _LanguagesImpl;
		var LanguagesImpl = (0, foldingRange_1.FoldingRangeFeature)(
			(0, moniker_1.MonikerFeature)(
				(0, diagnostic_1.DiagnosticFeature)(
					(0, inlayHint_1.InlayHintFeature)(
						(0, inlineValue_1.InlineValueFeature)(
							(0, typeHierarchy_1.TypeHierarchyFeature)(
								(0, linkedEditingRange_1.LinkedEditingRangeFeature)(
									(0, semanticTokens_1.SemanticTokensFeature)((0, callHierarchy_1.CallHierarchyFeature)(_LanguagesImpl)),
								),
							),
						),
					),
				),
			),
		);
		var _NotebooksImpl = class _NotebooksImpl {
			static {
				__name(this, "_NotebooksImpl");
			}
			constructor() {}
			attach(connection2) {
				this._connection = connection2;
			}
			get connection() {
				if (!this._connection) {
					throw new Error("Remote is not attached to a connection yet.");
				}
				return this._connection;
			}
			initialize(_capabilities) {}
			fillServerCapabilities(_capabilities) {}
			attachWorkDoneProgress(params) {
				return (0, progress_1.attachWorkDone)(this.connection, params);
			}
			attachPartialResultProgress(_type, params) {
				return (0, progress_1.attachPartialResult)(this.connection, params);
			}
		};
		exports2._NotebooksImpl = _NotebooksImpl;
		var NotebooksImpl = (0, notebook_1.NotebookSyncFeature)(_NotebooksImpl);
		function combineConsoleFeatures(one, two) {
			return function (Base) {
				return two(one(Base));
			};
		}
		__name(combineConsoleFeatures, "combineConsoleFeatures");
		exports2.combineConsoleFeatures = combineConsoleFeatures;
		function combineTelemetryFeatures(one, two) {
			return function (Base) {
				return two(one(Base));
			};
		}
		__name(combineTelemetryFeatures, "combineTelemetryFeatures");
		exports2.combineTelemetryFeatures = combineTelemetryFeatures;
		function combineTracerFeatures(one, two) {
			return function (Base) {
				return two(one(Base));
			};
		}
		__name(combineTracerFeatures, "combineTracerFeatures");
		exports2.combineTracerFeatures = combineTracerFeatures;
		function combineClientFeatures(one, two) {
			return function (Base) {
				return two(one(Base));
			};
		}
		__name(combineClientFeatures, "combineClientFeatures");
		exports2.combineClientFeatures = combineClientFeatures;
		function combineWindowFeatures(one, two) {
			return function (Base) {
				return two(one(Base));
			};
		}
		__name(combineWindowFeatures, "combineWindowFeatures");
		exports2.combineWindowFeatures = combineWindowFeatures;
		function combineWorkspaceFeatures(one, two) {
			return function (Base) {
				return two(one(Base));
			};
		}
		__name(combineWorkspaceFeatures, "combineWorkspaceFeatures");
		exports2.combineWorkspaceFeatures = combineWorkspaceFeatures;
		function combineLanguagesFeatures(one, two) {
			return function (Base) {
				return two(one(Base));
			};
		}
		__name(combineLanguagesFeatures, "combineLanguagesFeatures");
		exports2.combineLanguagesFeatures = combineLanguagesFeatures;
		function combineNotebooksFeatures(one, two) {
			return function (Base) {
				return two(one(Base));
			};
		}
		__name(combineNotebooksFeatures, "combineNotebooksFeatures");
		exports2.combineNotebooksFeatures = combineNotebooksFeatures;
		function combineFeatures(one, two) {
			function combine(one2, two2, func) {
				if (one2 && two2) {
					return func(one2, two2);
				} else if (one2) {
					return one2;
				} else {
					return two2;
				}
			}
			__name(combine, "combine");
			let result = {
				__brand: "features",
				console: combine(one.console, two.console, combineConsoleFeatures),
				tracer: combine(one.tracer, two.tracer, combineTracerFeatures),
				telemetry: combine(one.telemetry, two.telemetry, combineTelemetryFeatures),
				client: combine(one.client, two.client, combineClientFeatures),
				window: combine(one.window, two.window, combineWindowFeatures),
				workspace: combine(one.workspace, two.workspace, combineWorkspaceFeatures),
				languages: combine(one.languages, two.languages, combineLanguagesFeatures),
				notebooks: combine(one.notebooks, two.notebooks, combineNotebooksFeatures),
			};
			return result;
		}
		__name(combineFeatures, "combineFeatures");
		exports2.combineFeatures = combineFeatures;
		function createConnection2(connectionFactory, watchDog, factories) {
			const logger =
				factories && factories.console ? new (factories.console(RemoteConsoleImpl))() : new RemoteConsoleImpl();
			const connection2 = connectionFactory(logger);
			logger.rawAttach(connection2);
			const tracer = factories && factories.tracer ? new (factories.tracer(TracerImpl))() : new TracerImpl();
			const telemetry =
				factories && factories.telemetry ? new (factories.telemetry(TelemetryImpl))() : new TelemetryImpl();
			const client = factories && factories.client ? new (factories.client(RemoteClientImpl))() : new RemoteClientImpl();
			const remoteWindow =
				factories && factories.window ? new (factories.window(RemoteWindowImpl))() : new RemoteWindowImpl();
			const workspace =
				factories && factories.workspace ? new (factories.workspace(RemoteWorkspaceImpl))() : new RemoteWorkspaceImpl();
			const languages =
				factories && factories.languages ? new (factories.languages(LanguagesImpl))() : new LanguagesImpl();
			const notebooks =
				factories && factories.notebooks ? new (factories.notebooks(NotebooksImpl))() : new NotebooksImpl();
			const allRemotes = [logger, tracer, telemetry, client, remoteWindow, workspace, languages, notebooks];
			function asPromise(value) {
				if (value instanceof Promise) {
					return value;
				} else if (Is2.thenable(value)) {
					return new Promise((resolve, reject) => {
						value.then(
							(resolved) => resolve(resolved),
							(error) => reject(error),
						);
					});
				} else {
					return Promise.resolve(value);
				}
			}
			__name(asPromise, "asPromise");
			let shutdownHandler = void 0;
			let initializeHandler = void 0;
			let exitHandler = void 0;
			let protocolConnection = {
				listen: /* @__PURE__ */ __name(() => connection2.listen(), "listen"),
				sendRequest: /* @__PURE__ */ __name(
					(type, ...params) => connection2.sendRequest(Is2.string(type) ? type : type.method, ...params),
					"sendRequest",
				),
				onRequest: /* @__PURE__ */ __name((type, handler) => connection2.onRequest(type, handler), "onRequest"),
				sendNotification: /* @__PURE__ */ __name((type, param) => {
					const method = Is2.string(type) ? type : type.method;
					return connection2.sendNotification(method, param);
				}, "sendNotification"),
				onNotification: /* @__PURE__ */ __name(
					(type, handler) => connection2.onNotification(type, handler),
					"onNotification",
				),
				onProgress: connection2.onProgress,
				sendProgress: connection2.sendProgress,
				onInitialize: /* @__PURE__ */ __name((handler) => {
					initializeHandler = handler;
					return {
						dispose: /* @__PURE__ */ __name(() => {
							initializeHandler = void 0;
						}, "dispose"),
					};
				}, "onInitialize"),
				onInitialized: /* @__PURE__ */ __name(
					(handler) => connection2.onNotification(vscode_languageserver_protocol_1.InitializedNotification.type, handler),
					"onInitialized",
				),
				onShutdown: /* @__PURE__ */ __name((handler) => {
					shutdownHandler = handler;
					return {
						dispose: /* @__PURE__ */ __name(() => {
							shutdownHandler = void 0;
						}, "dispose"),
					};
				}, "onShutdown"),
				onExit: /* @__PURE__ */ __name((handler) => {
					exitHandler = handler;
					return {
						dispose: /* @__PURE__ */ __name(() => {
							exitHandler = void 0;
						}, "dispose"),
					};
				}, "onExit"),
				get console() {
					return logger;
				},
				get telemetry() {
					return telemetry;
				},
				get tracer() {
					return tracer;
				},
				get client() {
					return client;
				},
				get window() {
					return remoteWindow;
				},
				get workspace() {
					return workspace;
				},
				get languages() {
					return languages;
				},
				get notebooks() {
					return notebooks;
				},
				onDidChangeConfiguration: /* @__PURE__ */ __name(
					(handler) =>
						connection2.onNotification(vscode_languageserver_protocol_1.DidChangeConfigurationNotification.type, handler),
					"onDidChangeConfiguration",
				),
				onDidChangeWatchedFiles: /* @__PURE__ */ __name(
					(handler) =>
						connection2.onNotification(vscode_languageserver_protocol_1.DidChangeWatchedFilesNotification.type, handler),
					"onDidChangeWatchedFiles",
				),
				__textDocumentSync: void 0,
				onDidOpenTextDocument: /* @__PURE__ */ __name(
					(handler) =>
						connection2.onNotification(vscode_languageserver_protocol_1.DidOpenTextDocumentNotification.type, handler),
					"onDidOpenTextDocument",
				),
				onDidChangeTextDocument: /* @__PURE__ */ __name(
					(handler) =>
						connection2.onNotification(vscode_languageserver_protocol_1.DidChangeTextDocumentNotification.type, handler),
					"onDidChangeTextDocument",
				),
				onDidCloseTextDocument: /* @__PURE__ */ __name(
					(handler) =>
						connection2.onNotification(vscode_languageserver_protocol_1.DidCloseTextDocumentNotification.type, handler),
					"onDidCloseTextDocument",
				),
				onWillSaveTextDocument: /* @__PURE__ */ __name(
					(handler) =>
						connection2.onNotification(vscode_languageserver_protocol_1.WillSaveTextDocumentNotification.type, handler),
					"onWillSaveTextDocument",
				),
				onWillSaveTextDocumentWaitUntil: /* @__PURE__ */ __name(
					(handler) =>
						connection2.onRequest(vscode_languageserver_protocol_1.WillSaveTextDocumentWaitUntilRequest.type, handler),
					"onWillSaveTextDocumentWaitUntil",
				),
				onDidSaveTextDocument: /* @__PURE__ */ __name(
					(handler) =>
						connection2.onNotification(vscode_languageserver_protocol_1.DidSaveTextDocumentNotification.type, handler),
					"onDidSaveTextDocument",
				),
				sendDiagnostics: /* @__PURE__ */ __name(
					(params) =>
						connection2.sendNotification(vscode_languageserver_protocol_1.PublishDiagnosticsNotification.type, params),
					"sendDiagnostics",
				),
				onHover: /* @__PURE__ */ __name(
					(handler) =>
						connection2.onRequest(vscode_languageserver_protocol_1.HoverRequest.type, (params, cancel) => {
							return handler(params, cancel, (0, progress_1.attachWorkDone)(connection2, params), void 0);
						}),
					"onHover",
				),
				onCompletion: /* @__PURE__ */ __name(
					(handler) =>
						connection2.onRequest(vscode_languageserver_protocol_1.CompletionRequest.type, (params, cancel) => {
							return handler(
								params,
								cancel,
								(0, progress_1.attachWorkDone)(connection2, params),
								(0, progress_1.attachPartialResult)(connection2, params),
							);
						}),
					"onCompletion",
				),
				onCompletionResolve: /* @__PURE__ */ __name(
					(handler) => connection2.onRequest(vscode_languageserver_protocol_1.CompletionResolveRequest.type, handler),
					"onCompletionResolve",
				),
				onSignatureHelp: /* @__PURE__ */ __name(
					(handler) =>
						connection2.onRequest(vscode_languageserver_protocol_1.SignatureHelpRequest.type, (params, cancel) => {
							return handler(params, cancel, (0, progress_1.attachWorkDone)(connection2, params), void 0);
						}),
					"onSignatureHelp",
				),
				onDeclaration: /* @__PURE__ */ __name(
					(handler) =>
						connection2.onRequest(vscode_languageserver_protocol_1.DeclarationRequest.type, (params, cancel) => {
							return handler(
								params,
								cancel,
								(0, progress_1.attachWorkDone)(connection2, params),
								(0, progress_1.attachPartialResult)(connection2, params),
							);
						}),
					"onDeclaration",
				),
				onDefinition: /* @__PURE__ */ __name(
					(handler) =>
						connection2.onRequest(vscode_languageserver_protocol_1.DefinitionRequest.type, (params, cancel) => {
							return handler(
								params,
								cancel,
								(0, progress_1.attachWorkDone)(connection2, params),
								(0, progress_1.attachPartialResult)(connection2, params),
							);
						}),
					"onDefinition",
				),
				onTypeDefinition: /* @__PURE__ */ __name(
					(handler) =>
						connection2.onRequest(vscode_languageserver_protocol_1.TypeDefinitionRequest.type, (params, cancel) => {
							return handler(
								params,
								cancel,
								(0, progress_1.attachWorkDone)(connection2, params),
								(0, progress_1.attachPartialResult)(connection2, params),
							);
						}),
					"onTypeDefinition",
				),
				onImplementation: /* @__PURE__ */ __name(
					(handler) =>
						connection2.onRequest(vscode_languageserver_protocol_1.ImplementationRequest.type, (params, cancel) => {
							return handler(
								params,
								cancel,
								(0, progress_1.attachWorkDone)(connection2, params),
								(0, progress_1.attachPartialResult)(connection2, params),
							);
						}),
					"onImplementation",
				),
				onReferences: /* @__PURE__ */ __name(
					(handler) =>
						connection2.onRequest(vscode_languageserver_protocol_1.ReferencesRequest.type, (params, cancel) => {
							return handler(
								params,
								cancel,
								(0, progress_1.attachWorkDone)(connection2, params),
								(0, progress_1.attachPartialResult)(connection2, params),
							);
						}),
					"onReferences",
				),
				onDocumentHighlight: /* @__PURE__ */ __name(
					(handler) =>
						connection2.onRequest(vscode_languageserver_protocol_1.DocumentHighlightRequest.type, (params, cancel) => {
							return handler(
								params,
								cancel,
								(0, progress_1.attachWorkDone)(connection2, params),
								(0, progress_1.attachPartialResult)(connection2, params),
							);
						}),
					"onDocumentHighlight",
				),
				onDocumentSymbol: /* @__PURE__ */ __name(
					(handler) =>
						connection2.onRequest(vscode_languageserver_protocol_1.DocumentSymbolRequest.type, (params, cancel) => {
							return handler(
								params,
								cancel,
								(0, progress_1.attachWorkDone)(connection2, params),
								(0, progress_1.attachPartialResult)(connection2, params),
							);
						}),
					"onDocumentSymbol",
				),
				onWorkspaceSymbol: /* @__PURE__ */ __name(
					(handler) =>
						connection2.onRequest(vscode_languageserver_protocol_1.WorkspaceSymbolRequest.type, (params, cancel) => {
							return handler(
								params,
								cancel,
								(0, progress_1.attachWorkDone)(connection2, params),
								(0, progress_1.attachPartialResult)(connection2, params),
							);
						}),
					"onWorkspaceSymbol",
				),
				onWorkspaceSymbolResolve: /* @__PURE__ */ __name(
					(handler) => connection2.onRequest(vscode_languageserver_protocol_1.WorkspaceSymbolResolveRequest.type, handler),
					"onWorkspaceSymbolResolve",
				),
				onCodeAction: /* @__PURE__ */ __name(
					(handler) =>
						connection2.onRequest(vscode_languageserver_protocol_1.CodeActionRequest.type, (params, cancel) => {
							return handler(
								params,
								cancel,
								(0, progress_1.attachWorkDone)(connection2, params),
								(0, progress_1.attachPartialResult)(connection2, params),
							);
						}),
					"onCodeAction",
				),
				onCodeActionResolve: /* @__PURE__ */ __name(
					(handler) =>
						connection2.onRequest(vscode_languageserver_protocol_1.CodeActionResolveRequest.type, (params, cancel) => {
							return handler(params, cancel);
						}),
					"onCodeActionResolve",
				),
				onCodeLens: /* @__PURE__ */ __name(
					(handler) =>
						connection2.onRequest(vscode_languageserver_protocol_1.CodeLensRequest.type, (params, cancel) => {
							return handler(
								params,
								cancel,
								(0, progress_1.attachWorkDone)(connection2, params),
								(0, progress_1.attachPartialResult)(connection2, params),
							);
						}),
					"onCodeLens",
				),
				onCodeLensResolve: /* @__PURE__ */ __name(
					(handler) =>
						connection2.onRequest(vscode_languageserver_protocol_1.CodeLensResolveRequest.type, (params, cancel) => {
							return handler(params, cancel);
						}),
					"onCodeLensResolve",
				),
				onDocumentFormatting: /* @__PURE__ */ __name(
					(handler) =>
						connection2.onRequest(vscode_languageserver_protocol_1.DocumentFormattingRequest.type, (params, cancel) => {
							return handler(params, cancel, (0, progress_1.attachWorkDone)(connection2, params), void 0);
						}),
					"onDocumentFormatting",
				),
				onDocumentRangeFormatting: /* @__PURE__ */ __name(
					(handler) =>
						connection2.onRequest(vscode_languageserver_protocol_1.DocumentRangeFormattingRequest.type, (params, cancel) => {
							return handler(params, cancel, (0, progress_1.attachWorkDone)(connection2, params), void 0);
						}),
					"onDocumentRangeFormatting",
				),
				onDocumentOnTypeFormatting: /* @__PURE__ */ __name(
					(handler) =>
						connection2.onRequest(vscode_languageserver_protocol_1.DocumentOnTypeFormattingRequest.type, (params, cancel) => {
							return handler(params, cancel);
						}),
					"onDocumentOnTypeFormatting",
				),
				onRenameRequest: /* @__PURE__ */ __name(
					(handler) =>
						connection2.onRequest(vscode_languageserver_protocol_1.RenameRequest.type, (params, cancel) => {
							return handler(params, cancel, (0, progress_1.attachWorkDone)(connection2, params), void 0);
						}),
					"onRenameRequest",
				),
				onPrepareRename: /* @__PURE__ */ __name(
					(handler) =>
						connection2.onRequest(vscode_languageserver_protocol_1.PrepareRenameRequest.type, (params, cancel) => {
							return handler(params, cancel);
						}),
					"onPrepareRename",
				),
				onDocumentLinks: /* @__PURE__ */ __name(
					(handler) =>
						connection2.onRequest(vscode_languageserver_protocol_1.DocumentLinkRequest.type, (params, cancel) => {
							return handler(
								params,
								cancel,
								(0, progress_1.attachWorkDone)(connection2, params),
								(0, progress_1.attachPartialResult)(connection2, params),
							);
						}),
					"onDocumentLinks",
				),
				onDocumentLinkResolve: /* @__PURE__ */ __name(
					(handler) =>
						connection2.onRequest(vscode_languageserver_protocol_1.DocumentLinkResolveRequest.type, (params, cancel) => {
							return handler(params, cancel);
						}),
					"onDocumentLinkResolve",
				),
				onDocumentColor: /* @__PURE__ */ __name(
					(handler) =>
						connection2.onRequest(vscode_languageserver_protocol_1.DocumentColorRequest.type, (params, cancel) => {
							return handler(
								params,
								cancel,
								(0, progress_1.attachWorkDone)(connection2, params),
								(0, progress_1.attachPartialResult)(connection2, params),
							);
						}),
					"onDocumentColor",
				),
				onColorPresentation: /* @__PURE__ */ __name(
					(handler) =>
						connection2.onRequest(vscode_languageserver_protocol_1.ColorPresentationRequest.type, (params, cancel) => {
							return handler(
								params,
								cancel,
								(0, progress_1.attachWorkDone)(connection2, params),
								(0, progress_1.attachPartialResult)(connection2, params),
							);
						}),
					"onColorPresentation",
				),
				onFoldingRanges: /* @__PURE__ */ __name(
					(handler) =>
						connection2.onRequest(vscode_languageserver_protocol_1.FoldingRangeRequest.type, (params, cancel) => {
							return handler(
								params,
								cancel,
								(0, progress_1.attachWorkDone)(connection2, params),
								(0, progress_1.attachPartialResult)(connection2, params),
							);
						}),
					"onFoldingRanges",
				),
				onSelectionRanges: /* @__PURE__ */ __name(
					(handler) =>
						connection2.onRequest(vscode_languageserver_protocol_1.SelectionRangeRequest.type, (params, cancel) => {
							return handler(
								params,
								cancel,
								(0, progress_1.attachWorkDone)(connection2, params),
								(0, progress_1.attachPartialResult)(connection2, params),
							);
						}),
					"onSelectionRanges",
				),
				onExecuteCommand: /* @__PURE__ */ __name(
					(handler) =>
						connection2.onRequest(vscode_languageserver_protocol_1.ExecuteCommandRequest.type, (params, cancel) => {
							return handler(params, cancel, (0, progress_1.attachWorkDone)(connection2, params), void 0);
						}),
					"onExecuteCommand",
				),
				dispose: /* @__PURE__ */ __name(() => connection2.dispose(), "dispose"),
			};
			for (let remote of allRemotes) {
				remote.attach(protocolConnection);
			}
			connection2.onRequest(vscode_languageserver_protocol_1.InitializeRequest.type, (params) => {
				watchDog.initialize(params);
				if (Is2.string(params.trace)) {
					tracer.trace = vscode_languageserver_protocol_1.Trace.fromString(params.trace);
				}
				for (let remote of allRemotes) {
					remote.initialize(params.capabilities);
				}
				if (initializeHandler) {
					let result = initializeHandler(
						params,
						new vscode_languageserver_protocol_1.CancellationTokenSource().token,
						(0, progress_1.attachWorkDone)(connection2, params),
						void 0,
					);
					return asPromise(result).then((value) => {
						if (value instanceof vscode_languageserver_protocol_1.ResponseError) {
							return value;
						}
						let result2 = value;
						if (!result2) {
							result2 = {
								capabilities: {},
							};
						}
						let capabilities = result2.capabilities;
						if (!capabilities) {
							capabilities = {};
							result2.capabilities = capabilities;
						}
						if (capabilities.textDocumentSync === void 0 || capabilities.textDocumentSync === null) {
							capabilities.textDocumentSync = Is2.number(protocolConnection.__textDocumentSync)
								? protocolConnection.__textDocumentSync
								: vscode_languageserver_protocol_1.TextDocumentSyncKind.None;
						} else if (!Is2.number(capabilities.textDocumentSync) && !Is2.number(capabilities.textDocumentSync.change)) {
							capabilities.textDocumentSync.change = Is2.number(protocolConnection.__textDocumentSync)
								? protocolConnection.__textDocumentSync
								: vscode_languageserver_protocol_1.TextDocumentSyncKind.None;
						}
						for (let remote of allRemotes) {
							remote.fillServerCapabilities(capabilities);
						}
						return result2;
					});
				} else {
					let result = {
						capabilities: {
							textDocumentSync: vscode_languageserver_protocol_1.TextDocumentSyncKind.None,
						},
					};
					for (let remote of allRemotes) {
						remote.fillServerCapabilities(result.capabilities);
					}
					return result;
				}
			});
			connection2.onRequest(vscode_languageserver_protocol_1.ShutdownRequest.type, () => {
				watchDog.shutdownReceived = true;
				if (shutdownHandler) {
					return shutdownHandler(new vscode_languageserver_protocol_1.CancellationTokenSource().token);
				} else {
					return void 0;
				}
			});
			connection2.onNotification(vscode_languageserver_protocol_1.ExitNotification.type, () => {
				try {
					if (exitHandler) {
						exitHandler();
					}
				} finally {
					if (watchDog.shutdownReceived) {
						watchDog.exit(0);
					} else {
						watchDog.exit(1);
					}
				}
			});
			connection2.onNotification(vscode_languageserver_protocol_1.SetTraceNotification.type, (params) => {
				tracer.trace = vscode_languageserver_protocol_1.Trace.fromString(params.value);
			});
			return protocolConnection;
		}
		__name(createConnection2, "createConnection");
		exports2.createConnection = createConnection2;
	},
});

// ../../../node_modules/.pnpm/vscode-languageserver@9.0.1/node_modules/vscode-languageserver/lib/node/files.js
var require_files = __commonJS({
	"../../../node_modules/.pnpm/vscode-languageserver@9.0.1/node_modules/vscode-languageserver/lib/node/files.js"(
		exports2,
	) {
		"use strict";
		init_cjs_shims();
		Object.defineProperty(exports2, "__esModule", {
			value: true,
		});
		exports2.resolveModulePath =
			exports2.FileSystem =
			exports2.resolveGlobalYarnPath =
			exports2.resolveGlobalNodePath =
			exports2.resolve =
			exports2.uriToFilePath =
				void 0;
		var url = require("url");
		var path = require("path");
		var fs = require("fs");
		var child_process_1 = require("child_process");
		function uriToFilePath(uri) {
			let parsed = url.parse(uri);
			if (parsed.protocol !== "file:" || !parsed.path) {
				return void 0;
			}
			let segments = parsed.path.split("/");
			for (var i = 0, len = segments.length; i < len; i++) {
				segments[i] = decodeURIComponent(segments[i]);
			}
			if (process.platform === "win32" && segments.length > 1) {
				let first = segments[0];
				let second = segments[1];
				if (first.length === 0 && second.length > 1 && second[1] === ":") {
					segments.shift();
				}
			}
			return path.normalize(segments.join("/"));
		}
		__name(uriToFilePath, "uriToFilePath");
		exports2.uriToFilePath = uriToFilePath;
		function isWindows() {
			return process.platform === "win32";
		}
		__name(isWindows, "isWindows");
		function resolve(moduleName, nodePath, cwd, tracer) {
			const nodePathKey = "NODE_PATH";
			const app = [
				"var p = process;",
				"p.on('message',function(m){",
				"if(m.c==='e'){",
				"p.exit(0);",
				"}",
				"else if(m.c==='rs'){",
				"try{",
				"var r=require.resolve(m.a);",
				"p.send({c:'r',s:true,r:r});",
				"}",
				"catch(err){",
				"p.send({c:'r',s:false});",
				"}",
				"}",
				"});",
			].join("");
			return new Promise((resolve2, reject) => {
				let env = process.env;
				let newEnv = /* @__PURE__ */ Object.create(null);
				Object.keys(env).forEach((key) => (newEnv[key] = env[key]));
				if (nodePath && fs.existsSync(nodePath)) {
					if (newEnv[nodePathKey]) {
						newEnv[nodePathKey] = nodePath + path.delimiter + newEnv[nodePathKey];
					} else {
						newEnv[nodePathKey] = nodePath;
					}
					if (tracer) {
						tracer(`NODE_PATH value is: ${newEnv[nodePathKey]}`);
					}
				}
				newEnv["ELECTRON_RUN_AS_NODE"] = "1";
				try {
					let cp = (0, child_process_1.fork)("", [], {
						cwd,
						env: newEnv,
						execArgv: ["-e", app],
					});
					if (cp.pid === void 0) {
						reject(new Error(`Starting process to resolve node module  ${moduleName} failed`));
						return;
					}
					cp.on("error", (error) => {
						reject(error);
					});
					cp.on("message", (message2) => {
						if (message2.c === "r") {
							cp.send({
								c: "e",
							});
							if (message2.s) {
								resolve2(message2.r);
							} else {
								reject(new Error(`Failed to resolve module: ${moduleName}`));
							}
						}
					});
					let message = {
						c: "rs",
						a: moduleName,
					};
					cp.send(message);
				} catch (error) {
					reject(error);
				}
			});
		}
		__name(resolve, "resolve");
		exports2.resolve = resolve;
		function resolveGlobalNodePath(tracer) {
			let npmCommand = "npm";
			const env = /* @__PURE__ */ Object.create(null);
			Object.keys(process.env).forEach((key) => (env[key] = process.env[key]));
			env["NO_UPDATE_NOTIFIER"] = "true";
			const options = {
				encoding: "utf8",
				env,
			};
			if (isWindows()) {
				npmCommand = "npm.cmd";
				options.shell = true;
			}
			let handler = /* @__PURE__ */ __name(() => {}, "handler");
			try {
				process.on("SIGPIPE", handler);
				let stdout = (0, child_process_1.spawnSync)(npmCommand, ["config", "get", "prefix"], options).stdout;
				if (!stdout) {
					if (tracer) {
						tracer(`'npm config get prefix' didn't return a value.`);
					}
					return void 0;
				}
				let prefix = stdout.trim();
				if (tracer) {
					tracer(`'npm config get prefix' value is: ${prefix}`);
				}
				if (prefix.length > 0) {
					if (isWindows()) {
						return path.join(prefix, "node_modules");
					} else {
						return path.join(prefix, "lib", "node_modules");
					}
				}
				return void 0;
			} catch (err) {
				return void 0;
			} finally {
				process.removeListener("SIGPIPE", handler);
			}
		}
		__name(resolveGlobalNodePath, "resolveGlobalNodePath");
		exports2.resolveGlobalNodePath = resolveGlobalNodePath;
		function resolveGlobalYarnPath(tracer) {
			let yarnCommand = "yarn";
			let options = {
				encoding: "utf8",
			};
			if (isWindows()) {
				yarnCommand = "yarn.cmd";
				options.shell = true;
			}
			let handler = /* @__PURE__ */ __name(() => {}, "handler");
			try {
				process.on("SIGPIPE", handler);
				let results = (0, child_process_1.spawnSync)(yarnCommand, ["global", "dir", "--json"], options);
				let stdout = results.stdout;
				if (!stdout) {
					if (tracer) {
						tracer(`'yarn global dir' didn't return a value.`);
						if (results.stderr) {
							tracer(results.stderr);
						}
					}
					return void 0;
				}
				let lines = stdout.trim().split(/\r?\n/);
				for (let line of lines) {
					try {
						let yarn = JSON.parse(line);
						if (yarn.type === "log") {
							return path.join(yarn.data, "node_modules");
						}
					} catch (e) {}
				}
				return void 0;
			} catch (err) {
				return void 0;
			} finally {
				process.removeListener("SIGPIPE", handler);
			}
		}
		__name(resolveGlobalYarnPath, "resolveGlobalYarnPath");
		exports2.resolveGlobalYarnPath = resolveGlobalYarnPath;
		var FileSystem;
		(function (FileSystem2) {
			let _isCaseSensitive = void 0;
			function isCaseSensitive() {
				if (_isCaseSensitive !== void 0) {
					return _isCaseSensitive;
				}
				if (process.platform === "win32") {
					_isCaseSensitive = false;
				} else {
					_isCaseSensitive = !fs.existsSync(__filename.toUpperCase()) || !fs.existsSync(__filename.toLowerCase());
				}
				return _isCaseSensitive;
			}
			__name(isCaseSensitive, "isCaseSensitive");
			FileSystem2.isCaseSensitive = isCaseSensitive;
			function isParent(parent, child) {
				if (isCaseSensitive()) {
					return path.normalize(child).indexOf(path.normalize(parent)) === 0;
				} else {
					return path.normalize(child).toLowerCase().indexOf(path.normalize(parent).toLowerCase()) === 0;
				}
			}
			__name(isParent, "isParent");
			FileSystem2.isParent = isParent;
		})(FileSystem || (exports2.FileSystem = FileSystem = {}));
		function resolveModulePath(workspaceRoot, moduleName, nodePath, tracer) {
			if (nodePath) {
				if (!path.isAbsolute(nodePath)) {
					nodePath = path.join(workspaceRoot, nodePath);
				}
				return resolve(moduleName, nodePath, nodePath, tracer)
					.then((value) => {
						if (FileSystem.isParent(nodePath, value)) {
							return value;
						} else {
							return Promise.reject(new Error(`Failed to load ${moduleName} from node path location.`));
						}
					})
					.then(void 0, (_error) => {
						return resolve(moduleName, resolveGlobalNodePath(tracer), workspaceRoot, tracer);
					});
			} else {
				return resolve(moduleName, resolveGlobalNodePath(tracer), workspaceRoot, tracer);
			}
		}
		__name(resolveModulePath, "resolveModulePath");
		exports2.resolveModulePath = resolveModulePath;
	},
});

// ../../../node_modules/.pnpm/vscode-languageserver-protocol@3.17.5/node_modules/vscode-languageserver-protocol/node.js
var require_node2 = __commonJS({
	"../../../node_modules/.pnpm/vscode-languageserver-protocol@3.17.5/node_modules/vscode-languageserver-protocol/node.js"(
		exports2,
		module2,
	) {
		"use strict";
		init_cjs_shims();
		module2.exports = require_main3();
	},
});

// ../../../node_modules/.pnpm/vscode-languageserver@9.0.1/node_modules/vscode-languageserver/lib/common/inlineCompletion.proposed.js
var require_inlineCompletion_proposed = __commonJS({
	"../../../node_modules/.pnpm/vscode-languageserver@9.0.1/node_modules/vscode-languageserver/lib/common/inlineCompletion.proposed.js"(
		exports2,
	) {
		"use strict";
		init_cjs_shims();
		Object.defineProperty(exports2, "__esModule", {
			value: true,
		});
		exports2.InlineCompletionFeature = void 0;
		var vscode_languageserver_protocol_1 = require_main3();
		var InlineCompletionFeature = /* @__PURE__ */ __name((Base) => {
			return class extends Base {
				get inlineCompletion() {
					return {
						on: /* @__PURE__ */ __name((handler) => {
							return this.connection.onRequest(
								vscode_languageserver_protocol_1.InlineCompletionRequest.type,
								(params, cancel) => {
									return handler(params, cancel, this.attachWorkDoneProgress(params));
								},
							);
						}, "on"),
					};
				}
			};
		}, "InlineCompletionFeature");
		exports2.InlineCompletionFeature = InlineCompletionFeature;
	},
});

// ../../../node_modules/.pnpm/vscode-languageserver@9.0.1/node_modules/vscode-languageserver/lib/common/api.js
var require_api3 = __commonJS({
	"../../../node_modules/.pnpm/vscode-languageserver@9.0.1/node_modules/vscode-languageserver/lib/common/api.js"(
		exports2,
	) {
		"use strict";
		init_cjs_shims();
		var __createBinding =
			(exports2 && exports2.__createBinding) ||
			(Object.create
				? function (o, m, k, k2) {
						if (k2 === void 0) k2 = k;
						var desc = Object.getOwnPropertyDescriptor(m, k);
						if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
							desc = {
								enumerable: true,
								get: /* @__PURE__ */ __name(function () {
									return m[k];
								}, "get"),
							};
						}
						Object.defineProperty(o, k2, desc);
					}
				: function (o, m, k, k2) {
						if (k2 === void 0) k2 = k;
						o[k2] = m[k];
					});
		var __exportStar =
			(exports2 && exports2.__exportStar) ||
			function (m, exports1) {
				for (var p in m)
					if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports1, p)) __createBinding(exports1, m, p);
			};
		Object.defineProperty(exports2, "__esModule", {
			value: true,
		});
		exports2.ProposedFeatures =
			exports2.NotebookDocuments =
			exports2.TextDocuments =
			exports2.SemanticTokensBuilder =
				void 0;
		var semanticTokens_1 = require_semanticTokens();
		Object.defineProperty(exports2, "SemanticTokensBuilder", {
			enumerable: true,
			get: /* @__PURE__ */ __name(function () {
				return semanticTokens_1.SemanticTokensBuilder;
			}, "get"),
		});
		var ic = require_inlineCompletion_proposed();
		__exportStar(require_main3(), exports2);
		var textDocuments_1 = require_textDocuments();
		Object.defineProperty(exports2, "TextDocuments", {
			enumerable: true,
			get: /* @__PURE__ */ __name(function () {
				return textDocuments_1.TextDocuments;
			}, "get"),
		});
		var notebook_1 = require_notebook();
		Object.defineProperty(exports2, "NotebookDocuments", {
			enumerable: true,
			get: /* @__PURE__ */ __name(function () {
				return notebook_1.NotebookDocuments;
			}, "get"),
		});
		__exportStar(require_server(), exports2);
		var ProposedFeatures2;
		(function (ProposedFeatures3) {
			ProposedFeatures3.all = {
				__brand: "features",
				languages: ic.InlineCompletionFeature,
			};
		})(ProposedFeatures2 || (exports2.ProposedFeatures = ProposedFeatures2 = {}));
	},
});

// ../../../node_modules/.pnpm/vscode-languageserver@9.0.1/node_modules/vscode-languageserver/lib/node/main.js
var require_main4 = __commonJS({
	"../../../node_modules/.pnpm/vscode-languageserver@9.0.1/node_modules/vscode-languageserver/lib/node/main.js"(
		exports2,
	) {
		"use strict";
		init_cjs_shims();
		var __createBinding =
			(exports2 && exports2.__createBinding) ||
			(Object.create
				? function (o, m, k, k2) {
						if (k2 === void 0) k2 = k;
						var desc = Object.getOwnPropertyDescriptor(m, k);
						if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
							desc = {
								enumerable: true,
								get: /* @__PURE__ */ __name(function () {
									return m[k];
								}, "get"),
							};
						}
						Object.defineProperty(o, k2, desc);
					}
				: function (o, m, k, k2) {
						if (k2 === void 0) k2 = k;
						o[k2] = m[k];
					});
		var __exportStar =
			(exports2 && exports2.__exportStar) ||
			function (m, exports1) {
				for (var p in m)
					if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports1, p)) __createBinding(exports1, m, p);
			};
		Object.defineProperty(exports2, "__esModule", {
			value: true,
		});
		exports2.createConnection = exports2.Files = void 0;
		var node_util_1 = require("util");
		var Is2 = require_is();
		var server_1 = require_server();
		var fm = require_files();
		var node_1 = require_node2();
		__exportStar(require_node2(), exports2);
		__exportStar(require_api3(), exports2);
		var Files;
		(function (Files2) {
			Files2.uriToFilePath = fm.uriToFilePath;
			Files2.resolveGlobalNodePath = fm.resolveGlobalNodePath;
			Files2.resolveGlobalYarnPath = fm.resolveGlobalYarnPath;
			Files2.resolve = fm.resolve;
			Files2.resolveModulePath = fm.resolveModulePath;
		})(Files || (exports2.Files = Files = {}));
		var _protocolConnection;
		function endProtocolConnection() {
			if (_protocolConnection === void 0) {
				return;
			}
			try {
				_protocolConnection.end();
			} catch (_err) {}
		}
		__name(endProtocolConnection, "endProtocolConnection");
		var _shutdownReceived = false;
		var exitTimer = void 0;
		function setupExitTimer() {
			const argName = "--clientProcessId";
			function runTimer(value1) {
				try {
					let processId = parseInt(value1);
					if (!isNaN(processId)) {
						exitTimer = setInterval(() => {
							try {
								process.kill(processId, 0);
							} catch (ex) {
								endProtocolConnection();
								process.exit(_shutdownReceived ? 0 : 1);
							}
						}, 3e3);
					}
				} catch (e) {}
			}
			__name(runTimer, "runTimer");
			for (let i = 2; i < process.argv.length; i++) {
				let arg = process.argv[i];
				if (arg === argName && i + 1 < process.argv.length) {
					runTimer(process.argv[i + 1]);
					return;
				} else {
					let args = arg.split("=");
					if (args[0] === argName) {
						runTimer(args[1]);
					}
				}
			}
		}
		__name(setupExitTimer, "setupExitTimer");
		setupExitTimer();
		var watchDog = {
			initialize: /* @__PURE__ */ __name((params) => {
				const processId = params.processId;
				if (Is2.number(processId) && exitTimer === void 0) {
					setInterval(() => {
						try {
							process.kill(processId, 0);
						} catch (ex) {
							process.exit(_shutdownReceived ? 0 : 1);
						}
					}, 3e3);
				}
			}, "initialize"),
			get shutdownReceived() {
				return _shutdownReceived;
			},
			set shutdownReceived(value) {
				_shutdownReceived = value;
			},
			exit: /* @__PURE__ */ __name((code) => {
				endProtocolConnection();
				process.exit(code);
			}, "exit"),
		};
		function createConnection2(arg1, arg2, arg3, arg4) {
			let factories;
			let input;
			let output;
			let options;
			if (arg1 !== void 0 && arg1.__brand === "features") {
				factories = arg1;
				arg1 = arg2;
				arg2 = arg3;
				arg3 = arg4;
			}
			if (node_1.ConnectionStrategy.is(arg1) || node_1.ConnectionOptions.is(arg1)) {
				options = arg1;
			} else {
				input = arg1;
				output = arg2;
				options = arg3;
			}
			return _createConnection(input, output, options, factories);
		}
		__name(createConnection2, "createConnection");
		exports2.createConnection = createConnection2;
		function _createConnection(input, output, options, factories) {
			let stdio = false;
			if (!input && !output && process.argv.length > 2) {
				let port = void 0;
				let pipeName = void 0;
				let argv = process.argv.slice(2);
				for (let i = 0; i < argv.length; i++) {
					let arg = argv[i];
					if (arg === "--node-ipc") {
						input = new node_1.IPCMessageReader(process);
						output = new node_1.IPCMessageWriter(process);
						break;
					} else if (arg === "--stdio") {
						stdio = true;
						input = process.stdin;
						output = process.stdout;
						break;
					} else if (arg === "--socket") {
						port = parseInt(argv[i + 1]);
						break;
					} else if (arg === "--pipe") {
						pipeName = argv[i + 1];
						break;
					} else {
						var args = arg.split("=");
						if (args[0] === "--socket") {
							port = parseInt(args[1]);
							break;
						} else if (args[0] === "--pipe") {
							pipeName = args[1];
							break;
						}
					}
				}
				if (port) {
					let transport = (0, node_1.createServerSocketTransport)(port);
					input = transport[0];
					output = transport[1];
				} else if (pipeName) {
					let transport = (0, node_1.createServerPipeTransport)(pipeName);
					input = transport[0];
					output = transport[1];
				}
			}
			var commandLineMessage =
				"Use arguments of createConnection or set command line parameters: '--node-ipc', '--stdio' or '--socket={number}'";
			if (!input) {
				throw new Error("Connection input stream is not set. " + commandLineMessage);
			}
			if (!output) {
				throw new Error("Connection output stream is not set. " + commandLineMessage);
			}
			if (Is2.func(input.read) && Is2.func(input.on)) {
				let inputStream = input;
				inputStream.on("end", () => {
					endProtocolConnection();
					process.exit(_shutdownReceived ? 0 : 1);
				});
				inputStream.on("close", () => {
					endProtocolConnection();
					process.exit(_shutdownReceived ? 0 : 1);
				});
			}
			const connectionFactory = /* @__PURE__ */ __name((logger) => {
				const result = (0, node_1.createProtocolConnection)(input, output, logger, options);
				if (stdio) {
					patchConsole(logger);
				}
				return result;
			}, "connectionFactory");
			return (0, server_1.createConnection)(connectionFactory, watchDog, factories);
		}
		__name(_createConnection, "_createConnection");
		function patchConsole(logger) {
			function serialize(args) {
				return args.map((arg) => (typeof arg === "string" ? arg : (0, node_util_1.inspect)(arg))).join(" ");
			}
			__name(serialize, "serialize");
			const counters = /* @__PURE__ */ new Map();
			console.assert = /* @__PURE__ */ __name(function assert(assertion, ...args) {
				if (assertion) {
					return;
				}
				if (args.length === 0) {
					logger.error("Assertion failed");
				} else {
					const [message, ...rest] = args;
					logger.error(`Assertion failed: ${message} ${serialize(rest)}`);
				}
			}, "assert");
			console.count = /* @__PURE__ */ __name(function count(label = "default") {
				const message = String(label);
				let counter = counters.get(message) ?? 0;
				counter += 1;
				counters.set(message, counter);
				logger.log(`${message}: ${message}`);
			}, "count");
			console.countReset = /* @__PURE__ */ __name(function countReset(label) {
				if (label === void 0) {
					counters.clear();
				} else {
					counters.delete(String(label));
				}
			}, "countReset");
			console.debug = /* @__PURE__ */ __name(function debug(...args) {
				logger.log(serialize(args));
			}, "debug");
			console.dir = /* @__PURE__ */ __name(function dir(arg, options) {
				logger.log((0, node_util_1.inspect)(arg, options));
			}, "dir");
			console.log = /* @__PURE__ */ __name(function log(...args) {
				logger.log(serialize(args));
			}, "log");
			console.error = /* @__PURE__ */ __name(function error(...args) {
				logger.error(serialize(args));
			}, "error");
			console.trace = /* @__PURE__ */ __name(function trace(...args) {
				const stack = new Error().stack.replace(/(.+\n){2}/, "");
				let message = "Trace";
				if (args.length !== 0) {
					message += `: ${serialize(args)}`;
				}
				logger.log(`${message}
${stack}`);
			}, "trace");
			console.warn = /* @__PURE__ */ __name(function warn(...args) {
				logger.warn(serialize(args));
			}, "warn");
		}
		__name(patchConsole, "patchConsole");
	},
});

// ../../../node_modules/.pnpm/vscode-languageserver@9.0.1/node_modules/vscode-languageserver/node.js
var require_node3 = __commonJS({
	"../../../node_modules/.pnpm/vscode-languageserver@9.0.1/node_modules/vscode-languageserver/node.js"(
		exports2,
		module2,
	) {
		"use strict";
		init_cjs_shims();
		module2.exports = require_main4();
	},
});

// ../diagnostics/dist/index.js
var dist_exports = {};
__export(dist_exports, {
	APIErrorCode: () => APIErrorCode,
	CLIErrorCode: () => CLIErrorCode,
	CompilationErrorCode: () => CompilationErrorCode,
	DiagnosticCategory: () => DiagnosticCategory,
	DiagnosticSeverity: () => DiagnosticSeverity,
	MESSAGES: () => MESSAGES,
	RuntimeErrorCode: () => RuntimeErrorCode,
	SceneErrorCode: () => SceneErrorCode,
	SyntaxErrorCode: () => SyntaxErrorCode,
	WarningCode: () => WarningCode,
	createDiagnostic: () => createDiagnostic,
	formatForBrowser: () => formatForBrowser,
	formatForCLI: () => formatForCLI,
	formatForLSP: () => formatForLSP,
	formatMessage: () => formatMessage,
	formatSimple: () => formatSimple,
	getMessageTemplate: () => getMessageTemplate,
	getSuggestions: () => getSuggestions,
});
function getMessageTemplate(code) {
	return MESSAGES[code];
}
function formatMessage(code, args = {}) {
	const template = getMessageTemplate(code);
	if (!template) {
		return args.error || args.message || `Unknown error: ${code}`;
	}
	if (typeof template.message === "string") {
		return template.message;
	}
	return template.message(args);
}
function getSuggestions(code, args = {}) {
	const template = getMessageTemplate(code);
	if (!template || !template.suggestions) {
		return [];
	}
	if (typeof template.suggestions === "function") {
		return template.suggestions(args);
	}
	return template.suggestions;
}
function formatForCLI(diagnostic) {
	const lines = [];
	const code = diagnostic.code || "";
	const severity = diagnostic.severity || DiagnosticSeverity.Error;
	const message = diagnostic.message || "Unknown error";
	const indicator = severity === DiagnosticSeverity.Error ? "\u2717" : "\u26A0";
	lines.push(`${indicator} [${code}] ${message}`);
	if (diagnostic.file) {
		let location = `  at ${diagnostic.file}`;
		if (diagnostic.line !== void 0) {
			location += `:${diagnostic.line}`;
			if (diagnostic.column !== void 0) {
				location += `:${diagnostic.column}`;
			}
		}
		lines.push(location);
	}
	if (diagnostic.context) {
		lines.push("");
		lines.push(diagnostic.context);
	}
	const suggestions = diagnostic.suggestions || getSuggestions(code, diagnostic.data);
	if (suggestions.length > 0) {
		lines.push("");
		lines.push("Suggestions:");
		for (const suggestion of suggestions) {
			lines.push(`  \u2022 ${suggestion}`);
		}
	}
	if (diagnostic.related) {
		lines.push("");
		lines.push(
			`Related: ${diagnostic.related.message} at ${diagnostic.related.file}:${diagnostic.related.line}:${diagnostic.related.column}`,
		);
	}
	if (diagnostic.stackTrace && diagnostic.stackTrace.length > 0) {
		lines.push("");
		lines.push("Stack trace:");
		for (const frame of diagnostic.stackTrace) {
			const functionName = frame.functionName || "<anonymous>";
			lines.push(`  at ${functionName} (${frame.file}:${frame.line}:${frame.column})`);
		}
	}
	return lines.join("\n");
}
function formatForLSP(diagnostic) {
	const line = Math.max(0, (diagnostic.line || 1) - 1);
	const column = Math.max(0, (diagnostic.column || 1) - 1);
	const length = diagnostic.length || 1;
	const endColumn = column + length;
	let lspSeverity;
	switch (diagnostic.severity) {
		case DiagnosticSeverity.Error:
			lspSeverity = 1;
			break;
		case DiagnosticSeverity.Warning:
			lspSeverity = 2;
			break;
		case DiagnosticSeverity.Info:
			lspSeverity = 3;
			break;
		default:
			lspSeverity = 1;
	}
	const result = {
		range: {
			start: {
				line,
				character: column,
			},
			end: {
				line,
				character: endColumn,
			},
		},
		severity: lspSeverity,
		message: diagnostic.message || "Unknown error",
		source: "l8b",
	};
	if (diagnostic.code) {
		result.code = diagnostic.code;
	}
	const relatedInformation = [];
	if (diagnostic.related) {
		relatedInformation.push({
			location: {
				uri: diagnostic.related.file,
				range: {
					start: {
						line: diagnostic.related.line - 1,
						character: diagnostic.related.column - 1,
					},
					end: {
						line: diagnostic.related.line - 1,
						character: diagnostic.related.column + 10,
					},
				},
			},
			message: diagnostic.related.message || "Related location",
		});
	}
	const suggestions = diagnostic.suggestions || getSuggestions(diagnostic.code || "", diagnostic.data);
	if (suggestions.length > 0) {
		relatedInformation.push({
			location: {
				uri: diagnostic.file || "",
				range: {
					start: {
						line,
						character: column,
					},
					end: {
						line,
						character: endColumn,
					},
				},
			},
			message: `\u{1F4A1} ${suggestions[0]}`,
		});
	}
	if (relatedInformation.length > 0) {
		result.relatedInformation = relatedInformation;
	}
	return result;
}
function formatForBrowser(diagnostic) {
	const code = diagnostic.code || "";
	const message = diagnostic.message || "Unknown error";
	let formatted = "";
	if (code) {
		formatted += `[${code}] `;
	}
	formatted += message;
	if (diagnostic.file) {
		formatted += `
  at ${diagnostic.file}`;
		if (diagnostic.line !== void 0) {
			formatted += `:${diagnostic.line}`;
			if (diagnostic.column !== void 0) {
				formatted += `:${diagnostic.column}`;
			}
		}
	}
	if (diagnostic.context) {
		formatted += `

${diagnostic.context}`;
	}
	const suggestions = diagnostic.suggestions || getSuggestions(code, diagnostic.data);
	if (suggestions.length > 0) {
		formatted += "\n\nSuggestions:";
		for (const suggestion of suggestions) {
			formatted += `
  \u2022 ${suggestion}`;
		}
	}
	if (diagnostic.related) {
		formatted += `

Related: ${diagnostic.related.message} at ${diagnostic.related.file}:${diagnostic.related.line}:${diagnostic.related.column}`;
	}
	if (diagnostic.stackTrace && diagnostic.stackTrace.length > 0) {
		formatted += "\n\nStack trace:";
		for (const frame of diagnostic.stackTrace) {
			const functionName = frame.functionName || "<anonymous>";
			formatted += `
  at ${functionName} (${frame.file}:${frame.line}:${frame.column})`;
		}
	}
	return formatted;
}
function formatSimple(diagnostic) {
	const code = diagnostic.code || "";
	const message = diagnostic.message || "Unknown error";
	const location = diagnostic.file ? ` at ${diagnostic.file}${diagnostic.line ? `:${diagnostic.line}` : ""}` : "";
	return `[${code}] ${message}${location}`;
}
function createDiagnostic(code, args = {}) {
	const message = formatMessage(code, {
		...args,
		...args.data,
	});
	const suggestions =
		args.suggestions ||
		getSuggestions(code, {
			...args,
			...args.data,
		});
	return {
		code,
		severity: code.startsWith("E") ? DiagnosticSeverity.Error : DiagnosticSeverity.Warning,
		message,
		file: args.file,
		line: args.line,
		column: args.column,
		length: args.length,
		context: args.context,
		suggestions,
		related: args.related,
		stackTrace: args.stackTrace,
		data: args.data,
	};
}
var __defProp2,
	__name2,
	SyntaxErrorCode,
	RuntimeErrorCode,
	CompilationErrorCode,
	SceneErrorCode,
	CLIErrorCode,
	APIErrorCode,
	WarningCode,
	DiagnosticSeverity,
	DiagnosticCategory,
	assetMessages,
	audioMessages,
	drawMessages,
	inputMessages,
	mapMessages,
	paletteMessages,
	screenMessages,
	spriteMessages,
	storageMessages,
	timeMessages,
	validationMessages,
	apiMessages,
	cliMessages,
	compilationMessages,
	runtimeMessages,
	sceneMessages,
	syntaxMessages,
	warningMessages,
	MESSAGES;
var init_dist = __esm({
	"../diagnostics/dist/index.js"() {
		"use strict";
		init_cjs_shims();
		__defProp2 = Object.defineProperty;
		__name2 = /* @__PURE__ */ __name(
			(target, value) =>
				__defProp2(target, "name", {
					value,
					configurable: true,
				}),
			"__name",
		);
		SyntaxErrorCode = /* @__PURE__ */ (function (SyntaxErrorCode2) {
			SyntaxErrorCode2["E1001"] = "E1001";
			SyntaxErrorCode2["E1002"] = "E1002";
			SyntaxErrorCode2["E1003"] = "E1003";
			SyntaxErrorCode2["E1004"] = "E1004";
			SyntaxErrorCode2["E1005"] = "E1005";
			SyntaxErrorCode2["E1006"] = "E1006";
			SyntaxErrorCode2["E1007"] = "E1007";
			SyntaxErrorCode2["E1008"] = "E1008";
			SyntaxErrorCode2["E1009"] = "E1009";
			return SyntaxErrorCode2;
		})({});
		RuntimeErrorCode = /* @__PURE__ */ (function (RuntimeErrorCode2) {
			RuntimeErrorCode2["E2001"] = "E2001";
			RuntimeErrorCode2["E2002"] = "E2002";
			RuntimeErrorCode2["E2003"] = "E2003";
			RuntimeErrorCode2["E2004"] = "E2004";
			RuntimeErrorCode2["E2005"] = "E2005";
			return RuntimeErrorCode2;
		})({});
		CompilationErrorCode = /* @__PURE__ */ (function (CompilationErrorCode2) {
			CompilationErrorCode2["E3001"] = "E3001";
			CompilationErrorCode2["E3002"] = "E3002";
			CompilationErrorCode2["E3003"] = "E3003";
			return CompilationErrorCode2;
		})({});
		SceneErrorCode = /* @__PURE__ */ (function (SceneErrorCode2) {
			SceneErrorCode2["E5001"] = "E5001";
			SceneErrorCode2["E5002"] = "E5002";
			SceneErrorCode2["E5003"] = "E5003";
			SceneErrorCode2["E5004"] = "E5004";
			SceneErrorCode2["E5005"] = "E5005";
			SceneErrorCode2["E5006"] = "E5006";
			SceneErrorCode2["E5007"] = "E5007";
			return SceneErrorCode2;
		})({});
		CLIErrorCode = /* @__PURE__ */ (function (CLIErrorCode2) {
			CLIErrorCode2["E6001"] = "E6001";
			CLIErrorCode2["E6002"] = "E6002";
			CLIErrorCode2["E6003"] = "E6003";
			return CLIErrorCode2;
		})({});
		APIErrorCode = /* @__PURE__ */ (function (APIErrorCode2) {
			APIErrorCode2["E7001"] = "E7001";
			APIErrorCode2["E7002"] = "E7002";
			APIErrorCode2["E7003"] = "E7003";
			APIErrorCode2["E7004"] = "E7004";
			APIErrorCode2["E7005"] = "E7005";
			APIErrorCode2["E7006"] = "E7006";
			APIErrorCode2["E7007"] = "E7007";
			APIErrorCode2["E7011"] = "E7011";
			APIErrorCode2["E7012"] = "E7012";
			APIErrorCode2["E7013"] = "E7013";
			APIErrorCode2["E7014"] = "E7014";
			APIErrorCode2["E7015"] = "E7015";
			APIErrorCode2["E7016"] = "E7016";
			APIErrorCode2["E7021"] = "E7021";
			APIErrorCode2["E7022"] = "E7022";
			APIErrorCode2["E7023"] = "E7023";
			APIErrorCode2["E7024"] = "E7024";
			APIErrorCode2["E7031"] = "E7031";
			APIErrorCode2["E7032"] = "E7032";
			APIErrorCode2["E7033"] = "E7033";
			APIErrorCode2["E7034"] = "E7034";
			APIErrorCode2["E7041"] = "E7041";
			APIErrorCode2["E7042"] = "E7042";
			APIErrorCode2["E7043"] = "E7043";
			APIErrorCode2["E7044"] = "E7044";
			APIErrorCode2["E7051"] = "E7051";
			APIErrorCode2["E7052"] = "E7052";
			APIErrorCode2["E7061"] = "E7061";
			APIErrorCode2["E7062"] = "E7062";
			APIErrorCode2["E7063"] = "E7063";
			APIErrorCode2["E7071"] = "E7071";
			APIErrorCode2["E7072"] = "E7072";
			APIErrorCode2["E7073"] = "E7073";
			APIErrorCode2["E7074"] = "E7074";
			APIErrorCode2["E7075"] = "E7075";
			APIErrorCode2["E7081"] = "E7081";
			APIErrorCode2["E7082"] = "E7082";
			APIErrorCode2["E7083"] = "E7083";
			APIErrorCode2["E7084"] = "E7084";
			APIErrorCode2["E7091"] = "E7091";
			APIErrorCode2["E7092"] = "E7092";
			APIErrorCode2["E7093"] = "E7093";
			APIErrorCode2["E7100"] = "E7100";
			return APIErrorCode2;
		})({});
		WarningCode = /* @__PURE__ */ (function (WarningCode2) {
			WarningCode2["W1001"] = "W1001";
			WarningCode2["W1002"] = "W1002";
			WarningCode2["W2001"] = "W2001";
			WarningCode2["W5001"] = "W5001";
			WarningCode2["W5002"] = "W5002";
			WarningCode2["W5003"] = "W5003";
			WarningCode2["W5004"] = "W5004";
			return WarningCode2;
		})({});
		DiagnosticSeverity = /* @__PURE__ */ (function (DiagnosticSeverity22) {
			DiagnosticSeverity22["Error"] = "error";
			DiagnosticSeverity22["Warning"] = "warning";
			DiagnosticSeverity22["Info"] = "info";
			return DiagnosticSeverity22;
		})({});
		DiagnosticCategory = /* @__PURE__ */ (function (DiagnosticCategory2) {
			DiagnosticCategory2["Syntax"] = "syntax";
			DiagnosticCategory2["Runtime"] = "runtime";
			DiagnosticCategory2["Compilation"] = "compilation";
			DiagnosticCategory2["Type"] = "type";
			DiagnosticCategory2["Scene"] = "scene";
			DiagnosticCategory2["CLI"] = "cli";
			DiagnosticCategory2["API"] = "api";
			return DiagnosticCategory2;
		})({});
		assetMessages = {
			[APIErrorCode.E7041]: {
				code: APIErrorCode.E7041,
				severity: DiagnosticSeverity.Error,
				category: DiagnosticCategory.API,
				message: /* @__PURE__ */ __name2((args) => `Asset not found: '${args.assetName}'`, "message"),
				description: "The requested asset does not exist",
				suggestions: ["Check if the asset name is correct", "Verify the asset was loaded", "Check asset loading order"],
			},
			[APIErrorCode.E7042]: {
				code: APIErrorCode.E7042,
				severity: DiagnosticSeverity.Error,
				category: DiagnosticCategory.API,
				message: /* @__PURE__ */ __name2((args) => `Asset loading failed: ${args.assetName || "unknown"}`, "message"),
				description: "The asset could not be loaded",
				suggestions: [
					"Check if the asset URL is correct",
					"Verify the file exists",
					"Check network connection",
					"Check CORS settings",
				],
			},
			[APIErrorCode.E7043]: {
				code: APIErrorCode.E7043,
				severity: DiagnosticSeverity.Error,
				category: DiagnosticCategory.API,
				message: /* @__PURE__ */ __name2((args) => `Invalid asset type: '${args.assetType}'`, "message"),
				description: "The asset type is not supported",
				suggestions: ["Use a supported asset type", "Check asset type documentation"],
			},
			[APIErrorCode.E7044]: {
				code: APIErrorCode.E7044,
				severity: DiagnosticSeverity.Error,
				category: DiagnosticCategory.API,
				message: /* @__PURE__ */ __name2((args) => `Asset '${args.assetName}' is not ready`, "message"),
				description: "The asset exists but has not finished loading",
				suggestions: ["Wait for the asset to finish loading", "Check asset.ready before using it"],
			},
		};
		audioMessages = {
			[APIErrorCode.E7011]: {
				code: APIErrorCode.E7011,
				severity: DiagnosticSeverity.Error,
				category: DiagnosticCategory.API,
				message: "Audio context creation failed",
				description: "The browser could not create an AudioContext",
				suggestions: [
					"Check if the browser supports Web Audio API",
					"Try user interaction to activate audio",
					"Check browser console for more details",
				],
			},
			[APIErrorCode.E7012]: {
				code: APIErrorCode.E7012,
				severity: DiagnosticSeverity.Error,
				category: DiagnosticCategory.API,
				message: "Audio worklet failed to start",
				description: "The audio worklet processor could not be initialized",
				suggestions: [
					"Check if AudioWorklet is supported",
					"Verify the worklet code is valid",
					"Check browser console for errors",
				],
			},
			[APIErrorCode.E7013]: {
				code: APIErrorCode.E7013,
				severity: DiagnosticSeverity.Error,
				category: DiagnosticCategory.API,
				message: /* @__PURE__ */ __name2((args) => `Sound not found: '${args.soundName}'`, "message"),
				description: "The requested sound does not exist in the sound collection",
				suggestions: [
					"Check if the sound name is spelled correctly",
					"Verify the sound was loaded before use",
					"Check the sound file path",
				],
			},
			[APIErrorCode.E7014]: {
				code: APIErrorCode.E7014,
				severity: DiagnosticSeverity.Error,
				category: DiagnosticCategory.API,
				message: /* @__PURE__ */ __name2((args) => `Music not found: '${args.musicName}'`, "message"),
				description: "The requested music does not exist in the music collection",
				suggestions: [
					"Check if the music name is spelled correctly",
					"Verify the music was loaded before use",
					"Check the music file path",
				],
			},
			[APIErrorCode.E7015]: {
				code: APIErrorCode.E7015,
				severity: DiagnosticSeverity.Error,
				category: DiagnosticCategory.API,
				message: "Audio context is suspended",
				description: "The audio context requires user interaction to resume",
				suggestions: [
					"Wait for user interaction (click, touch, keypress)",
					"The context will resume automatically",
					"Check if audio autoplay is blocked",
				],
			},
			[APIErrorCode.E7016]: {
				code: APIErrorCode.E7016,
				severity: DiagnosticSeverity.Error,
				category: DiagnosticCategory.API,
				message: /* @__PURE__ */ __name2((args) => `Invalid audio parameters: ${args.error || "unknown"}`, "message"),
				description: "Audio playback parameters are invalid",
				suggestions: [
					"Check volume is between 0 and 1",
					"Check pitch is a positive number",
					"Check pan is between -1 and 1",
				],
			},
		};
		drawMessages = {
			[APIErrorCode.E7091]: {
				code: APIErrorCode.E7091,
				severity: DiagnosticSeverity.Error,
				category: DiagnosticCategory.API,
				message: /* @__PURE__ */ __name2((args) => `Drawing operation failed: ${args.operation || "unknown"}`, "message"),
				description: "A drawing operation could not be completed",
				suggestions: ["Check if drawing context is valid", "Verify drawing parameters", "Check canvas state"],
			},
			[APIErrorCode.E7092]: {
				code: APIErrorCode.E7092,
				severity: DiagnosticSeverity.Error,
				category: DiagnosticCategory.API,
				message: "Invalid drawing context",
				description: "The drawing context is invalid or not available",
				suggestions: [
					"Check if canvas context is initialized",
					"Verify context is not destroyed",
					"Reinitialize drawing context",
				],
			},
			[APIErrorCode.E7093]: {
				code: APIErrorCode.E7093,
				severity: DiagnosticSeverity.Error,
				category: DiagnosticCategory.API,
				message: /* @__PURE__ */ __name2((args) => `Invalid drawing parameters: ${args.error || "unknown"}`, "message"),
				description: "Drawing parameters are invalid",
				suggestions: [
					"Check coordinate values are valid numbers",
					"Verify dimensions are positive",
					"Check color values are valid",
					"Verify all required parameters are provided",
				],
			},
		};
		inputMessages = {
			[APIErrorCode.E7051]: {
				code: APIErrorCode.E7051,
				severity: DiagnosticSeverity.Error,
				category: DiagnosticCategory.API,
				message: /* @__PURE__ */ __name2((args) => `Input device not available: '${args.device}'`, "message"),
				description: "The requested input device is not available",
				suggestions: ["Check if the device is connected", "Verify browser permissions", "Check device support"],
			},
			[APIErrorCode.E7052]: {
				code: APIErrorCode.E7052,
				severity: DiagnosticSeverity.Error,
				category: DiagnosticCategory.API,
				message: /* @__PURE__ */ __name2((args) => `Invalid input state: ${args.error || "unknown"}`, "message"),
				description: "Input state is invalid or corrupted",
				suggestions: ["Reinitialize input system", "Check input device connections"],
			},
		};
		mapMessages = {
			[APIErrorCode.E7031]: {
				code: APIErrorCode.E7031,
				severity: DiagnosticSeverity.Error,
				category: DiagnosticCategory.API,
				message: "Map canvas context failed",
				description: "Could not get 2D context for map rendering canvas",
				suggestions: ["Check if canvas element is valid", "Verify browser supports canvas"],
			},
			[APIErrorCode.E7032]: {
				code: APIErrorCode.E7032,
				severity: DiagnosticSeverity.Error,
				category: DiagnosticCategory.API,
				message: /* @__PURE__ */ __name2((args) => `Invalid tile coordinates: (${args.x}, ${args.y})`, "message"),
				description: "Tile coordinates are out of map bounds",
				suggestions: ["Check coordinates are within map dimensions", "Verify map was properly initialized"],
			},
			[APIErrorCode.E7033]: {
				code: APIErrorCode.E7033,
				severity: DiagnosticSeverity.Error,
				category: DiagnosticCategory.API,
				message: /* @__PURE__ */ __name2((args) => `Tile sprite not found: '${args.spriteName}'`, "message"),
				description: "The sprite for the tile does not exist",
				suggestions: ["Check if the sprite name is correct", "Verify the sprite was loaded", "Check tile definition"],
			},
			[APIErrorCode.E7034]: {
				code: APIErrorCode.E7034,
				severity: DiagnosticSeverity.Error,
				category: DiagnosticCategory.API,
				message: /* @__PURE__ */ __name2(
					(args) => `Invalid map dimensions: ${args.width || "?"}x${args.height || "?"}`,
					"message",
				),
				description: "Map dimensions are invalid",
				suggestions: ["Ensure width and height are positive numbers", "Check map initialization"],
			},
		};
		paletteMessages = {
			[APIErrorCode.E7071]: {
				code: APIErrorCode.E7071,
				severity: DiagnosticSeverity.Error,
				category: DiagnosticCategory.API,
				message: /* @__PURE__ */ __name2((args) => `Palette not found: '${args.paletteName}'`, "message"),
				description: "The requested palette does not exist",
				suggestions: [
					"Check if the palette name is correct",
					"Verify the palette was loaded",
					"Check palette loading order",
				],
			},
			[APIErrorCode.E7072]: {
				code: APIErrorCode.E7072,
				severity: DiagnosticSeverity.Error,
				category: DiagnosticCategory.API,
				message: /* @__PURE__ */ __name2((args) => `Invalid palette format: ${args.format || "unknown"}`, "message"),
				description: "The palette format is not supported",
				suggestions: [
					"Use a supported palette format",
					"Check palette format documentation",
					"Verify the palette file format",
				],
			},
			[APIErrorCode.E7073]: {
				code: APIErrorCode.E7073,
				severity: DiagnosticSeverity.Error,
				category: DiagnosticCategory.API,
				message: /* @__PURE__ */ __name2(
					(args) => `Invalid color index: ${args.index} (valid range: 0-${args.maxIndex || 255})`,
					"message",
				),
				description: "The color index is out of palette range",
				suggestions: ["Check color index is within palette range", "Verify palette size", "Use a valid color index"],
			},
			[APIErrorCode.E7074]: {
				code: APIErrorCode.E7074,
				severity: DiagnosticSeverity.Error,
				category: DiagnosticCategory.API,
				message: /* @__PURE__ */ __name2((args) => `Palette loading failed: ${args.paletteName || "unknown"}`, "message"),
				description: "The palette could not be loaded",
				suggestions: [
					"Check if the palette file exists",
					"Verify the palette file format",
					"Check file permissions",
					"Check network connection if loading from URL",
				],
			},
			[APIErrorCode.E7075]: {
				code: APIErrorCode.E7075,
				severity: DiagnosticSeverity.Error,
				category: DiagnosticCategory.API,
				message: /* @__PURE__ */ __name2(
					(args) => `Invalid palette size: ${args.size || "unknown"} (expected: ${args.expectedSize || "256"})`,
					"message",
				),
				description: "The palette size is invalid",
				suggestions: [
					"Check palette size matches expected size",
					"Verify palette data is complete",
					"Check palette initialization",
				],
			},
		};
		screenMessages = {
			[APIErrorCode.E7001]: {
				code: APIErrorCode.E7001,
				severity: DiagnosticSeverity.Error,
				category: DiagnosticCategory.API,
				message: "Failed to get 2D canvas context",
				description: "The browser could not create a 2D rendering context for the canvas",
				suggestions: [
					"Check if the canvas element is valid",
					"Verify the browser supports canvas 2D rendering",
					"Check for conflicting canvas contexts",
				],
			},
			[APIErrorCode.E7002]: {
				code: APIErrorCode.E7002,
				severity: DiagnosticSeverity.Error,
				category: DiagnosticCategory.API,
				message: /* @__PURE__ */ __name2(
					(args) => `Invalid canvas dimensions: ${args.width || "?"}x${args.height || "?"}`,
					"message",
				),
				description: "Canvas dimensions are invalid (zero or negative)",
				suggestions: ["Ensure width and height are positive numbers", "Check if canvas was properly initialized"],
			},
			[APIErrorCode.E7003]: {
				code: APIErrorCode.E7003,
				severity: DiagnosticSeverity.Error,
				category: DiagnosticCategory.API,
				message: /* @__PURE__ */ __name2((args) => `Invalid color format: ${args.color}`, "message"),
				description: "The color value provided is not in a valid format",
				suggestions: [
					"Use hex format: '#RRGGBB' or '#RGB'",
					"Use named colors: 'red', 'blue', etc.",
					"Use numeric format for palette colors",
				],
			},
			[APIErrorCode.E7004]: {
				code: APIErrorCode.E7004,
				severity: DiagnosticSeverity.Error,
				category: DiagnosticCategory.API,
				message: /* @__PURE__ */ __name2((args) => `Sprite not found: '${args.spriteName}'`, "message"),
				description: "The requested sprite does not exist in the sprite collection",
				suggestions: [
					"Check if the sprite name is spelled correctly",
					"Verify the sprite was loaded before use",
					"Check if the sprite is in the correct namespace",
				],
			},
			[APIErrorCode.E7005]: {
				code: APIErrorCode.E7005,
				severity: DiagnosticSeverity.Error,
				category: DiagnosticCategory.API,
				message: /* @__PURE__ */ __name2((args) => `Sprite '${args.spriteName}' is not ready`, "message"),
				description: "The sprite exists but has not finished loading",
				suggestions: [
					"Wait for the sprite to finish loading",
					"Check sprite.ready before using it",
					"Use a callback or promise to wait for loading",
				],
			},
			[APIErrorCode.E7006]: {
				code: APIErrorCode.E7006,
				severity: DiagnosticSeverity.Error,
				category: DiagnosticCategory.API,
				message: /* @__PURE__ */ __name2((args) => `Invalid font: '${args.font}'`, "message"),
				description: "The font name is invalid or not available",
				suggestions: ["Use a valid font name", "Check if the font is loaded", "Use a fallback font"],
			},
			[APIErrorCode.E7007]: {
				code: APIErrorCode.E7007,
				severity: DiagnosticSeverity.Error,
				category: DiagnosticCategory.API,
				message: /* @__PURE__ */ __name2((args) => `Invalid blend mode: '${args.blendMode}'`, "message"),
				description: "The blend mode is not supported",
				suggestions: [
					"Use a valid blend mode: 'normal', 'additive', 'multiply', etc.",
					"Check the list of supported blend modes",
				],
			},
		};
		spriteMessages = {
			[APIErrorCode.E7021]: {
				code: APIErrorCode.E7021,
				severity: DiagnosticSeverity.Error,
				category: DiagnosticCategory.API,
				message: /* @__PURE__ */ __name2((args) => `Sprite loading failed: ${args.url || "unknown URL"}`, "message"),
				description: "The sprite image could not be loaded",
				suggestions: [
					"Check if the URL is correct",
					"Verify the image file exists",
					"Check CORS settings if loading from different domain",
					"Check browser console for network errors",
				],
			},
			[APIErrorCode.E7022]: {
				code: APIErrorCode.E7022,
				severity: DiagnosticSeverity.Error,
				category: DiagnosticCategory.API,
				message: /* @__PURE__ */ __name2((args) => `Invalid sprite properties: ${args.error || "unknown"}`, "message"),
				description: "Sprite properties are invalid",
				suggestions: [
					"Check frames is a positive number",
					"Check fps is a positive number",
					"Verify all required properties are set",
				],
			},
			[APIErrorCode.E7023]: {
				code: APIErrorCode.E7023,
				severity: DiagnosticSeverity.Error,
				category: DiagnosticCategory.API,
				message: /* @__PURE__ */ __name2((args) => `Invalid sprite URL: ${args.url}`, "message"),
				description: "The sprite URL is invalid or malformed",
				suggestions: [
					"Use a valid URL or relative path",
					"Check if the URL is properly formatted",
					"Verify the file extension is correct",
				],
			},
			[APIErrorCode.E7024]: {
				code: APIErrorCode.E7024,
				severity: DiagnosticSeverity.Error,
				category: DiagnosticCategory.API,
				message: /* @__PURE__ */ __name2(
					(args) => `Sprite frame out of bounds: frame ${args.frame} of ${args.totalFrames}`,
					"message",
				),
				description: "The requested frame index is out of range",
				suggestions: [
					"Check frame index is between 0 and totalFrames-1",
					"Verify the sprite has the expected number of frames",
				],
			},
		};
		storageMessages = {
			[APIErrorCode.E7061]: {
				code: APIErrorCode.E7061,
				severity: DiagnosticSeverity.Error,
				category: DiagnosticCategory.API,
				message: "Storage quota exceeded",
				description: "The storage quota has been exceeded",
				suggestions: ["Clear old storage data", "Reduce the amount of data stored", "Check storage quota limits"],
			},
			[APIErrorCode.E7062]: {
				code: APIErrorCode.E7062,
				severity: DiagnosticSeverity.Error,
				category: DiagnosticCategory.API,
				message: /* @__PURE__ */ __name2((args) => `Storage operation failed: ${args.error || "unknown"}`, "message"),
				description: "A storage operation could not be completed",
				suggestions: ["Check storage permissions", "Verify storage is available", "Check browser console for details"],
			},
			[APIErrorCode.E7063]: {
				code: APIErrorCode.E7063,
				severity: DiagnosticSeverity.Error,
				category: DiagnosticCategory.API,
				message: /* @__PURE__ */ __name2((args) => `Invalid storage key: '${args.key}'`, "message"),
				description: "The storage key is invalid",
				suggestions: ["Use a valid key format", "Check key length and characters"],
			},
		};
		timeMessages = {
			[APIErrorCode.E7081]: {
				code: APIErrorCode.E7081,
				severity: DiagnosticSeverity.Error,
				category: DiagnosticCategory.API,
				message: /* @__PURE__ */ __name2((args) => `Invalid time value: ${args.value || "unknown"}`, "message"),
				description: "The time value is invalid or out of range",
				suggestions: ["Check time value is a positive number", "Verify time is within valid range", "Check time format"],
			},
			[APIErrorCode.E7082]: {
				code: APIErrorCode.E7082,
				severity: DiagnosticSeverity.Error,
				category: DiagnosticCategory.API,
				message: /* @__PURE__ */ __name2((args) => `Time playback failed: ${args.error || "unknown"}`, "message"),
				description: "Time playback operation could not be completed",
				suggestions: [
					"Check if time playback is initialized",
					"Verify playback state",
					"Check for conflicting time operations",
				],
			},
			[APIErrorCode.E7083]: {
				code: APIErrorCode.E7083,
				severity: DiagnosticSeverity.Error,
				category: DiagnosticCategory.API,
				message: /* @__PURE__ */ __name2((args) => `Time recording failed: ${args.error || "unknown"}`, "message"),
				description: "Time recording operation could not be completed",
				suggestions: ["Check if time recording is initialized", "Verify recording state", "Check available storage space"],
			},
			[APIErrorCode.E7084]: {
				code: APIErrorCode.E7084,
				severity: DiagnosticSeverity.Error,
				category: DiagnosticCategory.API,
				message: /* @__PURE__ */ __name2((args) => `Invalid time format: ${args.format || "unknown"}`, "message"),
				description: "The time format is not supported",
				suggestions: ["Use a supported time format", "Check time format documentation", "Verify time string format"],
			},
		};
		validationMessages = {
			[APIErrorCode.E7100]: {
				code: APIErrorCode.E7100,
				severity: DiagnosticSeverity.Error,
				category: DiagnosticCategory.API,
				message: /* @__PURE__ */ __name2((args) => {
					const suggestion = args.suggestion;
					if (suggestion) {
						return `Unknown property '${args.propertyName}' on ${args.objectName}. Did you mean '${suggestion}'?`;
					}
					return `Unknown property '${args.propertyName}' on ${args.objectName}.`;
				}, "message"),
				description: "A property or method that does not exist on the API object was accessed",
				suggestions: [
					"Check if the property name is spelled correctly",
					"Verify the API object supports this property",
					"Check the API documentation for available properties",
				],
			},
		};
		apiMessages = {
			...screenMessages,
			...audioMessages,
			...spriteMessages,
			...mapMessages,
			...assetMessages,
			...inputMessages,
			...storageMessages,
			...paletteMessages,
			...timeMessages,
			...drawMessages,
			...validationMessages,
		};
		cliMessages = {
			[CLIErrorCode.E6001]: {
				code: CLIErrorCode.E6001,
				severity: DiagnosticSeverity.Error,
				category: DiagnosticCategory.CLI,
				message: /* @__PURE__ */ __name2((args) => String(args.error || "Configuration error"), "message"),
				description: "An error occurred while processing configuration",
				suggestions: ["Check the configuration file", "Verify all required configuration options are present"],
			},
			[CLIErrorCode.E6002]: {
				code: CLIErrorCode.E6002,
				severity: DiagnosticSeverity.Error,
				category: DiagnosticCategory.CLI,
				message: /* @__PURE__ */ __name2((args) => String(args.error || "Build error"), "message"),
				description: "An error occurred during the build process",
				suggestions: ["Check the build output for details", "Fix the reported errors and try again"],
			},
			[CLIErrorCode.E6003]: {
				code: CLIErrorCode.E6003,
				severity: DiagnosticSeverity.Error,
				category: DiagnosticCategory.CLI,
				message: /* @__PURE__ */ __name2((args) => String(args.error || "Server error"), "message"),
				description: "An error occurred in the development server",
				suggestions: ["Check the server logs for details", "Restart the development server"],
			},
		};
		compilationMessages = {
			[CompilationErrorCode.E3001]: {
				code: CompilationErrorCode.E3001,
				severity: DiagnosticSeverity.Error,
				category: DiagnosticCategory.Compilation,
				message: /* @__PURE__ */ __name2((args) => String(args.error || "Compilation failed"), "message"),
				description: "The compilation process encountered an error",
				suggestions: ["Check the error messages above for details", "Fix the reported errors and try again"],
			},
			[CompilationErrorCode.E3002]: {
				code: CompilationErrorCode.E3002,
				severity: DiagnosticSeverity.Error,
				category: DiagnosticCategory.Compilation,
				message: /* @__PURE__ */ __name2(
					(args) => `File not found: ${args.filePath || args.file || "unknown file"}`,
					"message",
				),
				description: "A required file could not be found",
				suggestions: ["Check if the file path is correct", "Verify the file exists at the specified location"],
			},
			[CompilationErrorCode.E3003]: {
				code: CompilationErrorCode.E3003,
				severity: DiagnosticSeverity.Error,
				category: DiagnosticCategory.Compilation,
				message: /* @__PURE__ */ __name2((args) => String(args.error || "Parse error"), "message"),
				description: "The source code could not be parsed",
				suggestions: ["Check the syntax of the source code", "Look for syntax errors in the file"],
			},
		};
		runtimeMessages = {
			[RuntimeErrorCode.E2001]: {
				code: RuntimeErrorCode.E2001,
				severity: DiagnosticSeverity.Error,
				category: DiagnosticCategory.Runtime,
				message: /* @__PURE__ */ __name2((args) => `Undefined variable '${args.variableName}'`, "message"),
				description: "A variable was referenced but not defined",
				suggestions: [
					"Check if the variable name is spelled correctly",
					"Verify the variable is defined before use",
					"Check the variable scope",
				],
			},
			[RuntimeErrorCode.E2002]: {
				code: RuntimeErrorCode.E2002,
				severity: DiagnosticSeverity.Error,
				category: DiagnosticCategory.Runtime,
				message: /* @__PURE__ */ __name2(
					(args) => `Type mismatch: expected ${args.expectedType}, got ${args.actualType}`,
					"message",
				),
				description: "An operation was performed with incompatible types",
				suggestions: ["Check the types of the operands", "Use type conversion if needed"],
			},
			[RuntimeErrorCode.E2003]: {
				code: RuntimeErrorCode.E2003,
				severity: DiagnosticSeverity.Error,
				category: DiagnosticCategory.Runtime,
				message: "Division by zero",
				description: "An attempt was made to divide by zero",
				suggestions: ["Check the divisor before division", "Add a conditional check to prevent division by zero"],
			},
			[RuntimeErrorCode.E2004]: {
				code: RuntimeErrorCode.E2004,
				severity: DiagnosticSeverity.Error,
				category: DiagnosticCategory.Runtime,
				message: /* @__PURE__ */ __name2((args) => `Function '${args.functionName}' not found`, "message"),
				description: "A function was called but not defined",
				suggestions: [
					"Check if the function name is spelled correctly",
					"Verify the function is defined before use",
					"Check if the function is in the correct scope",
				],
			},
			[RuntimeErrorCode.E2005]: {
				code: RuntimeErrorCode.E2005,
				severity: DiagnosticSeverity.Error,
				category: DiagnosticCategory.Runtime,
				message: /* @__PURE__ */ __name2((args) => String(args.error || "Invalid operation"), "message"),
				description: "An invalid operation was attempted",
				suggestions: ["Check the operation and its operands", "Verify the operation is valid for the given types"],
			},
		};
		sceneMessages = {
			[SceneErrorCode.E5001]: {
				code: SceneErrorCode.E5001,
				severity: DiagnosticSeverity.Error,
				category: DiagnosticCategory.Scene,
				message: /* @__PURE__ */ __name2((args) => `Invalid path: ${args.path}`, "message"),
				description: "An invalid scene path was provided",
				suggestions: ["Check the path format", "Verify the path is valid"],
			},
			[SceneErrorCode.E5002]: {
				code: SceneErrorCode.E5002,
				severity: DiagnosticSeverity.Error,
				category: DiagnosticCategory.Scene,
				message: /* @__PURE__ */ __name2((args) => `Invalid scene name: ${args.name}`, "message"),
				description: "An invalid scene name was provided",
				suggestions: ["Check the scene name format", "Verify the scene name is valid"],
			},
			[SceneErrorCode.E5003]: {
				code: SceneErrorCode.E5003,
				severity: DiagnosticSeverity.Error,
				category: DiagnosticCategory.Scene,
				message: /* @__PURE__ */ __name2((args) => `Invalid scene definition for '${args.name}'`, "message"),
				description: "A scene was defined with invalid configuration",
				suggestions: ["Check the scene definition syntax", "Verify all required properties are provided"],
			},
			[SceneErrorCode.E5004]: {
				code: SceneErrorCode.E5004,
				severity: DiagnosticSeverity.Error,
				category: DiagnosticCategory.Scene,
				message: /* @__PURE__ */ __name2((args) => `Scene not found: ${args.name}`, "message"),
				description: "A requested scene could not be found",
				suggestions: ["Check if the scene is registered", "Verify the scene name is correct"],
			},
			[SceneErrorCode.E5005]: {
				code: SceneErrorCode.E5005,
				severity: DiagnosticSeverity.Error,
				category: DiagnosticCategory.Scene,
				message: /* @__PURE__ */ __name2((args) => `No route matched for path: ${args.path}`, "message"),
				description: "No scene route matched the provided path",
				suggestions: ["Check if a route exists for this path", "Verify the path format matches the route pattern"],
			},
			[SceneErrorCode.E5006]: {
				code: SceneErrorCode.E5006,
				severity: DiagnosticSeverity.Error,
				category: DiagnosticCategory.Scene,
				message: "No scenes registered",
				description: "No scenes have been registered in the router",
				suggestions: ["Register at least one scene before using the router", "Check if scene registration is called"],
			},
			[SceneErrorCode.E5007]: {
				code: SceneErrorCode.E5007,
				severity: DiagnosticSeverity.Error,
				category: DiagnosticCategory.Scene,
				message: /* @__PURE__ */ __name2((args) => `Scene '${args.name}' has no draw() function`, "message"),
				description: "A scene is missing the required draw function",
				suggestions: ["Add a draw() function to the scene", "Check if the function name is correct"],
			},
		};
		syntaxMessages = {
			[SyntaxErrorCode.E1001]: {
				code: SyntaxErrorCode.E1001,
				severity: DiagnosticSeverity.Error,
				category: DiagnosticCategory.Syntax,
				message: /* @__PURE__ */ __name2((args) => {
					if (args.functionName) {
						return `Function '${args.functionName}' started at line ${args.functionStartLine} is not closed`;
					}
					return `Unterminated '${args.blockType || "block"}' ; no matching 'end' found`;
				}, "message"),
				description: "A function or block declaration was started but not properly closed",
				suggestions: /* @__PURE__ */ __name2((args) => {
					if (args.functionName) {
						return [
							`Add 'end' after the last statement to close function '${args.functionName}'`,
							"Check if you have an extra 'end' statement somewhere",
							"Verify all nested blocks (if, for, while) are properly closed",
						];
					}
					return [
						`Add 'end' to close the '${args.blockType || "block"}' statement`,
						"Check if you have nested blocks that need to be closed first",
					];
				}, "suggestions"),
			},
			[SyntaxErrorCode.E1002]: {
				code: SyntaxErrorCode.E1002,
				severity: DiagnosticSeverity.Error,
				category: DiagnosticCategory.Syntax,
				message: "Too many 'end' statements",
				description: "An 'end' keyword was found without a matching opening statement",
				suggestions: [
					"Remove the extra 'end' statement",
					"Check if you have a missing opening statement (if, for, while, function)",
				],
			},
			[SyntaxErrorCode.E1003]: {
				code: SyntaxErrorCode.E1003,
				severity: DiagnosticSeverity.Error,
				category: DiagnosticCategory.Syntax,
				message: "Missing 'end' statement",
				description: "A block was opened but not closed with 'end'",
				suggestions: ["Add an 'end' statement to close the block", "Check all nested blocks are properly closed"],
			},
			[SyntaxErrorCode.E1004]: {
				code: SyntaxErrorCode.E1004,
				severity: DiagnosticSeverity.Error,
				category: DiagnosticCategory.Syntax,
				message: /* @__PURE__ */ __name2((args) => String(args.error || "Unexpected token"), "message"),
				description: "An unexpected token was encountered during parsing",
				suggestions: ["Check the syntax around this location", "Verify you're using the correct syntax for this statement"],
			},
			[SyntaxErrorCode.E1005]: {
				code: SyntaxErrorCode.E1005,
				severity: DiagnosticSeverity.Error,
				category: DiagnosticCategory.Syntax,
				message: /* @__PURE__ */ __name2((args) => `Missing ${args.expected || "token"}`, "message"),
				description: "A required token was expected but not found",
				suggestions: ["Check if you're missing a required keyword or symbol", "Verify the syntax is complete"],
			},
			[SyntaxErrorCode.E1006]: {
				code: SyntaxErrorCode.E1006,
				severity: DiagnosticSeverity.Error,
				category: DiagnosticCategory.Syntax,
				message: "Unexpected end of file",
				description: "The file ended while parsing was incomplete",
				suggestions: ["Check if you're missing a closing statement", "Verify all blocks are properly closed"],
			},
			[SyntaxErrorCode.E1007]: {
				code: SyntaxErrorCode.E1007,
				severity: DiagnosticSeverity.Error,
				category: DiagnosticCategory.Syntax,
				message: /* @__PURE__ */ __name2((args) => `Misuse of reserved keyword '${args.keyword}'`, "message"),
				description: "A reserved keyword was used incorrectly",
				suggestions: ["Use a different identifier name", "Check the context where this keyword is used"],
			},
			[SyntaxErrorCode.E1008]: {
				code: SyntaxErrorCode.E1008,
				severity: DiagnosticSeverity.Error,
				category: DiagnosticCategory.Syntax,
				message: "Unterminated string",
				description: "A string literal was started but not closed",
				suggestions: ["Add a closing quote to terminate the string", "Check for escaped quotes within the string"],
			},
			[SyntaxErrorCode.E1009]: {
				code: SyntaxErrorCode.E1009,
				severity: DiagnosticSeverity.Error,
				category: DiagnosticCategory.Syntax,
				message: /* @__PURE__ */ __name2((args) => `Unterminated ${args.type || "object/array"}`, "message"),
				description: "An object or array was started but not closed",
				suggestions: ["Add a closing brace or bracket", "Check for nested objects/arrays that need to be closed first"],
			},
		};
		warningMessages = {
			// Syntax Warnings (W1xxx)
			[WarningCode.W1001]: {
				code: WarningCode.W1001,
				severity: DiagnosticSeverity.Warning,
				category: DiagnosticCategory.Syntax,
				message: /* @__PURE__ */ __name2((args) => `Assigning to API variable '${args.variableName}'`, "message"),
				description: "You are modifying a read-only API variable",
				suggestions: ["Use a local variable instead", "Check if you meant to use a different variable"],
			},
			[WarningCode.W1002]: {
				code: WarningCode.W1002,
				severity: DiagnosticSeverity.Warning,
				category: DiagnosticCategory.Syntax,
				message: "Assignment used as condition",
				description: "An assignment operator (=) was used in a condition instead of comparison (==)",
				suggestions: ["Use == for comparison instead of =", "Check if you meant to assign before comparing"],
			},
			// Runtime Warnings (W2xxx)
			[WarningCode.W2001]: {
				code: WarningCode.W2001,
				severity: DiagnosticSeverity.Warning,
				category: DiagnosticCategory.Runtime,
				message: /* @__PURE__ */ __name2((args) => `Deprecated API usage: ${args.apiName}`, "message"),
				description: "A deprecated API is being used",
				suggestions: ["Update to the new API", "Check the documentation for migration guide"],
			},
			// Scene Warnings (W5xxx)
			[WarningCode.W5001]: {
				code: WarningCode.W5001,
				severity: DiagnosticSeverity.Warning,
				category: DiagnosticCategory.Scene,
				message: /* @__PURE__ */ __name2((args) => `Activating first available scene: ${args.sceneName}`, "message"),
				description: "No route matched, so the first scene was activated",
				suggestions: ["Register a route for the initial path", "Check if the route pattern is correct"],
			},
			[WarningCode.W5002]: {
				code: WarningCode.W5002,
				severity: DiagnosticSeverity.Warning,
				category: DiagnosticCategory.Scene,
				message: /* @__PURE__ */ __name2(
					(args) => `No route matched initial path, activating first scene: ${args.sceneName}`,
					"message",
				),
				description: "The initial path didn't match any route",
				suggestions: ["Register a route for the initial path", "Check if the route pattern matches the initial path"],
			},
			[WarningCode.W5003]: {
				code: WarningCode.W5003,
				severity: DiagnosticSeverity.Warning,
				category: DiagnosticCategory.Scene,
				message: "No scenes registered. Game may show blank screen.",
				description: "No scenes have been registered",
				suggestions: ["Register at least one scene", "Check if scene registration is called"],
			},
			[WarningCode.W5004]: {
				code: WarningCode.W5004,
				severity: DiagnosticSeverity.Warning,
				category: DiagnosticCategory.Scene,
				message: "No scenes registered. Make sure to call scene() before router.init().",
				description: "Router was initialized before any scenes were registered",
				suggestions: ["Register scenes before calling router.init()", "Check the order of initialization"],
			},
		};
		MESSAGES = {
			...syntaxMessages,
			...runtimeMessages,
			...compilationMessages,
			...sceneMessages,
			...cliMessages,
			...apiMessages,
			...warningMessages,
		};
		__name(getMessageTemplate, "getMessageTemplate");
		__name2(getMessageTemplate, "getMessageTemplate");
		__name(formatMessage, "formatMessage");
		__name2(formatMessage, "formatMessage");
		__name(getSuggestions, "getSuggestions");
		__name2(getSuggestions, "getSuggestions");
		__name(formatForCLI, "formatForCLI");
		__name2(formatForCLI, "formatForCLI");
		__name(formatForLSP, "formatForLSP");
		__name2(formatForLSP, "formatForLSP");
		__name(formatForBrowser, "formatForBrowser");
		__name2(formatForBrowser, "formatForBrowser");
		__name(formatSimple, "formatSimple");
		__name2(formatSimple, "formatSimple");
		__name(createDiagnostic, "createDiagnostic");
		__name2(createDiagnostic, "createDiagnostic");
	},
});

// ../../lootiscript/dist/v1/parser.js
var require_parser = __commonJS({
	"../../lootiscript/dist/v1/parser.js"(exports2, module2) {
		"use strict";
		init_cjs_shims();
		var __defProp3 = Object.defineProperty;
		var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
		var __getOwnPropNames2 = Object.getOwnPropertyNames;
		var __hasOwnProp2 = Object.prototype.hasOwnProperty;
		var __name3 = /* @__PURE__ */ __name(
			(target, value) =>
				__defProp3(target, "name", {
					value,
					configurable: true,
				}),
			"__name",
		);
		var __export2 = /* @__PURE__ */ __name((target, all) => {
			for (var name in all)
				__defProp3(target, name, {
					get: all[name],
					enumerable: true,
				});
		}, "__export");
		var __copyProps2 = /* @__PURE__ */ __name((to, from, except, desc) => {
			if ((from && typeof from === "object") || typeof from === "function") {
				for (let key of __getOwnPropNames2(from))
					if (!__hasOwnProp2.call(to, key) && key !== except)
						__defProp3(to, key, {
							get: /* @__PURE__ */ __name(() => from[key], "get"),
							enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable,
						});
			}
			return to;
		}, "__copyProps");
		var __toCommonJS2 = /* @__PURE__ */ __name(
			(mod) =>
				__copyProps2(
					__defProp3({}, "__esModule", {
						value: true,
					}),
					mod,
				),
			"__toCommonJS",
		);
		var parser_exports2 = {};
		__export2(parser_exports2, {
			LootiScriptError: /* @__PURE__ */ __name(() => LootiScriptError, "LootiScriptError"),
			LootiSyntaxError: /* @__PURE__ */ __name(() => LootiSyntaxError, "LootiSyntaxError"),
			Parser: /* @__PURE__ */ __name(() => Parser3, "Parser"),
			formatSourceContext: /* @__PURE__ */ __name(() => formatSourceContext, "formatSourceContext"),
		});
		module2.exports = __toCommonJS2(parser_exports2);
		var import_diagnostics2 = (init_dist(), __toCommonJS(dist_exports));
		var OPCODES_CLASS = class OPCODES_CLASS2 {
			static {
				__name(this, "OPCODES_CLASS2");
			}
			static {
				__name3(this, "OPCODES_CLASS");
			}
			table = {};
			set(op, code) {
				this[op] = code;
				this[code] = op;
				this.table[op] = code;
				this.table[code] = op;
				return code;
			}
			// Opcode constants
			TYPE = 1;
			VARIABLE_TYPE = 2;
			PROPERTY_TYPE = 3;
			LOAD_IMPORT = 4;
			LOAD_THIS = 5;
			LOAD_GLOBAL = 6;
			LOAD_VALUE = 10;
			LOAD_LOCAL = 11;
			LOAD_VARIABLE = 12;
			LOAD_LOCAL_OBJECT = 13;
			LOAD_VARIABLE_OBJECT = 14;
			POP = 15;
			LOAD_PROPERTY = 16;
			LOAD_PROPERTY_OBJECT = 17;
			CREATE_OBJECT = 18;
			MAKE_OBJECT = 19;
			CREATE_ARRAY = 20;
			STORE_LOCAL = 21;
			STORE_VARIABLE = 23;
			CREATE_PROPERTY = 24;
			STORE_PROPERTY = 25;
			DELETE = 26;
			UPDATE_CLASS = 27;
			CREATE_CLASS = 28;
			NEW_CALL = 29;
			ADD = 30;
			SUB = 31;
			MUL = 32;
			DIV = 33;
			MODULO = 34;
			BINARY_AND = 35;
			BINARY_OR = 36;
			SHIFT_LEFT = 37;
			SHIFT_RIGHT = 38;
			NEGATE = 39;
			EQ = 40;
			NEQ = 41;
			LT = 42;
			GT = 43;
			LTE = 44;
			GTE = 45;
			NOT = 50;
			LOAD_PROPERTY_ATOP = 68;
			JUMP = 80;
			JUMPY = 81;
			JUMPN = 82;
			JUMPY_NOPOP = 83;
			JUMPN_NOPOP = 84;
			LOAD_ROUTINE = 89;
			FUNCTION_CALL = 90;
			FUNCTION_APPLY_VARIABLE = 91;
			FUNCTION_APPLY_PROPERTY = 92;
			SUPER_CALL = 93;
			RETURN = 94;
			FORLOOP_INIT = 95;
			FORLOOP_CONTROL = 96;
			FORIN_INIT = 97;
			FORIN_CONTROL = 98;
			UNARY_OP = 100;
			BINARY_OP = 101;
			COMPILED = 200;
			AFTER = 110;
			EVERY = 111;
			DO = 112;
			SLEEP = 113;
			/**
			 * Fused opcodes - Performance optimization
			 *
			 * Combines common operation pairs into single opcodes to reduce
			 * instruction dispatch overhead and improve cache locality.
			 * Typical performance gain: 15-30% for hot paths.
			 */
			LOAD_VAR_CALL = 120;
			LOAD_PROP_CALL = 121;
			LOAD_CONST_ADD = 122;
			constructor() {
				this.set("TYPE", 1);
				this.set("VARIABLE_TYPE", 2);
				this.set("PROPERTY_TYPE", 3);
				this.set("LOAD_IMPORT", 4);
				this.set("LOAD_THIS", 5);
				this.set("LOAD_GLOBAL", 6);
				this.set("LOAD_VALUE", 10);
				this.set("LOAD_LOCAL", 11);
				this.set("LOAD_VARIABLE", 12);
				this.set("LOAD_LOCAL_OBJECT", 13);
				this.set("LOAD_VARIABLE_OBJECT", 14);
				this.set("POP", 15);
				this.set("LOAD_PROPERTY", 16);
				this.set("LOAD_PROPERTY_OBJECT", 17);
				this.set("CREATE_OBJECT", 18);
				this.set("MAKE_OBJECT", 19);
				this.set("CREATE_ARRAY", 20);
				this.set("STORE_LOCAL", 21);
				this.set("STORE_VARIABLE", 23);
				this.set("CREATE_PROPERTY", 24);
				this.set("STORE_PROPERTY", 25);
				this.set("DELETE", 26);
				this.set("UPDATE_CLASS", 27);
				this.set("CREATE_CLASS", 28);
				this.set("NEW_CALL", 29);
				this.set("ADD", 30);
				this.set("SUB", 31);
				this.set("MUL", 32);
				this.set("DIV", 33);
				this.set("MODULO", 34);
				this.set("BINARY_AND", 35);
				this.set("BINARY_OR", 36);
				this.set("SHIFT_LEFT", 37);
				this.set("SHIFT_RIGHT", 38);
				this.set("NEGATE", 39);
				this.set("EQ", 40);
				this.set("NEQ", 41);
				this.set("LT", 42);
				this.set("GT", 43);
				this.set("LTE", 44);
				this.set("GTE", 45);
				this.set("NOT", 50);
				this.set("LOAD_PROPERTY_ATOP", 68);
				this.set("JUMP", 80);
				this.set("JUMPY", 81);
				this.set("JUMPN", 82);
				this.set("JUMPY_NOPOP", 83);
				this.set("JUMPN_NOPOP", 84);
				this.set("LOAD_ROUTINE", 89);
				this.set("FUNCTION_CALL", 90);
				this.set("FUNCTION_APPLY_VARIABLE", 91);
				this.set("FUNCTION_APPLY_PROPERTY", 92);
				this.set("SUPER_CALL", 93);
				this.set("RETURN", 94);
				this.set("FORLOOP_INIT", 95);
				this.set("FORLOOP_CONTROL", 96);
				this.set("FORIN_INIT", 97);
				this.set("FORIN_CONTROL", 98);
				this.set("UNARY_OP", 100);
				this.set("BINARY_OP", 101);
				this.set("COMPILED", 200);
				this.set("AFTER", 110);
				this.set("EVERY", 111);
				this.set("DO", 112);
				this.set("SLEEP", 113);
				this.set("LOAD_VAR_CALL", 120);
				this.set("LOAD_PROP_CALL", 121);
				this.set("LOAD_CONST_ADD", 122);
			}
		};
		var OPCODES = new OPCODES_CLASS();
		var Routine = class _Routine {
			static {
				__name(this, "_Routine");
			}
			static {
				__name3(this, "Routine");
			}
			num_args;
			ops;
			opcodes;
			arg1;
			ref;
			label_count;
			labels;
			transpile;
			import_refs;
			import_values;
			import_self;
			locals_size;
			uses_arguments;
			as_function;
			object;
			callback;
			/**
			 * Inline caches mapped by opcode index
			 *
			 * Caches property lookups and method calls to avoid repeated
			 * hash table lookups. Significantly improves performance for
			 * hot code paths with stable object shapes.
			 */
			ics;
			constructor(num_args = 0) {
				this.num_args = num_args;
				this.ops = [];
				this.opcodes = [];
				this.arg1 = [];
				this.ref = [];
				this.label_count = 0;
				this.labels = {};
				this.transpile = false;
				this.import_refs = [];
				this.import_values = [];
				this.import_self = -1;
				this.ics = {};
			}
			clone() {
				const r = new _Routine(this.num_args);
				r.opcodes = this.opcodes;
				r.arg1 = this.arg1;
				r.ref = this.ref;
				r.locals_size = this.locals_size;
				r.uses_arguments = this.uses_arguments;
				return r;
			}
			createLabel(str = "label") {
				return ":" + str + "_" + this.label_count++;
			}
			setLabel(name) {
				return (this.labels[name] = this.opcodes.length);
			}
			optimize() {
				if (this.transpile) {
					new Transpiler().transpile(this);
				}
			}
			removeable(index) {
				const labels = this.labels;
				for (const label in labels) {
					const value = labels[label];
					if (value === index) {
						return false;
					}
				}
				return true;
			}
			remove(index) {
				const labels = this.labels;
				for (const label in labels) {
					const value = labels[label];
					if (value === index) {
						return false;
					} else if (value > index) {
						this.labels[label] -= 1;
					}
				}
				this.opcodes.splice(index, 1);
				this.arg1.splice(index, 1);
				this.ref.splice(index, 1);
				return true;
			}
			resolveLabels() {
				for (let i = 0; i < this.opcodes.length; i++) {
					const opcode = this.opcodes[i];
					if (
						opcode === OPCODES.JUMP ||
						opcode === OPCODES.JUMPY ||
						opcode === OPCODES.JUMPN ||
						opcode === OPCODES.JUMPY_NOPOP ||
						opcode === OPCODES.JUMPN_NOPOP
					) {
						if (this.labels[this.arg1[i]]) {
							this.arg1[i] = this.labels[this.arg1[i]];
						}
					} else if (
						opcode === OPCODES.FORLOOP_CONTROL ||
						opcode === OPCODES.FORLOOP_INIT ||
						opcode === OPCODES.FORIN_CONTROL ||
						opcode === OPCODES.FORIN_INIT
					) {
						const args = this.arg1[i];
						if (args && this.labels[args[1]]) {
							args[1] = this.labels[args[1]];
						}
					}
				}
			}
			OP(code, ref, v1 = 0) {
				this.opcodes.push(code);
				this.arg1.push(v1);
				return this.ref.push(ref);
			}
			OP_INSERT(code, ref, v1 = 0, index) {
				this.opcodes.splice(index, 0, code);
				this.arg1.splice(index, 0, v1);
				this.ref.splice(index, 0, ref);
				const labels = this.labels;
				for (const label in labels) {
					const value = labels[label];
					if (value >= index) {
						this.labels[label] += 1;
					}
				}
			}
			TYPE(ref) {
				return this.OP(OPCODES.TYPE, ref);
			}
			VARIABLE_TYPE(variable, ref) {
				return this.OP(OPCODES.VARIABLE_TYPE, ref, variable);
			}
			PROPERTY_TYPE(ref) {
				return this.OP(OPCODES.PROPERTY_TYPE, ref);
			}
			LOAD_THIS(ref) {
				return this.OP(OPCODES.LOAD_THIS, ref);
			}
			LOAD_GLOBAL(ref) {
				return this.OP(OPCODES.LOAD_GLOBAL, ref);
			}
			LOAD_VALUE(value, ref) {
				return this.OP(OPCODES.LOAD_VALUE, ref, value);
			}
			LOAD_LOCAL(index, ref) {
				return this.OP(OPCODES.LOAD_LOCAL, ref, index);
			}
			LOAD_VARIABLE(variable, ref) {
				return this.OP(OPCODES.LOAD_VARIABLE, ref, variable);
			}
			LOAD_LOCAL_OBJECT(index, ref) {
				return this.OP(OPCODES.LOAD_LOCAL_OBJECT, ref, index);
			}
			LOAD_VARIABLE_OBJECT(variable, ref) {
				return this.OP(OPCODES.LOAD_VARIABLE_OBJECT, ref, variable);
			}
			POP(ref) {
				return this.OP(OPCODES.POP, ref);
			}
			LOAD_PROPERTY(ref) {
				return this.OP(OPCODES.LOAD_PROPERTY, ref);
			}
			LOAD_PROPERTY_OBJECT(ref) {
				return this.OP(OPCODES.LOAD_PROPERTY_OBJECT, ref);
			}
			CREATE_OBJECT(ref) {
				return this.OP(OPCODES.CREATE_OBJECT, ref);
			}
			MAKE_OBJECT(ref) {
				return this.OP(OPCODES.MAKE_OBJECT, ref);
			}
			CREATE_ARRAY(ref) {
				return this.OP(OPCODES.CREATE_ARRAY, ref);
			}
			CREATE_CLASS(parent_var, ref) {
				return this.OP(OPCODES.CREATE_CLASS, ref, parent_var);
			}
			UPDATE_CLASS(variable, ref) {
				return this.OP(OPCODES.UPDATE_CLASS, ref, variable);
			}
			NEW_CALL(args, ref) {
				return this.OP(OPCODES.NEW_CALL, ref, args);
			}
			ADD(ref, self = 0) {
				return this.OP(OPCODES.ADD, ref, self);
			}
			SUB(ref, self = 0) {
				return this.OP(OPCODES.SUB, ref, self);
			}
			MUL(ref) {
				return this.OP(OPCODES.MUL, ref);
			}
			DIV(ref) {
				return this.OP(OPCODES.DIV, ref);
			}
			MODULO(ref) {
				return this.OP(OPCODES.MODULO, ref);
			}
			BINARY_AND(ref) {
				return this.OP(OPCODES.BINARY_AND, ref);
			}
			BINARY_OR(ref) {
				return this.OP(OPCODES.BINARY_OR, ref);
			}
			SHIFT_LEFT(ref) {
				return this.OP(OPCODES.SHIFT_LEFT, ref);
			}
			SHIFT_RIGHT(ref) {
				return this.OP(OPCODES.SHIFT_RIGHT, ref);
			}
			NEGATE(ref) {
				return this.OP(OPCODES.NEGATE, ref);
			}
			LOAD_PROPERTY_ATOP(ref) {
				return this.OP(OPCODES.LOAD_PROPERTY_ATOP, ref);
			}
			EQ(ref) {
				return this.OP(OPCODES.EQ, ref);
			}
			NEQ(ref) {
				return this.OP(OPCODES.NEQ, ref);
			}
			LT(ref) {
				return this.OP(OPCODES.LT, ref);
			}
			GT(ref) {
				return this.OP(OPCODES.GT, ref);
			}
			LTE(ref) {
				return this.OP(OPCODES.LTE, ref);
			}
			GTE(ref) {
				return this.OP(OPCODES.GTE, ref);
			}
			NOT(ref) {
				return this.OP(OPCODES.NOT, ref);
			}
			FORLOOP_INIT(iterator, ref) {
				return this.OP(OPCODES.FORLOOP_INIT, ref, iterator);
			}
			FORLOOP_CONTROL(args, ref) {
				return this.OP(OPCODES.FORLOOP_CONTROL, ref, args);
			}
			FORIN_INIT(args, ref) {
				return this.OP(OPCODES.FORIN_INIT, ref, args);
			}
			FORIN_CONTROL(args, ref) {
				return this.OP(OPCODES.FORIN_CONTROL, ref, args);
			}
			JUMP(index, ref) {
				return this.OP(OPCODES.JUMP, ref, index);
			}
			JUMPY(index, ref) {
				return this.OP(OPCODES.JUMPY, ref, index);
			}
			JUMPN(index, ref) {
				return this.OP(OPCODES.JUMPN, ref, index);
			}
			JUMPY_NOPOP(index, ref) {
				return this.OP(OPCODES.JUMPY_NOPOP, ref, index);
			}
			JUMPN_NOPOP(index, ref) {
				return this.OP(OPCODES.JUMPN_NOPOP, ref, index);
			}
			STORE_LOCAL(index, ref) {
				return this.OP(OPCODES.STORE_LOCAL, ref, index);
			}
			STORE_VARIABLE(field, ref) {
				return this.OP(OPCODES.STORE_VARIABLE, ref, field);
			}
			CREATE_PROPERTY(ref) {
				return this.OP(OPCODES.CREATE_PROPERTY, ref);
			}
			STORE_PROPERTY(ref) {
				return this.OP(OPCODES.STORE_PROPERTY, ref);
			}
			LOAD_ROUTINE(value, ref) {
				return this.OP(OPCODES.LOAD_ROUTINE, ref, value);
			}
			FUNCTION_CALL(args, ref) {
				return this.OP(OPCODES.FUNCTION_CALL, ref, args);
			}
			FUNCTION_APPLY_VARIABLE(args, ref) {
				return this.OP(OPCODES.FUNCTION_APPLY_VARIABLE, ref, args);
			}
			FUNCTION_APPLY_PROPERTY(args, ref) {
				return this.OP(OPCODES.FUNCTION_APPLY_PROPERTY, ref, args);
			}
			SUPER_CALL(args, ref) {
				return this.OP(OPCODES.SUPER_CALL, ref, args);
			}
			RETURN(ref) {
				return this.OP(OPCODES.RETURN, ref);
			}
			AFTER(ref) {
				return this.OP(OPCODES.AFTER, ref);
			}
			EVERY(ref) {
				return this.OP(OPCODES.EVERY, ref);
			}
			DO(ref) {
				return this.OP(OPCODES.DO, ref);
			}
			SLEEP(ref) {
				return this.OP(OPCODES.SLEEP, ref);
			}
			DELETE(ref) {
				return this.OP(OPCODES.DELETE, ref);
			}
			UNARY_OP(f2, ref) {
				return this.OP(OPCODES.UNARY_OP, ref, f2);
			}
			BINARY_OP(f2, ref) {
				return this.OP(OPCODES.BINARY_OP, ref, f2);
			}
			toString() {
				let s = "";
				for (let i = 0; i < this.opcodes.length; i++) {
					const op = this.opcodes[i];
					s += OPCODES[op];
					if (this.arg1[i] != null) {
						s += ` ${this.arg1[i]}`;
					}
					s += "\n";
				}
				return s;
			}
			exportArg(arg) {
				if (arg == null) {
					return 0;
				} else if (arg instanceof _Routine) {
					return arg.export();
				} else if (typeof arg === "function") {
					return arg.name;
				} else {
					return arg;
				}
			}
			export() {
				const args = [];
				for (let i = 0; i < this.arg1.length; i++) {
					args[i] = this.exportArg(this.arg1[i]);
				}
				return {
					num_args: this.num_args,
					ops: this.opcodes,
					args,
					import_refs: this.import_refs,
					import_values: this.import_values,
					import_self: this.import_self,
					locals_size: this.locals_size,
				};
			}
			import(src) {
				this.num_args = src.num_args;
				this.opcodes = src.ops;
				this.arg1 = src.args;
				this.import_refs = src.import_refs;
				this.import_values = src.import_values;
				this.import_self = src.import_self;
				this.locals_size = src.locals_size;
				const token = {
					line: 0,
					column: 0,
					start: 0,
					length: 0,
					index: 0,
					tokenizer: {
						filename: "filename",
						input: "",
					},
				};
				const ref = {
					expression: {
						token,
					},
					token,
				};
				for (let i = 0; i < this.opcodes.length; i++) {
					if (this.opcodes[i] === 100) {
						this.arg1[i] = Compiler.predefined_unary_functions[this.arg1[i]];
					} else if (this.opcodes[i] === 101) {
						this.arg1[i] = Compiler.predefined_binary_functions[this.arg1[i]];
					} else if (typeof this.arg1[i] === "object" && !Array.isArray(this.arg1[i])) {
						this.arg1[i] = new _Routine(0).import(this.arg1[i]);
					}
					this.ref[i] = ref;
				}
				return this;
			}
		};
		var Expression = class {
			static {
				__name(this, "Expression");
			}
			static {
				__name3(this, "Expression");
			}
			nowarning;
			nopop;
			constructor() {}
		};
		var Program = class _Program {
			static {
				__name(this, "_Program");
			}
			static {
				__name3(this, "Program");
			}
			statements = [];
			// Static references (will be assigned after class declarations)
			static Field;
			static Variable;
			static Assignment;
			constructor() {
				this.statements = [];
			}
			add(statement) {
				return this.statements.push(statement);
			}
			isAssignment() {
				return this.statements.length > 0 && this.statements[this.statements.length - 1] instanceof Assignment;
			}
			/**
			 * Convert value to string representation
			 */
			static toString(value, nesting = 0) {
				let i;
				let key;
				let pref;
				let s;
				let v;
				if (value instanceof Routine) {
					if (nesting === 0) {
						return value.source || "[function]";
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
						s += _Program.toString(v, nesting + 1) + (i < value.length - 1 ? "," : "");
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
						s +=
							pref +
							`  ${key} = ${_Program.toString(v, nesting + 1)}
`;
					}
					return s + pref + "end";
				}
				return value || 0;
			}
			/**
			 * Operator precedence table
			 */
			static Precedence = {
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
			static CreateFieldAccess(token, expression, field) {
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
			static BuildOperations(ops, terms) {
				let i;
				let o;
				let o1;
				let o2;
				let t1;
				let t22;
				while (ops.length > 1) {
					i = 0;
					while (i < ops.length - 1) {
						o1 = ops[i];
						o2 = ops[i + 1];
						if (_Program.Precedence[o2.operation] <= _Program.Precedence[o1.operation]) {
							break;
						}
						i++;
					}
					t1 = terms[i];
					t22 = terms[i + 1];
					o = new Operation(ops[i].token, ops[i].operation, t1, t22);
					terms.splice(i, 2, o);
					ops.splice(i, 1);
				}
				return new Operation(ops[0].token, ops[0].operation, terms[0], terms[1]);
			}
		};
		var Assignment = class extends Expression {
			static {
				__name(this, "Assignment");
			}
			static {
				__name3(this, "Assignment");
			}
			token;
			field;
			expression;
			local;
			constructor(token, field, expression, local) {
				super();
				this.token = token;
				this.field = field;
				this.expression = expression;
				this.local = local;
			}
		};
		var SelfAssignment = class extends Expression {
			static {
				__name(this, "SelfAssignment");
			}
			static {
				__name3(this, "SelfAssignment");
			}
			token;
			field;
			operation;
			expression;
			constructor(token, field, operation, expression) {
				super();
				this.token = token;
				this.field = field;
				this.operation = operation;
				this.expression = expression;
			}
		};
		var Value = class extends Expression {
			static {
				__name(this, "Value");
			}
			static {
				__name3(this, "Value");
			}
			token;
			type;
			value;
			static TYPE_NUMBER = 1;
			static TYPE_STRING = 2;
			static TYPE_ARRAY = 3;
			static TYPE_OBJECT = 4;
			static TYPE_FUNCTION = 5;
			static TYPE_CLASS = 6;
			constructor(token, type, value) {
				super();
				this.token = token;
				this.type = type;
				this.value = value;
			}
		};
		var Variable = class extends Expression {
			static {
				__name(this, "Variable");
			}
			static {
				__name3(this, "Variable");
			}
			token;
			identifier;
			constructor(token, identifier) {
				super();
				this.token = token;
				this.identifier = identifier;
			}
		};
		var Field = class extends Expression {
			static {
				__name(this, "Field");
			}
			static {
				__name3(this, "Field");
			}
			token;
			expression;
			chain;
			constructor(token, expression, chain) {
				super();
				this.token = token;
				this.expression = expression;
				this.chain = chain;
				this.token = expression instanceof Expression ? expression.token : token;
			}
			appendField(field) {
				return this.chain.push(field);
			}
		};
		var Operation = class extends Expression {
			static {
				__name(this, "Operation");
			}
			static {
				__name3(this, "Operation");
			}
			token;
			operation;
			term1;
			term2;
			constructor(token, operation, term1, term2) {
				super();
				this.token = token;
				this.operation = operation;
				this.term1 = term1;
				this.term2 = term2;
			}
		};
		var Negate = class extends Expression {
			static {
				__name(this, "Negate");
			}
			static {
				__name3(this, "Negate");
			}
			token;
			expression;
			constructor(token, expression) {
				super();
				this.token = token;
				this.expression = expression;
			}
		};
		var Not = class extends Expression {
			static {
				__name(this, "Not");
			}
			static {
				__name3(this, "Not");
			}
			token;
			expression;
			constructor(token, expression) {
				super();
				this.token = token;
				this.expression = expression;
			}
		};
		var Braced = class extends Expression {
			static {
				__name(this, "Braced");
			}
			static {
				__name3(this, "Braced");
			}
			token;
			expression;
			constructor(token, expression) {
				super();
				this.token = token;
				this.expression = expression;
			}
		};
		var Return = class extends Expression {
			static {
				__name(this, "Return");
			}
			static {
				__name3(this, "Return");
			}
			token;
			expression;
			constructor(token, expression) {
				super();
				this.token = token;
				this.expression = expression;
			}
		};
		var Condition = class extends Expression {
			static {
				__name(this, "Condition");
			}
			static {
				__name3(this, "Condition");
			}
			token;
			chain;
			constructor(token, chain) {
				super();
				this.token = token;
				this.chain = chain;
			}
		};
		var For = class extends Expression {
			static {
				__name(this, "For");
			}
			static {
				__name3(this, "For");
			}
			token;
			iterator;
			range_from;
			range_to;
			range_by;
			sequence;
			constructor(token, iterator, range_from, range_to, range_by, sequence) {
				super();
				this.token = token;
				this.iterator = iterator;
				this.range_from = range_from;
				this.range_to = range_to;
				this.range_by = range_by;
				this.sequence = sequence;
			}
		};
		var ForIn = class extends Expression {
			static {
				__name(this, "ForIn");
			}
			static {
				__name3(this, "ForIn");
			}
			token;
			iterator;
			list;
			sequence;
			constructor(token, iterator, list, sequence) {
				super();
				this.token = token;
				this.iterator = iterator;
				this.list = list;
				this.sequence = sequence;
			}
		};
		var While = class extends Expression {
			static {
				__name(this, "While");
			}
			static {
				__name3(this, "While");
			}
			token;
			condition;
			sequence;
			constructor(token, condition, sequence) {
				super();
				this.token = token;
				this.condition = condition;
				this.sequence = sequence;
			}
		};
		var Break = class extends Expression {
			static {
				__name(this, "Break");
			}
			static {
				__name3(this, "Break");
			}
			token;
			nopop = true;
			constructor(token) {
				super();
				this.token = token;
				this.nopop = true;
			}
		};
		var Continue = class extends Expression {
			static {
				__name(this, "Continue");
			}
			static {
				__name3(this, "Continue");
			}
			token;
			nopop = true;
			constructor(token) {
				super();
				this.token = token;
				this.nopop = true;
			}
		};
		var Function = class extends Expression {
			static {
				__name(this, "Function");
			}
			static {
				__name3(this, "Function");
			}
			token;
			args;
			sequence;
			source;
			constructor(token, args, sequence, end) {
				super();
				this.token = token;
				this.args = args;
				this.sequence = sequence;
				this.source = "function" + token.tokenizer.input.substring(token.index, end.index + 2);
			}
		};
		var FunctionCall = class extends Expression {
			static {
				__name(this, "FunctionCall");
			}
			static {
				__name3(this, "FunctionCall");
			}
			token;
			expression;
			args;
			constructor(token, expression, args) {
				super();
				this.token = token;
				this.expression = expression;
				this.args = args;
			}
		};
		var CreateObject = class extends Expression {
			static {
				__name(this, "CreateObject");
			}
			static {
				__name3(this, "CreateObject");
			}
			token;
			fields;
			constructor(token, fields) {
				super();
				this.token = token;
				this.fields = fields;
			}
		};
		var CreateClass = class extends Expression {
			static {
				__name(this, "CreateClass");
			}
			static {
				__name3(this, "CreateClass");
			}
			token;
			ext;
			fields;
			constructor(token, ext, fields) {
				super();
				this.token = token;
				this.ext = ext;
				this.fields = fields;
			}
		};
		var NewCall = class extends Expression {
			static {
				__name(this, "NewCall");
			}
			static {
				__name3(this, "NewCall");
			}
			token;
			expression;
			constructor(token, expression) {
				super();
				this.token = token;
				this.expression = expression;
				if (!(this.expression instanceof FunctionCall)) {
					this.expression = new FunctionCall(this.token, this.expression, []);
				}
			}
		};
		var After = class extends Expression {
			static {
				__name(this, "After");
			}
			static {
				__name3(this, "After");
			}
			token;
			delay;
			sequence;
			multiplier;
			source;
			constructor(token, delay, sequence, end, multiplier) {
				super();
				this.token = token;
				this.delay = delay;
				this.sequence = sequence;
				this.multiplier = multiplier;
				this.source = "after " + token.tokenizer.input.substring(token.index, end.index + 2);
			}
		};
		var Every = class extends Expression {
			static {
				__name(this, "Every");
			}
			static {
				__name3(this, "Every");
			}
			token;
			delay;
			sequence;
			multiplier;
			source;
			constructor(token, delay, sequence, end, multiplier) {
				super();
				this.token = token;
				this.delay = delay;
				this.sequence = sequence;
				this.multiplier = multiplier;
				this.source = "every " + token.tokenizer.input.substring(token.index, end.index + 2);
			}
		};
		var Do = class extends Expression {
			static {
				__name(this, "Do");
			}
			static {
				__name3(this, "Do");
			}
			token;
			sequence;
			source;
			constructor(token, sequence, end) {
				super();
				this.token = token;
				this.sequence = sequence;
				this.source = "do " + token.tokenizer.input.substring(token.index, end.index + 2);
			}
		};
		var Sleep = class extends Expression {
			static {
				__name(this, "Sleep");
			}
			static {
				__name3(this, "Sleep");
			}
			token;
			delay;
			multiplier;
			constructor(token, delay, multiplier) {
				super();
				this.token = token;
				this.delay = delay;
				this.multiplier = multiplier;
			}
		};
		var Delete = class extends Expression {
			static {
				__name(this, "Delete");
			}
			static {
				__name3(this, "Delete");
			}
			token;
			field;
			constructor(token, field) {
				super();
				this.token = token;
				this.field = field;
			}
		};
		Program.Field = Field;
		Program.Variable = Variable;
		Program.Assignment = Assignment;
		var Token = class _Token {
			static {
				__name(this, "_Token");
			}
			static {
				__name3(this, "Token");
			}
			tokenizer;
			type;
			value;
			string_value;
			line;
			column;
			start;
			length;
			index;
			reserved_keyword;
			is_binary_operator;
			constructor(tokenizer, type, value, string_value) {
				this.tokenizer = tokenizer;
				this.type = type;
				this.value = value;
				this.string_value = string_value;
				this.line = tokenizer.line;
				this.column = tokenizer.column;
				this.start = tokenizer.token_start;
				this.length = tokenizer.index - this.start;
				this.index = tokenizer.index;
				if (this.type === _Token.TYPE_IDENTIFIER && Object.hasOwn(_Token.predefined, String(this.value))) {
					this.type = _Token.predefined[String(this.value)];
					this.reserved_keyword = true;
				}
				this.is_binary_operator =
					(this.type >= 30 && this.type <= 39) ||
					(this.type >= 200 && this.type <= 201) ||
					(this.type >= 2 && this.type <= 7);
			}
			toString() {
				return String(this.value) + " : " + this.type;
			}
			// Token type constants
			static TYPE_EQUALS = 1;
			static TYPE_DOUBLE_EQUALS = 2;
			static TYPE_GREATER = 3;
			static TYPE_GREATER_OR_EQUALS = 4;
			static TYPE_LOWER = 5;
			static TYPE_LOWER_OR_EQUALS = 6;
			static TYPE_UNEQUALS = 7;
			static TYPE_IDENTIFIER = 10;
			static TYPE_NUMBER = 11;
			static TYPE_STRING = 12;
			static TYPE_OPEN_BRACE = 20;
			static TYPE_CLOSED_BRACE = 21;
			// TYPE_OPEN_CURLY_BRACE = 22
			// TYPE_CLOSED_CURLY_BRACE = 23
			static TYPE_OPEN_BRACKET = 24;
			static TYPE_CLOSED_BRACKET = 25;
			static TYPE_COMMA = 26;
			static TYPE_DOT = 27;
			static TYPE_COLON = 28;
			static TYPE_PLUS = 30;
			static TYPE_MINUS = 31;
			static TYPE_MULTIPLY = 32;
			static TYPE_DIVIDE = 33;
			static TYPE_POWER = 34;
			static TYPE_MODULO = 35;
			static TYPE_BINARY_AND = 36;
			static TYPE_BINARY_OR = 37;
			static TYPE_SHIFT_LEFT = 38;
			static TYPE_SHIFT_RIGHT = 39;
			static TYPE_PLUS_EQUALS = 40;
			static TYPE_MINUS_EQUALS = 41;
			static TYPE_MULTIPLY_EQUALS = 42;
			static TYPE_DIVIDE_EQUALS = 43;
			static TYPE_MODULO_EQUALS = 44;
			static TYPE_AND_EQUALS = 45;
			static TYPE_OR_EQUALS = 46;
			static TYPE_RETURN = 100;
			static TYPE_BREAK = 101;
			static TYPE_CONTINUE = 102;
			static TYPE_FUNCTION = 103;
			static TYPE_IF = 104;
			static TYPE_THEN = 105;
			static TYPE_ELSE = 106;
			static TYPE_ELSIF = 107;
			static TYPE_END = 108;
			static TYPE_FOR = 109;
			static TYPE_TO = 110;
			static TYPE_BY = 111;
			static TYPE_IN = 112;
			static TYPE_WHILE = 113;
			static TYPE_OBJECT = 114;
			static TYPE_CLASS = 115;
			static TYPE_EXTENDS = 116;
			static TYPE_NEW = 117;
			static TYPE_ARROW = 118;
			static TYPE_TEMPLATE = 119;
			static TYPE_AFTER = 61;
			static TYPE_EVERY = 62;
			static TYPE_DO = 63;
			static TYPE_SLEEP = 64;
			static TYPE_LOCAL = 70;
			static TYPE_AND = 200;
			static TYPE_OR = 201;
			static TYPE_NOT = 202;
			static TYPE_ERROR = 404;
			static TYPE_DELETE = 403;
			// Predefined keyword mapping
			static predefined = {
				return: _Token.TYPE_RETURN,
				break: _Token.TYPE_BREAK,
				continue: _Token.TYPE_CONTINUE,
				function: _Token.TYPE_FUNCTION,
				for: _Token.TYPE_FOR,
				to: _Token.TYPE_TO,
				by: _Token.TYPE_BY,
				in: _Token.TYPE_IN,
				while: _Token.TYPE_WHILE,
				if: _Token.TYPE_IF,
				then: _Token.TYPE_THEN,
				else: _Token.TYPE_ELSE,
				elsif: _Token.TYPE_ELSIF,
				end: _Token.TYPE_END,
				object: _Token.TYPE_OBJECT,
				class: _Token.TYPE_CLASS,
				extends: _Token.TYPE_EXTENDS,
				new: _Token.TYPE_NEW,
				and: _Token.TYPE_AND,
				or: _Token.TYPE_OR,
				not: _Token.TYPE_NOT,
				after: _Token.TYPE_AFTER,
				every: _Token.TYPE_EVERY,
				do: _Token.TYPE_DO,
				sleep: _Token.TYPE_SLEEP,
				delete: _Token.TYPE_DELETE,
				local: _Token.TYPE_LOCAL,
				var: _Token.TYPE_LOCAL,
				let: _Token.TYPE_LOCAL,
			};
		};
		var Tokenizer = class {
			static {
				__name(this, "Tokenizer");
			}
			static {
				__name3(this, "Tokenizer");
			}
			input;
			filename;
			index = 0;
			line = 1;
			column = 0;
			last_column = 0;
			buffer = [];
			token_start = 0;
			chars = {};
			doubles = {};
			shifts = {};
			letter_regex = /^\p{L}/u;
			constructor(input, filename) {
				this.input = input;
				this.filename = filename;
				this.chars["("] = Token.TYPE_OPEN_BRACE;
				this.chars[")"] = Token.TYPE_CLOSED_BRACE;
				this.chars["["] = Token.TYPE_OPEN_BRACKET;
				this.chars["]"] = Token.TYPE_CLOSED_BRACKET;
				this.chars["{"] = 22;
				this.chars["}"] = 23;
				this.chars["^"] = Token.TYPE_POWER;
				this.chars[","] = Token.TYPE_COMMA;
				this.chars["."] = Token.TYPE_DOT;
				this.chars[":"] = Token.TYPE_COLON;
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
				this.shifts["<"] = Token.TYPE_SHIFT_LEFT;
				this.shifts[">"] = Token.TYPE_SHIFT_RIGHT;
			}
			pushBack(token) {
				this.buffer.splice(0, 0, token);
				return token;
			}
			/**
			 * Peek at next token without consuming it
			 */
			peek() {
				if (this.buffer.length > 0) {
					return this.buffer[0];
				}
				const token = this.next();
				if (token) {
					this.pushBack(token);
				}
				return token;
			}
			finished() {
				return this.index >= this.input.length && this.buffer.length === 0;
			}
			nextChar(ignore_comments = false) {
				let c;
				let endseq;
				c = this.input.charAt(this.index++);
				if (c === "\n") {
					this.line += 1;
					this.last_column = this.column;
					this.column = 0;
				} else if (c === "/" && !ignore_comments) {
					if (this.input.charAt(this.index) === "/") {
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
			rewind() {
				this.index -= 1;
				this.column -= 1;
				if (this.input.charAt(this.index) === "\n") {
					this.line -= 1;
					this.column = this.last_column;
				}
			}
			next() {
				let c;
				let code;
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
			changeNumberToIdentifier() {
				let i;
				let token;
				let v;
				const results = [];
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
					return token ? this.pushBack(token) : void 0;
				}
			}
			parseDouble(c, d) {
				const c2 = this.input.charAt(this.index);
				if (c === "=" && c2 === ">") {
					this.nextChar();
					return new Token(this, Token.TYPE_ARROW, "=>");
				}
				if (this.shifts[c] != null && this.index < this.input.length && c2 === c) {
					this.nextChar();
					return new Token(this, this.shifts[c], c + c);
				}
				if (d && this.index < this.input.length && c2 === "=") {
					this.nextChar();
					return new Token(this, d[1], c + "=");
				}
				return new Token(this, d ? d[0] : this.chars[c], c);
			}
			parseEquals(_c) {
				if (this.index < this.input.length && this.input.charAt(this.index) === "=") {
					this.nextChar();
					return new Token(this, Token.TYPE_DOUBLE_EQUALS, "==");
				} else {
					return new Token(this, Token.TYPE_EQUALS, "=");
				}
			}
			parseGreater(_c) {
				if (this.index < this.input.length && this.input.charAt(this.index) === "=") {
					this.nextChar();
					return new Token(this, Token.TYPE_GREATER_OR_EQUALS, ">=");
				} else {
					return new Token(this, Token.TYPE_GREATER, ">");
				}
			}
			parseLower(_c) {
				if (this.index < this.input.length && this.input.charAt(this.index) === "=") {
					this.nextChar();
					return new Token(this, Token.TYPE_LOWER_OR_EQUALS, "<=");
				} else {
					return new Token(this, Token.TYPE_LOWER, "<");
				}
			}
			parseUnequals(_c) {
				if (this.index < this.input.length && this.input.charAt(this.index) === "=") {
					this.nextChar();
					return new Token(this, Token.TYPE_UNEQUALS, "!=");
				} else {
					return this.error("Expected inequality !=");
				}
			}
			parseIdentifier(s) {
				let c;
				let code;
				while (true) {
					if (this.index >= this.input.length) {
						return new Token(this, Token.TYPE_IDENTIFIER, s);
					}
					c = this.nextChar();
					code = c.charCodeAt(0);
					if (
						(code >= 65 && code <= 90) ||
						(code >= 97 && code <= 122) ||
						code === 95 ||
						(code >= 48 && code <= 57) ||
						this.letter_regex.test(c)
					) {
						s += c;
					} else {
						this.rewind();
						return new Token(this, Token.TYPE_IDENTIFIER, s);
					}
				}
			}
			parseNumber(s) {
				let c;
				let code;
				let exp = false;
				let pointed = false;
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
			parseHexNumber(s) {
				let c;
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
			parseString(s, close) {
				let c;
				let count_close = 0;
				let n;
				if (close == null) {
					close = '"';
				}
				if (close === '"') {
					if (
						this.input.charAt(this.index) === '"' &&
						this.input.charAt(this.index + 1) === '"' &&
						this.input.charAt(this.index + 2) !== '"'
					) {
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
			error(s) {
				throw new Error(s);
			}
		};
		var LootiScriptError = class extends Error {
			static {
				__name(this, "LootiScriptError");
			}
			static {
				__name3(this, "LootiScriptError");
			}
			file;
			line;
			column;
			stackTrace;
			constructor(message, file, line, column, stackTrace) {
				super(message), (this.file = file), (this.line = line), (this.column = column), (this.stackTrace = stackTrace);
				this.name = "LootiScriptError";
			}
			toString() {
				let msg = `${this.name}: ${this.message}
`;
				msg += `  at ${this.file}:${this.line}:${this.column}
`;
				return msg;
			}
		};
		var LootiSyntaxError = class extends LootiScriptError {
			static {
				__name(this, "LootiSyntaxError");
			}
			static {
				__name3(this, "LootiSyntaxError");
			}
			context;
			code;
			suggestions;
			related;
			constructor(message, file, line, column, context, code, suggestions, related) {
				super(message, file, line, column),
					(this.context = context),
					(this.code = code),
					(this.suggestions = suggestions),
					(this.related = related);
				this.name = "SyntaxError";
			}
			toString() {
				let msg = "";
				if (this.code) {
					msg += `[${this.code}] `;
				}
				msg += `${this.name}: ${this.message}
`;
				msg += `  at ${this.file}:${this.line}:${this.column}
`;
				if (this.context) {
					msg += `
${this.context}
`;
				}
				return msg;
			}
		};
		function formatSourceContext(source, line, column, contextLines = 3, errorLength = 1) {
			const lines = source.split("\n");
			const startLine = Math.max(0, line - contextLines - 1);
			const endLine = Math.min(lines.length - 1, line + contextLines - 1);
			let context = "\nSource context:\n";
			for (let i = startLine; i <= endLine; i++) {
				const lineNum = i + 1;
				const prefix = lineNum === line ? ">" : " ";
				const lineNumStr = String(lineNum).padStart(4, " ");
				const lineContent = lines[i] || "";
				context += `${prefix} ${lineNumStr} | ${lineContent}
`;
				if (lineNum === line) {
					const baseOffset = 8;
					const pointer = " ".repeat(baseOffset + Math.max(0, column - 1)) + "^".repeat(Math.max(1, errorLength));
					context += `${pointer}
`;
				}
			}
			return context;
		}
		__name(formatSourceContext, "formatSourceContext");
		__name3(formatSourceContext, "formatSourceContext");
		var Parser3 = class _Parser {
			static {
				__name(this, "_Parser");
			}
			static {
				__name3(this, "Parser");
			}
			input;
			filename;
			tokenizer;
			program;
			current_block;
			current;
			verbose;
			nesting;
			object_nesting;
			not_terminated;
			// Track function names and their start locations for better error messages
			function_stack;
			api_reserved;
			warnings;
			unexpected_eof;
			error_info;
			last_function_call;
			static multipliers = {
				millisecond: 1,
				milliseconds: 1,
				second: 1e3,
				seconds: 1e3,
				minute: 6e4,
				minutes: 6e4,
				hour: 6e4 * 60,
				hours: 6e4 * 60,
				day: 6e4 * 60 * 24,
				days: 6e4 * 60 * 24,
			};
			constructor(input, filename = "") {
				this.input = input;
				this.filename = filename;
				if (/^\s*\/\/\s*javascript\s*\n/.test(this.input)) {
					this.input = 'system.javascript("""\n\n' + this.input.replace(/\\/g, "\\\\") + '\n\n""")';
				}
				this.tokenizer = new Tokenizer(this.input, this.filename);
				this.program = new Program();
				this.current_block = [];
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
				};
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
			nextToken() {
				const token = this.tokenizer.next();
				if (token == null) {
					this.unexpected_eof = true;
					throw "Unexpected end of file";
				}
				return (this.current = token);
			}
			nextTokenOptional() {
				const token = this.tokenizer.next();
				if (token != null) {
					this.current = token;
				}
				return token;
			}
			parse() {
				let err;
				let expression;
				let nt;
				let token;
				try {
					this.warnings = [];
					while (true) {
						expression = this.parseLine();
						if (expression == null && !this.tokenizer.finished()) {
							token = this.tokenizer.next();
							if (token != null && token.reserved_keyword) {
								if (token.value === "end") {
									const context = formatSourceContext(this.input, token.line, token.column, 3, 3);
									const suggestions = [
										"Remove this extra 'end' statement",
										"Check if you're missing an opening statement (if, for, while, function)",
										"Verify all blocks are properly matched",
									];
									return (this.error_info = {
										error: "Too many 'end' statements - no matching opening statement found",
										line: token.line,
										column: token.column,
										context,
										code: import_diagnostics2.SyntaxErrorCode.E1002,
										suggestions,
									});
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
					if (err instanceof LootiSyntaxError) {
						return (this.error_info = {
							error: err.message,
							line: err.line,
							column: err.column,
							context: err.context,
						});
					}
					if (this.not_terminated.length > 0 && err === "Unexpected end of file") {
						nt = this.not_terminated[this.not_terminated.length - 1];
						let functionName = null;
						let functionStartLine = null;
						let functionStartColumn = null;
						if (nt.value === "function") {
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
						const context = formatSourceContext(nt.tokenizer.input, nt.line, nt.column, 3, errorLength);
						let errorMessage;
						let suggestions = [];
						let related;
						if (nt.value === "function" && functionName) {
							errorMessage = `Function '${functionName}' started at line ${functionStartLine} is not closed`;
							suggestions = [
								`Add 'end' after the last statement to close function '${functionName}'`,
								`Check if you have an extra 'end' statement somewhere`,
								`Verify all nested blocks (if, for, while) are properly closed`,
							];
							related = {
								file: this.filename,
								line: functionStartLine,
								column: functionStartColumn,
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
							context,
							code: import_diagnostics2.SyntaxErrorCode.E1001,
							suggestions,
							related,
						});
					} else {
						const context = formatSourceContext(this.input, this.current.line, this.current.column, 3, 1);
						return (this.error_info = {
							error: typeof err === "string" ? err : err.message || String(err),
							line: this.current.line,
							column: this.current.column,
							context,
							code: import_diagnostics2.SyntaxErrorCode.E1004,
						});
					}
				}
			}
			parseLine() {
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
			parseExpression(filter, first_function_call = false) {
				let access;
				let expression;
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
			assertExpression(filter, first_function_call = false) {
				const exp = this.parseExpression(filter, first_function_call);
				if (exp == null) {
					throw "Expression expected";
				}
				return exp;
			}
			parseExpressionSuffix(expression, filter) {
				let field;
				let identifier;
				const token = this.nextTokenOptional();
				if (token == null) {
					return filter === "self" ? expression : null;
				}
				switch (token.type) {
					case Token.TYPE_DOT:
						if (expression instanceof Value && expression.type === Value.TYPE_NUMBER) {
							this.tokenizer.pushBack(token);
							return null;
						} else {
							this.tokenizer.changeNumberToIdentifier();
							identifier = this.assertBroadIdentifier("Expected identifier");
							return Program.CreateFieldAccess(token, expression, new Value(identifier, Value.TYPE_STRING, identifier.value));
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
			parseExpressionStart() {
				let next;
				const token = this.nextTokenOptional();
				if (token == null) {
					return null;
				}
				switch (token.type) {
					case Token.TYPE_IDENTIFIER:
						return new Variable(token, token.value);
					case Token.TYPE_NUMBER:
						return this.parseNumberExpression(token);
					case Token.TYPE_PLUS:
						return this.assertExpression();
					case Token.TYPE_MINUS:
						return this.parseExpressionSuffix(new Negate(token, this.assertExpression("noop")), "self");
					case Token.TYPE_NOT:
						return this.parseExpressionSuffix(new Not(token, this.assertExpression("noop")), "self");
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
						if (!Number.isInteger(next.value)) {
							throw "malformed number";
						}
						return new Value(token, Value.TYPE_NUMBER, Number.parseFloat(`.${next.string_value}`));
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
			parseNumberExpression(number) {
				return new Value(number, Value.TYPE_NUMBER, number.value);
			}
			parseStringExpression(string) {
				const token = this.nextTokenOptional();
				if (token != null) {
					this.tokenizer.pushBack(token);
				}
				return new Value(string, Value.TYPE_STRING, string.value);
			}
			parseArray(bracket) {
				const res = [];
				while (true) {
					const token = this.nextToken();
					if (token.type === Token.TYPE_CLOSED_BRACKET) {
						return new Value(bracket, Value.TYPE_ARRAY, res);
					} else if (token.type === Token.TYPE_COMMA) {
					} else {
						this.tokenizer.pushBack(token);
						res.push(this.assertExpression());
					}
				}
			}
			parseBinaryOperation(operation, term1) {
				const ops = [
					{
						token: operation,
						operation: operation.value,
					},
				];
				const terms = [term1];
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
					ops.push({
						token,
						operation: token.value,
					});
					terms.push(this.assertExpression("noop"));
				}
				return Program.BuildOperations(ops, terms);
			}
			parseAssignment(token, expression) {
				let res;
				if (!(expression instanceof Variable || expression instanceof Field)) {
					throw "Expected variable identifier or property";
				}
				if (this.object_nesting === 0 && expression instanceof Variable && this.api_reserved[expression.identifier]) {
					this.warnings.push({
						type: "assigning_api_variable",
						identifier: expression.identifier,
						line: token.line,
						column: token.column,
					});
				}
				const peekToken = this.tokenizer.peek();
				let functionName = null;
				if (expression instanceof Variable) {
					functionName = expression.identifier;
				}
				if (peekToken && peekToken.type === Token.TYPE_FUNCTION && functionName) {
				}
				const assignedValue = this.assertExpression();
				if (assignedValue instanceof Function && functionName && this.function_stack.length > 0) {
					const funcToken = assignedValue.token;
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
			parseSelfAssignment(token, expression, operation) {
				if (!(expression instanceof Variable || expression instanceof Field)) {
					throw "Expected variable identifier or property";
				}
				let opStr;
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
				return new SelfAssignment(token, expression, opStr, this.assertExpression());
			}
			parseLocalAssignment(local) {
				const identifier = this.assert(Token.TYPE_IDENTIFIER, "Expected identifier");
				this.parseOptionalType();
				this.assert(Token.TYPE_EQUALS, "Expected '='");
				return new Assignment(local, new Variable(identifier, identifier.value), this.assertExpression(), true);
			}
			parseBracedExpression(open) {
				if (this.current.type === Token.TYPE_CLOSED_BRACE) {
					const close = this.nextToken();
					const next = this.nextToken();
					if (next.type === Token.TYPE_ARROW) {
						return this.parseArrowFunction(next, []);
					}
					this.tokenizer.pushBack(next);
					this.current = close;
					return this.error("Unexpected ')'");
				}
				const expression = this.assertExpression();
				this.parseOptionalType();
				const token = this.nextToken();
				if (token.type === Token.TYPE_CLOSED_BRACE) {
					const next = this.nextToken();
					if (next.type === Token.TYPE_ARROW) {
						return this.parseArrowFunction(next, [expression]);
					}
					this.tokenizer.pushBack(next);
					this.current = token;
					return new Braced(open, expression);
				} else if (token.type === Token.TYPE_COMMA) {
					const args = [expression];
					while (true) {
						args.push(this.assertExpression());
						this.parseOptionalType();
						const next = this.nextToken();
						if (next.type === Token.TYPE_CLOSED_BRACE) {
							break;
						} else if (next.type !== Token.TYPE_COMMA) {
							return this.error("Expected ',' or ')'");
						}
					}
					const arrow = this.nextToken();
					if (arrow.type === Token.TYPE_ARROW) {
						return this.parseArrowFunction(arrow, args);
					}
					return this.error("Expected '=>' after parameter list");
				} else {
					return this.error("missing closing parenthese");
				}
			}
			parseArrowFunction(arrow, args) {
				const funcArgs = [];
				for (const arg of args) {
					if (arg instanceof Variable) {
						funcArgs.push({
							name: arg.identifier,
							default: void 0,
						});
					} else {
						throw this.error("Invalid argument in arrow function");
					}
				}
				const sequence = [];
				const body = this.parseLine();
				if (body) {
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
			parseFunctionCall(brace_token, expression) {
				const args = [];
				this.last_function_call = new FunctionCall(brace_token, expression, args);
				while (true) {
					const token = this.nextTokenOptional();
					if (token == null) {
						return this.error("missing closing parenthese");
					} else if (token.type === Token.TYPE_CLOSED_BRACE) {
						return new FunctionCall(token, expression, args);
					} else if (token.type === Token.TYPE_COMMA) {
					} else {
						this.tokenizer.pushBack(token);
						args.push(this.assertExpression());
					}
				}
			}
			addTerminable(token) {
				return this.not_terminated.push(token);
			}
			endTerminable() {
				if (this.not_terminated.length > 0) {
					this.not_terminated.splice(this.not_terminated.length - 1, 1);
				}
			}
			parseFunction(funk) {
				let line;
				const args = this.parseFunctionArgs();
				const sequence = [];
				this.nesting += 1;
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
					if (this.function_stack.length > 0 && this.function_stack[this.function_stack.length - 1].token === funk) {
						this.function_stack.pop();
					}
					throw error;
				}
			}
			parseFunctionArgs() {
				const args = [];
				let last = null;
				let token = this.nextToken();
				if (token.type !== Token.TYPE_OPEN_BRACE) {
					return this.error("Expected opening parenthese");
				}
				while (true) {
					token = this.nextToken();
					if (token.type === Token.TYPE_CLOSED_BRACE) {
						return args;
					} else if (token.type === Token.TYPE_COMMA) {
						last = null;
					} else if (token.type === Token.TYPE_EQUALS && last === "argument") {
						const defaultExpr = this.assertExpression();
						if (args.length > 0) {
							args[args.length - 1].default = defaultExpr;
						}
					} else if (token.type === Token.TYPE_IDENTIFIER) {
						last = "argument";
						args.push({
							name: token.value,
						});
						this.parseOptionalType();
					} else {
						return this.error("Unexpected token");
					}
				}
			}
			warningAssignmentCondition(expression) {
				if (expression instanceof Assignment) {
					this.warnings.push({
						type: "assignment_as_condition",
						line: expression.token.line,
						column: expression.token.column,
					});
				}
			}
			parseIf(iftoken) {
				let line;
				let token;
				const chain = [];
				let current = {
					condition: this.assertExpression(),
					sequence: [],
				};
				this.addTerminable(iftoken);
				this.warningAssignmentCondition(current.condition);
				token = this.nextToken();
				if (token.type !== Token.TYPE_THEN) {
					return this.error("Expected 'then'");
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
			assert(type, error) {
				const token = this.nextToken();
				if (token.type !== type) {
					throw error;
				}
				return token;
			}
			assertBroadIdentifier(error) {
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
			error(text) {
				const token = this.current;
				const context = formatSourceContext(token.tokenizer.input, token.line, token.column, 2);
				throw new LootiSyntaxError(text, token.tokenizer.filename, token.line, token.column, context);
			}
			/**
			 * Parse optional type annotation (e.g. : string)
			 * Currently just consumes the tokens without storing type info
			 */
			parseOptionalType() {
				let token = this.nextTokenOptional();
				if (token == null) return;
				if (token.type === Token.TYPE_COLON) {
					this.assert(Token.TYPE_IDENTIFIER, "Expected type identifier");
					while (true) {
						token = this.nextTokenOptional();
						if (token && token.type === Token.TYPE_OPEN_BRACKET) {
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
			parseFor(fortoken) {
				let list;
				let range_by;
				let range_from;
				let range_to;
				let token;
				const iterator = this.assertExpression();
				if (iterator instanceof Assignment) {
					range_from = iterator.expression;
					const iter = iterator.field;
					token = this.nextToken();
					if (token.type !== Token.TYPE_TO) {
						return this.error("Expected 'to'");
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
						return new For(fortoken, iter.identifier, range_from, range_to, range_by, this.parseSequence(fortoken));
					}
					return this.error("Malformed for loop");
				} else if (iterator instanceof Variable) {
					this.assert(Token.TYPE_IN, "Error expected keyword 'in'");
					list = this.assertExpression();
					return new ForIn(fortoken, iterator.identifier, list, this.parseSequence(fortoken));
				} else {
					return this.error("Malformed for loop");
				}
			}
			parseWhile(whiletoken) {
				const condition = this.assertExpression();
				return new While(whiletoken, condition, this.parseSequence(whiletoken));
			}
			parseSequence(start_token) {
				let line;
				const sequence = [];
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
			parseObject(object) {
				let exp;
				const fields = [];
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
								field: token.value,
								value: exp,
							});
						} else {
							return this.error("Malformed object");
						}
					}
				}
			}
			parseClass(object) {
				let exp;
				let ext = null;
				const fields = [];
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
								field: token.value,
								value: exp,
							});
						} else {
							return this.error("Malformed object");
						}
					}
					token = this.nextToken();
				}
			}
			parseNew(token) {
				const exp = this.assertExpression(null, true);
				return new NewCall(token, exp);
			}
			parseAfter(after) {
				let line;
				let multiplier = null;
				const sequence = [];
				this.nesting += 1;
				this.addTerminable(after);
				const delay = this.assertExpression();
				let token = this.nextToken();
				if (token.type === Token.TYPE_IDENTIFIER && _Parser.multipliers[token.value]) {
					multiplier = _Parser.multipliers[token.value];
					token = this.nextToken();
				}
				if (token == null || token.type !== Token.TYPE_DO) {
					return this.error("Expected keyword 'do'");
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
			parseEvery(every) {
				let line;
				let multiplier = null;
				const sequence = [];
				this.nesting += 1;
				this.addTerminable(every);
				const delay = this.assertExpression();
				let token = this.nextToken();
				if (token.type === Token.TYPE_IDENTIFIER && _Parser.multipliers[token.value]) {
					multiplier = _Parser.multipliers[token.value];
					token = this.nextToken();
				}
				if (token == null || token.type !== Token.TYPE_DO) {
					return this.error("Expected keyword 'do'");
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
			parseDo(do_token) {
				let line;
				const sequence = [];
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
			parseSleep(sleep) {
				let multiplier = null;
				const delay = this.assertExpression();
				const token = this.nextToken();
				if (token != null) {
					if (token.type === Token.TYPE_IDENTIFIER && _Parser.multipliers[token.value]) {
						multiplier = _Parser.multipliers[token.value];
					} else {
						this.tokenizer.pushBack(token);
					}
				}
				return new Sleep(sleep, delay, multiplier);
			}
			parseDelete(del) {
				const v = this.parseExpression();
				if (v == null || !(v instanceof Variable || v instanceof Field)) {
					return this.error("expecting variable name or property access after keyword `delete`");
				} else {
					return new Delete(del, v);
				}
			}
			parseTemplate(token) {
				const raw = token.value;
				let current = 0;
				const parts = [];
				while (current < raw.length) {
					const start = raw.indexOf("${", current);
					if (start === -1) {
						if (current < raw.length) {
							parts.push(new Value(token, Value.TYPE_STRING, raw.substring(current)));
						}
						break;
					}
					if (start > current) {
						parts.push(new Value(token, Value.TYPE_STRING, raw.substring(current, start)));
					}
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
					const exprSource = raw.substring(start + 2, end);
					const subParser = new this.constructor(exprSource, token.tokenizer.filename);
					const expr = subParser.parseExpression();
					if (expr) {
						parts.push(expr);
					}
					current = end + 1;
				}
				if (parts.length === 0) {
					return new Value(token, Value.TYPE_STRING, "");
				}
				let result = parts[0];
				for (let i = 1; i < parts.length; i++) {
					result = new Operation(token, "+", result, parts[i]);
				}
				return result;
			}
		};
	},
});

// ../../../node_modules/.pnpm/@vscode+l10n@0.0.18/node_modules/@vscode/l10n/dist/main.js
var require_main5 = __commonJS({
	"../../../node_modules/.pnpm/@vscode+l10n@0.0.18/node_modules/@vscode/l10n/dist/main.js"(exports2, module2) {
		"use strict";
		init_cjs_shims();
		var __defProp3 = Object.defineProperty;
		var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
		var __getOwnPropNames2 = Object.getOwnPropertyNames;
		var __hasOwnProp2 = Object.prototype.hasOwnProperty;
		var __export2 = /* @__PURE__ */ __name((target, all) => {
			for (var name in all)
				__defProp3(target, name, {
					get: all[name],
					enumerable: true,
				});
		}, "__export");
		var __copyProps2 = /* @__PURE__ */ __name((to, from, except, desc) => {
			if ((from && typeof from === "object") || typeof from === "function") {
				for (let key of __getOwnPropNames2(from))
					if (!__hasOwnProp2.call(to, key) && key !== except)
						__defProp3(to, key, {
							get: /* @__PURE__ */ __name(() => from[key], "get"),
							enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable,
						});
			}
			return to;
		}, "__copyProps");
		var __toCommonJS2 = /* @__PURE__ */ __name(
			(mod) =>
				__copyProps2(
					__defProp3({}, "__esModule", {
						value: true,
					}),
					mod,
				),
			"__toCommonJS",
		);
		var main_exports2 = {};
		__export2(main_exports2, {
			config: /* @__PURE__ */ __name(() => config, "config"),
			t: /* @__PURE__ */ __name(() => t7, "t"),
		});
		module2.exports = __toCommonJS2(main_exports2);
		var import_fs = require("fs");
		var import_promises = require("fs/promises");
		async function readFileFromUri(uri) {
			if (uri.protocol === "file:") {
				return await (0, import_promises.readFile)(uri, "utf8");
			}
			if (uri.protocol === "http:" || uri.protocol === "https:") {
				const res = await fetch(uri.toString(), {
					headers: {
						"Accept-Encoding": "gzip, deflate",
						Accept: "application/json",
					},
					redirect: "follow",
				});
				if (!res.ok) {
					let error = `Unexpected ${res.status} response while trying to read ${uri}`;
					try {
						error += `: ${await res.text()}`;
					} catch {}
					throw new Error(error);
				}
				const decoded = await res.text();
				return decoded;
			}
			throw new Error("Unsupported protocol");
		}
		__name(readFileFromUri, "readFileFromUri");
		function readFileFromFsPath(fsPath) {
			return (0, import_fs.readFileSync)(fsPath, "utf8");
		}
		__name(readFileFromFsPath, "readFileFromFsPath");
		var bundle;
		function config(config2) {
			if ("contents" in config2) {
				if (typeof config2.contents === "string") {
					bundle = JSON.parse(config2.contents);
				} else {
					bundle = config2.contents;
				}
				return;
			}
			if ("fsPath" in config2) {
				const fileContent = readFileFromFsPath(config2.fsPath);
				const content = JSON.parse(fileContent);
				bundle = isBuiltinExtension(content) ? content.contents.bundle : content;
				return;
			}
			if (config2.uri) {
				let uri = config2.uri;
				if (typeof config2.uri === "string") {
					uri = new URL(config2.uri);
				}
				return new Promise((resolve, reject) => {
					readFileFromUri(uri)
						.then((uriContent) => {
							try {
								const content = JSON.parse(uriContent);
								bundle = isBuiltinExtension(content) ? content.contents.bundle : content;
								resolve();
							} catch (err) {
								reject(err);
							}
						})
						.catch((err) => {
							reject(err);
						});
				});
			}
		}
		__name(config, "config");
		function t7(...args) {
			const firstArg = args[0];
			let key;
			let message;
			let formatArgs;
			if (typeof firstArg === "string") {
				key = firstArg;
				message = firstArg;
				args.splice(0, 1);
				formatArgs = !args || typeof args[0] !== "object" ? args : args[0];
			} else if (firstArg instanceof Array) {
				const replacements = args.slice(1);
				if (firstArg.length !== replacements.length + 1) {
					throw new Error("expected a string as the first argument to l10n.t");
				}
				let str = firstArg[0];
				for (let i = 1; i < firstArg.length; i++) {
					str += `{${i - 1}}` + firstArg[i];
				}
				return t7(str, ...replacements);
			} else {
				message = firstArg.message;
				key = message;
				if (firstArg.comment && firstArg.comment.length > 0) {
					key += `/${Array.isArray(firstArg.comment) ? firstArg.comment.join("") : firstArg.comment}`;
				}
				formatArgs = firstArg.args ?? {};
			}
			const messageFromBundle = bundle?.[key];
			if (!messageFromBundle) {
				return format4(message, formatArgs);
			}
			if (typeof messageFromBundle === "string") {
				return format4(messageFromBundle, formatArgs);
			}
			if (messageFromBundle.comment) {
				return format4(messageFromBundle.message, formatArgs);
			}
			return format4(message, formatArgs);
		}
		__name(t7, "t");
		var _format2Regexp = /{([^}]+)}/g;
		function format4(template, values) {
			if (Object.keys(values).length === 0) {
				return template;
			}
			return template.replace(_format2Regexp, (match, group) => values[group] ?? match);
		}
		__name(format4, "format");
		function isBuiltinExtension(json) {
			return !!(typeof json?.contents?.bundle === "object" && typeof json?.version === "string");
		}
		__name(isBuiltinExtension, "isBuiltinExtension");
	},
});

// src/server.ts
init_cjs_shims();
var import_node13 = __toESM(require_node3());

// ../../../node_modules/.pnpm/vscode-languageserver-textdocument@1.0.12/node_modules/vscode-languageserver-textdocument/lib/esm/main.js
init_cjs_shims();
var FullTextDocument = class FullTextDocument2 {
	static {
		__name(this, "FullTextDocument");
	}
	constructor(uri, languageId, version, content) {
		this._uri = uri;
		this._languageId = languageId;
		this._version = version;
		this._content = content;
		this._lineOffsets = void 0;
	}
	get uri() {
		return this._uri;
	}
	get languageId() {
		return this._languageId;
	}
	get version() {
		return this._version;
	}
	getText(range) {
		if (range) {
			const start = this.offsetAt(range.start);
			const end = this.offsetAt(range.end);
			return this._content.substring(start, end);
		}
		return this._content;
	}
	update(changes, version) {
		for (const change of changes) {
			if (FullTextDocument2.isIncremental(change)) {
				const range = getWellformedRange(change.range);
				const startOffset = this.offsetAt(range.start);
				const endOffset = this.offsetAt(range.end);
				this._content =
					this._content.substring(0, startOffset) + change.text + this._content.substring(endOffset, this._content.length);
				const startLine = Math.max(range.start.line, 0);
				const endLine = Math.max(range.end.line, 0);
				let lineOffsets = this._lineOffsets;
				const addedLineOffsets = computeLineOffsets(change.text, false, startOffset);
				if (endLine - startLine === addedLineOffsets.length) {
					for (let i = 0, len = addedLineOffsets.length; i < len; i++) {
						lineOffsets[i + startLine + 1] = addedLineOffsets[i];
					}
				} else {
					if (addedLineOffsets.length < 1e4) {
						lineOffsets.splice(startLine + 1, endLine - startLine, ...addedLineOffsets);
					} else {
						this._lineOffsets = lineOffsets = lineOffsets
							.slice(0, startLine + 1)
							.concat(addedLineOffsets, lineOffsets.slice(endLine + 1));
					}
				}
				const diff = change.text.length - (endOffset - startOffset);
				if (diff !== 0) {
					for (let i = startLine + 1 + addedLineOffsets.length, len = lineOffsets.length; i < len; i++) {
						lineOffsets[i] = lineOffsets[i] + diff;
					}
				}
			} else if (FullTextDocument2.isFull(change)) {
				this._content = change.text;
				this._lineOffsets = void 0;
			} else {
				throw new Error("Unknown change event received");
			}
		}
		this._version = version;
	}
	getLineOffsets() {
		if (this._lineOffsets === void 0) {
			this._lineOffsets = computeLineOffsets(this._content, true);
		}
		return this._lineOffsets;
	}
	positionAt(offset) {
		offset = Math.max(Math.min(offset, this._content.length), 0);
		const lineOffsets = this.getLineOffsets();
		let low = 0,
			high = lineOffsets.length;
		if (high === 0) {
			return {
				line: 0,
				character: offset,
			};
		}
		while (low < high) {
			const mid = Math.floor((low + high) / 2);
			if (lineOffsets[mid] > offset) {
				high = mid;
			} else {
				low = mid + 1;
			}
		}
		const line = low - 1;
		offset = this.ensureBeforeEOL(offset, lineOffsets[line]);
		return {
			line,
			character: offset - lineOffsets[line],
		};
	}
	offsetAt(position) {
		const lineOffsets = this.getLineOffsets();
		if (position.line >= lineOffsets.length) {
			return this._content.length;
		} else if (position.line < 0) {
			return 0;
		}
		const lineOffset = lineOffsets[position.line];
		if (position.character <= 0) {
			return lineOffset;
		}
		const nextLineOffset = position.line + 1 < lineOffsets.length ? lineOffsets[position.line + 1] : this._content.length;
		const offset = Math.min(lineOffset + position.character, nextLineOffset);
		return this.ensureBeforeEOL(offset, lineOffset);
	}
	ensureBeforeEOL(offset, lineOffset) {
		while (offset > lineOffset && isEOL(this._content.charCodeAt(offset - 1))) {
			offset--;
		}
		return offset;
	}
	get lineCount() {
		return this.getLineOffsets().length;
	}
	static isIncremental(event) {
		const candidate = event;
		return (
			candidate !== void 0 &&
			candidate !== null &&
			typeof candidate.text === "string" &&
			candidate.range !== void 0 &&
			(candidate.rangeLength === void 0 || typeof candidate.rangeLength === "number")
		);
	}
	static isFull(event) {
		const candidate = event;
		return (
			candidate !== void 0 &&
			candidate !== null &&
			typeof candidate.text === "string" &&
			candidate.range === void 0 &&
			candidate.rangeLength === void 0
		);
	}
};
var TextDocument;
(function (TextDocument3) {
	function create(uri, languageId, version, content) {
		return new FullTextDocument(uri, languageId, version, content);
	}
	__name(create, "create");
	TextDocument3.create = create;
	function update(document2, changes, version) {
		if (document2 instanceof FullTextDocument) {
			document2.update(changes, version);
			return document2;
		} else {
			throw new Error("TextDocument.update: document must be created by TextDocument.create");
		}
	}
	__name(update, "update");
	TextDocument3.update = update;
	function applyEdits(document2, edits) {
		const text = document2.getText();
		const sortedEdits = mergeSort(edits.map(getWellformedEdit), (a2, b) => {
			const diff = a2.range.start.line - b.range.start.line;
			if (diff === 0) {
				return a2.range.start.character - b.range.start.character;
			}
			return diff;
		});
		let lastModifiedOffset = 0;
		const spans = [];
		for (const e of sortedEdits) {
			const startOffset = document2.offsetAt(e.range.start);
			if (startOffset < lastModifiedOffset) {
				throw new Error("Overlapping edit");
			} else if (startOffset > lastModifiedOffset) {
				spans.push(text.substring(lastModifiedOffset, startOffset));
			}
			if (e.newText.length) {
				spans.push(e.newText);
			}
			lastModifiedOffset = document2.offsetAt(e.range.end);
		}
		spans.push(text.substr(lastModifiedOffset));
		return spans.join("");
	}
	__name(applyEdits, "applyEdits");
	TextDocument3.applyEdits = applyEdits;
})(TextDocument || (TextDocument = {}));
function mergeSort(data, compare) {
	if (data.length <= 1) {
		return data;
	}
	const p = (data.length / 2) | 0;
	const left = data.slice(0, p);
	const right = data.slice(p);
	mergeSort(left, compare);
	mergeSort(right, compare);
	let leftIdx = 0;
	let rightIdx = 0;
	let i = 0;
	while (leftIdx < left.length && rightIdx < right.length) {
		const ret = compare(left[leftIdx], right[rightIdx]);
		if (ret <= 0) {
			data[i++] = left[leftIdx++];
		} else {
			data[i++] = right[rightIdx++];
		}
	}
	while (leftIdx < left.length) {
		data[i++] = left[leftIdx++];
	}
	while (rightIdx < right.length) {
		data[i++] = right[rightIdx++];
	}
	return data;
}
__name(mergeSort, "mergeSort");
function computeLineOffsets(text, isAtLineStart, textOffset = 0) {
	const result = isAtLineStart ? [textOffset] : [];
	for (let i = 0; i < text.length; i++) {
		const ch = text.charCodeAt(i);
		if (isEOL(ch)) {
			if (ch === 13 && i + 1 < text.length && text.charCodeAt(i + 1) === 10) {
				i++;
			}
			result.push(textOffset + i + 1);
		}
	}
	return result;
}
__name(computeLineOffsets, "computeLineOffsets");
function isEOL(char) {
	return char === 13 || char === 10;
}
__name(isEOL, "isEOL");
function getWellformedRange(range) {
	const start = range.start;
	const end = range.end;
	if (start.line > end.line || (start.line === end.line && start.character > end.character)) {
		return {
			start: end,
			end: start,
		};
	}
	return range;
}
__name(getWellformedRange, "getWellformedRange");
function getWellformedEdit(textEdit) {
	const range = getWellformedRange(textEdit.range);
	if (range !== textEdit.range) {
		return {
			newText: textEdit.newText,
			range,
		};
	}
	return textEdit;
}
__name(getWellformedEdit, "getWellformedEdit");

// src/api-definitions/index.ts
init_cjs_shims();

// src/api-definitions/actions.ts
init_cjs_shims();
var actionsApi = {
	actions: {
		type: "object",
		description: "Farcaster SDK actions for Mini Apps",
		properties: {
			ready: {
				type: "method",
				signature: "actions.ready(disableNativeGestures?: boolean)",
				description: "Hide the splash screen and display your app content",
			},
			close: {
				type: "method",
				signature: "actions.close()",
				description: "Close the Mini App",
			},
			share: {
				type: "method",
				signature: "actions.share({text?: string, embeds?: string[]})",
				description: "Share content via compose cast",
			},
			signIn: {
				type: "method",
				signature: "actions.signIn({nonce: string, acceptAuthAddress?: boolean})",
				description: "Request Sign In with Farcaster credential. Returns {signature: string, message: string}",
			},
			addMiniApp: {
				type: "method",
				signature: "actions.addMiniApp()",
				description: "Prompt the user to add the Mini App to their client",
			},
			openMiniApp: {
				type: "method",
				signature: "actions.openMiniApp({url: string})",
				description: "Open another Mini App",
			},
			openUrl: {
				type: "method",
				signature: "actions.openUrl({url: string})",
				description: "Open an external URL",
			},
			viewProfile: {
				type: "method",
				signature: "actions.viewProfile({fid: number})",
				description: "View a Farcaster profile",
			},
			viewCast: {
				type: "method",
				signature: "actions.viewCast({hash: string, close?: boolean})",
				description: "View a specific cast",
			},
			swapToken: {
				type: "method",
				signature: "actions.swapToken({sellToken?: string, buyToken?: string, sellAmount?: string})",
				description: "Open swap form with pre-filled tokens",
			},
			sendToken: {
				type: "method",
				signature: "actions.sendToken({token?: string, amount?: string, recipientAddress?: string, recipientFid?: number})",
				description: "Open send form with pre-filled token and recipient",
			},
			viewToken: {
				type: "method",
				signature: "actions.viewToken({token: string})",
				description: "View a token",
			},
			composeCast: {
				type: "method",
				signature:
					"actions.composeCast({text?: string, embeds?: string[], parent?: {type: string, hash: string}, close?: boolean, channelKey?: string})",
				description: "Open cast composer with suggested content",
			},
			quickAuth: {
				type: "object",
				description: "Quick Auth API - Recommended authentication method for Farcaster Mini Apps",
				properties: {
					getToken: {
						type: "method",
						signature: "actions.quickAuth.getToken(options?: {force?: boolean, quickAuthServerOrigin?: string})",
						description: "Get Quick Auth token (cached if available and not expired). Returns {token: string}",
					},
					fetch: {
						type: "method",
						signature: "actions.quickAuth.fetch(url: string, options?: RequestInit)",
						description: "Make an authenticated fetch request (automatically adds Bearer token)",
					},
					token: {
						type: "property",
						returnType: "string | undefined",
						signature: "actions.quickAuth.token",
						description: "Synchronous access to current token (if available)",
					},
				},
			},
		},
	},
};

// src/api-definitions/assets.ts
init_cjs_shims();
var assetsApi = {
	AssetManager: {
		type: "class",
		description: "Asset management system",
		signature: "new AssetManager(options)",
		properties: {
			load: {
				type: "method",
				description: "Load an asset",
				signature: "assetManager.load(src, type?)",
			},
			get: {
				type: "method",
				description: "Get a loaded asset",
				signature: "assetManager.get(src)",
			},
			unload: {
				type: "method",
				description: "Unload an asset",
				signature: "assetManager.unload(src)",
			},
		},
	},
};

// src/api-definitions/audio.ts
init_cjs_shims();
var audioApi = {
	audio: {
		type: "object",
		description: "Audio playback and sound interface",
		properties: {
			beep: {
				type: "method",
				description: "Play a beep sequence",
				signature: "audio.beep(sequence: string): void",
			},
			cancelBeeps: {
				type: "method",
				description: "Cancel all pending beeps",
				signature: "audio.cancelBeeps(): void",
			},
			playSound: {
				type: "method",
				description: "Play a sound file",
				signature:
					"audio.playSound(sound: string | Sound, volume?: number, pitch?: number, pan?: number, loopit?: boolean): number",
			},
			playMusic: {
				type: "method",
				description: "Play background music",
				signature: "audio.playMusic(music: string | Music, volume?: number, loopit?: boolean): number",
			},
		},
	},
};

// src/api-definitions/core.ts
init_cjs_shims();
var coreApi = {
	print: {
		type: "function",
		description: "Prints text to the debug console",
		signature: "print(text: any)",
	},
	List: {
		type: "module",
		description: "Array manipulation and functional programming utilities",
		properties: {
			map: {
				type: "method",
				signature: "List.map(arr, fn)",
				description: "Map over array elements",
			},
			filter: {
				type: "method",
				signature: "List.filter(arr, fn)",
				description: "Filter array by predicate",
			},
			reduce: {
				type: "method",
				signature: "List.reduce(arr, fn, initial)",
				description: "Reduce array to single value",
			},
			find: {
				type: "method",
				signature: "List.find(arr, fn)",
				description: "Find first matching element",
			},
			findIndex: {
				type: "method",
				signature: "List.findIndex(arr, fn)",
				description: "Find index of first match",
			},
			some: {
				type: "method",
				signature: "List.some(arr, fn)",
				description: "Test if any element matches",
			},
			every: {
				type: "method",
				signature: "List.every(arr, fn)",
				description: "Test if all elements match",
			},
			reverse: {
				type: "method",
				signature: "List.reverse(arr)",
				description: "Reverse array (non-mutating)",
			},
			sort: {
				type: "method",
				signature: "List.sort(arr, fn?)",
				description: "Sort array (non-mutating)",
			},
			slice: {
				type: "method",
				signature: "List.slice(arr, start, end?)",
				description: "Extract array slice",
			},
			concat: {
				type: "method",
				signature: "List.concat(...arrays)",
				description: "Concatenate arrays",
			},
			flat: {
				type: "method",
				signature: "List.flat(arr, depth?)",
				description: "Flatten nested array",
			},
			flatMap: {
				type: "method",
				signature: "List.flatMap(arr, fn)",
				description: "Map and flatten array",
			},
			indexOf: {
				type: "method",
				signature: "List.indexOf(arr, item, from?)",
				description: "Find first index of item",
			},
			lastIndexOf: {
				type: "method",
				signature: "List.lastIndexOf(arr, item, from?)",
				description: "Find last index of item",
			},
			includes: {
				type: "method",
				signature: "List.includes(arr, item, from?)",
				description: "Check if array includes item",
			},
			length: {
				type: "method",
				signature: "List.length(arr)",
				description: "Get array length",
			},
			first: {
				type: "method",
				signature: "List.first(arr)",
				description: "Get first element",
			},
			last: {
				type: "method",
				signature: "List.last(arr)",
				description: "Get last element",
			},
			at: {
				type: "method",
				signature: "List.at(arr, index)",
				description: "Get element at index (supports negative)",
			},
			push: {
				type: "method",
				signature: "List.push(arr, ...items)",
				description: "Add items to end",
			},
			pop: {
				type: "method",
				signature: "List.pop(arr)",
				description: "Remove and return last item",
			},
			shift: {
				type: "method",
				signature: "List.shift(arr)",
				description: "Remove and return first item",
			},
			unshift: {
				type: "method",
				signature: "List.unshift(arr, ...items)",
				description: "Add items to start",
			},
			splice: {
				type: "method",
				signature: "List.splice(arr, start, deleteCount?, ...items)",
				description: "Remove/insert elements",
			},
			fill: {
				type: "method",
				signature: "List.fill(arr, value, start?, end?)",
				description: "Fill array with value",
			},
			join: {
				type: "method",
				signature: "List.join(arr, separator?)",
				description: "Join array to string",
			},
			unique: {
				type: "method",
				signature: "List.unique(arr)",
				description: "Remove duplicates",
			},
			shuffle: {
				type: "method",
				signature: "List.shuffle(arr)",
				description: "Randomly shuffle array",
			},
			chunk: {
				type: "method",
				signature: "List.chunk(arr, size)",
				description: "Split into chunks",
			},
			sum: {
				type: "method",
				signature: "List.sum(arr)",
				description: "Sum numeric array",
			},
			average: {
				type: "method",
				signature: "List.average(arr)",
				description: "Average of numeric array",
			},
			min: {
				type: "method",
				signature: "List.min(arr)",
				description: "Minimum value in array",
			},
			max: {
				type: "method",
				signature: "List.max(arr)",
				description: "Maximum value in array",
			},
		},
	},
	Math: {
		type: "module",
		description: "Mathematical and game-specific utilities",
		properties: {
			abs: {
				type: "method",
				signature: "Math.abs(x)",
				description: "Absolute value",
			},
			sqrt: {
				type: "method",
				signature: "Math.sqrt(x)",
				description: "Square root",
			},
			floor: {
				type: "method",
				signature: "Math.floor(x)",
				description: "Round down",
			},
			ceil: {
				type: "method",
				signature: "Math.ceil(x)",
				description: "Round up",
			},
			round: {
				type: "method",
				signature: "Math.round(x)",
				description: "Round to nearest",
			},
			min: {
				type: "method",
				signature: "Math.min(...args)",
				description: "Minimum value",
			},
			max: {
				type: "method",
				signature: "Math.max(...args)",
				description: "Maximum value",
			},
			pow: {
				type: "method",
				signature: "Math.pow(base, exp)",
				description: "Power function",
			},
			exp: {
				type: "method",
				signature: "Math.exp(x)",
				description: "e^x",
			},
			log: {
				type: "method",
				signature: "Math.log(x)",
				description: "Natural logarithm",
			},
			log10: {
				type: "method",
				signature: "Math.log10(x)",
				description: "Base-10 logarithm",
			},
			sin: {
				type: "method",
				signature: "Math.sin(x)",
				description: "Sine (radians)",
			},
			cos: {
				type: "method",
				signature: "Math.cos(x)",
				description: "Cosine (radians)",
			},
			tan: {
				type: "method",
				signature: "Math.tan(x)",
				description: "Tangent (radians)",
			},
			asin: {
				type: "method",
				signature: "Math.asin(x)",
				description: "Arcsine",
			},
			acos: {
				type: "method",
				signature: "Math.acos(x)",
				description: "Arccosine",
			},
			atan: {
				type: "method",
				signature: "Math.atan(x)",
				description: "Arctangent",
			},
			atan2: {
				type: "method",
				signature: "Math.atan2(y, x)",
				description: "Two-argument arctangent",
			},
			random: {
				type: "method",
				signature: "Math.random()",
				description: "Random number 0-1",
			},
			randomInt: {
				type: "method",
				signature: "Math.randomInt(min, max)",
				description: "Random integer",
			},
			randomFloat: {
				type: "method",
				signature: "Math.randomFloat(min, max)",
				description: "Random float",
			},
			PI: {
				type: "property",
				description: "Pi constant (3.14159...)",
			},
			E: {
				type: "property",
				description: "Euler's number (2.71828...)",
			},
			clamp: {
				type: "method",
				signature: "Math.clamp(value, min, max)",
				description: "Clamp value between min/max",
			},
			lerp: {
				type: "method",
				signature: "Math.lerp(a, b, t)",
				description: "Linear interpolation",
			},
			distance: {
				type: "method",
				signature: "Math.distance(x1, y1, x2, y2)",
				description: "2D distance",
			},
			distance3D: {
				type: "method",
				signature: "Math.distance3D(x1, y1, z1, x2, y2, z2)",
				description: "3D distance",
			},
			angleBetween: {
				type: "method",
				signature: "Math.angleBetween(x1, y1, x2, y2)",
				description: "Angle between points",
			},
			degToRad: {
				type: "method",
				signature: "Math.degToRad(degrees)",
				description: "Convert degrees to radians",
			},
			radToDeg: {
				type: "method",
				signature: "Math.radToDeg(radians)",
				description: "Convert radians to degrees",
			},
			sign: {
				type: "method",
				signature: "Math.sign(x)",
				description: "Sign of number (-1, 0, 1)",
			},
			mod: {
				type: "method",
				signature: "Math.mod(n, m)",
				description: "Euclidean modulo",
			},
		},
	},
	String: {
		type: "module",
		description: "String manipulation utilities",
		properties: {
			split: {
				type: "method",
				signature: "String.split(str, separator?)",
				description: "Split string into array",
			},
			join: {
				type: "method",
				signature: "String.join(arr, separator?)",
				description: "Join array to string",
			},
			trim: {
				type: "method",
				signature: "String.trim(str)",
				description: "Remove whitespace from both ends",
			},
			trimStart: {
				type: "method",
				signature: "String.trimStart(str)",
				description: "Remove leading whitespace",
			},
			trimEnd: {
				type: "method",
				signature: "String.trimEnd(str)",
				description: "Remove trailing whitespace",
			},
			replace: {
				type: "method",
				signature: "String.replace(str, search, replacement)",
				description: "Replace first occurrence",
			},
			replaceAll: {
				type: "method",
				signature: "String.replaceAll(str, search, replacement)",
				description: "Replace all occurrences",
			},
			startsWith: {
				type: "method",
				signature: "String.startsWith(str, prefix)",
				description: "Check if string starts with prefix",
			},
			endsWith: {
				type: "method",
				signature: "String.endsWith(str, suffix)",
				description: "Check if string ends with suffix",
			},
			contains: {
				type: "method",
				signature: "String.contains(str, search)",
				description: "Check if string contains substring",
			},
			toLowerCase: {
				type: "method",
				signature: "String.toLowerCase(str)",
				description: "Convert to lowercase",
			},
			toUpperCase: {
				type: "method",
				signature: "String.toUpperCase(str)",
				description: "Convert to uppercase",
			},
			charAt: {
				type: "method",
				signature: "String.charAt(str, index)",
				description: "Get character at index",
			},
			charCodeAt: {
				type: "method",
				signature: "String.charCodeAt(str, index)",
				description: "Get char code at index",
			},
			fromCharCode: {
				type: "method",
				signature: "String.fromCharCode(...codes)",
				description: "Create string from char codes",
			},
			substring: {
				type: "method",
				signature: "String.substring(str, start, end?)",
				description: "Extract substring",
			},
			slice: {
				type: "method",
				signature: "String.slice(str, start, end?)",
				description: "Extract substring (supports negative indices)",
			},
			indexOf: {
				type: "method",
				signature: "String.indexOf(str, search, from?)",
				description: "Find first index of substring",
			},
			lastIndexOf: {
				type: "method",
				signature: "String.lastIndexOf(str, search, from?)",
				description: "Find last index of substring",
			},
			repeat: {
				type: "method",
				signature: "String.repeat(str, count)",
				description: "Repeat string n times",
			},
			padStart: {
				type: "method",
				signature: "String.padStart(str, length, pad?)",
				description: "Pad string at start",
			},
			padEnd: {
				type: "method",
				signature: "String.padEnd(str, length, pad?)",
				description: "Pad string at end",
			},
			length: {
				type: "method",
				signature: "String.length(str)",
				description: "Get string length",
			},
			parseInt: {
				type: "method",
				signature: "String.parseInt(str, radix?)",
				description: "Parse integer from string",
			},
			parseFloat: {
				type: "method",
				signature: "String.parseFloat(str)",
				description: "Parse float from string",
			},
			format: {
				type: "method",
				signature: "String.format(template, ...args)",
				description: "Format string with {0}, {1}, etc.",
			},
		},
	},
	JSON: {
		type: "module",
		description: "JSON encoding and decoding",
		properties: {
			encode: {
				type: "method",
				signature: "JSON.encode(value)",
				description: "Encode value to JSON string",
			},
			decode: {
				type: "method",
				signature: "JSON.decode(json)",
				description: "Decode JSON string to value",
			},
			pretty: {
				type: "method",
				signature: "JSON.pretty(value, indent?)",
				description: "Pretty-print JSON with indentation",
			},
		},
	},
	Random: {
		type: "constructor",
		description: "Seeded random number generator for deterministic randomness",
		signature: "new Random(seed?: number)",
		properties: {
			next: {
				type: "method",
				signature: "random.next()",
				description: "Get next random number (0-1)",
			},
			nextInt: {
				type: "method",
				signature: "random.nextInt(max)",
				description: "Get random integer (0 to max-1)",
			},
			seed: {
				type: "method",
				signature: "random.seed(newSeed?)",
				description: "Set new seed value",
			},
			clone: {
				type: "method",
				signature: "random.clone(seed?)",
				description: "Clone random generator with optional new seed",
			},
		},
	},
	ObjectPool: {
		type: "constructor",
		description: "Object pooling utility for performance optimization",
		signature: "new ObjectPool(factory, maxSize?)",
		properties: {
			acquire: {
				type: "method",
				signature: "pool.acquire()",
				description: "Get object from pool or create new",
			},
			release: {
				type: "method",
				signature: "pool.release(obj)",
				description: "Return object to pool for reuse",
			},
			clear: {
				type: "method",
				signature: "pool.clear()",
				description: "Clear all objects from pool",
			},
			getSize: {
				type: "method",
				signature: "pool.getSize()",
				description: "Get current pool size",
			},
			getMaxSize: {
				type: "method",
				signature: "pool.getMaxSize()",
				description: "Get maximum pool size",
			},
		},
	},
	storage: {
		type: "module",
		description: "Persistent storage API (localStorage wrapper)",
		properties: {
			get: {
				type: "method",
				signature: "storage.get(key, defaultValue?)",
				description: "Get value from storage",
			},
			set: {
				type: "method",
				signature: "storage.set(key, value)",
				description: "Save value to storage",
			},
			remove: {
				type: "method",
				signature: "storage.remove(key)",
				description: "Remove value from storage",
			},
			clear: {
				type: "method",
				signature: "storage.clear()",
				description: "Clear all storage",
			},
			has: {
				type: "method",
				signature: "storage.has(key)",
				description: "Check if key exists in storage",
			},
			keys: {
				type: "method",
				signature: "storage.keys()",
				description: "Get all storage keys",
			},
		},
	},
};

// src/api-definitions/env.ts
init_cjs_shims();
var envApi = {
	env: {
		type: "object",
		description: "Environment variables API - read-only access to environment variables",
		properties: {
			get: {
				type: "method",
				signature: "env.get(key: string): string | undefined",
				description: "Get environment variable value by key. Returns undefined if not found.",
			},
			has: {
				type: "method",
				signature: "env.has(key: string): boolean",
				description: "Check if environment variable exists",
			},
			keys: {
				type: "method",
				signature: "env.keys(): string[]",
				description: "Get all environment variable keys",
			},
		},
	},
};

// src/api-definitions/evm.ts
init_cjs_shims();
var evmApi = {
	evm: {
		type: "object",
		description: "EVM blockchain operations using viem",
		properties: {
			read: {
				type: "method",
				signature: "evm.read(contractAddress: string, abi: any, functionName: string, args?: any[])",
				description: "Read from smart contract (view function, no transaction)",
			},
			write: {
				type: "method",
				signature: "evm.write(contractAddress: string, abi: any, functionName: string, args?: any[])",
				description: "Write to smart contract (state-changing, sends transaction)",
			},
			call: {
				type: "method",
				signature: "evm.call(contractAddress: string, abi: any, functionName: string, args?: any[])",
				description: "Call/simulate contract function (no transaction)",
			},
			multicall: {
				type: "method",
				signature: "evm.multicall(requests: Array<{address: string, abi: any, functionName: string, args?: any[]}>)",
				description: "Batch multiple contract reads in a single call (optimize performance)",
			},
			watchEvent: {
				type: "method",
				signature:
					"evm.watchEvent(contractAddress: string, abi: any, eventName: string, filterOptions?: object, onEvent?: function)",
				description: "Watch contract events in real-time. Returns unsubscribe function",
			},
			getEventLogs: {
				type: "method",
				signature: "evm.getEventLogs(contractAddress: string, abi: any, eventName: string, filterOptions?: object)",
				description: "Get historical event logs from a contract",
			},
			getTransactionReceipt: {
				type: "method",
				signature: "evm.getTransactionReceipt(txHash: string)",
				description: "Get transaction receipt with status, gas used, logs, etc.",
			},
			estimateGas: {
				type: "method",
				signature: "evm.estimateGas(contractAddress: string, abi: any, functionName: string, args?: any[])",
				description: "Estimate gas cost for a contract write operation",
			},
			getBalance: {
				type: "method",
				signature: "evm.getBalance(address?: string)",
				description: "Get ETH balance for an address",
			},
			formatEther: {
				type: "method",
				signature: "evm.formatEther(value: string)",
				description: "Format wei to ether (wei / 10^18)",
			},
			parseEther: {
				type: "method",
				signature: "evm.parseEther(value: string)",
				description: "Parse ether to wei (ether * 10^18)",
			},
		},
	},
};

// src/api-definitions/http.ts
init_cjs_shims();
var httpApi = {
	http: {
		type: "object",
		description: "HTTP client for external API requests",
		properties: {
			request: {
				type: "method",
				signature: "http.request(url: string, options?: {method?: string, headers?: object, body?: any, timeout?: number})",
				description: "Make a custom HTTP request with full control",
			},
			get: {
				type: "method",
				signature: "http.get(url: string, options?: {headers?: object, timeout?: number})",
				description: "Make a GET request",
			},
			post: {
				type: "method",
				signature: "http.post(url: string, body?: any, options?: {headers?: object, timeout?: number})",
				description: "Make a POST request",
			},
			put: {
				type: "method",
				signature: "http.put(url: string, body?: any, options?: {headers?: object, timeout?: number})",
				description: "Make a PUT request",
			},
			delete: {
				type: "method",
				signature: "http.delete(url: string, options?: {headers?: object, timeout?: number})",
				description: "Make a DELETE request",
			},
		},
	},
};

// src/api-definitions/input.ts
init_cjs_shims();
var inputApi = {
	input: {
		type: "object",
		description: "User input interface (keyboard, mouse, touch, gamepad)",
		properties: {
			keyboard: {
				type: "property",
				description: "Keyboard input state object",
			},
			mouse: {
				type: "property",
				description: "Mouse input state object with x, y, and button properties",
			},
			touch: {
				type: "property",
				description: "Touch input state for mobile devices",
			},
			gamepad: {
				type: "property",
				description: "Gamepad input state",
			},
		},
	},
};

// src/api-definitions/map.ts
init_cjs_shims();
var mapApi = {
	Map: {
		type: "class",
		description: "Tile map class",
		signature: "new Map(data)",
		properties: {
			width: {
				type: "property",
				description: "Map width in tiles",
			},
			height: {
				type: "property",
				description: "Map height in tiles",
			},
			tileWidth: {
				type: "property",
				description: "Tile width in pixels",
			},
			tileHeight: {
				type: "property",
				description: "Tile height in pixels",
			},
			getTile: {
				type: "method",
				description: "Get tile at coordinates",
				signature: "map.getTile(layer, x, y)",
			},
			setTile: {
				type: "method",
				description: "Set tile at coordinates",
				signature: "map.setTile(layer, x, y, tile)",
			},
		},
	},
	loadMap: {
		type: "function",
		description: "Load a map from source",
		signature: "loadMap(src)",
	},
	saveMap: {
		type: "function",
		description: "Save map data",
		signature: "saveMap(map)",
	},
	updateMap: {
		type: "function",
		description: "Update map definition",
		signature: "updateMap(name, definition)",
	},
};

// src/api-definitions/notifications.ts
init_cjs_shims();
var notificationsApi = {
	notifications: {
		type: "object",
		description: "Farcaster notification management for Mini Apps",
		properties: {
			isEnabled: {
				type: "method",
				signature: "notifications.isEnabled()",
				description: "Check if notifications are enabled for the current user. Returns 1 if enabled, 0 if not",
			},
			getToken: {
				type: "method",
				signature: "notifications.getToken()",
				description: "Get the notification token (if available). Returns string | undefined",
			},
			getUrl: {
				type: "method",
				signature: "notifications.getUrl()",
				description: "Get the notification URL (if available). Returns string | undefined",
			},
			getDetails: {
				type: "method",
				signature: "notifications.getDetails()",
				description: "Get both notification token and URL. Returns {token: string, url: string} | undefined",
			},
			sendTokenToServer: {
				type: "method",
				signature: "notifications.sendTokenToServer(serverUrl: string, options?: object)",
				description: "Helper method to send notification token to your server for storage. Returns Promise<Response>",
			},
		},
	},
};

// src/api-definitions/palette.ts
init_cjs_shims();
var paletteApi = {
	Palette: {
		type: "class",
		description: "Color palette management",
		signature: "new Palette(colors)",
		properties: {
			get: {
				type: "method",
				description: "Get color by index",
				signature: "palette.get(index)",
			},
			set: {
				type: "method",
				description: "Set color at index",
				signature: "palette.set(index, color)",
			},
			size: {
				type: "property",
				description: "Number of colors in palette",
			},
		},
	},
};

// src/api-definitions/player.ts
init_cjs_shims();
var playerApi = {
	player: {
		type: "object",
		description: "Farcaster player context and user information",
		properties: {
			fid: {
				type: "property",
				description: "Player Farcaster ID (FID)",
			},
			username: {
				type: "property",
				description: "Player username",
			},
			displayName: {
				type: "property",
				description: "Player display name",
			},
			pfpUrl: {
				type: "property",
				description: "Player profile picture URL",
			},
			getFid: {
				type: "method",
				signature: "player.getFid()",
				description: "Get player Farcaster ID",
			},
			getUsername: {
				type: "method",
				signature: "player.getUsername()",
				description: "Get player username",
			},
			getDisplayName: {
				type: "method",
				signature: "player.getDisplayName()",
				description: "Get player display name",
			},
			getPfpUrl: {
				type: "method",
				signature: "player.getPfpUrl()",
				description: "Get player profile picture URL",
			},
			getContext: {
				type: "method",
				signature: "player.getContext()",
				description: "Get full player context object",
			},
			isInMiniApp: {
				type: "method",
				signature: "player.isInMiniApp()",
				description: "Check if running in Farcaster Mini App",
			},
		},
	},
};

// src/api-definitions/scene.ts
init_cjs_shims();
var sceneApi = {
	scene: {
		type: "function",
		description: "Register a new scene",
		signature: "scene(name: string, definition: object)",
	},
	route: {
		type: "function",
		description: "Register a route to a scene",
		signature: "route(path: string, sceneName: string)",
	},
	router: {
		type: "object",
		description: "Router for navigation",
		properties: {
			push: {
				type: "method",
				description: "Navigate to a path (adds to history)",
				signature: "router.push(path: string)",
			},
			replace: {
				type: "method",
				description: "Replace current path (no history)",
				signature: "router.replace(path: string)",
			},
			back: {
				type: "method",
				description: "Go back in history",
				signature: "router.back()",
			},
			path: {
				type: "property",
				description: "Current path",
			},
			params: {
				type: "property",
				description: "Current route parameters",
			},
			sceneName: {
				type: "property",
				description: "Current scene name",
			},
			getPath: {
				type: "method",
				description: "Get current path",
				signature: "router.getPath()",
			},
			getParams: {
				type: "method",
				description: "Get current route parameters",
				signature: "router.getParams()",
			},
			getSceneName: {
				type: "method",
				description: "Get current scene name",
				signature: "router.getSceneName()",
			},
		},
	},
	scenes: {
		type: "object",
		description: "Scene manager",
		properties: {
			goto: {
				type: "method",
				description: "Directly switch to a scene",
				signature: "scenes.goto(name: string, params?: object)",
			},
			current: {
				type: "method",
				description: "Get current scene name",
				signature: "scenes.current()",
			},
		},
	},
};

// src/api-definitions/screen.ts
init_cjs_shims();
var screenApi = {
	screen: {
		type: "object",
		description: "Screen drawing and display interface",
		properties: {
			width: {
				type: "property",
				description: "Screen width in pixels",
			},
			height: {
				type: "property",
				description: "Screen height in pixels",
			},
			drawSprite: {
				type: "method",
				description: "Draw a sprite at the specified position",
				signature: "screen.drawSprite(sprite: string, x: number, y: number, width?: number, height?: number)",
			},
			fillRect: {
				type: "method",
				description: "Fill a rectangle with the current color",
				signature: "screen.fillRect(x: number, y: number, width: number, height: number, color: string)",
			},
			drawRect: {
				type: "method",
				description: "Draw a rectangle outline",
				signature: "screen.drawRect(x: number, y: number, width: number, height: number, color: string)",
			},
			drawText: {
				type: "method",
				description: "Draw text at the specified position",
				signature: "screen.drawText(text: string, x: number, y: number, size: number, color?: string | number)",
			},
			drawLine: {
				type: "method",
				signature: "screen.drawLine(x1, y1, x2, y2, color?)",
				description: "Draw line between two points",
			},
			clear: {
				type: "method",
				signature: "screen.clear(color?: string)",
				description: "Clear the screen with optional color",
			},
			setColor: {
				type: "method",
				signature: "screen.setColor(color)",
				description: "Set drawing color",
			},
			setAlpha: {
				type: "method",
				signature: "screen.setAlpha(alpha)",
				description: "Set opacity (0-1)",
			},
			setPixelated: {
				type: "method",
				signature: "screen.setPixelated(pixelated)",
				description: "Enable/disable pixelated rendering",
			},
			setBlending: {
				type: "method",
				signature: "screen.setBlending(mode)",
				description: "Set blending mode",
			},
			setLinearGradient: {
				type: "method",
				signature: "screen.setLinearGradient(x1, y1, x2, y2, c1, c2)",
				description: "Set linear gradient",
			},
			setRadialGradient: {
				type: "method",
				signature: "screen.setRadialGradient(x, y, radius, c1, c2)",
				description: "Set radial gradient",
			},
			setFont: {
				type: "method",
				signature: "screen.setFont(font)",
				description: "Set font family",
			},
			loadFont: {
				type: "method",
				signature: "screen.loadFont(font)",
				description: "Load font",
			},
			isFontReady: {
				type: "method",
				signature: "screen.isFontReady(font?)",
				description: "Check if font is loaded",
			},
			setTranslation: {
				type: "method",
				signature: "screen.setTranslation(tx, ty)",
				description: "Set translation offset",
			},
			setScale: {
				type: "method",
				signature: "screen.setScale(x, y)",
				description: "Set scale",
			},
			setRotation: {
				type: "method",
				signature: "screen.setRotation(rotation)",
				description: "Set rotation",
			},
			setDrawAnchor: {
				type: "method",
				signature: "screen.setDrawAnchor(ax, ay)",
				description: "Set sprite drawing anchor",
			},
			setDrawRotation: {
				type: "method",
				signature: "screen.setDrawRotation(rotation)",
				description: "Set sprite rotation",
			},
			setDrawScale: {
				type: "method",
				signature: "screen.setDrawScale(x, y?)",
				description: "Set sprite scale",
			},
			fillRoundRect: {
				type: "method",
				signature: "screen.fillRoundRect(x, y, w, h, r?, color?)",
				description: "Fill rounded rectangle",
			},
			fillRound: {
				type: "method",
				signature: "screen.fillRound(x, y, w, h, color?)",
				description: "Fill round (ellipse in rect)",
			},
			drawRoundRect: {
				type: "method",
				signature: "screen.drawRoundRect(x, y, w, h, r?, color?)",
				description: "Draw rounded rectangle outline",
			},
			drawRound: {
				type: "method",
				signature: "screen.drawRound(x, y, w, h, color?)",
				description: "Draw round outline",
			},
			drawImage: {
				type: "method",
				signature: "screen.drawImage(sprite, x, y, w?, h?)",
				description: "Draw image (alias for drawSprite)",
			},
			drawSpritePart: {
				type: "method",
				signature: "screen.drawSpritePart(sprite, sx, sy, sw, sh, x, y, w?, h?)",
				description: "Draw part of sprite",
			},
			drawImagePart: {
				type: "method",
				signature: "screen.drawImagePart(sprite, sx, sy, sw, sh, x, y, w?, h?)",
				description: "Draw part of image",
			},
			drawMap: {
				type: "method",
				signature: "screen.drawMap(map, x, y, w, h)",
				description: "Draw tile map",
			},
			drawTextOutline: {
				type: "method",
				signature: "screen.drawTextOutline(text, x, y, size, color?)",
				description: "Draw text with outline",
			},
			textWidth: {
				type: "method",
				signature: "screen.textWidth(text, size)",
				description: "Measure text width",
			},
			setLineWidth: {
				type: "method",
				signature: "screen.setLineWidth(width)",
				description: "Set line width",
			},
			setLineDash: {
				type: "method",
				signature: "screen.setLineDash(dash)",
				description: "Set line dash pattern",
			},
			drawPolygon: {
				type: "method",
				signature: "screen.drawPolygon(...points)",
				description: "Draw polygon outline",
			},
			drawPolyline: {
				type: "method",
				signature: "screen.drawPolyline(...points)",
				description: "Draw polyline",
			},
			fillPolygon: {
				type: "method",
				signature: "screen.fillPolygon(...points)",
				description: "Fill polygon",
			},
			drawQuadCurve: {
				type: "method",
				signature: "screen.drawQuadCurve(...args)",
				description: "Draw quadratic curve",
			},
			drawBezierCurve: {
				type: "method",
				signature: "screen.drawBezierCurve(...args)",
				description: "Draw bezier curve",
			},
			drawArc: {
				type: "method",
				signature: "screen.drawArc(x, y, radius, angle1, angle2, ccw, color?)",
				description: "Draw arc",
			},
			fillArc: {
				type: "method",
				signature: "screen.fillArc(x, y, radius, angle1, angle2, ccw, color?)",
				description: "Fill arc",
			},
			setCursorVisible: {
				type: "method",
				signature: "screen.setCursorVisible(visible)",
				description: "Show/hide cursor",
			},
			tri: {
				type: "method",
				signature: "screen.tri(x1, y1, x2, y2, x3, y3, color?)",
				description: "Draw triangle outline",
			},
			trib: {
				type: "method",
				signature: "screen.trib(x1, y1, x2, y2, x3, y3, color?)",
				description: "Fill triangle",
			},
			ttri: {
				type: "method",
				signature: "screen.ttri(x1, y1, x2, y2, x3, y3, u1, v1, u2, v2, u3, v3, texture, ...)",
				description: "Textured triangle (3D)",
			},
		},
	},
};

// src/api-definitions/sprites.ts
init_cjs_shims();
var spritesApi = {
	sprites: {
		type: "object",
		description: "Collection of loaded sprites, indexed by sprite name",
		properties: {},
	},
	Sprite: {
		type: "class",
		description: "Animated sprite class",
		signature: "new Sprite(width, height)",
		properties: {
			width: {
				type: "property",
				description: "Sprite width in pixels",
			},
			height: {
				type: "property",
				description: "Sprite height in pixels",
			},
			ready: {
				type: "property",
				description: "Whether the sprite is ready (1) or not (0)",
			},
			frames: {
				type: "property",
				description: "Array of sprite frames",
			},
			fps: {
				type: "property",
				description: "Frames per second for animation",
			},
			animation_start: {
				type: "property",
				description: "Animation start timestamp",
			},
			setFPS: {
				type: "method",
				description: "Set animation frames per second",
				signature: "sprite.setFPS(fps: number)",
			},
			setFrame: {
				type: "method",
				description: "Set current animation frame",
				signature: "sprite.setFrame(frame: number)",
			},
			getFrame: {
				type: "method",
				description: "Get current animation frame index",
				signature: "sprite.getFrame(): number",
			},
			getCurrentFrameCanvas: {
				type: "method",
				description: "Get canvas of current frame",
				signature: "sprite.getCurrentFrameCanvas(): canvas",
			},
			play: {
				type: "method",
				description: "Play animation",
				signature: "sprite.play(animation?)",
			},
			stop: {
				type: "method",
				description: "Stop animation",
				signature: "sprite.stop()",
			},
			update: {
				type: "method",
				description: "Update sprite state",
				signature: "sprite.update(dt)",
			},
			draw: {
				type: "method",
				description: "Draw sprite",
				signature: "sprite.draw(x, y, w?, h?)",
			},
		},
	},
	Image: {
		type: "class",
		description: "Image resource wrapper",
		signature: "new Image(source)",
	},
	loadSprite: {
		type: "function",
		description: "Load a sprite from source",
		signature: "loadSprite(src, options?)",
	},
	updateSprite: {
		type: "function",
		description: "Update a sprite definition",
		signature: "updateSprite(name, definition)",
	},
	loadFont: {
		type: "function",
		description: "Load a font",
		signature: "loadFont(name, src, options?)",
	},
	isFontReady: {
		type: "function",
		description: "Check if a font is loaded",
		signature: "isFontReady(name)",
	},
	clearFontCache: {
		type: "function",
		description: "Clear font cache",
		signature: "clearFontCache()",
	},
};

// src/api-definitions/system.ts
init_cjs_shims();
var systemApi = {
	system: {
		type: "object",
		description: "Runtime system utilities and information",
		properties: {
			time: {
				type: "property",
				description: "Current system time in milliseconds",
			},
			fps: {
				type: "property",
				description: "Current frames per second",
			},
			deltaTime: {
				type: "property",
				description: "Time elapsed since last frame (seconds)",
			},
			cpu_load: {
				type: "property",
				description: "CPU load percentage",
			},
			update_rate: {
				type: "property",
				description: "Target update rate",
			},
			language: {
				type: "property",
				description: "Browser language",
			},
			loading: {
				type: "property",
				description: "Asset loading progress (0-1)",
			},
			inputs: {
				type: "property",
				description: "Input device availability",
			},
			pause: {
				type: "method",
				signature: "system.pause()",
				description: "Pause game execution",
			},
			exit: {
				type: "method",
				signature: "system.exit()",
				description: "Exit game",
			},
			prompt: {
				type: "method",
				signature: "system.prompt(text, callback)",
				description: "Prompt user for input",
			},
			say: {
				type: "method",
				signature: "system.say(text)",
				description: "Show alert message",
			},
		},
	},
};

// src/api-definitions/time.ts
init_cjs_shims();
var timeApi = {
	TimeMachine: {
		type: "class",
		description: "Time travel debugging system",
		signature: "new TimeMachine(options)",
		properties: {
			record: {
				type: "method",
				description: "Start recording state",
				signature: "timeMachine.record()",
			},
			play: {
				type: "method",
				description: "Play back recorded state",
				signature: "timeMachine.play()",
			},
			stop: {
				type: "method",
				description: "Stop recording/playback",
				signature: "timeMachine.stop()",
			},
			rewind: {
				type: "method",
				description: "Rewind state",
				signature: "timeMachine.rewind(steps)",
			},
		},
	},
	StatePlayer: {
		type: "class",
		description: "State playback controller",
		signature: "new StatePlayer(timeMachine)",
	},
	StateRecorder: {
		type: "class",
		description: "State recorder",
		signature: "new StateRecorder(timeMachine)",
	},
};

// src/api-definitions/wallet.ts
init_cjs_shims();
var walletApi = {
	wallet: {
		type: "object",
		description: "Wallet operations for Farcaster Mini Apps",
		properties: {
			isConnected: {
				type: "method",
				signature: "wallet.isConnected()",
				description: "Check if wallet is connected",
			},
			connect: {
				type: "method",
				signature: "wallet.connect()",
				description: "Connect to wallet",
			},
			getAddress: {
				type: "method",
				signature: "wallet.getAddress()",
				description: "Get connected wallet address",
			},
			getChainId: {
				type: "method",
				signature: "wallet.getChainId()",
				description: "Get current chain ID",
			},
			sendTransaction: {
				type: "method",
				signature: "wallet.sendTransaction({to: string, value?: string, data?: string})",
				description: "Send a transaction",
			},
			signMessage: {
				type: "method",
				signature: "wallet.signMessage(message: string)",
				description: "Sign a message",
			},
		},
	},
};

// src/api-definitions/index.ts
var GLOBAL_API = {
	...coreApi,
	...screenApi,
	...audioApi,
	...inputApi,
	...systemApi,
	...sceneApi,
	...spritesApi,
	...mapApi,
	...timeApi,
	...assetsApi,
	...paletteApi,
	...playerApi,
	...walletApi,
	...evmApi,
	...actionsApi,
	...notificationsApi,
	...httpApi,
	...envApi,
};
var API_ACCESS_REGEX = /\b([A-Za-z_][A-Za-z0-9_]*(?:\.[A-Za-z_][A-Za-z0-9_]*)*)\.([A-Za-z_][A-Za-z0-9_]*)\b/g;

// src/document-state.ts
init_cjs_shims();
var import_parser = __toESM(require_parser());
var import_node = __toESM(require_node3());
var MAX_DOCUMENT_STATES = 100;
var documentStates = /* @__PURE__ */ new Map();
function getDocumentStates() {
	return documentStates;
}
__name(getDocumentStates, "getDocumentStates");
function updateDocumentState(textDocument, connection2) {
	const text = textDocument.getText();
	const state = {
		textDocument,
		ast: null,
		scope: null,
		symbols: [],
	};
	try {
		const parser = new import_parser.Parser(text, textDocument.uri);
		parser.parse();
		const ast = convertParserAst(parser);
		const scope = buildScope(ast);
		const symbols = collectSymbols(ast, textDocument.uri);
		state.ast = ast;
		state.scope = scope;
		state.symbols = symbols;
	} catch (err) {
		connection2.console.error(`AST build failed: ${err}`);
	}
	documentStates.set(textDocument.uri, state);
	if (documentStates.size > MAX_DOCUMENT_STATES) {
		const firstKey = documentStates.keys().next().value;
		if (firstKey !== void 0) {
			documentStates.delete(firstKey);
		}
	}
}
__name(updateDocumentState, "updateDocumentState");
function deleteDocumentState(uri) {
	documentStates.delete(uri);
}
__name(deleteDocumentState, "deleteDocumentState");
function convertParserAst(parser) {
	const root = {
		type: "root",
		line: 1,
		column: 0,
		children: [],
		scope: {
			symbols: /* @__PURE__ */ new Map(),
		},
	};
	const statements = parser.program?.statements || [];
	for (const stmt of statements) {
		root.children?.push(convertNode(stmt));
	}
	return root;
}
__name(convertParserAst, "convertParserAst");
function convertNode(node) {
	const base = {
		type: node.constructor?.name || "Unknown",
		line: node?.token?.line || 1,
		column: node?.token?.column || 0,
		endLine: node?.token?.line || 1,
		endColumn: node?.token?.column || 0,
		children: [],
	};
	if (node.identifier) {
		base.name = node.identifier;
	}
	if (node.sequence) {
		for (const child of node.sequence) {
			base.children?.push(convertNode(child));
		}
	}
	if (node.body) {
		for (const child of node.body) {
			base.children?.push(convertNode(child));
		}
	}
	if (node.expression) {
		base.children?.push(convertNode(node.expression));
	}
	if (node.statements) {
		for (const child of node.statements) {
			base.children?.push(convertNode(child));
		}
	}
	if (node.function_body) {
		for (const child of node.function_body) {
			base.children?.push(convertNode(child));
		}
	}
	return base;
}
__name(convertNode, "convertNode");
function buildScope(ast, parent) {
	if (!ast) return null;
	const scope = {
		parent,
		symbols: /* @__PURE__ */ new Map(),
	};
	if (ast.children) {
		for (const child of ast.children) {
			buildScope(child, scope);
		}
	}
	ast.scope = scope;
	return scope;
}
__name(buildScope, "buildScope");
function collectSymbols(ast, uri) {
	if (!ast) return [];
	const symbols = [];
	function visit2(node) {
		if (node.type === "Function" && node.name) {
			const symbol = {
				name: node.name,
				type: "function",
				documentUri: uri,
				range: buildRange(node),
			};
			symbols.push(symbol);
			node.scope?.symbols.set(node.name, symbol);
		} else if (node.type === "Assignment" && node.name) {
			const symbol = {
				name: node.name,
				type: "variable",
				documentUri: uri,
				range: buildRange(node),
			};
			symbols.push(symbol);
			node.scope?.symbols.set(node.name, symbol);
		}
		if (node.children) {
			for (const child of node.children) {
				visit2(child);
			}
		}
	}
	__name(visit2, "visit");
	visit2(ast);
	return symbols;
}
__name(collectSymbols, "collectSymbols");
function buildRange(node) {
	return import_node.Range.create(
		import_node.Position.create(Math.max(node.line - 1, 0), Math.max(node.column, 0)),
		import_node.Position.create(
			Math.max((node.endLine || node.line) - 1, 0),
			Math.max(node.endColumn || node.column + (node.name?.length || 1), 0),
		),
	);
}
__name(buildRange, "buildRange");
function getWordAtPosition(document2, position) {
	const line = document2.getText({
		start: import_node.Position.create(position.line, 0),
		end: import_node.Position.create(position.line + 1, 0),
	});
	const wordRegex = /\b[a-zA-Z_][a-zA-Z0-9_]*\b/g;
	let match;
	while ((match = wordRegex.exec(line)) !== null) {
		const start = match.index;
		const end = start + match[0].length;
		if (position.character >= start && position.character <= end) {
			return match[0];
		}
	}
	return null;
}
__name(getWordAtPosition, "getWordAtPosition");

// src/embedded/json-mode.ts
init_cjs_shims();

// ../../../node_modules/.pnpm/vscode-json-languageservice@5.6.3/node_modules/vscode-json-languageservice/lib/esm/jsonLanguageService.js
init_cjs_shims();

// ../../../node_modules/.pnpm/vscode-json-languageservice@5.6.3/node_modules/vscode-json-languageservice/lib/esm/services/jsonCompletion.js
init_cjs_shims();

// ../../../node_modules/.pnpm/vscode-json-languageservice@5.6.3/node_modules/vscode-json-languageservice/lib/esm/parser/jsonParser.js
init_cjs_shims();

// ../../../node_modules/.pnpm/jsonc-parser@3.3.1/node_modules/jsonc-parser/lib/esm/main.js
init_cjs_shims();

// ../../../node_modules/.pnpm/jsonc-parser@3.3.1/node_modules/jsonc-parser/lib/esm/impl/format.js
init_cjs_shims();

// ../../../node_modules/.pnpm/jsonc-parser@3.3.1/node_modules/jsonc-parser/lib/esm/impl/scanner.js
init_cjs_shims();
function createScanner(text, ignoreTrivia = false) {
	const len = text.length;
	let pos = 0,
		value = "",
		tokenOffset = 0,
		token = 16,
		lineNumber = 0,
		lineStartOffset = 0,
		tokenLineStartOffset = 0,
		prevTokenLineStartOffset = 0,
		scanError = 0;
	function scanHexDigits(count, exact) {
		let digits = 0;
		let value2 = 0;
		while (digits < count || !exact) {
			let ch = text.charCodeAt(pos);
			if (ch >= 48 && ch <= 57) {
				value2 = value2 * 16 + ch - 48;
			} else if (ch >= 65 && ch <= 70) {
				value2 = value2 * 16 + ch - 65 + 10;
			} else if (ch >= 97 && ch <= 102) {
				value2 = value2 * 16 + ch - 97 + 10;
			} else {
				break;
			}
			pos++;
			digits++;
		}
		if (digits < count) {
			value2 = -1;
		}
		return value2;
	}
	__name(scanHexDigits, "scanHexDigits");
	function setPosition(newPosition) {
		pos = newPosition;
		value = "";
		tokenOffset = 0;
		token = 16;
		scanError = 0;
	}
	__name(setPosition, "setPosition");
	function scanNumber() {
		let start = pos;
		if (text.charCodeAt(pos) === 48) {
			pos++;
		} else {
			pos++;
			while (pos < text.length && isDigit(text.charCodeAt(pos))) {
				pos++;
			}
		}
		if (pos < text.length && text.charCodeAt(pos) === 46) {
			pos++;
			if (pos < text.length && isDigit(text.charCodeAt(pos))) {
				pos++;
				while (pos < text.length && isDigit(text.charCodeAt(pos))) {
					pos++;
				}
			} else {
				scanError = 3;
				return text.substring(start, pos);
			}
		}
		let end = pos;
		if (pos < text.length && (text.charCodeAt(pos) === 69 || text.charCodeAt(pos) === 101)) {
			pos++;
			if ((pos < text.length && text.charCodeAt(pos) === 43) || text.charCodeAt(pos) === 45) {
				pos++;
			}
			if (pos < text.length && isDigit(text.charCodeAt(pos))) {
				pos++;
				while (pos < text.length && isDigit(text.charCodeAt(pos))) {
					pos++;
				}
				end = pos;
			} else {
				scanError = 3;
			}
		}
		return text.substring(start, end);
	}
	__name(scanNumber, "scanNumber");
	function scanString() {
		let result = "",
			start = pos;
		while (true) {
			if (pos >= len) {
				result += text.substring(start, pos);
				scanError = 2;
				break;
			}
			const ch = text.charCodeAt(pos);
			if (ch === 34) {
				result += text.substring(start, pos);
				pos++;
				break;
			}
			if (ch === 92) {
				result += text.substring(start, pos);
				pos++;
				if (pos >= len) {
					scanError = 2;
					break;
				}
				const ch2 = text.charCodeAt(pos++);
				switch (ch2) {
					case 34:
						result += '"';
						break;
					case 92:
						result += "\\";
						break;
					case 47:
						result += "/";
						break;
					case 98:
						result += "\b";
						break;
					case 102:
						result += "\f";
						break;
					case 110:
						result += "\n";
						break;
					case 114:
						result += "\r";
						break;
					case 116:
						result += "	";
						break;
					case 117:
						const ch3 = scanHexDigits(4, true);
						if (ch3 >= 0) {
							result += String.fromCharCode(ch3);
						} else {
							scanError = 4;
						}
						break;
					default:
						scanError = 5;
				}
				start = pos;
				continue;
			}
			if (ch >= 0 && ch <= 31) {
				if (isLineBreak(ch)) {
					result += text.substring(start, pos);
					scanError = 2;
					break;
				} else {
					scanError = 6;
				}
			}
			pos++;
		}
		return result;
	}
	__name(scanString, "scanString");
	function scanNext() {
		value = "";
		scanError = 0;
		tokenOffset = pos;
		lineStartOffset = lineNumber;
		prevTokenLineStartOffset = tokenLineStartOffset;
		if (pos >= len) {
			tokenOffset = len;
			return (token = 17);
		}
		let code = text.charCodeAt(pos);
		if (isWhiteSpace(code)) {
			do {
				pos++;
				value += String.fromCharCode(code);
				code = text.charCodeAt(pos);
			} while (isWhiteSpace(code));
			return (token = 15);
		}
		if (isLineBreak(code)) {
			pos++;
			value += String.fromCharCode(code);
			if (code === 13 && text.charCodeAt(pos) === 10) {
				pos++;
				value += "\n";
			}
			lineNumber++;
			tokenLineStartOffset = pos;
			return (token = 14);
		}
		switch (code) {
			// tokens: []{}:,
			case 123:
				pos++;
				return (token = 1);
			case 125:
				pos++;
				return (token = 2);
			case 91:
				pos++;
				return (token = 3);
			case 93:
				pos++;
				return (token = 4);
			case 58:
				pos++;
				return (token = 6);
			case 44:
				pos++;
				return (token = 5);
			// strings
			case 34:
				pos++;
				value = scanString();
				return (token = 10);
			// comments
			case 47:
				const start = pos - 1;
				if (text.charCodeAt(pos + 1) === 47) {
					pos += 2;
					while (pos < len) {
						if (isLineBreak(text.charCodeAt(pos))) {
							break;
						}
						pos++;
					}
					value = text.substring(start, pos);
					return (token = 12);
				}
				if (text.charCodeAt(pos + 1) === 42) {
					pos += 2;
					const safeLength = len - 1;
					let commentClosed = false;
					while (pos < safeLength) {
						const ch = text.charCodeAt(pos);
						if (ch === 42 && text.charCodeAt(pos + 1) === 47) {
							pos += 2;
							commentClosed = true;
							break;
						}
						pos++;
						if (isLineBreak(ch)) {
							if (ch === 13 && text.charCodeAt(pos) === 10) {
								pos++;
							}
							lineNumber++;
							tokenLineStartOffset = pos;
						}
					}
					if (!commentClosed) {
						pos++;
						scanError = 1;
					}
					value = text.substring(start, pos);
					return (token = 13);
				}
				value += String.fromCharCode(code);
				pos++;
				return (token = 16);
			// numbers
			case 45:
				value += String.fromCharCode(code);
				pos++;
				if (pos === len || !isDigit(text.charCodeAt(pos))) {
					return (token = 16);
				}
			// found a minus, followed by a number so
			// we fall through to proceed with scanning
			// numbers
			case 48:
			case 49:
			case 50:
			case 51:
			case 52:
			case 53:
			case 54:
			case 55:
			case 56:
			case 57:
				value += scanNumber();
				return (token = 11);
			// literals and unknown symbols
			default:
				while (pos < len && isUnknownContentCharacter(code)) {
					pos++;
					code = text.charCodeAt(pos);
				}
				if (tokenOffset !== pos) {
					value = text.substring(tokenOffset, pos);
					switch (value) {
						case "true":
							return (token = 8);
						case "false":
							return (token = 9);
						case "null":
							return (token = 7);
					}
					return (token = 16);
				}
				value += String.fromCharCode(code);
				pos++;
				return (token = 16);
		}
	}
	__name(scanNext, "scanNext");
	function isUnknownContentCharacter(code) {
		if (isWhiteSpace(code) || isLineBreak(code)) {
			return false;
		}
		switch (code) {
			case 125:
			case 93:
			case 123:
			case 91:
			case 34:
			case 58:
			case 44:
			case 47:
				return false;
		}
		return true;
	}
	__name(isUnknownContentCharacter, "isUnknownContentCharacter");
	function scanNextNonTrivia() {
		let result;
		do {
			result = scanNext();
		} while (result >= 12 && result <= 15);
		return result;
	}
	__name(scanNextNonTrivia, "scanNextNonTrivia");
	return {
		setPosition,
		getPosition: /* @__PURE__ */ __name(() => pos, "getPosition"),
		scan: ignoreTrivia ? scanNextNonTrivia : scanNext,
		getToken: /* @__PURE__ */ __name(() => token, "getToken"),
		getTokenValue: /* @__PURE__ */ __name(() => value, "getTokenValue"),
		getTokenOffset: /* @__PURE__ */ __name(() => tokenOffset, "getTokenOffset"),
		getTokenLength: /* @__PURE__ */ __name(() => pos - tokenOffset, "getTokenLength"),
		getTokenStartLine: /* @__PURE__ */ __name(() => lineStartOffset, "getTokenStartLine"),
		getTokenStartCharacter: /* @__PURE__ */ __name(
			() => tokenOffset - prevTokenLineStartOffset,
			"getTokenStartCharacter",
		),
		getTokenError: /* @__PURE__ */ __name(() => scanError, "getTokenError"),
	};
}
__name(createScanner, "createScanner");
function isWhiteSpace(ch) {
	return ch === 32 || ch === 9;
}
__name(isWhiteSpace, "isWhiteSpace");
function isLineBreak(ch) {
	return ch === 10 || ch === 13;
}
__name(isLineBreak, "isLineBreak");
function isDigit(ch) {
	return ch >= 48 && ch <= 57;
}
__name(isDigit, "isDigit");
var CharacterCodes;
(function (CharacterCodes2) {
	CharacterCodes2[(CharacterCodes2["lineFeed"] = 10)] = "lineFeed";
	CharacterCodes2[(CharacterCodes2["carriageReturn"] = 13)] = "carriageReturn";
	CharacterCodes2[(CharacterCodes2["space"] = 32)] = "space";
	CharacterCodes2[(CharacterCodes2["_0"] = 48)] = "_0";
	CharacterCodes2[(CharacterCodes2["_1"] = 49)] = "_1";
	CharacterCodes2[(CharacterCodes2["_2"] = 50)] = "_2";
	CharacterCodes2[(CharacterCodes2["_3"] = 51)] = "_3";
	CharacterCodes2[(CharacterCodes2["_4"] = 52)] = "_4";
	CharacterCodes2[(CharacterCodes2["_5"] = 53)] = "_5";
	CharacterCodes2[(CharacterCodes2["_6"] = 54)] = "_6";
	CharacterCodes2[(CharacterCodes2["_7"] = 55)] = "_7";
	CharacterCodes2[(CharacterCodes2["_8"] = 56)] = "_8";
	CharacterCodes2[(CharacterCodes2["_9"] = 57)] = "_9";
	CharacterCodes2[(CharacterCodes2["a"] = 97)] = "a";
	CharacterCodes2[(CharacterCodes2["b"] = 98)] = "b";
	CharacterCodes2[(CharacterCodes2["c"] = 99)] = "c";
	CharacterCodes2[(CharacterCodes2["d"] = 100)] = "d";
	CharacterCodes2[(CharacterCodes2["e"] = 101)] = "e";
	CharacterCodes2[(CharacterCodes2["f"] = 102)] = "f";
	CharacterCodes2[(CharacterCodes2["g"] = 103)] = "g";
	CharacterCodes2[(CharacterCodes2["h"] = 104)] = "h";
	CharacterCodes2[(CharacterCodes2["i"] = 105)] = "i";
	CharacterCodes2[(CharacterCodes2["j"] = 106)] = "j";
	CharacterCodes2[(CharacterCodes2["k"] = 107)] = "k";
	CharacterCodes2[(CharacterCodes2["l"] = 108)] = "l";
	CharacterCodes2[(CharacterCodes2["m"] = 109)] = "m";
	CharacterCodes2[(CharacterCodes2["n"] = 110)] = "n";
	CharacterCodes2[(CharacterCodes2["o"] = 111)] = "o";
	CharacterCodes2[(CharacterCodes2["p"] = 112)] = "p";
	CharacterCodes2[(CharacterCodes2["q"] = 113)] = "q";
	CharacterCodes2[(CharacterCodes2["r"] = 114)] = "r";
	CharacterCodes2[(CharacterCodes2["s"] = 115)] = "s";
	CharacterCodes2[(CharacterCodes2["t"] = 116)] = "t";
	CharacterCodes2[(CharacterCodes2["u"] = 117)] = "u";
	CharacterCodes2[(CharacterCodes2["v"] = 118)] = "v";
	CharacterCodes2[(CharacterCodes2["w"] = 119)] = "w";
	CharacterCodes2[(CharacterCodes2["x"] = 120)] = "x";
	CharacterCodes2[(CharacterCodes2["y"] = 121)] = "y";
	CharacterCodes2[(CharacterCodes2["z"] = 122)] = "z";
	CharacterCodes2[(CharacterCodes2["A"] = 65)] = "A";
	CharacterCodes2[(CharacterCodes2["B"] = 66)] = "B";
	CharacterCodes2[(CharacterCodes2["C"] = 67)] = "C";
	CharacterCodes2[(CharacterCodes2["D"] = 68)] = "D";
	CharacterCodes2[(CharacterCodes2["E"] = 69)] = "E";
	CharacterCodes2[(CharacterCodes2["F"] = 70)] = "F";
	CharacterCodes2[(CharacterCodes2["G"] = 71)] = "G";
	CharacterCodes2[(CharacterCodes2["H"] = 72)] = "H";
	CharacterCodes2[(CharacterCodes2["I"] = 73)] = "I";
	CharacterCodes2[(CharacterCodes2["J"] = 74)] = "J";
	CharacterCodes2[(CharacterCodes2["K"] = 75)] = "K";
	CharacterCodes2[(CharacterCodes2["L"] = 76)] = "L";
	CharacterCodes2[(CharacterCodes2["M"] = 77)] = "M";
	CharacterCodes2[(CharacterCodes2["N"] = 78)] = "N";
	CharacterCodes2[(CharacterCodes2["O"] = 79)] = "O";
	CharacterCodes2[(CharacterCodes2["P"] = 80)] = "P";
	CharacterCodes2[(CharacterCodes2["Q"] = 81)] = "Q";
	CharacterCodes2[(CharacterCodes2["R"] = 82)] = "R";
	CharacterCodes2[(CharacterCodes2["S"] = 83)] = "S";
	CharacterCodes2[(CharacterCodes2["T"] = 84)] = "T";
	CharacterCodes2[(CharacterCodes2["U"] = 85)] = "U";
	CharacterCodes2[(CharacterCodes2["V"] = 86)] = "V";
	CharacterCodes2[(CharacterCodes2["W"] = 87)] = "W";
	CharacterCodes2[(CharacterCodes2["X"] = 88)] = "X";
	CharacterCodes2[(CharacterCodes2["Y"] = 89)] = "Y";
	CharacterCodes2[(CharacterCodes2["Z"] = 90)] = "Z";
	CharacterCodes2[(CharacterCodes2["asterisk"] = 42)] = "asterisk";
	CharacterCodes2[(CharacterCodes2["backslash"] = 92)] = "backslash";
	CharacterCodes2[(CharacterCodes2["closeBrace"] = 125)] = "closeBrace";
	CharacterCodes2[(CharacterCodes2["closeBracket"] = 93)] = "closeBracket";
	CharacterCodes2[(CharacterCodes2["colon"] = 58)] = "colon";
	CharacterCodes2[(CharacterCodes2["comma"] = 44)] = "comma";
	CharacterCodes2[(CharacterCodes2["dot"] = 46)] = "dot";
	CharacterCodes2[(CharacterCodes2["doubleQuote"] = 34)] = "doubleQuote";
	CharacterCodes2[(CharacterCodes2["minus"] = 45)] = "minus";
	CharacterCodes2[(CharacterCodes2["openBrace"] = 123)] = "openBrace";
	CharacterCodes2[(CharacterCodes2["openBracket"] = 91)] = "openBracket";
	CharacterCodes2[(CharacterCodes2["plus"] = 43)] = "plus";
	CharacterCodes2[(CharacterCodes2["slash"] = 47)] = "slash";
	CharacterCodes2[(CharacterCodes2["formFeed"] = 12)] = "formFeed";
	CharacterCodes2[(CharacterCodes2["tab"] = 9)] = "tab";
})(CharacterCodes || (CharacterCodes = {}));

// ../../../node_modules/.pnpm/jsonc-parser@3.3.1/node_modules/jsonc-parser/lib/esm/impl/string-intern.js
init_cjs_shims();
var cachedSpaces = new Array(20).fill(0).map((_, index) => {
	return " ".repeat(index);
});
var maxCachedValues = 200;
var cachedBreakLinesWithSpaces = {
	" ": {
		"\n": new Array(maxCachedValues).fill(0).map((_, index) => {
			return "\n" + " ".repeat(index);
		}),
		"\r": new Array(maxCachedValues).fill(0).map((_, index) => {
			return "\r" + " ".repeat(index);
		}),
		"\r\n": new Array(maxCachedValues).fill(0).map((_, index) => {
			return "\r\n" + " ".repeat(index);
		}),
	},
	"	": {
		"\n": new Array(maxCachedValues).fill(0).map((_, index) => {
			return "\n" + "	".repeat(index);
		}),
		"\r": new Array(maxCachedValues).fill(0).map((_, index) => {
			return "\r" + "	".repeat(index);
		}),
		"\r\n": new Array(maxCachedValues).fill(0).map((_, index) => {
			return "\r\n" + "	".repeat(index);
		}),
	},
};
var supportedEols = ["\n", "\r", "\r\n"];

// ../../../node_modules/.pnpm/jsonc-parser@3.3.1/node_modules/jsonc-parser/lib/esm/impl/format.js
function format(documentText, range, options) {
	let initialIndentLevel;
	let formatText;
	let formatTextStart;
	let rangeStart;
	let rangeEnd;
	if (range) {
		rangeStart = range.offset;
		rangeEnd = rangeStart + range.length;
		formatTextStart = rangeStart;
		while (formatTextStart > 0 && !isEOL2(documentText, formatTextStart - 1)) {
			formatTextStart--;
		}
		let endOffset = rangeEnd;
		while (endOffset < documentText.length && !isEOL2(documentText, endOffset)) {
			endOffset++;
		}
		formatText = documentText.substring(formatTextStart, endOffset);
		initialIndentLevel = computeIndentLevel(formatText, options);
	} else {
		formatText = documentText;
		initialIndentLevel = 0;
		formatTextStart = 0;
		rangeStart = 0;
		rangeEnd = documentText.length;
	}
	const eol = getEOL(options, documentText);
	const eolFastPathSupported = supportedEols.includes(eol);
	let numberLineBreaks = 0;
	let indentLevel = 0;
	let indentValue;
	if (options.insertSpaces) {
		indentValue = cachedSpaces[options.tabSize || 4] ?? repeat(cachedSpaces[1], options.tabSize || 4);
	} else {
		indentValue = "	";
	}
	const indentType = indentValue === "	" ? "	" : " ";
	let scanner = createScanner(formatText, false);
	let hasError = false;
	function newLinesAndIndent() {
		if (numberLineBreaks > 1) {
			return repeat(eol, numberLineBreaks) + repeat(indentValue, initialIndentLevel + indentLevel);
		}
		const amountOfSpaces = indentValue.length * (initialIndentLevel + indentLevel);
		if (!eolFastPathSupported || amountOfSpaces > cachedBreakLinesWithSpaces[indentType][eol].length) {
			return eol + repeat(indentValue, initialIndentLevel + indentLevel);
		}
		if (amountOfSpaces <= 0) {
			return eol;
		}
		return cachedBreakLinesWithSpaces[indentType][eol][amountOfSpaces];
	}
	__name(newLinesAndIndent, "newLinesAndIndent");
	function scanNext() {
		let token = scanner.scan();
		numberLineBreaks = 0;
		while (token === 15 || token === 14) {
			if (token === 14 && options.keepLines) {
				numberLineBreaks += 1;
			} else if (token === 14) {
				numberLineBreaks = 1;
			}
			token = scanner.scan();
		}
		hasError = token === 16 || scanner.getTokenError() !== 0;
		return token;
	}
	__name(scanNext, "scanNext");
	const editOperations = [];
	function addEdit(text, startOffset, endOffset) {
		if (
			!hasError &&
			(!range || (startOffset < rangeEnd && endOffset > rangeStart)) &&
			documentText.substring(startOffset, endOffset) !== text
		) {
			editOperations.push({
				offset: startOffset,
				length: endOffset - startOffset,
				content: text,
			});
		}
	}
	__name(addEdit, "addEdit");
	let firstToken = scanNext();
	if (options.keepLines && numberLineBreaks > 0) {
		addEdit(repeat(eol, numberLineBreaks), 0, 0);
	}
	if (firstToken !== 17) {
		let firstTokenStart = scanner.getTokenOffset() + formatTextStart;
		let initialIndent =
			indentValue.length * initialIndentLevel < 20 && options.insertSpaces
				? cachedSpaces[indentValue.length * initialIndentLevel]
				: repeat(indentValue, initialIndentLevel);
		addEdit(initialIndent, formatTextStart, firstTokenStart);
	}
	while (firstToken !== 17) {
		let firstTokenEnd = scanner.getTokenOffset() + scanner.getTokenLength() + formatTextStart;
		let secondToken = scanNext();
		let replaceContent = "";
		let needsLineBreak = false;
		while (numberLineBreaks === 0 && (secondToken === 12 || secondToken === 13)) {
			let commentTokenStart = scanner.getTokenOffset() + formatTextStart;
			addEdit(cachedSpaces[1], firstTokenEnd, commentTokenStart);
			firstTokenEnd = scanner.getTokenOffset() + scanner.getTokenLength() + formatTextStart;
			needsLineBreak = secondToken === 12;
			replaceContent = needsLineBreak ? newLinesAndIndent() : "";
			secondToken = scanNext();
		}
		if (secondToken === 2) {
			if (firstToken !== 1) {
				indentLevel--;
			}
			if ((options.keepLines && numberLineBreaks > 0) || (!options.keepLines && firstToken !== 1)) {
				replaceContent = newLinesAndIndent();
			} else if (options.keepLines) {
				replaceContent = cachedSpaces[1];
			}
		} else if (secondToken === 4) {
			if (firstToken !== 3) {
				indentLevel--;
			}
			if ((options.keepLines && numberLineBreaks > 0) || (!options.keepLines && firstToken !== 3)) {
				replaceContent = newLinesAndIndent();
			} else if (options.keepLines) {
				replaceContent = cachedSpaces[1];
			}
		} else {
			switch (firstToken) {
				case 3:
				case 1:
					indentLevel++;
					if ((options.keepLines && numberLineBreaks > 0) || !options.keepLines) {
						replaceContent = newLinesAndIndent();
					} else {
						replaceContent = cachedSpaces[1];
					}
					break;
				case 5:
					if ((options.keepLines && numberLineBreaks > 0) || !options.keepLines) {
						replaceContent = newLinesAndIndent();
					} else {
						replaceContent = cachedSpaces[1];
					}
					break;
				case 12:
					replaceContent = newLinesAndIndent();
					break;
				case 13:
					if (numberLineBreaks > 0) {
						replaceContent = newLinesAndIndent();
					} else if (!needsLineBreak) {
						replaceContent = cachedSpaces[1];
					}
					break;
				case 6:
					if (options.keepLines && numberLineBreaks > 0) {
						replaceContent = newLinesAndIndent();
					} else if (!needsLineBreak) {
						replaceContent = cachedSpaces[1];
					}
					break;
				case 10:
					if (options.keepLines && numberLineBreaks > 0) {
						replaceContent = newLinesAndIndent();
					} else if (secondToken === 6 && !needsLineBreak) {
						replaceContent = "";
					}
					break;
				case 7:
				case 8:
				case 9:
				case 11:
				case 2:
				case 4:
					if (options.keepLines && numberLineBreaks > 0) {
						replaceContent = newLinesAndIndent();
					} else {
						if ((secondToken === 12 || secondToken === 13) && !needsLineBreak) {
							replaceContent = cachedSpaces[1];
						} else if (secondToken !== 5 && secondToken !== 17) {
							hasError = true;
						}
					}
					break;
				case 16:
					hasError = true;
					break;
			}
			if (numberLineBreaks > 0 && (secondToken === 12 || secondToken === 13)) {
				replaceContent = newLinesAndIndent();
			}
		}
		if (secondToken === 17) {
			if (options.keepLines && numberLineBreaks > 0) {
				replaceContent = newLinesAndIndent();
			} else {
				replaceContent = options.insertFinalNewline ? eol : "";
			}
		}
		const secondTokenStart = scanner.getTokenOffset() + formatTextStart;
		addEdit(replaceContent, firstTokenEnd, secondTokenStart);
		firstToken = secondToken;
	}
	return editOperations;
}
__name(format, "format");
function repeat(s, count) {
	let result = "";
	for (let i = 0; i < count; i++) {
		result += s;
	}
	return result;
}
__name(repeat, "repeat");
function computeIndentLevel(content, options) {
	let i = 0;
	let nChars = 0;
	const tabSize = options.tabSize || 4;
	while (i < content.length) {
		let ch = content.charAt(i);
		if (ch === cachedSpaces[1]) {
			nChars++;
		} else if (ch === "	") {
			nChars += tabSize;
		} else {
			break;
		}
		i++;
	}
	return Math.floor(nChars / tabSize);
}
__name(computeIndentLevel, "computeIndentLevel");
function getEOL(options, text) {
	for (let i = 0; i < text.length; i++) {
		const ch = text.charAt(i);
		if (ch === "\r") {
			if (i + 1 < text.length && text.charAt(i + 1) === "\n") {
				return "\r\n";
			}
			return "\r";
		} else if (ch === "\n") {
			return "\n";
		}
	}
	return (options && options.eol) || "\n";
}
__name(getEOL, "getEOL");
function isEOL2(text, offset) {
	return "\r\n".indexOf(text.charAt(offset)) !== -1;
}
__name(isEOL2, "isEOL");

// ../../../node_modules/.pnpm/jsonc-parser@3.3.1/node_modules/jsonc-parser/lib/esm/impl/edit.js
init_cjs_shims();

// ../../../node_modules/.pnpm/jsonc-parser@3.3.1/node_modules/jsonc-parser/lib/esm/impl/parser.js
init_cjs_shims();
var ParseOptions;
(function (ParseOptions2) {
	ParseOptions2.DEFAULT = {
		allowTrailingComma: false,
	};
})(ParseOptions || (ParseOptions = {}));
function parse(text, errors = [], options = ParseOptions.DEFAULT) {
	let currentProperty = null;
	let currentParent = [];
	const previousParents = [];
	function onValue(value) {
		if (Array.isArray(currentParent)) {
			currentParent.push(value);
		} else if (currentProperty !== null) {
			currentParent[currentProperty] = value;
		}
	}
	__name(onValue, "onValue");
	const visitor = {
		onObjectBegin: /* @__PURE__ */ __name(() => {
			const object = {};
			onValue(object);
			previousParents.push(currentParent);
			currentParent = object;
			currentProperty = null;
		}, "onObjectBegin"),
		onObjectProperty: /* @__PURE__ */ __name((name) => {
			currentProperty = name;
		}, "onObjectProperty"),
		onObjectEnd: /* @__PURE__ */ __name(() => {
			currentParent = previousParents.pop();
		}, "onObjectEnd"),
		onArrayBegin: /* @__PURE__ */ __name(() => {
			const array = [];
			onValue(array);
			previousParents.push(currentParent);
			currentParent = array;
			currentProperty = null;
		}, "onArrayBegin"),
		onArrayEnd: /* @__PURE__ */ __name(() => {
			currentParent = previousParents.pop();
		}, "onArrayEnd"),
		onLiteralValue: onValue,
		onError: /* @__PURE__ */ __name((error, offset, length) => {
			errors.push({
				error,
				offset,
				length,
			});
		}, "onError"),
	};
	visit(text, visitor, options);
	return currentParent[0];
}
__name(parse, "parse");
function getNodePath(node) {
	if (!node.parent || !node.parent.children) {
		return [];
	}
	const path = getNodePath(node.parent);
	if (node.parent.type === "property") {
		const key = node.parent.children[0].value;
		path.push(key);
	} else if (node.parent.type === "array") {
		const index = node.parent.children.indexOf(node);
		if (index !== -1) {
			path.push(index);
		}
	}
	return path;
}
__name(getNodePath, "getNodePath");
function getNodeValue(node) {
	switch (node.type) {
		case "array":
			return node.children.map(getNodeValue);
		case "object":
			const obj = /* @__PURE__ */ Object.create(null);
			for (let prop of node.children) {
				const valueNode = prop.children[1];
				if (valueNode) {
					obj[prop.children[0].value] = getNodeValue(valueNode);
				}
			}
			return obj;
		case "null":
		case "string":
		case "number":
		case "boolean":
			return node.value;
		default:
			return void 0;
	}
}
__name(getNodeValue, "getNodeValue");
function contains(node, offset, includeRightBound = false) {
	return (
		(offset >= node.offset && offset < node.offset + node.length) ||
		(includeRightBound && offset === node.offset + node.length)
	);
}
__name(contains, "contains");
function findNodeAtOffset(node, offset, includeRightBound = false) {
	if (contains(node, offset, includeRightBound)) {
		const children = node.children;
		if (Array.isArray(children)) {
			for (let i = 0; i < children.length && children[i].offset <= offset; i++) {
				const item = findNodeAtOffset(children[i], offset, includeRightBound);
				if (item) {
					return item;
				}
			}
		}
		return node;
	}
	return void 0;
}
__name(findNodeAtOffset, "findNodeAtOffset");
function visit(text, visitor, options = ParseOptions.DEFAULT) {
	const _scanner = createScanner(text, false);
	const _jsonPath = [];
	let suppressedCallbacks = 0;
	function toNoArgVisit(visitFunction) {
		return visitFunction
			? () =>
					suppressedCallbacks === 0 &&
					visitFunction(
						_scanner.getTokenOffset(),
						_scanner.getTokenLength(),
						_scanner.getTokenStartLine(),
						_scanner.getTokenStartCharacter(),
					)
			: () => true;
	}
	__name(toNoArgVisit, "toNoArgVisit");
	function toOneArgVisit(visitFunction) {
		return visitFunction
			? (arg) =>
					suppressedCallbacks === 0 &&
					visitFunction(
						arg,
						_scanner.getTokenOffset(),
						_scanner.getTokenLength(),
						_scanner.getTokenStartLine(),
						_scanner.getTokenStartCharacter(),
					)
			: () => true;
	}
	__name(toOneArgVisit, "toOneArgVisit");
	function toOneArgVisitWithPath(visitFunction) {
		return visitFunction
			? (arg) =>
					suppressedCallbacks === 0 &&
					visitFunction(
						arg,
						_scanner.getTokenOffset(),
						_scanner.getTokenLength(),
						_scanner.getTokenStartLine(),
						_scanner.getTokenStartCharacter(),
						() => _jsonPath.slice(),
					)
			: () => true;
	}
	__name(toOneArgVisitWithPath, "toOneArgVisitWithPath");
	function toBeginVisit(visitFunction) {
		return visitFunction
			? () => {
					if (suppressedCallbacks > 0) {
						suppressedCallbacks++;
					} else {
						let cbReturn = visitFunction(
							_scanner.getTokenOffset(),
							_scanner.getTokenLength(),
							_scanner.getTokenStartLine(),
							_scanner.getTokenStartCharacter(),
							() => _jsonPath.slice(),
						);
						if (cbReturn === false) {
							suppressedCallbacks = 1;
						}
					}
				}
			: () => true;
	}
	__name(toBeginVisit, "toBeginVisit");
	function toEndVisit(visitFunction) {
		return visitFunction
			? () => {
					if (suppressedCallbacks > 0) {
						suppressedCallbacks--;
					}
					if (suppressedCallbacks === 0) {
						visitFunction(
							_scanner.getTokenOffset(),
							_scanner.getTokenLength(),
							_scanner.getTokenStartLine(),
							_scanner.getTokenStartCharacter(),
						);
					}
				}
			: () => true;
	}
	__name(toEndVisit, "toEndVisit");
	const onObjectBegin = toBeginVisit(visitor.onObjectBegin),
		onObjectProperty = toOneArgVisitWithPath(visitor.onObjectProperty),
		onObjectEnd = toEndVisit(visitor.onObjectEnd),
		onArrayBegin = toBeginVisit(visitor.onArrayBegin),
		onArrayEnd = toEndVisit(visitor.onArrayEnd),
		onLiteralValue = toOneArgVisitWithPath(visitor.onLiteralValue),
		onSeparator = toOneArgVisit(visitor.onSeparator),
		onComment = toNoArgVisit(visitor.onComment),
		onError = toOneArgVisit(visitor.onError);
	const disallowComments = options && options.disallowComments;
	const allowTrailingComma = options && options.allowTrailingComma;
	function scanNext() {
		while (true) {
			const token = _scanner.scan();
			switch (_scanner.getTokenError()) {
				case 4:
					handleError(
						14,
						/* ParseErrorCode.InvalidUnicode */
					);
					break;
				case 5:
					handleError(
						15,
						/* ParseErrorCode.InvalidEscapeCharacter */
					);
					break;
				case 3:
					handleError(
						13,
						/* ParseErrorCode.UnexpectedEndOfNumber */
					);
					break;
				case 1:
					if (!disallowComments) {
						handleError(
							11,
							/* ParseErrorCode.UnexpectedEndOfComment */
						);
					}
					break;
				case 2:
					handleError(
						12,
						/* ParseErrorCode.UnexpectedEndOfString */
					);
					break;
				case 6:
					handleError(
						16,
						/* ParseErrorCode.InvalidCharacter */
					);
					break;
			}
			switch (token) {
				case 12:
				case 13:
					if (disallowComments) {
						handleError(
							10,
							/* ParseErrorCode.InvalidCommentToken */
						);
					} else {
						onComment();
					}
					break;
				case 16:
					handleError(
						1,
						/* ParseErrorCode.InvalidSymbol */
					);
					break;
				case 15:
				case 14:
					break;
				default:
					return token;
			}
		}
	}
	__name(scanNext, "scanNext");
	function handleError(error, skipUntilAfter = [], skipUntil = []) {
		onError(error);
		if (skipUntilAfter.length + skipUntil.length > 0) {
			let token = _scanner.getToken();
			while (token !== 17) {
				if (skipUntilAfter.indexOf(token) !== -1) {
					scanNext();
					break;
				} else if (skipUntil.indexOf(token) !== -1) {
					break;
				}
				token = scanNext();
			}
		}
	}
	__name(handleError, "handleError");
	function parseString(isValue) {
		const value = _scanner.getTokenValue();
		if (isValue) {
			onLiteralValue(value);
		} else {
			onObjectProperty(value);
			_jsonPath.push(value);
		}
		scanNext();
		return true;
	}
	__name(parseString, "parseString");
	function parseLiteral() {
		switch (_scanner.getToken()) {
			case 11:
				const tokenValue = _scanner.getTokenValue();
				let value = Number(tokenValue);
				if (isNaN(value)) {
					handleError(
						2,
						/* ParseErrorCode.InvalidNumberFormat */
					);
					value = 0;
				}
				onLiteralValue(value);
				break;
			case 7:
				onLiteralValue(null);
				break;
			case 8:
				onLiteralValue(true);
				break;
			case 9:
				onLiteralValue(false);
				break;
			default:
				return false;
		}
		scanNext();
		return true;
	}
	__name(parseLiteral, "parseLiteral");
	function parseProperty() {
		if (_scanner.getToken() !== 10) {
			handleError(
				3,
				[],
				[
					2,
					5,
					/* SyntaxKind.CommaToken */
				],
			);
			return false;
		}
		parseString(false);
		if (_scanner.getToken() === 6) {
			onSeparator(":");
			scanNext();
			if (!parseValue()) {
				handleError(
					4,
					[],
					[
						2,
						5,
						/* SyntaxKind.CommaToken */
					],
				);
			}
		} else {
			handleError(
				5,
				[],
				[
					2,
					5,
					/* SyntaxKind.CommaToken */
				],
			);
		}
		_jsonPath.pop();
		return true;
	}
	__name(parseProperty, "parseProperty");
	function parseObject() {
		onObjectBegin();
		scanNext();
		let needsComma = false;
		while (_scanner.getToken() !== 2 && _scanner.getToken() !== 17) {
			if (_scanner.getToken() === 5) {
				if (!needsComma) {
					handleError(4, [], []);
				}
				onSeparator(",");
				scanNext();
				if (_scanner.getToken() === 2 && allowTrailingComma) {
					break;
				}
			} else if (needsComma) {
				handleError(6, [], []);
			}
			if (!parseProperty()) {
				handleError(
					4,
					[],
					[
						2,
						5,
						/* SyntaxKind.CommaToken */
					],
				);
			}
			needsComma = true;
		}
		onObjectEnd();
		if (_scanner.getToken() !== 2) {
			handleError(
				7,
				[
					2,
					/* SyntaxKind.CloseBraceToken */
				],
				[],
			);
		} else {
			scanNext();
		}
		return true;
	}
	__name(parseObject, "parseObject");
	function parseArray() {
		onArrayBegin();
		scanNext();
		let isFirstElement = true;
		let needsComma = false;
		while (_scanner.getToken() !== 4 && _scanner.getToken() !== 17) {
			if (_scanner.getToken() === 5) {
				if (!needsComma) {
					handleError(4, [], []);
				}
				onSeparator(",");
				scanNext();
				if (_scanner.getToken() === 4 && allowTrailingComma) {
					break;
				}
			} else if (needsComma) {
				handleError(6, [], []);
			}
			if (isFirstElement) {
				_jsonPath.push(0);
				isFirstElement = false;
			} else {
				_jsonPath[_jsonPath.length - 1]++;
			}
			if (!parseValue()) {
				handleError(
					4,
					[],
					[
						4,
						5,
						/* SyntaxKind.CommaToken */
					],
				);
			}
			needsComma = true;
		}
		onArrayEnd();
		if (!isFirstElement) {
			_jsonPath.pop();
		}
		if (_scanner.getToken() !== 4) {
			handleError(
				8,
				[
					4,
					/* SyntaxKind.CloseBracketToken */
				],
				[],
			);
		} else {
			scanNext();
		}
		return true;
	}
	__name(parseArray, "parseArray");
	function parseValue() {
		switch (_scanner.getToken()) {
			case 3:
				return parseArray();
			case 1:
				return parseObject();
			case 10:
				return parseString(true);
			default:
				return parseLiteral();
		}
	}
	__name(parseValue, "parseValue");
	scanNext();
	if (_scanner.getToken() === 17) {
		if (options.allowEmptyContent) {
			return true;
		}
		handleError(4, [], []);
		return false;
	}
	if (!parseValue()) {
		handleError(4, [], []);
		return false;
	}
	if (_scanner.getToken() !== 17) {
		handleError(9, [], []);
	}
	return true;
}
__name(visit, "visit");

// ../../../node_modules/.pnpm/jsonc-parser@3.3.1/node_modules/jsonc-parser/lib/esm/main.js
var createScanner2 = createScanner;
var ScanError;
(function (ScanError2) {
	ScanError2[(ScanError2["None"] = 0)] = "None";
	ScanError2[(ScanError2["UnexpectedEndOfComment"] = 1)] = "UnexpectedEndOfComment";
	ScanError2[(ScanError2["UnexpectedEndOfString"] = 2)] = "UnexpectedEndOfString";
	ScanError2[(ScanError2["UnexpectedEndOfNumber"] = 3)] = "UnexpectedEndOfNumber";
	ScanError2[(ScanError2["InvalidUnicode"] = 4)] = "InvalidUnicode";
	ScanError2[(ScanError2["InvalidEscapeCharacter"] = 5)] = "InvalidEscapeCharacter";
	ScanError2[(ScanError2["InvalidCharacter"] = 6)] = "InvalidCharacter";
})(ScanError || (ScanError = {}));
var SyntaxKind;
(function (SyntaxKind2) {
	SyntaxKind2[(SyntaxKind2["OpenBraceToken"] = 1)] = "OpenBraceToken";
	SyntaxKind2[(SyntaxKind2["CloseBraceToken"] = 2)] = "CloseBraceToken";
	SyntaxKind2[(SyntaxKind2["OpenBracketToken"] = 3)] = "OpenBracketToken";
	SyntaxKind2[(SyntaxKind2["CloseBracketToken"] = 4)] = "CloseBracketToken";
	SyntaxKind2[(SyntaxKind2["CommaToken"] = 5)] = "CommaToken";
	SyntaxKind2[(SyntaxKind2["ColonToken"] = 6)] = "ColonToken";
	SyntaxKind2[(SyntaxKind2["NullKeyword"] = 7)] = "NullKeyword";
	SyntaxKind2[(SyntaxKind2["TrueKeyword"] = 8)] = "TrueKeyword";
	SyntaxKind2[(SyntaxKind2["FalseKeyword"] = 9)] = "FalseKeyword";
	SyntaxKind2[(SyntaxKind2["StringLiteral"] = 10)] = "StringLiteral";
	SyntaxKind2[(SyntaxKind2["NumericLiteral"] = 11)] = "NumericLiteral";
	SyntaxKind2[(SyntaxKind2["LineCommentTrivia"] = 12)] = "LineCommentTrivia";
	SyntaxKind2[(SyntaxKind2["BlockCommentTrivia"] = 13)] = "BlockCommentTrivia";
	SyntaxKind2[(SyntaxKind2["LineBreakTrivia"] = 14)] = "LineBreakTrivia";
	SyntaxKind2[(SyntaxKind2["Trivia"] = 15)] = "Trivia";
	SyntaxKind2[(SyntaxKind2["Unknown"] = 16)] = "Unknown";
	SyntaxKind2[(SyntaxKind2["EOF"] = 17)] = "EOF";
})(SyntaxKind || (SyntaxKind = {}));
var parse2 = parse;
var findNodeAtOffset2 = findNodeAtOffset;
var getNodePath2 = getNodePath;
var getNodeValue2 = getNodeValue;
var ParseErrorCode;
(function (ParseErrorCode2) {
	ParseErrorCode2[(ParseErrorCode2["InvalidSymbol"] = 1)] = "InvalidSymbol";
	ParseErrorCode2[(ParseErrorCode2["InvalidNumberFormat"] = 2)] = "InvalidNumberFormat";
	ParseErrorCode2[(ParseErrorCode2["PropertyNameExpected"] = 3)] = "PropertyNameExpected";
	ParseErrorCode2[(ParseErrorCode2["ValueExpected"] = 4)] = "ValueExpected";
	ParseErrorCode2[(ParseErrorCode2["ColonExpected"] = 5)] = "ColonExpected";
	ParseErrorCode2[(ParseErrorCode2["CommaExpected"] = 6)] = "CommaExpected";
	ParseErrorCode2[(ParseErrorCode2["CloseBraceExpected"] = 7)] = "CloseBraceExpected";
	ParseErrorCode2[(ParseErrorCode2["CloseBracketExpected"] = 8)] = "CloseBracketExpected";
	ParseErrorCode2[(ParseErrorCode2["EndOfFileExpected"] = 9)] = "EndOfFileExpected";
	ParseErrorCode2[(ParseErrorCode2["InvalidCommentToken"] = 10)] = "InvalidCommentToken";
	ParseErrorCode2[(ParseErrorCode2["UnexpectedEndOfComment"] = 11)] = "UnexpectedEndOfComment";
	ParseErrorCode2[(ParseErrorCode2["UnexpectedEndOfString"] = 12)] = "UnexpectedEndOfString";
	ParseErrorCode2[(ParseErrorCode2["UnexpectedEndOfNumber"] = 13)] = "UnexpectedEndOfNumber";
	ParseErrorCode2[(ParseErrorCode2["InvalidUnicode"] = 14)] = "InvalidUnicode";
	ParseErrorCode2[(ParseErrorCode2["InvalidEscapeCharacter"] = 15)] = "InvalidEscapeCharacter";
	ParseErrorCode2[(ParseErrorCode2["InvalidCharacter"] = 16)] = "InvalidCharacter";
})(ParseErrorCode || (ParseErrorCode = {}));
function format2(documentText, range, options) {
	return format(documentText, range, options);
}
__name(format2, "format");

// ../../../node_modules/.pnpm/vscode-json-languageservice@5.6.3/node_modules/vscode-json-languageservice/lib/esm/utils/objects.js
init_cjs_shims();
function equals(one, other) {
	if (one === other) {
		return true;
	}
	if (one === null || one === void 0 || other === null || other === void 0) {
		return false;
	}
	if (typeof one !== typeof other) {
		return false;
	}
	if (typeof one !== "object") {
		return false;
	}
	if (Array.isArray(one) !== Array.isArray(other)) {
		return false;
	}
	let i, key;
	if (Array.isArray(one)) {
		if (one.length !== other.length) {
			return false;
		}
		for (i = 0; i < one.length; i++) {
			if (!equals(one[i], other[i])) {
				return false;
			}
		}
	} else {
		const oneKeys = [];
		for (key in one) {
			oneKeys.push(key);
		}
		oneKeys.sort();
		const otherKeys = [];
		for (key in other) {
			otherKeys.push(key);
		}
		otherKeys.sort();
		if (!equals(oneKeys, otherKeys)) {
			return false;
		}
		for (i = 0; i < oneKeys.length; i++) {
			if (!equals(one[oneKeys[i]], other[oneKeys[i]])) {
				return false;
			}
		}
	}
	return true;
}
__name(equals, "equals");
function isNumber(val) {
	return typeof val === "number";
}
__name(isNumber, "isNumber");
function isDefined(val) {
	return typeof val !== "undefined";
}
__name(isDefined, "isDefined");
function isBoolean(val) {
	return typeof val === "boolean";
}
__name(isBoolean, "isBoolean");
function isString(val) {
	return typeof val === "string";
}
__name(isString, "isString");
function isObject(val) {
	return typeof val === "object" && val !== null && !Array.isArray(val);
}
__name(isObject, "isObject");

// ../../../node_modules/.pnpm/vscode-json-languageservice@5.6.3/node_modules/vscode-json-languageservice/lib/esm/utils/strings.js
init_cjs_shims();
function startsWith(haystack, needle) {
	if (haystack.length < needle.length) {
		return false;
	}
	for (let i = 0; i < needle.length; i++) {
		if (haystack[i] !== needle[i]) {
			return false;
		}
	}
	return true;
}
__name(startsWith, "startsWith");
function endsWith(haystack, needle) {
	const diff = haystack.length - needle.length;
	if (diff > 0) {
		return haystack.lastIndexOf(needle) === diff;
	} else if (diff === 0) {
		return haystack === needle;
	} else {
		return false;
	}
}
__name(endsWith, "endsWith");
function extendedRegExp(pattern) {
	let flags = "";
	if (startsWith(pattern, "(?i)")) {
		pattern = pattern.substring(4);
		flags = "i";
	}
	try {
		return new RegExp(pattern, flags + "u");
	} catch (e) {
		try {
			return new RegExp(pattern, flags);
		} catch (e2) {
			return void 0;
		}
	}
}
__name(extendedRegExp, "extendedRegExp");
function stringLength(str) {
	let count = 0;
	for (let i = 0; i < str.length; i++) {
		count++;
		const code = str.charCodeAt(i);
		if (55296 <= code && code <= 56319) {
			i++;
		}
	}
	return count;
}
__name(stringLength, "stringLength");

// ../../../node_modules/.pnpm/vscode-json-languageservice@5.6.3/node_modules/vscode-json-languageservice/lib/esm/jsonLanguageTypes.js
init_cjs_shims();

// ../../../node_modules/.pnpm/vscode-languageserver-types@3.17.5/node_modules/vscode-languageserver-types/lib/esm/main.js
init_cjs_shims();
var DocumentUri;
(function (DocumentUri2) {
	function is(value) {
		return typeof value === "string";
	}
	__name(is, "is");
	DocumentUri2.is = is;
})(DocumentUri || (DocumentUri = {}));
var URI;
(function (URI3) {
	function is(value) {
		return typeof value === "string";
	}
	__name(is, "is");
	URI3.is = is;
})(URI || (URI = {}));
var integer;
(function (integer2) {
	integer2.MIN_VALUE = -2147483648;
	integer2.MAX_VALUE = 2147483647;
	function is(value) {
		return typeof value === "number" && integer2.MIN_VALUE <= value && value <= integer2.MAX_VALUE;
	}
	__name(is, "is");
	integer2.is = is;
})(integer || (integer = {}));
var uinteger;
(function (uinteger2) {
	uinteger2.MIN_VALUE = 0;
	uinteger2.MAX_VALUE = 2147483647;
	function is(value) {
		return typeof value === "number" && uinteger2.MIN_VALUE <= value && value <= uinteger2.MAX_VALUE;
	}
	__name(is, "is");
	uinteger2.is = is;
})(uinteger || (uinteger = {}));
var Position2;
(function (Position9) {
	function create(line, character) {
		if (line === Number.MAX_VALUE) {
			line = uinteger.MAX_VALUE;
		}
		if (character === Number.MAX_VALUE) {
			character = uinteger.MAX_VALUE;
		}
		return {
			line,
			character,
		};
	}
	__name(create, "create");
	Position9.create = create;
	function is(value) {
		let candidate = value;
		return Is.objectLiteral(candidate) && Is.uinteger(candidate.line) && Is.uinteger(candidate.character);
	}
	__name(is, "is");
	Position9.is = is;
})(Position2 || (Position2 = {}));
var Range2;
(function (Range6) {
	function create(one, two, three, four) {
		if (Is.uinteger(one) && Is.uinteger(two) && Is.uinteger(three) && Is.uinteger(four)) {
			return {
				start: Position2.create(one, two),
				end: Position2.create(three, four),
			};
		} else if (Position2.is(one) && Position2.is(two)) {
			return {
				start: one,
				end: two,
			};
		} else {
			throw new Error(`Range#create called with invalid arguments[${one}, ${two}, ${three}, ${four}]`);
		}
	}
	__name(create, "create");
	Range6.create = create;
	function is(value) {
		let candidate = value;
		return Is.objectLiteral(candidate) && Position2.is(candidate.start) && Position2.is(candidate.end);
	}
	__name(is, "is");
	Range6.is = is;
})(Range2 || (Range2 = {}));
var Location;
(function (Location5) {
	function create(uri, range) {
		return {
			uri,
			range,
		};
	}
	__name(create, "create");
	Location5.create = create;
	function is(value) {
		let candidate = value;
		return (
			Is.objectLiteral(candidate) &&
			Range2.is(candidate.range) &&
			(Is.string(candidate.uri) || Is.undefined(candidate.uri))
		);
	}
	__name(is, "is");
	Location5.is = is;
})(Location || (Location = {}));
var LocationLink;
(function (LocationLink2) {
	function create(targetUri, targetRange, targetSelectionRange, originSelectionRange) {
		return {
			targetUri,
			targetRange,
			targetSelectionRange,
			originSelectionRange,
		};
	}
	__name(create, "create");
	LocationLink2.create = create;
	function is(value) {
		let candidate = value;
		return (
			Is.objectLiteral(candidate) &&
			Range2.is(candidate.targetRange) &&
			Is.string(candidate.targetUri) &&
			Range2.is(candidate.targetSelectionRange) &&
			(Range2.is(candidate.originSelectionRange) || Is.undefined(candidate.originSelectionRange))
		);
	}
	__name(is, "is");
	LocationLink2.is = is;
})(LocationLink || (LocationLink = {}));
var Color;
(function (Color2) {
	function create(red, green, blue, alpha) {
		return {
			red,
			green,
			blue,
			alpha,
		};
	}
	__name(create, "create");
	Color2.create = create;
	function is(value) {
		const candidate = value;
		return (
			Is.objectLiteral(candidate) &&
			Is.numberRange(candidate.red, 0, 1) &&
			Is.numberRange(candidate.green, 0, 1) &&
			Is.numberRange(candidate.blue, 0, 1) &&
			Is.numberRange(candidate.alpha, 0, 1)
		);
	}
	__name(is, "is");
	Color2.is = is;
})(Color || (Color = {}));
var ColorInformation;
(function (ColorInformation2) {
	function create(range, color) {
		return {
			range,
			color,
		};
	}
	__name(create, "create");
	ColorInformation2.create = create;
	function is(value) {
		const candidate = value;
		return Is.objectLiteral(candidate) && Range2.is(candidate.range) && Color.is(candidate.color);
	}
	__name(is, "is");
	ColorInformation2.is = is;
})(ColorInformation || (ColorInformation = {}));
var ColorPresentation;
(function (ColorPresentation2) {
	function create(label, textEdit, additionalTextEdits) {
		return {
			label,
			textEdit,
			additionalTextEdits,
		};
	}
	__name(create, "create");
	ColorPresentation2.create = create;
	function is(value) {
		const candidate = value;
		return (
			Is.objectLiteral(candidate) &&
			Is.string(candidate.label) &&
			(Is.undefined(candidate.textEdit) || TextEdit.is(candidate)) &&
			(Is.undefined(candidate.additionalTextEdits) || Is.typedArray(candidate.additionalTextEdits, TextEdit.is))
		);
	}
	__name(is, "is");
	ColorPresentation2.is = is;
})(ColorPresentation || (ColorPresentation = {}));
var FoldingRangeKind;
(function (FoldingRangeKind2) {
	FoldingRangeKind2.Comment = "comment";
	FoldingRangeKind2.Imports = "imports";
	FoldingRangeKind2.Region = "region";
})(FoldingRangeKind || (FoldingRangeKind = {}));
var FoldingRange;
(function (FoldingRange2) {
	function create(startLine, endLine, startCharacter, endCharacter, kind, collapsedText) {
		const result = {
			startLine,
			endLine,
		};
		if (Is.defined(startCharacter)) {
			result.startCharacter = startCharacter;
		}
		if (Is.defined(endCharacter)) {
			result.endCharacter = endCharacter;
		}
		if (Is.defined(kind)) {
			result.kind = kind;
		}
		if (Is.defined(collapsedText)) {
			result.collapsedText = collapsedText;
		}
		return result;
	}
	__name(create, "create");
	FoldingRange2.create = create;
	function is(value) {
		const candidate = value;
		return (
			Is.objectLiteral(candidate) &&
			Is.uinteger(candidate.startLine) &&
			Is.uinteger(candidate.startLine) &&
			(Is.undefined(candidate.startCharacter) || Is.uinteger(candidate.startCharacter)) &&
			(Is.undefined(candidate.endCharacter) || Is.uinteger(candidate.endCharacter)) &&
			(Is.undefined(candidate.kind) || Is.string(candidate.kind))
		);
	}
	__name(is, "is");
	FoldingRange2.is = is;
})(FoldingRange || (FoldingRange = {}));
var DiagnosticRelatedInformation;
(function (DiagnosticRelatedInformation2) {
	function create(location, message) {
		return {
			location,
			message,
		};
	}
	__name(create, "create");
	DiagnosticRelatedInformation2.create = create;
	function is(value) {
		let candidate = value;
		return Is.defined(candidate) && Location.is(candidate.location) && Is.string(candidate.message);
	}
	__name(is, "is");
	DiagnosticRelatedInformation2.is = is;
})(DiagnosticRelatedInformation || (DiagnosticRelatedInformation = {}));
var DiagnosticSeverity2;
(function (DiagnosticSeverity4) {
	DiagnosticSeverity4.Error = 1;
	DiagnosticSeverity4.Warning = 2;
	DiagnosticSeverity4.Information = 3;
	DiagnosticSeverity4.Hint = 4;
})(DiagnosticSeverity2 || (DiagnosticSeverity2 = {}));
var DiagnosticTag;
(function (DiagnosticTag2) {
	DiagnosticTag2.Unnecessary = 1;
	DiagnosticTag2.Deprecated = 2;
})(DiagnosticTag || (DiagnosticTag = {}));
var CodeDescription;
(function (CodeDescription2) {
	function is(value) {
		const candidate = value;
		return Is.objectLiteral(candidate) && Is.string(candidate.href);
	}
	__name(is, "is");
	CodeDescription2.is = is;
})(CodeDescription || (CodeDescription = {}));
var Diagnostic;
(function (Diagnostic2) {
	function create(range, message, severity, code, source, relatedInformation) {
		let result = {
			range,
			message,
		};
		if (Is.defined(severity)) {
			result.severity = severity;
		}
		if (Is.defined(code)) {
			result.code = code;
		}
		if (Is.defined(source)) {
			result.source = source;
		}
		if (Is.defined(relatedInformation)) {
			result.relatedInformation = relatedInformation;
		}
		return result;
	}
	__name(create, "create");
	Diagnostic2.create = create;
	function is(value) {
		var _a;
		let candidate = value;
		return (
			Is.defined(candidate) &&
			Range2.is(candidate.range) &&
			Is.string(candidate.message) &&
			(Is.number(candidate.severity) || Is.undefined(candidate.severity)) &&
			(Is.integer(candidate.code) || Is.string(candidate.code) || Is.undefined(candidate.code)) &&
			(Is.undefined(candidate.codeDescription) ||
				Is.string((_a = candidate.codeDescription) === null || _a === void 0 ? void 0 : _a.href)) &&
			(Is.string(candidate.source) || Is.undefined(candidate.source)) &&
			(Is.undefined(candidate.relatedInformation) ||
				Is.typedArray(candidate.relatedInformation, DiagnosticRelatedInformation.is))
		);
	}
	__name(is, "is");
	Diagnostic2.is = is;
})(Diagnostic || (Diagnostic = {}));
var Command;
(function (Command2) {
	function create(title, command, ...args) {
		let result = {
			title,
			command,
		};
		if (Is.defined(args) && args.length > 0) {
			result.arguments = args;
		}
		return result;
	}
	__name(create, "create");
	Command2.create = create;
	function is(value) {
		let candidate = value;
		return Is.defined(candidate) && Is.string(candidate.title) && Is.string(candidate.command);
	}
	__name(is, "is");
	Command2.is = is;
})(Command || (Command = {}));
var TextEdit;
(function (TextEdit5) {
	function replace(range, newText) {
		return {
			range,
			newText,
		};
	}
	__name(replace, "replace");
	TextEdit5.replace = replace;
	function insert(position, newText) {
		return {
			range: {
				start: position,
				end: position,
			},
			newText,
		};
	}
	__name(insert, "insert");
	TextEdit5.insert = insert;
	function del(range) {
		return {
			range,
			newText: "",
		};
	}
	__name(del, "del");
	TextEdit5.del = del;
	function is(value) {
		const candidate = value;
		return Is.objectLiteral(candidate) && Is.string(candidate.newText) && Range2.is(candidate.range);
	}
	__name(is, "is");
	TextEdit5.is = is;
})(TextEdit || (TextEdit = {}));
var ChangeAnnotation;
(function (ChangeAnnotation2) {
	function create(label, needsConfirmation, description) {
		const result = {
			label,
		};
		if (needsConfirmation !== void 0) {
			result.needsConfirmation = needsConfirmation;
		}
		if (description !== void 0) {
			result.description = description;
		}
		return result;
	}
	__name(create, "create");
	ChangeAnnotation2.create = create;
	function is(value) {
		const candidate = value;
		return (
			Is.objectLiteral(candidate) &&
			Is.string(candidate.label) &&
			(Is.boolean(candidate.needsConfirmation) || candidate.needsConfirmation === void 0) &&
			(Is.string(candidate.description) || candidate.description === void 0)
		);
	}
	__name(is, "is");
	ChangeAnnotation2.is = is;
})(ChangeAnnotation || (ChangeAnnotation = {}));
var ChangeAnnotationIdentifier;
(function (ChangeAnnotationIdentifier2) {
	function is(value) {
		const candidate = value;
		return Is.string(candidate);
	}
	__name(is, "is");
	ChangeAnnotationIdentifier2.is = is;
})(ChangeAnnotationIdentifier || (ChangeAnnotationIdentifier = {}));
var AnnotatedTextEdit;
(function (AnnotatedTextEdit2) {
	function replace(range, newText, annotation) {
		return {
			range,
			newText,
			annotationId: annotation,
		};
	}
	__name(replace, "replace");
	AnnotatedTextEdit2.replace = replace;
	function insert(position, newText, annotation) {
		return {
			range: {
				start: position,
				end: position,
			},
			newText,
			annotationId: annotation,
		};
	}
	__name(insert, "insert");
	AnnotatedTextEdit2.insert = insert;
	function del(range, annotation) {
		return {
			range,
			newText: "",
			annotationId: annotation,
		};
	}
	__name(del, "del");
	AnnotatedTextEdit2.del = del;
	function is(value) {
		const candidate = value;
		return (
			TextEdit.is(candidate) &&
			(ChangeAnnotation.is(candidate.annotationId) || ChangeAnnotationIdentifier.is(candidate.annotationId))
		);
	}
	__name(is, "is");
	AnnotatedTextEdit2.is = is;
})(AnnotatedTextEdit || (AnnotatedTextEdit = {}));
var TextDocumentEdit;
(function (TextDocumentEdit2) {
	function create(textDocument, edits) {
		return {
			textDocument,
			edits,
		};
	}
	__name(create, "create");
	TextDocumentEdit2.create = create;
	function is(value) {
		let candidate = value;
		return (
			Is.defined(candidate) &&
			OptionalVersionedTextDocumentIdentifier.is(candidate.textDocument) &&
			Array.isArray(candidate.edits)
		);
	}
	__name(is, "is");
	TextDocumentEdit2.is = is;
})(TextDocumentEdit || (TextDocumentEdit = {}));
var CreateFile;
(function (CreateFile2) {
	function create(uri, options, annotation) {
		let result = {
			kind: "create",
			uri,
		};
		if (options !== void 0 && (options.overwrite !== void 0 || options.ignoreIfExists !== void 0)) {
			result.options = options;
		}
		if (annotation !== void 0) {
			result.annotationId = annotation;
		}
		return result;
	}
	__name(create, "create");
	CreateFile2.create = create;
	function is(value) {
		let candidate = value;
		return (
			candidate &&
			candidate.kind === "create" &&
			Is.string(candidate.uri) &&
			(candidate.options === void 0 ||
				((candidate.options.overwrite === void 0 || Is.boolean(candidate.options.overwrite)) &&
					(candidate.options.ignoreIfExists === void 0 || Is.boolean(candidate.options.ignoreIfExists)))) &&
			(candidate.annotationId === void 0 || ChangeAnnotationIdentifier.is(candidate.annotationId))
		);
	}
	__name(is, "is");
	CreateFile2.is = is;
})(CreateFile || (CreateFile = {}));
var RenameFile;
(function (RenameFile2) {
	function create(oldUri, newUri, options, annotation) {
		let result = {
			kind: "rename",
			oldUri,
			newUri,
		};
		if (options !== void 0 && (options.overwrite !== void 0 || options.ignoreIfExists !== void 0)) {
			result.options = options;
		}
		if (annotation !== void 0) {
			result.annotationId = annotation;
		}
		return result;
	}
	__name(create, "create");
	RenameFile2.create = create;
	function is(value) {
		let candidate = value;
		return (
			candidate &&
			candidate.kind === "rename" &&
			Is.string(candidate.oldUri) &&
			Is.string(candidate.newUri) &&
			(candidate.options === void 0 ||
				((candidate.options.overwrite === void 0 || Is.boolean(candidate.options.overwrite)) &&
					(candidate.options.ignoreIfExists === void 0 || Is.boolean(candidate.options.ignoreIfExists)))) &&
			(candidate.annotationId === void 0 || ChangeAnnotationIdentifier.is(candidate.annotationId))
		);
	}
	__name(is, "is");
	RenameFile2.is = is;
})(RenameFile || (RenameFile = {}));
var DeleteFile;
(function (DeleteFile2) {
	function create(uri, options, annotation) {
		let result = {
			kind: "delete",
			uri,
		};
		if (options !== void 0 && (options.recursive !== void 0 || options.ignoreIfNotExists !== void 0)) {
			result.options = options;
		}
		if (annotation !== void 0) {
			result.annotationId = annotation;
		}
		return result;
	}
	__name(create, "create");
	DeleteFile2.create = create;
	function is(value) {
		let candidate = value;
		return (
			candidate &&
			candidate.kind === "delete" &&
			Is.string(candidate.uri) &&
			(candidate.options === void 0 ||
				((candidate.options.recursive === void 0 || Is.boolean(candidate.options.recursive)) &&
					(candidate.options.ignoreIfNotExists === void 0 || Is.boolean(candidate.options.ignoreIfNotExists)))) &&
			(candidate.annotationId === void 0 || ChangeAnnotationIdentifier.is(candidate.annotationId))
		);
	}
	__name(is, "is");
	DeleteFile2.is = is;
})(DeleteFile || (DeleteFile = {}));
var WorkspaceEdit;
(function (WorkspaceEdit2) {
	function is(value) {
		let candidate = value;
		return (
			candidate &&
			(candidate.changes !== void 0 || candidate.documentChanges !== void 0) &&
			(candidate.documentChanges === void 0 ||
				candidate.documentChanges.every((change) => {
					if (Is.string(change.kind)) {
						return CreateFile.is(change) || RenameFile.is(change) || DeleteFile.is(change);
					} else {
						return TextDocumentEdit.is(change);
					}
				}))
		);
	}
	__name(is, "is");
	WorkspaceEdit2.is = is;
})(WorkspaceEdit || (WorkspaceEdit = {}));
var TextDocumentIdentifier;
(function (TextDocumentIdentifier2) {
	function create(uri) {
		return {
			uri,
		};
	}
	__name(create, "create");
	TextDocumentIdentifier2.create = create;
	function is(value) {
		let candidate = value;
		return Is.defined(candidate) && Is.string(candidate.uri);
	}
	__name(is, "is");
	TextDocumentIdentifier2.is = is;
})(TextDocumentIdentifier || (TextDocumentIdentifier = {}));
var VersionedTextDocumentIdentifier;
(function (VersionedTextDocumentIdentifier2) {
	function create(uri, version) {
		return {
			uri,
			version,
		};
	}
	__name(create, "create");
	VersionedTextDocumentIdentifier2.create = create;
	function is(value) {
		let candidate = value;
		return Is.defined(candidate) && Is.string(candidate.uri) && Is.integer(candidate.version);
	}
	__name(is, "is");
	VersionedTextDocumentIdentifier2.is = is;
})(VersionedTextDocumentIdentifier || (VersionedTextDocumentIdentifier = {}));
var OptionalVersionedTextDocumentIdentifier;
(function (OptionalVersionedTextDocumentIdentifier2) {
	function create(uri, version) {
		return {
			uri,
			version,
		};
	}
	__name(create, "create");
	OptionalVersionedTextDocumentIdentifier2.create = create;
	function is(value) {
		let candidate = value;
		return (
			Is.defined(candidate) && Is.string(candidate.uri) && (candidate.version === null || Is.integer(candidate.version))
		);
	}
	__name(is, "is");
	OptionalVersionedTextDocumentIdentifier2.is = is;
})(OptionalVersionedTextDocumentIdentifier || (OptionalVersionedTextDocumentIdentifier = {}));
var TextDocumentItem;
(function (TextDocumentItem2) {
	function create(uri, languageId, version, text) {
		return {
			uri,
			languageId,
			version,
			text,
		};
	}
	__name(create, "create");
	TextDocumentItem2.create = create;
	function is(value) {
		let candidate = value;
		return (
			Is.defined(candidate) &&
			Is.string(candidate.uri) &&
			Is.string(candidate.languageId) &&
			Is.integer(candidate.version) &&
			Is.string(candidate.text)
		);
	}
	__name(is, "is");
	TextDocumentItem2.is = is;
})(TextDocumentItem || (TextDocumentItem = {}));
var MarkupKind;
(function (MarkupKind2) {
	MarkupKind2.PlainText = "plaintext";
	MarkupKind2.Markdown = "markdown";
	function is(value) {
		const candidate = value;
		return candidate === MarkupKind2.PlainText || candidate === MarkupKind2.Markdown;
	}
	__name(is, "is");
	MarkupKind2.is = is;
})(MarkupKind || (MarkupKind = {}));
var MarkupContent;
(function (MarkupContent2) {
	function is(value) {
		const candidate = value;
		return Is.objectLiteral(value) && MarkupKind.is(candidate.kind) && Is.string(candidate.value);
	}
	__name(is, "is");
	MarkupContent2.is = is;
})(MarkupContent || (MarkupContent = {}));
var CompletionItemKind;
(function (CompletionItemKind3) {
	CompletionItemKind3.Text = 1;
	CompletionItemKind3.Method = 2;
	CompletionItemKind3.Function = 3;
	CompletionItemKind3.Constructor = 4;
	CompletionItemKind3.Field = 5;
	CompletionItemKind3.Variable = 6;
	CompletionItemKind3.Class = 7;
	CompletionItemKind3.Interface = 8;
	CompletionItemKind3.Module = 9;
	CompletionItemKind3.Property = 10;
	CompletionItemKind3.Unit = 11;
	CompletionItemKind3.Value = 12;
	CompletionItemKind3.Enum = 13;
	CompletionItemKind3.Keyword = 14;
	CompletionItemKind3.Snippet = 15;
	CompletionItemKind3.Color = 16;
	CompletionItemKind3.File = 17;
	CompletionItemKind3.Reference = 18;
	CompletionItemKind3.Folder = 19;
	CompletionItemKind3.EnumMember = 20;
	CompletionItemKind3.Constant = 21;
	CompletionItemKind3.Struct = 22;
	CompletionItemKind3.Event = 23;
	CompletionItemKind3.Operator = 24;
	CompletionItemKind3.TypeParameter = 25;
})(CompletionItemKind || (CompletionItemKind = {}));
var InsertTextFormat;
(function (InsertTextFormat3) {
	InsertTextFormat3.PlainText = 1;
	InsertTextFormat3.Snippet = 2;
})(InsertTextFormat || (InsertTextFormat = {}));
var CompletionItemTag;
(function (CompletionItemTag2) {
	CompletionItemTag2.Deprecated = 1;
})(CompletionItemTag || (CompletionItemTag = {}));
var InsertReplaceEdit;
(function (InsertReplaceEdit2) {
	function create(newText, insert, replace) {
		return {
			newText,
			insert,
			replace,
		};
	}
	__name(create, "create");
	InsertReplaceEdit2.create = create;
	function is(value) {
		const candidate = value;
		return candidate && Is.string(candidate.newText) && Range2.is(candidate.insert) && Range2.is(candidate.replace);
	}
	__name(is, "is");
	InsertReplaceEdit2.is = is;
})(InsertReplaceEdit || (InsertReplaceEdit = {}));
var InsertTextMode;
(function (InsertTextMode2) {
	InsertTextMode2.asIs = 1;
	InsertTextMode2.adjustIndentation = 2;
})(InsertTextMode || (InsertTextMode = {}));
var CompletionItemLabelDetails;
(function (CompletionItemLabelDetails2) {
	function is(value) {
		const candidate = value;
		return (
			candidate &&
			(Is.string(candidate.detail) || candidate.detail === void 0) &&
			(Is.string(candidate.description) || candidate.description === void 0)
		);
	}
	__name(is, "is");
	CompletionItemLabelDetails2.is = is;
})(CompletionItemLabelDetails || (CompletionItemLabelDetails = {}));
var CompletionItem;
(function (CompletionItem2) {
	function create(label) {
		return {
			label,
		};
	}
	__name(create, "create");
	CompletionItem2.create = create;
})(CompletionItem || (CompletionItem = {}));
var CompletionList;
(function (CompletionList2) {
	function create(items, isIncomplete) {
		return {
			items: items ? items : [],
			isIncomplete: !!isIncomplete,
		};
	}
	__name(create, "create");
	CompletionList2.create = create;
})(CompletionList || (CompletionList = {}));
var MarkedString;
(function (MarkedString2) {
	function fromPlainText(plainText) {
		return plainText.replace(/[\\`*_{}[\]()#+\-.!]/g, "\\$&");
	}
	__name(fromPlainText, "fromPlainText");
	MarkedString2.fromPlainText = fromPlainText;
	function is(value) {
		const candidate = value;
		return (
			Is.string(candidate) || (Is.objectLiteral(candidate) && Is.string(candidate.language) && Is.string(candidate.value))
		);
	}
	__name(is, "is");
	MarkedString2.is = is;
})(MarkedString || (MarkedString = {}));
var Hover;
(function (Hover2) {
	function is(value) {
		let candidate = value;
		return (
			!!candidate &&
			Is.objectLiteral(candidate) &&
			(MarkupContent.is(candidate.contents) ||
				MarkedString.is(candidate.contents) ||
				Is.typedArray(candidate.contents, MarkedString.is)) &&
			(value.range === void 0 || Range2.is(value.range))
		);
	}
	__name(is, "is");
	Hover2.is = is;
})(Hover || (Hover = {}));
var ParameterInformation;
(function (ParameterInformation2) {
	function create(label, documentation) {
		return documentation
			? {
					label,
					documentation,
				}
			: {
					label,
				};
	}
	__name(create, "create");
	ParameterInformation2.create = create;
})(ParameterInformation || (ParameterInformation = {}));
var SignatureInformation;
(function (SignatureInformation3) {
	function create(label, documentation, ...parameters) {
		let result = {
			label,
		};
		if (Is.defined(documentation)) {
			result.documentation = documentation;
		}
		if (Is.defined(parameters)) {
			result.parameters = parameters;
		} else {
			result.parameters = [];
		}
		return result;
	}
	__name(create, "create");
	SignatureInformation3.create = create;
})(SignatureInformation || (SignatureInformation = {}));
var DocumentHighlightKind;
(function (DocumentHighlightKind2) {
	DocumentHighlightKind2.Text = 1;
	DocumentHighlightKind2.Read = 2;
	DocumentHighlightKind2.Write = 3;
})(DocumentHighlightKind || (DocumentHighlightKind = {}));
var DocumentHighlight;
(function (DocumentHighlight2) {
	function create(range, kind) {
		let result = {
			range,
		};
		if (Is.number(kind)) {
			result.kind = kind;
		}
		return result;
	}
	__name(create, "create");
	DocumentHighlight2.create = create;
})(DocumentHighlight || (DocumentHighlight = {}));
var SymbolKind;
(function (SymbolKind3) {
	SymbolKind3.File = 1;
	SymbolKind3.Module = 2;
	SymbolKind3.Namespace = 3;
	SymbolKind3.Package = 4;
	SymbolKind3.Class = 5;
	SymbolKind3.Method = 6;
	SymbolKind3.Property = 7;
	SymbolKind3.Field = 8;
	SymbolKind3.Constructor = 9;
	SymbolKind3.Enum = 10;
	SymbolKind3.Interface = 11;
	SymbolKind3.Function = 12;
	SymbolKind3.Variable = 13;
	SymbolKind3.Constant = 14;
	SymbolKind3.String = 15;
	SymbolKind3.Number = 16;
	SymbolKind3.Boolean = 17;
	SymbolKind3.Array = 18;
	SymbolKind3.Object = 19;
	SymbolKind3.Key = 20;
	SymbolKind3.Null = 21;
	SymbolKind3.EnumMember = 22;
	SymbolKind3.Struct = 23;
	SymbolKind3.Event = 24;
	SymbolKind3.Operator = 25;
	SymbolKind3.TypeParameter = 26;
})(SymbolKind || (SymbolKind = {}));
var SymbolTag;
(function (SymbolTag2) {
	SymbolTag2.Deprecated = 1;
})(SymbolTag || (SymbolTag = {}));
var SymbolInformation;
(function (SymbolInformation2) {
	function create(name, kind, range, uri, containerName) {
		let result = {
			name,
			kind,
			location: {
				uri,
				range,
			},
		};
		if (containerName) {
			result.containerName = containerName;
		}
		return result;
	}
	__name(create, "create");
	SymbolInformation2.create = create;
})(SymbolInformation || (SymbolInformation = {}));
var WorkspaceSymbol;
(function (WorkspaceSymbol2) {
	function create(name, kind, uri, range) {
		return range !== void 0
			? {
					name,
					kind,
					location: {
						uri,
						range,
					},
				}
			: {
					name,
					kind,
					location: {
						uri,
					},
				};
	}
	__name(create, "create");
	WorkspaceSymbol2.create = create;
})(WorkspaceSymbol || (WorkspaceSymbol = {}));
var DocumentSymbol;
(function (DocumentSymbol2) {
	function create(name, detail, kind, range, selectionRange, children) {
		let result = {
			name,
			detail,
			kind,
			range,
			selectionRange,
		};
		if (children !== void 0) {
			result.children = children;
		}
		return result;
	}
	__name(create, "create");
	DocumentSymbol2.create = create;
	function is(value) {
		let candidate = value;
		return (
			candidate &&
			Is.string(candidate.name) &&
			Is.number(candidate.kind) &&
			Range2.is(candidate.range) &&
			Range2.is(candidate.selectionRange) &&
			(candidate.detail === void 0 || Is.string(candidate.detail)) &&
			(candidate.deprecated === void 0 || Is.boolean(candidate.deprecated)) &&
			(candidate.children === void 0 || Array.isArray(candidate.children)) &&
			(candidate.tags === void 0 || Array.isArray(candidate.tags))
		);
	}
	__name(is, "is");
	DocumentSymbol2.is = is;
})(DocumentSymbol || (DocumentSymbol = {}));
var CodeActionKind;
(function (CodeActionKind4) {
	CodeActionKind4.Empty = "";
	CodeActionKind4.QuickFix = "quickfix";
	CodeActionKind4.Refactor = "refactor";
	CodeActionKind4.RefactorExtract = "refactor.extract";
	CodeActionKind4.RefactorInline = "refactor.inline";
	CodeActionKind4.RefactorRewrite = "refactor.rewrite";
	CodeActionKind4.Source = "source";
	CodeActionKind4.SourceOrganizeImports = "source.organizeImports";
	CodeActionKind4.SourceFixAll = "source.fixAll";
})(CodeActionKind || (CodeActionKind = {}));
var CodeActionTriggerKind;
(function (CodeActionTriggerKind2) {
	CodeActionTriggerKind2.Invoked = 1;
	CodeActionTriggerKind2.Automatic = 2;
})(CodeActionTriggerKind || (CodeActionTriggerKind = {}));
var CodeActionContext;
(function (CodeActionContext2) {
	function create(diagnostics, only, triggerKind) {
		let result = {
			diagnostics,
		};
		if (only !== void 0 && only !== null) {
			result.only = only;
		}
		if (triggerKind !== void 0 && triggerKind !== null) {
			result.triggerKind = triggerKind;
		}
		return result;
	}
	__name(create, "create");
	CodeActionContext2.create = create;
	function is(value) {
		let candidate = value;
		return (
			Is.defined(candidate) &&
			Is.typedArray(candidate.diagnostics, Diagnostic.is) &&
			(candidate.only === void 0 || Is.typedArray(candidate.only, Is.string)) &&
			(candidate.triggerKind === void 0 ||
				candidate.triggerKind === CodeActionTriggerKind.Invoked ||
				candidate.triggerKind === CodeActionTriggerKind.Automatic)
		);
	}
	__name(is, "is");
	CodeActionContext2.is = is;
})(CodeActionContext || (CodeActionContext = {}));
var CodeAction;
(function (CodeAction2) {
	function create(title, kindOrCommandOrEdit, kind) {
		let result = {
			title,
		};
		let checkKind = true;
		if (typeof kindOrCommandOrEdit === "string") {
			checkKind = false;
			result.kind = kindOrCommandOrEdit;
		} else if (Command.is(kindOrCommandOrEdit)) {
			result.command = kindOrCommandOrEdit;
		} else {
			result.edit = kindOrCommandOrEdit;
		}
		if (checkKind && kind !== void 0) {
			result.kind = kind;
		}
		return result;
	}
	__name(create, "create");
	CodeAction2.create = create;
	function is(value) {
		let candidate = value;
		return (
			candidate &&
			Is.string(candidate.title) &&
			(candidate.diagnostics === void 0 || Is.typedArray(candidate.diagnostics, Diagnostic.is)) &&
			(candidate.kind === void 0 || Is.string(candidate.kind)) &&
			(candidate.edit !== void 0 || candidate.command !== void 0) &&
			(candidate.command === void 0 || Command.is(candidate.command)) &&
			(candidate.isPreferred === void 0 || Is.boolean(candidate.isPreferred)) &&
			(candidate.edit === void 0 || WorkspaceEdit.is(candidate.edit))
		);
	}
	__name(is, "is");
	CodeAction2.is = is;
})(CodeAction || (CodeAction = {}));
var CodeLens;
(function (CodeLens2) {
	function create(range, data) {
		let result = {
			range,
		};
		if (Is.defined(data)) {
			result.data = data;
		}
		return result;
	}
	__name(create, "create");
	CodeLens2.create = create;
	function is(value) {
		let candidate = value;
		return (
			Is.defined(candidate) &&
			Range2.is(candidate.range) &&
			(Is.undefined(candidate.command) || Command.is(candidate.command))
		);
	}
	__name(is, "is");
	CodeLens2.is = is;
})(CodeLens || (CodeLens = {}));
var FormattingOptions;
(function (FormattingOptions2) {
	function create(tabSize, insertSpaces) {
		return {
			tabSize,
			insertSpaces,
		};
	}
	__name(create, "create");
	FormattingOptions2.create = create;
	function is(value) {
		let candidate = value;
		return Is.defined(candidate) && Is.uinteger(candidate.tabSize) && Is.boolean(candidate.insertSpaces);
	}
	__name(is, "is");
	FormattingOptions2.is = is;
})(FormattingOptions || (FormattingOptions = {}));
var DocumentLink;
(function (DocumentLink2) {
	function create(range, target, data) {
		return {
			range,
			target,
			data,
		};
	}
	__name(create, "create");
	DocumentLink2.create = create;
	function is(value) {
		let candidate = value;
		return (
			Is.defined(candidate) &&
			Range2.is(candidate.range) &&
			(Is.undefined(candidate.target) || Is.string(candidate.target))
		);
	}
	__name(is, "is");
	DocumentLink2.is = is;
})(DocumentLink || (DocumentLink = {}));
var SelectionRange;
(function (SelectionRange2) {
	function create(range, parent) {
		return {
			range,
			parent,
		};
	}
	__name(create, "create");
	SelectionRange2.create = create;
	function is(value) {
		let candidate = value;
		return (
			Is.objectLiteral(candidate) &&
			Range2.is(candidate.range) &&
			(candidate.parent === void 0 || SelectionRange2.is(candidate.parent))
		);
	}
	__name(is, "is");
	SelectionRange2.is = is;
})(SelectionRange || (SelectionRange = {}));
var SemanticTokenTypes;
(function (SemanticTokenTypes2) {
	SemanticTokenTypes2["namespace"] = "namespace";
	SemanticTokenTypes2["type"] = "type";
	SemanticTokenTypes2["class"] = "class";
	SemanticTokenTypes2["enum"] = "enum";
	SemanticTokenTypes2["interface"] = "interface";
	SemanticTokenTypes2["struct"] = "struct";
	SemanticTokenTypes2["typeParameter"] = "typeParameter";
	SemanticTokenTypes2["parameter"] = "parameter";
	SemanticTokenTypes2["variable"] = "variable";
	SemanticTokenTypes2["property"] = "property";
	SemanticTokenTypes2["enumMember"] = "enumMember";
	SemanticTokenTypes2["event"] = "event";
	SemanticTokenTypes2["function"] = "function";
	SemanticTokenTypes2["method"] = "method";
	SemanticTokenTypes2["macro"] = "macro";
	SemanticTokenTypes2["keyword"] = "keyword";
	SemanticTokenTypes2["modifier"] = "modifier";
	SemanticTokenTypes2["comment"] = "comment";
	SemanticTokenTypes2["string"] = "string";
	SemanticTokenTypes2["number"] = "number";
	SemanticTokenTypes2["regexp"] = "regexp";
	SemanticTokenTypes2["operator"] = "operator";
	SemanticTokenTypes2["decorator"] = "decorator";
})(SemanticTokenTypes || (SemanticTokenTypes = {}));
var SemanticTokenModifiers;
(function (SemanticTokenModifiers2) {
	SemanticTokenModifiers2["declaration"] = "declaration";
	SemanticTokenModifiers2["definition"] = "definition";
	SemanticTokenModifiers2["readonly"] = "readonly";
	SemanticTokenModifiers2["static"] = "static";
	SemanticTokenModifiers2["deprecated"] = "deprecated";
	SemanticTokenModifiers2["abstract"] = "abstract";
	SemanticTokenModifiers2["async"] = "async";
	SemanticTokenModifiers2["modification"] = "modification";
	SemanticTokenModifiers2["documentation"] = "documentation";
	SemanticTokenModifiers2["defaultLibrary"] = "defaultLibrary";
})(SemanticTokenModifiers || (SemanticTokenModifiers = {}));
var SemanticTokens;
(function (SemanticTokens2) {
	function is(value) {
		const candidate = value;
		return (
			Is.objectLiteral(candidate) &&
			(candidate.resultId === void 0 || typeof candidate.resultId === "string") &&
			Array.isArray(candidate.data) &&
			(candidate.data.length === 0 || typeof candidate.data[0] === "number")
		);
	}
	__name(is, "is");
	SemanticTokens2.is = is;
})(SemanticTokens || (SemanticTokens = {}));
var InlineValueText;
(function (InlineValueText2) {
	function create(range, text) {
		return {
			range,
			text,
		};
	}
	__name(create, "create");
	InlineValueText2.create = create;
	function is(value) {
		const candidate = value;
		return candidate !== void 0 && candidate !== null && Range2.is(candidate.range) && Is.string(candidate.text);
	}
	__name(is, "is");
	InlineValueText2.is = is;
})(InlineValueText || (InlineValueText = {}));
var InlineValueVariableLookup;
(function (InlineValueVariableLookup2) {
	function create(range, variableName, caseSensitiveLookup) {
		return {
			range,
			variableName,
			caseSensitiveLookup,
		};
	}
	__name(create, "create");
	InlineValueVariableLookup2.create = create;
	function is(value) {
		const candidate = value;
		return (
			candidate !== void 0 &&
			candidate !== null &&
			Range2.is(candidate.range) &&
			Is.boolean(candidate.caseSensitiveLookup) &&
			(Is.string(candidate.variableName) || candidate.variableName === void 0)
		);
	}
	__name(is, "is");
	InlineValueVariableLookup2.is = is;
})(InlineValueVariableLookup || (InlineValueVariableLookup = {}));
var InlineValueEvaluatableExpression;
(function (InlineValueEvaluatableExpression2) {
	function create(range, expression) {
		return {
			range,
			expression,
		};
	}
	__name(create, "create");
	InlineValueEvaluatableExpression2.create = create;
	function is(value) {
		const candidate = value;
		return (
			candidate !== void 0 &&
			candidate !== null &&
			Range2.is(candidate.range) &&
			(Is.string(candidate.expression) || candidate.expression === void 0)
		);
	}
	__name(is, "is");
	InlineValueEvaluatableExpression2.is = is;
})(InlineValueEvaluatableExpression || (InlineValueEvaluatableExpression = {}));
var InlineValueContext;
(function (InlineValueContext2) {
	function create(frameId, stoppedLocation) {
		return {
			frameId,
			stoppedLocation,
		};
	}
	__name(create, "create");
	InlineValueContext2.create = create;
	function is(value) {
		const candidate = value;
		return Is.defined(candidate) && Range2.is(value.stoppedLocation);
	}
	__name(is, "is");
	InlineValueContext2.is = is;
})(InlineValueContext || (InlineValueContext = {}));
var InlayHintKind;
(function (InlayHintKind2) {
	InlayHintKind2.Type = 1;
	InlayHintKind2.Parameter = 2;
	function is(value) {
		return value === 1 || value === 2;
	}
	__name(is, "is");
	InlayHintKind2.is = is;
})(InlayHintKind || (InlayHintKind = {}));
var InlayHintLabelPart;
(function (InlayHintLabelPart2) {
	function create(value) {
		return {
			value,
		};
	}
	__name(create, "create");
	InlayHintLabelPart2.create = create;
	function is(value) {
		const candidate = value;
		return (
			Is.objectLiteral(candidate) &&
			(candidate.tooltip === void 0 || Is.string(candidate.tooltip) || MarkupContent.is(candidate.tooltip)) &&
			(candidate.location === void 0 || Location.is(candidate.location)) &&
			(candidate.command === void 0 || Command.is(candidate.command))
		);
	}
	__name(is, "is");
	InlayHintLabelPart2.is = is;
})(InlayHintLabelPart || (InlayHintLabelPart = {}));
var InlayHint;
(function (InlayHint2) {
	function create(position, label, kind) {
		const result = {
			position,
			label,
		};
		if (kind !== void 0) {
			result.kind = kind;
		}
		return result;
	}
	__name(create, "create");
	InlayHint2.create = create;
	function is(value) {
		const candidate = value;
		return (
			(Is.objectLiteral(candidate) &&
				Position2.is(candidate.position) &&
				(Is.string(candidate.label) || Is.typedArray(candidate.label, InlayHintLabelPart.is)) &&
				(candidate.kind === void 0 || InlayHintKind.is(candidate.kind)) &&
				candidate.textEdits === void 0) ||
			(Is.typedArray(candidate.textEdits, TextEdit.is) &&
				(candidate.tooltip === void 0 || Is.string(candidate.tooltip) || MarkupContent.is(candidate.tooltip)) &&
				(candidate.paddingLeft === void 0 || Is.boolean(candidate.paddingLeft)) &&
				(candidate.paddingRight === void 0 || Is.boolean(candidate.paddingRight)))
		);
	}
	__name(is, "is");
	InlayHint2.is = is;
})(InlayHint || (InlayHint = {}));
var StringValue;
(function (StringValue2) {
	function createSnippet(value) {
		return {
			kind: "snippet",
			value,
		};
	}
	__name(createSnippet, "createSnippet");
	StringValue2.createSnippet = createSnippet;
})(StringValue || (StringValue = {}));
var InlineCompletionItem;
(function (InlineCompletionItem2) {
	function create(insertText, filterText, range, command) {
		return {
			insertText,
			filterText,
			range,
			command,
		};
	}
	__name(create, "create");
	InlineCompletionItem2.create = create;
})(InlineCompletionItem || (InlineCompletionItem = {}));
var InlineCompletionList;
(function (InlineCompletionList2) {
	function create(items) {
		return {
			items,
		};
	}
	__name(create, "create");
	InlineCompletionList2.create = create;
})(InlineCompletionList || (InlineCompletionList = {}));
var InlineCompletionTriggerKind;
(function (InlineCompletionTriggerKind2) {
	InlineCompletionTriggerKind2.Invoked = 0;
	InlineCompletionTriggerKind2.Automatic = 1;
})(InlineCompletionTriggerKind || (InlineCompletionTriggerKind = {}));
var SelectedCompletionInfo;
(function (SelectedCompletionInfo2) {
	function create(range, text) {
		return {
			range,
			text,
		};
	}
	__name(create, "create");
	SelectedCompletionInfo2.create = create;
})(SelectedCompletionInfo || (SelectedCompletionInfo = {}));
var InlineCompletionContext;
(function (InlineCompletionContext2) {
	function create(triggerKind, selectedCompletionInfo) {
		return {
			triggerKind,
			selectedCompletionInfo,
		};
	}
	__name(create, "create");
	InlineCompletionContext2.create = create;
})(InlineCompletionContext || (InlineCompletionContext = {}));
var WorkspaceFolder;
(function (WorkspaceFolder2) {
	function is(value) {
		const candidate = value;
		return Is.objectLiteral(candidate) && URI.is(candidate.uri) && Is.string(candidate.name);
	}
	__name(is, "is");
	WorkspaceFolder2.is = is;
})(WorkspaceFolder || (WorkspaceFolder = {}));
var TextDocument2;
(function (TextDocument3) {
	function create(uri, languageId, version, content) {
		return new FullTextDocument3(uri, languageId, version, content);
	}
	__name(create, "create");
	TextDocument3.create = create;
	function is(value) {
		let candidate = value;
		return Is.defined(candidate) &&
			Is.string(candidate.uri) &&
			(Is.undefined(candidate.languageId) || Is.string(candidate.languageId)) &&
			Is.uinteger(candidate.lineCount) &&
			Is.func(candidate.getText) &&
			Is.func(candidate.positionAt) &&
			Is.func(candidate.offsetAt)
			? true
			: false;
	}
	__name(is, "is");
	TextDocument3.is = is;
	function applyEdits(document2, edits) {
		let text = document2.getText();
		let sortedEdits = mergeSort2(edits, (a2, b) => {
			let diff = a2.range.start.line - b.range.start.line;
			if (diff === 0) {
				return a2.range.start.character - b.range.start.character;
			}
			return diff;
		});
		let lastModifiedOffset = text.length;
		for (let i = sortedEdits.length - 1; i >= 0; i--) {
			let e = sortedEdits[i];
			let startOffset = document2.offsetAt(e.range.start);
			let endOffset = document2.offsetAt(e.range.end);
			if (endOffset <= lastModifiedOffset) {
				text = text.substring(0, startOffset) + e.newText + text.substring(endOffset, text.length);
			} else {
				throw new Error("Overlapping edit");
			}
			lastModifiedOffset = startOffset;
		}
		return text;
	}
	__name(applyEdits, "applyEdits");
	TextDocument3.applyEdits = applyEdits;
	function mergeSort2(data, compare) {
		if (data.length <= 1) {
			return data;
		}
		const p = (data.length / 2) | 0;
		const left = data.slice(0, p);
		const right = data.slice(p);
		mergeSort2(left, compare);
		mergeSort2(right, compare);
		let leftIdx = 0;
		let rightIdx = 0;
		let i = 0;
		while (leftIdx < left.length && rightIdx < right.length) {
			let ret = compare(left[leftIdx], right[rightIdx]);
			if (ret <= 0) {
				data[i++] = left[leftIdx++];
			} else {
				data[i++] = right[rightIdx++];
			}
		}
		while (leftIdx < left.length) {
			data[i++] = left[leftIdx++];
		}
		while (rightIdx < right.length) {
			data[i++] = right[rightIdx++];
		}
		return data;
	}
	__name(mergeSort2, "mergeSort");
})(TextDocument2 || (TextDocument2 = {}));
var FullTextDocument3 = class FullTextDocument4 {
	static {
		__name(this, "FullTextDocument");
	}
	constructor(uri, languageId, version, content) {
		this._uri = uri;
		this._languageId = languageId;
		this._version = version;
		this._content = content;
		this._lineOffsets = void 0;
	}
	get uri() {
		return this._uri;
	}
	get languageId() {
		return this._languageId;
	}
	get version() {
		return this._version;
	}
	getText(range) {
		if (range) {
			let start = this.offsetAt(range.start);
			let end = this.offsetAt(range.end);
			return this._content.substring(start, end);
		}
		return this._content;
	}
	update(event, version) {
		this._content = event.text;
		this._version = version;
		this._lineOffsets = void 0;
	}
	getLineOffsets() {
		if (this._lineOffsets === void 0) {
			let lineOffsets = [];
			let text = this._content;
			let isLineStart = true;
			for (let i = 0; i < text.length; i++) {
				if (isLineStart) {
					lineOffsets.push(i);
					isLineStart = false;
				}
				let ch = text.charAt(i);
				isLineStart = ch === "\r" || ch === "\n";
				if (ch === "\r" && i + 1 < text.length && text.charAt(i + 1) === "\n") {
					i++;
				}
			}
			if (isLineStart && text.length > 0) {
				lineOffsets.push(text.length);
			}
			this._lineOffsets = lineOffsets;
		}
		return this._lineOffsets;
	}
	positionAt(offset) {
		offset = Math.max(Math.min(offset, this._content.length), 0);
		let lineOffsets = this.getLineOffsets();
		let low = 0,
			high = lineOffsets.length;
		if (high === 0) {
			return Position2.create(0, offset);
		}
		while (low < high) {
			let mid = Math.floor((low + high) / 2);
			if (lineOffsets[mid] > offset) {
				high = mid;
			} else {
				low = mid + 1;
			}
		}
		let line = low - 1;
		return Position2.create(line, offset - lineOffsets[line]);
	}
	offsetAt(position) {
		let lineOffsets = this.getLineOffsets();
		if (position.line >= lineOffsets.length) {
			return this._content.length;
		} else if (position.line < 0) {
			return 0;
		}
		let lineOffset = lineOffsets[position.line];
		let nextLineOffset = position.line + 1 < lineOffsets.length ? lineOffsets[position.line + 1] : this._content.length;
		return Math.max(Math.min(lineOffset + position.character, nextLineOffset), lineOffset);
	}
	get lineCount() {
		return this.getLineOffsets().length;
	}
};
var Is;
(function (Is2) {
	const toString = Object.prototype.toString;
	function defined(value) {
		return typeof value !== "undefined";
	}
	__name(defined, "defined");
	Is2.defined = defined;
	function undefined1(value) {
		return typeof value === "undefined";
	}
	__name(undefined1, "undefined1");
	Is2.undefined = undefined1;
	function boolean(value) {
		return value === true || value === false;
	}
	__name(boolean, "boolean");
	Is2.boolean = boolean;
	function string(value) {
		return toString.call(value) === "[object String]";
	}
	__name(string, "string");
	Is2.string = string;
	function number(value) {
		return toString.call(value) === "[object Number]";
	}
	__name(number, "number");
	Is2.number = number;
	function numberRange(value, min, max) {
		return toString.call(value) === "[object Number]" && min <= value && value <= max;
	}
	__name(numberRange, "numberRange");
	Is2.numberRange = numberRange;
	function integer2(value) {
		return toString.call(value) === "[object Number]" && -2147483648 <= value && value <= 2147483647;
	}
	__name(integer2, "integer");
	Is2.integer = integer2;
	function uinteger2(value) {
		return toString.call(value) === "[object Number]" && 0 <= value && value <= 2147483647;
	}
	__name(uinteger2, "uinteger");
	Is2.uinteger = uinteger2;
	function func(value) {
		return toString.call(value) === "[object Function]";
	}
	__name(func, "func");
	Is2.func = func;
	function objectLiteral(value) {
		return value !== null && typeof value === "object";
	}
	__name(objectLiteral, "objectLiteral");
	Is2.objectLiteral = objectLiteral;
	function typedArray(value, check) {
		return Array.isArray(value) && value.every(check);
	}
	__name(typedArray, "typedArray");
	Is2.typedArray = typedArray;
})(Is || (Is = {}));

// ../../../node_modules/.pnpm/vscode-json-languageservice@5.6.3/node_modules/vscode-json-languageservice/lib/esm/jsonLanguageTypes.js
var ErrorCode;
(function (ErrorCode2) {
	ErrorCode2[(ErrorCode2["Undefined"] = 0)] = "Undefined";
	ErrorCode2[(ErrorCode2["EnumValueMismatch"] = 1)] = "EnumValueMismatch";
	ErrorCode2[(ErrorCode2["Deprecated"] = 2)] = "Deprecated";
	ErrorCode2[(ErrorCode2["UnexpectedEndOfComment"] = 257)] = "UnexpectedEndOfComment";
	ErrorCode2[(ErrorCode2["UnexpectedEndOfString"] = 258)] = "UnexpectedEndOfString";
	ErrorCode2[(ErrorCode2["UnexpectedEndOfNumber"] = 259)] = "UnexpectedEndOfNumber";
	ErrorCode2[(ErrorCode2["InvalidUnicode"] = 260)] = "InvalidUnicode";
	ErrorCode2[(ErrorCode2["InvalidEscapeCharacter"] = 261)] = "InvalidEscapeCharacter";
	ErrorCode2[(ErrorCode2["InvalidCharacter"] = 262)] = "InvalidCharacter";
	ErrorCode2[(ErrorCode2["PropertyExpected"] = 513)] = "PropertyExpected";
	ErrorCode2[(ErrorCode2["CommaExpected"] = 514)] = "CommaExpected";
	ErrorCode2[(ErrorCode2["ColonExpected"] = 515)] = "ColonExpected";
	ErrorCode2[(ErrorCode2["ValueExpected"] = 516)] = "ValueExpected";
	ErrorCode2[(ErrorCode2["CommaOrCloseBacketExpected"] = 517)] = "CommaOrCloseBacketExpected";
	ErrorCode2[(ErrorCode2["CommaOrCloseBraceExpected"] = 518)] = "CommaOrCloseBraceExpected";
	ErrorCode2[(ErrorCode2["TrailingComma"] = 519)] = "TrailingComma";
	ErrorCode2[(ErrorCode2["DuplicateKey"] = 520)] = "DuplicateKey";
	ErrorCode2[(ErrorCode2["CommentNotPermitted"] = 521)] = "CommentNotPermitted";
	ErrorCode2[(ErrorCode2["PropertyKeysMustBeDoublequoted"] = 528)] = "PropertyKeysMustBeDoublequoted";
	ErrorCode2[(ErrorCode2["SchemaResolveError"] = 768)] = "SchemaResolveError";
	ErrorCode2[(ErrorCode2["SchemaUnsupportedFeature"] = 769)] = "SchemaUnsupportedFeature";
})(ErrorCode || (ErrorCode = {}));
var SchemaDraft;
(function (SchemaDraft2) {
	SchemaDraft2[(SchemaDraft2["v3"] = 3)] = "v3";
	SchemaDraft2[(SchemaDraft2["v4"] = 4)] = "v4";
	SchemaDraft2[(SchemaDraft2["v6"] = 6)] = "v6";
	SchemaDraft2[(SchemaDraft2["v7"] = 7)] = "v7";
	SchemaDraft2[(SchemaDraft2["v2019_09"] = 19)] = "v2019_09";
	SchemaDraft2[(SchemaDraft2["v2020_12"] = 20)] = "v2020_12";
})(SchemaDraft || (SchemaDraft = {}));
var ClientCapabilities;
(function (ClientCapabilities2) {
	ClientCapabilities2.LATEST = {
		textDocument: {
			completion: {
				completionItem: {
					documentationFormat: [MarkupKind.Markdown, MarkupKind.PlainText],
					commitCharactersSupport: true,
					labelDetailsSupport: true,
				},
			},
		},
	};
})(ClientCapabilities || (ClientCapabilities = {}));

// ../../../node_modules/.pnpm/vscode-uri@3.1.0/node_modules/vscode-uri/lib/esm/index.mjs
init_cjs_shims();
var LIB;
(() => {
	"use strict";
	var t7 = {
			975: (t8) => {
				function e2(t9) {
					if ("string" != typeof t9) throw new TypeError("Path must be a string. Received " + JSON.stringify(t9));
				}
				__name(e2, "e");
				function r2(t9, e3) {
					for (var r3, n3 = "", i2 = 0, o2 = -1, s2 = 0, h2 = 0; h2 <= t9.length; ++h2) {
						if (h2 < t9.length) r3 = t9.charCodeAt(h2);
						else {
							if (47 === r3) break;
							r3 = 47;
						}
						if (47 === r3) {
							if (o2 === h2 - 1 || 1 === s2);
							else if (o2 !== h2 - 1 && 2 === s2) {
								if (n3.length < 2 || 2 !== i2 || 46 !== n3.charCodeAt(n3.length - 1) || 46 !== n3.charCodeAt(n3.length - 2)) {
									if (n3.length > 2) {
										var a3 = n3.lastIndexOf("/");
										if (a3 !== n3.length - 1) {
											-1 === a3 ? ((n3 = ""), (i2 = 0)) : (i2 = (n3 = n3.slice(0, a3)).length - 1 - n3.lastIndexOf("/")),
												(o2 = h2),
												(s2 = 0);
											continue;
										}
									} else if (2 === n3.length || 1 === n3.length) {
										(n3 = ""), (i2 = 0), (o2 = h2), (s2 = 0);
										continue;
									}
								}
								e3 && (n3.length > 0 ? (n3 += "/..") : (n3 = ".."), (i2 = 2));
							} else n3.length > 0 ? (n3 += "/" + t9.slice(o2 + 1, h2)) : (n3 = t9.slice(o2 + 1, h2)), (i2 = h2 - o2 - 1);
							(o2 = h2), (s2 = 0);
						} else 46 === r3 && -1 !== s2 ? ++s2 : (s2 = -1);
					}
					return n3;
				}
				__name(r2, "r");
				var n2 = {
					resolve: /* @__PURE__ */ __name(function () {
						for (var t9, n3 = "", i2 = false, o2 = arguments.length - 1; o2 >= -1 && !i2; o2--) {
							var s2;
							o2 >= 0 ? (s2 = arguments[o2]) : (void 0 === t9 && (t9 = process.cwd()), (s2 = t9)),
								e2(s2),
								0 !== s2.length && ((n3 = s2 + "/" + n3), (i2 = 47 === s2.charCodeAt(0)));
						}
						return (n3 = r2(n3, !i2)), i2 ? (n3.length > 0 ? "/" + n3 : "/") : n3.length > 0 ? n3 : ".";
					}, "resolve"),
					normalize: /* @__PURE__ */ __name(function (t9) {
						if ((e2(t9), 0 === t9.length)) return ".";
						var n3 = 47 === t9.charCodeAt(0),
							i2 = 47 === t9.charCodeAt(t9.length - 1);
						return (
							0 !== (t9 = r2(t9, !n3)).length || n3 || (t9 = "."), t9.length > 0 && i2 && (t9 += "/"), n3 ? "/" + t9 : t9
						);
					}, "normalize"),
					isAbsolute: /* @__PURE__ */ __name(function (t9) {
						return e2(t9), t9.length > 0 && 47 === t9.charCodeAt(0);
					}, "isAbsolute"),
					join: /* @__PURE__ */ __name(function () {
						if (0 === arguments.length) return ".";
						for (var t9, r3 = 0; r3 < arguments.length; ++r3) {
							var i2 = arguments[r3];
							e2(i2), i2.length > 0 && (void 0 === t9 ? (t9 = i2) : (t9 += "/" + i2));
						}
						return void 0 === t9 ? "." : n2.normalize(t9);
					}, "join"),
					relative: /* @__PURE__ */ __name(function (t9, r3) {
						if ((e2(t9), e2(r3), t9 === r3)) return "";
						if ((t9 = n2.resolve(t9)) === (r3 = n2.resolve(r3))) return "";
						for (var i2 = 1; i2 < t9.length && 47 === t9.charCodeAt(i2); ++i2);
						for (var o2 = t9.length, s2 = o2 - i2, h2 = 1; h2 < r3.length && 47 === r3.charCodeAt(h2); ++h2);
						for (var a3 = r3.length - h2, c2 = s2 < a3 ? s2 : a3, f3 = -1, u2 = 0; u2 <= c2; ++u2) {
							if (u2 === c2) {
								if (a3 > c2) {
									if (47 === r3.charCodeAt(h2 + u2)) return r3.slice(h2 + u2 + 1);
									if (0 === u2) return r3.slice(h2 + u2);
								} else s2 > c2 && (47 === t9.charCodeAt(i2 + u2) ? (f3 = u2) : 0 === u2 && (f3 = 0));
								break;
							}
							var l2 = t9.charCodeAt(i2 + u2);
							if (l2 !== r3.charCodeAt(h2 + u2)) break;
							47 === l2 && (f3 = u2);
						}
						var g2 = "";
						for (u2 = i2 + f3 + 1; u2 <= o2; ++u2)
							(u2 !== o2 && 47 !== t9.charCodeAt(u2)) || (0 === g2.length ? (g2 += "..") : (g2 += "/.."));
						return g2.length > 0 ? g2 + r3.slice(h2 + f3) : ((h2 += f3), 47 === r3.charCodeAt(h2) && ++h2, r3.slice(h2));
					}, "relative"),
					_makeLong: /* @__PURE__ */ __name(function (t9) {
						return t9;
					}, "_makeLong"),
					dirname: /* @__PURE__ */ __name(function (t9) {
						if ((e2(t9), 0 === t9.length)) return ".";
						for (var r3 = t9.charCodeAt(0), n3 = 47 === r3, i2 = -1, o2 = true, s2 = t9.length - 1; s2 >= 1; --s2)
							if (47 === (r3 = t9.charCodeAt(s2))) {
								if (!o2) {
									i2 = s2;
									break;
								}
							} else o2 = false;
						return -1 === i2 ? (n3 ? "/" : ".") : n3 && 1 === i2 ? "//" : t9.slice(0, i2);
					}, "dirname"),
					basename: /* @__PURE__ */ __name(function (t9, r3) {
						if (void 0 !== r3 && "string" != typeof r3) throw new TypeError('"ext" argument must be a string');
						e2(t9);
						var n3,
							i2 = 0,
							o2 = -1,
							s2 = true;
						if (void 0 !== r3 && r3.length > 0 && r3.length <= t9.length) {
							if (r3.length === t9.length && r3 === t9) return "";
							var h2 = r3.length - 1,
								a3 = -1;
							for (n3 = t9.length - 1; n3 >= 0; --n3) {
								var c2 = t9.charCodeAt(n3);
								if (47 === c2) {
									if (!s2) {
										i2 = n3 + 1;
										break;
									}
								} else
									-1 === a3 && ((s2 = false), (a3 = n3 + 1)),
										h2 >= 0 && (c2 === r3.charCodeAt(h2) ? -1 == --h2 && (o2 = n3) : ((h2 = -1), (o2 = a3)));
							}
							return i2 === o2 ? (o2 = a3) : -1 === o2 && (o2 = t9.length), t9.slice(i2, o2);
						}
						for (n3 = t9.length - 1; n3 >= 0; --n3)
							if (47 === t9.charCodeAt(n3)) {
								if (!s2) {
									i2 = n3 + 1;
									break;
								}
							} else -1 === o2 && ((s2 = false), (o2 = n3 + 1));
						return -1 === o2 ? "" : t9.slice(i2, o2);
					}, "basename"),
					extname: /* @__PURE__ */ __name(function (t9) {
						e2(t9);
						for (var r3 = -1, n3 = 0, i2 = -1, o2 = true, s2 = 0, h2 = t9.length - 1; h2 >= 0; --h2) {
							var a3 = t9.charCodeAt(h2);
							if (47 !== a3)
								-1 === i2 && ((o2 = false), (i2 = h2 + 1)),
									46 === a3 ? (-1 === r3 ? (r3 = h2) : 1 !== s2 && (s2 = 1)) : -1 !== r3 && (s2 = -1);
							else if (!o2) {
								n3 = h2 + 1;
								break;
							}
						}
						return -1 === r3 || -1 === i2 || 0 === s2 || (1 === s2 && r3 === i2 - 1 && r3 === n3 + 1) ? "" : t9.slice(r3, i2);
					}, "extname"),
					format: /* @__PURE__ */ __name(function (t9) {
						if (null === t9 || "object" != typeof t9)
							throw new TypeError('The "pathObject" argument must be of type Object. Received type ' + typeof t9);
						return (function (t10, e3) {
							var r3 = e3.dir || e3.root,
								n3 = e3.base || (e3.name || "") + (e3.ext || "");
							return r3 ? (r3 === e3.root ? r3 + n3 : r3 + "/" + n3) : n3;
						})(0, t9);
					}, "format"),
					parse: /* @__PURE__ */ __name(function (t9) {
						e2(t9);
						var r3 = { root: "", dir: "", base: "", ext: "", name: "" };
						if (0 === t9.length) return r3;
						var n3,
							i2 = t9.charCodeAt(0),
							o2 = 47 === i2;
						o2 ? ((r3.root = "/"), (n3 = 1)) : (n3 = 0);
						for (var s2 = -1, h2 = 0, a3 = -1, c2 = true, f3 = t9.length - 1, u2 = 0; f3 >= n3; --f3)
							if (47 !== (i2 = t9.charCodeAt(f3)))
								-1 === a3 && ((c2 = false), (a3 = f3 + 1)),
									46 === i2 ? (-1 === s2 ? (s2 = f3) : 1 !== u2 && (u2 = 1)) : -1 !== s2 && (u2 = -1);
							else if (!c2) {
								h2 = f3 + 1;
								break;
							}
						return (
							-1 === s2 || -1 === a3 || 0 === u2 || (1 === u2 && s2 === a3 - 1 && s2 === h2 + 1)
								? -1 !== a3 && (r3.base = r3.name = 0 === h2 && o2 ? t9.slice(1, a3) : t9.slice(h2, a3))
								: (0 === h2 && o2
										? ((r3.name = t9.slice(1, s2)), (r3.base = t9.slice(1, a3)))
										: ((r3.name = t9.slice(h2, s2)), (r3.base = t9.slice(h2, a3))),
									(r3.ext = t9.slice(s2, a3))),
							h2 > 0 ? (r3.dir = t9.slice(0, h2 - 1)) : o2 && (r3.dir = "/"),
							r3
						);
					}, "parse"),
					sep: "/",
					delimiter: ":",
					win32: null,
					posix: null,
				};
				(n2.posix = n2), (t8.exports = n2);
			},
		},
		e = {};
	function r(n2) {
		var i2 = e[n2];
		if (void 0 !== i2) return i2.exports;
		var o2 = (e[n2] = { exports: {} });
		return t7[n2](o2, o2.exports, r), o2.exports;
	}
	__name(r, "r");
	(r.d = (t8, e2) => {
		for (var n2 in e2) r.o(e2, n2) && !r.o(t8, n2) && Object.defineProperty(t8, n2, { enumerable: true, get: e2[n2] });
	}),
		(r.o = (t8, e2) => Object.prototype.hasOwnProperty.call(t8, e2)),
		(r.r = (t8) => {
			"undefined" != typeof Symbol &&
				Symbol.toStringTag &&
				Object.defineProperty(t8, Symbol.toStringTag, { value: "Module" }),
				Object.defineProperty(t8, "__esModule", { value: true });
		});
	var n = {};
	let i;
	if (
		(r.r(n),
		r.d(n, { URI: /* @__PURE__ */ __name(() => l, "URI"), Utils: /* @__PURE__ */ __name(() => I, "Utils") }),
		"object" == typeof process)
	)
		i = "win32" === process.platform;
	else if ("object" == typeof navigator) {
		let t8 = navigator.userAgent;
		i = t8.indexOf("Windows") >= 0;
	}
	const o = /^\w[\w\d+.-]*$/,
		s = /^\//,
		h = /^\/\//;
	function a2(t8, e2) {
		if (!t8.scheme && e2)
			throw new Error(
				`[UriError]: Scheme is missing: {scheme: "", authority: "${t8.authority}", path: "${t8.path}", query: "${t8.query}", fragment: "${t8.fragment}"}`,
			);
		if (t8.scheme && !o.test(t8.scheme)) throw new Error("[UriError]: Scheme contains illegal characters.");
		if (t8.path) {
			if (t8.authority) {
				if (!s.test(t8.path))
					throw new Error(
						'[UriError]: If a URI contains an authority component, then the path component must either be empty or begin with a slash ("/") character',
					);
			} else if (h.test(t8.path))
				throw new Error(
					'[UriError]: If a URI does not contain an authority component, then the path cannot begin with two slash characters ("//")',
				);
		}
	}
	__name(a2, "a");
	const c = "",
		f2 = "/",
		u = /^(([^:/?#]+?):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/;
	class l {
		static {
			__name(this, "l");
		}
		static isUri(t8) {
			return (
				t8 instanceof l ||
				(!!t8 &&
					"string" == typeof t8.authority &&
					"string" == typeof t8.fragment &&
					"string" == typeof t8.path &&
					"string" == typeof t8.query &&
					"string" == typeof t8.scheme &&
					"string" == typeof t8.fsPath &&
					"function" == typeof t8.with &&
					"function" == typeof t8.toString)
			);
		}
		scheme;
		authority;
		path;
		query;
		fragment;
		constructor(t8, e2, r2, n2, i2, o2 = false) {
			"object" == typeof t8
				? ((this.scheme = t8.scheme || c),
					(this.authority = t8.authority || c),
					(this.path = t8.path || c),
					(this.query = t8.query || c),
					(this.fragment = t8.fragment || c))
				: ((this.scheme = /* @__PURE__ */ (function (t9, e3) {
						return t9 || e3 ? t9 : "file";
					})(t8, o2)),
					(this.authority = e2 || c),
					(this.path = (function (t9, e3) {
						switch (t9) {
							case "https":
							case "http":
							case "file":
								e3 ? e3[0] !== f2 && (e3 = f2 + e3) : (e3 = f2);
						}
						return e3;
					})(this.scheme, r2 || c)),
					(this.query = n2 || c),
					(this.fragment = i2 || c),
					a2(this, o2));
		}
		get fsPath() {
			return v(this, false);
		}
		with(t8) {
			if (!t8) return this;
			let { scheme: e2, authority: r2, path: n2, query: i2, fragment: o2 } = t8;
			return (
				void 0 === e2 ? (e2 = this.scheme) : null === e2 && (e2 = c),
				void 0 === r2 ? (r2 = this.authority) : null === r2 && (r2 = c),
				void 0 === n2 ? (n2 = this.path) : null === n2 && (n2 = c),
				void 0 === i2 ? (i2 = this.query) : null === i2 && (i2 = c),
				void 0 === o2 ? (o2 = this.fragment) : null === o2 && (o2 = c),
				e2 === this.scheme && r2 === this.authority && n2 === this.path && i2 === this.query && o2 === this.fragment
					? this
					: new d(e2, r2, n2, i2, o2)
			);
		}
		static parse(t8, e2 = false) {
			const r2 = u.exec(t8);
			return r2 ? new d(r2[2] || c, w(r2[4] || c), w(r2[5] || c), w(r2[7] || c), w(r2[9] || c), e2) : new d(c, c, c, c, c);
		}
		static file(t8) {
			let e2 = c;
			if ((i && (t8 = t8.replace(/\\/g, f2)), t8[0] === f2 && t8[1] === f2)) {
				const r2 = t8.indexOf(f2, 2);
				-1 === r2 ? ((e2 = t8.substring(2)), (t8 = f2)) : ((e2 = t8.substring(2, r2)), (t8 = t8.substring(r2) || f2));
			}
			return new d("file", e2, t8, c, c);
		}
		static from(t8) {
			const e2 = new d(t8.scheme, t8.authority, t8.path, t8.query, t8.fragment);
			return a2(e2, true), e2;
		}
		toString(t8 = false) {
			return b(this, t8);
		}
		toJSON() {
			return this;
		}
		static revive(t8) {
			if (t8) {
				if (t8 instanceof l) return t8;
				{
					const e2 = new d(t8);
					return (e2._formatted = t8.external), (e2._fsPath = t8._sep === g ? t8.fsPath : null), e2;
				}
			}
			return t8;
		}
	}
	const g = i ? 1 : void 0;
	class d extends l {
		static {
			__name(this, "d");
		}
		_formatted = null;
		_fsPath = null;
		get fsPath() {
			return this._fsPath || (this._fsPath = v(this, false)), this._fsPath;
		}
		toString(t8 = false) {
			return t8 ? b(this, true) : (this._formatted || (this._formatted = b(this, false)), this._formatted);
		}
		toJSON() {
			const t8 = { $mid: 1 };
			return (
				this._fsPath && ((t8.fsPath = this._fsPath), (t8._sep = g)),
				this._formatted && (t8.external = this._formatted),
				this.path && (t8.path = this.path),
				this.scheme && (t8.scheme = this.scheme),
				this.authority && (t8.authority = this.authority),
				this.query && (t8.query = this.query),
				this.fragment && (t8.fragment = this.fragment),
				t8
			);
		}
	}
	const p = {
		58: "%3A",
		47: "%2F",
		63: "%3F",
		35: "%23",
		91: "%5B",
		93: "%5D",
		64: "%40",
		33: "%21",
		36: "%24",
		38: "%26",
		39: "%27",
		40: "%28",
		41: "%29",
		42: "%2A",
		43: "%2B",
		44: "%2C",
		59: "%3B",
		61: "%3D",
		32: "%20",
	};
	function m(t8, e2, r2) {
		let n2,
			i2 = -1;
		for (let o2 = 0; o2 < t8.length; o2++) {
			const s2 = t8.charCodeAt(o2);
			if (
				(s2 >= 97 && s2 <= 122) ||
				(s2 >= 65 && s2 <= 90) ||
				(s2 >= 48 && s2 <= 57) ||
				45 === s2 ||
				46 === s2 ||
				95 === s2 ||
				126 === s2 ||
				(e2 && 47 === s2) ||
				(r2 && 91 === s2) ||
				(r2 && 93 === s2) ||
				(r2 && 58 === s2)
			)
				-1 !== i2 && ((n2 += encodeURIComponent(t8.substring(i2, o2))), (i2 = -1)), void 0 !== n2 && (n2 += t8.charAt(o2));
			else {
				void 0 === n2 && (n2 = t8.substr(0, o2));
				const e3 = p[s2];
				void 0 !== e3
					? (-1 !== i2 && ((n2 += encodeURIComponent(t8.substring(i2, o2))), (i2 = -1)), (n2 += e3))
					: -1 === i2 && (i2 = o2);
			}
		}
		return -1 !== i2 && (n2 += encodeURIComponent(t8.substring(i2))), void 0 !== n2 ? n2 : t8;
	}
	__name(m, "m");
	function y(t8) {
		let e2;
		for (let r2 = 0; r2 < t8.length; r2++) {
			const n2 = t8.charCodeAt(r2);
			35 === n2 || 63 === n2 ? (void 0 === e2 && (e2 = t8.substr(0, r2)), (e2 += p[n2])) : void 0 !== e2 && (e2 += t8[r2]);
		}
		return void 0 !== e2 ? e2 : t8;
	}
	__name(y, "y");
	function v(t8, e2) {
		let r2;
		return (
			(r2 =
				t8.authority && t8.path.length > 1 && "file" === t8.scheme
					? `//${t8.authority}${t8.path}`
					: 47 === t8.path.charCodeAt(0) &&
							((t8.path.charCodeAt(1) >= 65 && t8.path.charCodeAt(1) <= 90) ||
								(t8.path.charCodeAt(1) >= 97 && t8.path.charCodeAt(1) <= 122)) &&
							58 === t8.path.charCodeAt(2)
						? e2
							? t8.path.substr(1)
							: t8.path[1].toLowerCase() + t8.path.substr(2)
						: t8.path),
			i && (r2 = r2.replace(/\//g, "\\")),
			r2
		);
	}
	__name(v, "v");
	function b(t8, e2) {
		const r2 = e2 ? y : m;
		let n2 = "",
			{ scheme: i2, authority: o2, path: s2, query: h2, fragment: a3 } = t8;
		if ((i2 && ((n2 += i2), (n2 += ":")), (o2 || "file" === i2) && ((n2 += f2), (n2 += f2)), o2)) {
			let t9 = o2.indexOf("@");
			if (-1 !== t9) {
				const e3 = o2.substr(0, t9);
				(o2 = o2.substr(t9 + 1)),
					(t9 = e3.lastIndexOf(":")),
					-1 === t9
						? (n2 += r2(e3, false, false))
						: ((n2 += r2(e3.substr(0, t9), false, false)), (n2 += ":"), (n2 += r2(e3.substr(t9 + 1), false, true))),
					(n2 += "@");
			}
			(o2 = o2.toLowerCase()),
				(t9 = o2.lastIndexOf(":")),
				-1 === t9 ? (n2 += r2(o2, false, true)) : ((n2 += r2(o2.substr(0, t9), false, true)), (n2 += o2.substr(t9)));
		}
		if (s2) {
			if (s2.length >= 3 && 47 === s2.charCodeAt(0) && 58 === s2.charCodeAt(2)) {
				const t9 = s2.charCodeAt(1);
				t9 >= 65 && t9 <= 90 && (s2 = `/${String.fromCharCode(t9 + 32)}:${s2.substr(3)}`);
			} else if (s2.length >= 2 && 58 === s2.charCodeAt(1)) {
				const t9 = s2.charCodeAt(0);
				t9 >= 65 && t9 <= 90 && (s2 = `${String.fromCharCode(t9 + 32)}:${s2.substr(2)}`);
			}
			n2 += r2(s2, true, false);
		}
		return (
			h2 && ((n2 += "?"), (n2 += r2(h2, false, false))), a3 && ((n2 += "#"), (n2 += e2 ? a3 : m(a3, false, false))), n2
		);
	}
	__name(b, "b");
	function C(t8) {
		try {
			return decodeURIComponent(t8);
		} catch {
			return t8.length > 3 ? t8.substr(0, 3) + C(t8.substr(3)) : t8;
		}
	}
	__name(C, "C");
	const A2 = /(%[0-9A-Za-z][0-9A-Za-z])+/g;
	function w(t8) {
		return t8.match(A2) ? t8.replace(A2, (t9) => C(t9)) : t8;
	}
	__name(w, "w");
	var x = r(975);
	const P = x.posix || x,
		_ = "/";
	var I;
	!(function (t8) {
		(t8.joinPath = function (t9, ...e2) {
			return t9.with({ path: P.join(t9.path, ...e2) });
		}),
			(t8.resolvePath = function (t9, ...e2) {
				let r2 = t9.path,
					n2 = false;
				r2[0] !== _ && ((r2 = _ + r2), (n2 = true));
				let i2 = P.resolve(r2, ...e2);
				return n2 && i2[0] === _ && !t9.authority && (i2 = i2.substring(1)), t9.with({ path: i2 });
			}),
			(t8.dirname = function (t9) {
				if (0 === t9.path.length || t9.path === _) return t9;
				let e2 = P.dirname(t9.path);
				return 1 === e2.length && 46 === e2.charCodeAt(0) && (e2 = ""), t9.with({ path: e2 });
			}),
			(t8.basename = function (t9) {
				return P.basename(t9.path);
			}),
			(t8.extname = function (t9) {
				return P.extname(t9.path);
			});
	})(I || (I = {})),
		(LIB = n);
})();
var { URI: URI2, Utils } = LIB;

// ../../../node_modules/.pnpm/vscode-json-languageservice@5.6.3/node_modules/vscode-json-languageservice/lib/esm/parser/jsonParser.js
var l10n = __toESM(require_main5());
var formats = {
	"color-hex": {
		errorMessage: l10n.t("Invalid color format. Use #RGB, #RGBA, #RRGGBB or #RRGGBBAA."),
		pattern: /^#([0-9A-Fa-f]{3,4}|([0-9A-Fa-f]{2}){3,4})$/,
	},
	"date-time": {
		errorMessage: l10n.t("String is not a RFC3339 date-time."),
		pattern:
			/^(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])T([01][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9]|60)(\.[0-9]+)?(Z|(\+|-)([01][0-9]|2[0-3]):([0-5][0-9]))$/i,
	},
	date: {
		errorMessage: l10n.t("String is not a RFC3339 date."),
		pattern: /^(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/i,
	},
	time: {
		errorMessage: l10n.t("String is not a RFC3339 time."),
		pattern: /^([01][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9]|60)(\.[0-9]+)?(Z|(\+|-)([01][0-9]|2[0-3]):([0-5][0-9]))$/i,
	},
	email: {
		errorMessage: l10n.t("String is not an e-mail address."),
		pattern:
			/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}))$/,
	},
	hostname: {
		errorMessage: l10n.t("String is not a hostname."),
		pattern: /^(?=.{1,253}\.?$)[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[-0-9a-z]{0,61}[0-9a-z])?)*\.?$/i,
	},
	ipv4: {
		errorMessage: l10n.t("String is not an IPv4 address."),
		pattern: /^(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)$/,
	},
	ipv6: {
		errorMessage: l10n.t("String is not an IPv6 address."),
		pattern:
			/^((([0-9a-f]{1,4}:){7}([0-9a-f]{1,4}|:))|(([0-9a-f]{1,4}:){6}(:[0-9a-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){5}(((:[0-9a-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){4}(((:[0-9a-f]{1,4}){1,3})|((:[0-9a-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){3}(((:[0-9a-f]{1,4}){1,4})|((:[0-9a-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){2}(((:[0-9a-f]{1,4}){1,5})|((:[0-9a-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){1}(((:[0-9a-f]{1,4}){1,6})|((:[0-9a-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9a-f]{1,4}){1,7})|((:[0-9a-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))$/i,
	},
};
var ASTNodeImpl = class {
	static {
		__name(this, "ASTNodeImpl");
	}
	constructor(parent, offset, length = 0) {
		this.offset = offset;
		this.length = length;
		this.parent = parent;
	}
	get children() {
		return [];
	}
	toString() {
		return (
			"type: " +
			this.type +
			" (" +
			this.offset +
			"/" +
			this.length +
			")" +
			(this.parent ? " parent: {" + this.parent.toString() + "}" : "")
		);
	}
};
var NullASTNodeImpl = class extends ASTNodeImpl {
	static {
		__name(this, "NullASTNodeImpl");
	}
	constructor(parent, offset) {
		super(parent, offset);
		this.type = "null";
		this.value = null;
	}
};
var BooleanASTNodeImpl = class extends ASTNodeImpl {
	static {
		__name(this, "BooleanASTNodeImpl");
	}
	constructor(parent, boolValue, offset) {
		super(parent, offset);
		this.type = "boolean";
		this.value = boolValue;
	}
};
var ArrayASTNodeImpl = class extends ASTNodeImpl {
	static {
		__name(this, "ArrayASTNodeImpl");
	}
	constructor(parent, offset) {
		super(parent, offset);
		this.type = "array";
		this.items = [];
	}
	get children() {
		return this.items;
	}
};
var NumberASTNodeImpl = class extends ASTNodeImpl {
	static {
		__name(this, "NumberASTNodeImpl");
	}
	constructor(parent, offset) {
		super(parent, offset);
		this.type = "number";
		this.isInteger = true;
		this.value = Number.NaN;
	}
};
var StringASTNodeImpl = class extends ASTNodeImpl {
	static {
		__name(this, "StringASTNodeImpl");
	}
	constructor(parent, offset, length) {
		super(parent, offset, length);
		this.type = "string";
		this.value = "";
	}
};
var PropertyASTNodeImpl = class extends ASTNodeImpl {
	static {
		__name(this, "PropertyASTNodeImpl");
	}
	constructor(parent, offset, keyNode) {
		super(parent, offset);
		this.type = "property";
		this.colonOffset = -1;
		this.keyNode = keyNode;
	}
	get children() {
		return this.valueNode ? [this.keyNode, this.valueNode] : [this.keyNode];
	}
};
var ObjectASTNodeImpl = class extends ASTNodeImpl {
	static {
		__name(this, "ObjectASTNodeImpl");
	}
	constructor(parent, offset) {
		super(parent, offset);
		this.type = "object";
		this.properties = [];
	}
	get children() {
		return this.properties;
	}
};
function asSchema(schema) {
	if (isBoolean(schema)) {
		return schema
			? {}
			: {
					not: {},
				};
	}
	return schema;
}
__name(asSchema, "asSchema");
var EnumMatch;
(function (EnumMatch2) {
	EnumMatch2[(EnumMatch2["Key"] = 0)] = "Key";
	EnumMatch2[(EnumMatch2["Enum"] = 1)] = "Enum";
})(EnumMatch || (EnumMatch = {}));
var httpPrefix = `http://json-schema.org/`;
var httpsPrefix = `https://json-schema.org/`;
function normalizeId(id) {
	if (id.startsWith(httpPrefix)) {
		id = httpsPrefix + id.substring(httpPrefix.length);
	}
	try {
		return URI2.parse(id).toString(true);
	} catch (e) {
		return id;
	}
}
__name(normalizeId, "normalizeId");
function getSchemaDraftFromId(schemaId) {
	return schemaDraftFromId[normalizeId(schemaId)] ?? void 0;
}
__name(getSchemaDraftFromId, "getSchemaDraftFromId");
var schemaDraftFromId = {
	"https://json-schema.org/draft-03/schema": SchemaDraft.v3,
	"https://json-schema.org/draft-04/schema": SchemaDraft.v4,
	"https://json-schema.org/draft-06/schema": SchemaDraft.v6,
	"https://json-schema.org/draft-07/schema": SchemaDraft.v7,
	"https://json-schema.org/draft/2019-09/schema": SchemaDraft.v2019_09,
	"https://json-schema.org/draft/2020-12/schema": SchemaDraft.v2020_12,
};
var EvaluationContext = class EvaluationContext2 {
	static {
		__name(this, "EvaluationContext");
	}
	constructor(schemaDraft) {
		this.schemaDraft = schemaDraft;
	}
};
var SchemaCollector = class SchemaCollector2 {
	static {
		__name(this, "SchemaCollector");
	}
	constructor(focusOffset = -1, exclude) {
		this.focusOffset = focusOffset;
		this.exclude = exclude;
		this.schemas = [];
	}
	add(schema) {
		this.schemas.push(schema);
	}
	merge(other) {
		Array.prototype.push.apply(this.schemas, other.schemas);
	}
	include(node) {
		return (this.focusOffset === -1 || contains2(node, this.focusOffset)) && node !== this.exclude;
	}
	newSub() {
		return new SchemaCollector2(-1, this.exclude);
	}
};
var NoOpSchemaCollector = class NoOpSchemaCollector2 {
	static {
		__name(this, "NoOpSchemaCollector");
	}
	constructor() {}
	get schemas() {
		return [];
	}
	add(_schema) {}
	merge(_other) {}
	include(_node) {
		return true;
	}
	newSub() {
		return this;
	}
};
NoOpSchemaCollector.instance = new NoOpSchemaCollector();
var ValidationResult = class {
	static {
		__name(this, "ValidationResult");
	}
	constructor() {
		this.problems = [];
		this.propertiesMatches = 0;
		this.processedProperties = /* @__PURE__ */ new Set();
		this.propertiesValueMatches = 0;
		this.primaryValueMatches = 0;
		this.enumValueMatch = false;
		this.enumValues = void 0;
	}
	hasProblems() {
		return !!this.problems.length;
	}
	merge(validationResult) {
		this.problems = this.problems.concat(validationResult.problems);
		this.propertiesMatches += validationResult.propertiesMatches;
		this.propertiesValueMatches += validationResult.propertiesValueMatches;
		this.mergeProcessedProperties(validationResult);
	}
	mergeEnumValues(validationResult) {
		if (!this.enumValueMatch && !validationResult.enumValueMatch && this.enumValues && validationResult.enumValues) {
			this.enumValues = this.enumValues.concat(validationResult.enumValues);
		}
	}
	updateEnumMismatchProblemMessages() {
		if (!this.enumValueMatch && this.enumValues) {
			for (const error of this.problems) {
				if (error.code === ErrorCode.EnumValueMismatch) {
					error.message = l10n.t(
						"Value is not accepted. Valid values: {0}.",
						this.enumValues.map((v) => JSON.stringify(v)).join(", "),
					);
				}
			}
		}
	}
	mergePropertyMatch(propertyValidationResult) {
		this.problems = this.problems.concat(propertyValidationResult.problems);
		this.propertiesMatches++;
		if (
			propertyValidationResult.enumValueMatch ||
			(!propertyValidationResult.hasProblems() && propertyValidationResult.propertiesMatches)
		) {
			this.propertiesValueMatches++;
		}
		if (
			propertyValidationResult.enumValueMatch &&
			propertyValidationResult.enumValues &&
			propertyValidationResult.enumValues.length === 1
		) {
			this.primaryValueMatches++;
		}
	}
	mergeProcessedProperties(validationResult) {
		validationResult.processedProperties.forEach((p) => this.processedProperties.add(p));
	}
	compare(other) {
		const hasProblems = this.hasProblems();
		if (hasProblems !== other.hasProblems()) {
			return hasProblems ? -1 : 1;
		}
		if (this.enumValueMatch !== other.enumValueMatch) {
			return other.enumValueMatch ? -1 : 1;
		}
		if (this.primaryValueMatches !== other.primaryValueMatches) {
			return this.primaryValueMatches - other.primaryValueMatches;
		}
		if (this.propertiesValueMatches !== other.propertiesValueMatches) {
			return this.propertiesValueMatches - other.propertiesValueMatches;
		}
		return this.propertiesMatches - other.propertiesMatches;
	}
};
function newJSONDocument(root, diagnostics = [], comments = []) {
	return new JSONDocument(root, diagnostics, comments);
}
__name(newJSONDocument, "newJSONDocument");
function getNodeValue3(node) {
	return getNodeValue2(node);
}
__name(getNodeValue3, "getNodeValue");
function getNodePath3(node) {
	return getNodePath2(node);
}
__name(getNodePath3, "getNodePath");
function contains2(node, offset, includeRightBound = false) {
	return (
		(offset >= node.offset && offset < node.offset + node.length) ||
		(includeRightBound && offset === node.offset + node.length)
	);
}
__name(contains2, "contains");
var JSONDocument = class {
	static {
		__name(this, "JSONDocument");
	}
	constructor(root, syntaxErrors = [], comments = []) {
		this.root = root;
		this.syntaxErrors = syntaxErrors;
		this.comments = comments;
	}
	getNodeFromOffset(offset, includeRightBound = false) {
		if (this.root) {
			return findNodeAtOffset2(this.root, offset, includeRightBound);
		}
		return void 0;
	}
	visit(visitor) {
		if (this.root) {
			const doVisit = /* @__PURE__ */ __name((node) => {
				let ctn = visitor(node);
				const children = node.children;
				if (Array.isArray(children)) {
					for (let i = 0; i < children.length && ctn; i++) {
						ctn = doVisit(children[i]);
					}
				}
				return ctn;
			}, "doVisit");
			doVisit(this.root);
		}
	}
	validate(textDocument, schema, severity = DiagnosticSeverity2.Warning, schemaDraft) {
		if (this.root && schema) {
			const validationResult = new ValidationResult();
			validate(
				this.root,
				schema,
				validationResult,
				NoOpSchemaCollector.instance,
				new EvaluationContext(schemaDraft ?? getSchemaDraft(schema)),
			);
			return validationResult.problems.map((p) => {
				const range = Range2.create(
					textDocument.positionAt(p.location.offset),
					textDocument.positionAt(p.location.offset + p.location.length),
				);
				return Diagnostic.create(range, p.message, p.severity ?? severity, p.code);
			});
		}
		return void 0;
	}
	getMatchingSchemas(schema, focusOffset = -1, exclude) {
		if (this.root && schema) {
			const matchingSchemas = new SchemaCollector(focusOffset, exclude);
			const schemaDraft = getSchemaDraft(schema);
			const context = new EvaluationContext(schemaDraft);
			validate(this.root, schema, new ValidationResult(), matchingSchemas, context);
			return matchingSchemas.schemas;
		}
		return [];
	}
};
function getSchemaDraft(schema, fallBack = SchemaDraft.v2020_12) {
	let schemaId = schema.$schema;
	if (schemaId) {
		return getSchemaDraftFromId(schemaId) ?? fallBack;
	}
	return fallBack;
}
__name(getSchemaDraft, "getSchemaDraft");
function validate(n, schema, validationResult, matchingSchemas, context) {
	if (!n || !matchingSchemas.include(n)) {
		return;
	}
	if (n.type === "property") {
		return validate(n.valueNode, schema, validationResult, matchingSchemas, context);
	}
	const node = n;
	_validateNode();
	switch (node.type) {
		case "object":
			_validateObjectNode(node);
			break;
		case "array":
			_validateArrayNode(node);
			break;
		case "string":
			_validateStringNode(node);
			break;
		case "number":
			_validateNumberNode(node);
			break;
	}
	matchingSchemas.add({
		node,
		schema,
	});
	function _validateNode() {
		function matchesType(type) {
			return node.type === type || (type === "integer" && node.type === "number" && node.isInteger);
		}
		__name(matchesType, "matchesType");
		if (Array.isArray(schema.type)) {
			if (!schema.type.some(matchesType)) {
				validationResult.problems.push({
					location: {
						offset: node.offset,
						length: node.length,
					},
					message: schema.errorMessage || l10n.t("Incorrect type. Expected one of {0}.", schema.type.join(", ")),
				});
			}
		} else if (schema.type) {
			if (!matchesType(schema.type)) {
				validationResult.problems.push({
					location: {
						offset: node.offset,
						length: node.length,
					},
					message: schema.errorMessage || l10n.t('Incorrect type. Expected "{0}".', schema.type),
				});
			}
		}
		if (Array.isArray(schema.allOf)) {
			for (const subSchemaRef of schema.allOf) {
				const subValidationResult = new ValidationResult();
				const subMatchingSchemas = matchingSchemas.newSub();
				validate(node, asSchema(subSchemaRef), subValidationResult, subMatchingSchemas, context);
				validationResult.merge(subValidationResult);
				matchingSchemas.merge(subMatchingSchemas);
			}
		}
		const notSchema = asSchema(schema.not);
		if (notSchema) {
			const subValidationResult = new ValidationResult();
			const subMatchingSchemas = matchingSchemas.newSub();
			validate(node, notSchema, subValidationResult, subMatchingSchemas, context);
			if (!subValidationResult.hasProblems()) {
				validationResult.problems.push({
					location: {
						offset: node.offset,
						length: node.length,
					},
					message: schema.errorMessage || l10n.t("Matches a schema that is not allowed."),
				});
			}
			for (const ms of subMatchingSchemas.schemas) {
				ms.inverted = !ms.inverted;
				matchingSchemas.add(ms);
			}
		}
		const testAlternatives = /* @__PURE__ */ __name((alternatives, maxOneMatch) => {
			const matches = [];
			let bestMatch = void 0;
			for (const subSchemaRef of alternatives) {
				const subSchema = asSchema(subSchemaRef);
				const subValidationResult = new ValidationResult();
				const subMatchingSchemas = matchingSchemas.newSub();
				validate(node, subSchema, subValidationResult, subMatchingSchemas, context);
				if (!subValidationResult.hasProblems()) {
					matches.push(subSchema);
				}
				if (!bestMatch) {
					bestMatch = {
						schema: subSchema,
						validationResult: subValidationResult,
						matchingSchemas: subMatchingSchemas,
					};
				} else {
					if (!maxOneMatch && !subValidationResult.hasProblems() && !bestMatch.validationResult.hasProblems()) {
						bestMatch.matchingSchemas.merge(subMatchingSchemas);
						bestMatch.validationResult.propertiesMatches += subValidationResult.propertiesMatches;
						bestMatch.validationResult.propertiesValueMatches += subValidationResult.propertiesValueMatches;
						bestMatch.validationResult.mergeProcessedProperties(subValidationResult);
					} else {
						const compareResult = subValidationResult.compare(bestMatch.validationResult);
						if (compareResult > 0) {
							bestMatch = {
								schema: subSchema,
								validationResult: subValidationResult,
								matchingSchemas: subMatchingSchemas,
							};
						} else if (compareResult === 0) {
							bestMatch.matchingSchemas.merge(subMatchingSchemas);
							bestMatch.validationResult.mergeEnumValues(subValidationResult);
						}
					}
				}
			}
			if (matches.length > 1 && maxOneMatch) {
				validationResult.problems.push({
					location: {
						offset: node.offset,
						length: 1,
					},
					message: l10n.t("Matches multiple schemas when only one must validate."),
				});
			}
			if (bestMatch) {
				bestMatch.validationResult.updateEnumMismatchProblemMessages();
				validationResult.merge(bestMatch.validationResult);
				matchingSchemas.merge(bestMatch.matchingSchemas);
			}
			return matches.length;
		}, "testAlternatives");
		if (Array.isArray(schema.anyOf)) {
			testAlternatives(schema.anyOf, false);
		}
		if (Array.isArray(schema.oneOf)) {
			testAlternatives(schema.oneOf, true);
		}
		const testBranch = /* @__PURE__ */ __name((schema2) => {
			const subValidationResult = new ValidationResult();
			const subMatchingSchemas = matchingSchemas.newSub();
			validate(node, asSchema(schema2), subValidationResult, subMatchingSchemas, context);
			validationResult.merge(subValidationResult);
			matchingSchemas.merge(subMatchingSchemas);
		}, "testBranch");
		const testCondition = /* @__PURE__ */ __name((ifSchema2, thenSchema, elseSchema) => {
			const subSchema = asSchema(ifSchema2);
			const subValidationResult = new ValidationResult();
			const subMatchingSchemas = matchingSchemas.newSub();
			validate(node, subSchema, subValidationResult, subMatchingSchemas, context);
			matchingSchemas.merge(subMatchingSchemas);
			validationResult.mergeProcessedProperties(subValidationResult);
			if (!subValidationResult.hasProblems()) {
				if (thenSchema) {
					testBranch(thenSchema);
				}
			} else if (elseSchema) {
				testBranch(elseSchema);
			}
		}, "testCondition");
		const ifSchema = asSchema(schema.if);
		if (ifSchema) {
			testCondition(ifSchema, asSchema(schema.then), asSchema(schema.else));
		}
		if (Array.isArray(schema.enum)) {
			const val = getNodeValue3(node);
			let enumValueMatch = false;
			for (const e of schema.enum) {
				if (equals(val, e)) {
					enumValueMatch = true;
					break;
				}
			}
			validationResult.enumValues = schema.enum;
			validationResult.enumValueMatch = enumValueMatch;
			if (!enumValueMatch) {
				validationResult.problems.push({
					location: {
						offset: node.offset,
						length: node.length,
					},
					code: ErrorCode.EnumValueMismatch,
					message:
						schema.errorMessage ||
						l10n.t("Value is not accepted. Valid values: {0}.", schema.enum.map((v) => JSON.stringify(v)).join(", ")),
				});
			}
		}
		if (isDefined(schema.const)) {
			const val = getNodeValue3(node);
			if (!equals(val, schema.const)) {
				validationResult.problems.push({
					location: {
						offset: node.offset,
						length: node.length,
					},
					code: ErrorCode.EnumValueMismatch,
					message: schema.errorMessage || l10n.t("Value must be {0}.", JSON.stringify(schema.const)),
				});
				validationResult.enumValueMatch = false;
			} else {
				validationResult.enumValueMatch = true;
			}
			validationResult.enumValues = [schema.const];
		}
		let deprecationMessage = schema.deprecationMessage;
		if (deprecationMessage || schema.deprecated) {
			deprecationMessage = deprecationMessage || l10n.t("Value is deprecated");
			let targetNode = node.parent?.type === "property" ? node.parent : node;
			validationResult.problems.push({
				location: {
					offset: targetNode.offset,
					length: targetNode.length,
				},
				severity: DiagnosticSeverity2.Warning,
				message: deprecationMessage,
				code: ErrorCode.Deprecated,
			});
		}
	}
	__name(_validateNode, "_validateNode");
	function _validateNumberNode(node2) {
		const val = node2.value;
		function normalizeFloats(float) {
			const parts = /^(-?\d+)(?:\.(\d+))?(?:e([-+]\d+))?$/.exec(float.toString());
			return (
				parts && {
					value: Number(parts[1] + (parts[2] || "")),
					multiplier: (parts[2]?.length || 0) - (parseInt(parts[3]) || 0),
				}
			);
		}
		__name(normalizeFloats, "normalizeFloats");
		if (isNumber(schema.multipleOf)) {
			let remainder = -1;
			if (Number.isInteger(schema.multipleOf)) {
				remainder = val % schema.multipleOf;
			} else {
				let normMultipleOf = normalizeFloats(schema.multipleOf);
				let normValue = normalizeFloats(val);
				if (normMultipleOf && normValue) {
					const multiplier = 10 ** Math.abs(normValue.multiplier - normMultipleOf.multiplier);
					if (normValue.multiplier < normMultipleOf.multiplier) {
						normValue.value *= multiplier;
					} else {
						normMultipleOf.value *= multiplier;
					}
					remainder = normValue.value % normMultipleOf.value;
				}
			}
			if (remainder !== 0) {
				validationResult.problems.push({
					location: {
						offset: node2.offset,
						length: node2.length,
					},
					message: l10n.t("Value is not divisible by {0}.", schema.multipleOf),
				});
			}
		}
		function getExclusiveLimit(limit, exclusive) {
			if (isNumber(exclusive)) {
				return exclusive;
			}
			if (isBoolean(exclusive) && exclusive) {
				return limit;
			}
			return void 0;
		}
		__name(getExclusiveLimit, "getExclusiveLimit");
		function getLimit(limit, exclusive) {
			if (!isBoolean(exclusive) || !exclusive) {
				return limit;
			}
			return void 0;
		}
		__name(getLimit, "getLimit");
		const exclusiveMinimum = getExclusiveLimit(schema.minimum, schema.exclusiveMinimum);
		if (isNumber(exclusiveMinimum) && val <= exclusiveMinimum) {
			validationResult.problems.push({
				location: {
					offset: node2.offset,
					length: node2.length,
				},
				message: l10n.t("Value is below the exclusive minimum of {0}.", exclusiveMinimum),
			});
		}
		const exclusiveMaximum = getExclusiveLimit(schema.maximum, schema.exclusiveMaximum);
		if (isNumber(exclusiveMaximum) && val >= exclusiveMaximum) {
			validationResult.problems.push({
				location: {
					offset: node2.offset,
					length: node2.length,
				},
				message: l10n.t("Value is above the exclusive maximum of {0}.", exclusiveMaximum),
			});
		}
		const minimum = getLimit(schema.minimum, schema.exclusiveMinimum);
		if (isNumber(minimum) && val < minimum) {
			validationResult.problems.push({
				location: {
					offset: node2.offset,
					length: node2.length,
				},
				message: l10n.t("Value is below the minimum of {0}.", minimum),
			});
		}
		const maximum = getLimit(schema.maximum, schema.exclusiveMaximum);
		if (isNumber(maximum) && val > maximum) {
			validationResult.problems.push({
				location: {
					offset: node2.offset,
					length: node2.length,
				},
				message: l10n.t("Value is above the maximum of {0}.", maximum),
			});
		}
	}
	__name(_validateNumberNode, "_validateNumberNode");
	function _validateStringNode(node2) {
		if (isNumber(schema.minLength) && stringLength(node2.value) < schema.minLength) {
			validationResult.problems.push({
				location: {
					offset: node2.offset,
					length: node2.length,
				},
				message: l10n.t("String is shorter than the minimum length of {0}.", schema.minLength),
			});
		}
		if (isNumber(schema.maxLength) && stringLength(node2.value) > schema.maxLength) {
			validationResult.problems.push({
				location: {
					offset: node2.offset,
					length: node2.length,
				},
				message: l10n.t("String is longer than the maximum length of {0}.", schema.maxLength),
			});
		}
		if (isString(schema.pattern)) {
			const regex = extendedRegExp(schema.pattern);
			if (regex && !regex.test(node2.value)) {
				validationResult.problems.push({
					location: {
						offset: node2.offset,
						length: node2.length,
					},
					message:
						schema.patternErrorMessage ||
						schema.errorMessage ||
						l10n.t('String does not match the pattern of "{0}".', schema.pattern),
				});
			}
		}
		if (schema.format) {
			switch (schema.format) {
				case "uri":
				case "uri-reference":
					{
						let errorMessage;
						if (!node2.value) {
							errorMessage = l10n.t("URI expected.");
						} else {
							const match = /^(([^:/?#]+?):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/.exec(node2.value);
							if (!match) {
								errorMessage = l10n.t("URI is expected.");
							} else if (!match[2] && schema.format === "uri") {
								errorMessage = l10n.t("URI with a scheme is expected.");
							}
						}
						if (errorMessage) {
							validationResult.problems.push({
								location: {
									offset: node2.offset,
									length: node2.length,
								},
								message: schema.patternErrorMessage || schema.errorMessage || l10n.t("String is not a URI: {0}", errorMessage),
							});
						}
					}
					break;
				case "color-hex":
				case "date-time":
				case "date":
				case "time":
				case "email":
				case "hostname":
				case "ipv4":
				case "ipv6":
					const format4 = formats[schema.format];
					if (!node2.value || !format4.pattern.exec(node2.value)) {
						validationResult.problems.push({
							location: {
								offset: node2.offset,
								length: node2.length,
							},
							message: schema.patternErrorMessage || schema.errorMessage || format4.errorMessage,
						});
					}
				default:
			}
		}
	}
	__name(_validateStringNode, "_validateStringNode");
	function _validateArrayNode(node2) {
		let prefixItemsSchemas;
		let additionalItemSchema;
		if (context.schemaDraft >= SchemaDraft.v2020_12) {
			prefixItemsSchemas = schema.prefixItems;
			additionalItemSchema = !Array.isArray(schema.items) ? schema.items : void 0;
		} else {
			prefixItemsSchemas = Array.isArray(schema.items) ? schema.items : void 0;
			additionalItemSchema = !Array.isArray(schema.items) ? schema.items : schema.additionalItems;
		}
		let index = 0;
		if (prefixItemsSchemas !== void 0) {
			const max = Math.min(prefixItemsSchemas.length, node2.items.length);
			for (; index < max; index++) {
				const subSchemaRef = prefixItemsSchemas[index];
				const subSchema = asSchema(subSchemaRef);
				const itemValidationResult = new ValidationResult();
				const item = node2.items[index];
				if (item) {
					validate(item, subSchema, itemValidationResult, matchingSchemas, context);
					validationResult.mergePropertyMatch(itemValidationResult);
				}
				validationResult.processedProperties.add(String(index));
			}
		}
		if (additionalItemSchema !== void 0 && index < node2.items.length) {
			if (typeof additionalItemSchema === "boolean") {
				if (additionalItemSchema === false) {
					validationResult.problems.push({
						location: {
							offset: node2.offset,
							length: node2.length,
						},
						message: l10n.t("Array has too many items according to schema. Expected {0} or fewer.", index),
					});
				}
				for (; index < node2.items.length; index++) {
					validationResult.processedProperties.add(String(index));
					validationResult.propertiesValueMatches++;
				}
			} else {
				for (; index < node2.items.length; index++) {
					const itemValidationResult = new ValidationResult();
					validate(node2.items[index], additionalItemSchema, itemValidationResult, matchingSchemas, context);
					validationResult.mergePropertyMatch(itemValidationResult);
					validationResult.processedProperties.add(String(index));
				}
			}
		}
		const containsSchema = asSchema(schema.contains);
		if (containsSchema) {
			let containsCount = 0;
			for (let index2 = 0; index2 < node2.items.length; index2++) {
				const item = node2.items[index2];
				const itemValidationResult = new ValidationResult();
				validate(item, containsSchema, itemValidationResult, NoOpSchemaCollector.instance, context);
				if (!itemValidationResult.hasProblems()) {
					containsCount++;
					if (context.schemaDraft >= SchemaDraft.v2020_12) {
						validationResult.processedProperties.add(String(index2));
					}
				}
			}
			if (containsCount === 0 && !isNumber(schema.minContains)) {
				validationResult.problems.push({
					location: {
						offset: node2.offset,
						length: node2.length,
					},
					message: schema.errorMessage || l10n.t("Array does not contain required item."),
				});
			}
			if (isNumber(schema.minContains) && containsCount < schema.minContains) {
				validationResult.problems.push({
					location: {
						offset: node2.offset,
						length: node2.length,
					},
					message:
						schema.errorMessage ||
						l10n.t("Array has too few items that match the contains contraint. Expected {0} or more.", schema.minContains),
				});
			}
			if (isNumber(schema.maxContains) && containsCount > schema.maxContains) {
				validationResult.problems.push({
					location: {
						offset: node2.offset,
						length: node2.length,
					},
					message:
						schema.errorMessage ||
						l10n.t("Array has too many items that match the contains contraint. Expected {0} or less.", schema.maxContains),
				});
			}
		}
		const unevaluatedItems = schema.unevaluatedItems;
		if (unevaluatedItems !== void 0) {
			for (let i = 0; i < node2.items.length; i++) {
				if (!validationResult.processedProperties.has(String(i))) {
					if (unevaluatedItems === false) {
						validationResult.problems.push({
							location: {
								offset: node2.offset,
								length: node2.length,
							},
							message: l10n.t("Item does not match any validation rule from the array."),
						});
					} else {
						const itemValidationResult = new ValidationResult();
						validate(node2.items[i], schema.unevaluatedItems, itemValidationResult, matchingSchemas, context);
						validationResult.mergePropertyMatch(itemValidationResult);
					}
				}
				validationResult.processedProperties.add(String(i));
				validationResult.propertiesValueMatches++;
			}
		}
		if (isNumber(schema.minItems) && node2.items.length < schema.minItems) {
			validationResult.problems.push({
				location: {
					offset: node2.offset,
					length: node2.length,
				},
				message: l10n.t("Array has too few items. Expected {0} or more.", schema.minItems),
			});
		}
		if (isNumber(schema.maxItems) && node2.items.length > schema.maxItems) {
			validationResult.problems.push({
				location: {
					offset: node2.offset,
					length: node2.length,
				},
				message: l10n.t("Array has too many items. Expected {0} or fewer.", schema.maxItems),
			});
		}
		if (schema.uniqueItems === true) {
			let hasDuplicates2 = function () {
				for (let i = 0; i < values.length - 1; i++) {
					const value = values[i];
					for (let j = i + 1; j < values.length; j++) {
						if (equals(value, values[j])) {
							return true;
						}
					}
				}
				return false;
			};
			var hasDuplicates = hasDuplicates2;
			__name(hasDuplicates2, "hasDuplicates");
			const values = getNodeValue3(node2);
			if (hasDuplicates2()) {
				validationResult.problems.push({
					location: {
						offset: node2.offset,
						length: node2.length,
					},
					message: l10n.t("Array has duplicate items."),
				});
			}
		}
	}
	__name(_validateArrayNode, "_validateArrayNode");
	function _validateObjectNode(node2) {
		const seenKeys = /* @__PURE__ */ Object.create(null);
		const unprocessedProperties = /* @__PURE__ */ new Set();
		for (const propertyNode of node2.properties) {
			const key = propertyNode.keyNode.value;
			seenKeys[key] = propertyNode.valueNode;
			unprocessedProperties.add(key);
		}
		if (Array.isArray(schema.required)) {
			for (const propertyName of schema.required) {
				if (!seenKeys[propertyName]) {
					const keyNode = node2.parent && node2.parent.type === "property" && node2.parent.keyNode;
					const location = keyNode
						? {
								offset: keyNode.offset,
								length: keyNode.length,
							}
						: {
								offset: node2.offset,
								length: 1,
							};
					validationResult.problems.push({
						location,
						message: l10n.t('Missing property "{0}".', propertyName),
					});
				}
			}
		}
		const propertyProcessed = /* @__PURE__ */ __name((prop) => {
			unprocessedProperties.delete(prop);
			validationResult.processedProperties.add(prop);
		}, "propertyProcessed");
		if (schema.properties) {
			for (const propertyName of Object.keys(schema.properties)) {
				propertyProcessed(propertyName);
				const propertySchema = schema.properties[propertyName];
				const child = seenKeys[propertyName];
				if (child) {
					if (isBoolean(propertySchema)) {
						if (!propertySchema) {
							const propertyNode = child.parent;
							validationResult.problems.push({
								location: {
									offset: propertyNode.keyNode.offset,
									length: propertyNode.keyNode.length,
								},
								message: schema.errorMessage || l10n.t("Property {0} is not allowed.", propertyName),
							});
						} else {
							validationResult.propertiesMatches++;
							validationResult.propertiesValueMatches++;
						}
					} else {
						const propertyValidationResult = new ValidationResult();
						validate(child, propertySchema, propertyValidationResult, matchingSchemas, context);
						validationResult.mergePropertyMatch(propertyValidationResult);
					}
				}
			}
		}
		if (schema.patternProperties) {
			for (const propertyPattern of Object.keys(schema.patternProperties)) {
				const regex = extendedRegExp(propertyPattern);
				if (regex) {
					const processed = [];
					for (const propertyName of unprocessedProperties) {
						if (regex.test(propertyName)) {
							processed.push(propertyName);
							const child = seenKeys[propertyName];
							if (child) {
								const propertySchema = schema.patternProperties[propertyPattern];
								if (isBoolean(propertySchema)) {
									if (!propertySchema) {
										const propertyNode = child.parent;
										validationResult.problems.push({
											location: {
												offset: propertyNode.keyNode.offset,
												length: propertyNode.keyNode.length,
											},
											message: schema.errorMessage || l10n.t("Property {0} is not allowed.", propertyName),
										});
									} else {
										validationResult.propertiesMatches++;
										validationResult.propertiesValueMatches++;
									}
								} else {
									const propertyValidationResult = new ValidationResult();
									validate(child, propertySchema, propertyValidationResult, matchingSchemas, context);
									validationResult.mergePropertyMatch(propertyValidationResult);
								}
							}
						}
					}
					processed.forEach(propertyProcessed);
				}
			}
		}
		const additionalProperties = schema.additionalProperties;
		if (additionalProperties !== void 0) {
			for (const propertyName of unprocessedProperties) {
				propertyProcessed(propertyName);
				const child = seenKeys[propertyName];
				if (child) {
					if (additionalProperties === false) {
						const propertyNode = child.parent;
						validationResult.problems.push({
							location: {
								offset: propertyNode.keyNode.offset,
								length: propertyNode.keyNode.length,
							},
							message: schema.errorMessage || l10n.t("Property {0} is not allowed.", propertyName),
						});
					} else if (additionalProperties !== true) {
						const propertyValidationResult = new ValidationResult();
						validate(child, additionalProperties, propertyValidationResult, matchingSchemas, context);
						validationResult.mergePropertyMatch(propertyValidationResult);
					}
				}
			}
		}
		const unevaluatedProperties = schema.unevaluatedProperties;
		if (unevaluatedProperties !== void 0) {
			const processed = [];
			for (const propertyName of unprocessedProperties) {
				if (!validationResult.processedProperties.has(propertyName)) {
					processed.push(propertyName);
					const child = seenKeys[propertyName];
					if (child) {
						if (unevaluatedProperties === false) {
							const propertyNode = child.parent;
							validationResult.problems.push({
								location: {
									offset: propertyNode.keyNode.offset,
									length: propertyNode.keyNode.length,
								},
								message: schema.errorMessage || l10n.t("Property {0} is not allowed.", propertyName),
							});
						} else if (unevaluatedProperties !== true) {
							const propertyValidationResult = new ValidationResult();
							validate(child, unevaluatedProperties, propertyValidationResult, matchingSchemas, context);
							validationResult.mergePropertyMatch(propertyValidationResult);
						}
					}
				}
			}
			processed.forEach(propertyProcessed);
		}
		if (isNumber(schema.maxProperties)) {
			if (node2.properties.length > schema.maxProperties) {
				validationResult.problems.push({
					location: {
						offset: node2.offset,
						length: node2.length,
					},
					message: l10n.t("Object has more properties than limit of {0}.", schema.maxProperties),
				});
			}
		}
		if (isNumber(schema.minProperties)) {
			if (node2.properties.length < schema.minProperties) {
				validationResult.problems.push({
					location: {
						offset: node2.offset,
						length: node2.length,
					},
					message: l10n.t("Object has fewer properties than the required number of {0}", schema.minProperties),
				});
			}
		}
		if (schema.dependentRequired) {
			for (const key in schema.dependentRequired) {
				const prop = seenKeys[key];
				const propertyDeps = schema.dependentRequired[key];
				if (prop && Array.isArray(propertyDeps)) {
					_validatePropertyDependencies(key, propertyDeps);
				}
			}
		}
		if (schema.dependentSchemas) {
			for (const key in schema.dependentSchemas) {
				const prop = seenKeys[key];
				const propertyDeps = schema.dependentSchemas[key];
				if (prop && isObject(propertyDeps)) {
					_validatePropertyDependencies(key, propertyDeps);
				}
			}
		}
		if (schema.dependencies) {
			for (const key in schema.dependencies) {
				const prop = seenKeys[key];
				if (prop) {
					_validatePropertyDependencies(key, schema.dependencies[key]);
				}
			}
		}
		const propertyNames = asSchema(schema.propertyNames);
		if (propertyNames) {
			for (const f2 of node2.properties) {
				const key = f2.keyNode;
				if (key) {
					validate(key, propertyNames, validationResult, NoOpSchemaCollector.instance, context);
				}
			}
		}
		function _validatePropertyDependencies(key, propertyDep) {
			if (Array.isArray(propertyDep)) {
				for (const requiredProp of propertyDep) {
					if (!seenKeys[requiredProp]) {
						validationResult.problems.push({
							location: {
								offset: node2.offset,
								length: node2.length,
							},
							message: l10n.t("Object is missing property {0} required by property {1}.", requiredProp, key),
						});
					} else {
						validationResult.propertiesValueMatches++;
					}
				}
			} else {
				const propertySchema = asSchema(propertyDep);
				if (propertySchema) {
					const propertyValidationResult = new ValidationResult();
					validate(node2, propertySchema, propertyValidationResult, matchingSchemas, context);
					validationResult.mergePropertyMatch(propertyValidationResult);
				}
			}
		}
		__name(_validatePropertyDependencies, "_validatePropertyDependencies");
	}
	__name(_validateObjectNode, "_validateObjectNode");
}
__name(validate, "validate");
function parse3(textDocument, config) {
	const problems = [];
	let lastProblemOffset = -1;
	const text = textDocument.getText();
	const scanner = createScanner2(text, false);
	const commentRanges = config && config.collectComments ? [] : void 0;
	function _scanNext() {
		while (true) {
			const token2 = scanner.scan();
			_checkScanError();
			switch (token2) {
				case 12:
				case 13:
					if (Array.isArray(commentRanges)) {
						commentRanges.push(
							Range2.create(
								textDocument.positionAt(scanner.getTokenOffset()),
								textDocument.positionAt(scanner.getTokenOffset() + scanner.getTokenLength()),
							),
						);
					}
					break;
				case 15:
				case 14:
					break;
				default:
					return token2;
			}
		}
	}
	__name(_scanNext, "_scanNext");
	function _accept(token2) {
		if (scanner.getToken() === token2) {
			_scanNext();
			return true;
		}
		return false;
	}
	__name(_accept, "_accept");
	function _errorAtRange(message, code, startOffset, endOffset, severity = DiagnosticSeverity2.Error) {
		if (problems.length === 0 || startOffset !== lastProblemOffset) {
			const range = Range2.create(textDocument.positionAt(startOffset), textDocument.positionAt(endOffset));
			problems.push(Diagnostic.create(range, message, severity, code, textDocument.languageId));
			lastProblemOffset = startOffset;
		}
	}
	__name(_errorAtRange, "_errorAtRange");
	function _error(message, code, node = void 0, skipUntilAfter = [], skipUntil = []) {
		let start = scanner.getTokenOffset();
		let end = scanner.getTokenOffset() + scanner.getTokenLength();
		if (start === end && start > 0) {
			start--;
			while (start > 0 && /\s/.test(text.charAt(start))) {
				start--;
			}
			end = start + 1;
		}
		_errorAtRange(message, code, start, end);
		if (node) {
			_finalize(node, false);
		}
		if (skipUntilAfter.length + skipUntil.length > 0) {
			let token2 = scanner.getToken();
			while (token2 !== 17) {
				if (skipUntilAfter.indexOf(token2) !== -1) {
					_scanNext();
					break;
				} else if (skipUntil.indexOf(token2) !== -1) {
					break;
				}
				token2 = _scanNext();
			}
		}
		return node;
	}
	__name(_error, "_error");
	function _checkScanError() {
		switch (scanner.getTokenError()) {
			case 4:
				_error(l10n.t("Invalid unicode sequence in string."), ErrorCode.InvalidUnicode);
				return true;
			case 5:
				_error(l10n.t("Invalid escape character in string."), ErrorCode.InvalidEscapeCharacter);
				return true;
			case 3:
				_error(l10n.t("Unexpected end of number."), ErrorCode.UnexpectedEndOfNumber);
				return true;
			case 1:
				_error(l10n.t("Unexpected end of comment."), ErrorCode.UnexpectedEndOfComment);
				return true;
			case 2:
				_error(l10n.t("Unexpected end of string."), ErrorCode.UnexpectedEndOfString);
				return true;
			case 6:
				_error(l10n.t("Invalid characters in string. Control characters must be escaped."), ErrorCode.InvalidCharacter);
				return true;
		}
		return false;
	}
	__name(_checkScanError, "_checkScanError");
	function _finalize(node, scanNext) {
		node.length = scanner.getTokenOffset() + scanner.getTokenLength() - node.offset;
		if (scanNext) {
			_scanNext();
		}
		return node;
	}
	__name(_finalize, "_finalize");
	function _parseArray(parent) {
		if (scanner.getToken() !== 3) {
			return void 0;
		}
		const node = new ArrayASTNodeImpl(parent, scanner.getTokenOffset());
		_scanNext();
		const count = 0;
		let needsComma = false;
		while (scanner.getToken() !== 4 && scanner.getToken() !== 17) {
			if (scanner.getToken() === 5) {
				if (!needsComma) {
					_error(l10n.t("Value expected"), ErrorCode.ValueExpected);
				}
				const commaOffset = scanner.getTokenOffset();
				_scanNext();
				if (scanner.getToken() === 4) {
					if (needsComma) {
						_errorAtRange(l10n.t("Trailing comma"), ErrorCode.TrailingComma, commaOffset, commaOffset + 1);
					}
					continue;
				}
			} else if (needsComma) {
				_error(l10n.t("Expected comma"), ErrorCode.CommaExpected);
			}
			const item = _parseValue(node);
			if (!item) {
				_error(
					l10n.t("Value expected"),
					ErrorCode.ValueExpected,
					void 0,
					[],
					[
						4,
						5,
						/* Json.SyntaxKind.CommaToken */
					],
				);
			} else {
				node.items.push(item);
			}
			needsComma = true;
		}
		if (scanner.getToken() !== 4) {
			return _error(l10n.t("Expected comma or closing bracket"), ErrorCode.CommaOrCloseBacketExpected, node);
		}
		return _finalize(node, true);
	}
	__name(_parseArray, "_parseArray");
	const keyPlaceholder = new StringASTNodeImpl(void 0, 0, 0);
	function _parseProperty(parent, keysSeen) {
		const node = new PropertyASTNodeImpl(parent, scanner.getTokenOffset(), keyPlaceholder);
		let key = _parseString(node);
		if (!key) {
			if (scanner.getToken() === 16) {
				_error(l10n.t("Property keys must be doublequoted"), ErrorCode.PropertyKeysMustBeDoublequoted);
				const keyNode = new StringASTNodeImpl(node, scanner.getTokenOffset(), scanner.getTokenLength());
				keyNode.value = scanner.getTokenValue();
				key = keyNode;
				_scanNext();
			} else {
				return void 0;
			}
		}
		node.keyNode = key;
		if (key.value !== "//") {
			const seen = keysSeen[key.value];
			if (seen) {
				_errorAtRange(
					l10n.t("Duplicate object key"),
					ErrorCode.DuplicateKey,
					node.keyNode.offset,
					node.keyNode.offset + node.keyNode.length,
					DiagnosticSeverity2.Warning,
				);
				if (isObject(seen)) {
					_errorAtRange(
						l10n.t("Duplicate object key"),
						ErrorCode.DuplicateKey,
						seen.keyNode.offset,
						seen.keyNode.offset + seen.keyNode.length,
						DiagnosticSeverity2.Warning,
					);
				}
				keysSeen[key.value] = true;
			} else {
				keysSeen[key.value] = node;
			}
		}
		if (scanner.getToken() === 6) {
			node.colonOffset = scanner.getTokenOffset();
			_scanNext();
		} else {
			_error(l10n.t("Colon expected"), ErrorCode.ColonExpected);
			if (
				scanner.getToken() === 10 &&
				textDocument.positionAt(key.offset + key.length).line < textDocument.positionAt(scanner.getTokenOffset()).line
			) {
				node.length = key.length;
				return node;
			}
		}
		const value = _parseValue(node);
		if (!value) {
			return _error(
				l10n.t("Value expected"),
				ErrorCode.ValueExpected,
				node,
				[],
				[
					2,
					5,
					/* Json.SyntaxKind.CommaToken */
				],
			);
		}
		node.valueNode = value;
		node.length = value.offset + value.length - node.offset;
		return node;
	}
	__name(_parseProperty, "_parseProperty");
	function _parseObject(parent) {
		if (scanner.getToken() !== 1) {
			return void 0;
		}
		const node = new ObjectASTNodeImpl(parent, scanner.getTokenOffset());
		const keysSeen = /* @__PURE__ */ Object.create(null);
		_scanNext();
		let needsComma = false;
		while (scanner.getToken() !== 2 && scanner.getToken() !== 17) {
			if (scanner.getToken() === 5) {
				if (!needsComma) {
					_error(l10n.t("Property expected"), ErrorCode.PropertyExpected);
				}
				const commaOffset = scanner.getTokenOffset();
				_scanNext();
				if (scanner.getToken() === 2) {
					if (needsComma) {
						_errorAtRange(l10n.t("Trailing comma"), ErrorCode.TrailingComma, commaOffset, commaOffset + 1);
					}
					continue;
				}
			} else if (needsComma) {
				_error(l10n.t("Expected comma"), ErrorCode.CommaExpected);
			}
			const property = _parseProperty(node, keysSeen);
			if (!property) {
				_error(
					l10n.t("Property expected"),
					ErrorCode.PropertyExpected,
					void 0,
					[],
					[
						2,
						5,
						/* Json.SyntaxKind.CommaToken */
					],
				);
			} else {
				node.properties.push(property);
			}
			needsComma = true;
		}
		if (scanner.getToken() !== 2) {
			return _error(l10n.t("Expected comma or closing brace"), ErrorCode.CommaOrCloseBraceExpected, node);
		}
		return _finalize(node, true);
	}
	__name(_parseObject, "_parseObject");
	function _parseString(parent) {
		if (scanner.getToken() !== 10) {
			return void 0;
		}
		const node = new StringASTNodeImpl(parent, scanner.getTokenOffset());
		node.value = scanner.getTokenValue();
		return _finalize(node, true);
	}
	__name(_parseString, "_parseString");
	function _parseNumber(parent) {
		if (scanner.getToken() !== 11) {
			return void 0;
		}
		const node = new NumberASTNodeImpl(parent, scanner.getTokenOffset());
		if (scanner.getTokenError() === 0) {
			const tokenValue = scanner.getTokenValue();
			try {
				const numberValue = JSON.parse(tokenValue);
				if (!isNumber(numberValue)) {
					return _error(l10n.t("Invalid number format."), ErrorCode.Undefined, node);
				}
				node.value = numberValue;
			} catch (e) {
				return _error(l10n.t("Invalid number format."), ErrorCode.Undefined, node);
			}
			node.isInteger = tokenValue.indexOf(".") === -1;
		}
		return _finalize(node, true);
	}
	__name(_parseNumber, "_parseNumber");
	function _parseLiteral(parent) {
		let node;
		switch (scanner.getToken()) {
			case 7:
				return _finalize(new NullASTNodeImpl(parent, scanner.getTokenOffset()), true);
			case 8:
				return _finalize(new BooleanASTNodeImpl(parent, true, scanner.getTokenOffset()), true);
			case 9:
				return _finalize(new BooleanASTNodeImpl(parent, false, scanner.getTokenOffset()), true);
			default:
				return void 0;
		}
	}
	__name(_parseLiteral, "_parseLiteral");
	function _parseValue(parent) {
		return (
			_parseArray(parent) || _parseObject(parent) || _parseString(parent) || _parseNumber(parent) || _parseLiteral(parent)
		);
	}
	__name(_parseValue, "_parseValue");
	let _root = void 0;
	const token = _scanNext();
	if (token !== 17) {
		_root = _parseValue(_root);
		if (!_root) {
			_error(l10n.t("Expected a JSON object, array or literal."), ErrorCode.Undefined);
		} else if (scanner.getToken() !== 17) {
			_error(l10n.t("End of file expected."), ErrorCode.Undefined);
		}
	}
	return new JSONDocument(_root, problems, commentRanges);
}
__name(parse3, "parse");

// ../../../node_modules/.pnpm/vscode-json-languageservice@5.6.3/node_modules/vscode-json-languageservice/lib/esm/utils/json.js
init_cjs_shims();
function stringifyObject(obj, indent, stringifyLiteral) {
	if (obj !== null && typeof obj === "object") {
		const newIndent = indent + "	";
		if (Array.isArray(obj)) {
			if (obj.length === 0) {
				return "[]";
			}
			let result = "[\n";
			for (let i = 0; i < obj.length; i++) {
				result += newIndent + stringifyObject(obj[i], newIndent, stringifyLiteral);
				if (i < obj.length - 1) {
					result += ",";
				}
				result += "\n";
			}
			result += indent + "]";
			return result;
		} else {
			const keys = Object.keys(obj);
			if (keys.length === 0) {
				return "{}";
			}
			let result = "{\n";
			for (let i = 0; i < keys.length; i++) {
				const key = keys[i];
				result += newIndent + JSON.stringify(key) + ": " + stringifyObject(obj[key], newIndent, stringifyLiteral);
				if (i < keys.length - 1) {
					result += ",";
				}
				result += "\n";
			}
			result += indent + "}";
			return result;
		}
	}
	return stringifyLiteral(obj);
}
__name(stringifyObject, "stringifyObject");

// ../../../node_modules/.pnpm/vscode-json-languageservice@5.6.3/node_modules/vscode-json-languageservice/lib/esm/services/jsonCompletion.js
var l10n2 = __toESM(require_main5());
var valueCommitCharacters = [",", "}", "]"];
var propertyCommitCharacters = [":"];
var JSONCompletion = class {
	static {
		__name(this, "JSONCompletion");
	}
	constructor(schemaService, contributions = [], promiseConstructor = Promise, clientCapabilities = {}) {
		this.schemaService = schemaService;
		this.contributions = contributions;
		this.promiseConstructor = promiseConstructor;
		this.clientCapabilities = clientCapabilities;
	}
	doResolve(item) {
		for (let i = this.contributions.length - 1; i >= 0; i--) {
			const resolveCompletion = this.contributions[i].resolveCompletion;
			if (resolveCompletion) {
				const resolver = resolveCompletion(item);
				if (resolver) {
					return resolver;
				}
			}
		}
		return this.promiseConstructor.resolve(item);
	}
	doComplete(document2, position, doc) {
		const result = {
			items: [],
			isIncomplete: false,
		};
		const text = document2.getText();
		const offset = document2.offsetAt(position);
		let node = doc.getNodeFromOffset(offset, true);
		if (this.isInComment(document2, node ? node.offset : 0, offset)) {
			return Promise.resolve(result);
		}
		if (node && offset === node.offset + node.length && offset > 0) {
			const ch = text[offset - 1];
			if ((node.type === "object" && ch === "}") || (node.type === "array" && ch === "]")) {
				node = node.parent;
			}
		}
		const currentWord = this.getCurrentWord(document2, offset);
		let overwriteRange;
		if (node && (node.type === "string" || node.type === "number" || node.type === "boolean" || node.type === "null")) {
			overwriteRange = Range2.create(document2.positionAt(node.offset), document2.positionAt(node.offset + node.length));
		} else {
			let overwriteStart = offset - currentWord.length;
			if (overwriteStart > 0 && text[overwriteStart - 1] === '"') {
				overwriteStart--;
			}
			overwriteRange = Range2.create(document2.positionAt(overwriteStart), position);
		}
		const supportsCommitCharacters = false;
		const proposed = /* @__PURE__ */ new Map();
		const collector = {
			add: /* @__PURE__ */ __name((suggestion) => {
				let label = suggestion.label;
				const existing = proposed.get(label);
				if (!existing) {
					label = label.replace(/[\n]/g, "\u21B5");
					if (label.length > 60) {
						const shortendedLabel = label.substr(0, 57).trim() + "...";
						if (!proposed.has(shortendedLabel)) {
							label = shortendedLabel;
						}
					}
					suggestion.textEdit = TextEdit.replace(overwriteRange, suggestion.insertText);
					if (supportsCommitCharacters) {
						suggestion.commitCharacters =
							suggestion.kind === CompletionItemKind.Property ? propertyCommitCharacters : valueCommitCharacters;
					}
					suggestion.label = label;
					proposed.set(label, suggestion);
					result.items.push(suggestion);
				} else {
					if (!existing.documentation) {
						existing.documentation = suggestion.documentation;
					}
					if (!existing.detail) {
						existing.detail = suggestion.detail;
					}
					if (!existing.labelDetails) {
						existing.labelDetails = suggestion.labelDetails;
					}
				}
			}, "add"),
			setAsIncomplete: /* @__PURE__ */ __name(() => {
				result.isIncomplete = true;
			}, "setAsIncomplete"),
			error: /* @__PURE__ */ __name((message) => {
				console.error(message);
			}, "error"),
			getNumberOfProposals: /* @__PURE__ */ __name(() => {
				return result.items.length;
			}, "getNumberOfProposals"),
		};
		return this.schemaService.getSchemaForResource(document2.uri, doc).then((schema) => {
			const collectionPromises = [];
			let addValue = true;
			let currentKey = "";
			let currentProperty = void 0;
			if (node) {
				if (node.type === "string") {
					const parent = node.parent;
					if (parent && parent.type === "property" && parent.keyNode === node) {
						addValue = !parent.valueNode;
						currentProperty = parent;
						currentKey = text.substr(node.offset + 1, node.length - 2);
						if (parent) {
							node = parent.parent;
						}
					}
				}
			}
			if (node && node.type === "object") {
				if (node.offset === offset) {
					return result;
				}
				const properties = node.properties;
				properties.forEach((p) => {
					if (!currentProperty || currentProperty !== p) {
						proposed.set(p.keyNode.value, CompletionItem.create("__"));
					}
				});
				let separatorAfter = "";
				if (addValue) {
					separatorAfter = this.evaluateSeparatorAfter(document2, document2.offsetAt(overwriteRange.end));
				}
				if (schema) {
					this.getPropertyCompletions(schema, doc, node, addValue, separatorAfter, collector);
				} else {
					this.getSchemaLessPropertyCompletions(doc, node, currentKey, collector);
				}
				const location = getNodePath3(node);
				this.contributions.forEach((contribution) => {
					const collectPromise = contribution.collectPropertyCompletions(
						document2.uri,
						location,
						currentWord,
						addValue,
						separatorAfter === "",
						collector,
					);
					if (collectPromise) {
						collectionPromises.push(collectPromise);
					}
				});
				if (!schema && currentWord.length > 0 && text.charAt(offset - currentWord.length - 1) !== '"') {
					collector.add({
						kind: CompletionItemKind.Property,
						label: this.getLabelForValue(currentWord),
						insertText: this.getInsertTextForProperty(currentWord, void 0, false, separatorAfter),
						insertTextFormat: InsertTextFormat.Snippet,
						documentation: "",
					});
					collector.setAsIncomplete();
				}
			}
			const types = {};
			if (schema) {
				this.getValueCompletions(schema, doc, node, offset, document2, collector, types);
			} else {
				this.getSchemaLessValueCompletions(doc, node, offset, document2, collector);
			}
			if (this.contributions.length > 0) {
				this.getContributedValueCompletions(doc, node, offset, document2, collector, collectionPromises);
			}
			return this.promiseConstructor.all(collectionPromises).then(() => {
				if (collector.getNumberOfProposals() === 0) {
					let offsetForSeparator = offset;
					if (
						node &&
						(node.type === "string" || node.type === "number" || node.type === "boolean" || node.type === "null")
					) {
						offsetForSeparator = node.offset + node.length;
					}
					const separatorAfter = this.evaluateSeparatorAfter(document2, offsetForSeparator);
					this.addFillerValueCompletions(types, separatorAfter, collector);
				}
				return result;
			});
		});
	}
	getPropertyCompletions(schema, doc, node, addValue, separatorAfter, collector) {
		const matchingSchemas = doc.getMatchingSchemas(schema.schema, node.offset);
		matchingSchemas.forEach((s) => {
			if (s.node === node && !s.inverted) {
				const schemaProperties = s.schema.properties;
				if (schemaProperties) {
					Object.keys(schemaProperties).forEach((key) => {
						const propertySchema = schemaProperties[key];
						if (typeof propertySchema === "object" && !propertySchema.deprecationMessage && !propertySchema.doNotSuggest) {
							const proposal = {
								kind: CompletionItemKind.Property,
								label: key,
								insertText: this.getInsertTextForProperty(key, propertySchema, addValue, separatorAfter),
								insertTextFormat: InsertTextFormat.Snippet,
								filterText: this.getFilterTextForValue(key),
								documentation: this.fromMarkup(propertySchema.markdownDescription) || propertySchema.description || "",
							};
							if (propertySchema.completionDetail !== void 0) {
								proposal.detail = propertySchema.completionDetail;
							}
							if (propertySchema.suggestSortText !== void 0) {
								proposal.sortText = propertySchema.suggestSortText;
							}
							if (proposal.insertText && endsWith(proposal.insertText, `$1${separatorAfter}`)) {
								proposal.command = {
									title: "Suggest",
									command: "editor.action.triggerSuggest",
								};
							}
							collector.add(proposal);
						}
					});
				}
				const schemaPropertyNames = s.schema.propertyNames;
				if (
					typeof schemaPropertyNames === "object" &&
					!schemaPropertyNames.deprecationMessage &&
					!schemaPropertyNames.doNotSuggest
				) {
					const propertyNameCompletionItem = /* @__PURE__ */ __name((name, documentation, detail, sortText) => {
						const proposal = {
							kind: CompletionItemKind.Property,
							label: name,
							insertText: this.getInsertTextForProperty(name, void 0, addValue, separatorAfter),
							insertTextFormat: InsertTextFormat.Snippet,
							filterText: this.getFilterTextForValue(name),
							documentation:
								documentation ||
								this.fromMarkup(schemaPropertyNames.markdownDescription) ||
								schemaPropertyNames.description ||
								"",
							sortText,
							detail,
						};
						if (proposal.insertText && endsWith(proposal.insertText, `$1${separatorAfter}`)) {
							proposal.command = {
								title: "Suggest",
								command: "editor.action.triggerSuggest",
							};
						}
						collector.add(proposal);
					}, "propertyNameCompletionItem");
					if (schemaPropertyNames.enum) {
						for (let i = 0; i < schemaPropertyNames.enum.length; i++) {
							let enumDescription = void 0;
							if (schemaPropertyNames.markdownEnumDescriptions && i < schemaPropertyNames.markdownEnumDescriptions.length) {
								enumDescription = this.fromMarkup(schemaPropertyNames.markdownEnumDescriptions[i]);
							} else if (schemaPropertyNames.enumDescriptions && i < schemaPropertyNames.enumDescriptions.length) {
								enumDescription = schemaPropertyNames.enumDescriptions[i];
							}
							const enumSortText = schemaPropertyNames.enumSortTexts?.[i];
							const enumDetails = schemaPropertyNames.enumDetails?.[i];
							propertyNameCompletionItem(schemaPropertyNames.enum[i], enumDescription, enumDetails, enumSortText);
						}
					}
					if (schemaPropertyNames.examples) {
						for (let i = 0; i < schemaPropertyNames.examples.length; i++) {
							propertyNameCompletionItem(schemaPropertyNames.examples[i], void 0, void 0, void 0);
						}
					}
					if (schemaPropertyNames.const) {
						propertyNameCompletionItem(
							schemaPropertyNames.const,
							void 0,
							schemaPropertyNames.completionDetail,
							schemaPropertyNames.suggestSortText,
						);
					}
				}
			}
		});
	}
	getSchemaLessPropertyCompletions(doc, node, currentKey, collector) {
		const collectCompletionsForSimilarObject = /* @__PURE__ */ __name((obj) => {
			obj.properties.forEach((p) => {
				const key = p.keyNode.value;
				collector.add({
					kind: CompletionItemKind.Property,
					label: key,
					insertText: this.getInsertTextForValue(key, ""),
					insertTextFormat: InsertTextFormat.Snippet,
					filterText: this.getFilterTextForValue(key),
					documentation: "",
				});
			});
		}, "collectCompletionsForSimilarObject");
		if (node.parent) {
			if (node.parent.type === "property") {
				const parentKey = node.parent.keyNode.value;
				doc.visit((n) => {
					if (
						n.type === "property" &&
						n !== node.parent &&
						n.keyNode.value === parentKey &&
						n.valueNode &&
						n.valueNode.type === "object"
					) {
						collectCompletionsForSimilarObject(n.valueNode);
					}
					return true;
				});
			} else if (node.parent.type === "array") {
				node.parent.items.forEach((n) => {
					if (n.type === "object" && n !== node) {
						collectCompletionsForSimilarObject(n);
					}
				});
			}
		} else if (node.type === "object") {
			collector.add({
				kind: CompletionItemKind.Property,
				label: "$schema",
				insertText: this.getInsertTextForProperty("$schema", void 0, true, ""),
				insertTextFormat: InsertTextFormat.Snippet,
				documentation: "",
				filterText: this.getFilterTextForValue("$schema"),
			});
		}
	}
	getSchemaLessValueCompletions(doc, node, offset, document2, collector) {
		let offsetForSeparator = offset;
		if (node && (node.type === "string" || node.type === "number" || node.type === "boolean" || node.type === "null")) {
			offsetForSeparator = node.offset + node.length;
			node = node.parent;
		}
		if (!node) {
			collector.add({
				kind: this.getSuggestionKind("object"),
				label: "Empty object",
				insertText: this.getInsertTextForValue({}, ""),
				insertTextFormat: InsertTextFormat.Snippet,
				documentation: "",
			});
			collector.add({
				kind: this.getSuggestionKind("array"),
				label: "Empty array",
				insertText: this.getInsertTextForValue([], ""),
				insertTextFormat: InsertTextFormat.Snippet,
				documentation: "",
			});
			return;
		}
		const separatorAfter = this.evaluateSeparatorAfter(document2, offsetForSeparator);
		const collectSuggestionsForValues = /* @__PURE__ */ __name((value) => {
			if (value.parent && !contains2(value.parent, offset, true)) {
				collector.add({
					kind: this.getSuggestionKind(value.type),
					label: this.getLabelTextForMatchingNode(value, document2),
					insertText: this.getInsertTextForMatchingNode(value, document2, separatorAfter),
					insertTextFormat: InsertTextFormat.Snippet,
					documentation: "",
				});
			}
			if (value.type === "boolean") {
				this.addBooleanValueCompletion(!value.value, separatorAfter, collector);
			}
		}, "collectSuggestionsForValues");
		if (node.type === "property") {
			if (offset > (node.colonOffset || 0)) {
				const valueNode = node.valueNode;
				if (
					valueNode &&
					(offset > valueNode.offset + valueNode.length || valueNode.type === "object" || valueNode.type === "array")
				) {
					return;
				}
				const parentKey = node.keyNode.value;
				doc.visit((n) => {
					if (n.type === "property" && n.keyNode.value === parentKey && n.valueNode) {
						collectSuggestionsForValues(n.valueNode);
					}
					return true;
				});
				if (parentKey === "$schema" && node.parent && !node.parent.parent) {
					this.addDollarSchemaCompletions(separatorAfter, collector);
				}
			}
		}
		if (node.type === "array") {
			if (node.parent && node.parent.type === "property") {
				const parentKey = node.parent.keyNode.value;
				doc.visit((n) => {
					if (n.type === "property" && n.keyNode.value === parentKey && n.valueNode && n.valueNode.type === "array") {
						n.valueNode.items.forEach(collectSuggestionsForValues);
					}
					return true;
				});
			} else {
				node.items.forEach(collectSuggestionsForValues);
			}
		}
	}
	getValueCompletions(schema, doc, node, offset, document2, collector, types) {
		let offsetForSeparator = offset;
		let parentKey = void 0;
		let valueNode = void 0;
		if (node && (node.type === "string" || node.type === "number" || node.type === "boolean" || node.type === "null")) {
			offsetForSeparator = node.offset + node.length;
			valueNode = node;
			node = node.parent;
		}
		if (!node) {
			this.addSchemaValueCompletions(schema.schema, "", collector, types);
			return;
		}
		if (node.type === "property" && offset > (node.colonOffset || 0)) {
			const valueNode2 = node.valueNode;
			if (valueNode2 && offset > valueNode2.offset + valueNode2.length) {
				return;
			}
			parentKey = node.keyNode.value;
			node = node.parent;
		}
		if (node && (parentKey !== void 0 || node.type === "array")) {
			const separatorAfter = this.evaluateSeparatorAfter(document2, offsetForSeparator);
			const matchingSchemas = doc.getMatchingSchemas(schema.schema, node.offset, valueNode);
			for (const s of matchingSchemas) {
				if (s.node === node && !s.inverted && s.schema) {
					if (node.type === "array" && s.schema.items) {
						let c = collector;
						if (s.schema.uniqueItems) {
							const existingValues = /* @__PURE__ */ new Set();
							node.children.forEach((n) => {
								if (n.type !== "array" && n.type !== "object") {
									existingValues.add(this.getLabelForValue(getNodeValue3(n)));
								}
							});
							c = {
								...collector,
								add(suggestion) {
									if (!existingValues.has(suggestion.label)) {
										collector.add(suggestion);
									}
								},
							};
						}
						if (Array.isArray(s.schema.items)) {
							const index = this.findItemAtOffset(node, document2, offset);
							if (index < s.schema.items.length) {
								this.addSchemaValueCompletions(s.schema.items[index], separatorAfter, c, types);
							}
						} else {
							this.addSchemaValueCompletions(s.schema.items, separatorAfter, c, types);
						}
					}
					if (parentKey !== void 0) {
						let propertyMatched = false;
						if (s.schema.properties) {
							const propertySchema = s.schema.properties[parentKey];
							if (propertySchema) {
								propertyMatched = true;
								this.addSchemaValueCompletions(propertySchema, separatorAfter, collector, types);
							}
						}
						if (s.schema.patternProperties && !propertyMatched) {
							for (const pattern of Object.keys(s.schema.patternProperties)) {
								const regex = extendedRegExp(pattern);
								if (regex?.test(parentKey)) {
									propertyMatched = true;
									const propertySchema = s.schema.patternProperties[pattern];
									this.addSchemaValueCompletions(propertySchema, separatorAfter, collector, types);
								}
							}
						}
						if (s.schema.additionalProperties && !propertyMatched) {
							const propertySchema = s.schema.additionalProperties;
							this.addSchemaValueCompletions(propertySchema, separatorAfter, collector, types);
						}
					}
				}
			}
			if (parentKey === "$schema" && !node.parent) {
				this.addDollarSchemaCompletions(separatorAfter, collector);
			}
			if (types["boolean"]) {
				this.addBooleanValueCompletion(true, separatorAfter, collector);
				this.addBooleanValueCompletion(false, separatorAfter, collector);
			}
			if (types["null"]) {
				this.addNullValueCompletion(separatorAfter, collector);
			}
		}
	}
	getContributedValueCompletions(doc, node, offset, document2, collector, collectionPromises) {
		if (!node) {
			this.contributions.forEach((contribution) => {
				const collectPromise = contribution.collectDefaultCompletions(document2.uri, collector);
				if (collectPromise) {
					collectionPromises.push(collectPromise);
				}
			});
		} else {
			if (node.type === "string" || node.type === "number" || node.type === "boolean" || node.type === "null") {
				node = node.parent;
			}
			if (node && node.type === "property" && offset > (node.colonOffset || 0)) {
				const parentKey = node.keyNode.value;
				const valueNode = node.valueNode;
				if ((!valueNode || offset <= valueNode.offset + valueNode.length) && node.parent) {
					const location = getNodePath3(node.parent);
					this.contributions.forEach((contribution) => {
						const collectPromise = contribution.collectValueCompletions(document2.uri, location, parentKey, collector);
						if (collectPromise) {
							collectionPromises.push(collectPromise);
						}
					});
				}
			}
		}
	}
	addSchemaValueCompletions(schema, separatorAfter, collector, types) {
		if (typeof schema === "object") {
			this.addEnumValueCompletions(schema, separatorAfter, collector);
			this.addDefaultValueCompletions(schema, separatorAfter, collector);
			this.collectTypes(schema, types);
			if (Array.isArray(schema.allOf)) {
				schema.allOf.forEach((s) => this.addSchemaValueCompletions(s, separatorAfter, collector, types));
			}
			if (Array.isArray(schema.anyOf)) {
				schema.anyOf.forEach((s) => this.addSchemaValueCompletions(s, separatorAfter, collector, types));
			}
			if (Array.isArray(schema.oneOf)) {
				schema.oneOf.forEach((s) => this.addSchemaValueCompletions(s, separatorAfter, collector, types));
			}
		}
	}
	addDefaultValueCompletions(schema, separatorAfter, collector, arrayDepth = 0) {
		let hasProposals = false;
		if (isDefined(schema.default)) {
			let type = schema.type;
			let value = schema.default;
			for (let i = arrayDepth; i > 0; i--) {
				value = [value];
				type = "array";
			}
			const completionItem = {
				kind: this.getSuggestionKind(type),
				label: this.getLabelForValue(value),
				insertText: this.getInsertTextForValue(value, separatorAfter),
				insertTextFormat: InsertTextFormat.Snippet,
			};
			if (this.doesSupportsLabelDetails()) {
				completionItem.labelDetails = {
					description: l10n2.t("Default value"),
				};
			} else {
				completionItem.detail = l10n2.t("Default value");
			}
			collector.add(completionItem);
			hasProposals = true;
		}
		if (Array.isArray(schema.examples)) {
			schema.examples.forEach((example) => {
				let type = schema.type;
				let value = example;
				for (let i = arrayDepth; i > 0; i--) {
					value = [value];
					type = "array";
				}
				collector.add({
					kind: this.getSuggestionKind(type),
					label: this.getLabelForValue(value),
					insertText: this.getInsertTextForValue(value, separatorAfter),
					insertTextFormat: InsertTextFormat.Snippet,
				});
				hasProposals = true;
			});
		}
		if (Array.isArray(schema.defaultSnippets)) {
			schema.defaultSnippets.forEach((s) => {
				let type = schema.type;
				let value = s.body;
				let label = s.label;
				let insertText;
				let filterText;
				if (isDefined(value)) {
					let type2 = schema.type;
					for (let i = arrayDepth; i > 0; i--) {
						value = [value];
						type2 = "array";
					}
					insertText = this.getInsertTextForSnippetValue(value, separatorAfter);
					filterText = this.getFilterTextForSnippetValue(value);
					label = label || this.getLabelForSnippetValue(value);
				} else if (typeof s.bodyText === "string") {
					let prefix = "",
						suffix = "",
						indent = "";
					for (let i = arrayDepth; i > 0; i--) {
						prefix = prefix + indent + "[\n";
						suffix = suffix + "\n" + indent + "]";
						indent += "	";
						type = "array";
					}
					insertText = prefix + indent + s.bodyText.split("\n").join("\n" + indent) + suffix + separatorAfter;
					(label = label || insertText), (filterText = insertText.replace(/[\n]/g, ""));
				} else {
					return;
				}
				collector.add({
					kind: this.getSuggestionKind(type),
					label,
					documentation: this.fromMarkup(s.markdownDescription) || s.description,
					insertText,
					insertTextFormat: InsertTextFormat.Snippet,
					filterText,
				});
				hasProposals = true;
			});
		}
		if (!hasProposals && typeof schema.items === "object" && !Array.isArray(schema.items) && arrayDepth < 5) {
			this.addDefaultValueCompletions(schema.items, separatorAfter, collector, arrayDepth + 1);
		}
	}
	addEnumValueCompletions(schema, separatorAfter, collector) {
		if (isDefined(schema.const)) {
			collector.add({
				kind: this.getSuggestionKind(schema.type),
				label: this.getLabelForValue(schema.const),
				insertText: this.getInsertTextForValue(schema.const, separatorAfter),
				insertTextFormat: InsertTextFormat.Snippet,
				documentation: this.fromMarkup(schema.markdownDescription) || schema.description,
			});
		}
		if (Array.isArray(schema.enum)) {
			for (let i = 0, length = schema.enum.length; i < length; i++) {
				const enm = schema.enum[i];
				let documentation = this.fromMarkup(schema.markdownDescription) || schema.description;
				if (schema.markdownEnumDescriptions && i < schema.markdownEnumDescriptions.length && this.doesSupportMarkdown()) {
					documentation = this.fromMarkup(schema.markdownEnumDescriptions[i]);
				} else if (schema.enumDescriptions && i < schema.enumDescriptions.length) {
					documentation = schema.enumDescriptions[i];
				}
				collector.add({
					kind: this.getSuggestionKind(schema.type),
					label: this.getLabelForValue(enm),
					insertText: this.getInsertTextForValue(enm, separatorAfter),
					insertTextFormat: InsertTextFormat.Snippet,
					sortText: schema.enumSortTexts?.[i],
					detail: schema.enumDetails?.[i],
					documentation,
				});
			}
		}
	}
	collectTypes(schema, types) {
		if (Array.isArray(schema.enum) || isDefined(schema.const)) {
			return;
		}
		const type = schema.type;
		if (Array.isArray(type)) {
			type.forEach((t7) => (types[t7] = true));
		} else if (type) {
			types[type] = true;
		}
	}
	addFillerValueCompletions(types, separatorAfter, collector) {
		if (types["object"]) {
			collector.add({
				kind: this.getSuggestionKind("object"),
				label: "{}",
				insertText: this.getInsertTextForGuessedValue({}, separatorAfter),
				insertTextFormat: InsertTextFormat.Snippet,
				detail: l10n2.t("New object"),
				documentation: "",
			});
		}
		if (types["array"]) {
			collector.add({
				kind: this.getSuggestionKind("array"),
				label: "[]",
				insertText: this.getInsertTextForGuessedValue([], separatorAfter),
				insertTextFormat: InsertTextFormat.Snippet,
				detail: l10n2.t("New array"),
				documentation: "",
			});
		}
	}
	addBooleanValueCompletion(value, separatorAfter, collector) {
		collector.add({
			kind: this.getSuggestionKind("boolean"),
			label: value ? "true" : "false",
			insertText: this.getInsertTextForValue(value, separatorAfter),
			insertTextFormat: InsertTextFormat.Snippet,
			documentation: "",
		});
	}
	addNullValueCompletion(separatorAfter, collector) {
		collector.add({
			kind: this.getSuggestionKind("null"),
			label: "null",
			insertText: "null" + separatorAfter,
			insertTextFormat: InsertTextFormat.Snippet,
			documentation: "",
		});
	}
	addDollarSchemaCompletions(separatorAfter, collector) {
		const schemaIds = this.schemaService.getRegisteredSchemaIds((schema) => schema === "http" || schema === "https");
		schemaIds.forEach((schemaId) => {
			if (schemaId.startsWith("https://json-schema.org/draft-")) {
				schemaId = schemaId + "#";
			}
			collector.add({
				kind: CompletionItemKind.Module,
				label: this.getLabelForValue(schemaId),
				filterText: this.getFilterTextForValue(schemaId),
				insertText: this.getInsertTextForValue(schemaId, separatorAfter),
				insertTextFormat: InsertTextFormat.Snippet,
				documentation: "",
			});
		});
	}
	getLabelForValue(value) {
		return JSON.stringify(value);
	}
	getValueFromLabel(value) {
		return JSON.parse(value);
	}
	getFilterTextForValue(value) {
		return JSON.stringify(value);
	}
	getFilterTextForSnippetValue(value) {
		return JSON.stringify(value).replace(/\$\{\d+:([^}]+)\}|\$\d+/g, "$1");
	}
	getLabelForSnippetValue(value) {
		const label = JSON.stringify(value);
		return label.replace(/\$\{\d+:([^}]+)\}|\$\d+/g, "$1");
	}
	getInsertTextForPlainText(text) {
		return text.replace(/[\\\$\}]/g, "\\$&");
	}
	getInsertTextForValue(value, separatorAfter) {
		const text = JSON.stringify(value, null, "	");
		if (text === "{}") {
			return "{$1}" + separatorAfter;
		} else if (text === "[]") {
			return "[$1]" + separatorAfter;
		}
		return this.getInsertTextForPlainText(text + separatorAfter);
	}
	getInsertTextForSnippetValue(value, separatorAfter) {
		const replacer = /* @__PURE__ */ __name((value2) => {
			if (typeof value2 === "string") {
				if (value2[0] === "^") {
					return value2.substr(1);
				}
			}
			return JSON.stringify(value2);
		}, "replacer");
		return stringifyObject(value, "", replacer) + separatorAfter;
	}
	getInsertTextForGuessedValue(value, separatorAfter) {
		switch (typeof value) {
			case "object":
				if (value === null) {
					return "${1:null}" + separatorAfter;
				}
				return this.getInsertTextForValue(value, separatorAfter);
			case "string":
				let snippetValue = JSON.stringify(value);
				snippetValue = snippetValue.substr(1, snippetValue.length - 2);
				snippetValue = this.getInsertTextForPlainText(snippetValue);
				return '"${1:' + snippetValue + '}"' + separatorAfter;
			case "number":
			case "boolean":
				return "${1:" + JSON.stringify(value) + "}" + separatorAfter;
		}
		return this.getInsertTextForValue(value, separatorAfter);
	}
	getSuggestionKind(type) {
		if (Array.isArray(type)) {
			const array = type;
			type = array.length > 0 ? array[0] : void 0;
		}
		if (!type) {
			return CompletionItemKind.Value;
		}
		switch (type) {
			case "string":
				return CompletionItemKind.Value;
			case "object":
				return CompletionItemKind.Module;
			case "property":
				return CompletionItemKind.Property;
			default:
				return CompletionItemKind.Value;
		}
	}
	getLabelTextForMatchingNode(node, document2) {
		switch (node.type) {
			case "array":
				return "[]";
			case "object":
				return "{}";
			default:
				const content = document2.getText().substr(node.offset, node.length);
				return content;
		}
	}
	getInsertTextForMatchingNode(node, document2, separatorAfter) {
		switch (node.type) {
			case "array":
				return this.getInsertTextForValue([], separatorAfter);
			case "object":
				return this.getInsertTextForValue({}, separatorAfter);
			default:
				const content = document2.getText().substr(node.offset, node.length) + separatorAfter;
				return this.getInsertTextForPlainText(content);
		}
	}
	getInsertTextForProperty(key, propertySchema, addValue, separatorAfter) {
		const propertyText = this.getInsertTextForValue(key, "");
		if (!addValue) {
			return propertyText;
		}
		const resultText = propertyText + ": ";
		let value;
		let nValueProposals = 0;
		if (propertySchema) {
			if (Array.isArray(propertySchema.defaultSnippets)) {
				if (propertySchema.defaultSnippets.length === 1) {
					const body = propertySchema.defaultSnippets[0].body;
					if (isDefined(body)) {
						value = this.getInsertTextForSnippetValue(body, "");
					}
				}
				nValueProposals += propertySchema.defaultSnippets.length;
			}
			if (propertySchema.enum) {
				if (!value && propertySchema.enum.length === 1) {
					value = this.getInsertTextForGuessedValue(propertySchema.enum[0], "");
				}
				nValueProposals += propertySchema.enum.length;
			}
			if (isDefined(propertySchema.const)) {
				if (!value) {
					value = this.getInsertTextForGuessedValue(propertySchema.const, "");
				}
				nValueProposals++;
			}
			if (isDefined(propertySchema.default)) {
				if (!value) {
					value = this.getInsertTextForGuessedValue(propertySchema.default, "");
				}
				nValueProposals++;
			}
			if (Array.isArray(propertySchema.examples) && propertySchema.examples.length) {
				if (!value) {
					value = this.getInsertTextForGuessedValue(propertySchema.examples[0], "");
				}
				nValueProposals += propertySchema.examples.length;
			}
			if (nValueProposals === 0) {
				let type = Array.isArray(propertySchema.type) ? propertySchema.type[0] : propertySchema.type;
				if (!type) {
					if (propertySchema.properties) {
						type = "object";
					} else if (propertySchema.items) {
						type = "array";
					}
				}
				switch (type) {
					case "boolean":
						value = "$1";
						break;
					case "string":
						value = '"$1"';
						break;
					case "object":
						value = "{$1}";
						break;
					case "array":
						value = "[$1]";
						break;
					case "number":
					case "integer":
						value = "${1:0}";
						break;
					case "null":
						value = "${1:null}";
						break;
					default:
						return propertyText;
				}
			}
		}
		if (!value || nValueProposals > 1) {
			value = "$1";
		}
		return resultText + value + separatorAfter;
	}
	getCurrentWord(document2, offset) {
		let i = offset - 1;
		const text = document2.getText();
		while (i >= 0 && ' 	\n\r\v":{[,]}'.indexOf(text.charAt(i)) === -1) {
			i--;
		}
		return text.substring(i + 1, offset);
	}
	evaluateSeparatorAfter(document2, offset) {
		const scanner = createScanner2(document2.getText(), true);
		scanner.setPosition(offset);
		const token = scanner.scan();
		switch (token) {
			case 5:
			case 2:
			case 4:
			case 17:
				return "";
			default:
				return ",";
		}
	}
	findItemAtOffset(node, document2, offset) {
		const scanner = createScanner2(document2.getText(), true);
		const children = node.items;
		for (let i = children.length - 1; i >= 0; i--) {
			const child = children[i];
			if (offset > child.offset + child.length) {
				scanner.setPosition(child.offset + child.length);
				const token = scanner.scan();
				if (token === 5 && offset >= scanner.getTokenOffset() + scanner.getTokenLength()) {
					return i + 1;
				}
				return i;
			} else if (offset >= child.offset) {
				return i;
			}
		}
		return 0;
	}
	isInComment(document2, start, offset) {
		const scanner = createScanner2(document2.getText(), false);
		scanner.setPosition(start);
		let token = scanner.scan();
		while (token !== 17 && scanner.getTokenOffset() + scanner.getTokenLength() < offset) {
			token = scanner.scan();
		}
		return (token === 12 || token === 13) && scanner.getTokenOffset() <= offset;
	}
	fromMarkup(markupString) {
		if (markupString && this.doesSupportMarkdown()) {
			return {
				kind: MarkupKind.Markdown,
				value: markupString,
			};
		}
		return void 0;
	}
	doesSupportMarkdown() {
		if (!isDefined(this.supportsMarkdown)) {
			const documentationFormat = this.clientCapabilities.textDocument?.completion?.completionItem?.documentationFormat;
			this.supportsMarkdown =
				Array.isArray(documentationFormat) && documentationFormat.indexOf(MarkupKind.Markdown) !== -1;
		}
		return this.supportsMarkdown;
	}
	doesSupportsCommitCharacters() {
		if (!isDefined(this.supportsCommitCharacters)) {
			this.labelDetailsSupport = this.clientCapabilities.textDocument?.completion?.completionItem?.commitCharactersSupport;
		}
		return this.supportsCommitCharacters;
	}
	doesSupportsLabelDetails() {
		if (!isDefined(this.labelDetailsSupport)) {
			this.labelDetailsSupport = this.clientCapabilities.textDocument?.completion?.completionItem?.labelDetailsSupport;
		}
		return this.labelDetailsSupport;
	}
};

// ../../../node_modules/.pnpm/vscode-json-languageservice@5.6.3/node_modules/vscode-json-languageservice/lib/esm/services/jsonHover.js
init_cjs_shims();
var JSONHover = class {
	static {
		__name(this, "JSONHover");
	}
	constructor(schemaService, contributions = [], promiseConstructor) {
		this.schemaService = schemaService;
		this.contributions = contributions;
		this.promise = promiseConstructor || Promise;
	}
	doHover(document2, position, doc) {
		const offset = document2.offsetAt(position);
		let node = doc.getNodeFromOffset(offset);
		if (
			!node ||
			((node.type === "object" || node.type === "array") &&
				offset > node.offset + 1 &&
				offset < node.offset + node.length - 1)
		) {
			return this.promise.resolve(null);
		}
		const hoverRangeNode = node;
		if (node.type === "string") {
			const parent = node.parent;
			if (parent && parent.type === "property" && parent.keyNode === node) {
				node = parent.valueNode;
				if (!node) {
					return this.promise.resolve(null);
				}
			}
		}
		const hoverRange = Range2.create(
			document2.positionAt(hoverRangeNode.offset),
			document2.positionAt(hoverRangeNode.offset + hoverRangeNode.length),
		);
		const createHover = /* @__PURE__ */ __name((contents) => {
			const result = {
				contents,
				range: hoverRange,
			};
			return result;
		}, "createHover");
		const location = getNodePath3(node);
		for (let i = this.contributions.length - 1; i >= 0; i--) {
			const contribution = this.contributions[i];
			const promise = contribution.getInfoContribution(document2.uri, location);
			if (promise) {
				return promise.then((htmlContent) => createHover(htmlContent));
			}
		}
		return this.schemaService.getSchemaForResource(document2.uri, doc).then((schema) => {
			if (!schema) {
				return null;
			}
			let title = void 0;
			let markdownDescription = void 0;
			let markdownEnumValueDescription = void 0,
				enumValue = void 0;
			const matchingSchemas = doc
				.getMatchingSchemas(schema.schema, node.offset)
				.filter((s) => s.node === node && !s.inverted)
				.map((s) => s.schema);
			for (const schema2 of matchingSchemas) {
				title = title || schema2.title;
				markdownDescription = markdownDescription || schema2.markdownDescription || toMarkdown(schema2.description);
				if (schema2.enum) {
					const idx = schema2.enum.indexOf(getNodeValue3(node));
					if (schema2.markdownEnumDescriptions) {
						markdownEnumValueDescription = schema2.markdownEnumDescriptions[idx];
					} else if (schema2.enumDescriptions) {
						markdownEnumValueDescription = toMarkdown(schema2.enumDescriptions[idx]);
					}
					if (markdownEnumValueDescription) {
						enumValue = schema2.enum[idx];
						if (typeof enumValue !== "string") {
							enumValue = JSON.stringify(enumValue);
						}
					}
				}
			}
			let result = "";
			if (title) {
				result = toMarkdown(title);
			}
			if (markdownDescription) {
				if (result.length > 0) {
					result += "\n\n";
				}
				result += markdownDescription;
			}
			if (markdownEnumValueDescription) {
				if (result.length > 0) {
					result += "\n\n";
				}
				result += `\`${toMarkdownCodeBlock(enumValue)}\`: ${markdownEnumValueDescription}`;
			}
			return createHover([result]);
		});
	}
};
function toMarkdown(plain) {
	if (plain) {
		return plain
			.trim()
			.replace(/[\\`*_{}[\]()<>#+\-.!]/g, "\\$&")
			.replace(/([ \t]+)/g, (_match, g1) => "&nbsp;".repeat(g1.length))
			.replace(/\n/g, "\\\n");
	}
	return void 0;
}
__name(toMarkdown, "toMarkdown");
function toMarkdownCodeBlock(content) {
	if (content.indexOf("`") !== -1) {
		return "`` " + content + " ``";
	}
	return content;
}
__name(toMarkdownCodeBlock, "toMarkdownCodeBlock");

// ../../../node_modules/.pnpm/vscode-json-languageservice@5.6.3/node_modules/vscode-json-languageservice/lib/esm/services/jsonValidation.js
init_cjs_shims();
var l10n3 = __toESM(require_main5());
var JSONValidation = class {
	static {
		__name(this, "JSONValidation");
	}
	constructor(jsonSchemaService, promiseConstructor) {
		this.jsonSchemaService = jsonSchemaService;
		this.promise = promiseConstructor;
		this.validationEnabled = true;
	}
	configure(raw) {
		if (raw) {
			this.validationEnabled = raw.validate !== false;
			this.commentSeverity = raw.allowComments ? void 0 : DiagnosticSeverity2.Error;
		}
	}
	doValidation(textDocument, jsonDocument, documentSettings2, schema) {
		if (!this.validationEnabled) {
			return this.promise.resolve([]);
		}
		const diagnostics = [];
		const added = {};
		const addProblem = /* @__PURE__ */ __name((problem) => {
			const signature = problem.range.start.line + " " + problem.range.start.character + " " + problem.message;
			if (!added[signature]) {
				added[signature] = true;
				diagnostics.push(problem);
			}
		}, "addProblem");
		const getDiagnostics = /* @__PURE__ */ __name((schema2) => {
			let trailingCommaSeverity = documentSettings2?.trailingCommas
				? toDiagnosticSeverity(documentSettings2.trailingCommas)
				: DiagnosticSeverity2.Error;
			let commentSeverity = documentSettings2?.comments
				? toDiagnosticSeverity(documentSettings2.comments)
				: this.commentSeverity;
			let schemaValidation = documentSettings2?.schemaValidation
				? toDiagnosticSeverity(documentSettings2.schemaValidation)
				: DiagnosticSeverity2.Warning;
			let schemaRequest = documentSettings2?.schemaRequest
				? toDiagnosticSeverity(documentSettings2.schemaRequest)
				: DiagnosticSeverity2.Warning;
			if (schema2) {
				const addSchemaProblem = /* @__PURE__ */ __name((errorMessage, errorCode) => {
					if (jsonDocument.root && schemaRequest) {
						const astRoot = jsonDocument.root;
						const property = astRoot.type === "object" ? astRoot.properties[0] : void 0;
						if (property && property.keyNode.value === "$schema") {
							const node = property.valueNode || property;
							const range = Range2.create(
								textDocument.positionAt(node.offset),
								textDocument.positionAt(node.offset + node.length),
							);
							addProblem(Diagnostic.create(range, errorMessage, schemaRequest, errorCode));
						} else {
							const range = Range2.create(
								textDocument.positionAt(astRoot.offset),
								textDocument.positionAt(astRoot.offset + 1),
							);
							addProblem(Diagnostic.create(range, errorMessage, schemaRequest, errorCode));
						}
					}
				}, "addSchemaProblem");
				if (schema2.errors.length) {
					addSchemaProblem(schema2.errors[0], ErrorCode.SchemaResolveError);
				} else if (schemaValidation) {
					for (const warning of schema2.warnings) {
						addSchemaProblem(warning, ErrorCode.SchemaUnsupportedFeature);
					}
					const semanticErrors = jsonDocument.validate(
						textDocument,
						schema2.schema,
						schemaValidation,
						documentSettings2?.schemaDraft,
					);
					if (semanticErrors) {
						semanticErrors.forEach(addProblem);
					}
				}
				if (schemaAllowsComments(schema2.schema)) {
					commentSeverity = void 0;
				}
				if (schemaAllowsTrailingCommas(schema2.schema)) {
					trailingCommaSeverity = void 0;
				}
			}
			for (const p of jsonDocument.syntaxErrors) {
				if (p.code === ErrorCode.TrailingComma) {
					if (typeof trailingCommaSeverity !== "number") {
						continue;
					}
					p.severity = trailingCommaSeverity;
				}
				addProblem(p);
			}
			if (typeof commentSeverity === "number") {
				const message = l10n3.t("Comments are not permitted in JSON.");
				jsonDocument.comments.forEach((c) => {
					addProblem(Diagnostic.create(c, message, commentSeverity, ErrorCode.CommentNotPermitted));
				});
			}
			return diagnostics;
		}, "getDiagnostics");
		if (schema) {
			const uri = schema.id || "schemaservice://untitled/" + idCounter++;
			const handle = this.jsonSchemaService.registerExternalSchema({
				uri,
				schema,
			});
			return handle.getResolvedSchema().then((resolvedSchema) => {
				return getDiagnostics(resolvedSchema);
			});
		}
		return this.jsonSchemaService.getSchemaForResource(textDocument.uri, jsonDocument).then((schema2) => {
			return getDiagnostics(schema2);
		});
	}
	getLanguageStatus(textDocument, jsonDocument) {
		return {
			schemas: this.jsonSchemaService.getSchemaURIsForResource(textDocument.uri, jsonDocument),
		};
	}
};
var idCounter = 0;
function schemaAllowsComments(schemaRef) {
	if (schemaRef && typeof schemaRef === "object") {
		if (isBoolean(schemaRef.allowComments)) {
			return schemaRef.allowComments;
		}
		if (schemaRef.allOf) {
			for (const schema of schemaRef.allOf) {
				const allow = schemaAllowsComments(schema);
				if (isBoolean(allow)) {
					return allow;
				}
			}
		}
	}
	return void 0;
}
__name(schemaAllowsComments, "schemaAllowsComments");
function schemaAllowsTrailingCommas(schemaRef) {
	if (schemaRef && typeof schemaRef === "object") {
		if (isBoolean(schemaRef.allowTrailingCommas)) {
			return schemaRef.allowTrailingCommas;
		}
		const deprSchemaRef = schemaRef;
		if (isBoolean(deprSchemaRef["allowsTrailingCommas"])) {
			return deprSchemaRef["allowsTrailingCommas"];
		}
		if (schemaRef.allOf) {
			for (const schema of schemaRef.allOf) {
				const allow = schemaAllowsTrailingCommas(schema);
				if (isBoolean(allow)) {
					return allow;
				}
			}
		}
	}
	return void 0;
}
__name(schemaAllowsTrailingCommas, "schemaAllowsTrailingCommas");
function toDiagnosticSeverity(severityLevel) {
	switch (severityLevel) {
		case "error":
			return DiagnosticSeverity2.Error;
		case "warning":
			return DiagnosticSeverity2.Warning;
		case "ignore":
			return void 0;
	}
	return void 0;
}
__name(toDiagnosticSeverity, "toDiagnosticSeverity");

// ../../../node_modules/.pnpm/vscode-json-languageservice@5.6.3/node_modules/vscode-json-languageservice/lib/esm/services/jsonDocumentSymbols.js
init_cjs_shims();

// ../../../node_modules/.pnpm/vscode-json-languageservice@5.6.3/node_modules/vscode-json-languageservice/lib/esm/utils/colors.js
init_cjs_shims();
var Digit0 = 48;
var Digit9 = 57;
var A = 65;
var a = 97;
var f = 102;
function hexDigit(charCode) {
	if (charCode < Digit0) {
		return 0;
	}
	if (charCode <= Digit9) {
		return charCode - Digit0;
	}
	if (charCode < a) {
		charCode += a - A;
	}
	if (charCode >= a && charCode <= f) {
		return charCode - a + 10;
	}
	return 0;
}
__name(hexDigit, "hexDigit");
function colorFromHex(text) {
	if (text[0] !== "#") {
		return void 0;
	}
	switch (text.length) {
		case 4:
			return {
				red: (hexDigit(text.charCodeAt(1)) * 17) / 255,
				green: (hexDigit(text.charCodeAt(2)) * 17) / 255,
				blue: (hexDigit(text.charCodeAt(3)) * 17) / 255,
				alpha: 1,
			};
		case 5:
			return {
				red: (hexDigit(text.charCodeAt(1)) * 17) / 255,
				green: (hexDigit(text.charCodeAt(2)) * 17) / 255,
				blue: (hexDigit(text.charCodeAt(3)) * 17) / 255,
				alpha: (hexDigit(text.charCodeAt(4)) * 17) / 255,
			};
		case 7:
			return {
				red: (hexDigit(text.charCodeAt(1)) * 16 + hexDigit(text.charCodeAt(2))) / 255,
				green: (hexDigit(text.charCodeAt(3)) * 16 + hexDigit(text.charCodeAt(4))) / 255,
				blue: (hexDigit(text.charCodeAt(5)) * 16 + hexDigit(text.charCodeAt(6))) / 255,
				alpha: 1,
			};
		case 9:
			return {
				red: (hexDigit(text.charCodeAt(1)) * 16 + hexDigit(text.charCodeAt(2))) / 255,
				green: (hexDigit(text.charCodeAt(3)) * 16 + hexDigit(text.charCodeAt(4))) / 255,
				blue: (hexDigit(text.charCodeAt(5)) * 16 + hexDigit(text.charCodeAt(6))) / 255,
				alpha: (hexDigit(text.charCodeAt(7)) * 16 + hexDigit(text.charCodeAt(8))) / 255,
			};
	}
	return void 0;
}
__name(colorFromHex, "colorFromHex");

// ../../../node_modules/.pnpm/vscode-json-languageservice@5.6.3/node_modules/vscode-json-languageservice/lib/esm/services/jsonDocumentSymbols.js
var l10n4 = __toESM(require_main5());
var JSONDocumentSymbols = class {
	static {
		__name(this, "JSONDocumentSymbols");
	}
	constructor(schemaService) {
		this.schemaService = schemaService;
	}
	findDocumentSymbols(
		document2,
		doc,
		context = {
			resultLimit: Number.MAX_VALUE,
		},
	) {
		const root = doc.root;
		if (!root) {
			return [];
		}
		let limit = context.resultLimit || Number.MAX_VALUE;
		const resourceString = document2.uri;
		if (
			resourceString === "vscode://defaultsettings/keybindings.json" ||
			endsWith(resourceString.toLowerCase(), "/user/keybindings.json")
		) {
			if (root.type === "array") {
				const result2 = [];
				for (const item of root.items) {
					if (item.type === "object") {
						for (const property of item.properties) {
							if (property.keyNode.value === "key" && property.valueNode) {
								const location = Location.create(document2.uri, getRange(document2, item));
								result2.push({
									name: getName(property.valueNode),
									kind: SymbolKind.Function,
									location,
								});
								limit--;
								if (limit <= 0) {
									if (context && context.onResultLimitExceeded) {
										context.onResultLimitExceeded(resourceString);
									}
									return result2;
								}
							}
						}
					}
				}
				return result2;
			}
		}
		const toVisit = [
			{
				node: root,
				containerName: "",
			},
		];
		let nextToVisit = 0;
		let limitExceeded = false;
		const result = [];
		const collectOutlineEntries = /* @__PURE__ */ __name((node, containerName) => {
			if (node.type === "array") {
				node.items.forEach((node2) => {
					if (node2) {
						toVisit.push({
							node: node2,
							containerName,
						});
					}
				});
			} else if (node.type === "object") {
				node.properties.forEach((property) => {
					const valueNode = property.valueNode;
					if (valueNode) {
						if (limit > 0) {
							limit--;
							const location = Location.create(document2.uri, getRange(document2, property));
							const childContainerName = containerName ? containerName + "." + property.keyNode.value : property.keyNode.value;
							result.push({
								name: this.getKeyLabel(property),
								kind: this.getSymbolKind(valueNode.type),
								location,
								containerName,
							});
							toVisit.push({
								node: valueNode,
								containerName: childContainerName,
							});
						} else {
							limitExceeded = true;
						}
					}
				});
			}
		}, "collectOutlineEntries");
		while (nextToVisit < toVisit.length) {
			const next = toVisit[nextToVisit++];
			collectOutlineEntries(next.node, next.containerName);
		}
		if (limitExceeded && context && context.onResultLimitExceeded) {
			context.onResultLimitExceeded(resourceString);
		}
		return result;
	}
	findDocumentSymbols2(
		document2,
		doc,
		context = {
			resultLimit: Number.MAX_VALUE,
		},
	) {
		const root = doc.root;
		if (!root) {
			return [];
		}
		let limit = context.resultLimit || Number.MAX_VALUE;
		const resourceString = document2.uri;
		if (
			resourceString === "vscode://defaultsettings/keybindings.json" ||
			endsWith(resourceString.toLowerCase(), "/user/keybindings.json")
		) {
			if (root.type === "array") {
				const result2 = [];
				for (const item of root.items) {
					if (item.type === "object") {
						for (const property of item.properties) {
							if (property.keyNode.value === "key" && property.valueNode) {
								const range = getRange(document2, item);
								const selectionRange = getRange(document2, property.keyNode);
								result2.push({
									name: getName(property.valueNode),
									kind: SymbolKind.Function,
									range,
									selectionRange,
								});
								limit--;
								if (limit <= 0) {
									if (context && context.onResultLimitExceeded) {
										context.onResultLimitExceeded(resourceString);
									}
									return result2;
								}
							}
						}
					}
				}
				return result2;
			}
		}
		const result = [];
		const toVisit = [
			{
				node: root,
				result,
			},
		];
		let nextToVisit = 0;
		let limitExceeded = false;
		const collectOutlineEntries = /* @__PURE__ */ __name((node, result2) => {
			if (node.type === "array") {
				node.items.forEach((node2, index) => {
					if (node2) {
						if (limit > 0) {
							limit--;
							const range = getRange(document2, node2);
							const selectionRange = range;
							const name = String(index);
							const symbol = {
								name,
								kind: this.getSymbolKind(node2.type),
								range,
								selectionRange,
								children: [],
							};
							result2.push(symbol);
							toVisit.push({
								result: symbol.children,
								node: node2,
							});
						} else {
							limitExceeded = true;
						}
					}
				});
			} else if (node.type === "object") {
				node.properties.forEach((property) => {
					const valueNode = property.valueNode;
					if (valueNode) {
						if (limit > 0) {
							limit--;
							const range = getRange(document2, property);
							const selectionRange = getRange(document2, property.keyNode);
							const children = [];
							const symbol = {
								name: this.getKeyLabel(property),
								kind: this.getSymbolKind(valueNode.type),
								range,
								selectionRange,
								children,
								detail: this.getDetail(valueNode),
							};
							result2.push(symbol);
							toVisit.push({
								result: children,
								node: valueNode,
							});
						} else {
							limitExceeded = true;
						}
					}
				});
			}
		}, "collectOutlineEntries");
		while (nextToVisit < toVisit.length) {
			const next = toVisit[nextToVisit++];
			collectOutlineEntries(next.node, next.result);
		}
		if (limitExceeded && context && context.onResultLimitExceeded) {
			context.onResultLimitExceeded(resourceString);
		}
		return result;
	}
	getSymbolKind(nodeType) {
		switch (nodeType) {
			case "object":
				return SymbolKind.Module;
			case "string":
				return SymbolKind.String;
			case "number":
				return SymbolKind.Number;
			case "array":
				return SymbolKind.Array;
			case "boolean":
				return SymbolKind.Boolean;
			default:
				return SymbolKind.Variable;
		}
	}
	getKeyLabel(property) {
		let name = property.keyNode.value;
		if (name) {
			name = name.replace(/[\n]/g, "\u21B5");
		}
		if (name && name.trim()) {
			return name;
		}
		return `"${name}"`;
	}
	getDetail(node) {
		if (!node) {
			return void 0;
		}
		if (node.type === "boolean" || node.type === "number" || node.type === "null" || node.type === "string") {
			return String(node.value);
		} else {
			if (node.type === "array") {
				return node.children.length ? void 0 : "[]";
			} else if (node.type === "object") {
				return node.children.length ? void 0 : "{}";
			}
		}
		return void 0;
	}
	findDocumentColors(document2, doc, context) {
		return this.schemaService.getSchemaForResource(document2.uri, doc).then((schema) => {
			const result = [];
			if (schema) {
				let limit = context && typeof context.resultLimit === "number" ? context.resultLimit : Number.MAX_VALUE;
				const matchingSchemas = doc.getMatchingSchemas(schema.schema);
				const visitedNode = {};
				for (const s of matchingSchemas) {
					if (
						!s.inverted &&
						s.schema &&
						(s.schema.format === "color" || s.schema.format === "color-hex") &&
						s.node &&
						s.node.type === "string"
					) {
						const nodeId = String(s.node.offset);
						if (!visitedNode[nodeId]) {
							const color = colorFromHex(getNodeValue3(s.node));
							if (color) {
								const range = getRange(document2, s.node);
								result.push({
									color,
									range,
								});
							}
							visitedNode[nodeId] = true;
							limit--;
							if (limit <= 0) {
								if (context && context.onResultLimitExceeded) {
									context.onResultLimitExceeded(document2.uri);
								}
								return result;
							}
						}
					}
				}
			}
			return result;
		});
	}
	getColorPresentations(document2, doc, color, range) {
		const result = [];
		const red256 = Math.round(color.red * 255),
			green256 = Math.round(color.green * 255),
			blue256 = Math.round(color.blue * 255);
		function toTwoDigitHex(n) {
			const r = n.toString(16);
			return r.length !== 2 ? "0" + r : r;
		}
		__name(toTwoDigitHex, "toTwoDigitHex");
		let label;
		if (color.alpha === 1) {
			label = `#${toTwoDigitHex(red256)}${toTwoDigitHex(green256)}${toTwoDigitHex(blue256)}`;
		} else {
			label = `#${toTwoDigitHex(red256)}${toTwoDigitHex(green256)}${toTwoDigitHex(blue256)}${toTwoDigitHex(Math.round(color.alpha * 255))}`;
		}
		result.push({
			label,
			textEdit: TextEdit.replace(range, JSON.stringify(label)),
		});
		return result;
	}
};
function getRange(document2, node) {
	return Range2.create(document2.positionAt(node.offset), document2.positionAt(node.offset + node.length));
}
__name(getRange, "getRange");
function getName(node) {
	return getNodeValue3(node) || l10n4.t("<empty>");
}
__name(getName, "getName");

// ../../../node_modules/.pnpm/vscode-json-languageservice@5.6.3/node_modules/vscode-json-languageservice/lib/esm/services/configuration.js
init_cjs_shims();

// ../../../node_modules/.pnpm/vscode-json-languageservice@5.6.3/node_modules/vscode-json-languageservice/lib/esm/services/schemas/draft-2019-09-flat.js
init_cjs_shims();
var draft_2019_09_flat_default = {
	$id: "https://json-schema.org/draft/2019-09/schema",
	$schema: "https://json-schema.org/draft/2019-09/schema",
	title: "(Flattened static) Core and Validation specifications meta-schema",
	type: ["object", "boolean"],
	properties: {
		definitions: {
			$comment:
				"While no longer an official keyword as it is replaced by $defs, this keyword is retained in the meta-schema to prevent incompatible extensions as it remains in common use.",
			type: "object",
			additionalProperties: {
				$ref: "#",
			},
			default: {},
		},
		dependencies: {
			$comment:
				'"dependencies" is no longer a keyword, but schema authors should avoid redefining it to facilitate a smooth transition to "dependentSchemas" and "dependentRequired"',
			type: "object",
			additionalProperties: {
				anyOf: [
					{
						$ref: "#",
					},
					{
						$ref: "#/$defs/stringArray",
					},
				],
			},
		},
		$id: {
			type: "string",
			format: "uri-reference",
			$comment: "Non-empty fragments not allowed.",
			pattern: "^[^#]*#?$",
		},
		$schema: {
			type: "string",
			format: "uri",
		},
		$anchor: {
			type: "string",
			pattern: "^[A-Za-z][-A-Za-z0-9.:_]*$",
		},
		$ref: {
			type: "string",
			format: "uri-reference",
		},
		$recursiveAnchor: {
			type: "boolean",
			default: false,
		},
		$vocabulary: {
			type: "object",
			propertyNames: {
				type: "string",
				format: "uri",
			},
			additionalProperties: {
				type: "boolean",
			},
		},
		$comment: {
			type: "string",
		},
		$defs: {
			type: "object",
			additionalProperties: {
				$ref: "#",
			},
			default: {},
		},
		additionalItems: {
			$ref: "#",
		},
		unevaluatedItems: {
			$ref: "#",
		},
		items: {
			anyOf: [
				{
					$ref: "#",
				},
				{
					$ref: "#/$defs/schemaArray",
				},
			],
		},
		contains: {
			$ref: "#",
		},
		additionalProperties: {
			$ref: "#",
		},
		unevaluatedProperties: {
			$ref: "#",
		},
		properties: {
			type: "object",
			additionalProperties: {
				$ref: "#",
			},
			default: {},
		},
		patternProperties: {
			type: "object",
			additionalProperties: {
				$ref: "#",
			},
			propertyNames: {
				format: "regex",
			},
			default: {},
		},
		dependentSchemas: {
			type: "object",
			additionalProperties: {
				$ref: "#",
			},
		},
		propertyNames: {
			$ref: "#",
		},
		if: {
			$ref: "#",
		},
		then: {
			$ref: "#",
		},
		else: {
			$ref: "#",
		},
		allOf: {
			$ref: "#/$defs/schemaArray",
		},
		anyOf: {
			$ref: "#/$defs/schemaArray",
		},
		oneOf: {
			$ref: "#/$defs/schemaArray",
		},
		not: {
			$ref: "#",
		},
		multipleOf: {
			type: "number",
			exclusiveMinimum: 0,
		},
		maximum: {
			type: "number",
		},
		exclusiveMaximum: {
			type: "number",
		},
		minimum: {
			type: "number",
		},
		exclusiveMinimum: {
			type: "number",
		},
		maxLength: {
			$ref: "#/$defs/nonNegativeInteger",
		},
		minLength: {
			$ref: "#/$defs/nonNegativeIntegerDefault0",
		},
		pattern: {
			type: "string",
			format: "regex",
		},
		maxItems: {
			$ref: "#/$defs/nonNegativeInteger",
		},
		minItems: {
			$ref: "#/$defs/nonNegativeIntegerDefault0",
		},
		uniqueItems: {
			type: "boolean",
			default: false,
		},
		maxContains: {
			$ref: "#/$defs/nonNegativeInteger",
		},
		minContains: {
			$ref: "#/$defs/nonNegativeInteger",
			default: 1,
		},
		maxProperties: {
			$ref: "#/$defs/nonNegativeInteger",
		},
		minProperties: {
			$ref: "#/$defs/nonNegativeIntegerDefault0",
		},
		required: {
			$ref: "#/$defs/stringArray",
		},
		dependentRequired: {
			type: "object",
			additionalProperties: {
				$ref: "#/$defs/stringArray",
			},
		},
		const: true,
		enum: {
			type: "array",
			items: true,
		},
		type: {
			anyOf: [
				{
					$ref: "#/$defs/simpleTypes",
				},
				{
					type: "array",
					items: {
						$ref: "#/$defs/simpleTypes",
					},
					minItems: 1,
					uniqueItems: true,
				},
			],
		},
		title: {
			type: "string",
		},
		description: {
			type: "string",
		},
		default: true,
		deprecated: {
			type: "boolean",
			default: false,
		},
		readOnly: {
			type: "boolean",
			default: false,
		},
		writeOnly: {
			type: "boolean",
			default: false,
		},
		examples: {
			type: "array",
			items: true,
		},
		format: {
			type: "string",
		},
		contentMediaType: {
			type: "string",
		},
		contentEncoding: {
			type: "string",
		},
		contentSchema: {
			$ref: "#",
		},
	},
	$defs: {
		schemaArray: {
			type: "array",
			minItems: 1,
			items: {
				$ref: "#",
			},
		},
		nonNegativeInteger: {
			type: "integer",
			minimum: 0,
		},
		nonNegativeIntegerDefault0: {
			$ref: "#/$defs/nonNegativeInteger",
			default: 0,
		},
		simpleTypes: {
			enum: ["array", "boolean", "integer", "null", "number", "object", "string"],
		},
		stringArray: {
			type: "array",
			items: {
				type: "string",
			},
			uniqueItems: true,
			default: [],
		},
	},
};

// ../../../node_modules/.pnpm/vscode-json-languageservice@5.6.3/node_modules/vscode-json-languageservice/lib/esm/services/schemas/draft-2020-12-flat.js
init_cjs_shims();
var draft_2020_12_flat_default = {
	$id: "https://json-schema.org/draft/2020-12/schema",
	$schema: "https://json-schema.org/draft/2020-12/schema",
	title: "(Flattened static) Core and Validation specifications meta-schema",
	type: ["object", "boolean"],
	properties: {
		definitions: {
			$comment:
				"While no longer an official keyword as it is replaced by $defs, this keyword is retained in the meta-schema to prevent incompatible extensions as it remains in common use.",
			type: "object",
			additionalProperties: {
				$ref: "#",
			},
			default: {},
		},
		dependencies: {
			$comment:
				'"dependencies" is no longer a keyword, but schema authors should avoid redefining it to facilitate a smooth transition to "dependentSchemas" and "dependentRequired"',
			type: "object",
			additionalProperties: {
				anyOf: [
					{
						$ref: "#",
					},
					{
						$ref: "#/$defs/stringArray",
					},
				],
			},
		},
		$id: {
			type: "string",
			format: "uri-reference",
			$comment: "Non-empty fragments not allowed.",
			pattern: "^[^#]*#?$",
		},
		$schema: {
			type: "string",
			format: "uri",
		},
		$anchor: {
			type: "string",
			pattern: "^[A-Za-z_][-A-Za-z0-9._]*$",
		},
		$ref: {
			type: "string",
			format: "uri-reference",
		},
		$dynamicRef: {
			type: "string",
			format: "uri-reference",
		},
		$vocabulary: {
			type: "object",
			propertyNames: {
				type: "string",
				format: "uri",
			},
			additionalProperties: {
				type: "boolean",
			},
		},
		$comment: {
			type: "string",
		},
		$defs: {
			type: "object",
			additionalProperties: {
				$ref: "#",
			},
			default: {},
		},
		prefixItems: {
			$ref: "#/$defs/schemaArray",
		},
		items: {
			$ref: "#",
		},
		contains: {
			$ref: "#",
		},
		additionalProperties: {
			$ref: "#",
		},
		properties: {
			type: "object",
			additionalProperties: {
				$ref: "#",
			},
			default: {},
		},
		patternProperties: {
			type: "object",
			additionalProperties: {
				$ref: "#",
			},
			propertyNames: {
				format: "regex",
			},
			default: {},
		},
		dependentSchemas: {
			type: "object",
			additionalProperties: {
				$ref: "#",
			},
		},
		propertyNames: {
			$ref: "#",
		},
		if: {
			$ref: "#",
		},
		then: {
			$ref: "#",
		},
		else: {
			$ref: "#",
		},
		allOf: {
			$ref: "#/$defs/schemaArray",
		},
		anyOf: {
			$ref: "#/$defs/schemaArray",
		},
		oneOf: {
			$ref: "#/$defs/schemaArray",
		},
		not: {
			$ref: "#",
		},
		unevaluatedItems: {
			$ref: "#",
		},
		unevaluatedProperties: {
			$ref: "#",
		},
		multipleOf: {
			type: "number",
			exclusiveMinimum: 0,
		},
		maximum: {
			type: "number",
		},
		exclusiveMaximum: {
			type: "number",
		},
		minimum: {
			type: "number",
		},
		exclusiveMinimum: {
			type: "number",
		},
		maxLength: {
			$ref: "#/$defs/nonNegativeInteger",
		},
		minLength: {
			$ref: "#/$defs/nonNegativeIntegerDefault0",
		},
		pattern: {
			type: "string",
			format: "regex",
		},
		maxItems: {
			$ref: "#/$defs/nonNegativeInteger",
		},
		minItems: {
			$ref: "#/$defs/nonNegativeIntegerDefault0",
		},
		uniqueItems: {
			type: "boolean",
			default: false,
		},
		maxContains: {
			$ref: "#/$defs/nonNegativeInteger",
		},
		minContains: {
			$ref: "#/$defs/nonNegativeInteger",
			default: 1,
		},
		maxProperties: {
			$ref: "#/$defs/nonNegativeInteger",
		},
		minProperties: {
			$ref: "#/$defs/nonNegativeIntegerDefault0",
		},
		required: {
			$ref: "#/$defs/stringArray",
		},
		dependentRequired: {
			type: "object",
			additionalProperties: {
				$ref: "#/$defs/stringArray",
			},
		},
		const: true,
		enum: {
			type: "array",
			items: true,
		},
		type: {
			anyOf: [
				{
					$ref: "#/$defs/simpleTypes",
				},
				{
					type: "array",
					items: {
						$ref: "#/$defs/simpleTypes",
					},
					minItems: 1,
					uniqueItems: true,
				},
			],
		},
		title: {
			type: "string",
		},
		description: {
			type: "string",
		},
		default: true,
		deprecated: {
			type: "boolean",
			default: false,
		},
		readOnly: {
			type: "boolean",
			default: false,
		},
		writeOnly: {
			type: "boolean",
			default: false,
		},
		examples: {
			type: "array",
			items: true,
		},
		format: {
			type: "string",
		},
		contentMediaType: {
			type: "string",
		},
		contentEncoding: {
			type: "string",
		},
		contentSchema: {
			$ref: "#",
		},
	},
	$defs: {
		schemaArray: {
			type: "array",
			minItems: 1,
			items: {
				$ref: "#",
			},
		},
		nonNegativeInteger: {
			type: "integer",
			minimum: 0,
		},
		nonNegativeIntegerDefault0: {
			$ref: "#/$defs/nonNegativeInteger",
			default: 0,
		},
		simpleTypes: {
			enum: ["array", "boolean", "integer", "null", "number", "object", "string"],
		},
		stringArray: {
			type: "array",
			items: {
				type: "string",
			},
			uniqueItems: true,
			default: [],
		},
	},
};

// ../../../node_modules/.pnpm/vscode-json-languageservice@5.6.3/node_modules/vscode-json-languageservice/lib/esm/services/configuration.js
var l10n5 = __toESM(require_main5());
var schemaContributions = {
	schemaAssociations: [],
	schemas: {
		// bundle the schema-schema to include (localized) descriptions
		"https://json-schema.org/draft-04/schema": {
			definitions: {
				schemaArray: {
					type: "array",
					minItems: 1,
					items: {
						$ref: "#",
					},
				},
				positiveInteger: {
					type: "integer",
					minimum: 0,
				},
				positiveIntegerDefault0: {
					allOf: [
						{
							$ref: "#/definitions/positiveInteger",
						},
						{
							default: 0,
						},
					],
				},
				simpleTypes: {
					type: "string",
					enum: ["array", "boolean", "integer", "null", "number", "object", "string"],
				},
				stringArray: {
					type: "array",
					items: {
						type: "string",
					},
					minItems: 1,
					uniqueItems: true,
				},
			},
			type: "object",
			properties: {
				id: {
					type: "string",
					format: "uri",
				},
				$schema: {
					type: "string",
					format: "uri",
				},
				title: {
					type: "string",
				},
				description: {
					type: "string",
				},
				default: {},
				multipleOf: {
					type: "number",
					minimum: 0,
					exclusiveMinimum: true,
				},
				maximum: {
					type: "number",
				},
				exclusiveMaximum: {
					type: "boolean",
					default: false,
				},
				minimum: {
					type: "number",
				},
				exclusiveMinimum: {
					type: "boolean",
					default: false,
				},
				maxLength: {
					allOf: [
						{
							$ref: "#/definitions/positiveInteger",
						},
					],
				},
				minLength: {
					allOf: [
						{
							$ref: "#/definitions/positiveIntegerDefault0",
						},
					],
				},
				pattern: {
					type: "string",
					format: "regex",
				},
				additionalItems: {
					anyOf: [
						{
							type: "boolean",
						},
						{
							$ref: "#",
						},
					],
					default: {},
				},
				items: {
					anyOf: [
						{
							$ref: "#",
						},
						{
							$ref: "#/definitions/schemaArray",
						},
					],
					default: {},
				},
				maxItems: {
					allOf: [
						{
							$ref: "#/definitions/positiveInteger",
						},
					],
				},
				minItems: {
					allOf: [
						{
							$ref: "#/definitions/positiveIntegerDefault0",
						},
					],
				},
				uniqueItems: {
					type: "boolean",
					default: false,
				},
				maxProperties: {
					allOf: [
						{
							$ref: "#/definitions/positiveInteger",
						},
					],
				},
				minProperties: {
					allOf: [
						{
							$ref: "#/definitions/positiveIntegerDefault0",
						},
					],
				},
				required: {
					allOf: [
						{
							$ref: "#/definitions/stringArray",
						},
					],
				},
				additionalProperties: {
					anyOf: [
						{
							type: "boolean",
						},
						{
							$ref: "#",
						},
					],
					default: {},
				},
				definitions: {
					type: "object",
					additionalProperties: {
						$ref: "#",
					},
					default: {},
				},
				properties: {
					type: "object",
					additionalProperties: {
						$ref: "#",
					},
					default: {},
				},
				patternProperties: {
					type: "object",
					additionalProperties: {
						$ref: "#",
					},
					default: {},
				},
				dependencies: {
					type: "object",
					additionalProperties: {
						anyOf: [
							{
								$ref: "#",
							},
							{
								$ref: "#/definitions/stringArray",
							},
						],
					},
				},
				enum: {
					type: "array",
					minItems: 1,
					uniqueItems: true,
				},
				type: {
					anyOf: [
						{
							$ref: "#/definitions/simpleTypes",
						},
						{
							type: "array",
							items: {
								$ref: "#/definitions/simpleTypes",
							},
							minItems: 1,
							uniqueItems: true,
						},
					],
				},
				format: {
					anyOf: [
						{
							type: "string",
							enum: ["date-time", "uri", "email", "hostname", "ipv4", "ipv6", "regex"],
						},
						{
							type: "string",
						},
					],
				},
				allOf: {
					allOf: [
						{
							$ref: "#/definitions/schemaArray",
						},
					],
				},
				anyOf: {
					allOf: [
						{
							$ref: "#/definitions/schemaArray",
						},
					],
				},
				oneOf: {
					allOf: [
						{
							$ref: "#/definitions/schemaArray",
						},
					],
				},
				not: {
					allOf: [
						{
							$ref: "#",
						},
					],
				},
			},
			dependencies: {
				exclusiveMaximum: ["maximum"],
				exclusiveMinimum: ["minimum"],
			},
			default: {},
		},
		"https://json-schema.org/draft-07/schema": {
			definitions: {
				schemaArray: {
					type: "array",
					minItems: 1,
					items: {
						$ref: "#",
					},
				},
				nonNegativeInteger: {
					type: "integer",
					minimum: 0,
				},
				nonNegativeIntegerDefault0: {
					allOf: [
						{
							$ref: "#/definitions/nonNegativeInteger",
						},
						{
							default: 0,
						},
					],
				},
				simpleTypes: {
					enum: ["array", "boolean", "integer", "null", "number", "object", "string"],
				},
				stringArray: {
					type: "array",
					items: {
						type: "string",
					},
					uniqueItems: true,
					default: [],
				},
			},
			type: ["object", "boolean"],
			properties: {
				$id: {
					type: "string",
					format: "uri-reference",
				},
				$schema: {
					type: "string",
					format: "uri",
				},
				$ref: {
					type: "string",
					format: "uri-reference",
				},
				$comment: {
					type: "string",
				},
				title: {
					type: "string",
				},
				description: {
					type: "string",
				},
				default: true,
				readOnly: {
					type: "boolean",
					default: false,
				},
				examples: {
					type: "array",
					items: true,
				},
				multipleOf: {
					type: "number",
					exclusiveMinimum: 0,
				},
				maximum: {
					type: "number",
				},
				exclusiveMaximum: {
					type: "number",
				},
				minimum: {
					type: "number",
				},
				exclusiveMinimum: {
					type: "number",
				},
				maxLength: {
					$ref: "#/definitions/nonNegativeInteger",
				},
				minLength: {
					$ref: "#/definitions/nonNegativeIntegerDefault0",
				},
				pattern: {
					type: "string",
					format: "regex",
				},
				additionalItems: {
					$ref: "#",
				},
				items: {
					anyOf: [
						{
							$ref: "#",
						},
						{
							$ref: "#/definitions/schemaArray",
						},
					],
					default: true,
				},
				maxItems: {
					$ref: "#/definitions/nonNegativeInteger",
				},
				minItems: {
					$ref: "#/definitions/nonNegativeIntegerDefault0",
				},
				uniqueItems: {
					type: "boolean",
					default: false,
				},
				contains: {
					$ref: "#",
				},
				maxProperties: {
					$ref: "#/definitions/nonNegativeInteger",
				},
				minProperties: {
					$ref: "#/definitions/nonNegativeIntegerDefault0",
				},
				required: {
					$ref: "#/definitions/stringArray",
				},
				additionalProperties: {
					$ref: "#",
				},
				definitions: {
					type: "object",
					additionalProperties: {
						$ref: "#",
					},
					default: {},
				},
				properties: {
					type: "object",
					additionalProperties: {
						$ref: "#",
					},
					default: {},
				},
				patternProperties: {
					type: "object",
					additionalProperties: {
						$ref: "#",
					},
					propertyNames: {
						format: "regex",
					},
					default: {},
				},
				dependencies: {
					type: "object",
					additionalProperties: {
						anyOf: [
							{
								$ref: "#",
							},
							{
								$ref: "#/definitions/stringArray",
							},
						],
					},
				},
				propertyNames: {
					$ref: "#",
				},
				const: true,
				enum: {
					type: "array",
					items: true,
					minItems: 1,
					uniqueItems: true,
				},
				type: {
					anyOf: [
						{
							$ref: "#/definitions/simpleTypes",
						},
						{
							type: "array",
							items: {
								$ref: "#/definitions/simpleTypes",
							},
							minItems: 1,
							uniqueItems: true,
						},
					],
				},
				format: {
					type: "string",
				},
				contentMediaType: {
					type: "string",
				},
				contentEncoding: {
					type: "string",
				},
				if: {
					$ref: "#",
				},
				then: {
					$ref: "#",
				},
				else: {
					$ref: "#",
				},
				allOf: {
					$ref: "#/definitions/schemaArray",
				},
				anyOf: {
					$ref: "#/definitions/schemaArray",
				},
				oneOf: {
					$ref: "#/definitions/schemaArray",
				},
				not: {
					$ref: "#",
				},
			},
			default: true,
		},
		"https://json-schema.org/draft/2020-12/schema": draft_2020_12_flat_default,
		"https://json-schema.org/draft/2019-09/schema": draft_2019_09_flat_default,
	},
};
var descriptions = {
	id: l10n5.t("A unique identifier for the schema."),
	$schema: l10n5.t("The schema to verify this document against."),
	title: l10n5.t("A descriptive title of the schema."),
	description: l10n5.t("A long description of the schema. Used in hover menus and suggestions."),
	default: l10n5.t("A default value. Used by suggestions."),
	multipleOf: l10n5.t("A number that should cleanly divide the current value (i.e. have no remainder)."),
	maximum: l10n5.t("The maximum numerical value, inclusive by default."),
	exclusiveMaximum: l10n5.t("Makes the maximum property exclusive."),
	minimum: l10n5.t("The minimum numerical value, inclusive by default."),
	exclusiveMinimum: l10n5.t("Makes the minimum property exclusive."),
	maxLength: l10n5.t("The maximum length of a string."),
	minLength: l10n5.t("The minimum length of a string."),
	pattern: l10n5.t("A regular expression to match the string against. It is not implicitly anchored."),
	additionalItems: l10n5.t(
		"For arrays, only when items is set as an array. If items are a schema, this schema validates items after the ones specified by the items schema. If false, additional items will cause validation to fail.",
	),
	items: l10n5.t(
		"For arrays. Can either be a schema to validate every element against or an array of schemas to validate each item against in order (the first schema will validate the first element, the second schema will validate the second element, and so on.",
	),
	maxItems: l10n5.t("The maximum number of items that can be inside an array. Inclusive."),
	minItems: l10n5.t("The minimum number of items that can be inside an array. Inclusive."),
	uniqueItems: l10n5.t("If all of the items in the array must be unique. Defaults to false."),
	maxProperties: l10n5.t("The maximum number of properties an object can have. Inclusive."),
	minProperties: l10n5.t("The minimum number of properties an object can have. Inclusive."),
	required: l10n5.t("An array of strings that lists the names of all properties required on this object."),
	additionalProperties: l10n5.t(
		"Either a schema or a boolean. If a schema, used to validate all properties not matched by 'properties', 'propertyNames', or 'patternProperties'. If false, any properties not defined by the adajacent keywords will cause this schema to fail.",
	),
	definitions: l10n5.t("Not used for validation. Place subschemas here that you wish to reference inline with $ref."),
	properties: l10n5.t("A map of property names to schemas for each property."),
	patternProperties: l10n5.t("A map of regular expressions on property names to schemas for matching properties."),
	dependencies: l10n5.t(
		"A map of property names to either an array of property names or a schema. An array of property names means the property named in the key depends on the properties in the array being present in the object in order to be valid. If the value is a schema, then the schema is only applied to the object if the property in the key exists on the object.",
	),
	enum: l10n5.t("The set of literal values that are valid."),
	type: l10n5.t(
		"Either a string of one of the basic schema types (number, integer, null, array, object, boolean, string) or an array of strings specifying a subset of those types.",
	),
	format: l10n5.t("Describes the format expected for the value. By default, not used for validation"),
	allOf: l10n5.t("An array of schemas, all of which must match."),
	anyOf: l10n5.t("An array of schemas, where at least one must match."),
	oneOf: l10n5.t("An array of schemas, exactly one of which must match."),
	not: l10n5.t("A schema which must not match."),
	$id: l10n5.t("A unique identifier for the schema."),
	$ref: l10n5.t("Reference a definition hosted on any location."),
	$comment: l10n5.t("Comments from schema authors to readers or maintainers of the schema."),
	readOnly: l10n5.t("Indicates that the value of the instance is managed exclusively by the owning authority."),
	examples: l10n5.t("Sample JSON values associated with a particular schema, for the purpose of illustrating usage."),
	contains: l10n5.t(
		'An array instance is valid against "contains" if at least one of its elements is valid against the given schema.',
	),
	propertyNames: l10n5.t(
		"If the instance is an object, this keyword validates if every property name in the instance validates against the provided schema.",
	),
	const: l10n5.t(
		"An instance validates successfully against this keyword if its value is equal to the value of the keyword.",
	),
	contentMediaType: l10n5.t("Describes the media type of a string property."),
	contentEncoding: l10n5.t("Describes the content encoding of a string property."),
	if: l10n5.t(
		'The validation outcome of the "if" subschema controls which of the "then" or "else" keywords are evaluated.',
	),
	then: l10n5.t('The "then" subschema is used for validation when the "if" subschema succeeds.'),
	else: l10n5.t('The "else" subschema is used for validation when the "if" subschema fails.'),
};
for (const schemaName in schemaContributions.schemas) {
	const schema = schemaContributions.schemas[schemaName];
	for (const property in schema.properties) {
		let propertyObject = schema.properties[property];
		if (typeof propertyObject === "boolean") {
			propertyObject = schema.properties[property] = {};
		}
		const description = descriptions[property];
		if (description) {
			propertyObject["description"] = description;
		}
	}
}

// ../../../node_modules/.pnpm/vscode-json-languageservice@5.6.3/node_modules/vscode-json-languageservice/lib/esm/services/jsonSchemaService.js
init_cjs_shims();
var l10n6 = __toESM(require_main5());

// ../../../node_modules/.pnpm/vscode-json-languageservice@5.6.3/node_modules/vscode-json-languageservice/lib/esm/utils/glob.js
init_cjs_shims();
function createRegex(glob, opts) {
	if (typeof glob !== "string") {
		throw new TypeError("Expected a string");
	}
	const str = String(glob);
	let reStr = "";
	const extended = opts ? !!opts.extended : false;
	const globstar = opts ? !!opts.globstar : false;
	let inGroup = false;
	const flags = opts && typeof opts.flags === "string" ? opts.flags : "";
	let c;
	for (let i = 0, len = str.length; i < len; i++) {
		c = str[i];
		switch (c) {
			case "/":
			case "$":
			case "^":
			case "+":
			case ".":
			case "(":
			case ")":
			case "=":
			case "!":
			case "|":
				reStr += "\\" + c;
				break;
			case "?":
				if (extended) {
					reStr += ".";
					break;
				}
			case "[":
			case "]":
				if (extended) {
					reStr += c;
					break;
				}
			case "{":
				if (extended) {
					inGroup = true;
					reStr += "(";
					break;
				}
			case "}":
				if (extended) {
					inGroup = false;
					reStr += ")";
					break;
				}
			case ",":
				if (inGroup) {
					reStr += "|";
					break;
				}
				reStr += "\\" + c;
				break;
			case "*":
				const prevChar = str[i - 1];
				let starCount = 1;
				while (str[i + 1] === "*") {
					starCount++;
					i++;
				}
				const nextChar = str[i + 1];
				if (!globstar) {
					reStr += ".*";
				} else {
					const isGlobstar =
						starCount > 1 &&
						(prevChar === "/" || prevChar === void 0 || prevChar === "{" || prevChar === ",") &&
						(nextChar === "/" || nextChar === void 0 || nextChar === "," || nextChar === "}");
					if (isGlobstar) {
						if (nextChar === "/") {
							i++;
						} else if (prevChar === "/" && reStr.endsWith("\\/")) {
							reStr = reStr.substr(0, reStr.length - 2);
						}
						reStr += "((?:[^/]*(?:/|$))*)";
					} else {
						reStr += "([^/]*)";
					}
				}
				break;
			default:
				reStr += c;
		}
	}
	if (!flags || !~flags.indexOf("g")) {
		reStr = "^" + reStr + "$";
	}
	return new RegExp(reStr, flags);
}
__name(createRegex, "createRegex");

// ../../../node_modules/.pnpm/vscode-json-languageservice@5.6.3/node_modules/vscode-json-languageservice/lib/esm/services/jsonSchemaService.js
var BANG = "!";
var PATH_SEP = "/";
var FilePatternAssociation = class FilePatternAssociation2 {
	static {
		__name(this, "FilePatternAssociation");
	}
	constructor(pattern, folderUri, uris) {
		this.folderUri = folderUri;
		this.uris = uris;
		this.globWrappers = [];
		try {
			for (let patternString of pattern) {
				const include = patternString[0] !== BANG;
				if (!include) {
					patternString = patternString.substring(1);
				}
				if (patternString.length > 0) {
					if (patternString[0] === PATH_SEP) {
						patternString = patternString.substring(1);
					}
					this.globWrappers.push({
						regexp: createRegex("**/" + patternString, {
							extended: true,
							globstar: true,
						}),
						include,
					});
				}
			}
			if (folderUri) {
				folderUri = normalizeResourceForMatching(folderUri);
				if (!folderUri.endsWith("/")) {
					folderUri = folderUri + "/";
				}
				this.folderUri = folderUri;
			}
		} catch (e) {
			this.globWrappers.length = 0;
			this.uris = [];
		}
	}
	matchesPattern(fileName) {
		if (this.folderUri && !fileName.startsWith(this.folderUri)) {
			return false;
		}
		let match = false;
		for (const { regexp, include } of this.globWrappers) {
			if (regexp.test(fileName)) {
				match = include;
			}
		}
		return match;
	}
	getURIs() {
		return this.uris;
	}
};
var SchemaHandle = class SchemaHandle2 {
	static {
		__name(this, "SchemaHandle");
	}
	constructor(service, uri, unresolvedSchemaContent) {
		this.service = service;
		this.uri = uri;
		this.dependencies = /* @__PURE__ */ new Set();
		this.anchors = void 0;
		if (unresolvedSchemaContent) {
			this.unresolvedSchema = this.service.promise.resolve(new UnresolvedSchema(unresolvedSchemaContent));
		}
	}
	getUnresolvedSchema() {
		if (!this.unresolvedSchema) {
			this.unresolvedSchema = this.service.loadSchema(this.uri);
		}
		return this.unresolvedSchema;
	}
	getResolvedSchema() {
		if (!this.resolvedSchema) {
			this.resolvedSchema = this.getUnresolvedSchema().then((unresolved) => {
				return this.service.resolveSchemaContent(unresolved, this);
			});
		}
		return this.resolvedSchema;
	}
	clearSchema() {
		const hasChanges = !!this.unresolvedSchema;
		this.resolvedSchema = void 0;
		this.unresolvedSchema = void 0;
		this.dependencies.clear();
		this.anchors = void 0;
		return hasChanges;
	}
};
var UnresolvedSchema = class {
	static {
		__name(this, "UnresolvedSchema");
	}
	constructor(schema, errors = []) {
		this.schema = schema;
		this.errors = errors;
	}
};
var ResolvedSchema = class {
	static {
		__name(this, "ResolvedSchema");
	}
	constructor(schema, errors = [], warnings = [], schemaDraft) {
		this.schema = schema;
		this.errors = errors;
		this.warnings = warnings;
		this.schemaDraft = schemaDraft;
	}
	getSection(path) {
		const schemaRef = this.getSectionRecursive(path, this.schema);
		if (schemaRef) {
			return asSchema(schemaRef);
		}
		return void 0;
	}
	getSectionRecursive(path, schema) {
		if (!schema || typeof schema === "boolean" || path.length === 0) {
			return schema;
		}
		const next = path.shift();
		if (schema.properties && typeof schema.properties[next]) {
			return this.getSectionRecursive(path, schema.properties[next]);
		} else if (schema.patternProperties) {
			for (const pattern of Object.keys(schema.patternProperties)) {
				const regex = extendedRegExp(pattern);
				if (regex?.test(next)) {
					return this.getSectionRecursive(path, schema.patternProperties[pattern]);
				}
			}
		} else if (typeof schema.additionalProperties === "object") {
			return this.getSectionRecursive(path, schema.additionalProperties);
		} else if (next.match("[0-9]+")) {
			if (Array.isArray(schema.items)) {
				const index = parseInt(next, 10);
				if (!isNaN(index) && schema.items[index]) {
					return this.getSectionRecursive(path, schema.items[index]);
				}
			} else if (schema.items) {
				return this.getSectionRecursive(path, schema.items);
			}
		}
		return void 0;
	}
};
var JSONSchemaService = class {
	static {
		__name(this, "JSONSchemaService");
	}
	constructor(requestService, contextService, promiseConstructor) {
		this.contextService = contextService;
		this.requestService = requestService;
		this.promiseConstructor = promiseConstructor || Promise;
		this.callOnDispose = [];
		this.contributionSchemas = {};
		this.contributionAssociations = [];
		this.schemasById = {};
		this.filePatternAssociations = [];
		this.registeredSchemasIds = {};
	}
	getRegisteredSchemaIds(filter) {
		return Object.keys(this.registeredSchemasIds).filter((id) => {
			const scheme = URI2.parse(id).scheme;
			return scheme !== "schemaservice" && (!filter || filter(scheme));
		});
	}
	get promise() {
		return this.promiseConstructor;
	}
	dispose() {
		while (this.callOnDispose.length > 0) {
			this.callOnDispose.pop()();
		}
	}
	onResourceChange(uri) {
		this.cachedSchemaForResource = void 0;
		let hasChanges = false;
		uri = normalizeId(uri);
		const toWalk = [uri];
		const all = Object.keys(this.schemasById).map((key) => this.schemasById[key]);
		while (toWalk.length) {
			const curr = toWalk.pop();
			for (let i = 0; i < all.length; i++) {
				const handle = all[i];
				if (handle && (handle.uri === curr || handle.dependencies.has(curr))) {
					if (handle.uri !== curr) {
						toWalk.push(handle.uri);
					}
					if (handle.clearSchema()) {
						hasChanges = true;
					}
					all[i] = void 0;
				}
			}
		}
		return hasChanges;
	}
	setSchemaContributions(schemaContributions2) {
		if (schemaContributions2.schemas) {
			const schemas = schemaContributions2.schemas;
			for (const id in schemas) {
				const normalizedId = normalizeId(id);
				this.contributionSchemas[normalizedId] = this.addSchemaHandle(normalizedId, schemas[id]);
			}
		}
		if (Array.isArray(schemaContributions2.schemaAssociations)) {
			const schemaAssociations = schemaContributions2.schemaAssociations;
			for (let schemaAssociation of schemaAssociations) {
				const uris = schemaAssociation.uris.map(normalizeId);
				const association = this.addFilePatternAssociation(schemaAssociation.pattern, schemaAssociation.folderUri, uris);
				this.contributionAssociations.push(association);
			}
		}
	}
	addSchemaHandle(id, unresolvedSchemaContent) {
		const schemaHandle = new SchemaHandle(this, id, unresolvedSchemaContent);
		this.schemasById[id] = schemaHandle;
		return schemaHandle;
	}
	getOrAddSchemaHandle(id, unresolvedSchemaContent) {
		return this.schemasById[id] || this.addSchemaHandle(id, unresolvedSchemaContent);
	}
	addFilePatternAssociation(pattern, folderUri, uris) {
		const fpa = new FilePatternAssociation(pattern, folderUri, uris);
		this.filePatternAssociations.push(fpa);
		return fpa;
	}
	registerExternalSchema(config) {
		const id = normalizeId(config.uri);
		this.registeredSchemasIds[id] = true;
		this.cachedSchemaForResource = void 0;
		if (config.fileMatch && config.fileMatch.length) {
			this.addFilePatternAssociation(config.fileMatch, config.folderUri, [id]);
		}
		return config.schema ? this.addSchemaHandle(id, config.schema) : this.getOrAddSchemaHandle(id);
	}
	clearExternalSchemas() {
		this.schemasById = {};
		this.filePatternAssociations = [];
		this.registeredSchemasIds = {};
		this.cachedSchemaForResource = void 0;
		for (const id in this.contributionSchemas) {
			this.schemasById[id] = this.contributionSchemas[id];
			this.registeredSchemasIds[id] = true;
		}
		for (const contributionAssociation of this.contributionAssociations) {
			this.filePatternAssociations.push(contributionAssociation);
		}
	}
	getResolvedSchema(schemaId) {
		const id = normalizeId(schemaId);
		const schemaHandle = this.schemasById[id];
		if (schemaHandle) {
			return schemaHandle.getResolvedSchema();
		}
		return this.promise.resolve(void 0);
	}
	loadSchema(url) {
		if (!this.requestService) {
			const errorMessage = l10n6.t(
				"Unable to load schema from '{0}'. No schema request service available",
				toDisplayString(url),
			);
			return this.promise.resolve(new UnresolvedSchema({}, [errorMessage]));
		}
		return this.requestService(url).then(
			(content) => {
				if (!content) {
					const errorMessage = l10n6.t("Unable to load schema from '{0}': No content.", toDisplayString(url));
					return new UnresolvedSchema({}, [errorMessage]);
				}
				const errors = [];
				if (content.charCodeAt(0) === 65279) {
					errors.push(
						l10n6.t(
							"Problem reading content from '{0}': UTF-8 with BOM detected, only UTF 8 is allowed.",
							toDisplayString(url),
						),
					);
					content = content.trimStart();
				}
				let schemaContent = {};
				const jsonErrors = [];
				schemaContent = parse2(content, jsonErrors);
				if (jsonErrors.length) {
					errors.push(
						l10n6.t(
							"Unable to parse content from '{0}': Parse error at offset {1}.",
							toDisplayString(url),
							jsonErrors[0].offset,
						),
					);
				}
				return new UnresolvedSchema(schemaContent, errors);
			},
			(error) => {
				let errorMessage = error.toString();
				const errorSplit = error.toString().split("Error: ");
				if (errorSplit.length > 1) {
					errorMessage = errorSplit[1];
				}
				if (endsWith(errorMessage, ".")) {
					errorMessage = errorMessage.substr(0, errorMessage.length - 1);
				}
				return new UnresolvedSchema({}, [
					l10n6.t("Unable to load schema from '{0}': {1}.", toDisplayString(url), errorMessage),
				]);
			},
		);
	}
	resolveSchemaContent(schemaToResolve, handle) {
		const resolveErrors = schemaToResolve.errors.slice(0);
		const schema = schemaToResolve.schema;
		const schemaDraft = schema.$schema ? getSchemaDraftFromId(schema.$schema) : void 0;
		if (schemaDraft === SchemaDraft.v3) {
			return this.promise.resolve(
				new ResolvedSchema({}, [l10n6.t("Draft-03 schemas are not supported.")], [], schemaDraft),
			);
		}
		let usesUnsupportedFeatures = /* @__PURE__ */ new Set();
		const contextService = this.contextService;
		const findSectionByJSONPointer = /* @__PURE__ */ __name((schema2, path) => {
			path = decodeURIComponent(path);
			let current = schema2;
			if (path[0] === "/") {
				path = path.substring(1);
			}
			path.split("/").some((part) => {
				part = part.replace(/~1/g, "/").replace(/~0/g, "~");
				current = current[part];
				return !current;
			});
			return current;
		}, "findSectionByJSONPointer");
		const findSchemaById = /* @__PURE__ */ __name((schema2, handle2, id) => {
			if (!handle2.anchors) {
				handle2.anchors = collectAnchors(schema2);
			}
			return handle2.anchors.get(id);
		}, "findSchemaById");
		const merge = /* @__PURE__ */ __name((target, section) => {
			for (const key in section) {
				if (section.hasOwnProperty(key) && key !== "id" && key !== "$id") {
					target[key] = section[key];
				}
			}
		}, "merge");
		const mergeRef = /* @__PURE__ */ __name((target, sourceRoot, sourceHandle, refSegment) => {
			let section;
			if (refSegment === void 0 || refSegment.length === 0) {
				section = sourceRoot;
			} else if (refSegment.charAt(0) === "/") {
				section = findSectionByJSONPointer(sourceRoot, refSegment);
			} else {
				section = findSchemaById(sourceRoot, sourceHandle, refSegment);
			}
			if (section) {
				merge(target, section);
			} else {
				resolveErrors.push(l10n6.t("$ref '{0}' in '{1}' can not be resolved.", refSegment || "", sourceHandle.uri));
			}
		}, "mergeRef");
		const resolveExternalLink = /* @__PURE__ */ __name((node, uri, refSegment, parentHandle) => {
			if (contextService && !/^[A-Za-z][A-Za-z0-9+\-.+]*:\/.*/.test(uri)) {
				uri = contextService.resolveRelativePath(uri, parentHandle.uri);
			}
			uri = normalizeId(uri);
			const referencedHandle = this.getOrAddSchemaHandle(uri);
			return referencedHandle.getUnresolvedSchema().then((unresolvedSchema) => {
				parentHandle.dependencies.add(uri);
				if (unresolvedSchema.errors.length) {
					const loc = refSegment ? uri + "#" + refSegment : uri;
					resolveErrors.push(l10n6.t("Problems loading reference '{0}': {1}", loc, unresolvedSchema.errors[0]));
				}
				mergeRef(node, unresolvedSchema.schema, referencedHandle, refSegment);
				return resolveRefs(node, unresolvedSchema.schema, referencedHandle);
			});
		}, "resolveExternalLink");
		const resolveRefs = /* @__PURE__ */ __name((node, parentSchema, parentHandle) => {
			const openPromises = [];
			this.traverseNodes(node, (next) => {
				const seenRefs = /* @__PURE__ */ new Set();
				while (next.$ref) {
					const ref = next.$ref;
					const segments = ref.split("#", 2);
					delete next.$ref;
					if (segments[0].length > 0) {
						openPromises.push(resolveExternalLink(next, segments[0], segments[1], parentHandle));
						return;
					} else {
						if (!seenRefs.has(ref)) {
							const id = segments[1];
							mergeRef(next, parentSchema, parentHandle, id);
							seenRefs.add(ref);
						}
					}
				}
				if (next.$recursiveRef) {
					usesUnsupportedFeatures.add("$recursiveRef");
				}
				if (next.$dynamicRef) {
					usesUnsupportedFeatures.add("$dynamicRef");
				}
			});
			return this.promise.all(openPromises);
		}, "resolveRefs");
		const collectAnchors = /* @__PURE__ */ __name((root) => {
			const result = /* @__PURE__ */ new Map();
			this.traverseNodes(root, (next) => {
				const id = next.$id || next.id;
				const anchor = isString(id) && id.charAt(0) === "#" ? id.substring(1) : next.$anchor;
				if (anchor) {
					if (result.has(anchor)) {
						resolveErrors.push(l10n6.t("Duplicate anchor declaration: '{0}'", anchor));
					} else {
						result.set(anchor, next);
					}
				}
				if (next.$recursiveAnchor) {
					usesUnsupportedFeatures.add("$recursiveAnchor");
				}
				if (next.$dynamicAnchor) {
					usesUnsupportedFeatures.add("$dynamicAnchor");
				}
			});
			return result;
		}, "collectAnchors");
		return resolveRefs(schema, schema, handle).then((_) => {
			let resolveWarnings = [];
			if (usesUnsupportedFeatures.size) {
				resolveWarnings.push(
					l10n6.t(
						"The schema uses meta-schema features ({0}) that are not yet supported by the validator.",
						Array.from(usesUnsupportedFeatures.keys()).join(", "),
					),
				);
			}
			return new ResolvedSchema(schema, resolveErrors, resolveWarnings, schemaDraft);
		});
	}
	traverseNodes(root, handle) {
		if (!root || typeof root !== "object") {
			return Promise.resolve(null);
		}
		const seen = /* @__PURE__ */ new Set();
		const collectEntries = /* @__PURE__ */ __name((...entries) => {
			for (const entry of entries) {
				if (isObject(entry)) {
					toWalk.push(entry);
				}
			}
		}, "collectEntries");
		const collectMapEntries = /* @__PURE__ */ __name((...maps) => {
			for (const map of maps) {
				if (isObject(map)) {
					for (const k in map) {
						const key = k;
						const entry = map[key];
						if (isObject(entry)) {
							toWalk.push(entry);
						}
					}
				}
			}
		}, "collectMapEntries");
		const collectArrayEntries = /* @__PURE__ */ __name((...arrays) => {
			for (const array of arrays) {
				if (Array.isArray(array)) {
					for (const entry of array) {
						if (isObject(entry)) {
							toWalk.push(entry);
						}
					}
				}
			}
		}, "collectArrayEntries");
		const collectEntryOrArrayEntries = /* @__PURE__ */ __name((items) => {
			if (Array.isArray(items)) {
				for (const entry of items) {
					if (isObject(entry)) {
						toWalk.push(entry);
					}
				}
			} else if (isObject(items)) {
				toWalk.push(items);
			}
		}, "collectEntryOrArrayEntries");
		const toWalk = [root];
		let next = toWalk.pop();
		while (next) {
			if (!seen.has(next)) {
				seen.add(next);
				handle(next);
				collectEntries(
					next.additionalItems,
					next.additionalProperties,
					next.not,
					next.contains,
					next.propertyNames,
					next.if,
					next.then,
					next.else,
					next.unevaluatedItems,
					next.unevaluatedProperties,
				);
				collectMapEntries(
					next.definitions,
					next.$defs,
					next.properties,
					next.patternProperties,
					next.dependencies,
					next.dependentSchemas,
				);
				collectArrayEntries(next.anyOf, next.allOf, next.oneOf, next.prefixItems);
				collectEntryOrArrayEntries(next.items);
			}
			next = toWalk.pop();
		}
	}
	getSchemaFromProperty(resource, document2) {
		if (document2.root?.type === "object") {
			for (const p of document2.root.properties) {
				if (p.keyNode.value === "$schema" && p.valueNode?.type === "string") {
					let schemaId = p.valueNode.value;
					if (this.contextService && !/^\w[\w\d+.-]*:/.test(schemaId)) {
						schemaId = this.contextService.resolveRelativePath(schemaId, resource);
					}
					return schemaId;
				}
			}
		}
		return void 0;
	}
	getAssociatedSchemas(resource) {
		const seen = /* @__PURE__ */ Object.create(null);
		const schemas = [];
		const normalizedResource = normalizeResourceForMatching(resource);
		for (const entry of this.filePatternAssociations) {
			if (entry.matchesPattern(normalizedResource)) {
				for (const schemaId of entry.getURIs()) {
					if (!seen[schemaId]) {
						schemas.push(schemaId);
						seen[schemaId] = true;
					}
				}
			}
		}
		return schemas;
	}
	getSchemaURIsForResource(resource, document2) {
		let schemeId = document2 && this.getSchemaFromProperty(resource, document2);
		if (schemeId) {
			return [schemeId];
		}
		return this.getAssociatedSchemas(resource);
	}
	getSchemaForResource(resource, document2) {
		if (document2) {
			let schemeId = this.getSchemaFromProperty(resource, document2);
			if (schemeId) {
				const id = normalizeId(schemeId);
				return this.getOrAddSchemaHandle(id).getResolvedSchema();
			}
		}
		if (this.cachedSchemaForResource && this.cachedSchemaForResource.resource === resource) {
			return this.cachedSchemaForResource.resolvedSchema;
		}
		const schemas = this.getAssociatedSchemas(resource);
		const resolvedSchema =
			schemas.length > 0 ? this.createCombinedSchema(resource, schemas).getResolvedSchema() : this.promise.resolve(void 0);
		this.cachedSchemaForResource = {
			resource,
			resolvedSchema,
		};
		return resolvedSchema;
	}
	createCombinedSchema(resource, schemaIds) {
		if (schemaIds.length === 1) {
			return this.getOrAddSchemaHandle(schemaIds[0]);
		} else {
			const combinedSchemaId = "schemaservice://combinedSchema/" + encodeURIComponent(resource);
			const combinedSchema = {
				allOf: schemaIds.map((schemaId) => ({
					$ref: schemaId,
				})),
			};
			return this.addSchemaHandle(combinedSchemaId, combinedSchema);
		}
	}
	getMatchingSchemas(document2, jsonDocument, schema) {
		if (schema) {
			const id = schema.id || "schemaservice://untitled/matchingSchemas/" + idCounter2++;
			const handle = this.addSchemaHandle(id, schema);
			return handle.getResolvedSchema().then((resolvedSchema) => {
				return jsonDocument.getMatchingSchemas(resolvedSchema.schema).filter((s) => !s.inverted);
			});
		}
		return this.getSchemaForResource(document2.uri, jsonDocument).then((schema2) => {
			if (schema2) {
				return jsonDocument.getMatchingSchemas(schema2.schema).filter((s) => !s.inverted);
			}
			return [];
		});
	}
};
var idCounter2 = 0;
function normalizeResourceForMatching(resource) {
	try {
		return URI2.parse(resource)
			.with({
				fragment: null,
				query: null,
			})
			.toString(true);
	} catch (e) {
		return resource;
	}
}
__name(normalizeResourceForMatching, "normalizeResourceForMatching");
function toDisplayString(url) {
	try {
		const uri = URI2.parse(url);
		if (uri.scheme === "file") {
			return uri.fsPath;
		}
	} catch (e) {}
	return url;
}
__name(toDisplayString, "toDisplayString");

// ../../../node_modules/.pnpm/vscode-json-languageservice@5.6.3/node_modules/vscode-json-languageservice/lib/esm/services/jsonFolding.js
init_cjs_shims();
function getFoldingRanges(document2, context) {
	const ranges = [];
	const nestingLevels = [];
	const stack = [];
	let prevStart = -1;
	const scanner = createScanner2(document2.getText(), false);
	let token = scanner.scan();
	function addRange(range) {
		ranges.push(range);
		nestingLevels.push(stack.length);
	}
	__name(addRange, "addRange");
	while (token !== 17) {
		switch (token) {
			case 1:
			case 3: {
				const startLine = document2.positionAt(scanner.getTokenOffset()).line;
				const range = {
					startLine,
					endLine: startLine,
					kind: token === 1 ? "object" : "array",
				};
				stack.push(range);
				break;
			}
			case 2:
			case 4: {
				const kind = token === 2 ? "object" : "array";
				if (stack.length > 0 && stack[stack.length - 1].kind === kind) {
					const range = stack.pop();
					const line = document2.positionAt(scanner.getTokenOffset()).line;
					if (range && line > range.startLine + 1 && prevStart !== range.startLine) {
						range.endLine = line - 1;
						addRange(range);
						prevStart = range.startLine;
					}
				}
				break;
			}
			case 13: {
				const startLine = document2.positionAt(scanner.getTokenOffset()).line;
				const endLine = document2.positionAt(scanner.getTokenOffset() + scanner.getTokenLength()).line;
				if (scanner.getTokenError() === 1 && startLine + 1 < document2.lineCount) {
					scanner.setPosition(document2.offsetAt(Position2.create(startLine + 1, 0)));
				} else {
					if (startLine < endLine) {
						addRange({
							startLine,
							endLine,
							kind: FoldingRangeKind.Comment,
						});
						prevStart = startLine;
					}
				}
				break;
			}
			case 12: {
				const text = document2.getText().substr(scanner.getTokenOffset(), scanner.getTokenLength());
				const m = text.match(/^\/\/\s*#(region\b)|(endregion\b)/);
				if (m) {
					const line = document2.positionAt(scanner.getTokenOffset()).line;
					if (m[1]) {
						const range = {
							startLine: line,
							endLine: line,
							kind: FoldingRangeKind.Region,
						};
						stack.push(range);
					} else {
						let i = stack.length - 1;
						while (i >= 0 && stack[i].kind !== FoldingRangeKind.Region) {
							i--;
						}
						if (i >= 0) {
							const range = stack[i];
							stack.length = i;
							if (line > range.startLine && prevStart !== range.startLine) {
								range.endLine = line;
								addRange(range);
								prevStart = range.startLine;
							}
						}
					}
				}
				break;
			}
		}
		token = scanner.scan();
	}
	const rangeLimit = context && context.rangeLimit;
	if (typeof rangeLimit !== "number" || ranges.length <= rangeLimit) {
		return ranges;
	}
	if (context && context.onRangeLimitExceeded) {
		context.onRangeLimitExceeded(document2.uri);
	}
	const counts = [];
	for (let level of nestingLevels) {
		if (level < 30) {
			counts[level] = (counts[level] || 0) + 1;
		}
	}
	let entries = 0;
	let maxLevel = 0;
	for (let i = 0; i < counts.length; i++) {
		const n = counts[i];
		if (n) {
			if (n + entries > rangeLimit) {
				maxLevel = i;
				break;
			}
			entries += n;
		}
	}
	const result = [];
	for (let i = 0; i < ranges.length; i++) {
		const level = nestingLevels[i];
		if (typeof level === "number") {
			if (level < maxLevel || (level === maxLevel && entries++ < rangeLimit)) {
				result.push(ranges[i]);
			}
		}
	}
	return result;
}
__name(getFoldingRanges, "getFoldingRanges");

// ../../../node_modules/.pnpm/vscode-json-languageservice@5.6.3/node_modules/vscode-json-languageservice/lib/esm/services/jsonSelectionRanges.js
init_cjs_shims();
function getSelectionRanges(document2, positions, doc) {
	function getSelectionRange(position) {
		let offset = document2.offsetAt(position);
		let node = doc.getNodeFromOffset(offset, true);
		const result = [];
		while (node) {
			switch (node.type) {
				case "string":
				case "object":
				case "array":
					const cStart = node.offset + 1,
						cEnd = node.offset + node.length - 1;
					if (cStart < cEnd && offset >= cStart && offset <= cEnd) {
						result.push(newRange(cStart, cEnd));
					}
					result.push(newRange(node.offset, node.offset + node.length));
					break;
				case "number":
				case "boolean":
				case "null":
				case "property":
					result.push(newRange(node.offset, node.offset + node.length));
					break;
			}
			if (node.type === "property" || (node.parent && node.parent.type === "array")) {
				const afterCommaOffset = getOffsetAfterNextToken(
					node.offset + node.length,
					5,
					/* SyntaxKind.CommaToken */
				);
				if (afterCommaOffset !== -1) {
					result.push(newRange(node.offset, afterCommaOffset));
				}
			}
			node = node.parent;
		}
		let current = void 0;
		for (let index = result.length - 1; index >= 0; index--) {
			current = SelectionRange.create(result[index], current);
		}
		if (!current) {
			current = SelectionRange.create(Range2.create(position, position));
		}
		return current;
	}
	__name(getSelectionRange, "getSelectionRange");
	function newRange(start, end) {
		return Range2.create(document2.positionAt(start), document2.positionAt(end));
	}
	__name(newRange, "newRange");
	const scanner = createScanner2(document2.getText(), true);
	function getOffsetAfterNextToken(offset, expectedToken) {
		scanner.setPosition(offset);
		let token = scanner.scan();
		if (token === expectedToken) {
			return scanner.getTokenOffset() + scanner.getTokenLength();
		}
		return -1;
	}
	__name(getOffsetAfterNextToken, "getOffsetAfterNextToken");
	return positions.map(getSelectionRange);
}
__name(getSelectionRanges, "getSelectionRanges");

// ../../../node_modules/.pnpm/vscode-json-languageservice@5.6.3/node_modules/vscode-json-languageservice/lib/esm/utils/sort.js
init_cjs_shims();

// ../../../node_modules/.pnpm/vscode-json-languageservice@5.6.3/node_modules/vscode-json-languageservice/lib/esm/utils/format.js
init_cjs_shims();
function format3(documentToFormat, formattingOptions, formattingRange) {
	let range = void 0;
	if (formattingRange) {
		const offset = documentToFormat.offsetAt(formattingRange.start);
		const length = documentToFormat.offsetAt(formattingRange.end) - offset;
		range = {
			offset,
			length,
		};
	}
	const options = {
		tabSize: formattingOptions ? formattingOptions.tabSize : 4,
		insertSpaces: formattingOptions?.insertSpaces === true,
		insertFinalNewline: formattingOptions?.insertFinalNewline === true,
		eol: "\n",
		keepLines: formattingOptions?.keepLines === true,
	};
	return format2(documentToFormat.getText(), range, options).map((edit) => {
		return TextEdit.replace(
			Range2.create(documentToFormat.positionAt(edit.offset), documentToFormat.positionAt(edit.offset + edit.length)),
			edit.content,
		);
	});
}
__name(format3, "format");

// ../../../node_modules/.pnpm/vscode-json-languageservice@5.6.3/node_modules/vscode-json-languageservice/lib/esm/utils/propertyTree.js
init_cjs_shims();
var Container;
(function (Container2) {
	Container2[(Container2["Object"] = 0)] = "Object";
	Container2[(Container2["Array"] = 1)] = "Array";
})(Container || (Container = {}));
var PropertyTree = class {
	static {
		__name(this, "PropertyTree");
	}
	constructor(propertyName, beginningLineNumber) {
		this.propertyName = propertyName ?? "";
		this.beginningLineNumber = beginningLineNumber;
		this.childrenProperties = [];
		this.lastProperty = false;
		this.noKeyName = false;
	}
	addChildProperty(childProperty) {
		childProperty.parent = this;
		if (this.childrenProperties.length > 0) {
			let insertionIndex = 0;
			if (childProperty.noKeyName) {
				insertionIndex = this.childrenProperties.length;
			} else {
				insertionIndex = binarySearchOnPropertyArray(this.childrenProperties, childProperty, compareProperties);
			}
			if (insertionIndex < 0) {
				insertionIndex = insertionIndex * -1 - 1;
			}
			this.childrenProperties.splice(insertionIndex, 0, childProperty);
		} else {
			this.childrenProperties.push(childProperty);
		}
		return childProperty;
	}
};
function compareProperties(propertyTree1, propertyTree2) {
	const propertyName1 = propertyTree1.propertyName.toLowerCase();
	const propertyName2 = propertyTree2.propertyName.toLowerCase();
	if (propertyName1 < propertyName2) {
		return -1;
	} else if (propertyName1 > propertyName2) {
		return 1;
	}
	return 0;
}
__name(compareProperties, "compareProperties");
function binarySearchOnPropertyArray(propertyTreeArray, propertyTree, compare_fn) {
	const propertyName = propertyTree.propertyName.toLowerCase();
	const firstPropertyInArrayName = propertyTreeArray[0].propertyName.toLowerCase();
	const lastPropertyInArrayName = propertyTreeArray[propertyTreeArray.length - 1].propertyName.toLowerCase();
	if (propertyName < firstPropertyInArrayName) {
		return 0;
	}
	if (propertyName > lastPropertyInArrayName) {
		return propertyTreeArray.length;
	}
	let m = 0;
	let n = propertyTreeArray.length - 1;
	while (m <= n) {
		let k = (n + m) >> 1;
		let cmp = compare_fn(propertyTree, propertyTreeArray[k]);
		if (cmp > 0) {
			m = k + 1;
		} else if (cmp < 0) {
			n = k - 1;
		} else {
			return k;
		}
	}
	return -m - 1;
}
__name(binarySearchOnPropertyArray, "binarySearchOnPropertyArray");

// ../../../node_modules/.pnpm/vscode-json-languageservice@5.6.3/node_modules/vscode-json-languageservice/lib/esm/utils/sort.js
function sort(documentToSort, formattingOptions) {
	const options = {
		...formattingOptions,
		keepLines: false,
	};
	const formattedJsonString = TextDocument.applyEdits(documentToSort, format3(documentToSort, options, void 0));
	const formattedJsonDocument = TextDocument.create("test://test.json", "json", 0, formattedJsonString);
	const jsonPropertyTree = findJsoncPropertyTree(formattedJsonDocument);
	const sortedJsonDocument = sortJsoncDocument(formattedJsonDocument, jsonPropertyTree);
	const edits = format3(sortedJsonDocument, options, void 0);
	const sortedAndFormattedJsonDocument = TextDocument.applyEdits(sortedJsonDocument, edits);
	return [
		TextEdit.replace(
			Range2.create(Position2.create(0, 0), documentToSort.positionAt(documentToSort.getText().length)),
			sortedAndFormattedJsonDocument,
		),
	];
}
__name(sort, "sort");
function findJsoncPropertyTree(formattedDocument) {
	const formattedString = formattedDocument.getText();
	const scanner = createScanner2(formattedString, false);
	let rootTree = new PropertyTree();
	let currentTree = rootTree;
	let currentProperty = rootTree;
	let lastProperty = rootTree;
	let token = void 0;
	let lastTokenLine = 0;
	let numberOfCharactersOnPreviousLines = 0;
	let lastNonTriviaNonCommentToken = void 0;
	let secondToLastNonTriviaNonCommentToken = void 0;
	let lineOfLastNonTriviaNonCommentToken = -1;
	let endIndexOfLastNonTriviaNonCommentToken = -1;
	let beginningLineNumber = 0;
	let endLineNumber = 0;
	let currentContainerStack = [];
	let updateLastPropertyEndLineNumber = false;
	let updateBeginningLineNumber = false;
	while ((token = scanner.scan()) !== 17) {
		if (
			updateLastPropertyEndLineNumber === true &&
			token !== 14 &&
			token !== 15 &&
			token !== 12 &&
			token !== 13 &&
			currentProperty.endLineNumber === void 0
		) {
			let endLineNumber2 = scanner.getTokenStartLine();
			if (secondToLastNonTriviaNonCommentToken === 2 || secondToLastNonTriviaNonCommentToken === 4) {
				lastProperty.endLineNumber = endLineNumber2 - 1;
			} else {
				currentProperty.endLineNumber = endLineNumber2 - 1;
			}
			beginningLineNumber = endLineNumber2;
			updateLastPropertyEndLineNumber = false;
		}
		if (updateBeginningLineNumber === true && token !== 14 && token !== 15 && token !== 12 && token !== 13) {
			beginningLineNumber = scanner.getTokenStartLine();
			updateBeginningLineNumber = false;
		}
		if (scanner.getTokenStartLine() !== lastTokenLine) {
			for (let i = lastTokenLine; i < scanner.getTokenStartLine(); i++) {
				const lengthOfLine = formattedDocument.getText(
					Range2.create(Position2.create(i, 0), Position2.create(i + 1, 0)),
				).length;
				numberOfCharactersOnPreviousLines = numberOfCharactersOnPreviousLines + lengthOfLine;
			}
			lastTokenLine = scanner.getTokenStartLine();
		}
		switch (token) {
			// When a string is found, if it follows an open brace or a comma token and it is within an object, then it corresponds to a key name, not a simple string
			case 10: {
				if (
					lastNonTriviaNonCommentToken === void 0 ||
					lastNonTriviaNonCommentToken === 1 ||
					(lastNonTriviaNonCommentToken === 5 &&
						currentContainerStack[currentContainerStack.length - 1] === Container.Object)
				) {
					const childProperty = new PropertyTree(scanner.getTokenValue(), beginningLineNumber);
					lastProperty = currentProperty;
					currentProperty = currentTree.addChildProperty(childProperty);
				}
				break;
			}
			// When the token is an open bracket, then we enter into an array
			case 3: {
				if (rootTree.beginningLineNumber === void 0) {
					rootTree.beginningLineNumber = scanner.getTokenStartLine();
				}
				if (currentContainerStack[currentContainerStack.length - 1] === Container.Object) {
					currentTree = currentProperty;
				} else if (currentContainerStack[currentContainerStack.length - 1] === Container.Array) {
					const childProperty = new PropertyTree(scanner.getTokenValue(), beginningLineNumber);
					childProperty.noKeyName = true;
					lastProperty = currentProperty;
					currentProperty = currentTree.addChildProperty(childProperty);
					currentTree = currentProperty;
				}
				currentContainerStack.push(Container.Array);
				currentProperty.type = Container.Array;
				beginningLineNumber = scanner.getTokenStartLine();
				beginningLineNumber++;
				break;
			}
			// When the token is an open brace, then we enter into an object
			case 1: {
				if (rootTree.beginningLineNumber === void 0) {
					rootTree.beginningLineNumber = scanner.getTokenStartLine();
				} else if (currentContainerStack[currentContainerStack.length - 1] === Container.Array) {
					const childProperty = new PropertyTree(scanner.getTokenValue(), beginningLineNumber);
					childProperty.noKeyName = true;
					lastProperty = currentProperty;
					currentProperty = currentTree.addChildProperty(childProperty);
				}
				currentProperty.type = Container.Object;
				currentContainerStack.push(Container.Object);
				currentTree = currentProperty;
				beginningLineNumber = scanner.getTokenStartLine();
				beginningLineNumber++;
				break;
			}
			case 4: {
				endLineNumber = scanner.getTokenStartLine();
				currentContainerStack.pop();
				if (
					currentProperty.endLineNumber === void 0 &&
					(lastNonTriviaNonCommentToken === 2 || lastNonTriviaNonCommentToken === 4)
				) {
					currentProperty.endLineNumber = endLineNumber - 1;
					currentProperty.lastProperty = true;
					currentProperty.lineWhereToAddComma = lineOfLastNonTriviaNonCommentToken;
					currentProperty.indexWhereToAddComa = endIndexOfLastNonTriviaNonCommentToken;
					lastProperty = currentProperty;
					currentProperty = currentProperty ? currentProperty.parent : void 0;
					currentTree = currentProperty;
				}
				rootTree.endLineNumber = endLineNumber;
				beginningLineNumber = endLineNumber + 1;
				break;
			}
			case 2: {
				endLineNumber = scanner.getTokenStartLine();
				currentContainerStack.pop();
				if (lastNonTriviaNonCommentToken !== 1) {
					if (currentProperty.endLineNumber === void 0) {
						currentProperty.endLineNumber = endLineNumber - 1;
						currentProperty.lastProperty = true;
						currentProperty.lineWhereToAddComma = lineOfLastNonTriviaNonCommentToken;
						currentProperty.indexWhereToAddComa = endIndexOfLastNonTriviaNonCommentToken;
					}
					lastProperty = currentProperty;
					currentProperty = currentProperty ? currentProperty.parent : void 0;
					currentTree = currentProperty;
				}
				rootTree.endLineNumber = scanner.getTokenStartLine();
				beginningLineNumber = endLineNumber + 1;
				break;
			}
			case 5: {
				endLineNumber = scanner.getTokenStartLine();
				if (
					currentProperty.endLineNumber === void 0 &&
					(currentContainerStack[currentContainerStack.length - 1] === Container.Object ||
						(currentContainerStack[currentContainerStack.length - 1] === Container.Array &&
							(lastNonTriviaNonCommentToken === 2 || lastNonTriviaNonCommentToken === 4)))
				) {
					currentProperty.endLineNumber = endLineNumber;
					currentProperty.commaIndex = scanner.getTokenOffset() - numberOfCharactersOnPreviousLines;
					currentProperty.commaLine = endLineNumber;
				}
				if (lastNonTriviaNonCommentToken === 2 || lastNonTriviaNonCommentToken === 4) {
					lastProperty = currentProperty;
					currentProperty = currentProperty ? currentProperty.parent : void 0;
					currentTree = currentProperty;
				}
				beginningLineNumber = endLineNumber + 1;
				break;
			}
			case 13: {
				if (
					lastNonTriviaNonCommentToken === 5 &&
					lineOfLastNonTriviaNonCommentToken === scanner.getTokenStartLine() &&
					((currentContainerStack[currentContainerStack.length - 1] === Container.Array &&
						(secondToLastNonTriviaNonCommentToken === 2 || secondToLastNonTriviaNonCommentToken === 4)) ||
						currentContainerStack[currentContainerStack.length - 1] === Container.Object)
				) {
					if (
						(currentContainerStack[currentContainerStack.length - 1] === Container.Array &&
							(secondToLastNonTriviaNonCommentToken === 2 || secondToLastNonTriviaNonCommentToken === 4)) ||
						currentContainerStack[currentContainerStack.length - 1] === Container.Object
					) {
						currentProperty.endLineNumber = void 0;
						updateLastPropertyEndLineNumber = true;
					}
				}
				if (
					(lastNonTriviaNonCommentToken === 1 || lastNonTriviaNonCommentToken === 3) &&
					lineOfLastNonTriviaNonCommentToken === scanner.getTokenStartLine()
				) {
					updateBeginningLineNumber = true;
				}
				break;
			}
		}
		if (token !== 14 && token !== 13 && token !== 12 && token !== 15) {
			secondToLastNonTriviaNonCommentToken = lastNonTriviaNonCommentToken;
			lastNonTriviaNonCommentToken = token;
			lineOfLastNonTriviaNonCommentToken = scanner.getTokenStartLine();
			endIndexOfLastNonTriviaNonCommentToken =
				scanner.getTokenOffset() + scanner.getTokenLength() - numberOfCharactersOnPreviousLines;
		}
	}
	return rootTree;
}
__name(findJsoncPropertyTree, "findJsoncPropertyTree");
function sortJsoncDocument(jsonDocument, propertyTree) {
	if (propertyTree.childrenProperties.length === 0) {
		return jsonDocument;
	}
	const sortedJsonDocument = TextDocument.create("test://test.json", "json", 0, jsonDocument.getText());
	const queueToSort = [];
	updateSortingQueue(queueToSort, propertyTree, propertyTree.beginningLineNumber);
	while (queueToSort.length > 0) {
		const dataToSort = queueToSort.shift();
		const propertyTreeArray = dataToSort.propertyTreeArray;
		let beginningLineNumber = dataToSort.beginningLineNumber;
		for (let i = 0; i < propertyTreeArray.length; i++) {
			const propertyTree2 = propertyTreeArray[i];
			const range = Range2.create(
				Position2.create(propertyTree2.beginningLineNumber, 0),
				Position2.create(propertyTree2.endLineNumber + 1, 0),
			);
			const jsonContentToReplace = jsonDocument.getText(range);
			const jsonDocumentToReplace = TextDocument.create("test://test.json", "json", 0, jsonContentToReplace);
			if (propertyTree2.lastProperty === true && i !== propertyTreeArray.length - 1) {
				const lineWhereToAddComma = propertyTree2.lineWhereToAddComma - propertyTree2.beginningLineNumber;
				const indexWhereToAddComma = propertyTree2.indexWhereToAddComa;
				const edit2 = {
					range: Range2.create(
						Position2.create(lineWhereToAddComma, indexWhereToAddComma),
						Position2.create(lineWhereToAddComma, indexWhereToAddComma),
					),
					text: ",",
				};
				TextDocument.update(jsonDocumentToReplace, [edit2], 1);
			} else if (propertyTree2.lastProperty === false && i === propertyTreeArray.length - 1) {
				const commaIndex = propertyTree2.commaIndex;
				const commaLine = propertyTree2.commaLine;
				const lineWhereToRemoveComma = commaLine - propertyTree2.beginningLineNumber;
				const edit2 = {
					range: Range2.create(
						Position2.create(lineWhereToRemoveComma, commaIndex),
						Position2.create(lineWhereToRemoveComma, commaIndex + 1),
					),
					text: "",
				};
				TextDocument.update(jsonDocumentToReplace, [edit2], 1);
			}
			const length = propertyTree2.endLineNumber - propertyTree2.beginningLineNumber + 1;
			const edit = {
				range: Range2.create(Position2.create(beginningLineNumber, 0), Position2.create(beginningLineNumber + length, 0)),
				text: jsonDocumentToReplace.getText(),
			};
			TextDocument.update(sortedJsonDocument, [edit], 1);
			updateSortingQueue(queueToSort, propertyTree2, beginningLineNumber);
			beginningLineNumber = beginningLineNumber + length;
		}
	}
	return sortedJsonDocument;
}
__name(sortJsoncDocument, "sortJsoncDocument");
function sortProperties(properties) {
	properties.sort((a2, b) => a2.propertyName.localeCompare(b.propertyName));
}
__name(sortProperties, "sortProperties");
function updateSortingQueue(queue, propertyTree, beginningLineNumber) {
	if (propertyTree.childrenProperties.length === 0) {
		return;
	}
	if (propertyTree.type === Container.Object) {
		let minimumBeginningLineNumber = Infinity;
		for (const childProperty of propertyTree.childrenProperties) {
			if (childProperty.beginningLineNumber < minimumBeginningLineNumber) {
				minimumBeginningLineNumber = childProperty.beginningLineNumber;
			}
		}
		const diff = minimumBeginningLineNumber - propertyTree.beginningLineNumber;
		beginningLineNumber = beginningLineNumber + diff;
		sortProperties(propertyTree.childrenProperties);
		queue.push(new SortingRange(beginningLineNumber, propertyTree.childrenProperties));
	} else if (propertyTree.type === Container.Array) {
		updateSortingQueueForArrayProperties(queue, propertyTree, beginningLineNumber);
	}
}
__name(updateSortingQueue, "updateSortingQueue");
function updateSortingQueueForArrayProperties(queue, propertyTree, beginningLineNumber) {
	for (const subObject of propertyTree.childrenProperties) {
		if (subObject.type === Container.Object) {
			let minimumBeginningLineNumber = Infinity;
			for (const childProperty of subObject.childrenProperties) {
				if (childProperty.beginningLineNumber < minimumBeginningLineNumber) {
					minimumBeginningLineNumber = childProperty.beginningLineNumber;
				}
			}
			const diff = minimumBeginningLineNumber - subObject.beginningLineNumber;
			queue.push(
				new SortingRange(
					beginningLineNumber + subObject.beginningLineNumber - propertyTree.beginningLineNumber + diff,
					subObject.childrenProperties,
				),
			);
		}
		if (subObject.type === Container.Array) {
			updateSortingQueueForArrayProperties(
				queue,
				subObject,
				beginningLineNumber + subObject.beginningLineNumber - propertyTree.beginningLineNumber,
			);
		}
	}
}
__name(updateSortingQueueForArrayProperties, "updateSortingQueueForArrayProperties");
var SortingRange = class SortingRange2 {
	static {
		__name(this, "SortingRange");
	}
	constructor(beginningLineNumber, propertyTreeArray) {
		this.beginningLineNumber = beginningLineNumber;
		this.propertyTreeArray = propertyTreeArray;
	}
};

// ../../../node_modules/.pnpm/vscode-json-languageservice@5.6.3/node_modules/vscode-json-languageservice/lib/esm/services/jsonLinks.js
init_cjs_shims();
function findLinks(document2, doc) {
	const links = [];
	doc.visit((node) => {
		if (node.type === "property" && node.keyNode.value === "$ref" && node.valueNode?.type === "string") {
			const path = node.valueNode.value;
			const targetNode = findTargetNode(doc, path);
			if (targetNode) {
				const targetPos = document2.positionAt(targetNode.offset);
				links.push({
					target: `${document2.uri}#${targetPos.line + 1},${targetPos.character + 1}`,
					range: createRange(document2, node.valueNode),
				});
			}
		}
		return true;
	});
	return Promise.resolve(links);
}
__name(findLinks, "findLinks");
function createRange(document2, node) {
	return Range2.create(document2.positionAt(node.offset + 1), document2.positionAt(node.offset + node.length - 1));
}
__name(createRange, "createRange");
function findTargetNode(doc, path) {
	const tokens = parseJSONPointer(path);
	if (!tokens) {
		return null;
	}
	return findNode(tokens, doc.root);
}
__name(findTargetNode, "findTargetNode");
function findNode(pointer, node) {
	if (!node) {
		return null;
	}
	if (pointer.length === 0) {
		return node;
	}
	const token = pointer.shift();
	if (node && node.type === "object") {
		const propertyNode = node.properties.find((propertyNode2) => propertyNode2.keyNode.value === token);
		if (!propertyNode) {
			return null;
		}
		return findNode(pointer, propertyNode.valueNode);
	} else if (node && node.type === "array") {
		if (token.match(/^(0|[1-9][0-9]*)$/)) {
			const index = Number.parseInt(token);
			const arrayItem = node.items[index];
			if (!arrayItem) {
				return null;
			}
			return findNode(pointer, arrayItem);
		}
	}
	return null;
}
__name(findNode, "findNode");
function parseJSONPointer(path) {
	if (path === "#") {
		return [];
	}
	if (path[0] !== "#" || path[1] !== "/") {
		return null;
	}
	return path.substring(2).split(/\//).map(unescape);
}
__name(parseJSONPointer, "parseJSONPointer");
function unescape(str) {
	return str.replace(/~1/g, "/").replace(/~0/g, "~");
}
__name(unescape, "unescape");

// ../../../node_modules/.pnpm/vscode-json-languageservice@5.6.3/node_modules/vscode-json-languageservice/lib/esm/jsonLanguageService.js
function getLanguageService(params) {
	const promise = params.promiseConstructor || Promise;
	const jsonSchemaService = new JSONSchemaService(params.schemaRequestService, params.workspaceContext, promise);
	jsonSchemaService.setSchemaContributions(schemaContributions);
	const jsonCompletion = new JSONCompletion(jsonSchemaService, params.contributions, promise, params.clientCapabilities);
	const jsonHover = new JSONHover(jsonSchemaService, params.contributions, promise);
	const jsonDocumentSymbols = new JSONDocumentSymbols(jsonSchemaService);
	const jsonValidation = new JSONValidation(jsonSchemaService, promise);
	return {
		configure: /* @__PURE__ */ __name((settings) => {
			jsonSchemaService.clearExternalSchemas();
			settings.schemas?.forEach(jsonSchemaService.registerExternalSchema.bind(jsonSchemaService));
			jsonValidation.configure(settings);
		}, "configure"),
		resetSchema: /* @__PURE__ */ __name((uri) => jsonSchemaService.onResourceChange(uri), "resetSchema"),
		doValidation: jsonValidation.doValidation.bind(jsonValidation),
		getLanguageStatus: jsonValidation.getLanguageStatus.bind(jsonValidation),
		parseJSONDocument: /* @__PURE__ */ __name(
			(document2) =>
				parse3(document2, {
					collectComments: true,
				}),
			"parseJSONDocument",
		),
		newJSONDocument: /* @__PURE__ */ __name(
			(root, diagnostics, comments) => newJSONDocument(root, diagnostics, comments),
			"newJSONDocument",
		),
		getMatchingSchemas: jsonSchemaService.getMatchingSchemas.bind(jsonSchemaService),
		doResolve: jsonCompletion.doResolve.bind(jsonCompletion),
		doComplete: jsonCompletion.doComplete.bind(jsonCompletion),
		findDocumentSymbols: jsonDocumentSymbols.findDocumentSymbols.bind(jsonDocumentSymbols),
		findDocumentSymbols2: jsonDocumentSymbols.findDocumentSymbols2.bind(jsonDocumentSymbols),
		findDocumentColors: jsonDocumentSymbols.findDocumentColors.bind(jsonDocumentSymbols),
		getColorPresentations: jsonDocumentSymbols.getColorPresentations.bind(jsonDocumentSymbols),
		doHover: jsonHover.doHover.bind(jsonHover),
		getFoldingRanges,
		getSelectionRanges,
		findDefinition: /* @__PURE__ */ __name(() => Promise.resolve([]), "findDefinition"),
		findLinks,
		format: /* @__PURE__ */ __name((document2, range, options) => format3(document2, options, range), "format"),
		sort: /* @__PURE__ */ __name((document2, options) => sort(document2, options), "sort"),
	};
}
__name(getLanguageService, "getLanguageService");

// src/embedded/json-mode.ts
function getJSONMode(jsonLanguageService2, documentRegionsCache2) {
	return {
		getId() {
			return "json";
		},
		async doComplete(document2, position) {
			const documentRegions = documentRegionsCache2.get(document2);
			const embedded = documentRegions.getEmbeddedDocument("json");
			const jsonDocument = jsonLanguageService2.parseJSONDocument(embedded);
			const completions = await jsonLanguageService2.doComplete(embedded, position, jsonDocument);
			return completions;
		},
		async doHover(document2, position) {
			const documentRegions = documentRegionsCache2.get(document2);
			const embedded = documentRegions.getEmbeddedDocument("json");
			const jsonDocument = jsonLanguageService2.parseJSONDocument(embedded);
			return await jsonLanguageService2.doHover(embedded, position, jsonDocument);
		},
		async doValidation(document2) {
			const documentRegions = documentRegionsCache2.get(document2);
			const embedded = documentRegions.getEmbeddedDocument("json");
			const jsonDocument = jsonLanguageService2.parseJSONDocument(embedded);
			return await jsonLanguageService2.doValidation(embedded, jsonDocument, {
				schemaValidation: "error",
			});
		},
		findDocumentSymbols(document2) {
			const documentRegions = documentRegionsCache2.get(document2);
			const embedded = documentRegions.getEmbeddedDocument("json");
			const jsonDocument = jsonLanguageService2.parseJSONDocument(embedded);
			return jsonLanguageService2.findDocumentSymbols2(embedded, jsonDocument);
		},
	};
}
__name(getJSONMode, "getJSONMode");
function createJSONLanguageService() {
	return getLanguageService({
		schemaRequestService: /* @__PURE__ */ __name(async (_uri) => {
			return "";
		}, "schemaRequestService"),
		workspaceContext: {
			resolveRelativePath: /* @__PURE__ */ __name((relativePath, resource) => {
				const base = resource.substring(0, resource.lastIndexOf("/"));
				return base + "/" + relativePath;
			}, "resolveRelativePath"),
		},
	});
}
__name(createJSONLanguageService, "createJSONLanguageService");

// src/embedded/mode-manager.ts
init_cjs_shims();

// src/embedded/language-modes.ts
init_cjs_shims();
var DocumentRegions = class {
	static {
		__name(this, "DocumentRegions");
	}
	document;
	regions = [];
	constructor(document2) {
		this.document = document2;
		this.scanRegions();
	}
	/**
	 * Scan document for embedded language regions
	 * Currently supports:
	 * - JSON in `json` blocks: ```json ... ```
	 * - JSON in JSON.parse() calls
	 * - Template string interpolation
	 */
	scanRegions() {
		const text = this.document.getText();
		const lines = text.split("\n");
		let inJsonBlock = false;
		let jsonBlockStart = 0;
		for (let i = 0; i < lines.length; i++) {
			const line = lines[i];
			const jsonBlockMatch = line.match(/^```(json|JSON)$/);
			const jsonBlockEnd = line.match(/^```$/);
			if (jsonBlockMatch && !inJsonBlock) {
				inJsonBlock = true;
				jsonBlockStart = i;
			} else if (jsonBlockEnd && inJsonBlock) {
				const startOffset = this.document.offsetAt({
					line: jsonBlockStart,
					character: 0,
				});
				const endOffset = this.document.offsetAt({
					line: i,
					character: 0,
				});
				this.regions.push({
					languageId: "json",
					start: startOffset,
					end: endOffset,
					startLine: jsonBlockStart,
					startCharacter: 0,
					endLine: i,
					endCharacter: 0,
				});
				inJsonBlock = false;
			}
		}
		const jsonParseRegex = /JSON\.parse\s*\(\s*(["'`])((?:\\.|(?!\1).)*)\1\s*\)/gs;
		let match;
		while ((match = jsonParseRegex.exec(text)) !== null) {
			const startOffset = match.index + match[0].indexOf(match[2]);
			const endOffset = startOffset + match[2].length;
			const startPos = this.document.positionAt(startOffset);
			const endPos = this.document.positionAt(endOffset);
			this.regions.push({
				languageId: "json",
				start: startOffset,
				end: endOffset,
				startLine: startPos.line,
				startCharacter: startPos.character,
				endLine: endPos.line,
				endCharacter: endPos.character,
			});
		}
	}
	/**
	 * Get the language mode at a given position
	 */
	getLanguageAtPosition(position) {
		const offset = this.document.offsetAt(position);
		for (const region of this.regions) {
			if (offset >= region.start && offset <= region.end) {
				return region.languageId;
			}
		}
		return null;
	}
	/**
	 * Get all regions for a specific language
	 */
	getRegionsForLanguage(languageId) {
		return this.regions.filter((r) => r.languageId === languageId);
	}
	/**
	 * Get embedded document content for a specific language
	 * Replaces all non-matching regions with whitespace
	 */
	getEmbeddedDocument(languageId) {
		const text = this.document.getText();
		const languageRegions = this.getRegionsForLanguage(languageId);
		if (languageRegions.length === 0) {
			return TextDocument.create(this.document.uri + "." + languageId, languageId, this.document.version, "");
		}
		let result = "";
		let lastOffset = 0;
		const sortedRegions = [...languageRegions].sort((a2, b) => a2.start - b.start);
		for (const region of sortedRegions) {
			if (region.start > lastOffset) {
				result += " ".repeat(region.start - lastOffset);
			}
			result += text.substring(region.start, region.end);
			lastOffset = region.end;
		}
		if (lastOffset < text.length) {
			result += " ".repeat(text.length - lastOffset);
		}
		return TextDocument.create(this.document.uri + "." + languageId, languageId, this.document.version, result);
	}
	/**
	 * Check if position is inside any embedded region
	 */
	isInEmbeddedRegion(position) {
		return this.getLanguageAtPosition(position) !== null;
	}
};

// src/embedded/mode-manager.ts
var LanguageModelCache = class LanguageModelCache2 {
	static {
		__name(this, "LanguageModelCache");
	}
	cache = /* @__PURE__ */ new Map();
	maxEntries;
	constructor(maxEntries = 10) {
		this.maxEntries = maxEntries;
	}
	get(document2) {
		const key = document2.uri;
		const entry = this.cache.get(key);
		if (entry && entry.version === document2.version) {
			return entry.value;
		}
		const value = this.create(document2);
		this.cache.set(key, {
			version: document2.version,
			value,
		});
		if (this.cache.size > this.maxEntries) {
			const firstKey = this.cache.keys().next().value;
			if (firstKey !== void 0) {
				this.cache.delete(firstKey);
			}
		}
		return value;
	}
	create(_document) {
		throw new Error("Must be implemented by subclass");
	}
};
var DocumentRegionsCache = class extends LanguageModelCache {
	static {
		__name(this, "DocumentRegionsCache");
	}
	constructor() {
		super(10);
	}
	create(document2) {
		return new DocumentRegions(document2);
	}
};
var LanguageModes = class {
	static {
		__name(this, "LanguageModes");
	}
	modes = /* @__PURE__ */ new Map();
	documentRegions;
	constructor(documentRegions) {
		this.documentRegions = documentRegions;
	}
	/**
	 * Register a language mode
	 */
	registerMode(mode) {
		this.modes.set(mode.getId(), mode);
	}
	/**
	 * Get language mode at a given position
	 */
	getModeAtPosition(document2, position) {
		const regions = this.documentRegions.get(document2);
		const languageId = regions.getLanguageAtPosition(position);
		if (languageId) {
			return this.modes.get(languageId) || null;
		}
		return null;
	}
	/**
	 * Get all registered modes
	 */
	getAllModes() {
		return Array.from(this.modes.values());
	}
	/**
	 * Get mode by language ID
	 */
	getMode(languageId) {
		return this.modes.get(languageId) || null;
	}
};

// src/handlers/code-actions.ts
init_cjs_shims();
var import_node3 = __toESM(require_node3());

// src/utils.ts
init_cjs_shims();
var import_node2 = __toESM(require_node3());
function getWordAtPosition2(document2, position) {
	const line = document2.getText({
		start: import_node2.Position.create(position.line, 0),
		end: import_node2.Position.create(position.line, Number.MAX_SAFE_INTEGER),
	});
	const regex = /[A-Za-z_][A-Za-z0-9_]*/g;
	let match;
	while ((match = regex.exec(line))) {
		const start = match.index;
		const end = start + match[0].length;
		if (position.character >= start && position.character <= end) {
			return match[0];
		}
	}
	return null;
}
__name(getWordAtPosition2, "getWordAtPosition");
function detectCompletionContext(document2, position) {
	const line = document2.getText({
		start: import_node2.Position.create(position.line, 0),
		end: import_node2.Position.create(position.line, position.character),
	});
	const propertyMatch = line.match(/([A-Za-z_][A-Za-z0-9_]*)\.\s*$/);
	if (propertyMatch) {
		return {
			type: "property",
			object: propertyMatch[1],
		};
	}
	const openParenCount = (line.match(/\(/g) || []).length;
	const closeParenCount = (line.match(/\)/g) || []).length;
	if (openParenCount > closeParenCount) {
		return {
			type: "function_call",
			inFunctionCall: true,
		};
	}
	return {
		type: "default",
	};
}
__name(detectCompletionContext, "detectCompletionContext");
function getClosestPropertySuggestion(target, candidates) {
	if (candidates.length === 0) {
		return null;
	}
	let bestMatch = null;
	for (const candidate of candidates) {
		const score = levenshteinDistance(target, candidate);
		if (!bestMatch || score < bestMatch.score) {
			bestMatch = {
				value: candidate,
				score,
			};
		}
	}
	if (!bestMatch) {
		return null;
	}
	const threshold = Math.max(1, Math.floor(target.length * 0.4));
	return bestMatch.score <= threshold ? bestMatch.value : null;
}
__name(getClosestPropertySuggestion, "getClosestPropertySuggestion");
function levenshteinDistance(a2, b) {
	const rows = a2.length + 1;
	const cols = b.length + 1;
	const dp = Array.from(
		{
			length: rows,
		},
		() => Array(cols).fill(0),
	);
	for (let i = 0; i < rows; i++) {
		dp[i][0] = i;
	}
	for (let j = 0; j < cols; j++) {
		dp[0][j] = j;
	}
	for (let i = 1; i < rows; i++) {
		for (let j = 1; j < cols; j++) {
			const cost = a2[i - 1] === b[j - 1] ? 0 : 1;
			dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + cost);
		}
	}
	return dp[a2.length][b.length];
}
__name(levenshteinDistance, "levenshteinDistance");

// src/handlers/code-actions.ts
function setupCodeActionsHandler(connection2, documents2) {
	connection2.onCodeAction((params) => {
		try {
			const actions = [];
			for (const diagnostic of params.context.diagnostics) {
				const message = diagnostic.message.toLowerCase();
				const errorCode = diagnostic.code;
				if (errorCode === "E1001" || errorCode === "E1003") {
					const document2 = documents2.get(params.textDocument.uri);
					if (document2) {
						const errorLine = diagnostic.range.end.line;
						let insertLine = errorLine + 1;
						while (insertLine < document2.lineCount) {
							const nextLine = document2.getText({
								start: {
									line: insertLine,
									character: 0,
								},
								end: {
									line: insertLine,
									character: Number.MAX_SAFE_INTEGER,
								},
							});
							if (nextLine.trim() && !nextLine.trim().startsWith("end")) {
								break;
							}
							insertLine++;
						}
						actions.push({
							title: "Add missing 'end' to close block",
							kind: import_node3.CodeActionKind.QuickFix,
							edit: {
								changes: {
									[params.textDocument.uri]: [
										import_node3.TextEdit.insert(import_node3.Position.create(insertLine, 0), "end\n"),
									],
								},
							},
							diagnostics: [diagnostic],
						});
					}
				}
				if (errorCode === "E1002" || message.includes("too many 'end'")) {
					actions.push({
						title: "Remove extra 'end' statement",
						kind: import_node3.CodeActionKind.QuickFix,
						edit: {
							changes: {
								[params.textDocument.uri]: [import_node3.TextEdit.replace(diagnostic.range, "")],
							},
						},
						diagnostics: [diagnostic],
					});
				}
				if ((message.includes("unterminated") || message.includes("missing 'end'")) && !errorCode) {
					actions.push({
						title: "Insert 'end'",
						kind: import_node3.CodeActionKind.QuickFix,
						edit: {
							changes: {
								[params.textDocument.uri]: [
									import_node3.TextEdit.insert(import_node3.Position.create(diagnostic.range.end.line + 1, 0), "end\n"),
								],
							},
						},
						diagnostics: [diagnostic],
					});
				}
				if (message.includes("undefined") || message.includes("not defined")) {
					const document2 = documents2.get(params.textDocument.uri);
					if (document2) {
						const word = getWordAtPosition2(document2, diagnostic.range.start);
						if (word) {
							actions.push({
								title: `Declare variable '${word}'`,
								kind: import_node3.CodeActionKind.QuickFix,
								edit: {
									changes: {
										[params.textDocument.uri]: [
											import_node3.TextEdit.insert(
												import_node3.Position.create(diagnostic.range.start.line, 0),
												`local ${word} = nil
`,
											),
										],
									},
								},
								diagnostics: [diagnostic],
							});
						}
					}
				}
			}
			if (
				params.range &&
				(params.range.start.line !== params.range.end.line || params.range.start.character !== params.range.end.character)
			) {
				const document2 = documents2.get(params.textDocument.uri);
				if (document2) {
					const selectedText = document2.getText(params.range);
					if (selectedText.trim()) {
						actions.push({
							title: "Extract to function",
							kind: import_node3.CodeActionKind.RefactorExtract,
							edit: {
								changes: {
									[params.textDocument.uri]: [
										// Replace selection with function call
										import_node3.TextEdit.replace(params.range, "extracted_function()"),
										// Insert function definition at end
										import_node3.TextEdit.insert(
											import_node3.Position.create(document2.lineCount, 0),
											`

extracted_function = function()
	${selectedText.replace(/\n/g, "\n	")}
end
`,
										),
									],
								},
							},
						});
					}
				}
			}
			return actions;
		} catch (error) {
			connection2.console.error(`Code action error: ${error instanceof Error ? error.message : String(error)}`);
			return [];
		}
	});
}
__name(setupCodeActionsHandler, "setupCodeActionsHandler");

// src/handlers/completion.ts
init_cjs_shims();
var import_node4 = __toESM(require_node3());

// src/settings.ts
init_cjs_shims();
var defaultSettings = {
	diagnostics: {
		enable: true,
	},
	completion: {
		enable: true,
	},
	signatureHelp: {
		enable: true,
	},
	format: {
		enable: true,
		indentSize: 1,
	},
};
var globalSettings = defaultSettings;
var documentSettings = /* @__PURE__ */ new Map();
function setGlobalSettings(settings) {
	globalSettings = settings;
}
__name(setGlobalSettings, "setGlobalSettings");
function clearDocumentSettings() {
	documentSettings.clear();
}
__name(clearDocumentSettings, "clearDocumentSettings");
async function getDocumentSettings(connection2, hasConfigurationCapability2, resource) {
	if (!hasConfigurationCapability2) {
		return globalSettings;
	}
	const cached = documentSettings.get(resource);
	if (cached) {
		return cached;
	}
	const configuration = await connection2.workspace.getConfiguration({
		scopeUri: resource,
		section: "lootiscript",
	});
	const sanitized = sanitizeSettings(configuration);
	documentSettings.set(resource, sanitized);
	return sanitized;
}
__name(getDocumentSettings, "getDocumentSettings");
function sanitizeSettings(settings) {
	const merged = settings || {};
	const rawIndent = merged.format?.indentSize ?? defaultSettings.format.indentSize;
	const normalizedIndent = Math.min(Math.max(rawIndent, 1), 4);
	return {
		diagnostics: {
			enable: merged.diagnostics?.enable ?? defaultSettings.diagnostics.enable,
		},
		completion: {
			enable: merged.completion?.enable ?? defaultSettings.completion.enable,
		},
		signatureHelp: {
			enable: merged.signatureHelp?.enable ?? defaultSettings.signatureHelp.enable,
		},
		format: {
			enable: merged.format?.enable ?? defaultSettings.format.enable,
			indentSize: normalizedIndent,
		},
	};
}
__name(sanitizeSettings, "sanitizeSettings");

// src/handlers/completion.ts
function setupCompletionHandlers(connection2, documents2, languageModes2, hasConfigurationCapability2) {
	connection2.onCompletion(async (params) => {
		try {
			const uri = params.textDocument.uri;
			const document2 = documents2.get(uri);
			if (!document2) {
				return null;
			}
			const settings = await getDocumentSettings(connection2, hasConfigurationCapability2, uri);
			if (!settings.completion.enable) {
				return null;
			}
			const position = params.position;
			const mode = languageModes2.getModeAtPosition(document2, position);
			if (mode && mode.doComplete) {
				try {
					const result = await mode.doComplete(document2, position);
					if (result) {
						return result;
					}
				} catch (error) {
					connection2.console.error(
						`Completion error in embedded mode: ${error instanceof Error ? error.message : String(error)}`,
					);
				}
			}
			const context = detectCompletionContext(document2, position);
			if (context.type === "property" && context.object) {
				return getPropertyCompletions(context.object);
			}
			const documentStates2 = getDocumentStates();
			const state = documentStates2.get(uri);
			const items = [];
			items.push(...getSnippetCompletions());
			state?.symbols.forEach((symbol) => {
				items.push({
					label: symbol.name,
					kind:
						symbol.type === "function" ? import_node4.CompletionItemKind.Function : import_node4.CompletionItemKind.Variable,
					detail: symbol.type,
					data: symbol.name,
					sortText: `0_${symbol.name}`,
				});
			});
			for (const [name, info] of Object.entries(GLOBAL_API)) {
				items.push({
					label: name,
					kind: info.type === "function" ? import_node4.CompletionItemKind.Function : import_node4.CompletionItemKind.Class,
					detail: info.description,
					documentation: info.signature,
					data: name,
					sortText: `1_${name}`,
				});
			}
			["function", "return", "local", "global", "if", "then", "else", "end", "while", "for"].forEach((keyword) => {
				items.push({
					label: keyword,
					kind: import_node4.CompletionItemKind.Keyword,
					data: keyword,
					sortText: `2_${keyword}`,
				});
			});
			return items;
		} catch (error) {
			connection2.console.error(`Completion error: ${error instanceof Error ? error.message : String(error)}`);
			return null;
		}
	});
	connection2.onCompletionResolve((item) => {
		try {
			const info = GLOBAL_API[item.data];
			if (info) {
				item.detail = info.signature || info.type;
				item.documentation = info.description;
			}
			return item;
		} catch (error) {
			connection2.console.error(`Completion resolve error: ${error instanceof Error ? error.message : String(error)}`);
			return item;
		}
	});
}
__name(setupCompletionHandlers, "setupCompletionHandlers");
function getPropertyCompletions(objectName) {
	const api = GLOBAL_API[objectName];
	const items = [];
	if (api && api.properties) {
		for (const [propName, propInfo] of Object.entries(api.properties)) {
			items.push({
				label: propName,
				kind:
					propInfo.type === "method" ? import_node4.CompletionItemKind.Method : import_node4.CompletionItemKind.Property,
				detail: propInfo.description,
				documentation: propInfo.signature,
				insertText: propInfo.type === "method" ? `${propName}($0)` : propName,
				insertTextFormat:
					propInfo.type === "method" ? import_node4.InsertTextFormat.Snippet : import_node4.InsertTextFormat.PlainText,
			});
		}
	}
	return items;
}
__name(getPropertyCompletions, "getPropertyCompletions");
function getSnippetCompletions() {
	return [
		{
			label: "func",
			kind: import_node4.CompletionItemKind.Snippet,
			detail: "Function definition",
			insertText: "${1:name} = function(${2:args})\n	${3:// body}\nend",
			insertTextFormat: import_node4.InsertTextFormat.Snippet,
			documentation: "Creates a new function",
		},
		{
			label: "update",
			kind: import_node4.CompletionItemKind.Snippet,
			detail: "Update loop function",
			insertText: "update = function()\n	${1:// update logic}\nend",
			insertTextFormat: import_node4.InsertTextFormat.Snippet,
			documentation: "Game update loop function",
		},
		{
			label: "draw",
			kind: import_node4.CompletionItemKind.Snippet,
			detail: "Draw loop function",
			insertText: "draw = function()\n	${1:// draw logic}\nend",
			insertTextFormat: import_node4.InsertTextFormat.Snippet,
			documentation: "Game draw loop function",
		},
		{
			label: "if",
			kind: import_node4.CompletionItemKind.Snippet,
			detail: "If statement",
			insertText: "if ${1:condition} then\n	${2:// code}\nend",
			insertTextFormat: import_node4.InsertTextFormat.Snippet,
			documentation: "If conditional statement",
		},
		{
			label: "ifelse",
			kind: import_node4.CompletionItemKind.Snippet,
			detail: "If-else statement",
			insertText: "if ${1:condition} then\n	${2:// true}\nelse\n	${3:// false}\nend",
			insertTextFormat: import_node4.InsertTextFormat.Snippet,
			documentation: "If-else conditional statement",
		},
		{
			label: "for",
			kind: import_node4.CompletionItemKind.Snippet,
			detail: "For loop",
			insertText: "for ${1:i} in ${2:list} do\n	${3:// code}\nend",
			insertTextFormat: import_node4.InsertTextFormat.Snippet,
			documentation: "For loop iteration",
		},
		{
			label: "while",
			kind: import_node4.CompletionItemKind.Snippet,
			detail: "While loop",
			insertText: "while ${1:condition} do\n	${2:// code}\nend",
			insertTextFormat: import_node4.InsertTextFormat.Snippet,
			documentation: "While loop",
		},
	];
}
__name(getSnippetCompletions, "getSnippetCompletions");

// src/handlers/definition.ts
init_cjs_shims();
var import_node5 = __toESM(require_node3());
function setupDefinitionHandler(connection2, documents2) {
	connection2.onDefinition((params) => {
		try {
			const document2 = documents2.get(params.textDocument.uri);
			if (!document2) return null;
			const documentStates2 = getDocumentStates();
			const state = documentStates2.get(params.textDocument.uri);
			if (!state) return null;
			const word = getWordAtPosition(document2, params.position);
			if (!word) return null;
			for (const symbol of state.symbols) {
				if (symbol.name === word) {
					return import_node5.Location.create(params.textDocument.uri, symbol.range);
				}
			}
			return null;
		} catch (error) {
			connection2.console.error(`Definition error: ${error instanceof Error ? error.message : String(error)}`);
			return null;
		}
	});
}
__name(setupDefinitionHandler, "setupDefinitionHandler");

// src/handlers/formatting.ts
init_cjs_shims();
var import_node6 = __toESM(require_node3());
function setupFormattingHandler(connection2, documents2, hasConfigurationCapability2) {
	connection2.onDocumentFormatting(async (params) => {
		try {
			const doc = documents2.get(params.textDocument.uri);
			if (!doc) return [];
			const settings = await getDocumentSettings(connection2, hasConfigurationCapability2, params.textDocument.uri);
			if (!settings.format.enable) {
				return [];
			}
			const text = doc.getText();
			const lines = text.split(/\r?\n/);
			const indentWidth = Math.max(settings.format.indentSize, 1);
			const indentUnit = params.options.insertSpaces ? " ".repeat(indentWidth) : "	".repeat(indentWidth);
			let indent = 0;
			const formatted = lines.map((line) => {
				const trimmed = line.trim();
				if (/^(end|else|elseif)/.test(trimmed)) {
					indent = Math.max(indent - 1, 0);
				}
				const formattedLine = `${indentUnit.repeat(indent)}${trimmed}`;
				if (/(then|do|function|repeat)\b.*$/.test(trimmed) && !trimmed.includes("end")) {
					indent++;
				}
				return formattedLine;
			});
			const fullRange = import_node6.Range.create(import_node6.Position.create(0, 0), doc.positionAt(text.length));
			return [import_node6.TextEdit.replace(fullRange, formatted.join("\n"))];
		} catch (error) {
			connection2.console.error(`Formatting error: ${error instanceof Error ? error.message : String(error)}`);
			return [];
		}
	});
}
__name(setupFormattingHandler, "setupFormattingHandler");

// src/handlers/hover.ts
init_cjs_shims();
function setupHoverHandler(connection2, documents2, languageModes2) {
	connection2.onHover(async (params) => {
		try {
			const document2 = documents2.get(params.textDocument.uri);
			if (!document2) return null;
			try {
				const mode = languageModes2.getModeAtPosition(document2, params.position);
				if (mode && mode.doHover) {
					const result = await mode.doHover(document2, params.position);
					if (result) {
						return result;
					}
				}
			} catch (error) {
				connection2.console.error(
					`Hover error in embedded mode: ${error instanceof Error ? error.message : String(error)}`,
				);
			}
			const documentStates2 = getDocumentStates();
			const state = documentStates2.get(params.textDocument.uri);
			if (!state) return null;
			const word = getWordAtPosition2(state.textDocument, params.position);
			if (!word) return null;
			const symbol = findSymbolByName(state, word);
			if (symbol) {
				return {
					contents: {
						kind: "markdown",
						value: `**${symbol.name}** (${symbol.type})`,
					},
				};
			}
			const globalInfo = GLOBAL_API[word];
			if (globalInfo) {
				return {
					contents: {
						kind: "markdown",
						value: `**${word}** - ${globalInfo.description}

${globalInfo.signature || ""}`,
					},
				};
			}
			return null;
		} catch (error) {
			connection2.console.error(`Hover error: ${error instanceof Error ? error.message : String(error)}`);
			return null;
		}
	});
}
__name(setupHoverHandler, "setupHoverHandler");
function findSymbolByName(state, name) {
	return state.symbols.find((sym) => sym.name === name);
}
__name(findSymbolByName, "findSymbolByName");

// src/handlers/references.ts
init_cjs_shims();
var import_node7 = __toESM(require_node3());
function setupReferencesHandler(connection2, documents2) {
	connection2.onReferences((params) => {
		try {
			const document2 = documents2.get(params.textDocument.uri);
			if (!document2) return null;
			const documentStates2 = getDocumentStates();
			const state = documentStates2.get(params.textDocument.uri);
			if (!state) return null;
			const word = getWordAtPosition(document2, params.position);
			if (!word) return null;
			const locations = [];
			const text = document2.getText();
			const lines = text.split("\n");
			const wordRegex = new RegExp(`\\b${word}\\b`, "g");
			lines.forEach((line, lineIndex) => {
				let match;
				while ((match = wordRegex.exec(line)) !== null) {
					locations.push(
						import_node7.Location.create(
							params.textDocument.uri,
							import_node7.Range.create(
								import_node7.Position.create(lineIndex, match.index),
								import_node7.Position.create(lineIndex, match.index + word.length),
							),
						),
					);
				}
			});
			return locations.length > 0 ? locations : null;
		} catch (error) {
			connection2.console.error(`References error: ${error instanceof Error ? error.message : String(error)}`);
			return null;
		}
	});
}
__name(setupReferencesHandler, "setupReferencesHandler");

// src/handlers/rename.ts
init_cjs_shims();
var import_node8 = __toESM(require_node3());
var RESERVED_KEYWORDS = [
	"function",
	"end",
	"if",
	"then",
	"else",
	"elsif",
	"for",
	"to",
	"by",
	"in",
	"while",
	"do",
	"return",
	"break",
	"continue",
	"local",
	"var",
	"let",
	"and",
	"or",
	"not",
	"true",
	"false",
	"null",
	"object",
	"class",
	"extends",
	"new",
	"delete",
	"after",
	"every",
	"sleep",
];
var API_RESERVED = [
	"screen",
	"audio",
	"keyboard",
	"mouse",
	"touch",
	"gamepad",
	"sprites",
	"maps",
	"sounds",
	"music",
	"assets",
	"system",
	"storage",
	"scene",
	"route",
	"router",
	"print",
	"List",
	"Math",
	"String",
	"JSON",
	"Random",
	"ObjectPool",
	"Image",
	"Sprite",
	"Map",
	"Sound",
];
function setupRenameHandler(connection2, documents2) {
	connection2.onPrepareRename((params) => {
		try {
			const document2 = documents2.get(params.textDocument.uri);
			if (!document2) return null;
			const word = getWordAtPosition(document2, params.position);
			if (!word) return null;
			if (RESERVED_KEYWORDS.includes(word) || API_RESERVED.includes(word)) {
				return null;
			}
			const line = document2.getText({
				start: import_node8.Position.create(params.position.line, 0),
				end: import_node8.Position.create(params.position.line + 1, 0),
			});
			const wordIndex = line.indexOf(word);
			if (wordIndex === -1) return null;
			return {
				range: import_node8.Range.create(
					import_node8.Position.create(params.position.line, wordIndex),
					import_node8.Position.create(params.position.line, wordIndex + word.length),
				),
				placeholder: word,
			};
		} catch (error) {
			connection2.console.error(`Prepare rename error: ${error instanceof Error ? error.message : String(error)}`);
			return null;
		}
	});
	connection2.onRenameRequest((params) => {
		try {
			const document2 = documents2.get(params.textDocument.uri);
			if (!document2) return null;
			const word = getWordAtPosition(document2, params.position);
			if (!word) return null;
			const newName = params.newName;
			if (RESERVED_KEYWORDS.includes(newName) || API_RESERVED.includes(newName)) {
				return null;
			}
			const edits = [];
			const text = document2.getText();
			const lines = text.split("\n");
			const wordRegex = new RegExp(`\\b${word}\\b`, "g");
			lines.forEach((line, lineIndex) => {
				let match;
				while ((match = wordRegex.exec(line)) !== null) {
					edits.push(
						import_node8.TextEdit.replace(
							import_node8.Range.create(
								import_node8.Position.create(lineIndex, match.index),
								import_node8.Position.create(lineIndex, match.index + word.length),
							),
							newName,
						),
					);
				}
			});
			return {
				changes: {
					[params.textDocument.uri]: edits,
				},
			};
		} catch (error) {
			connection2.console.error(`Rename error: ${error instanceof Error ? error.message : String(error)}`);
			return null;
		}
	});
}
__name(setupRenameHandler, "setupRenameHandler");

// src/handlers/semantic-tokens.ts
init_cjs_shims();
var import_node9 = __toESM(require_node3());
var TOKEN_TYPES = [
	"namespace",
	"class",
	"function",
	"variable",
	"parameter",
	"property",
	"keyword",
	"number",
	"string",
	"comment",
];
var TOKEN_MODIFIERS = [
	"declaration",
	"readonly",
	"static",
	"deprecated",
	"modification",
	"documentation",
	"defaultLibrary",
];
var API_OBJECTS = [
	"screen",
	"audio",
	"keyboard",
	"mouse",
	"touch",
	"gamepad",
	"sprites",
	"maps",
	"sounds",
	"music",
	"assets",
	"system",
	"storage",
	"router",
];
var CONSTRUCTORS = ["Random", "ObjectPool", "Image", "Sprite", "Map", "Sound", "List", "Math", "String", "JSON"];
function setupSemanticTokensHandler(connection2, documents2) {
	connection2.languages.semanticTokens.on((params) => {
		const document2 = documents2.get(params.textDocument.uri);
		if (!document2) {
			return {
				data: [],
			};
		}
		const builder = new import_node9.SemanticTokensBuilder();
		const text = document2.getText();
		const lines = text.split("\n");
		lines.forEach((line, lineIndex) => {
			API_OBJECTS.forEach((api) => {
				const regex = new RegExp(`\\b${api}\\b`, "g");
				let match2;
				while ((match2 = regex.exec(line)) !== null) {
					builder.push(lineIndex, match2.index, api.length, 0, 1 << 6);
				}
			});
			CONSTRUCTORS.forEach((constructor) => {
				const regex = new RegExp(`\\b${constructor}\\b`, "g");
				let match2;
				while ((match2 = regex.exec(line)) !== null) {
					builder.push(lineIndex, match2.index, constructor.length, 1, 1 << 6);
				}
			});
			const functionRegex = /\b([a-zA-Z_][a-zA-Z0-9_]*)\s*\(/g;
			let match;
			while ((match = functionRegex.exec(line)) !== null) {
				const funcName = match[1];
				if (!API_OBJECTS.includes(funcName) && !CONSTRUCTORS.includes(funcName)) {
					builder.push(lineIndex, match.index, funcName.length, 2, 0);
				}
			}
			const numberRegex = /\b\d+(\.\d+)?\b/g;
			while ((match = numberRegex.exec(line)) !== null) {
				builder.push(lineIndex, match.index, match[0].length, 7, 0);
			}
			const stringRegex = /"([^"\\]|\\.)*"|'([^'\\]|\\.)*'|`([^`\\]|\\.)*`/g;
			while ((match = stringRegex.exec(line)) !== null) {
				builder.push(lineIndex, match.index, match[0].length, 8, 0);
			}
			if (line.trim().startsWith("//")) {
				builder.push(lineIndex, line.indexOf("//"), line.length, 9, 0);
			}
		});
		return builder.build();
	});
}
__name(setupSemanticTokensHandler, "setupSemanticTokensHandler");

// src/handlers/signature-help.ts
init_cjs_shims();
var import_node10 = __toESM(require_node3());
function setupSignatureHelpHandler(connection2, documents2, hasConfigurationCapability2) {
	connection2.onSignatureHelp(async (params) => {
		try {
			const document2 = documents2.get(params.textDocument.uri);
			if (!document2) return null;
			const settings = await getDocumentSettings(connection2, hasConfigurationCapability2, params.textDocument.uri);
			if (!settings.signatureHelp.enable) {
				return null;
			}
			const line = document2.getText({
				start: import_node10.Position.create(params.position.line, 0),
				end: import_node10.Position.create(params.position.line, params.position.character),
			});
			const functionMatch = line.match(/([A-Za-z_][A-Za-z0-9_.]*)\s*\([^)]*$/);
			if (!functionMatch) return null;
			const functionName = functionMatch[1];
			const parts = functionName.split(".");
			let signature;
			let description;
			if (parts.length === 2) {
				const [objectName, methodName] = parts;
				const api = GLOBAL_API[objectName];
				if (api && api.properties && api.properties[methodName]) {
					signature = api.properties[methodName].signature;
					description = api.properties[methodName].description;
				}
			} else {
				const api = GLOBAL_API[functionName];
				if (api) {
					signature = api.signature;
					description = api.description;
				}
			}
			if (!signature) return null;
			const paramMatch = signature.match(/\(([^)]*)\)/);
			const paramsStr = paramMatch ? paramMatch[1] : "";
			const parameters = paramsStr
				.split(",")
				.filter((p) => p.trim())
				.map((param) => ({
					label: param.trim(),
				}));
			const commaCount = (line.match(/,/g) || []).length;
			const activeParameter = Math.min(commaCount, parameters.length - 1);
			return {
				signatures: [import_node10.SignatureInformation.create(signature, description, ...parameters)],
				activeSignature: 0,
				activeParameter: activeParameter >= 0 ? activeParameter : 0,
			};
		} catch (error) {
			connection2.console.error(`Signature help error: ${error instanceof Error ? error.message : String(error)}`);
			return null;
		}
	});
}
__name(setupSignatureHelpHandler, "setupSignatureHelpHandler");

// src/handlers/symbols.ts
init_cjs_shims();
var import_node11 = __toESM(require_node3());
function setupSymbolHandlers(connection2) {
	connection2.onDocumentSymbol((params) => {
		const documentStates2 = getDocumentStates();
		const state = documentStates2.get(params.textDocument.uri);
		if (!state) return [];
		return state.symbols.map((symbol) => ({
			name: symbol.name,
			kind: symbol.type === "function" ? import_node11.SymbolKind.Function : import_node11.SymbolKind.Variable,
			location: import_node11.Location.create(symbol.documentUri, symbol.range),
		}));
	});
	connection2.onWorkspaceSymbol(() => {
		const documentStates2 = getDocumentStates();
		const infos = [];
		for (const state of documentStates2.values()) {
			state.symbols.forEach((symbol) => {
				infos.push({
					name: symbol.name,
					kind: symbol.type === "function" ? import_node11.SymbolKind.Function : import_node11.SymbolKind.Variable,
					location: import_node11.Location.create(symbol.documentUri, symbol.range),
				});
			});
		}
		return infos;
	});
}
__name(setupSymbolHandlers, "setupSymbolHandlers");

// src/validation.ts
init_cjs_shims();
init_dist();
var import_parser3 = __toESM(require_parser());
var import_node12 = __toESM(require_node3());

// src/types.ts
init_cjs_shims();
function hasParserError(parser) {
	return (
		typeof parser === "object" &&
		parser !== null &&
		"error_info" in parser &&
		typeof parser.error_info === "object" &&
		parser.error_info !== null
	);
}
__name(hasParserError, "hasParserError");

// src/validation.ts
async function validateTextDocument(
	textDocument,
	connection2,
	hasConfigurationCapability2,
	languageModes2,
	documentRegionsCache2,
) {
	const settings = await getDocumentSettings(connection2, hasConfigurationCapability2, textDocument.uri);
	if (!settings.diagnostics.enable) {
		connection2.sendDiagnostics({
			uri: textDocument.uri,
			diagnostics: [],
		});
		return;
	}
	const text = textDocument.getText();
	const diagnostics = [];
	const documentRegions = documentRegionsCache2.get(textDocument);
	const allModes = languageModes2.getAllModes();
	for (const mode of allModes) {
		if (mode.doValidation) {
			const embeddedDoc = documentRegions.getEmbeddedDocument(mode.getId());
			const hasEmbeddedContent = embeddedDoc.getText().trim().length > 0;
			if (hasEmbeddedContent) {
				try {
					const embeddedDiagnostics = await mode.doValidation(textDocument);
					diagnostics.push(...embeddedDiagnostics);
				} catch (error) {
					connection2.console.error(
						`Validation error in ${mode.getId()}: ${error instanceof Error ? error.message : String(error)}`,
					);
				}
			}
		}
	}
	try {
		const parser = new import_parser3.Parser(text, textDocument.uri);
		parser.parse();
		if (hasParserError(parser)) {
			const err = parser.error_info;
			const diagnosticData = createDiagnostic(err.code || "E1004", {
				file: textDocument.uri,
				line: err.line,
				column: err.column,
				length: err.length,
				context: err.context,
				suggestions: err.suggestions,
				related: err.related
					? {
							file: textDocument.uri,
							line: err.related.line,
							column: err.related.column,
							message: err.related.message || "Related location",
						}
					: void 0,
				data: {
					error: err.error,
				},
			});
			const lspDiagnostic = formatForLSP(diagnosticData);
			diagnostics.push(lspDiagnostic);
		}
	} catch (error) {
		const errorMessage = error instanceof Error ? error.message : String(error);
		const diagnostic = {
			severity: import_node12.DiagnosticSeverity.Error,
			range: {
				start: {
					line: 0,
					character: 0,
				},
				end: {
					line: 0,
					character: 10,
				},
			},
			message: errorMessage || "Unknown parser error",
			source: "lootiscript",
		};
		diagnostics.push(diagnostic);
		connection2.console.error(`Parser error: ${errorMessage}`);
	}
	validateApiUsage(textDocument, diagnostics);
	connection2.sendDiagnostics({
		uri: textDocument.uri,
		diagnostics,
	});
}
__name(validateTextDocument, "validateTextDocument");
function validateApiUsage(textDocument, diagnostics) {
	const text = textDocument.getText();
	API_ACCESS_REGEX.lastIndex = 0;
	const seenPositions = /* @__PURE__ */ new Set();
	let match;
	while ((match = API_ACCESS_REGEX.exec(text))) {
		const matchIndex = match.index;
		if (seenPositions.has(matchIndex)) {
			continue;
		}
		seenPositions.add(matchIndex);
		const fullPath = match[1];
		const propertyName = match[2];
		const rootObjectName = fullPath.split(".")[0];
		const isNested = fullPath.includes(".");
		const knownRuntimeObjects = /* @__PURE__ */ new Set(["sprites", "map", "sounds", "music", "assets"]);
		if (isNested) {
			const api2 = GLOBAL_API[rootObjectName];
			if (knownRuntimeObjects.has(rootObjectName)) {
				continue;
			}
			if (!api2) {
				continue;
			}
			const nestedPath = fullPath.split(".").slice(1);
			if (nestedPath.length > 0) {
				continue;
			}
		}
		const api = GLOBAL_API[fullPath];
		if (!api || !api.properties) {
			continue;
		}
		if (api.properties[propertyName]) {
			continue;
		}
		if (api.type === "object") {
			continue;
		}
		const prevChar = matchIndex > 0 ? text[matchIndex - 1] : "";
		if (prevChar === '"' || prevChar === "'" || prevChar === "`") {
			continue;
		}
		const propertyStart = matchIndex + fullPath.length + 1;
		const suggestion = getClosestPropertySuggestion(propertyName, Object.keys(api.properties));
		const startPos = textDocument.positionAt(propertyStart);
		const diagnosticData = createDiagnostic("E7100", {
			file: textDocument.uri,
			line: startPos.line + 1,
			column: startPos.character + 1,
			length: propertyName.length,
			data: {
				propertyName,
				objectName: fullPath,
				suggestion,
			},
		});
		const lspDiagnostic = formatForLSP(diagnosticData);
		diagnostics.push(lspDiagnostic);
	}
}
__name(validateApiUsage, "validateApiUsage");

// src/server.ts
var connection = (0, import_node13.createConnection)(import_node13.ProposedFeatures.all);
var documents = new import_node13.TextDocuments(TextDocument);
var documentRegionsCache = new DocumentRegionsCache();
var languageModes = new LanguageModes(documentRegionsCache);
var jsonLanguageService = createJSONLanguageService();
languageModes.registerMode(getJSONMode(jsonLanguageService, documentRegionsCache));
var GLOBAL_API_REQUEST = "lootiscript/globalApi";
connection.onRequest(GLOBAL_API_REQUEST, () => GLOBAL_API);
var hasConfigurationCapability = false;
var hasWorkspaceFolderCapability = false;
connection.onInitialize((params) => {
	const capabilities = params.capabilities;
	hasConfigurationCapability = !!(capabilities.workspace && !!capabilities.workspace.configuration);
	hasWorkspaceFolderCapability = !!(capabilities.workspace && !!capabilities.workspace.workspaceFolders);
	const result = {
		capabilities: {
			textDocumentSync: import_node13.TextDocumentSyncKind.Incremental,
			// Declare all LSP features this server implements
			completionProvider: {
				resolveProvider: true,
				triggerCharacters: ["."],
			},
			signatureHelpProvider: {
				triggerCharacters: ["(", ","],
			},
			hoverProvider: true,
			definitionProvider: true,
			documentSymbolProvider: true,
			workspaceSymbolProvider: true,
			referencesProvider: true,
			documentFormattingProvider: true,
			renameProvider: {
				prepareProvider: true,
			},
			codeActionProvider: {
				codeActionKinds: [import_node13.CodeActionKind.QuickFix, import_node13.CodeActionKind.Refactor],
			},
			semanticTokensProvider: {
				legend: {
					tokenTypes: TOKEN_TYPES,
					tokenModifiers: TOKEN_MODIFIERS,
				},
				full: true,
			},
		},
	};
	if (hasWorkspaceFolderCapability) {
		result.capabilities.workspace = {
			workspaceFolders: {
				supported: true,
			},
		};
	}
	return result;
});
connection.onInitialized(() => {
	if (hasConfigurationCapability) {
		connection.client.register(import_node13.DidChangeConfigurationNotification.type, void 0);
	}
	if (hasWorkspaceFolderCapability) {
		connection.workspace.onDidChangeWorkspaceFolders((_event) => {});
	}
});
connection.onDidChangeConfiguration(async (change) => {
	if (hasConfigurationCapability) {
		clearDocumentSettings();
	} else {
		setGlobalSettings(sanitizeSettings(change.settings?.lootiscript));
	}
	for (const doc of documents.all()) {
		await validateTextDocument(doc, connection, hasConfigurationCapability, languageModes, documentRegionsCache);
	}
});
documents.onDidChangeContent((change) => {
	updateDocumentState(change.document, connection);
	validateTextDocument(change.document, connection, hasConfigurationCapability, languageModes, documentRegionsCache);
});
documents.onDidOpen((change) => {
	updateDocumentState(change.document, connection);
	validateTextDocument(change.document, connection, hasConfigurationCapability, languageModes, documentRegionsCache);
});
documents.onDidClose((change) => {
	deleteDocumentState(change.document.uri);
	connection.sendDiagnostics({
		uri: change.document.uri,
		diagnostics: [],
	});
});
connection.onDidChangeWatchedFiles((_change) => {});
setupCompletionHandlers(connection, documents, languageModes, hasConfigurationCapability);
setupHoverHandler(connection, documents, languageModes);
setupSignatureHelpHandler(connection, documents, hasConfigurationCapability);
setupSymbolHandlers(connection);
setupFormattingHandler(connection, documents, hasConfigurationCapability);
setupCodeActionsHandler(connection, documents);
setupDefinitionHandler(connection, documents);
setupReferencesHandler(connection, documents);
setupRenameHandler(connection, documents);
setupSemanticTokensHandler(connection, documents);
documents.listen(connection);
connection.listen();
//# sourceMappingURL=server.js.map
