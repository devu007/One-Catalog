// i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEN from './locales/en/translation.json';
import translationFR from './locales/fr/translation.json';
import translationHI from './locales/hi/translation.json';
import translationBN from './locales/bn/translation.json';

const resources = {
  en: {
    translation: translationEN,
  },
  fr: {
    translation: translationFR,
  },
  hi: {
    translation: translationHI,
  },
  bn: {
    translation: translationBN,
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // Default language
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
