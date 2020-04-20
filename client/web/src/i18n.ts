import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import XHR from 'i18next-xhr-backend'

import translationEn from './locales/en/translation.json'
import userEn from './locales/en/user.json'
import translationDe from './locales/de/translation.json'
import userDe from './locales/de/user.json'
import translationFr from './locales/fr/translation.json'
import userFr from './locales/fr/user.json'
import translationJa from './locales/ja/translation.json'
import userJa from './locales/ja/user.json'

i18n
  .use(XHR)
  .use(LanguageDetector)
  .init({
    // Adds react useSuspense to avoid error when using unmanaged language.
    // Strangely the fallbackLng doesn't work well without this...
    react: {
      useSuspense: false,
    },
    fallbackLng: 'en', // use en if detected lng is not available
    keySeparator: '.', // we do not use keys in form messages.welcome
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    // initImmediate: false,
    resources: {
      en: {
        translations: translationEn,
        user: userEn,
      },
      de: {
        user: userDe,
        translations: translationDe,
      },
      fr: {
        user: userFr,
        translations: translationFr,
      },
      ja: {
        user: userJa,
        translations: translationJa,
      },
    },
    // have a common namespace used around the full app
    ns: ['translations', 'user'],
    defaultNS: 'translations',
    detection: {
      order: ['querystring', 'navigator'],
    },
  })

export default i18n
