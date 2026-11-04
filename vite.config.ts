import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath } from "node:url";
export default defineConfig(({ mode }) => ({
  // Browser checks must not invalidate a developer's running server cache.
  cacheDir: mode === "test" ? "node_modules/.vite-playwright" : "node_modules/.vite",
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: [
      { find: "hulmio-ui/styles.css", replacement: fileURLToPath(new URL("./packages/ui/src/styles.css", import.meta.url)) },
      { find: "hulmio-ui", replacement: fileURLToPath(new URL("./packages/ui/src/index.ts", import.meta.url)) },
    ],
  },
}));
