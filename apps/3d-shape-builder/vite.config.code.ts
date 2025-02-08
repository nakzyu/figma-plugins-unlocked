import { defineConfig } from "vite";
import { resolve } from "path";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths()],
  build: {
    outDir: resolve(__dirname, "dist/code"),
    rollupOptions: {
      input: {
        code: resolve(__dirname, "src/code/code.ts"),
      },
      output: {
        inlineDynamicImports: true,
        entryFileNames: "[name].js",
      },
    },
  },

  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js"],
  },
});
