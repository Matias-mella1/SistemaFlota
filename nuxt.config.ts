import { defineNuxtConfig } from "nuxt/config";

// nuxt.config.ts (en la raíz del repo)
export default defineNuxtConfig({
  srcDir: 'fronted/',                 // 👈 importante
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],     // sigue siendo ~
  app: {
    head: {
      title: 'Sistema de Gestión de Flota',
      meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap' }
      ]
    }
  }
})
