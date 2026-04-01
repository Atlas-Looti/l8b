/** Default frames per second */
export const DEFAULT_FPS = 60;

/** Default update rate (updates per second) */
export const DEFAULT_UPDATE_RATE = 60;

/** Frame time in milliseconds at 60 FPS */
export const FRAME_TIME_MS = 1000 / DEFAULT_FPS;

/** Threshold in ms to detect long pauses (tab switch, etc.) */
export const PAUSE_THRESHOLD_MS = 160;

/** Default tile/block size in pixels */
export const DEFAULT_BLOCK_SIZE = 16;

/** Minimum interval between loading bar redraws in ms (~60fps) */
export const LOADING_BAR_THROTTLE_MS = 16;

/** Timeout in ms for individual asset loads (sprite/map HTTP requests) */
export const ASSET_LOAD_TIMEOUT_MS = 30_000;
