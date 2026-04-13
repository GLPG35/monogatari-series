// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

import react from '@astrojs/react';

import robotsTxt from 'astro-robots-txt';

// https://astro.build/config
export default defineConfig({
  site: 'https://monogatari-series.vercel.app/',
  integrations: [react(), robotsTxt({
    policy: [
      {
        userAgent: '*',
        disallow: ''
      }
    ]
  })]
});