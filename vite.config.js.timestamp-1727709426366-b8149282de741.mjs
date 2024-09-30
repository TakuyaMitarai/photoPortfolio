// vite.config.js
import { defineConfig } from "file:///Users/takuyam/Documents/workspace/photoPortfolio/node_modules/vite/dist/node/index.js";
import vue from "file:///Users/takuyam/Documents/workspace/photoPortfolio/node_modules/@vitejs/plugin-vue/dist/index.mjs";
var vite_config_default = defineConfig(({ mode }) => ({
  plugins: [vue()],
  base: mode === "production" ? "/photoPortfolio/" : "/",
  build: {
    outDir: "dist"
  }
}));
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvdGFrdXlhbS9Eb2N1bWVudHMvd29ya3NwYWNlL3Bob3RvUG9ydGZvbGlvXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvdGFrdXlhbS9Eb2N1bWVudHMvd29ya3NwYWNlL3Bob3RvUG9ydGZvbGlvL3ZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy90YWt1eWFtL0RvY3VtZW50cy93b3Jrc3BhY2UvcGhvdG9Qb3J0Zm9saW8vdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJztcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCh7IG1vZGUgfSkgPT4gKHtcbiAgcGx1Z2luczogW3Z1ZSgpXSxcbiAgYmFzZTogbW9kZSA9PT0gJ3Byb2R1Y3Rpb24nID8gJy9waG90b1BvcnRmb2xpby8nIDogJy8nLFxuICBidWlsZDoge1xuICAgIG91dERpcjogJ2Rpc3QnLFxuICB9LFxufSkpO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFxVSxTQUFTLG9CQUFvQjtBQUNsVyxPQUFPLFNBQVM7QUFFaEIsSUFBTyxzQkFBUSxhQUFhLENBQUMsRUFBRSxLQUFLLE9BQU87QUFBQSxFQUN6QyxTQUFTLENBQUMsSUFBSSxDQUFDO0FBQUEsRUFDZixNQUFNLFNBQVMsZUFBZSxxQkFBcUI7QUFBQSxFQUNuRCxPQUFPO0FBQUEsSUFDTCxRQUFRO0FBQUEsRUFDVjtBQUNGLEVBQUU7IiwKICAibmFtZXMiOiBbXQp9Cg==
