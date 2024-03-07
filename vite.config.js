import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const processEnv = {
    API_KEY: "6vevexqh3vi2y",
  };

  return {
    define: {
      "process.env": processEnv,
    },
    plugins: [react()],
  };
});
