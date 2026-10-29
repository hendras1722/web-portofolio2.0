// Messages live in one file keyed by locale (`{ en: {...}, id: {...} }`), so each locale reads its own subtree.
const LOCALE_FILE = 'public/i18n.json'

export default {
  sourceLocale: 'en',
  resources: [
    { pattern: LOCALE_FILE, locale: 'en' },
    { pattern: LOCALE_FILE, locale: 'id' },
  ],
  usage: {
    // Built at runtime: `$t(edu.degree)` in pages/curriculum-vitae.vue and `descriptionKey` from public/cv.json.
    keysInUse: [
      'cv.education.ums',
      'project.cashsir_app2',
      'project.operator',
      'project.adonara_dashboard',
      'project.ccpl',
      'project.App_tele_privy',
      'project.bni',
      'project.ceisa',
    ],
  },
  // Array value read with `tm()`; x18n 0.1.3 does not index arrays as keys.
  ignoreKeys: ['cv.workExperiences'],
  plugins: [
    {
      name: 'locale-keyed-file',
      transformResource: {
        applies: (ctx: { path: string }): boolean => ctx.path.endsWith(LOCALE_FILE),
        read: (tree: Record<string, unknown>, ctx: { locale: string }): Record<string, unknown> =>
          (tree[ctx.locale] ?? {}) as Record<string, unknown>,
        toStored: (path: readonly string[], ctx: { locale: string }): string[] => [ctx.locale, ...path],
      },
    },
  ],
}
