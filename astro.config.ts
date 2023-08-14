import mdx from "@astrojs/mdx";
import solidJs from "@astrojs/solid-js";
import { defineConfig } from 'astro/config';
import project from './src/integrations/vite';
import graphviz from './src/integrations/graphviz'
import svgbob from './src/integrations/svgbob'

export default defineConfig({
  integrations: [
    solidJs(),
    mdx({ remarkPlugins: [graphviz, svgbob] })
  ],
  vite: {
    plugins: [project],
  },
  markdown: {
    syntaxHighlight: "prism"
  }
});