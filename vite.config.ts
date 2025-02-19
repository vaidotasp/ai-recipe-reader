import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import { viteStaticCopy } from 'vite-plugin-static-copy';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    emptyOutDir: false,
    outDir: "build",
    rollupOptions: {
      input: {
        main: "./index.html",
        background: "src/background.ts",
      },
      output: {
        entryFileNames: (chunk) => {
          return chunk.name === "background" ? "background.js" : "[name].js";
        },
      },
    },
  },
});
