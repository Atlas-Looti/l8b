/**
 * API definitions for the Math standard library.
 */

import type { GlobalApi } from "../types";

export const stdlibMathApi: Partial<GlobalApi> = {
	Math: {
		type: "module",
		description: "Mathematical and game-specific utilities",
		properties: {
			abs: { type: "method", signature: "Math.abs(x)", description: "Absolute value" },
			sqrt: { type: "method", signature: "Math.sqrt(x)", description: "Square root" },
			floor: { type: "method", signature: "Math.floor(x)", description: "Round down" },
			ceil: { type: "method", signature: "Math.ceil(x)", description: "Round up" },
			round: { type: "method", signature: "Math.round(x)", description: "Round to nearest" },
			min: { type: "method", signature: "Math.min(...args)", description: "Minimum value" },
			max: { type: "method", signature: "Math.max(...args)", description: "Maximum value" },
			pow: { type: "method", signature: "Math.pow(base, exp)", description: "Power function" },
			exp: { type: "method", signature: "Math.exp(x)", description: "e^x" },
			log: { type: "method", signature: "Math.log(x)", description: "Natural logarithm" },
			log10: { type: "method", signature: "Math.log10(x)", description: "Base-10 logarithm" },
			sin: { type: "method", signature: "Math.sin(x)", description: "Sine (radians)" },
			cos: { type: "method", signature: "Math.cos(x)", description: "Cosine (radians)" },
			tan: { type: "method", signature: "Math.tan(x)", description: "Tangent (radians)" },
			asin: { type: "method", signature: "Math.asin(x)", description: "Arcsine" },
			acos: { type: "method", signature: "Math.acos(x)", description: "Arccosine" },
			atan: { type: "method", signature: "Math.atan(x)", description: "Arctangent" },
			atan2: { type: "method", signature: "Math.atan2(y, x)", description: "Two-argument arctangent" },
			random: { type: "method", signature: "Math.random()", description: "Random number 0-1" },
			randomInt: { type: "method", signature: "Math.randomInt(min, max)", description: "Random integer" },
			randomFloat: { type: "method", signature: "Math.randomFloat(min, max)", description: "Random float" },
			PI: { type: "property", description: "Pi constant (3.14159...)" },
			E: { type: "property", description: "Euler's number (2.71828...)" },
			clamp: { type: "method", signature: "Math.clamp(value, min, max)", description: "Clamp value between min/max" },
			lerp: { type: "method", signature: "Math.lerp(a, b, t)", description: "Linear interpolation" },
			distance: { type: "method", signature: "Math.distance(x1, y1, x2, y2)", description: "2D distance" },
			distance3D: { type: "method", signature: "Math.distance3D(x1, y1, z1, x2, y2, z2)", description: "3D distance" },
			angleBetween: { type: "method", signature: "Math.angleBetween(x1, y1, x2, y2)", description: "Angle between points" },
			degToRad: { type: "method", signature: "Math.degToRad(degrees)", description: "Convert degrees to radians" },
			radToDeg: { type: "method", signature: "Math.radToDeg(radians)", description: "Convert radians to degrees" },
			sign: { type: "method", signature: "Math.sign(x)", description: "Sign of number (-1, 0, 1)" },
			mod: { type: "method", signature: "Math.mod(n, m)", description: "Euclidean modulo" },
		},
	},
};
