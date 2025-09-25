import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./idiomas/en/en.json";
import fr from "./idiomas/fr/fr.json";
import es from "./idiomas/es/es.json";
import pt from "./idiomas/pt/pt.json";
import de from "./idiomas/de/de.json";

const resources = {
  en,
  fr,
  es,
  pt,
  de,
};

i18n.use(initReactI18next).init({
  resources,
  lng: "pt",
  fallbackLng: "en",
  react: { useSuspense: false },
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
