import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';
import comlink from 'vite-plugin-comlink';

export default defineConfig({
  plugins: [solid(), comlink()],
  envPrefix: "APP_",
  resolve: {
    alias: {
      '~': fileURLToPath(new URL('./app', import.meta.url))
    }
  },
  worker: {
    plugins: [comlink()]
  }
});