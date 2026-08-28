import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
// Note: vite-plugin-eslint intentionally removed from the dev pipeline.
// Its ESLint config lookup couldn't resolve eslint-plugin-react from this
// folder layout (client/node_modules vs repo-root .eslintrc.cjs), which
// made EVERY module transform 500 and broke the dev server (blank white
// page, nothing ever mounted). Linting still works fine on its own via
// `npm run lint`; it just no longer runs inline inside Vite's dev server.
export default defineConfig({
	publicDir: "public",
	plugins: [react()],
	server: {
		port: 3000,
	},
	base: "/vibechess/",
});
