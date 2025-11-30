import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
	title: "L8B Game Engine",
	description: "2D Game Engine & Web3 Framework for Farcaster Mini Apps",
	base: "/l8b2/", // GitHub Pages base path (repository name)
	lang: "en-US",

	head: [["link", { rel: "icon", href: "/l8b2/favicon.ico" }]],

	// Ignore dead links to package READMEs (they're external GitHub links)
	ignoreDeadLinks: true,

	themeConfig: {
		// https://vitepress.dev/reference/default-theme-config
		logo: "/l8b2/logo.svg",

		sidebar: [
			{
				text: "Getting Started",
				collapsed: false,
				items: [
					{ text: "Introduction", link: "/" },
					{ text: "Quick Start", link: "/fundamentals/quick-start" },
				],
			},
			{
				text: "Core Concepts",
				collapsed: false,
				items: [
					{
						text: "LootiScript Language",
						link: "/fundamentals/looti-script-programming",
					},
				],
			},
			{
				text: "Web3 Integration",
				collapsed: false,
				items: [
					{
						text: "Farcaster Mini Apps",
						link: "/fundamentals/farcaster-miniapps",
					},
				],
			},
			{
				text: "API Reference",
				collapsed: false,
				items: [
					{ text: "Screen", link: "/fundamentals/api-reference-screen" },
					{ text: "Inputs", link: "/fundamentals/api-reference-inputs" },
					{ text: "Audio", link: "/fundamentals/api-reference-audio" },
					{ text: "Assets", link: "/fundamentals/api-reference-assets" },
					{ text: "System", link: "/fundamentals/api-reference-system" },
					{ text: "Storage", link: "/fundamentals/api-reference-storage" },
					{ text: "Palette", link: "/fundamentals/api-reference-palette" },
					{ text: "Scene", link: "/fundamentals/api-reference-scene" },
					{ text: "Router", link: "/fundamentals/api-reference-router" },
					{ text: "Sprites", link: "/fundamentals/api-reference-sprites" },
					{ text: "Maps", link: "/fundamentals/api-reference-maps" },
					{ text: "Images", link: "/fundamentals/api-reference-images" },
					{ text: "Standard Library", link: "/fundamentals/api-reference-stdlib" },
					{ text: "Player API", link: "/fundamentals/api-reference-player" },
					{ text: "Wallet API", link: "/fundamentals/api-reference-wallet" },
					{ text: "EVM API", link: "/fundamentals/api-reference-evm" },
					{ text: "Actions API", link: "/fundamentals/api-reference-actions" },
					{ text: "HTTP API", link: "/fundamentals/api-reference-http" },
				],
			},
			{
				text: "Reference",
				collapsed: true,
				items: [
					{ text: "API Cheatsheet", link: "/quick-reference/api-cheatsheet" },
					{
						text: "LootiScript Cheatsheet",
						link: "/quick-reference/lootiscript-cheatsheet",
					},
					{
						text: "Error Cheatsheet",
						link: "/quick-reference/error-cheatsheet",
					},
				],
			},
			{
				text: "Advanced",
				collapsed: true,
				items: [
					{
						text: "Advanced LootiScript",
						link: "/advanced-topics/advanced-lootiscript",
					},
				],
			},
		],

		socialLinks: [
			{ icon: "github", link: "https://github.com/Atlas-Looti/l8b2" },
		],

		search: {
			provider: "local",
		},

		footer: {
			message: "Released under the MIT License.",
			copyright: "Copyright © 2024 L8B Game Engine",
		},

		editLink: {
			pattern: "https://github.com/Atlas-Looti/l8b2/edit/main/docs/:path",
			text: "Edit this page on GitHub",
		},

		lastUpdated: {
			text: "Last updated",
		},
	},
});
