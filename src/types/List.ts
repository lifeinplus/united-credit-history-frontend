export interface ListField {
    sysName: string;
    type: string;
}

export interface AmountField extends ListField {
    country?: string;
    hide?: boolean;
}

export interface AmountContextField extends AmountField {
    chb?: string;
    flc?: string;
    context?: string;
    extended?: boolean;
}

export interface AmountListField extends AmountContextField {
    name: string;
    value: string;
}
