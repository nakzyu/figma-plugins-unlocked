import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  build: {
    // Output directory
    outDir: resolve(__dirname, "dist"),
    rollupOptions: {
      input: {
        code: resolve(__dirname, "src/code.ts"), // Entry point for backend logic
      },
      output: {
        inlineDynamicImports: true,
        entryFileNames: "[name].js", // Output filenames for entry points
      },
    },
  },

  plugins: [
    react(), // React and TypeScript plugin
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
