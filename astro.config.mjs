import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [tailwind({
    // Configure the Tailwind integration
    config: { applyBaseStyles: false }
  })],
  site: 'https://yourusername.github.io',
  base: '/',
  output: 'static',
  build: {
    assets: '_assets'
  }
});