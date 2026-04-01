import { SpriteScreen } from "./sprite-screen";

export class TextScreen extends SpriteScreen {
	// Font string cache — avoid rebuilding template string every draw call
	private _cachedFontSize = -1;
	private _cachedFontName = "";
	private _cachedFontString = "";

	private getFontString(size: number): string {
		if (size !== this._cachedFontSize || this.font !== this._cachedFontName) {
			this._cachedFontSize = size;
			this._cachedFontName = this.font;
			this._cachedFontString = `${size}pt ${this.font}`;
		}
		return this._cachedFontString;
	}

	textWidth(text: string, size: number): number {
		this.context.font = this.getFontString(size);
		return this.context.measureText(text).width;
	}

	drawText(text: string, x: number, y: number, size: number, color?: string | number): void {
		if (color) this.setColor(color);
		this.context.globalAlpha = this.alpha;
		this.context.font = this.getFontString(size);
		this.context.textAlign = "center";
		this.context.textBaseline = "middle";
		const w = this.context.measureText(text).width;
		const h = size;
		if (this.initDrawOp(x, -y)) {
			this.context.fillText(text, 0 - (this.anchor_x * w) / 2, 0 + (this.anchor_y * h) / 2);
			this.closeDrawOp();
		} else {
			this.context.fillText(text, x - (this.anchor_x * w) / 2, -y + (this.anchor_y * h) / 2);
		}
	}

	drawTextOutline(text: string, x: number, y: number, size: number, color?: string | number): void {
		if (color) this.setColor(color);
		this.context.globalAlpha = this.alpha;
		this.context.font = this.getFontString(size);
		this.context.lineWidth = this.line_width;
		this.context.textAlign = "center";
		this.context.textBaseline = "middle";
		const w = this.context.measureText(text).width;
		const h = size;
		if (this.initDrawOp(x, -y)) {
			this.context.strokeText(text, 0 - (this.anchor_x * w) / 2, 0 + (this.anchor_y * h) / 2);
			this.closeDrawOp();
		} else {
			this.context.strokeText(text, x - (this.anchor_x * w) / 2, -y + (this.anchor_y * h) / 2);
		}
	}
}
