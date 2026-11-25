// @ts-check
import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import robotsTxt from 'astro-robots-txt'
import icon from 'astro-icon'

// https://astro.build/config
export default defineConfig({
  site: 'https://monogatariseri.es/',
  integrations: [react(), icon(), robotsTxt({
    policy: [
      {
        userAgent: '*',
        disallow: ''
      }
    ]
  })],
  i18n: {
    	defaultLocale: 'en',
      locales: ['en', 'es', 'pt'],
      routing: {
        	prefixDefaultLocale: false
      }
  }
})
