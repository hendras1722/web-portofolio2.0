// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  extends: '@nuxt-themes/typography',
  modules: [
    '@nuxt/ui',
    '@nuxtjs/google-fonts',
    '@nuxt/content',
    '@nuxtjs/supabase',
    '@vueuse/nuxt',
  ],
  css: ['~/assets/css/font.css'],
  colorMode: {
    preference: 'light',
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
