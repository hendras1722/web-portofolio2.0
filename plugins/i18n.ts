import en from '~/public/i18n.json'; // Directly import the JSON file
import id from '~/public/i18n.json'; // Assuming the structure allows direct import for both locales

export default defineNuxtPlugin(async (nuxtApp) => {
  const { $i18n } = nuxtApp;

  // The structure of i18n.json is { en: {...}, id: {...} }
  // So we can directly access the locale messages
  $i18n.mergeLocaleMessage('en', en.en);
  $i18n.mergeLocaleMessage('id', id.id);
});