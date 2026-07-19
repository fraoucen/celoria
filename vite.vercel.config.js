import { defineConfig, transformWithOxc } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    {
      name: "facture-clair-jsx",
      enforce: "pre",
      async transform(code, id) {
        if (!id.endsWith("/app/page.js")) return null;

        return transformWithOxc(code, id, {
          lang: "jsx",
          jsx: {
            runtime: "automatic",
          },
        });
      },
    },
    react(),
  ],
  build: {
    outDir: "out",
    emptyOutDir: true,
  },
});
