import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss(),], //tailwindcss for styling
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), //for  @ to point to src/ when used for path
    },
  },
  base: "./", //for deployment
});