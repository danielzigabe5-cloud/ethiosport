
export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },

  devtools: {
    enabled: true,
  },

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

  runtimeConfig: {
    public: {
      // Production API base includes /api.
      // Override using NUXT_PUBLIC_API_BASE when needed.
      apiBase:
        process.env.NUXT_PUBLIC_API_BASE ||
        'https://combolojo.etsgood.com/api',

      frontendOrigin:
        process.env.NUXT_PUBLIC_FRONTEND_ORIGIN ||
        'http://localhost:3000',
    },
  },

  pinia: {
    storesDirs: ['./stores'],
  },

  image: {
    domains: [
      'localhost',
      '127.0.0.1',
      'combolojo.etsgood.com',
    ],
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

  nitro: {
    prerender: {
      routes: ['/', '/app-download'],
    },
  },

  app: {
    head: {
      link: [
        {
          rel: 'icon',
          type: 'image/png',
          href: '/venue.png',
        },
      ],
    },
  },
})
