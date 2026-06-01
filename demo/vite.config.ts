import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// VITE_BASE is provided by CI for GitHub Pages: "/<repo>/".
// Default to root for local dev / preview.
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE ?? "/",
});
