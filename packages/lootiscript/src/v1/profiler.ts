import type { Processor } from "./processor";

export interface ProfilerMetrics {
	ops: number;
	time: number;
	allocations: number;
	frames: number;
	samples: number;
	opsPerSec: number;
	avgFrameTime: number;
}

const MAX_SAMPLES = 100;

export class VMProfiler {
	private startTime: number = 0;
	private startOps: number = 0;
	private startAllocations: number = 0;
	private frameCount: number = 0;
	private sampleCount: number = 0;
	private processor: Processor;

	// Running totals for O(1) average computation
	private totalOps: number = 0;
	private totalTime: number = 0;
	private totalAllocations: number = 0;
	private totalFrames: number = 0;
	private totalOpsPerSec: number = 0;
	private totalAvgFrameTime: number = 0;

	constructor(processor: Processor) {
		this.processor = processor;
	}

	start() {
		this.startTime = performance.now();
		this.startOps = (this.processor as any).metrics?.ops || 0;
		this.startAllocations = (this.processor as any).metrics?.allocations || 0;
		this.frameCount = 0;
	}

	stop(): ProfilerMetrics {
		const endTime = performance.now();
		const duration = endTime - this.startTime;
		const currentOps = (this.processor as any).metrics?.ops || 0;
		const currentAllocations = (this.processor as any).metrics?.allocations || 0;
		const ops = currentOps - this.startOps;
		const allocations = currentAllocations - this.startAllocations;
		const opsPerSec = (ops / duration) * 1000;
		const avgFrameTime = duration / (this.frameCount || 1);

		const metrics: ProfilerMetrics = {
			ops,
			time: duration,
			allocations,
			frames: this.frameCount,
			samples: this.sampleCount + 1,
			opsPerSec,
			avgFrameTime,
		};

		if (this.sampleCount < MAX_SAMPLES) {
			this.totalOps += ops;
			this.totalTime += duration;
			this.totalAllocations += allocations;
			this.totalFrames += this.frameCount;
			this.totalOpsPerSec += opsPerSec;
			this.totalAvgFrameTime += avgFrameTime;
			this.sampleCount++;
		}

		return metrics;
	}

	frame() {
		this.frameCount++;
	}

	getAverageMetrics(): ProfilerMetrics {
		if (this.sampleCount === 0) {
			return this.stop();
		}

		return {
			ops: this.totalOps / this.sampleCount,
			time: this.totalTime / this.sampleCount,
			allocations: this.totalAllocations / this.sampleCount,
			frames: this.totalFrames / this.sampleCount,
			samples: this.sampleCount,
			opsPerSec: this.totalOpsPerSec / this.sampleCount,
			avgFrameTime: this.totalAvgFrameTime / this.sampleCount,
		};
	}

	reset() {
		this.sampleCount = 0;
		this.totalOps = 0;
		this.totalTime = 0;
		this.totalAllocations = 0;
		this.totalFrames = 0;
		this.totalOpsPerSec = 0;
		this.totalAvgFrameTime = 0;
	}
}
