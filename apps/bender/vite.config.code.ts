import { defineConfig } from "vite";
import { resolve } from "path";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths()],
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
    // Resolve these extensions automatically
    extensions: [".tsx", ".ts", ".jsx", ".js"],
  },
});
