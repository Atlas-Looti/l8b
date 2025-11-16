/**
 * Random - Pseudorandom number generator for LootiScript
 *
 * Uses linear congruential generator (LCG) algorithm for deterministic randomness.
 */

/**
 * Pseudorandom number generator using LCG (Linear Congruential Generator)
 */
export class Random {
	private _seed: number;
	private readonly a: number = 13971;
	private readonly b: number = 12345;
	private readonly size: number = 1 << 30;
	private readonly mask: number;
	private readonly norm: number;

	constructor(_seed?: number, hash: boolean = true) {
		this._seed = _seed != null ? _seed : Math.random();
		if (this._seed === 0) {
			this._seed = Math.random();
		}
		if (this._seed < 1) {
			this._seed *= 1 << 30;
		}
		this.mask = this.size - 1;
		this.norm = 1 / this.size;

		if (hash) {
			this.nextSeed();
			this.nextSeed();
			this.nextSeed();
		}
	}

	/**
	 * Generate next random number [0, 1)
	 */
	next(): number {
		this._seed = (this._seed * this.a + this.b) & this.mask;
		return this._seed * this.norm;
	}

	/**
	 * Generate random integer [0, num)
	 */
	nextInt(num: number): number {
		return Math.floor(this.next() * num);
	}

	/**
	 * Advance to next seed state
	 */
	nextSeed(): number {
		return (this._seed = (this._seed * this.a + this.b) & this.mask);
	}

	/**
	 * Set seed value
	 */
	seed(_seed?: number): number {
		this._seed = _seed != null ? _seed : Math.random();
		if (this._seed < 1) {
			this._seed *= 1 << 30;
		}
		this.nextSeed();
		this.nextSeed();
		return this.nextSeed();
	}

	/**
	 * Clone random generator with optional new seed
	 */
	clone(seed?: number): Random {
		if (seed != null) {
			return new Random(seed);
		} else {
			return new Random(this._seed, false);
		}
	}
}
