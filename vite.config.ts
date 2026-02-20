import path from "path";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), viteSingleFile()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: {
    hmr: {
      overlay: true,
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  customLogger: {
    info(msg) {
      if (msg.includes('[vite]') && (msg.includes('hmr update') || msg.includes('hmr connected'))) {
        return;
      }
      console.log(msg);
    },
    warn(msg) {
      if (msg.includes('DeprecationWarning') || msg.includes('[DEP0190]')) {
        return;
      }
      console.warn(msg);
    },
    error(msg) {
      console.error(msg);
    },
    hasErrorEnabled() {
      return true;
    }
  }
});
