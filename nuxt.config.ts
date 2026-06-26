// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  build: {
    transpile: ['@vite-pwa/nuxt'],
  },

  modules: [
    '@nuxt/ui',
    '@nuxtjs/google-fonts',
    '@nuxt/content',
    '@nuxtjs/supabase',
    '@vueuse/nuxt',
    '@vite-pwa/nuxt',
    '@vueuse/motion/nuxt',
    '@nuxtjs/i18n',
  ],
  i18n: {
    strategy: 'prefix_except_default',
    vueI18n: '~/language.config.ts',
    locales: [
      { code: 'en', iso: 'en-US', name: 'English' },
      { code: 'id', iso: 'id-ID', name: 'Indonesia' },
    ],
    defaultLocale: 'id',
  },

  runtimeConfig: {
    public: {
      usermail: '',
      passmail: '',
    },
  },

  css: ['~/assets/css/font.css', '~/assets/css/print.css'],

  colorMode: {
    preference: 'light',
  },

  pwa: {
    // mode: 'development',
    strategies: 'generateSW',
    registerType: 'autoUpdate',

    manifest: {
      name: 'Muh Syahendra — Frontend Engineer',
      short_name: 'MSA',
      description: 'Portfolio of Muh Syahendra — Frontend Engineer specializing in React, Vue, Nuxt & Next.js.',
      theme_color: '#0a0b0b',
      background_color: '#0a0b0b',
      display: 'standalone',
      scope: '/',
      start_url: '/',
      launch_handler: {
        client_mode: ['navigate-existing', 'auto']
      },
      categories: ['portfolio', 'developer', 'engineering'],
      icons: [
        {
          src: 'icons/icon-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: 'icons/icon-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
        {
          src: 'icons/icon-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any maskable',
        },
      ],
    },
    pwaAssets: {
      config: true,
      preset: 'transparent',
      imagesDir: 'public', // Assuming favicon.ico is in the public directory
    },
    // workbox: {
    //   globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
    //   sourcemap: true,
    //   navigateFallback: '/',
    //   runtimeCaching: [
    //     {
    //       urlPattern: '/*',
    //       handler: 'NetworkFirst', // Memaksa untuk selalu mengambil file terbaru dari jaringan
    //     },
    //   ],
    // },
    client: {
      installPrompt: true,
    },
    devOptions: {
      enabled: true,
      type: 'module',
      suppressWarnings: true,
      navigateFallbackAllowlist: [/^\/$/],
    },
  },

  ui: {
    icons: ['ic'],
  },

  supabase: {
    // Options
    redirect: false,
  },

  googleFonts: {
    families: {
      Poppins: [100, 200, 300, 400, 500, 600, 700, 800, 900],
      'Hanken Grotesk': [500, 600, 700],
      'Geist': [400, 500, 600, 700],
    },
  },

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/icons/icon-192x192.png' },
      ],
    },
  },

  compatibilityDate: '2024-12-23',
  vite: {
    assetsInclude: ['~/assets/**/*'],
  },
})