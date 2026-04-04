#!/usr/bin/env node

import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const packageName = process.argv[2];
const workspace = process.argv[3] || "packages";

if (!packageName) {
	console.error("❌ Error: Package name is required!");
	console.log("Usage: bun run new <package-name> [workspace]");
	console.log("  workspace options: 'packages' (default) or 'lootiscripts'");
	process.exit(1);
}

// Validate package name
if (!/^[a-z0-9-]+$/.test(packageName)) {
	console.error("❌ Error: Package name must contain only lowercase letters, numbers, and hyphens");
	process.exit(1);
}

// Determine workspace directory
let workspaceDir = "packages";
if (workspace === "lootiscripts" || workspace === "lang") {
	workspaceDir = "packages/LootiScripts";
}

const packageDir = join(process.cwd(), workspaceDir, packageName);
const srcDir = join(packageDir, "src");

// Check if package already exists
if (existsSync(packageDir)) {
	console.error(`❌ Error: Package "${packageName}" already exists!`);
	process.exit(1);
}

console.log(`📦 Creating new package: @al8b/${packageName}`);

// Create directories
mkdirSync(packageDir, {
	recursive: true,
});
mkdirSync(srcDir, {
	recursive: true,
});

// Create package.json
const packageJson = {
	name: `@al8b/${packageName}`,
	version: "0.0.1",
	sideEffects: false,
	files: ["dist/**/*", "README.md", "package.json"],
	scripts: {
		build: "tsup",
		clean: "rm -rf dist",
		test: "vitest run --passWithNoTests",
	},
	main: "./dist/index.js",
	module: "./dist/index.mjs",
	types: "./dist/index.d.ts",
	dependencies: {},
	keywords: [packageName],
};

writeFileSync(join(packageDir, "package.json"), JSON.stringify(packageJson, null, 4));

// Create tsconfig.json
// Calculate relative path to tsconfig.base.json based on workspace depth
const tsConfigBasePath = workspaceDir === "packages" ? "../../tsconfig.base.json" : "../../../tsconfig.base.json";
const tsConfig = {
	$schema: "https://json.schemastore.org/tsconfig",
	extends: tsConfigBasePath,
	include: ["src/**/*"],
	exclude: ["node_modules", "dist"],
};

writeFileSync(join(packageDir, "tsconfig.json"), JSON.stringify(tsConfig, null, 4));

// Create tsup.config.ts
// Calculate relative path to tsup.config.base.ts based on workspace depth
const tsupBasePath = workspaceDir === "packages" ? "../../tsup.config.base" : "../../../tsup.config.base";
const tsupConfig = `import { defineConfig } from "tsup";
import { treeShakableConfig } from "${tsupBasePath}";

export default defineConfig({
    ...treeShakableConfig,
});
`;

writeFileSync(join(packageDir, "tsup.config.ts"), tsupConfig);

// Create src/index.ts
const indexContent = `// Entry point for @al8b/${packageName}

export const hello = () => {
  return "Hello from @al8b/${packageName}";
};
`;

writeFileSync(join(srcDir, "index.ts"), indexContent);

// Create README.md
const readme = `# @al8b/${packageName}

> Package description here

## Installation

\`\`\`bash
bun add @al8b/${packageName}
\`\`\`

## Usage

\`\`\`typescript
import { hello } from "@al8b/${packageName}";

console.log(hello());
\`\`\`

## Development

\`\`\`bash
# Build
bun run build

# Test
bun run test

# Clean
bun run clean
\`\`\`
`;

writeFileSync(join(packageDir, "README.md"), readme);

console.log("✅ Package created successfully!");
console.log("\n📁 Structure:");
console.log(`   ${workspaceDir}/${packageName}/`);
console.log(`   ├── src/`);
console.log(`   │   └── index.ts`);
console.log(`   ├── package.json`);
console.log(`   ├── tsconfig.json`);
console.log(`   ├── tsup.config.ts`);
console.log(`   └── README.md`);
console.log("\n🚀 Next steps:");
console.log(`   1. cd ${workspaceDir}/${packageName}`);
console.log(`   2. Start coding in src/index.ts`);
console.log(`   3. bun run build`);
