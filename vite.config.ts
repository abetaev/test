import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
  plugins: [solidPlugin()],
  envPrefix: "CFG_",
  resolve: {
    alias: {
      '~': fileURLToPath(new URL('./app', import.meta.url))
    }
  }
});