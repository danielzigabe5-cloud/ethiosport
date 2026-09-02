// nuxt.config.ts
export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },
  devtools: { enabled: true },
  
  css: ['~/assets/css/main.css'],
  
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  
  compatibilityDate: '2026-08-19',
  ssr: false, 

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/icon',
    '@pinia/nuxt',
    '@nuxt/image', 
  ],

  pinia: {
    storesDirs: ['./stores'], 
  },

  image: {
    domains: ['localhost', '127.0.0.1'],
    format: ['webp'],
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
    },
  },
  
  runtimeConfig: {
    public: {
      // API Base URL (ያለ /api Prefix)
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://127.0.0.1:8000'
    }
  },

  nitro: {
    prerender: {
      routes: ['/', '/app-download']
    }
  }
})