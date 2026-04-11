import { beforeEach, describe, expect, it, vi } from "vitest";

const mockBridge = {
	emit: vi.fn(),
	request: vi.fn(),
	saveSnapshot: vi.fn(),
	loadSnapshot: vi.fn(),
	getSession: vi.fn(),
	subscribe: vi.fn(),
};

vi.mock("@al8b/audio", () => ({
	AudioCore: class {
		getInterface() {
			return {};
		}
		stopAll() {}
		cancelBeeps() {}
	},
}));

vi.mock("@al8b/player", () => ({
	PlayerService: class {
		constructor(private delegate: Record<string, (...args: any[]) => any>) {}
		getInterface() {
			return {
				pause: () => this.delegate.pause(),
				resume: () => this.delegate.resume(),
				postMessage: (message: unknown) => this.delegate.postMessage(message),
			};
		}
	},
}));

vi.mock("@al8b/screen", () => ({
	Screen: class {
		public canvas: any;
		public width: number;
		public height: number;
		constructor(options: { canvas?: HTMLCanvasElement; width: number; height: number }) {
			this.canvas = options.canvas || ({ style: {} } as HTMLCanvasElement);
			this.width = options.width;
			this.height = options.height;
		}
		getCanvas() {
			return this.canvas;
		}
		getInterface() {
			return {
				canvas: this.canvas,
				clear: () => {},
				resize: () => {},
				takePicture: (callback: (picture: string) => void) => callback("picture"),
			};
		}
		updateInterface() {}
		initDraw() {}
		clear() {}
	},
}));

vi.mock("@al8b/time", () => ({
	TimeMachine: class {
		onStatus() {}
		messageReceived() {}
		step() {}
		loopStep() {}
	},
	StatePlayer: class {
		restoreState(target: Record<string, unknown>, snapshot: Record<string, unknown>) {
			for (const key of Object.keys(target)) {
				if (!["screen", "audio", "keyboard", "mouse", "touch", "gamepad", "system", "storage", "host", "session", "memory"].includes(key)) {
					delete target[key];
				}
			}
			Object.assign(target, JSON.parse(JSON.stringify(snapshot)));
		}
	},
}));

vi.mock("@al8b/vm", () => ({
	L8BVM: class {
		context: any;
		runner: any;
		error_info = null;
		constructor(meta: Record<string, unknown>, global: Record<string, unknown>) {
			this.context = {
				meta,
				global: {
					...global,
					storage: {},
				},
			};
			this.runner = {
				tick: vi.fn(),
				main_thread: {
					processor: {
						routineAsFunction: (routine: unknown) => routine,
					},
				},
			};
		}
		run() {
			return null;
		}
		call(name: string) {
			if (typeof this.context.global[name] === "function") {
				return this.context.global[name]();
			}
			return null;
		}
		clearWarnings() {}
		toString(value: unknown) {
			return String(value);
		}
	},
	Random: class {},
	Routine: class {},
}));

vi.mock("../src/assets", () => ({
	AssetLoader: class {
		async loadAll() {
			return {
				sprites: {},
				maps: {},
				sounds: {},
				music: {},
				assets: {},
			};
		}
		isReady() {
			return true;
		}
		getProgress() {
			return 1;
		}
		showLoadingBar() {}
	},
	Image: class {},
	Sprite: class {},
	TileMap: class {},
	Sound: class {},
}));

vi.mock("../src/input", () => ({
	InputManager: class {
		getStates() {
			return {
				keyboard: {},
				mouse: {},
				touch: {},
				gamepad: {},
			};
		}
		update() {}
	},
}));

vi.mock("../src/loop", () => ({
	GameLoop: class {
		start() {}
		stop() {}
		resume() {}
		setUpdateRate() {}
		getFPS() {
			return 60;
		}
	},
}));

vi.mock("../src/hot-reload", () => ({
	SourceUpdater: class {
		updateSource() {
			return true;
		}
	},
}));

import { createRuntime } from "../src/core/controller";

describe("RuntimeController bridge integration", () => {
	beforeEach(() => {
		vi.clearAllMocks();
		mockBridge.request.mockResolvedValue({ ok: true, value: 42 });
		mockBridge.saveSnapshot.mockResolvedValue(undefined);
		mockBridge.loadSnapshot.mockResolvedValue(null);
		mockBridge.getSession.mockResolvedValue({
			user: { id: "user-1" },
			game: { id: "hello" },
		});
		mockBridge.subscribe.mockImplementation(() => () => {});
	});

	it("hydrates session and routes host APIs through the bridge", async () => {
		const runtime = createRuntime({
			sources: { main: "print('ok')" },
			bridge: mockBridge,
		});

		await runtime.start();

		expect(runtime.getSession()?.user?.id).toBe("user-1");
		expect(runtime.vm?.context.global.session.user().id).toBe("user-1");

		runtime.vm?.context.global.host.emit("achievement.unlock", { id: "first-win" });
		expect(mockBridge.emit).toHaveBeenCalledWith("achievement.unlock", { id: "first-win" });

		const callback = vi.fn();
		runtime.vm?.context.global.host.request("profile.get", { slot: "main" }, callback);
		await Promise.resolve();

		expect(mockBridge.request).toHaveBeenCalledWith("profile.get", { slot: "main" });
		expect(callback).toHaveBeenCalledWith({ ok: true, value: 42 });
	});

	it("exports, imports, and preserves snapshots across reset", async () => {
		const runtime = createRuntime({
			sources: { main: "print('ok')" },
			initialSession: { user: { id: "user-2" } },
		});

		await runtime.start();
		runtime.vm!.context.global.score = 7;

		const snapshot = runtime.exportSnapshot();
		expect(snapshot.global.score).toBe(7);
		expect(snapshot.session?.user?.id).toBe("user-2");

		runtime.vm!.context.global.score = 99;
		await runtime.importSnapshot(snapshot);
		expect(runtime.vm!.context.global.score).toBe(7);

		runtime.vm!.context.global.score = 33;
		await runtime.reset({ preserveSnapshot: true, preserveSession: true });
		expect(runtime.vm!.context.global.score).toBe(33);
		expect(runtime.getSession()?.user?.id).toBe("user-2");
	});

	it("updates session from host events", async () => {
		const runtime = createRuntime({
			sources: { main: "print('ok')" },
		});

		await runtime.start();
		runtime.sendHostEvent({
			type: "session.update",
			payload: {
				room: { id: "room-7", role: "host" },
			},
		});

		expect(runtime.getSession()?.room?.id).toBe("room-7");
		expect(runtime.vm?.context.global.session.room().role).toBe("host");
	});
});
