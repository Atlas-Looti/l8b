const c1 = 1.70158;
const c2 = c1 * 1.525;
const c3 = c1 + 1;
const c4 = (2 * Math.PI) / 3;
const c5 = (2 * Math.PI) / 4.5;

export const Easing: Record<string, (t: number) => number> = {
	linear: (t) => t,

	easeInQuad: (t) => t * t,
	easeOutQuad: (t) => 1 - (1 - t) * (1 - t),
	easeInOutQuad: (t) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2),

	easeInCubic: (t) => t * t * t,
	easeOutCubic: (t) => 1 - (1 - t) ** 3,
	easeInOutCubic: (t) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2),

	easeInQuart: (t) => t * t * t * t,
	easeOutQuart: (t) => 1 - (1 - t) ** 4,
	easeInOutQuart: (t) => (t < 0.5 ? 8 * t * t * t * t : 1 - (-2 * t + 2) ** 4 / 2),

	easeInSine: (t) => 1 - Math.cos((t * Math.PI) / 2),
	easeOutSine: (t) => Math.sin((t * Math.PI) / 2),
	easeInOutSine: (t) => -(Math.cos(Math.PI * t) - 1) / 2,

	easeInExpo: (t) => (t === 0 ? 0 : 2 ** (10 * t - 10)),
	easeOutExpo: (t) => (t === 1 ? 1 : 1 - 2 ** (-10 * t)),
	easeInOutExpo: (t) => {
		if (t === 0) return 0;
		if (t === 1) return 1;
		return t < 0.5 ? 2 ** (20 * t - 10) / 2 : (2 - 2 ** (-20 * t + 10)) / 2;
	},

	easeInBack: (t) => c3 * t * t * t - c1 * t * t,
	easeOutBack: (t) => 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2,
	easeInOutBack: (t) =>
		t < 0.5
			? ((2 * t) ** 2 * ((c2 + 1) * 2 * t - c2)) / 2
			: ((2 * t - 2) ** 2 * ((c2 + 1) * (2 * t - 2) + c2) + 2) / 2,

	easeInElastic: (t) => {
		if (t === 0) return 0;
		if (t === 1) return 1;
		return -(2 ** (10 * t - 10)) * Math.sin((t * 10 - 10.75) * c4);
	},
	easeOutElastic: (t) => {
		if (t === 0) return 0;
		if (t === 1) return 1;
		return 2 ** (-10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
	},
	easeInOutElastic: (t) => {
		if (t === 0) return 0;
		if (t === 1) return 1;
		return t < 0.5
			? -(2 ** (20 * t - 10) * Math.sin((20 * t - 11.125) * c5)) / 2
			: (2 ** (-20 * t + 10) * Math.sin((20 * t - 11.125) * c5)) / 2 + 1;
	},

	easeInBounce: (t) => 1 - bounceOut(1 - t),
	easeOutBounce: (t) => bounceOut(t),
	easeInOutBounce: (t) => (t < 0.5 ? (1 - bounceOut(1 - 2 * t)) / 2 : (1 + bounceOut(2 * t - 1)) / 2),
};

function bounceOut(t: number): number {
	const n1 = 7.5625;
	const d1 = 2.75;
	if (t < 1 / d1) return n1 * t * t;
	if (t < 2 / d1) return n1 * (t -= 1.5 / d1) * t + 0.75;
	if (t < 2.5 / d1) return n1 * (t -= 2.25 / d1) * t + 0.9375;
	return n1 * (t -= 2.625 / d1) * t + 0.984375;
}
