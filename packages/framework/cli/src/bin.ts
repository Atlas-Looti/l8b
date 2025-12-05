/**
 * L8B CLI Entry Point
 */
import { run } from "./cli";

run(process.argv.slice(2)).catch((err) => {
	console.error(err);
	process.exit(1);
});
