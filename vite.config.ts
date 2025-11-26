import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [react(), svgr()],
  define: {
    WS_URL: JSON.stringify(process.env.WS_URL),
    global: "globalThis",
  },
  server: {
    host: true,
    port: 5173,
    hmr: {
      protocol: "ws",
      host: "localhost",
      port: 5173,
      clientPort: 5173,
      overlay: true,
    },
    proxy: {
      "/api": {
        target: "https://danjitalk.duckdns.org/",
        changeOrigin: true,
        secure: true,
        ws: true,
      },
    },
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
    sourcemap: true,
    target: ["es2015", "safari11", "chrome60", "firefox60", "edge18"],
    minify: "terser",
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
  preview: {
    host: true,
  },
  optimizeDeps: {
    include: ["react", "react-dom"],
  },
  esbuild: {
    legalComments: "none",
  },
});
