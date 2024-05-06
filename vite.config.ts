import react from "@vitejs/plugin-react";
import { execSync } from "child_process";
import { defineConfig } from "vite";
import checker from "vite-plugin-checker";
import istanbul from "vite-plugin-istanbul";
import tsconfigPaths from "vite-tsconfig-paths";

const getCommitHash = () => {
  try {
    JSON.stringify(execSync("git rev-parse --short HEAD").toString());
  } catch (error) {
    return undefined;
  }
};

export default defineConfig({
  define: {
    __PACKAGE_JSON_VERSION__: JSON.stringify(process.env.npm_package_version),
    __COMMIT_HASH__: getCommitHash(),
  },
  plugins: [
    react(),
    tsconfigPaths(),
    checker({
      eslint: {
        lintCommand:
          'eslint "./src/**/*.{ts,tsx,js,jsx}" "./tests/**/*.{ts,tsx,js,jsx}"',
      },
      typescript: true,
    }),
    istanbul({
      include: "src/*",
      exclude: ["node_modules", "tests/"],
      extension: [".ts", ".tsx"],
      requireEnv: false,
      forceBuildInstrument: true,
    }),
  ],
  build: {
    sourcemap: "hidden",
  },
});
