import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path, { resolve } from "path";
import { viteSingleFile } from "vite-plugin-singlefile";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    react(), // React and TypeScript plugin
    viteSingleFile(),
    tailwindcss(),
    tsconfigPaths(),
  ],

  // Root directory (equivalent to Webpack's `context`)
  root: resolve(__dirname, "src"),

  build: {
    // Output directory
    outDir: resolve(__dirname, "dist/ui"),
    rollupOptions: {
      input: {
        ui: resolve(__dirname, "src/ui/index.html"), // Entry point for UI
      },
      output: { dir: resolve(__dirname, "dist") },
    },
  },

  resolve: {
    // Resolve these extensions automatically
    extensions: [".tsx", ".ts", ".jsx", ".js"],
  },
});
