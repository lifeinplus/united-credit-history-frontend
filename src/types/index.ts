export interface DateOptions {
    date: Intl.DateTimeFormatOptions;
    header: Intl.DateTimeFormatOptions;
    status: Intl.DateTimeFormatOptions;
    time: Intl.DateTimeFormatOptions;
}

export interface Lang {
    countryCode: string;
    locale: string;
    nativeName: string;
}

export interface ListField {
    sysName: string;
    type: string;
}
