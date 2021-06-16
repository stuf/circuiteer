import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ReactPostprocessor from 'i18next-react-postprocessor';

import * as locales from './locales';

i18n
  .use(initReactI18next)
  .use(new ReactPostprocessor())
  .init({
    fallbackLng: 'en',
    debug: true,

    interpolation: {
      escapeValue: false,
    },

    resources: locales,
  });
