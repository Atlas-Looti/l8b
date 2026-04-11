import { createBody, type CollisionResult, type PhysicsBody, type PhysicsBodyConfig } from "./body";
import { testAABBvsAABB, testAABBvsCircle, testCirclevsCircle, resolveCollision } from "./collision";

export class PhysicsWorld {
	gravity = 980;
	maxVelocity = 2000;

	private bodies: Map<number, PhysicsBody> = new Map();
	private nextId = 0;

	update(dtMs: number): void {
		// Cap delta to prevent explosion on tab resume
		const dt = Math.min(dtMs / 1000, 0.05);

		// 1. Integrate
		for (const b of this.bodies.values()) {
			if (!b.active || b.invMass === 0) continue;

			b.vy += (this.gravity * b.gravityScale + b.ay) * dt;
			b.vx += b.ax * dt;

			b.vx += b.vx * -b.friction * dt;
			b.vy += b.vy * -b.friction * dt;

			// Clamp velocity
			const speed = Math.sqrt(b.vx * b.vx + b.vy * b.vy);
			if (speed > this.maxVelocity) {
				const scale = this.maxVelocity / speed;
				b.vx *= scale;
				b.vy *= scale;
			}

			b.x += b.vx * dt;
			b.y += b.vy * dt;

			b.ax = 0;
			b.ay = 0;
		}

		// 2. Collision detection + resolution
		const bodyArr = Array.from(this.bodies.values()).filter((b) => b.active);
		const collisions: Array<{ a: PhysicsBody; b: PhysicsBody; nx: number; ny: number; depth: number }> = [];

		for (let i = 0; i < bodyArr.length; i++) {
			for (let j = i + 1; j < bodyArr.length; j++) {
				const a = bodyArr[i];
				const b = bodyArr[j];
				if (a.invMass === 0 && b.invMass === 0) continue;

				const hit = this._testPair(a, b);
				if (hit) collisions.push({ a, b, ...hit });
			}
		}

		// 3. Resolve + collect results for callbacks
		const callbackResults: Array<{ body: PhysicsBody; result: CollisionResult }> = [];

		for (const col of collisions) {
			const { a, b, nx, ny, depth } = col;

			if (!a.isTrigger && !b.isTrigger) {
				resolveCollision(a, b, nx, ny, depth);
			}

			if (a.onCollide) {
				callbackResults.push({
					body: a,
					result: { bodyId: a.id, otherId: b.id, otherTag: b.tag, nx, ny, depth },
				});
			}
			if (b.onCollide) {
				callbackResults.push({
					body: b,
					result: { bodyId: b.id, otherId: a.id, otherTag: a.tag, nx: -nx, ny: -ny, depth },
				});
			}
		}

		// 4. Fire callbacks after all resolutions
		for (const { body, result } of callbackResults) {
			body.onCollide?.(result);
		}
	}

	addBody(config: PhysicsBodyConfig): number {
		const id = this.nextId++;
		const body = createBody(id, config);
		this.bodies.set(id, body);
		return id;
	}

	removeBody(id: number): void {
		this.bodies.delete(id);
	}

	getBody(id: number): { x: number; y: number; vx: number; vy: number; tag: string } | null {
		const b = this.bodies.get(id);
		if (!b) return null;
		return { x: b.x, y: b.y, vx: b.vx, vy: b.vy, tag: b.tag };
	}

	setPosition(id: number, x: number, y: number): void {
		const b = this.bodies.get(id);
		if (b) { b.x = x; b.y = y; }
	}

	setVelocity(id: number, vx: number, vy: number): void {
		const b = this.bodies.get(id);
		if (b) { b.vx = vx; b.vy = vy; }
	}

	applyForce(id: number, fx: number, fy: number): void {
		const b = this.bodies.get(id);
		if (b && b.invMass > 0) {
			b.ax += fx * b.invMass;
			b.ay += fy * b.invMass;
		}
	}

	applyImpulse(id: number, ix: number, iy: number): void {
		const b = this.bodies.get(id);
		if (b && b.invMass > 0) {
			b.vx += ix * b.invMass;
			b.vy += iy * b.invMass;
		}
	}

	onCollide(id: number, cb: (result: CollisionResult) => void): void {
		const b = this.bodies.get(id);
		if (b) b.onCollide = cb;
	}

	setGravity(g: number): void {
		this.gravity = g;
	}

	query(x: number, y: number, w: number, h: number): number[] {
		const result: number[] = [];
		for (const b of this.bodies.values()) {
			if (!b.active) continue;
			const bx = b.x, by = b.y;
			const shape = b.shape;
			let left: number, top: number, right: number, bottom: number;
			if (shape.type === "aabb") {
				left = bx + shape.x; top = by + shape.y;
				right = left + shape.w; bottom = top + shape.h;
			} else {
				left = bx + shape.x - shape.r; top = by + shape.y - shape.r;
				right = bx + shape.x + shape.r; bottom = by + shape.y + shape.r;
			}
			if (right >= x && left <= x + w && bottom >= y && top <= y + h) {
				result.push(b.id);
			}
		}
		return result;
	}

	reset(): void {
		this.bodies.clear();
		this.nextId = 0;
		this.gravity = 980;
	}

	getInterface(): Record<string, unknown> {
		return {
			setGravity: (g: number) => this.setGravity(g),
			addBody: (config: PhysicsBodyConfig) => this.addBody(config),
			removeBody: (id: number) => this.removeBody(id),
			getBody: (id: number) => this.getBody(id),
			setPosition: (id: number, x: number, y: number) => this.setPosition(id, x, y),
			setVelocity: (id: number, vx: number, vy: number) => this.setVelocity(id, vx, vy),
			applyForce: (id: number, fx: number, fy: number) => this.applyForce(id, fx, fy),
			applyImpulse: (id: number, ix: number, iy: number) => this.applyImpulse(id, ix, iy),
			onCollide: (id: number, cb: (result: CollisionResult) => void) => this.onCollide(id, cb),
			query: (x: number, y: number, w: number, h: number) => this.query(x, y, w, h),
		};
	}

	private _testPair(
		a: PhysicsBody,
		b: PhysicsBody,
	): { nx: number; ny: number; depth: number } | null {
		const as = a.shape, bs = b.shape;
		if (as.type === "aabb" && bs.type === "aabb") {
			return testAABBvsAABB(a.x, a.y, as, b.x, b.y, bs);
		}
		if (as.type === "circle" && bs.type === "circle") {
			return testCirclevsCircle(a.x, a.y, as, b.x, b.y, bs);
		}
		if (as.type === "aabb" && bs.type === "circle") {
			return testAABBvsCircle(a.x, a.y, as, b.x, b.y, bs);
		}
		if (as.type === "circle" && bs.type === "aabb") {
			const hit = testAABBvsCircle(b.x, b.y, bs, a.x, a.y, as);
			if (hit) return { nx: -hit.nx, ny: -hit.ny, depth: hit.depth };
		}
		return null;
	}
}
