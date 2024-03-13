// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  extends: '@nuxt-themes/typography',
  modules: ['@nuxt/ui', '@nuxtjs/google-fonts', '@nuxt/content'],
  css: ['~/assets/css/font.css'],
  colorMode: {
    preference: 'light',
  },
  ui: {
    icons: ['ic'],
  },
  googleFonts: {
    families: {
      Poppins: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    },
  },
})
