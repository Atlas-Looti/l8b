import { ZBuffer } from "../tri";
import type { ScreenInterface, ScreenOptions } from "../types";

/**
 * BaseScreen encapsulates canvas/context management plus shared drawing state.
 * Feature-specific behaviors (primitives, sprites, text, triangles) extend this class.
 */
export class BaseScreen {
	protected canvas: HTMLCanvasElement;
	protected context!: CanvasRenderingContext2D;
	protected runtime: any;

	public width!: number;
	public height!: number;

	// Drawing state
	protected alpha = 1;
	protected pixelated = 1;
	protected line_width = 1;
	protected font = "BitCell";

	// Transformations
	protected translation_x = 0;
	protected translation_y = 0;
	protected rotation = 0;
	protected scale_x = 1;
	protected scale_y = 1;
	protected screen_transform = false;

	// Object transformations
	protected object_rotation = 0;
	protected object_scale_x = 1;
	protected object_scale_y = 1;
	protected anchor_x = 0;
	protected anchor_y = 0;

	// Blending + font caches
	protected blending: Record<string, string> = {};
	protected font_load_requested: Record<string, boolean> = {};
	protected font_loaded: Record<string, boolean> = {};

	// Interface cache
	protected interfaceCache: ScreenInterface | null = null;

	// 3D helper
	protected zBuffer: ZBuffer;

	constructor(options: ScreenOptions = {}) {
		this.runtime = options.runtime;

		if (options.canvas) {
			this.canvas = options.canvas;
			if (this.canvas.width === 0 || this.canvas.height === 0) {
				this.canvas.width = options.width || 1080;
				this.canvas.height = options.height || 1920;
			}
		} else {
			this.canvas = document.createElement("canvas");
			this.canvas.width = options.width || 1080;
			this.canvas.height = options.height || 1920;
		}

		this.initContext();

		this.blending = {
			normal: "source-over",
			additive: "lighter",
		};

		const blendModes = [
			"source-over",
			"source-in",
			"source-out",
			"source-atop",
			"destination-over",
			"destination-in",
			"destination-out",
			"destination-atop",
			"lighter",
			"copy",
			"xor",
			"multiply",
			"screen",
			"overlay",
			"darken",
			"lighten",
			"color-dodge",
			"color-burn",
			"hard-light",
			"soft-light",
			"difference",
			"exclusion",
			"hue",
			"saturation",
			"color",
			"luminosity",
		];

		for (const mode of blendModes) {
			this.blending[mode] = mode;
		}

		this.loadFont(this.font);
		this.zBuffer = new ZBuffer(this.canvas.width, this.canvas.height);
	}

	protected initContext(): void {
		const ctx = this.canvas.getContext("2d", { alpha: false });
		if (!ctx) {
			throw new Error("Failed to get 2d context");
		}

		this.context = ctx;
		this.context.save();
		this.context.translate(this.canvas.width / 2, this.canvas.height / 2);
		const ratio = Math.min(this.canvas.width / 200, this.canvas.height / 200);
		this.context.scale(ratio, ratio);
		this.width = this.canvas.width / ratio;
		this.height = this.canvas.height / ratio;
		this.context.lineCap = "round";
	}

	clear(color?: string): void {
		const fill = this.context.fillStyle;
		const stroke = this.context.strokeStyle;
		const blending_save = this.context.globalCompositeOperation;

		this.context.globalAlpha = 1;
		this.context.globalCompositeOperation = "source-over";
		if (color) {
			this.setColor(color);
		} else {
			this.context.fillStyle = "#000";
		}

		this.context.fillRect(
			-this.width / 2,
			-this.height / 2,
			this.width,
			this.height,
		);

		this.context.fillStyle = fill;
		this.context.strokeStyle = stroke;
		this.context.globalCompositeOperation = blending_save;
		this.zBuffer.clear();
	}

	setColor(color: string | number): void {
		if (!color) return;

		if (!Number.isNaN(Number.parseInt(String(color)))) {
			const num = Number.parseInt(String(color));
			const r = ((Math.floor(num / 100) % 10) / 9) * 255;
			const g = ((Math.floor(num / 10) % 10) / 9) * 255;
			const b = ((num % 10) / 9) * 255;
			const c = 0xff000000 + (r << 16) + (g << 8) + b;
			const hex = "#" + c.toString(16).substring(2, 8);
			this.context.fillStyle = hex;
			this.context.strokeStyle = hex;
		} else if (typeof color === "string") {
			this.context.fillStyle = color;
			this.context.strokeStyle = color;
		}
	}

	setAlpha(alpha: number): void {
		this.alpha = alpha;
	}

	setPixelated(pixelated: number): void {
		this.pixelated = pixelated;
	}

	setBlending(blending: string): void {
		const blend = this.blending[blending || "normal"] || "source-over";
		this.context.globalCompositeOperation = blend as GlobalCompositeOperation;
	}

	setLineWidth(width: number): void {
		this.line_width = width;
	}

	setLineDash(dash: number[] | null): void {
		if (!Array.isArray(dash)) {
			this.context.setLineDash([]);
		} else {
			this.context.setLineDash(dash);
		}
	}

	setLinearGradient(
		x1: number,
		y1: number,
		x2: number,
		y2: number,
		c1: string,
		c2: string,
	): void {
		const grd = this.context.createLinearGradient(x1, -y1, x2, -y2);
		grd.addColorStop(0, c1);
		grd.addColorStop(1, c2);
		this.context.fillStyle = grd;
		this.context.strokeStyle = grd;
	}

	setRadialGradient(
		x: number,
		y: number,
		radius: number,
		c1: string,
		c2: string,
	): void {
		const grd = this.context.createRadialGradient(x, -y, 0, x, -y, radius);
		grd.addColorStop(0, c1);
		grd.addColorStop(1, c2);
		this.context.fillStyle = grd;
		this.context.strokeStyle = grd;
	}

	setFont(font: string): void {
		this.font = font || "Verdana";
		this.loadFont(this.font);
	}

	loadFont(font: string = "BitCell"): void {
		if (this.font_load_requested[font]) {
			return;
		}
		this.font_load_requested[font] = true;
		try {
			document.fonts?.load?.(`16pt ${font}`);
		} catch {
			// Ignore font loading errors
		}
	}

	isFontReady(font: string = this.font): number {
		if (this.font_loaded[font]) {
			return 1;
		}

		try {
			const ready = document.fonts?.check?.(`16pt ${font}`) ?? true;
			if (ready) {
				this.font_loaded[font] = true;
			}
			return ready ? 1 : 0;
		} catch {
			return 1;
		}
	}

	setTranslation(tx: number, ty: number): void {
		this.translation_x = isFinite(tx) ? tx : 0;
		this.translation_y = isFinite(ty) ? ty : 0;
		this.updateScreenTransform();
	}

	setScale(x: number, y: number): void {
		this.scale_x = isFinite(x) && x !== 0 ? x : 1;
		this.scale_y = isFinite(y) && y !== 0 ? y : 1;
		this.updateScreenTransform();
	}

	setRotation(rotation: number): void {
		this.rotation = isFinite(rotation) ? rotation : 0;
		this.updateScreenTransform();
	}

	protected updateScreenTransform(): void {
		this.screen_transform =
			this.translation_x !== 0 ||
			this.translation_y !== 0 ||
			this.scale_x !== 1 ||
			this.scale_y !== 1 ||
			this.rotation !== 0;
	}

	setDrawAnchor(ax: number, ay: number): void {
		this.anchor_x = typeof ax === "number" ? ax : 0;
		this.anchor_y = typeof ay === "number" ? ay : 0;
	}

	setDrawRotation(rotation: number): void {
		this.object_rotation = rotation;
	}

	setDrawScale(x: number, y: number = x): void {
		this.object_scale_x = x;
		this.object_scale_y = y;
	}

	protected initDrawOp(
		x: number,
		y: number,
		object_transform: boolean = true,
	): boolean {
		let res = false;

		if (this.screen_transform) {
			this.context.save();
			res = true;
			this.context.translate(this.translation_x, -this.translation_y);
			this.context.scale(this.scale_x, this.scale_y);
			this.context.rotate((-this.rotation / 180) * Math.PI);
			this.context.translate(x, y);
		}

		if (
			object_transform &&
			(this.object_rotation !== 0 ||
				this.object_scale_x !== 1 ||
				this.object_scale_y !== 1)
		) {
			if (!res) {
				this.context.save();
				res = true;
				this.context.translate(x, y);
			}

			if (this.object_rotation !== 0) {
				this.context.rotate((-this.object_rotation / 180) * Math.PI);
			}

			if (this.object_scale_x !== 1 || this.object_scale_y !== 1) {
				this.context.scale(this.object_scale_x, this.object_scale_y);
			}
		}

		return res;
	}

	protected closeDrawOp(): void {
		this.context.restore();
	}

	setCursorVisible(visible: boolean): void {
		if (this.canvas) {
			this.canvas.style.cursor = visible ? "default" : "none";
		}
	}

	getCanvas(): HTMLCanvasElement {
		return this.canvas;
	}

	getContext(): CanvasRenderingContext2D {
		return this.context;
	}

	resize(width?: number, height?: number): void {
		if (width && height) {
			this.canvas.width = width;
			this.canvas.height = height;
			this.initContext();
			this.zBuffer.resize(width, height);
		}
	}
}

