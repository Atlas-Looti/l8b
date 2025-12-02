/**
 * Initialize a new LootiScript project
 *
 * Scaffolds a new project with standard directory structure and example files.
 */

import fs from "fs-extra";
import path from "path";
import pc from "picocolors";
import { DEFAULT_DIRS, DEFAULT_FILES } from "../utils/paths";

export interface InitOptions {
	/** Project name (directory name) */
	name: string;
	/** Force overwrite existing directory */
	force?: boolean;
}


/**
 * Initialize new project
 *
 * @param options - Init options
 */
export async function init(options: InitOptions): Promise<void> {
	const cwd = process.cwd();
	const projectPath = path.resolve(cwd, options.name);
	const projectName = path.basename(projectPath);

	if (await fs.pathExists(projectPath)) {
		if (options.force) {
			await fs.remove(projectPath);
		} else {
			const files = await fs.readdir(projectPath);
			if (files.length > 0) {
				console.error(pc.red(`\n✗ Directory ${options.name} is not empty.`));
				console.error(pc.gray(`  Use --force to overwrite existing files.\n`));
				process.exit(1);
			}
		}
	}

	console.log(pc.cyan(`\n  ✨ Initializing LootiScript project in ${options.name}...\n`));

	// Create directories
	await fs.ensureDir(projectPath);
	await fs.ensureDir(path.join(projectPath, DEFAULT_DIRS.SCRIPTS));
	await fs.ensureDir(path.join(projectPath, DEFAULT_DIRS.PUBLIC));
	await fs.ensureDir(path.join(projectPath, DEFAULT_DIRS.PUBLIC, "sprites"));
	await fs.ensureDir(path.join(projectPath, DEFAULT_DIRS.PUBLIC, "sounds"));
	await fs.ensureDir(path.join(projectPath, DEFAULT_DIRS.PUBLIC, "maps"));
	await fs.ensureDir(path.join(projectPath, DEFAULT_DIRS.PUBLIC, DEFAULT_DIRS.FONTS));

	// Create l8b.config.json
	const config = {
		name: projectName,
		orientation: "any",
		aspect: "free",
	};

	await fs.writeJson(path.join(projectPath, DEFAULT_FILES.CONFIG), config, {
		spaces: 2,
	});

	// Create example script
	const exampleScript = `t = 0

init = function()
  // Initialize game
end

update = function()
  t = t + 1
end

draw = function()
  // Clear screen with dark blue background
  screen.clear("#0c0c1c")
  
  // Draw animated text
  x = 0
  y = 0
  text = "Hello, L8B!"
  size = 8
  color = "#ffffff"
  screen.drawText(text, x, y, size, color)
  
  // Draw a simple animated circle
  cx = 0
  cy = 20
  radius = 5 + sin(t / 10) * 2
  screen.drawCircle(cx, cy, radius, "#00ff88")
end
`;

	await fs.writeFile(path.join(projectPath, DEFAULT_DIRS.SCRIPTS, "main.loot"), exampleScript);

	// Create .gitignore
	const gitignore = `node_modules
.l8b
dist
.DS_Store
`;

	await fs.writeFile(path.join(projectPath, ".gitignore"), gitignore);

	// Create package.json
	const packageJson = {
		name: projectName,
		version: "0.0.0",
		private: true,
		type: "module",
		scripts: {
			dev: "l8b dev",
			build: "l8b build",
			start: "l8b start",
		},
		dependencies: {},
		devDependencies: {
			"@l8b/cli": "latest",
		},
	};

	await fs.writeJson(path.join(projectPath, DEFAULT_FILES.PACKAGE_JSON), packageJson, {
		spaces: 2,
	});

	console.log(pc.green("  ✓ Project created successfully!\n"));
	console.log(pc.gray("  Next steps:"));
	console.log(pc.cyan(`    cd ${options.name}`));
	console.log(pc.cyan("    npm install"));
	console.log(pc.cyan("    npx l8b dev\n"));
}
