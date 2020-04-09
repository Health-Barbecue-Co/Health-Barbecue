import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n.use(LanguageDetector).init({
  // we init with resources
  resources: {
    en: {
      translations: {
        "Translation test":
          "Translation test",
      }
    },
    ja: {
      translations: {
        "Translation test":
          "翻訳テスト",
      }
    },
    de: {
      translations: {
        "Translation test":
          "Übersetzungstest",
      }
    },
    fr: {
      translations: {
        "Translation test":
          "Test de traduction",
      }
    }
  },
  fallbackLng: "en",
  debug: true,
  
  // have a common namespace used around the full app
  ns: ["translations"],
  defaultNS: "translations",

  keySeparator: false, // we use content as keys

  interpolation: {
    escapeValue: false, // not needed for react!!
    formatSeparator: ","
  },

  detection: {
    order: ['navigator','querystring', 'cookie', 'localStorage', 'htmlTag', 'path', 'subdomain'],
  },

  react: {
    wait: true
  }
});

export default i18n;