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
    'nuxt-aos',
    // [
    //   'nuxt-mail',
    //   {
    //     message: { to: 'User <muhsyahendraa1722@gmail.com>' },
    //     configs: {
    //       custom: ({ replyTo, text, from }) => ({
    //         replyTo,
    //       }),
    //     },
    //     smtp: {
    //       service: 'gmail',
    //       // host: 'smtp.gmail.com',
    //       // port: 587,
    //       auth: {
    //         user: 'muhsyahendraa1722@gmail.com',
    //         pass: 'vdtn vsfa kzim twvk',
    //       },
    //     },
    //   },
    // ],
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
