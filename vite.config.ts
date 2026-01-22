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
      "/api/ws/token": {
        target: "https://danjitalk.duckdns.org",
        changeOrigin: true,
        secure: true,
        cookieDomainRewrite: "localhost",
      },
      "/api/ws": {
        target: "https://danjitalk.duckdns.org",
        changeOrigin: true,
        ws: true,
        secure: true,
        rewrite: (path) => path, // 경로를 그대로 유지
        configure: (proxy) => {
          proxy.on('error', (err) => {
            console.log('❌ [Vite Proxy] WebSocket proxy error:', err);
          });
          proxy.on('proxyReqWs', (_proxyReq, req) => {
            console.log('🔌 [Vite Proxy] WebSocket proxy request:', req.url);
          });
        },
      },
      "/api": {
        target: "https://danjitalk.duckdns.org",
        changeOrigin: true,
        secure: true,
        // 쿠키 전달 설정
        cookieDomainRewrite: "localhost",
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
