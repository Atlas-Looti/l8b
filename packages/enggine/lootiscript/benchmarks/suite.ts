import { Compiler } from "../src/v1/compiler";
import { Processor } from "../src/v1/processor";
import { Runner } from "../src/v1/runner";

// Polyfill for global Compiler access used by Runner
(globalThis as any).Compiler = Compiler;
(globalThis as any).Processor = Processor;

const FIBONACCI_SOURCE = `
fib = function(n)
  if n < 2 then return n end
  return fib(n - 1) + fib(n - 2)
end

res = fib(20)
`;

const PROPERTY_ACCESS_SOURCE = `
obj = {}
obj.x = 0
obj.y = 0
obj.z = 0
sum = 0
i = 0
while i < 10000
  obj.x = i
  obj.y = i + 1
  obj.z = i + 2
  sum = sum + obj.x + obj.y + obj.z
  i = i + 1
end
`;

const ARRAY_OPS_SOURCE = `
list = []
i = 0
while i < 10000
  list[i] = i
  i = i + 1
end

sum = 0
i = 0
while i < 10000
  sum = sum + list[i]
  i = i + 1
end
`;

async function runBenchmark(name: string, source: string, iterations: number = 5) {
	console.log(`Running benchmark: ${name}`);

	const context = {
		global: {},
		meta: {
			print: () => {},
		},
		warnings: {
			using_undefined_variable: {},
			assigning_field_to_undefined: {},
			invoking_non_function: {},
			assigning_api_variable: {},
			assignment_as_condition: {},
		},
	};

	const runner = new Runner({
		context,
	});
	runner.init();

	// Enable profiling
	runner.system.profiler.start();

	const start = performance.now();
	for (let i = 0; i < iterations; i++) {
		try {
			runner.run(source);
		} catch (e) {
			console.error(e);
		}
	}
	const end = performance.now();

	const metrics = runner.system.profiler.stop();

	console.log(`  Time: ${(end - start).toFixed(2)}ms`);
	console.log(`  Ops: ${metrics.ops}`);
	console.log(`  Ops/sec: ${metrics.opsPerSec.toFixed(2)}`);
	console.log(`  Allocations: ${metrics.allocations}`);
	console.log("-------------------");

	return metrics;
}

async function main() {
	console.log("Starting L8B Performance Benchmarks\n");

	await runBenchmark("Fibonacci (Recursive)", FIBONACCI_SOURCE);
	await runBenchmark("Property Access", PROPERTY_ACCESS_SOURCE);
	await runBenchmark("Array Operations", ARRAY_OPS_SOURCE);
}

main().catch(console.error);
