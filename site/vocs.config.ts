import { defineConfig } from "vocs";

export default defineConfig({
	title: "L8B Game Engine",
	description: "A 2D game engine for building interactive and dynamic game experiences",
	sidebar: [
		{
			text: "Getting Started",
			items: [
				{
					text: "Introduction",
					link: "/",
				},
				{
					text: "Quick Start",
					link: "/getting-started/quick-start",
				},
				{
					text: "Farcaster Mini Apps",
					link: "/getting-started/farcaster-miniapps",
				},
			],
		},
		{
			text: "LootiScript",
			items: [
				{
					text: "Introduction",
					link: "/looti-script",
				},
				{
					text: "Variables",
					link: "/looti-script/variables",
				},
				{
					text: "Game Structure",
					link: "/looti-script/game-structure",
				},
				{
					text: "Types",
					link: "/looti-script/types",
				},
				{
					text: "Functions",
					link: "/looti-script/functions",
				},
				{
					text: "Control Flow",
					link: "/looti-script/control-flow",
				},
				{
					text: "Scheduler",
					link: "/looti-script/scheduler",
				},
				{
					text: "Operators",
					link: "/looti-script/operators",
				},
				{
					text: "Built-ins",
					link: "/looti-script/built-ins",
				},
				{
					text: "Classes",
					link: "/looti-script/classes",
				},
				{
					text: "Performance",
					link: "/looti-script/performance",
				},
				{
					text: "Coding Style",
					link: "/looti-script/coding-style",
				},
			],
		},
		{
			text: "CLI",
			items: [
				{
					text: "Commands",
					link: "/cli",
				},
			],
		},
		{
			text: "Configuration",
			items: [
				{
					text: "Config File",
					link: "/configuration/config",
				},
			],
		},
		{
			text: "API Reference",
			items: [
				{
					text: "Overview",
					link: "/api",
				},
				{
					text: "Core APIs",
					items: [
						{
							text: "Screen",
							link: "/api/screen",
						},
						{
							text: "Audio",
							link: "/api/audio",
						},
						{
							text: "Inputs",
							link: "/api/inputs",
						},
						{
							text: "Assets",
							link: "/api/assets",
						},
						{
							text: "System",
							link: "/api/system",
						},
						{
							text: "Storage",
							link: "/api/storage",
						},
					],
				},
				{
					text: "Graphics",
					items: [
						{
							text: "Sprites",
							link: "/api/sprites",
						},
						{
							text: "Images",
							link: "/api/images",
						},
						{
							text: "Maps",
							link: "/api/maps",
						},
						{
							text: "Palette",
							link: "/api/palette",
						},
					],
				},
				{
					text: "Scene & Routing",
					items: [
						{
							text: "Scene",
							link: "/api/scene",
						},
						{
							text: "Router",
							link: "/api/router",
						},
					],
				},
				{
					text: "Standard Library",
					items: [
						{
							text: "Stdlib",
							link: "/api/stdlib",
						},
					],
				},
				{
					text: "Farcaster APIs",
					items: [
						{
							text: "Player",
							link: "/api/player",
						},
						{
							text: "Wallet",
							link: "/api/wallet",
						},
						{
							text: "EVM",
							link: "/api/evm",
						},
						{
							text: "Actions",
							link: "/api/actions",
						},
						{
							text: "HTTP",
							link: "/api/http",
						},
					],
				},
			],
		},
	],
});
