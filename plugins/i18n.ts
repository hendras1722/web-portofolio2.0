export default defineNuxtPlugin(async (nuxtApp) => {
  const { $i18n } = nuxtApp

  const locales = ['en', 'id']

  const data = await $fetch('https://raw.githubusercontent.com/hendras1722/web-portofolio2.0/refs/heads/master/public/i18n.json')

  for (const locale of locales) {
    const result = JSON.parse(data as string ?? {})
   if (Object.keys(result).length > 0) {
      $i18n.mergeLocaleMessage(locale, result[locale])
    }
  }
})
