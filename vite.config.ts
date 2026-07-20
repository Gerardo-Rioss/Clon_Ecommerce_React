import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // React core
          "vendor-react": ["react", "react-dom", "react-router"],
          // MUI
          "vendor-mui": [
            "@mui/material",
            "@mui/icons-material",
            "@mui/styled-engine",
            "@emotion/react",
            "@emotion/styled",
          ],
          // Data fetching
          "vendor-query": ["@tanstack/react-query"],
          // Form
          "vendor-form": ["formik", "yup"],
        },
      },
    },
    // Avisa cuando un chunk supera 250KB (más sensible que el default 500KB)
    chunkSizeWarningLimit: 250,
  },
});
