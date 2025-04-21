'use client';

import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import { translations } from './translations';

const i18nConfig = {
  resources: {
    en: {
      translation: translations.en
    },
    fr: {
      translation: translations.fr
    },
    de: {
      translation: translations.de
    },
    es: {
      translation: translations.es
    }
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false
  },
  supportedLngs: ['en', 'fr', 'de', 'es'],
  detection: {
    order: ['localStorage', 'navigator']
  }
};

i18next
  .use(initReactI18next)
  .init(i18nConfig);

export default i18next; 