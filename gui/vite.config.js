import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://manifest.googlevideo.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
        secure: false,
        configure: (proxy, options) => {
          proxy.on("proxyReq", (proxyReq, req, res) => {
            proxyReq.setHeader("Origin", "https://manifest.googlevideo.com");
          });
          proxy.on("proxyRes", (proxyRes, req, res) => {
            proxyRes.headers["Access-Control-Allow-Origin"] = "*";
            proxyRes.headers["Access-Control-Allow-Methods"] =
              "GET,PUT,POST,DELETE,PATCH,OPTIONS";
            proxyRes.headers["Access-Control-Allow-Headers"] =
              "Origin, X-Requested-With, Content-Type, Accept, Authorization";
            proxyRes.headers["Sec-Fetch-Mode"] = "no-cors";
          });
        },
      },
    },
  },
});
