import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";

import { langs } from "../../utils";

i18next
    .use(initReactI18next) // passes i18n down to react-i18next
    .use(LanguageDetector)
    .use(Backend)
    .init({
        // debug: true,
        supportedLngs: Object.keys(langs),
        fallbackLng: "en",
        ns: ["common", "header", "footer"],
        detection: {
            order: ["path", "cookie", "htmlTag", "localStorage", "subdomain"],
            caches: ["cookie"],
        },
        backend: {
            loadPath: "/assets/locales/{{lng}}/{{ns}}.json",
        },
    });
