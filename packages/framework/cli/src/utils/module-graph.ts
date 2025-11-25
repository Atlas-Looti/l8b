/**
 * Module graph tracker for LootiScript files
 *
 * Tracks dependencies between .loot files to enable incremental HMR
 * and build optimizations.
 */

import fs from "fs-extra";
import { parseLootDependencies, getModuleName } from "./loot-dependencies";

/**
 * Module graph node
 */
export interface ModuleNode {
	/** Module name (without .loot extension) */
	name: string;
	/** Absolute file path */
	filePath: string;
	/** Dependencies (module names) */
	dependencies: string[];
	/** Modules that depend on this module */
	dependents: Set<string>;
	/** Last modified time */
	mtime: number;
}

/**
 * Module graph for tracking dependencies
 */
export class ModuleGraph {
	private nodes: Map<string, ModuleNode> = new Map();
	private projectPath: string;

	constructor(projectPath: string) {
		this.projectPath = projectPath;
	}

	/**
	 * Add or update a module in the graph
	 *
	 * @param filePath - Absolute path to .loot file
	 * @returns Module node
	 */
	async addModule(filePath: string): Promise<ModuleNode> {
		const name = getModuleName(filePath, this.projectPath);
		const stat = await fs.stat(filePath);
		const content = await fs.readFile(filePath, "utf-8");
		const dependencies = await parseLootDependencies(filePath, content);

		// Remove old dependents
		const oldNode = this.nodes.get(name);
		if (oldNode) {
			for (const dep of oldNode.dependencies) {
				const depNode = this.nodes.get(dep);
				if (depNode) {
					depNode.dependents.delete(name);
				}
			}
		}

		// Create or update node
		const node: ModuleNode = {
			name,
			filePath,
			dependencies,
			dependents: oldNode?.dependents || new Set(),
			mtime: stat.mtimeMs,
		};

		// Update dependents for dependencies
		for (const dep of dependencies) {
			const depNode = this.nodes.get(dep);
			if (depNode) {
				depNode.dependents.add(name);
			}
		}

		this.nodes.set(name, node);
		return node;
	}

	/**
	 * Get module node by name
	 *
	 * @param name - Module name
	 * @returns Module node or undefined
	 */
	getModule(name: string): ModuleNode | undefined {
		return this.nodes.get(name);
	}

	/**
	 * Get all modules that depend on the given module
	 *
	 * @param moduleName - Module name
	 * @returns Array of dependent module names
	 */
	getDependents(moduleName: string): string[] {
		const node = this.nodes.get(moduleName);
		if (!node) return [];
		return Array.from(node.dependents);
	}

	/**
	 * Get all modules that the given module depends on
	 *
	 * @param moduleName - Module name
	 * @returns Array of dependency module names
	 */
	getDependencies(moduleName: string): string[] {
		const node = this.nodes.get(moduleName);
		if (!node) return [];
		return node.dependencies;
	}

	/**
	 * Get all affected modules when a module changes
	 * (includes the module itself and all its dependents)
	 *
	 * @param moduleName - Changed module name
	 * @returns Array of affected module names
	 */
	getAffectedModules(moduleName: string): string[] {
		const affected = new Set<string>([moduleName]);
		const queue = [moduleName];

		while (queue.length > 0) {
			const current = queue.shift()!;
			const dependents = this.getDependents(current);
			for (const dep of dependents) {
				if (!affected.has(dep)) {
					affected.add(dep);
					queue.push(dep);
				}
			}
		}

		return Array.from(affected);
	}

	/**
	 * Remove a module from the graph
	 *
	 * @param moduleName - Module name to remove
	 */
	removeModule(moduleName: string): void {
		const node = this.nodes.get(moduleName);
		if (!node) return;

		// Remove from dependencies' dependents
		for (const dep of node.dependencies) {
			const depNode = this.nodes.get(dep);
			if (depNode) {
				depNode.dependents.delete(moduleName);
			}
		}

		// Remove from dependents' dependencies
		for (const dependent of node.dependents) {
			const depNode = this.nodes.get(dependent);
			if (depNode) {
				const index = depNode.dependencies.indexOf(moduleName);
				if (index > -1) {
					depNode.dependencies.splice(index, 1);
				}
			}
		}

		this.nodes.delete(moduleName);
	}

	/**
	 * Clear all modules
	 */
	clear(): void {
		this.nodes.clear();
	}

	/**
	 * Get all module names
	 *
	 * @returns Array of all module names
	 */
	getAllModules(): string[] {
		return Array.from(this.nodes.keys());
	}
}
