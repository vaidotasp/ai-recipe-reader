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
          if (chunk.name === "background") {
            return "background.js";
          } else {
            return "[name].js";
          }
        },
      },
    },
  },
});
