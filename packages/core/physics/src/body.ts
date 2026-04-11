import type { Shape } from "./shapes";

export interface PhysicsBodyConfig {
	x: number;
	y: number;
	vx?: number;
	vy?: number;
	mass?: number;
	friction?: number;
	restitution?: number;
	gravityScale?: number;
	shape: Shape;
	isTrigger?: boolean;
	tag?: string;
}

export interface CollisionResult {
	bodyId: number;
	otherId: number;
	otherTag: string;
	nx: number;
	ny: number;
	depth: number;
}

export interface PhysicsBody {
	id: number;
	x: number;
	y: number;
	vx: number;
	vy: number;
	ax: number;
	ay: number;
	mass: number;
	invMass: number;
	friction: number;
	restitution: number;
	gravityScale: number;
	shape: Shape;
	isTrigger: boolean;
	tag: string;
	active: boolean;
	onCollide: ((result: CollisionResult) => void) | null;
}

export function createBody(id: number, config: PhysicsBodyConfig): PhysicsBody {
	const mass = config.mass ?? 1;
	return {
		id,
		x: config.x,
		y: config.y,
		vx: config.vx ?? 0,
		vy: config.vy ?? 0,
		ax: 0,
		ay: 0,
		mass,
		invMass: mass === 0 ? 0 : 1 / mass,
		friction: config.friction ?? 0,
		restitution: config.restitution ?? 0.2,
		gravityScale: config.gravityScale ?? 1,
		shape: config.shape,
		isTrigger: config.isTrigger ?? false,
		tag: config.tag ?? "",
		active: true,
		onCollide: null,
	};
}
