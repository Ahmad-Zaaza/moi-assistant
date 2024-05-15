import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import checker from "vite-plugin-checker";
import tsconfigPaths from "vite-tsconfig-paths";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    svgr({}),
    checker({
      eslint: {
        lintCommand: 'eslint "./src/**/*.{ts,tsx,js,jsx}"',
      },
      typescript: true,
    }),
  ],
  build: {
    sourcemap: "hidden",
  },
});
