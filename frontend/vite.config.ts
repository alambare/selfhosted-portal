import { defineConfig } from "vitest/config";
import { svelte } from "@sveltejs/vite-plugin-svelte";

export default defineConfig({
  plugins: [svelte()],
  resolve: {
    conditions: ["browser"],
  },
  server: {
    proxy: {
      "/whoami": {
        target: "http://localhost:8080",
        headers: {
          "Remote-User":   process.env.FAKE_REMOTE_USER   ?? "alice",
          "Remote-Name":   process.env.FAKE_REMOTE_NAME   ?? "Alice Doe",
          "Remote-Email":  process.env.FAKE_REMOTE_EMAIL  ?? "alice@aubinina.eu",
          "Remote-Groups": process.env.FAKE_REMOTE_GROUPS ?? "family",
        },
      },
      "/healthz": "http://localhost:8080",
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
  },
});
