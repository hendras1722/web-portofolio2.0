import { keyboards } from '../data/keyboards.ts';

export const ensureLocale = (locale: string) => {
  if (!keyboards[locale]) {
    throw new Error(`Locale ${locale} is not known`);
  }
};
