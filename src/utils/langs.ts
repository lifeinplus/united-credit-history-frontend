interface Lang {
    countryCode: string;
    locale: string;
    nativeName: string;
}

export const langs: Record<string, Lang> = {
    en: { countryCode: "gb", locale: "en-GB", nativeName: "English" },
    ru: { countryCode: "ru", locale: "ru-RU", nativeName: "Русский" },
    tr: { countryCode: "tr", locale: "tr-TR", nativeName: "Türkçe" },
};
