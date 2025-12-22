import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// importante para que el vite server sea accesible desde docker en windows
export default defineConfig({
  plugins: [vue()],
  server: {
    host: true,
    port: 5173,
    watch: {
      usePolling: true,
      interval: 100,
    },
  },
});
