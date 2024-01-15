import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { LOCALS } from "./constants";
import HttpApi, { HttpBackendOptions } from "i18next-http-backend";
//import { uk } from "./translations/uk";
//import { en } from "./translations/en";

// const resources = {
//   [LOCALS.EN]: {
//     translation: en,
//   },
//   [LOCALS.UK]: {
//     translation: uk,
//   },
// };

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(HttpApi)
  .use(LanguageDetector)
  .init<HttpBackendOptions>({
    //resources,
    supportedLngs: [LOCALS.UK, LOCALS.EN],
    fallbackLng: LOCALS.UK,
    detection: {
      order: ["cookie", "htmlTag", "localStorage", "path", "subdomain"],
      caches: ["cookie"],
    },
    backend: {
      loadPath: "/locales/{{lng}}/translation.json",
    },
  });

export default i18n;
