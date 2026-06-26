import messages from './public/i18n.json'

export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'id',
  fallbackLocale: 'en',
  messages: {
    en: messages.en,
    id: messages.id,
  },
}))
