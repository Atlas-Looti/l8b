export interface LootiLoggingConfig {
	browser?: {
		/** Show runtime lifecycle logs in browser console */
		lifecycle?: boolean;
		/** Show canvas sizing logs in browser console */
		canvas?: boolean;
	};
	terminal?: {
		/** Mirror runtime lifecycle logs to terminal */
		lifecycle?: boolean;
		/** Mirror canvas sizing logs to terminal */
		canvas?: boolean;
		/** Mirror LootiScript print/log output to terminal */
		listener?: boolean;
		/** Mirror LootiScript errors to terminal */
		errors?: boolean;
	};
}

export interface LootiConfig {
	name: string;
	orientation: "portrait" | "landscape" | "any";
	aspect: string;
	canvas?: {
		id?: string;
		width?: number;
		height?: number;
	};
	width?: number;
	height?: number;
	url?: string;
	dev?: {
		port?: number;
		host?: string | boolean;
		watch?: boolean;
		hotReload?: boolean;
	};
	logging?: LootiLoggingConfig;
}
