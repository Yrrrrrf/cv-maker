import { paraglideVitePlugin } from '@inlang/paraglide-js'
import tailwindcss from "@tailwindcss/vite";
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [
		sveltekit(),
		tailwindcss(),
		paraglideVitePlugin({ project: './project.inlang', outdir: './src/paraglide' }),
	],
	ssr: {
		// Add lucide-svelte to noExternal to force Vite to process it
		noExternal: ["@lucide/svelte"],
	},
});
