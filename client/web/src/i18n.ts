import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import XHR from "i18next-xhr-backend";

import translationEn from "./locales/en/translation.json";
import translationDe from "./locales/de/translation.json";
import translationFr from "./locales/fr/translation.json";
import translationJa from "./locales/ja/translation.json";
i18n
  .use(XHR)
  .use(LanguageDetector)
  .init({
    react: { 
      useSuspense: false //   <---- this will do the magic
    },
    fallbackLng: "en", // use en if detected lng is not available
    keySeparator: false, // we do not use keys in form messages.welcome
    interpolation: {
      escapeValue: false // react already safes from xss
    },
    resources: {
      en: {
        translations: translationEn
      },
      de: {
        translations: translationDe
      },
      fr: {
        translations: translationFr
      },
      ja: {
        translations: translationJa
      }
    },
    // have a common namespace used around the full app
    ns: ["translations"],
    defaultNS: "translations",
    detection: {
        order: ['querystring', 'navigator'],
      },
  });

export default i18n;