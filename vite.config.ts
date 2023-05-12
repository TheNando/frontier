import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/staging": {
        target: "http://vulcand-protected.service.staging.mailforce:8182",
        // changeOrigin: true,
        rewrite: (path) => path.replace(/^\/staging/, ""),
      },
      "/prod": {
        target: "http://vulcand-protected.service.prod.mailforce:8182",
        // changeOrigin: true,
        rewrite: (path) => path.replace(/^\/prod/, ""),
      },
    },
  },
});
