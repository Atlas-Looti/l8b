import { defineConfig } from "vitepress";

export default defineConfig({
	title: "l8b",
	description: "Looti Engine - Game engine web berbasis LootiScript",
	srcDir: "./docs",
	themeConfig: {
		logo: "/logo.svg",
		socialLinks: [
			{ icon: "github", link: "https://github.com/Atlas-Looti/l8b2" },
		],
		search: {
			provider: "local",
		},
		sidebar: [
			{
				text: "Fundamentals",
				items: [
					{ text: "Quick Start", link: "/fundamentals/quick-start" },
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
					{
						text: "LootiScript Cheatsheet",
						link: "/quick-reference/lootiscript-cheatsheet",
					},
					{
						text: "API Cheatsheet",
						link: "/quick-reference/api-cheatsheet",
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
	},
});
