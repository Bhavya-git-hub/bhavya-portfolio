import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Tailwind runs as a Vite plugin (v4) rather than through PostCSS: there is no
// tailwind.config.js in this project by design -- the design tokens live in
// src/index.css under @theme, so the palette has exactly one home.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        // Rolldown (Vite 8) takes manualChunks only as a function. Split the
        // two dependencies that are large and change on a different cadence
        // from the page itself, so editing content does not invalidate them in
        // the browser cache. Matching on the package directory rather than on
        // the substring keeps lucide-react out of the React chunk.
        manualChunks(id) {
          if (!id.includes("node_modules")) return undefined;
          if (/node_modules\/(react|react-dom|scheduler)\//.test(id)) return "react";
          if (/node_modules\/(motion|motion-dom|motion-utils)\//.test(id)) return "motion";
          return undefined;
        },
      },
    },
  },
});
