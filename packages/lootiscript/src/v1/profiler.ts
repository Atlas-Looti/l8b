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

export class VMProfiler {
	private startTime: number = 0;
	private startOps: number = 0;
	private startAllocations: number = 0;
	private frameCount: number = 0;
	private samples: ProfilerMetrics[] = [];
	private processor: Processor;

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

		const metrics: ProfilerMetrics = {
			ops: currentOps - this.startOps,
			time: duration,
			allocations: currentAllocations - this.startAllocations,
			frames: this.frameCount,
			samples: this.samples.length,
			opsPerSec: ((currentOps - this.startOps) / duration) * 1000,
			avgFrameTime: duration / (this.frameCount || 1),
		};

		this.samples.push(metrics);
		return metrics;
	}

	frame() {
		this.frameCount++;
	}

	getAverageMetrics(): ProfilerMetrics {
		if (this.samples.length === 0) {
			return this.stop();
		}

		const total = this.samples.reduce((acc, curr) => ({
			ops: acc.ops + curr.ops,
			time: acc.time + curr.time,
			allocations: acc.allocations + curr.allocations,
			frames: acc.frames + curr.frames,
			samples: acc.samples + curr.samples,
			opsPerSec: acc.opsPerSec + curr.opsPerSec,
			avgFrameTime: acc.avgFrameTime + curr.avgFrameTime,
		}));

		return {
			ops: total.ops / this.samples.length,
			time: total.time / this.samples.length,
			allocations: total.allocations / this.samples.length,
			frames: total.frames / this.samples.length,
			samples: this.samples.length,
			opsPerSec: total.opsPerSec / this.samples.length,
			avgFrameTime: total.avgFrameTime / this.samples.length,
		};
	}
}
