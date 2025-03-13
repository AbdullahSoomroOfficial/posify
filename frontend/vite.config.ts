import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@pages": path.resolve(__dirname, "./src/pages/index.ts"),
      "@api": path.resolve(__dirname, "./src/api/index.ts"),
      "@interfaces": path.resolve(__dirname, "../shared/interfaces.ts"),
      "@dto": path.resolve(__dirname, "../shared/dto.ts"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""), // Removes "/api" from the request path
      },
    },
  },
});
