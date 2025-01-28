import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { viteSingleFile } from "vite-plugin-singlefile";
export default defineConfig({
  // Root directory (equivalent to Webpack's `context`)
  root: resolve(__dirname, "src"),

  build: {
    // Output directory
    outDir: resolve(__dirname, "dist"),
    rollupOptions: {
      input: {
        ui: resolve(__dirname, "src/app/index.html"), // Entry point for UI
      },
    },
  },

  plugins: [
    react(), // React and TypeScript plugin
    viteSingleFile(),
  ],

  resolve: {
    // Resolve these extensions automatically
    extensions: [".tsx", ".ts", ".jsx", ".js"],
  },

  server: {
    // Development server configuration
    port: 3000,
    open: true, // Automatically open the browser
  },
});
