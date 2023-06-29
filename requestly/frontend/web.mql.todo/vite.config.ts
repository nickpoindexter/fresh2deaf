/// <reference types="vitest" />
import { defineConfig } from "vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import react from "@vitejs/plugin-react";
import topLevelAwait from "vite-plugin-top-level-await";

export default defineConfig({
  plugins: [
    react({
      jsxImportSource: "@emotion/react",
        babel: {
          plugins: ["@emotion/babel-plugin"],
        },
    }), 
    topLevelAwait(),
    nodePolyfills({
      exclude: [
        "fs", // Excludes the polyfill for `fs` and `node:fs`.
      ],
      globals: {
        Buffer: true,
      },
      protocolImports: true,
    }),
  ],
  build: {
    outDir: "build",
  },
  server: {
    open: true,
    port: 3000,
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts",
    coverage: {
      reporter: ["text", "html"],
      exclude: ["node_modules/", "src/setupTests.ts"],
    },
  },
});
