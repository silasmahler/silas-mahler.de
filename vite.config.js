import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import {resolve} from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "./",
  build: {
    outDir: "dist",
    sourcemap: process.env.NODE_ENV !== "production",
    rolldownOptions: {
      input: {
        main: resolve(import.meta.dirname, "index.html"),
        impressum: resolve(import.meta.dirname, "impressum.html"),
        datenschutz: resolve(import.meta.dirname, "datenschutz.html")
      },
      output: {
        chunkFileNames: "assets/[name]-[hash].js",
        entryFileNames: "assets/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash].[ext]"
      }
    }
  }
});
