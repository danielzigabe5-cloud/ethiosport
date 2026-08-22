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
    domains: ['localhost', '127.0.0.1'], // 127.0.0.1 ተጨምሯል
    format: ['webp'],
  },
  
 runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://127.0.0.1:8000/api'
    }
  }
})