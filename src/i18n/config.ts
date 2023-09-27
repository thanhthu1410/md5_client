import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import en from "./translations/en";
import vi from "./translations/vi";

function setLocalLanguage(){
  let locales = localStorage.getItem("locales");
  return locales ? locales : "en"
}

 i18n
.use(LanguageDetector)
.use(initReactI18next)
.init({
  lng:  setLocalLanguage(), // if you're using a language detector, do not define the lng option
  fallbackLng: 'en',
  debug: true,
  resources: {
    en: {
     translation: en,
    },
    vi: {
      translation: vi,
     },
  },
  // if you see an error like: "Argument of type 'DefaultTFuncReturn' is not assignable to parameter of type xyz"
  // set returnNull to false (and also in the i18next.d.ts options)
  // returnNull: false,
});
export default i18n

  