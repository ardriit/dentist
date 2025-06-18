import 'server-only';

const locales = ['en', 'sq'];

const dictionaries = {
  en: () => import('../dictionaries/en.json').then((module) => module.default),
  sq: () => import('../dictionaries/sq.json').then((module) => module.default),
};

export const getTranslations = async (locale: keyof typeof dictionaries) =>
  dictionaries[locales.includes(locale) ? locale : 'en']();
