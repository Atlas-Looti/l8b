/** Plain data — no methods — for zero-allocation pooling */
export interface Particle {
	x: number;
	y: number;
	vx: number;
	vy: number;
	ax: number;
	ay: number;
	life: number;
	maxLife: number;
	size: number;
	startSize: number;
	endSize: number;
	r: number;
	g: number;
	b: number;
	startAlpha: number;
	endAlpha: number;
	rotation: number;
	rotationSpeed: number;
	active: boolean;
	sprite: string | null;
}

export function makeParticle(): Particle {
	return {
		x: 0, y: 0, vx: 0, vy: 0, ax: 0, ay: 0,
		life: 0, maxLife: 0,
		size: 0, startSize: 0, endSize: 0,
		r: 255, g: 255, b: 255,
		startAlpha: 1, endAlpha: 0,
		rotation: 0, rotationSpeed: 0,
		active: false,
		sprite: null,
	};
}
