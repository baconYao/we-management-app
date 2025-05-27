import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    build: {
        outDir: "dist",
        sourcemap: true,
        // Ensure proper handling of static assets
        assetsDir: "assets",
        // Optimize chunk size
        rollupOptions: {
            output: {
                manualChunks: {
                    vendor: ["react", "react-dom", "react-router-dom"],
                    mui: ["@mui/material", "@mui/icons-material", "@mui/x-date-pickers"],
                },
            },
        },
    },
    // Ensure proper base URL for Cloudflare Pages
    base: "/",
});
