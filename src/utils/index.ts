import type { DateOptions, Lang } from "../types";
import type { TableColumn } from "../types/Table";

export const langs: Record<string, Lang> = {
    en: { countryCode: "gb", locale: "en-GB", nativeName: "English" },
    ru: { countryCode: "ru", locale: "ru-RU", nativeName: "Русский" },
    tr: { countryCode: "tr", locale: "tr-TR", nativeName: "Türkçe" },
};

const dateOptions: DateOptions = {
    date: {
        year: "numeric",
        month: "numeric",
        day: "numeric",
    },

    header: {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
    },

    status: {
        month: "numeric",
        year: "numeric",
        timeZone: "Europe/Moscow",
    },

    time: {
        hour: "numeric",
        minute: "numeric",
    },
};

export function getDateFormat(locale: string, type: keyof DateOptions) {
    const options = dateOptions[type];
    return new Intl.DateTimeFormat(locale, options);
}

export const reportListColumns: TableColumn[] = [
    {
        alignment: "text-start",
        dataType: "numeric",
        sortType: "numeric",
        sysName: "appNumber",
    },
    {
        alignment: "text-center",
        dataType: "dateTime",
        sortType: "text",
        sysName: "appCreationDate",
    },
    {
        alignment: "text-start",
        dataType: "text",
        sortType: "text",
        isLink: true,
        sysName: "clientName",
    },
    {
        alignment: "text-end",
        dataType: "numeric",
        sortType: "text",
        sysName: "documentSeries",
    },
    {
        alignment: "text-end",
        dataType: "text",
        sortType: "numeric",
        sysName: "documentNumber",
    },
];

export const userListColumns: TableColumn[] = [
    {
        alignment: "text-center",
        dataType: "dateTime",
        sortType: "text",
        sysName: "creationDate",
    },
    {
        alignment: "text-start",
        dataType: "text",
        sortType: "text",
        sysName: "username",
    },
    {
        alignment: "text-start",
        dataType: "text",
        sysName: "roles",
    },
];
