import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/v1/pubticker": {
        target: "https://api.bitfinex.com",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
