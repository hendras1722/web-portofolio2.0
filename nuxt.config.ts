// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  extends: '@nuxt-themes/typography',
  build: {
    transpile: ['@vite-pwa/nuxt'],
  },
  modules: [
    '@nuxt/ui',
    '@nuxtjs/google-fonts',
    '@nuxt/content',
    '@nuxtjs/supabase',
    '@vueuse/nuxt',
    'nuxt-aos',
    '@vite-pwa/nuxt',
  ],
  runtimeConfig: {
    public: {
      usermail: '',
      passmail: '',
    },
  },
  css: ['~/assets/css/font.css'],
  colorMode: {
    preference: 'light',
  },
  pwa: {
    // mode: 'development',
    strategies: 'generateSW',
    registerType: 'autoUpdate',
    manifest: {
      name: 'MSA me',
      short_name: 'msame',
      description: 'OIOIOOi',
      theme_color: '#ffffff',
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
    },
    workbox: {
      globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
      sourcemap: true,
      navigateFallback: '/',
      runtimeCaching: [
        {
          urlPattern: '/*',
          handler: 'NetworkFirst', // Memaksa untuk selalu mengambil file terbaru dari jaringan
        },
      ],
    },
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
    },
  },
})
