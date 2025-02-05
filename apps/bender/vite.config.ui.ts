import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { viteSingleFile } from "vite-plugin-singlefile";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), viteSingleFile(), tailwindcss(), tsconfigPaths()],

  root: resolve(__dirname, "src"),

  build: {
    outDir: resolve(__dirname, "dist/ui"),
    rollupOptions: {
      input: {
        ui: resolve(__dirname, "src/ui/index.html"),
      },
      output: { dir: resolve(__dirname, "dist") },
    },
  },

  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js"],
  },
});
