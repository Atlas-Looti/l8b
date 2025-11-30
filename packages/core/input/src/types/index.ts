/**
 * Shared input type definitions for game input handling.
 */

export interface KeyboardPressRelease {
	[key: string]: number;
}

export interface KeyboardState extends Record<string, number | KeyboardPressRelease> {
	press: KeyboardPressRelease;
	release: KeyboardPressRelease;
	UP: number;
	DOWN: number;
	LEFT: number;
	RIGHT: number;
}

export interface MouseState {
	x: number;
	y: number;
	pressed: number;
	left: number;
	middle: number;
	right: number;
	press: number;
	release: number;
	wheel: number;
}

export interface TouchPoint {
	x: number;
	y: number;
	id: number | string;
}

export interface TouchState {
	touching: number;
	x: number;
	y: number;
	press: number;
	release: number;
	touches: TouchPoint[];
}

export type PointerIdentifier = number | string;
