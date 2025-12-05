/**
 * Init command - Create new L8B project
 */
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { createLogger } from "@l8b/framework-shared";
import { createDefaultConfig, writeConfig } from "@l8b/framework-config";

const logger = createLogger("init");

/**
 * Init command options
 */
export interface InitOptions {
	name: string;
	template: string;
}

/**
 * Run init command
 */
export async function initCommand(options: InitOptions): Promise<void> {
	const projectDir = resolve(options.name);

	if (existsSync(projectDir)) {
		logger.error(`Directory already exists: ${projectDir}`);
		process.exit(1);
	}

	logger.info(`Creating new L8B project: ${options.name}`);

	// Create project structure
	mkdirSync(projectDir, { recursive: true });
	mkdirSync(join(projectDir, "src"), { recursive: true });
	mkdirSync(join(projectDir, "public", "sprites"), { recursive: true });
	mkdirSync(join(projectDir, "public", "maps"), { recursive: true });
	mkdirSync(join(projectDir, "public", "sounds"), { recursive: true });
	mkdirSync(join(projectDir, "public", "music"), { recursive: true });

	// Create config file (minimal)
	const config = createDefaultConfig();
	config.title = options.name;
	writeConfig(projectDir, config);

	// Note: Directories are hardcoded:
	// - src/ for source files
	// - public/ for static assets
	// - dist/ for build output

	// Create main source file
	const mainSource = `// ${options.name} - Main Entry Point

// Called once when the game starts
init = function()
	x = 0
	y = 0
	speed = 2
end

// Called every frame (60 times per second)
update = function()
	// Handle input
	if keyboard.LEFT then
		x -= speed
	end
	if keyboard.RIGHT then
		x += speed
	end
	if keyboard.UP then
		y += speed
	end
	if keyboard.DOWN then
		y -= speed
	end
end

// Called after update to render the frame
draw = function()
	// Clear screen
	screen.clear("#1a1a2e")
	
	// Draw player
	screen.fillRound(x, y, 20, 20, "#16e0bd")
	
	// Draw instructions
	screen.drawText("Use arrow keys to move", 0, -80, 14, "#eee")
	screen.drawText("Welcome to L8B!", 0, 80, 20, "#fff")
end
`;

	writeFileSync(join(projectDir, "src", "main.loot"), mainSource);

	// Create .gitignore
	const gitignore = `# L8B
dist/
.l8b/

# Dependencies
node_modules/

# IDE
.idea/
.vscode/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db
`;

	writeFileSync(join(projectDir, ".gitignore"), gitignore);

	// Create README
	const readme = `# ${options.name}

A game built with L8B Game Engine.

## Getting Started

\`\`\`bash
# Start development server
l8b dev

# Build for production
l8b build
\`\`\`

## Project Structure

\`\`\`
${options.name}/
├── src/              # LootiScript source files
│   └── main.loot     # Main entry point
├── public/           # Static assets
│   ├── sprites/      # Image files
│   ├── maps/         # Map files (JSON)
│   ├── sounds/       # Sound effects
│   └── music/        # Background music
├── l8b.config.json   # Project configuration
└── dist/             # Production build output
\`\`\`

## Documentation

Visit [https://l8b.dev](https://l8b.dev) for documentation.
`;

	writeFileSync(join(projectDir, "README.md"), readme);

	logger.success(`Project created: ${projectDir}`);
	console.log("");
	console.log("  Next steps:");
	console.log(`    cd ${options.name}`);
	console.log("    l8b dev");
	console.log("");
}
