import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path, { resolve } from "path";

export default defineConfig({
  plugins: [
    react(), // React and TypeScript plugin
  ],

  build: {
    // Output directory
    outDir: resolve(__dirname, "dist/code"),
    rollupOptions: {
      input: {
        code: resolve(__dirname, "src/code/code.ts"), // Entry point for backend logic
      },
      output: {
        inlineDynamicImports: true,
        entryFileNames: "[name].js", // Output filenames for entry points
      },
    },
  },

  resolve: {
    alias: { "@": path.resolve(__dirname, "src") },
    // Resolve these extensions automatically
    extensions: [".tsx", ".ts", ".jsx", ".js"],
  },

  server: {
    // Development server configuration
    port: 3000,
    open: true, // Automatically open the browser
  },
});
