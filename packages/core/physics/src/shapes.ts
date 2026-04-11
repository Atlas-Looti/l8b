export interface AABB {
	type: "aabb";
	/** Offset from body origin */
	x: number;
	y: number;
	w: number;
	h: number;
}

export interface Circle {
	type: "circle";
	/** Offset from body origin */
	x: number;
	y: number;
	r: number;
}

export type Shape = AABB | Circle;
