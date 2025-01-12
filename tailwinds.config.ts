/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app.vue', // Pastikan ini ada
    './components/**/*.{vue,js,ts}', // Semua komponen
    './layouts/**/*.vue', // Semua layout
    './pages/**/*.vue', // Semua halaman
    './plugins/**/*.{js,ts}', // Plugin
    './nuxt.config.{js,ts}', // Konfigurasi Nuxt
  ],
  theme: {
    extend: {
      colors: {
        black: '#3D3C3C', // Warna black custom
      },
    },
  },
  plugins: [],
}
