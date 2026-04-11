import type { AABB, Circle } from "./shapes";
import type { PhysicsBody } from "./body";

interface Hit {
	nx: number;
	ny: number;
	depth: number;
}

export function testAABBvsAABB(ax: number, ay: number, a: AABB, bx: number, by: number, b: AABB): Hit | null {
	const aleft = ax + a.x;
	const atop = ay + a.y;
	const aright = aleft + a.w;
	const abottom = atop + a.h;

	const bleft = bx + b.x;
	const btop = by + b.y;
	const bright = bleft + b.w;
	const bbottom = btop + b.h;

	if (aright <= bleft || bright <= aleft || abottom <= btop || bbottom <= atop) return null;

	const overlapX = Math.min(aright, bright) - Math.max(aleft, bleft);
	const overlapY = Math.min(abottom, bbottom) - Math.max(atop, btop);

	if (overlapX < overlapY) {
		const nx = aleft < bleft ? -1 : 1;
		return { nx, ny: 0, depth: overlapX };
	}
	const ny = atop < btop ? -1 : 1;
	return { nx: 0, ny, depth: overlapY };
}

export function testCirclevsCircle(ax: number, ay: number, a: Circle, bx: number, by: number, b: Circle): Hit | null {
	const cx1 = ax + a.x;
	const cy1 = ay + a.y;
	const cx2 = bx + b.x;
	const cy2 = by + b.y;
	const dx = cx2 - cx1;
	const dy = cy2 - cy1;
	const dist2 = dx * dx + dy * dy;
	const radiusSum = a.r + b.r;
	if (dist2 >= radiusSum * radiusSum) return null;
	const dist = Math.sqrt(dist2);
	if (dist === 0) return { nx: 1, ny: 0, depth: radiusSum };
	return { nx: dx / dist, ny: dy / dist, depth: radiusSum - dist };
}

export function testAABBvsCircle(ax: number, ay: number, a: AABB, bx: number, by: number, b: Circle): Hit | null {
	const cx = bx + b.x;
	const cy = by + b.y;

	const nearX = Math.max(ax + a.x, Math.min(cx, ax + a.x + a.w));
	const nearY = Math.max(ay + a.y, Math.min(cy, ay + a.y + a.h));

	const dx = cx - nearX;
	const dy = cy - nearY;
	const dist2 = dx * dx + dy * dy;
	if (dist2 >= b.r * b.r) return null;

	const dist = Math.sqrt(dist2);
	if (dist === 0) {
		// Circle center inside AABB — push out nearest edge
		const overlapX = cx - (ax + a.x) < ax + a.x + a.w - cx ? cx - (ax + a.x) : ax + a.x + a.w - cx;
		const overlapY = cy - (ay + a.y) < ay + a.y + a.h - cy ? cy - (ay + a.y) : ay + a.y + a.h - cy;
		if (overlapX < overlapY) {
			return { nx: cx < ax + a.x + a.w / 2 ? -1 : 1, ny: 0, depth: overlapX + b.r };
		}
		return { nx: 0, ny: cy < ay + a.y + a.h / 2 ? -1 : 1, depth: overlapY + b.r };
	}
	return { nx: dx / dist, ny: dy / dist, depth: b.r - dist };
}

export function resolveCollision(bodyA: PhysicsBody, bodyB: PhysicsBody, nx: number, ny: number, depth: number): void {
	const totalInvMass = bodyA.invMass + bodyB.invMass;
	if (totalInvMass === 0) return;

	// Positional correction (Baumgarte) — small fraction per frame
	const correction = (Math.max(depth - 0.5, 0) / totalInvMass) * 0.4;
	bodyA.x -= nx * correction * bodyA.invMass;
	bodyA.y -= ny * correction * bodyA.invMass;
	bodyB.x += nx * correction * bodyB.invMass;
	bodyB.y += ny * correction * bodyB.invMass;

	// Relative velocity along normal
	const rvx = bodyB.vx - bodyA.vx;
	const rvy = bodyB.vy - bodyA.vy;
	const velAlongNormal = rvx * nx + rvy * ny;

	if (velAlongNormal > 0) return; // Already separating

	const restitution = Math.min(bodyA.restitution, bodyB.restitution);
	const impulseMag = (-(1 + restitution) * velAlongNormal) / totalInvMass;

	bodyA.vx -= impulseMag * nx * bodyA.invMass;
	bodyA.vy -= impulseMag * ny * bodyA.invMass;
	bodyB.vx += impulseMag * nx * bodyB.invMass;
	bodyB.vy += impulseMag * ny * bodyB.invMass;
}
