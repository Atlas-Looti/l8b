/**
 * Core API definitions — stdlib + built-in globals.
 *
 * This barrel re-exports the specialized modules so existing importers
 * (`index.ts`) need no changes.  Edit the focused files instead:
 *   - stdlib-list.ts   — List
 *   - stdlib-math.ts   — Math
 *   - stdlib-string.ts — String
 *   - stdlib-json.ts   — JSON
 *   - builtins.ts      — print, Random, ObjectPool, storage
 */

import type { GlobalApi } from "../types";
import { builtinsApi } from "./builtins";
import { stdlibJsonApi } from "./stdlib-json";
import { stdlibListApi } from "./stdlib-list";
import { stdlibMathApi } from "./stdlib-math";
import { stdlibStringApi } from "./stdlib-string";

export const coreApi: Partial<GlobalApi> = {
	...builtinsApi,
	...stdlibListApi,
	...stdlibMathApi,
	...stdlibStringApi,
	...stdlibJsonApi,
};
