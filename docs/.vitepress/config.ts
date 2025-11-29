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

		nav: [
			{ text: "Home", link: "/" },
			{ text: "Quick Start", link: "/fundamentals/quick-start" },
			{ text: "API Reference", link: "/fundamentals/api-reference" },
			{ text: "Farcaster", link: "/fundamentals/farcaster-miniapps" },
		],

		sidebar: [
			{
				text: "Getting Started",
				items: [
					{ text: "What is L8B?", link: "/" },
					{ text: "Quick Start", link: "/fundamentals/quick-start" },
				],
			},
			{
				text: "Fundamentals",
				items: [
					{
						text: "LootiScript Programming",
						link: "/fundamentals/looti-script-programming",
					},
					{ text: "API Reference", link: "/fundamentals/api-reference" },
					{
						text: "Farcaster Mini Apps",
						link: "/fundamentals/farcaster-miniapps",
					},
				],
			},
			{
				text: "Quick Reference",
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
				text: "Advanced Topics",
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
	},
});
